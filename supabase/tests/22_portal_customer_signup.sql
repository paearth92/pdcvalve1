begin;

insert into auth.users(id,email,email_confirmed_at,raw_user_meta_data) values
 ('d0000000-0000-4000-8000-000000000001','qa-staff@example.test', now(), '{}'),
 ('d0000000-0000-4000-8000-000000000002','qa-signup@example.test', null,
  '{"pdc_registration":{"contact_name":"QA Customer","company_name":"QA Valve Buyer","account_number":"CLAIMED"}}'),
 ('d0000000-0000-4000-8000-000000000003','qa-other@example.test', now(),
  '{"pdc_registration":{"contact_name":"Other Customer","company_name":"Other Company","role":"super_admin"}}');
insert into public.portal_staff(user_id,role)
values ('d0000000-0000-4000-8000-000000000001','super_admin');
insert into public.portal_organizations(id,name,account_number) values
 ('d1000000-0000-4000-8000-000000000001','QA Valve Buyer','QA-1'),
 ('d1000000-0000-4000-8000-000000000002','Other Company','QA-2');
insert into public.portal_orders(id,organization_id,order_number,order_date) values
 ('d2000000-0000-4000-8000-000000000001','d1000000-0000-4000-8000-000000000001','QA-1',current_date),
 ('d2000000-0000-4000-8000-000000000002','d1000000-0000-4000-8000-000000000002','QA-2',current_date);

set local role authenticated;
select set_config('request.jwt.claim.sub','d0000000-0000-4000-8000-000000000002',true);
do $$ begin
  if (select count(*) from public.portal_access_requests) <> 1 then
    raise exception 'Customer cannot read only their own signup';
  end if;
  if exists(select 1 from public.portal_orders) then
    raise exception 'Unapproved customer can read orders';
  end if;
  begin
    perform public.portal_approve_signup(
      (select id from public.portal_access_requests),
      'd1000000-0000-4000-8000-000000000001','Fixture tries to approve their own account');
    raise exception 'Customer approved their own signup';
  exception when insufficient_privilege then null;
  end;
end $$;

select set_config('request.jwt.claim.sub','d0000000-0000-4000-8000-000000000001',true);
do $$ begin
  begin
    perform public.portal_approve_signup(
      (select id from public.portal_access_requests where email='qa-signup@example.test'),
      'd1000000-0000-4000-8000-000000000001','Fixture must first verify email');
    raise exception 'Staff approved an unverified signup';
  exception when invalid_parameter_value then null;
  end;
end $$;

reset role;
update auth.users set email_confirmed_at = now() where email = 'qa-signup@example.test';

set local role authenticated;
select public.portal_approve_signup(
  (select id from public.portal_access_requests where email='qa-signup@example.test'),
  'd1000000-0000-4000-8000-000000000001','Verified customer contact');
select public.portal_admin_mutate('update_order',
  '{"order_id":"d2000000-0000-4000-8000-000000000001","status":"confirmed","reason":"Verified order status"}'::jsonb);
select set_config('request.jwt.claim.sub','d0000000-0000-4000-8000-000000000002',true);
do $$ begin
  if not exists (
    select 1 from public.portal_memberships
    where active and not can_view_financials and user_id = auth.uid()
  ) or not exists (select 1 from public.portal_access_requests where status = 'approved') then
    raise exception 'Approved account did not gain the expected company membership';
  end if;
  if (select count(*) from public.portal_orders) <> 1
    or not exists (select 1 from public.portal_orders where order_number = 'QA-1' and status = 'confirmed') then
    raise exception 'Admin edit was not visible to the authorized customer only';
  end if;
end $$;
rollback;
