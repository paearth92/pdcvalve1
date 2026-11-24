import Link from 'next/link';
import { AuthShell } from '@/components/portal/Shell';
import { linkClass, Notice, PageHeading } from '@/components/portal/ui';
import { portalConfigured } from '@/lib/portal/db';
import { ActivationForm } from './ActivationForm';

export default function ActivatePage() {
  return (
    <AuthShell>
      <PageHeading title="Activate PDC portal access" description="Choose a password of 12 or more characters. If you already use the portal, enter your existing password." />
      {portalConfigured() ? <ActivationForm /> : <Notice error>Portal activation is temporarily unavailable.</Notice>}
      <Link href="/portal/login" className={linkClass}>Back to sign in</Link>
    </AuthShell>
  );
}
