import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import RFQButton from '@/components/rfq/RFQButton';
import Reveal from '@/components/products/Reveal';

/**
 * Closing conversion section.
 *
 * The manufacturing photograph is composed with its subject on the left and
 * open dark space on the right, so the copy sits in the clear half on
 * desktop and over a full vertical scrim on mobile.
 */
export default function HomeCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-[#040d08] text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/cta/manufacturing-floor.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1584}
        height={672}
        className="absolute inset-0 h-full w-full object-cover object-[30%_center] lg:object-center"
      />

      {/* Scrim — vertical on mobile where copy stacks over the photo,
          left-to-right on desktop so the open right half carries it. */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#040d08]/90 via-[#040d08]/85 to-[#040d08]/95 lg:bg-gradient-to-r lg:from-[#040d08]/20 lg:via-[#040d08]/70 lg:to-[#040d08]/97" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="lg:grid lg:grid-cols-2">
          <div className="hidden lg:block" aria-hidden="true" />

          <Reveal className="lg:pl-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              Start a Project
            </span>

            <h2 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.9rem]">
              Tell us your operating
              <span className="block text-brand-green">conditions.</span>
            </h2>

            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/70">
              Send us pressure, temperature, media and line size. Our PDC sales
              team will review your requirements, identify suitable valve and
              actuator options, and coordinate engineering review when needed.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <RFQButton size="lg">Request a Quote</RFQButton>

              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Browse Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-2.5 border-t border-white/12 pt-6 text-sm text-white/60">
              <Phone className="h-4 w-4 text-brand-green" />
              <span>Prefer to talk it through?</span>
              <Link
                href="/contact"
                className="font-semibold text-white underline-offset-4 transition-colors hover:text-brand-green hover:underline"
              >
                Contact us
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
