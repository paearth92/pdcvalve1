import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ProductFamily } from '@/types/site';

export default function RelatedProducts({
  products,
}: {
  products: ProductFamily[];
}) {
  if (!products || products.length === 0) {
    return (
      <p className="text-sm text-brand-graphite/50">
        Related product information is being prepared.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Link
          key={product.slug}
          href={`/products/${product.slug}`}
          className="group flex flex-col rounded-xl border border-brand-green-dark/10 bg-white p-6 shadow-sm shadow-brand-green-dark/5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/30 hover:shadow-xl hover:shadow-brand-green-dark/10"
        >
          <h4 className="text-base font-bold tracking-tight text-brand-green-dark">
            {product.name}
          </h4>
          <div className="mt-2 h-px w-8 bg-brand-green/40" />
          <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-graphite/70">
            {product.description}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green transition-colors group-hover:text-brand-green-dark">
            View Product
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      ))}
    </div>
  );
}
