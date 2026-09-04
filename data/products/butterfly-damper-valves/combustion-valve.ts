import type { ProductContent } from '@/types/content';

/**
 * Combustion Valve Series 22 — verified product content.
 *
 * SOURCE DISCREPANCY (private — do not display publicly):
 * The current product page states a maximum differential pressure of 1 PSIG.
 * The brochure lists 2 PSI. PDC engineering must confirm the final value
 * before launch. Public content uses 1 PSIG per the current product page.
 */
export const combustionValve: ProductContent = {
  id: 'butterfly-damper-valves_combustion-valve',
  slug: 'combustion-valve',
  familySlug: 'butterfly-damper-valves',
  familyName: 'Butterfly Damper Valves',
  route: '/products/butterfly-damper-valves/combustion-valve',
  name: 'Combustion Valve',
  series: '22',
  shortDescription:
    'A cost-effective manual wafer-style butterfly valve for low-pressure, low-cycle combustion-air and combustible-gas applications.',
  overview:
    'The PDC Series 22 Combustion Valve is a manual wafer-style butterfly valve designed for low-pressure, low-cycle, set-and-forget applications. It is intended for hot or cold air and combustible-gas lines requiring high-low or modulating flow control.',
  overviewParagraphs: [
    'The PDC Series 22 Combustion Valve is a manual wafer-style butterfly valve designed for low-pressure, low-cycle, set-and-forget applications. It is intended for hot or cold air and combustible-gas lines requiring high-low or modulating flow control.',
  ],
  features: [
    {
      title: 'Lightweight solid-ring wafer construction',
      description:
        'Four alignment holes help ensure proper installation without transferring pipe stresses to the valve body.',
    },
    {
      title: 'Combination throttling and locking lever',
      description:
        'PDC’s combination 10-position / infinite-throttling locking lever combines two commonly requested manual actuation methods in one assembly.',
    },
    {
      title: 'Temperature-specific adjustable packing',
      description:
        'Graphited TEFLON braid is used for cold service up to 450°F, while graphited glass yarn reinforced with Inconel wire is used for hot service up to 900°F.',
    },
    {
      title: 'Repackable without line removal',
      description:
        'Packing can be serviced without removing the valve from the line.',
    },
    {
      title: 'Temperature-specific inboard bushings',
      description:
        'Cold-service valves use an inboard bronze bushing; hot-service valves use a metallized-carbon bushing for long life, non-freezing operation, and low torque.',
    },
    {
      title: 'Combustion-service disc clearances',
      description:
        'Disc clearances are designed specifically for combustion installations using hot or cold air and combustible gases.',
    },
  ],
  benefits: [],
  applications: [
    'Blower equipment',
    'Compressor equipment',
    'Boiler equipment',
    'Environmental systems',
    'HVAC',
    'Industrial process furnaces',
    'Oil and gas / refining',
    'Power generation / cogeneration',
    'Water and sewage',
    'Stationary engines',
    'Chemical equipment',
    'Mining equipment',
    'Gas recovery systems',
  ],
  applicationGroups: [],
  industries: [],
  specifications: [
    { label: 'Size Range', value: '2" through 14"' },
    { label: 'Maximum Design Temperature', value: '900°F' },
    { label: 'Maximum Differential', value: '1 PSIG per the current product-page design description' },
    { label: 'Maximum Containment', value: '25 PSIG' },
    { label: 'Body Style', value: 'Wafer' },
    { label: 'Shutoff Rating', value: 'ANSI Class II' },
    { label: 'Seat Style', value: 'Swing-through' },
  ],
  specGroups: [
    {
      heading: 'General',
      category: 'general',
      rows: [
        { label: 'Size Range', value: '2" through 14"' },
        { label: 'Body Style', value: 'Wafer' },
        { label: 'Shutoff Rating', value: 'ANSI Class II' },
        { label: 'Seat Style', value: 'Swing-through' },
      ],
    },
    {
      heading: 'Materials',
      category: 'materials',
      rows: [
        { label: 'Body Material', value: 'Cast iron standard' },
        { label: 'Stem Material', value: '416 stainless steel standard' },
        { label: 'Disc Material', value: 'Cast iron standard' },
      ],
    },
    {
      heading: 'Temperature',
      category: 'temperature',
      rows: [
        { label: 'Maximum Design Temperature', value: '900°F' },
      ],
    },
    {
      heading: 'Pressure',
      category: 'pressure',
      rows: [
        // Public content uses 1 PSIG per the current product page.
        // Brochure lists 2 PSI — PDC engineering must confirm before launch.
        { label: 'Maximum Differential', value: '1 PSIG per the current product-page design description' },
        { label: 'Maximum Containment', value: '25 PSIG' },
      ],
    },
    {
      heading: 'Connections',
      category: 'connections',
      rows: [
        { label: 'Flange', value: 'ASME/ANSI B16.1 Class 125' },
        { label: 'Flange', value: 'ASME/ANSI B16.5 Class 150' },
      ],
    },
    {
      heading: 'Certifications',
      category: 'certifications',
      rows: [
        { label: 'Design Standard', value: 'ASME/ANSI B16.34, with exceptions for shell and hydro testing and face-to-face or laying lengths' },
      ],
    },
  ],
  downloads: [
    {
      label: 'PDC Damper Valve Brochure',
      type: 'pdf',
      filename: 'PDC-Damper-Valve-Brochure.pdf',
      url: 'https://pdcvalve.com/wp-content/uploads/2021/10/PDC-Damper-Valve-Brochure.pdf',
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
        src: '/images/products/butterfly-damper-valves/gallery/combustion-valve/standard-configuration.webp',
        alt: 'PDC Combustion Valve standard manual configuration',
        kind: 'gallery',
        caption: 'Standard Manual Configuration',
        width: 1536,
        height: 1024,
      },
      {
        src: '/images/products/butterfly-damper-valves/gallery/combustion-valve/lock-lever-configuration.webp',
        alt: 'PDC Combustion Valve with lock-lever configuration',
        kind: 'gallery',
        caption: 'Lock-Lever Configuration',
        width: 1536,
        height: 1024,
      },
    ],
    transparentPng: undefined,
    technicalDrawings: undefined,
    thumbnail: undefined,
  },
  seo: {
    title: 'Combustion Valve Series 22 Butterfly Damper Valve | PDC Valve',
    description:
      'Explore the PDC Combustion Valve Series 22 butterfly damper valve, including verified size, temperature, construction, and application information.',
    canonicalUrl: 'https://www.pdcvalve.com/products/butterfly-damper-valves/combustion-valve',
    noIndex: false,
    openGraph: {
      title: 'Combustion Valve Series 22 Butterfly Damper Valve | PDC Valve',
      description:
        'Explore the PDC Combustion Valve Series 22 butterfly damper valve, including verified size, temperature, construction, and application information.',
    },
  },
};
