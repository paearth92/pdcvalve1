import Link from 'next/link';
import { portalConfigured } from '@/lib/portal/db';
import { forgotPasswordAction } from '@/lib/portal/actions';
import { portalRecoveryEnabled } from '@/lib/portal/recovery';
import { Feedback, type PortalSearch } from '@/components/portal/Feedback';
import { AuthShell } from '@/components/portal/Shell';
import { buttonClass, Field, fieldClass, linkClass, Notice, PageHeading } from '@/components/portal/ui';

export default async function ForgotPasswordPage({ searchParams }: { searchParams: Promise<PortalSearch> }) {
  return (
    <AuthShell>
      <PageHeading title="Reset your password" description="Enter the work email associated with your PDC account." />
      <Feedback searchParams={await searchParams} />
      {portalConfigured() && portalRecoveryEnabled() ? (
        <form action={forgotPasswordAction} className="grid gap-4">
          <Field label="Work email"><input type="email" name="email" className={fieldClass} autoComplete="username" maxLength={254} required /></Field>
          <button type="submit" className={buttonClass}>Request reset link</button>
        </form>
      ) : <Notice error>Password recovery is temporarily unavailable.</Notice>}
      <Link href="/portal/login" className={`w-fit text-sm ${linkClass}`}>Back to sign in</Link>
    </AuthShell>
  );
}
