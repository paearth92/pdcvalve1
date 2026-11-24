import { notFound } from 'next/navigation';
import { requirePortalCustomer } from '@/lib/portal/auth';
import { portalClient } from '@/lib/portal/db';
import { type DocumentRecord, type Invoice, type Payment, documentColumns, invoiceColumns, record, recordId, rows } from '@/lib/portal/queries';
import { param, type PortalSearch } from '@/components/portal/Feedback';
import { accountHref } from '@/components/portal/format';
import { InvoiceDetails } from '@/components/portal/InvoiceDetails';
import { PageHeading } from '@/components/portal/ui';

export default async function InvoicePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<PortalSearch> }) {
  const { organization, canViewFinancials } = await requirePortalCustomer(param(await searchParams, 'company'));
  if (!canViewFinancials) notFound();
  const id = recordId((await params).id);
  const company = organization.id;
  const db = await portalClient();
  const invoice = await record<Invoice>(db.from('portal_invoices').select(invoiceColumns).eq('id', id).eq('organization_id', company).maybeSingle());
  if (!invoice) notFound();
  const [payments, documents, order] = await Promise.all([
    rows<Payment>(db.from('portal_payments').select('id,payment_reference,payment_date,currency,amount').eq('invoice_id', id).eq('organization_id', company).order('payment_date', { ascending: false })),
    rows<DocumentRecord>(db.from('portal_documents').select(documentColumns).eq('invoice_id', id).eq('organization_id', company).eq('customer_visible', true)),
    invoice.order_id ? record<{ order_number: string }>(db.from('portal_orders').select('order_number').eq('id', invoice.order_id).eq('organization_id', company).maybeSingle()) : null,
  ]);
  return <>
    <PageHeading title={`Invoice ${invoice.invoice_number}`} back={{ label: 'Invoices', href: accountHref('/portal/invoices', company) }} />
    <InvoiceDetails invoice={invoice} payments={payments} documents={documents} order={order && invoice.order_id ? { label: order.order_number, href: accountHref(`/portal/orders/${invoice.order_id}`, company) } : undefined} />
  </>;
}
