-- Signups are linked to an Auth user, and approval grants membership directly.
alter table public.portal_access_requests
  add column user_id uuid unique references auth.users(id) on delete cascade,
  add column email_verified_at timestamptz;

alter table public.portal_access_requests
  drop constraint portal_access_requests_check,
  add constraint portal_access_review_state check (
    (status = 'pending' and reviewed_at is null and reviewed_by is null and invitation_id is null)
    or (status = 'approved' and reviewed_at is not null and reviewed_by is not null
      and organization_id is not null and ((user_id is null) <> (invitation_id is null)))
    or (status = 'declined' and reviewed_at is not null and reviewed_by is not null and invitation_id is null)
  );

create policy portal_access_requests_own on public.portal_access_requests for select
  to authenticated using (user_id = (select auth.uid()));

revoke execute on function public.portal_request_access(text,text,text,text,text)
  from anon, authenticated;
revoke execute on function public.portal_approve_access_request(uuid,uuid,text,text)
  from authenticated;

create function pdc_private.capture_portal_registration() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  details jsonb := new.raw_user_meta_data -> 'pdc_registration';
  signup_email text := lower(btrim(new.email));
  contact text := btrim(details ->> 'contact_name');
  company text := btrim(details ->> 'company_name');
  phone_number text := nullif(btrim(details ->> 'phone'), '');
  claimed_account text := nullif(btrim(details ->> 'account_number'), '');
begin
  if tg_op = 'UPDATE' then
    -- A changed Auth address must never inherit a pending registration for a different address.
    update public.portal_access_requests
    set email_verified_at = case when email = signup_email then new.email_confirmed_at end
    where user_id = new.id and status = 'pending'
      and email_verified_at is distinct from
        (case when email = signup_email then new.email_confirmed_at end);
  elsif length(signup_email) between 3 and 254 and length(contact) between 2 and 160
    and length(company) between 2 and 200
    and length(coalesce(phone_number, '')) <= 60 and length(coalesce(claimed_account, '')) <= 100 then
    insert into public.portal_access_requests
      (user_id, contact_name, company_name, email, phone, account_number, email_verified_at)
    values (new.id, contact, company, signup_email, phone_number, claimed_account, new.email_confirmed_at)
    on conflict (email) where status = 'pending' do update
      set user_id = excluded.user_id, contact_name = excluded.contact_name,
        company_name = excluded.company_name, phone = excluded.phone,
        account_number = excluded.account_number, email_verified_at = excluded.email_verified_at
      where portal_access_requests.user_id is null;
  end if;
  return new;
end;
$$;

revoke all on function pdc_private.capture_portal_registration() from public, anon, authenticated;

create trigger pdc_capture_portal_registration
  after insert or update of email, email_confirmed_at on auth.users
  for each row execute function pdc_private.capture_portal_registration();

create function pdc_private.approve_portal_signup(
  target_id uuid, existing_organization_id uuid, change_reason text
) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  actor uuid := auth.uid();
  registration public.portal_access_requests%rowtype;
  target_company uuid;
begin
  if actor is null or not pdc_private.has_permission('customers.manage') then
    raise exception 'Portal permission denied' using errcode = '42501';
  end if;
  if coalesce(length(btrim(change_reason)), 0) not between 5 and 1000 then
    raise exception 'A review reason is required' using errcode = '22023';
  end if;

  select * into registration from public.portal_access_requests
    where id = target_id and status = 'pending' and user_id is not null
      and email_verified_at is not null for update;
  if not found or not exists (
    select 1 from auth.users where id = registration.user_id
      and email_confirmed_at is not null and lower(email) = registration.email
  ) then
    raise exception 'Verified pending signup not found' using errcode = '22023';
  end if;

  if existing_organization_id is null then
    target_company := pdc_private.admin_mutate('create_company', jsonb_build_object(
      'name', registration.company_name, 'contact_email', registration.email,
      'contact_phone', registration.phone, 'reason', btrim(change_reason)
    ));
  else
    select id into target_company from public.portal_organizations
      where id = existing_organization_id and active for update;
    if not found then raise exception 'Active company not found' using errcode = '22023'; end if;
  end if;

  perform set_config('pdc.change_source', 'portal_admin', true);
  perform set_config('pdc.change_reason', btrim(change_reason), true);

  insert into public.portal_profiles(user_id, full_name, email, phone)
    values (registration.user_id, registration.contact_name, registration.email, registration.phone)
    on conflict (user_id) do nothing;
  insert into public.portal_memberships(organization_id, user_id, can_view_financials)
    values (target_company, registration.user_id, false)
    on conflict (organization_id, user_id) do update set active = true;
  update public.portal_access_requests set status = 'approved', organization_id = target_company,
    reviewed_at = now(), reviewed_by = actor where id = target_id;
  return target_company;
end;
$$;

create function public.portal_approve_signup(
  target_id uuid, existing_organization_id uuid, change_reason text
) returns uuid
language sql security invoker set search_path = '' as $$
  select pdc_private.approve_portal_signup(target_id, existing_organization_id, change_reason)
$$;

revoke all on function pdc_private.approve_portal_signup(uuid,uuid,text),
  public.portal_approve_signup(uuid,uuid,text) from public, anon, authenticated;
grant execute on function pdc_private.approve_portal_signup(uuid,uuid,text),
  public.portal_approve_signup(uuid,uuid,text) to authenticated;
