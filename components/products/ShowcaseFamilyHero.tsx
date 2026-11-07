import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import type { ProductFamilyData } from '@/types/product';
import { approvedProductBackground } from '@/data/assets/registry';
import RFQButton from '@/components/rfq/RFQButton';

export default function ShowcaseFamilyHero({
  family,
}: {
  family: ProductFamilyData;
}) {
  const description = `${family.shortDescription} Engineered for reliable performance in demanding industrial environments, with custom configurations available for your specific application.`;

  return (
    <section className="relative isolate overflow-hidden bg-[#eef2f3] text-brand-green-dark">
      <Image
        src={approvedProductBackground}
        alt=""
        fill
        sizes="100vw"
        priority
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 object-cover object-center"
      />
      <div className="relative z-10 mx-auto flex min-h-[500px] max-w-7xl items-center px-4 py-12 sm:min-h-[540px] sm:px-6 sm:py-14 lg:min-h-[560px] lg:px-8 lg:py-16 2xl:min-h-[600px]">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-graphite/75">
            Product Family
          </p>
          <h1 className="mt-4 text-[2.35rem] font-bold leading-[1.06] tracking-[-0.025em] text-brand-green sm:text-[2.8rem] lg:text-[3.25rem]">
            {family.heroTitle ?? family.name}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-[1.65] text-brand-graphite/75 sm:text-[1.05rem]">
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
      </div>
    </section>
  );
}
