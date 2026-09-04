import type { ResourceItem } from '@/types/content';
import ResourceCard from './ResourceCard';

export default function ResourceGrid({
  resources,
}: {
  resources: ResourceItem[];
}) {
  if (resources.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-brand-green-dark/15 bg-brand-light-bg/50 py-20 text-center">
        <p className="text-sm font-semibold text-brand-green-dark">
          No documents available in this category yet
        </p>
        <p className="mt-1 text-sm text-brand-steel/60">
          Contact our engineering team to request specific documentation.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
}
