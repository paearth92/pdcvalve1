import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import type { ProductFamilyData } from '@/types/product';
import { getFamilyCardBasePath, getFamilyHeroBasePath } from '@/data/assets/registry';
import FlexibleImage from '@/components/shared/FlexibleImage';
import AssetPlaceholder from '@/components/shared/AssetPlaceholder';
import RFQButton from '@/components/rfq/RFQButton';

export default function ShowcaseFamilyHero({ family }: { family: ProductFamilyData }) {
  const imageBasePath =
    getFamilyCardBasePath(family.slug) ?? getFamilyHeroBasePath(family.slug);

  return (
    <section className="relative overflow-hidden bg-[#f4f7f5] text-brand-green-dark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 top-0 h-full w-[58%] bg-[radial-gradient(ellipse_at_65%_45%,rgba(28,111,65,0.13),transparent_68%)]"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col-reverse items-center gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid lg:grid-cols-[0.88fr_1.12fr] lg:gap-12 lg:px-8 lg:py-14">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-green">
            Product Family
          </p>
          <h1 className="mt-4 text-[2.35rem] font-bold leading-[1.06] tracking-[-0.025em] sm:text-[2.8rem] lg:text-[3.25rem]">
            {family.heroTitle ?? family.name}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-[1.65] text-brand-graphite/75 sm:text-[1.05rem]">
            {family.shortDescription} Engineered for reliable performance in
            demanding industrial environments, with custom configurations
            available for your specific application.
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

        <div className="relative aspect-[16/10] min-h-[220px] w-full overflow-hidden bg-[#071a12] sm:aspect-[3/2] sm:min-h-0">
          {imageBasePath ? (
            <FlexibleImage
              basePath={imageBasePath}
              alt={`${family.name} product range`}
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
  );
}
