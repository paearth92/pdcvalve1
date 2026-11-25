import { requirePortalCustomer } from '@/lib/portal/auth';
import { RefreshPortal } from '@/components/portal/RefreshPortal';
import { PortalShell } from '@/components/portal/Shell';
import type { PortalNavItem } from '@/components/portal/Navigation';

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const access = await requirePortalCustomer();
  const items: PortalNavItem[] = [
    { key: 'dashboard', href: '/portal/dashboard', label: 'Overview' },
    { key: 'orders', href: '/portal/orders', label: 'Orders' },
    { key: 'shipments', href: '/portal/shipments', label: 'Shipments' },
    { key: 'quotes', href: '/portal/quotes', label: 'Estimates' },
    { key: 'invoices', href: '/portal/invoices', label: 'Invoices' },
    { key: 'notifications', href: '/portal/notifications', label: 'Activity' },
    { key: 'profile', href: '/portal/profile', label: 'Profile' },
  ];
  return (
    <PortalShell mode="customer" items={items} staff={Boolean(access.staffRole)} companies={access.memberships.map(({ organization }) => ({ id: organization.id, name: organization.name }))}>
      <RefreshPortal />
      {children}
    </PortalShell>
  );
}
