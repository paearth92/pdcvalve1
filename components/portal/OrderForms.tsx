import { addOrderNoteAction, setOverrideProtectionAction, updateOrderAction, uploadDocumentAction } from '@/lib/portal/actions';
import type { Order } from '@/lib/portal/queries';
import { dateLabel, orderStates } from './format';
import { buttonClass, Empty, Field, fieldClass, Panel, Status } from './ui';

export function OrderEdit({ order }: { order: Order }) {
  return <Panel title="Update order">
    <form action={updateOrderAction} className="grid gap-4 p-4 sm:grid-cols-2 sm:px-6">
      <input type="hidden" name="order_id" value={order.id} />
      <Field label="Status"><select className={fieldClass} name="status" defaultValue={order.status}>{orderStates.map((status) => <option key={status} value={status}>{status.replace(/_/g, ' ')}</option>)}</select></Field>
      <Field label="Estimated ship date"><input className={fieldClass} type="date" name="estimated_ship_date" defaultValue={order.estimated_ship_date ?? ''} /></Field>
      <Field label="Estimated delivery date"><input className={fieldClass} type="date" name="estimated_delivery_date" defaultValue={order.estimated_delivery_date ?? ''} /></Field>
      <Field label="Reason"><input className={fieldClass} name="reason" maxLength={500} required /></Field>
      <label className="flex min-h-8 items-center gap-2 text-sm text-[#345645] sm:col-span-2"><input type="checkbox" name="protected" defaultChecked className="h-4 w-4 accent-brand-green" />Protect these updates from automatic imports</label>
      <button type="submit" className={`${buttonClass} justify-self-start sm:col-span-2`}>Save order update</button>
    </form>
  </Panel>;
}

export type OrderOverride = { field_name: string; protected: boolean; reason: string; updated_at: string };

const fieldLabels: Record<string, string> = {
  status: 'Order status',
  estimated_ship_date: 'Estimated ship date',
  estimated_delivery_date: 'Estimated delivery date',
};

export function OverrideSettings({ order, overrides }: { order: string; overrides: OrderOverride[] }) {
  return <Panel title="Import protection">
    {overrides.length ? <ul className="divide-y divide-[#e4ece7] px-4 sm:px-6">{overrides.map((entry) => <li key={entry.field_name} className="grid gap-3 py-4">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-semibold text-brand-green-dark">{fieldLabels[entry.field_name] ?? 'Order field'}</p>
        <Status value={entry.protected ? 'Protected' : 'Source can update'} />
        <time dateTime={entry.updated_at} className="text-xs text-[#526b5e]">{dateLabel(entry.updated_at)}</time>
      </div>
      <p className="whitespace-pre-wrap break-words text-sm text-[#345645]">{entry.reason}</p>
      <form action={setOverrideProtectionAction} className="flex flex-wrap items-end gap-3">
        <input type="hidden" name="order_id" value={order} />
        <input type="hidden" name="field_name" value={entry.field_name} />
        <input type="hidden" name="protected" value={String(!entry.protected)} />
        <div className="min-w-0 flex-1"><Field label="Reason for changing protection"><input name="reason" className={fieldClass} maxLength={500} required /></Field></div>
        <button type="submit" className={buttonClass}>{entry.protected ? 'Release protection' : 'Protect field'}</button>
      </form>
    </li>)}</ul> : <Empty message="This order has no manual overrides." />}
  </Panel>;
}

export function OrderNoteForm({ order }: { order: string }) {
  return <Panel title="Add a note">
    <form action={addOrderNoteAction} className="grid gap-4 p-4 sm:px-6">
      <input type="hidden" name="order_id" value={order} />
      <Field label="Note"><textarea className={fieldClass} name="body" maxLength={4000} rows={3} required /></Field>
      <label className="flex min-h-8 items-center gap-2 text-sm text-[#345645]"><input type="checkbox" name="customer_visible" className="h-4 w-4 accent-brand-green" />Share with the customer</label>
      <button type="submit" className={`${buttonClass} justify-self-start`}>Save note</button>
    </form>
  </Panel>;
}

type DocumentUploadProps =
  | { order: string; shipment?: string; financial?: never }
  | { order?: never; shipment?: never; financial: { id: string; kind: 'invoice' | 'quote'; returnTo: string } };

export function DocumentUpload({ order, shipment, financial }: DocumentUploadProps) {
  return <Panel title={shipment ? 'Attach packing slip' : 'Attach document'}>
    <form action={uploadDocumentAction} className="grid gap-4 p-4 sm:grid-cols-2 sm:px-6">
      {order && <input type="hidden" name="order_id" value={order} />}
      {shipment && <><input type="hidden" name="shipment_id" value={shipment} /><input type="hidden" name="return_to" value={`/admin/shipments/${shipment}`} /></>}
      {financial && <>
        <input type="hidden" name={`${financial.kind}_id`} value={financial.id} />
        <input type="hidden" name="kind" value={financial.kind} />
        <input type="hidden" name="return_to" value={financial.returnTo} />
      </>}
      <Field label="Title"><input className={fieldClass} name="title" maxLength={200} required /></Field>
      {!financial && <Field label="Document type"><select className={fieldClass} name="kind" defaultValue={shipment ? 'packing_slip' : 'order_confirmation'}>
        <option value="order_confirmation">Order confirmation</option><option value="packing_slip">Packing slip</option><option value="shipping_document">Shipping document</option><option value="product_documentation">Product documentation</option><option value="other">Other</option>
      </select></Field>}
      <Field label="PDF document (up to 4 MiB)"><input className={fieldClass} name="file" type="file" accept="application/pdf,.pdf" required /></Field>
      <label className="flex min-h-8 items-center gap-2 text-sm text-[#345645]"><input type="checkbox" name="customer_visible" className="h-4 w-4 accent-brand-green" />Share with the customer</label>
      <button type="submit" className={`${buttonClass} justify-self-start sm:col-span-2`}>Upload document</button>
    </form>
  </Panel>;
}
