'use client';

import { useState } from 'react';
import { saveShipmentAction } from '@/lib/portal/actions';
import type { LineFulfillment, OrderLine, Shipment } from '@/lib/portal/queries';
import { buttonClass, Field, fieldClass } from './ui';

export function ShipmentEditor({ order, shipment, lines, currentQuantities, fulfillment }: {
  order: string; shipment?: Shipment; lines: OrderLine[];
  currentQuantities: Record<string, string>;
  fulfillment: LineFulfillment[];
}) {
  const [quantities, setQuantities] = useState(currentQuantities);
  const quantityByLine = new Map(fulfillment.map((line) => [line.order_item_id, line]));
  const items = lines.filter((line) => Number(quantities[line.id]) > 0).map((line) => ({ order_item_id: line.id, quantity: Number(quantities[line.id]) }));
  return (
    <form action={saveShipmentAction} className="grid gap-4 p-4 sm:grid-cols-2 sm:px-6">
      <input type="hidden" name="order_id" value={order} />
      {shipment && <input type="hidden" name="shipment_id" value={shipment.id} />}
      <input type="hidden" name="items" value={JSON.stringify(items)} />
      <Field label="Carrier"><input className={fieldClass} name="carrier" maxLength={80} defaultValue={shipment?.carrier ?? ''} /></Field>
      <Field label="Tracking number"><input className={fieldClass} name="tracking_number" maxLength={160} defaultValue={shipment?.tracking_number ?? ''} /></Field>
      <Field label="Ship date"><input className={fieldClass} name="ship_date" type="date" defaultValue={shipment?.ship_date?.slice(0, 10)} /></Field>
      <Field label="Delivered date"><input className={fieldClass} name="delivered_at" type="date" defaultValue={shipment?.delivered_at?.slice(0, 10)} /></Field>
      <Field label="Shipment status"><select name="status" className={fieldClass} defaultValue={shipment?.status ?? 'pending'}>
        <option value="pending">Pending</option><option value="shipped">Shipped</option><option value="in_transit">In transit</option><option value="delivered">Delivered</option><option value="cancelled">Cancelled</option>
      </select></Field>
      <Field label="Reason"><input name="reason" className={fieldClass} maxLength={500} required /></Field>
      <fieldset className="grid gap-3 sm:col-span-2">
        <legend className="mb-2 text-sm font-bold text-brand-green-dark">Shipment quantities</legend>
        {lines.map((line) => (
          <div key={line.id} className="grid items-center gap-2 rounded-lg border border-[#d6e1da] p-3 sm:grid-cols-[minmax(0,1fr)_9rem]">
            <p className="break-words text-sm font-semibold">Line {line.line_number} · {line.description}
              <span className="mt-1 block text-xs font-medium text-[#526b5e]">Ordered {line.quantity_ordered} · Remaining {quantityByLine.get(line.id)?.quantity_remaining ?? '—'}</span>
            </p>
            <Field label={`Quantity for line ${line.line_number}`}>
              <input className={fieldClass} type="number" min="0" step="0.0001" value={quantities[line.id] ?? ''} onChange={(event) => setQuantities({ ...quantities, [line.id]: event.target.value })} inputMode="decimal" />
            </Field>
          </div>
        ))}
      </fieldset>
      <button type="submit" className={`${buttonClass} justify-self-start sm:col-span-2`}>{shipment ? 'Save shipment correction' : 'Create shipment'}</button>
    </form>
  );
}
