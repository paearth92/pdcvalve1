import Link from 'next/link';
import { getPortalAccess } from '@/lib/portal/auth';
import { logoutAction } from '@/lib/portal/actions';
import { AuthShell } from '@/components/portal/Shell';
import { buttonClass, linkClass, PageHeading } from '@/components/portal/ui';

export default async function PortalAccessPage() {
  const access = await getPortalAccess();
  return (
    <AuthShell>
      <PageHeading title="Access unavailable" description="Your account doesn’t have permission for this page. Contact PDC if you need access." />
      <div className="flex flex-wrap items-center gap-4 text-sm">
        {access?.memberships.length ? <Link className={linkClass} href="/portal/dashboard">Customer dashboard</Link> : null}
        {access?.staffRole && <Link className={linkClass} href="/admin">Admin dashboard</Link>}
        <Link className={linkClass} href="/contact">Contact PDC</Link>
      </div>
      {access ? <form action={logoutAction}><button className={buttonClass} type="submit">Sign out</button></form> : <Link href="/portal/login" className={buttonClass}>Sign in</Link>}
    </AuthShell>
  );
}
