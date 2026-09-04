import type { ProductFamilyData } from '@/types/product';

/**
 * Verified product families from the existing PDC website.
 * Route slugs match the established site hierarchy for SEO continuity.
 */
export const productFamiliesData: ProductFamilyData[] = [
  {
    name: 'Butterfly Damper Valves',
    slug: 'butterfly-damper-valves',
    shortDescription:
      'Heavy-duty dampers engineered for high-temperature gas and air flow control.',
    route: '/products/butterfly-damper-valves',
    imageRef: '/images/products/families/Butterfly-damper-valves-family.png',
    overview:
      'Butterfly damper valves provide reliable flow control for high-temperature gas and air handling systems across power generation, steel, cement, and industrial process applications.',
    overviewSections: {
      introduction:
        'PDC butterfly damper valves are engineered for demanding industrial gas and air flow control applications. With decades of manufacturing expertise, our dampers deliver reliable shutoff and modulation in high-temperature environments where performance and durability are critical.',
      advantages: [
        'Robust construction for high-temperature service',
        'Precision-machined components for tight shutoff',
        'Low-torque operation for smooth actuation',
        'Available in multiple end connections and sizes',
        'Custom configurations for unique installation requirements',
      ],
      applications: [
        'Combustion air control',
        'Flue gas isolation',
        'Process gas handling',
        'Ventilation and exhaust systems',
      ],
      customization:
        'Custom designs are available for non-standard sizes, special materials, unique end connections, and application-specific actuation packages. Our engineering team works directly with customers to develop solutions for the most demanding installations.',
    },
    applications: [
      {
        iconSlug: 'power-generation',
        title: 'Power Generation',
        description:
          'Combustion air and flue gas dampers for boiler, turbine, and HRSG systems.',
      },
      {
        iconSlug: 'steel',
        title: 'Steel',
        description:
          'High-temperature dampers for blast furnaces, coke ovens, and steelmaking exhaust.',
      },
      {
        iconSlug: 'cement',
        title: 'Cement',
        description:
          'Kiln exhaust and preheater tower damper valves for cement manufacturing.',
      },
      {
        iconSlug: 'mining',
        title: 'Mining',
        description:
          'Ventilation and exhaust flow control for underground and surface mining.',
      },
      {
        iconSlug: 'chemical',
        title: 'Chemical Processing',
        description:
          'Corrosion-resistant dampers for chemical plant gas handling and process isolation.',
      },
      {
        iconSlug: 'air-pollution-control',
        title: 'Air Pollution Control',
        description:
          'Isolation dampers for scrubbers, baghouses, and emissions control systems.',
      },
    ],
    downloads: [
      { label: 'Product Brochure', type: 'pdf', filename: 'butterfly-damper-brochure.pdf' },
      { label: 'Technical Datasheet', type: 'pdf', filename: 'butterfly-damper-datasheet.pdf' },
      { label: 'Installation Guide', type: 'guide', filename: 'butterfly-damper-installation.pdf' },
      { label: 'CAD Drawings', type: 'cad', filename: 'butterfly-damper-cad.step' },
    ],
    trustBadges: [
      'Since 1970',
      'Custom Engineered',
      'Industrial Grade',
      'ISO Quality',
    ],
  },
  {
    name: 'Butterfly Valves',
    slug: 'butterfly-valves',
    shortDescription:
      'Precision-machined butterfly valves for reliable shutoff and throttling.',
    route: '/products/butterfly-valves',
    imageRef: '/images/products/butterfly-valves.svg',
  },
  {
    name: 'Pneumatic Actuators',
    slug: 'pneumatic-actuators',
    shortDescription:
      'High-torque pneumatic actuators built for fast, dependable valve operation.',
    route: '/products/pneumatic-actuators',
    imageRef: '/images/products/pneumatic-actuators.svg',
  },
  {
    name: 'Electric Actuators',
    slug: 'electric-actuators',
    shortDescription:
      'Electric actuation with precise positioning and integrated control.',
    route: '/products/electric-actuators',
    imageRef: '/images/products/electric-actuators.svg',
  },
];

export function getProductFamilyBySlug(
  slug: string,
): ProductFamilyData | undefined {
  return productFamiliesData.find((f) => f.slug === slug);
}
