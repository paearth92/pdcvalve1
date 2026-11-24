begin;

insert into auth.users(id,email,email_confirmed_at) values
  ('10000000-0000-4000-8000-000000000001','customer-a@fixture.invalid',now()),
  ('10000000-0000-4000-8000-000000000002','customer-b@fixture.invalid',now()),
  ('10000000-0000-4000-8000-000000000003','customer-peer@fixture.invalid',now()),
  ('10000000-0000-4000-8000-000000000004','shipping@fixture.invalid',now()),
  ('10000000-0000-4000-8000-000000000005','admin@fixture.invalid',now()),
  ('10000000-0000-4000-8000-000000000006','invited@fixture.invalid',now()),
  ('10000000-0000-4000-8000-000000000007','unverified@fixture.invalid',null);

insert into public.portal_organizations(id,name,account_number) values
  ('20000000-0000-4000-8000-000000000001','Fixture A','TEST-A'),
  ('20000000-0000-4000-8000-000000000002','Fixture B','TEST-B');

insert into public.portal_memberships(organization_id,user_id,can_view_financials) values
  ('20000000-0000-4000-8000-000000000001','10000000-0000-4000-8000-000000000001',true),
  ('20000000-0000-4000-8000-000000000002','10000000-0000-4000-8000-000000000002',true),
  ('20000000-0000-4000-8000-000000000001','10000000-0000-4000-8000-000000000003',false),
  ('20000000-0000-4000-8000-000000000001','10000000-0000-4000-8000-000000000007',true);

insert into public.portal_staff(user_id,role) values
  ('10000000-0000-4000-8000-000000000004','shipping'),
  ('10000000-0000-4000-8000-000000000005','super_admin');

insert into public.portal_orders(id,organization_id,order_number,order_date,status) values
  ('30000000-0000-4000-8000-000000000001','20000000-0000-4000-8000-000000000001','FIXTURE-1','2026-11-01','confirmed'),
  ('30000000-0000-4000-8000-000000000002','20000000-0000-4000-8000-000000000002','FIXTURE-2','2026-11-01','received');

insert into public.portal_order_items(id,organization_id,order_id,line_number,description,quantity_ordered) values
  ('40000000-0000-4000-8000-000000000001','20000000-0000-4000-8000-000000000001','30000000-0000-4000-8000-000000000001',1,'Fixture item A',100),
  ('40000000-0000-4000-8000-000000000002','20000000-0000-4000-8000-000000000002','30000000-0000-4000-8000-000000000002',1,'Fixture item B',10);

insert into public.portal_order_item_prices(order_item_id,organization_id,currency,unit_price,line_total)
values('40000000-0000-4000-8000-000000000001','20000000-0000-4000-8000-000000000001','USD',3.50,350);

insert into public.portal_invoices(id,organization_id,order_id,invoice_number,invoice_date,due_date,currency,total_amount,outstanding_amount,status)
values('50000000-0000-4000-8000-000000000001','20000000-0000-4000-8000-000000000001','30000000-0000-4000-8000-000000000001','INV-1','2026-11-01','2026-12-01','USD',350,250,'partially_paid');
insert into public.portal_payments(organization_id,invoice_id,payment_date,currency,amount)
values('20000000-0000-4000-8000-000000000001','50000000-0000-4000-8000-000000000001','2026-11-02','USD',100);

insert into public.portal_documents(id,organization_id,order_id,kind,title,object_path,size_bytes,customer_visible) values
  ('60000000-0000-4000-8000-000000000001','20000000-0000-4000-8000-000000000001','30000000-0000-4000-8000-000000000001',
    'packing_slip','Fixture packing slip','20000000-0000-4000-8000-000000000001/60000000-0000-4000-8000-000000000001.pdf',12,true),
  ('60000000-0000-4000-8000-000000000002','20000000-0000-4000-8000-000000000001','30000000-0000-4000-8000-000000000001',
    'other','Fixture internal PDF','20000000-0000-4000-8000-000000000001/60000000-0000-4000-8000-000000000002.pdf',12,false);

insert into storage.objects(id,bucket_id,name) values
  ('61000000-0000-4000-8000-000000000001','pdc-portal-documents','20000000-0000-4000-8000-000000000001/60000000-0000-4000-8000-000000000001.pdf'),
  ('61000000-0000-4000-8000-000000000002','pdc-portal-documents','20000000-0000-4000-8000-000000000001/60000000-0000-4000-8000-000000000002.pdf');

insert into public.portal_order_notes(organization_id,order_id,body,customer_visible) values
  ('20000000-0000-4000-8000-000000000001','30000000-0000-4000-8000-000000000001','Internal data',false),
  ('20000000-0000-4000-8000-000000000001','30000000-0000-4000-8000-000000000001','Customer update',true);

set local role anon;
do $$
begin
  begin
    perform * from public.portal_orders;
    raise exception 'FAIL: anon can read order table';
  exception when insufficient_privilege then null;
  end;
end $$;
reset role;

set local role authenticated;
select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000001',true);
do $$
begin
  assert (select array_agg(order_number) from public.portal_orders) = array['FIXTURE-1'],
    'customer A order visibility';
  assert (select count(*) from public.portal_orders where order_number = 'FIXTURE-2') = 0,
    'cross-company order denied';
  assert (select array_agg(body) from public.portal_order_notes) = array['Customer update'],
    'internal note denied';
  assert (select count(*) from public.portal_documents) = 1, 'private document metadata filtered';
  assert (select count(*) from storage.objects where bucket_id = 'pdc-portal-documents') = 1,
    'private storage policy filters by accessible metadata';
  assert (select outstanding_amount from public.portal_account_balances where currency='USD') = 250,
    'authoritative invoice outstanding not reduced twice';
  assert (select last_payment_amount from public.portal_account_balances where currency='USD') = 100,
    'official payment shown separately';
  perform public.portal_mark_notification_read((select id from public.portal_notifications where type = 'invoice_issued'));
  assert (select count(*) from public.portal_notification_reads) = 1, 'notification read receipt stored for current customer';
  begin
    perform public.portal_admin_mutate('add_note','{}');
    raise exception 'FAIL: customer can call staff action';
  exception when insufficient_privilege then null;
  end;
end $$;

select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000002',true);
do $$
begin
  assert (select array_agg(order_number) from public.portal_orders) = array['FIXTURE-2'],
    'customer B order visibility';
  assert (select count(*) from public.portal_documents) = 0, 'cross-company document metadata denied';
  assert (select count(*) from storage.objects where bucket_id = 'pdc-portal-documents') = 0,
    'cross-company object denied';
  assert (select count(*) from public.portal_account_balances) = 0, 'cross-company balance denied';
  assert (select count(*) from public.portal_notification_reads) = 0, 'other customer read receipts denied';
end $$;

select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000003',true);
do $$
begin
  assert (select array_agg(order_number) from public.portal_orders) = array['FIXTURE-1'],
    'second company member can see own company';
  assert (select count(*) from public.portal_order_item_prices) = 0, 'order pricing denied';
  assert (select count(*) from public.portal_invoices) = 0, 'finance denied without member entitlement';
end $$;

select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000007',true);
do $$
begin
  assert (select count(*) from public.portal_orders) = 0, 'unverified account cannot inspect tenant records';
end $$;

select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000004',true);
do $$
declare
  target_order uuid := '30000000-0000-4000-8000-000000000001';
  line_id uuid := '40000000-0000-4000-8000-000000000001';
  shipment_1 uuid;
  shipment_2 uuid;
  payload jsonb;
begin
  assert (select count(*) from public.portal_orders) = 2, 'shipping staff can inspect relevant orders';
  assert (select count(*) from public.portal_invoices) = 0, 'shipping staff cannot inspect invoices';
  begin
    perform public.portal_admin_mutate('update_order', jsonb_build_object('order_id',target_order,'status','in_production','reason','Fixture'));
    raise exception 'FAIL: shipping can update production status';
  exception when insufficient_privilege then null;
  end;
  payload := jsonb_build_object('order_id',target_order,'status','shipped','ship_date','2026-11-03',
    'items',jsonb_build_array(jsonb_build_object('order_item_id',line_id,'quantity',40)));
  shipment_1 := public.portal_admin_mutate('save_shipment',payload);
  assert (select quantity_shipped from public.portal_order_fulfillment f where f.order_id = target_order) = 40,
    'first shipment contributes dispatched quantity';
  shipment_2 := public.portal_admin_mutate('save_shipment',jsonb_set(payload,'{items,0,quantity}','35'));
  assert (select quantity_remaining from public.portal_order_fulfillment f where f.order_id = target_order) = 25,
    'multiple shipments reconcile';
  assert (select fulfillment_percent from public.portal_order_fulfillment f where f.order_id = target_order) = 75,
    'fulfillment percentage reflects actual shipments';
  perform public.portal_admin_mutate('save_shipment',jsonb_set(payload,'{items,0,quantity}','35') ||
    jsonb_build_object('shipment_id',shipment_2,'reason','Fixture repeat'));
  assert (select count(*) from public.portal_audit_log where record_id = shipment_2) = 0,
    'shipping without audit permission cannot read audit records';
  begin
    perform public.portal_admin_mutate('save_shipment',jsonb_set(payload,'{items,0,quantity}','26'));
    raise exception 'FAIL: overship allowed';
  exception when check_violation then null;
  end;
  begin
    perform public.portal_admin_mutate('save_shipment',jsonb_set(payload,'{items,0,order_item_id}','"40000000-0000-4000-8000-000000000002"'));
    raise exception 'FAIL: cross-tenant item reassignment allowed';
  exception when foreign_key_violation then null;
  end;
  perform public.portal_admin_mutate('save_shipment',payload || jsonb_build_object('shipment_id',shipment_1,'status','cancelled','reason','Fixture cancellation'));
  assert (select quantity_shipped from public.portal_order_fulfillment f where f.order_id = target_order) = 35,
    'cancelled shipment no longer contributes';
  perform public.portal_admin_mutate('save_shipment',jsonb_set(payload,'{items,0,quantity}','30') ||
    jsonb_build_object('shipment_id',shipment_2,'reason','Fixture correction'));
  assert (select quantity_remaining from public.portal_order_fulfillment f where f.order_id = target_order) = 70,
    'shipping correction replaces old quantities';
exception when ambiguous_column then
  raise exception 'FAIL: ambiguous fulfillment test query';
end $$;

select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000005',true);
do $$
declare
  order_ref uuid := '30000000-0000-4000-8000-000000000001';
  company_id uuid := '20000000-0000-4000-8000-000000000001';
begin
  perform public.portal_admin_mutate('update_order',jsonb_build_object(
    'order_id',order_ref,'status','in_production','reason','Verified production update','protected',true));
  assert exists(select 1 from public.portal_manual_overrides where order_id = order_ref and field_name = 'status' and protected),
    'manual status override protected';
  assert exists(select 1 from public.portal_audit_log where table_name='portal_orders' and record_id=order_ref
    and operation='UPDATE' and reason='Verified production update' and previous_value->>'status'='confirmed'
    and new_value->>'status'='in_production'), 'audit records old and new status';
  assert exists(select 1 from public.portal_order_events where order_id=order_ref and status='in_production' and note is null),
    'timeline updated without internal audit reason';
  perform public.portal_admin_mutate('set_override_protection',jsonb_build_object(
    'order_id',order_ref,'field_name','status','protected',false,'reason','Return to source ownership'));
  assert exists(select 1 from public.portal_manual_overrides where order_id=order_ref and field_name='status' and not protected),
    'authorized staff can release an override without changing current status';
  assert not exists(select 1 from public.portal_audit_log where reason='Fixture repeat'),
    'repeating a saved shipment adds no duplicate audit entries';
  perform public.portal_admin_mutate('set_membership',jsonb_build_object(
    'organization_id',company_id,'user_id','10000000-0000-4000-8000-000000000003','active',false));
  perform set_config('pdc.test.invite',public.portal_admin_mutate('create_invitation',jsonb_build_object(
    'organization_id',company_id,'email','invited@fixture.invalid','token_hash',repeat('a',64)))::text,true);
  perform set_config('pdc.test.revoked_invite',public.portal_admin_mutate('create_invitation',jsonb_build_object(
    'organization_id','20000000-0000-4000-8000-000000000002','email','invited@fixture.invalid','token_hash',repeat('b',64)))::text,true);
  perform public.portal_admin_mutate('revoke_invitation',jsonb_build_object(
    'organization_id','20000000-0000-4000-8000-000000000002','invitation_id',current_setting('pdc.test.revoked_invite')));
end $$;

select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000003',true);
do $$
begin
  assert (select count(*) from public.portal_orders) = 0, 'deactivation takes effect with existing credentials';
  assert (select count(*) from public.portal_memberships) = 0, 'deactivated customer receives no membership data';
  begin
    perform public.portal_accept_invitation(current_setting('pdc.test.invite')::uuid,repeat('a',64));
    raise exception 'FAIL: wrong email redeemed invite';
  exception when insufficient_privilege then null;
  end;
end $$;

select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000006',true);
do $$
declare invite_id uuid := current_setting('pdc.test.invite')::uuid;
begin
  assert (select count(*) from public.portal_orders) = 0, 'no access before invite acceptance';
  begin
    perform public.portal_accept_invitation(current_setting('pdc.test.revoked_invite')::uuid,repeat('b',64));
    raise exception 'FAIL: revoked invite redeemed';
  exception when insufficient_privilege then null;
  end;
  perform public.portal_accept_invitation(invite_id,repeat('a',64));
  assert (select count(*) from public.portal_orders) = 1, 'verified invitation adds matching company membership';
  begin
    perform public.portal_accept_invitation(invite_id,repeat('a',64));
    raise exception 'FAIL: invite replay allowed';
  exception when insufficient_privilege then null;
  end;
end $$;

reset role;
rollback;
