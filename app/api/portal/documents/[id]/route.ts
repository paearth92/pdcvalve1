import { NextResponse } from 'next/server';
import { portalClient, portalConfigured } from '@/lib/portal/db';

const headers = { 'Cache-Control': 'private, no-store', 'Referrer-Policy': 'no-referrer' };
const invalid = () => NextResponse.json({ error: 'Document not found.' }, { status: 404, headers });

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!portalConfigured() || !/^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/i.test(id)) return invalid();
  const client = await portalClient();
  const { data: { user } } = await client.auth.getUser();
  if (!user?.email_confirmed_at) return invalid();

  const { data: document } = await client.from('portal_documents').select('object_path,title').eq('id', id).maybeSingle();
  if (!document) return invalid();
  const filename = document.title.replace(/[^a-z0-9._ -]/gi, '').slice(0, 120).trim() || 'pdc-document';
  const { data } = await client.storage.from('pdc-portal-documents').createSignedUrl(
    document.object_path, 60, { download: filename.endsWith('.pdf') ? filename : filename + '.pdf' },
  );
  if (!data) return invalid();
  return NextResponse.redirect(data.signedUrl, { status: 302, headers });
}
