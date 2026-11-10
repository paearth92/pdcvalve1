import type { ProductContent } from '@/types/content';
import { actuatorIndustryCoverage } from '@/data/products/actuator-industry-coverage';

/**
 * Magnus Force Double Acting — verified product content.
 */
export const doubleActing: ProductContent = {
  id: 'pneumatic-actuators_double-acting',
  slug: 'double-acting',
  familySlug: 'pneumatic-actuators',
  familyName: 'Pneumatic Actuators',
  route: '/products/pneumatic-actuators/double-acting',
  name: 'Magnus Force Double Acting',
  series: '',
  shortDescription:
    'A compact double-acting pneumatic rack-and-pinion actuator for reversible quarter-turn valve and damper automation.',
  overview:
    'The PDC Magnus Force Double Acting actuator uses pneumatic pressure to drive twin pistons through a rack-and-pinion mechanism, producing reversible 90° quarter-turn rotation. Air supplied through Port A drives the pistons outward and rotates the pinion counter-clockwise while air exhausts through Port B. Air supplied through Port B drives the pistons inward and rotates the pinion clockwise while air exhausts through Port A. The double-acting design provides powered operation in both directions for quarter-turn valve and damper automation.',
  overviewParagraphs: [
    'The PDC Magnus Force Double Acting actuator uses pneumatic pressure to drive twin pistons through a rack-and-pinion mechanism, producing reversible 90° quarter-turn rotation.',
    'Air supplied through Port A drives the pistons outward and rotates the pinion counter-clockwise while air exhausts through Port B.',
    'Air supplied through Port B drives the pistons inward and rotates the pinion clockwise while air exhausts through Port A. The double-acting design provides powered operation in both directions for quarter-turn valve and damper automation.',
  ],
  features: [
    {
      title: 'Multi-Function Position Indicator',
      description:
        'Multi-function position indicator with NAMUR mounting for accessories such as positioners and limit switches.',
    },
    {
      title: 'ISO 5211, DIN 3337, and NAMUR Pinion',
      description:
        'Nickel-plated steel pinion conforming to ISO 5211, DIN 3337, and NAMUR standards. A stainless-steel pinion option is available.',
    },
    {
      title: 'Extruded Aluminum-Alloy Body',
      description:
        'Extruded ASTM 6005 aluminum-alloy body. Available coating options: hard anodized, polyester, PTFE, or nickel.',
    },
    {
      title: 'Die-Cast Aluminum End Caps',
      description:
        'Die-cast aluminum end caps. Available coating options: polyester, metal powder, PTFE, or nickel.',
    },
    {
      title: 'Twin Pistons',
      description:
        'Twin pistons manufactured from hard-anodized die-cast aluminum or zinc-coated steel.',
    },
    {
      title: 'Adjustable Travel Stops',
      description:
        'Two independent external travel bolts provide adjustment of up to +5° at both the open and closed positions.',
    },
    {
      title: 'Low-Friction Bearings and Guides',
      description:
        'Low-friction compound bearings and guides reduce direct metal-to-metal contact and are designed for convenient maintenance and replacement.',
    },
    {
      title: 'Multiple O-Ring Material Options',
      description:
        'Standard NBR O-rings. Optional Viton or Silicone O-rings support high- and low-temperature applications.',
    },
    {
      title: 'Reversible Double-Acting Operation',
      description:
        'Air pressure drives the actuator in both directions for powered opening and closing.',
    },
    {
      title: 'Compact Quarter-Turn Design',
      description:
        'Rack-and-pinion construction provides compact 90° actuation for valve and damper automation.',
    },
  ],
  benefits: [],
  applications: [],
  applicationGroups: [],
  industries: actuatorIndustryCoverage.map((industry) => ({ ...industry })),
  specifications: [
    { label: 'Actuator Type', value: 'Double Acting' },
    { label: 'Actuator Design', value: 'Pneumatic Rack and Pinion' },
    { label: 'Model Range', value: '32D to 400D' },
    { label: 'Rotation', value: '90°' },
    { label: 'Torque Output Range', value: '27 to 115,272 in-lbs' },
    { label: 'Minimum Air Pressure', value: '30 PSI' },
    { label: 'Maximum Air Pressure', value: '115 PSI' },
    { label: 'Supply Air', value: 'Dry, lubricated or non-corrosive air' },
    { label: 'Maximum Dust Particle Size', value: 'Below 30 microns' },
    { label: 'Standard NBR Seals', value: '-4°F to 176°F' },
    { label: 'Viton Seals', value: '5°F to 248°F' },
    { label: 'Silicone Seals', value: '-31°F to 176°F' },
    { label: 'Valve Mounting', value: 'ISO 5211' },
    { label: 'Pinion Standards', value: 'ISO 5211, DIN 3337, and NAMUR' },
    { label: 'Accessory Mounting', value: 'NAMUR' },
    { label: 'Air Connections', value: 'NPT supply ports' },
    { label: 'Body Material', value: 'Extruded ASTM 6005 Aluminum Alloy' },
    { label: 'End Cap Material', value: 'Die-Cast Aluminum' },
    { label: 'Standard Pinion Material', value: 'Nickel-Plated Steel' },
    { label: 'Optional Pinion Material', value: 'Stainless Steel' },
    { label: 'Piston Options', value: 'Hard-Anodized Die-Cast Aluminum or Zinc-Coated Steel' },
    { label: 'Standard O-Rings', value: 'NBR' },
    { label: 'Optional O-Rings', value: 'Viton or Silicone' },
  ],
  specGroups: [
    {
      heading: 'General',
      category: 'general',
      rows: [
        { label: 'Actuator Type', value: 'Double Acting' },
        { label: 'Actuator Design', value: 'Pneumatic Rack and Pinion' },
        { label: 'Model Range', value: '32D to 400D' },
        { label: 'Rotation', value: '90°' },
        { label: 'Torque Output Range', value: '27 to 115,272 in-lbs' },
      ],
    },
    {
      heading: 'Air Supply',
      category: 'pressure',
      rows: [
        { label: 'Minimum Air Pressure', value: '30 PSI' },
        { label: 'Maximum Air Pressure', value: '115 PSI' },
        { label: 'Supply Air', value: 'Dry, lubricated or non-corrosive air' },
        { label: 'Maximum Dust Particle Size', value: 'Below 30 microns' },
      ],
    },
    {
      heading: 'Temperature',
      category: 'temperature',
      rows: [
        { label: 'Standard NBR Seals', value: '-4°F to 176°F' },
        { label: 'Viton Seals', value: '5°F to 248°F' },
        { label: 'Silicone Seals', value: '-31°F to 176°F' },
      ],
    },
    {
      heading: 'Mounting and Standards',
      category: 'connections',
      rows: [
        { label: 'Valve Mounting', value: 'ISO 5211' },
        { label: 'Pinion Standards', value: 'ISO 5211, DIN 3337, and NAMUR' },
        { label: 'Accessory Mounting', value: 'NAMUR' },
        { label: 'Air Connections', value: 'NPT supply ports' },
      ],
    },
    {
      heading: 'Construction',
      category: 'materials',
      rows: [
        { label: 'Body Material', value: 'Extruded ASTM 6005 Aluminum Alloy' },
        { label: 'End Cap Material', value: 'Die-Cast Aluminum' },
        { label: 'Standard Pinion Material', value: 'Nickel-Plated Steel' },
        { label: 'Optional Pinion Material', value: 'Stainless Steel' },
        { label: 'Piston Options', value: 'Hard-Anodized Die-Cast Aluminum or Zinc-Coated Steel' },
        { label: 'Standard O-Rings', value: 'NBR' },
        { label: 'Optional O-Rings', value: 'Viton or Silicone' },
      ],
    },
  ],
  downloads: [
    {
      label: 'PDC Magnus Force Pneumatic Actuator Brochure',
      type: 'pdf',
      filename: 'PDC-Magnus-Force-Pneumatic.pdf',
      url: 'https://pdcvalve.com/wp-content/uploads/2021/10/PDC-Magnus-Force-Pneumatic.pdf',
    },
  ],
  relatedProducts: [
    { familySlug: 'pneumatic-actuators', productSlug: 'spring-return', name: 'Magnus Force Spring Return' },
  ],
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
    title: 'Magnus Force Double Acting Pneumatic Actuator | PDC Valve',
    description:
      'Explore the PDC Magnus Force Double Acting pneumatic rack-and-pinion actuator, including verified pressure, temperature, torque-range, construction, and mounting information.',
    canonicalUrl:
      'https://www.pdcvalve.com/products/pneumatic-actuators/double-acting',
    noIndex: false,
    openGraph: {
      title: 'Magnus Force Double Acting Pneumatic Actuator | PDC Valve',
      description:
        'Explore the PDC Magnus Force Double Acting pneumatic rack-and-pinion actuator, including verified pressure, temperature, torque-range, construction, and mounting information.',
    },
  },
};
