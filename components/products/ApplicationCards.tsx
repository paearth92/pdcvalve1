import { IndustryIcon } from '@/components/icons/IndustryIcons';
import type { ApplicationCardData } from '@/types/product';

/**
 * Extended application icon set beyond the standard industry icons.
 * Falls back to IndustryIcon for shared slugs.
 */
function ApplicationIcon({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  // First try the shared industry icon set
  const shared = [
    'power-generation',
    'air-management',
    'oil-and-gas',
    'chemical',
    'petrochemical',
    'water-and-wastewater',
  ];
  if (shared.includes(slug)) {
    return <IndustryIcon slug={slug} className={className} />;
  }

  // Custom application icons
  const icons: Record<string, React.ReactElement> = {
    steel: (
      <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
        <path d="M10 40 L10 20 L24 10 L38 20 L38 40" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.6" />
        <line x1="10" y1="40" x2="38" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <line x1="18" y1="22" x2="30" y2="22" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <line x1="18" y1="28" x2="30" y2="28" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <line x1="18" y1="34" x2="30" y2="34" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      </svg>
    ),
    cement: (
      <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
        <path d="M16 40 L16 14 L32 14 L32 40" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.6" />
        <path d="M16 14 L24 6 L32 14" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.6" />
        <line x1="10" y1="40" x2="38" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <line x1="20" y1="22" x2="28" y2="22" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <line x1="20" y1="30" x2="28" y2="30" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      </svg>
    ),
    mining: (
      <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
        <path d="M6 40 L18 16 L30 16 L42 40" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.6" />
        <line x1="10" y1="40" x2="38" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <line x1="18" y1="16" x2="18" y2="40" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <line x1="30" y1="16" x2="30" y2="40" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <circle cx="24" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      </svg>
    ),
    'air-pollution-control': (
      <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
        <rect x="14" y="20" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <path d="M24 20 L24 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <path d="M18 12 L30 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <path d="M20 28 Q24 26 28 28" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <path d="M20 34 Q24 32 28 34" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      </svg>
    ),
  };

  return icons[slug] ?? <IndustryIcon slug="air-management" className={className} />;
}

export default function ApplicationCards({
  applications,
}: {
  applications: ApplicationCardData[];
}) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {applications.map((app) => (
        <div
          key={app.title}
          className="group flex flex-col rounded-xl border border-brand-green-dark/10 bg-white p-6 shadow-sm shadow-brand-green-dark/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-green/25 hover:shadow-lg hover:shadow-brand-green-dark/10"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-brand-green-dark/10 bg-brand-light-bg text-brand-green-dark/70 shadow-sm shadow-brand-green-dark/5 transition-all group-hover:border-brand-green/25 group-hover:text-brand-green group-hover:shadow-md group-hover:shadow-brand-green/15">
            <ApplicationIcon slug={app.iconSlug} className="h-7 w-7" />
          </span>
          <h3 className="mt-4 text-base font-bold tracking-tight text-brand-green-dark">
            {app.title}
          </h3>
          <div className="mt-2 h-px w-8 bg-brand-green/30" />
          <p className="mt-3 text-sm leading-relaxed text-brand-graphite/65">
            {app.description}
          </p>
        </div>
      ))}
    </div>
  );
}
