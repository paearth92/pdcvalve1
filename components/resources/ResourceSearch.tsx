'use client';

import { Search, X } from 'lucide-react';

export default function ResourceSearch({
  value,
  onChange,
  placeholder = 'Search technical documents, datasheets, manuals, CAD files…',
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-steel/50" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-brand-green-dark/15 bg-white py-4 pl-12 pr-12 text-[15px] text-brand-green-dark shadow-sm transition-all placeholder:text-brand-steel/40 focus:border-brand-green/40 focus:outline-none focus:ring-2 focus:ring-brand-green/20"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-brand-steel/50 transition-colors hover:bg-brand-light-bg hover:text-brand-green-dark"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
