import { NextResponse, type NextRequest } from 'next/server';
import { portalClient, portalConfigured } from '@/lib/portal/db';
import { portalSiteOrigin, safePortalPath } from '@/lib/portal/config';
import { clearRecoverySession, markRecoverySession } from '@/lib/portal/recovery';

export async function GET(request: NextRequest) {
  const origin = portalSiteOrigin() || request.nextUrl.origin;
  const params = request.nextUrl.searchParams;
  const redirectTo = (path: string) => {
    const response = NextResponse.redirect(new URL(path, origin));
    response.headers.set('Cache-Control', 'private, no-store');
    response.headers.set('Referrer-Policy', 'no-referrer');
    return response;
  };
  const invalid = '/portal/login?error=invalid_link';
  if (!portalConfigured()) return redirectTo('/portal/login?error=portal_unavailable');

  const tokenHash = params.get('token_hash');
  const code = params.get('code');
  const type = params.get('type');
  const client = await portalClient();

  if (type === 'recovery' && tokenHash && tokenHash.length <= 512) {
    const { error } = await client.auth.verifyOtp({ token_hash: tokenHash, type: 'recovery' });
    if (!error && await markRecoverySession(client)) return redirectTo('/portal/reset-password');
    await clearRecoverySession();
    if (!error) await client.auth.signOut({ scope: 'local' });
    return redirectTo(invalid);
  }

  // The configured password reset template routes through the verified
  // recovery token above; ordinary PKCE codes never authorize password reset.
  if (code && code.length <= 512 && !type) {
    const { error } = await client.auth.exchangeCodeForSession(code);
    if (!error) return redirectTo(safePortalPath(params.get('next'), '/portal'));
  }
  return redirectTo(invalid);
}
