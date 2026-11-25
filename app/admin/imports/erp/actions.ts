'use server';

import { redirect } from 'next/navigation';
import { requirePortalStaff } from '@/lib/portal/auth';
import { portalClient } from '@/lib/portal/db';

const ERP = '/admin/imports/erp';
const SOURCE_KEY = /^[a-z0-9][a-z0-9_-]{0,47}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_ERP_BYTES = 350 * 1024;

function formText(form: FormData, name: string) {
  const value = form.get(name);
  return typeof value === 'string' ? value.trim() : '';
}

export async function approveErpSource(form: FormData) {
  const access = await requirePortalStaff('integrations.manage');
  if (access.staffRole !== 'super_admin') redirect('/portal/access');
  const key = formText(form, 'source_key');
  const revision = formText(form, 'revision');
  const reference = formText(form, 'reference');
  if (!SOURCE_KEY.test(key) || !revision || revision.length > 80 || reference.length < 3 || reference.length > 240) {
    redirect(ERP + '?notice=source_error');
  }
  const db = await portalClient();
  const { error } = await db.rpc('portal_approve_erp_source', {
    p_key: key,
    p_revision: revision,
    p_reference: reference,
    p_active: form.get('active') === 'on',
  });
  redirect(ERP + '?notice=' + (error ? 'source_error' : 'source_saved'));
}

export async function stageErpBatch(form: FormData) {
  await requirePortalStaff('integrations.schedule');
  const file = form.get('file');
  if (!file || typeof file === 'string' || !/\.json$/i.test(file.name) || !file.size || file.size > MAX_ERP_BYTES) {
    redirect(ERP + '?notice=file_error');
  }
  let payload: unknown;
  try {
    payload = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(await file.arrayBuffer()));
  } catch {
    redirect(ERP + '?notice=file_error');
  }
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) redirect(ERP + '?notice=file_error');
  const envelope = payload as { source_key?: unknown; mapping_revision?: unknown; orders?: unknown };
  if (
    typeof envelope.source_key !== 'string' || !SOURCE_KEY.test(envelope.source_key) ||
    typeof envelope.mapping_revision !== 'string' || !envelope.mapping_revision || envelope.mapping_revision.length > 80 ||
    !Array.isArray(envelope.orders) || envelope.orders.length < 1 || envelope.orders.length > 100
  ) redirect(ERP + '?notice=file_error');
  const db = await portalClient();
  const { data, error } = await db.rpc('portal_stage_erp_batch', {
    p_key: envelope.source_key,
    p_revision: envelope.mapping_revision,
    p_filename: file.name.split(/[\\/]/).at(-1)?.slice(0, 180) || 'ERP batch',
    p_orders: envelope.orders,
  });
  if (error || typeof data !== 'string') redirect(ERP + '?notice=stage_error');
  redirect(ERP + '?job=' + data);
}

export async function applyErpBatch(form: FormData) {
  await requirePortalStaff('integrations.schedule');
  const id = formText(form, 'batch_id');
  if (!UUID.test(id)) redirect(ERP + '?notice=apply_error');
  const db = await portalClient();
  const { error } = await db.rpc('portal_apply_erp_batch', { p_batch: id });
  redirect(ERP + '?job=' + id + (error ? '&notice=apply_error' : ''));
}
