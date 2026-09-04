import type { ProductContent } from '@/types/content';

/**
 * PDCS Magnus Force Quarter-Turn Spring-Pack Electric Actuator — verified
 * against the current PDC product page and Magnus Force Electric brochure.
 */
export const pdcs: ProductContent = {
  id: 'electric-actuators_pdcs',
  slug: 'pdcs',
  familySlug: 'electric-actuators',
  familyName: 'Electric Actuators',
  route: '/products/electric-actuators/pdcs',
  name: 'PDCS',
  shortDescription:
    'A quarter-turn spring-pack electric actuator providing a defined fail position on loss of power, with output torque from 50 N·m (445 in·lbs) to 260 N·m (2,300 in·lbs).',
  overview:
    'PDCS electric actuators are designed for quarter-turn operating applications requiring a fail position upon loss of power supply. A compact mechanical spring set can fail the connected valve or damper clockwise (close) or counter-clockwise (open).',
  overviewParagraphs: [
    'PDCS electric actuators are designed for quarter-turn operating applications requiring a fail position upon loss of power supply.',
    'A compact mechanical spring set can fail the connected valve or damper clockwise (close) or counter-clockwise (open).',
  ],
  features: [
    {
      title: '50 to 260 N·m output torque range',
      description: 'Published output torque spans 445 to 2,300 in·lbs across PDCS-A through PDCS-D.',
    },
    {
      title: 'Mechanical spring-pack fail positioning',
      description: 'Configurable to fail clockwise (close) or counter-clockwise (open) upon loss of power.',
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
      title: 'Visual position indicator',
      description: 'Standard.',
    },
    {
      title: 'Adjustable mechanical fail-position buffer',
      description: 'Adjustable mechanical buffer for the fail end position is standard.',
    },
    {
      title: 'ISO 5211 mounting base',
      description: '',
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
    { label: 'Output Torque', value: '50 N·m (445 in·lbs) to 260 N·m (2,300 in·lbs)' },
    { label: 'Operation', value: 'Quarter-turn electric actuator with mechanical spring pack' },
    { label: 'Fail Position', value: 'Clockwise (close) or counter-clockwise (open)' },
    { label: 'Enclosure', value: 'High-grade aluminum alloy; CSA / NEMA Type 4X; IP67' },
    { label: 'Position Indicator', value: 'Standard' },
    { label: 'Fail-End Buffer', value: 'Adjustable mechanical buffer standard' },
    { label: 'Mounting', value: 'ISO 5211' },
  ],
  specGroups: [
    {
      heading: 'General',
      category: 'general',
      rows: [
        { label: 'Operation', value: 'Quarter-turn electric actuator with mechanical spring pack' },
        { label: 'Output Torque', value: '50 N·m (445 in·lbs) to 260 N·m (2,300 in·lbs)' },
        { label: 'Fail Position', value: 'Clockwise (close) or counter-clockwise (open)' },
        { label: 'Mounting Base', value: 'ISO 5211' },
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
        { label: 'Spring Pack', value: 'Compact mechanical spring set' },
      ],
    },
    {
      heading: 'Operation',
      category: 'operation',
      rows: [
        { label: 'Power-Loss Function', value: 'Mechanical spring return to defined fail position' },
        { label: 'Position Indicator', value: 'Standard' },
        { label: 'Fail-End Buffer', value: 'Adjustable mechanical buffer standard' },
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
    title: 'PDCS Spring-Pack Electric Actuator | PDC Valve',
    description:
      'Explore PDCS quarter-turn spring-pack electric actuators, including fail positioning, torque, construction, model-selection and application data.',
    canonicalUrl: 'https://www.pdcvalve.com/products/electric-actuators/pdcs',
    noIndex: false,
    openGraph: {
      title: 'PDCS Spring-Pack Electric Actuator | PDC Valve',
      description:
        'Quarter-turn spring-pack electric actuation providing a defined fail position on loss of power.',
    },
  },
};