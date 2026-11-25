import type { ReactNode } from 'react';
import Image from 'next/image';
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
      <div className="mx-auto grid w-full max-w-[1500px] grid-cols-[minmax(0,1fr)] lg:grid-cols-[230px_minmax(0,1fr)]">
        <aside className="min-w-0 border-b border-[#d6e1da] bg-white px-4 pt-3 lg:min-h-[calc(100vh-65px)] lg:border-b-0 lg:border-r lg:px-5 lg:py-7">
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

export function AuthShell({ children, branded = false }: { children: ReactNode; branded?: boolean }) {
  return (
    <main className="grid min-h-dvh place-items-center bg-[#eef4ef] p-4 sm:p-8">
      <div className={branded
        ? 'grid w-full max-w-[960px] overflow-hidden rounded-2xl border border-[#d5e3da] bg-white shadow-xl shadow-[#18382a]/5 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]'
        : 'w-full max-w-md rounded-2xl border border-[#d5e3da] bg-white shadow-xl shadow-[#18382a]/5'}>
        {branded && <div aria-hidden="true" className="relative hidden min-h-[440px] flex-col justify-end overflow-hidden bg-[#0b2018] bg-[url('/images/home/hero-flow-desktop.webp')] bg-cover bg-right px-8 py-9 text-white md:flex lg:px-10">
          <Image alt="" src="/images/portal/isolation-valve.webp" width={394} height={530}
            className="absolute right-[10%] top-[7%] h-[64%] w-auto rotate-[-17deg] object-contain opacity-95 drop-shadow-[0_20px_32px_rgba(0,0,0,0.55)]" />
          <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-[#071a11] via-[#0b2018]/90 to-transparent" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b0dfbf]">PDC Customer Portal</p>
            <p className="mt-2 max-w-xs text-3xl font-extrabold leading-[1.12] tracking-tight">Orders, shipments and invoices.</p>
          </div>
        </div>}
        <section className="grid min-w-0 content-center gap-5 p-5 sm:p-8 lg:p-10">
          <Link href="/" className="w-fit" aria-label="PDC website"><PdcLogo /></Link>
          {children}
        </section>
      </div>
    </main>
  );
}
