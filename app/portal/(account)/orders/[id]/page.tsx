import { notFound } from 'next/navigation';
import { requirePortalCustomer } from '@/lib/portal/auth';
import { portalClient } from '@/lib/portal/db';
import { type Order, listOrderDetails, orderColumns, record, recordId } from '@/lib/portal/queries';
import { param, type PortalSearch } from '@/components/portal/Feedback';
import { accountHref } from '@/components/portal/format';
import { OrderDetails } from '@/components/portal/OrderDetails';
import { PageHeading } from '@/components/portal/ui';

export default async function OrderPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<PortalSearch> }) {
  const { organization, canViewFinancials } = await requirePortalCustomer(param(await searchParams, 'company'));
  const id = recordId((await params).id);
  const db = await portalClient();
  const order = await record<Order>(db.from('portal_orders').select(orderColumns).eq('id', id).eq('organization_id', organization.id).maybeSingle());
  if (!order) notFound();
  const details = await listOrderDetails(db, order, { finance: canViewFinancials, shipping: true, customer: true });
  return <>
    <PageHeading title={`Order ${order.order_number}`} back={{ label: 'Orders', href: accountHref('/portal/orders', organization.id) }} />
    <OrderDetails order={order} details={details} finance={canViewFinancials} shipping />
  </>;
}
