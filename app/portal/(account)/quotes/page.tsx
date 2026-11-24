import Link from 'next/link';
import { requirePortalCustomer } from '@/lib/portal/auth';
import { portalClient } from '@/lib/portal/db';
import { type Quote, pageNumber, pageRange, pageSize, quoteColumns, rows } from '@/lib/portal/queries';
import { param, type PortalSearch } from '@/components/portal/Feedback';
import { accountHref, dateLabel, money } from '@/components/portal/format';
import { Pages } from '@/components/portal/Orders';
import { DataTable, linkClass, Notice, PageHeading, Panel, Status } from '@/components/portal/ui';

export default async function EstimatesPage({ searchParams }: { searchParams: Promise<PortalSearch> }) {
  const search = await searchParams;
  const { organization, canViewFinancials } = await requirePortalCustomer(param(search, 'company'));
  if (!canViewFinancials) return <><PageHeading title="Estimates" /><Notice>Contact PDC to request access to this company’s financial records.</Notice></>;
  const db = await portalClient();
  const company = organization.id;
  const page = pageNumber(param(search, 'page'));
  const quotes = await rows<Quote>(db.from('portal_quotes').select(quoteColumns).eq('organization_id', company).neq('status', 'draft').order('quote_date', { ascending: false }).order('id').range(...pageRange(page)));
  return <>
    <PageHeading title="Estimates" description={organization.name} />
    <Panel title="Issued estimates"><DataTable label="Issued estimates" columns={['Estimate', 'Issued', 'Valid until', 'Amount', 'Status']} empty="No estimates have been issued." rows={quotes.slice(0, pageSize).map((quote) => [
      <Link key="estimate" href={accountHref(`/portal/quotes/${quote.id}`, company)} className={linkClass}>{quote.quote_number}</Link>,
      dateLabel(quote.quote_date), dateLabel(quote.valid_until), money(quote.total_amount, quote.currency), <Status key="status" value={quote.status} />,
    ])} /></Panel>
    <Pages base="/portal/quotes" page={page} more={quotes.length > pageSize} query={{ company }} />
  </>;
}
