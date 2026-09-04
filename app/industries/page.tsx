import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { industryContent } from '@/data/industries/content';
import { IndustryIcon } from '@/components/icons/IndustryIcons';
import IndustryCTA from '@/components/industries/IndustryCTA';
import Reveal from '@/components/products/Reveal';

export const metadata: Metadata = {
  title: 'Industries | PDC Valve & Actuators',
  description:
    'PDC valves and actuators support flow-control applications across industrial processing, production, utilities, manufacturing, and engineered systems.',
  alternates: {
    canonical: 'https://www.pdcvalve.com/industries',
  },
  openGraph: {
    title: 'Industries | PDC Valve & Actuators',
    description:
      'PDC valves and actuators support flow-control applications across industrial processing, production, utilities, manufacturing, and engineered systems.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industries | PDC Valve & Actuators',
    description:
      'PDC valves and actuators support flow-control applications across industrial processing, production, utilities, manufacturing, and engineered systems.',
  },
};

export default function IndustriesLandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-green-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(22,132,71,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(57,117,138,0.12),transparent_50%)]" />
        <div className="blueprint-grid absolute inset-0 opacity-40" />
        <div className="noise-overlay absolute inset-0 opacity-[0.035] mix-blend-overlay" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-green/40 bg-brand-green/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-brand-green">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              Industries
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              Flow Control Across Critical Industries
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/65">
              PDC valves and actuators support flow-control applications across
              industrial processing, production, utilities, manufacturing, and
              engineered systems.
            </p>
            <div className="mt-8 h-px w-16 bg-brand-green/40" />
          </div>
        </div>
      </section>

      {/* Industry card grid */}
      <section className="bg-brand-light-bg py-16 sm:py-20">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-0 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industryContent.map((industry, i) => (
              <Reveal key={industry.slug} delay={i * 50}>
                <Link
                  href={industry.route}
                  className="group flex h-full flex-col overflow-hidden rounded-none border-b border-brand-green-dark/10 bg-white transition-all duration-300 hover:border-brand-green/25 hover:shadow-lg hover:shadow-brand-green-dark/5 sm:rounded-xl sm:border"
                >
                  {industry.images?.thumbnail?.src ? (
                    <div className="relative h-40 w-full overflow-hidden">
                      <Image
                        src={industry.images.thumbnail.src}
                        alt={industry.images.thumbnail.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg border border-white/30 bg-white/15 text-white backdrop-blur-sm">
                        <IndustryIcon slug={industry.slug} className="h-5 w-5" />
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-6">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-green/30 bg-brand-green/10 text-brand-green">
                        <IndustryIcon slug={industry.slug} className="h-6 w-6" />
                      </span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold tracking-tight text-brand-green-dark">
                        {industry.name}
                      </h3>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-brand-graphite/30 transition-all duration-300 group-hover:text-brand-green group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <div className="mt-2 h-px w-8 bg-brand-green/30 transition-all duration-300 group-hover:w-12" />
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-graphite/70">
                      {industry.shortDescription}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <IndustryCTA />

      {/* CollectionPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Industries | PDC Valve & Actuators',
            description:
              'PDC valves and actuators support flow-control applications across industrial processing, production, utilities, manufacturing, and engineered systems.',
            url: 'https://www.pdcvalve.com/industries',
            isPartOf: {
              '@type': 'WebSite',
              name: 'PDC Valve & Actuators',
              url: 'https://www.pdcvalve.com',
            },
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: industryContent.map((industry, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: industry.name,
                url: industry.seo?.canonicalUrl ?? `https://www.pdcvalve.com${industry.route}`,
              })),
            },
          }),
        }}
      />
    </>
  );
}
