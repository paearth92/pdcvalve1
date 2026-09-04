'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { industryNav } from '@/data/industries/content';
import { cn } from '@/lib/utils';

/**
 * Reusable Industries section navigation.
 * Renders as a scrollable pill bar. Active page is highlighted.
 */
export default function IndustryNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Industries navigation"
      className="border-b border-brand-green-dark/10 bg-white/80 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="flex gap-1 overflow-x-auto py-3 sm:gap-2">
          {industryNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'inline-flex items-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-semibold transition-colors',
                    isActive
                      ? 'bg-brand-green/10 text-brand-green-dark'
                      : 'text-brand-graphite/60 hover:bg-brand-light-bg hover:text-brand-green-dark',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
