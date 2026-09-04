'use client';

import { useState, useEffect } from 'react';

const FORMAT_PRIORITY = ['webp', 'png', 'jpg', 'jpeg'] as const;

export interface FlexibleImageProps {
  /** Base path without file extension, e.g. /images/products/butterfly-valves/high-performance */
  basePath: string;
  alt: string;
  className?: string;
  /** Optional explicit width/height attributes for the img element. */
  width?: number;
  height?: number;
  /** Called when every candidate format fails to load. */
  onAllFormatsFailed?: () => void;
  /** Override lazy loading (default: lazy). Set to "eager" for above-the-fold images. */
  loading?: 'lazy' | 'eager';
}

/**
 * Renders an <img> that tries a prioritized list of formats (webp, png, jpg)
 * for the same base path, falling back to the next on error. This lets you
 * drop either a .webp or .png file into the same folder with the same name.
 */
export default function FlexibleImage({
  basePath,
  alt,
  className,
  width,
  height,
  onAllFormatsFailed,
  loading = 'lazy',
}: FlexibleImageProps) {
  const candidates = FORMAT_PRIORITY.map((ext) => `${basePath}.${ext}`);
  const [index, setIndex] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setIndex(0);
    setHidden(false);
  }, [basePath]);

  const handleError = () => {
    if (index < candidates.length - 1) {
      setIndex((i) => i + 1);
    } else {
      setHidden(true);
      onAllFormatsFailed?.();
    }
  };

  if (hidden) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={candidates[index]}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      onError={handleError}
    />
  );
}
