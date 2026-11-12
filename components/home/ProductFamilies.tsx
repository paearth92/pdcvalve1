import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductFamilyCard from '@/components/products/ProductFamilyCard';
import { productFamilies } from '@/data/site';
import HomeSectionHeading from '@/components/home/HomeSectionHeading';

export default function ProductFamilies({
  headingLevel = 2,
  showCatalogLink = true,
}: {
  headingLevel?: 1 | 2;
  showCatalogLink?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-14">
      <div className="relative mx-auto max-w-[1160px]">
        <HomeSectionHeading
          eyebrow="Product Catalog"
          title="Industrial Flow Control Products"
          description="Explore PDC's engineered valve and actuation solutions."
          headingLevel={headingLevel}
        />

        {showCatalogLink && (
          <div className="mt-5 flex justify-center">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-sm font-bold text-brand-green transition-colors hover:text-brand-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/30"
            >
              View all products
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        )}

        {/* Product grid */}
        <div className="mt-8 grid auto-rows-fr grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4">
          {productFamilies.map((product) => (
            <div key={product.slug} className="h-full">
              <ProductFamilyCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
