'use client';

import {
  useEffect,
  useRef,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause } from 'lucide-react';
import { industries } from '@/data/site';
import Reveal from '@/components/products/Reveal';

const DESKTOP_AUTO_SPEED = 34;

type Industry = (typeof industries)[number];

function IndustryCard({
  industry,
  number,
  compact = false,
  dataAttribute = true,
}: {
  industry: Industry;
  number: string;
  compact?: boolean;
  dataAttribute?: boolean;
}) {
  return (
    <article
      data-industry-card={dataAttribute ? '' : undefined}
      className={[
        'group/card relative shrink-0',
        compact
          ? 'mr-3 h-[148px] w-[224px] sm:mr-4 sm:h-[180px] sm:w-[272px]'
          : 'h-[270px] w-[380px] xl:h-[292px] xl:w-[404px] 2xl:h-[305px] 2xl:w-[420px]',
      ].join(' ')}
    >
      <Link
        href={`/industries/${industry.slug}`}
        draggable={false}
        className={[
          'relative block h-full w-full overflow-hidden border border-white/12 bg-[#0d1b13]',
          'transition-[transform,border-color,box-shadow] duration-500 ease-out',
          'group-hover/card:-translate-y-1 group-hover/card:border-brand-green/40',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/60',
          compact
            ? 'rounded-[17px] shadow-[0_12px_30px_rgba(0,0,0,0.28)] sm:rounded-[19px]'
            : 'rounded-[24px] shadow-[0_18px_48px_rgba(0,0,0,0.28)] group-hover/card:shadow-[0_24px_65px_rgba(0,0,0,0.38)]',
        ].join(' ')}
      >
        {/* Real image element so the browser can lazy-load/decode it without
            blocking a fast vertical scroll into this section. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={industry.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full scale-[1.035] object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-100"
        />

        <div className="absolute inset-0 bg-[linear-gradient(96deg,rgba(3,10,6,0.94)_0%,rgba(3,10,6,0.76)_32%,rgba(3,10,6,0.32)_60%,rgba(3,10,6,0.06)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020805]/72 via-transparent to-black/12" />

        <span
          className={[
            'pointer-events-none absolute -right-1 select-none font-mono font-black leading-none tracking-[-0.09em]',
            'text-white/[0.055] transition-colors duration-500 group-hover/card:text-brand-green/[0.12]',
            compact
              ? '-top-3 text-[4.2rem] sm:text-[5rem]'
              : '-top-6 text-[7.2rem] xl:text-[8rem]',
          ].join(' ')}
        >
          {number}
        </span>

        <div
          className={[
            'absolute inset-x-0 top-0 flex items-center justify-between',
            compact ? 'p-3.5 sm:p-4' : 'p-5 xl:p-6',
          ].join(' ')}
        >
          <div className="flex items-center gap-2">
            <span
              className={[
                'font-mono font-black tracking-[0.16em] text-brand-green',
                compact ? 'text-[9px]' : 'text-[10px]',
              ].join(' ')}
            >
              {number}
            </span>

            <span
              className={[
                'h-px bg-brand-green/65',
                compact ? 'w-5' : 'w-8',
              ].join(' ')}
            />

            {!compact && (
              <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-white/45">
                Industrial market
              </span>
            )}
          </div>

          <span
            className={[
              'flex items-center justify-center rounded-full border border-white/15 bg-black/20',
              'text-white/65 backdrop-blur-md transition-all duration-300',
              'group-hover/card:border-brand-green/55 group-hover/card:bg-brand-green group-hover/card:text-white',
              compact ? 'h-7 w-7 sm:h-8 sm:w-8' : 'h-9 w-9',
            ].join(' ')}
          >
            <ArrowUpRight
              className={[
                'transition-transform duration-300 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5',
                compact ? 'h-3.5 w-3.5' : 'h-4 w-4',
              ].join(' ')}
            />
          </span>
        </div>

        <div
          className={[
            'absolute inset-x-0 bottom-0',
            compact ? 'p-3.5 sm:p-4' : 'p-5 xl:p-6',
          ].join(' ')}
        >
          <h3
            className={[
              'font-extrabold tracking-[-0.038em] text-white',
              compact
                ? 'max-w-[90%] text-[1.12rem] leading-[0.98] sm:text-[1.3rem]'
                : 'max-w-[86%] text-[1.7rem] leading-[0.96] xl:text-[1.95rem]',
            ].join(' ')}
          >
            {industry.name}
          </h3>

          {!compact && (
            <p className="mt-2.5 line-clamp-2 max-w-[320px] text-[12px] leading-5 text-white/60 xl:text-[12.5px]">
              {industry.description}
            </p>
          )}

          <div
            className={[
              'flex items-center gap-2 font-extrabold uppercase tracking-[0.15em] text-brand-green',
              compact ? 'mt-2 text-[7.5px] sm:text-[8px]' : 'mt-4 text-[9px]',
            ].join(' ')}
          >
            Explore
            <span
              className={[
                'h-px bg-brand-green transition-all duration-500 group-hover/card:w-12',
                compact ? 'w-6' : 'w-8',
              ].join(' ')}
            />
          </div>
        </div>

        <span className="absolute left-0 top-0 h-[3px] w-14 bg-brand-green transition-all duration-700 group-hover/card:w-full" />
        <span className="absolute bottom-3 right-3 h-2.5 w-2.5 border-b border-r border-white/20 sm:bottom-4 sm:right-4 sm:h-3 sm:w-3" />
      </Link>
    </article>
  );
}

export default function IndustriesWeServe() {
  const desktopRailRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const activeRailRef = useRef<HTMLDivElement | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const dragMovedRef = useRef(false);

  const mobileTopBase = industries.filter((_, index) => index % 2 === 0);
  const mobileBottomBaseRaw = industries.filter((_, index) => index % 2 === 1);
  const mobileBottomBase =
    mobileBottomBaseRaw.length > 0 ? mobileBottomBaseRaw : industries;

  const desktopIndustries = [...industries, ...industries];
  useEffect(() => {
    const rail = desktopRailRef.current;
    if (!rail) return;

    let lastTime = performance.now();

    const getLoopPoint = () => {
      const cards = rail.querySelectorAll<HTMLElement>('[data-industry-card]');
      const firstCard = cards[0];
      const repeatedFirstCard = cards[industries.length];

      return firstCard && repeatedFirstCard
        ? repeatedFirstCard.offsetLeft - firstCard.offsetLeft
        : 0;
    };

    const tick = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (
        window.innerWidth >= 1024 &&
        !pausedRef.current &&
        !draggingRef.current
      ) {
        const loopPoint = getLoopPoint();

        if (loopPoint > 0) {
          rail.scrollLeft += DESKTOP_AUTO_SPEED * delta;

          if (rail.scrollLeft >= loopPoint) {
            rail.scrollLeft -= loopPoint;
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const scrollDesktopRail = (direction: -1 | 1) => {
    const rail = desktopRailRef.current;
    if (!rail) return;

    const firstCard = rail.querySelector<HTMLElement>('[data-industry-card]');
    const styles = window.getComputedStyle(rail);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || '0');
    const step = firstCard ? firstCard.offsetWidth + gap : 420;

    rail.scrollBy({
      left: direction * step,
      behavior: 'smooth',
    });
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rail = event.currentTarget;

    activeRailRef.current = rail;
    draggingRef.current = true;
    dragMovedRef.current = false;
    pausedRef.current = true;
    dragStartXRef.current = event.clientX;
    dragStartScrollRef.current = rail.scrollLeft;

    rail.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rail = activeRailRef.current;
    if (!rail || !draggingRef.current) return;

    const distance = event.clientX - dragStartXRef.current;

    if (Math.abs(distance) > 6) {
      dragMovedRef.current = true;
    }

    rail.scrollLeft = dragStartScrollRef.current - distance;
  };

  const finishDragging = (event?: ReactPointerEvent<HTMLDivElement>) => {
    const rail = activeRailRef.current;

    if (rail && event) {
      try {
        rail.releasePointerCapture?.(event.pointerId);
      } catch {
        // Pointer capture may already have been released.
      }
    }

    draggingRef.current = false;
    activeRailRef.current = null;

    if (event?.pointerType === 'touch' || event?.pointerType === 'pen') {
      window.setTimeout(() => {
        pausedRef.current = false;
      }, 550);
    }
  };

  const pauseMobileMarquee = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    // IMPORTANT: do not call preventDefault() or setPointerCapture() here.
    // The vertical page scroll must always win on phones.
    const track = event.currentTarget.querySelector<HTMLElement>(
      '.industry-marquee-track',
    );

    if (track) {
      track.style.animationPlayState = 'paused';
    }
  };

  const resumeMobileMarquee = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    const track = event.currentTarget.querySelector<HTMLElement>(
      '.industry-marquee-track',
    );

    if (track) {
      window.setTimeout(() => {
        track.style.animationPlayState = 'running';
      }, 300);
    }
  };

  const railInteractionProps = {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: finishDragging,
    onPointerCancel: finishDragging,
    onClickCapture: (event: ReactMouseEvent<HTMLDivElement>) => {
      if (dragMovedRef.current) {
        event.preventDefault();
        event.stopPropagation();
        dragMovedRef.current = false;
      }
    },
  };

  return (
    <section
      className="relative isolate overflow-hidden bg-[#07110b] text-white"
      style={{
        overflowAnchor: 'none',
        touchAction: 'pan-y',
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(22,132,71,0.16),transparent_30%),radial-gradient(circle_at_92%_100%,rgba(22,132,71,0.08),transparent_34%)]" />
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-[0.09]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative py-9 sm:py-11 lg:flex lg:min-h-[620px] lg:flex-col lg:justify-center lg:py-10 xl:min-h-[650px] xl:py-12">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10">
          <Reveal>
            <div className="grid items-end gap-5 lg:grid-cols-[1fr_auto] lg:gap-10">
              <div className="max-w-[780px]">
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-green shadow-[0_0_14px_rgba(22,132,71,0.9)]" />
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-brand-green">
                    Markets
                  </span>
                  <span className="h-px w-10 bg-brand-green/35 sm:w-12" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
                    {String(industries.length).padStart(2, '0')} industries
                  </span>
                </div>

                <div className="mt-3 flex items-end gap-7">
                  <h2 className="shrink-0 text-[1.85rem] font-extrabold leading-none tracking-[-0.045em] sm:text-[2.35rem] lg:text-[2.7rem] xl:text-[3.15rem]">
                    Industries We Serve
                  </h2>

                  <p className="hidden max-w-[380px] pb-0.5 text-[13px] leading-5 text-white/52 xl:block">
                    Engineered flow-control solutions for demanding industrial
                    environments and mission-critical infrastructure.
                  </p>
                </div>
              </div>

              <div
                className="hidden items-center gap-2 lg:flex"
                onMouseEnter={() => {
                  pausedRef.current = true;
                }}
                onMouseLeave={() => {
                  pausedRef.current = false;
                }}
              >
                <span className="mr-2 hidden items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.17em] text-white/35 xl:flex">
                  <Pause className="h-3 w-3 text-brand-green" />
                  Hover to pause · drag to explore
                </span>

                <button
                  type="button"
                  aria-label="Scroll industries left"
                  onClick={() => scrollDesktopRail(-1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.035] text-white/65 transition-all duration-300 hover:border-brand-green/45 hover:bg-brand-green hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/60"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  aria-label="Scroll industries right"
                  onClick={() => scrollDesktopRail(1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.035] text-white/65 transition-all duration-300 hover:border-brand-green/45 hover:bg-brand-green hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/60"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* MOBILE / TABLET: two TRUE marquee tracks moving in opposite directions */}
        <div className="relative mt-6 overflow-hidden lg:hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-8 bg-gradient-to-r from-[#07110b] via-[#07110b]/85 to-transparent sm:w-12" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-8 bg-gradient-to-l from-[#07110b] via-[#07110b]/85 to-transparent sm:w-12" />

          {/* Row 1: moves LEFT */}
          <div
            className="touch-pan-y overflow-hidden"
            style={{
              touchAction: 'pan-y',
              contain: 'layout paint',
            }}
            onPointerDown={pauseMobileMarquee}
            onPointerUp={resumeMobileMarquee}
            onPointerCancel={resumeMobileMarquee}
            onPointerLeave={resumeMobileMarquee}
          >
            <div className="industry-marquee-track industry-marquee-left flex w-max will-change-transform">
              {[0, 1].map((copy) => (
                <div
                  key={`mobile-top-copy-${copy}`}
                  className="flex shrink-0"
                  aria-hidden={copy === 1 ? true : undefined}
                >
                  {mobileTopBase.map((industry) => {
                    const originalIndex = industries.findIndex(
                      (item) => item.slug === industry.slug,
                    );
                    const number = String(originalIndex + 1).padStart(2, '0');

                    return (
                      <IndustryCard
                        key={`mobile-top-${copy}-${industry.slug}`}
                        industry={industry}
                        number={number}
                        compact
                        dataAttribute={false}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: moves RIGHT */}
          <div
            className="mt-3 touch-pan-y overflow-hidden sm:mt-4"
            style={{
              touchAction: 'pan-y',
              contain: 'layout paint',
            }}
            onPointerDown={pauseMobileMarquee}
            onPointerUp={resumeMobileMarquee}
            onPointerCancel={resumeMobileMarquee}
            onPointerLeave={resumeMobileMarquee}
          >
            <div className="industry-marquee-track industry-marquee-right flex w-max will-change-transform">
              {[0, 1].map((copy) => (
                <div
                  key={`mobile-bottom-copy-${copy}`}
                  className="flex shrink-0"
                  aria-hidden={copy === 1 ? true : undefined}
                >
                  {mobileBottomBase.map((industry) => {
                    const originalIndex = industries.findIndex(
                      (item) => item.slug === industry.slug,
                    );
                    const number = String(originalIndex + 1).padStart(2, '0');

                    return (
                      <IndustryCard
                        key={`mobile-bottom-${copy}-${industry.slug}`}
                        industry={industry}
                        number={number}
                        compact
                        dataAttribute={false}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-center gap-2 text-[8px] font-extrabold uppercase tracking-[0.18em] text-white/30 sm:mt-4">
            <span className="h-px w-8 bg-brand-green/30" />
            Continuous markets
            <span className="h-px w-8 bg-brand-green/30" />
          </div>
        </div>

        <style>{`
          @keyframes industry-marquee-left {
            from {
              transform: translate3d(0, 0, 0);
            }
            to {
              transform: translate3d(-50%, 0, 0);
            }
          }

          @keyframes industry-marquee-right {
            from {
              transform: translate3d(-50%, 0, 0);
            }
            to {
              transform: translate3d(0, 0, 0);
            }
          }

          .industry-marquee-left {
            animation: industry-marquee-left 16s linear infinite;
          }

          .industry-marquee-right {
            animation: industry-marquee-right 18s linear infinite;
          }

          .industry-marquee-track {
            backface-visibility: hidden;
            transform-style: preserve-3d;
            contain: layout paint;
            pointer-events: auto;
          }

          @media (min-width: 640px) and (max-width: 1023px) {
            .industry-marquee-left {
              animation-duration: 21s;
            }

            .industry-marquee-right {
              animation-duration: 23s;
            }
          }
        `}</style>

        {/* DESKTOP: original single marquee */}
        <div className="relative mt-8 hidden lg:block">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[6vw] bg-gradient-to-r from-[#07110b] via-[#07110b]/70 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[6vw] bg-gradient-to-l from-[#07110b] via-[#07110b]/70 to-transparent" />

          <div
            ref={desktopRailRef}
            className="group/rail flex cursor-grab select-none gap-5 overflow-x-auto px-[6vw] pb-3 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ WebkitOverflowScrolling: 'touch' }}
            onMouseEnter={() => {
              pausedRef.current = true;
            }}
            onMouseLeave={() => {
              pausedRef.current = false;
              draggingRef.current = false;
              activeRailRef.current = null;
            }}
            onFocusCapture={() => {
              pausedRef.current = true;
            }}
            onBlurCapture={() => {
              pausedRef.current = false;
            }}
            {...railInteractionProps}
          >
            {desktopIndustries.map((industry, index) => {
              const originalIndex = index % industries.length;
              const number = String(originalIndex + 1).padStart(2, '0');

              return (
                <IndustryCard
                  key={`desktop-${industry.slug}-${index}`}
                  industry={industry}
                  number={number}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}