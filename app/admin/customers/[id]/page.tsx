import { notFound } from 'next/navigation';
import { createInvitationAction, revokeInvitationAction, setMemberAccessAction, updateCompanyAction } from '@/lib/portal/actions';
import { requirePortalStaff } from '@/lib/portal/auth';
import { portalClient } from '@/lib/portal/db';
import { getPreparedInvitationLink } from '@/lib/portal/invitations';
import { type Balance, type Invoice, type Order, invoiceColumns, orderColumns, record, recordId, rows } from '@/lib/portal/queries';
import { CompanyFacts, type Company, type Contact, type Membership, companyColumns } from '@/components/portal/Accounts';
import { Feedback, type PortalSearch } from '@/components/portal/Feedback';
import { BalanceList, InvoiceTable } from '@/components/portal/Financials';
import { dateLabel } from '@/components/portal/format';
import { InviteLink } from '@/components/portal/InviteLink';
import { OrderTable } from '@/components/portal/Orders';
import { buttonClass, DataTable, Field, fieldClass, PageHeading, Panel, Status } from '@/components/portal/ui';

type Invitation = { id: string; email: string; can_view_financials: boolean; status: string; expires_at: string };

export default async function CustomerPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<PortalSearch> }) {
  const { permissions } = await requirePortalStaff('customers.read');
  const search = await searchParams;
  const id = recordId((await params).id);
  const db = await portalClient();
  const company = await record<Company>(db.from('portal_organizations').select(companyColumns).eq('id', id).maybeSingle());
  if (!company) notFound();
  const manage = permissions.includes('customers.manage');
  const finance = permissions.includes('finance.read');
  const orders = permissions.includes('orders.read');
  const [members, invitations, recentOrders, balances, invoices, link] = await Promise.all([
    rows<Membership>(db.from('portal_memberships').select('user_id,active,can_view_financials,created_at').eq('organization_id', id).order('created_at', { ascending: false })),
    manage ? rows<Invitation>(db.from('portal_invitations').select('id,email,can_view_financials,status,expires_at').eq('organization_id', id).order('created_at', { ascending: false }).limit(50)) : [],
    orders ? rows<Order>(db.from('portal_orders').select(orderColumns).eq('organization_id', id).order('order_date', { ascending: false }).order('id').limit(5)) : [],
    finance ? rows<Balance>(db.from('portal_account_balances').select('*').eq('organization_id', id).order('currency')) : [],
    finance ? rows<Invoice>(db.from('portal_invoices').select(invoiceColumns).eq('organization_id', id).order('invoice_date', { ascending: false }).order('id').limit(5)) : [],
    manage ? getPreparedInvitationLink(id) : null,
  ]);
  const contacts = members.length ? await rows<Contact>(db.from('portal_profiles').select('user_id,email,full_name,phone').in('user_id', members.map((member) => member.user_id))) : [];
  const contactById = new Map(contacts.map((contact) => [contact.user_id, contact]));

  return <>
    <PageHeading title={company.name} back={{ label: 'Customers', href: '/admin/customers' }} />
    <Feedback searchParams={search} />
    <Panel title="Company information"><CompanyFacts company={company} extra={[
      ['Company status', <Status key="active" value={company.active ? 'Active' : 'Inactive'} />],
    ]} /></Panel>
    {manage && <Panel title="Edit company contact">
      <form action={updateCompanyAction} className="grid gap-4 p-4 sm:grid-cols-2 sm:px-6">
        <input type="hidden" name="organization_id" value={id} />
        <Field label="Company name"><input className={fieldClass} name="name" defaultValue={company.name} required maxLength={200} /></Field>
        <Field label="Contact email"><input className={fieldClass} name="contact_email" type="email" defaultValue={company.contact_email ?? ''} maxLength={254} /></Field>
        <Field label="Contact phone"><input className={fieldClass} name="contact_phone" type="tel" defaultValue={company.contact_phone ?? ''} maxLength={60} /></Field>
        <Field label="Reason"><input className={fieldClass} name="reason" required maxLength={500} /></Field>
        <button type="submit" className={`${buttonClass} justify-self-start sm:col-span-2`}>Save company information</button>
      </form>
    </Panel>}
    <Panel title="Portal users">
      <DataTable label="Company portal users" columns={['Name', 'Email', 'Access', ...(finance ? ['Finance'] : []), ...(manage ? ['Change access'] : [])]} empty="No users are associated with this company." rows={members.map((member) => {
        const contact = contactById.get(member.user_id);
        return [
          contact?.full_name ?? '—', contact?.email ?? '—', <Status key="state" value={member.active ? 'Active' : 'Inactive'} />,
          ...(finance ? [member.can_view_financials ? 'Allowed' : 'Restricted'] : []),
          ...(manage ? [<form key="access" action={setMemberAccessAction} className="flex min-w-44 flex-wrap gap-2">
            <input type="hidden" name="organization_id" value={id} /><input type="hidden" name="user_id" value={member.user_id} />
            <select name="active" aria-label={`Portal access for ${contact?.email ?? 'this user'}`} className={fieldClass} defaultValue={String(member.active)}>
              <option value="true">Active</option><option value="false">Inactive</option>
            </select>
            {finance && <select name="can_view_financials" aria-label={`Financial access for ${contact?.email ?? 'this user'}`} className={fieldClass} defaultValue={String(member.can_view_financials)}>
              <option value="false">Financials restricted</option><option value="true">Financials allowed</option>
            </select>}
            <button type="submit" className={buttonClass}>Save access</button>
          </form>] : []),
        ];
      })} />
    </Panel>
    {manage && <Panel title="Invite a contact">
      <div className="grid gap-4 p-4 sm:px-6">
        <form action={createInvitationAction} className="grid items-end gap-4 sm:grid-cols-2">
          <input type="hidden" name="organization_id" value={id} />
          <Field label="Recipient work email"><input type="email" name="email" className={fieldClass} autoComplete="off" maxLength={254} required /></Field>
          {finance && <label className="flex min-h-11 items-center gap-2 text-sm"><input name="can_view_financials" type="checkbox" className="h-4 w-4 accent-brand-green" />Allow financial records</label>}
          <button type="submit" className={`${buttonClass} justify-self-start sm:col-span-2`}>Create invitation</button>
        </form>
        {link && <InviteLink link={link} />}
      </div>
      <DataTable label="Recent invitations" columns={['Recipient', 'Status', 'Expires', 'Action']} empty="No invitations have been created." rows={invitations.map((invitation) => {
        const expired = invitation.status === 'pending' && new Date(invitation.expires_at).getTime() <= Date.now();
        return [
          invitation.email, <Status key="status" value={expired ? 'Expired' : invitation.status} />, dateLabel(invitation.expires_at),
          invitation.status === 'pending' && !expired ? <form key="revoke" action={revokeInvitationAction}>
            <input type="hidden" name="organization_id" value={id} /><input type="hidden" name="invitation_id" value={invitation.id} />
            <button type="submit" className="min-h-11 rounded-lg px-3 text-sm font-semibold text-red-900 hover:bg-red-50">Revoke</button>
          </form> : '—',
        ];
      })} />
    </Panel>}
    {orders && <Panel title="Recent orders"><OrderTable base="/admin/orders" orders={recentOrders} /></Panel>}
    {finance && <Panel title="Account balances"><BalanceList balances={balances} /></Panel>}
    {finance && <Panel title="Recent invoices"><InvoiceTable base="/admin/finance" invoices={invoices} /></Panel>}
  </>;
}
