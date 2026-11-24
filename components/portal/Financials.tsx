import Link from 'next/link';
import type { Balance, Invoice } from '@/lib/portal/queries';
import { accountHref, dateLabel, money } from './format';
import { DataTable, Empty, Facts, linkClass, Status } from './ui';

export function BalanceList({ balances }: { balances: Balance[] }) {
  if (!balances.length) return <Empty message="No balances or payments have been recorded." />;
  return <div className="divide-y divide-[#e4ece7]">{balances.map((balance) => <Facts key={balance.currency} entries={[
    [`Unpaid invoice balance (${balance.currency})`, money(balance.outstanding_amount, balance.currency)],
    ['Last payment', money(balance.last_payment_amount, balance.currency)],
    ['Payment date', dateLabel(balance.last_payment_date)],
  ]} />)}</div>;
}

export function InvoiceTable({ invoices, company, base = '/portal/invoices', companyNames }: { invoices: Invoice[]; company?: string; base?: string; companyNames?: Map<string, string> }) {
  return <DataTable label="Invoice records" columns={['Invoice', ...(companyNames ? ['Company'] : []), 'Issued', 'Due', 'Amount', 'Outstanding', 'Status']} empty="No invoices are available." rows={invoices.map((invoice) => [
    <Link key="invoice" href={accountHref(`${base}/${invoice.id}`, company)} className={linkClass}>{invoice.invoice_number}</Link>,
    ...(companyNames ? [companyNames.get(invoice.organization_id) ?? '—'] : []),
    dateLabel(invoice.invoice_date), dateLabel(invoice.due_date), money(invoice.total_amount, invoice.currency), money(invoice.outstanding_amount, invoice.currency),
    <Status key="status" value={invoice.status} />,
  ])} />;
}
