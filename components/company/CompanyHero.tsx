const heroSurfaces: Record<string, { background: string; fold: string }> = {
  about: {
    background:
      'radial-gradient(ellipse at 84% 34%, rgba(107, 163, 114, 0.2), transparent 42%), repeating-linear-gradient(128deg, rgba(255,255,255,0.019) 0 1px, transparent 1px 7px), repeating-linear-gradient(38deg, rgba(0,0,0,0.035) 0 1px, transparent 1px 8px), linear-gradient(122deg, #123a28, #194831 58%, #102f22)',
    fold: 'rotate-[21deg]',
  },
  engineering: {
    background:
      'radial-gradient(ellipse at 82% 30%, rgba(91, 159, 144, 0.2), transparent 42%), repeating-linear-gradient(116deg, rgba(255,255,255,0.019) 0 1px, transparent 1px 7px), repeating-linear-gradient(26deg, rgba(0,0,0,0.035) 0 1px, transparent 1px 8px), linear-gradient(122deg, #12372c, #17483a 58%, #102e27)',
    fold: 'rotate-[-17deg]',
  },
  manufacturing: {
    background:
      'radial-gradient(ellipse at 82% 33%, rgba(177, 154, 101, 0.16), transparent 42%), repeating-linear-gradient(139deg, rgba(255,255,255,0.019) 0 1px, transparent 1px 7px), repeating-linear-gradient(49deg, rgba(0,0,0,0.035) 0 1px, transparent 1px 8px), linear-gradient(122deg, #173b2a, #214b35 58%, #102e22)',
    fold: 'rotate-[13deg]',
  },
  quality: {
    background:
      'radial-gradient(ellipse at 84% 32%, rgba(150, 174, 143, 0.2), transparent 42%), repeating-linear-gradient(121deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 7px), repeating-linear-gradient(31deg, rgba(0,0,0,0.035) 0 1px, transparent 1px 8px), linear-gradient(122deg, #153a2b, #1d4933 58%, #102f22)',
    fold: 'rotate-[-24deg]',
  },
  location: {
    background:
      'radial-gradient(ellipse at 83% 33%, rgba(87, 159, 155, 0.19), transparent 42%), repeating-linear-gradient(146deg, rgba(255,255,255,0.019) 0 1px, transparent 1px 7px), repeating-linear-gradient(56deg, rgba(0,0,0,0.035) 0 1px, transparent 1px 8px), linear-gradient(122deg, #12382c, #17463e 58%, #102e28)',
    fold: 'rotate-[28deg]',
  },
  distributors: {
    background:
      'radial-gradient(ellipse at 84% 32%, rgba(120, 168, 111, 0.2), transparent 42%), repeating-linear-gradient(133deg, rgba(255,255,255,0.019) 0 1px, transparent 1px 7px), repeating-linear-gradient(43deg, rgba(0,0,0,0.035) 0 1px, transparent 1px 8px), linear-gradient(122deg, #123a28, #1c4931 58%, #102e22)',
    fold: 'rotate-[17deg]',
  },
  legal: {
    background:
      'radial-gradient(ellipse at 84% 32%, rgba(141, 165, 132, 0.18), transparent 42%), repeating-linear-gradient(126deg, rgba(255,255,255,0.019) 0 1px, transparent 1px 7px), repeating-linear-gradient(36deg, rgba(0,0,0,0.035) 0 1px, transparent 1px 8px), linear-gradient(122deg, #14392a, #1a4732 58%, #102f23)',
    fold: 'rotate-[-20deg]',
  },
};

export default function CompanyHero({
  eyebrow,
  title,
  description,
  variant = 'about',
}: {
  eyebrow: string;
  title: string;
  description: string;
  variant?: string;
}) {
  const surface = heroSurfaces[variant] ?? heroSurfaces.about;

  return (
    <section
      className="relative isolate overflow-hidden bg-brand-green-dark text-white"
      style={{ backgroundImage: surface.background }}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-[12%] -top-[45%] hidden h-[190%] w-[59%] lg:block ${surface.fold}`}
      >
        <div className="absolute inset-0 skew-x-[-11deg] bg-gradient-to-r from-transparent via-white/[0.045] to-black/[0.045]" />
        <div className="absolute inset-y-[-12%] left-[38%] w-[29%] skew-x-[-11deg] border-l border-white/[0.07] bg-gradient-to-r from-transparent via-white/[0.035] to-transparent" />
        <div className="absolute inset-y-[-12%] left-[68%] w-[15%] skew-x-[-11deg] border-l border-black/[0.08] bg-gradient-to-r from-transparent via-black/[0.035] to-transparent" />
      </div>

      <div className="relative mx-auto grid min-h-[300px] max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-[1fr_0.7fr] lg:px-8 lg:py-14">
        <div className="max-w-3xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/75">
            {eyebrow}
          </span>

          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] sm:text-[2.8rem] lg:text-[3.25rem]">
            {title}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/62 sm:text-[15px] sm:leading-7">
            {description}
          </p>
        </div>

        <div aria-hidden="true" className="hidden h-[178px] lg:block" />
      </div>
    </section>
  );
}
