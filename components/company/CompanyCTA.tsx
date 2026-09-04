import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/data/site';
import RFQButton from '@/components/rfq/RFQButton';

export default function CompanyCTA() {
  return (
    <section className="border-t border-brand-green-dark/[0.07] bg-[#f6f9f7] py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 rounded-2xl border border-brand-green-dark/10 bg-brand-green-dark px-6 py-7 text-white sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-green">Talk with PDC</span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.025em] sm:text-[1.8rem]">Discuss the application with Sales & Engineering.</h2>
            <p className="mt-2 text-[13px] leading-6 text-white/52">Get help evaluating product selection, configuration, and application requirements.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <RFQButton variant="primary" size="md" />
            <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center justify-center gap-2 rounded-md border border-white/12 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/6">
              Email PDC <ArrowRight className="h-4 w-4 text-brand-green" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}