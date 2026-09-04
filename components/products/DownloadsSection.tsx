import {
  FileText,
  Box,
  Wrench,
  Award,
  ArrowUpRight,
  Lock,
  Clipboard,
  Ruler,
  ScrollText,
  BookOpen,
  Download,
} from 'lucide-react';
import type { ProductDownload } from '@/types/product';
import type { DownloadFileType } from '@/types/content';

const iconMap: Partial<Record<DownloadFileType, typeof FileText>> = {
  pdf: FileText,
  datasheet: Clipboard,
  cad: Box,
  step: Box,
  dwg: Ruler,
  'installation-manual': Wrench,
  'maintenance-manual': Wrench,
  certificate: Award,
  'technical-bulletin': ScrollText,
  'application-guide': BookOpen,
  guide: Wrench,
};

const typeLabel: Partial<Record<DownloadFileType, string>> = {
  pdf: 'PDF Document',
  datasheet: 'Technical Datasheet',
  cad: 'CAD Model',
  step: 'STEP File',
  dwg: 'DWG Drawing',
  'installation-manual': 'Installation Manual',
  'maintenance-manual': 'Maintenance Manual',
  certificate: 'Certificate',
  'technical-bulletin': 'Technical Bulletin',
  'application-guide': 'Application Guide',
  guide: 'Installation Guide',
};

function getIcon(type: DownloadFileType) {
  return iconMap[type] ?? FileText;
}

function getLabel(type: DownloadFileType) {
  return typeLabel[type] ?? 'Document';
}

export default function DownloadsSection({
  downloads,
}: {
  downloads: ProductDownload[];
}) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-brand-green-dark/10 bg-white shadow-sm shadow-brand-green-dark/5">
      {downloads.map((dl, index) => {
        const Icon = getIcon(dl.type);
        const isAvailable = !!dl.url;

        const content = (
          <>
            <span
              className={[
                'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border',
                isAvailable
                  ? 'border-brand-green/15 bg-brand-green/8 text-brand-green'
                  : 'border-brand-green-dark/8 bg-brand-light-bg text-brand-steel/45',
              ].join(' ')}
            >
              <Icon className="h-5 w-5" />
            </span>

            <span className="min-w-0 flex-1">
              <span className="block text-[10px] font-extrabold uppercase tracking-[0.15em] text-brand-steel/65">
                {getLabel(dl.type)}
              </span>
              <span className="mt-1 block text-sm font-bold leading-5 text-brand-green-dark sm:text-[15px]">
                {dl.label}
              </span>
            </span>

            <span
              className={[
                'flex h-9 min-w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:min-w-[108px] sm:gap-2 sm:px-3',
                isAvailable
                  ? 'border-brand-green-dark/10 text-brand-green group-hover:border-brand-green group-hover:bg-brand-green group-hover:text-white'
                  : 'border-brand-green-dark/8 text-brand-steel/45',
              ].join(' ')}
            >
              {isAvailable ? (
                <>
                  <span className="hidden text-xs font-bold sm:inline">Download</span>
                  <Download className="h-4 w-4" />
                </>
              ) : (
                <>
                  <span className="hidden text-xs font-bold sm:inline">Coming Soon</span>
                  <Lock className="h-3.5 w-3.5" />
                </>
              )}
            </span>
          </>
        );

        const rowClass = [
          'group flex items-center gap-4 px-4 py-4 transition-colors duration-300 sm:px-5',
          index > 0 ? 'border-t border-brand-green-dark/[0.07]' : '',
          isAvailable ? 'hover:bg-brand-light-bg/45' : 'cursor-not-allowed opacity-70',
        ].join(' ');

        if (!isAvailable) {
          return (
            <div key={dl.filename} className={rowClass} aria-disabled="true">
              {content}
            </div>
          );
        }

        return (
          <a key={dl.filename} href={dl.url} className={rowClass}>
            {content}
          </a>
        );
      })}
    </div>
  );
}