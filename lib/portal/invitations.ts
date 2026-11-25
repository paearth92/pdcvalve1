import 'server-only';

import { createHash, randomBytes } from 'node:crypto';
import { cookies } from 'next/headers';
import { getPortalAccess } from './auth';
import { portalCookieOptions, portalSiteOrigin } from './config';

const cookieName = 'pdc-prepared-invitation';

export function newInvitationToken() {
  return randomBytes(32).toString('base64url');
}

export function hashInvitationToken(token: string) {
  return createHash('sha256').update(token, 'utf8').digest('hex');
}

export async function rememberPreparedInvitation(invite: {
  organizationId: string;
  id: string;
  token: string;
  actorId: string;
}) {
  (await cookies()).set(cookieName, JSON.stringify(invite), {
    ...portalCookieOptions(), path: '/admin/customers', maxAge: 120,
  });
}

export async function getPreparedInvitationLink(organizationId: string) {
  const origin = portalSiteOrigin();
  const saved = (await cookies()).get(cookieName)?.value;
  if (!origin || !saved) return null;
  try {
    const { organizationId: company, id, token, actorId } = JSON.parse(saved);
    const access = await getPortalAccess();
    if (!access || company !== organizationId || actorId !== access.user.id ||
      !access.permissions.includes('customers.manage') ||
      typeof id !== 'string' || typeof token !== 'string') return null;
    const link = new URL('/portal/activate', origin);
    link.hash = new URLSearchParams({ id, token }).toString();
    return link.href;
  } catch {
    return null;
  }
}
