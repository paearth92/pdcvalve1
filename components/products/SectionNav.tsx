'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import type { SpecNavItem } from '@/components/products/SpecNav';

export default function SectionNav({ items }: { items: SpecNavItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -68% 0px', threshold: [0, 0.05, 0.15] },
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
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - 128;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div className="sticky top-[72px] z-30 -mx-4 overflow-hidden border-y border-[#d5e0d7] bg-[#edf3ee]/[0.96] px-4 py-2.5 shadow-[0_8px_26px_rgba(12,39,24,0.08)] backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      {/* Technical drafting texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(rgba(24,89,52,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(24,89,52,0.035) 1px, transparent 1px), radial-gradient(circle at 12% 50%, rgba(22,132,71,0.08), transparent 28%)',
          backgroundSize: '26px 26px, 26px 26px, 100% 100%',
        }}
      />

      <div className="relative mx-auto flex max-w-7xl items-center gap-4">
        <div className="hidden shrink-0 items-center gap-2 pr-2 lg:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-[#168447] shadow-[0_0_0_4px_rgba(22,132,71,0.10)]" />
          <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#496257]">
            Product details
          </span>
        </div>

        <nav
          className="flex min-w-0 flex-1 gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Product sections"
        >
          {items.map((item, index) => {
            const active = activeId === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={cn(
                  'group inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-[11px] font-extrabold transition-all duration-300 sm:px-4 sm:text-xs',
                  active
                    ? 'border-[#174d30] bg-[#174d30] text-white shadow-[0_6px_18px_rgba(20,77,48,0.20)]'
                    : 'border-[#ccd9cf] bg-white/80 text-[#284438] shadow-sm hover:border-[#8db39a] hover:bg-white hover:text-[#123823]',
                )}
              >
                <span
                  className={cn(
                    'font-mono text-[9px] font-black tracking-[0.05em]',
                    active ? 'text-white/70' : 'text-[#168447]',
                  )}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}