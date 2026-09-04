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
    <div className="overflow-hidden rounded-[22px] border border-brand-green-dark/10 bg-[#071a12] shadow-[0_18px_50px_rgba(7,32,20,0.12)]">
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#071a12]">
        {activeImage.src && (
          <Image
            key={activeImage.src}
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
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
                'relative aspect-[3/2] w-28 shrink-0 overflow-hidden rounded-lg border-2 bg-[#071a12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green sm:w-36 lg:w-40',
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
                  sizes="(max-width: 640px) 112px, 160px"
                  className="block h-full w-full object-contain"
                  loading="lazy"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
