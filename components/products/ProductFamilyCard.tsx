import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { approvedProductBackground } from '@/data/assets/registry';
import type { ProductFamily } from '@/types/site';

export default function ProductFamilyCard({
  product,
}: {
  product: ProductFamily;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex h-full flex-col items-center text-center text-brand-green-dark transition-transform duration-300 ease-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/30"
    >
      {/* Illustration area */}
      <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden">
        {product.cardImage ? (
          <>
            <Image
              src={product.cardImage}
              alt={product.cardImageAlt ?? `${product.displayName ?? product.name} product family`}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-contain object-center p-4 transition-transform duration-500 ease-out group-hover:scale-[1.035] motion-reduce:transition-none"
            />
          </>
        ) : (
          <>
            <Image
              src={approvedProductBackground}
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-contain object-center p-4 transition-transform duration-500 ease-out group-hover:scale-[1.035] motion-reduce:transition-none"
            />
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex w-full flex-1 flex-col items-center pt-4">
        <h3 className="text-lg font-medium leading-snug text-brand-green-dark">
          {product.displayName ?? product.name}
        </h3>

        <p className="mt-3 max-w-sm px-4 text-sm leading-relaxed text-brand-graphite/70">
          {product.description}
        </p>

        {/* Link */}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-green transition-colors group-hover:text-brand-green-dark">
          View Product Family
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
