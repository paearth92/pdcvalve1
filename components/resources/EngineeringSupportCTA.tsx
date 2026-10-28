import { Phone, Mail, SlidersHorizontal } from 'lucide-react';
import { siteConfig } from '@/data/site';
import RFQButton from '@/components/rfq/RFQButton';

export default function EngineeringSupportCTA() {
  return (
    <section className="relative overflow-hidden py-16 text-white sm:py-20">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/sections/engineering-support.png')" }} />
      <div className="absolute inset-0 bg-brand-green-dark/70" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
            <SlidersHorizontal className="h-4 w-4" />
            Application Support
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Let&apos;s Find the Right Solution for Your Application
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            Not sure which valve or actuator fits your application? Our
            experienced PDC sales team can help review your operating
            requirements, identify suitable options, and coordinate engineering
            review when needed.
          </p>
          <div className="mx-auto mt-6 h-px w-16 bg-brand-green/40" />
        </div>

        <div className="mx-auto mt-12 flex max-w-4xl flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-3">
          <RFQButton size="md" />
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all hover:border-brand-green/40 hover:bg-brand-green/10"
          >
            <Mail className="h-4 w-4 text-brand-green" />
            Talk to PDC Sales
          </a>
        </div>

        <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center justify-center gap-4 text-sm text-white/50 sm:flex-row sm:gap-8">
          <a
            href={`tel:${siteConfig.phone}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            <Phone className="h-4 w-4 text-brand-green" />
            {siteConfig.phone}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            <Mail className="h-4 w-4 text-brand-green" />
            {siteConfig.email}
          </a>
        </div>
      </div>
    </section>
  );
}
