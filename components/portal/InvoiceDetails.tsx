import Link from 'next/link';
import type { DocumentRecord, Invoice, Payment } from '@/lib/portal/queries';
import { dateLabel, money } from './format';
import { DocumentList } from './Orders';
import { DataTable, Facts, linkClass, Panel, Status } from './ui';

export function InvoiceDetails({ invoice, payments, documents, order }: { invoice: Invoice; payments: Payment[]; documents: DocumentRecord[]; order?: { label: string; href: string } }) {
  return <>
    <Panel title="Invoice details"><Facts entries={[
      ['Status', <Status key="status" value={invoice.status} />], ['Issue date', dateLabel(invoice.invoice_date)], ['Due date', dateLabel(invoice.due_date)],
      ['Invoice total', money(invoice.total_amount, invoice.currency)], ['Outstanding balance', money(invoice.outstanding_amount, invoice.currency)],
      ...(order ? [['Order', <Link key="order" href={order.href} className={linkClass}>{order.label}</Link>] as [string, React.ReactNode]] : []),
    ]} /></Panel>
    <Panel title="Recorded payments"><DataTable label="Recorded payments" columns={['Reference', 'Date', 'Amount']} empty="No payments are recorded for this invoice." rows={payments.map((payment) => [
      payment.payment_reference ?? '—', dateLabel(payment.payment_date), money(payment.amount, payment.currency),
    ])} /></Panel>
    <Panel title="Invoice documents"><DocumentList documents={documents} /></Panel>
  </>;
}
