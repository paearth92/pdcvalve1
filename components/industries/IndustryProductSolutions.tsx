import Reveal from '@/components/products/Reveal';
import type { IndustryContent } from '@/types/content';

/** Product-specific solution descriptions for industries that need them. */
export default function IndustryProductSolutions({
  industry,
}: {
  industry: IndustryContent;
}) {
  if (!industry.productSolutions || industry.productSolutions.length === 0)
    return null;

  return (
    <section className="bg-brand-light-bg py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
              Product Solutions
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-brand-green-dark sm:text-3xl">
              PDC Product Solutions
            </h2>
            <div className="mt-3 h-px w-12 bg-brand-green/40" />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {industry.productSolutions.map((solution) => (
              <article
                key={solution.title}
                className="rounded-xl border border-brand-green-dark/10 bg-white p-6 sm:p-7"
              >
                <h3 className="text-base font-bold tracking-tight text-brand-green-dark">
                  {solution.title}
                </h3>
                <div className="mt-3 h-px w-8 bg-brand-green/30" />
                <p className="mt-3 text-sm leading-relaxed text-brand-graphite/75">
                  {solution.description}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
