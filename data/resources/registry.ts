import type {
  ResourceCenterCategory,
  ResourceFileType,
  ResourceItem,
} from '@/types/content';

/* ----------------------------------------------------------------
 * Category definitions
 * ---------------------------------------------------------------- */

export interface ResourceCategoryDef {
  slug: ResourceCenterCategory;
  label: string;
  shortLabel: string;
  description: string;
  icon: string;
  href: string;
}

export const resourceCategories: ResourceCategoryDef[] = [
  {
    slug: 'brochures',
    label: 'Brochures',
    shortLabel: 'Brochures',
    description:
      'Access PDC product literature for butterfly valves, Damper and Control Valves, pneumatic actuators, electric actuators, accessories, and related flow-control products. Brochures include product descriptions, available configurations, materials, dimensions, performance data, and application information to support product selection and engineering review.',
    icon: 'FileText',
    href: '/resources/brochures',
  },
  {
    slug: 'datasheets',
    label: 'Technical Data',
    shortLabel: 'Technical Data',
    description:
      'Find product specifications, dimensions, materials, torque data, Cv information, and other engineering resources for product selection and application review.',
    icon: 'ClipboardList',
    href: '/resources/datasheets',
  },
  {
    slug: 'manuals',
    label: 'Manuals',
    shortLabel: 'Manuals',
    description:
      'Installation, operation, and maintenance manuals for PDC valves and actuators.',
    icon: 'Wrench',
    href: '/resources/manuals',
  },
  {
    slug: 'cad',
    label: 'CAD Drawings',
    shortLabel: 'CAD',
    description:
      '2D and 3D CAD files including DWG, DXF, STEP, and IGES formats for design integration.',
    icon: 'Box',
    href: '/resources/cad',
  },
  {
    slug: 'certifications',
    label: 'Certifications',
    shortLabel: 'Certifications',
    description:
      'Quality certifications, compliance documents, and material certificates.',
    icon: 'Award',
    href: '/resources/certifications',
  },
];

/* ----------------------------------------------------------------
 * File type metadata
 * ---------------------------------------------------------------- */

export const fileTypeLabels: Record<ResourceFileType, string> = {
  pdf: 'PDF',
  dwg: 'DWG',
  dxf: 'DXF',
  step: 'STEP',
  iges: 'IGES',
  zip: 'ZIP',
  doc: 'DOC',
  xls: 'XLS',
};

export const fileTypeFilters: { value: ResourceFileType; label: string }[] = [
  { value: 'pdf', label: 'PDF' },
  { value: 'dwg', label: 'DWG' },
  { value: 'dxf', label: 'DXF' },
  { value: 'step', label: 'STEP' },
  { value: 'iges', label: 'IGES' },
  { value: 'zip', label: 'ZIP' },
  { value: 'doc', label: 'DOC' },
  { value: 'xls', label: 'XLS' },
];

/* ----------------------------------------------------------------
 * Product family filters (canonical slugs)
 * ---------------------------------------------------------------- */

export const resourceFamilyFilters: { value: string; label: string }[] = [
  { value: 'butterfly-damper-valves', label: 'Damper and Control Valves' },
  { value: 'butterfly-valves', label: 'Butterfly Valves' },
  { value: 'pneumatic-actuators', label: 'Pneumatic Actuators' },
  { value: 'electric-actuators', label: 'Electric Actuators' },
];

/* ----------------------------------------------------------------
 * Availability filters
 * ---------------------------------------------------------------- */

export const availabilityFilters: { value: string; label: string }[] = [
  { value: 'available', label: 'Available' },
  { value: 'upon-request', label: 'Available Upon Request' },
  { value: 'coming-soon', label: 'Coming Soon' },
];

/* ----------------------------------------------------------------
 * Canonical resource registry
 *
 * Only verified public brochures are included. All other document
 * types (datasheets, manuals, CAD, certifications) are omitted until
 * verified files are available. No fabricated revision numbers, dates,
 * file sizes, or download URLs.
 * ---------------------------------------------------------------- */

export const resourceRegistry: ResourceItem[] = [
  {
    id: 'res-002',
    title: 'Pneumatic Actuator Literature',
    slug: 'pneumatic-actuator-brochure',
    category: 'brochures',
    productFamily: 'pneumatic-actuators',
    product: null,
    description:
      'Contact PDC Sales for available pneumatic actuator product literature and application information.',
    documentType: 'Brochure',
    fileType: 'pdf',
    fileSize: null,
    language: 'en',
    revision: null,
    publishedDate: null,
    downloadUrl: null,
    thumbnail: null,
    featured: true,
    seoTitle: 'Pneumatic Actuator Literature | PDC Valve & Actuators',
    seoDescription:
      'Request pneumatic actuator product literature and application information from PDC Sales.',
    downloadStatus: 'upon-request',
  },
  {
    id: 'res-003',
    title: 'Electric Actuator Literature',
    slug: 'electric-actuator-brochure',
    category: 'brochures',
    productFamily: 'electric-actuators',
    product: null,
    description:
      'Contact PDC Sales for available electric actuator product literature and application information.',
    documentType: 'Brochure',
    fileType: 'pdf',
    fileSize: null,
    language: 'en',
    revision: null,
    publishedDate: null,
    downloadUrl: null,
    thumbnail: null,
    featured: true,
    seoTitle: 'Electric Actuator Literature | PDC Valve & Actuators',
    seoDescription:
      'Request electric actuator product literature and application information from PDC Sales.',
    downloadStatus: 'upon-request',
  },
  {
    id: 'res-004',
    title: 'PDC Accessories Seat Options',
    slug: 'pdc-accessories-seat-options',
    category: 'brochures',
    productFamily: null,
    product: null,
    description: 'Accessory literature describing PDC seat options.',
    documentType: 'Brochure',
    fileType: 'pdf',
    fileSize: '71 KB',
    language: 'en',
    revision: null,
    publishedDate: null,
    downloadUrl: '/documents/brochures/pdc-accessories-seat-options.pdf',
    thumbnail: null,
    featured: false,
    seoTitle: 'PDC Accessories Seat Options | PDC Valve & Actuators',
    seoDescription: 'Download PDC accessories literature covering seat options.',
    downloadStatus: 'available',
  },
  {
    id: 'res-005',
    title: 'PDC Accessories Standard Shaft Configurations',
    slug: 'pdc-accessories-standard-shaft-configurations',
    category: 'brochures',
    productFamily: null,
    product: null,
    description: 'Accessory literature describing standard shaft configurations.',
    documentType: 'Brochure',
    fileType: 'pdf',
    fileSize: '43 KB',
    language: 'en',
    revision: null,
    publishedDate: null,
    downloadUrl: '/documents/brochures/pdc-accessories-standard-shaft-configurations.pdf',
    thumbnail: null,
    featured: false,
    seoTitle: 'PDC Standard Shaft Configurations | PDC Valve & Actuators',
    seoDescription: 'Download PDC accessories literature covering standard shaft configurations.',
    downloadStatus: 'available',
  },
  {
    id: 'res-006',
    title: 'PDC Accessories Universal Brackets and Linkages',
    slug: 'pdc-accessories-universal-brackets-and-linkages',
    category: 'brochures',
    productFamily: null,
    product: null,
    description: 'Accessory literature describing universal brackets and linkages.',
    documentType: 'Brochure',
    fileType: 'pdf',
    fileSize: '107 KB',
    language: 'en',
    revision: null,
    publishedDate: null,
    downloadUrl: '/documents/brochures/pdc-accessories-universal-brackets-and-linkages.pdf',
    thumbnail: null,
    featured: false,
    seoTitle: 'PDC Universal Brackets and Linkages | PDC Valve & Actuators',
    seoDescription: 'Download PDC accessories literature covering universal brackets and linkages.',
    downloadStatus: 'available',
  },
  {
    id: 'res-007',
    title: 'PDC Combustion Series 22 Butterfly Valve',
    slug: 'pdc-combustion-series-22-butterfly-valve',
    category: 'brochures',
    productFamily: 'butterfly-damper-valves',
    product: null,
    description: 'Product brochure for the PDC Combustion Series 22 butterfly valve.',
    documentType: 'Brochure',
    fileType: 'pdf',
    fileSize: '305 KB',
    language: 'en',
    revision: null,
    publishedDate: null,
    downloadUrl: '/documents/brochures/pdc-combustion-series-22-butterfly-valve.pdf',
    thumbnail: null,
    featured: false,
    seoTitle: 'Combustion Series 22 Butterfly Valve | PDC Valve & Actuators',
    seoDescription: 'Download the PDC Combustion Series 22 butterfly valve brochure.',
    downloadStatus: 'available',
  },
  {
    id: 'res-008',
    title: 'PDC Econotrol Series 09 Butterfly Valve',
    slug: 'pdc-econotrol-series-09-butterfly-valve',
    category: 'brochures',
    productFamily: 'butterfly-damper-valves',
    product: null,
    description: 'Product brochure for the PDC Econotrol Series 09 butterfly valve.',
    documentType: 'Brochure',
    fileType: 'pdf',
    fileSize: '657 KB',
    language: 'en',
    revision: null,
    publishedDate: null,
    downloadUrl: '/documents/brochures/pdc-econotrol-series-09-butterfly-valve.pdf',
    thumbnail: null,
    featured: false,
    seoTitle: 'Econotrol Series 09 Butterfly Valve | PDC Valve & Actuators',
    seoDescription: 'Download the PDC Econotrol Series 09 butterfly valve brochure.',
    downloadStatus: 'available',
  },
  {
    id: 'res-009',
    title: 'PDC Excel Series 40 Butterfly Valve',
    slug: 'pdc-excel-series-40-butterfly-valve',
    category: 'brochures',
    productFamily: 'butterfly-damper-valves',
    product: null,
    description: 'Product brochure for the PDC Excel Series 40 butterfly valve.',
    documentType: 'Brochure',
    fileType: 'pdf',
    fileSize: '1.28 MB',
    language: 'en',
    revision: null,
    publishedDate: null,
    downloadUrl: '/documents/brochures/pdc-excel-series-40-butterfly-valve.pdf',
    thumbnail: null,
    featured: false,
    seoTitle: 'Excel Series 40 Butterfly Valve | PDC Valve & Actuators',
    seoDescription: 'Download the PDC Excel Series 40 butterfly valve brochure.',
    downloadStatus: 'available',
  },
  {
    id: 'res-010',
    title: 'PDC Flanged Series 39 Butterfly Valve',
    slug: 'pdc-flanged-series-39-butterfly-valve',
    category: 'brochures',
    productFamily: 'butterfly-damper-valves',
    product: null,
    description: 'Product brochure for the PDC Flanged Series 39 butterfly valve.',
    documentType: 'Brochure',
    fileType: 'pdf',
    fileSize: '354 KB',
    language: 'en',
    revision: null,
    publishedDate: null,
    downloadUrl: '/documents/brochures/pdc-flanged-series-39-butterfly-valve.pdf',
    thumbnail: null,
    featured: false,
    seoTitle: 'Flanged Series 39 Butterfly Valve | PDC Valve & Actuators',
    seoDescription: 'Download the PDC Flanged Series 39 butterfly valve brochure.',
    downloadStatus: 'available',
  },
  {
    id: 'res-011',
    title: 'PDC Medium Duty Series 01 Butterfly Valve',
    slug: 'pdc-medium-duty-series-01-butterfly-valve',
    category: 'brochures',
    productFamily: 'butterfly-damper-valves',
    product: null,
    description: 'Product brochure for the PDC Medium Duty Series 01 butterfly valve.',
    documentType: 'Brochure',
    fileType: 'pdf',
    fileSize: '650 KB',
    language: 'en',
    revision: null,
    publishedDate: null,
    downloadUrl: '/documents/brochures/pdc-medium-duty-series-01-butterfly-valve.pdf',
    thumbnail: null,
    featured: false,
    seoTitle: 'Medium Duty Series 01 Butterfly Valve | PDC Valve & Actuators',
    seoDescription: 'Download the PDC Medium Duty Series 01 butterfly valve brochure.',
    downloadStatus: 'available',
  },
  {
    id: 'res-012',
    title: 'PDC Reduced Port Series 15 Butterfly Valve',
    slug: 'pdc-reduced-port-series-15-butterfly-valve',
    category: 'brochures',
    productFamily: 'butterfly-damper-valves',
    product: null,
    description: 'Product brochure for the PDC Reduced Port Series 15 butterfly valve.',
    documentType: 'Brochure',
    fileType: 'pdf',
    fileSize: '547 KB',
    language: 'en',
    revision: null,
    publishedDate: null,
    downloadUrl: '/documents/brochures/pdc-reduced-port-series-15-butterfly-valve.pdf',
    thumbnail: null,
    featured: false,
    seoTitle: 'Reduced Port Series 15 Butterfly Valve | PDC Valve & Actuators',
    seoDescription: 'Download the PDC Reduced Port Series 15 butterfly valve brochure.',
    downloadStatus: 'available',
  },
  {
    id: 'res-013',
    title: 'PDC Thread End Series 07 Butterfly Valve',
    slug: 'pdc-thread-end-series-07-butterfly-valve',
    category: 'brochures',
    productFamily: 'butterfly-damper-valves',
    product: null,
    description: 'Product brochure for the PDC Thread End Series 07 butterfly valve.',
    documentType: 'Brochure',
    fileType: 'pdf',
    fileSize: '390 KB',
    language: 'en',
    revision: null,
    publishedDate: null,
    downloadUrl: '/documents/brochures/pdc-thread-end-series-07-butterfly-valve.pdf',
    thumbnail: null,
    featured: false,
    seoTitle: 'Thread End Series 07 Butterfly Valve | PDC Valve & Actuators',
    seoDescription: 'Download the PDC Thread End Series 07 butterfly valve brochure.',
    downloadStatus: 'available',
  },
];

/* ----------------------------------------------------------------
 * Helper functions
 * ---------------------------------------------------------------- */

/** Get all resources for a given category. */
export function getResourcesByCategorySlug(
  category: ResourceCenterCategory,
): ResourceItem[] {
  return resourceRegistry.filter((r) => r.category === category);
}

/** Get featured resources. */
export function getFeaturedResources(): ResourceItem[] {
  return resourceRegistry.filter((r) => r.featured);
}

/** Get resources for a product family. */
export function getResourcesByFamilySlug(
  familySlug: string,
): ResourceItem[] {
  return resourceRegistry.filter((r) => r.productFamily === familySlug);
}

/** Look up a category definition by slug. */
export function getResourceCategoryDef(
  slug: ResourceCenterCategory,
): ResourceCategoryDef | undefined {
  return resourceCategories.find((c) => c.slug === slug);
}

/** Get resource count for a category. */
export function getResourceCountByCategory(
  category: ResourceCenterCategory,
): number {
  return resourceRegistry.filter((r) => r.category === category).length;
}

/** Get recently added resources (all for now, sorted by id descending). */
export function getRecentlyAddedResources(): ResourceItem[] {
  return [...resourceRegistry].reverse();
}
