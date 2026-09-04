import type { ProductFamilyContent } from '@/types/content';

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
    'Electric quarter-turn actuators for on-off, modulating, and spring-return valve and damper automation.',
  eyebrow: 'Product Family',
  heroTitle: 'Magnus Force Electric Actuators',
  heroDescription:
    'PDC Magnus Force Electric Actuators include the PDCQ quarter-turn actuator and the PDCS spring-return actuator. The PDCQ is designed for quarter-turn operating applications on valves and dampers. It is available across a broad torque range and supports on-off, inching, and optional modulating control configurations. The PDCS is designed for quarter-turn applications requiring a mechanical fail position upon loss of electrical power. A compact spring set can return the connected valve or damper clockwise or counterclockwise, depending on the configured assembly. Both product lines use aluminum-alloy enclosures, ISO 5211 mounting, position indication, environmental sealing, and optional control and feedback equipment.',
  overview:
    'PDC Magnus Force Electric Actuators include the PDCQ quarter-turn actuator and the PDCS spring-return actuator. The PDCQ is designed for quarter-turn operating applications on valves and dampers. It is available across a broad torque range and supports on-off, inching, and optional modulating control configurations. The PDCS is designed for quarter-turn applications requiring a mechanical fail position upon loss of electrical power. A compact spring set can return the connected valve or damper clockwise or counterclockwise, depending on the configured assembly. Both product lines use aluminum-alloy enclosures, ISO 5211 mounting, position indication, environmental sealing, and optional control and feedback equipment.',
  overviewSections: {
    introduction:
      'PDC Magnus Force Electric Actuators include the PDCQ quarter-turn actuator and the PDCS spring-return actuator. The PDCQ is designed for quarter-turn operating applications on valves and dampers. It is available across a broad torque range and supports on-off, inching, and optional modulating control configurations. The PDCS is designed for quarter-turn applications requiring a mechanical fail position upon loss of electrical power. A compact spring set can return the connected valve or damper clockwise or counterclockwise, depending on the configured assembly. Both product lines use aluminum-alloy enclosures, ISO 5211 mounting, position indication, environmental sealing, and optional control and feedback equipment.',
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
      'Optional torque switches',
      'Multiple standard voltage options',
    ],
    applications: [
      'Automotive',
      'Chemical',
      'Downstream hydrocarbons',
      'Food and beverage',
      'Energy and onsite utilities',
      'Life sciences and medical',
      'Mining, minerals, and metals',
      'Water and wastewater',
      'OEM and engineered solution providers',
      'Marine',
      'Oil and gas',
      'Power generation',
      'Pulp and paper',
    ],
    customization:
      'Explosion-proof enclosures are available on selected model sizes. Hazardous-environment options may meet CSA and NEMA Type 7 for Class I, Division 1, Groups C and D, or CSA and NEMA Type 9 for Class II, Division 1, Groups E, F, and G. IP68 ingress protection is available with specified explosion-proof configurations. Optional equipment includes modulating control, local controls, position feedback via 4–20 mA current position transmitter, 1K or 5K potentiometer, torque switches, and interrupter timer.',
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
    { slug: 'water-and-wastewater', title: 'Water and wastewater' },
    { slug: 'oem-and-engineered-solution-providers', title: 'OEM and engineered solution providers' },
    { slug: 'marine', title: 'Marine' },
    { slug: 'oil-and-gas', title: 'Oil and gas' },
    { slug: 'power-generation', title: 'Power generation' },
    { slug: 'pulp-and-paper', title: 'Pulp and paper' },
  ],
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
