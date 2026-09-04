import { Download, FileQuestion, Clock, Mail } from 'lucide-react';
import type { DownloadStatus } from '@/types/content';
import { cn } from '@/lib/utils';

interface DownloadButtonProps {
  status: DownloadStatus;
  href?: string | null;
  fileName?: string | null;
  className?: string;
  fullWidth?: boolean;
  size?: 'sm' | 'md';
}

export default function DownloadButton({
  status,
  href,
  fileName,
  className,
  fullWidth = false,
  size = 'sm',
}: DownloadButtonProps) {
  const sizeClasses = size === 'sm' ? 'px-4 py-2.5 text-sm' : 'px-5 py-3 text-sm';
  const widthClass = fullWidth ? 'w-full' : '';

  if (status === 'available' && href) {
    return (
      <a
        href={href}
        download={fileName ?? undefined}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-md border border-brand-green/30 bg-brand-green/10 font-semibold text-brand-green-dark transition-colors hover:bg-brand-green/20',
          sizeClasses,
          widthClass,
          className,
        )}
      >
        <Download className="h-4 w-4" />
        Download
      </a>
    );
  }

  if (status === 'coming-soon') {
    return (
      <span
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-md border border-brand-steel/20 bg-brand-steel/5 font-semibold text-brand-steel/60',
          sizeClasses,
          widthClass,
          className,
        )}
      >
        <Clock className="h-4 w-4" />
        Coming Soon
      </span>
    );
  }

  if (status === 'upon-request') {
    return (
      <a
        href="mailto:engineering@pdcvalve.com?subject=Engineering Document Request"
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-md border border-brand-green-dark/15 bg-brand-light-bg font-semibold text-brand-steel transition-colors hover:border-brand-green/30 hover:text-brand-green-dark',
          sizeClasses,
          widthClass,
          className,
        )}
      >
        <Mail className="h-4 w-4" />
        Available Upon Request
      </a>
    );
  }

  // unavailable
  return (
    <span
      className={cn(
        'inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-md border border-brand-green-dark/15 bg-brand-light-bg font-semibold text-brand-steel/60',
        sizeClasses,
        widthClass,
        className,
      )}
      title="Document will be available once verified content is uploaded"
    >
      <FileQuestion className="h-4 w-4" />
      Available Upon Request
    </span>
  );
}
