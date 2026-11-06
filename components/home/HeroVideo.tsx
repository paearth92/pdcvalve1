'use client';

import { useEffect, useRef, useState } from 'react';

export type HeroVideoSource = {
  src: string;
  type: string;
};

const desktopSources: HeroVideoSource[] = [
  { src: '/videos/pdc-home-hero.webm', type: 'video/webm' },
  { src: '/videos/pdc-home-hero.mp4', type: 'video/mp4' },
];

type HeroVideoProps = {
  sources?: HeroVideoSource[];
  mobileSources?: HeroVideoSource[];
};

export default function HeroVideo({ sources = desktopSources, mobileSources = [] }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const hasMobileSources = mobileSources.length > 0;
  const hasVideo = sources.length > 0 || hasMobileSources;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasVideo) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotionPreference = () => {
      if (motionPreference.matches) {
        video.pause();
        setHasStarted(false);
        return;
      }

      void video.play().catch(() => undefined);
    };

    syncMotionPreference();
    motionPreference.addEventListener('change', syncMotionPreference);
    return () => motionPreference.removeEventListener('change', syncMotionPreference);
  }, [hasVideo]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#020b07]">
      {/* Responsive still artwork remains visible if video playback is reduced or unavailable. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <picture>
        <source media="(min-width: 768px)" srcSet="/images/home/hero-flow-desktop.webp" />
        <img
          src="/images/home/hero-flow-mobile.webp"
          alt=""
          aria-hidden="true"
          width={941}
          height={1672}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center md:object-[64%_center]"
        />
      </picture>

      {hasVideo && (
        <video
          ref={videoRef}
          data-started={hasStarted}
          className="pdc-hero-video absolute inset-0 h-full w-full object-cover object-center md:object-[64%_center]"
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          onPlay={() => setHasStarted(true)}
        >
          {mobileSources.map((source) => (
            <source
              key={source.src}
              src={source.src}
              type={source.type}
              media="(max-width: 767px)"
            />
          ))}
          {sources.map((source) => (
            <source
              key={source.src}
              src={source.src}
              type={source.type}
              media={hasMobileSources ? '(min-width: 768px)' : undefined}
            />
          ))}
        </video>
      )}
    </div>
  );
}
