import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { portalCookieOptions, publicPortalConfig } from './lib/portal/config';

export async function middleware(request: NextRequest) {
  const config = publicPortalConfig();
  let response = NextResponse.next({ request });
  if (config) {
    const client = createServerClient(config.url, config.key, {
      cookieOptions: portalCookieOptions(),
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(values) {
          for (const { name, value } of values) request.cookies.set(name, value);
          response = NextResponse.next({ request });
          for (const { name, value, options } of values) response.cookies.set(name, value, options);
        },
      },
    });
    // Individual pages and mutations authorize via Auth and live DB permissions.
    if (request.cookies.getAll().some(({ name }) => /^sb-.+-auth-token(?:\.\d+)?$/.test(name))) {
      await client.auth.getUser();
    }
  }
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set('Referrer-Policy', 'no-referrer');
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
}

export const config = { matcher: ['/portal/:path*', '/admin/:path*', '/api/portal/:path*'] };
