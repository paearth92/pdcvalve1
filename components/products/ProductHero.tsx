'use client';

import Link from 'next/link';
import { Download, Check } from 'lucide-react';
import type { ProductDetail } from '@/types/site';
import RFQButton from '@/components/rfq/RFQButton';
import { getProductHeroBasePath, getProductCardBasePath } from '@/data/assets/registry';
import FlexibleImage from '@/components/shared/FlexibleImage';
import AssetPlaceholder from '@/components/shared/AssetPlaceholder';
import DesktopHeroFrame from '@/components/products/DesktopHeroFrame';

export default function ProductHero({ product }: { product: ProductDetail }) {
  const heroBasePath = getProductHeroBasePath(product.familySlug, product.slug);
  const cardBasePath = getProductCardBasePath(product.familySlug, product.slug);

  return (
    <>
      {/* ============================================================
       * Mobile layout — full-bleed image first, then text + CTAs
       * ========================================================== */}
      <section className="bg-brand-green-dark text-white sm:hidden">
        {/* Full-bleed image */}
        <div className="relative h-56 w-full overflow-hidden">
          {cardBasePath ? (
            <FlexibleImage
              basePath={cardBasePath}
              alt={product.name}
              className="h-full w-full object-cover object-center"
              width={1200}
              height={800}
            />
          ) : (
            <AssetPlaceholder
              variant="product"
              label="Product image coming soon"
              className="h-full w-full"
            />
          )}
        </div>

        {/* Text + CTAs */}
        <div className="px-4 py-8">
          <Link
            href={`/products/${product.familySlug}`}
            className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green/90"
          >
            {product.familyName}
          </Link>

          {product.series && (
            <span className="mt-2 inline-flex w-fit rounded-md border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              {product.series}
            </span>
          )}

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white">
            {product.name}
          </h1>

          <div className="mt-3 h-px w-16 bg-brand-green/60" />

          {product.shortDescription && (
            <p className="mt-4 text-sm font-medium leading-relaxed text-white/90">
              {product.shortDescription}
            </p>
          )}

          {/* Badges */}
          {product.badges.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.badges.map((badge) => (
                <span
                  key={badge.label}
                  className="inline-flex items-center rounded-md border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white"
                >
                  {badge.label}
                </span>
              ))}
            </div>
          )}

          {/* CTAs */}
          <div className="mt-6 flex flex-col gap-3">
            <RFQButton
              productFamily={product.familyName}
              product={product.name}
              series={product.series}
              size="md"
            />
            {product.downloads && product.downloads.length > 0 && (
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
          {product.trustBadges && product.trustBadges.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2.5 border-t border-white/15 pt-5">
              {product.trustBadges.map((badge) => (
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

      {/* ============================================================
       * Tablet layout — keep the version that already works well
       * ========================================================== */}
      <section className="relative hidden min-h-[60vh] items-center overflow-hidden bg-brand-green-dark sm:flex sm:py-20 lg:min-h-[70vh] lg:py-24 xl:hidden">
        {heroBasePath ? (
          <FlexibleImage
            basePath={heroBasePath}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="eager"
          />
        ) : (
          <AssetPlaceholder
            variant="product"
            label="Product image coming soon"
            className="absolute inset-0 h-full w-full"
          />
        )}

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, transparent 0%, transparent 45%, rgba(10,46,28,0.5) 55%, rgba(10,46,28,0.92) 75%, #0a2e1c 100%)',
          }}
        />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="ml-auto max-w-lg lg:ml-[55%] lg:w-[42%]">
            <Link
              href={`/products/${product.familySlug}`}
              className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green/90 transition-colors hover:text-white"
            >
              {product.familyName}
            </Link>

            {product.series && (
              <span className="mt-3 inline-flex w-fit rounded-md border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                {product.series}
              </span>
            )}

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            <div className="mt-4 h-px w-16 bg-brand-green/60" />

            {product.shortDescription && (
              <p className="mt-4 max-w-lg text-sm font-medium leading-relaxed text-white sm:text-base">
                {product.shortDescription}
              </p>
            )}

            {product.badges.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {product.badges.map((badge) => (
                  <span
                    key={badge.label}
                    className="inline-flex items-center rounded-md border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
                  >
                    {badge.label}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <RFQButton
                productFamily={product.familyName}
                product={product.name}
                series={product.series}
                size="md"
              />
              {product.downloads && product.downloads.length > 0 && (
                <Link
                  href="#downloads"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <Download className="h-4 w-4" />
                  Download Literature
                </Link>
              )}
            </div>

            {product.trustBadges && product.trustBadges.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2.5 border-t border-white/15 pt-5">
                {product.trustBadges.map((badge) => (
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
        </div>
      </section>

      {/* ============================================================
       * XL desktop layout — framed natural-ratio artwork
       * ========================================================== */}
      <DesktopHeroFrame
        basePath={heroBasePath}
        alt={product.name}
        contentSide="right"
        placeholderVariant="product"
        placeholderLabel="Product image coming soon"
      >
        <Link
          href={`/products/${product.familySlug}`}
          className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green/90 transition-colors hover:text-white"
        >
          {product.familyName}
        </Link>

        {product.series && (
          <span className="ml-2 inline-flex w-fit rounded-md border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            {product.series}
          </span>
        )}

        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white drop-shadow-lg 2xl:text-5xl">
          {product.name}
        </h1>

        <div className="mt-4 h-px w-16 bg-brand-green/60" />

        {product.shortDescription && (
          <p className="mt-4 max-w-lg text-[15px] font-medium leading-7 text-white/90 2xl:text-base">
            {product.shortDescription}
          </p>
        )}

        {product.badges.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {product.badges.map((badge) => (
              <span
                key={badge.label}
                className="inline-flex items-center rounded-md border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
              >
                {badge.label}
              </span>
            ))}
          </div>
        )}

        <div className="mt-7 flex flex-wrap gap-3">
          <RFQButton
            productFamily={product.familyName}
            product={product.name}
            series={product.series}
            size="md"
          />

          {product.downloads && product.downloads.length > 0 && (
            <Link
              href="#downloads"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <Download className="h-4 w-4" />
              Download Literature
            </Link>
          )}
        </div>

        {product.trustBadges && product.trustBadges.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2.5 border-t border-white/15 pt-4">
            {product.trustBadges.map((badge) => (
              <div key={badge} className="flex items-center gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-white/30 bg-white/10">
                  <Check className="h-2.5 w-2.5 text-white" />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wide text-white/70">
                  {badge}
                </span>
              </div>
            ))}
          </div>
        )}
      </DesktopHeroFrame>
    </>
  );
}