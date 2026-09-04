'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowRight, Wrench } from 'lucide-react';
import { siteConfig } from '@/data/site';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

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

      <div className="relative mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <span className="flex h-20 w-20 items-center justify-center rounded-full border border-red-200 bg-white text-red-500 shadow-sm">
          <AlertCircle className="h-10 w-10" />
        </span>

        <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-brand-green-dark sm:text-4xl">
          Something Went Wrong
        </h1>
        <div className="mx-auto mt-4 h-px w-16 bg-brand-green/40" />
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-brand-graphite/70">
          An unexpected error occurred while loading this page. Please try
          again, or contact our engineering team if the problem persists.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-green px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-green-dark hover:shadow-md"
          >
            Try Again
            <ArrowRight className="h-4 w-4" />
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-brand-green-dark/20 bg-white px-6 py-3 text-sm font-semibold text-brand-green-dark transition-all hover:border-brand-green hover:text-brand-green"
          >
            Return Home
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
