import type { IndustryContent } from '@/types/content';
import type { NavLink } from '@/types/site';

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

const airManagement: IndustryContent = {
  name: 'Air Management',
  slug: 'air-management',
  route: '/industries/air-management',
  eyebrow: 'Industries',
  heroTitle: 'Flow Control for Industrial Air Management',
  heroDescription:
    'PDC dampers and valves support industrial air handling and process airflow where dependable control and isolation are needed.',
  shortDescription:
    'Precision dampers and valves for industrial air-handling systems.',
  overview:
    'Industrial air systems move ventilation, process, and combustion air through equipment and plant infrastructure. PDC dampers and valves support airflow control and isolation across these applications.',
  overviewParagraphs: [
    'Industrial air systems move ventilation, process, and combustion air through equipment and plant infrastructure.',
    'PDC dampers and valves support airflow control and isolation in these applications. Product selection depends on the system design and operating conditions.',
  ],
  challenges: [
    'Maintaining controlled flow through air-handling systems',
    'Coordinating flow control and isolation with connected equipment',
    'Matching product selection to system design and operating conditions',
    'Planning maintenance access in active facilities',
  ],
  applications: [
    'Industrial air-handling systems',
    'Process airflow',
    'Combustion air',
    'Ventilation and exhaust',
    'Equipment isolation',
  ],
  productFamilies: [
    'butterfly-damper-valves',
    'butterfly-valves',
    'pneumatic-actuators',
    'electric-actuators',
  ],
  images: {
    hero: {
      src: 'https://images.pexels.com/photos/32032996/pexels-photo-32032996.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      alt: 'Industrial air-handling equipment and ductwork',
      kind: 'hero',
    },
    thumbnail: {
      src: 'https://images.pexels.com/photos/32032996/pexels-photo-32032996.jpeg?auto=compress&cs=tinysrgb&h=350&w=500',
      alt: 'Industrial air-handling equipment and ductwork',
      kind: 'thumbnail',
    },
  },
  seo: {
    title: 'Air Management | PDC Valve & Actuators',
    description:
      'Precision dampers and valves for industrial air handling, process airflow, ventilation, and combustion air applications.',
    canonicalUrl: 'https://www.pdcvalve.com/industries/air-management',
    noIndex: false,
    openGraph: {
      title: 'Air Management | PDC Valve & Actuators',
      description:
        'Flow-control solutions for industrial air handling and process airflow.',
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

const petrochemical: IndustryContent = {
  name: 'Petrochemical',
  slug: 'petrochemical',
  route: '/industries/petrochemical',
  eyebrow: 'Industries',
  heroTitle: 'Flow Control for Petrochemical Processing',
  heroDescription:
    'PDC valves and actuators support flow control, isolation, and automation across petrochemical production and supporting utility systems.',
  shortDescription:
    'Flow-control solutions for petrochemical production, processing, and plant utilities.',
  overview:
    'Petrochemical facilities include process units as well as utility, storage, and transfer systems. PDC valves and actuators support flow-control applications across these process and supporting systems.',
  overviewParagraphs: [
    'Petrochemical facilities include process units as well as utility, storage, and transfer systems.',
    'PDC valves and actuators support flow control and isolation across these applications. Product selection depends on process media, operating conditions, and installation requirements.',
  ],
  challenges: [
    'Selecting materials compatible with process media',
    'Coordinating flow control and isolation across process systems',
    'Supporting utility, storage, and transfer applications',
    'Planning equipment access and maintenance',
  ],
  applications: [
    'Petrochemical process units',
    'Plant utility systems',
    'Storage and transfer systems',
    'Equipment skids',
    'Flow control and isolation',
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
      alt: 'Petrochemical processing facility with refinery equipment',
      kind: 'hero',
    },
    thumbnail: {
      src: 'https://images.pexels.com/photos/15893881/pexels-photo-15893881.jpeg?auto=compress&cs=tinysrgb&h=350&w=500',
      alt: 'Petrochemical processing facility with refinery equipment',
      kind: 'thumbnail',
    },
  },
  seo: {
    title: 'Petrochemical | PDC Valve & Actuators',
    description:
      'Flow-control valves and actuators for petrochemical production, process systems, storage, transfer, and plant utilities.',
    canonicalUrl: 'https://www.pdcvalve.com/industries/petrochemical',
    noIndex: false,
    openGraph: {
      title: 'Petrochemical | PDC Valve & Actuators',
      description:
        'Flow-control solutions for petrochemical processing and supporting systems.',
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
  heroTitle:
    'Industrial Valves and Actuators for Food Processing Utilities and Equipment Support',
  heroDescription:
    'Food and beverage processing facilities rely on dependable utility systems to support production, heating, cooling, water management, and equipment operation.',
  shortDescription:
    'Industrial valve and actuator solutions for non-product-contact food processing utilities and equipment support.',
  overview:
    'Food and beverage processing facilities rely on dependable utility systems to support production, heating, cooling, water management, and equipment operation. Process Development & Control provides industrial butterfly valves, damper valves, and pneumatic and electric actuators for a variety of non-product-contact utility and equipment-support applications. Our PDC team helps customers select appropriate valve configurations based on operating conditions, materials, pressure, temperature, leakage requirements, and automation needs.',
  overviewParagraphs: [
    'Food and beverage processing facilities rely on dependable utility systems to support production, heating, cooling, water management, and equipment operation.',
    'Process Development & Control provides industrial butterfly valves, damper valves, and pneumatic and electric actuators for a variety of non-product-contact utility and equipment-support applications.',
    'Our PDC team helps customers select appropriate valve configurations based on operating conditions, materials, pressure, temperature, leakage requirements, and automation needs.',
  ],
  challenges: [
    'Continuous operation: Reducing unnecessary interruptions to production-support systems.',
    'Repeatable control: Maintaining consistent operation of automated valves and dampers.',
    'Temperature variation: Selecting appropriate valve materials for heating, cooling, and hot-air applications.',
    'Maintenance accessibility: Providing practical access for inspection, packing adjustment, and actuator servicing.',
    'Application compatibility: Matching valve construction and sealing materials to operating media and cleaning environments.',
  ],
  applications: [
    'Utility water distribution and isolation',
    'Boiler and plant heating systems',
    'Industrial cooling-water systems',
    'Compressed-air distribution',
    'Combustion-air and hot-gas flow control',
    'Industrial ventilation and equipment-support systems',
    'OEM equipment and automated utility skids',
  ],
  productSolutions: [
    {
      title: 'Industrial Butterfly Valves',
      description:
        'High Performance and Triple Offset butterfly valves provide options for shutoff, isolation, and flow-control applications. Selection depends on operating pressure, temperature, media, and sealing requirements.',
    },
    {
      title: 'Butterfly Damper Valves',
      description:
        'PDC Econotrol, Medium Duty, and Excel damper valves provide flow-control options for suitable low-pressure air and gas applications. Multiple construction materials, seating configurations, and actuator arrangements are available depending on the valve series.',
    },
    {
      title: 'Magnus Force Pneumatic Actuators',
      description:
        'Double-acting and spring-return rack-and-pinion actuators provide quarter-turn automation for compatible valves. Actuator selection is based on valve torque, available air pressure, control requirements, and desired failure position.',
    },
    {
      title: 'Magnus Force Electric Actuators',
      description:
        'Electric quarter-turn actuators are available for on/off and selected modulating applications. Available configurations include options for position feedback, control accessories, and spring-return operation.',
    },
  ],
  productFamilies: [
    'butterfly-valves',
    'butterfly-damper-valves',
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
    title: 'Food Processing Utilities and Equipment Support | PDC Valve & Actuators',
    description:
      'Industrial valves and actuators for non-product-contact food processing utilities, water, air, heating, cooling, and equipment support.',
    canonicalUrl: 'https://www.pdcvalve.com/industries/food-and-beverage',
    noIndex: false,
    openGraph: {
      title: 'Food and Beverage Processing | PDC Valve & Actuators',
      description:
        'Industrial valves and actuators for non-product-contact food processing utilities and equipment support.',
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
  heroTitle: 'Flow Control for Oil and Gas Applications',
  heroDescription:
    'PDC provides valves, actuators, and engineered valve assemblies for oil and gas production, frac operations, water handling, process piping, emergency shutdown, utility, and equipment-support applications.',
  shortDescription:
    'Valves, actuators, and engineered packages for oil and gas production, frac operations, process isolation, and equipment support.',
  overview:
    'Oil and gas operations require dependable valve and actuation solutions across production, frac, water handling, process, isolation, and emergency shutdown systems. PDC supports these applications with configured valves, actuators, and assemblies.',
  overviewParagraphs: [
    'Oil and gas operations require dependable valve and actuation solutions across production, frac, water handling, process, isolation, and emergency shutdown systems.',
    'PDC supports a broad range of oilfield and process applications with butterfly valves, ball valves, gate valves, actuators, and complete automated valve assemblies.',
    'Valve packages can be configured around the media, pressure, temperature, required shutoff, fail position, operating torque, control requirements, and installation conditions of the application.',
    'PDC can also support custom mounting, accessories, controls, and engineered actuation packages for specialized field requirements.',
  ],
  applications: [
    'Frac and Water Handling',
    'Process Isolation and Flow Control',
    'Emergency Shutdown Systems',
    'Production and Processing Equipment',
    'Utility and Support Systems',
    'Automated Valve Packages',
  ],
  applicationCards: [
    {
      iconSlug: 'water',
      title: 'Frac and Water Handling',
      description:
        'Butterfly valves and automated assemblies for frac water, water transfer, storage, and related field-service applications.',
    },
    {
      iconSlug: 'workflow',
      title: 'Process Isolation and Flow Control',
      description:
        'Butterfly, ball, and gate valves for suitable process piping requiring isolation, shutoff, throttling, or automated operation.',
    },
    {
      iconSlug: 'shield',
      title: 'Emergency Shutdown Systems',
      description:
        'Ball-valve and actuator packages using Scotch yoke actuation and ESD controls for applications requiring rapid or defined fail-safe shutdown.',
    },
    {
      iconSlug: 'factory',
      title: 'Production and Processing Equipment',
      description:
        'Valve and actuator assemblies for production equipment, separators, packaged systems, and supporting process machinery.',
    },
    {
      iconSlug: 'settings',
      title: 'Utility and Support Systems',
      description:
        'Valve assemblies for water, air, gas, cooling, and other supporting oilfield or facility utilities.',
    },
    {
      iconSlug: 'automation',
      title: 'Automated Valve Packages',
      description:
        'Pneumatic, electric, or Scotch yoke actuator packages with appropriate controls, feedback, and accessories for remote or automated operation.',
    },
  ],
  productSolutions: [
    {
      title: 'Butterfly Valves',
      description:
        'Butterfly valves support flow control and isolation in process piping, water handling, utilities, and related oilfield applications.',
    },
    {
      title: 'Ball Valves',
      description:
        'Ball valves can be configured for process isolation and emergency shutdown applications when the media, pressure, temperature, shutoff, and operating requirements are suitable.',
    },
    {
      title: 'Gate Valves',
      description:
        'Gate valves provide an isolation option for suitable oilfield, process, and utility systems, selected to match the media and service conditions.',
    },
    {
      title: 'Pneumatic & Scotch Yoke Actuation',
      description:
        'Pneumatic and Scotch yoke actuation support automated valve operation, with selection based on required torque, controls, and fail position.',
    },
    {
      title: 'ESD & Control Packages',
      description:
        'ESD packages combine compatible valves, actuators, and controls for application-specific isolation and fail-safe requirements.',
    },
    {
      title: 'Electric Actuation',
      description:
        'Electric actuator packages support remote operation when power, controls, feedback, and installation requirements are suitable.',
    },
  ],
  productFamilies: [
    'butterfly-valves',
    'butterfly-damper-valves',
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
    title: 'Oil and Gas Applications | PDC Valve & Actuators',
    description:
      'Valves, actuators, and engineered packages for oil and gas production, frac operations, process isolation, emergency shutdown, water handling, and utilities.',
    canonicalUrl: 'https://www.pdcvalve.com/industries/oil-and-gas',
    noIndex: false,
    openGraph: {
      title: 'Oil and Gas Applications | PDC Valve & Actuators',
      description:
        'Flow-control valves, actuators, and engineered packages for oil and gas applications.',
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
  airManagement,
  chemical,
  petrochemical,
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

/**
 * Shared navigation generated from the canonical industry page registry.
 * This keeps every displayed industry link backed by a real route.
 */
export const industryNav: NavLink[] = industryContent.map((industry) => ({
  label: industry.name,
  href: industry.route,
}));

/** Look up an industry content object by slug. */
export function getIndustryContent(
  slug: string,
): IndustryContent | undefined {
  return industryContent.find((i) => i.slug === slug);
}
