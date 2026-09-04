import type { ProductContent } from '@/types/content';
import { highPerformance } from './high-performance';
import { tripleOffset } from './triple-offset';

/**
 * Butterfly Valves — product content registry.
 */
export const butterflyValvesProducts: ProductContent[] = [
  highPerformance,
  tripleOffset,
];
