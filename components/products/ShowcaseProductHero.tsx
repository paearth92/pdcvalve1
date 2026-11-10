'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Download, Settings2, ShieldCheck, Waves } from 'lucide-react';
import type { ProductDetail, ProductGalleryImage } from '@/types/site';
import ProductHeroGallery, {
  type ProductHeroGalleryImage,
} from '@/components/products/ProductHeroGallery';
import RFQButton from '@/components/rfq/RFQButton';

export default function ShowcaseProductHero({
  product,
  backgroundPath,
  galleryImages = [],
  transparentImage,
}: {
  product: ProductDetail;
  backgroundPath?: string;
  galleryImages?: ProductGalleryImage[];
  transparentImage?: ProductGalleryImage;
}) {
  const categoryTitle =
    product.familySlug === 'butterfly-damper-valves'
      ? 'Damper and Control Valve'
      : product.familySlug === 'butterfly-valves'
        ? 'Butterfly Valve'
        : product.familyName;
  const showCategoryTitle = !product.name
    .toLocaleLowerCase()
    .includes(categoryTitle.toLocaleLowerCase());
  const highlights = product.features.slice(0, 3);
  const highlightIcons = [Waves, ShieldCheck, Settings2];
  const heroImages: ProductHeroGalleryImage[] = [
    ...(transparentImage?.src
      ? [
          {
            src: transparentImage.src,
            alt: transparentImage.alt,
            caption: transparentImage.caption,
            width: transparentImage.width,
            height: transparentImage.height,
            transparent: true,
          },
        ]
      : []),
    ...galleryImages.filter(
      (image): image is ProductGalleryImage & { src: string } => Boolean(image.src),
    ),
  ].filter((image, index, all) => all.findIndex((candidate) => candidate.src === image.src) === index);
  const hasMedia = heroImages.length > 0;

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

      <div
        className={`relative z-10 mx-auto grid min-h-[500px] max-w-7xl grid-cols-1 items-center gap-x-8 gap-y-1 px-4 py-6 sm:px-6 sm:py-8 lg:min-h-[560px] lg:px-8 lg:pt-6 lg:pb-10 ${hasMedia ? 'lg:grid-cols-[0.94fr_1.06fr]' : 'lg:grid-cols-1'}`}
      >
        <div
          className={
            hasMedia
              ? 'order-2 max-w-2xl lg:order-1'
              : 'order-1 max-w-4xl'
          }
        >
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/products/${product.familySlug}`}
              className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-green-dark/90 hover:text-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
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
          {showCategoryTitle && (
            <h2 className="mt-1 text-[1.65rem] font-semibold leading-tight tracking-[-0.02em] text-brand-green sm:text-[1.85rem]">
              {categoryTitle}
            </h2>
          )}
          <p className="mt-4 max-w-xl text-base leading-[1.65] text-brand-graphite sm:text-[1.05rem]">
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
                    <p className="text-sm font-semibold leading-snug text-brand-green">
                        {feature.title}
                      </p>
                      {feature.description && (
                    <p className="mt-1 text-xs leading-relaxed text-brand-graphite/90">
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

        {hasMedia && (
          <div className="order-1 min-w-0 w-full lg:order-2">
            <ProductHeroGallery
              images={heroImages}
              productName={product.name}
              className="mx-auto w-full max-w-2xl"
              waveBackground
            />
          </div>
        )}
      </div>
    </section>
  );
}
