import type { ProductContent } from '@/types/content';
import { actuatorIndustryCoverage } from '@/data/products/actuator-industry-coverage';

/**
 * Magnus Force Spring Return — verified against the current PDC product page
 * and the published Magnus Force Pneumatic Actuator brochure.
 */
export const springReturn: ProductContent = {
  id: 'pneumatic-actuators_spring-return',
  slug: 'spring-return',
  familySlug: 'pneumatic-actuators',
  familyName: 'Pneumatic Actuators',
  route: '/products/pneumatic-actuators/spring-return',
  name: 'Magnus Force Spring Return',
  series: '',
  shortDescription:
    'A spring-return pneumatic rack-and-pinion actuator providing a predetermined fail position upon loss of air pressure.',
  overview:
    'The PDC Magnus Force Spring Return actuator combines pneumatic piston movement with preloaded springs to provide quarter-turn valve operation and a mechanical return action. Air supplied through Port A forces the pistons outward, compresses the springs, and turns the pinion counterclockwise while spring-chamber air exits through Port B. When air pressure is lost, the springs decompress and force the pistons inward. This turns the pinion clockwise while air exits through Port A.',
  overviewParagraphs: [
    'The PDC Magnus Force Spring Return actuator combines pneumatic piston movement with preloaded springs to provide quarter-turn valve operation and a mechanical return action.',
    'Air supplied through Port A forces the pistons outward, compresses the springs, and turns the pinion counterclockwise while spring-chamber air exits through Port B.',
    'When air pressure is lost, the springs decompress and force the pistons inward. This turns the pinion clockwise while air exits through Port A.',
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
        'Two independent external travel bolts provide adjustment of up to ±5° at both the open and closed positions.',
    },
    {
      title: 'Preloaded Corrosion-Resistant Springs',
      description:
        'Preloaded springs use corrosion-resistant materials and are designed for long service life. Spring-return torque can be adjusted by changing the number of springs.',
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
      title: 'Pneumatic Power Stroke',
      description:
        'Air pressure drives the actuator through the powered stroke while compressing the spring set.',
    },
    {
      title: 'Mechanical Spring-Return Stroke',
      description:
        'Upon loss of air pressure, the spring set drives the actuator to its predetermined return position.',
    },
    {
      title: 'Configurable Spring Quantities',
      description:
        'Spring quantity can be adjusted to match application torque requirements.',
    },
  ],
  benefits: [],
  applications: [],
  applicationGroups: [],
  industries: actuatorIndustryCoverage.map((industry) => ({ ...industry })),
  specifications: [
    { label: 'Actuator Type', value: 'Spring Return' },
    { label: 'Actuator Design', value: 'Pneumatic Rack and Pinion' },
    { label: 'Model Range', value: '52S to 400S' },
    { label: 'Torque Output Range', value: '38 to 37,164 in-lbs' },
    { label: 'Rotation', value: '90°' },
    { label: 'Minimum Air Pressure', value: '30 PSI' },
    { label: 'Maximum Air Pressure', value: '115 PSI' },
    { label: 'Supply Air', value: 'Dry, lubricated or non-corrosive air' },
    { label: 'Maximum Dust Particle Size', value: 'Below 30 microns' },
    { label: 'Return Method', value: 'Preloaded mechanical springs' },
    { label: 'Spring Quantity', value: 'Configurable according to torque requirements' },
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
    { label: 'Springs', value: 'Preloaded, corrosion-resistant construction' },
  ],
  specGroups: [
    {
      heading: 'General',
      category: 'general',
      rows: [
        { label: 'Actuator Type', value: 'Spring Return' },
        { label: 'Actuator Design', value: 'Pneumatic Rack and Pinion' },
        { label: 'Model Range', value: '52S to 400S' },
        { label: 'Torque Output Range', value: '38 to 37,164 in-lbs' },
        { label: 'Rotation', value: '90°' },
        { label: 'Return Method', value: 'Preloaded Mechanical Springs' },
        { label: 'Spring Quantity', value: 'Configurable according to torque requirements' },
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
        { label: 'Pneumatic Stroke', value: 'Air pressure supplied through Port A' },
        { label: 'Spring-Chamber Exhaust', value: 'Port B' },
        { label: 'Return Condition', value: 'Loss of air pressure' },
        { label: 'Return Exhaust', value: 'Port A' },
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
        { label: 'Springs', value: 'Preloaded, corrosion-resistant construction' },
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
    { familySlug: 'pneumatic-actuators', productSlug: 'double-acting', name: 'Magnus Force Double Acting' },
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
    title: 'Magnus Force Spring Return Pneumatic Actuator | PDC Valve',
    description:
      'Explore the PDC Magnus Force Spring Return pneumatic rack-and-pinion actuator with configurable mechanical springs and standardized valve and accessory mounting.',
    canonicalUrl:
      'https://www.pdcvalve.com/products/pneumatic-actuators/spring-return',
    noIndex: false,
    openGraph: {
      title: 'Magnus Force Spring Return Pneumatic Actuator | PDC Valve',
      description:
        'Explore the PDC Magnus Force Spring Return pneumatic rack-and-pinion actuator with configurable mechanical springs and standardized valve and accessory mounting.',
    },
  },
};
