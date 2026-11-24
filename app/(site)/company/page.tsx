import type { Metadata } from 'next';
import { companyFacts } from '@/data/company/content';
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

const supportCards = [
  {
    title: 'Product Knowledge',
    description: 'Butterfly damper valves, butterfly valves, ball and gate valves, pneumatic and electric actuation, and related automation products.',
  },
  {
    title: 'Application Support',
    description: 'PDC Sales handles most product and application inquiries, with Engineering brought in when additional technical review is needed.',
  },
  {
    title: 'In-House Capability',
    description: 'Manual machining, valve assembly, actuator integration, painting, inspection, and selected testing support application-specific work.',
  },
  {
    title: 'Custom Configurations',
    description: 'Brackets, couplings, linkages, shafts, actuators, controls, and accessories can be configured around the application.',
  },
  {
    title: 'Inventory & Assembly',
    description: 'Selected valves, castings, actuators, accessories, and components support assembly and customer requirements.',
  },
];

export default function CompanyLandingPage() {
  return (
    <>
      <CompanyHero
        eyebrow="Process Development & Control LLC"
        title="Built Around Flow Control Applications"
        description="Since 1970, Process Development & Control has supplied valves, actuators, custom configurations, and application support for industrial flow-control systems. PDC combines product knowledge, in-house machining, valve and actuator assembly, technical support, and configurable products to help customers solve standard and non-standard applications."
        variant="about"
      />
      <CompanyNav />
      <CompanyFactStrip facts={companyFacts.about} title="PDC at a Glance" />

      <section className="bg-white py-11 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-graphite/70">Company</span>
              <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.03em] text-brand-green sm:text-[1.9rem]">What PDC Brings to the Application</h2>
              <p className="mt-3 text-[13px] leading-6 text-brand-graphite/60">A focused combination of product knowledge, practical engineering support, and in-house capability.</p>
            </div>
          </Reveal>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {supportCards.map((card, index) => (
              <Reveal key={card.title} delay={index * 45}>
                <article className="h-full rounded-xl border border-brand-green-dark/10 bg-[#f8faf8] p-5 sm:p-6">
                  <span className="font-mono text-[10px] font-bold tracking-[0.12em] text-brand-green/55">0{index + 1}</span>
                  <h3 className="mt-3 text-base font-extrabold tracking-tight text-brand-green-dark">{card.title}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-brand-graphite/65">{card.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CompanyCTA />
    </>
  );
}
