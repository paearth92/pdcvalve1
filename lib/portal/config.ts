// Only publishable material is read by the middleware.
export function publicPortalConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' && !['localhost', '127.0.0.1'].includes(parsed.hostname)) return null;
    return { url, key };
  } catch {
    return null;
  }
}

export function portalCookieOptions() {
  return {
    path: '/',
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
  };
}

export function safePortalPath(value: string | null | undefined, fallback = '/portal/dashboard') {
  if (!value || !/^\/(portal|admin)(?:[/?]|$)/.test(value) || /[\\\u0000-\u0020]/.test(value)) return fallback;
  try {
    const url = new URL(value, 'https://pdc.invalid');
    if (!/^\/(portal|admin)(?:\/|$)/.test(url.pathname)) return fallback;
    return url.pathname + url.search;
  } catch {
    return fallback;
  }
}

export function portalSiteOrigin() {
  const raw = process.env.PORTAL_SITE_URL;
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol === 'https:' || (url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname))) {
      return url.origin;
    }
  } catch {
    return null;
  }
  return null;
}
