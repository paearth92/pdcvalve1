'use client';

import { useMemo, useState } from 'react';
import type { ResourceItem } from '@/types/content';
import {
  resourceFamilyFilters,
  fileTypeFilters,
  availabilityFilters,
} from '@/data/resources/registry';
import type { FilterGroup, FilterState } from '@/components/resources/ResourceFilters';
import ResourceSearch from '@/components/resources/ResourceSearch';
import ResourceFilters from '@/components/resources/ResourceFilters';
import ResourceGrid from '@/components/resources/ResourceGrid';

const filterGroups: FilterGroup[] = [
  { id: 'productFamily', label: 'Product Family', options: resourceFamilyFilters },
  { id: 'fileType', label: 'File Type', options: fileTypeFilters },
  { id: 'availability', label: 'Availability', options: availabilityFilters },
];

export default function ResourceLibrary({
  resources,
}: {
  resources: ResourceItem[];
}) {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FilterState>({});

  const handleFilterChange = (filterId: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterId]: value }));
  };

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      if (search) {
        const q = search.toLowerCase();
        if (
          !r.title.toLowerCase().includes(q) &&
          !r.description.toLowerCase().includes(q)
        )
          return false;
      }
      if (filters.productFamily && r.productFamily !== filters.productFamily)
        return false;
      if (filters.fileType && r.fileType !== filters.fileType) return false;
      if (filters.availability) {
        const status = r.downloadStatus ?? 'unavailable';
        if (status !== filters.availability) return false;
      }
      return true;
    });
  }, [resources, search, filters]);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <section className="bg-brand-light-bg py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Search */}
        <ResourceSearch value={search} onChange={setSearch} />

        {/* Filters */}
        <div className="mt-6">
          <ResourceFilters
            groups={filterGroups}
            state={filters}
            onChange={handleFilterChange}
          />
        </div>

        {/* Results count */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-brand-steel/70">
            <span className="font-bold text-brand-green-dark">{filtered.length}</span>{' '}
            {filtered.length === 1 ? 'document' : 'documents'} available
          </p>
          {activeFilterCount > 0 && (
            <button
              onClick={() => setFilters({})}
              className="text-xs font-semibold text-brand-green transition-colors hover:text-brand-green-dark"
            >
              Clear all filters ({activeFilterCount})
            </button>
          )}
        </div>

        {/* Grid */}
        <div className="mt-8">
          <ResourceGrid resources={filtered} />
        </div>
      </div>
    </section>
  );
}
