import Link from 'next/link';
import { getPortalAccess } from '@/lib/portal/auth';
import { resetPasswordAction } from '@/lib/portal/actions';
import { hasRecoverySession } from '@/lib/portal/recovery';
import { Feedback, type PortalSearch } from '@/components/portal/Feedback';
import { AuthShell } from '@/components/portal/Shell';
import { buttonClass, Field, fieldClass, linkClass, Notice, PageHeading } from '@/components/portal/ui';

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<PortalSearch> }) {
  const [access, recoverySession] = await Promise.all([getPortalAccess(), hasRecoverySession()]);
  return (
    <AuthShell>
      <PageHeading title="Choose a new password" />
      <Feedback searchParams={await searchParams} />
      {access && recoverySession ? (
        <form action={resetPasswordAction} className="grid gap-4">
          <p className="text-sm text-[#526b5e]">Use at least 12 characters.</p>
          <Field label="New password"><input type="password" name="password" className={fieldClass} autoComplete="new-password" minLength={12} maxLength={128} required /></Field>
          <Field label="Confirm new password"><input type="password" name="confirm_password" className={fieldClass} autoComplete="new-password" minLength={12} maxLength={128} required /></Field>
          <button type="submit" className={buttonClass}>Save new password</button>
        </form>
      ) : <Notice error>Open the password reset link from your email, or <Link href="/portal/forgot-password" className={linkClass}>request a new link</Link>.</Notice>}
    </AuthShell>
  );
}
