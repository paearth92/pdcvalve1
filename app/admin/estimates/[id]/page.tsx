import { notFound } from 'next/navigation';
import { requirePortalStaff } from '@/lib/portal/auth';
import { portalClient } from '@/lib/portal/db';
import { type DocumentRecord, type Quote, type QuoteLine, documentColumns, quoteColumns, record, recordId, rows } from '@/lib/portal/queries';
import { EstimateDetails } from '@/components/portal/EstimateDetails';
import { Feedback, type PortalSearch } from '@/components/portal/Feedback';
import { DocumentUpload } from '@/components/portal/OrderForms';
import { PageHeading } from '@/components/portal/ui';

export default async function AdminEstimatePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<PortalSearch> }) {
  const { permissions } = await requirePortalStaff('finance.read');
  const id = recordId((await params).id);
  const db = await portalClient();
  const quote = await record<Quote & { organization_id: string }>(db.from('portal_quotes').select(`${quoteColumns},organization_id`).eq('id', id).maybeSingle());
  if (!quote) notFound();
  const company = quote.organization_id;
  const [items, documents, order, organization] = await Promise.all([
    rows<QuoteLine>(db.from('portal_quote_items').select('id,line_number,sku,description,quantity,unit_price').eq('quote_id', id).eq('organization_id', company).order('line_number')),
    rows<DocumentRecord>(db.from('portal_documents').select(documentColumns).eq('quote_id', id).eq('organization_id', company)),
    quote.order_id && permissions.includes('orders.read') ? record<{ order_number: string }>(db.from('portal_orders').select('order_number').eq('id', quote.order_id).eq('organization_id', company).maybeSingle()) : null,
    record<{ name: string }>(db.from('portal_organizations').select('name').eq('id', company).maybeSingle()),
  ]);
  return <>
    <PageHeading title={`Estimate ${quote.quote_number}`} description={organization?.name} back={{ label: 'Estimates', href: '/admin/estimates' }} />
    <Feedback searchParams={await searchParams} />
    <EstimateDetails quote={quote} items={items} documents={documents} order={order && quote.order_id ? { href: `/admin/orders/${quote.order_id}`, label: order.order_number } : undefined} />
    {permissions.includes('documents.manage') && <DocumentUpload financial={{ id, kind: 'quote', returnTo: `/admin/estimates/${id}` }} />}
  </>;
}
