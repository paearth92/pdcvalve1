import Breadcrumbs, { type BreadcrumbItem } from '@/components/products/ProductBreadcrumbs';
import ProductHero from '@/components/products/ProductHero';
import ProductGallery from '@/components/products/ProductGallery';
import SectionNav from '@/components/products/SectionNav';
import type { SpecNavItem } from '@/components/products/SpecNav';
import ProductSidebar from '@/components/products/ProductSidebar';
import FeatureCards from '@/components/products/FeatureCards';
import ApplicationGroups from '@/components/products/ApplicationGroups';
import SpecTable from '@/components/products/SpecTable';
import EngineeringDataSection from '@/components/products/EngineeringDataSection';
import DownloadsSection from '@/components/products/DownloadsSection';
import RelatedProducts from '@/components/products/RelatedProducts';
import QuoteCTA from '@/components/products/QuoteCTA';
import MobileQuoteBar from '@/components/products/MobileQuoteBar';
import Reveal from '@/components/products/Reveal';
import SectionHeading from '@/components/shared/SectionHeading';
import type { ProductDetail } from '@/types/site';

function SectionShell({
  children,
  id,
  muted = false,
}: {
  children: React.ReactNode;
  id: string;
  muted?: boolean;
}) {
  return (
    <section
      id={id}
      className={[
        'scroll-mt-32 border-t border-brand-green-dark/[0.08] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16',
        muted ? 'bg-[#f7f9f7]' : 'bg-white',
      ].join(' ')}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

export default function ProductDetailTemplate({
  product,
}: {
  product: ProductDetail;
}) {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: product.familyName, href: `/products/${product.familySlug}` },
    { label: product.name, href: `/products/${product.familySlug}/${product.slug}` },
  ];

  const hasFeatures = product.features && product.features.length > 0;
  const hasApplications =
    (product.applications && product.applications.length > 0) ||
    (product.industries && product.industries.length > 0);
  const hasSpecs =
    (product.specs && product.specs.length > 0) ||
    (product.specGroups && product.specGroups.length > 0);
  const hasEngineering =
    !!product.engineering &&
    ((product.engineering.tables?.length ?? 0) > 0 ||
      (product.engineering.optionGroups?.length ?? 0) > 0);
  const hasDownloads = product.downloads && product.downloads.length > 0;
  const hasRelated = product.related && product.related.length > 0;
  const gallery = product.gallery ?? [];
  const hasGallery = gallery.length > 0;

  const navItems: SpecNavItem[] = [
    ...(hasGallery ? [{ id: 'gallery', label: 'Product Views' }] : []),
    { id: 'overview', label: 'Overview' },
    ...(hasFeatures ? [{ id: 'features', label: 'Design Features' }] : []),
    ...(hasSpecs ? [{ id: 'specifications', label: 'Specifications' }] : []),
    ...(hasEngineering ? [{ id: 'engineering-data', label: 'Engineering Data' }] : []),
    ...(hasApplications ? [{ id: 'applications', label: 'Applications' }] : []),
    ...(hasDownloads ? [{ id: 'downloads', label: 'Downloads' }] : []),
    ...(hasRelated ? [{ id: 'related', label: 'Related Products' }] : []),
    { id: 'support', label: 'Engineering Support' },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      {/* Product imagery / hero logic intentionally unchanged. */}
      <ProductHero product={product} />

      {/* Persistent page navigation */}
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <SectionNav items={navItems} />
      </div>

      {hasGallery && (
        <SectionShell id="gallery">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="Product Gallery"
                title="Product Views & Configurations"
              />
            </Reveal>
            <p className="max-w-xl text-sm leading-6 text-brand-graphite/55 lg:text-right">
              Official PDC product views showing available positions,
              configurations, and construction details.
            </p>
          </div>
          <div className="mt-6 lg:mt-8">
            <ProductGallery images={gallery} productName={product.name} />
          </div>
        </SectionShell>
      )}

      {/* Overview */}
      <section id="overview" className="scroll-mt-32 bg-white px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <Reveal>
              <SectionHeading eyebrow="Overview" title="Product Overview" />
            </Reveal>

            <div className="mt-6 max-w-4xl space-y-4">
              {product.overview && product.overview.length > 0 ? (
                product.overview.map((para, i) => (
                  <Reveal key={i} delay={i * 70}>
                    <p
                      className={[
                        'leading-relaxed text-brand-graphite/72',
                        i === 0
                          ? 'text-[16px] font-medium leading-7 sm:text-[17px] sm:leading-8'
                          : 'text-[14.5px] sm:text-[15px]',
                      ].join(' ')}
                    >
                      {para}
                    </p>
                  </Reveal>
                ))
              ) : product.shortDescription ? (
                <p className="text-[16px] font-medium leading-7 text-brand-graphite/72 sm:text-[17px] sm:leading-8">
                  {product.shortDescription}
                </p>
              ) : (
                <p className="text-[15px] leading-relaxed text-brand-graphite/50">
                  Detailed product information is being prepared.
                </p>
              )}
            </div>

            {product.shortDescription && (
              <div className="mt-8 overflow-hidden rounded-2xl border border-brand-green/15 bg-brand-light-bg/45">
                <div className="grid grid-cols-[5px_1fr]">
                  <span className="bg-brand-green" />
                  <div className="px-5 py-5 sm:px-6">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-brand-green">
                      Engineering Summary
                    </span>
                    <p className="mt-2 text-sm font-medium leading-6 text-brand-green-dark/78">
                      {product.shortDescription}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <aside className="lg:self-start">
            <ProductSidebar product={product} />
          </aside>
        </div>
      </section>

      {/* Design Features */}
      {hasFeatures && (
        <SectionShell id="features" muted>
          <Reveal>
            <SectionHeading eyebrow="Design" title="Key Design Features" />
          </Reveal>
          <div className="mt-6 lg:mt-8">
            <FeatureCards features={product.features} />
          </div>
        </SectionShell>
      )}

      {/* Summary specifications */}
      {hasSpecs && (
        <SectionShell id="specifications" muted>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="Specifications"
                title="Technical Specifications"
              />
            </Reveal>
            <p className="max-w-xl text-sm leading-6 text-brand-graphite/55 lg:text-right">
              Core operating, construction, material, connection, and
              performance specifications for product selection.
            </p>
          </div>
          <div className="mt-6 lg:mt-8">
            <SpecTable rows={product.specs} specGroups={product.specGroups} />
          </div>
        </SectionShell>
      )}

      {/* Detailed dimensions / Cv / torque / model tables */}
      {hasEngineering && product.engineering && (
        <SectionShell id="engineering-data">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="Engineering Data"
                title="Detailed Selection Data"
              />
            </Reveal>
            <p className="max-w-xl text-sm leading-6 text-brand-graphite/55 lg:text-right">
              Product-specific dimensions, materials, flow coefficients,
              torque values, model data, and configuration information where
              published by PDC.
            </p>
          </div>
          <div className="mt-6 lg:mt-8">
            <EngineeringDataSection engineering={product.engineering} />
          </div>
        </SectionShell>
      )}

      {/* Applications */}
      {hasApplications && (
        <SectionShell id="applications">
          <Reveal>
            <SectionHeading
              eyebrow="Applications"
              title="Where This Product Fits"
            />
          </Reveal>
          <div className="mt-6 lg:mt-8">
            <ApplicationGroups
              groups={product.applications}
              industries={product.industries}
            />
          </div>
        </SectionShell>
      )}

      {/* Downloads */}
      {hasDownloads && (
        <SectionShell id="downloads" muted>
          <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
            <div>
              <Reveal>
                <SectionHeading eyebrow="Resources" title="Technical Downloads" />
              </Reveal>
              <p className="mt-4 max-w-lg text-sm leading-6 text-brand-graphite/58">
                Brochures, technical literature, CAD resources, manuals, and
                other product documents when available.
              </p>
            </div>
            <DownloadsSection downloads={product.downloads} />
          </div>
        </SectionShell>
      )}

      {/* Related products */}
      {hasRelated && (
        <SectionShell id="related">
          <Reveal>
            <SectionHeading eyebrow="Related" title="Related Products" />
          </Reveal>
          <div className="mt-6 lg:mt-8">
            <RelatedProducts products={product.related} />
          </div>
        </SectionShell>
      )}

      {/* Engineering Support CTA */}
      <div id="support" className="scroll-mt-32">
        <QuoteCTA />
      </div>

      <MobileQuoteBar />
    </>
  );
}
