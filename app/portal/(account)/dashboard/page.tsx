import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ClipboardList, Factory, PackageCheck, Truck } from 'lucide-react';
import { requirePortalCustomer } from '@/lib/portal/auth';
import { portalClient } from '@/lib/portal/db';
import { type Activity, type Balance, type Order, type Shipment, activityColumns, exactCount, orderColumns, rows, shipmentColumns } from '@/lib/portal/queries';
import { ActivityList } from '@/components/portal/Activity';
import { param, type PortalSearch } from '@/components/portal/Feedback';
import { accountHref, dateLabel, money } from '@/components/portal/format';
import { Empty, Panel, Status } from '@/components/portal/ui';

const orderSummary = [
  { title: 'Open orders', icon: ClipboardList, statuses: ['received', 'confirmed', 'in_production', 'production_completed', 'ready_to_ship', 'partially_shipped', 'shipped'] },
  { title: 'In production', icon: Factory, statuses: ['in_production'] },
  { title: 'Ready to ship', icon: PackageCheck, statuses: ['ready_to_ship'] },
  { title: 'Partially shipped', icon: Truck, statuses: ['partially_shipped'] },
] as const;

export default async function DashboardPage({ searchParams }: { searchParams: Promise<PortalSearch> }) {
  const { organization, profile, canViewFinancials } = await requirePortalCustomer(param(await searchParams, 'company'));
  const db = await portalClient();
  const company = organization.id;
  const href = (path: string) => accountHref(path, company);
  const [counts, orders, shipments, activity, balances] = await Promise.all([
    Promise.all(orderSummary.map(({ statuses }) => exactCount(
      db.from('portal_orders').select('id', { count: 'exact', head: true }).eq('organization_id', company).in('status', statuses),
    ))),
    rows<Order>(db.from('portal_orders').select(orderColumns).eq('organization_id', company).order('order_date', { ascending: false }).order('id').limit(5)),
    rows<Shipment>(db.from('portal_shipments').select(shipmentColumns).eq('organization_id', company).in('status', ['in_transit', 'shipped']).order('ship_date', { ascending: false, nullsFirst: false }).order('id').limit(1)),
    rows<Activity>(db.from('portal_notifications').select(activityColumns).eq('organization_id', company).order('created_at', { ascending: false }).order('id').limit(3)),
    canViewFinancials ? rows<Balance>(db.from('portal_account_balances').select('*').eq('organization_id', company).order('currency')) : [],
  ]);
  const latestShipment = shipments[0];
  const firstName = profile?.full_name?.trim().split(/\s+/)[0];

  return <>
    <header className="relative isolate overflow-hidden rounded-xl border border-[#18392b] bg-[#0c2018] bg-[url('/images/home/hero-flow-desktop.webp')] bg-cover bg-right text-white">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0b281c] via-[#0b281c]/95 to-[#0b281c]/10" />
      <Image alt="" src="/images/portal/isolation-valve.webp" width={394} height={530} priority
        className="pointer-events-none absolute bottom-[-19%] right-[4%] hidden h-[117%] w-auto rotate-[-16deg] object-contain opacity-90 drop-shadow-[0_14px_24px_rgba(0,0,0,0.5)] md:block" />
      <div className="relative min-h-[178px] px-5 py-6 sm:px-8 sm:py-8 md:max-w-[70%] lg:min-h-[204px]">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b0dfbf]">Customer overview</p>
        <h1 className="mt-2 break-words text-[clamp(1.65rem,3vw,2.7rem)] font-extrabold leading-[1.1] tracking-tight">{organization.name}</h1>
        <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#d6e9de]">
          {firstName && <span>Welcome, {firstName}</span>}
          {organization.account_number && <span className={firstName ? 'border-l border-[#759888] pl-3' : undefined}>Account {organization.account_number}</span>}
        </p>
        <Link href={href('/portal/orders')} className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-md bg-white px-3.5 text-sm font-bold text-[#123d29] hover:bg-[#e3f3e9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">View orders <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
    </header>

    <dl aria-label="Order summary" className="grid grid-cols-2 gap-2.5 sm:gap-3 xl:grid-cols-4">
      {orderSummary.map(({ title, icon: Icon }, index) => (
        <div key={title} className="relative flex min-w-0 items-start justify-between gap-1 rounded-xl border border-[#d6e1da] bg-white px-3.5 py-3.5 sm:p-4">
          <div>
            <dt className="text-xs font-semibold text-[#3d6551]">{title}</dt>
            <dd className="mt-1 text-2xl font-extrabold leading-none tracking-tight text-brand-green-dark tabular-nums">{counts[index]}</dd>
          </div>
          <Icon size={18} strokeWidth={1.6} aria-hidden="true" className="shrink-0 text-[#448062]" />
        </div>
      ))}
    </dl>

    <div className="grid min-w-0 content-start gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
      <div className="grid min-w-0 content-start gap-5">
        <Panel title="Recent orders" action={{ label: 'All orders', href: href('/portal/orders') }}>
          {orders.length ? (
            <table className="w-full table-fixed text-left text-sm">
              <caption className="sr-only">Recent order records</caption>
              <thead className="bg-[#f4f8f5] text-xs text-[#3d6551]">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-semibold sm:px-6">Sales order</th>
                  <th scope="col" className="hidden px-3 py-2.5 font-semibold md:table-cell">Est. ship date</th>
                  <th scope="col" className="w-[46%] px-4 py-2.5 font-semibold sm:px-6 md:w-[33%]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e7eee9]">
                {orders.map(order => (
                  <tr key={order.id}>
                    <td className="px-4 py-3 sm:px-6">
                      <Link href={href('/portal/orders/' + order.id)} className="break-words font-bold text-brand-green-dark underline-offset-4 hover:underline">{order.order_number}</Link>
                      {order.customer_po && <span className="mt-0.5 block break-words text-xs text-[#526b5e]">PO {order.customer_po}</span>}
                    </td>
                    <td className="hidden px-3 py-3 text-xs text-[#526b5e] md:table-cell">{dateLabel(order.estimated_ship_date)}</td>
                    <td className="px-4 py-3 sm:px-6 [&_span]:whitespace-normal"><Status value={order.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <Empty message="No orders have been added to this account." />}
        </Panel>
        <Panel title="Recent activity" action={{ label: 'All activity', href: href('/portal/notifications') }}>
          <ActivityList entries={activity} company={company} />
        </Panel>
      </div>

      <div className="grid min-w-0 content-start gap-5">
        <Panel title="Shipment in progress" action={{ label: 'All shipments', href: href('/portal/shipments') }}>
          {latestShipment ? <div className="px-4 py-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-2"><Status value={latestShipment.status} /><span className="text-xs text-[#526b5e]">Shipped {dateLabel(latestShipment.ship_date)}</span></div>
            <Link className="mt-3 inline-flex items-center gap-1.5 break-all text-sm font-bold text-brand-green-dark underline-offset-4 hover:underline" href={href('/portal/shipments/' + latestShipment.id)}>
              {latestShipment.tracking_number || 'View shipment details'} <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
            {latestShipment.carrier && <p className="mt-1 text-xs text-[#526b5e]">{latestShipment.carrier}</p>}
          </div> : <Empty message="No shipments are currently on their way." />}
        </Panel>
        {canViewFinancials && <Panel title="Outstanding balance" action={{ label: 'View invoices', href: href('/portal/invoices') }}>
          {balances.length ? <dl className="divide-y divide-[#e7eee9]">
            {balances.map(balance => (
              <div key={balance.currency} className="px-4 py-4 sm:px-6">
                <dt className="text-xs font-semibold text-[#526b5e]">{balance.currency}</dt>
                <dd className="mt-1 break-words text-2xl font-extrabold tracking-tight text-brand-green-dark tabular-nums">{money(balance.outstanding_amount, balance.currency)}</dd>
                {balance.last_payment_date && <dd className="mt-2 text-xs text-[#526b5e]">Last payment {money(balance.last_payment_amount, balance.currency)} · {dateLabel(balance.last_payment_date)}</dd>}
              </div>
            ))}
          </dl> : <Empty message="No balances or payments have been recorded." />}
        </Panel>}
      </div>
    </div>
  </>;
}
