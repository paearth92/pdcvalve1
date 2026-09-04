import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <ol className="flex flex-wrap items-center gap-1.5 py-5 text-xs">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {i > 0 && (
                <ChevronRight className="h-3 w-3 text-brand-steel/50" />
              )}
              {isLast ? (
                <span className="font-semibold text-brand-green">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-brand-graphite/60 transition-colors hover:text-brand-green"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
