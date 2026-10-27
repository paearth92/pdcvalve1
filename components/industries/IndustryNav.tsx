'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { industryNav } from '@/data/industries/content';
import { cn } from '@/lib/utils';

/**
 * Compact industry picker. The destinations remain ordinary links in the
 * rendered page so visitors and search engines can follow the full industry set.
 */
export default function IndustryNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const previousPathname = useRef(pathname);
  const menuId = useId();
  const activeIndustry = industryNav.find((item) => pathname === item.href);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      setIsOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!pickerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  return (
    <nav
      aria-label="Industries navigation"
      className="relative z-30 border-b border-brand-green-dark/10 bg-white/90 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div ref={pickerRef} className="relative">
          <button
            ref={triggerRef}
            type="button"
            aria-expanded={isOpen}
            aria-controls={menuId}
            onClick={() => setIsOpen((open) => !open)}
            className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-lg border border-brand-green-dark/10 bg-white px-4 py-3 text-left shadow-sm transition-colors hover:border-brand-green/30 hover:bg-brand-light-bg/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40"
          >
            <span className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-graphite/50">
                Industries
              </span>
              <span className="truncate text-sm font-semibold text-brand-green-dark">
                {activeIndustry?.label ?? 'Choose an industry'}
              </span>
            </span>
            <ChevronDown
              aria-hidden="true"
              className={cn(
                'h-4 w-4 shrink-0 text-brand-green-dark transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                isOpen && 'rotate-180',
              )}
            />
          </button>

          <div
            id={menuId}
            aria-hidden={!isOpen}
            className={cn(
              'pdc-menu absolute left-0 right-0 top-full z-30 mt-2 origin-top overflow-hidden rounded-2xl border border-brand-green-dark/10 bg-white shadow-[0_24px_60px_rgba(7,61,43,0.16)]',
              isOpen
                ? 'pointer-events-auto visible translate-y-0 opacity-100'
                : 'pointer-events-none invisible -translate-y-1.5 opacity-100',
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                'absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-brand-green via-brand-green/40 to-transparent transition-transform duration-700 ease-out',
                isOpen ? 'scale-x-100' : 'scale-x-0',
              )}
            />
            <ul className="grid max-h-[60vh] grid-cols-1 gap-1 overflow-y-auto overscroll-contain p-2 sm:grid-cols-2 lg:grid-cols-3">
              {industryNav.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <li
                    key={item.href}
                    className={cn('pdc-menu-item', isOpen && 'is-open')}
                    style={{
                      ['--i' as string]: index,
                      transitionDelay: isOpen ? `${45 + index * 18}ms` : '0ms',
                    }}
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      tabIndex={isOpen ? undefined : -1}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'group/industry flex min-h-10 items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40',
                        isActive
                          ? 'bg-brand-green/10 text-brand-green-dark'
                          : 'text-brand-graphite/70 hover:bg-brand-light-bg hover:text-brand-green-dark',
                      )}
                    >
                      <span>{item.label}</span>
                      <ArrowRight
                        aria-hidden="true"
                        className="ml-3 h-3.5 w-3.5 shrink-0 -translate-x-1 text-brand-green/30 opacity-0 transition-all duration-300 group-hover/industry:translate-x-0 group-hover/industry:text-brand-green group-hover/industry:opacity-100"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
