import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { industryContent, getIndustryContent } from '@/data/industries/content';
import IndustryPageLayout from '@/components/industries/IndustryPageLayout';

export function generateStaticParams() {
  return industryContent.map((industry) => ({
    slug: industry.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryContent(slug);
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

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustryContent(slug);
  if (!industry) notFound();

  return <IndustryPageLayout industry={industry} />;
}
