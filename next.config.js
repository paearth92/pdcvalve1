const portalHeaders = [
  { key: 'Cache-Control', value: 'private, no-store, max-age=0' },
  { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'no-referrer' },
  { key: 'Content-Security-Policy', value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  outputFileTracingRoot: __dirname,
  images: { unoptimized: true },
  experimental: {
    serverActions: { bodySizeLimit: '5mb' },
  },
  async headers() {
    return ['/portal/:path*', '/admin/:path*', '/api/portal/:path*'].map((source) => ({
      source,
      headers: portalHeaders,
    }));
  },
};

module.exports = nextConfig;
