'use client';

import Link from 'next/link';
import { FileText, Check } from 'lucide-react';
import type { Product } from '@/types/product';
import { productFamiliesData } from '@/data/product-families';
import { getProductCardBasePath } from '@/data/assets/registry';
import RFQButton from '@/components/rfq/RFQButton';
import AssetPlaceholder from '@/components/shared/AssetPlaceholder';
import FlexibleImage from '@/components/shared/FlexibleImage';

/** Reusable product card for displaying individual products within a family. */
export default function ProductCard({
  product,
  familyRoute,
}: {
  product: Product;
  familyRoute: string;
}) {
  const href = `${familyRoute}/${product.slug}`;
  const familySlug = familyRoute.split('/').pop() ?? '';
  const family = productFamiliesData.find((f) => f.slug === familySlug);
  const familyName = family?.name ?? '';
  const cardBasePath = getProductCardBasePath(familySlug, product.slug);

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-none border-b border-brand-green-dark/10 bg-white shadow-sm shadow-brand-green-dark/5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/30 hover:shadow-xl hover:shadow-brand-green-dark/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/30 sm:rounded-xl sm:border"
    >
      {/* Image area — edge to edge, no padding */}
      <div className="relative h-48 overflow-hidden border-b border-brand-green-dark/8">
        {cardBasePath ? (
          <FlexibleImage
            basePath={cardBasePath}
            alt={product.name}
            className="h-full w-full object-cover"
            width={800}
            height={800}
          />
        ) : (
          <AssetPlaceholder
            variant="product"
            label="Product image coming soon"
            className="h-full w-full"
          />
        )}
        {/* Series badge */}
        {product.series && (
          <span className="absolute left-3 top-3 rounded-md border border-brand-green-dark/15 bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-green-dark shadow-sm shadow-brand-green-dark/10 backdrop-blur-sm">
            {product.series}
          </span>
        )}
        {/* Corner registration marks */}
        <span className="absolute right-2 top-2 h-3 w-3 border-r border-t border-brand-green/25" />
        <span className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-brand-green/25" />
        <span className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-brand-green/25" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold tracking-tight text-brand-green-dark">
          {product.name}
        </h3>
        <div className="mt-2 h-px w-6 bg-brand-green/40" />
        <p className="mt-3 text-sm leading-relaxed text-brand-graphite/70">
          {product.shortDescription ?? 'Product information is being prepared.'}
        </p>

        {/* Feature bullets */}
        {product.features && product.features.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {product.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-xs leading-relaxed text-brand-graphite/65"
              >
                <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-brand-green" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        {/* Application tags */}
        {product.applications && product.applications.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {product.applications.map((tag) => (
              <span
                key={tag}
                className="rounded border border-brand-green-dark/10 bg-brand-light-bg px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-steel"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="mt-5 flex flex-col gap-2 pt-1 sm:flex-row">
          <span
            className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-brand-green-dark/15 bg-white px-4 py-2.5 text-sm font-semibold text-brand-green-dark transition-all group-hover:border-brand-green/30 group-hover:text-brand-green"
          >
            <FileText className="h-4 w-4" />
            Learn More
          </span>
          <div onClick={(e) => e.stopPropagation()} className="flex-1">
            <RFQButton
              productFamily={familyName}
              product={product.name}
              series={product.series}
              size="sm"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
