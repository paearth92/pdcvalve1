import Reveal from '@/components/products/Reveal';
import type { IndustryContent } from '@/types/content';

/**
 * Operating challenges section — renders a list of challenge items.
 */
export default function IndustryChallenges({
  industry,
}: {
  industry: IndustryContent;
}) {
  if (!industry.challenges || industry.challenges.length === 0) return null;

  return (
    <section className="bg-brand-light-bg py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
              {industry.challengesEyebrow ?? 'Operating Challenges'}
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-brand-green-dark sm:text-3xl">
              {industry.challengesTitle ?? `Key Challenges in ${industry.name}`}
            </h2>
            <div className="mt-3 h-px w-12 bg-brand-green/40" />
          </div>
        </Reveal>
        <Reveal delay={80}>
          <ul className="mt-8 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2">
            {industry.challenges.map((challenge, i) => {
              const [label, ...detailParts] = challenge.split(':');
              const detail = detailParts.join(':').trim();

              return (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-brand-green-dark/10 bg-white p-4 text-sm text-brand-graphite/75"
                >
                  <span
                    className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green"
                    aria-hidden="true"
                  />
                  {detail ? (
                    <span>
                      <strong className="font-semibold text-brand-graphite/90">
                        {label}:
                      </strong>{' '}
                      {detail}
                    </span>
                  ) : (
                    challenge
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
