import Link from 'next/link';
import { ArrowRight, PackageSearch, Wrench } from 'lucide-react';
import { siteConfig } from '@/data/site';

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-brand-light-bg">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(7,61,43,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(7,61,43,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(22,132,71,0.05),transparent_60%)]" />

      <div className="relative mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <span className="flex h-20 w-20 items-center justify-center rounded-full border border-brand-green-dark/10 bg-white text-brand-steel/60 shadow-sm">
          <PackageSearch className="h-10 w-10" />
        </span>

        <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
          Error 404
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-brand-green-dark sm:text-5xl">
          Page Not Found
        </h1>
        <div className="mx-auto mt-4 h-px w-16 bg-brand-green/40" />
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-brand-graphite/70">
          The page you are looking for may have been moved or is no longer
          available. Use the options below to find what you need.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-green px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-green-dark hover:shadow-md"
          >
            Return Home
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-brand-green-dark/20 bg-white px-6 py-3 text-sm font-semibold text-brand-green-dark transition-all hover:border-brand-green hover:text-brand-green"
          >
            Browse Products
          </Link>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-brand-green-dark/20 bg-white px-6 py-3 text-sm font-semibold text-brand-green-dark transition-all hover:border-brand-green hover:text-brand-green"
          >
            <Wrench className="h-4 w-4" />
            Contact Engineering
          </a>
        </div>
      </div>
    </section>
  );
}
