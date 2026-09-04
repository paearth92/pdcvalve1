import { cn } from '@/lib/utils';
import type { ProductSpecRow } from '@/types/site';

const icons: Record<string, React.ReactElement> = {
  'Pressure Class': (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M12 3v6M5 21V11a7 7 0 0114 0v10M5 21h14M9 21v-3a3 3 0 016 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    </svg>
  ),
  'Temperature Range': (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M10 3.5v12a3 3 0 104 0v-12a2 2 0 00-4 0z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.6" />
      <circle cx="12" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    </svg>
  ),
  'Available Sizes': (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <circle cx="7" cy="7" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="17" cy="17" r="1.5" fill="currentColor" opacity="0.4" />
    </svg>
  ),
  'Connection Types': (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M5 8h14M5 16h14M5 8v8M19 8v8M7 8v8M17 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  ),
  Materials: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.6" />
      <path d="M3 7l9 5 9-5M12 12v10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.4" />
    </svg>
  ),
  Operation: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  ),
};

function SpecIcon({ label }: { label: string }) {
  return icons[label] ?? (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export default function QuickSpecPanel({
  specs,
}: {
  specs: ProductSpecRow[];
}) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-brand-green-dark/10 bg-brand-green-dark/8 shadow-md shadow-brand-green-dark/10 sm:grid-cols-3 lg:grid-cols-6">
      {specs.map((spec) => (
        <div
          key={spec.label}
          className="flex flex-col gap-2 bg-white p-4 shadow-sm shadow-brand-green-dark/5"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-brand-green-dark/10 bg-brand-light-bg text-brand-green-dark/70 shadow-sm shadow-brand-green-dark/5">
              <SpecIcon label={spec.label} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wide text-brand-steel">
              {spec.label}
            </span>
          </div>
          <p className="text-xs font-medium text-brand-graphite/60">
            {spec.value}
          </p>
        </div>
      ))}
    </div>
  );
}
