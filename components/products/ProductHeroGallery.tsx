'use client';

import Image from 'next/image';
import { useId, useState } from 'react';
import type { ProductGalleryImage } from '@/types/site';

export type ProductHeroGalleryImage = Omit<ProductGalleryImage, 'src'> & {
  src: string;
  /** Transparent PNGs sit cleanly over the hero's shared background. */
  transparent?: boolean;
};

export default function ProductHeroGallery({
  images,
  productName,
  className = '',
  waveBackground = false,
}: {
  images: ProductHeroGalleryImage[];
  productName: string;
  className?: string;
  waveBackground?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const gradientId = useId().replace(/:/g, '');

  if (images.length === 0) return null;

  const activeImage = images[activeIndex] ?? images[0];
  const imageLabel = activeImage.caption ?? activeImage.alt;
  const isFlangedSeries39Render = activeImage.src.endsWith(
    '/flanged-end-10-inch-blue-with-lever.png',
  );

  return (
    <div className={`flex min-w-0 flex-col items-center ${className}`}>
      <div className="relative h-full min-h-[17rem] w-full sm:min-h-[21rem] lg:min-h-[28rem] xl:min-h-[31rem]">
        {waveBackground && (
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 h-full w-full lg:hidden"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#e5eee8" stopOpacity="0.7" />
                <stop offset="58%" stopColor="#b8cdbf" stopOpacity="0.74" />
                <stop offset="100%" stopColor="#83a991" stopOpacity="0.82" />
              </linearGradient>
            </defs>
            <path
              d="M0 540 C320 535 640 190 1000 85 L1000 600 L0 600 Z"
              fill={`url(#${gradientId})`}
            />
          </svg>
        )}

        <Image
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className={`relative z-10 object-contain ${activeImage.transparent ? 'p-1 sm:p-3' : 'p-2 sm:p-4'} ${isFlangedSeries39Render ? 'scale-[0.86]' : ''}`}
          priority={activeIndex === 0}
        />
      </div>

      {images.length > 1 && (
        <div
          role="group"
          aria-label={`${productName} product images`}
          className="mt-3 flex w-full max-w-full gap-3 overflow-x-auto px-1 py-1"
        >
          {images.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${image.caption ?? image.alt}`}
              aria-pressed={index === activeIndex}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 bg-white/50 p-1 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-[#eef2f3] sm:h-16 sm:w-24 ${index === activeIndex ? 'border-brand-green' : 'border-white/70 opacity-70 hover:opacity-100'}`}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="96px"
                className="object-contain p-1"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {imageLabel}
      </p>
    </div>
  );
}
