import Image from 'next/image';
import Link from 'next/link';
import type { CoreFunction } from '@/types/site';
import { ArrowUpRight } from 'lucide-react';
import HomeSectionHeading from '@/components/home/HomeSectionHeading';

type CoreVisual = {
  image: string;
  alt: string;
  kicker: string;
  linkLabel: string;
  linkHref: string;
};

const visuals: CoreVisual[] = [
  {
    image: '/images/products/butterfly-damper-valves/econotrol-hero-cutout.png',
    alt: 'PDC Econotrol butterfly damper valve with manual lever',
    kicker: 'Precision Flow Regulation',
    linkLabel: 'Explore Control Products',
    linkHref: '/products',
  },
  {
    image: '/images/home/core-capabilities/pdcq-actuator-cutout.png',
    alt: 'PDCQ electric actuator with manual handwheel, shown as a transparent product cutout',
    kicker: 'Dependable Actuation',
    linkLabel: 'Explore Automation Products',
    linkHref: '/products',
  },
  {
    image: '/images/home/core-capabilities/high-performance-isolation-cutout.png',
    alt: 'PDC high-performance butterfly valve, shown as a transparent product cutout',
    kicker: 'Positive Process Isolation',
    linkLabel: 'Explore Isolation Products',
    linkHref: '/products',
  },
];

export default function CoreFunctions({ items }: { items: CoreFunction[] }) {
  const cards = items.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-[#f4f7f2] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(circle at 12% 18%, rgba(22,132,71,0.075) 0, transparent 28%), radial-gradient(circle at 88% 76%, rgba(22,132,71,0.06) 0, transparent 30%)',
        }}
      />

      <div className="relative mx-auto max-w-[1160px]">
        <HomeSectionHeading
          eyebrow="Core Capabilities"
          title="Engineered Around Three Core Functions"
          description={
            'PDC brings precise flow control, dependable automation, and secure isolation together in one engineered valve platform.'
          }
        />

        <div className="mt-20 grid grid-cols-1 gap-x-5 gap-y-20 lg:mt-16 lg:grid-cols-3 lg:gap-y-5">
          {cards.map((item, index) => {
            const visual = visuals[index] ?? visuals[0];

            return (
              <article
                key={item.number}
                className="group relative flex min-h-[470px] flex-col items-center rounded-[28px] border border-[#d8e3d8] bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(238,245,237,0.94))] px-6 pb-7 pt-[166px] text-center shadow-[0_18px_48px_rgba(18,56,34,0.08)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-[#a8c9ae] hover:shadow-[0_25px_60px_rgba(18,56,34,0.14)] focus-within:border-[#78aa83] motion-reduce:transform-none motion-reduce:transition-none sm:px-8 sm:pb-8 lg:min-h-[336px] lg:rounded-[24px] lg:px-5 lg:pb-5 lg:pt-[120px]"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-[-58px] h-[228px] w-[82%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(108,165,120,0.18)_0%,rgba(108,165,120,0.07)_42%,transparent_72%)] lg:top-[-46px] lg:h-[164px]"
                />

                <div className="absolute left-1/2 top-[-76px] z-10 h-[250px] w-[88%] -translate-x-1/2 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none lg:top-[-55px] lg:h-[180px]">
                  <Image
                    src={visual.image}
                    alt={visual.alt}
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 520px, 88vw"
                    className={`object-contain object-center ${index === 0 ? 'lg:-translate-x-2' : ''}`}
                    priority={index === 0}
                  />
                </div>

                <div className="relative z-10 flex w-full flex-col items-center">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#52705b] sm:text-[11px]">
                    {visual.kicker}
                  </span>
                  <h3 className="mt-3 min-h-[2.4rem] max-w-[19rem] text-[1.35rem] font-extrabold leading-tight tracking-[-0.025em] text-[#168447] sm:text-[1.5rem] lg:text-[1.2rem]">
                    {item.title}
                  </h3>
                  <p className="mt-3 min-h-[3.75rem] max-w-[22rem] text-[14px] leading-6 text-[#4a5e53] sm:text-[15px] lg:min-h-[3.75rem] lg:text-[14px] lg:leading-5">
                    {item.description}
                  </p>

                  <Link
                    href={visual.linkHref}
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#168447]/25 bg-white/75 px-5 py-3 text-[13px] font-bold text-[#126d3a] shadow-sm transition-[background,color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[#168447] hover:bg-[#168447] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#168447] focus-visible:ring-offset-2 lg:mt-4 lg:px-4 lg:py-2.5 lg:text-xs"
                  >
                    {visual.linkLabel}
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
