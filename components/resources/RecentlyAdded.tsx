import { Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { ResourceItem } from '@/types/content';
import { fileTypeLabels, getResourceCategoryDef } from '@/data/resources/registry';

export default function RecentlyAdded({
  resources,
}: {
  resources: ResourceItem[];
}) {
  if (resources.length === 0) return null;

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-brand-green" />
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green">
            Recently Added
          </span>
        </div>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-brand-green-dark sm:text-3xl">
          Latest Engineering Documents
        </h2>
        <div className="mt-4 h-px w-16 bg-brand-green/40" />
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-brand-graphite/70">
          New technical literature added to the PDC resource center.
        </p>

        <div className="mt-10 overflow-hidden rounded-xl border border-brand-green-dark/10 bg-white">
          {resources.map((resource, i) => {
            const catDef = getResourceCategoryDef(resource.category);
            return (
              <Link
                key={resource.id}
                href={catDef?.href ?? '/resources'}
                className={`flex items-center gap-4 p-4 transition-colors hover:bg-brand-light-bg/50 ${
                  i !== resources.length - 1
                    ? 'border-b border-brand-green-dark/8'
                    : ''
                }`}
              >
                <span className="hidden flex-shrink-0 rounded-md border border-brand-green-dark/10 bg-brand-light-bg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-steel sm:inline-flex">
                  {fileTypeLabels[resource.fileType]}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold tracking-tight text-brand-green-dark">
                    {resource.title}
                  </p>
                  <p className="mt-0.5 text-xs text-brand-steel/60">
                    {catDef?.label ?? resource.category}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 flex-shrink-0 text-brand-steel/40" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
