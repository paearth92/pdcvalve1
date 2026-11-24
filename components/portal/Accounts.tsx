import type { ReactNode } from 'react';
import { Facts } from './ui';

export type Company = {
  id: string; name: string; account_number: string | null; active: boolean; contact_email: string | null; contact_phone: string | null;
  billing_address: unknown; shipping_addresses: unknown;
};
export const companyColumns = 'id,name,account_number,active,contact_email,contact_phone,billing_address,shipping_addresses';
export type Membership = { user_id: string; active: boolean; can_view_financials: boolean; created_at: string };
export type Contact = { user_id: string; email: string | null; full_name: string | null; phone: string | null };

function addressLines(value: unknown) {
  if (typeof value === 'string') return value ? [value] : [];
  if (!value || typeof value !== 'object' || Array.isArray(value)) return [];
  const a = value as Record<string, unknown>;
  function field(...keys: string[]) {
    return keys.map((key) => a[key]).find((part): part is string => typeof part === 'string' && part.length > 0);
  }
  const local = [field('city'), field('state', 'province', 'region'), field('postal_code', 'zip', 'zip_code')].filter(Boolean).join(', ');
  return [
    field('name', 'attention'), field('line1', 'address1', 'address_line_1', 'street'), field('line2', 'address2', 'address_line_2'),
    local, field('country', 'country_code'),
  ].filter((line): line is string => Boolean(line));
}

function Address({ value }: { value: unknown }) {
  const lines = addressLines(value);
  return lines.length ? <span className="grid gap-0.5">{lines.map((line, index) => <span key={index}>{line}</span>)}</span> : '—';
}

export function CompanyFacts({ company, extra = [] }: { company: Omit<Company, 'active'>; extra?: [string, ReactNode][] }) {
  const shipping = Array.isArray(company.shipping_addresses) ? company.shipping_addresses : [];
  return <Facts entries={[
    ['Account number', company.account_number ?? '—'], ['Company email', company.contact_email ?? '—'],
    ['Company phone', company.contact_phone ?? '—'], ['Billing address', <Address key="billing" value={company.billing_address} />],
    ['Shipping addresses', shipping.length ? <span key="shipping" className="grid gap-3">{shipping.map((address, index) => <Address key={index} value={address} />)}</span> : '—'],
    ...extra,
  ]} />;
}
