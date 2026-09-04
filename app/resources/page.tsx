import { BookOpen } from 'lucide-react';
import Breadcrumbs from '@/components/products/ProductBreadcrumbs';
import Reveal from '@/components/products/Reveal';
import FeaturedResources from '@/components/resources/FeaturedResources';
import EngineeringSupportCTA from '@/components/resources/EngineeringSupportCTA';
import ResourceLibrary from '@/components/resources/ResourceLibrary';
import ResourceCategoryCard from '@/components/resources/ResourceCategoryCard';
import RecentlyAdded from '@/components/resources/RecentlyAdded';
import RFQButton from '@/components/rfq/RFQButton';
import {
  resourceCategories,
  resourceRegistry,
  getFeaturedResources,
  getRecentlyAddedResources,
  getResourceCountByCategory,
} from '@/data/resources/registry';

export function generateMetadata() {
  const title = 'Engineering Resources | PDC Valve & Actuators';
  const description =
    'Technical documentation, product brochures, datasheets, installation and maintenance manuals, CAD files, and certifications for PDC valves and actuators.';

  return {
    title,
    description,
    alternates: { canonical: '/resources' },
    openGraph: {
      title,
      description,
      url: '/resources',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function ResourcesPage() {
  const featured = getFeaturedResources();
  const recentlyAdded = getRecentlyAddedResources();

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Engineering Resources — PDC Valve & Actuators',
    description:
      'Technical documentation, product brochures, datasheets, installation and maintenance manuals, CAD files, and certifications for PDC valves and actuators.',
    url: '/resources',
    isPartOf: {
      '@type': 'WebSite',
      name: 'PDC Valve & Actuators',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-green-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(22,132,71,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(57,117,138,0.12),transparent_50%)]" />
        <div className="blueprint-grid absolute inset-0 opacity-50" />
        <div className="noise-overlay absolute inset-0 opacity-[0.035] mix-blend-overlay" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-green/40 bg-brand-green/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-brand-green">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              Resource Center
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              Engineering Resources
            </h1>

            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/65">
              Access technical documentation, product literature, installation
              and maintenance manuals, certificates, CAD files, and engineering
              support materials for PDC valves and actuators. Search our
              comprehensive library to find the documentation you need.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <RFQButton size="lg" />
              <a
                href="#resource-library"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white/85 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white"
              >
                <BookOpen className="h-4 w-4" />
                Browse Documents
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green">
            Browse by Category
          </span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-brand-green-dark sm:text-3xl">
            Document Categories
          </h2>
          <div className="mt-4 h-px w-16 bg-brand-green/40" />
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-brand-graphite/70">
            Browse our engineering documentation by document type. Each
            category contains verified technical literature for PDC products.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resourceCategories.map((category) => (
              <ResourceCategoryCard
                key={category.slug}
                category={category}
                count={getResourceCountByCategory(category.slug)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <Reveal>
        <FeaturedResources resources={featured} />
      </Reveal>

      {/* Resource Library (search + filters + grid) */}
      <div id="resource-library">
        <ResourceLibrary resources={resourceRegistry} />
      </div>

      {/* Recently Added */}
      <Reveal>
        <RecentlyAdded resources={recentlyAdded} />
      </Reveal>

      {/* Engineering Support CTA */}
      <EngineeringSupportCTA />
    </>
  );
}
