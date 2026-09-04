import type { ProductFamilyContent } from '@/types/content';
import { butterflyDamperValvesFamily } from './families/butterfly-damper-valves';
import { butterflyValvesFamily } from './families/butterfly-valves';
import { electricActuatorsFamily } from './families/electric-actuators';
import { pneumaticActuatorsFamily } from './families/pneumatic-actuators';

/**
 * Product family content registry.
 *
 * Populated with verified content from the existing PDC website as it
 * becomes available. Each entry follows the ProductFamilyContent interface
 * so family pages can render real engineering content without layout changes.
 *
 * NOTE: No placeholder or invented engineering data is included.
 */
export const productFamilyContent: ProductFamilyContent[] = [
  butterflyDamperValvesFamily,
  butterflyValvesFamily,
  pneumaticActuatorsFamily,
  electricActuatorsFamily,
];

/** Look up a product family content object by slug. */
export function getProductFamilyContent(
  slug: string,
): ProductFamilyContent | undefined {
  return productFamilyContent.find((f) => f.slug === slug);
}
