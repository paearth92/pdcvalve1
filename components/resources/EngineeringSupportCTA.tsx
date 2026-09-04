import { Phone, Mail, Wrench } from 'lucide-react';
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
            <Wrench className="h-4 w-4" />
            Engineering Support
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Can&apos;t Find What You Need?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            Our application engineers have access to additional documentation,
            custom drawings, and technical data not yet listed in our resource
            center. Contact us directly and we&apos;ll locate the information
            you need.
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
            Email Engineering
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
