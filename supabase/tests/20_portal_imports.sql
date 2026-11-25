begin;

insert into auth.users(id,email,email_confirmed_at) values
 ('22000000-0000-0000-0000-000000000001','operations@example.invalid',now()),
 ('22000000-0000-0000-0000-000000000002','customer@example.invalid',now()),
 ('22000000-0000-0000-0000-000000000003','worker@example.invalid',now());
insert into public.portal_staff(user_id,role) values
 ('22000000-0000-0000-0000-000000000001','operations'),
 ('22000000-0000-0000-0000-000000000003','integration_operator');
insert into public.portal_organizations(id,name,account_number) values
 ('22000000-0000-0000-0000-000000000011','Operations Fixture','00100'),
 ('22000000-0000-0000-0000-000000000012','Secondary Fixture','00200');
insert into public.portal_memberships(organization_id,user_id) values
 ('22000000-0000-0000-0000-000000000011','22000000-0000-0000-0000-000000000002');
insert into public.portal_orders(id,organization_id,order_number,order_date,external_source,external_id) values
 ('22000000-0000-0000-0000-000000000021','22000000-0000-0000-0000-000000000011','SO-1','2024-01-31','fixture','ERP-100'),
 ('22000000-0000-0000-0000-000000000022','22000000-0000-0000-0000-000000000012','SO-1','2024-01-31','fixture','ERP-200'),
 ('22000000-0000-0000-0000-000000000023','22000000-0000-0000-0000-000000000011','SO-2','2024-01-31','fixture','ERP-101');

set local role authenticated;
select set_config('request.jwt.claim.sub','22000000-0000-0000-0000-000000000001',true);
do $$
declare
  v_source uuid;
  v_config timestamptz;
  v_job uuid;
  v_replay uuid;
  v_bad uuid;
  v_mapping jsonb := '{"account_number":"Account","order_number":"Order","source_updated_at":"Updated","status":"Status","estimated_ship_date":"ETA"}';
  v_rows jsonb := '[{"row_number":2,"account_number":"00100","order_number":"SO-1","source_updated_at":"2024-02-01T10:00:00Z","status":"in_production","estimated_ship_date":"2024-02-20"}]';
begin
  v_source := public.portal_save_import_source(null, 'Test Production Tracker', null, v_mapping, true, false);
  perform set_config('test.import.source', v_source::text, true);
  select updated_at into v_config from public.portal_import_sources where id = v_source;
  begin
    perform public.portal_save_import_source(v_source, 'Test Production Tracker', null, v_mapping, true, true);
    raise exception 'Schedule approval before review was accepted';
  exception when invalid_parameter_value then null;
  end;

  v_job := public.portal_stage_import(v_source, v_config, 'first.csv', v_rows, '[]');
  if (select state from public.portal_import_jobs where id = v_job) <> 'preview'
    or (select status from public.portal_orders where id = '22000000-0000-0000-0000-000000000021') <> 'received' then
    raise exception 'Preview changed an order or was not staged';
  end if;
  if public.portal_apply_import(v_job) <> 'applied' then raise exception 'Import failed'; end if;
  if (select estimated_ship_date from public.portal_orders where id = '22000000-0000-0000-0000-000000000021') is distinct from '2024-02-20'::date
    or (select status from public.portal_orders where id = '22000000-0000-0000-0000-000000000021') <> 'in_production'
    or (select status from public.portal_orders where id = '22000000-0000-0000-0000-000000000022') <> 'received' then
    raise exception 'Import did not match its exact account and sales order';
  end if;
  if not exists (
    select 1 from public.portal_audit_log where record_id = '22000000-0000-0000-0000-000000000021'
      and change_source = 'spreadsheet'
  ) then raise exception 'Imported change not audited'; end if;

  v_replay := public.portal_stage_import(v_source, v_config, 'replay.csv', v_rows, '[]');
  if public.portal_apply_import(v_replay) <> 'applied' then raise exception 'Identical replay failed'; end if;
  if (select changed_count from public.portal_import_jobs where id = v_replay) <> 0
    or (select count(*) from public.portal_orders where order_number = 'SO-1') <> 2 then
    raise exception 'Replayed import duplicated data';
  end if;
  v_bad := public.portal_stage_import(v_source, v_config, 'invalid.csv', '[]', '[{"row_number":2,"message":"Invalid date"}]');
  if (select state from public.portal_import_jobs where id=v_bad) <> 'failed' then
    raise exception 'Invalid file did not record failure';
  end if;
  v_bad := public.portal_stage_import(v_source, v_config, 'unknown.csv',
    '[{"row_number":2,"account_number":"00000","order_number":"SO-1","source_updated_at":"2024-02-01T10:00:00Z","status":"confirmed"}]', '[]');
  if (select state from public.portal_import_jobs where id=v_bad) <> 'needs_review'
    or not exists(select 1 from public.portal_import_reviews where job_id=v_bad) then
    raise exception 'Unmatched account did not enter the review queue';
  end if;
  perform public.portal_save_import_source(v_source, 'Test Production Tracker', null, v_mapping, true, true);
end;
$$;

reset role;
insert into public.portal_manual_overrides(organization_id,order_id,field_name,protected,reason)
values ('22000000-0000-0000-0000-000000000011','22000000-0000-0000-0000-000000000021',
        'estimated_ship_date',true,'Verification fixture');

set local role authenticated;
select set_config('request.jwt.claim.sub','22000000-0000-0000-0000-000000000003',true);
do $$
declare
  v_source uuid := current_setting('test.import.source')::uuid;
  v_config timestamptz;
  v_job uuid;
begin
  begin
    perform public.portal_save_import_source(null, 'Unauthorized', null, '{}', true, false);
    raise exception 'Worker could change a source';
  exception when insufficient_privilege then null;
  end;
  select updated_at into v_config from public.portal_import_sources where id=v_source and allow_scheduled;
  v_job := public.portal_stage_import(v_source, v_config, 'protected.csv',
    '[{"row_number":2,"account_number":"00100","order_number":"SO-1","source_updated_at":"2024-02-02T10:00:00Z","estimated_ship_date":"2024-02-28"}]', '[]');
  if (select state from public.portal_import_jobs where id=v_job) <> 'needs_review' then
    raise exception 'Protected forecast was not flagged';
  end if;
  v_job := public.portal_stage_import(v_source, v_config, 'worker.csv',
    '[{"row_number":2,"account_number":"00100","order_number":"SO-1","source_updated_at":"2024-02-02T10:00:00Z","status":"production_completed"},
      {"row_number":3,"account_number":"00100","order_number":"SO-2","source_updated_at":"2024-02-02T10:00:00Z","status":"confirmed"}]', '[]');
  perform set_config('test.import.job', v_job::text, true);
end;
$$;

reset role;
create function pg_temp.reject_second_order_update() returns trigger language plpgsql as $$
begin
  if new.order_number = 'SO-2' then raise exception 'Fixture rejects update'; end if;
  return new;
end;
$$;
create trigger portal_import_test_failure before update on public.portal_orders
for each row execute function pg_temp.reject_second_order_update();

set local role authenticated;
select set_config('request.jwt.claim.sub','22000000-0000-0000-0000-000000000003',true);
do $$
declare v_job uuid := current_setting('test.import.job')::uuid;
begin
  if public.portal_apply_import(v_job) <> 'failed' then raise exception 'Fixture did not fail'; end if;
  if (select error_count from public.portal_import_jobs where id=v_job) <> 1
    or (select changed_count from public.portal_import_jobs where id=v_job) <> 0
  then raise exception 'Failure not recorded'; end if;
end;
$$;

reset role;
do $$
begin
  if (select status from public.portal_orders where id='22000000-0000-0000-0000-000000000021') <> 'in_production'
    then raise exception 'First row persisted after a failed second write'; end if;
end;
$$;
drop trigger portal_import_test_failure on public.portal_orders;

set local role authenticated;
select set_config('request.jwt.claim.sub','22000000-0000-0000-0000-000000000003',true);
do $$
begin
  if public.portal_apply_import(current_setting('test.import.job')::uuid) <> 'applied' then
    raise exception 'Retry could not recover';
  end if;
end;
$$;

select set_config('request.jwt.claim.sub','22000000-0000-0000-0000-000000000002',true);
do $$
begin
  if exists (select 1 from public.portal_import_jobs)
    or exists (select 1 from public.portal_import_sources)
    or exists (select 1 from public.portal_import_reviews)
  then raise exception 'Customer saw staff import records'; end if;
  if (select status from public.portal_orders where id='22000000-0000-0000-0000-000000000021') <> 'production_completed'
    then raise exception 'Customer cannot see authorized imported status'; end if;
  begin
    perform public.portal_apply_import(current_setting('test.import.job')::uuid);
    raise exception 'Customer could invoke import';
  exception when insufficient_privilege then null;
  end;
end;
$$;
rollback;
