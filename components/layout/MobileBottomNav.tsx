'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Home, Phone, FileText, MoreHorizontal, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/data/site';
import { useRFQ } from '@/components/rfq/RFQProvider';
import { productFamilyContent } from '@/data/products/families';

// Gate-valve icon — stroke style matching lucide-react icons
function ValveIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* handwheel */}
      <circle cx="12" cy="3.5" r="2.2" />
      <line x1="9.8" y1="3.5" x2="14.2" y2="3.5" />
      {/* stem */}
      <line x1="12" y1="5.7" x2="12" y2="9" />
      {/* bonnet */}
      <path d="M9.5 9h5v3h-5z" />
      {/* valve body */}
      <rect x="7" y="12" width="10" height="5" rx="1" />
      {/* gate inside */}
      <line x1="12" y1="12" x2="12" y2="17" />
      {/* left flange */}
      <line x1="2" y1="13" x2="7" y2="13" />
      <line x1="2" y1="16" x2="7" y2="16" />
      <line x1="2" y1="13" x2="2" y2="16" />
      {/* right flange */}
      <line x1="17" y1="13" x2="22" y2="13" />
      <line x1="17" y1="16" x2="22" y2="16" />
      <line x1="22" y1="13" x2="22" y2="16" />
      {/* base support */}
      <line x1="9" y1="17" x2="9" y2="20" />
      <line x1="15" y1="17" x2="15" y2="20" />
      <line x1="7.5" y1="20" x2="16.5" y2="20" />
    </svg>
  );
}

const MORE_LINKS = [
  { label: 'Industries', href: '/industries' },
  { label: 'Company', href: '/company' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact', href: '/contact' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { openRFQ } = useRFQ();
  const [moreOpen, setMoreOpen] = useState(false);

  // Close "More" tray on route change
  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  // Lock body scroll when tray is open
  useEffect(() => {
    if (moreOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [moreOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {/* Backdrop for the More tray */}
      {moreOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm sm:hidden"
          onClick={() => setMoreOpen(false)}
        />
      )}

      {/* More tray — slides up from bottom */}
      <div
        className={cn(
          'fixed inset-x-0 bottom-[64px] z-50 sm:hidden',
          'transition-transform duration-300 ease-out',
          moreOpen ? 'translate-y-0' : 'translate-y-full pointer-events-none',
        )}
      >
        <div className="mx-3 mb-2 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10">
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="h-1 w-10 rounded-full bg-gray-300" />
          </div>

          {/* Product families */}
          <div className="px-4 pt-2 pb-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
              Product Families
            </p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-gray-100 border-t border-gray-100">
            {productFamilyContent.map((f) => (
              <Link
                key={f.slug}
                href={f.route}
                className="flex items-center gap-2.5 bg-white px-4 py-3.5 text-sm font-semibold text-brand-green-dark transition-colors active:bg-gray-50"
              >
                <ValveIcon className="h-5 w-5 shrink-0 text-brand-green" />
                <span className="leading-tight">{f.name}</span>
              </Link>
            ))}
          </div>

          {/* Other links */}
          <div className="px-4 pt-4 pb-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
              Explore
            </p>
          </div>
          <ul className="divide-y divide-gray-100 border-t border-gray-100">
            {MORE_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center justify-between px-4 py-3.5 text-sm font-semibold text-brand-green-dark transition-colors active:bg-gray-50"
                >
                  {link.label}
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Close button */}
          <div className="p-3">
            <button
              onClick={() => setMoreOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-100 py-3 text-sm font-semibold text-gray-600 transition-colors active:bg-gray-200"
            >
              <X className="h-4 w-4" />
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Bottom tab bar */}
      <nav
        className="fixed inset-x-0 bottom-0 z-50 sm:hidden"
        aria-label="Mobile navigation"
      >
        {/* Safe-area background extends below the bar on notched devices */}
        <div className="absolute inset-x-0 bottom-0 top-0 bg-white/95 backdrop-blur-md shadow-[0_-1px_0_rgba(0,0,0,0.08),0_-4px_20px_rgba(0,0,0,0.06)]" />

        <div className="relative grid h-16 grid-cols-5" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          {/* Home */}
          <Link
            href="/"
            className={cn(
              'flex flex-col items-center justify-center gap-1 transition-colors',
              isActive('/') ? 'text-brand-green' : 'text-gray-500',
            )}
          >
            <Home className="h-5 w-5" />
            <span className="text-[10px] font-semibold tracking-wide">Home</span>
          </Link>

          {/* Products */}
          <Link
            href="/products"
            className={cn(
              'flex flex-col items-center justify-center gap-1 transition-colors',
              isActive('/products') ? 'text-brand-green' : 'text-gray-500',
            )}
          >
            <ValveIcon className="h-5 w-5" />
            <span className="text-[10px] font-semibold tracking-wide">Products</span>
          </Link>

          {/* Quote — centre pill CTA */}
          <div className="flex items-center justify-center">
            <button
              onClick={() => openRFQ()}
              className="flex h-12 w-12 flex-col items-center justify-center rounded-full bg-brand-green shadow-lg shadow-brand-green/30 transition-transform active:scale-95"
              aria-label="Request a Quote"
            >
              <FileText className="h-5 w-5 text-white" />
              <span className="text-[9px] font-bold uppercase tracking-wide text-white/90 leading-none mt-0.5">Quote</span>
            </button>
          </div>

          {/* Call */}
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex flex-col items-center justify-center gap-1 text-gray-500 transition-colors active:text-brand-green"
          >
            <Phone className="h-5 w-5" />
            <span className="text-[10px] font-semibold tracking-wide">Call</span>
          </a>

          {/* More */}
          <button
            onClick={() => setMoreOpen((v) => !v)}
            className={cn(
              'flex flex-col items-center justify-center gap-1 transition-colors',
              moreOpen ? 'text-brand-green' : 'text-gray-500',
            )}
            aria-expanded={moreOpen}
            aria-label="More navigation"
          >
            {moreOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <MoreHorizontal className="h-5 w-5" />
            )}
            <span className="text-[10px] font-semibold tracking-wide">More</span>
          </button>
        </div>
      </nav>
    </>
  );
}
