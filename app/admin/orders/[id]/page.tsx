import { notFound } from 'next/navigation';
import { requirePortalStaff } from '@/lib/portal/auth';
import { portalClient } from '@/lib/portal/db';
import { type Order, listOrderDetails, orderColumns, record, recordId, rows } from '@/lib/portal/queries';
import { Feedback, type PortalSearch } from '@/components/portal/Feedback';
import { OrderDetails } from '@/components/portal/OrderDetails';
import { DocumentUpload, OrderEdit, OrderNoteForm, OverrideSettings, type OrderOverride } from '@/components/portal/OrderForms';
import { ShipmentEditor } from '@/components/portal/ShipmentEditor';
import { Empty, linkClass, PageHeading, Panel } from '@/components/portal/ui';
import Link from 'next/link';

export default async function AdminOrderPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<PortalSearch> }) {
  const { permissions } = await requirePortalStaff('orders.read');
  const id = recordId((await params).id);
  const db = await portalClient();
  const order = await record<Order>(db.from('portal_orders').select(orderColumns).eq('id', id).maybeSingle());
  if (!order) notFound();
  const finance = permissions.includes('finance.read');
  const shipping = permissions.includes('shipping.read');
  const canEdit = permissions.includes('orders.write');
  const [details, company, overrides] = await Promise.all([
    listOrderDetails(db, order, { finance, shipping }),
    record<{ id: string; name: string }>(db.from('portal_organizations').select('id,name').eq('id', order.organization_id).maybeSingle()),
    canEdit ? rows<OrderOverride>(db.from('portal_manual_overrides').select('field_name,protected,reason,updated_at').eq('order_id', id).eq('organization_id', order.organization_id).order('field_name')) : [],
  ]);
  return <>
    <PageHeading title={`Order ${order.order_number}`} description={company?.name} back={{ href: '/admin/orders', label: 'Orders' }} />
    <Feedback searchParams={await searchParams} />
    <OrderDetails order={order} details={details} finance={finance} shipping={shipping} />
    {canEdit && <><OrderEdit order={order} /><OverrideSettings order={order.id} overrides={overrides} /></>}
    {permissions.includes('notes.write') && <OrderNoteForm order={order.id} />}
    {permissions.includes('shipping.write') && <Panel title="Create shipment">
      {details.lines.length ? <ShipmentEditor order={order.id} lines={details.lines} currentQuantities={{}} fulfillment={details.lineFulfillment} /> : <Empty message="Add order line items through the order’s source system before recording a shipment." />}
    </Panel>}
    {shipping && details.shipments.length > 0 && <Panel title="Shipment records">
      <ul className="divide-y divide-[#e4ece7] px-4 sm:px-6">{details.shipments.map((shipment) => <li className="py-3 text-sm" key={shipment.id}><Link href={`/admin/shipments/${shipment.id}`} className={linkClass}>{shipment.tracking_number ?? shipment.carrier ?? 'Shipment details'}</Link></li>)}</ul>
    </Panel>}
    {permissions.includes('documents.manage') && <DocumentUpload order={order.id} />}
  </>;
}
