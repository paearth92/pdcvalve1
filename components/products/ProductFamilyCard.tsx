import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductIcon } from '@/components/icons/ProductIcons';
import { getFamilyCardBasePath } from '@/data/assets/registry';
import AssetPlaceholder from '@/components/shared/AssetPlaceholder';
import FlexibleImage from '@/components/shared/FlexibleImage';
import type { ProductFamily } from '@/types/site';

export default function ProductFamilyCard({
  product,
}: {
  product: ProductFamily;
}) {
  const cardBasePath = getFamilyCardBasePath(product.slug);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-none border-b border-brand-green-dark/10 bg-white transition-all duration-300 hover:border-brand-green/30 hover:shadow-lg hover:shadow-brand-green-dark/5 sm:rounded-xl sm:border"
    >
      {/* Illustration area */}
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
            variant="product-family"
            label="Family image coming soon"
            className="h-full w-full"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold tracking-tight text-brand-green-dark">
          {product.name}
        </h3>

        {/* Divider */}
        <div className="mt-2 flex items-center gap-2">
          <span className="h-px w-6 bg-brand-green/40" />
        </div>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-graphite/70">
          {product.description}
        </p>

        {/* Link */}
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green transition-colors group-hover:text-brand-green-dark">
          View Product Family
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
