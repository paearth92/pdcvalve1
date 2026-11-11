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
    { value: '1970', label: 'Established', detail: 'More than five decades supporting industrial flow-control applications.' },
    { value: 'Manual', label: 'In-house machining', detail: 'Milling, drilling, turning, and boring.' },
    { value: 'ISO', label: '9001:2015 certified', detail: 'A certified quality management system.' },
    { value: 'Custom', label: 'Assemblies', detail: 'Valves, actuators, brackets, couplings, linkages, controls, and accessories.' },
  ],
  engineering: [
    { value: 'Sales + Engineering', label: 'Application support' },
    { value: 'Custom', label: 'Valve modifications' },
    { value: 'Custom', label: 'Actuation packages' },
    { value: 'Application-specific', label: 'Material recommendations' },
  ],
  manufacturing: [
    { value: 'In-house', label: 'Machining' },
    { value: '10', label: 'Core product lines' },
    { value: 'Custom', label: 'Valve assemblies' },
    { value: 'Integrated', label: 'Actuation packages' },
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
  heroTitle: 'Customized Flow Control Since 1970',
  heroDescription:
    'Established in 1970, Process Development & Control, LLC provides valves, actuators, custom configurations, and application support for industrial flow-control systems. From standard products to application-specific valve and actuator assemblies, PDC combines product knowledge, in-house capability, and technical support to help customers solve demanding flow-control requirements.',
  overview:
    'Founded in 1970, Process Development & Control LLC (PDC) manufactures valves, actuators, and custom flow control components for industrial applications. PDC combines a broad product portfolio with customization, engineering support, inventory, and in-house machining.',
  overviewParagraphs: [
    'Process Development & Control, LLC is an industrial valve and actuation company headquartered in Coraopolis, Pennsylvania, just outside Pittsburgh.',
    'PDC supports customers with industrial valves, actuators, valve automation, and custom flow-control assemblies across a wide range of applications. Its offerings include butterfly damper valves, butterfly valves, ball valves, gate valves, and other application-specific valve solutions that can be paired with pneumatic, electric, and other actuation packages.',
    'Standard products can be configured with different materials, seating options, shaft arrangements, actuators, brackets, couplings, linkages, controls, and accessories to suit application requirements.',
  ],
  sections: [
    {
      heading: 'Products',
      eyebrow: 'Products',
      body:
        'PDC supports a broad range of industrial flow-control applications through configurable valve and actuator products.',
      items: [
        'Butterfly damper valves',
        'Butterfly valves',
        'Ball valves and gate valves',
        'Pneumatic actuators',
        'Electric actuators',
        'Valve automation packages and custom assemblies',
      ],
    },
    {
      heading: 'More Than an Off-the-Shelf Product',
      eyebrow: 'Product Range',
      body:
        'Many applications require more than selecting a valve from a catalog. PDC supports application-specific configurations to match operating and installation requirements.',
      items: [
        'Material and seat options',
        'Multiple shaft configurations',
        'Manual, pneumatic, and electric actuation',
        'Custom brackets, couplings, and linkage systems',
        'Solenoids, limit switches, positioners, and controls',
        'Engineered modifications when required',
      ],
      dark: true,
    },
    {
      heading: 'Sales, Engineering & Application Support',
      eyebrow: 'Working With PDC',
      body:
        'Most customer inquiries begin with PDC Sales, which assists with product selection, quotations, availability, and general application requirements. Engineering supports additional technical review of operating conditions, materials, actuation, drawings, customization, and non-standard requirements when needed.',
      items: [
        'Product selection and availability',
        'Operating-condition review',
        'Materials and actuation',
        'Drawings and technical documentation',
        'Customization and non-standard requirements',
      ],
    },
    {
      heading: 'Machining, Assembly & Customization',
      eyebrow: 'In-House Capability',
      body:
        'PDC performs manual machining, valve assembly, actuator mounting, accessory integration, painting, dimensional inspection, and selected testing in-house to support standard and application-specific packages.',
      items: [
        'Milling, drilling, lathe work, and boring',
        'Valve bodies, discs, brackets, couplings, and assembly components',
        'Actuator mounting and accessory integration',
        'Painting, inspection, and selected testing',
      ],
    },
  ],
  featureCards: [
    {
      iconSlug: 'portfolio',
      title: 'Product Knowledge',
      description:
        'Butterfly and damper valves, ball and gate valves, pneumatic and electric actuators, and flow-control assemblies support industrial applications.',
    },
    {
      iconSlug: 'custom',
      title: 'Custom Flow Control',
      description:
        'PDC supports engineered valve modifications, custom flow control components, and customized actuation packages.',
    },
    {
      iconSlug: 'support',
      title: 'Application Support',
      description:
        'Sales and Engineering work together to evaluate operating conditions, product selection, materials, actuation, accessories, drawings, and custom requirements.',
    },
    {
      iconSlug: 'machining',
      title: 'In-House Machining',
      description:
        'Published in-house machining capabilities support integrated valve assemblies and responsive production.',
    },
    {
      iconSlug: 'patterns',
      title: 'Assembly & Integration',
      description:
        'PDC assembles valves, actuators, accessories, and controls into configurations for customer applications.',
    },
    {
      iconSlug: 'quality',
      title: 'Quality',
      description:
        'PDC operates under an ISO 9001:2015 certified quality management system supporting documented processes, inspection, and consistent product execution.',
    },
  ],
  seo: {
    title: 'About PDC | Process Development & Control LLC',
    description:
    'Founded in 1970, PDC supports industrial flow-control applications with valves, actuators, custom configurations, technical support, and in-house capability.',
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
        'Engineering support spans PDC’s published valve and actuation portfolio, including Damper and Control Valves, butterfly valves, check valves, pneumatic actuators, electric actuators, and electro-hydraulic actuators.',
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
  title: 'Manufacturing & Assembly',
  eyebrow: 'Manufacturing Capability',
  heroTitle: 'Manufacturing & Assembly',
  heroDescription:
    'PDC combines in-house manual machining, valve assembly, actuator integration, painting, inspection, and customization to support standard and application-specific valve packages.',
  overview:
    'PDC’s manufacturing capabilities bring manual machining, valve and actuator assembly, customization, and inspection together to support standard products and application-specific packages.',
  overviewParagraphs: [
    'PDC combines in-house manual machining, valve assembly, actuator integration, painting, inspection, and customization to support standard and application-specific valve packages.',
    'PDC does not cast valve bodies in-house.',
  ],
  sections: [
    {
      heading: 'In-House Machining',
      eyebrow: 'Machining',
      body:
        'PDC performs manual machining operations including milling, drilling, lathe work, and boring. Typical components machined or modified in-house include valve bodies, discs, brackets, couplings, and related assembly components.',
      items: [
        'Valve bodies, discs, brackets, couplings, and related assembly components',
        'PDC does not cast in-house',
        'Broad access to casting patterns and stocked cast components',
      ],
    },
    {
      heading: 'Valve & Actuator Assembly',
      eyebrow: 'Integration',
      body:
        'PDC assembles valve and actuator packages in-house, including:',
      items: [
        'Valve assembly',
        'Pneumatic and electric actuator mounting',
        'Brackets, couplings, and linkages',
        'Solenoids, limit switches, positioners, and controls',
        'Manual operators and accessories',
        'Painting and final assembly',
      ],
      dark: true,
    },
    {
      heading: 'Custom Configuration',
      eyebrow: 'Application Fit',
      body:
        'PDC supports non-standard and application-specific assemblies when a standard catalog configuration does not meet the requirement. Custom work may include special actuator mounting, brackets, couplings, linkage systems, shaft arrangements, multi-valve configurations, and application-specific controls.',
      items: [
        'Special mounting and shaft arrangements',
        'Custom brackets, couplings, and linkages',
        'Multi-valve packages and controls',
      ],
    },
    {
      heading: 'Inspection & Production Support',
      eyebrow: 'Quality',
      body:
        'Dimensional inspections are performed against applicable drawings and specifications, and actuator operation and accessory functionality are checked as appropriate during assembly. Manufacturing and assembly activities operate within PDC’s ISO 9001:2015 quality management system.',
      items: [
        'Dimensional checks against drawings and specifications',
        'Actuator and accessory function checks',
        'Inventory of selected castings, actuators, accessories, valve components, and other commonly used production materials',
      ],
    },
    {
      heading: 'A Flexible Assembly Shop',
      eyebrow: 'How We Work',
      bodyParagraphs: [
        'PDC’s strength is not mass production or high-volume automated machining.',
        'It is the ability to combine product knowledge, manual machining, valve assembly, actuator integration, customization, and inspection under one roof.',
        'That flexibility allows PDC to support standard products as well as application-specific valve and actuator assemblies.',
      ],
      dark: true,
    },
  ],
  featureCards: [
    {
      iconSlug: 'machining',
      title: 'In-House Machining',
      description:
        'Manual milling, drilling, lathe work, and boring support in-house component machining and modification.',
    },
    {
      iconSlug: 'assembly',
      title: 'Assembly & Integration',
      description:
        'PDC assembles valves, actuators, brackets, couplings, linkages, controls, and accessories into application-specific configurations.',
    },
    {
      iconSlug: 'inventory',
      title: 'Valve & Actuator Inventory',
      description:
        'Selected castings, actuators, accessories, valve components, and commonly used production materials support ongoing assembly needs.',
    },
  ],
  seo: {
    title: 'Manufacturing & Assembly | PDC Valve & Actuators',
    description:
      'PDC manufacturing capabilities include manual machining, valve and actuator assembly, application-specific configurations, painting, and inspection.',
    canonicalUrl: 'https://pdcvalve.com/company/manufacturing',
    noIndex: false,
    openGraph: {
      title: 'Manufacturing & Assembly | PDC Valve & Actuators',
      description:
        'In-house machining, actuator integration, custom configurations, and inspection for industrial valve packages.',
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
