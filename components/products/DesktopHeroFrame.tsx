import type { ReactNode } from 'react';
import FlexibleImage from '@/components/shared/FlexibleImage';
import AssetPlaceholder, {
  type AssetPlaceholderVariant,
} from '@/components/shared/AssetPlaceholder';

type DesktopHeroFrameProps = {
  basePath?: string | null;
  alt: string;
  contentSide: 'left' | 'right';
  placeholderVariant: AssetPlaceholderVariant;
  placeholderLabel: string;
  children: ReactNode;
};

export default function DesktopHeroFrame({
  basePath,
  alt,
  contentSide,
  placeholderVariant,
  placeholderLabel,
  children,
}: DesktopHeroFrameProps) {
  const contentOnLeft = contentSide === 'left';

  return (
    <section className="relative hidden min-h-[60vh] overflow-hidden bg-[#06150e] text-white xl:flex xl:min-h-[70vh] 2xl:min-h-[80vh]">
      {basePath ? (
        <FlexibleImage
          basePath={basePath}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
        />
      ) : (
        <AssetPlaceholder
          variant={placeholderVariant}
          label={placeholderLabel}
          className="absolute inset-0 h-full w-full"
        />
      )}

      <div
        className={[
          'pointer-events-none absolute inset-0 z-[1]',
          contentOnLeft
            ? 'bg-[linear-gradient(90deg,rgba(3,24,16,0.94)_0%,rgba(3,24,16,0.82)_19%,rgba(3,24,16,0.42)_38%,rgba(3,24,16,0.08)_53%,transparent_64%)]'
            : 'bg-[linear-gradient(90deg,transparent_36%,rgba(3,24,16,0.08)_47%,rgba(3,24,16,0.45)_61%,rgba(3,24,16,0.84)_78%,rgba(3,24,16,0.96)_100%)]',
        ].join(' ')}
      />

      <div className="relative z-10 mx-auto flex min-h-[60vh] w-full max-w-7xl items-center px-8 xl:min-h-[70vh] 2xl:min-h-[80vh]">
        <div
          className={[
            'w-[40%]',
            contentOnLeft ? 'mr-auto' : 'ml-auto',
          ].join(' ')}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
