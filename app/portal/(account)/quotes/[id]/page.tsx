import { notFound } from 'next/navigation';
import { requirePortalCustomer } from '@/lib/portal/auth';
import { portalClient } from '@/lib/portal/db';
import { type DocumentRecord, type Quote, type QuoteLine, documentColumns, quoteColumns, record, recordId, rows } from '@/lib/portal/queries';
import { param, type PortalSearch } from '@/components/portal/Feedback';
import { EstimateDetails } from '@/components/portal/EstimateDetails';
import { accountHref } from '@/components/portal/format';
import { PageHeading } from '@/components/portal/ui';

export default async function EstimatePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<PortalSearch> }) {
  const { organization, canViewFinancials } = await requirePortalCustomer(param(await searchParams, 'company'));
  if (!canViewFinancials) notFound();
  const id = recordId((await params).id);
  const db = await portalClient();
  const company = organization.id;
  const quote = await record<Quote>(db.from('portal_quotes').select(quoteColumns).eq('id', id).eq('organization_id', company).neq('status', 'draft').maybeSingle());
  if (!quote) notFound();
  const [items, docs, order] = await Promise.all([
    rows<QuoteLine>(db.from('portal_quote_items').select('id,line_number,sku,description,quantity,unit_price').eq('quote_id', id).eq('organization_id', company).order('line_number')),
    rows<DocumentRecord>(db.from('portal_documents').select(documentColumns).eq('quote_id', id).eq('organization_id', company).eq('customer_visible', true)),
    quote.order_id ? record<{ order_number: string }>(db.from('portal_orders').select('order_number').eq('id', quote.order_id).eq('organization_id', company).maybeSingle()) : null,
  ]);
  return <>
    <PageHeading title={`Estimate ${quote.quote_number}`} back={{ label: 'Estimates', href: accountHref('/portal/quotes', company) }} />
    <EstimateDetails quote={quote} items={items} documents={docs} order={order && quote.order_id ? { label: order.order_number, href: accountHref(`/portal/orders/${quote.order_id}`, company) } : undefined} />
  </>;
}
