import type { CompanyFact } from '@/data/company/content';
import Reveal from '@/components/products/Reveal';

export default function CompanyFactStrip({ facts }: { facts: CompanyFact[] }) {
  return (
    <section className="bg-[#f7faf8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid grid-cols-2 border-b border-brand-green-dark/8 sm:grid-cols-4">
            {facts.map((fact, index) => (
              <div key={`${fact.value}-${fact.label}`} className="relative py-5 pr-4 sm:px-5 sm:py-6 first:sm:pl-0">
                {index > 0 && <span className="absolute left-0 top-1/2 hidden h-8 w-px -translate-y-1/2 bg-brand-green-dark/10 sm:block" />}
                <div className="text-xl font-extrabold tracking-[-0.03em] text-brand-green-dark sm:text-2xl">
                  {fact.value}
                </div>
                <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-brand-graphite/38">
                  {fact.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}