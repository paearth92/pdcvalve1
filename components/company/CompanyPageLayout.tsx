import type { CompanyPageContent } from '@/types/content';
import { companyFacts } from '@/data/company/content';
import CompanyHero from '@/components/company/CompanyHero';
import CompanyNav from '@/components/company/CompanyNav';
import CompanyFactStrip from '@/components/company/CompanyFactStrip';
import CompanyContentSection from '@/components/company/CompanyContentSection';
import CompanyFeatureCardGrid from '@/components/company/CompanyFeatureCardGrid';
import CompanyCTA from '@/components/company/CompanyCTA';
import Reveal from '@/components/products/Reveal';

export default function CompanyPageLayout({ page }: { page: CompanyPageContent }) {
  const heroTitle = page.heroTitle ?? page.title;
  const heroDescription = page.heroDescription ?? page.subtitle ?? page.overview ?? '';
  const facts = companyFacts[page.slug] ?? [];

  return (
    <>
      <CompanyHero eyebrow={page.eyebrow ?? page.title} title={heroTitle} description={heroDescription} variant={page.slug} />
      <CompanyNav />
      {facts.length > 0 && <CompanyFactStrip facts={facts} />}

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid gap-5 py-10 sm:py-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-green">Overview</span>
                <h2 className="mt-2 max-w-sm text-2xl font-extrabold leading-tight tracking-[-0.03em] text-brand-green-dark sm:text-[1.9rem]">{page.title}</h2>
              </div>
              <div className="max-w-3xl border-l border-brand-green-dark/8 pl-5 sm:pl-7">
                {page.overviewParagraphs?.length ? (
                  <div className="space-y-3">
                    {page.overviewParagraphs.map((para, i) => (
                      <p key={i} className={i === 0 ? 'text-[15px] leading-7 text-brand-green-dark/78' : 'text-[14px] leading-6 text-brand-graphite/58'}>{para}</p>
                    ))}
                  </div>
                ) : page.overview ? (
                  <p className="text-[15px] leading-7 text-brand-green-dark/76">{page.overview}</p>
                ) : null}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {page.sections?.map((section, i) => (
        <CompanyContentSection key={`${section.heading}-${i}`} section={section} index={i} />
      ))}

      {page.featureCards && page.featureCards.length > 0 && <CompanyFeatureCardGrid cards={page.featureCards} />}
      <CompanyCTA />
    </>
  );
}