import type { ProductContent } from '@/types/content';

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
    'A quarter-turn electric actuator for valves and dampers with output torque from 6 N·m (53 in·lbs) to 3,500 N·m (31,000 in·lbs).',
  overview:
    'PDCQ electric actuators are designed for quarter-turn operating applications on valves and dampers. The range combines weather-resistant aluminum construction, manual override, ISO 5211 mounting, standard ON/OFF control, and a broad selection of optional control and hazardous-area configurations.',
  overviewParagraphs: [
    'PDCQ electric actuators are designed for quarter-turn operating applications on valves and dampers.',
    'The range combines weather-resistant aluminum construction, manual override, ISO 5211 mounting, standard ON/OFF control, and a broad selection of optional control and hazardous-area configurations.',
  ],
  features: [
    {
      title: '6 to 3,500 N·m output torque range',
      description: 'Published output torque spans 53 to 31,000 in·lbs across PDCQ-A through PDCQ-R.',
    },
    {
      title: 'High-grade aluminum alloy enclosure',
      description: '',
    },
    {
      title: 'Durable polyester powder-coated exterior',
      description: '',
    },
    {
      title: 'O-ring sealed covers with captured stainless-steel fasteners',
      description: '',
    },
    {
      title: 'CSA / NEMA Type 4X and IP67 sealing',
      description: 'Standard enclosure sealing is designed to meet CSA and NEMA Type 4X with IP67 ingress protection.',
    },
    {
      title: 'Manual override as standard',
      description: 'PDCQ-A through D use a lever; larger models use a non-clutch handwheel requiring no manual/auto lever.',
    },
    {
      title: 'Visual position indicator',
      description: 'Standard except on PDCQ-A and PDCQ-B.',
    },
    {
      title: 'ISO 5211 mounting base',
      description: '',
    },
    {
      title: 'Space heater and thermostat',
      description: 'Standard except on PDCQ-A and PDCQ-B.',
    },
    {
      title: 'Wide standard operating temperature',
      description: '-30°C to +65°C (-22°F to +149°F).',
    },
    {
      title: 'Multiple standard voltages',
      description: '24V DC, 24V AC, and 110V/220V AC, single phase, 60Hz ±10%.',
    },
    {
      title: 'ON/OFF control as standard',
      description: '',
    },
    {
      title: '30% standard duty cycle',
      description: 'Standard 30% duty cycle at 30% rated torque.',
    },
    {
      title: 'Inching-control capability',
      description: 'Rated for 30 to 120 starts or movements per hour with a cyclic duration factor of at least 25%.',
    },
    {
      title: 'Resettable motor thermal protection',
      description: 'Built-in motor thermal protection.',
    },
    {
      title: 'Four standard limit switches',
      description: 'Two for operation and two SPDT extra dry contacts, except on PDCQ-A and PDCQ-B.',
    },
  ],
  benefits: [],
  applications: [
    'Automotive',
    'Chemical',
    'Downstream Hydrocarbons',
    'Food & Beverage',
    'Energy & Onsite Utilities',
    'Life Sciences & Medical',
    'Mining, Minerals & Metals',
    'Water & Wastewater',
    'OEM / Engineered Solutions Providers',
    'Marine',
    'Oil & Gas',
    'Power Generation',
    'Pulp & Paper',
  ],
  applicationGroups: [],
  industries: [],
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
    gallery: [],
    transparentPng: undefined,
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