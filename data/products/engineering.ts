import type { ProductEngineeringData } from '@/types/content';

import { econotrolEngineering } from './engineering/butterfly-damper-valves/econotrol';
import { mediumDutyEngineering } from './engineering/butterfly-damper-valves/medium-duty';
import { flangedEndEngineering } from './engineering/butterfly-damper-valves/flanged-end';
import { reducedPortEngineering } from './engineering/butterfly-damper-valves/reduced-port';
import { threadEndEngineering } from './engineering/butterfly-damper-valves/thread-end';
import { combustionValveEngineering } from './engineering/butterfly-damper-valves/combustion-valve';
import { excelEngineering } from './engineering/butterfly-damper-valves/excel';
import { pdcqEngineering } from './engineering/electric-actuators/pdcq';
import { pdcsEngineering } from './engineering/electric-actuators/pdcs';
import { highPerformanceEngineering } from './engineering/butterfly-valves/high-performance';
import { tripleOffsetEngineering } from './engineering/butterfly-valves/triple-offset';
import { doubleActingEngineering } from './engineering/pneumatic-actuators/double-acting';
import { springReturnEngineering } from './engineering/pneumatic-actuators/spring-return';

const engineeringByProduct: Record<string, ProductEngineeringData> = {
  'butterfly-damper-valves/econotrol': econotrolEngineering,
  'butterfly-damper-valves/medium-duty': mediumDutyEngineering,
  'butterfly-damper-valves/flanged-end': flangedEndEngineering,
  'butterfly-damper-valves/reduced-port': reducedPortEngineering,
  'butterfly-damper-valves/thread-end': threadEndEngineering,
  'butterfly-damper-valves/combustion-valve': combustionValveEngineering,
  'butterfly-damper-valves/excel': excelEngineering,
  'electric-actuators/pdcq': pdcqEngineering,
  'electric-actuators/pdcs': pdcsEngineering,
  'butterfly-valves/high-performance': highPerformanceEngineering,
  'butterfly-valves/triple-offset': tripleOffsetEngineering,
  'pneumatic-actuators/double-acting': doubleActingEngineering,
  'pneumatic-actuators/spring-return': springReturnEngineering,
};

export function getProductEngineeringData(
  familySlug: string,
  productSlug: string,
): ProductEngineeringData | undefined {
  return engineeringByProduct[`${familySlug}/${productSlug}`];
}