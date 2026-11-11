'use client';

import {
  useEffect,
  useRef,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { industries } from '@/data/site';
import Reveal from '@/components/products/Reveal';
import HomeSectionHeading from '@/components/home/HomeSectionHeading';

const DESKTOP_AUTO_SPEED = 34;

type Industry = (typeof industries)[number];

function IndustryCard({
  industry,
  compact = false,
  dataAttribute = true,
}: {
  industry: Industry;
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

        <div
          className={[
            'absolute inset-x-0 top-0 flex justify-end',
            compact ? 'p-3.5 sm:p-4' : 'p-5 xl:p-6',
          ].join(' ')}
        >
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

        </div>
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
      // Keep pointer-up on the clicked card so its full-card link remains usable.
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
      className="relative isolate overflow-hidden bg-[#f4f7f2] text-brand-green-dark"
      style={{
        overflowAnchor: 'none',
        touchAction: 'pan-y',
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(22,132,71,0.055),transparent_30%),radial-gradient(circle_at_92%_100%,rgba(22,132,71,0.035),transparent_34%)]" />

      <div className="relative py-9 sm:py-11 lg:flex lg:min-h-[520px] lg:flex-col lg:justify-center lg:py-8 xl:min-h-[540px] xl:py-9">
        <div className="mx-auto w-full max-w-[1160px] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <HomeSectionHeading
              eyebrow="Industries"
              title="Industries We Serve"
              description="Engineered flow-control solutions for demanding industrial applications across a wide range of process industries."
            />
          </Reveal>

          <div
            className="mt-5 hidden items-center justify-end gap-2 lg:flex"
            onMouseEnter={() => {
              pausedRef.current = true;
            }}
            onMouseLeave={() => {
              pausedRef.current = false;
            }}
          >
                <button
                  type="button"
                  aria-label="Scroll industries left"
                  onClick={() => scrollDesktopRail(-1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#cddbcf] bg-white/75 text-[#365a43] transition-all duration-300 hover:border-brand-green hover:bg-brand-green hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/60"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  aria-label="Scroll industries right"
                  onClick={() => scrollDesktopRail(1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#cddbcf] bg-white/75 text-[#365a43] transition-all duration-300 hover:border-brand-green hover:bg-brand-green hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/60"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
          </div>
        </div>

        {/* MOBILE / TABLET: two TRUE marquee tracks moving in opposite directions */}
        <div className="relative mt-6 overflow-hidden lg:hidden">
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
                    return (
                      <IndustryCard
                        key={`mobile-top-${copy}-${industry.slug}`}
                        industry={industry}
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
                    return (
                      <IndustryCard
                        key={`mobile-bottom-${copy}-${industry.slug}`}
                        industry={industry}
                        compact
                        dataAttribute={false}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
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
              return (
                <IndustryCard
                  key={`desktop-${industry.slug}-${index}`}
                  industry={industry}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
