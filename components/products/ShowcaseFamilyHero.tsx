import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import type { ProductFamilyData } from '@/types/product';
import {
  approvedProductBackground,
  getFamilyCardBasePath,
  getFamilyHeroBasePath,
} from '@/data/assets/registry';
import FlexibleImage from '@/components/shared/FlexibleImage';
import AssetPlaceholder from '@/components/shared/AssetPlaceholder';
import RFQButton from '@/components/rfq/RFQButton';

export default function ShowcaseFamilyHero({ family }: { family: ProductFamilyData }) {
  const imageBasePath =
    getFamilyCardBasePath(family.slug) ?? getFamilyHeroBasePath(family.slug);
  const description = `${family.shortDescription} Engineered for reliable performance in demanding industrial environments, with custom configurations available for your specific application.`;

  return (
    <>
      {/* Mobile and tablet keep the stacked family hero. */}
      <section className="relative overflow-hidden bg-[#f4f7f5] text-brand-green-dark lg:hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-36 top-0 h-full w-[58%] bg-[radial-gradient(ellipse_at_65%_45%,rgba(28,111,65,0.13),transparent_68%)]"
        />
        <div className="relative mx-auto flex max-w-7xl flex-col-reverse items-center gap-8 px-4 py-8 sm:px-6 sm:py-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-graphite/75">
              Product Family
            </p>
            <h1 className="mt-4 text-[2.35rem] font-bold leading-[1.06] tracking-[-0.025em] sm:text-[2.8rem]">
              {family.heroTitle ?? family.name}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-[1.65] text-brand-graphite/75 sm:text-[1.05rem]">
              {description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <RFQButton productFamily={family.name} size="md" />
              <Link
                href="#products"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-brand-green-dark/35 px-5 py-2.5 text-sm font-semibold text-brand-green-dark transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              >
                Explore Products <ArrowRight className="h-4 w-4" />
              </Link>
              {family.downloads && family.downloads.length > 0 && (
                <Link
                  href="#downloads"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold text-brand-green-dark transition-colors hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                >
                  <Download className="h-4 w-4" />
                  Download Literature
                </Link>
              )}
            </div>
          </div>

          <div className="relative aspect-[16/10] min-h-[220px] w-full overflow-hidden bg-[#eef2f3] sm:aspect-[3/2] sm:min-h-0">
            {imageBasePath ? (
              <FlexibleImage
                basePath={imageBasePath}
                alt=""
                className="h-full w-full object-cover"
                width={1536}
                height={1024}
                loading="eager"
              />
            ) : (
              <AssetPlaceholder
                variant="product-family"
                label="Family image coming soon"
                className="h-full w-full"
              />
            )}
          </div>
        </div>
      </section>

      {/* Desktop uses the same full-bleed wave background and typography as product heroes. */}
      <section className="relative isolate hidden overflow-hidden bg-[#eef2f3] text-brand-green-dark lg:block">
        <Image
          src={approvedProductBackground}
          alt=""
          fill
          sizes="100vw"
          priority
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 object-cover object-center"
        />
        <div className="relative z-10 mx-auto grid min-h-[560px] max-w-7xl grid-cols-[0.94fr_1.06fr] items-center gap-x-8 px-8 py-10 2xl:min-h-[600px]">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-graphite/75">
              Product Family
            </p>
            <h1 className="mt-4 text-[2.35rem] font-bold leading-[1.06] tracking-[-0.025em] text-brand-green sm:text-[2.8rem] lg:text-[3.25rem]">
              {family.heroTitle ?? family.name}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-[1.65] text-brand-graphite/75 sm:text-[1.05rem]">
              {description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <RFQButton productFamily={family.name} size="md" />
              <Link
                href="#products"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-brand-green-dark/35 bg-white/30 px-5 py-2.5 text-sm font-semibold text-brand-green-dark transition-colors hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              >
                Explore Products <ArrowRight className="h-4 w-4" />
              </Link>
              {family.downloads && family.downloads.length > 0 && (
                <Link
                  href="#downloads"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold text-brand-green-dark transition-colors hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                >
                  <Download className="h-4 w-4" />
                  Download Literature
                </Link>
              )}
            </div>
          </div>

          {/* Reserved for the approved family image group when it is provided. */}
          <div aria-hidden="true" className="min-h-[380px]" />
        </div>
      </section>
    </>
  );
}
