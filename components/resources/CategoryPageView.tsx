import Breadcrumbs from '@/components/products/ProductBreadcrumbs';
import Link from 'next/link';
import Reveal from '@/components/products/Reveal';
import ResourceCategoryHero from '@/components/resources/ResourceCategoryHero';
import ResourceLibrary from '@/components/resources/ResourceLibrary';
import ResourceEmptyState from '@/components/resources/ResourceEmptyState';
import EngineeringSupportCTA from '@/components/resources/EngineeringSupportCTA';
import {
  getResourceCategoryDef,
  getResourcesByCategorySlug,
} from '@/data/resources/registry';
import type { ResourceCenterCategory } from '@/types/content';

interface CategoryPageProps {
  category: ResourceCenterCategory;
}

export function generateCategoryMetadata(category: ResourceCenterCategory) {
  const def = getResourceCategoryDef(category);
  if (!def) return {};

  const title = `${def.label} | Engineering Resources | PDC Valve & Actuators`;
  const description = def.description;

  return {
    title,
    description,
    alternates: { canonical: def.href },
    openGraph: {
      title,
      description,
      url: def.href,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export function renderCategoryPage({ category }: CategoryPageProps) {
  const def = getResourceCategoryDef(category);
  const resources = getResourcesByCategorySlug(category);

  if (!def) return null;

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${def.label} — PDC Valve & Actuators`,
    description: def.description,
    url: def.href,
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
          { label: def.label, href: def.href },
        ]}
      />

      <ResourceCategoryHero category={def} resourceCount={resources.length} />

      {resources.length > 0 ? (
        <ResourceLibrary resources={resources} />
      ) : (
        <section className="bg-brand-light-bg py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ResourceEmptyState />
          </div>
        </section>
      )}

      {category === 'brochures' && (
        <section className="border-t border-brand-green-dark/10 bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-extrabold tracking-tight text-brand-green-dark sm:text-3xl">
                Can&apos;t Find What You Need?
              </h2>
              <p className="mt-4 text-sm leading-6 text-brand-graphite/70 sm:text-base">
                Additional product literature, technical information, drawings,
                and application-specific documentation may be available upon
                request.
              </p>
              <p className="mt-3 text-sm leading-6 text-brand-graphite/70 sm:text-base">
                <Link
                  href="/contact"
                  className="font-semibold text-brand-green-dark underline decoration-brand-green/50 underline-offset-4 transition-colors hover:text-brand-green"
                >
                  Contact PDC Sales
                </Link>{' '}
                and we will help locate the information needed for your
                application.
              </p>
            </div>
          </div>
        </section>
      )}

      <Reveal>
        <EngineeringSupportCTA />
      </Reveal>
    </>
  );
}
