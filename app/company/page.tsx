import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { companyFacts, companyNav } from '@/data/company/content';
import CompanyHero from '@/components/company/CompanyHero';
import CompanyNav from '@/components/company/CompanyNav';
import CompanyFactStrip from '@/components/company/CompanyFactStrip';
import CompanyCTA from '@/components/company/CompanyCTA';
import Reveal from '@/components/products/Reveal';

export const metadata: Metadata = {
  title: 'Company | PDC Valve & Actuators',
  description: 'Founded in 1970, Process Development & Control LLC manufactures valves, actuators, and custom flow control components with engineering support and in-house machining.',
  alternates: { canonical: 'https://pdcvalve.com/company' },
};

const pageDescriptions: Record<string, { kicker: string; title: string; description: string }> = {
  about: { kicker: 'Company profile', title: 'About PDC', description: 'History, portfolio, reach, customization, inventory, and support.' },
  engineering: { kicker: 'Application support', title: 'Engineering Support', description: 'Application evaluation, selection, configuration, drawings, and technical support.' },
  manufacturing: { kicker: 'Supply capability', title: 'Manufacturing', description: 'In-house machining, product variation, inventory, and integrated assemblies.' },
  quality: { kicker: 'Credentials', title: 'Quality & Compliance', description: 'PDC’s published ISO 9001:2015 certification and AIS compliance.' },
  location: { kicker: 'Coraopolis, Pennsylvania', title: 'Find PDC', description: 'Address, contact information, and directions to PDC.' },
};

export default function CompanyLandingPage() {
  return (
    <>
      <CompanyHero
        eyebrow="Process Development & Control LLC"
        title="Built Around Flow Control Applications"
        description="Founded in 1970, PDC combines valves, actuators, custom flow control components, engineering support, inventory, and in-house machining."
        variant="about"
      />
      <CompanyNav />
      <CompanyFactStrip facts={companyFacts.about} />

      <section className="bg-white py-11 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-green">Company</span>
                <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.03em] text-brand-green-dark sm:text-[1.9rem]">Explore PDC</h2>
              </div>
              <p className="max-w-xl text-[13px] leading-6 text-brand-graphite/50">A focused company section with the information customers actually need.</p>
            </div>
          </Reveal>

          <div className="mt-6 overflow-hidden rounded-xl border border-brand-green-dark/8">
            {companyNav.map((item, i) => {
              const slug = item.href.split('/').pop() ?? '';
              const page = pageDescriptions[slug];
              if (!page) return null;

              return (
                <Reveal key={item.href} delay={i * 45}>
                  <Link href={item.href} className="group grid gap-3 border-b border-brand-green-dark/8 bg-white px-5 py-5 transition-colors last:border-b-0 hover:bg-[#f7faf8] sm:grid-cols-[48px_0.62fr_1fr_34px] sm:items-center sm:px-6">
                    <span className="font-mono text-[10px] font-bold text-brand-green/50">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-brand-graphite/32">{page.kicker}</span>
                      <h3 className="mt-1 text-[16px] font-extrabold tracking-tight text-brand-green-dark">{page.title}</h3>
                    </div>
                    <p className="text-[12px] leading-5 text-brand-graphite/52">{page.description}</p>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-green-dark/10 text-brand-green transition-all group-hover:border-brand-green/30 group-hover:bg-brand-green group-hover:text-white">
                      {slug === 'location' ? <MapPin className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CompanyCTA />
    </>
  );
}