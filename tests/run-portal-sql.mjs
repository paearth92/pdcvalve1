import { readFile, readdir } from 'node:fs/promises';
import { PGlite } from '@electric-sql/pglite';

// Only the Supabase-owned interfaces used by our migrations. This lets us
// exercise actual PostgreSQL RLS and transactions without a cloud project.
const supabaseTestSchema = `
  create role anon nologin;
  create role authenticated nologin;
  create role service_role nologin bypassrls;
  create schema auth;
  create table auth.users (
    id uuid primary key,
    email text,
    role text,
    email_confirmed_at timestamptz,
    raw_user_meta_data jsonb default '{}'::jsonb
  );
  create function auth.uid() returns uuid language sql stable as $$
    select coalesce(
      nullif(current_setting('request.jwt.claim.sub', true), ''),
      nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub'
    )::uuid
  $$;
  grant usage on schema auth to anon, authenticated, service_role;
  create schema storage;
  create table storage.buckets (
    id text primary key,
    name text not null,
    public boolean default false,
    file_size_limit bigint,
    allowed_mime_types text[]
  );
  create table storage.objects (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    bucket_id text not null references storage.buckets(id),
    unique (bucket_id, name)
  );
  alter table storage.objects enable row level security;
  grant usage on schema storage to anon, authenticated, service_role;
  grant select, insert, update, delete on storage.objects to anon, authenticated, service_role;
`;

async function runFiles(db, path, label) {
  const directory = new URL(path, import.meta.url);
  const files = (await readdir(directory)).filter((name) => name.endsWith('.sql')).sort();
  if (files.length === 0) throw new Error(`No SQL files in ${path}`);
  for (const file of files) {
    try {
      await db.exec(await readFile(new URL(file, directory), 'utf8'));
      console.log(`${label}: ${file}`);
    } catch (error) {
      throw new Error(`${file}: ${error.message}`, { cause: error });
    }
  }
}

const db = new PGlite();
try {
  await db.exec(supabaseTestSchema);
  await runFiles(db, '../supabase/migrations/', 'Migration applied');
  if (!process.argv.includes('--migrations-only')) {
    await runFiles(db, '../supabase/tests/', 'Test passed');
  }
} finally {
  await db.close();
}
