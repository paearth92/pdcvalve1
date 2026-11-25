import { randomUUID } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';
import { expect, test, type APIRequestContext, type Page } from '@playwright/test';

type FixtureRecord = Record<string, unknown>;
type FixtureDatabase = {
  public: {
    Tables: Record<string, {
      Row: FixtureRecord;
      Insert: FixtureRecord;
      Update: FixtureRecord;
      Relationships: [];
    }>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};

test.describe('PDC portal with an isolated Supabase stack', () => {
  test.skip(process.env.PORTAL_QA_SUPABASE !== 'true', 'Requires a local Supabase test stack');
  const password = 'Fixture-only-password-37!';
  const orderA = randomUUID();
  const orderB = randomUUID();
  const companyA = randomUUID();
  const companyB = randomUUID();
  const documentB = randomUUID();
  const orderLine = randomUUID();
  const shippingUser = randomUUID().slice(0, 8);
  const emailA = `customer-a-${orderA.slice(0, 8)}@example.test`;
  const adminEmail = `admin-${shippingUser}@example.test`;
  const staffEmail = `shipping-${shippingUser}@example.test`;
  let service: ReturnType<typeof createClient<FixtureDatabase>>;

  test.beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
    const key = process.env.SUPABASE_SECRET_KEY ?? '';
    if (!/^http:\/\/(127\.0\.0\.1|localhost):54321$/.test(url) || !key) {
      throw new Error('Fixtures can only run against the isolated local Supabase stack');
    }
    service = createClient<FixtureDatabase>(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const customer = await service.auth.admin.createUser({ email: emailA, password, email_confirm: true });
    const staff = await service.auth.admin.createUser({ email: staffEmail, password, email_confirm: true });
    const admin = await service.auth.admin.createUser({ email: adminEmail, password, email_confirm: true });
    if (customer.error || staff.error || admin.error || !customer.data.user || !staff.data.user || !admin.data.user) {
      throw new Error('Could not create isolated fixture users');
    }

    await insert('portal_organizations', [
      { id: companyA, name: 'QA Valve Buyer A' },
      { id: companyB, name: 'QA Valve Buyer B' },
    ]);
    await insert('portal_memberships', [{ user_id: customer.data.user.id, organization_id: companyA }]);
    await insert('portal_staff', [
      { user_id: staff.data.user.id, role: 'shipping' },
      { user_id: admin.data.user.id, role: 'super_admin' },
    ]);
    await insert('portal_orders', [
      { id: orderA, organization_id: companyA, order_number: 'QA-ORDER-A', order_date: '2026-01-01' },
      { id: orderB, organization_id: companyB, order_number: 'QA-ORDER-B', order_date: '2026-01-01' },
    ]);
    await insert('portal_order_items', [{
      id: orderLine, order_id: orderA, organization_id: companyA, line_number: 1,
      sku: 'QA-VALVE', description: 'Valve fixture', quantity_ordered: 100,
    }]);
    for (const quantity of [40, 35]) {
      const shipmentId = randomUUID();
      await insert('portal_shipments', [{
        id: shipmentId, order_id: orderA, organization_id: companyA, status: 'shipped', ship_date: '2026-01-02',
      }]);
      await insert('portal_shipment_items', [{
        shipment_id: shipmentId, order_id: orderA, organization_id: companyA,
        order_item_id: orderLine, quantity,
      }]);
    }
    await insert('portal_documents', [{
      id: documentB, organization_id: companyB, order_id: orderB, kind: 'order_confirmation',
      title: 'QA private document B', object_path: `${companyB}/${documentB}.pdf`,
      size_bytes: 8, customer_visible: true,
    }]);
  });

  async function insert(table: string, records: Record<string, unknown>[]) {
    const { error } = await service.from(table).insert(records);
    if (error) throw new Error(`Could not seed ${table}: ${error.message}`);
  }

  async function login(page: Page, email: string, next: string, credential = password) {
    await page.goto(`/portal/login?next=${encodeURIComponent(next)}`);
    await page.getByLabel('Work email').fill(email);
    await page.getByLabel('Password', { exact: true }).fill(credential);
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    await page.waitForURL((url) => url.pathname === next);
  }

  test('customer sign-in, order isolation, partial shipments and private documents', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await login(page, emailA, '/portal/orders');
    await expect(page.getByText('QA-ORDER-A', { exact: true })).toBeVisible();
    await expect(page.getByText('QA-ORDER-B', { exact: true })).toHaveCount(0);
    const orderResponse = await page.goto(`/portal/orders/${orderA}`);
    expect(orderResponse?.ok()).toBeTruthy();
    await expect(page.getByRole('heading', { name: 'Order QA-ORDER-A' })).toBeVisible();
    await expect(page.getByText(/Fulfillment: 75(?:\.0+)?%/)).toBeVisible();

    const crossTenant = await page.goto(`/portal/orders/${orderB}`);
    expect([200, 404]).toContain(crossTenant?.status());
    await expect(page.getByRole('heading', { name: 'Page Not Found' })).toBeVisible();
    await expect(page.getByText('Order QA-ORDER-B')).toHaveCount(0);
    const document = await page.request.get(`/api/portal/documents/${documentB}`, { maxRedirects: 0 });
    expect([403, 404]).toContain(document.status());
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/portal\/(login|access)/);
  });

  test('shipping staff can open operations but cannot read finance', async ({ page }) => {
    await login(page, staffEmail, '/admin');
    await expect(page.getByRole('link', { name: 'Shipments', exact: true }).first()).toBeVisible();
    await page.goto('/admin/finance');
    await expect(page).toHaveURL(/\/portal\/access/);
  });

  async function emailLink(request: APIRequestContext, recipientEmail: string, pattern: RegExp) {
    const inbox = 'http://127.0.0.1:54324/api/v1';
    let messageId: string | undefined;
    await expect.poll(async () => {
      const list = await request.get(`${inbox}/messages`);
      if (!list.ok()) return false;
      const result: { messages: Array<{ ID: string; To: Array<{ Address: string }> }> } = await list.json();
      messageId = result.messages.find((message) => message.To.some(({ Address }) => Address === recipientEmail))?.ID;
      return !!messageId;
    }, { timeout: 15_000 }).toBe(true);
    const delivery = await request.get(`${inbox}/message/${encodeURIComponent(messageId!)}`);
    const message: { HTML: string } = await delivery.json();
    const link = message.HTML.match(pattern)?.[1];
    if (!link) throw new Error('Auth email did not contain the expected link');
    return link.replaceAll('&amp;', '&');
  }

  test('self signup, admin approval and automatic customer dashboard updates', async ({ page, browser, request }) => {
    test.setTimeout(90_000);
    const newEmail = `signup-${shippingUser}@example.test`;
    await page.goto('/portal/signup');
    await page.getByLabel('Your name').fill('Portal Signup QA');
    await page.getByLabel('Company name').fill('QA Valve Buyer A');
    await page.getByLabel('Work email').fill(newEmail);
    await page.getByLabel('Password (at least 12 characters)', { exact: true }).fill(password);
    await page.getByLabel('Confirm password').fill(password);
    await page.getByRole('button', { name: 'Create account' }).click();
    await expect(page).toHaveURL(/notice=verify_signup/);

    const confirmation = new URL(await emailLink(request, newEmail, /href="([^"]*\/auth\/v1\/verify\?[^"]+)"/));
    expect(confirmation.origin).toMatch(/^http:\/\/(localhost|127\.0\.0\.1):54321$/);
    await page.goto(confirmation.href);
    await expect(page.getByRole('heading', { name: 'Awaiting PDC approval' })).toBeVisible();

    const admin = await browser.newContext();
    try {
      const staff = await admin.newPage();
      await login(staff, adminEmail, '/admin');
      await expect(staff.getByRole('heading', { name: 'Operations overview' })).toBeVisible();
      await staff.getByRole('link', { name: 'Customer signups' }).first().click();
      const registration = staff.locator('article').filter({ hasText: newEmail });
      await registration.getByLabel('Link to a verified company account').selectOption(companyA);
      await registration.getByLabel('Review reason').fill('Verified fixture customer and company');
      await registration.getByRole('button', { name: 'Approve account' }).click();
      await expect(staff).toHaveURL(/notice=signup_approved/);
      await expect(page).toHaveURL(/\/portal\/dashboard/, { timeout: 22_000 });
      const orderRow = page.getByRole('row').filter({ hasText: 'QA-ORDER-A' });
      await expect(orderRow.getByRole('cell', { name: 'received', exact: true })).toBeVisible();

      await staff.goto(`/admin/orders/${orderA}`);
      const saveOrder = staff.getByRole('button', { name: 'Save order update', exact: true });
      const update = staff.locator('form').filter({ has: saveOrder });
      await update.getByLabel('Status', { exact: true }).selectOption('confirmed');
      await update.getByLabel('Reason', { exact: true }).fill('QA verified change');
      await saveOrder.click();
      await expect(staff).toHaveURL(/notice=order_updated/);
      await expect(orderRow.getByRole('cell', { name: 'confirmed', exact: true })).toBeVisible({ timeout: 25_000 });
    } finally {
      await admin.close();
    }
  });

  test('password recovery sends only to local Mailpit and can change the password', async ({ page, request }) => {
    await page.goto('/portal/forgot-password');
    await page.getByLabel('Work email').fill(emailA);
    await page.getByRole('button', { name: 'Request reset link' }).click();
    await expect(page).toHaveURL(/notice=password_reset_requested/);

    const link = await emailLink(request, emailA, /href="([^"]*\/portal\/auth\/callback\?[^"]+)"/);
    const recovery = new URL(link);
    if (recovery.origin !== 'http://localhost:3100') throw new Error('Recovery link points outside local QA');
    await page.goto(recovery.href);
    await expect(page.getByRole('heading', { name: 'Choose a new password' })).toBeVisible();
    const replacement = 'Fixture-replacement-84!';
    await page.getByLabel('New password', { exact: true }).fill(replacement);
    await page.getByLabel('Confirm new password').fill(replacement);
    await page.getByRole('button', { name: 'Save new password' }).click();
    await expect(page).toHaveURL(/\/portal\/login/);
    await login(page, emailA, '/portal/orders', replacement);
    await expect(page.getByText('QA-ORDER-A', { exact: true })).toBeVisible();

    await page.context().clearCookies();
    await page.goto(recovery.href);
    await expect(page).toHaveURL(/error=invalid_link/);
  });
});
