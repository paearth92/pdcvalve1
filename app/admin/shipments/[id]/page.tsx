import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requirePortalStaff } from '@/lib/portal/auth';
import { portalClient } from '@/lib/portal/db';
import { type DocumentRecord, type LineFulfillment, type OrderLine, type Shipment, type ShipmentLine, documentColumns, record, recordId, rows, shipmentColumns } from '@/lib/portal/queries';
import { Feedback, type PortalSearch } from '@/components/portal/Feedback';
import { dateLabel } from '@/components/portal/format';
import { DocumentUpload } from '@/components/portal/OrderForms';
import { DocumentList, Tracking } from '@/components/portal/Orders';
import { ShipmentEditor } from '@/components/portal/ShipmentEditor';
import { DataTable, Facts, linkClass, PageHeading, Panel, Status } from '@/components/portal/ui';

export default async function AdminShipmentPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<PortalSearch> }) {
  const { permissions } = await requirePortalStaff('shipping.read');
  const id = recordId((await params).id);
  const db = await portalClient();
  const shipment = await record<Shipment>(db.from('portal_shipments').select(shipmentColumns).eq('id', id).maybeSingle());
  if (!shipment) notFound();
  const { organization_id: company, order_id: orderId } = shipment;
  const canReadOrders = permissions.includes('orders.read');
  const [order, lines, quantities, docs, balances] = await Promise.all([
    canReadOrders ? record<{ order_number: string }>(db.from('portal_orders').select('order_number').eq('id', orderId).eq('organization_id', company).maybeSingle()) : null,
    canReadOrders ? rows<OrderLine>(db.from('portal_order_items').select('id,line_number,description,sku,quantity_ordered').eq('order_id', orderId).eq('organization_id', company).order('line_number')) : [],
    rows<ShipmentLine>(db.from('portal_shipment_items').select('shipment_id,order_item_id,quantity').eq('shipment_id', id).eq('organization_id', company)),
    canReadOrders ? rows<DocumentRecord>(db.from('portal_documents').select(documentColumns).eq('shipment_id', id).eq('organization_id', company).order('created_at', { ascending: false })) : [],
    canReadOrders ? rows<LineFulfillment>(db.from('portal_line_fulfillment').select('*').eq('order_id', orderId).eq('organization_id', company)) : [],
  ]);
  const lineById = new Map(lines.map((line) => [line.id, line]));
  return <>
    <PageHeading title="Shipment details" back={{ label: 'Shipments', href: '/admin/shipments' }} />
    <Feedback searchParams={await searchParams} />
    <Panel title="Shipment record"><Facts entries={[
      ['Order', order ? <Link key="order" className={linkClass} href={`/admin/orders/${orderId}`}>{order.order_number}</Link> : '—'],
      ['Status', <Status key="status" value={shipment.status} />], ['Carrier', shipment.carrier ?? '—'],
      ['Tracking', <Tracking key="tracking" shipment={shipment} />], ['Ship date', dateLabel(shipment.ship_date)],
      ['Actual delivery date', dateLabel(shipment.delivered_at)],
    ]} /></Panel>
    <Panel title="Shipped items"><DataTable label="Shipment line items" columns={['Line', 'SKU', 'Product', 'Quantity']} empty="No quantities have been recorded." rows={quantities.map((entry) => {
      const line = lineById.get(entry.order_item_id);
      return [line?.line_number ?? '—', line?.sku ?? '—', line?.description ?? '—', entry.quantity];
    })} /></Panel>
    {canReadOrders && <Panel title="Documents"><DocumentList documents={docs} /></Panel>}
    {permissions.includes('shipping.write') && order && <Panel title="Correct shipment">
      <ShipmentEditor order={orderId} shipment={shipment} lines={lines} currentQuantities={Object.fromEntries(quantities.map((entry) => [entry.order_item_id, String(entry.quantity)]))} fulfillment={balances} />
    </Panel>}
    {permissions.includes('documents.manage') && <DocumentUpload order={orderId} shipment={id} />}
  </>;
}
