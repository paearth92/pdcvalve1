import type { ResourceContent } from '@/types/content';

/**
 * Resource content registry.
 *
 * Populated with verified resource content (technical articles, case
 * studies, white papers, videos, FAQs, documentation) from the existing
 * PDC website as it becomes available. Each entry follows the
 * ResourceContent interface so resource pages can render real content
 * without layout changes.
 *
 * NOTE: No placeholder or invented engineering data is included.
 */
export const resourceContent: ResourceContent[] = [];

/** Look up a resource content object by slug. */
export function getResourceContent(
  slug: string,
): ResourceContent | undefined {
  return resourceContent.find((r) => r.slug === slug);
}

/** Get all resources for a given category. */
export function getResourcesByCategory(
  category: ResourceContent['category'],
): ResourceContent[] {
  return resourceContent.filter((r) => r.category === category);
}
