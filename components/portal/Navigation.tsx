'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowRightLeft, Bell, ClipboardList, FileText, LayoutDashboard, PackageCheck, Receipt, Settings2, ShieldCheck, Users, Workflow } from 'lucide-react';
import { accountHref } from './format';

const navIcons = {
  dashboard: LayoutDashboard, orders: ClipboardList, shipments: PackageCheck,
  quotes: FileText, invoices: Receipt, profile: Settings2, notifications: Bell,
  customers: Users, imports: Workflow, audit: ShieldCheck,
};

export type PortalNavItem = { key: keyof typeof navIcons; href: string; label: string };

export function PortalNavigation({ items, companies = [], children }: {
  items: PortalNavItem[];
  companies?: { id: string; name: string }[];
  children?: ReactNode;
}) {
  const pathname = usePathname();
  const search = useSearchParams();
  const router = useRouter();
  const company = companies.find(({ id }) => id === search.get('company'))?.id ?? companies[0]?.id;

  return (
    <>
      {companies.length > 1 && (
        <label className="mb-3 grid gap-1.5 px-1 text-xs font-semibold text-[#416252] lg:mb-5">
          <span className="flex items-center gap-1.5"><ArrowRightLeft size={13} aria-hidden="true" /> Company account</span>
          <select
            aria-label="Company account"
            className="min-h-11 max-w-full rounded-lg border border-[#bdd1c4] bg-white px-3 text-sm text-brand-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green"
            value={company}
            onChange={(event) => router.push(accountHref('/portal/dashboard', event.target.value))}
          >
            {companies.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
          </select>
        </label>
      )}
      <nav aria-label="Portal navigation" className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-2 lg:mx-0 lg:grid lg:overflow-visible lg:px-0">
        {items.map(({ key, href, label }) => {
          const Icon = navIcons[key];
          const current = pathname === href || (href !== '/admin' && pathname.startsWith(`${href}/`));
          return (
            <Link key={href} href={accountHref(href, company)} aria-current={current ? 'page' : undefined}
              className={`flex min-h-11 shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold outline-offset-[-2px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green ${current ? 'bg-[#e5f0e9] text-brand-green-dark' : 'text-[#345645] hover:bg-[#f2f7f3]'}`}>
              <Icon size={17} aria-hidden="true" className="shrink-0" /> {label}
            </Link>
          );
        })}
      </nav>
      {children}
    </>
  );
}
