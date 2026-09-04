'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  id: string;
  label: string;
  options: FilterOption[];
}

/** Reusable filter dropdown. Disabled when no options exist. */
export function FilterDropdown({
  config,
  selected,
  onSelect,
}: {
  config: FilterConfig;
  selected: string | null;
  onSelect: (value: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const disabled = config.options.length === 0;

  return (
    <div className="relative">
      <button
        type="button"
        disabled={disabled}
        className={cn(
          'flex w-full items-center justify-between rounded-md border border-brand-green-dark/15 bg-white px-3 py-2 text-sm font-medium transition-colors',
          disabled
            ? 'cursor-not-allowed text-brand-steel/40'
            : 'text-brand-graphite hover:border-brand-green/30',
        )}
        onClick={() => !disabled && setOpen((v) => !v)}
        aria-expanded={open}
        aria-disabled={disabled}
      >
        <span>{selected ?? config.label}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      {open && !disabled && (
        <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-md border border-brand-green-dark/10 bg-white py-1 shadow-lg">
          <button
            type="button"
            className="block w-full px-3 py-2 text-left text-sm text-brand-graphite/70 transition-colors hover:bg-brand-light-bg hover:text-brand-green-dark"
            onClick={() => {
              onSelect(null);
              setOpen(false);
            }}
          >
            All {config.label}
          </button>
          {config.options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className="block w-full px-3 py-2 text-left text-sm text-brand-graphite/70 transition-colors hover:bg-brand-light-bg hover:text-brand-green-dark"
              onClick={() => {
                onSelect(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** Reusable filter bar. Renders disabled controls when no product data exists. */
export function FilterBar({ configs }: { configs: FilterConfig[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {configs.map((config) => (
        <FilterDropdown
          key={config.id}
          config={config}
          selected={null}
          onSelect={() => {}}
        />
      ))}
    </div>
  );
}
