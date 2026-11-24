import type { Order, listOrderDetails } from '@/lib/portal/queries';
import { dateLabel, money } from './format';
import { DocumentList, OrderNotes, OrderTimeline, ShipmentHistory } from './Orders';
import { DataTable, Facts, Panel, Status } from './ui';

export function OrderDetails({ order, details, finance, shipping }: { order: Order; details: Awaited<ReturnType<typeof listOrderDetails>>; finance: boolean; shipping: boolean }) {
  const { summary, lines, lineFulfillment, prices, events, shipments, shipmentLines, documents, notes } = details;
  const fulfillmentByLine = new Map(lineFulfillment.map((entry) => [entry.order_item_id, entry]));
  const pricesByLine = new Map(prices.map((entry) => [entry.order_item_id, entry]));
  const percent = summary?.fulfillment_percent;

  return <>
    <Panel title="Order details"><Facts entries={[
      ['Status', <Status key="status" value={order.status} />],
      ['Customer PO', order.customer_po ?? '—'],
      ['Order date', dateLabel(order.order_date)],
      ['Estimated ship date', dateLabel(order.estimated_ship_date)],
      ['Estimated delivery date', dateLabel(order.estimated_delivery_date)],
    ]} /></Panel>
    {summary && <Panel title="Fulfillment">
      <Facts entries={[
        ['Ordered', summary.quantity_ordered], ['Shipped', summary.quantity_shipped], ['Remaining', summary.quantity_remaining],
      ]} />
      {percent != null && <div className="grid gap-1 px-4 pb-4 sm:px-6">
        <label className="text-xs font-semibold text-brand-green-dark">Fulfillment: {percent}%
          <progress className="mt-1 block h-2 w-full accent-brand-green" max={100} value={Number(percent)} />
        </label>
      </div>}
    </Panel>}
    <Panel title="Order line items">
      <DataTable label="Order line items" columns={[
        'Line', 'SKU', 'Product', 'Ordered', ...(shipping ? ['Shipped', 'Remaining'] : []), ...(finance ? ['Unit price', 'Line total'] : []),
      ]} empty="No line items have been recorded." rows={lines.map((line) => {
        const quantities = fulfillmentByLine.get(line.id);
        const price = pricesByLine.get(line.id);
        return [
          line.line_number, line.sku ?? '—', line.description, line.quantity_ordered,
          ...(shipping ? [quantities?.quantity_shipped ?? '—', quantities?.quantity_remaining ?? '—'] : []),
          ...(finance ? [money(price?.unit_price, price?.currency), money(price?.line_total, price?.currency)] : []),
        ];
      })} />
    </Panel>
    <Panel title="Order milestones"><OrderTimeline events={events} /></Panel>
    {shipping && <ShipmentHistory shipments={shipments} lines={lines} shipmentLines={shipmentLines} />}
    <Panel title="Documents"><DocumentList documents={documents} /></Panel>
    <Panel title="Notes"><OrderNotes notes={notes} /></Panel>
  </>;
}
