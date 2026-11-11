import type { ProductFamilyContent } from '@/types/content';

/** Damper and Control Valves family page — revised to Jon's November 6 deck. */
export const butterflyDamperValvesFamily: ProductFamilyContent = {
  name: 'Damper and Control Valves',
  slug: 'butterfly-damper-valves',
  route: '/products/butterfly-damper-valves',
  imageRef: '/images/products/families/Butterfly-damper-valves-family.png',
  shortDescription:
    'Heavy-duty butterfly and damper valves engineered for modulating flow, high-temperature service, and demanding industrial applications.',
  eyebrow: 'Product Family',
  heroTitle: 'Damper and Control Valves',
  heroDescription:
    'Heavy-duty butterfly and damper valves engineered for modulating flow, high-temperature service, and demanding industrial applications.',
  overview:
    'PDC Damper and Control Valves are engineered for dependable flow control and isolation in low-pressure industrial systems. Multiple designs and application-specific options accommodate a broad range of temperatures, operating conditions, and cycling requirements.',
  overviewSections: {
    introduction:
      'PDC Damper and Control Valves are engineered for dependable flow control and isolation in low-pressure industrial systems. Available in multiple designs, including wafer, flanged, reduced-port, combustion, and threaded configurations, these valves accommodate a broad range of temperatures, operating conditions, and cycling requirements. From economical general-purpose service to demanding high-temperature applications, PDC offers solutions tailored to each system.',
    advantages: [
      'Rugged construction, precision-machined components, and dependable flow characteristics.',
      'Available features include low-friction shaft bushings, adjustable packing, and durable actuator mounting provisions.',
      'Multiple seating arrangements provide options for flow regulation and leakage control.',
      'Selected designs accommodate elevated temperatures, demanding media, and frequent cycling.',
    ],
    applications: [],
    customization:
      'PDC offers application-specific configurations to address material, temperature, leakage, and actuation requirements. Depending on valve series, options include alternative body and disc materials, specialized bushings and packing, swing-through, step, and tadpole seating, and various shaft-end designs. Manual, pneumatic, and electric actuation packages can be engineered with appropriate mounting hardware and accessories. Valve selection depends on operating temperature, differential pressure, media, cycle frequency, connection type, required flow characteristics, and actuation method.',
  },
  applications: [
    {
      iconSlug: 'power-generation',
      title: 'Combustion Air Control',
      description:
        'Modulating airflow to burners, boilers, furnaces, and other combustion equipment.',
    },
    {
      iconSlug: 'air-management',
      title: 'Industrial Air & Gas Control',
      description:
        'Flow regulation for clean air, process gases, exhaust streams, and low-pressure gas systems.',
    },
    {
      iconSlug: 'air-management',
      title: 'Blower & Compressor Systems',
      description:
        'Throttling and isolation in blower, compressor, and packaged equipment applications.',
    },
    {
      iconSlug: 'power-generation',
      title: 'High-Temperature Service',
      description:
        'Configurable damper valves for elevated-temperature air and gas service, with material options for demanding conditions.',
    },
    {
      iconSlug: 'chemical',
      title: 'Process Flow Control',
      description:
        'Reliable low-pressure flow regulation for industrial processes requiring manual or automated control.',
    },
    {
      iconSlug: 'oem',
      title: 'OEM & Engineered Equipment',
      description:
        'Custom valve configurations for packaged systems, skids, environmental equipment, and specialized machinery.',
    },
  ],
  industries: [
    {
      slug: 'power-generation',
      title: 'Power Generation',
      description:
        'Combustion airflow, boiler systems, plant utilities, and other low-pressure air and gas applications.',
    },
    {
      slug: 'oil-and-gas',
      title: 'Oil & Gas / Refining',
      description:
        'High-temperature and process-gas flow control in upstream, downstream, and refining applications.',
    },
    {
      slug: 'chemical',
      title: 'Chemical Processing',
      description:
        'Air, gas, utility, and general process flow-control applications.',
    },
    {
      slug: 'water-and-wastewater',
      title: 'Water & Wastewater',
      description:
        'Air-handling, aeration, blower, and treatment-system applications.',
    },
    {
      slug: 'industrial-manufacturing',
      title: 'Industrial / Manufacturing',
      description:
        'Furnaces, HVAC, environmental systems, plant utilities, and general industrial equipment.',
    },
    {
      slug: 'oem-engineered-systems',
      title: 'OEM & Engineered Systems',
      description:
        'Damper and control valves integrated into custom machinery, packaged equipment, and engineered systems.',
    },
  ],
  productRefs: ['excel', 'econotrol', 'medium-duty'],
  downloads: [
    {
      label: 'Excel Series 40 Brochure',
      type: 'pdf',
      filename: 'pdc-excel-series-40-butterfly-valve.pdf',
      url: '/documents/brochures/pdc-excel-series-40-butterfly-valve.pdf',
    },
    {
      label: 'Econotrol Series 09 Brochure',
      type: 'pdf',
      filename: 'pdc-econotrol-series-09-butterfly-valve.pdf',
      url: '/documents/brochures/pdc-econotrol-series-09-butterfly-valve.pdf',
    },
    {
      label: 'Medium Duty Series 01 Brochure',
      type: 'pdf',
      filename: 'pdc-medium-duty-series-01-butterfly-valve.pdf',
      url: '/documents/brochures/pdc-medium-duty-series-01-butterfly-valve.pdf',
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
    title: 'Damper and Control Valves | PDC Valve',
    description:
      'Heavy-duty PDC damper and control valves for modulating flow, high-temperature service, and demanding industrial applications.',
    canonicalUrl: 'https://www.pdcvalve.com/products/butterfly-damper-valves',
    noIndex: false,
    openGraph: {
      title: 'Damper and Control Valves | PDC Valve',
      description:
        'Heavy-duty PDC damper and control valves for modulating flow, high-temperature service, and demanding industrial applications.',
    },
  },
};
