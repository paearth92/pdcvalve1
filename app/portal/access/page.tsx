import Link from 'next/link';
import { redirect } from 'next/navigation';
import { portalClient } from '@/lib/portal/db';
import { RefreshPortal } from '@/components/portal/RefreshPortal';
import type { PortalSearch } from '@/components/portal/Feedback';
import { getPortalAccess } from '@/lib/portal/auth';
import { logoutAction } from '@/lib/portal/actions';
import { AuthShell } from '@/components/portal/Shell';
import { buttonClass, linkClass, PageHeading } from '@/components/portal/ui';

export default async function PortalAccessPage({ searchParams }: { searchParams: Promise<PortalSearch> }) {
  const access = await getPortalAccess();
  const checkingApproval = (await searchParams).approval === '1';
  if (checkingApproval && access?.memberships.length) redirect('/portal/dashboard');
  let review: string | undefined;
  if (access && !access.memberships.length) {
    const client = await portalClient();
    const { data } = await client.from('portal_access_requests').select('status')
      .eq('user_id', access.user.id).maybeSingle();
    review = data?.status;
  }
  const pending = review === 'pending';
  return (
    <AuthShell>
      {pending && checkingApproval && <RefreshPortal />}
      <PageHeading
        title={pending ? 'Awaiting PDC approval' : review === 'declined' ? 'Signup declined' : 'Access unavailable'}
        description={pending ? 'Your login is ready. PDC must approve access to your company’s records. This page updates automatically.' : 'Contact PDC if you need access.'}
      />
      <div className="flex flex-wrap items-center gap-4 text-sm">
        {access?.memberships.length ? <Link className={linkClass} href="/portal/dashboard">Customer dashboard</Link> : null}
        {access?.staffRole && <Link className={linkClass} href="/admin">Admin dashboard</Link>}
        <Link className={linkClass} href="/contact">Contact PDC</Link>
      </div>
      {access ? <form action={logoutAction}><button className={buttonClass} type="submit">Sign out</button></form> : <Link href="/portal/login" className={buttonClass}>Sign in</Link>}
    </AuthShell>
  );
}
