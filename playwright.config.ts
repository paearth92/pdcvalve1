import { defineConfig } from '@playwright/test';

const baseURL = process.env.PORTAL_QA_URL ?? 'http://localhost:3100';
const useLocalSupabase = process.env.PORTAL_QA_SUPABASE === 'true';
const isLocalSupabase = /^http:\/\/(127\.0\.0\.1|localhost):54321$/.test(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
);
if (useLocalSupabase && (!isLocalSupabase || baseURL !== 'http://localhost:3100')) {
  throw new Error('Authenticated portal QA requires the local Supabase stack and local website');
}

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 45_000,
  workers: 1,
  use: {
    baseURL,
    trace: 'retain-on-failure',
    channel: process.platform === 'win32' ? 'msedge' : undefined,
  },
  webServer: process.env.PORTAL_QA_URL ? undefined : {
    command: 'npm run dev -- --port 3100',
    url: baseURL,
    timeout: 180_000,
    env: useLocalSupabase ? { PORTAL_SITE_URL: baseURL, PORTAL_EMAIL_ENABLED: 'true' } : {
      NEXT_PUBLIC_SUPABASE_URL: '',
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: '',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: '',
      SUPABASE_SECRET_KEY: '',
      SUPABASE_SERVICE_ROLE_KEY: '',
      PORTAL_EMAIL_ENABLED: 'false',
    },
  },
});
