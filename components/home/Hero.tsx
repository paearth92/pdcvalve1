import Link from 'next/link';
import RFQButton from '@/components/rfq/RFQButton';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Boxes,
  CircuitBoard,
  Cog,
  Factory,
  Gauge,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import HeroVideo from '@/components/home/HeroVideo';

type MarqueeItem = {
  label: string;
  icon: LucideIcon;
};

const marqueeItems: MarqueeItem[] = [
  { label: 'Butterfly & Damper Valves', icon: SlidersHorizontal },
  { label: 'Valve Automation', icon: Settings },
  { label: 'Pneumatic Actuation', icon: Gauge },
  { label: 'Electric Actuation', icon: CircuitBoard },
  { label: 'Application Engineering', icon: Workflow },
  { label: 'Custom Valve Assemblies', icon: Boxes },
  { label: 'In-House Machining', icon: Factory },
  { label: 'Engineered Flow Control', icon: Cog },
  { label: 'ISO 9001 Certified', icon: BadgeCheck },
  { label: 'Pittsburgh Built', icon: ShieldCheck },
  { label: 'Established 1970', icon: Award },
];

export default function Hero() {
  return (
    <section className="relative isolate min-h-[calc(100svh-84px)] overflow-hidden bg-[#020b07] text-white md:h-[clamp(420px,26vw,560px)] md:min-h-[420px]">
      <HeroVideo />

      {/* Keep centered headline and supporting copy legible over bright footage. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,rgba(4,28,18,0.36)_0%,rgba(3,22,14,0.23)_48%,rgba(2,16,10,0.16)_100%)] backdrop-blur-[0.5px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(7,32,22,0.04)_0%,rgba(4,24,16,0.09)_56%,rgba(2,16,10,0.42)_100%)]"
      />
      <div
        aria-hidden="true"
        className="noise-overlay pointer-events-none absolute inset-0 z-[2] opacity-[0.02] mix-blend-overlay"
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-84px)] w-full max-w-[1440px] items-center justify-center px-5 pb-20 pt-10 text-center sm:px-6 sm:pb-24 md:h-full md:min-h-0 md:px-10 md:pb-20 lg:px-16">
        <div className="w-full max-w-[1060px]">
          <div className="hero-reveal hero-reveal-1 flex justify-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b3edc5] sm:text-xs">
              Process Development &amp; Control
            </span>
          </div>

          <h1 className="pdc-hero-heading mt-3 text-[clamp(2rem,7vw,2.7rem)] font-extrabold leading-[1.02] tracking-[-0.05em] text-white sm:mt-4 sm:text-[3rem] md:text-[3rem] lg:text-[3rem] xl:text-[3.25rem]">
            <span className="pdc-hero-line pdc-hero-line-1 block overflow-hidden pb-[0.08em] lg:inline-block lg:pr-[0.12em]">
              <span className="pdc-hero-line-inner block lg:inline-block">Engineered Flow</span>
            </span>
            <span className="pdc-hero-line pdc-hero-line-2 block overflow-hidden pb-[0.08em] lg:ml-[0.18em] lg:inline-block">
              <span className="pdc-hero-line-inner block lg:inline-block">Control</span>
            </span>
          </h1>

          <h2 className="hero-reveal hero-reveal-3 mx-auto mt-3 max-w-[880px] text-[1.2rem] font-bold leading-[1.12] tracking-[-0.03em] sm:text-2xl lg:text-[1.75rem] xl:text-[1.75rem]">
            <span className="block bg-gradient-to-r from-[#a7edbc] via-[#62d28a] to-[#35b767] bg-clip-text text-transparent lg:inline-block">
              Built Around Your
            </span>
            <span className="block bg-gradient-to-r from-[#a7edbc] via-[#62d28a] to-[#35b767] bg-clip-text text-transparent lg:ml-[0.25em] lg:inline-block">
              Application
            </span>
          </h2>

          <p className="hero-reveal hero-reveal-4 mx-auto mt-3 max-w-[53rem] text-[13px] leading-5 text-white/95 sm:mt-4 sm:text-base sm:leading-6 lg:text-[1.25rem] lg:leading-[1.45] xl:text-[1.35rem]">
            PDC brings industrial flow control, engineered valve automation,
            and dependable process isolation together in application-specific
            valve solutions.
          </p>

          <div className="pdc-hero-cta hero-reveal hero-reveal-5 mt-4 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              href="/products"
              className="group pdc-hero-btn relative inline-flex min-h-11 items-center justify-center gap-2.5 overflow-hidden rounded-lg bg-[#168447] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(22,132,71,0.30)] transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-[#1b9852] hover:shadow-[0_16px_36px_rgba(22,132,71,0.36)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ce5aa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020b07]"
            >
              <span className="pdc-btn-shine pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.35)_50%,transparent_75%)] transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <span className="relative z-10">Explore Products</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <RFQButton
              variant="outline"
              size="md"
              className="min-h-11 rounded-lg border-white/45 bg-black/20 px-6 text-sm font-bold text-white hover:bg-white/10"
            />
          </div>
        </div>
      </div>

      <div className="hero-reveal hero-reveal-6 absolute inset-x-0 bottom-0 z-10 w-full">
        <TrustMarquee />
      </div>
    </section>
  );
}

function TrustMarquee() {
  return (
    <div
      className="pdc-trust-marquee relative overflow-hidden bg-[#061a11]/65 py-1.5 shadow-[0_-12px_40px_rgba(0,0,0,0.20)] backdrop-blur-md"
      aria-label="PDC capabilities and certifications"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#020b07] via-[#020b07]/80 to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#020b07] via-[#020b07]/80 to-transparent sm:w-24" />
      <div className="pdc-trust-marquee-track flex w-max">
        <MarqueeGroup />
        <div className="pdc-trust-marquee-copy" aria-hidden="true">
          <MarqueeGroup />
        </div>
      </div>
    </div>
  );
}

function MarqueeGroup() {
  return (
    <div className="flex shrink-0 items-center">
      {marqueeItems.map(({ label, icon: Icon }, index) => (
        <div key={`${label}-${index}`} className="group flex shrink-0 items-center">
          <div className="flex items-center gap-2 px-3 py-1 sm:px-4">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#55cf86]/30 bg-[#168447]/20 text-[#80dfa0] transition-[background-color,border-color,transform] duration-300 group-hover:scale-105 group-hover:border-[#55cf86]/50 group-hover:bg-[#168447]/30">
              <Icon className="h-3 w-3" strokeWidth={1.8} />
            </span>
            <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.08em] text-white sm:text-[11px] lg:text-[13px]">
              {label}
            </span>
          </div>
          <span aria-hidden="true" className="mx-1 h-1 w-1 shrink-0 rounded-full bg-[#75d796]/70" />
        </div>
      ))}
    </div>
  );
}
