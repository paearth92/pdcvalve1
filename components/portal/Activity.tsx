import Link from 'next/link';
import type { Activity } from '@/lib/portal/queries';
import { markNotificationReadAction } from '@/lib/portal/actions';
import { accountHref, dateLabel } from './format';
import { Empty, linkClass } from './ui';

export function ActivityList({ entries, company, readIds }: { entries: Activity[]; company: string; readIds?: Set<string> }) {
  if (!entries.length) return <Empty message="No account activity is available." />;
  return <ul className="divide-y divide-[#e4ece7] px-4 sm:px-6">
    {entries.map((entry) => {
      const destination = entry.shipment_id ? `/portal/shipments/${entry.shipment_id}`
        : entry.invoice_id ? `/portal/invoices/${entry.invoice_id}`
          : entry.quote_id ? `/portal/quotes/${entry.quote_id}`
            : entry.order_id ? `/portal/orders/${entry.order_id}` : undefined;
      return <li key={entry.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
        <div className="min-w-0">
          <p className="break-words text-sm font-semibold text-brand-green-dark">
            {destination ? <Link className={linkClass} href={accountHref(destination, company)}>{entry.title}</Link> : entry.title}
          </p>
          <time dateTime={entry.created_at} className="text-xs text-[#526b5e]">{dateLabel(entry.created_at)}</time>
        </div>
        {readIds && !readIds.has(entry.id) && <form action={markNotificationReadAction}>
          <input type="hidden" name="notification_id" value={entry.id} />
          <input type="hidden" name="company" value={company} />
          <button type="submit" className={`min-h-11 px-2 text-xs ${linkClass}`}>Mark as read<span className="sr-only">: {entry.title}</span></button>
        </form>}
      </li>;
    })}
  </ul>;
}
