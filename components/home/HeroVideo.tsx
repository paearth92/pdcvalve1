'use client';

/**
 * Hero background video with poster fallback.
 *
 * Stateless by design: the poster <img> is always rendered underneath the
 * <video>, and the video fades in on top once it starts playing. Animations
 * live in globals.css so HMR re-renders don't restart them.
 */
export default function HeroVideo() {
  return (
    <>
      {/* Poster — always visible, sits behind the video */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/videos/pdc-hero-poster.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-[64%_center]"
        width={1920}
        height={800}
      />

      {/* Video fades in over the poster via CSS class in globals.css */}
      <video
        className="pdc-hero-video absolute inset-0 h-full w-full object-cover object-[64%_center]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/videos/pdc-hero.webm" type="video/webm" />
        <source src="/videos/pdc-hero.mp4" type="video/mp4" />
      </video>
    </>
  );
}
