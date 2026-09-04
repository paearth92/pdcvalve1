import { Star } from 'lucide-react';
import type { ResourceItem } from '@/types/content';
import ResourceCard from './ResourceCard';

export default function FeaturedResources({
  resources,
}: {
  resources: ResourceItem[];
}) {
  if (resources.length === 0) return null;

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-brand-green" />
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green">
            Featured
          </span>
        </div>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-brand-green-dark sm:text-3xl">
          Featured Engineering Resources
        </h2>
        <div className="mt-4 h-px w-16 bg-brand-green/40" />
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-brand-graphite/70">
          Key technical documents highlighted for quick access by engineers
          and procurement teams.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </section>
  );
}
