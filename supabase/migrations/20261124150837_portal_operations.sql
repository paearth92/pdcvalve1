-- All operations modifying shipment quantities serialize on the parent order.
-- Non-cancelled pending shipments reserve quantities but do not count as shipped.
create table pdc_private.fulfillment_locks (
  order_id uuid primary key references public.portal_orders(id) on delete cascade,
  revision bigint not null default 1
);
alter table pdc_private.fulfillment_locks enable row level security;

create function pdc_private.validate_fulfillment() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  parent_id uuid;
begin
  if tg_op = 'DELETE' then
    parent_id := old.order_id;
  else
    parent_id := new.order_id;
    if tg_op = 'UPDATE' and old.order_id is distinct from new.order_id then
      raise exception 'Cannot move records between orders' using errcode = '23514';
    end if;
  end if;
  perform 1 from public.portal_orders where id = parent_id for no key update;
  -- A physical version change also rejects concurrent allocations based on
  -- an old snapshot under repeatable-read/serializable isolation.
  insert into pdc_private.fulfillment_locks(order_id) values(parent_id)
  on conflict (order_id) do update set revision = pdc_private.fulfillment_locks.revision + 1;

  if exists (
    select 1
    from public.portal_order_items as i
    join public.portal_shipment_items as si on si.order_item_id = i.id
    join public.portal_shipments as s on s.id = si.shipment_id and s.status <> 'cancelled'
    where i.order_id = parent_id
    group by i.id
    having sum(si.quantity) > i.quantity_ordered
  ) then
    raise exception 'Shipment quantity exceeds the order line' using errcode = '23514';
  end if;
  return null;
end;
$$;

create trigger portal_shipment_fulfillment_check
after insert or update on public.portal_shipments
for each row execute function pdc_private.validate_fulfillment();
create trigger portal_shipment_item_fulfillment_check
after insert or update or delete on public.portal_shipment_items
for each row execute function pdc_private.validate_fulfillment();
create trigger portal_order_item_fulfillment_check
after update on public.portal_order_items
for each row execute function pdc_private.validate_fulfillment();

create function pdc_private.set_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin
  if new is distinct from old then
    new.updated_at := now();
  end if;
  return new;
end;
$$;
create trigger portal_orders_updated before update on public.portal_orders
for each row execute function pdc_private.set_updated_at();
create trigger portal_shipments_updated before update on public.portal_shipments
for each row execute function pdc_private.set_updated_at();

create function pdc_private.audit_change() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  old_row jsonb;
  new_row jsonb;
  row_data jsonb;
  company_id uuid;
  entity_id uuid;
  actor uuid := auth.uid();
begin
  if tg_op <> 'INSERT' then old_row := to_jsonb(old); end if;
  if tg_op <> 'DELETE' then new_row := to_jsonb(new); end if;
  if old_row is not distinct from new_row then return null; end if;
  row_data := coalesce(new_row, old_row);
  company_id := (row_data->>'organization_id')::uuid;
  entity_id := coalesce(row_data->>'id', row_data->>'user_id', row_data->>'order_item_id')::uuid;
  if tg_table_name = 'portal_organizations' and tg_op <> 'DELETE' then company_id := entity_id; end if;
  insert into public.portal_audit_log
    (organization_id, table_name, record_id, operation, changed_by, change_source, reason, previous_value, new_value)
  values
    (company_id, tg_table_name, entity_id, tg_op, actor,
     coalesce(nullif(current_setting('pdc.change_source', true), ''), case when actor is null then 'system' else 'portal' end),
     nullif(current_setting('pdc.change_reason', true), ''),
     old_row, new_row);
  return null;
end;
$$;

do $$
declare table_name text;
begin
  foreach table_name in array array[
    'portal_organizations','portal_memberships','portal_staff','portal_invitations',
    'portal_orders','portal_order_items','portal_order_item_prices','portal_order_events','portal_order_notes',
    'portal_shipments','portal_shipment_items','portal_quotes','portal_quote_items','portal_invoices','portal_payments',
    'portal_documents','portal_manual_overrides'
  ]
  loop
    execute format('create trigger change_audit after insert or update or delete on public.%I
      for each row execute function pdc_private.audit_change()', table_name);
  end loop;
end $$;

-- Status changes are customer visible. Audit reasons and internal notes stay
-- separate from events and notification copy.
create function pdc_private.record_order_event() returns trigger
language plpgsql security definer set search_path = '' as $$
declare event_id uuid;
begin
  if tg_op = 'INSERT' or new.status is distinct from old.status then
    insert into public.portal_order_events(organization_id, order_id, status, source, actor_id)
    values(new.organization_id, new.id, new.status,
      coalesce(nullif(current_setting('pdc.change_source', true), ''), 'portal'), auth.uid())
    returning id into event_id;
    insert into public.portal_notifications(organization_id, type, title, event_key, order_id)
    values(new.organization_id, 'order_status', 'Order ' || new.order_number || ' status updated', 'order:' || event_id, new.id);
  elsif new.estimated_ship_date is distinct from old.estimated_ship_date
     or new.estimated_delivery_date is distinct from old.estimated_delivery_date then
    insert into public.portal_notifications(organization_id, type, title, event_key, order_id)
    values(new.organization_id, 'order_corrected', 'Order ' || new.order_number || ' dates updated',
      'order-dates:' || gen_random_uuid(), new.id);
  end if;
  return null;
end;
$$;
create trigger portal_order_status_event after insert or update on public.portal_orders
for each row execute function pdc_private.record_order_event();

create function pdc_private.record_shipment_event() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  first_dispatch boolean;
  order_ref text;
begin
  if tg_op = 'UPDATE' and new is not distinct from old then return null; end if;
  if new.status = 'pending' then return null; end if;
  if tg_op = 'INSERT' and new.status = 'cancelled' then return null; end if;
  if tg_op = 'UPDATE' and old.status = 'pending' and new.status = 'cancelled' then return null; end if;
  first_dispatch := tg_op = 'INSERT' or (old.status = 'pending' and new.status <> 'cancelled');
  select order_number into order_ref from public.portal_orders where id = new.order_id;
  insert into public.portal_notifications(organization_id, type, title, event_key, order_id, shipment_id)
  values(new.organization_id, case when first_dispatch then 'shipment_created' else 'shipment_updated' end,
    'Shipment for order ' || order_ref || case when first_dispatch then ' dispatched' else ' updated' end,
    'shipment:' || gen_random_uuid(), new.order_id, new.id);
  return null;
end;
$$;
create trigger portal_shipment_notify after insert or update on public.portal_shipments
for each row execute function pdc_private.record_shipment_event();

create function pdc_private.record_finance_event() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if tg_table_name = 'portal_quotes' then
    if new.status = 'draft' or new.status = 'cancelled' then return null; end if;
    insert into public.portal_notifications(organization_id, type, title, event_key, order_id, quote_id)
    values(new.organization_id, 'quote_issued', 'Estimate ' || new.quote_number || ' is available', 'quote:' || new.id, new.order_id, new.id)
    on conflict (event_key) do nothing;
  elsif new.status not in ('void', 'credited') then
    insert into public.portal_notifications(organization_id, type, title, event_key, order_id, invoice_id)
    values(new.organization_id, 'invoice_issued', 'Invoice ' || new.invoice_number || ' is available', 'invoice:' || new.id, new.order_id, new.id)
    on conflict (event_key) do nothing;
  end if;
  return null;
end;
$$;
create trigger portal_quote_notify after insert or update of status on public.portal_quotes
for each row execute function pdc_private.record_finance_event();
create trigger portal_invoice_notify after insert or update of status on public.portal_invoices
for each row execute function pdc_private.record_finance_event();

-- No writes are granted on operational tables to end-user roles. These RPCs
-- check current permissions and issue the authorized changes as one transaction.
create function pdc_private.admin_mutate(action text, payload jsonb) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  actor uuid := auth.uid();
  required_permission text;
  change_reason text := nullif(trim(payload->>'reason'), '');
  target_company uuid;
  target_order uuid;
  target_shipment uuid;
  target_id uuid;
  order_row public.portal_orders%rowtype;
  previous_shipment public.portal_shipments%rowtype;
  shipment_status public.portal_shipment_status;
  shipment_items jsonb;
  shipment_items_changed boolean := true;
  shipment_fields_changed boolean;
  changed_field text;
  protected_change boolean;
  invite_email text;
begin
  required_permission := case action
    when 'update_order' then 'orders.write'
    when 'set_override_protection' then 'orders.write'
    when 'add_note' then 'notes.write'
    when 'save_shipment' then 'shipping.write'
    when 'register_document' then 'documents.manage'
    when 'update_company' then 'customers.manage'
    when 'create_company' then 'customers.manage'
    when 'set_membership' then 'customers.manage'
    when 'create_invitation' then 'customers.manage'
    when 'revoke_invitation' then 'customers.manage'
    else null
  end;
  if actor is null or required_permission is null or not pdc_private.has_permission(required_permission) then
    raise exception 'Portal permission denied' using errcode = '42501';
  end if;
  if jsonb_typeof(payload) <> 'object' or length(payload::text) > 100000 or length(change_reason) > 1000 then
    raise exception 'Invalid portal action payload' using errcode = '22023';
  end if;

  perform set_config('pdc.change_source', 'portal_admin', true);
  perform set_config('pdc.change_reason', coalesce(change_reason, ''), true);

  if action in ('update_order','set_override_protection','add_note','save_shipment')
    or (action = 'register_document' and payload->>'order_id' is not null) then
    target_order := (payload->>'order_id')::uuid;
    select * into strict order_row from public.portal_orders where id = target_order for no key update;
    target_company := order_row.organization_id;
  elsif action = 'register_document' then
    if not pdc_private.has_permission('finance.read') then
      raise exception 'Financial document permission denied' using errcode = '42501';
    end if;
    if payload->>'kind' = 'invoice' and payload->>'invoice_id' is not null
      and payload->>'quote_id' is null and payload->>'shipment_id' is null then
      select organization_id into strict target_company from public.portal_invoices where id = (payload->>'invoice_id')::uuid;
    elsif payload->>'kind' = 'quote' and payload->>'quote_id' is not null
      and payload->>'invoice_id' is null and payload->>'shipment_id' is null then
      select organization_id into strict target_company from public.portal_quotes where id = (payload->>'quote_id')::uuid;
    else
      raise exception 'Document must reference an order, invoice, or quote' using errcode = '22023';
    end if;
  elsif action <> 'create_company' then
    target_company := (payload->>'organization_id')::uuid;
    perform 1 from public.portal_organizations where id = target_company for update;
    if not found then raise exception 'Company not found' using errcode = '22023'; end if;
  end if;

  if action = 'update_order' then
    if change_reason is null then raise exception 'A change reason is required' using errcode = '22023'; end if;
    protected_change := coalesce((payload->>'protected')::boolean, true);
    for changed_field in
      select key from jsonb_each(payload)
      where key in ('status','estimated_ship_date','estimated_delivery_date')
        and (to_jsonb(order_row)->key) is distinct from value
    loop
      insert into public.portal_manual_overrides(organization_id, order_id, field_name, protected, reason, updated_by)
      values(target_company, target_order, changed_field, protected_change, change_reason, actor)
      on conflict (order_id, field_name) do update
      set protected = excluded.protected, reason = excluded.reason, updated_by = actor, updated_at = now();
    end loop;
    update public.portal_orders set
      status = case when payload ? 'status' then (payload->>'status')::public.portal_order_status else order_row.status end,
      estimated_ship_date = case when payload ? 'estimated_ship_date' then (payload->>'estimated_ship_date')::date else order_row.estimated_ship_date end,
      estimated_delivery_date = case when payload ? 'estimated_delivery_date' then (payload->>'estimated_delivery_date')::date else order_row.estimated_delivery_date end
    where id = target_order;
    return target_order;

  elsif action = 'set_override_protection' then
    if change_reason is null then raise exception 'A change reason is required' using errcode = '22023'; end if;
    update public.portal_manual_overrides set protected = (payload->>'protected')::boolean,
      reason = change_reason, updated_by = actor, updated_at = now()
    where order_id = target_order and field_name = payload->>'field_name';
    if not found then raise exception 'Override not found' using errcode = '22023'; end if;
    return target_order;

  elsif action = 'add_note' then
    insert into public.portal_order_notes(organization_id, order_id, body, customer_visible, author_id)
    values(target_company, target_order, trim(payload->>'body'), coalesce((payload->>'customer_visible')::boolean,false), actor)
    returning id into target_id;

  elsif action = 'save_shipment' then
    shipment_items := payload->'items';
    shipment_status := (payload->>'status')::public.portal_shipment_status;
    if jsonb_typeof(shipment_items) is distinct from 'array' then
      raise exception 'Shipment lines are required' using errcode = '22023';
    end if;
    if jsonb_array_length(shipment_items) > 500
      or (shipment_status not in ('pending','cancelled') and jsonb_array_length(shipment_items) = 0) then
      raise exception 'Invalid shipment lines' using errcode = '22023';
    end if;
    if exists (
      select 1 from jsonb_to_recordset(shipment_items) as row(quantity numeric)
      where row.quantity is null or row.quantity <= 0 or scale(trim_scale(row.quantity)) > 4
    ) then
      raise exception 'Invalid shipment quantities' using errcode = '22023';
    end if;
    target_shipment := (payload->>'shipment_id')::uuid;
    if target_shipment is not null then
      if change_reason is null then raise exception 'A correction reason is required' using errcode = '22023'; end if;
      select * into previous_shipment from public.portal_shipments
      where id = target_shipment and order_id = target_order for update;
      if not found then raise exception 'Shipment not found' using errcode = '22023'; end if;
      with submitted as (
        select * from jsonb_to_recordset(shipment_items) as row(order_item_id uuid,quantity numeric)
      ), existing as (
        select order_item_id,quantity from public.portal_shipment_items where shipment_id = target_shipment
      )
      select exists (select * from submitted except all select * from existing)
        or exists (select * from existing except all select * from submitted)
      into shipment_items_changed;
      if shipment_items_changed then
        -- Remove old allocations first so reallocations are checked against
        -- the final set, including when restoring a previously void shipment.
        delete from public.portal_shipment_items where shipment_id = target_shipment;
      end if;
      shipment_fields_changed := row(previous_shipment.carrier,previous_shipment.tracking_number,
        previous_shipment.ship_date,previous_shipment.status,previous_shipment.delivered_at)
        is distinct from row(nullif(trim(payload->>'carrier'), ''),nullif(trim(payload->>'tracking_number'), ''),
          (payload->>'ship_date')::date,shipment_status,(payload->>'delivered_at')::timestamptz);
      update public.portal_shipments set
        carrier = nullif(trim(payload->>'carrier'), ''),
        tracking_number = nullif(trim(payload->>'tracking_number'), ''),
        ship_date = (payload->>'ship_date')::date,
        status = shipment_status,
        delivered_at = (payload->>'delivered_at')::timestamptz
      where id = target_shipment and shipment_fields_changed;
    else
      insert into public.portal_shipments(organization_id, order_id, carrier, tracking_number, ship_date, status, delivered_at)
      values(target_company, target_order, nullif(trim(payload->>'carrier'), ''), nullif(trim(payload->>'tracking_number'), ''),
        (payload->>'ship_date')::date, shipment_status, (payload->>'delivered_at')::timestamptz)
      returning id into target_shipment;
    end if;
    if shipment_items_changed then
      insert into public.portal_shipment_items(shipment_id, order_item_id, order_id, organization_id, quantity)
      select target_shipment, row.order_item_id, target_order, target_company, row.quantity
      from jsonb_to_recordset(shipment_items) as row(order_item_id uuid, quantity numeric);
      if shipment_fields_changed is false and shipment_status in ('shipped','in_transit','delivered') then
        insert into public.portal_notifications(organization_id, type, title, event_key, order_id, shipment_id)
        values(target_company, 'shipment_updated', 'Shipment quantities updated for order ' || order_row.order_number,
          'shipment-quantities:' || gen_random_uuid(), target_order, target_shipment);
      end if;
    end if;
    return target_shipment;

  elsif action = 'register_document' then
    if (payload->>'kind' in ('invoice','quote') or payload->>'invoice_id' is not null or payload->>'quote_id' is not null)
      and not pdc_private.has_permission('finance.read') then
      raise exception 'Financial document permission denied' using errcode = '42501';
    end if;
    insert into public.portal_documents(id, organization_id, order_id, shipment_id, invoice_id, quote_id, kind, title, object_path,
      size_bytes, customer_visible, created_by)
    values((payload->>'id')::uuid, target_company, target_order, (payload->>'shipment_id')::uuid,
      (payload->>'invoice_id')::uuid, (payload->>'quote_id')::uuid, payload->>'kind',
      trim(payload->>'title'), payload->>'object_path', (payload->>'size_bytes')::bigint,
      coalesce((payload->>'customer_visible')::boolean,false), actor)
    returning id into target_id;

  elsif action = 'create_company' then
    if change_reason is null then raise exception 'A change reason is required' using errcode = '22023'; end if;
    insert into public.portal_organizations(name, account_number, contact_email, contact_phone)
    values(trim(payload->>'name'), nullif(trim(payload->>'account_number'), ''),
      nullif(lower(trim(payload->>'contact_email')), ''), nullif(trim(payload->>'contact_phone'), ''))
    returning id into target_id;

  elsif action = 'update_company' then
    if change_reason is null then raise exception 'A change reason is required' using errcode = '22023'; end if;
    update public.portal_organizations set name = trim(payload->>'name'),
      contact_email = nullif(lower(trim(payload->>'contact_email')), ''),
      contact_phone = nullif(trim(payload->>'contact_phone'), '')
    where id = target_company returning id into target_id;

  elsif action = 'set_membership' then
    if payload ? 'can_view_financials' and not pdc_private.has_permission('finance.read') then
      raise exception 'Financial access permission denied' using errcode = '42501';
    end if;
    update public.portal_memberships set
      active = (payload->>'active')::boolean,
      can_view_financials = case when payload ? 'can_view_financials'
        then (payload->>'can_view_financials')::boolean else can_view_financials end
    where organization_id = target_company and user_id = (payload->>'user_id')::uuid
    returning user_id into target_id;
    if not found then raise exception 'Membership not found' using errcode = '22023'; end if;
    if not (payload->>'active')::boolean then
      update public.portal_invitations set status = 'revoked'
      where organization_id = target_company and status = 'pending'
        and email = (select lower(u.email) from auth.users u where u.id = target_id);
    end if;

  elsif action = 'create_invitation' then
    if coalesce((payload->>'can_view_financials')::boolean, false) and not pdc_private.has_permission('finance.read') then
      raise exception 'Financial access permission denied' using errcode = '42501';
    end if;
    invite_email := lower(trim(payload->>'email'));
    if invite_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then
      raise exception 'Invalid invitation email' using errcode = '22023';
    end if;
    if not exists (select 1 from public.portal_organizations where id = target_company and active) then
      raise exception 'Inactive company' using errcode = '22023';
    end if;
    update public.portal_invitations set status = 'revoked'
    where organization_id = target_company and email = invite_email and status = 'pending';
    insert into public.portal_invitations(organization_id, email, can_view_financials, created_by)
    values(target_company, invite_email, coalesce((payload->>'can_view_financials')::boolean,false), actor)
    returning id into target_id;
    insert into pdc_private.invitation_tokens(invitation_id, token_hash) values(target_id, payload->>'token_hash');

  elsif action = 'revoke_invitation' then
    update public.portal_invitations set status = 'revoked'
    where organization_id = target_company and id = (payload->>'invitation_id')::uuid and status = 'pending'
    returning id into target_id;
    if not found then raise exception 'Pending invitation not found' using errcode = '22023'; end if;
  end if;
  return target_id;
end;
$$;

create function public.portal_admin_mutate(action text, payload jsonb) returns uuid
language sql set search_path = '' as $$ select pdc_private.admin_mutate(action, payload) $$;

create function pdc_private.set_profile(display_name text, phone_number text, preferences jsonb) returns void
language plpgsql security definer set search_path = '' as $$
declare actor uuid := auth.uid();
begin
  if actor is null then raise exception 'Portal permission denied' using errcode = '42501'; end if;
  if jsonb_typeof(preferences) is distinct from 'object' or length(preferences::text) > 250 then
    raise exception 'Invalid profile preferences' using errcode = '22023';
  end if;
  if exists (
    select 1 from jsonb_each(preferences)
    where key not in ('quotes','orders','shipments','invoices') or jsonb_typeof(value) <> 'boolean'
  ) then
    raise exception 'Invalid profile preferences' using errcode = '22023';
  end if;
  insert into public.portal_profiles(user_id, full_name, email, phone, notification_preferences)
  select actor, nullif(trim(display_name), ''), u.email, nullif(trim(phone_number), ''), preferences
  from auth.users as u where u.id = actor
  on conflict (user_id) do update set full_name = excluded.full_name, email = excluded.email,
    phone = excluded.phone, notification_preferences = excluded.notification_preferences, updated_at = now();
end;
$$;
create function public.portal_set_profile(display_name text, phone_number text, preferences jsonb) returns void
language sql set search_path = '' as $$ select pdc_private.set_profile(display_name, phone_number, preferences) $$;

create function pdc_private.mark_notification_read(target_id uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare actor uuid := auth.uid();
begin
  if actor is null or not exists (
    select 1 from public.portal_notifications where id = target_id
    and pdc_private.company_access(organization_id, type in ('quote_issued', 'invoice_issued'))
  ) then
    raise exception 'Portal permission denied' using errcode = '42501';
  end if;
  insert into public.portal_notification_reads(notification_id,user_id)
  values(target_id, actor) on conflict do nothing;
end;
$$;
create function public.portal_mark_notification_read(target_id uuid) returns void
language sql set search_path = '' as $$ select pdc_private.mark_notification_read(target_id) $$;

-- Only a verified Auth account matching the addressed invitation can redeem
-- its proof. Revoked and expired invitations are rejected at transaction time.
create function pdc_private.accept_invitation(target_id uuid, proof text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  actor uuid := auth.uid();
  invite public.portal_invitations%rowtype;
  company_id uuid;
begin
  if actor is null then raise exception 'Portal permission denied' using errcode = '42501'; end if;
  select organization_id into company_id from public.portal_invitations where id = target_id;
  perform 1 from public.portal_organizations where id = company_id and active for update;
  select i.* into invite
  from public.portal_invitations i
  join pdc_private.invitation_tokens t on t.invitation_id = i.id
  join public.portal_organizations o on o.id = i.organization_id and o.active
  join auth.users u on u.id = actor and lower(u.email) = i.email and u.email_confirmed_at is not null
  where i.id = target_id and t.token_hash = proof and i.status = 'pending' and i.expires_at > now()
  for update of i;
  if not found then raise exception 'Invalid or expired invitation' using errcode = '42501'; end if;

  perform set_config('pdc.change_source', 'portal_invitation', true);
  insert into public.portal_profiles(user_id, email) values(actor, invite.email)
  on conflict (user_id) do update set email = excluded.email;
  insert into public.portal_memberships(organization_id,user_id,active,can_view_financials)
  values(invite.organization_id, actor, true, invite.can_view_financials)
  on conflict (organization_id,user_id) do update
  set active = true, can_view_financials = public.portal_memberships.can_view_financials or excluded.can_view_financials;
  update public.portal_invitations set status = 'accepted', accepted_at = now() where id = invite.id;
  delete from pdc_private.invitation_tokens where invitation_id = invite.id;
  return invite.organization_id;
end;
$$;
create function public.portal_accept_invitation(target_id uuid, proof text) returns uuid
language sql set search_path = '' as $$ select pdc_private.accept_invitation(target_id, proof) $$;

create function pdc_private.invitation_claim_email(target_id uuid, proof text) returns text
language sql stable security definer set search_path = '' as $$
  select i.email
  from public.portal_invitations i
  join pdc_private.invitation_tokens t on t.invitation_id = i.id
  join public.portal_organizations o on o.id = i.organization_id and o.active
  where i.id = target_id and t.token_hash = proof and i.status = 'pending' and i.expires_at > now()
$$;
create function public.portal_invitation_claim_email(target_id uuid, proof text) returns text
language sql stable set search_path = '' as $$ select pdc_private.invitation_claim_email(target_id, proof) $$;

revoke all on function pdc_private.validate_fulfillment(), pdc_private.audit_change(),
  pdc_private.record_order_event(), pdc_private.record_shipment_event(), pdc_private.record_finance_event()
from public, anon, authenticated;
revoke all on function pdc_private.admin_mutate(text,jsonb), public.portal_admin_mutate(text,jsonb),
  pdc_private.set_profile(text,text,jsonb), public.portal_set_profile(text,text,jsonb),
  pdc_private.mark_notification_read(uuid), public.portal_mark_notification_read(uuid),
  pdc_private.accept_invitation(uuid,text), public.portal_accept_invitation(uuid,text),
  pdc_private.invitation_claim_email(uuid,text), public.portal_invitation_claim_email(uuid,text)
from public, anon, authenticated;
grant execute on function pdc_private.admin_mutate(text,jsonb), public.portal_admin_mutate(text,jsonb),
  pdc_private.set_profile(text,text,jsonb), public.portal_set_profile(text,text,jsonb),
  pdc_private.mark_notification_read(uuid), public.portal_mark_notification_read(uuid),
  pdc_private.accept_invitation(uuid,text), public.portal_accept_invitation(uuid,text)
to authenticated;
grant execute on function pdc_private.invitation_claim_email(uuid,text), public.portal_invitation_claim_email(uuid,text)
to service_role;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('pdc-portal-documents', 'pdc-portal-documents', false, 10485760, array['application/pdf']);

-- Signing through the user's client uses the same record-level RLS as portal
-- metadata. The bucket is private and clients have no insert/update access.
create policy portal_document_storage_read on storage.objects for select to authenticated using (
  bucket_id = 'pdc-portal-documents'
  and exists (select 1 from public.portal_documents as d where d.object_path = name)
);
