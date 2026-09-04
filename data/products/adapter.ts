import type { ProductContent, ProductFamilyContent } from '@/types/content';
import type { ProductDetail, ProductFamily } from '@/types/site';
import type { Product, ProductFamilyData } from '@/types/product';
import { productFamiliesData, getProductFamilyBySlug } from '@/data/product-families';
import { deriveProductAttributes } from '@/lib/product-attributes';
import { getProductEngineeringData } from '@/data/products/engineering';
import { getProductContentByFamily, getProductContent } from '@/data/products/content';

/**
 * Resolve the Related Products section.
 *
 * Priority:
 * 1. Use curated `relatedProducts` when a product explicitly defines them.
 * 2. Otherwise, automatically choose up to three sibling products from the
 *    same canonical family registry.
 *
 * This keeps every multi-product family useful by default without forcing
 * repetitive related-product arrays into every individual product file.
 */
function getRelatedProductsForDetail(content: ProductContent): ProductFamily[] {
  const curated = content.relatedProducts ?? [];

  if (curated.length > 0) {
    return curated.slice(0, 3).map((ref) => {
      const resolved = getProductContent(ref.familySlug, ref.productSlug);

      return {
        name: ref.name ?? resolved?.name ?? ref.productSlug,
        slug: ref.productSlug,
        description:
          ref.description ??
          resolved?.shortDescription ??
          '',
      };
    });
  }

  return getProductContentByFamily(content.familySlug)
    .filter((candidate) => candidate.slug !== content.slug)
    .slice(0, 3)
    .map((candidate) => ({
      name: candidate.name,
      slug: candidate.slug,
      description: candidate.shortDescription ?? '',
    }));
}

/**
 * Migration adapter — converts canonical ProductContent (the content
 * registry type) into ProductDetail (the view-model the detail template
 * expects). This lets real product data flow into existing templates
 * without any layout changes.
 */
export function productContentToDetail(
  content: ProductContent,
): ProductDetail {
  const family = getProductFamilyBySlug(content.familySlug);

  return {
    familyName: content.familyName ?? family?.name ?? content.familySlug,
    familySlug: content.familySlug,
    name: content.name,
    slug: content.slug,
    series: content.series,
    shortDescription: content.shortDescription ?? '',
    overview:
      content.overviewParagraphs && content.overviewParagraphs.length > 0
        ? content.overviewParagraphs
        : content.overview
          ? [content.overview]
          : undefined,
    badges: (content.badges ?? []).map((label) => ({ label })),
    trustBadges: content.trustBadges,
    quickSpecs: content.specifications?.slice(0, 6),
    specs: content.specifications ?? [],
    specGroups: content.specGroups?.map((g) => ({
      heading: g.heading,
      category: g.category,
      rows: g.rows,
    })),
    engineering:
      content.engineering ??
      getProductEngineeringData(content.familySlug, content.slug),
    features: (content.features ?? []).map((f) => ({
      iconSlug: f.iconSlug ?? 'default',
      title: f.title,
      description: f.description,
    })),
    applications:
      content.applicationGroups && content.applicationGroups.length > 0
        ? content.applicationGroups
        : content.applications && content.applications.length > 0
          ? [{ heading: 'Typical Applications', items: content.applications }]
          : [],
    industries: content.industries?.map((ind) => ({
      iconSlug: ind.iconSlug ?? ind.slug,
      title: ind.title,
    })),
    downloads: (content.downloads ?? []).map((d) => ({
      label: d.label,
      type: d.type,
      filename: d.filename,
      url: d.url,
    })),
    gallery: content.images?.gallery?.map((img) => ({
      src: img.src,
      alt: img.alt,
      caption: img.caption,
      width: img.width,
      height: img.height,
    })),
    related: getRelatedProductsForDetail(content),
  };
}

/**
 * Converts canonical ProductContent into the Product type used by
 * ProductCard in family-page product grids.
 */
export function productContentToProduct(
  content: ProductContent,
): Product {
  return {
    id: content.id,
    name: content.name,
    slug: content.slug,
    familySlug: content.familySlug,
    series: content.series,
    shortDescription: content.shortDescription,
    features: content.applications,
    applications: content.applications,
    industries: (content.industries ?? []).map((ind) => ind.slug),
    specifications: content.specifications,
    attributes: deriveProductAttributes(content),
    imageAssetId: `product-${content.slug}-hero`,
    cardImageAssetId: `product-${content.slug}-card`,
    galleryAssetIds: [],
  };
}

/**
 * Converts canonical ProductFamilyContent into the ProductFamilyData
 * type used by the family template.
 */
export function familyContentToFamilyData(
  content: ProductFamilyContent,
): ProductFamilyData {
  const existing = getProductFamilyBySlug(content.slug);
  return {
    name: content.name,
    slug: content.slug,
    shortDescription: content.shortDescription,
    route: content.route,
    imageRef: content.imageRef,
    overview: content.overview,
    overviewSections: content.overviewSections,
    applications: content.applications,
    industries: content.industries?.map((ind) => ind.title),
    downloads: content.downloads?.map((d) => ({
      label: d.label,
      type: d.type,
      filename: d.filename,
      url: d.url,
    })),
    trustBadges: content.trustBadges,
    heroImageAssetId: `family-${content.slug}-hero`,
    cardImageAssetId: `family-${content.slug}-card`,
  };
}

/**
 * Looks up a product family's content from the canonical registry,
 * falling back to the existing static family data if no migrated
 * content exists yet.
 */
export function getFamilyData(slug: string): ProductFamilyData | undefined {
  return getProductFamilyBySlug(slug);
}

/**
 * Resolves related product references into ProductFamily objects
 * for the related-products section of the detail template.
 */
export function resolveRelatedProducts(
  refs: { familySlug: string; productSlug: string; name?: string; description?: string }[],
): ProductFamily[] {
  return refs.map((ref) => {
    const resolved = getProductContent(ref.familySlug, ref.productSlug);

    return {
      name: ref.name ?? resolved?.name ?? ref.productSlug,
      slug: ref.productSlug,
      description:
        ref.description ??
        resolved?.shortDescription ??
        '',
    };
  });
}
