import { requirePortalCustomer } from '@/lib/portal/auth';
import { portalClient } from '@/lib/portal/db';
import { type Balance, type Invoice, invoiceColumns, pageNumber, pageRange, pageSize, rows } from '@/lib/portal/queries';
import { param, type PortalSearch } from '@/components/portal/Feedback';
import { BalanceList, InvoiceTable } from '@/components/portal/Financials';
import { Pages } from '@/components/portal/Orders';
import { Notice, PageHeading, Panel } from '@/components/portal/ui';

export default async function InvoicesPage({ searchParams }: { searchParams: Promise<PortalSearch> }) {
  const search = await searchParams;
  const { organization, canViewFinancials } = await requirePortalCustomer(param(search, 'company'));
  if (!canViewFinancials) return <><PageHeading title="Invoices" /><Notice>Contact PDC to request access to this company’s financial records.</Notice></>;
  const db = await portalClient();
  const company = organization.id;
  const page = pageNumber(param(search, 'page'));
  const [balances, invoices] = await Promise.all([
    rows<Balance>(db.from('portal_account_balances').select('*').eq('organization_id', company).order('currency')),
    rows<Invoice>(db.from('portal_invoices').select(invoiceColumns).eq('organization_id', company).order('invoice_date', { ascending: false }).order('id').range(...pageRange(page))),
  ]);
  return <>
    <PageHeading title="Invoices" description={organization.name} />
    <Panel title="Account balances"><BalanceList balances={balances} /></Panel>
    <Panel title="Invoices"><InvoiceTable invoices={invoices.slice(0, pageSize)} company={company} /></Panel>
    <Pages base="/portal/invoices" page={page} more={invoices.length > pageSize} query={{ company }} />
  </>;
}
