import Reveal from '@/components/products/Reveal';
import type { IndustryContent } from '@/types/content';

/**
 * Common applications section — renders application areas as a grid.
 */
export default function IndustryApplications({
  industry,
}: {
  industry: IndustryContent;
}) {
  if (!industry.applications || industry.applications.length === 0) return null;

  return (
    <section className="pdc-green-texture relative isolate overflow-hidden bg-brand-green-dark py-16 text-white sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(22,132,71,0.12),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="blueprint-grid pointer-events-none absolute inset-0 opacity-20"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/75">
              Applications
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Common Applications
            </h2>
            <div className="mt-3 h-px w-12 bg-brand-green/40" />
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(industry.applicationCards ?? industry.applications.map((app) => ({
              title: app,
              description: '',
            }))).map((app, i) => (
              <div
                key={app.title}
                className="rounded-lg border border-white/10 bg-white/5 p-5 text-sm leading-relaxed text-white/75 transition-colors hover:bg-white/10"
              >
                <h3 className="font-bold text-white">{app.title}</h3>
                {app.description ? (
                  <p className="mt-2 text-white/70">{app.description}</p>
                ) : null}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
