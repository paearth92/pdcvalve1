import type { ProductAttributes } from '@/types/product';

type ProductFinderMetadata = {
  name: string;
  description: string;
  attributes: ProductAttributes;
};

const industryTags = [
  'automotive',
  'chemical',
  'downstream-hydrocarbons',
  'energy-and-utilities',
  'food-and-beverage',
  'life-sciences',
  'marine',
  'mining-metals',
  'oem',
  'oil-and-gas',
  'power-generation',
  'pulp-and-paper',
  'water-and-wastewater',
  'air-management',
  'petrochemical',
] as const;

const allIndustries = (...excluded: string[]) =>
  industryTags.filter((tag) => !excluded.includes(tag));

const applications = {
  abrasive: 'abrasive-service',
  airHandling: 'air-handling-ventilation',
  blowdown: 'blowdown-service',
  burnerBoiler: 'burner-boiler-service',
  combustionAir: 'combustion-air',
  flowControl: 'flow-control',
  geothermalSteam: 'geothermal-steam',
  hotGas: 'hot-gas-service',
  industrialFurnaces: 'industrial-furnaces',
  oemPackagedEquipment: 'oem-packaged-equipment',
  processIsolation: 'process-isolation',
  processWater: 'process-water',
  sourGas: 'sour-gas-service',
  steam: 'steam-service',
  sulfurRecovery: 'sulfur-recovery',
  throttling: 'throttling-modulating-service',
  utilityWater: 'utility-water',
  vacuum: 'vacuum-service',
} as const;

const makeMetadata = (
  displayName: string,
  description: string,
  attributes: Omit<ProductAttributes, 'valveType'>,
): ProductFinderMetadata => ({
  name: displayName.replace(/,\s*Series\s+\d+$/i, ''),
  description,
  attributes: { ...attributes, valveType: null },
});

const damper = (
  description: string,
  options: {
    connection: string;
    industries?: string[];
    applications: string[];
    media?: string[];
    bodyMaterial?: string | null;
    seatMaterial?: string | null;
    tempMaxF?: number;
    pressureMaxPsi?: number;
  },
) =>
  makeMetadata(description.split('\n')[0], description.split('\n')[1], {
    productType: 'butterfly-damper-valve',
    connection: options.connection,
    actuation: 'manual|pneumatic|electric',
    bodyMaterial:
      options.bodyMaterial === undefined ? 'cast-iron' : options.bodyMaterial,
    seatMaterial: options.seatMaterial ?? null,
    media: options.media ?? ['air', 'gas'],
    tempMaxF: options.tempMaxF ?? null,
    pressureMaxPsi: options.pressureMaxPsi ?? null,
    pressureClasses: [],
    industries: options.industries ?? [...industryTags],
    applicationTags: options.applications,
  });

const allValveIndustries = [...industryTags];
const damperApplications = {
  econotrol: [applications.airHandling, applications.flowControl, applications.oemPackagedEquipment, applications.throttling],
  mediumDuty: [applications.airHandling, applications.burnerBoiler, applications.combustionAir, applications.flowControl, applications.industrialFurnaces, applications.oemPackagedEquipment, applications.throttling],
  excel: [applications.abrasive, applications.airHandling, applications.burnerBoiler, applications.combustionAir, applications.flowControl, applications.hotGas, applications.industrialFurnaces, applications.oemPackagedEquipment, applications.throttling],
  flangedEnd: [applications.airHandling, applications.flowControl, applications.oemPackagedEquipment, applications.throttling],
  reducedPort: [applications.airHandling, applications.flowControl, applications.oemPackagedEquipment, applications.throttling],
  combustion: [applications.burnerBoiler, applications.combustionAir, applications.flowControl, applications.industrialFurnaces, applications.oemPackagedEquipment, applications.throttling],
  threadEnd: [applications.flowControl, applications.oemPackagedEquipment, applications.throttling],
};

const productFinderMetadata: Record<string, ProductFinderMetadata> = {
  'butterfly-damper-valves/econotrol': damper(
    'Econotrol, Series 09\nAn economical wafer-style butterfly damper valve designed for low-pressure flow control in industrial air and gas systems. Ideal for applications requiring dependable performance, moderate cycling, and straightforward manual or automated operation.',
    { connection: 'wafer', applications: damperApplications.econotrol },
  ),
  'butterfly-damper-valves/medium-duty': damper(
    'Medium Duty, Series 01\nA versatile industrial butterfly damper valve offering expanded material and seating options for higher temperatures, increased cycling, and improved leakage control. Suitable for combustion systems, process equipment, and demanding air and gas applications.',
    { connection: 'wafer', applications: damperApplications.mediumDuty },
  ),
  'butterfly-damper-valves/excel': damper(
    "Excel, Series 40\nPDC's premium butterfly damper valve for demanding industrial service, including high temperatures, dirty process streams, and frequent cycling. Features enhanced shaft support, serviceable packing arrangements, and extensive material and seating options.",
    {
      connection: 'wafer',
      industries: allIndustries('food-and-beverage', 'life-sciences', 'water-and-wastewater'),
      applications: damperApplications.excel,
      media: ['air', 'gas', 'hot-gas', 'abrasive-particulate'],
      bodyMaterial: null,
    },
  ),
  'butterfly-damper-valves/flanged-end': damper(
    'Flanged End, Series 39\nAn industrial butterfly damper valve featuring integral flanged connections for low-pressure flow-control applications. Provides dependable operation in air and gas systems where a flanged installation is preferred over wafer-style construction.',
    {
      connection: 'flanged',
      industries: allIndustries('food-and-beverage', 'life-sciences'),
      applications: damperApplications.flangedEnd,
    },
  ),
  'butterfly-damper-valves/reduced-port': damper(
    'Reduced Port, Series 15\nA specialized butterfly damper valve designed to provide reduced flow capacity while maintaining larger pipeline connections. Ideal for applications requiring controlled flow through a smaller internal passage without separate piping reducers.',
    {
      connection: 'wafer',
      industries: allIndustries('food-and-beverage', 'life-sciences', 'water-and-wastewater'),
      applications: damperApplications.reducedPort,
    },
  ),
  'butterfly-damper-valves/combustion-valve': damper(
    'Combustion Valve, Series 22\nAn economical butterfly valve designed for low-pressure combustion air and compatible gas applications. Suitable for burner, furnace, and related combustion-control service with manual or automated operation.',
    {
      connection: 'wafer',
      industries: allIndustries('food-and-beverage', 'life-sciences', 'water-and-wastewater'),
      applications: damperApplications.combustion,
      seatMaterial: null,
      tempMaxF: 900,
      pressureMaxPsi: 1,
    },
  ),
  'butterfly-damper-valves/thread-end': damper(
    'Thread End, Series 07\nA compact butterfly valve with threaded end connections for low-pressure industrial air and gas systems. Provides economical flow regulation where conventional flanged valve installations are unnecessary.',
    {
      connection: 'threaded',
      applications: damperApplications.threadEnd,
      seatMaterial: 'epdm|viton',
      tempMaxF: 300,
      pressureMaxPsi: 5,
    },
  ),
  'butterfly-valves/high-performance': makeMetadata(
    'High Performance Butterfly Valve',
    'A double-offset butterfly valve designed for reliable shutoff and flow control in industrial process applications. Available with multiple body, disc, and seating options for water, chemical, hydrocarbon, and other compatible services.',
    {
      productType: 'high-performance-butterfly-valve',
      connection: 'wafer|lug|flanged|butt-weld',
      actuation: 'manual|pneumatic|electric',
      bodyMaterial: 'carbon-steel|stainless-steel|duplex-super-duplex|special-alloys',
      seatMaterial: 'ptfe|grafoil|metal',
      media: ['air', 'gas', 'steam', 'water', 'oil', 'hydrocarbons', 'chemicals-corrosive', 'vacuum'],
      tempMaxF: null,
      pressureMaxPsi: null,
      pressureClasses: ['class-150', 'class-300', 'class-600'],
      industries: allValveIndustries,
      applicationTags: [applications.flowControl, applications.processIsolation, applications.processWater, applications.steam, applications.throttling, applications.utilityWater, applications.vacuum],
    },
  ),
  'butterfly-valves/triple-offset': makeMetadata(
    'Triple Offset Butterfly Valve',
    'A metal-seated butterfly valve designed for demanding applications requiring tight shutoff, elevated-temperature capability, and reliable process isolation. Triple-offset geometry minimizes seat wear during operation.',
    {
      productType: 'triple-offset-butterfly-valve',
      connection: 'wafer|lug|flanged|butt-weld',
      actuation: 'manual|pneumatic|electric',
      bodyMaterial: 'carbon-steel|stainless-steel|alloy-steel|duplex-super-duplex|special-alloys',
      seatMaterial: 'metal',
      media: ['hot-gas', 'sour-gas', 'steam', 'oil', 'hydrocarbons', 'chemicals-corrosive', 'abrasive-particulate'],
      tempMaxF: 1435,
      pressureMaxPsi: null,
      pressureClasses: ['class-150', 'class-300', 'class-600', 'class-900', 'class-1500'],
      industries: allIndustries('food-and-beverage', 'life-sciences', 'air-management'),
      applicationTags: [applications.abrasive, applications.blowdown, applications.geothermalSteam, applications.hotGas, applications.processIsolation, applications.sourGas, applications.steam, applications.sulfurRecovery, applications.throttling],
    },
  ),
  'pneumatic-actuators/double-acting': makeMetadata(
    'Magnus Force Double Acting',
    'A compact rack-and-pinion pneumatic actuator providing powered quarter-turn operation in both directions. Designed for dependable automation of butterfly valves, ball valves, and other compatible industrial equipment.',
    {
      productType: 'pneumatic-actuator', connection: null, actuation: 'pneumatic', bodyMaterial: null, seatMaterial: null,
      media: [], tempMaxF: null, pressureMaxPsi: null, pressureClasses: [], industries: allValveIndustries,
      applicationTags: [applications.flowControl, applications.oemPackagedEquipment, applications.processIsolation, applications.throttling],
    },
  ),
  'pneumatic-actuators/spring-return': makeMetadata(
    'Magnus Force Spring Return',
    'A rack-and-pinion pneumatic actuator featuring spring-return operation for applications requiring a predetermined valve position upon loss of air pressure. Available in configurations for fail-open or fail-closed service.',
    {
      productType: 'pneumatic-actuator', connection: null, actuation: 'pneumatic', bodyMaterial: null, seatMaterial: null,
      media: [], tempMaxF: null, pressureMaxPsi: null, pressureClasses: [], industries: allValveIndustries,
      applicationTags: [applications.flowControl, applications.oemPackagedEquipment, applications.processIsolation, applications.throttling],
    },
  ),
  'electric-actuators/pdcq': makeMetadata(
    'Magnus Force PDCQ Electric',
    'A rugged quarter-turn electric actuator designed for automated valve and damper operation. Available with multiple torque ratings, control options, and enclosure configurations for industrial applications.',
    {
      productType: 'electric-actuator', connection: null, actuation: 'electric', bodyMaterial: null, seatMaterial: null,
      media: [], tempMaxF: null, pressureMaxPsi: null, pressureClasses: [], industries: allValveIndustries,
      applicationTags: [applications.flowControl, applications.oemPackagedEquipment, applications.processIsolation, applications.throttling],
    },
  ),
  'electric-actuators/pdcs': makeMetadata(
    'Magnus Force PDCS Spring-Pack Electric',
    'A quarter-turn electric actuator incorporating mechanical spring-return capability for applications requiring a predetermined valve position upon power loss. Provides electric automation with fail-position functionality.',
    {
      productType: 'electric-actuator', connection: null, actuation: 'electric', bodyMaterial: null, seatMaterial: null,
      media: [], tempMaxF: null, pressureMaxPsi: null, pressureClasses: [], industries: allValveIndustries,
      applicationTags: [applications.flowControl, applications.oemPackagedEquipment, applications.processIsolation, applications.throttling],
    },
  ),
};

export function getProductFinderMetadata(
  familySlug: string,
  productSlug: string,
): ProductFinderMetadata | undefined {
  return productFinderMetadata[`${familySlug}/${productSlug}`];
}

export const EMPTY_PRODUCT_FINDER_ATTRIBUTES: ProductAttributes = {
  productType: null,
  valveType: null,
  connection: null,
  actuation: null,
  bodyMaterial: null,
  seatMaterial: null,
  media: [],
  tempMaxF: null,
  pressureMaxPsi: null,
  pressureClasses: [],
  industries: [],
  applicationTags: [],
};
