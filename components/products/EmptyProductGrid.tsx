import { PackageSearch } from 'lucide-react';
import RFQButton from '@/components/rfq/RFQButton';

/** Polished empty state shown when no verified product data exists yet. */
export default function EmptyProductGrid() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-brand-green-dark/20 bg-brand-light-bg/50 px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-green-dark/10 bg-white text-brand-steel/60">
        <PackageSearch className="h-7 w-7" />
      </span>
      <h3 className="mt-5 text-lg font-bold tracking-tight text-brand-green-dark">
        Product Information Coming Soon
      </h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-brand-graphite/60">
        We are preparing detailed product information for this category. Please
        contact our team for immediate assistance with specifications and
        availability.
      </p>
      <div className="mt-6">
        <RFQButton size="md" />
      </div>
    </div>
  );
}
