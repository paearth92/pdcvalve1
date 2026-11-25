import Link from 'next/link';
import { requirePortalStaff, type StaffPermission } from '@/lib/portal/auth';
import { portalClient } from '@/lib/portal/db';
import { type Shipment, exactCount, rows, shipmentColumns } from '@/lib/portal/queries';
import { dateLabel } from '@/components/portal/format';
import { ShipmentTable } from '@/components/portal/Shipments';
import { DataTable, Empty, Metric, PageHeading, Panel, Status, linkClass } from '@/components/portal/ui';

type AuditSummary = { id: string; table_name: string; operation: string; change_source: string; created_at: string };

export default async function AdminPage() {
  const { permissions, staffRole } = await requirePortalStaff();
  const db = await portalClient();
  const has = (permission: StaffPermission) => permissions.includes(permission);
  const orderCount = () => db.from('portal_orders').select('id', { count: 'exact', head: true });
  const metricQueries = [
    ...(has('customers.read') ? [
      { label: 'Total customers', query: db.from('portal_organizations').select('id', { count: 'exact', head: true }) },
      { label: 'Active customer accounts', query: db.from('portal_organizations').select('id', { count: 'exact', head: true }).eq('active', true) },
    ] : []),
    ...(has('orders.read') ? [
      { label: 'Open orders', query: orderCount().in('status', ['received', 'confirmed', 'in_production', 'production_completed', 'ready_to_ship', 'partially_shipped', 'shipped']) },
      { label: 'In production', query: orderCount().eq('status', 'in_production') },
      { label: 'Ready to ship', query: orderCount().eq('status', 'ready_to_ship') },
      { label: 'Partially shipped', query: orderCount().eq('status', 'partially_shipped') },
      { label: 'Open orders missing ship date', query: orderCount().in('status', ['received', 'confirmed', 'in_production', 'production_completed', 'ready_to_ship', 'partially_shipped']).is('estimated_ship_date', null) },
    ] : []),
    ...(has('finance.read') ? [
      { label: 'Outstanding invoices', query: db.from('portal_invoices').select('id', { count: 'exact', head: true }).gt('outstanding_amount', 0).not('status', 'in', '(void,credited)') },
    ] : []),
    ...(has('integrations.read') ? [
      { label: 'Imports needing attention', query: db.from('portal_import_jobs').select('id', { count: 'exact', head: true }).in('state', ['failed', 'needs_review']) },
    ] : []),
  ];
  const [metrics, shipments, history] = await Promise.all([
    Promise.all(metricQueries.map(async ({ label, query }) => ({ label, value: await exactCount(query) }))),
    has('shipping.read') ? rows<Shipment>(db.from('portal_shipments').select(shipmentColumns).order('ship_date', { ascending: false, nullsFirst: false }).order('id').limit(6)) : [],
    has('audit.read') ? rows<AuditSummary>(db.from('portal_audit_log').select('id,table_name,operation,change_source,created_at').order('created_at', { ascending: false }).order('id').limit(6)) : [],
  ]);
  const orderIds = Array.from(new Set(shipments.map((shipment) => shipment.order_id)));
  const orders = has('orders.read') && orderIds.length ? await rows<{ id: string; order_number: string }>(db.from('portal_orders').select('id,order_number').in('id', orderIds)) : [];
  return <>
    <header className="rounded-2xl bg-brand-green-dark bg-[radial-gradient(circle_at_top_right,_#287350,_transparent_68%)] px-5 py-6 text-white sm:px-8 sm:py-8">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Operations overview</h1>
      {staffRole && <p className="mt-2 text-sm capitalize text-[#d8ebdf]">{staffRole.replace(/_/g, ' ')}</p>}
    </header>
    {metrics.length ? <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{metrics.map((metric) => <Metric key={metric.label} {...metric} />)}</div> : <Panel title="Records"><Empty message="No operational records are available to your role." /></Panel>}
    {has('shipping.read') && <Panel title="Recent shipments" action={{ label: 'All shipments', href: '/admin/shipments' }}><ShipmentTable admin shipments={shipments} orders={new Map(orders.map((order) => [order.id, order.order_number]))} /></Panel>}
    {has('audit.read') && <Panel title="Recent changes" action={{ label: 'Audit history', href: '/admin/audit' }}>
      <DataTable label="Recent changes" columns={['Record', 'Operation', 'Source', 'Date']} empty="No activity has been recorded." rows={history.map((entry) => [
        entry.table_name.replace(/^portal_/, '').replace(/_/g, ' '), <Status key="operation" value={entry.operation} />, entry.change_source, dateLabel(entry.created_at),
      ])} />
    </Panel>}
    {has('integrations.read') && <p className="text-sm"><Link href="/admin/imports" className={linkClass}>Review import history and source conflicts</Link></p>}
  </>;
}
