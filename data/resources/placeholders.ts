import type {
  DownloadFileType,
  ResourceCategory,
} from '@/types/content';

/**
 * Resource Center placeholder data.
 *
 * These are professional placeholders only — no fake files, no broken links.
 * Each entry represents a document slot that will be populated with verified
 * literature from the existing PDC website. Download URLs are intentionally
 * omitted so no broken links are generated.
 */

export interface ResourcePlaceholder {
  id: string;
  title: string;
  category: ResourceCategory;
  documentType: DownloadFileType;
  productFamily?: string;
  industry?: string;
  language: string;
  revision?: string;
  fileSize?: string;
  featured?: boolean;
  popular?: boolean;
}

/** Document type display labels. */
export const documentTypeLabels: Record<DownloadFileType, string> = {
  pdf: 'PDF',
  datasheet: 'Datasheet',
  cad: 'CAD',
  step: 'STEP',
  dwg: 'DWG',
  'installation-manual': 'Installation Manual',
  'maintenance-manual': 'Maintenance Manual',
  certificate: 'Certificate',
  'technical-bulletin': 'Technical Bulletin',
  'application-guide': 'Application Guide',
  guide: 'Application Guide',
};

/** Resource category display labels. */
export const categoryLabels: Record<ResourceCategory, string> = {
  'technical-article': 'Technical Article',
  'case-study': 'Case Study',
  'white-paper': 'White Paper',
  video: 'Video',
  faq: 'FAQ',
  documentation: 'Documentation',
};

/** Filterable document types for the Resources Center. */
export const documentTypeFilters: { value: DownloadFileType; label: string }[] = [
  { value: 'pdf', label: 'Product Literature' },
  { value: 'datasheet', label: 'Datasheets' },
  { value: 'cad', label: 'CAD Files' },
  { value: 'step', label: 'STEP Files' },
  { value: 'dwg', label: 'DWG Files' },
  { value: 'installation-manual', label: 'Installation Manuals' },
  { value: 'maintenance-manual', label: 'Maintenance Manuals' },
  { value: 'certificate', label: 'Certificates' },
  { value: 'technical-bulletin', label: 'Technical Bulletins' },
  { value: 'application-guide', label: 'Application Guides' },
  { value: 'guide', label: 'Application Guides' },
];

/** Filterable product families for the Resources Center. */
export const productFamilyFilters: { value: string; label: string }[] = [
  { value: 'butterfly-damper-valves', label: 'Butterfly Damper Valves' },
  { value: 'butterfly-valves', label: 'Butterfly Valves' },
  { value: 'pneumatic-actuators', label: 'Pneumatic Actuators' },
  { value: 'electric-actuators', label: 'Electric Actuators' },
];

/** Filterable industries for the Resources Center. */
export const industryFilters: { value: string; label: string }[] = [
  { value: 'power-generation', label: 'Power Generation' },
  { value: 'oil-and-gas', label: 'Oil & Gas' },
  { value: 'chemical', label: 'Chemical' },
  { value: 'petrochemical', label: 'Petrochemical' },
  { value: 'water-and-wastewater', label: 'Water & Wastewater' },
  { value: 'steel', label: 'Steel' },
  { value: 'cement', label: 'Cement' },
  { value: 'mining', label: 'Mining' },
];

/** Filterable languages for the Resources Center. */
export const languageFilters: { value: string; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'zh', label: 'Chinese' },
];

/** Filterable publication date ranges for the Resources Center. */
export const dateFilters: { value: string; label: string }[] = [
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' },
  { value: 'older', label: '2021 & Earlier' },
];

/** Filterable document categories for the Resources Center. */
export const categoryFilters: { value: ResourceCategory; label: string }[] = [
  { value: 'documentation', label: 'Documentation' },
  { value: 'technical-article', label: 'Technical Articles' },
  { value: 'case-study', label: 'Case Studies' },
  { value: 'white-paper', label: 'White Papers' },
  { value: 'faq', label: 'FAQs' },
  { value: 'video', label: 'Videos' },
];

/**
 * Professional placeholder resource slots.
 * These represent the document types that will be populated with verified
 * literature. No fake file URLs are included.
 */
export const resourcePlaceholders: ResourcePlaceholder[] = [
  {
    id: 'ph-001',
    title: 'Butterfly Damper Valve Product Brochure',
    category: 'documentation',
    documentType: 'pdf',
    productFamily: 'butterfly-damper-valves',
    industry: 'power-generation',
    language: 'en',
    revision: 'Rev. C',
    fileSize: '2.4 MB',
    featured: true,
    popular: true,
  },
  {
    id: 'ph-002',
    title: 'High-Performance Butterfly Valve Datasheet',
    category: 'documentation',
    documentType: 'pdf',
    productFamily: 'butterfly-valves',
    industry: 'oil-and-gas',
    language: 'en',
    revision: 'Rev. B',
    fileSize: '1.8 MB',
    featured: true,
    popular: true,
  },
  {
    id: 'ph-003',
    title: 'Butterfly Damper Valve Installation Manual',
    category: 'documentation',
    documentType: 'installation-manual',
    productFamily: 'butterfly-damper-valves',
    language: 'en',
    revision: 'Rev. A',
    fileSize: '3.1 MB',
    featured: true,
  },
  {
    id: 'ph-004',
    title: 'Pneumatic Actuator Maintenance Manual',
    category: 'documentation',
    documentType: 'maintenance-manual',
    productFamily: 'pneumatic-actuators',
    language: 'en',
    revision: 'Rev. 2',
    fileSize: '4.2 MB',
    popular: true,
  },
  {
    id: 'ph-006',
    title: 'Electric Actuator CAD Drawing — DWG',
    category: 'documentation',
    documentType: 'dwg',
    productFamily: 'electric-actuators',
    language: 'en',
    fileSize: '1.2 MB',
  },
  {
    id: 'ph-007',
    title: 'ISO 9001 Quality Certificate',
    category: 'documentation',
    documentType: 'certificate',
    language: 'en',
    revision: '2024',
    fileSize: '0.6 MB',
    featured: true,
  },
  {
    id: 'ph-009',
    title: 'Butterfly Valve Selection — Technical Bulletin',
    category: 'technical-article',
    documentType: 'pdf',
    productFamily: 'butterfly-valves',
    language: 'en',
    revision: 'Rev. A',
    fileSize: '1.5 MB',
  },
  {
    id: 'ph-010',
    title: 'Damper Valve Sizing for Power Plants — Case Study',
    category: 'case-study',
    documentType: 'pdf',
    productFamily: 'butterfly-damper-valves',
    industry: 'power-generation',
    language: 'en',
    fileSize: '2.1 MB',
  },
  {
    id: 'ph-011',
    title: 'Actuator Sizing and Selection — White Paper',
    category: 'white-paper',
    documentType: 'pdf',
    language: 'en',
    fileSize: '3.4 MB',
  },
  {
    id: 'ph-012',
    title: 'Valve Material Selection Guide — Chemical Service',
    category: 'technical-article',
    documentType: 'guide',
    industry: 'chemical',
    language: 'en',
    fileSize: '2.0 MB',
  },
];
