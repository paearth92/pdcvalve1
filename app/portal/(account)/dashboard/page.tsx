import { requirePortalCustomer } from '@/lib/portal/auth';
import { portalClient } from '@/lib/portal/db';
import { type Activity, type Balance, type Order, activityColumns, exactCount, orderColumns, rows } from '@/lib/portal/queries';
import { ActivityList } from '@/components/portal/Activity';
import { param, type PortalSearch } from '@/components/portal/Feedback';
import { accountHref, dateLabel, money } from '@/components/portal/format';
import { OrderTable } from '@/components/portal/Orders';
import { Empty, Facts, Metric, Panel } from '@/components/portal/ui';

export default async function DashboardPage({ searchParams }: { searchParams: Promise<PortalSearch> }) {
  const { organization, profile, canViewFinancials, user } = await requirePortalCustomer(param(await searchParams, 'company'));
  const db = await portalClient();
  const company = organization.id;
  function ordersCount() {
    return db.from('portal_orders').select('id', { count: 'exact', head: true }).eq('organization_id', company);
  }
  const [totals, recentOrders, activity, balances] = await Promise.all([
    Promise.all([
      exactCount(ordersCount()),
      exactCount(ordersCount().in('status', ['received', 'confirmed', 'in_production', 'production_completed', 'ready_to_ship', 'partially_shipped', 'shipped'])),
      exactCount(ordersCount().eq('status', 'received')),
      exactCount(ordersCount().eq('status', 'in_production')),
      exactCount(ordersCount().eq('status', 'ready_to_ship')),
      exactCount(ordersCount().eq('status', 'partially_shipped')),
      exactCount(ordersCount().in('status', ['delivered', 'closed'])),
    ]),
    rows<Order>(db.from('portal_orders').select(orderColumns).eq('organization_id', company).order('order_date', { ascending: false }).order('id').limit(5)),
    rows<Activity>(db.from('portal_notifications').select(activityColumns).eq('organization_id', company).order('created_at', { ascending: false }).order('id').limit(6)),
    canViewFinancials ? rows<Balance>(db.from('portal_account_balances').select('*').eq('organization_id', company).order('currency')) : [],
  ]);
  const labels = ['Total orders', 'Open orders', 'Awaiting confirmation', 'In production', 'Ready to ship', 'Partially shipped', 'Completed'];

  return <>
    <header className="overflow-hidden rounded-2xl bg-brand-green-dark bg-[radial-gradient(circle_at_top_right,_#287350,_transparent_68%)] px-5 py-6 text-white shadow-sm sm:px-8 sm:py-8">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#c8e9d5]">Account overview</p>
      <h1 className="break-words text-3xl font-bold tracking-tight md:text-4xl">{organization.name}</h1>
      {organization.account_number && <p className="mt-2 text-sm text-[#d8ebdf]">Account {organization.account_number}</p>}
    </header>
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {labels.map((label, index) => <Metric key={label} label={label} value={totals[index]} />)}
    </div>
    {canViewFinancials && <Panel title="Account balances" action={{ label: 'View invoices', href: accountHref('/portal/invoices', company) }}>
      {balances.length ? <div className="divide-y divide-[#e4ece7]">{balances.map((balance) => <Facts key={balance.currency} entries={[
        ['Unpaid invoice balance', money(balance.outstanding_amount, balance.currency)],
        ['Last recorded payment', money(balance.last_payment_amount, balance.currency)],
        ['Payment date', dateLabel(balance.last_payment_date)],
      ]} />)}</div> : <Empty message="No balances or payments have been recorded." />}
    </Panel>}
    <Panel title="Recent orders" action={{ label: 'All orders', href: accountHref('/portal/orders', company) }}>
      <OrderTable base="/portal/orders" orders={recentOrders} company={company} />
    </Panel>
    <Panel title="Recent activity" action={{ label: 'All activity', href: accountHref('/portal/notifications', company) }}><ActivityList entries={activity} company={company} /></Panel>
    <Panel title="Account contact"><Facts entries={[
      ['Your name', profile?.full_name ?? '—'], ['Work email', user.email ?? '—'], ['Company phone', organization.contact_phone ?? '—'],
    ]} /></Panel>
  </>;
}
