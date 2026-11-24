import type { Metadata } from 'next';
import { requirePortalStaff, type StaffPermission } from '@/lib/portal/auth';
import { PortalShell } from '@/components/portal/Shell';
import type { PortalNavItem } from '@/components/portal/Navigation';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: { default: 'PDC Admin Portal', template: '%s | PDC Admin Portal' },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const access = await requirePortalStaff();
  const nav: (PortalNavItem & { permission?: StaffPermission })[] = [
    { key: 'dashboard', href: '/admin', label: 'Overview' },
    { key: 'customers', href: '/admin/customers', label: 'Customers', permission: 'customers.read' },
    { key: 'accessRequests', href: '/admin/access-requests', label: 'Customer signups', permission: 'customers.manage' },
    { key: 'orders', href: '/admin/orders', label: 'Orders', permission: 'orders.read' },
    { key: 'shipments', href: '/admin/shipments', label: 'Shipments', permission: 'shipping.read' },
    { key: 'invoices', href: '/admin/finance', label: 'Finance', permission: 'finance.read' },
    { key: 'quotes', href: '/admin/estimates', label: 'Estimates', permission: 'finance.read' },
    { key: 'imports', href: '/admin/imports', label: 'Imports', permission: 'integrations.read' },
    { key: 'audit', href: '/admin/audit', label: 'Audit history', permission: 'audit.read' },
  ];
  return <PortalShell mode="admin" items={nav.filter(({ permission }) => !permission || access.permissions.includes(permission))}>{children}</PortalShell>;
}
