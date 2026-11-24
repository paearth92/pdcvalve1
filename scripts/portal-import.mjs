import { open } from 'node:fs/promises';
import { basename } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
import { createClient } from '@supabase/supabase-js';
import { MAX_IMPORT_BYTES, mapSpreadsheet, readSpreadsheet } from '../lib/portal/imports/parse.ts';

function config(name) {
  const value = process.env[name];
  if (!value) throw new Error('Missing required worker setting: ' + name);
  return value;
}

async function boundedRead(path) {
  const file = await open(path, 'r');
  try {
    const stats = await file.stat();
    if (!stats.isFile() || stats.size === 0 || stats.size > MAX_IMPORT_BYTES) {
      throw new Error('Supply a regular input file under 768 KiB.');
    }
    const output = Buffer.alloc(MAX_IMPORT_BYTES + 1);
    let offset = 0;
    while (offset < output.length) {
      const { bytesRead } = await file.read(output, offset, output.length - offset);
      if (bytesRead === 0) break;
      offset += bytesRead;
    }
    if (offset > MAX_IMPORT_BYTES) throw new Error('The file exceeded 768 KiB during read.');
    return output.subarray(0, offset);
  } finally {
    await file.close();
  }
}

function transient(error) {
  return error && (error.status === 429 || error.status >= 500 || /^PGRST00[0-3]$/.test(error.code ?? ''));
}

async function retry(operation) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const result = await operation();
    if (!transient(result.error) && result.status !== 429 && !(result.status >= 500)) return result;
    if (attempt === 2) return result;
    await sleep(500 * (2 ** attempt) + Math.floor(Math.random() * 250));
  }
}

async function run() {
  const [input, ...extra] = process.argv.slice(2);
  if (!input || extra.length) throw new Error('Usage: node scripts/portal-import.mjs <approved-export.csv|xlsx>');
  const url = new URL(config('NEXT_PUBLIC_SUPABASE_URL'));
  if (url.protocol !== 'https:' && !['localhost', '127.0.0.1'].includes(url.hostname)) {
    throw new Error('The Supabase endpoint must use HTTPS.');
  }
  const sourceId = config('PORTAL_IMPORT_SOURCE_ID');
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(sourceId)) {
    throw new Error('PORTAL_IMPORT_SOURCE_ID is invalid.');
  }
  const db = createClient(url.href, config('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'), {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  const login = await retry(() => db.auth.signInWithPassword({
    email: config('PORTAL_IMPORT_USER_EMAIL'),
    password: config('PORTAL_IMPORT_USER_PASSWORD'),
  }));
  if (login.error || !login.data.session) throw new Error('Worker sign-in failed.');

  try {
    const source = await retry(() => db.from('portal_import_sources')
      .select('id, sheet_name, column_map, updated_at, allow_scheduled')
      .eq('id', sourceId).eq('active', true).maybeSingle());
    if (source.error || !source.data?.allow_scheduled) {
      throw new Error('Scheduled use of this source must be approved in the admin portal.');
    }
    const filename = basename(input).slice(0, 180);
    let parsed;
    try {
      const rows = await readSpreadsheet(filename, await boundedRead(input), source.data.sheet_name ?? undefined);
      parsed = mapSpreadsheet(rows, source.data.column_map);
    } catch {
      parsed = { rows: [], issues: [{ row_number: 2, message: 'The scheduled worker could not read or map the export file.' }] };
    }
    // Staging records an attempt. Avoid repeating this call after an ambiguous
    // response, as the server may already have created the corresponding job.
    const stage = await db.rpc('portal_stage_import', {
      p_source: sourceId, p_config: source.data.updated_at, p_filename: filename,
      p_rows: parsed.rows, p_findings: parsed.issues,
    });
    if (stage.error || !stage.data) throw new Error('Could not stage the import. Check import history before retrying.');
    const jobId = stage.data;
    const job = await retry(() => db.from('portal_import_jobs').select('state').eq('id', jobId).single());
    if (job.error) throw new Error('Could not verify the staged import: ' + jobId);
    if (job.data.state !== 'preview') throw new Error('Import requires review: ' + jobId + ' (' + job.data.state + ')');
    const applied = await retry(() => db.rpc('portal_apply_import', { p_job: jobId }));
    if (applied.error || applied.data !== 'applied') throw new Error('Import could not be applied: ' + jobId);
    console.log('Import applied: ' + jobId);
  } finally {
    await db.auth.signOut({ scope: 'local' });
  }
}

run().catch((error) => {
  console.error(error instanceof Error ? error.message : 'Import could not be completed.');
  process.exitCode = 1;
});
