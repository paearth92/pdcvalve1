import { expect, test } from '@playwright/test';

test('existing marketing pages and portal entry point work at phone width', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Customer Portal' }).filter({ visible: true }).first()).toHaveAttribute('href', '/portal');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);

  await page.goto('/products');
  await expect(page.getByRole('heading', { name: 'Industrial Flow Control Products' })).toBeVisible();

  await page.goto('/products/butterfly-damper-valves/econotrol');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/econotrol/i);
});

test('public login is branded and protected routes deny anonymous access', async ({ page, request }) => {
  const login = await page.goto('/portal/login');
  expect(login?.ok()).toBeTruthy();
  expect(login?.headers()['x-robots-tag']).toContain('noindex');
  expect(login?.headers()['cache-control']).toContain('no-store');
  await expect(page.getByRole('img', { name: /pdc/i }).first()).toBeVisible();
  expect(await page.getByRole('navigation', { name: 'Mobile navigation' }).count()).toBe(0);

  await page.getByRole('link', { name: 'Sign up' }).click();
  await expect(page).toHaveURL(/\/portal\/signup$/);
  await expect(page.getByRole('heading', { name: 'Create your PDC account' })).toBeVisible();
  await page.goto('/portal/request-access');
  await expect(page).toHaveURL(/\/portal\/signup$/);
  await page.goto('/admin');
  await expect(page.getByRole('heading', { name: 'PDC admin sign in' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Sign up' })).toHaveCount(0);

  for (const route of ['/portal/dashboard', '/portal/orders', '/admin', '/admin/imports']) {
    const response = await request.get(route, { maxRedirects: 0 });
    const location = response.headers().location ?? '';
    expect([302, 303, 307, 308, 401, 403, 503]).toContain(response.status());
    if (response.status() >= 300 && response.status() < 400) {
      expect(location).toMatch(/\/portal\/(login|access)/);
    }
    expect(response.headers()['cache-control']).toContain('no-store');
  }
});
