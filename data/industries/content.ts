import type { IndustryContent } from '@/types/content';
import type { NavLink } from '@/types/site';

/**
 * Industries section navigation.
 * Reused across all industry pages. Active page highlighted by IndustryNav.
 */
export const industryNav: NavLink[] = [
  { label: 'Automotive', href: '/industries/automotive' },
  { label: 'Chemical', href: '/industries/chemical' },
  { label: 'Downstream Hydrocarbons', href: '/industries/downstream-hydrocarbons' },
  { label: 'Food & Beverage', href: '/industries/food-and-beverage' },
  { label: 'Energy & Utilities', href: '/industries/energy-and-utilities' },
  { label: 'Life Sciences', href: '/industries/life-sciences' },
  { label: 'Mining & Metals', href: '/industries/mining-metals' },
  { label: 'Water & Wastewater', href: '/industries/water-and-wastewater' },
  { label: 'OEM', href: '/industries/oem' },
  { label: 'Marine', href: '/industries/marine' },
  { label: 'Oil & Gas', href: '/industries/oil-and-gas' },
  { label: 'Power Generation', href: '/industries/power-generation' },
  { label: 'Pulp & Paper', href: '/industries/pulp-and-paper' },
];

/**
 * Canonical industry content registry.
 *
 * SOURCE NOTES (private):
 * - Content is application-focused and conservative.
 * - No customer names, project history, installation counts, market share,
 *   performance statistics, certifications, case studies, pressure/temperature
 *   capabilities, or regulatory approvals are fabricated.
 * - Product family slugs reference canonical family routes only.
 */

const automotive: IndustryContent = {
  name: 'Automotive',
  slug: 'automotive',
  route: '/industries/automotive',
  eyebrow: 'Industries',
  heroTitle: 'Flow Control for Automotive Manufacturing',
  heroDescription:
    'PDC valves and actuators support flow-control applications across automotive production, assembly support systems, plant utilities, and manufacturing environments.',
  shortDescription:
    'Flow-control solutions for automotive manufacturing, plant utilities, and production support systems.',
  overview:
    'Automotive manufacturing facilities rely on flow-control components for plant utilities, process water, compressed air, paint operations, and equipment support systems. PDC valves and actuators are used in these supporting utility and process applications throughout the production environment.',
  overviewParagraphs: [
    'Automotive manufacturing facilities rely on flow-control components for plant utilities, process water, compressed air, paint operations, and equipment support systems.',
    'PDC valves and actuators are used in these supporting utility and process applications throughout the production environment, helping maintain repeatable process control and production uptime.',
  ],
  challenges: [
    'Repeatable process control across production lines',
    'Production uptime and system reliability',
    'Utility management for plant support systems',
    'Maintenance access in production environments',
  ],
  applications: [
    'Plant utility systems',
    'Process water',
    'Compressed air',
    'Paint and finishing support systems',
    'Equipment skids',
    'Automated manufacturing systems',
  ],
  productFamilies: [
    'butterfly-valves',
    'butterfly-damper-valves',
    'pneumatic-actuators',
    'electric-actuators',
  ],
  images: {
    hero: {
      src: 'https://images.pexels.com/photos/19233057/pexels-photo-19233057.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      alt: 'Automated robotic arms assembling vehicles on a factory production line',
      kind: 'hero',
    },
    thumbnail: {
      src: 'https://images.pexels.com/photos/19233057/pexels-photo-19233057.jpeg?auto=compress&cs=tinysrgb&h=350&w=500',
      alt: 'Automated robotic arms assembling vehicles on a factory production line',
      kind: 'thumbnail',
    },
  },
  seo: {
    title: 'Automotive Manufacturing | PDC Valve & Actuators',
    description:
      'Flow-control valves and actuators for automotive manufacturing, plant utilities, process water, compressed air, and production support systems.',
    canonicalUrl: 'https://www.pdcvalve.com/industries/automotive',
    noIndex: false,
    openGraph: {
      title: 'Automotive Manufacturing | PDC Valve & Actuators',
      description:
        'Flow-control valves and actuators for automotive manufacturing, plant utilities, and production support systems.',
    },
  },
};

const chemical: IndustryContent = {
  name: 'Chemical',
  slug: 'chemical',
  route: '/industries/chemical',
  eyebrow: 'Industries',
  heroTitle: 'Flow Control for Chemical Processing',
  heroDescription:
    'PDC valves and actuators support process control, isolation, pressure management, and equipment protection in chemical-processing environments.',
  shortDescription:
    'Flow-control solutions for chemical processing, process control, and utility service.',
  overview:
    'Chemical processing facilities require reliable flow control for process lines, transfer systems, utility service, and equipment protection. PDC valves and actuators are applied in these supporting roles to help manage flow, isolation, and pressure across process and utility systems.',
  overviewParagraphs: [
    'Chemical processing facilities require reliable flow control for process lines, transfer systems, utility service, and equipment protection.',
    'PDC valves and actuators are applied in these supporting roles to help manage flow, isolation, and pressure across process and utility systems.',
  ],
  challenges: [
    'Varying process conditions across production cycles',
    'Chemical compatibility requirements for process media',
    'Reliable shutoff and control for process isolation',
    'Pressure management across process systems',
    'Maintenance planning for continuous operations',
  ],
  applications: [
    'Process lines',
    'Transfer systems',
    'Utility systems',
    'Reactor support systems',
    'Storage and handling systems',
    'Pressure and flow regulation',
  ],
  productFamilies: [
    'butterfly-valves',
    'pneumatic-actuators',
    'electric-actuators',
  ],
  images: {
    hero: {
      src: 'https://images.pexels.com/photos/10666081/pexels-photo-10666081.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      alt: 'Large chemical processing factory with industrial piping and equipment',
      kind: 'hero',
    },
    thumbnail: {
      src: 'https://images.pexels.com/photos/10666081/pexels-photo-10666081.jpeg?auto=compress&cs=tinysrgb&h=350&w=500',
      alt: 'Large chemical processing factory with industrial piping and equipment',
      kind: 'thumbnail',
    },
  },
  seo: {
    title: 'Chemical Processing | PDC Valve & Actuators',
    description:
      'Flow-control valves and actuators for chemical processing — process control, isolation, pressure management, and utility service.',
    canonicalUrl: 'https://www.pdcvalve.com/industries/chemical',
    noIndex: false,
    openGraph: {
      title: 'Chemical Processing | PDC Valve & Actuators',
      description:
        'Flow-control valves and actuators for chemical processing environments.',
    },
  },
};

const downstreamHydrocarbons: IndustryContent = {
  name: 'Downstream Hydrocarbons',
  slug: 'downstream-hydrocarbons',
  route: '/industries/downstream-hydrocarbons',
  eyebrow: 'Industries',
  heroTitle: 'Flow Control for Downstream Hydrocarbon Processing',
  heroDescription:
    'PDC valves and actuators support applications across refining, processing, storage, transfer, terminals, and supporting utility systems.',
  shortDescription:
    'Flow-control solutions for downstream hydrocarbon processing, storage, and transfer.',
  overview:
    'Downstream hydrocarbon facilities — including refineries, processing plants, storage terminals, and transfer stations — require dependable flow control for process piping, utility systems, and equipment isolation. PDC valves and actuators are applied across these process and utility applications.',
  overviewParagraphs: [
    'Downstream hydrocarbon facilities — including refineries, processing plants, storage terminals, and transfer stations — require dependable flow control for process piping, utility systems, and equipment isolation.',
    'PDC valves and actuators are applied across these process and utility applications, supporting pressure management, combustion air control, and equipment protection.',
  ],
  challenges: [
    'Pressure and flow control across process systems',
    'Production continuity and equipment protection',
    'Remote operation for distributed facilities',
    'Maintenance access in processing environments',
  ],
  applications: [
    'Process piping',
    'Storage and transfer',
    'Utility systems',
    'Combustion air',
    'Pressure reduction',
    'Equipment isolation',
  ],
  productFamilies: [
    'butterfly-valves',
    'butterfly-damper-valves',
    'pneumatic-actuators',
    'electric-actuators',
  ],
  images: {
    hero: {
      src: 'https://images.pexels.com/photos/15893881/pexels-photo-15893881.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      alt: 'Refinery towers and process structures against a dusk sky',
      kind: 'hero',
    },
    thumbnail: {
      src: 'https://images.pexels.com/photos/15893881/pexels-photo-15893881.jpeg?auto=compress&cs=tinysrgb&h=350&w=500',
      alt: 'Refinery towers and process structures against a dusk sky',
      kind: 'thumbnail',
    },
  },
  seo: {
    title: 'Downstream Hydrocarbons | PDC Valve & Actuators',
    description:
      'Flow-control valves and actuators for downstream hydrocarbon processing — refining, storage, transfer, terminals, and utility systems.',
    canonicalUrl: 'https://www.pdcvalve.com/industries/downstream-hydrocarbons',
    noIndex: false,
    openGraph: {
      title: 'Downstream Hydrocarbons | PDC Valve & Actuators',
      description:
        'Flow-control valves and actuators for downstream hydrocarbon processing and refining.',
    },
  },
};

const foodAndBeverage: IndustryContent = {
  name: 'Food and Beverage',
  slug: 'food-and-beverage',
  route: '/industries/food-and-beverage',
  eyebrow: 'Industries',
  heroTitle: 'Flow Control for Food and Beverage Processing',
  heroDescription:
    'PDC valves and actuators support process utilities, water, air, heating, cooling, and non-product-contact support systems in food and beverage facilities.',
  shortDescription:
    'Flow-control solutions for food and beverage processing utilities and support systems.',
  overview:
    'Food and beverage processing facilities use flow-control components for process utilities, water systems, compressed air, heating and cooling, and equipment support. PDC valves and actuators are applied in these utility and support system roles.',
  overviewParagraphs: [
    'Food and beverage processing facilities use flow-control components for process utilities, water systems, compressed air, heating and cooling, and equipment support.',
    'PDC valves and actuators are applied in these utility and support system roles, helping maintain process consistency and repeatable operation.',
  ],
  challenges: [
    'Cleanliness in processing environments',
    'Repeatable operation for production consistency',
    'Maintenance access for utility systems',
    'Utility reliability across production cycles',
  ],
  applications: [
    'Process water',
    'Plant utilities',
    'Heating and cooling systems',
    'Compressed air',
    'Equipment skids',
    'Clean-room support systems where applicable',
  ],
  productFamilies: [
    'butterfly-valves',
    'pneumatic-actuators',
    'electric-actuators',
  ],
  images: {
    hero: {
      src: 'https://images.pexels.com/photos/38336747/pexels-photo-38336747.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      alt: 'Automated beverage bottling line with conveyor systems in a processing facility',
      kind: 'hero',
    },
    thumbnail: {
      src: 'https://images.pexels.com/photos/38336747/pexels-photo-38336747.jpeg?auto=compress&cs=tinysrgb&h=350&w=500',
      alt: 'Automated beverage bottling line with conveyor systems in a processing facility',
      kind: 'thumbnail',
    },
  },
  seo: {
    title: 'Food and Beverage Processing | PDC Valve & Actuators',
    description:
      'Flow-control valves and actuators for food and beverage processing — process utilities, water, air, heating, cooling, and support systems.',
    canonicalUrl: 'https://www.pdcvalve.com/industries/food-and-beverage',
    noIndex: false,
    openGraph: {
      title: 'Food and Beverage Processing | PDC Valve & Actuators',
      description:
        'Flow-control valves and actuators for food and beverage processing utilities and support systems.',
    },
  },
};

const energyAndUtilities: IndustryContent = {
  name: 'Energy and Utilities',
  slug: 'energy-and-utilities',
  route: '/industries/energy-and-utilities',
  eyebrow: 'Industries',
  heroTitle: 'Flow Control for Energy and Onsite Utilities',
  heroDescription:
    'PDC valves and actuators support plant utility systems, steam support, water, air, cooling, fuel support, and facility infrastructure.',
  shortDescription:
    'Flow-control solutions for energy and onsite utility systems.',
  overview:
    'Energy and onsite utility systems require reliable flow control for cooling water, compressed air, utility water, heating systems, combustion support, and facility process systems. PDC valves and actuators are used across these plant utility and facility infrastructure applications.',
  overviewParagraphs: [
    'Energy and onsite utility systems require reliable flow control for cooling water, compressed air, utility water, heating systems, combustion support, and facility process systems.',
    'PDC valves and actuators are used across these plant utility and facility infrastructure applications, supporting consistent operation of facility systems.',
  ],
  applications: [
    'Cooling water',
    'Compressed air',
    'Utility water',
    'Heating systems',
    'Combustion support',
    'Facility process systems',
  ],
  productFamilies: [
    'butterfly-valves',
    'butterfly-damper-valves',
    'pneumatic-actuators',
    'electric-actuators',
  ],
  images: {
    hero: {
      src: 'https://images.pexels.com/photos/9889066/pexels-photo-9889066.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      alt: 'Industrial electric power substation at sunset with transmission infrastructure',
      kind: 'hero',
    },
    thumbnail: {
      src: 'https://images.pexels.com/photos/9889066/pexels-photo-9889066.jpeg?auto=compress&cs=tinysrgb&h=350&w=500',
      alt: 'Industrial electric power substation at sunset with transmission infrastructure',
      kind: 'thumbnail',
    },
  },
  seo: {
    title: 'Energy and Utilities | PDC Valve & Actuators',
    description:
      'Flow-control valves and actuators for energy and onsite utilities — cooling water, compressed air, heating, combustion support, and facility systems.',
    canonicalUrl: 'https://www.pdcvalve.com/industries/energy-and-utilities',
    noIndex: false,
    openGraph: {
      title: 'Energy and Utilities | PDC Valve & Actuators',
      description:
        'Flow-control valves and actuators for energy and onsite utility systems.',
    },
  },
};

const lifeSciences: IndustryContent = {
  name: 'Life Sciences',
  slug: 'life-sciences',
  route: '/industries/life-sciences',
  eyebrow: 'Industries',
  heroTitle: 'Flow Control for Life Sciences and Medical Manufacturing',
  heroDescription:
    'PDC valves and actuators support facility utilities, controlled environments, equipment support, clean-room infrastructure, water systems, and air systems.',
  shortDescription:
    'Flow-control solutions for life sciences facility utilities and controlled environments.',
  overview:
    'Life sciences and medical manufacturing facilities rely on flow-control components for facility utilities, controlled environments, equipment support, clean-room infrastructure, water systems, and air systems. PDC valves and actuators are applied in these facility and utility support roles.',
  overviewParagraphs: [
    'Life sciences and medical manufacturing facilities rely on flow-control components for facility utilities, controlled environments, equipment support, clean-room infrastructure, water systems, and air systems.',
    'PDC valves and actuators are applied in these facility and utility support roles, helping maintain consistent operation of controlled environment systems.',
  ],
  applications: [
    'Clean-room support',
    'Process utilities',
    'Facility water',
    'Compressed air',
    'Equipment skids',
    'Heating and cooling',
  ],
  productFamilies: [
    'butterfly-valves',
    'pneumatic-actuators',
    'electric-actuators',
  ],
  images: {
    hero: {
      src: 'https://images.pexels.com/photos/8539059/pexels-photo-8539059.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      alt: 'Scientist in protective equipment working in a pharmaceutical laboratory',
      kind: 'hero',
    },
    thumbnail: {
      src: 'https://images.pexels.com/photos/8539059/pexels-photo-8539059.jpeg?auto=compress&cs=tinysrgb&h=350&w=500',
      alt: 'Scientist in protective equipment working in a pharmaceutical laboratory',
      kind: 'thumbnail',
    },
  },
  seo: {
    title: 'Life Sciences | PDC Valve & Actuators',
    description:
      'Flow-control valves and actuators for life sciences and medical manufacturing — facility utilities, controlled environments, and support systems.',
    canonicalUrl: 'https://www.pdcvalve.com/industries/life-sciences',
    noIndex: false,
    openGraph: {
      title: 'Life Sciences | PDC Valve & Actuators',
      description:
        'Flow-control valves and actuators for life sciences facility utilities and controlled environments.',
    },
  },
};

const miningMetals: IndustryContent = {
  name: 'Mining, Minerals, and Metals',
  slug: 'mining-metals',
  route: '/industries/mining-metals',
  eyebrow: 'Industries',
  heroTitle: 'Flow Control for Mining, Minerals, and Metals',
  heroDescription:
    'PDC valves and actuators support process water, air systems, material-processing support, plant utilities, and equipment skids in demanding industrial environments.',
  shortDescription:
    'Flow-control solutions for mining, minerals, and metals processing.',
  overview:
    'Mining, minerals, and metals processing facilities require durable flow-control components for process water, compressed air, plant utilities, material-handling support, and equipment skids. PDC valves and actuators are applied in these demanding industrial environments.',
  overviewParagraphs: [
    'Mining, minerals, and metals processing facilities require durable flow-control components for process water, compressed air, plant utilities, material-handling support, and equipment skids.',
    'PDC valves and actuators are applied in these demanding industrial environments, supporting plant uptime and equipment operation.',
  ],
  challenges: [
    'Abrasive environments in material processing',
    'Heavy-duty operation requirements',
    'Plant uptime across remote equipment',
    'Maintenance access in industrial settings',
  ],
  applications: [
    'Process water',
    'Compressed air',
    'Plant utilities',
    'Material-handling support',
    'Equipment skids',
    'Ventilation and combustion support',
  ],
  productFamilies: [
    'butterfly-valves',
    'butterfly-damper-valves',
    'pneumatic-actuators',
    'electric-actuators',
  ],
  images: {
    hero: {
      src: 'https://images.pexels.com/photos/17146231/pexels-photo-17146231.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      alt: 'Excavators working in a rocky quarry under a cloudy sky',
      kind: 'hero',
    },
    thumbnail: {
      src: 'https://images.pexels.com/photos/17146231/pexels-photo-17146231.jpeg?auto=compress&cs=tinysrgb&h=350&w=500',
      alt: 'Excavators working in a rocky quarry under a cloudy sky',
      kind: 'thumbnail',
    },
  },
  seo: {
    title: 'Mining, Minerals, and Metals | PDC Valve & Actuators',
    description:
      'Flow-control valves and actuators for mining, minerals, and metals — process water, air systems, plant utilities, and material-processing support.',
    canonicalUrl: 'https://www.pdcvalve.com/industries/mining-metals',
    noIndex: false,
    openGraph: {
      title: 'Mining, Minerals, and Metals | PDC Valve & Actuators',
      description:
        'Flow-control valves and actuators for mining, minerals, and metals processing.',
    },
  },
};

const waterAndWastewater: IndustryContent = {
  name: 'Water and Wastewater',
  slug: 'water-and-wastewater',
  route: '/industries/water-and-wastewater',
  eyebrow: 'Industries',
  heroTitle: 'Flow Control for Water and Wastewater Systems',
  heroDescription:
    'PDC valves and actuators support treatment systems, distribution support, process water, pumping systems, isolation, backflow prevention, and automated operation.',
  shortDescription:
    'Flow-control solutions for water and wastewater treatment and distribution.',
  overview:
    'Water and wastewater systems require reliable flow control for treatment processes, pumping stations, distribution support, isolation service, and backflow prevention. PDC valves and actuators — including automated valve packages — are applied across these treatment and distribution applications.',
  overviewParagraphs: [
    'Water and wastewater systems require reliable flow control for treatment processes, pumping stations, distribution support, isolation service, and backflow prevention.',
    'PDC valves and actuators — including automated valve packages — are applied across these treatment and distribution applications, supporting both manual and automated valve control.',
  ],
  applications: [
    'Treatment systems',
    'Pumping stations',
    'Process water',
    'Utility water',
    'Isolation service',
    'Backflow prevention',
    'Automated valve control',
  ],
  productFamilies: [
    'butterfly-valves',
    'pneumatic-actuators',
    'electric-actuators',
  ],
  images: {
    hero: {
      src: 'https://images.pexels.com/photos/12975471/pexels-photo-12975471.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      alt: 'Aerial view of a water treatment plant near a river',
      kind: 'hero',
    },
    thumbnail: {
      src: 'https://images.pexels.com/photos/12975471/pexels-photo-12975471.jpeg?auto=compress&cs=tinysrgb&h=350&w=500',
      alt: 'Aerial view of a water treatment plant near a river',
      kind: 'thumbnail',
    },
  },
  seo: {
    title: 'Water and Wastewater | PDC Valve & Actuators',
    description:
      'Flow-control valves and actuators for water and wastewater — treatment systems, pumping stations, isolation, backflow prevention, and automated valve control.',
    canonicalUrl: 'https://www.pdcvalve.com/industries/water-and-wastewater',
    noIndex: false,
    openGraph: {
      title: 'Water and Wastewater | PDC Valve & Actuators',
      description:
        'Flow-control valves and actuators for water and wastewater treatment and distribution systems.',
    },
  },
};

const oem: IndustryContent = {
  name: 'OEM and Engineered Systems',
  slug: 'oem',
  route: '/industries/oem',
  eyebrow: 'Industries',
  heroTitle: 'Flow Control for OEM and Engineered Systems',
  heroDescription:
    'PDC supports equipment manufacturers, system integrators, packaged systems, skids, and custom application requirements.',
  shortDescription:
    'Flow-control solutions for OEM equipment, engineered systems, and packaged solutions.',
  overview:
    'Original equipment manufacturers, system integrators, and engineered-system builders require flow-control components that integrate into packaged equipment, process skids, burner systems, automated machinery, and custom assemblies. PDC works with OEM customers to support application matching, actuator selection, and custom configurations.',
  overviewParagraphs: [
    'Original equipment manufacturers, system integrators, and engineered-system builders require flow-control components that integrate into packaged equipment, process skids, burner systems, automated machinery, and custom assemblies.',
    'PDC works with OEM customers to support application matching, actuator selection, and custom configurations for specific equipment requirements.',
  ],
  challenges: [
    'Compact integration within equipment packages',
    'Repeatable sourcing for production volumes',
    'Application matching for specific equipment requirements',
    'Actuator selection for torque and control needs',
    'Documentation for equipment submittals',
    'Custom configurations for unique applications',
  ],
  applications: [
    'Packaged equipment',
    'Process skids',
    'Burner systems',
    'Automated machinery',
    'Engineered assemblies',
    'Custom flow-control systems',
  ],
  productFamilies: [
    'butterfly-valves',
    'butterfly-damper-valves',
    'pneumatic-actuators',
    'electric-actuators',
  ],
  images: {
    hero: {
      src: 'https://images.pexels.com/photos/28048720/pexels-photo-28048720.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      alt: 'Close-up of heavy industrial rotor machinery in a workshop',
      kind: 'hero',
    },
    thumbnail: {
      src: 'https://images.pexels.com/photos/28048720/pexels-photo-28048720.jpeg?auto=compress&cs=tinysrgb&h=350&w=500',
      alt: 'Close-up of heavy industrial rotor machinery in a workshop',
      kind: 'thumbnail',
    },
  },
  seo: {
    title: 'OEM and Engineered Systems | PDC Valve & Actuators',
    description:
      'Flow-control valves and actuators for OEM equipment manufacturers, system integrators, packaged systems, skids, and custom engineered solutions.',
    canonicalUrl: 'https://www.pdcvalve.com/industries/oem',
    noIndex: false,
    openGraph: {
      title: 'OEM and Engineered Systems | PDC Valve & Actuators',
      description:
        'Flow-control valves and actuators for OEM equipment, engineered systems, and packaged solutions.',
    },
  },
};

const marine: IndustryContent = {
  name: 'Marine',
  slug: 'marine',
  route: '/industries/marine',
  eyebrow: 'Industries',
  heroTitle: 'Flow Control for Marine Applications',
  heroDescription:
    'PDC valves and actuators support onboard utility systems, water systems, ventilation, machinery support, and equipment integration.',
  shortDescription:
    'Flow-control solutions for marine utility, ventilation, and machinery support systems.',
  overview:
    'Marine vessels and offshore platforms require flow-control components for onboard utility systems, cooling water, ventilation, machinery support, and equipment integration. PDC valves and actuators are applied in these shipboard and offshore support applications.',
  overviewParagraphs: [
    'Marine vessels and offshore platforms require flow-control components for onboard utility systems, cooling water, ventilation, machinery support, and equipment integration.',
    'PDC valves and actuators are applied in these shipboard and offshore support applications, supporting automated flow control for utility and machinery systems.',
  ],
  applications: [
    'Cooling water',
    'Utility water',
    'Ventilation',
    'Machinery support',
    'Equipment skids',
    'Automated flow control',
  ],
  productFamilies: [
    'butterfly-valves',
    'butterfly-damper-valves',
    'pneumatic-actuators',
    'electric-actuators',
  ],
  images: {
    hero: {
      src: 'https://images.pexels.com/photos/11139595/pexels-photo-11139595.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      alt: 'Offshore platform with cranes in a harbor at sunset',
      kind: 'hero',
    },
    thumbnail: {
      src: 'https://images.pexels.com/photos/11139595/pexels-photo-11139595.jpeg?auto=compress&cs=tinysrgb&h=350&w=500',
      alt: 'Offshore platform with cranes in a harbor at sunset',
      kind: 'thumbnail',
    },
  },
  seo: {
    title: 'Marine Applications | PDC Valve & Actuators',
    description:
      'Flow-control valves and actuators for marine applications — onboard utility systems, water, ventilation, machinery support, and equipment integration.',
    canonicalUrl: 'https://www.pdcvalve.com/industries/marine',
    noIndex: false,
    openGraph: {
      title: 'Marine Applications | PDC Valve & Actuators',
      description:
        'Flow-control valves and actuators for marine utility, ventilation, and machinery support systems.',
    },
  },
};

const oilAndGas: IndustryContent = {
  name: 'Oil and Gas',
  slug: 'oil-and-gas',
  route: '/industries/oil-and-gas',
  eyebrow: 'Industries',
  heroTitle: 'Flow Control for Oil and Gas Production',
  heroDescription:
    'PDC valves and actuators support upstream production, wellhead systems, produced-fluid control, pressure reduction, process support, and automated operation.',
  shortDescription:
    'Flow-control solutions for oil and gas production and wellhead systems.',
  overview:
    'Oil and gas production facilities require dependable flow control for wellhead systems, produced-fluid regulation, pressure reduction, process piping, and utility systems. PDC valves and actuators are applied across these upstream production applications.',
  overviewParagraphs: [
    'Oil and gas production facilities require dependable flow control for wellhead systems, produced-fluid regulation, pressure reduction, process piping, and utility systems.',
    'PDC valves and actuators are applied across these upstream production applications, supporting both manual and remote operation.',
  ],
  applications: [
    'Wellhead production control',
    'Produced-fluid regulation',
    'Pressure reduction',
    'Process piping',
    'Utility systems',
    'Remote operation',
  ],
  productFamilies: [
    'butterfly-valves',
    'pneumatic-actuators',
    'electric-actuators',
  ],
  images: {
    hero: {
      src: 'https://images.pexels.com/photos/15961091/pexels-photo-15961091.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      alt: 'Offshore oil and gas platform surrounded by open ocean',
      kind: 'hero',
    },
    thumbnail: {
      src: 'https://images.pexels.com/photos/15961091/pexels-photo-15961091.jpeg?auto=compress&cs=tinysrgb&h=350&w=500',
      alt: 'Offshore oil and gas platform surrounded by open ocean',
      kind: 'thumbnail',
    },
  },
  seo: {
    title: 'Oil and Gas Production | PDC Valve & Actuators',
    description:
      'Flow-control valves and actuators for oil and gas production — wellhead systems, produced-fluid control, pressure reduction, and remote operation.',
    canonicalUrl: 'https://www.pdcvalve.com/industries/oil-and-gas',
    noIndex: false,
    openGraph: {
      title: 'Oil and Gas Production | PDC Valve & Actuators',
      description:
        'Flow-control valves and actuators for oil and gas production and wellhead systems.',
    },
  },
};

const powerGeneration: IndustryContent = {
  name: 'Power Generation',
  slug: 'power-generation',
  route: '/industries/power-generation',
  eyebrow: 'Industries',
  heroTitle: 'Flow Control for Power Generation',
  heroDescription:
    'PDC valves and actuators support cooling water, combustion support, plant utilities, air systems, water systems, and automated process control.',
  shortDescription:
    'Flow-control solutions for power generation plant systems and utilities.',
  overview:
    'Power generation facilities require reliable flow control for cooling water, combustion air, utility systems, process water, equipment isolation, and automated process control. PDC valves and actuators are applied across these plant utility and process applications.',
  overviewParagraphs: [
    'Power generation facilities require reliable flow control for cooling water, combustion air, utility systems, process water, equipment isolation, and automated process control.',
    'PDC valves and actuators are applied across these plant utility and process applications, supporting combustion support, cooling systems, and automated flow control.',
  ],
  applications: [
    'Cooling water',
    'Combustion air',
    'Utility systems',
    'Process water',
    'Equipment isolation',
    'Automated flow control',
  ],
  productFamilies: [
    'butterfly-valves',
    'butterfly-damper-valves',
    'pneumatic-actuators',
    'electric-actuators',
  ],
  images: {
    hero: {
      src: 'https://images.pexels.com/photos/16705829/pexels-photo-16705829.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      alt: 'Power plant with cooling towers and electricity pylons',
      kind: 'hero',
    },
    thumbnail: {
      src: 'https://images.pexels.com/photos/16705829/pexels-photo-16705829.jpeg?auto=compress&cs=tinysrgb&h=350&w=500',
      alt: 'Power plant with cooling towers and electricity pylons',
      kind: 'thumbnail',
    },
  },
  seo: {
    title: 'Power Generation | PDC Valve & Actuators',
    description:
      'Flow-control valves and actuators for power generation — cooling water, combustion air, plant utilities, and automated process control.',
    canonicalUrl: 'https://www.pdcvalve.com/industries/power-generation',
    noIndex: false,
    openGraph: {
      title: 'Power Generation | PDC Valve & Actuators',
      description:
        'Flow-control valves and actuators for power generation plant systems and utilities.',
    },
  },
};

const pulpAndPaper: IndustryContent = {
  name: 'Pulp and Paper',
  slug: 'pulp-and-paper',
  route: '/industries/pulp-and-paper',
  eyebrow: 'Industries',
  heroTitle: 'Flow Control for Pulp and Paper Processing',
  heroDescription:
    'PDC valves and actuators support water systems, plant utilities, air systems, process support, drying operations, and equipment integration.',
  shortDescription:
    'Flow-control solutions for pulp and paper processing and plant utilities.',
  overview:
    'Pulp and paper processing facilities require flow-control components for water systems, plant utilities, compressed air, drying and ventilation support, and equipment skids. PDC valves and actuators are applied across these process and utility applications.',
  overviewParagraphs: [
    'Pulp and paper processing facilities require flow-control components for water systems, plant utilities, compressed air, drying and ventilation support, and equipment skids.',
    'PDC valves and actuators are applied across these process and utility applications, supporting automated valve control for plant systems.',
  ],
  applications: [
    'Process water',
    'Plant utilities',
    'Compressed air',
    'Drying and ventilation support',
    'Equipment skids',
    'Automated valve control',
  ],
  productFamilies: [
    'butterfly-valves',
    'butterfly-damper-valves',
    'pneumatic-actuators',
    'electric-actuators',
  ],
  images: {
    hero: {
      src: 'https://images.pexels.com/photos/29257462/pexels-photo-29257462.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      alt: 'Industrial plant facility surrounded by forest',
      kind: 'hero',
    },
    thumbnail: {
      src: 'https://images.pexels.com/photos/29257462/pexels-photo-29257462.jpeg?auto=compress&cs=tinysrgb&h=350&w=500',
      alt: 'Industrial plant facility surrounded by forest',
      kind: 'thumbnail',
    },
  },
  seo: {
    title: 'Pulp and Paper | PDC Valve & Actuators',
    description:
      'Flow-control valves and actuators for pulp and paper processing — water systems, plant utilities, air systems, drying, and equipment integration.',
    canonicalUrl: 'https://www.pdcvalve.com/industries/pulp-and-paper',
    noIndex: false,
    openGraph: {
      title: 'Pulp and Paper | PDC Valve & Actuators',
      description:
        'Flow-control valves and actuators for pulp and paper processing and plant utilities.',
    },
  },
};

export const industryContent: IndustryContent[] = [
  automotive,
  chemical,
  downstreamHydrocarbons,
  foodAndBeverage,
  energyAndUtilities,
  lifeSciences,
  miningMetals,
  waterAndWastewater,
  oem,
  marine,
  oilAndGas,
  powerGeneration,
  pulpAndPaper,
];

/** Look up an industry content object by slug. */
export function getIndustryContent(
  slug: string,
): IndustryContent | undefined {
  return industryContent.find((i) => i.slug === slug);
}
