import Breadcrumbs from '@/components/products/ProductBreadcrumbs';
import ProductFamilies from '@/components/home/ProductFamilies';
import QuoteCTA from '@/components/products/QuoteCTA';

export function generateMetadata() {
  return {
    title: 'Products | PDC Valve & Actuators',
    description:
      'Explore PDC valve and actuator product families including Damper and Control Valves, butterfly valves, pneumatic actuators, and electric actuators.',
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

      <ProductFamilies headingLevel={1} showCatalogLink={false} />

      <QuoteCTA />
    </>
  );
}
