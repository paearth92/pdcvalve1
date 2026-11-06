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
      className="group relative flex h-full flex-col overflow-hidden rounded-none border-b border-brand-green-dark/10 bg-white transition-all duration-300 hover:border-brand-green/30 hover:shadow-lg hover:shadow-brand-green-dark/5 sm:rounded-xl sm:border"
    >
      {/* Illustration area */}
      <div className="relative h-48 overflow-hidden border-b border-brand-green-dark/8 bg-[#edf2ee]">
        <Image
          src={approvedProductBackground}
          alt=""
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-[#dfe9e2]/20" />
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
