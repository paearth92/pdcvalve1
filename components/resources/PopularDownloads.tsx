import { TrendingUp, Download } from 'lucide-react';
import type { ResourceItem } from '@/types/content';
import { fileTypeLabels } from '@/data/resources/registry';
import DownloadButton from './DownloadButton';

export default function PopularDownloads({
  resources,
}: {
  resources: ResourceItem[];
}) {
  if (resources.length === 0) return null;

  return (
    <section className="bg-brand-light-bg py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-brand-green" />
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green">
            Popular
          </span>
        </div>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-brand-green-dark sm:text-3xl">
          Frequently Downloaded Literature
        </h2>
        <div className="mt-4 h-px w-16 bg-brand-green/40" />
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-brand-graphite/70">
          The most-requested documents from PDC engineers and customers
          worldwide.
        </p>

        <div className="mt-10 overflow-hidden rounded-xl border border-brand-green-dark/10 bg-white">
          {resources.map((resource, i) => (
            <div
              key={resource.id}
              className={`flex items-center gap-4 p-4 transition-colors hover:bg-brand-light-bg/50 ${
                i !== resources.length - 1
                  ? 'border-b border-brand-green-dark/8'
                  : ''
              }`}
            >
              {/* Rank number */}
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-brand-green-dark/10 bg-brand-light-bg text-sm font-extrabold text-brand-green-dark">
                {i + 1}
              </span>

              {/* File type label */}
              <span className="hidden flex-shrink-0 rounded-md border border-brand-green-dark/10 bg-brand-light-bg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-steel sm:inline-flex">
                {fileTypeLabels[resource.fileType]}
              </span>

              {/* Title + meta */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold tracking-tight text-brand-green-dark">
                  {resource.title}
                </p>
                <div className="mt-0.5 flex flex-wrap gap-x-3 text-xs text-brand-steel/60">
                  {resource.productFamily && (
                    <span>{resource.productFamily.replace(/-/g, ' ')}</span>
                  )}
                  {resource.fileSize && <span>{resource.fileSize}</span>}
                  {resource.revision && <span>{resource.revision}</span>}
                </div>
              </div>

              {/* Download */}
              <div className="flex-shrink-0">
                <DownloadButton
                  status={resource.downloadStatus ?? 'unavailable'}
                  href={resource.downloadUrl}
                  fileName={resource.slug}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
