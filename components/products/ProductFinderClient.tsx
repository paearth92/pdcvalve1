'use client';

import { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { FileText, SlidersHorizontal, Search, X, PackageSearch, Check, ChevronDown, RotateCcw, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/data/site';
import { products } from '@/data/products/index';
import { productFamiliesData } from '@/data/product-families';
import { getProductCardBasePath } from '@/data/assets/registry';
import type { Product } from '@/types/product';
import RFQButton from '@/components/rfq/RFQButton';
import AssetPlaceholder from '@/components/shared/AssetPlaceholder';
import FlexibleImage from '@/components/shared/FlexibleImage';
import {
  type FilterSelection,
  type FilterGroupConfig,
  buildFilterGroupsWithCounts,
  filterProducts,
  countActiveFilters,
} from '@/lib/product-finder';

export default function ProductFinderClient() {
  return (
    <Suspense fallback={<ProductFinderFallback />}>
      <ProductFinderInner />
    </Suspense>
  );
}

function ProductFinderFallback() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="animate-pulse rounded-xl border border-brand-green-dark/10 bg-white p-8">
        <div className="h-6 w-48 rounded bg-brand-light-bg" />
        <div className="mt-4 h-4 w-96 max-w-full rounded bg-brand-light-bg" />
      </div>
    </div>
  );
}

function ProductFinderInner() {
  const [selection, setSelection] = useState<FilterSelection>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [openGroup, setOpenGroup] = useState<string | null>('family');

  const activeFilterCount = countActiveFilters(selection);
  const hasAnyFilter = activeFilterCount > 0;
  const hasSearch = searchQuery.trim().length > 0;

  const filterGroups = useMemo(
    () => buildFilterGroupsWithCounts(products, selection),
    [selection],
  );

  const filtered = useMemo(() => {
    let result = filterProducts(products, selection);
    if (hasSearch) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.shortDescription ?? '').toLowerCase().includes(q) ||
          (p.series ?? '').toLowerCase().includes(q),
      );
    }
    return result;
  }, [selection, searchQuery, hasSearch]);

  const toggleFilter = (groupId: string, value: string) => {
    setSelection((prev) => {
      const current = prev[groupId] ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      const newSelection = { ...prev };
      if (next.length > 0) {
        newSelection[groupId] = next;
      } else {
        delete newSelection[groupId];
      }
      return newSelection;
    });
  };

  const clearGroup = (groupId: string) => {
    setSelection((prev) => {
      const newSelection = { ...prev };
      delete newSelection[groupId];
      return newSelection;
    });
  };

  const clearAll = () => {
    setSelection({});
    setSearchQuery('');
  };

  const activeChips = useMemo(() => {
    const chips: { groupId: string; value: string; label: string }[] = [];
    for (const group of filterGroups) {
      const selected = selection[group.id] ?? [];
      for (const value of selected) {
        const opt = group.options.find((o) => o.value === value);
        chips.push({
          groupId: group.id,
          value,
          label: opt?.label ?? value,
        });
      }
    }
    return chips;
  }, [selection, filterGroups]);

  return (
    <>
      {/* Compact hero */}
      <section className="relative overflow-hidden bg-brand-light-bg py-10 sm:py-14">
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(7,61,43,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(7,61,43,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
                Product Finder
              </span>
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-brand-green-dark sm:text-3xl lg:text-4xl">
                Find the Right Valve for Your Application
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-brand-graphite/60">
                Narrow down by family, type, connection, actuation, materials, media, temperature, pressure, and more.
              </p>
            </div>
            <div className="hidden sm:block">
              <RFQButton size="md" />
            </div>
          </div>
        </div>
      </section>

      {/* Main: sticky filter rail + product grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:gap-8">
          {/* Filter rail */}
          <aside className="lg:sticky lg:top-[88px] lg:self-start">
            <div className="rounded-xl border border-brand-green-dark/10 bg-white shadow-sm">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-brand-green-dark/8 px-4 py-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-brand-green" />
                  <span className="text-sm font-bold uppercase tracking-wide text-brand-green-dark">
                    Filters
                  </span>
                  {activeFilterCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-green px-1.5 text-[10px] font-bold text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="flex items-center gap-1 text-xs font-semibold text-brand-steel transition-colors hover:text-brand-green"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Reset
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="border-b border-brand-green-dark/8 px-4 py-3">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-steel/40" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full rounded-lg border border-brand-green-dark/12 bg-brand-light-bg/30 py-2 pl-9 pr-8 text-sm text-brand-graphite placeholder:text-brand-steel/50 focus:border-brand-green/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/15"
                    aria-label="Search products"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brand-steel/50 hover:text-brand-green-dark"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Collapsible filter groups */}
              <div className="max-h-[calc(100vh-320px)] overflow-y-auto">
                {filterGroups.map((group) => (
                  <FilterAccordion
                    key={group.id}
                    group={group}
                    selected={selection[group.id] ?? []}
                    isOpen={openGroup === group.id}
                    onToggleOpen={() =>
                      setOpenGroup((prev) => (prev === group.id ? null : group.id))
                    }
                    onToggleFilter={(value) => toggleFilter(group.id, value)}
                    onClear={() => clearGroup(group.id)}
                  />
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-4 hidden rounded-xl border border-brand-green-dark/10 bg-brand-green-dark p-4 text-white lg:block">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-green">
                Need Help?
              </span>
              <h3 className="mt-1.5 text-sm font-bold leading-tight">
                Request Engineering Assistance
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-white/55">
                Our engineers can help you specify the right valve or actuator.
              </p>
              <div className="mt-3">
                <RFQButton size="sm" className="w-full" />
              </div>
              <div className="mt-3 space-y-1.5 border-t border-white/10 pt-3">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-2 text-xs text-white/55 transition-colors hover:text-white"
                >
                  <Phone className="h-3 w-3 text-brand-green" />
                  {siteConfig.phone}
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 text-xs text-white/55 transition-colors hover:text-white"
                >
                  <Mail className="h-3 w-3 text-brand-green" />
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex flex-col gap-4">
            {/* Active chips + count */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p
                  className="text-sm font-medium text-brand-graphite/60"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {hasAnyFilter || hasSearch
                    ? `${filtered.length} product${filtered.length !== 1 ? 's' : ''} found`
                    : `${products.length} products available`}
                </p>
                <div className="lg:hidden">
                  <RFQButton size="sm" />
                </div>
              </div>

              {activeChips.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  {activeChips.map((chip) => (
                    <button
                      key={`${chip.groupId}:${chip.value}`}
                      type="button"
                      onClick={() => toggleFilter(chip.groupId, chip.value)}
                      className="group/chip inline-flex items-center gap-1.5 rounded-lg border border-brand-green/25 bg-brand-green/5 px-2.5 py-1 text-xs font-semibold text-brand-green-dark transition-all hover:border-brand-green/40 hover:bg-brand-green/10 active:scale-95"
                    >
                      {chip.label}
                      <X className="h-3 w-3 transition-transform group-hover/chip:rotate-90" />
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={clearAll}
                    className="text-xs font-semibold text-brand-steel underline-offset-2 transition-colors hover:text-brand-green hover:underline"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Grid / states */}
            {!hasAnyFilter && !hasSearch ? (
              <ProductGrid products={products} />
            ) : filtered.length === 0 ? (
              <NoResultsState activeChips={activeChips} onClearAll={clearAll} />
            ) : (
              <ProductGrid products={filtered} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* ----------------------------------------------------------
 * Accordion filter group — uses real <button> elements
 * -------------------------------------------------------- */

function FilterAccordion({
  group,
  selected,
  isOpen,
  onToggleOpen,
  onToggleFilter,
  onClear,
}: {
  group: FilterGroupConfig;
  selected: string[];
  isOpen: boolean;
  onToggleOpen: () => void;
  onToggleFilter: (value: string) => void;
  onClear: () => void;
}) {
  const hasSelection = selected.length > 0;

  return (
    <div className="border-b border-brand-green-dark/6 last:border-b-0">
      {/* Header button */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <button
          type="button"
          onClick={onToggleOpen}
          className="flex flex-1 items-center gap-2 text-left text-sm font-semibold text-brand-green-dark transition-colors hover:text-brand-green"
          aria-expanded={isOpen}
        >
          <ChevronDown
            className={cn(
              'h-4 w-4 text-brand-steel/50 transition-transform duration-300',
              isOpen && 'rotate-180',
            )}
          />
          {group.label}
          {hasSelection && (
            <span className="rounded-full bg-brand-green/15 px-1.5 py-0.5 text-[10px] font-bold text-brand-green">
              {selected.length}
            </span>
          )}
        </button>
        {hasSelection && (
          <button
            type="button"
            onClick={onClear}
            className="ml-2 text-[10px] font-semibold uppercase tracking-wide text-brand-steel transition-colors hover:text-brand-green"
          >
            Clear
          </button>
        )}
      </div>

      {/* Options — animated height transition */}
      <div
        className={cn(
          'grid transition-all duration-300 ease-out',
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-0.5 px-3 pb-3">
            {group.options.map((opt) => {
              const isSelected = selected.includes(opt.value);
              const isDisabled = !isSelected && opt.count === 0;
              return (
                <button
                  key={opt.value}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => onToggleFilter(opt.value)}
                  className={cn(
                    'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-all active:scale-[0.98]',
                    isDisabled
                      ? 'cursor-not-allowed opacity-35'
                      : isSelected
                        ? 'bg-brand-green/8 text-brand-green-dark'
                        : 'text-brand-graphite/70 hover:bg-brand-light-bg hover:text-brand-green-dark',
                  )}
                >
                  {/* Custom checkbox */}
                  <span
                    className={cn(
                      'flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-[5px] border-2 transition-all duration-200',
                      isSelected
                        ? 'border-brand-green bg-brand-green scale-100'
                        : 'border-brand-green-dark/20 bg-white scale-100',
                      isDisabled && 'border-brand-green-dark/8',
                      !isDisabled && !isSelected && 'hover:border-brand-green/50',
                    )}
                  >
                    {isSelected && (
                      <Check
                        className="h-2.5 w-2.5 text-white"
                        strokeWidth={4}
                      />
                    )}
                  </span>
                  <span className="flex-1 text-left">{opt.label}</span>
                  <span
                    className={cn(
                      'text-xs font-medium tabular-nums',
                      isSelected ? 'text-brand-green' : 'text-brand-steel/45',
                    )}
                  >
                    {opt.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------
 * Product grid + card
 * -------------------------------------------------------- */

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product, i) => (
        <FinderProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}

function FinderProductCard({ product, index }: { product: Product; index: number }) {
  const family = productFamiliesData.find((f) => f.slug === product.familySlug);
  const href = family
    ? `${family.route}/${product.slug}`
    : `/products/${product.familySlug}/${product.slug}`;
  const familyName = family?.name ?? '';
  const cardBasePath = getProductCardBasePath(product.familySlug, product.slug);

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-brand-green-dark/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/30 hover:shadow-xl hover:shadow-brand-green-dark/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/30"
      style={{
        animation: `fadeUp 0.4s ease-out ${Math.min(index * 50, 400)}ms both`,
      }}
    >
      <div className="relative h-44 overflow-hidden border-b border-brand-green-dark/8">
        {cardBasePath ? (
          <FlexibleImage
            basePath={cardBasePath}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            width={800}
            height={800}
          />
        ) : (
          <AssetPlaceholder
            variant="product"
            label="Product image coming soon"
            className="h-full w-full"
          />
        )}
        {product.series && (
          <span className="absolute left-3 top-3 rounded-md border border-brand-green-dark/15 bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-green-dark backdrop-blur-sm">
            {product.series}
          </span>
        )}
        <span className="absolute right-2 top-2 h-3 w-3 border-r border-t border-brand-green/25" />
        <span className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-brand-green/25" />
        <span className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-brand-green/25" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold tracking-tight text-brand-green-dark">
          {product.name}
        </h3>
        <div className="mt-2 h-px w-6 bg-brand-green/40" />
        <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-graphite/70">
          {product.shortDescription ?? 'Product information is being prepared.'}
        </p>
        {product.applications && product.applications.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.applications.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded border border-brand-green-dark/10 bg-brand-light-bg px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-steel"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <span className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-brand-green-dark/15 bg-white px-4 py-2 text-sm font-semibold text-brand-green-dark transition-all group-hover:border-brand-green/30 group-hover:text-brand-green">
            <FileText className="h-4 w-4" />
            Learn More
          </span>
          <div onClick={(e) => e.stopPropagation()} className="flex-1">
            <RFQButton
              productFamily={familyName}
              product={product.name}
              series={product.series}
              size="sm"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ----------------------------------------------------------
 * Empty state
 * -------------------------------------------------------- */

function NoResultsState({
  activeChips,
  onClearAll,
}: {
  activeChips: { groupId: string; value: string; label: string }[];
  onClearAll: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-brand-green-dark/15 bg-brand-light-bg/50 px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-green-dark/10 bg-white text-brand-steel/60">
        <PackageSearch className="h-7 w-7" />
      </span>
      <h3 className="mt-5 text-lg font-bold tracking-tight text-brand-green-dark">
        No Products Match Your Filters
      </h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-brand-graphite/60">
        We couldn&apos;t find a product matching your selected criteria.
        {activeChips.length > 0 && (
          <>
            {' '}
            Try removing:{' '}
            <span className="font-semibold text-brand-green-dark">
              {activeChips.map((c) => c.label).join(', ')}
            </span>
          </>
        )}
      </p>
      <div className="mt-6 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={onClearAll}
          className="rounded-md border border-brand-green-dark/15 bg-white px-4 py-2 text-sm font-semibold text-brand-green-dark transition-colors hover:border-brand-green/30"
        >
          Clear All Filters
        </button>
        <span className="text-xs text-brand-steel/60">or</span>
        <RFQButton size="md" />
      </div>
    </div>
  );
}
