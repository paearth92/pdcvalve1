import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Reusable hero section for Industry pages.
 * Uses a background video when available, falling back to a static image.
 * Matches the existing dark hero pattern used across the site.
 */
export default function IndustryHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  videoSrc,
}: {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  videoSrc?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-green-dark text-white">
      {videoSrc ? (
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt ?? ''}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark via-brand-green-dark/60 to-brand-green-dark/30" />
      <div className="blueprint-grid absolute inset-0 opacity-40" />
      <div className="noise-overlay absolute inset-0 opacity-[0.035] mix-blend-overlay" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-green/40 bg-brand-green/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-brand-green">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            {eyebrow}
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl lg:text-[3.5rem]">
            {title}
          </h1>
          <p className={cn('mt-6 max-w-2xl text-[15px] leading-relaxed text-white/65')}>
            {description}
          </p>
          <div className="mt-8 h-px w-16 bg-brand-green/40" />
        </div>
      </div>
    </section>
  );
}
