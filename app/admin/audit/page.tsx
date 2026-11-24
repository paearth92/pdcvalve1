import Link from 'next/link';
import { requirePortalStaff } from '@/lib/portal/auth';
import { portalClient } from '@/lib/portal/db';
import { pageNumber, pageRange, pageSize, rows } from '@/lib/portal/queries';
import { param, type PortalSearch } from '@/components/portal/Feedback';
import { dateLabel } from '@/components/portal/format';
import { Pages } from '@/components/portal/Orders';
import { DataTable, linkClass, PageHeading, Panel, Status } from '@/components/portal/ui';

type Audit = { id: string; table_name: string; record_id: string; operation: string; changed_by: string | null; change_source: string; reason: string | null; previous_value: unknown; new_value: unknown; created_at: string };

function Changes({ entry }: { entry: Audit }) {
  const values = [
    { label: 'Previous value', value: entry.previous_value },
    { label: 'New value', value: entry.new_value },
  ];
  return <details className="min-w-32">
    <summary className={`cursor-pointer text-xs ${linkClass}`}>View values</summary>
    {values.map(({ label, value }) => <div key={label} className="mt-3">
      <p className="text-xs font-bold text-brand-green-dark">{label}</p>
      <pre className="mt-1 max-h-60 max-w-[min(190px,60vw)] overflow-auto whitespace-pre-wrap break-all rounded bg-[#eff5f1] p-2 text-xs">{value == null ? '—' : JSON.stringify(value, null, 2)}</pre>
    </div>)}
  </details>;
}

export default async function AuditPage({ searchParams }: { searchParams: Promise<PortalSearch> }) {
  const { permissions } = await requirePortalStaff('audit.read');
  const search = await searchParams;
  const page = pageNumber(param(search, 'page'));
  const db = await portalClient();
  const events = await rows<Audit>(db.from('portal_audit_log').select('id,table_name,record_id,operation,changed_by,change_source,reason,previous_value,new_value,created_at').order('created_at', { ascending: false }).order('id').range(...pageRange(page)));
  return <>
    <PageHeading title="Audit history" description="Review recorded changes, their source, and the values before and after the change." />
    <Panel title="Recent audit entries"><DataTable label="Audit history" columns={['Record', 'Operation', 'Date (UTC)', 'Changed by', 'Source', 'Reason', 'Values']} empty="No changes have been recorded." rows={events.slice(0, pageSize).map((entry) => [
      entry.table_name === 'portal_orders' && permissions.includes('orders.read')
        ? <Link key="record" href={`/admin/orders/${entry.record_id}`} className={linkClass}>Sales order</Link>
        : entry.table_name.replace(/^portal_/, '').replace(/_/g, ' '),
      <Status key="operation" value={entry.operation} />,
      <time key="date" dateTime={entry.created_at}>{dateLabel(entry.created_at)}<span className="block whitespace-nowrap text-xs text-[#526b5e]">{new Date(entry.created_at).toISOString().slice(11, 19)}</span></time>,
      <span key="actor" className="break-all text-xs">{entry.changed_by ?? 'System'}</span>, entry.change_source, entry.reason ?? '—', <Changes key="values" entry={entry} />,
    ])} /></Panel>
    <Pages base="/admin/audit" page={page} more={events.length > pageSize} query={{}} />
  </>;
}
