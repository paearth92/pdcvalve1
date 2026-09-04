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
      'Product brochures and literature covering valve and actuator families, features, and applications.',
    icon: 'FileText',
    href: '/resources/brochures',
  },
  {
    slug: 'datasheets',
    label: 'Datasheets',
    shortLabel: 'Datasheets',
    description:
      'Technical datasheets with dimensional data, pressure ratings, materials, and operating parameters.',
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
  { value: 'butterfly-damper-valves', label: 'Butterfly Damper Valves' },
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
    title: 'Pneumatic Actuator Product Brochure',
    slug: 'pneumatic-actuator-brochure',
    category: 'brochures',
    productFamily: 'pneumatic-actuators',
    product: null,
    description:
      'Product brochure for PDC pneumatic actuator lines including double-acting and spring-return models. Covers torque ranges, operating pressures, and mounting options.',
    documentType: 'Brochure',
    fileType: 'pdf',
    fileSize: null,
    language: 'en',
    revision: null,
    publishedDate: null,
    downloadUrl: null,
    thumbnail: null,
    featured: true,
    seoTitle: 'Pneumatic Actuator Product Brochure | PDC Valve & Actuators',
    seoDescription:
      'Download the PDC pneumatic actuator product brochure covering double-acting and spring-return models with torque and mounting data.',
    downloadStatus: 'upon-request',
  },
  {
    id: 'res-003',
    title: 'Electric Actuator Product Brochure',
    slug: 'electric-actuator-brochure',
    category: 'brochures',
    productFamily: 'electric-actuators',
    product: null,
    description:
      'Product brochure for PDC electric actuator lines including PDCQ and PDCS series. Covers torque outputs, control options, and enclosure ratings.',
    documentType: 'Brochure',
    fileType: 'pdf',
    fileSize: null,
    language: 'en',
    revision: null,
    publishedDate: null,
    downloadUrl: null,
    thumbnail: null,
    featured: true,
    seoTitle: 'Electric Actuator Product Brochure | PDC Valve & Actuators',
    seoDescription:
      'Download the PDC electric actuator product brochure covering PDCQ and PDCS series with torque, control, and enclosure data.',
    downloadStatus: 'upon-request',
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
