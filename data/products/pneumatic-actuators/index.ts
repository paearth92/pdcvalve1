import type { ProductContent } from '@/types/content';
import { doubleActing } from './double-acting';
import { springReturn } from './spring-return';

/**
 * Pneumatic Actuators — product content registry.
 */
export const pneumaticActuatorsProducts: ProductContent[] = [
  doubleActing,
  springReturn,
];
