import type { NavLink, CoreFunction, ProductFamily, Industry, Capability, Differentiator, MegaMenuColumn, MegaMenuFeature } from '@/types/site';
import { industryNav } from '@/data/industries/content';
import { homepageIndustryImages } from '@/data/industries/homepage-images';

export const siteConfig = {
  name: 'PDC Valve & Actuators',
  tagline: 'Precision Flow Control Solutions',
  description:
    'High-performance valves and actuators for industrial flow control applications worldwide.',
  email: 'sales@pdcvalve.com',
  phone: '+1 724-695-3440',
  address: '1075 Montour West Industrial Park, Coraopolis, PA 15108',
} as const;

export const mainNav: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Industries', href: '/industries' },
  { label: 'Company', href: '/company' },
  { label: 'Resources', href: '/resources' },
];

export const companyMenuLinks: NavLink[] = [
  { label: 'About PDC', href: '/company/about' },
  { label: 'Engineering Support', href: '/company/engineering' },
  { label: 'Manufacturing', href: '/company/manufacturing' },
  { label: 'Quality & Compliance', href: '/company/quality' },
  { label: 'Find PDC', href: '/company/location' },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: 'Products',
    links: [
      { label: 'Butterfly Damper Valves', href: '/products/butterfly-damper-valves' },
      { label: 'Butterfly Valves', href: '/products/butterfly-valves' },
      { label: 'Pneumatic Actuators', href: '/products/pneumatic-actuators' },
      { label: 'Electric Actuators', href: '/products/electric-actuators' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About PDC', href: '/company/about' },
      { label: 'Engineering Support', href: '/company/engineering' },
      { label: 'Manufacturing', href: '/company/manufacturing' },
      { label: 'Quality & Compliance', href: '/company/quality' },
      { label: 'Find PDC', href: '/company/location' },
    ],
  },
  {
    title: 'Industries',
    links: industryNav,
  },
  {
    title: 'Support',
    links: [
      { label: 'Resources', href: '/resources' },
      { label: 'Product Finder', href: '/product-finder' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export const coreFunctions: CoreFunction[] = [
  {
    number: '01',
    title: 'Control',
    description:
      'Flow regulation solutions for demanding industrial applications.',
  },
  {
    number: '02',
    title: 'Automation',
    description:
      'Electric and pneumatic actuation engineered for dependable operation.',
  },
  {
    number: '03',
    title: 'Isolation',
    description:
      'Reliable valve systems designed for safe process isolation.',
  },
];

export const productFamilies: ProductFamily[] = [
  {
    name: 'Butterfly Damper Valves',
    slug: 'butterfly-damper-valves',
    description:
      'Heavy-duty dampers engineered for high-temperature gas and air flow control.',
  },
  {
    name: 'Butterfly Valves',
    slug: 'butterfly-valves',
    description:
      'Precision-machined butterfly valves for reliable shutoff and throttling.',
  },
  {
    name: 'Pneumatic Actuators',
    slug: 'pneumatic-actuators',
    description:
      'High-torque pneumatic actuators built for fast, dependable valve operation.',
  },
  {
    name: 'Electric Actuators',
    slug: 'electric-actuators',
    description:
      'Electric actuation with precise positioning and integrated control.',
  },
];

export const industries: Industry[] = [
  {
    name: 'Power Generation',
    slug: 'power-generation',
    description:
      'Flow-control solutions for steam, cooling, combustion air, and plant utility systems.',
    image: homepageIndustryImages['power-generation'].src,
    imageAlt: homepageIndustryImages['power-generation'].alt,
  },
  {
    name: 'Air Management',
    slug: 'air-management',
    description:
      'Precision dampers and butterfly valves for industrial air-handling and ventilation systems.',
    image: homepageIndustryImages['air-management'].src,
    imageAlt: homepageIndustryImages['air-management'].alt,
  },
  {
    name: 'Oil & Gas',
    slug: 'oil-and-gas',
    description:
      'Reliable flow-control solutions for process, combustion, and auxiliary systems.',
    image: homepageIndustryImages['oil-and-gas'].src,
    imageAlt: homepageIndustryImages['oil-and-gas'].alt,
  },
  {
    name: 'Chemical',
    slug: 'chemical',
    description:
      'Durable valve solutions for corrosive, demanding, and high-cycle process applications.',
    image: homepageIndustryImages.chemical.src,
    imageAlt: homepageIndustryImages.chemical.alt,
  },
  {
    name: 'Petrochemical',
    slug: 'petrochemical',
    description:
      'Reliable valve solutions for refining, petrochemical, and process applications.',
    image: homepageIndustryImages.petrochemical.src,
    imageAlt: homepageIndustryImages.petrochemical.alt,
  },
  {
    name: 'Water & Wastewater',
    slug: 'water-and-wastewater',
    description:
      'Durable butterfly valves for municipal, industrial water, and wastewater systems.',
    image: homepageIndustryImages['water-and-wastewater'].src,
    imageAlt: homepageIndustryImages['water-and-wastewater'].alt,
  },
];

export const capabilities: Capability[] = [
  { value: '300', label: 'Casting Patterns', numeric: true },
  { value: '10', label: 'Core Product Lines', numeric: true },
  { value: 'ISO', label: '9001:2015' },
  { value: 'In-House', label: 'Machining' },
  { value: 'Custom', label: 'Valve Assemblies' },
  { value: 'Engineering', label: 'Support' },
];

export const differentiators: Differentiator[] = [
  {
    title: 'Application Engineering',
    description:
      'Our engineers work directly with your team to specify the right valve and actuator for your operating conditions.',
  },
  {
    title: 'Product Customization',
    description:
      'Custom configurations, materials, and actuator packages tailored to your specific application requirements.',
  },
  {
    title: 'Fast Lead Times',
    description:
      'In-house machining and inventory management deliver shorter lead times than typical industry standards.',
  },
  {
    title: 'Reliable Manufacturing',
    description:
      'ISO 9001:2015 certified processes and decades of manufacturing expertise ensure consistent, dependable products.',
  },
];

// NOTE: Canonical product routes remain the source of truth in
// data/products/content.ts and data/products/families.ts. This navigation
// config mirrors those routes for the mega menu layout.
export const megaMenuColumns: MegaMenuColumn[] = [
  {
    groups: [
      {
        heading: 'Butterfly Damper Valves',
        headingSlug: 'butterfly-damper-valves',
        links: [
          { label: 'Econotrol', slug: 'econotrol' },
          { label: 'Medium Duty', slug: 'medium-duty' },
          { label: 'Excel', slug: 'excel' },
          { label: 'Flanged End', slug: 'flanged-end' },
          { label: 'Reduced Port', slug: 'reduced-port' },
          { label: 'Combustion Valve', slug: 'combustion-valve' },
          { label: 'Thread End', slug: 'thread-end' },
        ],
      },
    ],
  },
  {
    groups: [
      {
        heading: 'Butterfly Valves',
        headingSlug: 'butterfly-valves',
        links: [
          { label: 'High Performance', slug: 'high-performance' },
          { label: 'Triple Offset', slug: 'triple-offset' },
        ],
      },
      {
        heading: 'Pneumatic Actuators',
        headingSlug: 'pneumatic-actuators',
        links: [
          { label: 'Magnus Force Double Acting', slug: 'double-acting' },
          { label: 'Magnus Force Spring Return', slug: 'spring-return' },
        ],
      },
    ],
  },
  {
    groups: [
      {
        heading: 'Electric Actuators',
        headingSlug: 'electric-actuators',
        links: [
          { label: 'PDCQ', slug: 'pdcq' },
          { label: 'PDCS', slug: 'pdcs' },
        ],
      },
      {
        heading: 'Product Finder',
        headingSlug: 'product-finder',
        headingHref: null,
        links: [
          { label: 'Find the Right Product', slug: 'product-finder', href: '/product-finder' },
        ],
      },
    ],
  },
];

export const megaMenuFeature: MegaMenuFeature = {
  title: 'Featured Product',
  description:
    'High-performance butterfly valve with precision-engineered seat design for severe-service applications.',
  ctaLabel: 'Explore Product',
  ctaSlug: 'butterfly-valves/high-performance',
};
