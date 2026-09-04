import { ArrowDownRight } from 'lucide-react';

const variantCode: Record<string, string> = {
  about: 'COMPANY / 01',
  engineering: 'ENGINEERING / 02',
  manufacturing: 'MANUFACTURING / 03',
  quality: 'QUALITY / 04',
  location: 'LOCATION / 05',
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
  const code = variantCode[variant] ?? 'PDC / COMPANY';

  return (
    <section className="relative overflow-hidden bg-brand-green-dark text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(22,132,71,0.18),transparent_24%),linear-gradient(120deg,rgba(255,255,255,0.025),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <div className="relative mx-auto grid min-h-[300px] max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-[1fr_0.7fr] lg:px-8 lg:py-14">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-brand-green" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-green">
              {eyebrow}
            </span>
          </div>

          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] sm:text-[2.8rem] lg:text-[3.25rem]">
            {title}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/62 sm:text-[15px] sm:leading-7">
            {description}
          </p>
        </div>

        <div className="relative hidden h-[178px] lg:block">
          <div className="absolute right-0 top-1/2 h-[150px] w-[150px] -translate-y-1/2 rounded-full border border-white/10" />
          <div className="absolute right-[38px] top-1/2 h-[76px] w-[76px] -translate-y-1/2 rounded-full border border-brand-green/45" />
          <div className="absolute right-[73px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-brand-green shadow-[0_0_16px_rgba(22,132,71,0.75)]" />
          <div className="absolute right-[149px] top-1/2 h-px w-[160px] -translate-y-1/2 bg-gradient-to-l from-white/22 to-transparent" />
          <div className="absolute right-[238px] top-[46px] h-[88px] w-px bg-white/8" />
          <div className="absolute bottom-0 right-0 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.18em] text-white/28">
            <span>{code}</span>
            <span className="h-px w-12 bg-white/12" />
            <ArrowDownRight className="h-3.5 w-3.5 text-brand-green" />
          </div>
        </div>
      </div>
    </section>
  );
}