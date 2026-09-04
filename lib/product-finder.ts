/**
 * Product Finder filter logic — faceted search engine.
 *
 * - Multi-select WITHIN a group = OR
 * - Across groups = AND
 * - Temperature/Pressure are range filters against numeric fields
 * - A product whose attribute is null must NOT match when that filter is
 *   active, but MUST still appear when the filter is unset.
 * - Facet counts are computed against the other active filters so options
 *   that would yield 0 results render disabled, not hidden.
 */

import type { Product, ProductAttributes } from '@/types/product';
import type { SpecRow } from '@/types/content';

/* ----------------------------------------------------------
 * Types
 * -------------------------------------------------------- */

export type FilterGroupId =
  | 'family'
  | 'valveType'
  | 'industry'
  | 'application'
  | 'media'
  | 'temperature'
  | 'pressure'
  | 'connection'
  | 'actuation'
  | 'bodyMaterial'
  | 'seatMaterial';

export interface FilterOptionWithCount {
  label: string;
  value: string;
  count: number;
}

export interface FilterGroupConfig {
  id: FilterGroupId;
  label: string;
  options: FilterOptionWithCount[];
}

/** Selected filter state: group id -> set of selected values. */
export type FilterSelection = Record<string, string[]>;

/* ----------------------------------------------------------
 * Attribute accessors
 * -------------------------------------------------------- */

function getAttr(product: Product): ProductAttributes {
  return (
    product.attributes ?? {
      valveType: null,
      connection: null,
      actuation: null,
      bodyMaterial: null,
      seatMaterial: null,
      media: [],
      tempMaxF: null,
      pressureMaxPsi: null,
      industries: [],
      applicationTags: [],
    }
  );
}

/** Split a pipe-delimited attribute value into individual tags. */
function splitTags(value: string | null): string[] {
  if (!value) return [];
  return value.split('|').filter(Boolean);
}

/* ----------------------------------------------------------
 * Matching
 * -------------------------------------------------------- */

/**
 * Check if a single product matches a single filter group's selection.
 * Within a group: OR. If the group has no selection, always passes.
 */
function matchesGroup(
  product: Product,
  groupId: FilterGroupId,
  selectedValues: string[],
): boolean {
  if (selectedValues.length === 0) return true;

  const attr = getAttr(product);

  switch (groupId) {
    case 'family':
      return selectedValues.includes(product.familySlug);

    case 'valveType': {
      const tags = splitTags(attr.valveType);
      return selectedValues.some((v) => tags.includes(v));
    }

    case 'industry':
      return selectedValues.some((v) => attr.industries.includes(v));

    case 'application':
      return selectedValues.some((v) => attr.applicationTags.includes(v));

    case 'media':
      return selectedValues.some((v) => attr.media.includes(v));

    case 'temperature': {
      // Range filter: selected values are bucket keys like "450", "900", "1500"
      if (attr.tempMaxF === null) return false;
      return selectedValues.some((bucket) => {
        const threshold = parseInt(bucket, 10);
        return attr.tempMaxF! >= threshold;
      });
    }

    case 'pressure': {
      if (attr.pressureMaxPsi === null) return false;
      return selectedValues.some((bucket) => {
        const threshold = parseInt(bucket, 10);
        return attr.pressureMaxPsi! >= threshold;
      });
    }

    case 'connection': {
      const tags = splitTags(attr.connection);
      return selectedValues.some((v) => tags.includes(v));
    }

    case 'actuation': {
      const tags = splitTags(attr.actuation);
      return selectedValues.some((v) => tags.includes(v));
    }

    case 'bodyMaterial':
      return attr.bodyMaterial !== null && selectedValues.includes(attr.bodyMaterial);

    case 'seatMaterial': {
      const tags = splitTags(attr.seatMaterial);
      return selectedValues.some((v) => tags.includes(v));
    }

    default:
      return true;
  }
}

/**
 * Filter products by the full selection across all groups.
 * Across groups: AND.
 */
export function filterProducts(
  allProducts: Product[],
  selection: FilterSelection,
): Product[] {
  const activeGroups = Object.entries(selection).filter(
    ([, values]) => values.length > 0,
  );

  if (activeGroups.length === 0) return allProducts;

  return allProducts.filter((product) =>
    activeGroups.every(([groupId, values]) =>
      matchesGroup(product, groupId as FilterGroupId, values),
    ),
  );
}

/* ----------------------------------------------------------
 * Facet count computation
 * -------------------------------------------------------- */

/**
 * Compute facet counts for every option in every group, given the current
 * selection. For each group, counts are computed against the product set
 * that passes all OTHER groups' filters (not the group itself).
 */
export function computeFacetCounts(
  allProducts: Product[],
  selection: FilterSelection,
): Map<string, number> {
  const counts = new Map<string, number>();
  const groupIds = getAllFilterGroupIds();

  for (const groupId of groupIds) {
    // Build a selection that excludes the current group
    const selectionWithoutThisGroup: FilterSelection = {};
    for (const [gid, values] of Object.entries(selection)) {
      if (gid !== groupId) {
        selectionWithoutThisGroup[gid] = values;
      }
    }

    const baseSet = filterProducts(allProducts, selectionWithoutThisGroup);

    // Now count how many products in baseSet match each option for this group
    const options = getOptionsForGroup(groupId, allProducts);
    for (const opt of options) {
      const count = baseSet.filter((product) =>
        matchesGroup(product, groupId, [opt.value]),
      ).length;
      counts.set(`${groupId}:${opt.value}`, count);
    }
  }

  return counts;
}

/* ----------------------------------------------------------
 * Option generation from product data
 * -------------------------------------------------------- */

/** All possible filter group IDs in display order. */
export function getAllFilterGroupIds(): FilterGroupId[] {
  return [
    'family',
    'valveType',
    'connection',
    'actuation',
    'bodyMaterial',
    'seatMaterial',
    'media',
    'temperature',
    'pressure',
    'industry',
    'application',
  ];
}

/** Human-readable labels for each filter group. */
export const FILTER_GROUP_LABELS: Record<FilterGroupId, string> = {
  family: 'Product Family',
  valveType: 'Valve Type',
  connection: 'Connection',
  actuation: 'Actuation',
  bodyMaterial: 'Body Material',
  seatMaterial: 'Seat Material',
  media: 'Media',
  temperature: 'Temperature (min °F)',
  pressure: 'Pressure (min PSI)',
  industry: 'Industry',
  application: 'Application',
};

/** Human-readable labels for individual option values. */
export const OPTION_LABELS: Record<string, string> = {
  // valveType
  'wafer': 'Wafer',
  'lug': 'Lug',
  'flanged': 'Flanged',
  'threaded': 'Threaded',
  'triple-offset': 'Triple Offset',
  'double-eccentric': 'Double Eccentric',
  'reduced-port': 'Reduced Port',
  // connection
  // actuation
  'manual': 'Manual',
  'electric': 'Electric',
  'pneumatic': 'Pneumatic',
  // bodyMaterial
  'cast-iron': 'Cast Iron',
  'ductile-iron': 'Ductile Iron',
  'carbon-steel': 'Carbon Steel',
  'stainless-steel': 'Stainless Steel',
  'aluminum': 'Aluminum',
  // seatMaterial
  'swing-through': 'Swing-Through',
  'angle-seat': 'Angle Seat',
  'step': 'Step',
  'tadpole': 'Tadpole',
  'ptfe': 'PTFE',
  'epdm': 'EPDM',
  'viton': 'Viton',
  'metal': 'Metal-to-Metal',
  'grafoil': 'Grafoil',
  'nbr': 'NBR',
  'silicone': 'Silicone',
  // media
  'air': 'Air',
  'gas': 'Gas',
  'steam': 'Steam',
  'water': 'Water',
  'oil': 'Oil',
  'hydrocarbons': 'Hydrocarbons',
  'slurry': 'Slurry',
  'powder': 'Powder',
  'chemicals': 'Chemicals',
  'brine': 'Brine',
  'vacuum': 'Vacuum',
  'flue-gas': 'Flue Gas',
  'process-fluids': 'Process Fluids',
  'sour-gas': 'Sour Gas',
  'hot-gas': 'Hot Gas',
  'dirty-air': 'Dirty Air',
  'clean-air': 'Clean Air',
  'liquid': 'Liquid',
};

/** Temperature buckets in °F. A product matches if tempMaxF >= bucket. */
const TEMP_BUCKETS: { value: string; label: string }[] = [
  { value: '200', label: '200°F+' },
  { value: '450', label: '450°F+' },
  { value: '900', label: '900°F+' },
  { value: '1000', label: '1000°F+' },
];

/** Pressure buckets in PSI. A product matches if pressureMaxPsi >= bucket. */
const PRESSURE_BUCKETS: { value: string; label: string }[] = [
  { value: '5', label: '5 PSI+' },
  { value: '25', label: '25 PSI+' },
  { value: '100', label: '100 PSI+' },
];

/** Industry label overrides. */
const INDUSTRY_LABELS: Record<string, string> = {
  'automotive': 'Automotive',
  'chemical': 'Chemical',
  'downstream-hydrocarbons': 'Downstream Hydrocarbons',
  'food-and-beverage': 'Food & Beverage',
  'energy-and-onsite-utilities': 'Energy & Onsite Utilities',
  'life-sciences-and-medical': 'Life Sciences & Medical',
  'mining-minerals-and-metals': 'Mining, Minerals & Metals',
  'marine': 'Marine',
  'oem-and-engineered-solution-providers': 'OEM & Engineered Solutions',
  'oil-and-gas': 'Oil & Gas',
  'power-generation': 'Power Generation',
  'pulp-and-paper': 'Pulp & Paper',
  'water-and-wastewater': 'Water & Wastewater',
};

/** Application label overrides. */
const APPLICATION_LABELS: Record<string, string> = {
  'flow-control': 'Flow Control',
  'combustion-air': 'Combustion Air',
  'combustion-gas': 'Combustion Gas',
  'hot-air': 'Hot Air',
  'cold-air': 'Cold Air',
  'combustible-gas': 'Combustible Gas',
  'blower-equipment': 'Blower Equipment',
  'compressor-equipment': 'Compressor Equipment',
  'boiler-equipment': 'Boiler Equipment',
  'environmental-systems': 'Environmental Systems',
  'hvac': 'HVAC',
  'industrial-furnaces': 'Industrial Furnaces',
  'oil-and-gas-refining': 'Oil & Gas Refining',
  'power-generation': 'Power Generation',
  'water-and-sewage': 'Water & Sewage',
  'water-and-wastewater': 'Water & Wastewater',
  'stationary-engines': 'Stationary Engines',
  'chemical-equipment': 'Chemical Equipment',
  'mining-equipment': 'Mining Equipment',
  'gas-recovery': 'Gas Recovery',
  'hygienic-powders': 'Hygienic Powders',
  'pharmaceutical': 'Pharmaceutical',
  'textile': 'Textile',
  'brine-water': 'Brine Water',
  'steam': 'Steam',
  'air-lines': 'Air Lines',
  'gas-lines': 'Gas Lines',
  'vacuum-service': 'Vacuum Service',
  'process-fluids': 'Process Fluids',
  'hydrocarbons': 'Hydrocarbons',
  'geothermal-steam': 'Geothermal Steam',
  'hot-gas': 'Hot Gas',
  'sour-gas': 'Sour Gas',
  'blowdown-service': 'Blowdown Service',
  'sulfur-recovery': 'Sulfur Recovery',
  'acid-service': 'Acid Service',
  'caustic-service': 'Caustic Service',
  'chloride-service': 'Chloride Service',
  'abrasive-service': 'Abrasive Service',
};

function optionLabel(value: string): string {
  return OPTION_LABELS[value] ?? value;
}

/**
 * Get all available options for a given filter group, derived from actual
 * product data. Never hardcodes an option that no product has.
 */
export function getOptionsForGroup(
  groupId: FilterGroupId,
  allProducts: Product[],
): { value: string; label: string }[] {
  switch (groupId) {
    case 'family': {
      const seen = new Map<string, string>();
      for (const p of allProducts) {
        if (!seen.has(p.familySlug)) {
          seen.set(p.familySlug, p.familySlug);
        }
      }
      return Array.from(seen.entries()).map(([value, label]) => ({
        value,
        label: label
          .split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' '),
      }));
    }

    case 'valveType': {
      const seen = new Set<string>();
      for (const p of allProducts) {
        for (const tag of splitTags(getAttr(p).valveType)) {
          seen.add(tag);
        }
      }
      return Array.from(seen).sort().map((value) => ({
        value,
        label: optionLabel(value),
      }));
    }

    case 'connection': {
      const seen = new Set<string>();
      for (const p of allProducts) {
        for (const tag of splitTags(getAttr(p).connection)) {
          seen.add(tag);
        }
      }
      return Array.from(seen).sort().map((value) => ({
        value,
        label: optionLabel(value),
      }));
    }

    case 'actuation': {
      const seen = new Set<string>();
      for (const p of allProducts) {
        for (const tag of splitTags(getAttr(p).actuation)) {
          seen.add(tag);
        }
      }
      return Array.from(seen).sort().map((value) => ({
        value,
        label: optionLabel(value),
      }));
    }

    case 'bodyMaterial': {
      const seen = new Set<string>();
      for (const p of allProducts) {
        if (getAttr(p).bodyMaterial) {
          seen.add(getAttr(p).bodyMaterial!);
        }
      }
      return Array.from(seen).sort().map((value) => ({
        value,
        label: optionLabel(value),
      }));
    }

    case 'seatMaterial': {
      const seen = new Set<string>();
      for (const p of allProducts) {
        for (const tag of splitTags(getAttr(p).seatMaterial)) {
          seen.add(tag);
        }
      }
      return Array.from(seen).sort().map((value) => ({
        value,
        label: optionLabel(value),
      }));
    }

    case 'media': {
      const seen = new Set<string>();
      for (const p of allProducts) {
        for (const m of getAttr(p).media) {
          seen.add(m);
        }
      }
      return Array.from(seen).sort().map((value) => ({
        value,
        label: optionLabel(value),
      }));
    }

    case 'temperature':
      return TEMP_BUCKETS.map((b) => ({ value: b.value, label: b.label }));

    case 'pressure':
      return PRESSURE_BUCKETS.map((b) => ({ value: b.value, label: b.label }));

    case 'industry': {
      const seen = new Set<string>();
      for (const p of allProducts) {
        for (const ind of getAttr(p).industries) {
          seen.add(ind);
        }
      }
      return Array.from(seen).sort().map((value) => ({
        value,
        label: INDUSTRY_LABELS[value] ?? value,
      }));
    }

    case 'application': {
      const seen = new Set<string>();
      for (const p of allProducts) {
        for (const app of getAttr(p).applicationTags) {
          seen.add(app);
        }
      }
      return Array.from(seen).sort().map((value) => ({
        value,
        label: APPLICATION_LABELS[value] ?? value,
      }));
    }

    default:
      return [];
  }
}

/**
 * Build full filter group configs with live facet counts.
 * Groups with zero options are omitted entirely.
 */
export function buildFilterGroupsWithCounts(
  allProducts: Product[],
  selection: FilterSelection,
): FilterGroupConfig[] {
  const counts = computeFacetCounts(allProducts, selection);
  const groupIds = getAllFilterGroupIds();
  const result: FilterGroupConfig[] = [];

  for (const groupId of groupIds) {
    const options = getOptionsForGroup(groupId, allProducts);
    if (options.length === 0) continue;

    const optionsWithCounts: FilterOptionWithCount[] = options.map((opt) => ({
      ...opt,
      count: counts.get(`${groupId}:${opt.value}`) ?? 0,
    }));

    result.push({
      id: groupId,
      label: FILTER_GROUP_LABELS[groupId],
      options: optionsWithCounts,
    });
  }

  return result;
}

/* ----------------------------------------------------------
 * URL sync helpers
 * -------------------------------------------------------- */

/**
 * Parse a URLSearchParams object into a FilterSelection.
 * Each group is encoded as a comma-separated list of values.
 */
export function selectionFromParams(
  params: URLSearchParams,
): FilterSelection {
  const selection: FilterSelection = {};
  const groupIds = getAllFilterGroupIds();
  for (const gid of groupIds) {
    const raw = params.get(gid);
    if (raw) {
      const values = raw.split(',').filter(Boolean);
      if (values.length > 0) {
        selection[gid] = values;
      }
    }
  }
  return selection;
}

/**
 * Serialize a FilterSelection into URLSearchParams.
 */
export function selectionToParams(
  selection: FilterSelection,
): URLSearchParams {
  const params = new URLSearchParams();
  for (const [gid, values] of Object.entries(selection)) {
    if (values.length > 0) {
      params.set(gid, values.join(','));
    }
  }
  return params;
}

/**
 * Count total selected filter values across all groups.
 */
export function countActiveFilters(selection: FilterSelection): number {
  return Object.values(selection).reduce(
    (sum, values) => sum + values.length,
    0,
  );
}
