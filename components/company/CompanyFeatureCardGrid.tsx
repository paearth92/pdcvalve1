import {
  Boxes,
  ClipboardCheck,
  FileText,
  Gauge,
  Layers3,
  LifeBuoy,
  PackageCheck,
  Ruler,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Wrench,
} from 'lucide-react';
import type { CompanyFeatureCard } from '@/types/content';
import Reveal from '@/components/products/Reveal';

function FeatureIcon({ slug }: { slug: string }) {
  const cls = 'h-4 w-4';
  switch (slug) {
    case 'portfolio': return <Boxes className={cls} />;
    case 'custom':
    case 'variation': return <SlidersHorizontal className={cls} />;
    case 'support': return <LifeBuoy className={cls} />;
    case 'machining': return <Wrench className={cls} />;
    case 'inventory': return <PackageCheck className={cls} />;
    case 'quality':
    case 'iso':
    case 'ais': return <ShieldCheck className={cls} />;
    case 'evaluation': return <Gauge className={cls} />;
    case 'selection': return <Settings2 className={cls} />;
    case 'drawing': return <Ruler className={cls} />;
    case 'materials':
    case 'patterns': return <Layers3 className={cls} />;
    case 'manual': return <FileText className={cls} />;
    case 'assembly': return <ClipboardCheck className={cls} />;
    default: return <Settings2 className={cls} />;
  }
}

export default function CompanyFeatureCardGrid({ cards }: { cards: CompanyFeatureCard[] }) {
  return (
    <section className="border-t border-brand-green-dark/[0.07] bg-white py-11 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-green">Capabilities</span>
              <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.03em] text-brand-green-dark sm:text-[1.9rem]">What PDC supports</h2>
            </div>
            <p className="max-w-xl text-[13px] leading-6 text-brand-graphite/50">
              A concise view of the capabilities and credentials published across PDC’s company, market, and product information.
            </p>
          </div>
        </Reveal>

        <div className="mt-7 grid gap-px overflow-hidden rounded-xl border border-brand-green-dark/8 bg-brand-green-dark/8 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 45} className="h-full">
              <article className="group flex h-full min-h-[148px] flex-col bg-white p-5 transition-colors duration-300 hover:bg-[#f7faf8] sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-light-bg text-brand-green-dark transition-transform duration-300 group-hover:-translate-y-0.5">
                    <FeatureIcon slug={card.iconSlug} />
                  </span>
                  <span className="font-mono text-[8px] font-bold tracking-[0.14em] text-brand-green-dark/18">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-4 text-[15px] font-extrabold tracking-tight text-brand-green-dark">{card.title}</h3>
                <p className="mt-2 text-[12px] leading-5 text-brand-graphite/55">{card.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}