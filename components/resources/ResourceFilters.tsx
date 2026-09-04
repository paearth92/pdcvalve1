'use client';

import { ChevronDown } from 'lucide-react';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

export interface FilterState {
  [filterId: string]: string;
}

export default function ResourceFilters({
  groups,
  state,
  onChange,
}: {
  groups: FilterGroup[];
  state: FilterState;
  onChange: (filterId: string, value: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {groups.map((group) => (
        <div key={group.id} className="relative">
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-brand-steel/70">
            {group.label}
          </label>
          <div className="relative">
            <select
              value={state[group.id] ?? ''}
              onChange={(e) => onChange(group.id, e.target.value)}
              className="w-full appearance-none rounded-lg border border-brand-green-dark/15 bg-white py-2.5 pl-3 pr-9 text-sm font-medium text-brand-green-dark transition-colors hover:border-brand-green/30 focus:border-brand-green/40 focus:outline-none focus:ring-2 focus:ring-brand-green/20"
            >
              <option value="">All</option>
              {group.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-steel/50" />
          </div>
        </div>
      ))}
    </div>
  );
}
