import { notFound } from 'next/navigation';
import { requirePortalStaff } from '@/lib/portal/auth';
import { portalClient } from '@/lib/portal/db';
import { type DocumentRecord, type Invoice, type Payment, documentColumns, invoiceColumns, record, recordId, rows } from '@/lib/portal/queries';
import { InvoiceDetails } from '@/components/portal/InvoiceDetails';
import { DocumentUpload } from '@/components/portal/OrderForms';
import { Feedback, type PortalSearch } from '@/components/portal/Feedback';
import { PageHeading } from '@/components/portal/ui';

export default async function FinanceInvoicePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<PortalSearch> }) {
  const { permissions } = await requirePortalStaff('finance.read');
  const id = recordId((await params).id);
  const db = await portalClient();
  const invoice = await record<Invoice>(db.from('portal_invoices').select(invoiceColumns).eq('id', id).maybeSingle());
  if (!invoice) notFound();
  const company = invoice.organization_id;
  const [payments, documents, order, organization] = await Promise.all([
    rows<Payment>(db.from('portal_payments').select('id,payment_reference,payment_date,currency,amount').eq('invoice_id', id).eq('organization_id', company).order('payment_date', { ascending: false })),
    rows<DocumentRecord>(db.from('portal_documents').select(documentColumns).eq('invoice_id', id).eq('organization_id', company)),
    invoice.order_id && permissions.includes('orders.read') ? record<{ order_number: string }>(db.from('portal_orders').select('order_number').eq('id', invoice.order_id).eq('organization_id', company).maybeSingle()) : null,
    record<{ name: string }>(db.from('portal_organizations').select('name').eq('id', company).maybeSingle()),
  ]);
  return <>
    <PageHeading title={`Invoice ${invoice.invoice_number}`} description={organization?.name} back={{ label: 'Finance', href: '/admin/finance' }} />
    <Feedback searchParams={await searchParams} />
    <InvoiceDetails invoice={invoice} payments={payments} documents={documents} order={order && invoice.order_id ? { href: `/admin/orders/${invoice.order_id}`, label: order.order_number } : undefined} />
    {permissions.includes('documents.manage') && <DocumentUpload financial={{ id, kind: 'invoice', returnTo: `/admin/finance/${id}` }} />}
  </>;
}
