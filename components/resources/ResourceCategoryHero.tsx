import { FileText, Box, Wrench, Award, FileCode, Layers } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ResourceCategoryDef } from '@/data/resources/registry';

const iconMap: Record<string, LucideIcon> = {
  FileText,
  ClipboardList: FileText,
  Wrench,
  Box,
  Award,
  FileCode,
  Layers,
};

interface ResourceCategoryHeroProps {
  category: ResourceCategoryDef;
  resourceCount: number;
}

export default function ResourceCategoryHero({
  category,
  resourceCount,
}: ResourceCategoryHeroProps) {
  const Icon = iconMap[category.icon] ?? FileText;

  return (
    <section className="relative overflow-hidden bg-brand-green-dark text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(22,132,71,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(57,117,138,0.12),transparent_50%)]" />
      <div className="blueprint-grid absolute inset-0 opacity-50" />
      <div className="noise-overlay absolute inset-0 opacity-[0.035] mix-blend-overlay" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-green/40 bg-brand-green/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-brand-green">
            <Icon className="h-3.5 w-3.5" />
            {category.shortLabel}
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl">
            {category.label}
          </h1>

          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/65">
            {category.description}
          </p>

          <div className="mt-8 flex items-center gap-4 text-sm text-white/50">
            <span>
              <span className="font-bold text-white/80">{resourceCount}</span>{' '}
              {resourceCount === 1 ? 'document' : 'documents'} available
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
