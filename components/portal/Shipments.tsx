import Link from 'next/link';
import type { Shipment } from '@/lib/portal/queries';
import { accountHref, dateLabel } from './format';
import { Tracking } from './Orders';
import { DataTable, linkClass, Status } from './ui';

export function ShipmentTable({ shipments, orders, company, admin }: { shipments: Shipment[]; orders: Map<string, string>; company?: string; admin?: boolean }) {
  return <DataTable label="Shipments" columns={['Shipment', 'Order', 'Carrier', 'Tracking number', 'Ship date', 'Status']} empty="No shipments have been recorded." rows={shipments.map((shipment) => [
    <Link key="details" href={accountHref(`${admin ? '/admin' : '/portal'}/shipments/${shipment.id}`, company)} className={linkClass}>Details</Link>,
    orders.get(shipment.order_id) ?? '—',
    shipment.carrier ?? '—', <Tracking key="tracking" shipment={shipment} />, dateLabel(shipment.ship_date), <Status key="status" value={shipment.status} />,
  ])} />;
}
