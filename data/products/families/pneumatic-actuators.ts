import type { ProductFamilyContent } from '@/types/content';
import { actuatorIndustryCoverage, actuatorIndustryTitles } from '@/data/products/actuator-industry-coverage';

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
    'Compact rack-and-pinion pneumatic actuators available in double-acting and spring-return configurations for quarter-turn valve and damper automation. Designed for dependable industrial operation across a range of valve sizes, torque requirements, and automation applications.',
  eyebrow: 'Product Family',
  heroTitle: 'Magnus Force Pneumatic Actuators',
  heroDescription:
    'PDC Magnus Force pneumatic actuators use compact rack-and-pinion construction for quarter-turn valve and damper automation. The family includes both double-acting and spring-return configurations and supports common industrial automation accessories, including position indicators, limit switches, solenoids, and positioners.',
  overview:
    'PDC Magnus Force pneumatic actuators combine rack-and-pinion operation with a compact footprint for industrial automation and quarter-turn valve-control applications. The Magnus Force range is available in double-acting and spring-return configurations. Both styles use common actuator construction features, accessory mounting standards, adjustable travel stops, and multiple material and coating options. The actuator design supports integration with position indicators, positioners, limit switches, solenoids, and other automation accessories using recognized mounting patterns.',
  overviewSections: {
    introduction:
      'PDC Magnus Force pneumatic actuators use compact rack-and-pinion construction for quarter-turn valve and damper automation. The family includes both double-acting and spring-return configurations and supports common industrial automation accessories, including position indicators, limit switches, solenoids, and positioners.',
    advantages: [
      'Compact rack-and-pinion construction',
      'Double-acting and spring-return configurations',
      'Adjustable open and closed travel stops',
      'NAMUR accessory mounting',
      'ISO 5211-compatible valve mounting',
      'Multi-function position indication',
      'Designed for integration with common valve-automation accessories',
    ],
    applications: actuatorIndustryTitles,
    customization:
      'Actuator selection depends on valve torque, working air pressure, required safety factor, operating environment, and the desired fail position. PDC can assist with selecting the appropriate double-acting or spring-return actuator and integrating common automation accessories such as solenoids, limit switches, position indicators, and positioners.',
  },
  applications: [
    { iconSlug: 'butterfly-valves', title: 'Butterfly Valve Automation', description: 'Quarter-turn pneumatic actuation for automated butterfly-valve assemblies.' },
    { iconSlug: 'ball-valves', title: 'Ball Valve Automation', description: 'Pneumatic actuator packages for automated quarter-turn ball valves.' },
    { iconSlug: 'damper-valves', title: 'Damper Automation', description: 'Pneumatic actuation for industrial damper control.' },
    { iconSlug: 'process-isolation', title: 'Process Isolation', description: 'Actuation packages for on-off isolation service.' },
    { iconSlug: 'flow-control', title: 'Flow-Control Applications', description: 'Actuator configurations for industrial flow-control systems.' },
    { iconSlug: 'combustion', title: 'Burner & Combustion Systems', description: 'Quarter-turn actuation for burner and combustion applications.' },
    { iconSlug: 'utilities', title: 'Utility & Process Systems', description: 'Pneumatic actuation for plant utility and process systems.' },
    { iconSlug: 'oem', title: 'OEM & Packaged Equipment', description: 'Actuator integration for OEM and packaged-equipment assemblies.' },
  ],
  industries: actuatorIndustryCoverage.map((industry) => ({ ...industry })),
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
