import type { Metadata } from 'next';
import ProductFinderClient from '@/components/products/ProductFinderClient';

export const metadata: Metadata = {
  title: 'Product Finder | PDC Valve & Actuators',
  description:
    'Use our engineering product selector to find the right valve or actuator for your application. Filter by product family, industry, media, connection type, and more.',
};

export default function ProductFinderPage() {
  return (
    <>
      <ProductFinderClient />
    </>
  );
}
