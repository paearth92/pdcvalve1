import { requirePortalStaff } from '@/lib/portal/auth';
import { portalClient } from '@/lib/portal/db';
import { type Shipment, pageNumber, pageRange, pageSize, rows, searchText, shipmentColumns } from '@/lib/portal/queries';
import { param, type PortalSearch } from '@/components/portal/Feedback';
import { Pages } from '@/components/portal/Orders';
import { ShipmentTable } from '@/components/portal/Shipments';
import { buttonClass, Field, fieldClass, PageHeading, Panel } from '@/components/portal/ui';

export default async function AdminShipmentsPage({ searchParams }: { searchParams: Promise<PortalSearch> }) {
  const { permissions } = await requirePortalStaff('shipping.read');
  const search = await searchParams;
  const db = await portalClient();
  const page = pageNumber(param(search, 'page'));
  const q = searchText(param(search, 'q'));
  let query = db.from('portal_shipments').select(shipmentColumns);
  if (q) query = query.or(`tracking_number.ilike.%${q}%,carrier.ilike.%${q}%`);
  const shipments = await rows<Shipment>(query.order('ship_date', { ascending: false, nullsFirst: false }).order('id').range(...pageRange(page)));
  const orderIds = Array.from(new Set(shipments.map((entry) => entry.order_id)));
  const orders = permissions.includes('orders.read') && orderIds.length ? await rows<{ id: string; order_number: string }>(db.from('portal_orders').select('id,order_number').in('id', orderIds)) : [];
  return <>
    <PageHeading title="Shipments" description="Open a shipment to review its contents or make a correction. Create new shipments from a sales order." />
    <form action="/admin/shipments" className="flex flex-wrap items-end gap-3 rounded-xl border border-[#d6e1da] bg-white p-4">
      <div className="min-w-0 flex-1"><Field label="Carrier or tracking number"><input className={fieldClass} name="q" type="search" defaultValue={q} maxLength={80} /></Field></div>
      <button type="submit" className={buttonClass}>Search</button>
    </form>
    <Panel title="Shipment records"><ShipmentTable admin shipments={shipments.slice(0, pageSize)} orders={new Map(orders.map((order) => [order.id, order.order_number]))} /></Panel>
    <Pages base="/admin/shipments" page={page} more={shipments.length > pageSize} query={{ q }} />
  </>;
}
