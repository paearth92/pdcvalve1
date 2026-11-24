import { requirePortalStaff } from '@/lib/portal/auth';
import { portalClient } from '@/lib/portal/db';
import { listOrders, pageNumber, rows } from '@/lib/portal/queries';
import { param, type PortalSearch } from '@/components/portal/Feedback';
import { OrderSearch, OrderTable, Pages } from '@/components/portal/Orders';
import { PageHeading, Panel } from '@/components/portal/ui';

export default async function AdminOrdersPage({ searchParams }: { searchParams: Promise<PortalSearch> }) {
  await requirePortalStaff('orders.read');
  const search = await searchParams;
  const db = await portalClient();
  const page = pageNumber(param(search, 'page'));
  const filters = { query: param(search, 'q'), status: param(search, 'status'), from: param(search, 'from'), to: param(search, 'to'), sort: param(search, 'sort') };
  const { orders, more } = await listOrders(db, { ...filters, page });
  const ids = Array.from(new Set(orders.map((order) => order.organization_id)));
  const companies = ids.length ? await rows<{ id: string; name: string }>(db.from('portal_organizations').select('id,name').in('id', ids)) : [];
  return <>
    <PageHeading title="Orders" description="Search by sales order number or customer purchase order." />
    <OrderSearch filters={filters} base="/admin/orders" />
    <Panel title="Sales orders"><OrderTable orders={orders} base="/admin/orders" companies={new Map(companies.map(({ id, name }) => [id, name]))} /></Panel>
    <Pages base="/admin/orders" page={page} more={more} query={{ q: filters.query, status: filters.status, from: filters.from, to: filters.to, sort: filters.sort }} />
  </>;
}
