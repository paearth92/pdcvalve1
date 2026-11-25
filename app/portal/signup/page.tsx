import Link from 'next/link';
import { AuthShell } from '@/components/portal/Shell';
import { Feedback, type PortalSearch } from '@/components/portal/Feedback';
import { buttonClass, Field, fieldClass, linkClass, Notice, PageHeading } from '@/components/portal/ui';
import { signUpAction } from '@/lib/portal/actions';
import { portalSiteOrigin } from '@/lib/portal/config';
import { portalConfigured } from '@/lib/portal/db';

export default async function SignUpPage({ searchParams }: { searchParams: Promise<PortalSearch> }) {
  const configured = portalConfigured() && Boolean(portalSiteOrigin());

  return (
    <AuthShell branded>
      <PageHeading title="Create your PDC account" description="Verify your work email after signing up. PDC will then review your access to company records." />
      <Feedback searchParams={await searchParams} />
      {configured ? <form action={signUpAction} className="grid gap-4">
        <div aria-hidden="true" className="hidden"><label>Website<input tabIndex={-1} name="website" autoComplete="off" /></label></div>
        <Field label="Your name"><input className={fieldClass} name="contact_name" autoComplete="name" minLength={2} maxLength={160} required /></Field>
        <Field label="Company name"><input className={fieldClass} name="company_name" autoComplete="organization" minLength={2} maxLength={200} required /></Field>
        <Field label="Work email"><input className={fieldClass} type="email" name="email" autoComplete="email" maxLength={254} required /></Field>
        <Field label="Phone (optional)"><input className={fieldClass} type="tel" name="phone" autoComplete="tel" maxLength={60} /></Field>
        <Field label="PDC account number (optional)"><input className={fieldClass} name="account_number" maxLength={100} /></Field>
        <Field label="Password (at least 12 characters)"><input className={fieldClass} type="password" name="password" autoComplete="new-password" minLength={12} maxLength={72} required /></Field>
        <Field label="Confirm password"><input className={fieldClass} type="password" name="confirm_password" autoComplete="new-password" minLength={12} maxLength={72} required /></Field>
        <button className={buttonClass} type="submit">Create account</button>
      </form> : <Notice error>Account signup is temporarily unavailable.</Notice>}
      <p className="border-t border-[#e2ebe5] pt-4 text-sm text-[#526b5e]">Already have an account? <Link className={linkClass} href="/portal/login">Sign in</Link></p>
    </AuthShell>
  );
}
