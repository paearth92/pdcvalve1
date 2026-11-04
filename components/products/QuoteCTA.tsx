import { Phone, Mail, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';
import { siteConfig } from '@/data/site';
import RFQButton from '@/components/rfq/RFQButton';

export default function QuoteCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0b1812] py-14 text-white sm:py-16 lg:py-20">
      <Image
        src="/images/company/pdc-facility-exterior-no-cars.png"
        alt=""
        fill
        sizes="100vw"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 scale-105 object-cover object-center blur-[2px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[#081711]/70 backdrop-blur-[2px] lg:bg-gradient-to-r lg:from-[#081711]/92 lg:via-[#081711]/80 lg:to-[#081711]/48"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/85">
            <SlidersHorizontal className="h-4 w-4" />
            Application Support
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Let&apos;s Find the Right Solution for Your Application
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/85">
            Not sure which valve or actuator fits your application? Our
            experienced PDC sales team can help review your operating
            requirements, identify suitable options, and coordinate engineering
            review when needed.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-3">
          <RFQButton variant="primary" size="md" />
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 rounded-md border border-brand-green bg-brand-green px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:border-brand-green-dark hover:bg-brand-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50"
          >
            <Mail className="h-4 w-4 text-white/80" />
            Talk to PDC Sales
          </a>
        </div>

        {/* Contact info row */}
        <div className="mt-7 flex flex-col items-center justify-center gap-4 text-sm text-white/80 sm:flex-row sm:gap-8">
          <a
            href={`tel:${siteConfig.phone}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            <Phone className="h-4 w-4 text-white/80" />
            {siteConfig.phone}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            <Mail className="h-4 w-4 text-white/80" />
            {siteConfig.email}
          </a>
        </div>
      </div>
    </section>
  );
}
