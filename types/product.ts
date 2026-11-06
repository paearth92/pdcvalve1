/**
 * Product catalog type system.
 *
 * All fields are optional where appropriate because verified product data
 * will be added incrementally from the existing PDC website. No field
 * should contain placeholder or invented values.
 */

import type { DownloadFileType, IndustryRef } from '@/types/content';

export interface ProductDownload {
  label: string;
  type: DownloadFileType;
  filename: string;
  url?: string;
}

export interface ProductSpecRow {
  label: string;
  value: string;
}

export interface ProductFeature {
  title: string;
  description: string;
}

export interface ProductSEO {
  title?: string;
  description?: string;
  keywords?: string[];
}

export interface ProductImage {
  src: string;
  alt: string;
}

/**
 * Structured attributes derived from the free-text `specifications` rows.
 *
 * Every value here is traced back to a real spec row by the derivation layer
 * in `lib/product-attributes.ts`. Fields that cannot be derived are `null`
 * (or `[]` for array fields) — never invented.
 */
export interface ProductAttributes {
  /** Product category used by the Product Finder. */
  productType: string | null;
  /** @deprecated Kept for legacy metadata readers; not used by Product Finder. */
  valveType: string | null;
  /** End connection type, e.g. "wafer", "lug", "flanged", "threaded". */
  connection: string | null;
  /** Actuation method, e.g. "manual", "electric", "pneumatic". */
  actuation: string | null;
  /** Pipe-delimited body-material tags where a product has multiple options. */
  bodyMaterial: string | null;
  /** Confirmed seat / seal material tags, pipe-delimited when multiple. */
  seatMaterial: string | null;
  /** Compatible media types as enumerable tags. */
  media: string[];
  /** Maximum operating temperature in °F, derived from spec text. */
  tempMaxF: number | null;
  /** Maximum operating pressure in PSI, derived from spec text. */
  pressureMaxPsi: number | null;
  /** Published ANSI pressure classes, when PSI thresholds are not applicable. */
  pressureClasses: string[];
  /** Industry slugs this product serves. */
  industries: string[];
  /** Enumerable application tags derived from free-text applications. */
  applicationTags: string[];
}

export interface Product {
  id: string;
  slug: string;
  familySlug: string;
  name: string;
  series?: string;
  shortDescription?: string;
  overview?: string;
  features?: string[];
  applications?: string[];
  industries?: string[];
  specifications?: ProductSpecRow[];
  /** Structured attributes derived from `specifications`. */
  attributes?: ProductAttributes;
  /** Product Finder specific approved display copy. */
  productFinderName?: string;
  productFinderDescription?: string;
  downloads?: ProductDownload[];
  image?: ProductImage;
  /** Canonical asset registry ID for the hero image. */
  imageAssetId?: string;
  /** Canonical asset registry ID for the card image. */
  cardImageAssetId?: string;
  /** Canonical asset registry IDs for optional gallery images. */
  galleryAssetIds?: string[];
  relatedProducts?: string[];
  seo?: ProductSEO;
}

export interface ApplicationCardData {
  iconSlug: string;
  title: string;
  description: string;
}

export interface OverviewSection {
  introduction: string;
  advantages: string[];
  applications: string[];
  customization: string;
}

export interface ProductFamilyData {
  name: string;
  slug: string;
  shortDescription: string;
  /** Optional display title override for the product-family hero. */
  heroTitle?: string;
  route: string;
  imageRef: string;
  overview?: string;
  overviewSections?: OverviewSection;
  applications?: ApplicationCardData[];
  /** Structured references retain family-specific industry descriptions; strings remain supported for legacy entries. */
  industries?: Array<IndustryRef | string>;
  downloads?: ProductDownload[];
  trustBadges?: string[];
  /** Canonical asset registry ID for the family hero image. */
  heroImageAssetId?: string;
  /** Canonical asset registry ID for the family card image. */
  cardImageAssetId?: string;
}
