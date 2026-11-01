import type { IndustryContent } from '@/types/content';
import IndustryHero from '@/components/industries/IndustryHero';
import IndustryNav from '@/components/industries/IndustryNav';
import IndustryOverview from '@/components/industries/IndustryOverview';
import IndustryChallenges from '@/components/industries/IndustryChallenges';
import IndustryApplications from '@/components/industries/IndustryApplications';
import IndustryProductSolutions from '@/components/industries/IndustryProductSolutions';
import IndustryProductFamilies from '@/components/industries/IndustryProductFamilies';
import IndustryCTA from '@/components/industries/IndustryCTA';
import { homepageIndustryImages } from '@/data/industries/homepage-images';

/**
 * Reusable industry page layout.
 * Renders hero, sub-navigation, overview, challenges, applications,
 * relevant product families, and the shared CTA.
 * Optional sections hide cleanly when empty.
 */
export default function IndustryPageLayout({
  industry,
}: {
  industry: IndustryContent;
}) {
  const heroTitle = industry.heroTitle ?? industry.name;
  const heroDescription = industry.heroDescription ?? industry.shortDescription ?? '';
  const homepageImage =
    homepageIndustryImages[industry.slug as keyof typeof homepageIndustryImages];
  const heroImage = homepageImage ?? industry.images?.hero;

  return (
    <>
      <IndustryHero
        eyebrow={industry.eyebrow ?? 'Industries'}
        title={heroTitle}
        description={heroDescription}
        imageSrc={heroImage?.src}
        imageAlt={heroImage?.alt}
        videoSrc={`/videos/industries/${industry.slug}.webm`}
      />

      <IndustryNav />

      <IndustryOverview industry={industry} />

      <IndustryChallenges industry={industry} />

      <IndustryApplications industry={industry} />

      <IndustryProductSolutions industry={industry} />

      <IndustryProductFamilies industry={industry} />

      <IndustryCTA />

      {/* WebPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: industry.seo?.title ?? industry.name,
            description: industry.seo?.description ?? industry.shortDescription,
            url: industry.seo?.canonicalUrl,
            isPartOf: {
              '@type': 'WebSite',
              name: 'PDC Valve & Actuators',
              url: 'https://www.pdcvalve.com',
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://www.pdcvalve.com',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Industries',
                  item: 'https://www.pdcvalve.com/industries',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: industry.name,
                  item: industry.seo?.canonicalUrl,
                },
              ],
            },
          }),
        }}
      />
    </>
  );
}
