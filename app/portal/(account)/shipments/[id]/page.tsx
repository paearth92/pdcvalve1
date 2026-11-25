import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requirePortalCustomer } from '@/lib/portal/auth';
import { portalClient } from '@/lib/portal/db';
import { type DocumentRecord, type OrderLine, type Shipment, type ShipmentLine, documentColumns, record, recordId, rows, shipmentColumns } from '@/lib/portal/queries';
import { param, type PortalSearch } from '@/components/portal/Feedback';
import { accountHref, dateLabel } from '@/components/portal/format';
import { DocumentList, Tracking } from '@/components/portal/Orders';
import { DataTable, Facts, linkClass, PageHeading, Panel, Status } from '@/components/portal/ui';

export default async function ShipmentPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<PortalSearch> }) {
  const { organization, canViewFinancials } = await requirePortalCustomer(param(await searchParams, 'company'));
  const id = recordId((await params).id);
  const db = await portalClient();
  const company = organization.id;
  const shipment = await record<Shipment>(db.from('portal_shipments').select(shipmentColumns).eq('id', id).eq('organization_id', company).maybeSingle());
  if (!shipment) notFound();
  let documents = db.from('portal_documents').select(documentColumns).eq('shipment_id', id).eq('organization_id', company).eq('customer_visible', true);
  if (!canViewFinancials) documents = documents.is('invoice_id', null).is('quote_id', null).not('kind', 'in', '(invoice,quote)');
  const [order, lines, quantities, docs] = await Promise.all([
    record<{ order_number: string }>(db.from('portal_orders').select('order_number').eq('id', shipment.order_id).eq('organization_id', company).maybeSingle()),
    rows<OrderLine>(db.from('portal_order_items').select('id,line_number,description,sku,quantity_ordered').eq('order_id', shipment.order_id).eq('organization_id', company).order('line_number')),
    rows<ShipmentLine>(db.from('portal_shipment_items').select('shipment_id,order_item_id,quantity').eq('shipment_id', id).eq('organization_id', company)),
    rows<DocumentRecord>(documents.order('created_at', { ascending: false })),
  ]);
  const byLine = new Map(quantities.map((entry) => [entry.order_item_id, entry.quantity]));
  return <>
    <PageHeading title="Shipment details" back={{ label: 'Shipments', href: accountHref('/portal/shipments', company) }} />
    <Panel title="Shipment"><Facts entries={[
      ['Order', order ? <Link key="order" className={linkClass} href={accountHref(`/portal/orders/${shipment.order_id}`, company)}>{order.order_number}</Link> : '—'],
      ['Status', <Status key="status" value={shipment.status} />],
      ['Carrier', shipment.carrier ?? '—'],
      ['Tracking', <Tracking key="tracking" shipment={shipment} />],
      ['Ship date', dateLabel(shipment.ship_date)],
      ['Actual delivery date', dateLabel(shipment.delivered_at)],
    ]} /></Panel>
    <Panel title="Shipment items"><DataTable label="Shipment line items" columns={['Line', 'SKU', 'Product', 'Shipment quantity']} empty="No quantities have been recorded for this shipment." rows={lines.filter((line) => byLine.has(line.id)).map((line) => [line.line_number, line.sku ?? '—', line.description, byLine.get(line.id)])} /></Panel>
    <Panel title="Shipment documents"><DocumentList documents={docs} /></Panel>
  </>;
}
