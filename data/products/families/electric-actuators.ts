import type { ProductFamilyContent } from '@/types/content';
import { actuatorIndustryCoverage, actuatorIndustryTitles } from '@/data/products/actuator-industry-coverage';

/**
 * Electric Actuators — verified family content.
 *
 * Only verified information from the PDC website is populated.
 */
export const electricActuatorsFamily: ProductFamilyContent = {
  name: 'Electric Actuators',
  slug: 'electric-actuators',
  route: '/products/electric-actuators',
  imageRef: '/images/products/electric-actuators.svg',
  shortDescription:
    'PDC Magnus Force electric actuators provide quarter-turn automation for valves and dampers in on-off, modulating, and spring-return applications.',
  eyebrow: 'Product Family',
  heroTitle: 'Magnus Force Electric Actuators',
  heroDescription:
    'PDC Magnus Force Electric Actuators include the PDCQ quarter-turn actuator and the PDCS spring-return actuator for automated valve and damper service. PDCQ actuators support on-off, inching, and optional modulating control across a broad torque range. PDCS actuators provide quarter-turn electric operation with a mechanical spring-return function for applications requiring a predetermined fail position upon loss of power. Both product lines use aluminum-alloy enclosures, ISO 5211 mounting, position indication, environmental sealing, and optional control and feedback equipment.',
  overview:
    'PDC Magnus Force Electric Actuators include the PDCQ quarter-turn actuator and the PDCS spring-return actuator for automated valve and damper service. PDCQ actuators support on-off, inching, and optional modulating control across a broad torque range. PDCS actuators provide quarter-turn electric operation with a mechanical spring-return function for applications requiring a predetermined fail position upon loss of power. Both product lines use aluminum-alloy enclosures, ISO 5211 mounting, position indication, environmental sealing, and optional control and feedback equipment.',
  overviewSections: {
    introduction:
      'PDC Magnus Force Electric Actuators include the PDCQ quarter-turn actuator and the PDCS spring-return actuator for automated valve and damper service. PDCQ actuators support on-off, inching, and optional modulating control across a broad torque range. PDCS actuators provide quarter-turn electric operation with a mechanical spring-return function for applications requiring a predetermined fail position upon loss of power. Both product lines use aluminum-alloy enclosures, ISO 5211 mounting, position indication, environmental sealing, and optional control and feedback equipment.',
    advantages: [
      'Quarter-turn electric operation',
      'PDCQ and PDCS configurations',
      'ISO 5211 mounting',
      'Manual override capability',
      'Visual position indication',
      'Aluminum-alloy enclosures',
      'Polyester powder-coated exterior',
      'O-ring-sealed covers',
      'Captured stainless-steel cover fasteners',
      'CSA and NEMA Type 4X sealing',
      'IP67 ingress protection',
      'Explosion-proof options on selected model sizes',
      'Optional modulating control',
      'Optional position feedback',
      'Multiple standard voltage options',
    ],
    applications: actuatorIndustryTitles,
    customization:
      'Explosion-proof enclosures are available for selected configurations and hazardous-location requirements. Depending on the actuator model, available options may include modulating control, local controls, position feedback, torque switches, interrupter timers, and other control accessories. Refer to the individual PDCQ and PDCS product pages for model-specific options and ratings.',
  },
  applications: [
    { iconSlug: 'butterfly-valves', title: 'Butterfly Valve Automation', description: 'Quarter-turn electric actuation for automated butterfly valves.' },
    { iconSlug: 'ball-valves', title: 'Ball Valve Automation', description: 'Electric actuation for automated quarter-turn ball valves.' },
    { iconSlug: 'damper-valves', title: 'Damper Automation', description: 'Quarter-turn electric actuation for industrial dampers.' },
    { iconSlug: 'process-isolation', title: 'Process Isolation', description: 'Electric actuation for on-off process isolation.' },
    { iconSlug: 'flow-control', title: 'Flow-Control Applications', description: 'Electric actuation for industrial flow-control systems.' },
    { iconSlug: 'combustion', title: 'Burner & Combustion Systems', description: 'Actuation for burner and combustion systems.' },
    { iconSlug: 'utilities', title: 'Utility & Process Systems', description: 'Quarter-turn actuation for utility and process systems.' },
    { iconSlug: 'oem', title: 'OEM & Packaged Equipment', description: 'Electric actuators integrated into OEM and packaged equipment.' },
    { iconSlug: 'on-off-control', title: 'On-Off Control', description: 'Standard on-off control for quarter-turn valve and damper service.' },
    { iconSlug: 'modulating-control', title: 'Modulating Control', description: 'Optional modulating control for supported actuator configurations.' },
    { iconSlug: 'fail-position', title: 'Fail-Open or Fail-Closed Service with PDCS', description: 'PDCS spring return provides a selected fail position when power is lost.' },
  ],
  industries: actuatorIndustryCoverage.map((industry) => ({ ...industry })),
  productRefs: ['pdcq', 'pdcs'],
  downloads: [
    {
      label: 'PDC Magnus Force Electric Actuator Brochure',
      type: 'pdf',
      filename: 'PDC-Magnus-Force-Electric.pdf',
      url: 'https://pdcvalve.com/wp-content/uploads/2021/10/PDC-Magnus-Force-Electric.pdf',
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
    title: 'Magnus Force Electric Actuators | PDC Valve',
    description:
      'Explore PDC Magnus Force PDCQ and PDCS electric actuators for quarter-turn valve and damper automation.',
    canonicalUrl: 'https://www.pdcvalve.com/products/electric-actuators',
    noIndex: false,
    openGraph: {
      title: 'Magnus Force Electric Actuators | PDC Valve',
      description:
        'Explore PDC Magnus Force PDCQ and PDCS electric actuators for quarter-turn valve and damper automation.',
    },
  },
};
