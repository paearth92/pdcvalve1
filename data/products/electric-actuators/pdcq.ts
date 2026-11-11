import type { ProductContent } from '@/types/content';
import { actuatorIndustryCoverage } from '@/data/products/actuator-industry-coverage';

/**
 * PDCQ Magnus Force Quarter-Turn Electric Actuator — verified against the
 * current PDC product page and published Magnus Force Electric brochure.
 */
export const pdcq: ProductContent = {
  id: 'electric-actuators_pdcq',
  slug: 'pdcq',
  familySlug: 'electric-actuators',
  familyName: 'Electric Actuators',
  route: '/products/electric-actuators/pdcq',
  name: 'PDCQ',
  shortDescription:
    'A quarter-turn electric actuator for valve and damper automation with output torque from 6 to 3,500 N·m (53 to 31,000 in·lbs). Available for on-off, inching, and optional modulating-control applications across a broad range of industrial automation requirements.',
  overview:
    'PDCQ electric actuators are designed for quarter-turn operating applications on valves and dampers. The range combines weather-resistant aluminum construction, manual override, ISO 5211 mounting, standard ON/OFF control, and a broad selection of optional control and hazardous-area configurations.',
  overviewParagraphs: [
    'PDCQ electric actuators are designed for quarter-turn operating applications on valves and dampers.',
    'The range combines weather-resistant aluminum construction, manual override, ISO 5211 mounting, standard ON/OFF control, and a broad selection of optional control and hazardous-area configurations.',
  ],
  features: [
    {
      title: '6 to 3,500 N·m Output Torque Range',
      description: 'Published output torque spans 53 to 31,000 in·lbs across PDCQ-A through PDCQ-R.',
    },
    {
      title: 'High-Grade Aluminum-Alloy Enclosure',
      description: 'Lightweight industrial enclosure construction with protective exterior coating.',
    },
    {
      title: 'Durable Polyester Powder-Coated Exterior',
      description: 'Provides added exterior protection for industrial service.',
    },
    {
      title: 'O-Ring-Sealed Covers with Captured Stainless-Steel Fasteners',
      description: 'Helps maintain enclosure sealing while simplifying service access.',
    },
    {
      title: 'CSA / NEMA Type 4X and IP67 Sealing',
      description: 'Standard enclosure sealing is designed to meet CSA and NEMA Type 4X with IP67 ingress protection.',
    },
    {
      title: 'Manual Override as Standard',
      description: 'PDCQ-A through D use a lever; larger models use a non-clutch handwheel requiring no manual/auto lever.',
    },
    {
      title: 'Visual Position Indicator',
      description: 'Standard except on PDCQ-A and PDCQ-B.',
    },
    {
      title: 'ISO 5211 Mounting Base',
      description: 'Supports standardized quarter-turn valve and damper mounting.',
    },
    {
      title: 'Space Heater and Thermostat',
      description: 'Standard except on PDCQ-A and PDCQ-B.',
    },
    {
      title: 'Standard Operating Temperature Range',
      description: '-30°C to +65°C (-22°F to +149°F).',
    },
    {
      title: 'Multiple Standard Voltages',
      description: '24V DC, 24V AC, and 110V/220V AC, single phase, 60Hz ±10%.',
    },
    {
      title: 'ON/OFF Control as Standard',
      description: 'Standard control configuration for quarter-turn automation.',
    },
    {
      title: 'Standard Duty Cycle',
      description: 'Standard 30% duty cycle at 30% rated torque.',
    },
    {
      title: 'Inching-Control Capability',
      description: 'Rated for 30 to 120 movements per hour with a cyclic duration factor of at least 25%.',
    },
    {
      title: 'Resettable Motor Thermal Protection',
      description: 'Built-in resettable protection helps protect the actuator motor.',
    },
    {
      title: 'Four Standard Limit Switches',
      description: 'Two for operation and two SPDT auxiliary dry contacts, except on PDCQ-A and PDCQ-B.',
    },
  ],
  benefits: [],
  applications: [],
  applicationGroups: [],
  industries: actuatorIndustryCoverage.map((industry) => ({ ...industry })),
  specifications: [
    { label: 'Output Torque', value: '6 N·m (53 in·lbs) to 3,500 N·m (31,000 in·lbs)' },
    { label: 'Operation', value: 'Quarter-turn electric actuation for valves and dampers' },
    { label: 'Enclosure', value: 'High-grade aluminum alloy; CSA / NEMA Type 4X; IP67' },
    { label: 'Temperature', value: '-30°C to +65°C (-22°F to +149°F)' },
    { label: 'Standard Voltages', value: '24V DC, 24V AC, 110V/220V AC, 1PH, 60Hz ±10%' },
    { label: 'Control', value: 'ON/OFF standard' },
    { label: 'Duty Cycle', value: '30% at 30% rated torque' },
    { label: 'Mounting', value: 'ISO 5211' },
  ],
  specGroups: [
    {
      heading: 'General',
      category: 'general',
      rows: [
        { label: 'Operation', value: 'Quarter-turn electric actuation for valves and dampers' },
        { label: 'Output Torque', value: '6 N·m (53 in·lbs) to 3,500 N·m (31,000 in·lbs)' },
        { label: 'Mounting Base', value: 'ISO 5211' },
        { label: 'Manual Override', value: 'Standard' },
      ],
    },
    {
      heading: 'Construction',
      category: 'construction',
      rows: [
        { label: 'Enclosure Material', value: 'High-grade aluminum alloy' },
        { label: 'Exterior Protection', value: 'Durable polyester powder coating' },
        { label: 'Cover Sealing', value: 'O-ring sealing' },
        { label: 'Cover Fasteners', value: 'Captured stainless-steel fasteners' },
      ],
    },
    {
      heading: 'Operation & Controls',
      category: 'operation',
      rows: [
        { label: 'Standard Control', value: 'ON/OFF' },
        { label: 'Duty Cycle', value: '30% at 30% rated torque' },
        { label: 'Inching Control', value: '30 to 120 starts/movements per hour; cyclic duration factor not less than 25%' },
        { label: 'Limit Switches', value: '4 standard: 2 operational + 2 SPDT extra dry contacts, except PDCQ-A and B' },
        { label: 'Position Indicator', value: 'Standard except PDCQ-A and B' },
        { label: 'Motor Protection', value: 'Built-in resettable thermal protection' },
        { label: 'Space Heater / Thermostat', value: 'Standard except PDCQ-A and B' },
      ],
    },
    {
      heading: 'Electrical',
      category: 'operation',
      rows: [
        { label: 'Standard Voltages', value: '24V DC, 24V AC, 110V/220V AC, 1PH, 60Hz ±10%' },
      ],
    },
    {
      heading: 'Temperature',
      category: 'temperature',
      rows: [
        { label: 'Standard Operating Temperature', value: '-30°C to +65°C (-22°F to +149°F)' },
      ],
    },
    {
      heading: 'Enclosure & Ingress Protection',
      category: 'certifications',
      rows: [
        { label: 'Standard Enclosure', value: 'CSA and NEMA Type 4X' },
        { label: 'Ingress Protection', value: 'IP67' },
      ],
    },
  ],
  downloads: [
    {
      label: 'PDC Magnus Force Electric Actuator Brochure',
      type: 'pdf',
      filename: 'PDC-Magnus-Force-Electric.pdf',
      url: 'https://pdcvalve.com/wp-content/uploads/2021/10/PDC-Magnus-Force-Electric.pdf',
    },
  ],
  relatedProducts: [],
  badges: [],
  trustBadges: [],
  lifecycleStatus: 'active',
  images: {
    hero: undefined,
    gallery: [
      {
        src: '/images/products/electric-actuators/gallery/pdcq/pdcq-side-angle.webp',
        alt: 'PDCQ electric actuator showing the PDC identification plate and manual handwheel from the side',
        kind: 'gallery',
        caption: 'PDCQ Electric Actuator — Nameplate Side View',
        width: 1412,
        height: 1114,
      },
    ],
    transparentPng: {
      src: '/images/home/core-capabilities/pdcq-actuator-cutout.png',
      alt: 'PDCQ electric quarter-turn actuator with manual handwheel',
      kind: 'transparent-png',
      caption: 'PDCQ Electric Actuator',
      width: 1312,
      height: 1199,
    },
    technicalDrawings: undefined,
    thumbnail: undefined,
  },
  seo: {
    title: 'PDCQ Electric Actuator | PDC Valve',
    description:
      'Explore PDCQ quarter-turn electric actuators, including torque, enclosure, control, electrical, model-selection and application data.',
    canonicalUrl: 'https://www.pdcvalve.com/products/electric-actuators/pdcq',
    noIndex: false,
    openGraph: {
      title: 'PDCQ Electric Actuator | PDC Valve',
      description:
        'Quarter-turn electric actuation with 6 to 3,500 N·m output torque and multiple control options.',
    },
  },
};
