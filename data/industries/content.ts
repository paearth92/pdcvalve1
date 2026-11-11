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
  heroTitle: 'Automotive',
  heroDescription:
    'PDC provides engineered butterfly valves, damper valves, and automated quarter-turn assemblies for utility, air-handling, combustion, process-support, and equipment applications throughout automotive manufacturing facilities.',
  shortDescription:
    'Engineered valves and actuators for automotive plant utilities, air handling, combustion, and equipment support.',
  overview:
    'Automotive manufacturing depends on supporting systems beyond the production line, including plant utilities, industrial air handling, process water, combustion systems, finishing operations, and automated equipment. PDC supplies butterfly valves, damper valves, actuators, and engineered valve assemblies for these supporting applications, with manual and automated configurations available. Custom assemblies, mounting arrangements, and actuation packages can be configured when standard products do not fit.',
  overviewParagraphs: [
    'Automotive manufacturing depends on a wide range of supporting systems beyond the production line itself, including plant utilities, industrial air handling, process water, combustion systems, finishing operations, and automated equipment.',
    'PDC supplies butterfly valves, damper valves, actuators, and engineered valve assemblies for these supporting applications, with configurations available for manual or automated operation.',
    'Where standard products do not fit the application, PDC can support custom valve assemblies, mounting arrangements, actuation packages, and application-specific configurations.',
  ],
  challenges: [
    'Reliable operation in continuous production environments',
    'Repeatable flow control and valve positioning',
    'Managing plant air, gas, water, and utility systems',
    'Automation and integration with equipment controls',
    'Maintenance access and long-term serviceability',
    'Matching valve materials, seating, and actuation to the application',
  ],
  applications: [
    'Industrial Air Handling',
    'Combustion Air & Exhaust',
    'Plant Utility Systems',
    'Process Water',
    'Paint & Finishing Support Systems',
    'OEM & Automated Equipment',
  ],
  applicationCards: [
    { iconSlug: 'air-management', title: 'Industrial Air Handling', description: 'Flow control and isolation in ventilation, process-air, blower, and general air-handling systems.' },
    { iconSlug: 'power-generation', title: 'Combustion Air & Exhaust', description: 'Damper-valve applications involving combustion air, furnace or oven support systems, and suitable exhaust or hot-gas service.' },
    { iconSlug: 'oem', title: 'Plant Utility Systems', description: 'Valve and actuation solutions for supporting utility systems throughout the manufacturing facility.' },
    { iconSlug: 'water-and-wastewater', title: 'Process Water', description: 'Butterfly-valve applications for suitable plant water, cooling, and process-support services.' },
    { iconSlug: 'oem', title: 'Paint & Finishing Support Systems', description: 'Flow-control components for supporting air, utility, and equipment systems associated with paint and finishing operations.' },
    { iconSlug: 'oem', title: 'OEM & Automated Equipment', description: 'Manual or automated valve assemblies for equipment skids, machinery, and engineered manufacturing systems.' },
  ],
  productSolutions: [
    { title: 'Butterfly Valves', description: 'PDC butterfly valves provide shutoff, isolation, throttling, and modulating capability for applications requiring different pressure, temperature, materials, seating, or connection requirements. High-performance and triple-offset designs are available for demanding services.' },
    { title: 'Damper and Control Valves', description: 'PDC damper and control valves are designed for flow control and isolation in low-pressure industrial air, gas, combustion, and process applications. Multiple series offer different body styles, temperature capabilities, and connection types.' },
    { title: 'Pneumatic Actuators', description: 'PDC pneumatic actuator packages provide quarter-turn automation in double-acting and spring-return configurations. Assemblies can include mounting hardware, position indication, solenoids, and other control accessories.' },
    { title: 'Electric Actuators', description: 'PDC electric actuators provide quarter-turn automation for on/off and selected modulating valve and damper applications. Configurations can be selected around voltage, control, feedback, and operating requirements.' },
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
  heroTitle: 'Flow Control for Air Management Systems',
  heroDescription:
    'PDC provides butterfly damper valves, actuators, and engineered valve assemblies for industrial air-handling, ventilation, combustion-air, exhaust, and gas-control applications. PDC products can be configured around temperature, differential pressure, materials, actuation, mounting, and control requirements for both standard and application-specific systems.',
  shortDescription:
    'Precision dampers and valves for industrial air-handling systems.',
  overview:
    'Industrial air-management systems require dependable control of air and gas across a wide range of operating conditions. PDC supports applications ranging from ventilation and process air to combustion-air and high-temperature exhaust systems with configurable butterfly damper valves and actuator packages.',
  overviewParagraphs: [
    'Industrial air-management systems require dependable control of air and gas across a wide range of operating conditions.',
    'PDC supports applications ranging from ventilation and process air to combustion-air and high-temperature exhaust systems with configurable butterfly damper valves and actuator packages.',
    'Valve and actuation selections can be tailored to the required size, temperature, differential pressure, operating environment, control method, and installation arrangement.',
  ],
  challenges: [
    'Selecting the appropriate damper valve for temperature, differential pressure, and service conditions',
    'Maintaining reliable control across ventilation, process-air, combustion-air, and exhaust systems',
    'Matching valve size, materials, seating, and actuation to the operating environment',
    'Integrating actuators, linkages, controls, and feedback with existing equipment',
  ],
  applications: [
    'Industrial air handling',
    'Combustion air',
    'Exhaust and hot gas',
    'Process air and gas',
    'Ventilation systems',
    'Automated air control',
  ],
  applicationCards: [
    { iconSlug: 'air-management', title: 'Industrial Air Handling', description: 'Butterfly damper valves and automated assemblies for industrial ventilation, supply air, return air, and process-air systems.' },
    { iconSlug: 'power-generation', title: 'Combustion Air', description: 'Valve and actuator packages for burner air, combustion-air control, and related low-pressure air systems.' },
    { iconSlug: 'air-management', title: 'Exhaust and Hot Gas', description: 'Damper-valve configurations for exhaust, hot-air, and elevated-temperature gas-handling applications.' },
    { iconSlug: 'air-management', title: 'Process Air and Gas', description: 'Flow-control solutions for industrial air, gas, and process-support systems.' },
    { iconSlug: 'air-management', title: 'Ventilation Systems', description: 'Manual or automated damper-valve assemblies for plant ventilation and equipment air-handling systems.' },
    { iconSlug: 'oem', title: 'Automated Air Control', description: 'Pneumatic and electric actuator packages with suitable mounting, controls, and feedback for air-management applications.' },
  ],
  productSolutions: [
    { title: 'Butterfly Damper Valves', description: 'PDC butterfly damper valves support air, gas, combustion, ventilation, and exhaust applications across a broad range of sizes and service conditions. Available series include Econotrol 09, Medium Duty 01, Excel 40, Flanged 39, Reduced Port 15, Combustion 22, and Thread End 07.' },
    { title: 'Pneumatic Actuators', description: 'Pneumatic actuator packages support on/off, fail-position, and modulating valve applications, with mounting hardware and accessories configured as required.' },
    { title: 'Electric Actuators', description: 'Electric actuation supports air-management applications requiring powered quarter-turn operation, remote control, or position feedback.' },
    { title: 'Custom Valve and Actuator Assemblies', description: 'PDC can configure mounting arrangements, brackets, couplings, linkages, shaft configurations, and controls for application-specific systems.' },
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
  heroTitle: 'Chemical Processing',
  heroDescription:
    'PDC provides engineered butterfly valves, damper valves, and automated quarter-turn assemblies for chemical processing, utility, air-handling, and equipment-support applications.',
  shortDescription:
    'Valves and actuators for chemical process control, isolation, transfer, combustion, and plant utility systems.',
  overview:
    'Chemical processing facilities operate with liquids, gases, utilities, and support systems under varying temperature, pressure, corrosion, and cycling conditions. PDC supplies butterfly valves, damper valves, actuators, and automated assemblies for suitable process and plant-support applications. Configurations include multiple body styles, materials, seating arrangements, shaft designs, packing systems, actuation options, and mounting arrangements. PDC can also support engineered valve assemblies where standard configurations do not fit.',
  overviewParagraphs: [
    'Chemical processing facilities operate with a wide range of liquids, gases, utilities, and supporting systems, often under demanding temperature, pressure, corrosion, and cycling conditions.',
    'PDC supplies butterfly valves, damper valves, actuators, and complete automated assemblies for suitable process and plant-support applications.',
    'Available configurations include multiple body styles, materials, seating arrangements, shaft designs, packing systems, actuation options, and mounting arrangements. PDC can support engineered and custom valve assemblies when standard configurations do not meet the application.',
  ],
  challenges: [
    'Compatibility between process media and valve materials',
    'Reliable shutoff and flow control',
    'Corrosion and environmental exposure',
    'Elevated or changing process temperatures',
    'Differential pressure across the valve',
    'Frequent cycling and automated operation',
    'Packing, sealing, and fugitive-leakage considerations',
    'Integration with plant controls and equipment',
    'Maintenance access and long-term serviceability',
  ],
  applications: [
    'Process Isolation and Control',
    'Chemical Transfer Systems',
    'Industrial Air and Gas Handling',
    'Combustion and Exhaust Systems',
    'Plant Utility Systems',
    'OEM and Process Equipment',
  ],
  applicationCards: [
    { iconSlug: 'chemical', title: 'Process Isolation and Control', description: 'Butterfly valves for suitable process lines requiring shutoff, throttling, or automated flow control.' },
    { iconSlug: 'chemical', title: 'Chemical Transfer Systems', description: 'Valve assemblies for transfer piping, storage systems, and supporting chemical-handling equipment.' },
    { iconSlug: 'air-management', title: 'Industrial Air and Gas Handling', description: 'Damper and control valves for suitable low-pressure air, gas, ventilation, and process-support systems.' },
    { iconSlug: 'power-generation', title: 'Combustion and Exhaust Systems', description: 'Damper-valve applications involving combustion air, burner support, exhaust, and hot-gas handling.' },
    { iconSlug: 'oem', title: 'Plant Utility Systems', description: 'Valve and actuation solutions for water, air, gas, cooling, and other supporting utility services.' },
    { iconSlug: 'oem', title: 'OEM and Process Equipment', description: 'Manual or automated valve assemblies for skids, packaged equipment, reactors, vessels, and engineered process systems.' },
  ],
  productSolutions: [
    { title: 'Butterfly Valves', description: 'PDC butterfly valves provide shutoff, throttling, and modulating service across industrial applications. High-performance and triple-offset designs support higher-pressure, elevated-temperature, or more demanding shutoff requirements.' },
    { title: 'Damper and Control Valves', description: 'PDC damper and control valves provide quarter-turn control for suitable low-pressure air, gas, combustion, exhaust, and process-support applications. Series include Econotrol, Medium Duty, Excel, Flanged End, Reduced Port, Combustion, and Thread End.' },
    { title: 'Rack & Pinion Pneumatic Actuators', description: 'PDC double-acting and spring-return pneumatic actuator packages provide quarter-turn automation. Assemblies can include mounting hardware, position indication, solenoids, limit switches, and other control accessories.' },
    { title: 'Electric Actuators', description: 'PDC electric actuators support on/off and selected modulating valve and damper applications, with configurations selected around voltage, control signal, feedback, environmental requirements, and operating torque.' },
  ],
  productFamilies: [
    'butterfly-valves',
    'butterfly-damper-valves',
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
    'PDC provides industrial valves, actuators, and engineered valve assemblies for petrochemical process, utility, air-handling, combustion, and equipment-support applications. Products can be configured around media, temperature, differential pressure, materials, seating, actuation, controls, and installation requirements.',
  shortDescription:
    'Flow-control solutions for petrochemical production, processing, and plant utilities.',
  overview:
    'Petrochemical facilities depend on reliable valve and actuation solutions across process systems, plant utilities, combustion equipment, gas handling, and supporting machinery.',
  overviewParagraphs: [
    'Petrochemical facilities depend on reliable valve and actuation solutions across process systems, plant utilities, combustion equipment, gas handling, and supporting machinery.',
    'PDC supports these applications with butterfly damper valves, butterfly valves, ball valves, gate valves, pneumatic and electric actuators, and custom valve and actuator assemblies.',
    'Application review can include operating conditions, materials, temperature, pressure, shutoff requirements, actuation, accessories, and installation constraints.',
  ],
  challenges: [
    'Selecting valve materials and seating compatible with process media and operating conditions',
    'Matching valve type and actuation to temperature, pressure, differential pressure, and shutoff requirements',
    'Integrating valves, actuators, controls, and accessories into process and utility systems',
    'Supporting reliable operation across process, storage, transfer, combustion, and gas-handling applications',
  ],
  applications: [
    'Process isolation and control',
    'Plant utility systems',
    'Combustion and exhaust systems',
    'Gas handling and recovery',
    'Storage and transfer systems',
    'Equipment support and skids',
  ],
  applicationCards: [
    { iconSlug: 'chemical', title: 'Process Isolation and Control', description: 'Valve configurations for suitable process lines requiring shutoff, throttling, or automated flow control.' },
    { iconSlug: 'oem', title: 'Storage and Transfer', description: 'Valve and actuator assemblies for storage, loading, transfer piping, and related equipment.' },
    { iconSlug: 'power-generation', title: 'Combustion and Exhaust', description: 'Damper and control valves for combustion-air control, burner support, exhaust, and hot-gas handling.' },
    { iconSlug: 'air-management', title: 'Gas Handling', description: 'Flow-control solutions for suitable gas-handling and process-support systems.' },
    { iconSlug: 'oem', title: 'Plant Utility Systems', description: 'Valve and actuator configurations for air, gas, water, cooling, and other supporting utilities.' },
    { iconSlug: 'oem', title: 'Equipment and Skids', description: 'Manual or automated assemblies integrated with packaged equipment and process systems.' },
  ],
  productSolutions: [
    { title: 'Butterfly Valves', description: 'PDC butterfly valves support shutoff, isolation, throttling, and modulating service; select the design and configuration for the application conditions.' },
    { title: 'Damper and Control Valves', description: 'PDC damper and control valves provide quarter-turn control for suitable low-pressure air, gas, combustion, exhaust, and process-support applications.' },
    { title: 'Pneumatic and Electric Actuators', description: 'Quarter-turn actuator packages provide automated valve operation, with mounting hardware, controls, and accessories configured to project requirements.' },
    { title: 'Custom Valve and Actuator Assemblies', description: 'PDC can integrate valves, actuators, brackets, couplings, linkages, and controls into application-specific assemblies.' },
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
  heroTitle: 'Downstream Hydrocarbons',
  heroDescription:
    'PDC provides butterfly valves, damper valves, actuators, and engineered quarter-turn assemblies for refining, storage, transfer, combustion, utility, and process-support applications.',
  shortDescription:
    'Valves and actuators for downstream process, storage, transfer, combustion, utility, and equipment-isolation systems.',
  overview:
    'Refineries, terminals, storage facilities, and downstream processing plants rely on flow-control equipment across process, combustion, utility, and equipment-support systems. PDC supplies butterfly valves, damper valves, actuators, and automated assemblies for suitable liquid, air, gas, and utility services. Configurations include varied body styles, materials, seating, packing, shaft designs, connection types, and actuation options. PDC can also support custom mounting, linkage, and engineered assemblies.',
  overviewParagraphs: [
    'Refineries, terminals, storage facilities, and downstream processing plants depend on reliable flow-control equipment across process, combustion, utility, and equipment-support systems.',
    'PDC supplies butterfly valves, damper valves, actuators, and complete automated assemblies for suitable liquid, air, gas, and utility services.',
    'Available configurations include multiple body styles, materials, seating arrangements, packing systems, shaft designs, connection types, and actuation options. PDC can support custom mounting, linkage, and engineered assembly requirements where standard configurations are not sufficient.',
  ],
  challenges: [
    'Reliable shutoff and flow control across varied process services',
    'Elevated temperatures and demanding operating conditions',
    'Material compatibility with process media',
    'Combustion air, exhaust, and hot-gas control',
    'Frequent cycling and automated operation',
    'Corrosion and outdoor environmental exposure',
    'Equipment isolation for maintenance and service',
    'Integration with plant controls and actuator accessories',
  ],
  applications: [
    'Process Isolation and Flow Control',
    'Storage and Transfer Systems',
    'Combustion Air and Burner Systems',
    'Exhaust and Hot-Gas Handling',
    'Plant Utility Systems',
    'Equipment and Maintenance Isolation',
  ],
  applicationCards: [
    { iconSlug: 'chemical', title: 'Process Isolation and Flow Control', description: 'Butterfly valves for suitable process lines requiring shutoff, throttling, or automated control.' },
    { iconSlug: 'oem', title: 'Storage and Transfer Systems', description: 'Valve assemblies for storage tanks, loading and unloading systems, transfer piping, and related equipment.' },
    { iconSlug: 'power-generation', title: 'Combustion Air and Burner Systems', description: 'Damper and control valves for combustion-air control serving burners, heaters, furnaces, and related equipment.' },
    { iconSlug: 'air-management', title: 'Exhaust and Hot-Gas Handling', description: 'Damper-valve applications involving exhaust, flue gas, and other suitable elevated-temperature gas services.' },
    { iconSlug: 'oem', title: 'Plant Utility Systems', description: 'Valve and actuator assemblies for water, air, gas, cooling, and other supporting facility utilities.' },
    { iconSlug: 'oem', title: 'Equipment and Maintenance Isolation', description: 'Quarter-turn valves for isolating equipment, process sections, and supporting systems for operation or maintenance.' },
  ],
  productSolutions: [
    { title: 'Butterfly Valves', description: 'PDC butterfly valves provide shutoff, isolation, throttling, and modulating service. High-performance and triple-offset designs support suitable higher-pressure, elevated-temperature, and demanding shutoff requirements.' },
    { title: 'Damper and Control Valves', description: 'PDC damper and control valves provide quarter-turn control and isolation for suitable low-pressure air, gas, combustion, exhaust, and process-support systems. Series include Econotrol, Medium Duty, Excel, Flanged End, Reduced Port, Combustion, and Thread End.' },
    { title: 'Pneumatic Actuators', description: 'PDC double-acting and spring-return packages provide quarter-turn automation, with mounting hardware, position indication, solenoids, limit switches, and other accessories as required.' },
    { title: 'Electric Actuators', description: 'PDC electric actuators support on/off and selected modulating valve and damper applications, with configuration options for voltage, torque, control, feedback, and environment.' },
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
    'Continuous operation: Reduce unnecessary interruptions to production-support systems.',
    'Repeatable control: Maintain consistent operation of automated valves and dampers.',
    'Temperature variation: Select appropriate materials for heating, cooling, and hot-air applications.',
    'Maintenance accessibility: Provide practical access for inspection, packing adjustment, and actuator servicing.',
    'Application compatibility: Match valve construction and sealing materials to operating media and cleaning environments.',
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
  applicationCards: [
    { iconSlug: 'water-and-wastewater', title: 'Utility water distribution and isolation', description: '' },
    { iconSlug: 'power-generation', title: 'Boiler and plant heating systems', description: '' },
    { iconSlug: 'water-and-wastewater', title: 'Industrial cooling-water systems', description: '' },
    { iconSlug: 'air-management', title: 'Compressed-air distribution', description: '' },
    { iconSlug: 'power-generation', title: 'Combustion-air and hot-gas flow control', description: '' },
    { iconSlug: 'air-management', title: 'Industrial ventilation and equipment-support systems', description: '' },
    { iconSlug: 'oem', title: 'OEM equipment and automated utility skids', description: '' },
  ],
  productSolutions: [
    {
      title: 'Industrial Butterfly Valves',
      description:
        'High Performance and Triple Offset butterfly valves provide options for shutoff, isolation, and flow-control applications. Selection depends on operating pressure, temperature, media, and sealing requirements.',
    },
    {
      title: 'Damper and Control Valves',
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
  productFamilyDescriptions: {
    'butterfly-valves': 'High Performance and Triple Offset designs for suitable non-product-contact utility and equipment-support applications.',
    'butterfly-damper-valves': 'Econotrol, Medium Duty, and Excel valves for suitable low-pressure air and gas flow control.',
    'pneumatic-actuators': 'Magnus Force double-acting and spring-return rack-and-pinion automation for compatible valves.',
    'electric-actuators': 'Magnus Force quarter-turn actuation for on/off and selected modulating applications.',
  },
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
  heroTitle: 'Energy and Utilities',
  heroDescription:
    'PDC provides butterfly valves, damper valves, actuators, and engineered quarter-turn assemblies for plant utility, cooling, heating, air, water, combustion, and facility-support systems.',
  shortDescription:
    'Valves and actuators for plant utility, cooling, heating, air, water, combustion, and facility-support systems.',
  overview:
    'Industrial facilities depend on reliable onsite utility systems to support production, equipment, environmental control, and overall plant operation. PDC supplies butterfly valves, damper valves, actuators, and automated assemblies for utility and infrastructure applications, including cooling water, compressed air, utility water, heating systems, combustion support, and facility process systems. Configurations include multiple body styles, materials, seating, connections, actuators, and mounting arrangements.',
  overviewParagraphs: [
    'Industrial facilities depend on reliable onsite utility systems to support production, equipment, environmental control, and overall plant operation.',
    'PDC supplies butterfly valves, damper valves, actuators, and automated assemblies for cooling water, compressed air, utility water, heating systems, combustion support, and facility process systems.',
    'Available configurations include multiple body styles, materials, seating arrangements, connection types, actuator options, and mounting arrangements to suit the application.',
  ],
  challenges: [
    'Reliable operation across continuously used plant utility systems',
    'Managing water, air, gas, and other supporting services',
    'Maintaining consistent flow control and equipment isolation',
    'Matching valve materials and seating to the operating media',
    'Automated operation and integration with plant controls',
    'Outdoor or mechanically demanding installation environments',
    'Maintenance access and long-term serviceability',
  ],
  applications: [
    'Cooling Water Systems',
    'Compressed Air and Utility Air',
    'Utility and Service Water',
    'Heating and Thermal Utility Systems',
    'Combustion Air and Fuel-Support Systems',
    'Facility and Process-Support Systems',
  ],
  applicationCards: [
    { iconSlug: 'water-and-wastewater', title: 'Cooling Water Systems', description: 'Butterfly valves for cooling-water circulation, equipment isolation, and suitable plant cooling applications.' },
    { iconSlug: 'air-management', title: 'Compressed Air and Utility Air', description: 'Quarter-turn valve assemblies for plant air and supporting pneumatic utility systems.' },
    { iconSlug: 'water-and-wastewater', title: 'Utility and Service Water', description: 'Butterfly valves for suitable service-water, washdown, cooling, and general plant-water applications.' },
    { iconSlug: 'power-generation', title: 'Heating and Thermal Utility Systems', description: 'Valve assemblies for suitable heating, hot-water, and supporting thermal utility applications.' },
    { iconSlug: 'power-generation', title: 'Combustion Air and Fuel-Support Systems', description: 'Damper and control valves and automated assemblies for combustion-air control and related burner or heater support systems.' },
    { iconSlug: 'oem', title: 'Facility and Process-Support Systems', description: 'Manual or automated valve assemblies for general plant infrastructure, equipment isolation, and supporting process services.' },
  ],
  productSolutions: [
    { title: 'Butterfly Valves', description: 'PDC butterfly valves provide shutoff, isolation, throttling, and modulating service across industrial utility applications. High-performance and triple-offset designs support more demanding pressure, temperature, and shutoff requirements.' },
    { title: 'Damper and Control Valves', description: 'PDC damper and control valves provide quarter-turn control and isolation for suitable low-pressure air, gas, combustion, exhaust, and utility-support systems. Series include Econotrol, Medium Duty, Excel, Flanged End, Reduced Port, Combustion, and Thread End.' },
    { title: 'Pneumatic Actuators', description: 'PDC double-acting and spring-return actuator packages provide quarter-turn automation and can include mounting hardware, position indication, solenoids, limit switches, and other accessories.' },
    { title: 'Electric Actuators', description: 'PDC electric actuators support on/off and selected modulating valve and damper applications, with options for voltage, torque, control signal, feedback, and environmental requirements.' },
  ],
  productFamilies: [
    'butterfly-valves',
    'butterfly-damper-valves',
    'pneumatic-actuators',
    'electric-actuators',
  ],
  productFamilyDescriptions: {
    'butterfly-valves': 'Shutoff, isolation, throttling, and modulating service across plant utility applications.',
    'butterfly-damper-valves': 'Quarter-turn control and isolation for suitable low-pressure air, gas, combustion, exhaust, and utility-support systems.',
    'pneumatic-actuators': 'Double-acting and spring-return automation with mounting and control accessories.',
    'electric-actuators': 'Quarter-turn automation for on/off and selected modulating valve and damper applications.',
  },
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
  heroTitle: 'Life Sciences',
  heroDescription:
    'PDC provides butterfly valves, actuators, and engineered quarter-turn assemblies for facility utilities, controlled environments, water systems, air systems, and equipment support in life sciences and medical manufacturing.',
  shortDescription:
    'Valves and actuators for life-sciences facility utilities, controlled environments, water, air, and equipment support.',
  overview:
    'Life sciences and medical manufacturing facilities rely on dependable utility and environmental-support systems for consistent facility operation. PDC supplies butterfly valves, pneumatic and electric actuators, and automated assemblies for suitable facility water, plant air, heating and cooling, clean-room support, and equipment applications. Configurations include multiple body styles, materials, seating arrangements, connection types, actuator options, and mounting arrangements.',
  overviewParagraphs: [
    'Life sciences and medical manufacturing facilities rely on dependable utility and environmental-support systems to maintain consistent facility operation.',
    'PDC supplies butterfly valves, pneumatic actuators, electric actuators, and automated assemblies for suitable facility water, plant air, heating and cooling, clean-room support, and equipment applications.',
    'Available configurations include multiple body styles, materials, seating arrangements, connection types, actuator options, and mounting arrangements. PDC can support application-specific valve and actuator assemblies for OEM equipment and facility-support systems.',
  ],
  challenges: [],
  applications: [
    'Clean-Room Support Systems',
    'Facility and Process Utilities',
    'Facility Water Systems',
    'Plant and Instrument Air',
    'Heating and Cooling Systems',
    'OEM and Equipment Support',
  ],
  applicationCards: [
    { iconSlug: 'air-management', title: 'Clean-Room Support Systems', description: 'Valve and actuator assemblies for suitable air, water, HVAC, and environmental-support systems serving controlled manufacturing areas.' },
    { iconSlug: 'oem', title: 'Facility and Process Utilities', description: 'Quarter-turn valves for supporting plant utility systems used throughout life sciences and medical manufacturing facilities.' },
    { iconSlug: 'water-and-wastewater', title: 'Facility Water Systems', description: 'Butterfly valves for suitable service-water, cooling-water, washdown-support, and general facility-water applications.' },
    { iconSlug: 'air-management', title: 'Plant and Instrument Air', description: 'Automated valve assemblies for suitable compressed-air and supporting pneumatic utility systems.' },
    { iconSlug: 'water-and-wastewater', title: 'Heating and Cooling Systems', description: 'Butterfly valves for suitable HVAC, chilled-water, cooling-water, and thermal utility applications.' },
    { iconSlug: 'oem', title: 'OEM and Equipment Support', description: 'Manual or automated valve assemblies for equipment skids, packaged systems, and engineered manufacturing equipment.' },
  ],
  productSolutions: [
    { title: 'Butterfly Valves', description: 'PDC butterfly valves support shutoff, isolation, throttling, and modulating service across facility and utility applications. High-performance designs support applications involving higher pressures, elevated temperatures, or more demanding shutoff requirements.' },
    { title: 'Pneumatic Actuators', description: 'PDC double-acting and spring-return actuator packages provide quarter-turn automation. Assemblies can include mounting hardware, position indication, solenoids, limit switches, and other application-specific accessories.' },
    { title: 'Electric Actuators', description: 'PDC electric actuators support on/off and selected modulating applications, with options for voltage, torque, control signal, feedback, and environmental requirements.' },
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
  heroTitle: 'Mining, Minerals, and Metals',
  heroDescription:
    'PDC provides butterfly valves, damper valves, actuators, and engineered quarter-turn assemblies for process water, plant air, utility, ventilation, combustion, and equipment-support applications in mining and metals facilities.',
  shortDescription:
    'Valves and actuators for mining, mineral processing, metals facilities, utilities, ventilation, and equipment support.',
  overview:
    'Mining, mineral-processing, and metals facilities operate in demanding environments where flow-control equipment supports heavy-duty plant operation, utility systems, material-processing equipment, and environmental controls. PDC supplies butterfly valves, damper valves, pneumatic and electric actuators, and automated assemblies for suitable water, air, gas, utility, and equipment-support services. Configurations include multiple body styles, materials, seating, shaft designs, connection types, actuators, and mounting arrangements.',
  overviewParagraphs: [
    'Mining, mineral-processing, and metals facilities operate in demanding environments where flow-control equipment supports heavy-duty plant operation, utility systems, material-processing equipment, and environmental-control systems.',
    'PDC supplies butterfly valves, damper valves, pneumatic actuators, electric actuators, and automated assemblies for suitable water, air, gas, utility, and equipment-support services.',
    'Available configurations include multiple body styles, materials, seating, shaft designs, connection types, actuator options, and mounting arrangements. PDC can support custom valve and actuator assemblies for OEM equipment and application-specific installations.',
  ],
  challenges: [
    'Abrasive and dirty industrial environments',
    'Reliable operation in continuously used plant systems',
    'Exposure to dust, moisture, and outdoor conditions',
    'Equipment isolation for maintenance and service',
    'Automated operation in difficult-to-access areas',
    'Matching valve materials and seating to the operating media',
    'Long-term serviceability in heavy industrial applications',
  ],
  applications: [
    'Process and Utility Water',
    'Plant Air and Gas Systems',
    'Ventilation and Dust-Control Support',
    'Combustion Air and Furnace Support',
    'Equipment and Maintenance Isolation',
    'OEM and Material-Processing Equipment',
  ],
  applicationCards: [
    { iconSlug: 'water-and-wastewater', title: 'Process and Utility Water', description: 'Butterfly valves for suitable process-water, cooling-water, service-water, and equipment-support applications.' },
    { iconSlug: 'air-management', title: 'Plant Air and Gas Systems', description: 'Quarter-turn valves and automated assemblies for compressed air, utility air, and suitable gas services.' },
    { iconSlug: 'air-management', title: 'Ventilation and Dust-Control Support', description: 'Damper and control valves for suitable ventilation, air-handling, dust-collection, and environmental-control systems.' },
    { iconSlug: 'power-generation', title: 'Combustion Air and Furnace Support', description: 'Damper valves for combustion-air control and related furnace, burner, kiln, or thermal-processing support systems.' },
    { iconSlug: 'oem', title: 'Equipment and Maintenance Isolation', description: 'Manual or automated valve assemblies for isolating equipment, process sections, and supporting systems for operation or maintenance.' },
    { iconSlug: 'oem', title: 'OEM and Material-Processing Equipment', description: 'Valve and actuator assemblies for skids, packaged equipment, material-processing machinery, and engineered plant systems.' },
  ],
  productSolutions: [
    { title: 'Butterfly Valves', description: 'PDC butterfly valves provide shutoff, isolation, throttling, and modulating service across industrial water, utility, and process-support applications. High-performance and triple-offset designs support higher-pressure, elevated-temperature, or more demanding shutoff requirements.' },
    { title: 'Damper and Control Valves', description: 'PDC damper and control valves provide quarter-turn control and isolation for suitable low-pressure air, gas, ventilation, combustion, exhaust, and equipment-support systems. Series include Econotrol, Medium Duty, Excel, Flanged End, Reduced Port, Combustion, and Thread End.' },
    { title: 'Pneumatic Actuators', description: 'PDC double-acting and spring-return pneumatic packages provide quarter-turn automation with mounting hardware, position indication, solenoids, limit switches, and other accessories as required.' },
    { title: 'Electric Actuators', description: 'PDC electric actuators support on/off and selected modulating valve and damper applications, with options for voltage, torque, control signal, feedback, and environmental requirements.' },
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
  heroTitle: 'Water and Wastewater',
  heroDescription:
    'PDC provides butterfly valves, actuators, and engineered quarter-turn assemblies for water treatment, wastewater treatment, pumping, process water, utility water, and equipment-isolation applications.',
  shortDescription:
    'Valves and actuators for water treatment, wastewater treatment, pumping, plant water, and automated flow control.',
  overview:
    'Water and wastewater facilities depend on reliable valve operation throughout treatment, pumping, distribution, and plant-support systems. PDC supplies butterfly valves, pneumatic and electric actuators, and automated assemblies for suitable water and wastewater services. Configurations include multiple body styles, materials, seating arrangements, connection types, actuator options, and mounting arrangements for plant operation, equipment isolation, flow control, and maintenance.',
  overviewParagraphs: [
    'Water and wastewater facilities depend on reliable valve operation throughout treatment, pumping, distribution, and plant-support systems.',
    'PDC supplies butterfly valves, pneumatic actuators, electric actuators, and complete automated assemblies for suitable water and wastewater services.',
    'Available configurations include multiple body styles, materials, seating arrangements, connection types, actuator options, and mounting arrangements. Manual and automated assemblies can support plant operation, equipment isolation, flow control, and maintenance requirements.',
  ],
  challenges: [],
  applications: [
    'Water Treatment Systems',
    'Wastewater Treatment Systems',
    'Pumping Stations',
    'Process and Utility Water',
    'Equipment and Maintenance Isolation',
    'Automated Flow Control',
  ],
  applicationCards: [
    { iconSlug: 'water-and-wastewater', title: 'Water Treatment Systems', description: 'Butterfly valves for suitable filtration, treatment, transfer, and general plant-water applications.' },
    { iconSlug: 'water-and-wastewater', title: 'Wastewater Treatment Systems', description: 'Valve assemblies for suitable treatment, transfer, and supporting wastewater-facility services.' },
    { iconSlug: 'water-and-wastewater', title: 'Pumping Stations', description: 'Manual or automated butterfly valves for pump isolation, system control, and related piping applications.' },
    { iconSlug: 'water-and-wastewater', title: 'Process and Utility Water', description: 'Butterfly valves for process water, service water, cooling water, washdown, and other supporting plant-water systems.' },
    { iconSlug: 'oem', title: 'Equipment and Maintenance Isolation', description: 'Quarter-turn valves for isolating pumps, treatment equipment, piping sections, and supporting systems for operation or maintenance.' },
    { iconSlug: 'oem', title: 'Automated Flow Control', description: 'Pneumatic or electrically actuated butterfly-valve assemblies for remote operation, sequencing, and suitable modulating applications.' },
  ],
  productSolutions: [
    { title: 'Butterfly Valves', description: 'PDC butterfly valves support shutoff, isolation, throttling, and modulating service across water and wastewater applications. Multiple body styles, materials, seating arrangements, and connection options are available.' },
    { title: 'Pneumatic Actuators', description: 'PDC double-acting and spring-return actuator packages provide quarter-turn automation and can include mounting hardware, position indication, solenoids, limit switches, and other accessories.' },
    { title: 'Electric Actuators', description: 'PDC electric actuators support on/off and selected modulating valve applications, with options for voltage, torque, control signal, feedback, and environmental requirements.' },
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
  heroTitle: 'OEM and Engineered Systems',
  heroDescription:
    'PDC provides butterfly valves, damper valves, actuators, and engineered quarter-turn assemblies for OEMs, system integrators, packaged-equipment builders, and custom machinery applications.',
  shortDescription:
    'Valves and actuators configured for OEM equipment, process skids, machinery, and repeat production.',
  overview:
    'Original equipment manufacturers and system integrators need flow-control components that fit their equipment, perform reliably, and can be reproduced consistently. PDC supplies butterfly valves, damper valves, pneumatic and electric actuators, and complete assemblies for packaged systems, process skids, burner equipment, automated machinery, and custom-engineered systems. Support can include valve selection, actuator sizing, custom brackets and couplings, linkage, mounting configurations, accessory integration, and application-specific assemblies.',
  overviewParagraphs: [
    'Original equipment manufacturers and system integrators need flow-control components that fit the equipment, perform reliably, and can be reproduced consistently from one build to the next.',
    'PDC works with OEM customers to supply butterfly valves, damper valves, pneumatic actuators, electric actuators, and complete valve assemblies for packaged systems, process skids, burner equipment, automated machinery, and custom engineered systems.',
    'Support can include valve selection, actuator sizing, custom brackets and couplings, linkage arrangements, mounting configurations, accessory integration, and application-specific assemblies.',
  ],
  challenges: [
    'Compact integration within packaged equipment and machinery',
    'Repeatable valve and actuator configurations for production builds',
    'Correct actuator sizing for torque and control requirements',
    'Custom mounting, brackets, couplings, and linkage arrangements',
    'Integration of solenoids, limit switches, positioners, and feedback devices',
    'Consistent documentation for submittals, replacement units, and future production',
    'Application-specific configurations for unique equipment requirements',
  ],
  applications: [
    'Packaged Equipment',
    'Process Skids',
    'Burner and Combustion Equipment',
    'Automated Machinery',
    'Custom Valve and Actuator Assemblies',
    'Repeat OEM Production',
  ],
  applicationCards: [
    { iconSlug: 'oem', title: 'Packaged Equipment', description: 'Valve and actuator assemblies for self-contained industrial equipment packages and modular systems.' },
    { iconSlug: 'oem', title: 'Process Skids', description: 'Manual or automated butterfly-valve assemblies for skid-mounted process and utility equipment.' },
    { iconSlug: 'power-generation', title: 'Burner and Combustion Equipment', description: 'Damper and control valves and automated assemblies for combustion-air, gas-handling, and burner-support applications.' },
    { iconSlug: 'oem', title: 'Automated Machinery', description: 'Quarter-turn valve assemblies integrated into automated industrial equipment and machinery.' },
    { iconSlug: 'oem', title: 'Custom Valve and Actuator Assemblies', description: 'Application-specific combinations of valves, actuators, mounting hardware, couplings, linkages, and control accessories.' },
    { iconSlug: 'oem', title: 'Repeat OEM Production', description: 'Standardized valve and actuator configurations intended for repeat use across production equipment or machine families.' },
  ],
  productSolutions: [
    { title: 'Butterfly Valves', description: 'PDC butterfly valves support shutoff, isolation, throttling, and modulating service across OEM and equipment applications. Body styles, materials, seating, and connections can be matched to the equipment and operating conditions.' },
    { title: 'Damper and Control Valves', description: 'PDC damper and control valves provide quarter-turn control and isolation for suitable low-pressure air, gas, combustion, exhaust, and equipment-support applications. Series include Econotrol, Medium Duty, Excel, Flanged End, Reduced Port, Combustion, and Thread End.' },
    { title: 'Pneumatic Actuators', description: 'PDC quarter-turn pneumatic packages include double-acting and spring-return options. Assemblies can incorporate custom mounting hardware, couplings, position indication, solenoids, limit switches, positioners, and other accessories.' },
    { title: 'Electric Actuators', description: 'PDC electric actuators support on/off and selected modulating valve and damper applications, configured around voltage, torque, control signal, feedback, environmental requirements, and equipment interfaces.' },
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
  heroTitle: 'Marine',
  heroDescription:
    'PDC provides butterfly valves, damper valves, actuators, and engineered quarter-turn assemblies for onboard utility, cooling-water, ventilation, machinery-support, and equipment-integration applications.',
  shortDescription:
    'Valves and actuators for marine utility, cooling, ventilation, machinery, and onboard equipment systems.',
  overview:
    'Marine vessels and offshore equipment depend on reliable flow-control components for utility systems, machinery spaces, ventilation, cooling, and supporting equipment. PDC supplies butterfly valves, damper valves, pneumatic and electric actuators, and automated assemblies for suitable shipboard and offshore applications. Configurations include multiple body styles, materials, seating, connections, actuators, mounting, and control accessories. PDC can support custom assemblies for space constraints, equipment interfaces, and installation requirements.',
  overviewParagraphs: [
    'Marine vessels and offshore equipment depend on reliable flow-control components for utility systems, machinery spaces, ventilation, cooling, and supporting equipment.',
    'PDC supplies butterfly valves, damper valves, pneumatic actuators, electric actuators, and complete automated assemblies for suitable shipboard and offshore applications.',
    'Available configurations include multiple body styles, materials, seating, connections, actuator options, mounting arrangements, and control accessories. PDC can support custom assemblies where space constraints, equipment interfaces, or installation requirements call for an application-specific configuration.',
  ],
  challenges: [],
  applications: [
    'Cooling Water Systems',
    'Utility and Service Water',
    'Ventilation and Air Handling',
    'Machinery and Equipment Isolation',
    'Packaged and Skid-Mounted Equipment',
    'Automated Quarter-Turn Control',
  ],
  applicationCards: [
    { iconSlug: 'water-and-wastewater', title: 'Cooling Water Systems', description: 'Butterfly valves for suitable machinery cooling, heat-exchanger isolation, and general onboard cooling-water applications.' },
    { iconSlug: 'water-and-wastewater', title: 'Utility and Service Water', description: 'Valve assemblies for suitable service-water, washdown, auxiliary-water, and general shipboard utility systems.' },
    { iconSlug: 'air-management', title: 'Ventilation and Air Handling', description: 'Damper and control valves for suitable ventilation, machinery-space air handling, intake, exhaust, and general airflow control.' },
    { iconSlug: 'oem', title: 'Machinery and Equipment Isolation', description: 'Manual or automated butterfly valves for isolating pumps, heat exchangers, auxiliary equipment, and supporting piping systems.' },
    { iconSlug: 'oem', title: 'Packaged and Skid-Mounted Equipment', description: 'Valve and actuator assemblies for marine equipment packages, machinery skids, and engineered onboard systems.' },
    { iconSlug: 'oem', title: 'Automated Quarter-Turn Control', description: 'Pneumatic or electrically actuated valve and damper assemblies for remote operation, sequencing, and suitable modulating applications.' },
  ],
  productSolutions: [
    { title: 'Butterfly Valves', description: 'PDC butterfly valves support shutoff, isolation, throttling, and modulating service across marine utility and equipment-support applications. Body styles, materials, seating, and connections vary by service requirement.' },
    { title: 'Damper and Control Valves', description: 'PDC damper and control valves provide quarter-turn control and isolation for suitable ventilation, air handling, exhaust, and low-pressure gas applications. Series include Econotrol, Medium Duty, Excel, Flanged End, Reduced Port, Combustion, and Thread End.' },
    { title: 'Pneumatic Actuators', description: 'PDC double-acting and spring-return actuator packages provide quarter-turn automation and can include mounting hardware, position indication, solenoids, limit switches, positioners, and other control accessories.' },
    { title: 'Electric Actuators', description: 'PDC electric actuators support on/off and selected modulating valve and damper applications, with options for voltage, torque, control signal, feedback, environment, and installation space.' },
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
    'PDC provides butterfly valves, damper valves, actuators, and engineered quarter-turn assemblies for cooling water, combustion air, exhaust, plant utilities, process water, and equipment-isolation applications.',
  shortDescription:
    'Valves and actuators for power-plant cooling, combustion, exhaust, water, utilities, and equipment control.',
  overview:
    'Power generation facilities depend on reliable flow-control equipment across cooling, combustion, air-handling, water, utility, and equipment-support systems. PDC supplies butterfly valves, damper valves, pneumatic and electric actuators, and automated assemblies for suitable liquid, air, gas, and utility services. Configurations include multiple body styles, materials, seating, shaft designs, connections, actuators, mounting arrangements, and controls.',
  overviewParagraphs: [
    'Power generation facilities depend on reliable flow-control equipment across cooling, combustion, air-handling, water, utility, and equipment-support systems.',
    'PDC supplies butterfly valves, damper valves, pneumatic actuators, electric actuators, and complete automated assemblies for suitable liquid, air, gas, and utility services.',
    'Available configurations include multiple body styles, materials, seating arrangements, shaft designs, connection types, actuator options, mounting arrangements, and control accessories. PDC can support application-specific assemblies for plant equipment and combustion systems.',
  ],
  applications: [
    'Cooling Water Systems',
    'Combustion Air Systems',
    'Flue Gas and Exhaust Systems',
    'Plant Utility Systems',
    'Process and Service Water',
    'Equipment Isolation and Automated Control',
  ],
  applicationCards: [
    { iconSlug: 'water-and-wastewater', title: 'Cooling Water Systems', description: 'Butterfly valves for condenser cooling, equipment isolation, circulation, and other suitable plant cooling-water applications.' },
    { iconSlug: 'power-generation', title: 'Combustion Air Systems', description: 'Damper and control valves for combustion-air service serving burners, boilers, furnaces, heaters, and related equipment.' },
    { iconSlug: 'air-management', title: 'Flue Gas and Exhaust Systems', description: 'Damper-valve applications involving exhaust, flue gas, and other suitable low-pressure or elevated-temperature gas services.' },
    { iconSlug: 'oem', title: 'Plant Utility Systems', description: 'Valve and actuator assemblies for water, air, gas, cooling, and other supporting plant utilities.' },
    { iconSlug: 'water-and-wastewater', title: 'Process and Service Water', description: 'Butterfly valves for suitable process-water, service-water, washdown, and equipment-support applications.' },
    { iconSlug: 'oem', title: 'Equipment Isolation and Automated Control', description: 'Manual or automated quarter-turn valve assemblies for equipment isolation, remote operation, sequencing, and suitable modulating applications.' },
  ],
  productSolutions: [
    { title: 'Damper and Control Valves', description: 'PDC damper and control valves provide quarter-turn control and isolation for suitable combustion air, exhaust, flue gas, ventilation, and other low-pressure gas-handling applications. Series include Econotrol, Medium Duty, Excel, Flanged End, Reduced Port, Combustion, and Thread End.' },
    { title: 'Butterfly Valves', description: 'PDC butterfly valves support shutoff, isolation, throttling, and modulating service across water, utility, and process-support applications. High-performance and triple-offset designs support more demanding pressure, temperature, and shutoff requirements.' },
    { title: 'Pneumatic Actuators', description: 'PDC double-acting and spring-return pneumatic packages provide quarter-turn automation with mounting hardware, position indication, solenoids, limit switches, positioners, and other application accessories.' },
    { title: 'Electric Actuators', description: 'PDC electric actuators support on/off and selected modulating valve and damper applications, with options for voltage, torque, control signal, feedback, environmental requirements, and installation conditions.' },
  ],
  productFamilies: [
    'butterfly-damper-valves',
    'butterfly-valves',
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
  heroTitle: 'Pulp and Paper',
  heroDescription:
    'PDC provides butterfly valves, damper valves, actuators, and engineered quarter-turn assemblies for process water, plant utilities, air handling, drying, combustion support, and equipment applications in pulp and paper facilities.',
  shortDescription:
    'Valves and actuators for pulp and paper process water, utilities, drying, ventilation, and equipment support.',
  overview:
    'Pulp and paper mills depend on reliable flow-control equipment across water systems, utility services, drying operations, ventilation, and process-support equipment. PDC supplies butterfly valves, damper valves, pneumatic and electric actuators, and automated assemblies for suitable liquid, air, gas, and utility services. Configurations include multiple body styles, materials, seating, shaft designs, connections, actuators, mounting arrangements, and control accessories. PDC can support application-specific assemblies for packaged equipment, machinery, and plant-support systems.',
  overviewParagraphs: [
    'Pulp and paper mills depend on reliable flow-control equipment across water systems, utility services, drying operations, ventilation, and process-support equipment.',
    'PDC supplies butterfly valves, damper valves, pneumatic actuators, electric actuators, and complete automated assemblies for suitable liquid, air, gas, and utility services.',
    'Available configurations include multiple body styles, materials, seating arrangements, shaft designs, connection types, actuator options, mounting arrangements, and control accessories. PDC can support application-specific assemblies for packaged equipment, machinery, and plant-support systems.',
  ],
  challenges: [],
  applications: [
    'Process and Utility Water',
    'Plant Utility Systems',
    'Drying and Hot-Air Systems',
    'Ventilation and Exhaust Systems',
    'Combustion and Burner Support',
    'OEM and Equipment Integration',
  ],
  applicationCards: [
    { iconSlug: 'water-and-wastewater', title: 'Process and Utility Water', description: 'Butterfly valves for suitable process-water, service-water, cooling-water, washdown, and general mill-water applications.' },
    { iconSlug: 'oem', title: 'Plant Utility Systems', description: 'Valve and actuator assemblies for supporting air, water, gas, cooling, and other facility utilities.' },
    { iconSlug: 'air-management', title: 'Drying and Hot-Air Systems', description: 'Damper and control valves for suitable drying, heated-air, and process-air applications.' },
    { iconSlug: 'air-management', title: 'Ventilation and Exhaust Systems', description: 'Damper-valve applications involving ventilation, exhaust, air handling, and other suitable low-pressure gas services.' },
    { iconSlug: 'power-generation', title: 'Combustion and Burner Support', description: 'Damper and control valves for combustion-air control and related burner, furnace, heater, and thermal-process support systems.' },
    { iconSlug: 'oem', title: 'OEM and Equipment Integration', description: 'Manual or automated valve assemblies for skids, packaged systems, machinery, and engineered mill equipment.' },
  ],
  productSolutions: [
    { title: 'Butterfly Valves', description: 'PDC butterfly valves provide shutoff, isolation, throttling, and modulating service across suitable water, utility, and process-support applications. Multiple body styles, materials, seating, and connection options are available.' },
    { title: 'Damper and Control Valves', description: 'PDC damper and control valves provide quarter-turn control and isolation for suitable drying air, ventilation, exhaust, combustion air, and other low-pressure gas-handling applications. Series include Econotrol, Medium Duty, Excel, Flanged End, Reduced Port, Combustion, and Thread End.' },
    { title: 'Pneumatic Actuators', description: 'PDC double-acting and spring-return actuator packages provide quarter-turn automation and can include mounting hardware, position indication, solenoids, limit switches, positioners, and other control accessories.' },
    { title: 'Electric Actuators', description: 'PDC electric actuators support on/off and selected modulating valve and damper applications, with options for voltage, torque, control signal, feedback, and environmental requirements.' },
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
