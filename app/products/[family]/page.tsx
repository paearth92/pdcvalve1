import { notFound } from 'next/navigation';
import ProductFamilyTemplate from '@/components/products/ProductFamilyTemplate';
import { productFamiliesData, getProductFamilyBySlug } from '@/data/product-families';
import { getProductFamilyContent } from '@/data/products';
import { familyContentToFamilyData } from '@/data/products/adapter';
import { getProductsByFamily } from '@/data/products';

export function generateStaticParams() {
  return productFamiliesData.map((f) => ({ family: f.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { family: string };
}) {
  const family = getProductFamilyBySlug(params.family);
  if (!family) return {};
  return {
    title: `${family.name} | PDC Valve & Actuators`,
    description: family.shortDescription,
  };
}

export default function ProductFamilyPage({
  params,
}: {
  params: { family: string };
}) {
  const family = getProductFamilyBySlug(params.family);
  if (!family) notFound();

  const contentFamily = getProductFamilyContent(params.family);
  const familyData = contentFamily
    ? familyContentToFamilyData(contentFamily)
    : family;

  const products = getProductsByFamily(params.family);

  return (
    <>
      <ProductFamilyTemplate family={familyData} products={products} />
    </>
  );
}
