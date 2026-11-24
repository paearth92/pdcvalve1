import { redirect } from 'next/navigation';
import { getPortalAccess } from '@/lib/portal/auth';

export default async function PortalEntry() {
  const access = await getPortalAccess();
  if (!access) redirect('/portal/login');
  if (access.memberships.length) redirect('/portal/dashboard');
  if (access.staffRole) redirect('/admin');
  redirect('/portal/access?approval=1');
}
