import type { ProductFamilyContent } from '@/types/content';

/** Butterfly Valves family page — revised to Jon's November 6 deck. */
export const butterflyValvesFamily: ProductFamilyContent = {
  name: 'Butterfly Valves',
  slug: 'butterfly-valves',
  route: '/products/butterfly-valves',
  imageRef: '/images/products/butterfly-valves.svg',
  shortDescription:
    'PDC High Performance and Triple Offset Butterfly Valves provide engineered shutoff and flow-control solutions for demanding industrial process applications.',
  eyebrow: 'Product Family',
  heroTitle: 'Butterfly Valves',
  heroDescription:
    'PDC High Performance and Triple Offset Butterfly Valves provide engineered shutoff and flow-control solutions for demanding industrial process applications. Available configurations support a range of pressure classes, temperatures, materials, seating systems, and actuation requirements.',
  overview:
    'PDC Butterfly Valves include High Performance Double-Offset and Triple Offset designs for industrial shutoff, throttling, and modulating service.',
  overviewSections: {
    introduction:
      'PDC Butterfly Valves include High Performance Double-Offset and Triple Offset designs for industrial shutoff, throttling, and modulating service. High Performance Butterfly Valves provide a versatile double-offset design for a broad range of process applications, with soft-seated, fire-safe, and metal-seated configurations available. Triple Offset Butterfly Valves are designed for more demanding service requiring metal-to-metal sealing, torque-seated operation, elevated-temperature capability, and tight shutoff.',
    advantages: [
      'High Performance designs support a broad range of process applications with soft-seated, fire-safe, and metal-seated configurations.',
      'Triple Offset designs provide metal-to-metal sealing, torque-seated operation, elevated-temperature capability, and tight shutoff for demanding service.',
    ],
    applications: [],
    customization:
      'Valve selection depends on operating pressure, temperature, media, shutoff requirements, materials, and actuation needs.',
  },
  applications: [
    {
      iconSlug: 'chemical',
      title: 'Industrial Process Fluids',
      description:
        'High-performance or triple-offset valve configurations for industrial process-fluid service.',
    },
    {
      iconSlug: 'chemical',
      title: 'Chemical Service',
      description:
        'Select seating, pressure class, and materials for the process conditions.',
    },
    {
      iconSlug: 'power-generation',
      title: 'Steam Service',
      description:
        'Configurations for steam service with pressure and material capability determined by the selected design.',
    },
    {
      iconSlug: 'air-management',
      title: 'Air and Gas Systems',
      description:
        'Shutoff, throttling, or modulating service in industrial air and gas systems.',
    },
    {
      iconSlug: 'water-and-wastewater',
      title: 'Vacuum and Process Water',
      description:
        'High Performance soft-seat or fire-safe configurations can support full-vacuum service when installed in the recommended flow direction; product selection also includes utility and process-water applications.',
    },
    {
      iconSlug: 'oil-and-gas',
      title: 'Oil, Hydrocarbon, and Hot Gas Service',
      description:
        'High-performance and triple-offset designs for applicable oil, hydrocarbon, and hot-gas operating conditions.',
    },
    {
      iconSlug: 'chemical',
      title: 'Blowdown and Sulfur Recovery',
      description:
        'Triple Offset Series 68 applications include blowdown and sulfur-recovery service.',
    },
    {
      iconSlug: 'chemical',
      title: 'Corrosive and Abrasive Service',
      description:
        'Triple Offset Series 68 configurations support corrosive and abrasive media with appropriate material selection.',
    },
  ],
  industries: [
    { slug: 'power-generation', title: 'Power Generation' },
    { slug: 'oil-and-gas', title: 'Oil & Gas' },
    { slug: 'chemical', title: 'Chemical Processing' },
    { slug: 'petrochemical', title: 'Petrochemical' },
    { slug: 'water-and-wastewater', title: 'Water & Wastewater' },
    { slug: 'pulp-and-paper', title: 'Pulp & Paper' },
    { slug: 'marine', title: 'Marine' },
    { slug: 'oem-engineered-systems', title: 'OEM & Engineered Systems' },
  ],
  productRefs: ['high-performance', 'triple-offset'],
  downloads: [
    {
      label: 'Series 68 Triple Offset Butterfly Valve Literature',
      type: 'pdf',
      filename: 'pdc-series-68-triple-offset-butterfly-valves.pdf',
      url: '/documents/technical/pdc-series-68-triple-offset-butterfly-valves.pdf',
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
    title: 'Butterfly Valves | PDC Valve',
    description:
      'Explore PDC High Performance and Triple Offset butterfly valves for industrial shutoff, throttling, and flow-control applications.',
    canonicalUrl: 'https://www.pdcvalve.com/products/butterfly-valves',
    noIndex: false,
    openGraph: {
      title: 'Butterfly Valves | PDC Valve',
      description:
        'PDC High Performance and Triple Offset Butterfly Valves provide engineered shutoff and flow-control solutions for demanding industrial process applications.',
    },
  },
};
