-- Customer records are scoped by organization. Composite foreign keys keep
-- every child on the same tenant and, where relevant, the same order.
create schema if not exists pdc_private;
revoke all on schema pdc_private from public;
grant usage on schema pdc_private to authenticated, service_role;

create type public.portal_staff_role as enum
  ('super_admin', 'operations', 'sales', 'shipping', 'finance', 'integration_operator');
create type public.portal_order_status as enum
  ('received', 'confirmed', 'in_production', 'production_completed', 'ready_to_ship',
   'partially_shipped', 'shipped', 'delivered', 'closed', 'cancelled');
create type public.portal_shipment_status as enum
  ('pending', 'shipped', 'in_transit', 'delivered', 'cancelled');

create table public.portal_organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) between 1 and 200),
  account_number text unique check (length(trim(account_number)) between 1 and 100),
  contact_email text check (length(contact_email) <= 254),
  contact_phone text check (length(contact_phone) <= 60),
  billing_address jsonb check (billing_address is null or jsonb_typeof(billing_address) = 'object'),
  shipping_addresses jsonb not null default '[]' check (jsonb_typeof(shipping_addresses) = 'array'),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.portal_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text check (length(full_name) <= 200),
  email text check (length(email) <= 254),
  phone text check (length(phone) <= 60),
  notification_preferences jsonb not null default '{"quotes":false,"orders":false,"shipments":false,"invoices":false}'
    check (jsonb_typeof(notification_preferences) = 'object'),
  updated_at timestamptz not null default now()
);

create table public.portal_memberships (
  organization_id uuid not null references public.portal_organizations(id),
  user_id uuid not null references auth.users(id) on delete cascade,
  active boolean not null default true,
  can_view_financials boolean not null default false,
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);
create index portal_memberships_user_idx on public.portal_memberships(user_id, organization_id) where active;

create table public.portal_staff (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role public.portal_staff_role not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.portal_invitations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.portal_organizations(id),
  email text not null check (email = lower(trim(email)) and length(email) between 3 and 254),
  can_view_financials boolean not null default false,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'revoked')),
  expires_at timestamptz not null default (now() + interval '72 hours'),
  accepted_at timestamptz,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null
);
create unique index portal_invitations_pending_idx on public.portal_invitations(organization_id, email) where status = 'pending';

-- Invitation secrets never enter a Data API table or an audit snapshot.
create table pdc_private.invitation_tokens (
  invitation_id uuid primary key references public.portal_invitations(id) on delete cascade,
  token_hash text not null unique check (token_hash ~ '^[a-f0-9]{64}$')
);
alter table pdc_private.invitation_tokens enable row level security;

create table public.portal_orders (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.portal_organizations(id),
  order_number text not null check (length(trim(order_number)) between 1 and 120),
  customer_po text check (length(customer_po) <= 120),
  order_date date not null,
  status public.portal_order_status not null default 'received',
  estimated_ship_date date,
  estimated_delivery_date date,
  external_source text,
  external_id text,
  external_updated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, organization_id),
  unique (organization_id, order_number),
  unique (external_source, external_id),
  check ((external_source is null) = (external_id is null))
);
create index portal_orders_company_date_idx on public.portal_orders(organization_id, order_date desc, id);
create index portal_orders_status_idx on public.portal_orders(status, order_date desc);

create table public.portal_order_items (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null,
  order_id uuid not null,
  line_number integer not null check (line_number > 0),
  sku text,
  description text not null check (length(trim(description)) > 0),
  quantity_ordered numeric(16,4) not null check (quantity_ordered > 0),
  external_id text,
  unique (id, organization_id),
  unique (id, order_id, organization_id),
  unique (order_id, line_number),
  unique (order_id, external_id),
  foreign key (order_id, organization_id) references public.portal_orders(id, organization_id)
);
create index portal_order_items_tenant_idx on public.portal_order_items(organization_id);

-- Unit prices and line totals use a separate policy from operational data.
create table public.portal_order_item_prices (
  order_item_id uuid primary key,
  organization_id uuid not null,
  currency text not null check (currency ~ '^[A-Z]{3}$'),
  unit_price numeric(18,4) not null,
  line_total numeric(18,4) not null,
  foreign key (order_item_id, organization_id) references public.portal_order_items(id, organization_id)
);
create index portal_order_item_prices_tenant_idx on public.portal_order_item_prices(organization_id);

create table public.portal_order_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null,
  order_id uuid not null,
  status public.portal_order_status not null,
  occurred_at timestamptz not null default now(),
  note text,
  source text not null default 'portal',
  actor_id uuid references auth.users(id) on delete set null,
  foreign key (order_id, organization_id) references public.portal_orders(id, organization_id)
);
create index portal_order_events_order_idx on public.portal_order_events(order_id, occurred_at desc);
create index portal_order_events_tenant_idx on public.portal_order_events(organization_id, occurred_at desc);

create table public.portal_order_notes (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null,
  order_id uuid not null,
  body text not null check (length(trim(body)) between 1 and 4000),
  customer_visible boolean not null default false,
  author_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  foreign key (order_id, organization_id) references public.portal_orders(id, organization_id)
);
create index portal_order_notes_order_idx on public.portal_order_notes(order_id, created_at desc);
create index portal_order_notes_tenant_idx on public.portal_order_notes(organization_id);

create table public.portal_shipments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null,
  order_id uuid not null,
  carrier text check (length(carrier) <= 80),
  tracking_number text check (length(tracking_number) <= 160),
  ship_date date,
  status public.portal_shipment_status not null default 'pending',
  delivered_at timestamptz,
  external_source text,
  external_id text,
  external_updated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, organization_id),
  unique (id, order_id, organization_id),
  unique (external_source, external_id),
  check ((external_source is null) = (external_id is null)),
  check (status not in ('shipped', 'in_transit', 'delivered') or ship_date is not null),
  check (delivered_at is null or (status in ('delivered', 'cancelled') and ship_date <= (delivered_at at time zone 'UTC')::date)),
  foreign key (order_id, organization_id) references public.portal_orders(id, organization_id)
);
create index portal_shipments_order_idx on public.portal_shipments(order_id, ship_date desc);
create index portal_shipments_tenant_idx on public.portal_shipments(organization_id, ship_date desc);

create table public.portal_shipment_items (
  shipment_id uuid not null,
  order_item_id uuid not null,
  order_id uuid not null,
  organization_id uuid not null,
  quantity numeric(16,4) not null check (quantity > 0),
  primary key (shipment_id, order_item_id),
  foreign key (shipment_id, order_id, organization_id) references public.portal_shipments(id, order_id, organization_id),
  foreign key (order_item_id, order_id, organization_id) references public.portal_order_items(id, order_id, organization_id)
);
create index portal_shipment_items_line_idx on public.portal_shipment_items(order_item_id);
create index portal_shipment_items_tenant_idx on public.portal_shipment_items(organization_id);

create table public.portal_quotes (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.portal_organizations(id),
  quote_number text not null,
  quote_date date not null,
  valid_until date,
  status text not null check (status in ('draft', 'issued', 'accepted', 'declined', 'expired', 'cancelled')),
  currency text not null check (currency ~ '^[A-Z]{3}$'),
  total_amount numeric(18,4),
  order_id uuid,
  external_source text,
  external_id text,
  external_updated_at timestamptz,
  created_at timestamptz not null default now(),
  unique (id, organization_id),
  unique (organization_id, quote_number),
  unique (external_source, external_id),
  check ((external_source is null) = (external_id is null)),
  foreign key (order_id, organization_id) references public.portal_orders(id, organization_id)
);
create index portal_quotes_company_date_idx on public.portal_quotes(organization_id, quote_date desc);

create table public.portal_quote_items (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null,
  quote_id uuid not null,
  line_number integer not null check (line_number > 0),
  sku text,
  description text not null,
  quantity numeric(16,4) not null check (quantity > 0),
  unit_price numeric(18,4),
  unique (quote_id, line_number),
  foreign key (quote_id, organization_id) references public.portal_quotes(id, organization_id)
);
create index portal_quote_items_tenant_idx on public.portal_quote_items(organization_id);

create table public.portal_invoices (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.portal_organizations(id),
  order_id uuid,
  invoice_number text not null,
  invoice_date date not null,
  due_date date,
  currency text not null check (currency ~ '^[A-Z]{3}$'),
  total_amount numeric(18,4) not null,
  outstanding_amount numeric(18,4) not null,
  status text not null check (status in ('open', 'partially_paid', 'paid', 'overdue', 'void', 'credited')),
  external_source text,
  external_id text,
  external_updated_at timestamptz,
  created_at timestamptz not null default now(),
  unique (id, organization_id),
  unique (id, organization_id, currency),
  unique (organization_id, invoice_number),
  unique (external_source, external_id),
  check ((external_source is null) = (external_id is null)),
  foreign key (order_id, organization_id) references public.portal_orders(id, organization_id)
);
create index portal_invoices_tenant_date_idx on public.portal_invoices(organization_id, invoice_date desc);

create table public.portal_payments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.portal_organizations(id),
  invoice_id uuid,
  payment_reference text,
  payment_date date not null,
  currency text not null check (currency ~ '^[A-Z]{3}$'),
  amount numeric(18,4) not null,
  external_source text,
  external_id text,
  external_updated_at timestamptz,
  created_at timestamptz not null default now(),
  unique (external_source, external_id),
  check ((external_source is null) = (external_id is null)),
  foreign key (invoice_id, organization_id, currency) references public.portal_invoices(id, organization_id, currency)
);
create index portal_payments_tenant_date_idx on public.portal_payments(organization_id, payment_date desc, id);

create table public.portal_documents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.portal_organizations(id),
  order_id uuid,
  quote_id uuid,
  invoice_id uuid,
  shipment_id uuid,
  kind text not null check (kind in ('order_confirmation', 'packing_slip', 'invoice', 'quote', 'product_documentation', 'shipping_document', 'other')),
  title text not null check (length(trim(title)) between 1 and 200),
  object_path text not null unique,
  mime_type text not null default 'application/pdf' check (mime_type = 'application/pdf'),
  size_bytes bigint not null check (size_bytes between 1 and 10485760),
  customer_visible boolean not null default false,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  check (object_path = organization_id::text || '/' || id::text || '.pdf'),
  foreign key (order_id, organization_id) references public.portal_orders(id, organization_id),
  foreign key (quote_id, organization_id) references public.portal_quotes(id, organization_id),
  foreign key (invoice_id, organization_id) references public.portal_invoices(id, organization_id),
  foreign key (shipment_id, organization_id) references public.portal_shipments(id, organization_id),
  foreign key (shipment_id, order_id, organization_id) references public.portal_shipments(id, order_id, organization_id)
);
create index portal_documents_tenant_idx on public.portal_documents(organization_id, created_at desc);
create index portal_documents_order_idx on public.portal_documents(order_id);
create index portal_documents_quote_idx on public.portal_documents(quote_id);
create index portal_documents_invoice_idx on public.portal_documents(invoice_id);
create index portal_documents_shipment_idx on public.portal_documents(shipment_id);

create table public.portal_manual_overrides (
  organization_id uuid not null,
  order_id uuid not null,
  field_name text not null check (field_name in ('status', 'estimated_ship_date', 'estimated_delivery_date')),
  protected boolean not null default true,
  reason text not null check (length(trim(reason)) between 1 and 1000),
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now(),
  primary key (order_id, field_name),
  foreign key (order_id, organization_id) references public.portal_orders(id, organization_id)
);
create index portal_manual_overrides_tenant_idx on public.portal_manual_overrides(organization_id);

create table public.portal_audit_log (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.portal_organizations(id) on delete set null,
  table_name text not null,
  record_id uuid,
  operation text not null check (operation in ('INSERT', 'UPDATE', 'DELETE')),
  changed_by uuid,
  change_source text not null,
  reason text,
  previous_value jsonb,
  new_value jsonb,
  created_at timestamptz not null default now()
);
create index portal_audit_log_created_idx on public.portal_audit_log(created_at desc);
create index portal_audit_log_record_idx on public.portal_audit_log(table_name, record_id, created_at desc);

create table public.portal_notifications (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.portal_organizations(id),
  type text not null check (type in ('quote_issued', 'order_status', 'shipment_created', 'shipment_updated', 'invoice_issued', 'order_corrected')),
  title text not null,
  event_key text not null unique,
  order_id uuid,
  shipment_id uuid,
  quote_id uuid,
  invoice_id uuid,
  created_at timestamptz not null default now(),
  foreign key (order_id, organization_id) references public.portal_orders(id, organization_id),
  foreign key (shipment_id, organization_id) references public.portal_shipments(id, organization_id),
  foreign key (quote_id, organization_id) references public.portal_quotes(id, organization_id),
  foreign key (invoice_id, organization_id) references public.portal_invoices(id, organization_id)
);
create index portal_notifications_tenant_created_idx on public.portal_notifications(organization_id, created_at desc);

create table public.portal_notification_reads (
  notification_id uuid not null references public.portal_notifications(id),
  user_id uuid not null references auth.users(id) on delete cascade,
  read_at timestamptz not null default now(),
  primary key (notification_id, user_id)
);
create index portal_notification_reads_user_idx on public.portal_notification_reads(user_id);

-- Private lookup functions avoid recursive RLS. Permissions are read from live
-- rows on each request so deactivation takes effect with existing sessions.
create function pdc_private.has_permission(permission_name text) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.portal_staff as s
    join auth.users u on u.id = s.user_id and u.email_confirmed_at is not null
    where s.user_id = (select auth.uid()) and s.active
      and (s.role = 'super_admin' or permission_name = any(
        case s.role
          when 'operations' then array['customers.read','orders.read','orders.write','shipping.read','shipping.write','documents.manage','notes.write','integrations.read','integrations.manage','integrations.schedule','audit.read']
          when 'sales' then array['customers.read','customers.manage','orders.read','orders.write','shipping.read','documents.manage','notes.write']
          when 'shipping' then array['orders.read','shipping.read','shipping.write','documents.manage','notes.write']
          when 'finance' then array['customers.read','orders.read','finance.read','documents.manage','audit.read']
          when 'integration_operator' then array['integrations.read','integrations.schedule']
          else array[]::text[]
        end
      ))
  );
$$;

create function pdc_private.company_access(company_id uuid, finance boolean default false) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1
    from public.portal_memberships as m
    join public.portal_organizations as o on o.id = m.organization_id
    join auth.users u on u.id = m.user_id and u.email_confirmed_at is not null
    where m.user_id = (select auth.uid())
      and m.organization_id = company_id and m.active and o.active
      and (not finance or m.can_view_financials)
  );
$$;

create function pdc_private.shared_company(member_id uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.portal_memberships as m
    where m.user_id = member_id and m.active and pdc_private.company_access(m.organization_id)
  );
$$;

revoke all on function pdc_private.has_permission(text), pdc_private.company_access(uuid,boolean),
  pdc_private.shared_company(uuid) from public;
grant execute on function pdc_private.has_permission(text), pdc_private.company_access(uuid,boolean),
  pdc_private.shared_company(uuid) to authenticated;

-- On older Supabase projects default grants may otherwise expose new tables.
do $$
declare table_name text;
begin
  foreach table_name in array array[
    'portal_organizations','portal_profiles','portal_memberships','portal_staff','portal_invitations',
    'portal_orders','portal_order_items','portal_order_item_prices','portal_order_events','portal_order_notes',
    'portal_shipments','portal_shipment_items','portal_quotes','portal_quote_items','portal_invoices','portal_payments',
    'portal_documents','portal_manual_overrides','portal_audit_log','portal_notifications','portal_notification_reads'
  ]
  loop
    execute format('alter table public.%I enable row level security', table_name);
    execute format('revoke all on public.%I from public, anon, authenticated', table_name);
    execute format('grant select on public.%I to authenticated', table_name);
    execute format('grant select, insert, update, delete on public.%I to service_role', table_name);
  end loop;
end $$;

-- Audit records are append-only through owner-run triggers even for a
-- service-key holder. Operations cannot edit the history they generated.
revoke insert, update, delete, truncate on public.portal_audit_log from service_role;

create policy organization_read on public.portal_organizations for select to authenticated using (
  pdc_private.company_access(id) or (select pdc_private.has_permission('customers.read'))
  or (select pdc_private.has_permission('orders.read'))
);
create policy profile_read on public.portal_profiles for select to authenticated using (
  user_id = (select auth.uid()) or pdc_private.shared_company(user_id)
  or (select pdc_private.has_permission('customers.read'))
);
create policy membership_read on public.portal_memberships for select to authenticated using (
  (active and pdc_private.company_access(organization_id))
  or (select pdc_private.has_permission('customers.read'))
);
create policy staff_read on public.portal_staff for select to authenticated using (user_id = (select auth.uid()));
create policy invitation_read on public.portal_invitations for select to authenticated
  using ((select pdc_private.has_permission('customers.manage')));

do $$
declare table_name text;
begin
  foreach table_name in array array['portal_orders','portal_order_items','portal_order_events']
  loop
    execute format('create policy order_read on public.%I for select to authenticated using
      (pdc_private.company_access(organization_id) or (select pdc_private.has_permission(''orders.read'')))', table_name);
  end loop;

  foreach table_name in array array['portal_shipments','portal_shipment_items']
  loop
    execute format('create policy shipping_read on public.%I for select to authenticated using
      (pdc_private.company_access(organization_id) or (select pdc_private.has_permission(''shipping.read'')))', table_name);
  end loop;

  foreach table_name in array array['portal_order_item_prices','portal_invoices','portal_payments']
  loop
    execute format('create policy finance_read on public.%I for select to authenticated using
      (pdc_private.company_access(organization_id, true) or (select pdc_private.has_permission(''finance.read'')))', table_name);
  end loop;
end $$;

create policy quote_read on public.portal_quotes for select to authenticated using (
  (status <> 'draft' and pdc_private.company_access(organization_id, true))
  or (select pdc_private.has_permission('finance.read'))
);
create policy quote_item_read on public.portal_quote_items for select to authenticated using (
  exists (select 1 from public.portal_quotes q where q.id = quote_id)
);
create policy note_read on public.portal_order_notes for select to authenticated using (
  (customer_visible and pdc_private.company_access(organization_id))
  or (select pdc_private.has_permission('notes.write'))
);
create policy document_read on public.portal_documents for select to authenticated using (
  (customer_visible and pdc_private.company_access(organization_id,
    invoice_id is not null or quote_id is not null or kind in ('invoice','quote'))
   and (quote_id is null or exists (select 1 from public.portal_quotes as q where q.id = quote_id)))
  or (
    (select pdc_private.has_permission('orders.read'))
    and (
      (invoice_id is null and quote_id is null and kind not in ('invoice', 'quote'))
      or (select pdc_private.has_permission('finance.read'))
    )
  )
);
create policy override_read on public.portal_manual_overrides for select to authenticated
  using ((select pdc_private.has_permission('integrations.read')) or (select pdc_private.has_permission('orders.write')));
create policy audit_read on public.portal_audit_log for select to authenticated using (
  (select pdc_private.has_permission('audit.read'))
  and (
    table_name not in ('portal_invoices','portal_payments','portal_order_item_prices','portal_quotes','portal_quote_items')
    or (select pdc_private.has_permission('finance.read'))
  )
  and (
    table_name <> 'portal_documents'
    or (
      coalesce(previous_value->>'kind', '') not in ('invoice', 'quote')
      and coalesce(new_value->>'kind', '') not in ('invoice', 'quote')
      and previous_value->>'invoice_id' is null and previous_value->>'quote_id' is null
      and new_value->>'invoice_id' is null and new_value->>'quote_id' is null
    )
    or (select pdc_private.has_permission('finance.read'))
  )
);
create policy notification_read on public.portal_notifications for select to authenticated
  using (pdc_private.company_access(organization_id, type in ('quote_issued','invoice_issued')));
create policy notification_receipt_read on public.portal_notification_reads for select to authenticated
  using (user_id = (select auth.uid()) and exists (
    select 1 from public.portal_notifications as n where n.id = notification_id
  ));

create view public.portal_line_fulfillment with (security_invoker = true) as
select i.organization_id, i.order_id, i.id as order_item_id,
  i.quantity_ordered,
  coalesce(sum(si.quantity) filter (where s.status in ('shipped','in_transit','delivered')), 0) as quantity_shipped,
  i.quantity_ordered - coalesce(sum(si.quantity) filter (where s.status in ('shipped','in_transit','delivered')), 0) as quantity_remaining,
  round(100 * coalesce(sum(si.quantity) filter (where s.status in ('shipped','in_transit','delivered')), 0) / i.quantity_ordered, 2) as fulfillment_percent
from public.portal_order_items i
left join public.portal_shipment_items si on si.order_item_id = i.id
left join public.portal_shipments s on s.id = si.shipment_id
group by i.id;

create view public.portal_order_fulfillment with (security_invoker = true) as
select organization_id, order_id,
  sum(quantity_ordered) as quantity_ordered, sum(quantity_shipped) as quantity_shipped,
  sum(quantity_remaining) as quantity_remaining,
  round(100 * sum(quantity_shipped) / nullif(sum(quantity_ordered), 0), 2) as fulfillment_percent
from public.portal_line_fulfillment group by organization_id, order_id;

-- Source invoice outstanding values are authoritative. Payments are displayed
-- separately and never subtracted again from already reconciled balances.
create view public.portal_account_balances with (security_invoker = true) as
with invoice_totals as (
  select organization_id, currency, sum(outstanding_amount) as outstanding_amount
  from public.portal_invoices where status not in ('void', 'credited')
  group by organization_id, currency
),
latest_payments as (
  select distinct on (organization_id, currency)
    organization_id, currency, amount as last_payment_amount, payment_date as last_payment_date
  from public.portal_payments
  order by organization_id, currency, payment_date desc, created_at desc, id desc
)
select organization_id, currency, i.outstanding_amount, p.last_payment_amount, p.last_payment_date
from invoice_totals i full join latest_payments p using (organization_id, currency);

revoke all on public.portal_line_fulfillment, public.portal_order_fulfillment, public.portal_account_balances
  from public, anon, authenticated;
grant select on public.portal_line_fulfillment, public.portal_order_fulfillment, public.portal_account_balances
  to authenticated, service_role;
