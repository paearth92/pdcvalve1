'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Download, Settings2, ShieldCheck, Waves } from 'lucide-react';
import type { ProductDetail, ProductGalleryImage } from '@/types/site';
import FlexibleImage from '@/components/shared/FlexibleImage';
import AssetPlaceholder from '@/components/shared/AssetPlaceholder';
import RFQButton from '@/components/rfq/RFQButton';

type HeroImage = ProductGalleryImage & {
  id: string;
  basePath?: string;
  transparent?: boolean;
};

export default function ShowcaseProductHero({
  product,
  cardBasePath,
  heroBasePath,
  cutoutPath,
  backgroundPath,
}: {
  product: ProductDetail;
  cardBasePath: string | null;
  heroBasePath: string | null;
  cutoutPath?: string;
  backgroundPath?: string;
}) {
  const images: HeroImage[] = [];

  if (cutoutPath) {
    // Econotrol currently has one approved image; don't add unrelated gallery/card photos.
    images.push({
      id: 'transparent-product-cutout',
      src: cutoutPath,
      alt: `${product.name} butterfly damper valve with manual lever`,
      caption: `${product.name} with manual lever`,
      transparent: true,
    });
  } else {
    images.push(
      ...(product.gallery ?? []).map((image, index) => ({
        ...image,
        id: `gallery-${index}-${image.src ?? image.alt}`,
      })),
    );

    if (cardBasePath) {
      images.push({
        id: 'product-view',
        basePath: cardBasePath,
        alt: `${product.name} product view`,
        caption: `${product.name} product view`,
      });
    }

    if (images.length === 0 && heroBasePath) {
      images.push({
        id: 'product-hero',
        basePath: heroBasePath,
        alt: product.name,
        caption: product.name,
      });
    }
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];
  const hasMultipleImages = images.length > 1;
  const categoryTitle =
    product.familySlug === 'butterfly-damper-valves'
      ? 'Butterfly Damper Valve'
      : 'Butterfly Valve';
  const highlights = product.features.slice(0, 3);
  const highlightIcons = [Waves, ShieldCheck, Settings2];

  return (
    <section className="relative isolate overflow-hidden bg-[#eef2f3] text-brand-green-dark">
      {backgroundPath ? (
        <Image
          src={backgroundPath}
          alt=""
          fill
          sizes="100vw"
          priority
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 object-cover object-center"
        />
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-36 top-0 h-full w-[58%] bg-[radial-gradient(ellipse_at_65%_45%,rgba(28,111,65,0.13),transparent_68%)]"
        />
      )}

      <div className="relative z-10 mx-auto grid min-h-[560px] max-w-7xl grid-cols-1 items-center gap-x-8 gap-y-1 px-4 py-6 sm:px-6 sm:py-8 lg:min-h-[560px] lg:grid-cols-[0.94fr_1.06fr] lg:px-8 lg:pt-6 lg:pb-10">
        <div className="order-2 max-w-2xl lg:order-1">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/products/${product.familySlug}`}
              className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-green hover:text-brand-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
            >
              Product Family
            </Link>
            {product.series && (
              <span className="rounded border border-brand-green-dark/20 bg-white/45 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-green-dark/75">
                Series {product.series}
              </span>
            )}
          </div>

          <h1 className="mt-4 text-[2.35rem] font-bold leading-[1.06] tracking-[-0.025em] text-brand-green sm:text-[2.8rem] lg:text-[3.25rem]">
            {product.name}
          </h1>
          <h2 className="mt-1 text-[1.65rem] font-semibold leading-tight tracking-[-0.02em] text-brand-green-dark sm:text-[1.85rem]">
            {categoryTitle}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-[1.65] text-brand-graphite/75 sm:text-[1.05rem]">
            {product.shortDescription}
          </p>

          {highlights.length > 0 && (
            <div className="mt-6 grid grid-cols-1 gap-3 border-y border-brand-green-dark/15 py-4 sm:grid-cols-3 sm:gap-0">
              {highlights.map((feature, index) => {
                const Icon = highlightIcons[index] ?? Settings2;
                return (
                  <div
                    key={feature.title}
                    className={`flex items-start gap-2.5 sm:px-3 first:sm:pl-0 last:sm:pr-0 ${index > 0 ? 'sm:border-l sm:border-brand-green-dark/15' : ''}`}
                  >
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                    <div>
                      <p className="text-sm font-semibold leading-snug text-brand-green-dark">
                        {feature.title}
                      </p>
                      {feature.description && (
                        <p className="mt-1 text-xs leading-relaxed text-brand-graphite/65">
                          {feature.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {product.badges.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {product.badges.map((badge) => (
                <span
                  key={badge.label}
                  className="rounded-full border border-brand-green-dark/15 bg-white/60 px-3 py-1.5 text-xs font-semibold text-brand-green-dark"
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
            {product.downloads.length > 0 && (
              <Link
                href="#downloads"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-brand-green-dark/35 bg-white/30 px-5 py-2.5 text-sm font-semibold text-brand-green-dark transition-colors hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              >
                <Download className="h-4 w-4" />
                Download Literature
              </Link>
            )}
          </div>

          {product.trustBadges && product.trustBadges.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-brand-green-dark/15 pt-4">
              {product.trustBadges.map((badge) => (
                <li key={badge} className="text-xs font-semibold text-brand-green-dark/70">
                  {badge}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="order-1 min-w-0 w-full lg:order-2">
          <div className="relative mx-auto h-[17rem] w-full max-w-2xl sm:h-[21rem] lg:h-[28rem] xl:h-[31rem]">
            {backgroundPath && (
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 h-full w-full lg:hidden"
                viewBox="0 0 1000 600"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="econotrol-mobile-wave" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#e5eee8" stopOpacity="0.7" />
                    <stop offset="58%" stopColor="#b8cdbf" stopOpacity="0.74" />
                    <stop offset="100%" stopColor="#83a991" stopOpacity="0.82" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 540 C320 535 640 190 1000 85 L1000 600 L0 600 Z"
                  fill="url(#econotrol-mobile-wave)"
                />
              </svg>
            )}
            {activeImage ? (
              activeImage.basePath ? (
                <FlexibleImage
                  key={activeImage.basePath}
                  basePath={activeImage.basePath}
                  alt={activeImage.alt}
                  className="h-full w-full object-contain"
                  width={1440}
                  height={960}
                  loading="eager"
                />
              ) : activeImage.src ? (
                <Image
                  key={activeImage.src}
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className={`z-10 object-contain ${activeImage.transparent ? 'p-1 sm:p-3' : ''}`}
                  priority={activeIndex === 0}
                />
              ) : (
                <AssetPlaceholder
                  variant="product"
                  label="Product image coming soon"
                  className="h-full w-full"
                />
              )
            ) : (
              <AssetPlaceholder
                variant="product"
                label="Product image coming soon"
                className="h-full w-full"
              />
            )}
          </div>

          {hasMultipleImages && (
            <div
              className="mx-auto mt-3 flex max-w-2xl gap-3 overflow-x-auto pb-1"
              aria-label={`${product.name} product images`}
            >
              {images.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show ${image.caption ?? image.alt}`}
                  aria-pressed={index === activeIndex}
                  className={`relative h-[4.5rem] w-24 shrink-0 overflow-hidden border-2 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green sm:h-20 sm:w-32 ${image.transparent ? 'bg-white/40' : 'bg-[#071a12]'} ${index === activeIndex ? 'border-brand-green' : 'border-transparent opacity-65 hover:opacity-100'}`}
                >
                  {image.basePath ? (
                    <FlexibleImage
                      basePath={image.basePath}
                      alt=""
                      className="h-full w-full object-cover"
                      width={256}
                      height={160}
                    />
                  ) : image.src ? (
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes="128px"
                      className={image.transparent ? 'object-contain p-1' : 'object-cover'}
                      loading="lazy"
                    />
                  ) : null}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
