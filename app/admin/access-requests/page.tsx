import { reviewPortalAccessRequestAction } from '@/lib/portal/actions';
import { requirePortalStaff } from '@/lib/portal/auth';
import { portalClient } from '@/lib/portal/db';
import { dateLabel } from '@/components/portal/format';
import { type PortalSearch, Feedback } from '@/components/portal/Feedback';
import { Empty, Field, fieldClass, PageHeading, Panel, Status } from '@/components/portal/ui';
import { rows } from '@/lib/portal/queries';

type AccessRequest = {
  id: string;
  contact_name: string;
  company_name: string;
  email: string;
  phone: string | null;
  account_number: string | null;
  created_at: string;
};
type CompanyOption = { id: string; name: string; account_number: string | null };

export default async function AccessRequestsPage({ searchParams }: { searchParams: Promise<PortalSearch> }) {
  await requirePortalStaff('customers.manage');
  const search = await searchParams;
  const db = await portalClient();
  const [requests, companies] = await Promise.all([
    rows<AccessRequest>(db.from('portal_access_requests').select('id,contact_name,company_name,email,phone,account_number,created_at')
      .eq('status', 'pending').not('email_verified_at', 'is', null).order('created_at').order('id').limit(100)),
    rows<CompanyOption>(db.from('portal_organizations').select('id,name,account_number')
      .eq('active', true).order('name').order('id').limit(500)),
  ]);

  return <>
    <PageHeading title="Customer signups" description="Match each verified signup to the right company. Approval unlocks their existing login. Financial access is managed separately." />
    <Feedback searchParams={search} />
    <Panel title={`Signups waiting for approval · ${requests.length}`}>
      {requests.length ? <div className="grid gap-4 p-4 sm:p-6">
        {requests.map((request) => <article key={request.id} className="portal-fade-up grid min-w-0 gap-4 rounded-xl border border-[#d9e5dd] bg-[linear-gradient(145deg,#ffffff_35%,#f2f7f4)] p-4 shadow-sm sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="grid gap-1">
              <h2 className="text-lg font-bold text-brand-green-dark">{request.company_name}</h2>
              <p className="text-sm text-[#42614f]">{request.contact_name} · <a className="underline decoration-[#a8c7b5] underline-offset-4" href={`mailto:${request.email}`}>{request.email}</a></p>
              <p className="text-xs text-[#60796a]">Signed up {dateLabel(request.created_at)}</p>
            </div>
            <Status value="Pending review" />
          </div>
          <dl className="grid gap-3 border-y border-[#e3ece6] py-3 text-sm sm:grid-cols-2">
            <div><dt className="text-xs font-semibold text-[#60796a]">PDC account number</dt><dd className="mt-1 font-medium text-brand-green-dark">{request.account_number || 'Not provided'}</dd></div>
            <div><dt className="text-xs font-semibold text-[#60796a]">Phone</dt><dd className="mt-1 font-medium text-brand-green-dark">{request.phone || 'Not provided'}</dd></div>
          </dl>
          <form action={reviewPortalAccessRequestAction} className="grid gap-3">
            <input type="hidden" name="request_id" value={request.id} />
            <Field label="Link to a verified company account">
              <select className={fieldClass} name="organization_id" defaultValue="">
                <option value="">Create a new company for this customer</option>
                {companies.map((company) => <option key={company.id} value={company.id}>
                  {company.name}{company.account_number ? ` · ${company.account_number}` : ''}
                </option>)}
              </select>
            </Field>
            <Field label="Review reason">
              <textarea className={`${fieldClass} min-h-20 resize-y`} name="reason" maxLength={1000} minLength={5} required placeholder="For example: verified against the current PDC account record." />
            </Field>
            <p className="text-xs leading-relaxed text-[#60796a]">Approve only after you verify this person is authorized to see the company’s records.</p>
            <div className="flex flex-wrap gap-2">
              <button type="submit" name="decision" value="approved" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand-green-dark px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green">Approve account</button>
              <button type="submit" name="decision" value="declined" className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#d6e1da] bg-white px-4 py-2.5 text-sm font-bold text-[#526b5e] transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green">Decline signup</button>
            </div>
          </form>
        </article>)}
      </div> : <Empty message="No verified customer signups are waiting for approval." />}
    </Panel>
  </>;
}
