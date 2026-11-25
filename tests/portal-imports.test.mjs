import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { mapSpreadsheet, parseCsv, readSpreadsheet } from '../lib/portal/imports/parse.ts';

const columns = {
  account_number: 'Account',
  order_number: 'Order',
  source_updated_at: 'Updated',
  status: 'Stage',
  estimated_ship_date: 'Ship date',
  estimated_delivery_date: 'Delivery date',
};
const header = 'Account,Order,Updated,Stage,Ship date,Delivery date';
const valid = '00100,SO-1,2024-02-01T10:00:00Z,In Production,2024-02-20,2024-02-25';
const expected = {
  row_number: 2,
  account_number: '00100',
  order_number: 'SO-1',
  source_updated_at: '2024-02-01T10:00:00.000Z',
  status: 'in_production',
  estimated_ship_date: '2024-02-20',
  estimated_delivery_date: '2024-02-25',
};

test('CSV supports BOM, quoted commas, escaped quotes, CRLF, and embedded newlines', async () => {
  const rows = await readSpreadsheet('orders.csv', Buffer.from('\uFEFFAccount,Description\r\n00100,"Valve, Type ""B""\nIn production"\r\n'));
  assert.deepEqual(rows, [['Account', 'Description'], ['00100', 'Valve, Type "B"\nIn production']]);
  assert.throws(() => parseCsv('Account,Description\n00100,"unclosed'), /unclosed/);
});

test('mapped CSV normalizes source values without mutating account identity', async () => {
  const cells = await readSpreadsheet('orders.csv', Buffer.from(header + '\n' + valid));
  const output = mapSpreadsheet(cells, columns);
  assert.deepEqual(output, { rows: [expected], issues: [] });
});

test('map rejects invalid dates, repeated identity, and unknown stages', () => {
  const cells = parseCsv([
    header,
    valid,
    valid,
    '00100,SO-2,2024-02-01T10:00:00Z,In Production,2024-02-31,2024-02-25',
    '00100,SO-3,2024-02-01T10:00:00Z,Delivered,2024-02-20,2024-02-25',
  ].join('\n'));
  const output = mapSpreadsheet(cells, columns);
  assert.deepEqual(output.rows, [expected]);
  assert.deepEqual(output.issues.map((issue) => issue.row_number), [3, 4, 5]);
});

test('XML workbook values and typed dates are accepted from the configured sheet', async () => {
  const file = await readFile(new URL('./fixtures/portal-operations.xlsx', import.meta.url));
  const cells = await readSpreadsheet('orders.xlsx', file, 'Production');
  assert.deepEqual(mapSpreadsheet(cells, columns), { rows: [expected], issues: [] });
  await assert.rejects(readSpreadsheet('orders.xlsx', file, 'Missing'), /configured worksheet/);
});

test('invalid format, archive, encoding, and mapping fail without importing', async () => {
  await assert.rejects(readSpreadsheet('orders.xls', Buffer.from('invalid')), /CSV or XLSX/);
  await assert.rejects(readSpreadsheet('orders.xlsx', Buffer.from('not a workbook')), /Workbook is invalid/);
  await assert.rejects(readSpreadsheet('orders.csv', Buffer.from([0xff, 0xfe, 0xff])), /UTF-8/);
  assert.throws(() => mapSpreadsheet(parseCsv(header + '\n' + valid), { ...columns, order_number: 'Account' }), /separate column/);
});
