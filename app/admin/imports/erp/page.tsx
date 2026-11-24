import type { Metadata } from 'next';
import Link from 'next/link';
import { DataTable, Field, Notice, PageHeading, Panel, Status, buttonClass, fieldClass, linkClass } from '@/components/portal/ui';
import { requirePortalStaff } from '@/lib/portal/auth';
import { portalClient } from '@/lib/portal/db';
import { applyErpBatch, approveErpSource, stageErpBatch } from './actions';

export const metadata: Metadata = { title: 'ERP order intake' };
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const notices: Record<string, string> = {
  source_saved: 'Source approval saved.',
  source_error: 'Could not save the source approval. Check the key, mapping revision and approval reference.',
  file_error: 'Choose an approved JSON export under 350 KiB containing 1 to 100 orders.',
  stage_error: 'Could not preview this batch. Check the source key and approved mapping revision, then check for duplicate order identifiers.',
  apply_error: 'Could not apply the batch. Confirm that you created the preview and that the mapping approval is current.',
};

type PreviewOrder = {
  external_id: string;
  account_number: string;
  order_number: string;
  lines: unknown[];
};

export default async function ErpIntakePage({ searchParams }: {
  searchParams: Promise<{ job?: string; notice?: string }>;
}) {
  const access = await requirePortalStaff('integrations.read');
  const canImport = access.permissions.includes('integrations.schedule');
  const canApprove = access.staffRole === 'super_admin';
  const query = await searchParams;
  const jobId = query.job && UUID.test(query.job) ? query.job : null;
  const db = await portalClient();
  const [sourcesResult, historyResult, batchResult] = await Promise.all([
    db.from('portal_erp_sources').select('source_key, mapping_revision, approval_reference, active').order('source_key'),
    db.from('portal_erp_batches').select('id, source_key, source_filename, state, order_count, changed_count').order('created_at', { ascending: false }).limit(25),
    jobId
      ? db.from('portal_erp_batches').select('id, source_filename, state, order_count, changed_count, created_by, findings, payload').eq('id', jobId).maybeSingle()
      : Promise.resolve({ data: null, error: null }),
  ]);
  const sources = sourcesResult.data ?? [];
  const history = historyResult.data ?? [];
  const batch = batchResult.data;
  const notice = query.notice ? notices[query.notice] : undefined;
  const findings = (batch?.findings ?? []) as { record: number; message: string }[];
  const rows = batch && findings.length === 0 ? batch.payload as PreviewOrder[] : [];
  const canApply = canImport && batch?.created_by === access.user.id &&
    (batch.state === 'preview' || batch.state === 'failed');

  return (
    <div className="grid gap-6">
      <PageHeading
        title="ERP order intake"
        description="Review normalized order exports from an approved source before publishing them to verified accounts."
        back={{ href: '/admin/imports', label: 'Operational imports' }}
      />
      {notice && <Notice error={query.notice !== 'source_saved'}>{notice}</Notice>}
      {(sourcesResult.error || historyResult.error || batchResult.error) &&
        <Notice error>Some ERP intake records could not be loaded.</Notice>}
      {batch && (
        <Panel title={batch.source_filename}>
          <div className="grid gap-4 p-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-3 text-sm text-[#526b5e]">
              <Status value={batch.state} />
              <span>{batch.order_count} orders</span>
              <span>{batch.changed_count} changed</span>
            </div>
            {batch.state === 'failed' && <Notice error>The database rolled back the batch. Review the logs before retrying.</Notice>}
            {canApply && <form action={applyErpBatch}>
              <input type="hidden" name="batch_id" value={batch.id} />
              <button type="submit" className={buttonClass}>{batch.state === 'failed' ? 'Retry import' : 'Apply reviewed orders'}</button>
            </form>}
          </div>
          {findings.length > 0
            ? <DataTable label="ERP batch problems" columns={['Record', 'Issue']} rows={findings.map((finding) => [finding.record, finding.message])} empty="No issues." />
            : <DataTable label="ERP orders in batch" columns={['Account', 'Order', 'External ID', 'Lines']}
                rows={rows.map((row) => [row.account_number, row.order_number, row.external_id, row.lines.length])} empty="No records." />}
        </Panel>
      )}
      <Panel title="Source approvals">
        <DataTable label="ERP source approvals" columns={['Source', 'Mapping revision', 'Reference', 'Status']}
          rows={sources.map((source) => [source.source_key, source.mapping_revision, source.approval_reference, source.active ? 'Active' : 'Disabled'])}
          empty="No ERP mappings have been approved." />
      </Panel>
      {canImport && sources.some((source) => source.active) && (
        <Panel title="Preview a normalized export">
          <form action={stageErpBatch} className="grid gap-4 p-4 sm:px-6">
            <p className="text-sm text-[#526b5e]">Upload JSON produced by an approved export adapter. Use the source key and revision shown above.</p>
            <Field label="Normalized JSON file"><input name="file" type="file" className={fieldClass} accept=".json,application/json" required /></Field>
            <button className={buttonClass + ' w-fit'} type="submit">Validate and preview</button>
          </form>
        </Panel>
      )}
      {canApprove && (
        <Panel title="Review mapping approval">
          <form action={approveErpSource} className="grid gap-4 p-4 sm:px-6">
            <p className="text-sm text-[#526b5e]">Approve a mapping after PDC has reviewed its source and validated the export in staging. Enter an existing source key to revise or disable it.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Source key"><input className={fieldClass} name="source_key" maxLength={48} pattern="[a-z0-9][a-z0-9_\-]{0,47}" required /></Field>
              <Field label="Mapping revision"><input className={fieldClass} name="revision" maxLength={80} required /></Field>
            </div>
            <Field label="Approval reference"><input className={fieldClass} name="reference" minLength={3} maxLength={240} placeholder="PDC acceptance ticket or reviewed specification" required /></Field>
            <label className="flex items-center gap-2 text-sm font-medium text-brand-green-dark"><input name="active" type="checkbox" /> Enable this revision</label>
            <button className={buttonClass + ' w-fit'} type="submit">Save approval</button>
          </form>
        </Panel>
      )}
      <Panel title="Recent ERP batches">
        <DataTable label="Recent ERP batches" columns={['Export', 'Source', 'Status', 'Orders', 'Changed']}
          rows={history.map((entry) => [
            <Link href={'/admin/imports/erp?job=' + entry.id} className={linkClass}>{entry.source_filename}</Link>,
            entry.source_key, <Status value={entry.state} />, entry.order_count, entry.changed_count,
          ])}
          empty="No ERP exports have been processed." />
      </Panel>
    </div>
  );
}
