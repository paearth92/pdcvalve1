import Link from 'next/link';
import { ArrowRight, Download, Check } from 'lucide-react';
import Breadcrumbs, { type BreadcrumbItem } from '@/components/products/ProductBreadcrumbs';
import EmptyProductGrid from '@/components/products/EmptyProductGrid';
import ContentPlaceholder from '@/components/products/ContentPlaceholder';
import ProductCard from '@/components/products/ProductCard';
import ApplicationCards from '@/components/products/ApplicationCards';
import DownloadsSection from '@/components/products/DownloadsSection';
import QuoteCTA from '@/components/products/QuoteCTA';
import Reveal from '@/components/products/Reveal';
import SectionHeading from '@/components/shared/SectionHeading';
import { ProductIcon } from '@/components/icons/ProductIcons';
import { getFamilyHeroBasePath, getFamilyCardBasePath } from '@/data/assets/registry';
import AssetPlaceholder from '@/components/shared/AssetPlaceholder';
import FlexibleImage from '@/components/shared/FlexibleImage';
import DesktopHeroFrame from '@/components/products/DesktopHeroFrame';
import type { ProductFamilyData } from '@/types/product';
import type { Product } from '@/types/product';
import RFQButton from '@/components/rfq/RFQButton';

export default function ProductFamilyTemplate({
  family,
  products,
}: {
  family: ProductFamilyData;
  products: Product[];
}) {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: family.name, href: family.route },
  ];

  const hasProducts = products.length > 0;
  const hasAppCards = family.applications && family.applications.length > 0;
  const hasDownloads = family.downloads && family.downloads.length > 0;
  const hasOverviewSections = !!family.overviewSections;

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      {/* ===== Mobile Hero — full-bleed image, then text/CTAs below ===== */}
      <section className="bg-brand-green-dark text-white sm:hidden">
        {/* Full-bleed image */}
        <div className="relative h-56 w-full overflow-hidden">
          {(() => {
            const cardBasePath = getFamilyCardBasePath(family.slug);
            const heroBasePath = getFamilyHeroBasePath(family.slug);
            const basePath = cardBasePath ?? heroBasePath;
            if (basePath) {
              return (
                <FlexibleImage
                  basePath={basePath}
                  alt={family.name}
                  className="h-full w-full object-cover object-center"
                  width={1200}
                  height={800}
                />
              );
            }
            return (
              <AssetPlaceholder
                variant="product-family"
                label="Family image coming soon"
                className="h-full w-full"
              />
            );
          })()}
        </div>

        {/* Text + CTAs */}
        <div className="px-4 py-8">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green">
            Product Family
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white">
            {family.name}
          </h1>
          <div className="mt-3 h-px w-16 bg-brand-green/60" />
          <p className="mt-4 text-sm leading-relaxed text-white/80">
            {family.shortDescription} Engineered for reliable performance in
            demanding industrial environments, with custom configurations
            available for your specific application.
          </p>

          {/* CTAs */}
          <div className="mt-6 flex flex-col gap-3">
            <RFQButton productFamily={family.name} size="md" />
            {hasDownloads && (
              <Link
                href="#downloads"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white/50 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <Download className="h-4 w-4" />
                Download Literature
              </Link>
            )}
          </div>

          {/* Trust badges */}
          {family.trustBadges && family.trustBadges.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2.5 border-t border-white/15 pt-5">
              {family.trustBadges.map((badge) => (
                <div key={badge} className="flex items-center gap-1.5">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full border border-white/30 bg-white/10">
                    <Check className="h-2.5 w-2.5 text-white" />
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-white/70">
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== Tablet Hero — keep the full-bleed treatment that already works ===== */}
      <section className="relative isolate hidden min-h-[68vh] overflow-hidden bg-brand-green-dark text-white sm:block lg:min-h-[78vh] xl:hidden">
        {(() => {
          const heroBasePath = getFamilyHeroBasePath(family.slug);
          if (heroBasePath) {
            return (
              <FlexibleImage
                basePath={heroBasePath}
                alt={family.name}
                className="absolute inset-0 h-full w-full object-cover object-center"
                width={1920}
                height={1080}
              />
            );
          }

          return (
            <AssetPlaceholder
              variant="product-family"
              label="Family image coming soon"
              className="absolute inset-0 h-full w-full"
            />
          );
        })()}

        <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(2,30,20,0.94)_0%,rgba(2,30,20,0.86)_18%,rgba(2,30,20,0.5)_35%,rgba(2,30,20,0.12)_50%,transparent_60%)]" />

        <div className="relative z-10 mx-auto flex min-h-[68vh] max-w-7xl items-center px-6 py-16 lg:min-h-[78vh] lg:px-8 lg:py-24">
          <div className="w-full max-w-xl lg:max-w-[46%]">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green">
              Product Family
            </span>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl">
              {family.name}
            </h1>

            <div className="mt-4 h-px w-16 bg-brand-green/60" />

            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/80 sm:text-base">
              {family.shortDescription} Engineered for reliable performance in
              demanding industrial environments, with custom configurations
              available for your specific application.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <RFQButton productFamily={family.name} size="md" />
              {hasDownloads && (
                <Link
                  href="#downloads"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <Download className="h-4 w-4" />
                  Download Literature
                </Link>
              )}
            </div>

            {family.trustBadges && family.trustBadges.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {family.trustBadges.map((badge) => (
                  <div key={badge} className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/30 bg-white/10">
                      <Check className="h-3 w-3 text-white" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wide text-white/70">
                      {badge}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== XL Desktop Hero — framed natural-ratio artwork ===== */}
      <DesktopHeroFrame
        basePath={getFamilyHeroBasePath(family.slug)}
        alt={family.name}
        contentSide="left"
        placeholderVariant="product-family"
        placeholderLabel="Family image coming soon"
      >
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green">
          Product Family
        </span>

        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white drop-shadow-lg 2xl:text-5xl">
          {family.name}
        </h1>

        <div className="mt-4 h-px w-16 bg-brand-green/60" />

        <p className="mt-5 max-w-xl text-[15px] leading-7 text-white/85 2xl:text-base">
          {family.shortDescription} Engineered for reliable performance in
          demanding industrial environments, with custom configurations
          available for your specific application.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <RFQButton productFamily={family.name} size="md" />

          {hasDownloads && (
            <Link
              href="#downloads"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <Download className="h-4 w-4" />
              Download Literature
            </Link>
          )}
        </div>

        {family.trustBadges && family.trustBadges.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2.5">
            {family.trustBadges.map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/30 bg-white/10">
                  <Check className="h-3 w-3 text-white" />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wide text-white/70">
                  {badge}
                </span>
              </div>
            ))}
          </div>
        )}
      </DesktopHeroFrame>

      {/* ===== Main Content ===== */}
      <div className="mx-auto max-w-7xl py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-20">
          {/* Overview */}
          <section id="overview" className="scroll-mt-32">
            <Reveal>
              <SectionHeading eyebrow="Overview" title="Family Overview" />
            </Reveal>

            {hasOverviewSections ? (
              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                {/* Introduction */}
                <Reveal>
                  <div className="rounded-xl border border-brand-green-dark/10 bg-white p-6">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-brand-green">
                      Introduction
                    </h3>
                    <div className="mt-3 h-px w-8 bg-brand-green/30" />
                    <p className="mt-4 text-sm leading-relaxed text-brand-graphite/75">
                      {family.overviewSections!.introduction}
                    </p>
                  </div>
                </Reveal>

                {/* Engineering Advantages */}
                <Reveal delay={100}>
                  <div className="rounded-xl border border-brand-green-dark/10 bg-white p-6">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-brand-green">
                      Engineering Advantages
                    </h3>
                    <div className="mt-3 h-px w-8 bg-brand-green/30" />
                    <ul className="mt-4 space-y-2.5">
                      {family.overviewSections!.advantages.map((adv) => (
                        <li
                          key={adv}
                          className="flex items-start gap-2 text-sm leading-relaxed text-brand-graphite/75"
                        >
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-green" />
                          {adv}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                {/* Typical Applications */}
                <Reveal delay={150}>
                  <div className="rounded-xl border border-brand-green-dark/10 bg-white p-6">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-brand-green">
                      Typical Applications
                    </h3>
                    <div className="mt-3 h-px w-8 bg-brand-green/30" />
                    <ul className="mt-4 space-y-2.5">
                      {family.overviewSections!.applications.map((app) => (
                        <li
                          key={app}
                          className="flex items-start gap-2 text-sm leading-relaxed text-brand-graphite/75"
                        >
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-green" />
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                {/* Customization */}
                <Reveal delay={200}>
                  <div className="rounded-xl border border-brand-green-dark/10 bg-white p-6">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-brand-green">
                      Customization Capability
                    </h3>
                    <div className="mt-3 h-px w-8 bg-brand-green/30" />
                    <p className="mt-4 text-sm leading-relaxed text-brand-graphite/75">
                      {family.overviewSections!.customization}
                    </p>
                  </div>
                </Reveal>
              </div>
            ) : (
              <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-brand-graphite/75">
                {family.overview ?? family.shortDescription}
              </p>
            )}
          </section>

          {/* Product Grid */}
          <section id="products" className="scroll-mt-32">
            <Reveal>
              <SectionHeading eyebrow="Products" title="Products in This Family" />
            </Reveal>
            <div className="mt-8">
              {hasProducts ? (
                <div className="grid grid-cols-1 gap-0 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((p, i) => (
                    <Reveal key={p.id} delay={i * 60}>
                      <ProductCard product={p} familyRoute={family.route} />
                    </Reveal>
                  ))}
                </div>
              ) : (
                <EmptyProductGrid />
              )}
            </div>
          </section>

          {/* Applications */}
          <section id="applications" className="scroll-mt-32">
            <Reveal>
              <SectionHeading
                eyebrow="Applications"
                title="Typical Applications"
              />
            </Reveal>
            <div className="mt-8">
              {hasAppCards ? (
                <ApplicationCards applications={family.applications!} />
              ) : (
                <ContentPlaceholder
                  title="Applications Information Coming Soon"
                  description="Detailed application data for this product family is being prepared."
                />
              )}
            </div>
          </section>

          {/* Industries */}
          <section id="industries" className="scroll-mt-32">
            <Reveal>
              <SectionHeading eyebrow="Industries" title="Industries Served" />
            </Reveal>
            <div className="mt-8">
              {family.industries && family.industries.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {family.industries.map((ind) => (
                    <div
                      key={ind}
                      className="rounded-lg border border-brand-green-dark/10 bg-white px-5 py-4 text-sm font-medium text-brand-graphite/75"
                    >
                      {ind}
                    </div>
                  ))}
                </div>
              ) : (
                <ContentPlaceholder
                  title="Industry Information Coming Soon"
                  description="Industry-specific details for this product family are being prepared."
                />
              )}
            </div>
          </section>

          {/* Downloads */}
          <section id="downloads" className="scroll-mt-32">
            <Reveal>
              <SectionHeading eyebrow="Resources" title="Downloads" />
            </Reveal>
            <div className="mt-8">
              {hasDownloads ? (
                <DownloadsSection downloads={family.downloads!} />
              ) : (
                <ContentPlaceholder
                  title="Downloads Coming Soon"
                  description="Technical literature, CAD models, and certification documents will be available here."
                />
              )}
            </div>
          </section>
        </div>
      </div>

      <QuoteCTA />
    </>
  );
}