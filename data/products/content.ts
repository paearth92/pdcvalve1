import type { ProductContent } from '@/types/content';
import { butterflyDamperValvesProducts } from './butterfly-damper-valves';
import { butterflyValvesProducts } from './butterfly-valves';
import { electricActuatorsProducts } from './electric-actuators';
import { pneumaticActuatorsProducts } from './pneumatic-actuators';

/**
 * Individual product content registry.
 *
 * Populated with verified product data from the existing PDC website as it
 * becomes available. Each entry follows the ProductContent interface so
 * product detail pages can render real engineering content without layout
 * changes.
 *
 * NOTE: No placeholder or invented engineering data is included.
 */
export const productContent: ProductContent[] = [
  ...butterflyDamperValvesProducts,
  ...butterflyValvesProducts,
  ...pneumaticActuatorsProducts,
  ...electricActuatorsProducts,
];

/** Look up a product content object by family + product slug. */
export function getProductContent(
  familySlug: string,
  productSlug: string,
): ProductContent | undefined {
  return productContent.find(
    (p) => p.familySlug === familySlug && p.slug === productSlug,
  );
}

/** Get all product content belonging to a family. */
export function getProductContentByFamily(
  familySlug: string,
): ProductContent[] {
  return productContent.filter((p) => p.familySlug === familySlug);
}