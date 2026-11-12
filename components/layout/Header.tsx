'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Menu, X, Phone, Mail, ChevronDown, ArrowRight } from 'lucide-react';
import { mainNav, siteConfig, megaMenuColumns, megaMenuFeature, companyMenuLinks, industries } from '@/data/site';
import { productFamilyContent } from '@/data/products/families';
import { products, getProductsByFamily } from '@/data/products';
import { approvedProductBackground } from '@/data/assets/registry';
import { cn } from '@/lib/utils';
import RFQButton from '@/components/rfq/RFQButton';

type FeaturePreview = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  ctaLabel: string;
};

type IndustryPreview = {
  title: string;
  description: string;
  videoSrc: string;
  poster: string;
  href: string;
};

const transparentProductPreviewImages: Record<
  string,
  Pick<FeaturePreview, 'image' | 'imageAlt'>
> = {
  'butterfly-damper-valves/econotrol': {
    image: '/images/products/butterfly-damper-valves/econotrol-hero-cutout.png',
    imageAlt: 'PDC Econotrol Series 09 Damper and Control Valve',
  },
  'butterfly-damper-valves/excel': {
    image: '/images/products/butterfly-damper-valves/excel-series-40-xlnf-cutout.png',
    imageAlt: 'PDC Excel Series 40 butterfly damper valve with Bettis actuator and heat shield',
  },
  'electric-actuators/pdcq': {
    image: '/images/home/core-capabilities/pdcq-actuator-cutout.png',
    imageAlt: 'PDCQ electric quarter-turn actuator with manual handwheel',
  },
  'butterfly-valves/high-performance': {
    image: '/images/home/core-capabilities/high-performance-isolation-cutout.png',
    imageAlt: 'PDC High Performance Butterfly Valve for process isolation',
  },
};

const productMainPreviewImages = new Map(
  products.flatMap((product) =>
    product.image?.src
      ? [[
          `${product.familySlug}/${product.slug}`,
          { image: product.image.src, imageAlt: product.image.alt },
        ] as const]
      : [],
  ),
);

function getProductPreviewImage(
  familySlug: string,
  productSlug: string,
  productName: string,
): Pick<FeaturePreview, 'image' | 'imageAlt'> {
  const productKey: `${string}/${string}` = `${familySlug}/${productSlug}`;
  return (
    transparentProductPreviewImages[productKey] ??
    productMainPreviewImages.get(productKey) ?? {
      image: approvedProductBackground,
      imageAlt: `PDC ${productName} product family background`,
    }
  );
}

const familyPreviewMap = new Map<string, FeaturePreview>(
  productFamilyContent.map((f) => {
    const familyProducts = getProductsByFamily(f.slug);
    const featured =
      familyProducts.find(
        (product) =>
          transparentProductPreviewImages[`${product.familySlug}/${product.slug}`] ||
          productMainPreviewImages.has(`${product.familySlug}/${product.slug}`),
      ) ?? familyProducts[0];
    if (featured) {
      return [
        f.slug,
        {
          title: featured.name,
          description: featured.shortDescription ?? f.shortDescription,
          ...getProductPreviewImage(
            featured.familySlug,
            featured.slug,
            featured.name,
          ),
          href: `/products/${featured.familySlug}/${featured.slug}`,
          ctaLabel: 'Explore Product',
        },
      ];
    }
    return [
      f.slug,
      {
        title: f.name,
        description: f.shortDescription,
        ...getProductPreviewImage(f.slug, '', f.name),
        href: f.route,
        ctaLabel: 'Explore Family',
      },
    ];
  }),
);

const productPreviewMap = new Map<string, FeaturePreview>(
  products.map((p) => [
    `${p.familySlug}/${p.slug}`,
    {
      title: p.name,
      description: p.shortDescription ?? '',
      ...getProductPreviewImage(p.familySlug, p.slug, p.name),
      href: `/products/${p.familySlug}/${p.slug}`,
      ctaLabel: 'Explore Product',
    },
  ]),
);

const industryPreviewMap = new Map<string, IndustryPreview>(
  industries.map((ind) => [
    ind.slug,
    {
      title: ind.name,
      description: ind.description,
      videoSrc: `/videos/industries/${ind.slug}.webm`,
      poster: ind.image,
      href: `/industries/${ind.slug}`,
    },
  ]),
);

const defaultIndustryPreview: IndustryPreview = {
  title: industries[0].name,
  description: industries[0].description,
  videoSrc: `/videos/industries/${industries[0].slug}.webm`,
  poster: industries[0].image,
  href: `/industries/${industries[0].slug}`,
};

const defaultPreview: FeaturePreview = {
  title: megaMenuFeature.title,
  description: megaMenuFeature.description,
  ...getProductPreviewImage(
    'butterfly-valves',
    'high-performance',
    megaMenuFeature.title,
  ),
  href: `/products/${megaMenuFeature.ctaSlug}`,
  ctaLabel: megaMenuFeature.ctaLabel,
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [preview, setPreview] = useState<FeaturePreview>(defaultPreview);
  const [industryPreview, setIndustryPreview] = useState<IndustryPreview>(defaultIndustryPreview);
  const megaRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const companyCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const industriesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frameId: number | null = null;
    let previousScrollY = window.scrollY;

    const updateHeaderState = () => {
      const scrollY = window.scrollY;
      const scrollDelta = scrollY - previousScrollY;

      if (mobileOpen || megaOpen || companyOpen || industriesOpen || scrollY < 32) {
        setHeaderHidden(false);
      } else if (scrollDelta !== 0) {
        setHeaderHidden(scrollDelta > 0);
      }
      previousScrollY = scrollY;

      setScrolled((current) => {
        // Separate enter/exit thresholds prevent the header from rapidly
        // switching states when its own height changes near the top of the page.
        if (!current && scrollY > 28) return true;
        if (current && scrollY < 8) return false;
        return current;
      });

      frameId = null;
    };

    const onScroll = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateHeaderState);
    };

    updateHeaderState();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [mobileOpen, megaOpen, companyOpen, industriesOpen]);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setCompanyOpen(false);
    setMegaOpen(true);
  };

  const closeMega = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  };

  const openCompany = () => {
    if (companyCloseTimer.current) clearTimeout(companyCloseTimer.current);
    setMegaOpen(false);
    setCompanyOpen(true);
  };

  const closeCompany = () => {
    companyCloseTimer.current = setTimeout(() => setCompanyOpen(false), 150);
  };

  const openIndustries = () => {
    if (industriesCloseTimer.current) clearTimeout(industriesCloseTimer.current);
    setMegaOpen(false);
    setCompanyOpen(false);
    setIndustriesOpen(true);
  };

  const closeIndustries = () => {
    industriesCloseTimer.current = setTimeout(() => setIndustriesOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      if (companyCloseTimer.current) clearTimeout(companyCloseTimer.current);
      if (industriesCloseTimer.current) clearTimeout(industriesCloseTimer.current);
    };
  }, []);

  /** Immediate close — used for keyboard, where the hover grace period hurts. */
  const closeAllNow = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (companyCloseTimer.current) clearTimeout(companyCloseTimer.current);
    setMegaOpen(false);
    setCompanyOpen(false);
    setIndustriesOpen(false);
  }, []);

  // Escape closes any open dropdown.
  useEffect(() => {
    if (!megaOpen && !companyOpen && !industriesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAllNow();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [megaOpen, companyOpen, closeAllNow]);

  /** Close a group once focus moves outside it entirely. */
  const handleGroupBlur = (
    e: React.FocusEvent<HTMLDivElement>,
    close: () => void,
  ) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) close();
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        menuToggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const pathname = usePathname();

  // Close all desktop dropdowns whenever the route changes (e.g. clicking a
  // product link inside the mega menu navigates but the mouse stays inside,
  // so the hover-leave close never fires).
  useEffect(() => {
    setMegaOpen(false);
    setCompanyOpen(false);
    setIndustriesOpen(false);
  }, [pathname]);

  return (
    <div
      className={cn(
        'sticky top-0 z-50 w-full transition-transform duration-300 ease-out',
        headerHidden ? 'pointer-events-none -translate-y-full' : 'translate-y-0',
      )}
    >
      {/* Utility bar */}
      <div className="hidden bg-brand-green-dark text-white md:block">
        <div className="mx-auto flex h-[34px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-medium tracking-wide text-white/75">
            Engineered Flow Control Since 1970
          </p>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-1.5 text-[11px] text-white/70 transition-colors hover:text-white"
            >
              <Phone className="h-3 w-3" />
              {siteConfig.phone}
            </a>
            <span className="h-3 w-px bg-white/20" />
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-1.5 text-[11px] text-white/70 transition-colors hover:text-white"
            >
              <Mail className="h-3 w-3" />
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          'relative isolate w-full border-b bg-white transition-[border-color,box-shadow] duration-300 ease-out [transform:translateZ(0)]',
          scrolled
            ? 'border-brand-green-dark/15 shadow-[0_2px_20px_rgba(7,61,43,0.08)]'
            : 'border-brand-green-dark/10',
        )}
      >
        <div
          className={cn(
            'mx-auto flex max-w-7xl items-center justify-between px-4 transition-[height] duration-300 ease-out sm:px-6 lg:px-8',
            scrolled ? 'h-[64px]' : 'h-[76px] lg:h-[72px]',
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setMobileOpen(false)}
          >
            <Image
              src="/images/pdc-logo.png"
              alt="PDC Valves & Actuators"
              width={160}
              height={60}
              priority
              className={cn(
                'w-auto object-contain transition-[height] duration-300 ease-out',
                scrolled ? 'h-9' : 'h-10',
              )}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-10 lg:flex">
            {mainNav.map((item) => {
              const isProducts = item.label === 'Products';
              const isIndustries = item.label === 'Industries';
              const isCompany = item.label === 'Company';
              return (
                <div
                  key={item.href}
                  ref={isProducts ? megaRef : isIndustries ? industriesRef : isCompany ? companyRef : undefined}
                  onMouseEnter={isProducts ? openMega : isIndustries ? openIndustries : isCompany ? openCompany : undefined}
                  onMouseLeave={isProducts ? closeMega : isIndustries ? closeIndustries : isCompany ? closeCompany : undefined}
                  // Keyboard parity: focusing the trigger opens the menu, and
                  // moving focus out of the group closes it.
                  onFocusCapture={isProducts ? openMega : isIndustries ? openIndustries : isCompany ? openCompany : undefined}
                  onBlurCapture={
                    isProducts || isIndustries || isCompany
                      ? (e) => handleGroupBlur(e, closeAllNow)
                      : undefined
                  }
                  className="relative"
                >
                  <Link
                    href={item.href}
                    aria-haspopup={isProducts || isIndustries || isCompany ? 'true' : undefined}
                    aria-expanded={
                      isProducts ? megaOpen : isIndustries ? industriesOpen : isCompany ? companyOpen : undefined
                    }
                    className={cn(
                      'nav-underline flex items-center gap-1 text-sm font-semibold text-brand-graphite transition-colors duration-200 hover:text-brand-green focus-visible:outline-none focus-visible:text-brand-green',
                    )}
                  >
                    {item.label}
                    {(isProducts || isIndustries || isCompany) && (
                      <span className="flex flex-col -space-y-1.5">
                        <ChevronDown
                          className={cn(
                            'h-3 w-3 text-brand-steel transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                            (isProducts && megaOpen) || (isIndustries && industriesOpen) || (isCompany && companyOpen)
                              ? 'rotate-180 text-brand-green'
                              : '',
                          )}
                        />
                        <ChevronDown
                          className={cn(
                            'h-3 w-3 text-brand-steel transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                            (isProducts && megaOpen) || (isIndustries && industriesOpen) || (isCompany && companyOpen)
                              ? 'rotate-180 text-brand-green'
                              : '',
                          )}
                        />
                      </span>
                    )}
                  </Link>

                  {/* Company dropdown */}
                  {isCompany && (
                    <div
                      className={cn(
                        'pdc-menu absolute left-1/2 hidden w-[min(560px,calc(100vw-2rem))] -translate-x-1/2 origin-top overflow-hidden rounded-b-2xl border-x border-b border-brand-green-dark/10 bg-white shadow-[0_24px_60px_rgba(7,61,43,0.16)] lg:block',
                        scrolled
                          ? 'top-[calc(100%+22px)]'
                          : 'top-[calc(100%+32px)]',
                        companyOpen
                          ? 'pointer-events-auto visible translate-y-0 scale-100 opacity-100'
                          : 'pointer-events-none invisible -translate-y-1.5 scale-[0.99] opacity-0',
                      )}
                      onMouseEnter={openCompany}
                      onMouseLeave={closeCompany}
                    >
                      <span
                        className={cn(
                          'absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-brand-green via-brand-green/40 to-transparent transition-transform duration-700 ease-out',
                          companyOpen ? 'scale-x-100' : 'scale-x-0',
                        )}
                      />
                      <div className="grid grid-cols-[1.12fr_0.88fr] gap-5 p-5">
                        <div>
                          <div className="mb-3 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-green">
                              PDC Company
                            </span>
                          </div>
                          <ul className="space-y-1">
                            {companyMenuLinks.map((link, li) => (
                              <li
                                key={link.href}
                                className={cn('pdc-menu-item', companyOpen && 'is-open')}
                                style={{ ['--i' as string]: li }}
                              >
                                <Link
                                  href={link.href}
                                  className="group/mi flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-brand-graphite/72 transition-all duration-200 hover:bg-brand-light-bg hover:text-brand-green-dark focus-visible:bg-brand-light-bg focus-visible:text-brand-green-dark focus-visible:outline-none"
                                  onClick={closeAllNow}
                                >
                                  <span className="transition-transform duration-300 group-hover/mi:translate-x-1">
                                    {link.label}
                                  </span>
                                  <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-brand-green/30 opacity-0 transition-all duration-300 group-hover/mi:translate-x-0 group-hover/mi:text-brand-green group-hover/mi:opacity-100" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="relative overflow-hidden rounded-xl border border-brand-green-dark/10 bg-brand-green-dark p-5 text-white">
                          <div className="blueprint-grid absolute inset-0 opacity-20" />
                          <div className="relative">
                            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-green">
                              Since 1970
                            </span>
                            <h3 className="mt-2 text-lg font-extrabold leading-tight tracking-tight">
                              Customized flow control solutions
                            </h3>
                            <p className="mt-3 text-xs leading-5 text-white/55">
                              Valves, actuators, custom configurations, application support, and in-house machining.
                            </p>
                            <div className="mt-5 grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
                              <div>
                                <div className="text-base font-extrabold text-white">10</div>
                                <div className="text-[9px] uppercase tracking-[0.13em] text-white/35">Product lines</div>
                              </div>
                              <div>
                                <div className="text-base font-extrabold text-white">ISO</div>
                                <div className="text-[9px] uppercase tracking-[0.13em] text-white/35">9001:2015</div>
                              </div>
                            </div>
                            <Link
                              href="/company"
                              onClick={closeAllNow}
                              className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-brand-green transition-all hover:gap-3"
                            >
                              Company overview
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <RFQButton size="sm" />
          </div>

          {/* Mobile toggle */}
          <button
            ref={menuToggleRef}
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-brand-graphite lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Desktop Products mega menu */}
        <div
          className={cn(
            'pdc-menu absolute inset-x-0 top-full hidden origin-top overflow-hidden border-b border-brand-green-dark/10 bg-white shadow-[0_24px_60px_rgba(7,61,43,0.16)] lg:block [transform:translateZ(0)]',
            megaOpen
              ? 'pointer-events-auto visible translate-y-0 scale-100 opacity-100'
              : 'pointer-events-none invisible -translate-y-1.5 scale-[0.99] opacity-0',
          )}
          onMouseEnter={openMega}
          onMouseLeave={closeMega}
          onFocusCapture={openMega}
          onBlurCapture={(e) => handleGroupBlur(e, closeAllNow)}
        >
          {/* Accent hairline that draws across as the panel opens */}
          <span
            className={cn(
              'absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-brand-green via-brand-green/40 to-transparent transition-transform duration-700 ease-out',
              megaOpen ? 'scale-x-100' : 'scale-x-0',
            )}
          />
          <div className="mx-auto grid max-w-7xl grid-cols-[1fr_1fr_1fr_1.1fr] gap-8 px-4 py-8 sm:px-6 lg:px-8">
            {megaMenuColumns.map((col, ci) => (
              <div
                key={ci}
                className={cn('pdc-menu-item flex flex-col gap-8', megaOpen && 'is-open')}
                style={{ ['--i' as string]: ci }}
              >
                {col.groups.map((group) => {
                  const headingHref =
                    group.headingHref === null
                      ? null
                      : group.headingHref ?? `/products/${group.headingSlug}`;
                  const familyPreview = familyPreviewMap.get(group.headingSlug);
                  return (
                  <div key={group.headingSlug}>
                    {headingHref ? (
                    <Link
                      href={headingHref}
                      className="text-xs font-bold uppercase tracking-[0.15em] text-brand-green transition-colors hover:text-brand-green-dark"
                      onClick={() => setMegaOpen(false)}
                      onMouseEnter={() => setPreview(familyPreview ?? defaultPreview)}
                    >
                      {group.heading}
                    </Link>
                    ) : (
                    <span
                      className="text-xs font-bold uppercase tracking-[0.15em] text-brand-green"
                      onMouseEnter={() => setPreview(familyPreview ?? defaultPreview)}
                    >
                      {group.heading}
                    </span>
                    )}
                    <ul className="mt-3 space-y-2.5 border-l border-brand-green-dark/10 pl-3">
                      {group.links.map((link) => {
                        const productPreview = productPreviewMap.get(`${group.headingSlug}/${link.slug}`);
                        return (
                        <li key={link.slug}>
                          <Link
                            href={link.href ?? `/products/${group.headingSlug}/${link.slug}`}
                            className="group/ml block text-sm text-brand-graphite/75 transition-colors duration-200 hover:text-brand-green focus-visible:text-brand-green focus-visible:outline-none"
                            onClick={closeAllNow}
                            onMouseEnter={() => setPreview(productPreview ?? familyPreview ?? defaultPreview)}
                          >
                            <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/ml:translate-x-1 group-focus-visible/ml:translate-x-1">
                              {link.label}
                            </span>
                          </Link>
                        </li>
                        );
                      })}
                    </ul>
                  </div>
                  );
                })}
              </div>
            ))}

            {/* Feature panel — updates on hover over family/product links */}
            <div className="group/preview relative flex flex-col overflow-hidden rounded-2xl border border-brand-green-dark/10 bg-white shadow-[0_16px_40px_rgba(19,57,37,0.12)]">
              <div className="relative flex h-44 items-center justify-center overflow-hidden bg-[#eef4ef]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,rgba(71,139,83,0.16),transparent_66%),linear-gradient(145deg,#f7faf7_0%,#e9f1eb_100%)]" />
                <div className="absolute inset-x-12 bottom-5 h-5 rounded-full bg-brand-green-dark/10 blur-xl" />
                <Image
                  src={preview.image}
                  alt={preview.imageAlt}
                  fill
                  sizes="(min-width: 1280px) 300px, 25vw"
                  loading="eager"
                  className="relative z-10 object-contain px-6 py-4 drop-shadow-[0_12px_12px_rgba(20,50,32,0.16)] transition-transform duration-300 group-hover/preview:scale-[1.035]"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-green-dark">
                  {preview.title}
                </span>
                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-brand-graphite/70">
                  {preview.description}
                </p>
                <Link
                  href={preview.href}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green transition-colors hover:text-brand-green-dark"
                  onClick={() => setMegaOpen(false)}
                >
                  {preview.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Industries mega menu */}
        <div
          className={cn(
            'pdc-menu absolute inset-x-0 top-full hidden origin-top overflow-hidden border-b border-brand-green-dark/10 bg-white shadow-[0_24px_60px_rgba(7,61,43,0.16)] lg:block [transform:translateZ(0)]',
            industriesOpen
              ? 'pointer-events-auto visible translate-y-0 scale-100 opacity-100'
              : 'pointer-events-none invisible -translate-y-1.5 scale-[0.99] opacity-0',
          )}
          onMouseEnter={openIndustries}
          onMouseLeave={closeIndustries}
          onFocusCapture={openIndustries}
          onBlurCapture={(e) => handleGroupBlur(e, closeAllNow)}
        >
          <span
            className={cn(
              'absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-brand-green via-brand-green/40 to-transparent transition-transform duration-700 ease-out',
              industriesOpen ? 'scale-x-100' : 'scale-x-0',
            )}
          />
          <div className="mx-auto grid max-w-7xl grid-cols-[1fr_1.1fr] gap-10 px-4 py-8 sm:px-6 lg:px-8">
            {/* Industry list with thumbnails */}
            <div className={cn('pdc-menu-item flex flex-col gap-1', industriesOpen && 'is-open')} style={{ ['--i' as string]: 0 }}>
              <span className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-brand-green">
                Industries We Serve
              </span>
              <ul className="grid grid-cols-2 gap-1">
                {industries.map((ind, ii) => (
                  <li key={ind.slug}>
                    <Link
                      href={`/industries/${ind.slug}`}
                      className="group/ind flex items-center gap-3 rounded-lg p-2 transition-colors duration-200 hover:bg-brand-light-bg focus-visible:bg-brand-light-bg focus-visible:outline-none"
                      onClick={closeAllNow}
                      onMouseEnter={() =>
                        setIndustryPreview(industryPreviewMap.get(ind.slug) ?? defaultIndustryPreview)
                      }
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={ind.image}
                        alt={ind.imageAlt}
                        loading="lazy"
                        className="h-11 w-14 shrink-0 rounded-md object-cover"
                      />
                      <span className="text-sm font-medium text-brand-graphite/80 transition-colors duration-200 group-hover/ind:text-brand-green group-focus-visible/ind:text-brand-green">
                        {ind.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Video preview card */}
            <div className={cn('pdc-menu-item flex flex-col', industriesOpen && 'is-open')} style={{ ['--i' as string]: 1 }}>
              <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-brand-green-dark/10 bg-brand-green-dark">
                <div className="relative h-48 overflow-hidden">
                  <video
                    key={industryPreview.videoSrc}
                    src={industryPreview.videoSrc}
                    poster={industryPreview.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark via-brand-green-dark/30 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-green">
                    {industryPreview.title}
                  </span>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-white/60">
                    {industryPreview.description}
                  </p>
                  <Link
                    href={industryPreview.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green transition-colors hover:text-white"
                    onClick={() => setIndustriesOpen(false)}
                  >
                    Explore Industry
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            'overflow-hidden border-t border-brand-green-dark/10 bg-white lg:hidden',
            mobileOpen ? 'pdc-mobile-open block' : 'hidden',
          )}
        >
          <nav
            className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6"
            style={{
              maxHeight: '100dvh',
              overflowY: 'auto',
              overscrollBehavior: 'contain',
              paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
            }}
          >
            {mainNav.map((item) => {
              const isProducts = item.label === 'Products';
              const isIndustries = item.label === 'Industries';
              const isCompany = item.label === 'Company';
              if (isProducts) {
                return (
                  <MobileProductsAccordion
                    key={item.href}
                    onNavigate={closeMobile}
                  />
                );
              }
              if (isIndustries) {
                return (
                  <MobileIndustriesAccordion
                    key={item.href}
                    onNavigate={closeMobile}
                  />
                );
              }
              if (isCompany) {
                return (
                  <MobileCompanyAccordion
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    onNavigate={closeMobile}
                  />
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2.5 text-sm font-semibold text-brand-graphite transition-colors hover:bg-brand-light-bg hover:text-brand-green"
                  onClick={closeMobile}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-3">
              <RFQButton
                size="md"
                className="w-full"
              />
            </div>
          </nav>
        </div>
      </header>

      <style jsx global>{`
        /* Dropdown panels: springy open, quick close. */
        .pdc-menu {
          transition:
            opacity 260ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 260ms cubic-bezier(0.22, 1, 0.36, 1),
            visibility 260ms linear;
        }

        /* Menu contents settle in just behind the panel. */
        .pdc-menu-item {
          opacity: 0;
          transform: translate3d(0, 8px, 0);
          transition:
            opacity 340ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 340ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .pdc-menu-item.is-open {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          transition-delay: calc(70ms + var(--i, 0) * 45ms);
        }

        @keyframes pdcMobileNavIn {
          from {
            opacity: 0;
            transform: translate3d(0, -10px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        .pdc-mobile-open > nav > * {
          animation: pdcMobileNavIn 320ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .pdc-mobile-open > nav > *:nth-child(1) { animation-delay: 20ms; }
        .pdc-mobile-open > nav > *:nth-child(2) { animation-delay: 55ms; }
        .pdc-mobile-open > nav > *:nth-child(3) { animation-delay: 90ms; }
        .pdc-mobile-open > nav > *:nth-child(4) { animation-delay: 125ms; }
        .pdc-mobile-open > nav > *:nth-child(5) { animation-delay: 160ms; }
        .pdc-mobile-open > nav > *:nth-child(6) { animation-delay: 195ms; }

        @media (prefers-reduced-motion: reduce) {
          .pdc-menu,
          .pdc-menu-item {
            transition-duration: 1ms;
            transition-delay: 0ms;
          }

          .pdc-menu-item {
            opacity: 1;
            transform: none;
          }

          .pdc-mobile-open > nav > * {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

function MobileProductsAccordion({
  onNavigate,
}: {
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const [openFamily, setOpenFamily] = useState<string | null>(null);

  useEffect(() => {
    setOpenFamily(null);
  }, [pathname]);

  const groups = megaMenuColumns.flatMap((col) => col.groups);

  return (
    <div className="flex flex-col">
      <span className="px-3 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-brand-green-dark">
        Products
      </span>

      {groups.map((group) => {
        const headingHref =
          group.headingHref === null
            ? null
            : group.headingHref ?? `/products/${group.headingSlug}`;
        const isOpen = openFamily === group.headingSlug;
        const panelId = `mobile-panel-${group.headingSlug}`;

        return (
          <div key={group.headingSlug}>
            <div className="flex items-center">
              {headingHref && (
                <Link
                  href={headingHref}
                  className="flex-1 rounded-md px-3 py-2.5 text-sm font-semibold text-brand-graphite transition-colors hover:bg-brand-light-bg hover:text-brand-green"
                  onClick={onNavigate}
                >
                  {group.heading}
                </Link>
              )}
              {!headingHref && (
                <span className="flex-1 px-3 py-2.5 text-sm font-semibold text-brand-graphite">
                  {group.heading}
                </span>
              )}
              {group.links.length > 0 && (
                <button
                  type="button"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-brand-steel transition-colors hover:bg-brand-light-bg hover:text-brand-green"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  aria-label={isOpen ? `Collapse ${group.heading}` : `Expand ${group.heading}`}
                  onClick={() => setOpenFamily(isOpen ? null : group.headingSlug)}
                >
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 transition-transform duration-200',
                      isOpen && 'rotate-180',
                    )}
                  />
                </button>
              )}
            </div>

            {group.links.length > 0 && (
              <div
                id={panelId}
                className={cn(
                  'overflow-hidden transition-all duration-200 ease-out',
                  isOpen ? 'max-h-[500px]' : 'max-h-0',
                )}
              >
                <ul className="ml-3 flex flex-col gap-0.5 border-l border-brand-green-dark/10 pl-3">
                  {group.links.map((link) => (
                    <li key={link.slug}>
                      <Link
                        href={link.href ?? `/products/${group.headingSlug}/${link.slug}`}
                        className="block rounded-md px-3 py-2 text-sm text-brand-graphite/70 transition-colors hover:bg-brand-light-bg hover:text-brand-green"
                        onClick={onNavigate}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}

    </div>
  );
}

function MobileIndustriesAccordion({
  onNavigate,
}: {
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(false);
  }, [pathname]);

  const panelId = 'mobile-panel-industries';

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <Link
          href="/industries"
          className="flex-1 rounded-md px-3 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-brand-green-dark transition-colors hover:bg-brand-light-bg"
          onClick={onNavigate}
        >
          Industries
        </Link>
        <button
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-brand-steel transition-colors hover:bg-brand-light-bg hover:text-brand-green"
          aria-expanded={expanded}
          aria-controls={panelId}
          aria-label={expanded ? 'Collapse Industries' : 'Expand Industries'}
          onClick={() => setExpanded((v) => !v)}
        >
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform duration-200',
              expanded && 'rotate-180',
            )}
          />
        </button>
      </div>
      <div
        id={panelId}
        className={cn(
          'overflow-hidden transition-all duration-200 ease-out',
          expanded ? 'max-h-[600px]' : 'max-h-0',
        )}
      >
        <ul className="ml-3 flex flex-col gap-0.5 border-l border-brand-green-dark/10 pl-3">
          {industries.map((ind) => (
            <li key={ind.slug}>
              <Link
                href={`/industries/${ind.slug}`}
                className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-brand-graphite/70 transition-colors hover:bg-brand-light-bg hover:text-brand-green"
                onClick={onNavigate}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ind.image}
                  alt={ind.imageAlt}
                  loading="lazy"
                  className="h-8 w-10 shrink-0 rounded object-cover"
                />
                {ind.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileCompanyAccordion({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(false);
  }, [pathname]);

  const panelId = 'mobile-panel-company';

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <Link
          href={href}
          className="flex-1 rounded-md px-3 py-2.5 text-sm font-semibold text-brand-graphite transition-colors hover:bg-brand-light-bg hover:text-brand-green"
          onClick={onNavigate}
        >
          {label}
        </Link>
        <button
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-brand-steel transition-colors hover:bg-brand-light-bg hover:text-brand-green"
          aria-expanded={expanded}
          aria-controls={panelId}
          aria-label={expanded ? `Collapse ${label}` : `Expand ${label}`}
          onClick={() => setExpanded((v) => !v)}
        >
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform duration-200',
              expanded && 'rotate-180',
            )}
          />
        </button>
      </div>
      <div
        id={panelId}
        className={cn(
          'overflow-hidden transition-all duration-200 ease-out',
          expanded ? 'max-h-[400px]' : 'max-h-0',
        )}
      >
        <ul className="ml-3 flex flex-col gap-0.5 border-l border-brand-green-dark/10 pl-3">
          {companyMenuLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-md px-3 py-2 text-sm text-brand-graphite/70 transition-colors hover:bg-brand-light-bg hover:text-brand-green"
                onClick={onNavigate}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
