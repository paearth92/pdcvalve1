'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { capabilities } from '@/data/site';
import type { Capability } from '@/types/site';

gsap.registerPlugin(ScrollTrigger);

export default function EngineeringCapabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });

      if (gridRef.current) {
        const cards = Array.from(gridRef.current.children);
        gsap.from(cards, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
          y: 56,
          opacity: 0,
          scale: 0.94,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Background image */}
      <Image
        src="/images/sections/capabilities.png"
        alt="PDC engineer reviewing valve blueprints"
        fill
        className="object-cover object-center"
        priority={false}
        sizes="100vw"
      />

      {/* Light frosted overlay — brightens the section for contrast against dark Industries */}
      <div className="absolute inset-0 bg-[#f4f7f3]/82 backdrop-blur-[4px]" />
      {/* Subtle green tint to stay on-brand */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(22,132,71,0.10),transparent_55%)]" />
      {/* Vignette to anchor edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(6,30,18,0.18)_100%)]" />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-brand-green">
            Capabilities
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-green-dark sm:text-4xl lg:text-[2.75rem]">
            Engineering Beyond Manufacturing
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-graphite/75">
            PDC provides complete engineering and manufacturing support.
          </p>
          <div className="mx-auto mt-5 h-px w-16 bg-brand-green/50" />
        </div>

        {/* Capability cards grid */}
        <div
          ref={gridRef}
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6"
        >
          {capabilities.map((cap) => (
            <CapabilityCard key={cap.label} cap={cap} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Individual frosted-glass card ---------- */

function CapabilityCard({ cap }: { cap: Capability }) {
  const { ref, display } = useCountUp(cap.value, cap.numeric);

  return (
    <div className="group flex flex-col items-center justify-center rounded-2xl border border-brand-green-dark/12 bg-white/70 px-5 py-8 text-center shadow-[0_2px_14px_rgba(6,30,18,0.06)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/40 hover:bg-white hover:shadow-[0_12px_32px_rgba(22,132,71,0.16)] sm:py-10">
      <span
        ref={ref}
        className="text-3xl font-extrabold tracking-tight text-brand-green transition-transform duration-300 group-hover:scale-110 sm:text-4xl"
      >
        {display}
        {cap.numeric && cap.value === '300' && '+'}
      </span>
      <div className="mx-auto mt-3 h-px w-8 bg-brand-green/30 transition-all duration-300 group-hover:w-12 group-hover:bg-brand-green/60" />
      <span className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-brand-graphite/65 transition-colors duration-300 group-hover:text-brand-green-dark">
        {cap.label}
      </span>
    </div>
  );
}

/* ---------- Count-up hook ---------- */

function useCountUp(value: string, numeric?: boolean) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(numeric ? '0' : value);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (!numeric) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated) {
          setAnimated(true);
          const target = parseInt(value, 10);
          const duration = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(target * eased).toString());
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [numeric, value, animated]);

  return { ref, display };
}
