import type { ProductContent } from '@/types/content';
import { actuatorIndustryCoverage } from '@/data/products/actuator-industry-coverage';

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
    'A quarter-turn spring-return electric actuator for valve and damper automation requiring a predetermined fail position upon loss of power. Available with output torque from 50 to 260 N·m (445 to 2,300 in·lbs).',
  overview:
    'PDCS electric actuators are designed for quarter-turn operating applications requiring a fail position upon loss of power supply. A compact mechanical spring set can fail the connected valve or damper clockwise (close) or counter-clockwise (open).',
  overviewParagraphs: [
    'PDCS electric actuators are designed for quarter-turn operating applications requiring a fail position upon loss of power supply.',
    'A compact mechanical spring set can fail the connected valve or damper clockwise (close) or counter-clockwise (open).',
  ],
  features: [
    {
      title: '50 to 260 N·m Output Torque Range',
      description: 'Published output torque spans 445 to 2,300 in·lbs across PDCS-A through PDCS-D.',
    },
    {
      title: 'Mechanical Spring-Return Fail Positioning',
      description: 'Configurable to fail clockwise (close) or counter-clockwise (open) upon loss of power.',
    },
    {
      title: 'High-Grade Aluminum-Alloy Enclosure',
      description: 'Durable aluminum-alloy construction for industrial quarter-turn automation.',
    },
    {
      title: 'Durable Polyester Powder-Coated Exterior',
      description: 'Protective exterior coating for industrial service.',
    },
    {
      title: 'O-Ring-Sealed Covers with Captured Stainless-Steel Fasteners',
      description: 'Helps maintain enclosure sealing while supporting convenient service access.',
    },
    {
      title: 'CSA / NEMA Type 4X and IP67 Sealing',
      description: 'Standard enclosure sealing is designed to meet CSA and NEMA Type 4X with IP67 ingress protection.',
    },
    {
      title: 'Visual Position Indicator',
      description: 'Standard.',
    },
    {
      title: 'Adjustable Mechanical Fail-End Buffer',
      description: 'Adjustable mechanical buffer for the fail end position is standard.',
    },
    {
      title: 'ISO 5211 Mounting Base',
      description: 'Provides standardized mounting for quarter-turn valve and damper automation.',
    },
  ],
  benefits: [],
  applications: [],
  applicationGroups: [],
  industries: actuatorIndustryCoverage.map((industry) => ({ ...industry })),
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
