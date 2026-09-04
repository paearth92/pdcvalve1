import Reveal from '@/components/products/Reveal';
import type { CompanyPageSection } from '@/types/content';
import { cn } from '@/lib/utils';

export default function CompanyContentSection({
  section,
  index,
}: {
  section: CompanyPageSection;
  index: number;
}) {
  const tinted = section.dark ?? index % 2 === 1;

  return (
    <section className={cn('border-t border-brand-green-dark/[0.07]', tinted ? 'bg-[#f6f9f7]' : 'bg-white')}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid gap-5 py-9 sm:py-11 lg:grid-cols-[72px_0.72fr_1.28fr] lg:gap-10 lg:py-12">
            <div className="font-mono text-[11px] font-bold text-brand-green/55">
              {String(index + 1).padStart(2, '0')}
            </div>

            <div>
              {section.eyebrow && (
                <span className="text-[9px] font-bold uppercase tracking-[0.19em] text-brand-green">
                  {section.eyebrow}
                </span>
              )}
              <h2 className="mt-2 max-w-sm text-2xl font-extrabold leading-[1.08] tracking-[-0.03em] text-brand-green-dark sm:text-[1.8rem]">
                {section.heading}
              </h2>
            </div>

            <div>
              <div className="max-w-2xl space-y-3">
                {section.bodyParagraphs?.length ? (
                  section.bodyParagraphs.map((para, i) => (
                    <p key={i} className="text-[14px] leading-6 text-brand-graphite/62 sm:text-[15px] sm:leading-7">
                      {para}
                    </p>
                  ))
                ) : section.body ? (
                  <p className="text-[14px] leading-6 text-brand-graphite/62 sm:text-[15px] sm:leading-7">
                    {section.body}
                  </p>
                ) : null}
              </div>

              {section.items && section.items.length > 0 && (
                <div className="mt-5 grid gap-x-7 gap-y-0 sm:grid-cols-2">
                  {section.items.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 border-t border-brand-green-dark/[0.07] py-2.5 text-[12px] leading-5 text-brand-graphite/62">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}