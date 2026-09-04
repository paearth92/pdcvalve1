import { differentiators } from '@/data/site';
import Reveal from '@/components/products/Reveal';

const engineeringTags = [
  'APPLICATION ENGINEERING',
  'CUSTOM CONFIGURATION',
  'RESPONSIVE DELIVERY',
  'QUALITY ASSURANCE',
];

export default function WhyEngineersChoosePDC() {
  return (
    <section className="relative overflow-hidden bg-[#f7faf8] py-14 sm:py-16 lg:py-18">
      {/* Technical grid background */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-[linear-gradient(to_right,rgba(16,80,51,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,80,51,0.035)_1px,transparent_1px)]
          bg-[size:38px_38px]
        "
      />

      {/* Soft green glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green/[0.045] blur-[90px]" />

      {/* Decorative technical lines */}
      <div className="pointer-events-none absolute left-0 top-20 h-px w-32 bg-gradient-to-r from-brand-green/20 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-28 h-px w-40 bg-gradient-to-l from-brand-green/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-7 bg-brand-green/40" />

              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand-green">
                Why PDC
              </span>

              <span className="h-px w-7 bg-brand-green/40" />
            </div>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-green-dark sm:text-4xl lg:text-[2.55rem]">
              Why Engineers Choose PDC
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-brand-graphite/60 sm:text-[15px]">
              Engineering support, responsive manufacturing, and
              application-focused solutions built around real operating
              requirements.
            </p>
          </div>
        </Reveal>

        {/* Connected system */}
        <div className="relative mt-10 lg:mt-11">
          {/* Main connecting rail - desktop */}
          <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[30px] hidden lg:block">
            <div className="relative h-px bg-brand-green-dark/15">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-green/40 to-transparent" />

              {/* Pulsing signal points */}
              <span className="absolute left-[16.6%] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand-green animate-pulse shadow-[0_0_10px_rgba(22,132,71,0.7)]" />

              <span
                className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green animate-pulse shadow-[0_0_10px_rgba(22,132,71,0.7)]"
                style={{ animationDelay: '500ms' }}
              />

              <span
                className="absolute right-[16.6%] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand-green animate-pulse shadow-[0_0_10px_rgba(22,132,71,0.7)]"
                style={{ animationDelay: '1000ms' }}
              />
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
            {differentiators.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 90}
                className="h-full"
              >
                <article className="group relative h-full">
                  {/* Number node */}
                  <div className="relative z-20 mx-auto mb-4 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-brand-green/20 bg-[#f7faf8] shadow-[0_5px_20px_rgba(16,80,51,0.07)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-brand-green/45 group-hover:shadow-[0_8px_25px_rgba(22,132,71,0.13)]">
                    {/* Inner ring */}
                    <span className="absolute inset-[6px] rounded-full border border-brand-green/10 transition-all duration-500 group-hover:inset-[3px] group-hover:border-brand-green/30" />

                    {/* Live indicator */}
                    <span
                      className="absolute right-[2px] top-[7px] h-2 w-2 rounded-full bg-brand-green animate-pulse shadow-[0_0_8px_rgba(22,132,71,0.55)]"
                      style={{ animationDelay: `${i * 250}ms` }}
                    />

                    <span className="relative font-mono text-sm font-bold tracking-wider text-brand-green-dark">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Main card */}
                  <div
                    className="
                      relative h-[215px] overflow-hidden rounded-xl
                      border border-brand-green-dark/[0.08]
                      bg-white/90 px-6 py-6
                      shadow-[0_10px_35px_rgba(16,80,51,0.035)]
                      backdrop-blur-sm
                      transition-all duration-500 ease-out
                      group-hover:-translate-y-1.5
                      group-hover:border-brand-green/25
                      group-hover:bg-white
                      group-hover:shadow-[0_18px_45px_rgba(16,80,51,0.09)]
                    "
                  >
                    {/* Top green sweep */}
                    <span className="absolute left-0 top-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-brand-green via-brand-green/70 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100" />

                    {/* Technical corner */}
                    <span className="absolute right-4 top-4 h-3 w-3 border-r border-t border-brand-green/15 transition-all duration-500 group-hover:h-5 group-hover:w-5 group-hover:border-brand-green/40" />

                    {/* Secondary corner */}
                    <span className="absolute bottom-4 left-4 h-2 w-2 border-b border-l border-brand-green/10 transition-all duration-500 group-hover:h-4 group-hover:w-4 group-hover:border-brand-green/25" />

                    {/* Micro label */}
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-green/70" />

                      <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-brand-green/65">
                        {engineeringTags[i]}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-4 text-lg font-bold tracking-tight text-brand-green-dark">
                      {item.title}
                    </h3>

                    {/* Animated divider */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="h-px w-8 bg-brand-green/40 transition-all duration-500 group-hover:w-14" />
                      <span className="h-[3px] w-[3px] rounded-full bg-brand-green/50" />
                    </div>

                    {/* Description */}
                    <p className="mt-3 text-[13px] leading-[1.65] text-brand-graphite/65">
                      {item.description}
                    </p>

                    {/* Bottom measurement ticks */}
                    <div className="absolute bottom-3 right-4 flex items-end gap-[3px] opacity-25 transition-opacity duration-500 group-hover:opacity-70">
                      <span className="h-2 w-px bg-brand-green" />
                      <span className="h-1 w-px bg-brand-green" />
                      <span className="h-2 w-px bg-brand-green" />
                      <span className="h-1 w-px bg-brand-green" />
                      <span className="h-2 w-px bg-brand-green" />
                    </div>

                    {/* Hover illumination */}
                    <div className="pointer-events-none absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-brand-green/0 blur-2xl transition-all duration-500 group-hover:bg-brand-green/[0.08]" />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Bottom engineering status */}
        <Reveal delay={350}>
          <div className="mt-7 flex items-center justify-center gap-3">
            <span className="hidden h-px w-14 bg-brand-green-dark/10 sm:block" />

            <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.19em] text-brand-graphite/35">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-green/70" />
              Engineering
              <span className="text-brand-green/30">•</span>
              Manufacturing
              <span className="text-brand-green/30">•</span>
              Support
            </div>

            <span className="hidden h-px w-14 bg-brand-green-dark/10 sm:block" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}