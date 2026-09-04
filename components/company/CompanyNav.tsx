'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { companyNav } from '@/data/company/content';
import { cn } from '@/lib/utils';

export default function CompanyNav() {
  const pathname = usePathname();

  return (
    <div className="border-b border-brand-green-dark/8 bg-white">
      <nav aria-label="Company section navigation" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="no-scrollbar flex overflow-x-auto">
          {companyNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative min-w-max px-4 py-4 text-[12px] font-bold transition-colors duration-300 first:pl-0 sm:px-5',
                  active ? 'text-brand-green-dark' : 'text-brand-graphite/48 hover:text-brand-green-dark',
                )}
              >
                {item.label}
                <span
                  className={cn(
                    'absolute bottom-0 left-4 right-4 h-[2px] origin-center bg-brand-green transition-transform duration-300 first:left-0 sm:left-5 sm:right-5',
                    active ? 'scale-x-100' : 'scale-x-0',
                  )}
                />
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}