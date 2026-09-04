'use client';

import Link from 'next/link';
import { Download } from 'lucide-react';
import type { ProductDetail, ProductSpecRow } from '@/types/site';
import RFQButton from '@/components/rfq/RFQButton';

export default function ProductSidebar({
  product,
}: {
  product: ProductDetail;
}) {
  const quickSpecs =
    product.quickSpecs && product.quickSpecs.length > 0
      ? product.quickSpecs.slice(0, 6)
      : product.specs.slice(0, 6);

  const hasQuickSpecs = quickSpecs.length > 0;
  const hasDownloads = (product.downloads?.length ?? 0) > 0;

  return (
    <div className="lg:sticky lg:top-28">
      <div className="overflow-hidden rounded-[22px] border border-brand-green-dark/10 bg-[#0a1710] p-5 text-white shadow-[0_18px_50px_rgba(8,22,14,0.15)]">
        {/* The hero already establishes family / product / series.
            This card is intentionally only the fast selection snapshot. */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-brand-green">
              At a glance
            </span>
            <h3 className="mt-1.5 text-base font-bold leading-tight tracking-tight text-white">
              Key Specifications
            </h3>
          </div>

          <span
            className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-green shadow-[0_0_0_5px_rgba(22,132,71,0.12)]"
            aria-hidden="true"
          />
        </div>

        {hasQuickSpecs && (
          <>
            <div className="mt-4 h-px w-full bg-white/10" />

            <div className="mt-4 space-y-3">
              {quickSpecs.map((spec: ProductSpecRow) => (
                <div
                  key={`${spec.label}-${spec.value}`}
                  className="grid grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] gap-3"
                >
                  <span className="text-[11px] font-semibold leading-4 text-white/42">
                    {spec.label}
                  </span>
                  <span className="text-right text-[11px] font-medium leading-4 text-white/78">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="mt-5 h-px w-full bg-white/10" />

        {/* Actions remain here so the card is useful, not decorative repetition. */}
        <div className="mt-5 flex flex-col gap-2.5">
          <RFQButton
            productFamily={product.familyName}
            product={product.name}
            series={product.series}
            size="sm"
            className="w-full"
          />

          {hasDownloads && (
            <Link
              href="#downloads"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white/82 transition-all hover:border-brand-green/40 hover:bg-brand-green/10 hover:text-brand-green"
            >
              <Download className="h-4 w-4" />
              Technical Downloads
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}