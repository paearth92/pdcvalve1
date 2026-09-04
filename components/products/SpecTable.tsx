'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProductSpecGroup, ProductSpecRow } from '@/types/site';

function GroupedSpecTable({ groups }: { groups: ProductSpecGroup[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {groups.map((group) => (
        <div
          key={group.heading}
          className="overflow-hidden rounded-xl border border-brand-green-dark/10 bg-white shadow-sm shadow-brand-green-dark/5"
        >
          <div className="border-b border-brand-green-dark/8 bg-brand-light-bg/50 px-5 py-3 shadow-sm shadow-brand-green-dark/5">
            <span className="text-sm font-bold uppercase tracking-wide text-brand-green-dark">
              {group.heading}
            </span>
          </div>
          <table className="w-full">
            <tbody>
              {group.rows.map((row, i) => (
                <tr
                  key={row.label}
                  className={cn(
                    'border-b border-brand-green-dark/5 last:border-0',
                    i % 2 === 1 && 'bg-brand-light-bg/30',
                  )}
                >
                  <th
                    scope="row"
                    className="w-2/5 px-5 py-3 text-left text-sm font-semibold text-brand-green-dark"
                  >
                    {row.label}
                  </th>
                  <td className="px-5 py-3 text-sm text-brand-graphite/70">
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
    <div className="overflow-hidden rounded-xl border border-brand-green-dark/10 bg-white shadow-sm shadow-brand-green-dark/5">
      <table className="w-full">
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.label}
              className={cn(
                'border-b border-brand-green-dark/5 last:border-0',
                i % 2 === 1 && 'bg-brand-light-bg/50',
              )}
            >
              <th
                scope="row"
                className="w-1/3 px-5 py-3.5 text-left text-sm font-semibold text-brand-green-dark"
              >
                {row.label}
              </th>
              <td className="px-5 py-3.5 text-sm text-brand-graphite/70">
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
        className="flex w-full items-center justify-between rounded-xl border border-brand-green-dark/10 bg-white px-5 py-4 shadow-sm shadow-brand-green-dark/5 lg:hidden"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="text-sm font-bold uppercase tracking-wide text-brand-green-dark">
          Technical Specifications
        </span>
        <ChevronDown
          className={cn(
            'h-5 w-5 text-brand-steel transition-transform duration-200',
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
