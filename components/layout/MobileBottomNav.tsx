'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Home, Phone, Plus, MoreHorizontal, X, ChevronRight } from 'lucide-react';
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

// The SVG is one bar wide. Its center peak starts at x=0 so shifting the
// whole path to a tab's center carries the glow along the bottom edge.
const ACTIVE_CONTOUR =
  'M -500 62 H -64 C -52 62 -42 47 -30 27 C -25 13 -16 7 0 7 C 16 7 25 13 30 27 C 42 47 52 62 64 62 H 500';
const FLAT_CONTOUR = 'M -500 62 H 500';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { isOpen, openRFQ } = useRFQ();
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

  const isHomeActive = pathname === '/';
  const isProductsActive =
    pathname === '/product-finder' ||
    pathname === '/products' ||
    pathname.startsWith('/products/');
  const isMoreActive = MORE_LINKS.some(
    ({ href }) => pathname === href || pathname.startsWith(`${href}/`),
  );
  const activeTabIndex = isOpen
    ? 2
    : moreOpen || isMoreActive
      ? 4
      : isHomeActive
        ? 0
        : isProductsActive
          ? 1
          : -1;
  const activeTabCenter = activeTabIndex >= 0 ? `${(activeTabIndex + 0.5) * 20}%` : '50%';

  return (
    <>
      {/* Backdrop for the More tray */}
      {moreOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm sm:hidden"
          onClick={() => setMoreOpen(false)}
        />
      )}

      {/* Keep the tray out of the page entirely until More is tapped. */}
      {moreOpen && (
        <div
          className="pdc-more-tray-enter fixed inset-x-0 z-50 flex flex-col justify-end sm:hidden"
          style={{
            top: 'calc(env(safe-area-inset-top, 0px) + 12px)',
            bottom: 'calc(env(safe-area-inset-bottom, 0px) + 96px)',
            maxHeight:
              'calc(100dvh - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px) - 108px)',
          }}
        >
          <div className="mx-3 mb-2 flex max-h-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10">
            {/* Handle */}
            <div className="flex shrink-0 justify-center pt-3 pb-1">
              <div className="h-1 w-10 rounded-full bg-gray-300" />
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
              {/* Product families */}
              <div className="px-4 pt-2 pb-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                  Product Families
                </p>
              </div>
              <div className="grid grid-cols-2 gap-px border-t border-gray-100 bg-gray-100">
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
            </div>

            {/* Close button stays visible while the links scroll. */}
            <div className="shrink-0 p-3">
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
      )}

      {/* Bottom tab bar */}
      <nav
        className="fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+12px)] z-50 sm:hidden"
        aria-label="Mobile navigation"
      >
        <div
          className="pdc-liquid-nav"
          data-menu-open={moreOpen}
        >
          <div className="pdc-liquid-nav__glow" aria-hidden="true">
            <svg
              className="pdc-liquid-nav__contour"
              viewBox="0 0 500 64"
              preserveAspectRatio="none"
              style={{ transform: `translateX(${activeTabCenter})` }}
            >
              <path
                d={activeTabIndex >= 0 ? ACTIVE_CONTOUR : FLAT_CONTOUR}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
          <div className="pdc-liquid-nav__track">
            {/* Home */}
            <Link
              href="/"
              aria-label="Home"
              aria-current={isHomeActive ? 'page' : undefined}
              data-highlighted={activeTabIndex === 0}
              className="pdc-liquid-nav__tab"
            >
              <Home className="pdc-liquid-nav__icon h-5 w-5" />
              <span className="pdc-liquid-nav__label">Home</span>
            </Link>

            {/* Products */}
            <Link
              href="/products"
              aria-label="Products"
              aria-current={isProductsActive ? 'page' : undefined}
              data-highlighted={activeTabIndex === 1}
              className="pdc-liquid-nav__tab"
            >
              <ValveIcon className="pdc-liquid-nav__icon h-5 w-5" />
              <span className="pdc-liquid-nav__label">Products</span>
            </Link>

            {/* Quote action */}
            <button
              type="button"
              onClick={() => openRFQ()}
              aria-label="Request a Quote"
              aria-expanded={isOpen}
              data-highlighted={activeTabIndex === 2}
              className="pdc-liquid-nav__tab"
            >
              <Plus className="pdc-liquid-nav__icon h-5 w-5" />
              <span className="pdc-liquid-nav__label">Quote</span>
            </button>

            {/* Call */}
            <a
              href={`tel:${siteConfig.phone}`}
              aria-label="Call PDC Sales"
              className="pdc-liquid-nav__tab"
            >
              <Phone className="pdc-liquid-nav__icon h-5 w-5" />
              <span className="pdc-liquid-nav__label">Call</span>
            </a>

            {/* More */}
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              aria-label="More navigation"
              aria-current={isMoreActive ? 'page' : undefined}
              data-highlighted={activeTabIndex === 4}
              className="pdc-liquid-nav__tab"
              aria-expanded={moreOpen}
            >
              {moreOpen ? (
                <X className="pdc-liquid-nav__icon h-5 w-5" />
              ) : (
                <MoreHorizontal className="pdc-liquid-nav__icon h-5 w-5" />
              )}
              <span className="pdc-liquid-nav__label">More</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
