import type { ProductFamilyContent } from '@/types/content';

/**
 * Pneumatic Actuators — verified family content.
 *
 * Only verified information from the PDC website is populated.
 */
export const pneumaticActuatorsFamily: ProductFamilyContent = {
  name: 'Pneumatic Actuators',
  slug: 'pneumatic-actuators',
  route: '/products/pneumatic-actuators',
  imageRef: '/images/products/pneumatic-actuators.svg',
  shortDescription:
    'Compact pneumatic rack-and-pinion actuators available in double-acting and spring-return configurations for quarter-turn valve automation.',
  eyebrow: 'Product Family',
  heroTitle: 'Magnus Force Pneumatic Actuators',
  heroDescription:
    'PDC Magnus Force pneumatic actuators combine rack-and-pinion operation with a compact footprint for industrial automation and quarter-turn valve-control applications. The Magnus Force range is available in double-acting and spring-return configurations. Both styles use common actuator construction features, accessory mounting standards, adjustable travel stops, and multiple material and coating options. The actuator design supports integration with position indicators, positioners, limit switches, solenoids, and other automation accessories using recognized mounting patterns.',
  overview:
    'PDC Magnus Force pneumatic actuators combine rack-and-pinion operation with a compact footprint for industrial automation and quarter-turn valve-control applications. The Magnus Force range is available in double-acting and spring-return configurations. Both styles use common actuator construction features, accessory mounting standards, adjustable travel stops, and multiple material and coating options. The actuator design supports integration with position indicators, positioners, limit switches, solenoids, and other automation accessories using recognized mounting patterns.',
  overviewSections: {
    introduction:
      'PDC Magnus Force pneumatic actuators combine rack-and-pinion operation with a compact footprint for industrial automation and quarter-turn valve-control applications. The Magnus Force range is available in double-acting and spring-return configurations. Both styles use common actuator construction features, accessory mounting standards, adjustable travel stops, and multiple material and coating options. The actuator design supports integration with position indicators, positioners, limit switches, solenoids, and other automation accessories using recognized mounting patterns.',
    advantages: [
      'Compact rack-and-pinion construction',
      'Double-acting and spring-return configurations',
      'Multi-function position indicator',
      'NAMUR accessory mounting',
      'ISO 5211-compatible valve mounting',
      'Adjustable open and closed travel stops',
      'Multiple body and end-cap coating options',
      'Replaceable low-friction bearings and guides',
      'Multiple O-ring material options',
      'Stainless-steel pinion option',
      'Configurable spring quantities for spring-return models',
    ],
    applications: [
      'Automotive',
      'Chemical',
      'Downstream hydrocarbons',
      'Food and beverage',
      'Energy and onsite utilities',
      'Life sciences and medical',
      'Mining, minerals, and metals',
      'Marine',
      'OEM and engineered solution providers',
      'Oil and gas',
      'Power generation',
      'Pulp and paper',
      'Water and wastewater',
    ],
    customization:
      'Actuator selection must account for valve torque, pipeline media, working air pressure, and an appropriate service safety factor. Correctly matching the actuator, valve, and service conditions affects safe operation and actuator service life. Seal options include standard NBR with optional Viton or Silicone for high- and low-temperature applications. Body coatings include hard anodized, polyester, PTFE, or nickel. End-cap coatings include polyester, metal powder, PTFE, or nickel. A stainless-steel pinion option is available. Spring-return models support configurable spring quantities to adjust torque output.',
  },
  applications: [],
  industries: [
    { slug: 'automotive', title: 'Automotive' },
    { slug: 'chemical', title: 'Chemical' },
    { slug: 'downstream-hydrocarbons', title: 'Downstream hydrocarbons' },
    { slug: 'food-and-beverage', title: 'Food and beverage' },
    { slug: 'energy-and-onsite-utilities', title: 'Energy and onsite utilities' },
    { slug: 'life-sciences-and-medical', title: 'Life sciences and medical' },
    { slug: 'mining-minerals-and-metals', title: 'Mining, minerals, and metals' },
    { slug: 'marine', title: 'Marine' },
    { slug: 'oem-and-engineered-solution-providers', title: 'OEM and engineered solution providers' },
    { slug: 'oil-and-gas', title: 'Oil and gas' },
    { slug: 'power-generation', title: 'Power generation' },
    { slug: 'pulp-and-paper', title: 'Pulp and paper' },
    { slug: 'water-and-wastewater', title: 'Water and wastewater' },
  ],
  productRefs: ['double-acting', 'spring-return'],
  downloads: [
    {
      label: 'PDC Magnus Force Pneumatic Actuator Brochure',
      type: 'pdf',
      filename: 'PDC-Magnus-Force-Pneumatic.pdf',
      url: 'https://pdcvalve.com/wp-content/uploads/2021/10/PDC-Magnus-Force-Pneumatic.pdf',
    },
  ],
  trustBadges: [],
  images: {
    hero: undefined,
    gallery: [],
    transparentPng: undefined,
    technicalDrawings: undefined,
    thumbnail: undefined,
  },
  seo: {
    title: 'Magnus Force Pneumatic Actuators | PDC Valve',
    description:
      'Explore PDC Magnus Force rack-and-pinion pneumatic actuators in double-acting and spring-return configurations for industrial valve automation.',
    canonicalUrl: 'https://www.pdcvalve.com/products/pneumatic-actuators',
    noIndex: false,
    openGraph: {
      title: 'Magnus Force Pneumatic Actuators | PDC Valve',
      description:
        'Explore PDC Magnus Force rack-and-pinion pneumatic actuators in double-acting and spring-return configurations for industrial valve automation.',
    },
  },
};
