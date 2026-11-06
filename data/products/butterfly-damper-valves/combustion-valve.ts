import type { ProductContent } from '@/types/content';

/** Combustion Valve Series 22 — revised to the current product review deck. */
export const combustionValve: ProductContent = {
  id: 'butterfly-damper-valves_combustion-valve',
  slug: 'combustion-valve',
  familySlug: 'butterfly-damper-valves',
  familyName: 'Damper and Control Valves',
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
        'Graphited Teflon braid is used for cold service up to 450°F, while high-temperature packing is used for hot service up to 900°F.',
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
    'Manual high-low or modulating control of combustion-air flow',
    'Low-pressure combustible-gas applications within published Series 22 pressure limits',
    'Combustion-air and fuel-gas control for industrial furnaces and heating equipment',
    'Low-pressure air or gas control associated with boiler and burner systems',
    'Applicable low-pressure air and gas control in gas-compression equipment',
    'Combustion-support applications requiring manual throttling or set-and-hold positioning',
    'Low-cycle air or gas flow control in industrial and packaged process equipment',
    'Hot-air applications requiring elevated-temperature construction up to 900°F',
  ],
  applicationGroups: [],
  industries: [],
  specifications: [
    { label: 'Size Range', value: '2" through 14"' },
    { label: 'Maximum Design Temperature', value: '900°F' },
    { label: 'Maximum Differential', value: '1 PSIG' },
    { label: 'Maximum Containment', value: '25 PSIG' },
    { label: 'Flange Compatibility', value: '125/150 lb flanging' },
    { label: 'Body Style', value: 'Wafer' },
    { label: 'Seat Configurations', value: 'Swing-Thru and Paddle Disc' },
  ],
  specGroups: [
    {
      heading: 'General',
      category: 'general',
      rows: [
        { label: 'Size Range', value: '2" through 14"' },
        { label: 'Body Style', value: 'Wafer' },
        { label: 'Flange Compatibility', value: '125/150 lb flanging' },
        { label: 'Seat Configurations', value: 'Swing-Thru and Paddle Disc' },
      ],
    },
    {
      heading: 'Materials',
      category: 'materials',
      rows: [
        { label: 'Body — 450°F service', value: 'Cast iron' },
        { label: 'Disc — 450°F service', value: 'Carbon steel' },
        { label: 'Shaft — 450°F service', value: '416 stainless steel' },
        { label: 'Bushing — 450°F service', value: 'Graphited bronze' },
        { label: 'Packing — 450°F service', value: 'Graphited Teflon' },
        { label: 'Packing nut — 450°F service', value: 'Brass' },
        { label: 'Body — 900°F service', value: 'Cast iron' },
        { label: 'Disc — 900°F service', value: 'Carbon steel' },
        { label: 'Shaft — 900°F service', value: '316 stainless steel' },
        { label: 'Bushing — 900°F service', value: 'Metcar (metallized carbon)' },
        { label: 'Packing — 900°F service', value: 'High-temperature packing' },
        { label: 'Packing nut — 900°F service', value: '316 stainless steel' },
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
        { label: 'Maximum Differential', value: '1 PSIG' },
        { label: 'Maximum Containment', value: '25 PSIG' },
      ],
    },
    {
      heading: 'Connections',
      category: 'connections',
      rows: [
        { label: 'Flange Compatibility', value: '125/150 lb flanging' },
      ],
    },
  ],
  downloads: [
    {
      label: 'PDC Combustion Valve Series 22 Brochure',
      type: 'pdf',
      filename: 'pdc-combustion-series-22-butterfly-valve.pdf',
      url: '/documents/brochures/pdc-combustion-series-22-butterfly-valve.pdf',
    },
  ],
  relatedProducts: [
    {
      familySlug: 'butterfly-damper-valves',
      productSlug: 'econotrol',
      name: 'Econotrol Series 09',
    },
    {
      familySlug: 'butterfly-damper-valves',
      productSlug: 'medium-duty',
      name: 'Medium Duty Series 01',
    },
    {
      familySlug: 'butterfly-damper-valves',
      productSlug: 'excel',
      name: 'Excel Series 40',
    },
  ],
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
    title: 'Combustion Valve Series 22 Damper and Control Valve | PDC Valve',
    description:
      'Explore the PDC Combustion Valve Series 22 Damper and Control Valve, including verified size, temperature, construction, and application information.',
    canonicalUrl: 'https://www.pdcvalve.com/products/butterfly-damper-valves/combustion-valve',
    noIndex: false,
    openGraph: {
      title: 'Combustion Valve Series 22 Damper and Control Valve | PDC Valve',
      description:
        'Explore the PDC Combustion Valve Series 22 Damper and Control Valve, including verified size, temperature, construction, and application information.',
    },
  },
};
