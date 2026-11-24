import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft, LogOut, ShieldCheck } from 'lucide-react';
import { logoutAction } from '@/lib/portal/actions';
import { PortalNavigation, type PortalNavItem } from './Navigation';
import { linkClass, PdcLogo } from './ui';

export function PortalShell({ mode, items, companies, staff, children }: {
  mode: 'customer' | 'admin';
  items: PortalNavItem[];
  companies?: { id: string; name: string }[];
  staff?: boolean;
  children: ReactNode;
}) {
  const admin = mode === 'admin';
  return (
    <div className="min-h-dvh bg-[#f2f6f3] text-[#183629]">
      <a href="#portal-main" className="sr-only z-50 rounded bg-white px-3 py-2 focus:not-sr-only focus:absolute focus:left-4 focus:top-4">Skip to portal content</a>
      <header className="border-b border-[#d6e1da] bg-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-3 px-4 py-3 sm:px-7">
          <Link href={admin ? '/admin' : '/portal/dashboard'} className="flex min-w-0 items-center gap-3 text-brand-green-dark">
            <PdcLogo />
            <span className="border-l border-[#d6e1da] pl-3 text-xs font-bold sm:text-sm">{admin ? 'Admin Portal' : 'Customer Portal'}</span>
          </Link>
          <form action={logoutAction}>
            <button className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-xs font-semibold text-brand-green-dark hover:bg-[#f2f6f3] sm:px-3 sm:text-sm"><LogOut size={16} aria-hidden="true" /><span>Sign out</span></button>
          </form>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1500px] lg:grid-cols-[230px_minmax(0,1fr)]">
        <aside className="border-b border-[#d6e1da] bg-white px-4 pt-3 lg:min-h-[calc(100vh-65px)] lg:border-b-0 lg:border-r lg:px-5 lg:py-7">
          <div className="lg:sticky lg:top-6">
            <PortalNavigation items={items} companies={companies}>
              <div className="hidden gap-4 border-t border-[#e2ebe5] px-2 pt-5 lg:mt-3 lg:grid">
                {staff && !admin && <Link href="/admin" className={`inline-flex items-center gap-2 text-xs ${linkClass}`}><ShieldCheck size={14} aria-hidden="true" /> Admin portal</Link>}
                <Link href="/" className={`inline-flex items-center gap-2 text-xs ${linkClass}`}><ArrowLeft size={14} aria-hidden="true" /> PDC website</Link>
              </div>
            </PortalNavigation>
          </div>
        </aside>
        <main id="portal-main" className="grid min-w-0 content-start gap-5 p-4 sm:p-7 lg:p-8">
          {children}
          <footer className="flex flex-wrap gap-x-4 gap-y-2 pt-2 text-xs text-[#526b5e] lg:hidden">
            <Link className={linkClass} href="/">PDC website</Link>
            {staff && !admin && <Link className={linkClass} href="/admin">Admin portal</Link>}
          </footer>
        </main>
      </div>
    </div>
  );
}

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#ecf3ee] p-4 sm:p-8">
      <section className="grid w-full max-w-md gap-5 rounded-2xl border border-[#d5e3da] bg-white p-5 shadow-xl shadow-[#18382a]/5 sm:p-8">
        <Link href="/" className="w-fit"><PdcLogo /></Link>
        {children}
      </section>
    </main>
  );
}
