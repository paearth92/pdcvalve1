'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';

/** Reusable product search. Shows empty state when no data exists. */
export function ProductSearch({
  hasData = false,
}: {
  hasData?: boolean;
}) {
  const [query, setQuery] = useState('');

  return (
    <div className="relative">
      <div className="relative flex items-center">
        <Search className="pointer-events-none absolute left-3 h-4 w-4 text-brand-steel/50" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-md border border-brand-green-dark/15 bg-white py-2.5 pl-10 pr-10 text-sm text-brand-graphite placeholder:text-brand-steel/50 focus:border-brand-green/40 focus:outline-none focus:ring-1 focus:ring-brand-green/20"
          aria-label="Search products"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-3 text-brand-steel/50 transition-colors hover:text-brand-green-dark"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {query.trim() && !hasData && (
        <div className="mt-3 rounded-md border border-brand-green-dark/10 bg-brand-light-bg px-4 py-6 text-center">
          <p className="text-sm text-brand-graphite/60">
            Product information is being prepared. Please check back soon.
          </p>
        </div>
      )}
    </div>
  );
}
