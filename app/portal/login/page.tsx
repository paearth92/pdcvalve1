import Link from 'next/link';
import { portalConfigured } from '@/lib/portal/db';
import { loginAction } from '@/lib/portal/actions';
import { Feedback, param, type PortalSearch } from '@/components/portal/Feedback';
import { AuthShell } from '@/components/portal/Shell';
import { buttonClass, Field, fieldClass, linkClass, Notice, PageHeading } from '@/components/portal/ui';

export default async function LoginPage({ searchParams }: { searchParams: Promise<PortalSearch> }) {
  const search = await searchParams;
  return (
    <AuthShell>
      <PageHeading title="Sign in to PDC" description="Access your company’s orders, shipments and account records." />
      <Feedback searchParams={search} />
      {portalConfigured() ? (
        <form action={loginAction} className="grid gap-4">
          <input type="hidden" name="next" value={param(search, 'next') ?? '/portal'} />
          <Field label="Work email"><input className={fieldClass} type="email" name="email" autoComplete="username" maxLength={254} required /></Field>
          <Field label="Password"><input className={fieldClass} type="password" name="password" autoComplete="current-password" maxLength={128} required /></Field>
          <button className={buttonClass} type="submit">Sign in</button>
          <Link href="/portal/forgot-password" className={`w-fit text-sm ${linkClass}`}>Forgot password?</Link>
        </form>
      ) : <Notice error>Portal sign-in is temporarily unavailable.</Notice>}
      <p className="border-t border-[#e2ebe5] pt-4 text-xs leading-relaxed text-[#526b5e]">PDC provisions access for authorized contacts. <Link className={linkClass} href="/contact">Contact PDC</Link> for help with your account.</p>
    </AuthShell>
  );
}
