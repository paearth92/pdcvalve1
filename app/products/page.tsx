import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/products/ProductBreadcrumbs';
import ProductFamilyCard from '@/components/products/ProductFamilyCard';
import QuoteCTA from '@/components/products/QuoteCTA';
import { productFamilies } from '@/data/site';

export function generateMetadata() {
  return {
    title: 'Products | PDC Valve & Actuators',
    description:
      'Explore PDC valve and actuator product families including butterfly damper valves, butterfly valves, pneumatic actuators, and electric actuators.',
  };
}

export default function ProductsPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
        ]}
      />

      {/* Page header */}
      <section className="relative overflow-hidden bg-brand-light-bg py-12 sm:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(22,132,71,0.05),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-green-dark sm:text-4xl">
            Industrial Flow Control Products
          </h1>
          <div className="mt-4 h-px w-16 bg-brand-green/40" />
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-brand-graphite/70">
            Explore PDC&apos;s engineered valve and actuation solutions.
          </p>
        </div>
      </section>

      {/* Family grid */}
      <div className="mx-auto max-w-7xl py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-0 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productFamilies.map((family) => (
            <ProductFamilyCard key={family.slug} product={family} />
          ))}
        </div>
      </div>

      <QuoteCTA />
    </>
  );
}
