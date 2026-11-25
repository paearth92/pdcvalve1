import { requirePortalCustomer } from '@/lib/portal/auth';
import { portalClient } from '@/lib/portal/db';
import { type Activity, activityColumns, pageNumber, pageRange, pageSize, rows } from '@/lib/portal/queries';
import { ActivityList } from '@/components/portal/Activity';
import { Feedback, param, type PortalSearch } from '@/components/portal/Feedback';
import { Pages } from '@/components/portal/Orders';
import { PageHeading, Panel } from '@/components/portal/ui';

export default async function NotificationsPage({ searchParams }: { searchParams: Promise<PortalSearch> }) {
  const search = await searchParams;
  const { user, organization } = await requirePortalCustomer(param(search, 'company'));
  const db = await portalClient();
  const company = organization.id;
  const page = pageNumber(param(search, 'page'));
  const notifications = await rows<Activity>(db.from('portal_notifications').select(activityColumns).eq('organization_id', company).order('created_at', { ascending: false }).order('id').range(...pageRange(page)));
  const entries = notifications.slice(0, pageSize);
  const read = entries.length ? await rows<{ notification_id: string }>(db.from('portal_notification_reads').select('notification_id').eq('user_id', user.id).in('notification_id', entries.map((entry) => entry.id))) : [];
  return <>
    <PageHeading title="Account activity" description={organization.name} />
    <Feedback searchParams={search} />
    <Panel title="Notifications"><ActivityList entries={entries} company={company} readIds={new Set(read.map((entry) => entry.notification_id))} /></Panel>
    <Pages base="/portal/notifications" page={page} more={notifications.length > pageSize} query={{ company }} />
  </>;
}
