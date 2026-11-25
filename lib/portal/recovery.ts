import 'server-only';

import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { portalClient } from './db';
import { portalCookieOptions } from './config';

const cookieName = 'pdc-portal-recovery';
const lifetimeSeconds = 10 * 60;

function key() {
  const secret = process.env.PORTAL_SESSION_SECRET;
  return secret && secret.length >= 32 ? secret : null;
}

function signature(value: string, secret: string) {
  return createHmac('sha256', secret).update('pdc-recovery:' + value).digest('base64url');
}

async function authenticatedSession(client: Awaited<ReturnType<typeof portalClient>>) {
  const { data, error } = await client.auth.getClaims();
  const session = data?.claims;
  if (error || typeof session?.session_id !== 'string' || !session.sub) return null;
  return [session.sub, session.session_id].join('.');
}

export function portalRecoveryEnabled() {
  return process.env.PORTAL_EMAIL_ENABLED === 'true' && key() !== null;
}

export async function markRecoverySession(client: Awaited<ReturnType<typeof portalClient>>) {
  const secret = key();
  if (!secret) return false;
  const session = await authenticatedSession(client);
  if (!session) return false;
  const value = [session, Math.floor(Date.now() / 1000) + lifetimeSeconds].join('.');
  (await cookies()).set(cookieName, value + '.' + signature(value, secret), {
    ...portalCookieOptions(), maxAge: lifetimeSeconds,
  });
  return true;
}

export async function hasRecoverySession(client?: Awaited<ReturnType<typeof portalClient>>) {
  const secret = key();
  const token = (await cookies()).get(cookieName)?.value;
  if (!secret || !token) return false;
  const [userId, sessionId, expiration, mac] = token.split('.');
  const expiresAt = Number(expiration);
  if (!mac || !Number.isSafeInteger(expiresAt) || expiresAt <= Date.now() / 1000) return false;
  const signed = [userId, sessionId, expiration].join('.');
  const expected = Buffer.from(signature(signed, secret));
  const actual = Buffer.from(mac);
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return false;
  return await authenticatedSession(client ?? await portalClient()) === [userId, sessionId].join('.');
}

export async function clearRecoverySession() {
  (await cookies()).delete(cookieName);
}
