import type { Metadata } from 'next';
import Link from 'next/link';
import { DataTable, Field, Notice, PageHeading, Panel, Status, buttonClass, fieldClass, linkClass } from '@/components/portal/ui';
import { requirePortalStaff } from '@/lib/portal/auth';
import { portalClient } from '@/lib/portal/db';
import { MAPPING_FIELDS, type ColumnMap, type ImportRow } from '@/lib/portal/imports/parse';
import { applyImport, previewImport, resolveImportReview, saveImportSource } from './actions';

export const metadata: Metadata = { title: 'Imports' };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const notices: Record<string, string> = {
  source_saved: 'Source settings saved.',
  review_saved: 'Review resolution saved.',
  source_error: 'Could not save the source. Check for a duplicate name and complete all required mappings. To enable scheduled imports, apply a preview using the current mapping first.',
  invalid_source: 'Select an active import source.',
  invalid_file: 'Choose a CSV or XLSX file under 768 KiB.',
  invalid_job: 'Select a job from import history.',
  preview_error: 'Could not create a preview. Refresh the source settings and try again.',
  apply_error: 'Could not apply this job. Check that you created the preview and that the source settings are current.',
  review_error: 'Could not save the resolution. Check that the review is still open and add a brief reason.',
};

function formatDate(value: string | null) {
  if (!value) return '—';
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return '—';
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC',
  }).format(date) + ' UTC';
}

export default async function ImportsPage({ searchParams }: {
  searchParams: Promise<{ source?: string; job?: string; notice?: string }>;
}) {
  const access = await requirePortalStaff('integrations.read');
  const canManage = access.permissions.includes('integrations.manage');
  const query = await searchParams;
  const sourceId = query.source && UUID.test(query.source) ? query.source : null;
  const jobId = query.job && UUID.test(query.job) ? query.job : null;
  const db = await portalClient();
  const [sourcesResult, historyResult, reviewsResult, jobResult] = await Promise.all([
    db.from('portal_import_sources').select('id, name, sheet_name, column_map, active, allow_scheduled').order('name'),
    db.from('portal_import_jobs').select('id, filename, source_id, state, row_count, changed_count, error_count, created_at').order('created_at', { ascending: false }).limit(25),
    db.from('portal_import_reviews').select('id, job_id, row_number, message').is('resolved_at', null).order('job_id').limit(50),
    jobId
      ? db.from('portal_import_jobs').select('id, source_id, state, filename, created_by, row_count, changed_count, error_count, payload, findings').eq('id', jobId).maybeSingle()
      : Promise.resolve({ data: null, error: null }),
  ]);
  const sources = sourcesResult.data ?? [];
  const job = jobResult.data;
  const selected = sources.find((source) => source.id === (sourceId ?? job?.source_id));
  const history = historyResult.data ?? [];
  const reviews = reviewsResult.data ?? [];
  const mapping = selected?.column_map as ColumnMap | undefined;
  const findings = (job?.findings ?? []) as { row_number: number; message: string }[];
  const rows = (job && findings.length === 0 ? job.payload : []) as ImportRow[];
  const message = query.notice ? notices[query.notice] : undefined;
  const canApply = canManage && job?.created_by === access.user.id && findings.length === 0 &&
    (job.state === 'preview' || job.state === 'failed');

  return (
    <div className="grid gap-6">
      <PageHeading title="Operational imports" description="Review spreadsheet updates for existing sales orders before making them visible to customers." />
      <Link href="/admin/imports/erp" className={linkClass + ' w-fit text-sm'}>ERP order intake</Link>
      {message && <Notice error={!query.notice?.endsWith('_saved')}>{message}</Notice>}
      {(sourcesResult.error || historyResult.error || reviewsResult.error || jobResult.error) &&
        <Notice error>Some import records could not be loaded. Refresh the page and try again.</Notice>}

      {job && (
        <Panel title={job.filename}>
          <div className="grid gap-4 px-4 py-5 sm:px-6">
            <div className="flex flex-wrap items-center gap-3 text-sm text-[#526b5e]">
              <Status value={job.state} />
              <span>{job.row_count} rows</span>
              <span>{job.changed_count} changed</span>
              <span>{job.error_count} issues</span>
            </div>
            {job.state === 'preview' && <p className="text-sm text-[#526b5e]">Check the proposed values. Applying the import validates each row again against the current order and its field ownership.</p>}
            {job.state === 'failed' && findings.length === 0 && <Notice error>The database rolled back the batch. Try applying again after investigating the job logs.</Notice>}
            {canApply && (
              <form action={applyImport}>
                <input type="hidden" name="job_id" value={job.id} />
                <button type="submit" className={buttonClass}>{job.state === 'failed' ? 'Retry apply' : 'Apply reviewed import'}</button>
              </form>
            )}
          </div>
          {findings.length > 0 && <DataTable label="Import issues" columns={['Source row', 'Issue']} rows={findings.map((finding) => [finding.row_number, finding.message])} empty="No issues recorded." />}
          {rows.length > 0 && (
            <DataTable
              label="Proposed production updates"
              columns={['Row', 'Account', 'Order', 'Status', 'Ship estimate', 'Delivery estimate', 'Source updated']}
              rows={rows.map((row) => [
                row.row_number, row.account_number, row.order_number,
                row.status ? <Status value={row.status} /> : '—',
                row.estimated_ship_date ?? '—', row.estimated_delivery_date ?? '—', formatDate(row.source_updated_at),
              ])}
              empty="No proposed updates."
            />
          )}
        </Panel>
      )}

      <Panel title="Sources" action={canManage && selected ? { label: 'New source', href: '/admin/imports' } : undefined}>
        <DataTable
          label="Import sources"
          columns={['Source', 'Worksheet', 'Status', 'Schedule']}
          rows={sources.map((source) => [
            <Link href={'/admin/imports?source=' + source.id} className={linkClass}>{source.name}</Link>,
            source.sheet_name ?? 'First sheet',
            source.active ? 'Active' : 'Inactive',
            source.allow_scheduled ? 'Approved' : 'Manual review',
          ])}
          empty="No import sources configured."
        />
      </Panel>

      {selected?.active && canManage && (
        <Panel title={'Preview an upload for ' + selected.name}>
          <form action={previewImport} className="grid gap-4 p-4 sm:px-6">
            <p className="text-sm leading-relaxed text-[#526b5e]">Use a UTF-8 CSV or XLSX with up to 500 data rows. Format account and order numbers as text and replace formulas with values.</p>
            <input name="source_id" type="hidden" value={selected.id} />
            <Field label="CSV or XLSX file"><input className={fieldClass} name="file" type="file" accept=".csv,.xlsx" required /></Field>
            <button className={buttonClass + ' w-fit'} type="submit">Validate and preview</button>
          </form>
        </Panel>
      )}

      {canManage && (
        <Panel title={selected ? 'Edit source settings' : 'Configure a source'}>
          <form action={saveImportSource} className="grid gap-4 p-4 sm:px-6">
            <p className="text-sm leading-relaxed text-[#526b5e]">Enter the headers from the first row of the worksheet. Account and sales order must both match an existing record. Columns left blank will be ignored.</p>
            <input name="source_id" type="hidden" value={selected?.id ?? ''} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Source name"><input className={fieldClass} name="name" maxLength={100} defaultValue={selected?.name ?? ''} required /></Field>
              <Field label="Worksheet name (optional)"><input className={fieldClass} name="sheet_name" maxLength={100} defaultValue={selected?.sheet_name ?? ''} placeholder="First sheet by default" /></Field>
              {MAPPING_FIELDS.map(([key, label, required]) => (
                <Field key={key} label={required ? label : label + ' (optional)'}>
                  <input className={fieldClass} name={key} maxLength={100} defaultValue={mapping?.[key] ?? ''} placeholder={required ? label : undefined} required={required} />
                </Field>
              ))}
            </div>
            <label className="flex items-center gap-2 text-sm font-medium text-brand-green-dark"><input name="active" type="checkbox" defaultChecked={selected?.active ?? true} /> Active source</label>
            {selected && <label className="flex items-center gap-2 text-sm font-medium text-brand-green-dark"><input name="allow_scheduled" type="checkbox" defaultChecked={selected.allow_scheduled} /> Permit the scheduled worker after manual sign-off</label>}
            <button className={buttonClass + ' w-fit'} type="submit">Save source settings</button>
          </form>
        </Panel>
      )}

      <Panel title="Open conflicts">
        <DataTable
          label="Open import conflicts"
          columns={canManage ? ['Import', 'Source row', 'Issue', 'Resolution'] : ['Import', 'Source row', 'Issue']}
          rows={reviews.map((review) => [
            <Link href={'/admin/imports?job=' + review.job_id} className={linkClass}>View batch</Link>,
            review.row_number,
            review.message,
            ...(canManage ? [(
              <form action={resolveImportReview} className="grid min-w-48 gap-2">
                <input name="review_id" value={review.id} type="hidden" />
                <input name="resolution" aria-label={'Resolution for row ' + review.row_number} className={fieldClass} minLength={3} maxLength={240} required />
                <button type="submit" className={buttonClass}>Record resolution</button>
              </form>
            )] : []),
          ])}
          empty="No conflicts await review."
        />
      </Panel>

      <Panel title="Recent imports">
        <DataTable
          label="Recent imports"
          columns={['File', 'Source', 'Status', 'Rows', 'Changed', 'Issues', 'Created']}
          rows={history.map((entry) => [
            <Link href={'/admin/imports?job=' + entry.id} className={linkClass}>{entry.filename}</Link>,
            sources.find((source) => source.id === entry.source_id)?.name ?? '—',
            <Status value={entry.state} />, entry.row_count, entry.changed_count, entry.error_count, formatDate(entry.created_at),
          ])}
          empty="No files have been imported."
        />
      </Panel>
    </div>
  );
}
