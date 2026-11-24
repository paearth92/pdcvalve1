-- Contract for an approved export adapter. No Sage endpoints or field names
-- are assumed. Source approval is separate from batch preparation/application.
create table public.portal_erp_sources (
  id uuid not null unique default gen_random_uuid(),
  source_key text primary key check (source_key ~ '^[a-z0-9][a-z0-9_-]{0,47}$'),
  mapping_revision text not null check (char_length(mapping_revision) between 1 and 80),
  approval_reference text not null check (char_length(approval_reference) between 3 and 240),
  active boolean not null default false,
  approved_by uuid references auth.users(id) on delete set null,
  approved_at timestamptz not null default now()
);
create table public.portal_erp_batches (
  id uuid primary key default gen_random_uuid(),
  source_key text not null references public.portal_erp_sources(source_key),
  mapping_revision text not null,
  source_approved_at timestamptz not null,
  source_filename text not null check (char_length(source_filename) between 1 and 180),
  state text not null check (state in ('preview','applied','needs_review','failed')),
  payload jsonb not null check (jsonb_typeof(payload) = 'array'),
  findings jsonb not null default '[]'::jsonb,
  order_count integer not null check (order_count between 1 and 100),
  changed_count integer not null default 0,
  created_at timestamptz not null default now(),
  created_by uuid not null,
  finished_at timestamptz
);
create index portal_erp_batches_recent on public.portal_erp_batches(created_at desc);
create index portal_erp_batches_author on public.portal_erp_batches(created_by, created_at desc);

alter table public.portal_erp_sources enable row level security;
alter table public.portal_erp_batches enable row level security;
revoke all on public.portal_erp_sources, public.portal_erp_batches from public, anon, authenticated;
grant select on public.portal_erp_sources, public.portal_erp_batches to authenticated;
create policy portal_erp_sources_read on public.portal_erp_sources for select to authenticated
  using ((select pdc_private.has_permission('integrations.read')));
create policy portal_erp_batches_read on public.portal_erp_batches for select to authenticated
  using ((select pdc_private.has_permission('integrations.read')));

create trigger audit_erp_source
after insert or update on public.portal_erp_sources
for each row execute function pdc_private.audit_change();

create function pdc_private.approve_erp_source(p_key text, p_revision text, p_reference text, p_active boolean)
returns void language plpgsql security definer set search_path = ''
as $$
begin
  if auth.uid() is null or not pdc_private.has_permission('integrations.erp.approve') then
    raise exception 'ERP source approval permission required' using errcode = '42501';
  end if;
  insert into public.portal_erp_sources(source_key,mapping_revision,approval_reference,active,approved_by)
  values (p_key,btrim(p_revision),btrim(p_reference),p_active,auth.uid())
  on conflict (source_key) do update
    set mapping_revision = excluded.mapping_revision, approval_reference = excluded.approval_reference,
        active = excluded.active, approved_by = excluded.approved_by, approved_at = clock_timestamp();
end;
$$;

create function pdc_private.evaluate_erp_order(p_key text,p_order jsonb,p_apply boolean)
returns jsonb language plpgsql security invoker set search_path = ''
as $$
declare
  v_org uuid;
  v_order public.portal_orders%rowtype;
  v_item public.portal_order_items%rowtype;
  v_source text := 'erp_export:' || p_key;
  v_existing boolean;
  v_same boolean;
  v_changed boolean;
  v_external text := p_order ->> 'external_id';
  v_account text := p_order ->> 'account_number';
  v_number text := p_order ->> 'order_number';
  v_po text := nullif(p_order ->> 'customer_po','');
  v_date date;
  v_updated timestamptz;
  v_lines jsonb := p_order -> 'lines';
  v_line jsonb;
begin
  if jsonb_typeof(p_order) is distinct from 'object' then
    return jsonb_build_object('message','Each order must be an object');
  end if;
  if exists (select 1 from jsonb_object_keys(p_order) k
      where k not in ('external_id','account_number','order_number','customer_po','order_date','updated_at','lines'))
    or exists (
      select 1 from unnest(array['external_id','account_number','order_number','order_date','updated_at']) k
      where jsonb_typeof(p_order -> k) is distinct from 'string'
    ) or (p_order ? 'customer_po' and jsonb_typeof(p_order -> 'customer_po') not in ('string','null'))
    or char_length(v_external) not between 1 and 160 or char_length(v_account) not between 1 and 100
    or char_length(v_number) not between 1 and 120 or v_external <> btrim(v_external)
    or v_account <> btrim(v_account) or v_number <> btrim(v_number)
    or v_external || v_account || v_number ~ '[[:cntrl:]]'
    or coalesce(char_length(v_po),0) > 120
    or (p_order ->> 'order_date') !~ '^\d{4}-\d{2}-\d{2}$'
    or (p_order ->> 'updated_at') !~ '^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$'
    or jsonb_typeof(v_lines) is distinct from 'array'
  then return jsonb_build_object('message','Order fields do not match the approved intake contract'); end if;
  if jsonb_array_length(v_lines) not between 1 and 100 then
    return jsonb_build_object('message','Use 1 to 100 line items per order');
  end if;
  begin
    v_date := (p_order ->> 'order_date')::date;
    v_updated := (p_order ->> 'updated_at')::timestamptz;
  exception when invalid_datetime_format or datetime_field_overflow then
    return jsonb_build_object('message','Order date or update timestamp is invalid');
  end;
  if v_updated > now() + interval '15 minutes' then return jsonb_build_object('message','Order update timestamp is in the future'); end if;
  if exists (select 1 from jsonb_array_elements(v_lines) l where jsonb_typeof(l) is distinct from 'object')
    or exists (
      select 1 from jsonb_array_elements(v_lines) l
      cross join lateral jsonb_object_keys(l) k
      where k not in ('external_id','line_number','sku','description','quantity')
    ) or exists (
      select 1 from jsonb_array_elements(v_lines) l
      where jsonb_typeof(l -> 'external_id') is distinct from 'string'
        or char_length(l ->> 'external_id') not between 1 and 160
        or (l ->> 'external_id') <> btrim(l ->> 'external_id')
        or (l ->> 'external_id') ~ '[[:cntrl:]]'
        or jsonb_typeof(l -> 'line_number') is distinct from 'number'
        or (l ->> 'line_number') !~ '^[1-9][0-9]{0,8}$'
        or (l ? 'sku' and jsonb_typeof(l -> 'sku') not in ('string','null')) or coalesce(char_length(l ->> 'sku'),0) > 120
        or jsonb_typeof(l -> 'description') is distinct from 'string' or char_length(btrim(l ->> 'description')) not between 1 and 300
        or coalesce(l ->> 'quantity','') !~ '^(0|[1-9][0-9]{0,11})(\.\d{1,4})?$'
    ) then return jsonb_build_object('message','Line items do not match the approved intake contract'); end if;
  if exists (select 1 from jsonb_array_elements(v_lines) l where (l ->> 'quantity')::numeric <= 0)
    or exists (select 1 from jsonb_array_elements(v_lines) l group by l ->> 'external_id' having count(*) > 1)
    or exists (select 1 from jsonb_array_elements(v_lines) l group by l ->> 'line_number' having count(*) > 1)
    then return jsonb_build_object('message','Line quantities must be positive and identifiers must be unique');
  end if;

  select id into v_org from public.portal_organizations where account_number = v_account and active for share;
  if not found then return jsonb_build_object('message','Customer account has no active verified match'); end if;
  select * into v_order from public.portal_orders where external_source = v_source and external_id = v_external for update;
  v_existing := found;
  if v_existing and (v_order.organization_id <> v_org or v_order.order_number <> v_number) then
    return jsonb_build_object('message','External order identity no longer matches its account or order number');
  end if;
  if not v_existing and exists (
    select 1 from public.portal_orders where organization_id = v_org and order_number = v_number
  ) then return jsonb_build_object('message','Sales order exists without this external identity'); end if;
  if v_existing and (v_order.external_updated_at is null or v_order.external_updated_at > v_updated) then
    return jsonb_build_object('message','Order update is stale or prior source version is missing');
  end if;

  v_same := v_existing and v_order.customer_po is not distinct from v_po and v_order.order_date = v_date;
  if v_existing and exists (
    select 1 from public.portal_order_items i where i.order_id = v_order.id
      and not exists (select 1 from jsonb_array_elements(v_lines) l where l ->> 'external_id' = i.external_id)
  ) then return jsonb_build_object('message','An existing order line is absent from the export; review before removing it'); end if;

  for v_line in select value from jsonb_array_elements(v_lines) loop
    if not v_existing then exit; end if;
    select * into v_item from public.portal_order_items where order_id = v_order.id and external_id = v_line ->> 'external_id';
    if found then
      if v_item.line_number <> (v_line ->> 'line_number')::integer then
        return jsonb_build_object('message','An existing line changed its stable number');
      end if;
      if v_item.quantity_ordered is distinct from (v_line ->> 'quantity')::numeric
        and (v_line ->> 'quantity')::numeric < coalesce((
          select sum(si.quantity) from public.portal_shipment_items si
          join public.portal_shipments s on s.id = si.shipment_id
          where si.order_item_id = v_item.id and s.status not in ('pending','cancelled')
        ),0) then return jsonb_build_object('message','New line quantity is below the quantity already shipped'); end if;
      v_same := v_same and v_item.sku is not distinct from nullif(v_line ->> 'sku','')
        and v_item.description = btrim(v_line ->> 'description')
        and v_item.quantity_ordered = (v_line ->> 'quantity')::numeric;
    else
      if exists (
        select 1 from public.portal_order_items where order_id = v_order.id
          and line_number = (v_line ->> 'line_number')::integer
      ) then return jsonb_build_object('message','An incoming line number belongs to another stable line'); end if;
      v_same := false;
    end if;
  end loop;
  if v_existing and v_updated = v_order.external_updated_at and not v_same then
    return jsonb_build_object('message','This source timestamp already has different order details');
  end if;
  v_changed := not v_same;
  if v_changed and v_existing and v_order.status in ('closed','cancelled','delivered') then
    return jsonb_build_object('message','Changes to completed orders need manual review');
  end if;
  if p_apply then
    if not v_existing then
      insert into public.portal_orders(organization_id,order_number,customer_po,order_date,external_source,external_id,external_updated_at)
      values(v_org,v_number,v_po,v_date,v_source,v_external,v_updated) returning * into v_order;
    elsif v_order.external_updated_at < v_updated then
      update public.portal_orders set customer_po=v_po,order_date=v_date,external_updated_at=v_updated where id=v_order.id;
    end if;
    if v_changed then
      insert into public.portal_order_items(organization_id,order_id,line_number,sku,description,quantity_ordered,external_id)
      select v_org,v_order.id,(l ->> 'line_number')::integer,nullif(l ->> 'sku',''),
        btrim(l ->> 'description'),(l ->> 'quantity')::numeric,l ->> 'external_id'
      from jsonb_array_elements(v_lines) l
      on conflict (order_id,external_id) do update
        set sku=excluded.sku,description=excluded.description,quantity_ordered=excluded.quantity_ordered
        where (portal_order_items.sku,portal_order_items.description,portal_order_items.quantity_ordered)
          is distinct from (excluded.sku,excluded.description,excluded.quantity_ordered);
    end if;
  end if;
  return jsonb_build_object('changed',v_changed);
end;
$$;

create function pdc_private.stage_erp_batch(p_key text,p_revision text,p_filename text,p_orders jsonb)
returns uuid language plpgsql security definer set search_path = ''
as $$
declare
  v_source public.portal_erp_sources%rowtype;
  v_job uuid;
  v_index integer;
  v_order jsonb;
  v_outcome jsonb;
  v_findings jsonb := '[]'::jsonb;
begin
  if auth.uid() is null or not pdc_private.has_permission('integrations.schedule') then
    raise exception 'ERP intake permission required' using errcode = '42501';
  end if;
  perform pg_advisory_xact_lock(hashtextextended(auth.uid()::text, 9613));
  if (select count(*) from public.portal_erp_batches where created_by=auth.uid() and created_at > now()-interval '1 minute') >= 10
    then raise exception 'ERP import rate limit reached' using errcode = '22023'; end if;
  select * into v_source from public.portal_erp_sources where source_key = p_key and active for update;
  if not found or v_source.mapping_revision is distinct from p_revision then
    raise exception 'Source and mapping revision have not been approved' using errcode = '42501';
  end if;
  if jsonb_typeof(p_orders) is distinct from 'array' or octet_length(p_orders::text) > 400000 then
    raise exception 'Invalid ERP batch' using errcode = '22023';
  end if;
  if jsonb_array_length(p_orders) not between 1 and 100
    or exists (select 1 from jsonb_array_elements(p_orders) o group by o ->> 'external_id' having count(*) > 1)
    or exists (select 1 from jsonb_array_elements(p_orders) o group by o ->> 'account_number',o ->> 'order_number' having count(*) > 1)
    then raise exception 'Invalid batch size or duplicate order identities' using errcode = '22023'; end if;
  for v_index,v_order in
    select ordinality::integer,value from jsonb_array_elements(p_orders) with ordinality
    order by value ->> 'account_number',value ->> 'external_id'
  loop
    v_outcome := pdc_private.evaluate_erp_order(p_key,v_order,false);
    if v_outcome ? 'message' then
      v_findings := v_findings || jsonb_build_object('record',v_index,'message',v_outcome -> 'message');
    end if;
  end loop;
  insert into public.portal_erp_batches(source_key,mapping_revision,source_approved_at,source_filename,state,payload,findings,order_count,created_by)
  values(p_key,p_revision,v_source.approved_at,left(p_filename,180),
    case when v_findings = '[]'::jsonb then 'preview' else 'needs_review' end,
    p_orders,v_findings,jsonb_array_length(p_orders),auth.uid()) returning id into v_job;
  return v_job;
end;
$$;

create function pdc_private.apply_erp_batch(p_batch uuid)
returns text language plpgsql security definer set search_path = ''
as $$
declare
  v_batch public.portal_erp_batches%rowtype;
  v_source public.portal_erp_sources%rowtype;
  v_index integer;
  v_order jsonb;
  v_outcome jsonb;
  v_findings jsonb := '[]'::jsonb;
  v_state text;
  v_changed integer := 0;
begin
  if auth.uid() is null or not pdc_private.has_permission('integrations.schedule') then
    raise exception 'ERP intake permission required' using errcode = '42501';
  end if;
  select * into v_batch from public.portal_erp_batches where id=p_batch and created_by=auth.uid() for update;
  if not found then raise exception 'ERP preview not found for this user' using errcode = '42501'; end if;
  if v_batch.state = 'applied' then return v_batch.state; end if;
  if v_batch.state not in ('preview','failed') or v_batch.created_at < now()-interval '24 hours' then
    raise exception 'Create a new ERP preview' using errcode = '22023';
  end if;
  select * into v_source from public.portal_erp_sources where source_key=v_batch.source_key and active for update;
  if not found or v_source.mapping_revision <> v_batch.mapping_revision or v_source.approved_at <> v_batch.source_approved_at then
    raise exception 'The approved ERP mapping has changed' using errcode = '42501';
  end if;
  perform set_config('pdc.change_source','erp_export',true);
  perform set_config('pdc.change_reason','Approved ERP export batch ' || p_batch::text,true);
  for v_index,v_order in
    select ordinality::integer,value from jsonb_array_elements(v_batch.payload) with ordinality
    order by value ->> 'account_number', value ->> 'external_id'
  loop
    v_outcome := pdc_private.evaluate_erp_order(v_source.source_key,v_order,false);
    if v_outcome ? 'message' then
      v_findings := v_findings || jsonb_build_object('record',v_index,'message',v_outcome -> 'message');
    end if;
  end loop;
  if v_findings <> '[]'::jsonb then
    v_state := 'needs_review';
  else
    begin
      for v_order in select value from jsonb_array_elements(v_batch.payload)
        order by value ->> 'account_number',value ->> 'external_id'
      loop
        v_outcome := pdc_private.evaluate_erp_order(v_source.source_key,v_order,true);
        if v_outcome ? 'message' then raise exception 'ERP state changed during application'; end if;
        if (v_outcome ->> 'changed')::boolean then v_changed := v_changed + 1; end if;
      end loop;
      v_state := 'applied';
    exception when others then
      raise log 'PDC ERP order batch % failed, SQLSTATE %', p_batch, SQLSTATE;
      v_state := 'failed';
      v_changed := 0;
    end;
  end if;
  update public.portal_erp_batches set state=v_state,findings=v_findings,changed_count=v_changed,finished_at=now()
    where id=p_batch;
  return v_state;
end;
$$;

create function public.portal_approve_erp_source(p_key text,p_revision text,p_reference text,p_active boolean)
returns void language sql security invoker set search_path = ''
as $$ select pdc_private.approve_erp_source(p_key,p_revision,p_reference,p_active); $$;
create function public.portal_stage_erp_batch(p_key text,p_revision text,p_filename text,p_orders jsonb)
returns uuid language sql security invoker set search_path = ''
as $$ select pdc_private.stage_erp_batch(p_key,p_revision,p_filename,p_orders); $$;
create function public.portal_apply_erp_batch(p_batch uuid)
returns text language sql security invoker set search_path = ''
as $$ select pdc_private.apply_erp_batch(p_batch); $$;

revoke all on function pdc_private.evaluate_erp_order(text,jsonb,boolean) from public, anon, authenticated;
revoke all on function pdc_private.approve_erp_source(text,text,text,boolean),pdc_private.stage_erp_batch(text,text,text,jsonb),
  pdc_private.apply_erp_batch(uuid),public.portal_approve_erp_source(text,text,text,boolean),
  public.portal_stage_erp_batch(text,text,text,jsonb), public.portal_apply_erp_batch(uuid) from public, anon, authenticated;
grant execute on function pdc_private.approve_erp_source(text,text,text,boolean),pdc_private.stage_erp_batch(text,text,text,jsonb),
  pdc_private.apply_erp_batch(uuid),public.portal_approve_erp_source(text,text,text,boolean),
  public.portal_stage_erp_batch(text,text,text,jsonb), public.portal_apply_erp_batch(uuid) to authenticated;
