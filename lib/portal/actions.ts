'use server';

import { randomUUID } from 'node:crypto';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getPortalAccess, requirePortalStaff, type StaffPermission } from './auth';
import { portalSiteOrigin, safePortalPath } from './config';
import { clearPortalCookies, portalClient, portalConfigured, portalServiceClient } from './db';
import { hashInvitationToken, newInvitationToken, rememberPreparedInvitation } from './invitations';
import { clearRecoverySession, hasRecoverySession, portalRecoveryEnabled } from './recovery';

const uuid = z.string().uuid();
const email = z.string().trim().email().max(254).transform(value => value.toLowerCase());
const reason = z.string().trim().min(1).max(1000);
const password = z.string().min(12).refine(value => Buffer.byteLength(value, 'utf8') <= 72);
const date = z.string().date();
const statuses = z.enum([
  'received', 'confirmed', 'in_production', 'production_completed', 'ready_to_ship',
  'partially_shipped', 'shipped', 'delivered', 'closed', 'cancelled',
]);
const shipmentStatuses = z.enum(['pending', 'shipped', 'in_transit', 'delivered', 'cancelled']);
const documentKinds = z.enum(['order_confirmation','packing_slip','invoice','quote','product_documentation','shipping_document','other']);

function field(form: FormData, name: string) {
  const value = form.get(name);
  return typeof value === 'string' ? value : '';
}

function checked(form: FormData, name: string) {
  return ['on', 'true', '1'].includes(field(form, name));
}

function valueOrNull(form: FormData, name: string) {
  return field(form, name).trim() || null;
}

function feedback(path: string, key: 'error' | 'notice', value: string): never {
  const url = new URL(path, 'https://pdc.invalid');
  url.searchParams.set(key, value);
  redirect(url.pathname + url.search);
}

function passwordValue(form: FormData, path: string) {
  const proposed = password.safeParse(field(form, 'password'));
  if (!proposed.success || proposed.data !== field(form, 'confirm_password')) {
    feedback(path, 'error', 'invalid_password');
  }
  return proposed.data;
}

function adminError(error: { code?: string; message?: string }) {
  if (error.code === '42501') return 'access_denied';
  if (error.code === '23514' && error.message?.startsWith('Shipment quantity exceeds')) return 'shipment_quantity';
  if (['22023', '22007', '22P02', '23503', '23505', '23514'].includes(error.code ?? '')) return 'invalid_input';
  return 'operation_failed';
}

async function adminMutation(
  permission: StaffPermission,
  action: string,
  payload: Record<string, unknown>,
  path: string,
) {
  const access = await requirePortalStaff(permission);
  const client = await portalClient();
  const { data, error } = await client.rpc('portal_admin_mutate', { action, payload });
  if (error || typeof data !== 'string') feedback(path, 'error', error ? adminError(error) : 'operation_failed');
  return { id: data, access };
}

function refreshed(path: string, notice: string): never {
  revalidatePath('/admin', 'layout');
  revalidatePath('/portal', 'layout');
  feedback(path, 'notice', notice);
}

export async function loginAction(form: FormData) {
  const next = safePortalPath(field(form, 'next'), '/portal');
  const path = '/portal/login?next=' + encodeURIComponent(next);
  if (!portalConfigured()) feedback(path, 'error', 'portal_unavailable');
  const input = z.object({ email, password: z.string().min(1).max(128) }).safeParse({
    email: field(form, 'email'), password: field(form, 'password'),
  });
  if (!input.success) feedback(path, 'error', 'invalid_credentials');
  const client = await portalClient();
  const { data, error } = await client.auth.signInWithPassword(input.data);
  if (error || !data.user?.email_confirmed_at) feedback(path, 'error', 'invalid_credentials');
  await clearRecoverySession();
  redirect(next);
}

export async function signUpAction(form: FormData) {
  const path = '/portal/signup';
  const origin = portalSiteOrigin();
  if (!portalConfigured() || !origin) feedback(path, 'error', 'portal_unavailable');
  if (field(form, 'website').trim()) feedback('/portal/login', 'notice', 'verify_signup');
  const input = z.object({
    contact_name: z.string().trim().min(2).max(160),
    company_name: z.string().trim().min(2).max(200),
    email,
    phone: z.string().trim().max(60),
    account_number: z.string().trim().max(100),
  }).safeParse({
    contact_name: field(form, 'contact_name'),
    company_name: field(form, 'company_name'),
    email: field(form, 'email'),
    phone: field(form, 'phone'),
    account_number: field(form, 'account_number'),
  });
  if (!input.success) feedback(path, 'error', 'invalid_input');
  const proposed = passwordValue(form, path);
  const { email: signupEmail, ...registration } = input.data;
  const client = await portalClient();
  const { data, error } = await client.auth.signUp({
    email: signupEmail,
    password: proposed,
    options: {
      emailRedirectTo: new URL('/portal/auth/callback', origin).href,
      data: { pdc_registration: registration },
    },
  });
  if (error && error.code !== 'user_already_exists' && error.code !== 'email_exists') {
    feedback(path, 'error', error.code === 'over_email_send_rate_limit' ? 'signup_rate_limit' : 'signup_failed');
  }
  if (data.session) redirect('/portal');
  feedback('/portal/login', 'notice', 'verify_signup');
}

export async function reviewPortalAccessRequestAction(form: FormData) {
  const path = '/admin/access-requests';
  await requirePortalStaff('customers.manage');
  const input = z.object({
    request_id: uuid,
    decision: z.enum(['approved', 'declined']),
    organization_id: uuid.nullable(),
    reason: z.string().trim().min(5).max(1000),
  }).safeParse({
    request_id: field(form, 'request_id'),
    decision: field(form, 'decision'),
    organization_id: valueOrNull(form, 'organization_id'),
    reason: field(form, 'reason'),
  });
  if (!input.success) feedback(path, 'error', 'invalid_input');
  const client = await portalClient();
  const args = { target_id: input.data.request_id, change_reason: input.data.reason };
  if (input.data.decision === 'declined') {
    const { error } = await client.rpc('portal_decline_access_request', args);
    if (error) feedback(path, 'error', adminError(error));
  } else {
    const { error } = await client.rpc('portal_approve_signup', {
      ...args, existing_organization_id: input.data.organization_id,
    });
    if (error) feedback(path, 'error', adminError(error));
  }
  refreshed(path, input.data.decision === 'approved' ? 'signup_approved' : 'signup_declined');
}

export async function forgotPasswordAction(form: FormData) {
  const path = '/portal/forgot-password';
  const origin = portalSiteOrigin();
  if (!portalConfigured() || !origin || !portalRecoveryEnabled()) feedback(path, 'error', 'portal_unavailable');
  const parsed = email.safeParse(field(form, 'email'));
  if (!parsed.success) feedback(path, 'error', 'invalid_input');
  const client = await portalClient();
  await client.auth.resetPasswordForEmail(parsed.data, {
    redirectTo: new URL('/portal/auth/callback', origin).href,
  });
  // Account existence and provider responses are never reflected back to callers.
  feedback(path, 'notice', 'password_reset_requested');
}

export async function resetPasswordAction(form: FormData) {
  const path = '/portal/reset-password';
  if (!portalConfigured()) feedback(path, 'error', 'portal_unavailable');
  const client = await portalClient();
  if (!await hasRecoverySession(client)) feedback(path, 'error', 'invalid_link');
  const proposed = passwordValue(form, path);
  const { error } = await client.auth.updateUser({ password: proposed });
  if (error) feedback(path, 'error', 'invalid_password');
  await clearRecoverySession();
  await client.auth.signOut({ scope: 'global' });
  await clearPortalCookies();
  feedback('/portal/login', 'notice', 'password_updated');
}

export async function logoutAction() {
  if (portalConfigured()) {
    const client = await portalClient();
    await client.auth.signOut({ scope: 'local' });
    await clearPortalCookies();
  }
  await clearRecoverySession();
  redirect('/portal/login');
}

function accountPage(form: FormData, page: 'profile' | 'notifications') {
  const company = uuid.safeParse(field(form, 'company'));
  return '/portal/' + page + (company.success ? '?company=' + company.data : '');
}

export async function updateProfileAction(form: FormData) {
  const path = accountPage(form, 'profile');
  if (!(await getPortalAccess())?.memberships.length) feedback(path, 'error', 'access_denied');
  const input = z.object({ full_name: z.string().trim().max(200), phone: z.string().trim().max(60) }).safeParse({
    full_name: field(form, 'full_name'), phone: field(form, 'phone'),
  });
  if (!input.success) feedback(path, 'error', 'invalid_input');
  const client = await portalClient();
  const { error } = await client.rpc('portal_set_profile', {
    display_name: input.data.full_name,
    phone_number: input.data.phone,
    preferences: {
      quotes: checked(form, 'notify_quotes'),
      orders: checked(form, 'notify_orders'),
      shipments: checked(form, 'notify_shipments'),
      invoices: checked(form, 'notify_invoices'),
    },
  });
  if (error) feedback(path, 'error', 'operation_failed');
  revalidatePath('/portal', 'layout');
  feedback(path, 'notice', 'profile_updated');
}

export async function updatePasswordAction(form: FormData) {
  const path = accountPage(form, 'profile');
  const access = await getPortalAccess();
  if (!access?.memberships.length || !access.user.email) feedback(path, 'error', 'access_denied');
  const proposed = passwordValue(form, path);
  const previous = field(form, 'current_password');
  if (!previous || previous.length > 128) feedback(path, 'error', 'invalid_password');
  const client = await portalClient();
  const verification = await client.auth.signInWithPassword({ email: access.user.email, password: previous });
  if (verification.error || verification.data.user?.id !== access.user.id) {
    feedback(path, 'error', 'invalid_password');
  }
  const { error } = await client.auth.updateUser({ password: proposed, current_password: previous });
  if (error) feedback(path, 'error', 'invalid_password');
  await client.auth.signOut({ scope: 'others' });
  feedback(path, 'notice', 'password_updated');
}

export async function updateOrderAction(form: FormData) {
  const order = uuid.safeParse(field(form, 'order_id'));
  if (!order.success) feedback('/admin/orders', 'error', 'invalid_input');
  const path = '/admin/orders/' + order.data;
  const input = z.object({
    status: statuses,
    estimated_ship_date: date.nullable(),
    estimated_delivery_date: date.nullable(),
    reason,
  }).safeParse({
    status: field(form, 'status'),
    estimated_ship_date: valueOrNull(form, 'estimated_ship_date'),
    estimated_delivery_date: valueOrNull(form, 'estimated_delivery_date'),
    reason: field(form, 'reason'),
  });
  if (!input.success) feedback(path, 'error', 'invalid_input');
  await adminMutation('orders.write', 'update_order', {
    ...input.data, order_id: order.data, protected: checked(form, 'protected'),
  }, path);
  refreshed(path, 'order_updated');
}

export async function addOrderNoteAction(form: FormData) {
  const order = uuid.safeParse(field(form, 'order_id'));
  if (!order.success) feedback('/admin/orders', 'error', 'invalid_input');
  const path = '/admin/orders/' + order.data;
  const body = z.string().trim().min(1).max(4000).safeParse(field(form, 'body'));
  if (!body.success) feedback(path, 'error', 'invalid_input');
  await adminMutation('notes.write', 'add_note', { order_id: order.data, body: body.data, customer_visible: checked(form, 'customer_visible') }, path);
  refreshed(path, 'note_added');
}

export async function setOverrideProtectionAction(form: FormData) {
  const order = uuid.safeParse(field(form, 'order_id'));
  if (!order.success) feedback('/admin/orders', 'error', 'invalid_input');
  const path = '/admin/orders/' + order.data;
  const input = z.object({
    field_name: z.enum(['status', 'estimated_ship_date', 'estimated_delivery_date']),
    protected: z.enum(['true', 'false']),
    reason,
  }).safeParse({
    field_name: field(form, 'field_name'), protected: field(form, 'protected'),
    reason: field(form, 'reason'),
  });
  if (!input.success) feedback(path, 'error', 'invalid_input');
  await adminMutation('orders.write', 'set_override_protection', {
    ...input.data, order_id: order.data, protected: input.data.protected === 'true',
  }, path);
  refreshed(path, 'order_updated');
}

export async function saveShipmentAction(form: FormData) {
  const order = uuid.safeParse(field(form, 'order_id'));
  if (!order.success) feedback('/admin/orders', 'error', 'invalid_input');
  const path = '/admin/orders/' + order.data;
  let items: unknown;
  try {
    items = JSON.parse(field(form, 'items'));
  } catch {
    feedback(path, 'error', 'invalid_input');
  }
  const input = z.object({
    shipment_id: uuid.nullable(),
    status: shipmentStatuses,
    carrier: z.string().max(80).nullable(),
    tracking_number: z.string().max(160).nullable(),
    ship_date: date.nullable(),
    delivered_at: z.union([date, z.string().datetime({ offset: true }), z.string().datetime({ local: true })]).nullable(),
    reason: z.string().max(1000).nullable(),
    items: z.array(z.object({
      order_item_id: uuid,
      quantity: z.coerce.number().finite().positive().max(999_999_999_999),
    })).max(500),
  }).safeParse({
    shipment_id: valueOrNull(form, 'shipment_id'),
    status: field(form, 'status'),
    carrier: valueOrNull(form, 'carrier'),
    tracking_number: valueOrNull(form, 'tracking_number'),
    ship_date: valueOrNull(form, 'ship_date'),
    delivered_at: valueOrNull(form, 'delivered_at'),
    reason: valueOrNull(form, 'reason'),
    items,
  });
  if (!input.success) feedback(path, 'error', 'invalid_input');
  if (input.data.shipment_id && !input.data.reason) feedback(path, 'error', 'invalid_input');
  if (new Set(input.data.items.map(item => item.order_item_id)).size !== input.data.items.length) feedback(path, 'error', 'invalid_input');
  const { id } = await adminMutation('shipping.write', 'save_shipment', { ...input.data, order_id: order.data }, path);
  refreshed('/admin/shipments/' + id, 'shipment_saved');
}

const companyFields = z.object({
  name: z.string().trim().min(1).max(200),
  contact_email: email.nullable(),
  contact_phone: z.string().max(60).nullable(),
  reason,
});

function companyInput(form: FormData) {
  return {
    name: field(form, 'name'),
    contact_email: valueOrNull(form, 'contact_email'),
    contact_phone: valueOrNull(form, 'contact_phone'),
    reason: field(form, 'reason'),
  };
}

export async function createCompanyAction(form: FormData) {
  const path = '/admin/customers';
  const input = companyFields.extend({ account_number: z.string().max(100).nullable() }).safeParse({
    ...companyInput(form), account_number: valueOrNull(form, 'account_number'),
  });
  if (!input.success) feedback(path, 'error', 'invalid_input');
  const { id } = await adminMutation('customers.manage', 'create_company', input.data, path);
  refreshed(path + '/' + id, 'company_created');
}

export async function updateCompanyAction(form: FormData) {
  const organization = uuid.safeParse(field(form, 'organization_id'));
  if (!organization.success) feedback('/admin/customers', 'error', 'invalid_input');
  const path = '/admin/customers/' + organization.data;
  const input = companyFields.safeParse(companyInput(form));
  if (!input.success) feedback(path, 'error', 'invalid_input');
  await adminMutation('customers.manage', 'update_company', { ...input.data, organization_id: organization.data }, path);
  refreshed(path, 'company_updated');
}

export async function setMemberAccessAction(form: FormData) {
  const organization = uuid.safeParse(field(form, 'organization_id'));
  if (!organization.success) feedback('/admin/customers', 'error', 'invalid_input');
  const path = '/admin/customers/' + organization.data;
  const input = z.object({ user_id: uuid, active: z.enum(['true', 'false']), can_view_financials: z.enum(['true', 'false']).nullable() }).safeParse({
    user_id: field(form, 'user_id'), active: field(form, 'active'), can_view_financials: valueOrNull(form, 'can_view_financials'),
  });
  if (!input.success) feedback(path, 'error', 'invalid_input');
  const { user_id, active, can_view_financials } = input.data;
  await adminMutation('customers.manage', 'set_membership', {
    organization_id: organization.data, user_id, active: active === 'true',
    ...(can_view_financials !== null && { can_view_financials: can_view_financials === 'true' }),
  }, path);
  refreshed(path, 'membership_updated');
}

export async function revokeInvitationAction(form: FormData) {
  const organization = uuid.safeParse(field(form, 'organization_id'));
  if (!organization.success) feedback('/admin/customers', 'error', 'invalid_input');
  const path = '/admin/customers/' + organization.data;
  const invitation = uuid.safeParse(field(form, 'invitation_id'));
  if (!invitation.success) feedback(path, 'error', 'invalid_input');
  await adminMutation('customers.manage', 'revoke_invitation', {
    organization_id: organization.data, invitation_id: invitation.data,
  }, path);
  refreshed(path, 'invitation_revoked');
}

export async function createInvitationAction(form: FormData) {
  const organization = uuid.safeParse(field(form, 'organization_id'));
  if (!organization.success) feedback('/admin/customers', 'error', 'invalid_input');
  const path = '/admin/customers/' + organization.data;
  if (!portalSiteOrigin() || !portalServiceClient()) feedback(path, 'error', 'portal_unavailable');
  const contact = email.safeParse(field(form, 'email'));
  if (!contact.success) feedback(path, 'error', 'invalid_input');
  const token = newInvitationToken();
  const { id, access } = await adminMutation('customers.manage', 'create_invitation', {
    organization_id: organization.data,
    email: contact.data,
    can_view_financials: checked(form, 'can_view_financials'),
    token_hash: hashInvitationToken(token),
  }, path);
  await rememberPreparedInvitation({ organizationId: organization.data, id, token, actorId: access.user.id });
  refreshed(path, 'invitation_created');
}

export async function activateInvitationAction(form: FormData): Promise<string> {
  if (!portalConfigured()) return 'Portal activation is temporarily unavailable.';
  const service = portalServiceClient();
  const input = z.object({
    id: uuid, token: z.string().regex(/^[A-Za-z0-9_-]{43}$/), password,
  }).safeParse({ id: field(form, 'id'), token: field(form, 'token'), password: field(form, 'password') });
  if (!input.success) return 'Check the activation link and use a password of at least 12 characters.';
  if (!service) return 'Portal activation is temporarily unavailable.';
  const proof = hashInvitationToken(input.data.token);
  const { data: inviteEmail } = await service.rpc('portal_invitation_claim_email', { target_id: input.data.id, proof });
  if (typeof inviteEmail !== 'string') return 'This invitation is expired, revoked, or invalid. Contact PDC for a new link.';

  const client = await portalClient();
  const existing = await client.auth.signInWithPassword({ email: inviteEmail, password: input.data.password });
  if (!existing.data.user?.email_confirmed_at) {
    // Generates a Supabase invite proof without sending email. PDC distributes
    // the original, addressed activation link to its verified contact.
    const generated = await service.auth.admin.generateLink({ type: 'invite', email: inviteEmail });
    if (generated.error || generated.data.user.email_confirmed_at) {
      return 'If you already have PDC access, enter your existing password or use password recovery.';
    }
    const verified = await client.auth.verifyOtp({ type: 'invite', token_hash: generated.data.properties.hashed_token });
    if (verified.error || verified.data.user?.email?.toLowerCase() !== inviteEmail) {
      if (!verified.error) await client.auth.signOut({ scope: 'local' });
      return 'Activation could not be verified. Ask PDC for a new link.';
    }
    const updated = await client.auth.updateUser({ password: input.data.password });
    if (updated.error) {
      await client.auth.signOut({ scope: 'local' });
      return 'Your password could not be saved. Request a password reset or contact PDC.';
    }
  }

  const { data: company, error } = await client.rpc('portal_accept_invitation', { target_id: input.data.id, proof });
  if (error || typeof company !== 'string') {
    await client.auth.signOut({ scope: 'local' });
    return 'This invitation is expired, revoked, or invalid. Contact PDC for a new link.';
  }
  revalidatePath('/portal', 'layout');
  redirect('/portal/dashboard?company=' + company);
}

export async function uploadDocumentAction(form: FormData) {
  const access = await requirePortalStaff('documents.manage');
  const order = uuid.nullable().safeParse(valueOrNull(form, 'order_id'));
  if (!order.success) feedback('/admin/orders', 'error', 'invalid_input');
  const shipment = uuid.nullable().safeParse(valueOrNull(form, 'shipment_id'));
  const requestedPath = safePortalPath(field(form, 'return_to'), '/admin/invoices');
  const fallback = requestedPath.startsWith('/admin/') ? requestedPath : '/admin/invoices';
  const path = shipment.success && shipment.data ? '/admin/shipments/' + shipment.data
    : order.data ? '/admin/orders/' + order.data
    : fallback;
  const input = z.object({ title: z.string().trim().min(1).max(200), kind: documentKinds,
    shipment_id: uuid.nullable(), invoice_id: uuid.nullable(), quote_id: uuid.nullable() }).safeParse({
    title: field(form, 'title'), kind: field(form, 'kind'), shipment_id: valueOrNull(form, 'shipment_id'),
    invoice_id: valueOrNull(form, 'invoice_id'), quote_id: valueOrNull(form, 'quote_id'),
  });
  if (!input.success) feedback(path, 'error', 'invalid_input');
  if ((['invoice', 'quote'].includes(input.data.kind) || input.data.invoice_id || input.data.quote_id) &&
    !access.permissions.includes('finance.read')) feedback(path, 'error', 'access_denied');
  if (input.data.invoice_id && input.data.quote_id) feedback(path, 'error', 'invalid_input');
  const parentId = order.data || input.data.invoice_id || input.data.quote_id;
  if (!parentId || (!order.data && input.data.shipment_id)) feedback(path, 'error', 'invalid_input');
  const file = form.get('file');
  if (!(file instanceof File) || file.type !== 'application/pdf' || !file.name.toLowerCase().endsWith('.pdf')) {
    feedback(path, 'error', 'file_type');
  }
  if (file.size < 6 || file.size > 4 * 1024 * 1024) feedback(path, 'error', 'file_size');
  if (await file.slice(0, 5).text() !== '%PDF-') feedback(path, 'error', 'file_type');

  const client = await portalClient();
  const parentTable = order.data ? 'portal_orders'
    : input.data.invoice_id ? 'portal_invoices' : 'portal_quotes';
  const { data: parent } = await client.from(parentTable).select('organization_id').eq('id', parentId).maybeSingle();
  if (!parent) feedback(path, 'error', 'access_denied');
  const service = portalServiceClient();
  if (!service) feedback(path, 'error', 'portal_unavailable');
  const id = randomUUID();
  const objectPath = parent.organization_id + '/' + id + '.pdf';
  const storage = service.storage.from('pdc-portal-documents');
  const { error: uploadError } = await storage.upload(objectPath, file, { contentType: 'application/pdf', cacheControl: '0' });
  if (uploadError) feedback(path, 'error', 'operation_failed');

  const { error } = await client.rpc('portal_admin_mutate', {
    action: 'register_document', payload: {
      ...input.data, id, order_id: order.data, object_path: objectPath,
      size_bytes: file.size, customer_visible: checked(form, 'customer_visible'),
    },
  });
  if (error) {
    // An interrupted API response can follow a committed metadata insert.
    // Check state before compensating so an existing document is never removed.
    const { data: existing, error: checkError } = await service.from('portal_documents').select('id').eq('id', id).maybeSingle();
    if (!checkError && !existing) await storage.remove([objectPath]);
    if (!existing) feedback(path, 'error', adminError(error));
  }
  refreshed(path, 'document_uploaded');
}

export async function markNotificationReadAction(form: FormData) {
  const path = accountPage(form, 'notifications');
  if (!(await getPortalAccess())?.memberships.length) feedback(path, 'error', 'access_denied');
  const id = uuid.safeParse(field(form, 'notification_id'));
  if (!id.success) feedback(path, 'error', 'invalid_input');
  const client = await portalClient();
  const { error } = await client.rpc('portal_mark_notification_read', { target_id: id.data });
  if (error) feedback(path, 'error', adminError(error));
  revalidatePath('/portal', 'layout');
}
