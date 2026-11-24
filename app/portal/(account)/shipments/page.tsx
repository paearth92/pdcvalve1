import { requirePortalCustomer } from '@/lib/portal/auth';
import { portalClient } from '@/lib/portal/db';
import { type Shipment, pageNumber, pageRange, pageSize, rows, shipmentColumns } from '@/lib/portal/queries';
import { param, type PortalSearch } from '@/components/portal/Feedback';
import { Pages } from '@/components/portal/Orders';
import { ShipmentTable } from '@/components/portal/Shipments';
import { PageHeading, Panel } from '@/components/portal/ui';

export default async function ShipmentsPage({ searchParams }: { searchParams: Promise<PortalSearch> }) {
  const search = await searchParams;
  const { organization } = await requirePortalCustomer(param(search, 'company'));
  const db = await portalClient();
  const company = organization.id;
  const page = pageNumber(param(search, 'page'));
  const shipments = await rows<Shipment>(db.from('portal_shipments').select(shipmentColumns).eq('organization_id', company).order('ship_date', { ascending: false, nullsFirst: false }).order('id').range(...pageRange(page)));
  const orderIds = Array.from(new Set(shipments.map((entry) => entry.order_id)));
  const orders = orderIds.length ? await rows<{ id: string; order_number: string }>(db.from('portal_orders').select('id,order_number').eq('organization_id', company).in('id', orderIds)) : [];
  return <>
    <PageHeading title="Shipments" description="View shipment records and open carrier tracking when a tracking number is available." />
    <Panel title="Shipment records"><ShipmentTable company={company} shipments={shipments.slice(0, pageSize)} orders={new Map(orders.map((order) => [order.id, order.order_number]))} /></Panel>
    <Pages base="/portal/shipments" page={page} more={shipments.length > pageSize} query={{ company }} />
  </>;
}
