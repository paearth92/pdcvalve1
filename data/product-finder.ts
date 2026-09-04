/**
 * Product Finder filter configuration.
 *
 * Filter groups, options, and facet counts are now generated dynamically
 * from real product data by `lib/product-finder.ts`. This file re-exports
 * the key types and helpers for backward compatibility with any code that
 * imported from here.
 */

export {
  type FilterGroupId,
  type FilterOptionWithCount,
  type FilterGroupConfig,
  type FilterSelection,
  getAllFilterGroupIds,
  FILTER_GROUP_LABELS,
  buildFilterGroupsWithCounts,
  filterProducts,
  selectionFromParams,
  selectionToParams,
  countActiveFilters,
} from '@/lib/product-finder';
