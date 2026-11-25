create table public.portal_import_sources (
  id uuid primary key default gen_random_uuid(),
  name text not null unique check (char_length(name) between 1 and 100),
  sheet_name text check (char_length(sheet_name) between 1 and 100),
  column_map jsonb not null check (jsonb_typeof(column_map) = 'object'),
  active boolean not null default true,
  allow_scheduled boolean not null default false,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null,
  check (active or not allow_scheduled)
);

create table public.portal_import_jobs (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references public.portal_import_sources(id),
  filename text not null check (char_length(filename) between 1 and 180),
  state text not null check (state in ('preview', 'applied', 'needs_review', 'failed')),
  source_config timestamptz not null,
  mapping_snapshot jsonb not null,
  payload jsonb not null check (jsonb_typeof(payload) = 'array'),
  findings jsonb not null default '[]'::jsonb check (jsonb_typeof(findings) = 'array'),
  row_count integer not null check (row_count between 0 and 500),
  changed_count integer not null default 0,
  error_count integer not null default 0,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  finished_at timestamptz
);

create index portal_import_jobs_recent on public.portal_import_jobs (created_at desc);
create index portal_import_jobs_source on public.portal_import_jobs (source_id, state);
create index portal_import_jobs_author on public.portal_import_jobs (created_by, created_at desc);

create table public.portal_import_reviews (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.portal_import_jobs(id),
  row_number integer not null check (row_number between 2 and 501),
  message text not null check (char_length(message) between 1 and 240),
  resolved_by uuid references auth.users(id) on delete set null,
  resolved_at timestamptz,
  resolution text check (char_length(resolution) between 3 and 240),
  unique (job_id, row_number)
);

create table pdc_private.portal_import_field_stamps (
  order_id uuid not null references public.portal_orders(id) on delete cascade,
  field_name text not null check (field_name in ('status', 'estimated_ship_date', 'estimated_delivery_date')),
  source_id uuid not null references public.portal_import_sources(id),
  source_updated_at timestamptz not null,
  accepted_value text not null,
  primary key (order_id, field_name)
);

alter table public.portal_import_sources enable row level security;
alter table public.portal_import_jobs enable row level security;
alter table public.portal_import_reviews enable row level security;
alter table pdc_private.portal_import_field_stamps enable row level security;
revoke all on public.portal_import_sources, public.portal_import_jobs, public.portal_import_reviews from public, anon, authenticated;
grant select on public.portal_import_sources, public.portal_import_jobs, public.portal_import_reviews to authenticated;
create policy portal_import_sources_read on public.portal_import_sources for select to authenticated
  using ((select pdc_private.has_permission('integrations.read')));
create policy portal_import_jobs_read on public.portal_import_jobs for select to authenticated
  using ((select pdc_private.has_permission('integrations.read')));
create policy portal_import_reviews_read on public.portal_import_reviews for select to authenticated
  using ((select pdc_private.has_permission('integrations.read')));

create trigger audit_import_source
after insert or update on public.portal_import_sources
for each row execute function pdc_private.audit_change();

create trigger audit_import_review_resolution
after update on public.portal_import_reviews
for each row execute function pdc_private.audit_change();

create function pdc_private.save_import_source(
  p_id uuid, p_name text, p_sheet text, p_map jsonb, p_active boolean, p_schedule boolean
) returns uuid
language plpgsql security definer set search_path = ''
as $$
declare
  v_id uuid;
begin
  if auth.uid() is null or not pdc_private.has_permission('integrations.manage') then
    raise exception 'Import permission required' using errcode = '42501';
  end if;
  if p_map is null or jsonb_typeof(p_map) <> 'object' or octet_length(p_map::text) > 4096 then
    raise exception 'Invalid column mapping' using errcode = '22023';
  end if;
  if exists (
    select 1 from jsonb_each(p_map) as entry(key, value)
    where key not in ('account_number','order_number','source_updated_at','status','estimated_ship_date','estimated_delivery_date')
      or jsonb_typeof(value) <> 'string' or char_length(btrim(value #>> '{}')) not between 1 and 100
  ) or not p_map ?& array['account_number','order_number','source_updated_at']
    or not p_map ?| array['status','estimated_ship_date','estimated_delivery_date'] then
    raise exception 'Invalid column mapping' using errcode = '22023';
  end if;
  if p_schedule and (
    p_id is null or not exists (
      select 1 from public.portal_import_jobs where source_id = p_id and state = 'applied'
        and mapping_snapshot = jsonb_build_object('columns', p_map, 'sheet', nullif(btrim(p_sheet), ''))
    )
  ) then
    raise exception 'Review and apply an import after changing the source mapping before scheduling it' using errcode = '22023';
  end if;
  if p_id is null then
    insert into public.portal_import_sources(name, sheet_name, column_map, active, updated_by)
      values (btrim(p_name), nullif(btrim(p_sheet), ''), p_map, p_active, auth.uid())
      returning id into v_id;
  else
    update public.portal_import_sources
      set name = btrim(p_name), sheet_name = nullif(btrim(p_sheet), ''), column_map = p_map,
          active = p_active, allow_scheduled = p_schedule, updated_at = clock_timestamp(), updated_by = auth.uid()
      where id = p_id returning id into v_id;
    if v_id is null then raise exception 'Import source not found' using errcode = '22023'; end if;
  end if;
  return v_id;
end;
$$;

create function pdc_private.evaluate_import_row(
  p_source uuid, p_row jsonb, p_apply boolean
) returns jsonb
language plpgsql security invoker set search_path = ''
as $$
declare
  v_order public.portal_orders%rowtype;
  v_stamp pdc_private.portal_import_field_stamps%rowtype;
  v_account text := p_row ->> 'account_number';
  v_number text := p_row ->> 'order_number';
  v_timestamp timestamptz;
  v_field text;
  v_incoming text;
  v_current text;
  v_changes jsonb := '{}'::jsonb;
  v_adopt jsonb := '{}'::jsonb;
  v_status public.portal_order_status;
  v_ship date;
  v_delivery date;
  v_steps text[] := array['received','confirmed','in_production','production_completed','ready_to_ship'];
begin
  if jsonb_typeof(p_row) <> 'object' or v_account is null or v_number is null
    or char_length(v_account) not between 1 and 100 or char_length(v_number) not between 1 and 100
    or v_account ~ '[[:cntrl:]]' or v_number ~ '[[:cntrl:]]'
    or not p_row ?| array['status','estimated_ship_date','estimated_delivery_date']
    or coalesce(p_row ->> 'source_updated_at', '') !~ '^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$'
  then return jsonb_build_object('message', 'Invalid identity, timestamp or fields'); end if;
  begin
    v_timestamp := (p_row ->> 'source_updated_at')::timestamptz;
  exception when invalid_datetime_format or datetime_field_overflow then
    return jsonb_build_object('message', 'Invalid source timestamp');
  end;
  if v_timestamp > now() + interval '15 minutes' then
    return jsonb_build_object('message', 'The source update timestamp is in the future');
  end if;

  select o.* into v_order
  from public.portal_orders o
  join public.portal_organizations org on org.id = o.organization_id
  where org.account_number = v_account and org.active and o.order_number = v_number
  for update of o;
  if not found then return jsonb_build_object('message', 'No active account and sales order match'); end if;
  if v_order.status::text in ('delivered','closed','cancelled') then
    return jsonb_build_object('message', 'Use an authorized correction for a closed, cancelled or delivered order');
  end if;

  foreach v_field in array array['status','estimated_ship_date','estimated_delivery_date'] loop
    if not p_row ? v_field then continue; end if;
    v_incoming := p_row ->> v_field;
    if jsonb_typeof(p_row -> v_field) <> 'string' or v_incoming is null then
      return jsonb_build_object('message', 'Invalid field value: ' || v_field);
    end if;
    v_current := to_jsonb(v_order) ->> v_field;
    if v_field = 'status' then
      if v_incoming not in ('confirmed','in_production','production_completed','ready_to_ship') then
        return jsonb_build_object('message', 'Invalid production status');
      end if;
      if v_incoming is distinct from v_current and (
        array_position(v_steps, v_current) is null
        or array_position(v_steps, v_incoming) < array_position(v_steps, v_current)
      ) then
        return jsonb_build_object('message', 'The spreadsheet cannot move this order backwards or change fulfillment status');
      end if;
    else
      if v_incoming !~ '^\d{4}-\d{2}-\d{2}$' then
        return jsonb_build_object('message', 'Invalid forecast date');
      end if;
      begin
        perform v_incoming::date;
      exception when invalid_datetime_format or datetime_field_overflow then
        return jsonb_build_object('message', 'Invalid forecast date');
      end;
    end if;

    if exists (
      select 1 from public.portal_manual_overrides m
      where m.order_id = v_order.id and m.field_name = v_field and m.protected
    ) then
      if v_incoming = v_current then continue; end if;
      return jsonb_build_object('message', 'Protected manual override: ' || v_field);
    end if;
    select * into v_stamp from pdc_private.portal_import_field_stamps
      where order_id = v_order.id and field_name = v_field;
    if found then
      if v_stamp.source_id <> p_source then
        if v_incoming = v_current then continue; end if;
        return jsonb_build_object('message', 'A different import source owns ' || v_field);
      end if;
      if v_timestamp < v_stamp.source_updated_at or (
        v_timestamp = v_stamp.source_updated_at and v_incoming <> v_stamp.accepted_value
      ) then
        return jsonb_build_object('message', 'Stale or conflicting source timestamp: ' || v_field);
      end if;
      if v_current is distinct from v_stamp.accepted_value and v_incoming is distinct from v_current then
        return jsonb_build_object('message', 'A later portal or ERP change needs review: ' || v_field);
      end if;
    elsif v_field <> 'status' and v_current is not null and v_incoming is distinct from v_current then
      return jsonb_build_object('message', 'An existing forecast must match the first import before ownership is assigned');
    end if;

    v_adopt := v_adopt || jsonb_build_object(v_field, v_incoming);
    if v_incoming is distinct from v_current then
      v_changes := v_changes || jsonb_build_object(v_field, v_incoming);
    end if;
  end loop;

  v_status := coalesce((v_changes ->> 'status')::public.portal_order_status, v_order.status);
  v_ship := coalesce((v_changes ->> 'estimated_ship_date')::date, v_order.estimated_ship_date);
  v_delivery := coalesce((v_changes ->> 'estimated_delivery_date')::date, v_order.estimated_delivery_date);
  if v_ship is not null and v_delivery is not null and v_ship > v_delivery then
    return jsonb_build_object('message', 'Estimated delivery is before estimated shipping');
  end if;

  if p_apply then
    if v_changes <> '{}'::jsonb then
      update public.portal_orders set status = v_status, estimated_ship_date = v_ship,
        estimated_delivery_date = v_delivery where id = v_order.id;
    end if;
    insert into pdc_private.portal_import_field_stamps(order_id, field_name, source_id, source_updated_at, accepted_value)
      select v_order.id, item.key, p_source, v_timestamp, item.value from jsonb_each_text(v_adopt) item
      on conflict (order_id, field_name) do update
        set source_updated_at = excluded.source_updated_at, accepted_value = excluded.accepted_value;
  end if;
  return jsonb_build_object('changed', v_changes <> '{}'::jsonb, 'changes', v_changes);
end;
$$;

create function pdc_private.stage_import(
  p_source uuid, p_config timestamptz, p_filename text, p_rows jsonb, p_findings jsonb
) returns uuid
language plpgsql security definer set search_path = ''
as $$
declare
  v_source public.portal_import_sources%rowtype;
  v_job uuid;
  v_row jsonb;
  v_result jsonb;
  v_findings jsonb := p_findings;
  v_can_manage boolean := pdc_private.has_permission('integrations.manage');
  v_can_schedule boolean := pdc_private.has_permission('integrations.schedule');
begin
  if auth.uid() is null or not (v_can_manage or v_can_schedule) then
    raise exception 'Import permission required' using errcode = '42501';
  end if;
  perform pg_advisory_xact_lock(hashtextextended(auth.uid()::text, 9612));
  if (
    select count(*) from public.portal_import_jobs
    where created_by = auth.uid() and created_at > now() - interval '1 minute'
  ) >= 10 then raise exception 'Import rate limit reached' using errcode = '22023'; end if;
  select * into v_source from public.portal_import_sources where id = p_source and active for update;
  if not found or v_source.updated_at is distinct from p_config or (not v_can_manage and not v_source.allow_scheduled) then
    raise exception 'Import source changed. Reload its mapping' using errcode = '22023';
  end if;
  if p_rows is null or p_findings is null or jsonb_typeof(p_rows) <> 'array' or jsonb_typeof(p_findings) <> 'array'
    or octet_length(p_rows::text) > 250000 or octet_length(p_findings::text) > 150000 then
    raise exception 'Invalid import payload' using errcode = '22023';
  end if;
  if jsonb_array_length(p_rows) + jsonb_array_length(p_findings) not between 1 and 500
    or exists (
      select 1 from jsonb_array_elements(p_rows || p_findings) r
      where jsonb_typeof(r) <> 'object' or coalesce(r ->> 'row_number', '') !~ '^[0-9]{1,3}$'
        or (r ->> 'row_number')::integer not between 2 and 501
    ) or exists (
      select 1 from jsonb_array_elements(p_rows || p_findings) r
      group by (r ->> 'row_number')::integer having count(*) > 1
    ) or exists (
      select 1 from jsonb_array_elements(p_rows) r group by r ->> 'account_number', r ->> 'order_number'
      having count(*) > 1
    ) or exists (
      select 1 from jsonb_array_elements(p_findings) r
      where coalesce(char_length(r ->> 'message'), 0) not between 1 and 240
    )
  then raise exception 'Invalid import rows' using errcode = '22023'; end if;

  if jsonb_array_length(v_findings) = 0 then
    for v_row in select value from jsonb_array_elements(p_rows) order by value ->> 'account_number', value ->> 'order_number' loop
      if exists (
        select 1 from jsonb_object_keys(v_row) f
        where f not in ('row_number','account_number','order_number','source_updated_at')
          and not v_source.column_map ? f
      ) then
        v_result := jsonb_build_object('message', 'An incoming field has no approved source mapping');
      else
        v_result := pdc_private.evaluate_import_row(p_source, v_row, false);
      end if;
      if v_result ? 'message' then
        v_findings := v_findings || jsonb_build_object('row_number', v_row -> 'row_number', 'message', v_result -> 'message');
      end if;
    end loop;
  end if;
  insert into public.portal_import_jobs(source_id, source_config, mapping_snapshot, filename, state, payload, findings, row_count, error_count, created_by, finished_at)
    values (
      p_source, p_config, jsonb_build_object('columns', v_source.column_map, 'sheet', v_source.sheet_name), left(p_filename, 180),
      case when jsonb_array_length(p_findings) > 0 then 'failed'
           when jsonb_array_length(v_findings) > 0 then 'needs_review' else 'preview' end,
      p_rows, v_findings, jsonb_array_length(p_rows) + jsonb_array_length(p_findings),
      jsonb_array_length(v_findings), auth.uid(),
      case when jsonb_array_length(v_findings) > 0 then now() end
    )
    returning id into v_job;
  if jsonb_array_length(p_findings) = 0 and jsonb_array_length(v_findings) > 0 then
    insert into public.portal_import_reviews(job_id, row_number, message)
      select v_job, (finding ->> 'row_number')::integer, finding ->> 'message'
      from jsonb_array_elements(v_findings) finding;
  end if;
  return v_job;
end;
$$;

create function pdc_private.apply_import(p_job uuid)
returns text
language plpgsql security definer set search_path = ''
as $$
declare
  v_job public.portal_import_jobs%rowtype;
  v_source public.portal_import_sources%rowtype;
  v_row jsonb;
  v_outcome jsonb;
  v_findings jsonb := '[]'::jsonb;
  v_changes integer := 0;
  v_state text;
  v_can_manage boolean := pdc_private.has_permission('integrations.manage');
  v_can_schedule boolean := pdc_private.has_permission('integrations.schedule');
begin
  if auth.uid() is null or not (v_can_manage or v_can_schedule) then
    raise exception 'Import permission required' using errcode = '42501';
  end if;
  select * into v_job from public.portal_import_jobs where id = p_job for update;
  if not found or v_job.created_by is distinct from auth.uid() then
    raise exception 'Import preview not found for this user' using errcode = '42501';
  end if;
  if v_job.state = 'applied' then return v_job.state; end if;
  if v_job.state not in ('preview','failed') or jsonb_array_length(v_job.findings) <> 0
    or v_job.created_at < now() - interval '24 hours' then
    raise exception 'This job needs a new preview' using errcode = '22023';
  end if;
  select * into v_source from public.portal_import_sources where id = v_job.source_id and active for update;
  if not found or v_source.updated_at is distinct from v_job.source_config or (not v_can_manage and not v_source.allow_scheduled) then
    raise exception 'Source configuration changed or scheduling is disabled' using errcode = '22023';
  end if;

  perform set_config('pdc.change_source', 'spreadsheet', true);
  perform set_config('pdc.change_reason', 'Production import ' || p_job::text, true);
  -- Recheck every row under the same locks before writing any row.
  for v_row in select value from jsonb_array_elements(v_job.payload) order by value ->> 'account_number', value ->> 'order_number' loop
    v_outcome := pdc_private.evaluate_import_row(v_job.source_id, v_row, false);
    if v_outcome ? 'message' then
      v_findings := v_findings || jsonb_build_object('row_number', v_row -> 'row_number', 'message', v_outcome -> 'message');
    end if;
  end loop;
  if jsonb_array_length(v_findings) > 0 then
    v_state := 'needs_review';
    insert into public.portal_import_reviews(job_id, row_number, message)
      select v_job.id, (finding ->> 'row_number')::integer, finding ->> 'message'
      from jsonb_array_elements(v_findings) finding;
  else
    begin
      for v_row in select value from jsonb_array_elements(v_job.payload) order by value ->> 'account_number', value ->> 'order_number' loop
        v_outcome := pdc_private.evaluate_import_row(v_job.source_id, v_row, true);
        if v_outcome ? 'message' then raise exception 'Import state changed during application'; end if;
        if (v_outcome ->> 'changed')::boolean then v_changes := v_changes + 1; end if;
      end loop;
      v_state := 'applied';
    exception when others then
      -- The exception block rolls back every data write in the batch. Leave a
      -- retryable failed job and log the error classification without row data.
      raise log 'PDC import failed for job %, SQLSTATE %', p_job, SQLSTATE;
      v_state := 'failed';
      v_changes := 0;
    end;
  end if;
  update public.portal_import_jobs set state = v_state, changed_count = v_changes, findings = v_findings,
    error_count = greatest(jsonb_array_length(v_findings), case when v_state = 'failed' then 1 else 0 end),
    finished_at = now() where id = p_job;
  return v_state;
end;
$$;

create function pdc_private.resolve_import_review(p_review uuid, p_resolution text)
returns void language plpgsql security definer set search_path = ''
as $$
begin
  if auth.uid() is null or not pdc_private.has_permission('integrations.manage') then
    raise exception 'Import permission required' using errcode = '42501';
  end if;
  update public.portal_import_reviews set resolved_at = now(), resolved_by = auth.uid(), resolution = btrim(p_resolution)
  where id = p_review and resolved_at is null;
  if not found then raise exception 'Open review not found' using errcode = '22023'; end if;
end;
$$;

-- These public entry points are invoker wrappers for PostgREST. The protected
-- implementations are outside the exposed schema and recheck permissions.
create function public.portal_save_import_source(p_id uuid, p_name text, p_sheet text, p_map jsonb, p_active boolean, p_schedule boolean)
returns uuid language sql security invoker set search_path = ''
as $$ select pdc_private.save_import_source(p_id,p_name,p_sheet,p_map,p_active,p_schedule); $$;
create function public.portal_stage_import(p_source uuid, p_config timestamptz, p_filename text, p_rows jsonb, p_findings jsonb)
returns uuid language sql security invoker set search_path = ''
as $$ select pdc_private.stage_import(p_source,p_config,p_filename,p_rows,p_findings); $$;
create function public.portal_apply_import(p_job uuid)
returns text language sql security invoker set search_path = ''
as $$ select pdc_private.apply_import(p_job); $$;
create function public.portal_resolve_import_review(p_review uuid, p_resolution text)
returns void language sql security invoker set search_path = ''
as $$ select pdc_private.resolve_import_review(p_review,p_resolution); $$;

revoke all on function pdc_private.evaluate_import_row(uuid,jsonb,boolean) from public, anon, authenticated;
revoke all on function
  pdc_private.save_import_source(uuid,text,text,jsonb,boolean,boolean),
  pdc_private.stage_import(uuid,timestamptz,text,jsonb,jsonb),
  pdc_private.apply_import(uuid),
  pdc_private.resolve_import_review(uuid,text),
  public.portal_save_import_source(uuid,text,text,jsonb,boolean,boolean),
  public.portal_stage_import(uuid,timestamptz,text,jsonb,jsonb),
  public.portal_apply_import(uuid),
  public.portal_resolve_import_review(uuid,text)
from public, anon, authenticated;
grant execute on function
  pdc_private.save_import_source(uuid,text,text,jsonb,boolean,boolean),
  pdc_private.stage_import(uuid,timestamptz,text,jsonb,jsonb),
  pdc_private.apply_import(uuid),
  pdc_private.resolve_import_review(uuid,text),
  public.portal_save_import_source(uuid,text,text,jsonb,boolean,boolean),
  public.portal_stage_import(uuid,timestamptz,text,jsonb,jsonb),
  public.portal_apply_import(uuid),
  public.portal_resolve_import_review(uuid,text)
to authenticated;
