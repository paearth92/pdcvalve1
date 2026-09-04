import {
  FileText,
  Box,
  Wrench,
  Award,
  FileCode,
  Layers,
  ScrollText,
  ClipboardList,
  BookOpen,
  FileArchive,
  FileSpreadsheet,
  FileType2,
} from 'lucide-react';
import type { ResourceFileType, ResourceItem } from '@/types/content';
import { fileTypeLabels } from '@/data/resources/registry';
import { resourceFamilyFilters } from '@/data/resources/registry';
import DownloadButton from './DownloadButton';

const iconMap: Record<ResourceFileType, typeof FileText> = {
  pdf: FileText,
  dwg: FileCode,
  dxf: FileCode,
  step: Layers,
  iges: Box,
  zip: FileArchive,
  doc: FileType2,
  xls: FileSpreadsheet,
};

function getFamilyLabel(slug: string): string {
  const match = resourceFamilyFilters.find((f) => f.value === slug);
  return match?.label ?? slug.replace(/-/g, ' ');
}

export default function ResourceCard({
  resource,
}: {
  resource: ResourceItem;
}) {
  const Icon = iconMap[resource.fileType] ?? FileText;
  const status = resource.downloadStatus ?? 'unavailable';

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-brand-green-dark/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/30 hover:shadow-lg hover:shadow-brand-green-dark/5">
      {/* Icon header */}
      <div className="relative flex h-32 items-center justify-center overflow-hidden border-b border-brand-green-dark/8 bg-brand-light-bg">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(7,61,43,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(7,61,43,0.04) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(255,255,255,0.7),transparent_70%)]" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-lg border border-brand-green-dark/15 bg-white/90 text-brand-green-dark shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-brand-green/30 group-hover:text-brand-green">
          <Icon className="h-7 w-7" />
        </span>
        {/* File type badge */}
        <span className="absolute right-3 top-3 rounded-md border border-brand-green-dark/15 bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-steel backdrop-blur-sm">
          {fileTypeLabels[resource.fileType]}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green">
          {resource.documentType}
        </span>
        <h3 className="mt-2 text-[15px] font-bold leading-snug tracking-tight text-brand-green-dark">
          {resource.title}
        </h3>

        {resource.description && (
          <p className="mt-2 text-xs leading-relaxed text-brand-graphite/60">
            {resource.description}
          </p>
        )}

        {/* Metadata */}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-brand-steel/70">
          {resource.productFamily && (
            <span className="inline-flex items-center gap-1">
              <span className="font-semibold text-brand-graphite/60">Family:</span>
              {getFamilyLabel(resource.productFamily)}
            </span>
          )}
          {resource.revision && (
            <span className="inline-flex items-center gap-1">
              <span className="font-semibold text-brand-graphite/60">Rev:</span>
              {resource.revision}
            </span>
          )}
          {resource.fileSize && (
            <span className="inline-flex items-center gap-1">
              <span className="font-semibold text-brand-graphite/60">Size:</span>
              {resource.fileSize}
            </span>
          )}
          {resource.language && (
            <span className="inline-flex items-center gap-1">
              <span className="font-semibold text-brand-graphite/60">Lang:</span>
              {resource.language.toUpperCase()}
            </span>
          )}
        </div>

        {/* Download button */}
        <div className="mt-5 pt-1">
          <DownloadButton
            status={status}
            href={resource.downloadUrl}
            fileName={resource.slug}
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}
