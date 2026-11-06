import Link from 'next/link';
import { ArrowRight, ClipboardList, FileText, Ruler, Settings2 } from 'lucide-react';
import Breadcrumbs from '@/components/products/ProductBreadcrumbs';
import { generateCategoryMetadata } from '@/components/resources/CategoryPageView';

export function generateMetadata() {
  return generateCategoryMetadata('datasheets');
}

export default function DatasheetsPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: 'Technical Data', href: '/resources/datasheets' },
        ]}
      />

      <section className="relative isolate overflow-hidden bg-[#103b29] text-white">
        <div
          aria-hidden="true"
          className="blueprint-grid pointer-events-none absolute inset-0 opacity-40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_15%,rgba(76,170,111,0.22),transparent_48%),linear-gradient(130deg,rgba(6,29,19,0.55),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-white/75">
              <ClipboardList className="h-3.5 w-3.5" />
              Product Resources
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl">
              Technical Data
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/75 sm:text-base">
              Access PDC product specifications, dimensions, materials, torque
              data, Cv information, and other engineering resources for product
              selection and application review.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#168447] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1b9852] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                View Products
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/25 bg-white/5 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Contact PDC Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f8f6] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-graphite/70">
              Product Information
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-brand-green sm:text-3xl">
              Product Engineering Data
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-brand-graphite/70">
              Detailed engineering data is available within individual product
              pages and published PDC product literature.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Ruler, label: 'Dimensions and weights' },
              { icon: Settings2, label: 'Materials of construction' },
              { icon: ClipboardList, label: 'Maximum differential pressure' },
              { icon: Settings2, label: 'Required torque' },
              { icon: FileText, label: 'Cv values' },
              { icon: FileText, label: 'Seat and packing options' },
              { icon: Settings2, label: 'Shaft configurations' },
              { icon: ClipboardList, label: 'Product-specific selection data' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex min-h-[82px] items-center gap-3 rounded-xl border border-brand-green-dark/10 bg-white px-4 py-4 shadow-[0_5px_16px_rgba(18,55,34,0.035)]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eaf3ec] text-brand-green-dark">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold leading-5 text-brand-green-dark">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-green-dark/10 bg-white py-12 sm:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-extrabold tracking-tight text-brand-green sm:text-3xl">
              Looking for Specific Technical Information?
            </h2>
            <p className="mt-3 text-sm leading-6 text-brand-graphite/70 sm:text-base">
              If the information you need is not published online, contact PDC
              Sales. Additional drawings, technical data, product
              documentation, and application-specific information may be
              available upon request.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-green-dark px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
          >
            Contact PDC Sales
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
