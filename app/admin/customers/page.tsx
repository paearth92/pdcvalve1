import Link from 'next/link';
import { createCompanyAction } from '@/lib/portal/actions';
import { requirePortalStaff } from '@/lib/portal/auth';
import { portalClient } from '@/lib/portal/db';
import { pageNumber, pageRange, pageSize, rows, searchText } from '@/lib/portal/queries';
import type { Company } from '@/components/portal/Accounts';
import { Feedback, param, type PortalSearch } from '@/components/portal/Feedback';
import { Pages } from '@/components/portal/Orders';
import { buttonClass, DataTable, Field, fieldClass, linkClass, PageHeading, Panel, Status } from '@/components/portal/ui';

export default async function CustomersPage({ searchParams }: { searchParams: Promise<PortalSearch> }) {
  const { permissions } = await requirePortalStaff('customers.read');
  const search = await searchParams;
  const q = searchText(param(search, 'q'));
  const page = pageNumber(param(search, 'page'));
  const db = await portalClient();
  let query = db.from('portal_organizations').select('id,name,account_number,contact_email,active');
  if (q) query = query.or(`name.ilike.%${q}%,account_number.ilike.%${q}%`);
  const companies = await rows<Pick<Company, 'id' | 'name' | 'account_number' | 'contact_email' | 'active'>>(query.order('name').order('id').range(...pageRange(page)));
  return <>
    <PageHeading title="Customers" description="Find company records and manage access for authorized contacts." />
    <Feedback searchParams={search} />
    <form action="/admin/customers" className="flex flex-wrap items-end gap-3 rounded-xl border border-[#d6e1da] bg-white p-4">
      <div className="min-w-0 flex-1"><Field label="Company or account number"><input className={fieldClass} name="q" type="search" defaultValue={q} maxLength={80} /></Field></div>
      <button type="submit" className={buttonClass}>Search</button>
    </form>
    <Panel title="Company accounts"><DataTable label="Company accounts" columns={['Company', 'Account', 'Contact', 'Status']} empty="No matching customer accounts." rows={companies.slice(0, pageSize).map((company) => [
      <Link key="company" href={`/admin/customers/${company.id}`} className={linkClass}>{company.name}</Link>,
      company.account_number ?? '—', company.contact_email ?? '—', <Status key="state" value={company.active ? 'Active' : 'Inactive'} />,
    ])} /></Panel>
    <Pages base="/admin/customers" page={page} more={companies.length > pageSize} query={{ q }} />
    {permissions.includes('customers.manage') && <Panel title="Create company account">
      <form action={createCompanyAction} className="grid gap-4 p-4 sm:grid-cols-2 sm:px-6">
        <Field label="Company name"><input className={fieldClass} name="name" required maxLength={200} /></Field>
        <Field label="Source account number"><input className={fieldClass} name="account_number" maxLength={100} /></Field>
        <Field label="Contact email"><input className={fieldClass} name="contact_email" type="email" maxLength={254} /></Field>
        <Field label="Contact phone"><input className={fieldClass} name="contact_phone" type="tel" maxLength={60} /></Field>
        <Field label="Reason"><input className={fieldClass} name="reason" required maxLength={500} /></Field>
        <p className="text-sm leading-relaxed text-[#526b5e]">Use the existing Sage account number when available to match future imports to this company.</p>
        <button type="submit" className={`${buttonClass} justify-self-start sm:col-span-2`}>Create company</button>
      </form>
    </Panel>}
  </>;
}
