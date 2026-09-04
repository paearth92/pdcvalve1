import type { CompanyPageContent } from '@/types/content';
import type { NavLink } from '@/types/site';

/**
 * COMPANY CONTENT SOURCE OF TRUTH
 *
 * This file intentionally uses only claims supported by the current public
 * PDC website (pdcvalve.com), principally:
 * - /company/about/
 * - /markets/chemical/
 * - current product / market pages where noted
 *
 * Do not add plant capabilities, certifications, equipment, locations, or
 * process claims here unless PDC has confirmed them or they are published on
 * the current website.
 */

export const companyNav: NavLink[] = [
  { label: 'About PDC', href: '/company/about' },
  { label: 'Engineering Support', href: '/company/engineering' },
  { label: 'Manufacturing', href: '/company/manufacturing' },
  { label: 'Quality & Compliance', href: '/company/quality' },
  { label: 'Find PDC', href: '/company/location' },
];

export type CompanyFact = {
  value: string;
  label: string;
  detail?: string;
};

export const companyFacts: Record<string, CompanyFact[]> = {
  about: [
    { value: '1970', label: 'Founded' },
    { value: '300+', label: 'Casting patterns' },
    { value: '10', label: 'Core product lines' },
    { value: '2', label: 'Published facility locations' },
  ],
  engineering: [
    { value: 'Sales + Engineering', label: 'Application support' },
    { value: 'Custom', label: 'Valve modifications' },
    { value: 'Custom', label: 'Actuation packages' },
    { value: 'Application-specific', label: 'Material recommendations' },
  ],
  manufacturing: [
    { value: 'In-house', label: 'Machining' },
    { value: '300+', label: 'Casting patterns' },
    { value: '10', label: 'Core product lines' },
    { value: 'Large', label: 'Valve & actuator inventory' },
  ],
  quality: [
    { value: 'ISO', label: '9001:2015 certified' },
    { value: 'AIS', label: 'American Iron and Steel compliance' },
    { value: 'Engineered', label: 'Valve modifications' },
    { value: 'Integrated', label: 'Valve assemblies' },
  ],
};

const aboutPage: CompanyPageContent = {
  slug: 'about',
  title: 'About PDC',
  eyebrow: 'Process Development & Control LLC',
  heroTitle: 'Customized Flow Control Solutions Since 1970',
  heroDescription:
    'PDC is a privately held manufacturer of high-quality flow control components, serving a global customer base from facilities in Pittsburgh, USA, and Beijing, China.',
  overview:
    'Founded in 1970, Process Development & Control LLC (PDC) manufactures valves, actuators, and custom flow control components for industrial applications. PDC combines a broad product portfolio with customization, engineering support, inventory, and in-house machining.',
  overviewParagraphs: [
    'Founded in 1970, Process Development & Control LLC (PDC) is a privately held company specializing in the manufacture of high-quality flow control components.',
    'PDC serves a global customer base from facilities in Pittsburgh, USA, and Beijing, China, with a portfolio spanning butterfly valves, check valves, pneumatic, electric, and electro-hydraulic actuators, plus custom flow control components.',
  ],
  sections: [
    {
      heading: 'A Broad Flow Control Portfolio',
      eyebrow: 'Products',
      body:
        'PDC supports a wide range of valve and actuation requirements with standard products and configurable options designed around application needs.',
      items: [
        'Butterfly valves',
        'Check valves',
        'Pneumatic actuators',
        'Electric actuators',
        'Electro-hydraulic actuators',
        'Custom flow control components',
      ],
    },
    {
      heading: 'Built for Configuration',
      eyebrow: 'Product Range',
      body:
        'PDC publishes an inventory of more than 300 casting patterns, along with flame-cut body variations, supporting ten core product lines. A wide range of seating options, bracket configurations, and actuator styles helps match products to specific applications.',
      items: [
        '300+ casting patterns',
        'Flame-cut body variations',
        'Ten core product lines',
        'Multiple seating options',
        'Bracket configuration choices',
        'Multiple actuator styles',
      ],
      dark: true,
    },
    {
      heading: 'Customization & Customer Support',
      eyebrow: 'Working With PDC',
      body:
        'PDC supports customer-specific requirements through engineered valve modifications and customized actuation packages. Sales and Engineering teams assist with technical inquiries, application evaluation, and product selection.',
      items: [
        'Engineered valve modifications',
        'Customized actuation packages',
        'Technical inquiry support',
        'Application evaluation',
        'Product selection assistance',
        'Fully integrated valve assemblies',
      ],
    },
    {
      heading: 'Inventory, Machining & Turnaround',
      eyebrow: 'Supply Support',
      body:
        'PDC states that it maintains a large inventory of valves and actuators to support short lead times and fast turnaround. In-house machining capabilities also allow PDC to supply fully integrated valve assemblies from a single source.',
    },
  ],
  featureCards: [
    {
      iconSlug: 'portfolio',
      title: 'Valves & Actuators',
      description:
        'Butterfly valves, check valves, pneumatic, electric, and electro-hydraulic actuators are part of PDC’s published portfolio.',
    },
    {
      iconSlug: 'custom',
      title: 'Custom Flow Control',
      description:
        'PDC supports engineered valve modifications, custom flow control components, and customized actuation packages.',
    },
    {
      iconSlug: 'support',
      title: 'Sales & Engineering Support',
      description:
        'PDC teams assist with technical inquiries, application evaluation, and product selection.',
    },
    {
      iconSlug: 'machining',
      title: 'In-House Machining',
      description:
        'Published in-house machining capabilities support integrated valve assemblies and responsive production.',
    },
    {
      iconSlug: 'inventory',
      title: 'Inventory for Turnaround',
      description:
        'A large inventory of valves and actuators is maintained to support short lead times and fast turnaround.',
    },
    {
      iconSlug: 'quality',
      title: 'Certified & Compliant',
      description:
        'PDC publishes ISO 9001:2015 certification and AIS (American Iron and Steel) compliance.',
    },
  ],
  seo: {
    title: 'About PDC | Process Development & Control LLC',
    description:
      'Founded in 1970, PDC manufactures valves, actuators, and custom flow control components with engineering support, in-house machining, and global reach.',
    canonicalUrl: 'https://pdcvalve.com/company/about',
    noIndex: false,
    openGraph: {
      title: 'About PDC | Process Development & Control LLC',
      description:
        'Customized flow control solutions, engineering support, and in-house machining from PDC.',
    },
  },
};

const engineeringPage: CompanyPageContent = {
  slug: 'engineering',
  title: 'Engineering Support',
  eyebrow: 'Application Support',
  heroTitle: 'Engineering Support Around the Application',
  heroDescription:
    'PDC Sales and Engineering teams support technical inquiries, application evaluation, product selection, custom valve modifications, and actuation packages.',
  overview:
    'PDC’s published engineering support is practical and application-focused: help evaluating the service, selecting products, configuring the valve and actuator package, and supplying technical documentation where applicable.',
  overviewParagraphs: [
    'PDC’s Sales and Engineering teams assist customers with technical inquiries, application evaluation, and product selection.',
    'When a standard configuration is not the right fit, PDC supports engineered valve modifications, customized actuation packages, and application-specific configuration choices.',
  ],
  sections: [
    {
      heading: 'Application Evaluation & Product Selection',
      eyebrow: 'Specify',
      body:
        'PDC supports customers in evaluating the application and selecting an appropriate valve, actuator, or integrated assembly. The published product range covers control, isolation, and automation requirements across industrial markets.',
      items: [
        'Technical inquiry support',
        'Application evaluation',
        'Valve product selection',
        'Actuator product selection',
        'Integrated valve and actuator assemblies',
      ],
    },
    {
      heading: 'Configuration & Customization',
      eyebrow: 'Configure',
      body:
        'PDC’s product offering includes multiple seating options, bracket configurations, actuator styles, and engineered modifications. Customized actuation packages can be developed around customer-specific requirements.',
      items: [
        'Engineered valve modifications',
        'Customized actuation packages',
        'Seating option selection',
        'Bracket and mounting configurations',
        'Actuator style selection',
        'Custom linkage systems where applicable',
      ],
      dark: true,
    },
    {
      heading: 'Technical Documentation & Recommendations',
      eyebrow: 'Support',
      body:
        'PDC’s current market content describes engineering support that can include dimensional drawings, installation and maintenance manuals, custom linkage systems, and application-specific material recommendations.',
      items: [
        'Dimensional drawings',
        'Installation and maintenance manuals',
        'Application-specific material recommendations',
        'Custom linkage systems',
      ],
    },
    {
      heading: 'Product Technologies Supported',
      eyebrow: 'Portfolio',
      body:
        'Engineering support spans PDC’s published valve and actuation portfolio, including butterfly damper valves, butterfly valves, check valves, pneumatic actuators, electric actuators, and electro-hydraulic actuators.',
    },
  ],
  featureCards: [
    {
      iconSlug: 'evaluation',
      title: 'Application Evaluation',
      description:
        'Support for technical inquiries and evaluating the operating application before product selection.',
    },
    {
      iconSlug: 'selection',
      title: 'Product Selection',
      description:
        'Assistance selecting valves, actuators, and configurations from PDC’s published product portfolio.',
    },
    {
      iconSlug: 'custom',
      title: 'Custom Configuration',
      description:
        'Engineered valve modifications and customized actuation packages for customer-specific requirements.',
    },
    {
      iconSlug: 'drawing',
      title: 'Dimensional Drawings',
      description:
        'Engineering support can include dimensional drawings for application and installation planning.',
    },
    {
      iconSlug: 'materials',
      title: 'Material Recommendations',
      description:
        'Application-specific material recommendations are listed among PDC’s published engineering support services.',
    },
    {
      iconSlug: 'manual',
      title: 'Technical Manuals',
      description:
        'Installation and maintenance manuals support product integration and ongoing service.',
    },
  ],
  seo: {
    title: 'Engineering Support | PDC Valve & Actuators',
    description:
      'PDC supports application evaluation, product selection, engineered valve modifications, custom actuation packages, drawings, manuals, and material recommendations.',
    canonicalUrl: 'https://pdcvalve.com/company/engineering',
    noIndex: false,
    openGraph: {
      title: 'Engineering Support | PDC Valve & Actuators',
      description:
        'Application-focused engineering support for PDC valves, actuators, and integrated assemblies.',
    },
  },
};

const manufacturingPage: CompanyPageContent = {
  slug: 'manufacturing',
  title: 'Manufacturing',
  eyebrow: 'Manufacturing Capability',
  heroTitle: 'Manufacturing Built for Product Variety',
  heroDescription:
    'PDC combines in-house machining, a broad pattern inventory, configurable product options, and valve-and-actuator inventory to support custom and integrated flow control assemblies.',
  overview:
    'The current PDC website specifically identifies in-house machining as a manufacturing capability. It also publishes a broad inventory of casting patterns and flame-cut body variations, plus a large stock of valves and actuators used to support short lead times and fast turnaround.',
  overviewParagraphs: [
    'PDC’s current public manufacturing claims center on in-house machining, product variety, customization, inventory, and integrated valve assemblies.',
    'The company publishes more than 300 casting patterns and flame-cut body variations supporting ten core product lines, with multiple seating, bracket, and actuator configuration options.',
  ],
  sections: [
    {
      heading: 'In-House Machining',
      eyebrow: 'Core Capability',
      body:
        'PDC identifies in-house machining as a key capability. This supports customization and allows PDC to act as a single-source supplier for fully integrated valve assemblies.',
      items: [
        'In-house machining capability',
        'Support for engineered valve modifications',
        'Integrated valve assemblies',
        'Single-source valve and actuation packages',
      ],
    },
    {
      heading: 'Patterns, Bodies & Product Variation',
      eyebrow: 'Range',
      body:
        'PDC publishes an inventory of more than 300 casting patterns along with flame-cut body variations. These support ten core product lines and a broad range of configuration choices.',
      items: [
        '300+ casting patterns',
        'Flame-cut body variations',
        'Ten core product lines',
        'Multiple seating options',
        'Bracket configuration choices',
        'Multiple actuator styles',
      ],
      dark: true,
    },
    {
      heading: 'Inventory & Turnaround',
      eyebrow: 'Responsiveness',
      body:
        'PDC states that it maintains a large inventory of valves and actuators to support short lead times and fast turnaround. That inventory works alongside in-house machining and configuration capability when customer requirements call for an integrated assembly.',
    },
    {
      heading: 'Custom & Integrated Assemblies',
      eyebrow: 'Assembly',
      body:
        'PDC supports customized actuation packages and engineered valve modifications, with seating, bracket, and actuator choices used to tailor assemblies to the application.',
      items: [
        'Customized actuation packages',
        'Engineered valve modifications',
        'Seating configuration options',
        'Bracket configuration options',
        'Actuator style options',
      ],
    },
  ],
  featureCards: [
    {
      iconSlug: 'machining',
      title: 'In-House Machining',
      description:
        'A published PDC capability supporting customization and fully integrated valve assemblies.',
    },
    {
      iconSlug: 'patterns',
      title: '300+ Casting Patterns',
      description:
        'A broad pattern inventory supports product variety across ten published core product lines.',
    },
    {
      iconSlug: 'variation',
      title: 'Flame-Cut Variations',
      description:
        'Flame-cut body variations expand the range of configurations available for application requirements.',
    },
    {
      iconSlug: 'inventory',
      title: 'Valve & Actuator Inventory',
      description:
        'PDC states that it maintains a large inventory to support short lead times and fast turnaround.',
    },
    {
      iconSlug: 'assembly',
      title: 'Integrated Assemblies',
      description:
        'In-house machining helps PDC operate as a single-source supplier for fully integrated valve assemblies.',
    },
    {
      iconSlug: 'custom',
      title: 'Configurable Packages',
      description:
        'Seating options, brackets, actuator styles, and custom actuation packages support application-specific builds.',
    },
  ],
  seo: {
    title: 'Manufacturing | PDC Valve & Actuators',
    description:
      'PDC manufacturing capabilities include in-house machining, 300+ casting patterns, flame-cut body variations, inventory, and integrated valve assemblies.',
    canonicalUrl: 'https://pdcvalve.com/company/manufacturing',
    noIndex: false,
    openGraph: {
      title: 'Manufacturing | PDC Valve & Actuators',
      description:
        'In-house machining, configurable product options, and inventory for responsive integrated flow control assemblies.',
    },
  },
};

const qualityPage: CompanyPageContent = {
  slug: 'quality',
  title: 'Quality & Compliance',
  eyebrow: 'Quality',
  heroTitle: 'Certified Quality. Published Compliance.',
  heroDescription:
    'PDC publishes ISO 9001:2015 certification and AIS (American Iron and Steel) compliance as part of its commitment to high-quality flow control components.',
  overview:
    'The current PDC website identifies ISO 9001:2015 certification and AIS compliance as its company-level quality and compliance credentials. PDC also describes customization and manufacturing capability as supporting long-term product reliability.',
  overviewParagraphs: [
    'PDC is ISO 9001:2015 certified and publishes AIS (American Iron and Steel) compliance.',
    'Across its current market content, PDC connects ISO certification with its commitment to quality management, consistent quality, and continuous improvement.',
  ],
  sections: [
    {
      heading: 'ISO 9001:2015',
      eyebrow: 'Certification',
      body:
        'PDC’s current website identifies the company as ISO 9001:2015 certified. This certification is presented across the site as part of PDC’s commitment to quality management and consistent product performance.',
    },
    {
      heading: 'AIS Compliance',
      eyebrow: 'Compliance',
      body:
        'PDC also publishes AIS compliance under the American Iron and Steel requirements. For project-specific compliance questions or documentation needs, customers should confirm requirements directly with PDC during specification or quotation.',
      dark: true,
    },
    {
      heading: 'Quality Through Configuration',
      eyebrow: 'Application Fit',
      body:
        'PDC emphasizes tailoring flow control solutions to customer-specific needs through engineered valve modifications, customized actuation packages, and product configuration choices. The goal stated by PDC is dependable performance and long-term reliability.',
      items: [
        'Engineered valve modifications',
        'Customized actuation packages',
        'Application evaluation and product selection support',
        'Integrated valve assemblies',
      ],
    },
  ],
  featureCards: [
    {
      iconSlug: 'iso',
      title: 'ISO 9001:2015',
      description:
        'PDC is published as ISO 9001:2015 certified on its current website.',
    },
    {
      iconSlug: 'ais',
      title: 'AIS Compliance',
      description:
        'American Iron and Steel compliance is listed among PDC’s company credentials.',
    },
    {
      iconSlug: 'custom',
      title: 'Application-Focused Configuration',
      description:
        'Engineered modifications and custom actuation packages help match assemblies to customer requirements.',
    },
  ],
  seo: {
    title: 'Quality & Compliance | PDC Valve & Actuators',
    description:
      'PDC publishes ISO 9001:2015 certification and AIS compliance for its flow control products and manufacturing operations.',
    canonicalUrl: 'https://pdcvalve.com/company/quality',
    noIndex: false,
    openGraph: {
      title: 'Quality & Compliance | PDC Valve & Actuators',
      description:
        'ISO 9001:2015 certification, AIS compliance, and application-focused product configuration from PDC.',
    },
  },
};

export const companyPageContent: CompanyPageContent[] = [
  aboutPage,
  engineeringPage,
  manufacturingPage,
  qualityPage,
];

export function getCompanyPageContent(
  slug: string,
): CompanyPageContent | undefined {
  return companyPageContent.find((p) => p.slug === slug);
}