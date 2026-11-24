import { inflateRawSync } from 'node:zlib';
import { readSheet } from 'read-excel-file/node';

export const MAX_IMPORT_BYTES = 768 * 1024;
const MAX_ROWS = 500;
const MAX_COLUMNS = 64;
const MAX_FIELD = 8_192;
const MAX_EXPANDED = 10 * 1024 * 1024;
const STATUSES = ['confirmed', 'in_production', 'production_completed', 'ready_to_ship'] as const;

export const MAPPING_FIELDS = [
  ['account_number', 'Account number', true],
  ['order_number', 'Sales order number', true],
  ['source_updated_at', 'Source updated (UTC)', true],
  ['status', 'Production status', false],
  ['estimated_ship_date', 'Estimated ship date', false],
  ['estimated_delivery_date', 'Estimated delivery date', false],
] as const;

export type MappingKey = typeof MAPPING_FIELDS[number][0];
export type ColumnMap = Partial<Record<MappingKey, string>>;
type Cell = string | number | boolean | Date | null;
export type ImportRow = {
  row_number: number;
  account_number: string;
  order_number: string;
  source_updated_at: string;
  status?: typeof STATUSES[number];
  estimated_ship_date?: string;
  estimated_delivery_date?: string;
};

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let cells: string[] = [];
  let field = '';
  let quoteOpen = false;
  let quoteClosed = false;

  function endCell() {
    cells.push(field);
    if (cells.length > MAX_COLUMNS) throw new Error('CSV exceeds 64 columns.');
    field = '';
    quoteClosed = false;
  }

  function endRow() {
    endCell();
    rows.push(cells);
    if (rows.length > MAX_ROWS + 1) throw new Error('Import exceeds 500 data rows.');
    cells = [];
  }

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"' && quoteOpen && text[i + 1] === '"') {
      field += '"';
      i++;
    } else if (char === '"' && quoteOpen) {
      quoteOpen = false;
      quoteClosed = true;
    } else if (quoteOpen) {
      field += char;
    } else if (char === ',') {
      endCell();
    } else if (char === '\r' || char === '\n') {
      if (char === '\r' && text[i + 1] === '\n') i++;
      endRow();
    } else if (char === '"' && !field && !quoteClosed) {
      quoteOpen = true;
    } else {
      if (quoteClosed || char === '"') throw new Error('CSV contains an invalid quoted field.');
      field += char;
    }
    if (field.length > MAX_FIELD) throw new Error('CSV cell exceeds 8,192 characters.');
  }

  if (quoteOpen) throw new Error('CSV contains an unclosed quoted field.');
  if (field || cells.length || quoteClosed) endRow();
  return rows;
}

// Validate actual expanded byte counts and reject features the workbook parser
// does not need before handing it a ZIP archive supplied by an operator.
function validateWorkbook(file: Buffer) {
  const invalid = () => { throw new Error('Workbook is invalid, unsupported, or exceeds the import limits.'); };
  if (file.length < 22) return invalid();
  let end = file.length - 22;
  const minimum = Math.max(0, end - 65_535);
  while (end >= minimum && file.readUInt32LE(end) !== 0x06054b50) end--;
  if (end < minimum || end + 22 + file.readUInt16LE(end + 20) !== file.length) return invalid();

  const count = file.readUInt16LE(end + 10);
  let offset = file.readUInt32LE(end + 16);
  const directoryStart = offset;
  if (
    count < 1 || count > 128 || file.readUInt16LE(end + 8) !== count ||
    file.readUInt32LE(end + 4) !== 0 || offset + file.readUInt32LE(end + 12) !== end
  ) return invalid();

  const decoder = new TextDecoder('utf-8', { fatal: true });
  const names = new Set<string>();
  const ranges: { local: number; end: number }[] = [];
  let expandedTotal = 0;
  for (let entry = 0; entry < count; entry++) {
    if (offset + 46 > end || file.readUInt32LE(offset) !== 0x02014b50) return invalid();
    const flags = file.readUInt16LE(offset + 8);
    const method = file.readUInt16LE(offset + 10);
    const crc = file.readUInt32LE(offset + 16);
    const compressed = file.readUInt32LE(offset + 20);
    const expanded = file.readUInt32LE(offset + 24);
    const nameLength = file.readUInt16LE(offset + 28);
    const local = file.readUInt32LE(offset + 42);
    const nameBytes = file.subarray(offset + 46, offset + 46 + nameLength);
    offset += 46 + nameLength + file.readUInt16LE(offset + 30) + file.readUInt16LE(offset + 32);
    expandedTotal += expanded;
    if (
      (flags & ~0x080e) !== 0 || offset > end || local + 30 > directoryStart ||
      file.readUInt32LE(local) !== 0x04034b50 || file.readUInt16LE(local + 6) !== flags ||
      file.readUInt16LE(local + 8) !== method || nameLength !== file.readUInt16LE(local + 26) ||
      !nameBytes.equals(file.subarray(local + 30, local + 30 + nameLength)) ||
      expandedTotal > MAX_EXPANDED || (method !== 0 && method !== 8)
    ) return invalid();
    const start = local + 30 + nameLength + file.readUInt16LE(local + 28);
    let dataEnd = start + compressed;
    if (dataEnd > directoryStart) return invalid();
    if (flags & 8) {
      if (dataEnd + 12 > directoryStart) return invalid();
      if (file.readUInt32LE(dataEnd) === 0x08074b50) dataEnd += 4;
      if (dataEnd + 12 > directoryStart || file.readUInt32LE(dataEnd) !== crc ||
        file.readUInt32LE(dataEnd + 4) !== compressed || file.readUInt32LE(dataEnd + 8) !== expanded) return invalid();
      dataEnd += 12;
    } else if (file.readUInt32LE(local + 14) !== crc ||
      file.readUInt32LE(local + 18) !== compressed || file.readUInt32LE(local + 22) !== expanded) {
      return invalid();
    }
    ranges.push({ local, end: dataEnd });

    const name = decoder.decode(nameBytes);
    if (!name || name.startsWith('/') || name.includes('\\') || name.split('/').includes('..') || names.has(name)) return invalid();
    names.add(name);
    const data = file.subarray(start, start + compressed);
    const contents = method === 0 ? data : inflateRawSync(data, { maxOutputLength: Math.max(expanded, 1) });
    if (expanded !== contents.length) return invalid();
    if (/\.xml$/i.test(name)) {
      const xml = decoder.decode(contents);
      if (/<!\s*(?:doctype|entity)/i.test(xml)) return invalid();
      if (!/<(?:[\w.-]+:)?worksheet[\s>]/i.test(xml)) continue;
      if (/<(?:[\w.-]+:)?f[\s/>]/i.test(xml)) {
        throw new Error('Replace workbook formulas with values before importing.');
      }
      const refs = /<(?:[\w.-]+:)?c\s[^>]*?\br\s*=\s*["']([^"']+)["']/g;
      for (const [, address] of Array.from(xml.matchAll(refs))) {
        const match = /^([A-Z]{1,3})([1-9][0-9]{0,2})$/.exec(address);
        if (!match) return invalid();
        const columnNumber = Array.from(match[1]).reduce((total, c) => total * 26 + c.charCodeAt(0) - 64, 0);
        if (columnNumber > MAX_COLUMNS || Number(match[2]) > MAX_ROWS + 1) return invalid();
      }
    }
  }

  let expected = 0;
  for (const range of ranges.sort((a, b) => a.local - b.local)) {
    if (range.local !== expected) return invalid();
    expected = range.end;
  }
  if (expected !== directoryStart) return invalid();

  if (offset !== end || !names.has('xl/workbook.xml') || !names.has('[Content_Types].xml')) return invalid();
}

export async function readSpreadsheet(filename: string, file: Buffer, sheet?: string): Promise<Cell[][]> {
  if (!file.length || file.length > MAX_IMPORT_BYTES) throw new Error('Select a file under 768 KiB.');
  if (/\.csv$/i.test(filename)) {
    let text: string;
    try {
      text = new TextDecoder('utf-8', { fatal: true }).decode(file);
    } catch {
      throw new Error('Save the CSV with UTF-8 encoding before importing.');
    }
    return parseCsv(text);
  }
  if (!/\.xlsx$/i.test(filename)) throw new Error('Select a CSV or XLSX file.');
  validateWorkbook(file);
  let rows: Cell[][];
  try {
    rows = sheet ? await readSheet(file, sheet) : await readSheet(file);
  } catch {
    throw new Error('The workbook or the configured worksheet could not be read.');
  }
  if (rows.length > MAX_ROWS + 1 || rows.some((cells) => cells.length > MAX_COLUMNS)) {
    throw new Error('Import exceeds 500 data rows or 64 columns.');
  }
  return rows;
}

function normalizedHeader(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

function readDate(value: Cell) {
  const date = value instanceof Date ? value.toISOString().slice(0, 10) : String(value).trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
  const parsed = new Date(date + 'T00:00:00.000Z');
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date ? date : null;
}

function readTimestamp(value: Cell) {
  if (typeof value !== 'string') return null;
  const text = value.trim();
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/.test(text)) return null;
  if (!readDate(text.slice(0, 10)) || !Number.isFinite(Date.parse(text))) return null;
  return new Date(text).toISOString();
}

export function mapSpreadsheet(cells: Cell[][], mapping: ColumnMap) {
  const headerPositions = new Map<string, number>();
  const headers = cells[0] ?? [];
  for (let idx = 0; idx < headers.length; idx++) {
    const header = headers[idx];
    if (typeof header !== 'string' || !header.trim()) continue;
    const key = normalizedHeader(header);
    if (headerPositions.has(key)) throw new Error('Use unique column headings in the first row.');
    headerPositions.set(key, idx);
  }

  const columns = new Map<MappingKey, number>();
  for (const [key, label, required] of MAPPING_FIELDS) {
    const name = mapping[key]?.trim();
    if (!name && required) throw new Error('Map the ' + label.toLowerCase() + ' column.');
    if (!name) continue;
    const idx = headerPositions.get(normalizedHeader(name));
    if (idx === undefined) throw new Error('A mapped header is missing for ' + label.toLowerCase() + '.');
    if (Array.from(columns.values()).includes(idx)) throw new Error('Map each field to a separate column.');
    columns.set(key, idx);
  }
  if (columns.size < 4) throw new Error('Map at least one production field.');

  const rows: ImportRow[] = [];
  const issues: { row_number: number; message: string }[] = [];
  const seen = new Set<string>();
  for (let index = 1; index < cells.length; index++) {
    const row = cells[index];
    if (row.every((value) => value === null || value === '')) continue;
    const row_number = index + 1;
    const get = (key: MappingKey) => row[columns.get(key) ?? -1] ?? null;
    const account = get('account_number');
    const order = get('order_number');
    const updated = readTimestamp(get('source_updated_at'));
    const status = String(get('status') ?? '').trim().toLowerCase().replace(/[\s-]+/g, '_');
    const ship = get('estimated_ship_date');
    const delivery = get('estimated_delivery_date');
    const addIssue = (message: string) => issues.push({ row_number, message });
    if (
      typeof account !== 'string' || !account.trim() || account.trim().length > 100 ||
      typeof order !== 'string' || !order.trim() || order.trim().length > 100 ||
      /[\x00-\x1f\x7f]/.test(account + order)
    ) {
      addIssue('Use text account and order numbers. Preserve any leading zeroes.');
      continue;
    }

    const key = JSON.stringify([account.trim(), order.trim()]);
    if (seen.has(key)) {
      addIssue('Account and order appear more than once in this file.');
      continue;
    }
    seen.add(key);

    if (!updated) { addIssue('Enter a source update timestamp in UTC, such as 2026-11-24T15:00:00Z.'); continue; }
    const allowedStatus = STATUSES.find((entry) => entry === status);
    if (status && !allowedStatus) { addIssue('Production status is not one of the allowed stages.'); continue; }
    const shipDate = ship === null || ship === '' ? undefined : readDate(ship);
    const deliveryDate = delivery === null || delivery === '' ? undefined : readDate(delivery);
    if (shipDate === null || deliveryDate === null) { addIssue('Enter valid dates in YYYY-MM-DD format.'); continue; }
    if (shipDate && deliveryDate && shipDate > deliveryDate) { addIssue('Estimated delivery must be on or after estimated shipping.'); continue; }
    if (!allowedStatus && !shipDate && !deliveryDate) { addIssue('Supply at least one production field.'); continue; }
    rows.push({
      row_number,
      account_number: account.trim(),
      order_number: order.trim(),
      source_updated_at: updated,
      ...(allowedStatus ? { status: allowedStatus } : {}),
      ...(shipDate ? { estimated_ship_date: shipDate } : {}),
      ...(deliveryDate ? { estimated_delivery_date: deliveryDate } : {}),
    });
  }
  if (!rows.length && !issues.length) throw new Error('The file contains no data rows.');
  return { rows, issues };
}
