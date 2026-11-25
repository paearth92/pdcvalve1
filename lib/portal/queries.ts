import 'server-only';

import { notFound } from 'next/navigation';
import { portalClient } from './db';
import { isIsoDate, orderStates } from '@/components/portal/format';

type Db = Awaited<ReturnType<typeof portalClient>>;
type Result = PromiseLike<{ data: unknown; error: unknown }>;
export type Numeric = number | string;

export type Order = {
  id: string;
  organization_id: string;
  order_number: string;
  customer_po: string | null;
  order_date: string | null;
  status: string;
  estimated_ship_date: string | null;
  estimated_delivery_date: string | null;
};

export type Shipment = {
  id: string;
  order_id: string;
  organization_id: string;
  carrier: string | null;
  tracking_number: string | null;
  ship_date: string | null;
  status: string;
  delivered_at: string | null;
};

export type OrderLine = {
  id: string;
  line_number: number;
  description: string;
  sku: string | null;
  quantity_ordered: Numeric;
};
export type LinePrice = { order_item_id: string; currency: string; unit_price: Numeric; line_total: Numeric };
export type Fulfillment = {
  order_id: string;
  quantity_ordered: Numeric;
  quantity_shipped: Numeric;
  quantity_remaining: Numeric;
  fulfillment_percent: Numeric | null;
};
export type LineFulfillment = Fulfillment & { order_item_id: string };
export type ShipmentLine = { shipment_id: string; order_item_id: string; quantity: Numeric };
export type OrderEvent = { id: string; status: string; occurred_at: string; note: string | null; source: string };
export type OrderNote = { id: string; body: string; customer_visible: boolean; created_at: string };
export type DocumentRecord = { id: string; title: string; kind: string; created_at: string; customer_visible: boolean };
export type Activity = {
  id: string;
  type: string;
  title: string;
  created_at: string;
  order_id: string | null;
  quote_id: string | null;
  invoice_id: string | null;
  shipment_id: string | null;
};

export type Invoice = {
  id: string;
  organization_id: string;
  order_id: string | null;
  invoice_number: string;
  invoice_date: string | null;
  due_date: string | null;
  currency: string;
  total_amount: Numeric;
  outstanding_amount: Numeric;
  status: string;
};
export type Payment = { id: string; payment_reference: string | null; payment_date: string | null; currency: string; amount: Numeric };
export type Balance = { organization_id: string; currency: string; outstanding_amount: Numeric; last_payment_amount: Numeric | null; last_payment_date: string | null };
export type Quote = {
  id: string;
  quote_number: string;
  quote_date: string | null;
  valid_until: string | null;
  status: string;
  currency: string;
  total_amount: Numeric;
  order_id: string | null;
};
export type QuoteLine = { id: string; line_number: number; sku: string | null; description: string; quantity: Numeric; unit_price: Numeric | null };

export const orderColumns = 'id,organization_id,order_number,customer_po,order_date,status,estimated_ship_date,estimated_delivery_date';
export const shipmentColumns = 'id,order_id,organization_id,carrier,tracking_number,ship_date,status,delivered_at';
export const invoiceColumns = 'id,organization_id,order_id,invoice_number,invoice_date,due_date,currency,total_amount,outstanding_amount,status';
export const quoteColumns = 'id,quote_number,quote_date,valid_until,status,currency,total_amount,order_id';
export const documentColumns = 'id,title,kind,created_at,customer_visible';
export const activityColumns = 'id,type,title,created_at,order_id,quote_id,invoice_id,shipment_id';

export const pageSize = 25;
const uuidPattern = /^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/i;

export function recordId(value: string) {
  if (!uuidPattern.test(value)) notFound();
  return value;
}

export async function rows<T>(query: Result): Promise<T[]> {
  const { data, error } = await query;
  if (error) throw new Error('Portal records could not be loaded.');
  return (data ?? []) as T[];
}

export async function record<T>(query: Result): Promise<T | null> {
  const { data, error } = await query;
  if (error) throw new Error('Portal record could not be loaded.');
  return data as T | null;
}

export async function exactCount(query: PromiseLike<{ count: number | null; error: unknown }>) {
  const { count, error } = await query;
  if (error) throw new Error('Portal totals could not be loaded.');
  return count ?? 0;
}

export function pageNumber(value?: string) {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? Math.min(n, 100_000) : 1;
}

export function pageRange(page: number): [number, number] {
  return [(page - 1) * pageSize, page * pageSize];
}

export function searchText(value?: string) {
  // Strip PostgREST filter syntax and LIKE wildcards from user input.
  return (value ?? '').trim().slice(0, 80).replace(/[^\p{L}\p{N} .@#\-:/]/gu, '');
}

export async function listOrders(db: Db, filters: {
  company?: string; query?: string; status?: string; from?: string; to?: string; sort?: string; page: number;
}) {
  let query = db.from('portal_orders').select(orderColumns);
  if (filters.company) query = query.eq('organization_id', filters.company);
  const search = searchText(filters.query);
  if (search) query = query.or(`order_number.ilike.%${search}%,customer_po.ilike.%${search}%`);
  const status = orderStates.find((value) => value === filters.status);
  if (status) query = query.eq('status', status);
  if (isIsoDate(filters.from)) query = query.gte('order_date', filters.from);
  if (isIsoDate(filters.to)) query = query.lte('order_date', filters.to);
  const orders = await rows<Order>(query
    .order(filters.sort === 'number' ? 'order_number' : 'order_date', { ascending: filters.sort === 'oldest' || filters.sort === 'number', nullsFirst: false })
    .order('id')
    .range(...pageRange(filters.page)));
  return { orders: orders.slice(0, pageSize), more: orders.length > pageSize };
}

export async function listOrderDetails(db: Db, order: Order, access: { shipping: boolean; finance: boolean; customer?: boolean }) {
  const { id, organization_id: company } = order;
  let documentQuery = db.from('portal_documents').select(documentColumns).eq('order_id', id).eq('organization_id', company);
  let noteQuery = db.from('portal_order_notes').select('id,body,customer_visible,created_at').eq('order_id', id).eq('organization_id', company);
  if (access.customer) {
    documentQuery = documentQuery.eq('customer_visible', true);
    noteQuery = noteQuery.eq('customer_visible', true);
    if (!access.finance) documentQuery = documentQuery.is('invoice_id', null).is('quote_id', null).not('kind', 'in', '(invoice,quote)');
  }
  const lines = rows<OrderLine>(db.from('portal_order_items').select('id,line_number,description,sku,quantity_ordered').eq('order_id', id).eq('organization_id', company).order('line_number'));
  const [orderLines, lineFulfillment, summary, events, shipments, shipmentLines, documents, notes, prices] = await Promise.all([
    lines,
    access.shipping ? rows<LineFulfillment>(db.from('portal_line_fulfillment').select('*').eq('order_id', id).eq('organization_id', company)) : [],
    access.shipping ? record<Fulfillment>(db.from('portal_order_fulfillment').select('*').eq('order_id', id).eq('organization_id', company).maybeSingle()) : null,
    rows<OrderEvent>(db.from('portal_order_events').select('id,status,occurred_at,note,source').eq('order_id', id).eq('organization_id', company).order('occurred_at', { ascending: false }).order('id').limit(100)),
    access.shipping ? rows<Shipment>(db.from('portal_shipments').select(shipmentColumns).eq('order_id', id).eq('organization_id', company).order('ship_date', { ascending: false, nullsFirst: false }).order('id').limit(100)) : [],
    access.shipping ? rows<ShipmentLine>(db.from('portal_shipment_items').select('shipment_id,order_item_id,quantity').eq('order_id', id).eq('organization_id', company)) : [],
    rows<DocumentRecord>(documentQuery.order('created_at', { ascending: false })),
    rows<OrderNote>(noteQuery.order('created_at', { ascending: false }).order('id').limit(100)),
    access.finance ? lines.then((items) => items.length
      ? rows<LinePrice>(db.from('portal_order_item_prices').select('order_item_id,currency,unit_price,line_total').eq('organization_id', company).in('order_item_id', items.map((item) => item.id)))
      : []) : [],
  ]);
  return { lines: orderLines, lineFulfillment, summary, events, shipments, shipmentLines, documents, notes, prices };
}
