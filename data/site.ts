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
      { label: 'Damper and Control Valves', href: '/products/butterfly-damper-valves' },
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
    title: 'Industrial Flow Control',
    description:
      'Butterfly and damper valves engineered for reliable flow control across demanding industrial applications.',
  },
  {
    number: '02',
    title: 'Engineered Valve Automation',
    description:
      'Complete electric and pneumatic automation packages matched to the valve, application, and control requirements.',
  },
  {
    number: '03',
    title: 'Reliable Process Isolation',
    description:
      'Manual and automated butterfly valves for dependable process isolation and shutoff service.',
  },
];

export const productFamilies: ProductFamily[] = [
  {
    name: 'Damper and Control Valves',
    displayName: 'Damper & Control Valves',
    slug: 'butterfly-damper-valves',
    description:
      'Heavy-duty butterfly and damper valves engineered for modulating flow, high-temperature service, and demanding industrial applications.',
  },
  {
    name: 'Butterfly Valves',
    slug: 'butterfly-valves',
    description:
      'Industrial butterfly valves for reliable shutoff, isolation, and general process service.',
  },
  {
    name: 'Pneumatic Actuators',
    displayName: 'Pneumatic Actuation',
    slug: 'pneumatic-actuators',
    description:
      'Pneumatic actuator packages sized, mounted, and configured for reliable valve operation.',
  },
  {
    name: 'Electric Actuators',
    displayName: 'Electric Actuation',
    slug: 'electric-actuators',
    description:
      'Electric actuator packages engineered for accurate positioning, dependable operation, and application-specific control.',
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
      'Valves, actuators, and engineered packages for oil and gas production, frac operations, process isolation, water handling, and utilities.',
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
    title: 'Application Support',
    description:
      'Sales and Engineering work together to help evaluate product selection, operating conditions, actuation, and application requirements.',
  },
  {
    title: 'Product Customization',
    description:
      'Custom configurations, materials, brackets, couplings, linkages, actuator packages, and accessories can be tailored to specific application requirements.',
  },
  {
    title: 'In-House Capability',
    description:
      'Manual machining, valve assembly, actuator integration, painting, and inspection support both standard and custom configurations.',
  },
  {
    title: 'Quality Assurance',
    description:
      'ISO 9001:2015 certified processes and documented inspection practices support consistent, dependable product execution.',
  },
];

// NOTE: Canonical product routes remain the source of truth in
// data/products/content.ts and data/products/families.ts. This navigation
// config mirrors those routes for the mega menu layout.
export const megaMenuColumns: MegaMenuColumn[] = [
  {
    groups: [
      {
        heading: 'Damper and Control Valves',
        headingSlug: 'butterfly-damper-valves',
        links: [
          { label: 'Econotrol', slug: 'econotrol' },
          { label: 'Medium Duty', slug: 'medium-duty' },
          { label: 'Excel', slug: 'excel' },
          { label: 'Flanged Series 39', slug: 'flanged-end' },
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
