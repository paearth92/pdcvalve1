begin;

insert into auth.users(id,email,email_confirmed_at) values
 ('23000000-0000-0000-0000-000000000001','erp-admin@example.invalid',now()),
 ('23000000-0000-0000-0000-000000000002','erp-worker@example.invalid',now()),
 ('23000000-0000-0000-0000-000000000003','erp-customer@example.invalid',now());
insert into public.portal_staff(user_id,role) values
 ('23000000-0000-0000-0000-000000000001','super_admin'),
 ('23000000-0000-0000-0000-000000000002','integration_operator');
insert into public.portal_organizations(id,name,account_number)
  values ('23000000-0000-0000-0000-000000000011','Canonical ERP Fixture','00987');
insert into public.portal_memberships(organization_id,user_id)
  values ('23000000-0000-0000-0000-000000000011','23000000-0000-0000-0000-000000000003');

set local role authenticated;
select set_config('request.jwt.claim.sub','23000000-0000-0000-0000-000000000001',true);
select public.portal_approve_erp_source('fixture','synthetic-v1','Synthetic mapping approved for regression test',true);
select set_config('request.jwt.claim.sub','23000000-0000-0000-0000-000000000002',true);
do $$
declare
  batch uuid;
  orders jsonb := '[{
    "external_id":"01-000987",
    "account_number":"00987",
    "order_number":"SO-FIXTURE-1",
    "customer_po":"PO-FIXTURE-1",
    "order_date":"2024-02-01",
    "updated_at":"2024-02-01T15:00:00Z",
    "lines":[
      {"external_id":"01","line_number":1,"sku":"VALVE-FIXTURE","description":"Synthetic fixture valve","quantity":"100"},
      {"external_id":"02","line_number":2,"sku":"ACT-FIXTURE","description":"Synthetic fixture actuator","quantity":"50.125"}
    ]
  }]';
begin
  begin
    perform public.portal_approve_erp_source('worker-unapproved','test','Unauthorized approval',true);
    raise exception 'Worker could approve its own mapping';
  exception when insufficient_privilege then null;
  end;
  begin
    perform public.portal_stage_erp_batch('fixture','wrong-revision','staged.json',orders);
    raise exception 'An unapproved mapping was accepted';
  exception when insufficient_privilege then null;
  end;
  batch := public.portal_stage_erp_batch('fixture','synthetic-v1','staged.json',orders);
  if (select state from public.portal_erp_batches where id=batch) <> 'preview' then
    raise exception 'Normalized fixture did not validate: %', (select findings from public.portal_erp_batches where id=batch);
  end if;
  if public.portal_apply_erp_batch(batch) <> 'applied' then raise exception 'Normalized order failed to import'; end if;
  batch := public.portal_stage_erp_batch('fixture','synthetic-v1','repeated.json',orders);
  if public.portal_apply_erp_batch(batch) <> 'applied'
    or (select changed_count from public.portal_erp_batches where id=batch) <> 0 then
    raise exception 'An identical ERP import was not idempotent';
  end if;
  batch := public.portal_stage_erp_batch('fixture','synthetic-v1','stale.json',
    jsonb_set(orders,'{0,updated_at}','"2024-02-01T14:00:00Z"'));
  if (select state from public.portal_erp_batches where id=batch) <> 'needs_review' then
    raise exception 'Stale source version was accepted';
  end if;
  batch := public.portal_stage_erp_batch('fixture','synthetic-v1','wrong-account.json',
    jsonb_set(orders,'{0,account_number}','"99999"'));
  if (select state from public.portal_erp_batches where id=batch) <> 'needs_review' then
    raise exception 'Unverified account was accepted';
  end if;
  batch := public.portal_stage_erp_batch('fixture','synthetic-v1','incorrect-quantity.json',
    jsonb_set(orders,'{0,lines,0,quantity}','"-20"'));
  if (select state from public.portal_erp_batches where id=batch) <> 'needs_review' then
    raise exception 'Invalid ERP quantity was accepted';
  end if;
end;
$$;

select set_config('request.jwt.claim.sub','23000000-0000-0000-0000-000000000003',true);
do $$
begin
  if (select count(*) from public.portal_orders where order_number='SO-FIXTURE-1') <> 1
    or (select count(*) from public.portal_order_items where external_id in ('01','02')) <> 2
    or not exists (select 1 from public.portal_order_items where quantity_ordered=50.125)
    or exists (select 1 from public.portal_erp_batches)
  then raise exception 'Normalized order did not appear only in its authorized customer portal'; end if;
end;
$$;
rollback;
