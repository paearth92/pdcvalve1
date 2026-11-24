import { notFound } from 'next/navigation';
import ProductFamilyTemplate from '@/components/products/ProductFamilyTemplate';
import { productFamiliesData, getProductFamilyBySlug } from '@/data/product-families';
import { getProductFamilyContent } from '@/data/products';
import { familyContentToFamilyData } from '@/data/products/adapter';
import { getProductsByFamily } from '@/data/products';

export function generateStaticParams() {
  return productFamiliesData.map((f) => ({ family: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ family: string }>;
}) {
  const { family: familySlug } = await params;
  const family = getProductFamilyBySlug(familySlug);
  if (!family) return {};
  return {
    title: `${family.name} | PDC Valve & Actuators`,
    description: family.shortDescription,
  };
}

export default async function ProductFamilyPage({
  params,
}: {
  params: Promise<{ family: string }>;
}) {
  const { family: familySlug } = await params;
  const family = getProductFamilyBySlug(familySlug);
  if (!family) notFound();

  const contentFamily = getProductFamilyContent(familySlug);
  const familyData = contentFamily
    ? familyContentToFamilyData(contentFamily)
    : family;

  const products = getProductsByFamily(familySlug);

  return (
    <>
      <ProductFamilyTemplate family={familyData} products={products} />
    </>
  );
}
