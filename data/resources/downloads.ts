import type { DownloadResource } from '@/types/content';

/**
 * Download library registry.
 *
 * Populated with verified download resources (PDFs, CAD files, STEP files,
 * DWG files, installation manuals, maintenance manuals, certificates) from
 * the existing PDC website as it becomes available. Each entry follows the
 * DownloadResource interface so the downloads section can render real
 * resources without layout changes.
 *
 * NOTE: No placeholder or invented engineering data is included.
 */
export const downloadResources: DownloadResource[] = [];

/** Look up a download resource by slug. */
export function getDownloadResource(
  slug: string,
): DownloadResource | undefined {
  return downloadResources.find((d) => d.slug === slug);
}

/** Get all downloads for a given product family. */
export function getDownloadsByFamily(
  familySlug: string,
): DownloadResource[] {
  return downloadResources.filter((d) => d.familySlug === familySlug);
}

/** Get all downloads for a given product. */
export function getDownloadsByProduct(
  familySlug: string,
  productSlug: string,
): DownloadResource[] {
  return downloadResources.filter(
    (d) => d.familySlug === familySlug && d.productSlug === productSlug,
  );
}
