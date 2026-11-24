import { requirePortalStaff } from '@/lib/portal/auth';
import { portalClient } from '@/lib/portal/db';
import { type Invoice, invoiceColumns, pageNumber, pageRange, pageSize, rows, searchText } from '@/lib/portal/queries';
import { param, type PortalSearch } from '@/components/portal/Feedback';
import { InvoiceTable } from '@/components/portal/Financials';
import { Pages } from '@/components/portal/Orders';
import { buttonClass, Field, fieldClass, PageHeading, Panel } from '@/components/portal/ui';

export default async function FinancePage({ searchParams }: { searchParams: Promise<PortalSearch> }) {
  await requirePortalStaff('finance.read');
  const search = await searchParams;
  const db = await portalClient();
  const q = searchText(param(search, 'q'));
  const page = pageNumber(param(search, 'page'));
  let query = db.from('portal_invoices').select(invoiceColumns);
  if (q) query = query.ilike('invoice_number', `%${q}%`);
  if (param(search, 'outstanding') === 'yes') query = query.gt('outstanding_amount', 0).not('status', 'in', '(void,credited)');
  const invoices = await rows<Invoice>(query.order('invoice_date', { ascending: false }).order('id').range(...pageRange(page)));
  const companyIds = Array.from(new Set(invoices.map((invoice) => invoice.organization_id)));
  const companies = companyIds.length ? await rows<{ id: string; name: string }>(db.from('portal_organizations').select('id,name').in('id', companyIds)) : [];
  return <>
    <PageHeading title="Finance" description="Review source invoices and outstanding amounts." />
    <form action="/admin/finance" className="flex flex-wrap items-end gap-3 rounded-xl border border-[#d6e1da] bg-white p-4">
      <div className="min-w-0 flex-1"><Field label="Invoice number"><input type="search" name="q" className={fieldClass} defaultValue={q} maxLength={80} /></Field></div>
      <label className="flex min-h-11 items-center gap-2 text-sm"><input type="checkbox" name="outstanding" value="yes" defaultChecked={param(search, 'outstanding') === 'yes'} className="h-4 w-4 accent-brand-green" />Outstanding only</label>
      <button className={buttonClass} type="submit">Search</button>
    </form>
    <Panel title="Invoices"><InvoiceTable base="/admin/finance" invoices={invoices.slice(0, pageSize)} companyNames={new Map(companies.map(({ id, name }) => [id, name]))} /></Panel>
    <Pages base="/admin/finance" page={page} more={invoices.length > pageSize} query={{ q, outstanding: param(search, 'outstanding') }} />
  </>;
}
