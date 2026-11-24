import Link from 'next/link';
import { Search } from 'lucide-react';
import type { DocumentRecord, Order, OrderEvent, OrderNote, Shipment, ShipmentLine, OrderLine } from '@/lib/portal/queries';
import { accountHref, dateLabel, orderStates, trackingUrl } from './format';
import { buttonClass, DataTable, Empty, Field, fieldClass, linkClass, Panel, Status } from './ui';

export type OrderFilters = { query?: string; status?: string; from?: string; to?: string; sort?: string };

export function OrderSearch({ filters, base, company }: { filters: OrderFilters; base: string; company?: string }) {
  return (
    <form action={base} className="grid gap-3 rounded-xl border border-[#d6e1da] bg-white p-4 sm:grid-cols-2 xl:grid-cols-[minmax(155px,2fr)_1fr_1fr_1fr_1fr_auto]">
      {company && <input type="hidden" name="company" value={company} />}
      <Field label="Order or PO number"><input name="q" className={fieldClass} type="search" defaultValue={filters.query} maxLength={80} /></Field>
      <Field label="Status"><select name="status" className={fieldClass} defaultValue={filters.status ?? ''}>
        <option value="">All statuses</option>
        {orderStates.map((state) => <option key={state} value={state}>{state.replace(/_/g, ' ')}</option>)}
      </select></Field>
      <Field label="From"><input name="from" type="date" className={fieldClass} defaultValue={filters.from} /></Field>
      <Field label="To"><input name="to" type="date" className={fieldClass} defaultValue={filters.to} /></Field>
      <Field label="Sort"><select name="sort" className={fieldClass} defaultValue={filters.sort ?? 'recent'}><option value="recent">Newest first</option><option value="oldest">Oldest first</option><option value="number">Order number</option></select></Field>
      <button className={`${buttonClass} self-end`} type="submit"><Search aria-hidden="true" size={16} />Search</button>
    </form>
  );
}

export function Pages({ base, query, page, more }: { base: string; query: Record<string, string | undefined>; page: number; more: boolean }) {
  if (page === 1 && !more) return null;
  function url(value: number) {
    const params = new URLSearchParams();
    for (const [key, content] of Object.entries(query)) if (content) params.set(key, content);
    params.set('page', String(value));
    return `${base}?${params.toString()}`;
  }
  return (
    <nav aria-label="Results pages" className="flex items-center justify-center gap-5 text-sm text-[#526b5e]">
      {page > 1 && <Link href={url(page - 1)} className={linkClass}>Previous</Link>}
      <span>Page {page}</span>
      {more && <Link href={url(page + 1)} className={linkClass}>Next</Link>}
    </nav>
  );
}

export function OrderTable({ orders, base, company, companies }: { orders: Order[]; base: string; company?: string; companies?: Map<string, string> }) {
  return <DataTable label="Order records" columns={['Sales order', ...(companies ? ['Company'] : []), 'Customer PO', 'Order date', 'Estimated ship date', 'Status']} empty="No orders match these filters." rows={orders.map((order) => [
    <Link key="order" href={accountHref(`${base}/${order.id}`, company)} className={linkClass}>{order.order_number}</Link>,
    ...(companies ? [companies.get(order.organization_id) ?? '—'] : []),
    order.customer_po ?? '—', dateLabel(order.order_date), dateLabel(order.estimated_ship_date), <Status key="status" value={order.status} />,
  ])} />;
}

export function DocumentList({ documents }: { documents: DocumentRecord[] }) {
  return (
    <DataTable label="Associated documents" columns={['Document', 'Type', 'Added']} empty="No documents are available." rows={documents.map((file) => [
      <a key="document" href={`/api/portal/documents/${file.id}`} className={linkClass}>{file.title}</a>,
      file.kind.replace(/_/g, ' '), dateLabel(file.created_at),
    ])} />
  );
}

export function OrderTimeline({ events }: { events: OrderEvent[] }) {
  if (!events.length) return <Empty message="No order milestones have been recorded." />;
  return (
    <ol aria-label="Order status history, newest first" className="grid gap-0 px-5 py-4 sm:px-7">
      {events.map((event, index) => <li key={event.id} className="relative grid gap-2 border-l border-[#b8d4c3] pb-5 pl-4 last:pb-0">
        <span aria-hidden="true" className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ${index ? 'bg-[#87ae98]' : 'bg-brand-green'}`} />
        <div className="flex flex-wrap items-center gap-2"><Status value={event.status} /><time className="text-xs text-[#526b5e]" dateTime={event.occurred_at}>{dateLabel(event.occurred_at)}</time></div>
        {event.note && <p className="whitespace-pre-wrap break-words text-sm text-[#345645]">{event.note}</p>}
      </li>)}
    </ol>
  );
}

export function OrderNotes({ notes }: { notes: OrderNote[] }) {
  if (!notes.length) return <Empty message="No notes have been added." />;
  return <ul className="divide-y divide-[#e4ece7] px-4 sm:px-6">{notes.map((note) => <li key={note.id} className="py-3">
    <div className="flex flex-wrap items-center gap-2 text-xs text-[#526b5e]"><time dateTime={note.created_at}>{dateLabel(note.created_at)}</time>{!note.customer_visible && <Status value="Internal" />}</div>
    <p className="mt-2 whitespace-pre-wrap break-words text-sm text-brand-green-dark">{note.body}</p>
  </li>)}</ul>;
}

export function Tracking({ shipment }: { shipment: Shipment }) {
  const href = trackingUrl(shipment.carrier, shipment.tracking_number);
  if (!shipment.tracking_number) return <span className="text-[#526b5e]">Pending</span>;
  return href ? <a href={href} className={linkClass} rel="noopener noreferrer" target="_blank">{shipment.tracking_number}<span className="sr-only"> (opens carrier website in a new tab)</span></a> : shipment.tracking_number;
}

export function ShipmentHistory({ shipments, lines, shipmentLines }: { shipments: Shipment[]; lines: OrderLine[]; shipmentLines: ShipmentLine[] }) {
  const lineNames = new Map(lines.map((line) => [line.id, line]));
  return <Panel title="Shipment history">
    {shipments.length === 0 ? <Empty message="No shipments have been recorded for this order." /> : (
      <div className="divide-y divide-[#e4ece7]">
        {shipments.map((shipment) => (
          <details key={shipment.id} className="px-4 py-4 sm:px-6">
            <summary className="cursor-pointer text-sm font-semibold text-brand-green-dark">
              {shipment.carrier ?? 'Carrier pending'} · {dateLabel(shipment.ship_date)} <Status value={shipment.status} />
            </summary>
            <div className="grid gap-3 pb-1 pt-3">
              <p className="text-sm">Tracking <Tracking shipment={shipment} />{shipment.delivered_at ? ` · Delivered ${dateLabel(shipment.delivered_at)}` : ''}</p>
              <DataTable label="Shipped items" columns={['Order line', 'Product', 'Quantity']} empty="No line quantities have been recorded." rows={shipmentLines.filter((line) => line.shipment_id === shipment.id).map((line) => {
                const item = lineNames.get(line.order_item_id);
                return [item?.line_number ?? '—', item?.description ?? '—', line.quantity];
              })} />
            </div>
          </details>
        ))}
      </div>
    )}
  </Panel>;
}
