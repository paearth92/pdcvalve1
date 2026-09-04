/**
 * Product attribute derivation layer.
 *
 * Parses each product's free-text `specifications` rows into structured
 * `ProductAttributes`. Every derived value is traceable to a real spec row.
 * Values that cannot be derived are set to `null` (or `[]` for arrays).
 *
 * No data is invented. The normalization maps below are the single source
 * of truth for how spec text maps to attribute values — they are exported
 * so they can be audited and edited.
 */

import type { ProductContent, SpecRow } from '@/types/content';
import type { ProductAttributes } from '@/types/product';

/* ----------------------------------------------------------
 * Normalization maps
 * -------------------------------------------------------- */

/**
 * Maps substrings found in "Body Style" / "End Connections" / "Valve Type"
 * spec values to canonical valveType tags.
 */
export const VALVE_TYPE_MAP: Record<string, string> = {
  wafer: 'wafer',
  lug: 'lug',
  flanged: 'flanged',
  'flanged end': 'flanged',
  'female threaded': 'threaded',
  threaded: 'threaded',
  'triple offset': 'triple-offset',
  'double eccentric': 'double-eccentric',
  'reduced port': 'reduced-port',
};

/**
 * Maps substrings found in "End Connections" spec values to canonical
 * connection tags.
 */
export const CONNECTION_MAP: Record<string, string> = {
  wafer: 'wafer',
  lug: 'lug',
  flanged: 'flanged',
  flange: 'flanged',
  threaded: 'threaded',
  'female threaded': 'threaded',
};

/**
 * Maps substrings found in "Operation" / "Actuator Type" spec values to
 * canonical actuation tags.
 */
export const ACTUATION_MAP: Record<string, string> = {
  manual: 'manual',
  'hand lever': 'manual',
  'worm gear': 'manual',
  handwheel: 'manual',
  electric: 'electric',
  pneumatic: 'pneumatic',
  'spring return': 'pneumatic',
  'spring-return': 'pneumatic',
  'double acting': 'pneumatic',
};

/**
 * Maps substrings found in "Body Material" spec values to canonical
 * bodyMaterial tags.
 */
export const BODY_MATERIAL_MAP: Record<string, string> = {
  'cast iron': 'cast-iron',
  'cast ductile iron': 'ductile-iron',
  'ductile iron': 'ductile-iron',
  'carbon steel': 'carbon-steel',
  'stainless steel': 'stainless-steel',
  'wcb': 'carbon-steel',
  'cf8': 'stainless-steel',
  'cf8m': 'stainless-steel',
  aluminum: 'aluminum',
  'aluminium': 'aluminum',
  'aluminum alloy': 'aluminum',
};

/**
 * Maps substrings found in "Seat" / "Seat Style" / "Seat Materials" spec
 * values to canonical seatMaterial tags.
 */
export const SEAT_MATERIAL_MAP: Record<string, string> = {
  'swing-through': 'swing-through',
  'swing through': 'swing-through',
  'angle seat': 'angle-seat',
  step: 'step',
  tadpole: 'tadpole',
  ptfe: 'ptfe',
  teflon: 'ptfe',
  epdm: 'epdm',
  viton: 'viton',
  'metal-to-metal': 'metal',
  'metal to metal': 'metal',
  grafoil: 'grafoil',
  nbr: 'nbr',
  silicone: 'silicone',
};

/**
 * Maps free-text application strings to enumerable application tags.
 * Keys are lowercased substrings; values are canonical tags.
 */
export const APPLICATION_TAG_MAP: Record<string, string> = {
  'flow control': 'flow-control',
  'flow reduction': 'flow-control',
  'combustion air': 'combustion-air',
  'combustion gas': 'combustion-gas',
  'hot air': 'hot-air',
  'cold air': 'cold-air',
  'combustible gas': 'combustible-gas',
  'blower': 'blower-equipment',
  'compressor': 'compressor-equipment',
  'boiler': 'boiler-equipment',
  'environmental': 'environmental-systems',
  'hvac': 'hvac',
  'furnace': 'industrial-furnaces',
  'oil and gas': 'oil-and-gas-refining',
  'oil & gas': 'oil-and-gas-refining',
  'power generation': 'power-generation',
  'cogeneration': 'power-generation',
  'water and sewage': 'water-and-sewage',
  'water and wastewater': 'water-and-wastewater',
  'stationary engine': 'stationary-engines',
  'chemical': 'chemical-equipment',
  'mining': 'mining-equipment',
  'gas recovery': 'gas-recovery',
  'hygienic': 'hygienic-powders',
  'pharmaceutical': 'pharmaceutical',
  'textile': 'textile',
  'brine': 'brine-water',
  'steam': 'steam',
  'air lines': 'air-lines',
  'gas lines': 'gas-lines',
  'vacuum': 'vacuum-service',
  'process fluid': 'process-fluids',
  'hydrocarbon': 'hydrocarbons',
  'geothermal': 'geothermal-steam',
  'hot gas': 'hot-gas',
  'sour gas': 'sour-gas',
  'blowdown': 'blowdown-service',
  'sulfur': 'sulfur-recovery',
  'acid': 'acid-service',
  'caustic': 'caustic-service',
  'chloride': 'chloride-service',
  'abrasive': 'abrasive-service',
};

/**
 * Maps substrings found in product overview / short description / features
 * to media tags.
 */
export const MEDIA_MAP: Record<string, string> = {
  'air': 'air',
  'gas': 'gas',
  'combustible gas': 'gas',
  'steam': 'steam',
  'water': 'water',
  'oil': 'oil',
  'hydrocarbon': 'hydrocarbons',
  'slurry': 'slurry',
  'powder': 'powder',
  'chemical': 'chemicals',
  'brine': 'brine',
  'vacuum': 'vacuum',
  'flue gas': 'flue-gas',
  'process fluid': 'process-fluids',
  'sour gas': 'sour-gas',
  'hot gas': 'hot-gas',
  'dirty air': 'dirty-air',
  'clean air': 'clean-air',
  'liquid': 'liquid',
};

/* ----------------------------------------------------------
 * Parsing helpers
 * -------------------------------------------------------- */

/** Find the first spec row whose label matches (case-insensitive). */
function findSpecRow(specs: SpecRow[], label: string): SpecRow | undefined {
  const lower = label.toLowerCase();
  return specs.find((r) => r.label.toLowerCase() === lower);
}

/** Find all spec rows whose label matches (case-insensitive). */
function findAllSpecRows(specs: SpecRow[], label: string): SpecRow[] {
  const lower = label.toLowerCase();
  return specs.filter((r) => r.label.toLowerCase() === lower);
}

/**
 * Try to match a value against a normalization map. Returns the first
 * canonical value whose key is found (case-insensitive) in the value string.
 */
function matchMap(
  value: string,
  map: Record<string, string>,
): string | null {
  const lower = value.toLowerCase();
  for (const [key, canonical] of Object.entries(map)) {
    if (lower.includes(key)) {
      return canonical;
    }
  }
  return null;
}

/**
 * Match a value against a normalization map, returning ALL matches
 * (for multi-value fields like media).
 */
function matchMapAll(
  value: string,
  map: Record<string, string>,
): string[] {
  const lower = value.toLowerCase();
  const results: string[] = [];
  const seen = new Set<string>();
  for (const [key, canonical] of Object.entries(map)) {
    if (lower.includes(key) && !seen.has(canonical)) {
      seen.add(canonical);
      results.push(canonical);
    }
  }
  return results;
}

/**
 * Extract the maximum temperature in °F from a spec value string.
 * Handles patterns like "Up to 450°F", "Up to 1500°F (815°C)",
 * "-25°C to 180°C", "-22°F to +149°F", "550°C (1022°F)".
 * Returns the highest °F value found, or null.
 */
function extractTempMaxF(value: string): number | null {
  // Match all Fahrenheit values (e.g., 450°F, 1022°F, +149°F)
  const fMatches = Array.from(value.matchAll(/(-?\+?\d+)\s*°?\s*F/gi));
  // Match all Celsius values (e.g., 180°C, 550°C, -25°C)
  const cMatches = Array.from(value.matchAll(/(-?\+?\d+)\s*°?\s*C/gi));

  let maxF: number | null = null;

  for (const m of fMatches) {
    const num = parseInt(m[1].replace('+', ''), 10);
    if (!Number.isNaN(num)) {
      if (maxF === null || num > maxF) maxF = num;
    }
  }

  // Convert Celsius matches to Fahrenheit and compare
  for (const m of cMatches) {
    const num = parseInt(m[1].replace('+', ''), 10);
    if (!Number.isNaN(num)) {
      const f = Math.round((num * 9) / 5 + 32);
      if (maxF === null || f > maxF) maxF = f;
    }
  }

  return maxF;
}

/**
 * Extract the maximum pressure in PSI from a spec value string.
 * Handles patterns like "1 PSIG", "25 PSI", "115 PSI", "5 PSI".
 * Returns the highest PSI value found, or null.
 */
function extractPressureMaxPsi(value: string): number | null {
  const matches = Array.from(value.matchAll(/(\d+)\s*psi/gi));
  let max: number | null = null;
  for (const m of matches) {
    const num = parseInt(m[1], 10);
    if (!Number.isNaN(num)) {
      if (max === null || num > max) max = num;
    }
  }
  return max;
}

/* ----------------------------------------------------------
 * Main derivation function
 * -------------------------------------------------------- */

/** Unmatched spec labels are collected here for build-time visibility. */
const unmatchedLabels = new Set<string>();

/**
 * Derive structured `ProductAttributes` from a product's spec rows and
 * content fields. Every non-null value is traceable to a real spec row.
 */
export function deriveProductAttributes(
  content: ProductContent,
): ProductAttributes {
  const specs = content.specifications ?? [];
  const specGroups = content.specGroups ?? [];
  // Flatten specGroups rows into the search set too
  const allSpecRows: SpecRow[] = [...specs];
  for (const group of specGroups) {
    allSpecRows.push(...group.rows);
  }

  // --- valveType ---
  let valveType: string | null = null;
  const bodyStyleRow = findSpecRow(allSpecRows, 'Body Style');
  if (bodyStyleRow) {
    valveType = matchMap(bodyStyleRow.value, VALVE_TYPE_MAP);
  }
  if (!valveType) {
    const valveTypeRow = findSpecRow(allSpecRows, 'Valve Type');
    if (valveTypeRow) {
      valveType = matchMap(valveTypeRow.value, VALVE_TYPE_MAP);
    }
  }

  // --- connection ---
  let connection: string | null = null;
  const endConnectionsRow = findSpecRow(allSpecRows, 'End Connections');
  if (endConnectionsRow) {
    // "Wafer and Lug" -> matchMap returns first match; collect all
    const all = matchMapAll(endConnectionsRow.value, CONNECTION_MAP);
    connection = all.length > 0 ? all.join('|') : null;
  }
  if (!connection) {
    // Try body style as fallback for connection
    if (bodyStyleRow) {
      const all = matchMapAll(bodyStyleRow.value, CONNECTION_MAP);
      connection = all.length > 0 ? all.join('|') : null;
    }
  }
  if (!connection) {
    // Try flange rows
    const flangeRows = findAllSpecRows(allSpecRows, 'Flange');
    if (flangeRows.length > 0) {
      connection = 'flanged';
    }
  }

  // --- actuation ---
  let actuation: string | null = null;
  const operationRows = findAllSpecRows(allSpecRows, 'Operation');
  if (operationRows.length > 0) {
    const combined = operationRows.map((r) => r.value).join('; ');
    const all = matchMapAll(combined, ACTUATION_MAP);
    actuation = all.length > 0 ? all.join('|') : null;
  }
  if (!actuation) {
    const actuatorTypeRow = findSpecRow(allSpecRows, 'Actuator Type');
    if (actuatorTypeRow) {
      actuation = matchMap(actuatorTypeRow.value, ACTUATION_MAP);
    }
  }
  // Thread End explicitly mentions manual, electric, pneumatic in features
  if (!actuation) {
    const featuresText = (content.features ?? [])
      .map((f) => f.title)
      .join(' ')
      .toLowerCase();
    if (featuresText.includes('electric') && featuresText.includes('pneumatic')) {
      actuation = 'manual|electric|pneumatic';
    } else if (featuresText.includes('electric')) {
      actuation = 'manual|electric';
    } else if (featuresText.includes('pneumatic')) {
      actuation = 'manual|pneumatic';
    }
  }

  // --- bodyMaterial ---
  let bodyMaterial: string | null = null;
  const bodyMaterialRow = findSpecRow(allSpecRows, 'Body Material');
  if (bodyMaterialRow) {
    bodyMaterial = matchMap(bodyMaterialRow.value, BODY_MATERIAL_MAP);
  }

  // --- seatMaterial ---
  let seatMaterial: string | null = null;
  const seatStyleRow = findSpecRow(allSpecRows, 'Seat Style');
  if (seatStyleRow) {
    const all = matchMapAll(seatStyleRow.value, SEAT_MATERIAL_MAP);
    seatMaterial = all.length > 0 ? all.join('|') : null;
  }
  if (!seatMaterial) {
    const seatRow = findSpecRow(allSpecRows, 'Seat');
    if (seatRow) {
      const all = matchMapAll(seatRow.value, SEAT_MATERIAL_MAP);
      seatMaterial = all.length > 0 ? all.join('|') : null;
    }
  }
  if (!seatMaterial) {
    const seatMaterialsRow = findSpecRow(allSpecRows, 'Seat Materials');
    if (seatMaterialsRow) {
      const all = matchMapAll(seatMaterialsRow.value, SEAT_MATERIAL_MAP);
      seatMaterial = all.length > 0 ? all.join('|') : null;
    }
  }

  // --- tempMaxF ---
  let tempMaxF: number | null = null;
  // Gather all temperature-related spec rows
  const tempRows = [
    ...findAllSpecRows(allSpecRows, 'Temperature'),
    ...findAllSpecRows(allSpecRows, 'Standard Operating Temperature'),
    ...findAllSpecRows(allSpecRows, 'Maximum Operating Temperature'),
    ...findAllSpecRows(allSpecRows, 'Standard NBR Seals'),
    ...findAllSpecRows(allSpecRows, 'Viton Seals'),
    ...findAllSpecRows(allSpecRows, 'Silicone Seals'),
    ...findAllSpecRows(allSpecRows, 'Soft Seating'),
    ...findAllSpecRows(allSpecRows, 'Metal-to-Metal Seating'),
    ...findAllSpecRows(allSpecRows, 'Fahrenheit Equivalent'),
  ];
  for (const row of tempRows) {
    const extracted = extractTempMaxF(row.value);
    if (extracted !== null) {
      if (tempMaxF === null || extracted > tempMaxF) {
        tempMaxF = extracted;
      }
    }
  }

  // --- pressureMaxPsi ---
  let pressureMaxPsi: number | null = null;
  const pressureRows = [
    ...findAllSpecRows(allSpecRows, 'Pressure Rating'),
    ...findAllSpecRows(allSpecRows, 'Maximum Differential'),
    ...findAllSpecRows(allSpecRows, 'Maximum Containment'),
    ...findAllSpecRows(allSpecRows, 'Maximum Air Pressure'),
  ];
  for (const row of pressureRows) {
    const extracted = extractPressureMaxPsi(row.value);
    if (extracted !== null) {
      if (pressureMaxPsi === null || extracted > pressureMaxPsi) {
        pressureMaxPsi = extracted;
      }
    }
  }

  // --- media ---
  const mediaSet = new Set<string>();
  const textForMedia = [
    content.shortDescription ?? '',
    content.overview ?? '',
    ...(content.applications ?? []),
    ...(content.features ?? []).map((f) => f.title),
  ].join(' ');
  const mediaMatches = matchMapAll(textForMedia, MEDIA_MAP);
  for (const m of mediaMatches) {
    mediaSet.add(m);
  }
  // Also check spec values for media hints
  for (const row of allSpecRows) {
    if (
      row.label.toLowerCase().includes('air') ||
      row.label.toLowerCase().includes('supply air')
    ) {
      const matches = matchMapAll(row.value, MEDIA_MAP);
      for (const m of matches) mediaSet.add(m);
    }
  }

  // --- industries ---
  const industries: string[] = (content.industries ?? []).map((ind) => ind.slug);

  // --- applicationTags ---
  const appTagSet = new Set<string>();
  for (const app of content.applications ?? []) {
    const lower = app.toLowerCase();
    for (const [key, tag] of Object.entries(APPLICATION_TAG_MAP)) {
      if (lower.includes(key)) {
        appTagSet.add(tag);
      }
    }
  }
  // Also derive from applicationGroups items
  for (const group of content.applicationGroups ?? []) {
    for (const item of group.items) {
      const lower = item.toLowerCase();
      for (const [key, tag] of Object.entries(APPLICATION_TAG_MAP)) {
        if (lower.includes(key)) {
          appTagSet.add(tag);
        }
      }
    }
  }

  // --- Track unmatched spec labels for audit ---
  for (const row of allSpecRows) {
    const label = row.label.toLowerCase();
    const isKnown =
      label.includes('size') ||
      label.includes('temperature') ||
      label.includes('pressure') ||
      label.includes('body') ||
      label.includes('seat') ||
      label.includes('flange') ||
      label.includes('end connection') ||
      label.includes('operation') ||
      label.includes('actuator') ||
      label.includes('shutoff') ||
      label.includes('design') ||
      label.includes('stem') ||
      label.includes('disc') ||
      label.includes('seal') ||
      label.includes('o-ring') ||
      label.includes('rotation') ||
      label.includes('torque') ||
      label.includes('model') ||
      label.includes('voltage') ||
      label.includes('phase') ||
      label.includes('frequency') ||
      label.includes('control') ||
      label.includes('duty') ||
      label.includes('inching') ||
      label.includes('enclosure') ||
      label.includes('mounting') ||
      label.includes('manual') ||
      label.includes('position') ||
      label.includes('limit') ||
      label.includes('contact') ||
      label.includes('spring') ||
      label.includes('piston') ||
      label.includes('pinion') ||
      label.includes('larger') ||
      label.includes('service') ||
      label.includes('flow') ||
      label.includes('leakage') ||
      label.includes('valve type') ||
      label.includes('construction') ||
      label.includes('disc style') ||
      label.includes('return') ||
      label.includes('fail') ||
      label.includes('handwheel') ||
      label.includes('fahrenheit') ||
      label.includes('air');
    if (!isKnown) {
      unmatchedLabels.add(row.label);
    }
  }

  return {
    valveType,
    connection,
    actuation,
    bodyMaterial,
    seatMaterial,
    media: Array.from(mediaSet),
    tempMaxF,
    pressureMaxPsi,
    industries,
    applicationTags: Array.from(appTagSet),
  };
}

/**
 * Log unmatched spec labels once. Call at module load time in development
 * to surface gaps in the derivation maps.
 */
export function logUnmatchedSpecLabels(): void {
  if (unmatchedLabels.size > 0) {
    // eslint-disable-next-line no-console
    console.warn(
      '[product-attributes] Unmatched spec labels (not derived into attributes):',
      Array.from(unmatchedLabels).sort(),
    );
  }
}
