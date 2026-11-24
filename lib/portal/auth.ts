import 'server-only';

import { cache } from 'react';
import type { User } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { portalClient, portalConfigured } from './db';

const staffPermissions = [
  'customers.read', 'customers.manage', 'orders.read', 'orders.write',
  'shipping.read', 'shipping.write', 'finance.read', 'documents.manage',
  'notes.write', 'integrations.read', 'integrations.manage', 'integrations.schedule',
  'audit.read',
] as const;
export type StaffPermission = typeof staffPermissions[number];
export type StaffRole = 'super_admin' | 'operations' | 'sales' | 'shipping' | 'finance' | 'integration_operator';

const permissionsByRole: Record<StaffRole, readonly StaffPermission[]> = {
  super_admin: staffPermissions,
  operations: ['customers.read', 'orders.read', 'orders.write', 'shipping.read', 'shipping.write',
    'documents.manage', 'notes.write', 'integrations.read', 'integrations.manage', 'integrations.schedule', 'audit.read'],
  sales: ['customers.read', 'customers.manage', 'orders.read', 'orders.write',
    'shipping.read', 'documents.manage', 'notes.write'],
  shipping: ['orders.read', 'shipping.read', 'shipping.write', 'documents.manage', 'notes.write'],
  finance: ['customers.read', 'orders.read', 'finance.read', 'documents.manage', 'audit.read'],
  integration_operator: ['integrations.read', 'integrations.schedule'],
};

export interface PortalOrganization {
  id: string;
  name: string;
  account_number: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  billing_address: Record<string, unknown> | null;
  shipping_addresses: Record<string, unknown>[];
  active: boolean;
}

export interface PortalProfile {
  user_id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  notification_preferences: Partial<Record<'quotes' | 'orders' | 'shipments' | 'invoices', boolean>>;
}

export interface PortalMembership {
  organization_id: string;
  can_view_financials: boolean;
  organization: PortalOrganization;
}

export interface PortalAccess {
  user: User;
  profile: PortalProfile | null;
  memberships: PortalMembership[];
  staffRole: StaffRole | null;
  permissions: readonly StaffPermission[];
}

export const getPortalAccess = cache(async (): Promise<PortalAccess | null> => {
  if (!portalConfigured()) return null;
  const client = await portalClient();
  const { data: { user }, error } = await client.auth.getUser();
  if (error || !user?.email_confirmed_at) return null;

  const [profile, organizations, staff] = await Promise.all([
    client.from('portal_profiles').select('user_id,full_name,email,phone,notification_preferences')
      .eq('user_id', user.id).maybeSingle(),
    client.from('portal_memberships').select('organization_id,can_view_financials,organization:portal_organizations!inner(id,name,account_number,contact_email,contact_phone,billing_address,shipping_addresses,active)')
      .eq('user_id', user.id).eq('active', true).eq('organization.active', true).order('organization_id'),
    client.from('portal_staff').select('role').eq('user_id', user.id).eq('active', true).maybeSingle(),
  ]);
  const staffRole = staff.data?.role as StaffRole | undefined;
  if (profile.error || organizations.error || staff.error) {
    // Fail closed even when the Auth service responds but policies or the database do not.
    return { user, profile: null, memberships: [], staffRole: null, permissions: [] };
  }
  return {
    user,
    profile: profile.data as PortalProfile | null,
    memberships: (organizations.data || []) as unknown as PortalMembership[],
    staffRole: staffRole && permissionsByRole[staffRole] ? staffRole : null,
    permissions: staffRole ? permissionsByRole[staffRole] || [] : [],
  };
});

export async function requirePortalCustomer(company?: string) {
  const access = await getPortalAccess();
  if (!access) redirect('/portal/login?next=%2Fportal%2Fdashboard');
  const membership = company
    ? access.memberships.find(entry => entry.organization_id === company)
    : access.memberships[0];
  if (!membership) redirect('/portal/access');
  return {
    ...access,
    organization: membership.organization,
    canViewFinancials: membership.can_view_financials,
  };
}

export async function requirePortalStaff(permission?: StaffPermission) {
  const access = await getPortalAccess();
  if (!access) redirect('/portal/login?next=%2Fadmin');
  if (!access.staffRole || (permission && !access.permissions.includes(permission))) {
    redirect('/portal/access');
  }
  return access;
}

export const requireStaff = requirePortalStaff;
