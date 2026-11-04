'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProductSpecGroup, ProductSpecRow } from '@/types/site';

function GroupedSpecTable({ groups }: { groups: ProductSpecGroup[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {groups.map((group) => (
        <div
          key={group.heading}
          className="overflow-hidden rounded-2xl border border-brand-green-dark/15 bg-white shadow-[0_12px_30px_rgba(15,76,44,0.11)]"
        >
          <div className="border-b border-brand-green/20 border-l-4 border-l-brand-green bg-[#eaf1ec] px-5 py-3.5">
            <span className="text-sm font-extrabold uppercase tracking-[0.1em] text-brand-green">
              {group.heading}
            </span>
          </div>
          <table className="w-full">
            <tbody>
              {group.rows.map((row, i) => (
                <tr
                  key={row.label}
                  className={cn(
                    'border-b border-brand-green-dark/10 last:border-0',
                    i % 2 === 1 && 'bg-[#f5f8f5]',
                  )}
                >
                  <th
                    scope="row"
                    className="w-2/5 px-5 py-3.5 text-left text-[14px] font-semibold text-brand-green-dark"
                  >
                    {row.label}
                  </th>
                  <td className="px-5 py-3.5 text-[14px] font-medium text-brand-graphite/85">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

function FlatSpecTable({ rows }: { rows: ProductSpecRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-brand-green-dark/15 bg-white shadow-[0_12px_30px_rgba(15,76,44,0.11)]">
      <table className="w-full">
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.label}
              className={cn(
                'border-b border-brand-green-dark/10 last:border-0',
                i % 2 === 1 && 'bg-[#f5f8f5]',
              )}
            >
              <th
                scope="row"
                className="w-1/3 px-5 py-3.5 text-left text-[14px] font-semibold text-brand-green-dark"
              >
                {row.label}
              </th>
              <td className="px-5 py-3.5 text-[14px] font-medium text-brand-graphite/85">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SpecTable({
  rows,
  specGroups,
}: {
  rows: ProductSpecRow[];
  specGroups?: ProductSpecGroup[];
}) {
  const [open, setOpen] = useState(true);

  const content = specGroups && specGroups.length > 0
    ? <GroupedSpecTable groups={specGroups} />
    : <FlatSpecTable rows={rows} />;

  return (
    <div>
      {/* Mobile accordion header */}
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-xl border border-brand-green/20 bg-[#eaf1ec] px-5 py-4 shadow-[0_8px_22px_rgba(15,76,44,0.10)] lg:hidden"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="text-sm font-extrabold uppercase tracking-[0.1em] text-brand-green">
          Technical Specifications
        </span>
        <ChevronDown
          className={cn(
            'h-5 w-5 text-brand-green transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      {/* Content — always visible on desktop, accordion on mobile */}
      <div className={cn('mt-4 lg:mt-0 lg:block', open ? 'block' : 'hidden')}>
        {content}
      </div>
    </div>
  );
}
