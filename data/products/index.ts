import type { Product } from '@/types/product';
import { productContent, getProductContent, getProductContentByFamily } from './content';
import { productFamilyContent, getProductFamilyContent } from './families';
import {
  productContentToProduct,
  productContentToDetail,
  familyContentToFamilyData,
  getFamilyData,
  resolveRelatedProducts,
} from './adapter';

/**
 * Individual product catalog data.
 *
 * Built from the canonical ProductContent registry via the adapter so
 * ProductCard, ProductFinder, and family-page product grids all read
 * from the same verified source.
 */
export const products: Product[] = productContent.map(productContentToProduct);

/** Look up a product by family + product slug. */
export function getProductBySlug(
  familySlug: string,
  productSlug: string,
): Product | undefined {
  return products.find(
    (p) => p.familySlug === familySlug && p.slug === productSlug,
  );
}

/**
 * Get products in their curated family-page order when productRefs are
 * provided; otherwise include every product assigned to the family.
 */
export function getProductsByFamily(familySlug: string): Product[] {
  const familyProducts = products.filter((p) => p.familySlug === familySlug);
  const productRefs = getProductFamilyContent(familySlug)?.productRefs;

  if (!productRefs?.length) return familyProducts;

  const bySlug = new Map(familyProducts.map((product) => [product.slug, product]));
  return productRefs
    .map((slug) => bySlug.get(slug))
    .filter((product): product is Product => Boolean(product));
}

// Content migration framework re-exports
export { productFamilyContent, getProductFamilyContent } from './families';
export { productContent, getProductContent, getProductContentByFamily } from './content';
export {
  productContentToDetail,
  productContentToProduct,
  familyContentToFamilyData,
  getFamilyData,
  resolveRelatedProducts,
} from './adapter';
