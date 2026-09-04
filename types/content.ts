/**
 * Content migration framework — reusable type system.
 *
 * This module establishes the canonical content interfaces for the PDC
 * website migration. Every page can receive real engineering content
 * without changing layouts by conforming to these structures.
 *
 * Design principles:
 * - All engineering fields are optional until verified data is imported.
 * - No field should contain placeholder or invented engineering values.
 * - Interfaces are composed, not duplicated, across content types.
 */

/* ============================================================
 * Shared primitives
 * ========================================================== */

/** Canonical download file types supported by the content system. */
export type DownloadFileType =
  | 'pdf'
  | 'datasheet'
  | 'cad'
  | 'step'
  | 'dwg'
  | 'installation-manual'
  | 'maintenance-manual'
  | 'certificate'
  | 'technical-bulletin'
  | 'application-guide'
  | 'guide';

/** A single downloadable resource attached to a product, family, or page. */
export interface DownloadEntry {
  label: string;
  type: DownloadFileType;
  filename: string;
  url?: string;
  /** File size in bytes, when known. */
  sizeBytes?: number;
  /** ISO date string of last revision. */
  updatedAt?: string;
}

/** A label/value specification row. */
export interface SpecRow {
  label: string;
  value: string;
}

/** A grouped specification table. */
export interface SpecGroup {
  heading: string;
  /** Optional category tag for standard grouping (General, Materials, Pressure, etc.). */
  category?: SpecGroupCategory;
  rows: SpecRow[];
}

/** Standard specification group categories for consistent grouping. */
export type SpecGroupCategory =
  | 'general'
  | 'construction'
  | 'materials'
  | 'pressure'
  | 'temperature'
  | 'connections'
  | 'operation'
  | 'dimensions'
  | 'performance'
  | 'certifications';

/** A named feature with a short description. */
export interface FeatureEntry {
  iconSlug?: string;
  title: string;
  description: string;
}

/** A named product benefit (distinct from a feature — the "why", not the "what"). */
export interface BenefitEntry {
  title: string;
  description: string;
}

/** A reference to a related product by family + product slug. */
export interface RelatedProductRef {
  familySlug: string;
  productSlug: string;
  /** Optional display override; falls back to the referenced product's name. */
  name?: string;
  description?: string;
}

/* ============================================================
 * Image system
 * ========================================================== */

export type ImageKind =
  | 'hero'
  | 'gallery'
  | 'transparent-png'
  | 'technical-drawing'
  | 'cad-preview'
  | 'thumbnail';

/** A single image with kind classification and accessibility metadata. */
export interface ContentImage {
  src: string;
  alt: string;
  kind: ImageKind;
  /** Optional caption for gallery / technical drawing display. */
  caption?: string;
  /** Optional width/height in pixels for layout stability. */
  width?: number;
  height?: number;
}

/** A reusable image set for any content object. */
export interface ImageSet {
  hero?: ContentImage;
  thumbnail?: ContentImage;
  gallery?: ContentImage[];
  technicalDrawings?: ContentImage[];
  cadPreview?: ContentImage;
  transparentPng?: ContentImage;
}

/* ============================================================
 * SEO system
 * ========================================================== */

/** Open Graph metadata for social sharing. */
export interface OpenGraphData {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  siteName?: string;
}

/** JSON-LD structured data placeholder for rich results. */
export interface JsonLdData {
  /** The schema.org type, e.g. 'Product', 'Organization', 'BreadcrumbList'. */
  type: string;
  /** Raw JSON-LD object to be serialized to a script tag. */
  data: Record<string, unknown>;
}

/** Canonical SEO metadata supported by every content object. */
export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  openGraph?: OpenGraphData;
  jsonLd?: JsonLdData[];
  /** When true, search engines are instructed not to index this page. */
  noIndex?: boolean;
}

/* ============================================================
 * Application / industry references
 * ========================================================== */

/** An application card shown on family and product pages. */
export interface ApplicationCard {
  iconSlug: string;
  title: string;
  description: string;
}

/** An industry reference attached to products and families. */
export interface IndustryRef {
  iconSlug?: string;
  slug: string;
  title: string;
  description?: string;
}

/** A grouped application list (industries, applications, benefits). */
export interface ApplicationGroup {
  heading: string;
  items: string[];
}

/* ============================================================
 * Product Families
 * ========================================================== */

/** Narrative overview sections for a product family page. */
export interface FamilyOverviewSections {
  introduction: string;
  advantages: string[];
  applications: string[];
  customization: string;
}

/** A product family content object. */
export interface ProductFamilyContent {
  name: string;
  slug: string;
  shortDescription: string;
  route: string;
  imageRef: string;
  /** Optional eyebrow label shown above the hero title. */
  eyebrow?: string;
  /** Optional hero title override; falls back to name. */
  heroTitle?: string;
  /** Optional hero description override; falls back to shortDescription. */
  heroDescription?: string;
  overview?: string;
  overviewSections?: FamilyOverviewSections;
  applications?: ApplicationCard[];
  industries?: IndustryRef[];
  /** Slugs of products belonging to this family. */
  productRefs?: string[];
  downloads?: DownloadEntry[];
  trustBadges?: string[];
  images?: ImageSet;
  seo?: SEOData;
}

/* ============================================================
 * Individual Products
 * ========================================================== */

/** Lifecycle status of a product in the catalog. */
export type ProductLifecycleStatus =
  | 'active'
  | 'discontinued'
  | 'obsolete'
  | 'limited-availability'
  | 'made-to-order';

/** A product content object — supports all future engineering fields. */
export interface ProductContent {
  id: string;
  slug: string;
  familySlug: string;
  /** Display name of the parent family, for convenience. */
  familyName?: string;
  /** Full route path for this product detail page. */
  route?: string;
  name: string;
  series?: string;
  shortDescription?: string;
  overview?: string;
  /** Multi-paragraph overview for detail pages. */
  overviewParagraphs?: string[];
  features?: FeatureEntry[];
  benefits?: BenefitEntry[];
  applications?: string[];
  applicationGroups?: ApplicationGroup[];
  industries?: IndustryRef[];
  specifications?: SpecRow[];
  specGroups?: SpecGroup[];
  downloads?: DownloadEntry[];
  relatedProducts?: RelatedProductRef[];
  images?: ImageSet;
  badges?: string[];
  trustBadges?: string[];
  /** Product lifecycle status. */
  lifecycleStatus?: ProductLifecycleStatus;
  engineering?: ProductEngineeringData;
  seo?: SEOData;
}

/* ============================================================
 * Industries
 * ========================================================== */

/** An industry content object for the Industries section. */
export interface IndustryContent {
  name: string;
  slug: string;
  shortDescription: string;
  route: string;
  /** Eyebrow label shown above the hero title. */
  eyebrow?: string;
  /** Hero title override; falls back to name. */
  heroTitle?: string;
  /** Hero description override; falls back to shortDescription. */
  heroDescription?: string;
  overview?: string;
  overviewParagraphs?: string[];
  /** Operating challenges as a list of concise statements. */
  challenges?: string[];
  solutions?: FeatureEntry[];
  /** Common application areas as concise strings. */
  applications?: string[];
  /** Application cards with icons (legacy support). */
  applicationCards?: ApplicationCard[];
  /** Slugs of relevant product families (canonical family slugs). */
  productFamilies?: string[];
  images?: ImageSet;
  seo?: SEOData;
}

/* ============================================================
 * Company Pages
 * ========================================================== */

export type CompanyPageSlug =
  | 'about'
  | 'engineering'
  | 'manufacturing'
  | 'quality'
  | 'careers'
  | 'news'
  | 'warranty'
  | 'contact';

/** A company page content object (About, Careers, News, etc.). */
export interface CompanyPageContent {
  slug: CompanyPageSlug;
  title: string;
  subtitle?: string;
  /** Eyebrow label shown above the hero title. */
  eyebrow?: string;
  /** Hero title override; falls back to title. */
  heroTitle?: string;
  /** Hero description override; falls back to subtitle or overview. */
  heroDescription?: string;
  overview?: string;
  overviewParagraphs?: string[];
  sections?: CompanyPageSection[];
  /** Feature cards displayed in a grid below the intro. */
  featureCards?: CompanyFeatureCard[];
  images?: ImageSet;
  seo?: SEOData;
}

/** A modular section within a company page. */
export interface CompanyPageSection {
  heading: string;
  /** Optional eyebrow label shown above the heading. */
  eyebrow?: string;
  body?: string;
  bodyParagraphs?: string[];
  items?: string[];
  features?: FeatureEntry[];
  /** When true, renders with a dark background. */
  dark?: boolean;
}

/** A feature card for company page grids. */
export interface CompanyFeatureCard {
  iconSlug: string;
  title: string;
  description: string;
}

/* ============================================================
 * Resources
 * ========================================================== */

export type ResourceCategory =
  | 'technical-article'
  | 'case-study'
  | 'white-paper'
  | 'video'
  | 'faq'
  | 'documentation';

/** A resource content object (articles, case studies, white papers, etc.). */
export interface ResourceContent {
  slug: string;
  title: string;
  category: ResourceCategory;
  excerpt?: string;
  body?: string;
  bodyParagraphs?: string[];
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
  tags?: string[];
  relatedProducts?: RelatedProductRef[];
  downloads?: DownloadEntry[];
  images?: ImageSet;
  seo?: SEOData;
}

/* ============================================================
 * Resource Center (engineering document library)
 * ========================================================== */

/** Categories used by the Resources Center document library. */
export type ResourceCenterCategory =
  | 'brochures'
  | 'datasheets'
  | 'manuals'
  | 'cad'
  | 'certifications';

/** File formats supported by the Resources Center. */
export type ResourceFileType =
  | 'pdf'
  | 'dwg'
  | 'dxf'
  | 'step'
  | 'iges'
  | 'zip'
  | 'doc'
  | 'xls';

/** Download availability states for the DownloadButton component. */
export type DownloadStatus =
  | 'available'
  | 'unavailable'
  | 'coming-soon'
  | 'upon-request';

/** Canonical resource entry for the engineering document library. */
export interface ResourceItem {
  id: string;
  title: string;
  slug: string;
  category: ResourceCenterCategory;
  /** Canonical product family slug, or null for company-wide documents. */
  productFamily: string | null;
  /** Optional specific product slug within the family. */
  product?: string | null;
  description: string;
  /** The kind of document (brochure, datasheet, installation manual, etc.). */
  documentType: string;
  /** The file format of the downloadable document. */
  fileType: ResourceFileType;
  /** Human-readable file size, or null when unknown. */
  fileSize: string | null;
  language: string;
  /** Revision identifier, or null when unknown. */
  revision: string | null;
  /** ISO date string of publication, or null when unknown. */
  publishedDate: string | null;
  /** URL to the downloadable file, or null when no file exists. */
  downloadUrl: string | null;
  /** Thumbnail image URL, or null. */
  thumbnail: string | null;
  /** Shown in the Featured section of the landing page. */
  featured: boolean;
  /** SEO title for the resource. */
  seoTitle?: string | null;
  /** SEO description for the resource. */
  seoDescription?: string | null;
  /** Download availability state. Defaults to 'unavailable'. */
  downloadStatus?: DownloadStatus;
}

/* ============================================================
 * Engineering data (interactive charts & exact tables)
 * ========================================================== */

/** Category of an engineering data table, used for ordering and iconography. */
export type EngineeringTableKind =
  | 'torque'
  | 'flow'
  | 'performance'
  | 'dimensions'
  | 'models'
  | 'general'
  | 'materials';

/** A single published engineering dataset rendered as a table or chart source. */
export interface EngineeringDataTable {
  id: string;
  title: string;
  /** Short label shown on the tab/selector button. */
  tabLabel?: string;
  kind: EngineeringTableKind;
  description?: string;
  columns: string[];
  rows: string[][];
  notes?: string[];
}

/** A named group of option items (standard features, available options, etc.). */
export interface EngineeringOptionGroup {
  title: string;
  items: string[];
}

/** Engineering data attached to a product — interactive datasets and option lists. */
export interface ProductEngineeringData {
  tables?: EngineeringDataTable[];
  optionGroups?: EngineeringOptionGroup[];
}

/* ============================================================
 * Downloads (standalone library)
 * ========================================================== */

/** A standalone download entry with full metadata for a downloads library. */
export interface DownloadResource {
  slug: string;
  label: string;
  type: DownloadFileType;
  filename: string;
  url?: string;
  description?: string;
  /** Associated product family slug, if applicable. */
  familySlug?: string;
  /** Associated product slug, if applicable. */
  productSlug?: string;
  sizeBytes?: number;
  updatedAt?: string;
  seo?: SEOData;
}
