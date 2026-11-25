export const orderStates = [
  'received', 'confirmed', 'in_production', 'production_completed', 'ready_to_ship',
  'partially_shipped', 'shipped', 'delivered', 'closed', 'cancelled',
] as const;

export function accountHref(path: string, company?: string) {
  if (!company) return path;
  return `${path}${path.includes('?') ? '&' : '?'}company=${encodeURIComponent(company)}`;
}

export function dateLabel(value?: string | null) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeZone: 'UTC' }).format(date);
}

export function money(value?: number | string | null, currency?: string | null) {
  if (value == null || !currency || !/^[A-Z]{3}$/.test(currency)) return '—';
  const amount = Number(value);
  return Number.isFinite(amount) ? new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount) : '—';
}

export function trackingUrl(carrier?: string | null, tracking?: string | null) {
  if (!carrier || !tracking || !/^[\w -]{3,80}$/.test(tracking)) return undefined;
  const code = encodeURIComponent(tracking);
  const name = carrier.toLowerCase().trim();
  if (name === 'ups' || name === 'united parcel service') return `https://www.ups.com/track?tracknum=${code}`;
  if (name === 'fedex' || name === 'federal express') return `https://www.fedex.com/fedextrack/?trknbr=${code}`;
  if (name === 'usps' || name === 'united states postal service') return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${code}`;
  if (name === 'dhl' || name === 'dhl express') return `https://www.dhl.com/us-en/home/tracking.html?tracking-id=${code}`;
  return undefined;
}

export function isIsoDate(value?: string): value is string {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
