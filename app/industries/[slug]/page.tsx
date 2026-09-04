import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { industryContent, getIndustryContent } from '@/data/industries/content';
import IndustryPageLayout from '@/components/industries/IndustryPageLayout';

export function generateStaticParams() {
  return industryContent.map((industry) => ({
    slug: industry.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const industry = getIndustryContent(params.slug);
  if (!industry || !industry.seo) return {};

  return {
    title: industry.seo.title,
    description: industry.seo.description,
    alternates: {
      canonical: industry.seo.canonicalUrl,
    },
    openGraph: {
      title: industry.seo.openGraph?.title ?? industry.seo.title,
      description: industry.seo.openGraph?.description ?? industry.seo.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: industry.seo.openGraph?.title ?? industry.seo.title,
      description: industry.seo.openGraph?.description ?? industry.seo.description,
    },
  };
}

export default function IndustryDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const industry = getIndustryContent(params.slug);
  if (!industry) notFound();

  return <IndustryPageLayout industry={industry} />;
}
