'use server';

import { redirect } from 'next/navigation';
import { requirePortalStaff } from '@/lib/portal/auth';
import { portalClient } from '@/lib/portal/db';
import { MAPPING_FIELDS, MAX_IMPORT_BYTES, mapSpreadsheet, readSpreadsheet, type ColumnMap } from '@/lib/portal/imports/parse';

const IMPORTS = '/admin/imports';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function formText(form: FormData, name: string) {
  const value = form.get(name);
  return typeof value === 'string' ? value.trim() : '';
}

function sourceHref(sourceId: string | null, code: string) {
  const params = new URLSearchParams({ notice: code });
  if (sourceId) params.set('source', sourceId);
  return IMPORTS + '?' + params.toString();
}

export async function saveImportSource(form: FormData) {
  await requirePortalStaff('integrations.manage');
  const sourceId = formText(form, 'source_id') || null;
  if (sourceId && !UUID.test(sourceId)) redirect(sourceHref(null, 'invalid_source'));

  const columnMap: ColumnMap = {};
  for (const [key] of MAPPING_FIELDS) {
    const value = formText(form, key);
    if (value) columnMap[key] = value;
  }
  const active = form.get('active') === 'on';
  const db = await portalClient();
  const { data, error } = await db.rpc('portal_save_import_source', {
    p_id: sourceId,
    p_name: formText(form, 'name'),
    p_sheet: formText(form, 'sheet_name') || null,
    p_map: columnMap,
    p_active: active,
    p_schedule: active && form.get('allow_scheduled') === 'on',
  });
  if (error || typeof data !== 'string') redirect(sourceHref(sourceId, 'source_error'));
  redirect(sourceHref(data, 'source_saved'));
}

export async function previewImport(form: FormData) {
  await requirePortalStaff('integrations.manage');
  const sourceId = formText(form, 'source_id');
  if (!UUID.test(sourceId)) redirect(sourceHref(null, 'invalid_source'));
  const file = form.get('file');
  if (!file || typeof file === 'string' || !file.size || file.size > MAX_IMPORT_BYTES) {
    redirect(sourceHref(sourceId, 'invalid_file'));
  }
  const db = await portalClient();
  const { data: source, error: sourceError } = await db.from('portal_import_sources')
    .select('id, active, column_map, sheet_name, updated_at')
    .eq('id', sourceId).maybeSingle();
  if (sourceError || !source?.active) redirect(sourceHref(sourceId, 'invalid_source'));

  const fileName = file.name.split(/[\\/]/).at(-1)?.slice(0, 180) || 'Uploaded file';
  let parsed: ReturnType<typeof mapSpreadsheet>;
  try {
    const rows = await readSpreadsheet(fileName, Buffer.from(await file.arrayBuffer()), source.sheet_name ?? undefined);
    parsed = mapSpreadsheet(rows, source.column_map as ColumnMap);
  } catch (error) {
    parsed = {
      rows: [],
      issues: [{
        row_number: 2,
        message: error instanceof Error && error.name === 'Error'
          ? error.message.slice(0, 240)
          : 'The file could not be read. Check its format and source mapping.',
      }],
    };
  }
  const { data, error } = await db.rpc('portal_stage_import', {
    p_source: sourceId,
    p_config: source.updated_at,
    p_filename: fileName,
    p_rows: parsed.rows,
    p_findings: parsed.issues,
  });
  if (error || typeof data !== 'string') redirect(sourceHref(sourceId, 'preview_error'));
  redirect(IMPORTS + '?source=' + sourceId + '&job=' + data);
}

export async function applyImport(form: FormData) {
  await requirePortalStaff('integrations.manage');
  const jobId = formText(form, 'job_id');
  if (!UUID.test(jobId)) redirect(sourceHref(null, 'invalid_job'));
  const db = await portalClient();
  const { error } = await db.rpc('portal_apply_import', { p_job: jobId });
  redirect(IMPORTS + '?job=' + jobId + (error ? '&notice=apply_error' : ''));
}

export async function resolveImportReview(form: FormData) {
  await requirePortalStaff('integrations.manage');
  const id = formText(form, 'review_id');
  const reason = formText(form, 'resolution');
  if (!UUID.test(id) || reason.length < 3 || reason.length > 240) {
    redirect(sourceHref(null, 'review_error'));
  }
  const db = await portalClient();
  const { error } = await db.rpc('portal_resolve_import_review', { p_review: id, p_resolution: reason });
  redirect(sourceHref(null, error ? 'review_error' : 'review_saved'));
}
