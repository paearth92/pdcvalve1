import { cn } from '@/lib/utils';

export type AssetPlaceholderVariant =
  | 'product'
  | 'product-family'
  | 'company'
  | 'resource'
  | 'industry';

const variantLabels: Record<AssetPlaceholderVariant, string> = {
  product: 'Product image coming soon',
  'product-family': 'Family image coming soon',
  company: 'Image not currently available',
  resource: 'Thumbnail not available',
  industry: 'Industry image coming soon',
};

/**
 * Displays a neutral, accessible placeholder when no verified image
 * is available. Renders the existing inline SVG valve silhouette so
 * the page maintains visual continuity without misrepresenting a
 * real PDC product. Does not render broken image icons.
 */
export default function AssetPlaceholder({
  variant = 'product',
  className,
  label,
}: {
  variant?: AssetPlaceholderVariant;
  className?: string;
  label?: string;
}) {
  const text = label ?? variantLabels[variant];

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center overflow-hidden bg-brand-light-bg',
        className,
      )}
      role="img"
      aria-label={text}
    >
      {/* Blueprint grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(7,61,43,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(7,61,43,0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Radial spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(255,255,255,0.7),transparent_70%)]" />

      {/* Valve silhouette */}
      <svg
        viewBox="0 0 120 120"
        className="relative h-24 w-24 text-brand-green-dark/30"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="60" cy="60" r="30" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        <circle cx="60" cy="60" r="24" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <ellipse
          cx="60"
          cy="60"
          rx="8"
          ry="27"
          fill="currentColor"
          fillOpacity="0.4"
          stroke="currentColor"
          strokeWidth="1.5"
          transform="rotate(25 60 60)"
        />
        <circle cx="60" cy="60" r="4" fill="currentColor" opacity="0.6" />
        <rect x="56" y="26" width="8" height="14" fill="currentColor" opacity="0.3" />
      </svg>

      <p className="relative mt-3 px-4 text-center text-[11px] font-semibold uppercase tracking-wide text-brand-steel/60">
        {text}
      </p>

      {/* Corner registration marks */}
      <span className="absolute left-2 top-2 h-3 w-3 border-l border-t border-brand-green/20" />
      <span className="absolute right-2 top-2 h-3 w-3 border-r border-t border-brand-green/20" />
      <span className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-brand-green/20" />
      <span className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-brand-green/20" />
    </div>
  );
}
