import type { DownloadFileType, SpecGroupCategory, ProductEngineeringData } from '@/types/content';

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
}

export interface CoreFunction {
  number: string;
  title: string;
  description: string;
}

export interface ProductFamily {
  name: string;
  slug: string;
  description: string;
}

export interface Industry {
  name: string;
  slug: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface Capability {
  value: string;
  label: string;
  numeric?: boolean;
}

export interface Differentiator {
  title: string;
  description: string;
}

export interface MegaMenuLink {
  label: string;
  slug: string;
  /** Explicit href override; defaults to `/products/${headingSlug}/${slug}`. */
  href?: string;
}

export interface MegaMenuGroup {
  heading: string;
  headingSlug: string;
  /** Heading link override. null = non-clickable label. undefined = `/products/${headingSlug}`. */
  headingHref?: string | null;
  links: MegaMenuLink[];
}

export interface MegaMenuColumn {
  groups: MegaMenuGroup[];
}

export interface MegaMenuFeature {
  title: string;
  description: string;
  ctaLabel: string;
  ctaSlug: string;
}

/* ---------- Product Detail ---------- */

export interface ProductBadge {
  label: string;
}

export interface ProductSpecRow {
  label: string;
  value: string;
}

export interface ProductSpecGroup {
  heading: string;
  /** Optional category tag for standard grouping. */
  category?: SpecGroupCategory;
  rows: ProductSpecRow[];
}

export interface ProductFeature {
  iconSlug: string;
  title: string;
  description: string;
}

export interface ProductApplicationGroup {
  heading: string;
  items: string[];
}

export interface ProductApplicationIndustry {
  iconSlug: string;
  title: string;
}

export interface ProductDownload {
  label: string;
  type: DownloadFileType;
  filename: string;
  url?: string;
}

export interface ProductGalleryImage {
  src?: string;
  alt: string;
}

export interface ProductDetail {
  familyName: string;
  familySlug: string;
  name: string;
  slug: string;
  series?: string;
  shortDescription: string;
  overview?: string[];
  badges: ProductBadge[];
  trustBadges?: string[];
  quickSpecs?: ProductSpecRow[];
  specs: ProductSpecRow[];
  specGroups?: ProductSpecGroup[];
  features: ProductFeature[];
  applications: ProductApplicationGroup[];
  industries?: ProductApplicationIndustry[];
  downloads: ProductDownload[];
  gallery?: ProductGalleryImage[];
  engineering?: ProductEngineeringData;
  related: ProductFamily[];
}
