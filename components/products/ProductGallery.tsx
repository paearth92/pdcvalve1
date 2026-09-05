'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import type { ProductGalleryImage } from '@/types/site';

interface ProductGalleryProps {
  images: ProductGalleryImage[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndex >= images.length) setActiveIndex(0);
  }, [activeIndex, images.length]);

  if (images.length === 0) return null;

  const activeImage = images[activeIndex];
  const showControls = images.length > 1;

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  return (
    <div className={showControls ? 'mx-auto max-w-5xl' : 'mx-auto max-w-3xl'}>
      {/* Mobile and tablet: large enough for detail, with a swipeable thumbnail strip. */}
      <div className="overflow-hidden rounded-[18px] border border-brand-green-dark/10 bg-[#071a12] shadow-[0_14px_38px_rgba(7,32,20,0.12)] lg:hidden">
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#071a12]">
          {activeImage.src && (
            <Image
              key={activeImage.src}
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              sizes="100vw"
              className="block h-full w-full object-contain"
              priority={activeIndex === 0}
            />
          )}

          {showControls && (
            <>
              <button
                type="button"
                onClick={showPrevious}
                aria-label={`Show previous ${productName} image`}
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#06150e]/80 text-white backdrop-blur-sm transition-colors hover:bg-brand-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:left-5 sm:h-11 sm:w-11"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label={`Show next ${productName} image`}
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#06150e]/80 text-white backdrop-blur-sm transition-colors hover:bg-brand-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:right-5 sm:h-11 sm:w-11"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#04110b]/90 via-[#04110b]/35 to-transparent px-4 pb-4 pt-16 text-white sm:px-6 sm:pb-5">
            <p className="text-sm font-semibold sm:text-base">
              {activeImage.caption ?? activeImage.alt}
            </p>
            {showControls && (
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white/60">
                {activeIndex + 1} of {images.length}
              </p>
            )}
          </div>
        </div>

        {showControls && (
          <div
            className="flex gap-3 overflow-x-auto border-t border-white/10 bg-[#06150e] p-3 sm:p-4"
            aria-label={`${productName} gallery thumbnails`}
          >
            {images.map((image, index) => (
              <button
                key={`${image.src}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${image.caption ?? image.alt}`}
                aria-pressed={index === activeIndex}
                className={[
                  'relative aspect-[3/2] w-28 shrink-0 overflow-hidden rounded-lg border-2 bg-[#071a12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green sm:w-36',
                  index === activeIndex
                    ? 'border-brand-green'
                    : 'border-transparent opacity-65 hover:opacity-100',
                ].join(' ')}
              >
                {image.src && (
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 112px, 144px"
                    className="block h-full w-full object-contain"
                    loading="lazy"
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop: a compact technical viewer instead of a second full-screen hero. */}
      <div
        className={[
          'hidden overflow-hidden rounded-[20px] border border-brand-green-dark/10 bg-[#071a12] shadow-[0_16px_42px_rgba(7,32,20,0.12)] lg:grid',
          showControls ? 'lg:grid-cols-[minmax(0,1fr)_17.5rem]' : 'lg:grid-cols-1',
        ].join(' ')}
      >
        <div className="relative aspect-[3/2] min-w-0 overflow-hidden bg-[#071a12]">
          {activeImage.src && (
            <Image
              key={activeImage.src}
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              sizes={showControls ? '720px' : '768px'}
              className="block h-full w-full object-contain"
              priority={activeIndex === 0}
            />
          )}

          {showControls && (
            <>
              <button
                type="button"
                onClick={showPrevious}
                aria-label={`Show previous ${productName} image`}
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#06150e]/80 text-white backdrop-blur-sm transition-colors hover:bg-brand-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label={`Show next ${productName} image`}
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#06150e]/80 text-white backdrop-blur-sm transition-colors hover:bg-brand-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {!showControls && (
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#04110b]/90 via-[#04110b]/30 to-transparent px-5 pb-5 pt-16 text-white">
              <p className="text-sm font-semibold">
                {activeImage.caption ?? activeImage.alt}
              </p>
            </div>
          )}
        </div>

        {showControls && (
          <aside className="flex min-h-0 flex-col border-l border-white/10 bg-[#06150e]">
            <div className="border-b border-white/10 px-5 py-4" aria-live="polite">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-brand-green">
                Available Views
              </p>
              <p className="mt-2 text-sm font-semibold leading-5 text-white">
                {activeImage.caption ?? activeImage.alt}
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                {activeIndex + 1} of {images.length}
              </p>
            </div>

            <div
              className="grid grid-cols-2 gap-3 p-4"
              aria-label={`${productName} gallery thumbnails`}
            >
              {images.map((image, index) => (
                <button
                  key={`${image.src}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show ${image.caption ?? image.alt}`}
                  aria-pressed={index === activeIndex}
                  className={[
                    'relative aspect-[3/2] w-full overflow-hidden rounded-lg border-2 bg-[#071a12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green',
                    index === activeIndex
                      ? 'border-brand-green'
                      : 'border-transparent opacity-60 transition-opacity hover:opacity-100',
                  ].join(' ')}
                >
                  {image.src && (
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes="120px"
                      className="block h-full w-full object-contain"
                      loading="lazy"
                    />
                  )}
                </button>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
