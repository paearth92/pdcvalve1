import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCompanyPageContent } from '@/data/company/content';
import CompanyPageLayout from '@/components/company/CompanyPageLayout';

export function generateMetadata(): Metadata {
  const page = getCompanyPageContent('engineering');
  if (!page || !page.seo) return {};

  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: {
      canonical: page.seo.canonicalUrl,
    },
    openGraph: {
      title: page.seo.openGraph?.title ?? page.seo.title,
      description: page.seo.openGraph?.description ?? page.seo.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.seo.openGraph?.title ?? page.seo.title,
      description: page.seo.openGraph?.description ?? page.seo.description,
    },
  };
}

export default function EngineeringPage() {
  const content = getCompanyPageContent('engineering');
  if (!content) notFound();

  return <CompanyPageLayout page={content} />;
}