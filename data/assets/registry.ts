/**
 * Canonical visual-asset registry for PDC Valve & Actuators.
 *
 * Every asset entry records its source, status, and associations so the
 * codebase can distinguish official PDC imagery from placeholders and
 * missing assets. No source URLs or attributions are invented — fields
 * are null when information is unavailable.
 *
 * When a verified official asset is added:
 * 1. Place the original in public/assets/<category>/<family>/originals/
 * 2. Place the web-optimized version in public/assets/<category>/<family>/web/
 * 3. Update the registry entry's status and file paths
 * 4. Update the consuming component to render the real image
 */

export type AssetStatus =
  | 'official-original'
  | 'official-processed'
  | 'placeholder'
  | 'missing'
  | 'needs-review'
  | 'low-resolution'
  | 'duplicate'
  | 'unused';

export type AssetSourceType =
  | 'existing-website'
  | 'brochure'
  | 'client-provided'
  | 'existing-project'
  | 'derived-from-official'
  | 'placeholder';

export type AssetCategory =
  | 'brand'
  | 'product'
  | 'product-family'
  | 'company'
  | 'industry'
  | 'resource'
  | 'texture'
  | 'placeholder';

export type AssetImageType =
  | 'logo-primary'
  | 'logo-reversed'
  | 'logo-symbol'
  | 'favicon'
  | 'social-preview'
  | 'product-hero'
  | 'product-card'
  | 'product-thumbnail'
  | 'product-gallery'
  | 'family-hero'
  | 'family-card'
  | 'company-photo'
  | 'industry-photo'
  | 'resource-thumbnail'
  | 'texture'
  | 'placeholder';

export interface AssetEntry {
  /** Unique kebab-case identifier. */
  id: string;
  /** Human-readable name. */
  name: string;
  category: AssetCategory;
  sourceType: AssetSourceType;
  /** URL where the original was found, if applicable. */
  sourceUrl: string | null;
  /** Path to the original source file in /public, if it exists. */
  originalFilePath: string | null;
  /** Path to the processed web-optimized file in /public, if it exists. */
  processedFilePath: string | null;
  /** Product family slug this asset belongs to, if applicable. */
  associatedProductFamily: string | null;
  /** Product slug this asset belongs to, if applicable. */
  associatedProduct: string | null;
  /** Company page slug this asset belongs to, if applicable. */
  associatedCompanySection: string | null;
  imageType: AssetImageType;
  /** File format of the processed asset. */
  format: 'webp' | 'png' | 'svg' | 'jpg' | null;
  width: number | null;
  height: number | null;
  transparentBackground: boolean | null;
  alt: string;
  status: AssetStatus;
  /** Approximate processed file size in bytes, when known. */
  fileSizeBytes: number | null;
  notes: string | null;
}

/* ============================================================
 * Brand assets
 * ========================================================== */

const brandAssets: AssetEntry[] = [
  {
    id: 'pdc-logo-primary',
    name: 'PDC Logo Primary',
    category: 'brand',
    sourceType: 'existing-project',
    sourceUrl: null,
    originalFilePath: '/images/pdc-logo.png',
    processedFilePath: '/images/pdc-logo.png',
    associatedProductFamily: null,
    associatedProduct: null,
    associatedCompanySection: null,
    imageType: 'logo-primary',
    format: 'png',
    width: null,
    height: null,
    transparentBackground: true,
    alt: 'PDC Valves & Actuators',
    status: 'official-original',
    fileSizeBytes: 8192,
    notes: 'Official PDC logo PNG provided by client. Used in Header and Footer.',
  },
  {
    id: 'pdc-logo-reversed',
    name: 'PDC Logo Reversed (White)',
    category: 'brand',
    sourceType: 'placeholder',
    sourceUrl: null,
    originalFilePath: null,
    processedFilePath: null,
    associatedProductFamily: null,
    associatedProduct: null,
    associatedCompanySection: null,
    imageType: 'logo-reversed',
    format: null,
    width: null,
    height: null,
    transparentBackground: null,
    alt: 'PDC Valve & Actuators logo',
    status: 'missing',
    fileSizeBytes: null,
    notes: 'No reversed/white logo variant found.',
  },
  {
    id: 'pdc-favicon',
    name: 'PDC Favicon',
    category: 'brand',
    sourceType: 'placeholder',
    sourceUrl: null,
    originalFilePath: null,
    processedFilePath: null,
    associatedProductFamily: null,
    associatedProduct: null,
    associatedCompanySection: null,
    imageType: 'favicon',
    format: null,
    width: null,
    height: null,
    transparentBackground: null,
    alt: 'PDC Valve & Actuators',
    status: 'missing',
    fileSizeBytes: null,
    notes: 'No favicon source found in project.',
  },
  {
    id: 'pdc-social-preview',
    name: 'PDC Social Preview Image',
    category: 'brand',
    sourceType: 'placeholder',
    sourceUrl: null,
    originalFilePath: null,
    processedFilePath: null,
    associatedProductFamily: null,
    associatedProduct: null,
    associatedCompanySection: null,
    imageType: 'social-preview',
    format: null,
    width: null,
    height: null,
    transparentBackground: null,
    alt: 'PDC Valve & Actuators',
    status: 'missing',
    fileSizeBytes: null,
    notes: 'No social preview image found.',
  },
];

/* ============================================================
 * Product family assets
 * ========================================================== */

const familySlugs = [
  'butterfly-damper-valves',
  'butterfly-valves',
  'pneumatic-actuators',
  'electric-actuators',
];

const familyNames: Record<string, string> = {
  'butterfly-damper-valves': 'Butterfly Damper Valves',
  'butterfly-valves': 'Butterfly Valves',
  'pneumatic-actuators': 'Pneumatic Actuators',
  'electric-actuators': 'Electric Actuators',
};

const familyImageOverrides: Record<string, { hero?: Partial<AssetEntry>; card?: Partial<AssetEntry> }> = {};

const familyAssets: AssetEntry[] = familySlugs.flatMap((slug) => {
  const heroPath = `/images/products/families/${slug}.png`;
  const cardPath = `/images/products/families/cards/${slug}-card.png`;
  return [
  {
    id: `family-${slug}-hero`,
    name: `${familyNames[slug]} Hero Image`,
    category: 'product-family',
    sourceType: 'client-provided',
    sourceUrl: null,
    originalFilePath: heroPath,
    processedFilePath: heroPath,
    associatedProductFamily: slug,
    associatedProduct: null,
    associatedCompanySection: null,
    imageType: 'family-hero',
    format: 'png',
    width: null,
    height: null,
    transparentBackground: null,
    alt: `PDC ${familyNames[slug]}`,
    status: 'official-original',
    fileSizeBytes: null,
    notes: `Drop image at: public${heroPath}`,
    ...familyImageOverrides[slug]?.hero,
  },
  {
    id: `family-${slug}-card`,
    name: `${familyNames[slug]} Card Image`,
    category: 'product-family',
    sourceType: 'client-provided',
    sourceUrl: null,
    originalFilePath: cardPath,
    processedFilePath: cardPath,
    associatedProductFamily: slug,
    associatedProduct: null,
    associatedCompanySection: null,
    imageType: 'family-card',
    format: 'png',
    width: null,
    height: null,
    transparentBackground: null,
    alt: `PDC ${familyNames[slug]}`,
    status: 'official-original',
    fileSizeBytes: null,
    notes: `Drop image at: public${cardPath}`,
    ...familyImageOverrides[slug]?.card,
  },
  ];
});

/* ============================================================
 * Individual product assets
 * ========================================================== */

interface ProductRef {
  familySlug: string;
  productSlug: string;
  productName: string;
}

const productRefs: ProductRef[] = [
  // Butterfly Damper Valves
  { familySlug: 'butterfly-damper-valves', productSlug: 'econotrol', productName: 'Econotrol' },
  { familySlug: 'butterfly-damper-valves', productSlug: 'medium-duty', productName: 'Medium Duty' },
  { familySlug: 'butterfly-damper-valves', productSlug: 'excel', productName: 'Excel' },
  { familySlug: 'butterfly-damper-valves', productSlug: 'flanged-end', productName: 'Flanged End' },
  { familySlug: 'butterfly-damper-valves', productSlug: 'reduced-port', productName: 'Reduced Port' },
  { familySlug: 'butterfly-damper-valves', productSlug: 'combustion-valve', productName: 'Combustion Valve' },
  { familySlug: 'butterfly-damper-valves', productSlug: 'thread-end', productName: 'Thread End' },
  // Butterfly Valves
  { familySlug: 'butterfly-valves', productSlug: 'high-performance', productName: 'High Performance' },
  { familySlug: 'butterfly-valves', productSlug: 'triple-offset', productName: 'Triple Offset' },
  // Pneumatic Actuators
  { familySlug: 'pneumatic-actuators', productSlug: 'double-acting', productName: 'Magnus Force Double Acting' },
  { familySlug: 'pneumatic-actuators', productSlug: 'spring-return', productName: 'Magnus Force Spring Return' },
  // Electric Actuators
  { familySlug: 'electric-actuators', productSlug: 'pdcq', productName: 'PDCQ' },
  { familySlug: 'electric-actuators', productSlug: 'pdcs', productName: 'PDCS' },
];

const productAssets: AssetEntry[] = productRefs.flatMap((ref) => {
  const heroPath = `/images/products/${ref.familySlug}/${ref.productSlug}.png`;
  const cardPath = `/images/products/${ref.familySlug}/cards/${ref.productSlug}-card.png`;
  return [
  {
    id: `product-${ref.productSlug}-hero`,
    name: `${ref.productName} Hero Image`,
    category: 'product',
    sourceType: 'client-provided',
    sourceUrl: null,
    originalFilePath: heroPath,
    processedFilePath: heroPath,
    associatedProductFamily: ref.familySlug,
    associatedProduct: ref.productSlug,
    associatedCompanySection: null,
    imageType: 'product-hero',
    format: 'png',
    width: null,
    height: null,
    transparentBackground: null,
    alt: `PDC ${ref.productName}`,
    status: 'official-original',
    fileSizeBytes: null,
    notes: `Drop image at: public${heroPath}`,
  },
  {
    id: `product-${ref.productSlug}-card`,
    name: `${ref.productName} Card Image`,
    category: 'product',
    sourceType: 'client-provided',
    sourceUrl: null,
    originalFilePath: cardPath,
    processedFilePath: cardPath,
    associatedProductFamily: ref.familySlug,
    associatedProduct: ref.productSlug,
    associatedCompanySection: null,
    imageType: 'product-card',
    format: 'png',
    width: null,
    height: null,
    transparentBackground: null,
    alt: `PDC ${ref.productName}`,
    status: 'official-original',
    fileSizeBytes: null,
    notes: `Drop image at: public${cardPath}`,
  },
  {
    id: `product-${ref.productSlug}-thumbnail`,
    name: `${ref.productName} Thumbnail`,
    category: 'product',
    sourceType: 'placeholder',
    sourceUrl: null,
    originalFilePath: null,
    processedFilePath: null,
    associatedProductFamily: ref.familySlug,
    associatedProduct: ref.productSlug,
    associatedCompanySection: null,
    imageType: 'product-thumbnail',
    format: null,
    width: null,
    height: null,
    transparentBackground: null,
    alt: `PDC ${ref.productName}`,
    status: 'missing',
    fileSizeBytes: null,
    notes: 'No verified product thumbnail found.',
  },
  ];
});

interface GalleryAssetRef {
  id: string;
  name: string;
  productSlug: string;
  fileName: string;
  alt: string;
  fileSizeBytes: number;
}

const galleryAssetRefs: GalleryAssetRef[] = [
  { id: 'econotrol-6-inch-front', name: 'Econotrol 6-Inch Front View', productSlug: 'econotrol', fileName: '6-inch-front.webp', alt: 'PDC Econotrol 6-inch butterfly damper valve front view', fileSizeBytes: 163258 },
  { id: 'combustion-standard', name: 'Combustion Valve Standard Configuration', productSlug: 'combustion-valve', fileName: 'standard-configuration.webp', alt: 'PDC Combustion Valve standard manual configuration', fileSizeBytes: 69678 },
  { id: 'combustion-lock-lever', name: 'Combustion Valve Lock-Lever Configuration', productSlug: 'combustion-valve', fileName: 'lock-lever-configuration.webp', alt: 'PDC Combustion Valve with lock-lever configuration', fileSizeBytes: 57884 },
  { id: 'flanged-end-isometric', name: 'Flanged End Isometric View', productSlug: 'flanged-end', fileName: 'isometric-view.webp', alt: 'PDC Flanged End butterfly damper valve isometric view with lock lever', fileSizeBytes: 109940 },
  { id: 'flanged-end-alternate', name: 'Flanged End Alternate Isometric View', productSlug: 'flanged-end', fileName: 'alternate-isometric-view.webp', alt: 'PDC Flanged End butterfly damper valve alternate isometric view', fileSizeBytes: 86920 },
  { id: 'medium-duty-step-seat', name: 'Medium Duty 8-Inch Step-Seat Configuration', productSlug: 'medium-duty', fileName: '8-inch-step-seat.webp', alt: 'PDC Medium Duty 8-inch butterfly damper valves with step-seat configuration', fileSizeBytes: 101906 },
  { id: 'medium-duty-step-seat-open', name: 'Medium Duty 8-Inch Step Seat Partially Open', productSlug: 'medium-duty', fileName: '8-inch-step-seat-partially-open.webp', alt: 'PDC Medium Duty 8-inch step-seat butterfly damper valves partially open', fileSizeBytes: 58456 },
  { id: 'medium-duty-tadpole-open', name: 'Medium Duty 10-Inch Tadpole Seat Open', productSlug: 'medium-duty', fileName: '10-inch-tadpole-open.webp', alt: 'PDC Medium Duty 10-inch tadpole-seat butterfly damper valve open', fileSizeBytes: 78968 },
  { id: 'medium-duty-tadpole-closed', name: 'Medium Duty 10-Inch Tadpole Seat Closed', productSlug: 'medium-duty', fileName: '10-inch-tadpole-closed.webp', alt: 'PDC Medium Duty 10-inch tadpole-seat butterfly damper valve closed', fileSizeBytes: 78154 },
  { id: 'medium-duty-heat-gasket', name: 'Medium Duty Heat-Gasket and Lock-Lever Assembly', productSlug: 'medium-duty', fileName: 'heat-gasket-c-bracket-lock-lever.webp', alt: 'PDC Medium Duty butterfly damper valve with heat gasket C-bracket and lock lever assembly', fileSizeBytes: 89734 },
];

const galleryAssets: AssetEntry[] = galleryAssetRefs.map((ref) => {
  const processedFilePath = `/images/products/butterfly-damper-valves/gallery/${ref.productSlug}/${ref.fileName}`;

  return {
    id: `product-gallery-${ref.id}`,
    name: ref.name,
    category: 'product',
    sourceType: 'derived-from-official',
    sourceUrl: null,
    originalFilePath: null,
    processedFilePath,
    associatedProductFamily: 'butterfly-damper-valves',
    associatedProduct: ref.productSlug,
    associatedCompanySection: null,
    imageType: 'product-gallery',
    format: 'webp',
    width: 1536,
    height: 1024,
    transparentBackground: false,
    alt: ref.alt,
    status: 'official-processed',
    fileSizeBytes: ref.fileSizeBytes,
    notes: 'Client-provided official product photo cleaned and restaged on the approved PDC green/graphite CAD background.',
  };
});

/* ============================================================
 * Company assets
 * ========================================================== */

const companySections = ['engineering', 'manufacturing', 'quality', 'facility'];

const companyAssets: AssetEntry[] = companySections.map((section) => ({
  id: `company-${section}-photo`,
  name: `${section.charAt(0).toUpperCase() + section.slice(1)} Photo`,
  category: 'company',
  sourceType: 'placeholder',
  sourceUrl: null,
  originalFilePath: null,
  processedFilePath: null,
  associatedProductFamily: null,
  associatedProduct: null,
  associatedCompanySection: section,
  imageType: 'company-photo',
  format: null,
  width: null,
  height: null,
  transparentBackground: null,
  alt: `${section.charAt(0).toUpperCase() + section.slice(1)} at PDC Valve & Actuators`,
  status: 'missing',
  fileSizeBytes: null,
  notes: `No verified ${section} photo found. Company pages use CSS-based backgrounds and icons.`,
}));

/* ============================================================
 * Resource thumbnails
 * ========================================================== */

const resourceThumbs = [
  { id: 'resource-pneumatic-actuator-brochure-thumb', name: 'Pneumatic Actuator Brochure Thumbnail', family: 'pneumatic-actuators' },
  { id: 'resource-electric-actuator-brochure-thumb', name: 'Electric Actuator Brochure Thumbnail', family: 'electric-actuators' },
];

const resourceAssets: AssetEntry[] = resourceThumbs.map((r) => ({
  id: r.id,
  name: r.name,
  category: 'resource',
  sourceType: 'placeholder',
  sourceUrl: null,
  originalFilePath: null,
  processedFilePath: null,
  associatedProductFamily: r.family,
  associatedProduct: null,
  associatedCompanySection: null,
  imageType: 'resource-thumbnail',
  format: null,
  width: null,
  height: null,
  transparentBackground: null,
  alt: r.name,
  status: 'missing',
  fileSizeBytes: null,
  notes: 'No verified brochure thumbnail found. Resources use a FileText icon placeholder.',
}));

/* ============================================================
 * Full registry
 * ========================================================== */

export const assetRegistry: AssetEntry[] = [
  ...brandAssets,
  ...familyAssets,
  ...productAssets,
  ...galleryAssets,
  ...companyAssets,
  ...resourceAssets,
];

/** Look up an asset by its unique ID. */
export function getAssetById(id: string): AssetEntry | undefined {
  return assetRegistry.find((a) => a.id === id);
}

/** Get all assets for a product family slug. */
export function getAssetsByFamily(familySlug: string): AssetEntry[] {
  return assetRegistry.filter((a) => a.associatedProductFamily === familySlug);
}

/** Get all assets for a specific product. */
export function getAssetsByProduct(
  familySlug: string,
  productSlug: string,
): AssetEntry[] {
  return assetRegistry.filter(
    (a) =>
      a.associatedProductFamily === familySlug &&
      a.associatedProduct === productSlug,
  );
}

/** Get the primary hero asset for a product, or null if missing. */
export function getProductHeroAsset(
  familySlug: string,
  productSlug: string,
): AssetEntry | null {
  const asset = assetRegistry.find(
    (a) => a.id === `product-${productSlug}-hero`,
  );
  return asset ?? null;
}

/** Get the card image asset for a product, or null if missing. */
export function getProductCardAsset(
  familySlug: string,
  productSlug: string,
): AssetEntry | null {
  const asset = assetRegistry.find(
    (a) =>
      a.id === `product-${productSlug}-card` &&
      a.status !== 'missing' &&
      a.status !== 'placeholder',
  );
  return asset ?? null;
}

/** Get the hero asset for a product family, or null if missing. */
export function getFamilyHeroAsset(familySlug: string): AssetEntry | null {
  const asset = assetRegistry.find(
    (a) =>
      a.id === `family-${familySlug}-hero` &&
      a.status !== 'missing' &&
      a.status !== 'placeholder',
  );
  return asset ?? null;
}

/** Get the card image asset for a product family, or null if missing. */
export function getFamilyCardAsset(familySlug: string): AssetEntry | null {
  const asset = assetRegistry.find(
    (a) =>
      a.id === `family-${familySlug}-card` &&
      a.status !== 'missing' &&
      a.status !== 'placeholder',
  );
  return asset ?? null;
}

/**
 * Strip a known image extension from a processed file path, returning the
 * base path without extension. Used by FlexibleImage so callers can drop in
 * either a .webp or .png file with the same name.
 */
function stripExtension(filePath: string): string {
  return filePath.replace(/\.(webp|png|jpg|jpeg)$/i, '');
}

/** Get the base path (no extension) for a product hero image, or null if missing. */
export function getProductHeroBasePath(
  familySlug: string,
  productSlug: string,
): string | null {
  const asset = getProductHeroAsset(familySlug, productSlug);
  return asset?.processedFilePath ? stripExtension(asset.processedFilePath) : null;
}

/** Get the base path (no extension) for a product card image, or null if missing. */
export function getProductCardBasePath(
  familySlug: string,
  productSlug: string,
): string | null {
  const asset = getProductCardAsset(familySlug, productSlug);
  return asset?.processedFilePath ? stripExtension(asset.processedFilePath) : null;
}

/** Get the base path (no extension) for a family hero image, or null if missing. */
export function getFamilyHeroBasePath(familySlug: string): string | null {
  const asset = getFamilyHeroAsset(familySlug);
  return asset?.processedFilePath ? stripExtension(asset.processedFilePath) : null;
}

/** Get the base path (no extension) for a family card image, or null if missing. */
export function getFamilyCardBasePath(familySlug: string): string | null {
  const asset = getFamilyCardAsset(familySlug);
  return asset?.processedFilePath ? stripExtension(asset.processedFilePath) : null;
}

/** Summary counts by status. */
export function getAssetStatusSummary(): Record<AssetStatus, number> {
  const summary: Record<AssetStatus, number> = {
    'official-original': 0,
    'official-processed': 0,
    placeholder: 0,
    missing: 0,
    'needs-review': 0,
    'low-resolution': 0,
    duplicate: 0,
    unused: 0,
  };
  for (const asset of assetRegistry) {
    summary[asset.status]++;
  }
  return summary;
}
