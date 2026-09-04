import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/products/Reveal';
import type { IndustryContent } from '@/types/content';
import { productFamilyContent } from '@/data/products/families';

/**
 * Relevant PDC product families section.
 * Links to canonical family routes only — no duplicated product data.
 */
export default function IndustryProductFamilies({
  industry,
}: {
  industry: IndustryContent;
}) {
  if (!industry.productFamilies || industry.productFamilies.length === 0)
    return null;

  const families = industry.productFamilies
    .map((slug) => productFamilyContent.find((f) => f.slug === slug))
    .filter((f): f is NonNullable<typeof f> => f !== undefined);

  if (families.length === 0) return null;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
              Product Families
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-brand-green-dark sm:text-3xl">
              Relevant PDC Product Families
            </h2>
            <div className="mt-3 h-px w-12 bg-brand-green/40" />
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {families.map((family) => (
              <Link
                key={family.slug}
                href={family.route}
                className="group flex flex-col rounded-xl border border-brand-green-dark/10 bg-brand-light-bg p-6 transition-all duration-300 hover:border-brand-green/25 hover:shadow-md hover:shadow-brand-green-dark/5"
              >
                <h3 className="text-base font-bold tracking-tight text-brand-green-dark">
                  {family.name}
                </h3>
                <div className="mt-2 h-px w-8 bg-brand-green/30 transition-all duration-300 group-hover:w-12" />
                <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-graphite/70">
                  {family.shortDescription}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green transition-all group-hover:gap-2.5">
                  Explore
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
