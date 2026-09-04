import { notFound } from 'next/navigation';
import ProductDetailTemplate from '@/components/products/ProductDetailTemplate';
import { getProductContent, productContent } from '@/data/products';
import { productContentToDetail } from '@/data/products/adapter';

export function generateStaticParams() {
  return productContent.map((p) => ({
    family: p.familySlug,
    product: p.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { family: string; product: string };
}) {
  const content = getProductContent(params.family, params.product);
  if (!content) return {};

  const title =
    content.seo?.title ||
    `${content.name} | ${content.familyName ?? 'PDC Valve & Actuators'}`;
  const description =
    content.seo?.description || content.shortDescription || '';

  return {
    title,
    description,
    ...(content.seo?.canonicalUrl
      ? { canonical: content.seo.canonicalUrl }
      : {}),
    ...(content.seo?.noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: content.seo?.openGraph?.title || title,
      description: content.seo?.openGraph?.description || description,
    },
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: { family: string; product: string };
}) {
  const content = getProductContent(params.family, params.product);
  if (!content) notFound();

  const product = productContentToDetail(content);

  return (
    <>
      <ProductDetailTemplate product={product} />
    </>
  );
}
