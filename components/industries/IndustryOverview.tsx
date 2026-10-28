import Reveal from '@/components/products/Reveal';
import type { IndustryContent } from '@/types/content';

/**
 * Industry overview section — renders the intro paragraphs.
 */
export default function IndustryOverview({
  industry,
}: {
  industry: IndustryContent;
}) {
  const hasContent =
    (industry.overviewParagraphs && industry.overviewParagraphs.length > 0) ||
    industry.overview;

  if (!hasContent) return null;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
              Overview
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-brand-green-dark sm:text-3xl">
              {industry.overviewTitle ?? industry.name}
            </h2>
            <div className="mt-3 h-px w-12 bg-brand-green/40" />
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-6 max-w-3xl space-y-4">
            {industry.overviewParagraphs && industry.overviewParagraphs.length > 0 ? (
              industry.overviewParagraphs.map((para, i) => (
                <p key={i} className="text-[15px] leading-relaxed text-brand-graphite/75">
                  {para}
                </p>
              ))
            ) : (
              <p className="text-[15px] leading-relaxed text-brand-graphite/75">
                {industry.overview}
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
