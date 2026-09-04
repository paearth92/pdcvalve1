'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface SpecNavItem {
  id: string;
  label: string;
}

export default function SpecNav({
  items,
  quoteHref = '/contact',
}: {
  items: SpecNavItem[];
  quoteHref?: string;
}) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-[100px] z-30">
      <div className="rounded-xl border border-brand-green-dark/10 bg-white p-5 shadow-sm">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-steel">
          On This Page
        </span>
        <nav className="mt-3 flex flex-col gap-1">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                activeId === item.id
                  ? 'bg-brand-green/10 text-brand-green'
                  : 'text-brand-graphite/60 hover:bg-brand-light-bg hover:text-brand-green-dark',
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href={quoteHref}
          className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-brand-green px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-green-dark hover:shadow-md"
        >
          Request Quote
        </a>
      </div>
    </div>
  );
}
