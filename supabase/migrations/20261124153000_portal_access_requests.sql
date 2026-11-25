-- Public registration creates a review request only. A customer receives no
-- Auth account or company membership until PDC staff approves the request.
create table public.portal_access_requests (
  id uuid primary key default gen_random_uuid(),
  contact_name text not null check (length(trim(contact_name)) between 2 and 160),
  company_name text not null check (length(trim(company_name)) between 2 and 200),
  email text not null check (email = lower(trim(email)) and length(email) between 3 and 254),
  phone text check (phone is null or length(phone) <= 60),
  account_number text check (account_number is null or length(account_number) <= 100),
  status text not null default 'pending' check (status in ('pending', 'approved', 'declined')),
  organization_id uuid references public.portal_organizations(id),
  invitation_id uuid references public.portal_invitations(id),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id) on delete set null,
  check (
    (status = 'pending' and reviewed_at is null and reviewed_by is null and invitation_id is null)
    or (status = 'approved' and reviewed_at is not null and reviewed_by is not null
      and organization_id is not null and invitation_id is not null)
    or (status = 'declined' and reviewed_at is not null and reviewed_by is not null and invitation_id is null)
  )
);

create unique index portal_access_requests_pending_email_idx
  on public.portal_access_requests(email) where status = 'pending';
create index portal_access_requests_pending_date_idx
  on public.portal_access_requests(created_at, id) where status = 'pending';

alter table public.portal_access_requests enable row level security;
revoke all on public.portal_access_requests from public, anon, authenticated;
grant select on public.portal_access_requests to authenticated;
grant select, insert, update on public.portal_access_requests to service_role;
create policy portal_access_requests_read on public.portal_access_requests for select to authenticated
  using ((select pdc_private.has_permission('customers.manage')));

-- Reviews are audited; public submissions are kept out of the staff audit log.
create trigger portal_access_requests_audit after update on public.portal_access_requests
  for each row execute function pdc_private.audit_change();

create function pdc_private.submit_portal_access_request(
  contact_name text, company_name text, email_address text, phone_number text, source_account_number text
) returns void
language plpgsql security definer set search_path = '' as $$
declare normalized_email text := pg_catalog.lower(pg_catalog.btrim(email_address));
begin
  if contact_name is null or length(pg_catalog.btrim(contact_name)) not between 2 and 160
    or company_name is null or length(pg_catalog.btrim(company_name)) not between 2 and 200
    or normalized_email is null or length(normalized_email) not between 3 and 254
    or normalized_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    or length(coalesce(phone_number, '')) > 60
    or length(coalesce(source_account_number, '')) > 100 then
    raise exception 'Invalid customer access request' using errcode = '22023';
  end if;

  -- Same-address repeats are silently coalesced to avoid exposing request
  -- status and to limit accidental or automated duplicate submissions.
  if exists (
    select 1 from public.portal_access_requests r
    where r.email = normalized_email
      and (r.status = 'pending' or r.created_at > pg_catalog.now() - interval '24 hours')
  ) then
    return;
  end if;

  insert into public.portal_access_requests(contact_name, company_name, email, phone, account_number)
  values (pg_catalog.btrim(contact_name), pg_catalog.btrim(company_name), normalized_email,
    nullif(pg_catalog.btrim(phone_number), ''), nullif(pg_catalog.btrim(source_account_number), ''))
  on conflict (email) where status = 'pending' do nothing;
end;
$$;

create function public.portal_request_access(
  contact_name text, company_name text, email_address text, phone_number text, source_account_number text
) returns void
language sql security definer set search_path = '' as $$
  select pdc_private.submit_portal_access_request(contact_name, company_name, email_address, phone_number, source_account_number)
$$;

create function pdc_private.approve_portal_access_request(
  target_id uuid, existing_organization_id uuid, token_hash text, change_reason text
) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare
  actor uuid := auth.uid();
  request_row public.portal_access_requests%rowtype;
  target_company uuid;
  target_invitation uuid;
begin
  if actor is null or not pdc_private.has_permission('customers.manage') then
    raise exception 'Portal permission denied' using errcode = '42501';
  end if;
  if token_hash !~ '^[a-f0-9]{64}$' or length(pg_catalog.btrim(change_reason)) not between 5 and 1000 then
    raise exception 'Invalid portal access decision' using errcode = '22023';
  end if;

  select * into request_row from public.portal_access_requests where id = target_id for update;
  if not found or request_row.status <> 'pending' then
    raise exception 'Pending access request not found' using errcode = '22023';
  end if;

  if existing_organization_id is null then
    target_company := pdc_private.admin_mutate('create_company', jsonb_build_object(
      'name', request_row.company_name,
      'account_number', request_row.account_number,
      'contact_email', request_row.email,
      'contact_phone', request_row.phone,
      'reason', pg_catalog.btrim(change_reason)
    ));
  else
    select id into target_company from public.portal_organizations
      where id = existing_organization_id and active for update;
    if not found then raise exception 'Active company not found' using errcode = '22023'; end if;
  end if;

  target_invitation := pdc_private.admin_mutate('create_invitation', jsonb_build_object(
    'organization_id', target_company,
    'email', request_row.email,
    'can_view_financials', false,
    'token_hash', token_hash,
    'reason', pg_catalog.btrim(change_reason)
  ));

  perform pg_catalog.set_config('pdc.change_source', 'portal_admin', true);
  perform pg_catalog.set_config('pdc.change_reason', pg_catalog.btrim(change_reason), true);
  update public.portal_access_requests set status = 'approved', organization_id = target_company,
    invitation_id = target_invitation, reviewed_at = pg_catalog.now(), reviewed_by = actor
  where id = target_id;
  return pg_catalog.jsonb_build_object('organization_id', target_company, 'invitation_id', target_invitation);
end;
$$;

create function public.portal_approve_access_request(
  target_id uuid, existing_organization_id uuid, token_hash text, change_reason text
) returns jsonb
language sql security definer set search_path = '' as $$
  select pdc_private.approve_portal_access_request(target_id, existing_organization_id, token_hash, change_reason)
$$;

create function pdc_private.decline_portal_access_request(target_id uuid, change_reason text) returns void
language plpgsql security definer set search_path = '' as $$
declare actor uuid := auth.uid();
begin
  if actor is null or not pdc_private.has_permission('customers.manage') then
    raise exception 'Portal permission denied' using errcode = '42501';
  end if;
  if length(pg_catalog.btrim(change_reason)) not between 5 and 1000 then
    raise exception 'A review reason is required' using errcode = '22023';
  end if;
  perform pg_catalog.set_config('pdc.change_source', 'portal_admin', true);
  perform pg_catalog.set_config('pdc.change_reason', pg_catalog.btrim(change_reason), true);
  update public.portal_access_requests set status = 'declined', reviewed_at = pg_catalog.now(), reviewed_by = actor
  where id = target_id and status = 'pending';
  if not found then raise exception 'Pending access request not found' using errcode = '22023'; end if;
end;
$$;

create function public.portal_decline_access_request(target_id uuid, change_reason text) returns void
language sql security definer set search_path = '' as $$
  select pdc_private.decline_portal_access_request(target_id, change_reason)
$$;

revoke all on function pdc_private.submit_portal_access_request(text,text,text,text,text),
  public.portal_request_access(text,text,text,text,text),
  pdc_private.approve_portal_access_request(uuid,uuid,text,text),
  public.portal_approve_access_request(uuid,uuid,text,text),
  pdc_private.decline_portal_access_request(uuid,text),
  public.portal_decline_access_request(uuid,text)
from public, anon, authenticated;
grant execute on function public.portal_request_access(text,text,text,text,text) to anon, authenticated;
grant execute on function public.portal_approve_access_request(uuid,uuid,text,text),
  public.portal_decline_access_request(uuid,text) to authenticated;
