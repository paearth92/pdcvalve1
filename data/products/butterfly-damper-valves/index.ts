import type { ProductContent } from '@/types/content';
import { econotrol } from './econotrol';
import { mediumDuty } from './medium-duty';
import { excel } from './excel';
import { flangedEnd } from './flanged-end';
import { reducedPort } from './reduced-port';
import { combustionValve } from './combustion-valve';
import { threadEnd } from './thread-end';

/**
 * Butterfly Damper Valves — product content registry.
 *
 * All seven product series for the Butterfly Damper Valves family.
 * Each entry follows the canonical ProductContent interface so the
 * existing templates can render them without layout changes.
 */
export const butterflyDamperValvesProducts: ProductContent[] = [
  econotrol,
  mediumDuty,
  excel,
  flangedEnd,
  reducedPort,
  combustionValve,
  threadEnd,
];
