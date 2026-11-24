import Link from 'next/link';
import { portalConfigured } from '@/lib/portal/db';
import { loginAction } from '@/lib/portal/actions';
import { Feedback, param, type PortalSearch } from '@/components/portal/Feedback';
import { AuthShell } from '@/components/portal/Shell';
import { buttonClass, Field, fieldClass, linkClass, Notice, PageHeading } from '@/components/portal/ui';

export default async function LoginPage({ searchParams }: { searchParams: Promise<PortalSearch> }) {
  const search = await searchParams;
  const next = param(search, 'next') ?? '/portal';
  const admin = /^\/admin(?:[/?]|$)/.test(next);
  return (
    <AuthShell>
      <PageHeading title={admin ? "PDC admin sign in" : "Sign in to PDC"} description={admin ? "Manage customer accounts, orders and shipments." : "Access your company’s orders, shipments and account records."} />
      <Feedback searchParams={search} />
      {portalConfigured() ? (
        <form action={loginAction} className="grid gap-4">
          <input type="hidden" name="next" value={next} />
          <Field label="Work email"><input className={fieldClass} type="email" name="email" autoComplete="username" maxLength={254} required /></Field>
          <Field label="Password"><input className={fieldClass} type="password" name="password" autoComplete="current-password" maxLength={128} required /></Field>
          <button className={buttonClass} type="submit">Sign in</button>
          <Link href="/portal/forgot-password" className={`w-fit text-sm ${linkClass}`}>Forgot password?</Link>
        </form>
      ) : <Notice error>The sign-in service is not connected to this preview yet. PDC must connect the approved customer database before accounts can be created or used.</Notice>}
      {!admin && <div className="grid gap-2 border-t border-[#e2ebe5] pt-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="text-sm font-bold text-brand-green-dark">New to the customer portal?</p>
          <p className="mt-1 text-xs leading-relaxed text-[#526b5e]">Create an account with your work email. PDC approves access to your company’s records.</p>
        </div>
        <Link className={`${buttonClass} w-full sm:w-auto`} href="/portal/signup">Sign up</Link>
      </div>}
      <p className="text-xs leading-relaxed text-[#526b5e]"><Link className={linkClass} href="/contact">Contact PDC</Link> for help with an existing account.</p>
    </AuthShell>
  );
}
