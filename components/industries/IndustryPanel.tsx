import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { IndustryIcon } from '@/components/icons/IndustryIcons';
import type { Industry } from '@/types/site';

export default function IndustryPanel({ industry }: { industry: Industry }) {
  return (
    <Link
      href={`/industries/${industry.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-none border-b border-brand-green-dark/10 bg-brand-green-dark transition-all duration-300 hover:border-brand-green/40 hover:shadow-xl hover:shadow-brand-green-dark/20 sm:rounded-xl sm:border"
    >
      {/* Background image — shown clearly, fades into green below */}
      <div className="relative h-32 overflow-hidden">
        <Image
          src={industry.image}
          alt={industry.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Smooth fade from photo (top) into green card body (bottom) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-green-dark" />
      </div>

      {/* Content */}
      <div className="relative flex flex-1 flex-col p-4">
        {/* Icon + arrow */}
        <div className="flex items-center justify-between">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-green/30 bg-brand-green/10 text-brand-green">
            <IndustryIcon slug={industry.slug} className="h-5 w-5" />
          </span>
          <ArrowUpRight className="h-4 w-4 text-white/40 transition-all duration-300 group-hover:text-brand-green group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        {/* Industry name */}
        <h3 className="mt-3 text-base font-bold tracking-tight text-white">
          {industry.name}
        </h3>

        {/* Divider */}
        <div className="mt-1.5 h-px w-6 bg-brand-green/50" />

        {/* Description */}
        <p className="mt-2 text-xs leading-relaxed text-white/60">
          {industry.description}
        </p>
      </div>
    </Link>
  );
}
