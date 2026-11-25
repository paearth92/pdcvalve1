import Link from 'next/link';
import { requirePortalStaff } from '@/lib/portal/auth';
import { portalClient } from '@/lib/portal/db';
import { type Quote, pageNumber, pageRange, pageSize, quoteColumns, rows, searchText } from '@/lib/portal/queries';
import { param, type PortalSearch } from '@/components/portal/Feedback';
import { dateLabel, money } from '@/components/portal/format';
import { Pages } from '@/components/portal/Orders';
import { buttonClass, DataTable, Field, fieldClass, linkClass, PageHeading, Panel, Status } from '@/components/portal/ui';

export default async function AdminEstimatesPage({ searchParams }: { searchParams: Promise<PortalSearch> }) {
  await requirePortalStaff('finance.read');
  const search = await searchParams;
  const db = await portalClient();
  const q = searchText(param(search, 'q'));
  const page = pageNumber(param(search, 'page'));
  let query = db.from('portal_quotes').select(`${quoteColumns},organization_id`);
  if (q) query = query.ilike('quote_number', `%${q}%`);
  const quotes = await rows<Quote & { organization_id: string }>(query.order('quote_date', { ascending: false }).order('id').range(...pageRange(page)));
  const companyIds = Array.from(new Set(quotes.map((quote) => quote.organization_id)));
  const companies = companyIds.length ? await rows<{ id: string; name: string }>(db.from('portal_organizations').select('id,name').in('id', companyIds)) : [];
  const companyNames = new Map(companies.map(({ id, name }) => [id, name]));
  return <>
    <PageHeading title="Estimates" description="Review estimates from the source and attach PDFs for customers." />
    <form action="/admin/estimates" className="flex flex-wrap items-end gap-3 rounded-xl border border-[#d6e1da] bg-white p-4">
      <div className="min-w-0 flex-1"><Field label="Estimate number"><input type="search" name="q" className={fieldClass} defaultValue={q} maxLength={80} /></Field></div>
      <button className={buttonClass} type="submit">Search</button>
    </form>
    <Panel title="Estimate records"><DataTable label="Estimate records" columns={['Estimate', 'Company', 'Estimate date', 'Valid until', 'Amount', 'Status']} empty="No estimates are available." rows={quotes.slice(0, pageSize).map((quote) => [
      <Link key="estimate" href={`/admin/estimates/${quote.id}`} className={linkClass}>{quote.quote_number}</Link>,
      companyNames.get(quote.organization_id) ?? '—', dateLabel(quote.quote_date), dateLabel(quote.valid_until), money(quote.total_amount, quote.currency), <Status key="status" value={quote.status} />,
    ])} /></Panel>
    <Pages base="/admin/estimates" page={page} more={quotes.length > pageSize} query={{ q }} />
  </>;
}
