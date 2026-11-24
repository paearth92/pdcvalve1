import 'server-only';

import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { portalCookieOptions, publicPortalConfig } from './config';

export function portalConfigured() {
  return publicPortalConfig() !== null;
}

export async function portalClient() {
  const config = publicPortalConfig();
  if (!config) throw new Error('PDC portal authentication is not configured');
  const cookieStore = await cookies();

  return createServerClient(config.url, config.key, {
    cookieOptions: portalCookieOptions(),
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll(values) {
        try {
          for (const { name, value, options } of values) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Server Components cannot write cookies. Middleware refreshes
          // sessions and persists the updated cookies before rendering.
        }
      },
    },
  });
}

export function portalServiceClient() {
  const config = publicPortalConfig();
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!config || !key) return null;
  return createClient(config.url, key, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  });
}

export async function clearPortalCookies() {
  const config = publicPortalConfig();
  if (!config) return;
  const project = new URL(config.url).hostname.split('.')[0];
  const tokenCookie = 'sb-' + project + '-auth-token';
  const cookieStore = await cookies();
  for (const { name } of cookieStore.getAll()) {
    if (name === tokenCookie || name.startsWith(tokenCookie + '.') ||
      name === tokenCookie + '-code-verifier' || name.startsWith(tokenCookie + '-code-verifier.')) {
      cookieStore.set(name, '', { ...portalCookieOptions(), maxAge: 0 });
    }
  }
}
