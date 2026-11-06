import { Factory, Headset, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { differentiators } from '@/data/site';
import Reveal from '@/components/products/Reveal';
import HomeSectionHeading from '@/components/home/HomeSectionHeading';

const differentiatorIcons = [Headset, SlidersHorizontal, Factory, ShieldCheck];

export default function WhyEngineersChoosePDC() {
  return (
    <section className="relative overflow-hidden bg-[#f4f7f2] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(22,132,71,0.055),transparent_58%)]" />

      <div className="relative mx-auto max-w-[1160px]">
        <Reveal>
          <HomeSectionHeading
            eyebrow="Why PDC"
            title="Why Engineers Choose PDC"
            description="Application support, in-house capability, configurable products, and quality-focused execution built around real operating requirements."
          />
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-5">
          {differentiators.map((item, index) => {
            const Icon = differentiatorIcons[index] ?? ShieldCheck;

            return (
              <Reveal key={item.title} delay={index * 70} className="h-full">
                <article className="h-full min-h-[216px] rounded-2xl border border-[#dce6dd] bg-white px-6 py-6 shadow-[0_8px_24px_rgba(18,56,34,0.045)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#b5cfba] hover:shadow-[0_14px_32px_rgba(18,56,34,0.09)] motion-reduce:transform-none motion-reduce:transition-none lg:min-h-[226px]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf3eb] text-[#168447]">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold tracking-tight text-[#173b28]">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-6 text-[#52645a]">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
