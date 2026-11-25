import Link from 'next/link';
import type { DocumentRecord, Quote, QuoteLine } from '@/lib/portal/queries';
import { dateLabel, money } from './format';
import { DocumentList } from './Orders';
import { DataTable, Facts, linkClass, Panel, Status } from './ui';

export function EstimateDetails({ quote, items, documents, order }: { quote: Quote; items: QuoteLine[]; documents: DocumentRecord[]; order?: { label: string; href: string } }) {
  return <>
    <Panel title="Estimate details"><Facts entries={[
      ['Status', <Status key="status" value={quote.status} />], ['Issued', dateLabel(quote.quote_date)],
      ['Valid until', dateLabel(quote.valid_until)], ['Estimate amount', money(quote.total_amount, quote.currency)],
      ['Related order', order ? <Link key="order" href={order.href} className={linkClass}>{order.label}</Link> : '—'],
    ]} /></Panel>
    <Panel title="Estimate line items"><DataTable label="Estimate line items" columns={['Line', 'SKU', 'Product', 'Quantity', 'Unit price']} empty="No line items are available." rows={items.map((item) => [item.line_number, item.sku ?? '—', item.description, item.quantity, money(item.unit_price, quote.currency)])} /></Panel>
    <Panel title="Estimate documents"><DocumentList documents={documents} /></Panel>
  </>;
}
