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
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-brand-green-dark/10 bg-white transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-brand-green/30 hover:shadow-xl hover:shadow-brand-green-dark/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/30"
    >
      {/* Illustration area */}
      <div className="relative h-56 overflow-hidden border-b border-brand-green-dark/8 bg-white sm:h-60">
        {product.cardImage ? (
          <>
            <Image
              src={product.cardImage}
              alt={product.cardImageAlt ?? `${product.displayName ?? product.name} product family`}
              fill
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
              className="object-contain object-center p-4 transition-transform duration-500 ease-out group-hover:scale-[1.05] motion-reduce:transition-none"
            />
          </>
        ) : (
          <>
            <Image
              src={approvedProductBackground}
              alt=""
              fill
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
              className="object-contain object-center p-4 transition-transform duration-500 ease-out group-hover:scale-[1.05] motion-reduce:transition-none"
            />
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold tracking-tight text-brand-green-dark">
          {product.displayName ?? product.name}
        </h3>

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

