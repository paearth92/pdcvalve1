import Link from 'next/link';
import { FileText, Box, Wrench, Award, FileCode, Layers, ArrowRight } from 'lucide-react';
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

interface ResourceCategoryCardProps {
  category: ResourceCategoryDef;
  count: number;
}

export default function ResourceCategoryCard({
  category,
  count,
}: ResourceCategoryCardProps) {
  const Icon = iconMap[category.icon] ?? FileText;

  return (
    <Link
      href={category.href}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-brand-green-dark/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/30 hover:shadow-lg hover:shadow-brand-green-dark/5"
    >
      {/* Icon */}
      <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-brand-green-dark/15 bg-brand-light-bg text-brand-green-dark transition-all duration-300 group-hover:scale-110 group-hover:border-brand-green/30 group-hover:text-brand-green">
        <Icon className="h-6 w-6" />
      </span>

      {/* Title */}
      <h3 className="mt-5 text-lg font-bold tracking-tight text-brand-green-dark">
        {category.label}
      </h3>

      {/* Description */}
      <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-graphite/60">
        {category.description}
      </p>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-brand-green-dark/8 pt-4">
        <span className="text-xs font-semibold text-brand-steel/70">
          {count} {count === 1 ? 'document' : 'documents'}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-green transition-all group-hover:gap-2">
          Browse
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
