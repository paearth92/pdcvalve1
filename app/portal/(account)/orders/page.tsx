import { requirePortalCustomer } from '@/lib/portal/auth';
import { portalClient } from '@/lib/portal/db';
import { listOrders, pageNumber } from '@/lib/portal/queries';
import { param, type PortalSearch } from '@/components/portal/Feedback';
import { OrderSearch, OrderTable, Pages } from '@/components/portal/Orders';
import { PageHeading, Panel } from '@/components/portal/ui';

export default async function OrdersPage({ searchParams }: { searchParams: Promise<PortalSearch> }) {
  const search = await searchParams;
  const { organization } = await requirePortalCustomer(param(search, 'company'));
  const filters = {
    company: organization.id, query: param(search, 'q'), status: param(search, 'status'),
    from: param(search, 'from'), to: param(search, 'to'), sort: param(search, 'sort'),
  };
  const page = pageNumber(param(search, 'page'));
  const { orders, more } = await listOrders(await portalClient(), { ...filters, page });
  return <>
    <PageHeading title="Orders" description={organization.name} />
    <OrderSearch filters={filters} base="/portal/orders" company={organization.id} />
    <Panel title="Sales orders"><OrderTable orders={orders} base="/portal/orders" company={organization.id} /></Panel>
    <Pages base="/portal/orders" page={page} more={more} query={{ company: organization.id, q: filters.query, status: filters.status, from: filters.from, to: filters.to, sort: filters.sort }} />
  </>;
}
