'use client';

import { useRef, useState, useCallback } from 'react';
import { UploadCloud, FileText, Image as ImageIcon, Archive, X, FileCode } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { RFQAttachment } from '@/types/rfq';
import {
  ACCEPTED_FILE_TYPES,
  ACCEPTED_EXTENSIONS,
  MAX_FILE_SIZE,
  MAX_FILES,
} from '@/types/rfq';

function fileIcon(name: string, type: string) {
  const ext = name.split('.').pop()?.toLowerCase() ?? '';
  if (['dwg', 'cad', 'step', 'stp', 'iges', 'igs'].includes(ext)) return FileCode;
  if (['zip'].includes(ext) || type.includes('zip')) return Archive;
  if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext) || type.startsWith('image/')) return ImageIcon;
  return FileText;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isAccepted(file: File): boolean {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
  const acceptedExts = ['pdf', 'dwg', 'step', 'stp', 'iges', 'igs', 'cad', 'png', 'jpg', 'jpeg', 'gif', 'webp', 'zip'];
  if (acceptedExts.includes(ext)) return true;
  return ACCEPTED_FILE_TYPES.includes(file.type);
}

export default function FileUpload({
  attachments,
  onAdd,
  onRemove,
}: {
  attachments: RFQAttachment[];
  onAdd: (files: File[]) => void;
  onRemove: (id: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      setError(null);

      const incoming = Array.from(files);
      const valid: File[] = [];
      const rejected: string[] = [];

      for (const file of incoming) {
        if (!isAccepted(file)) {
          rejected.push(`${file.name} (unsupported type)`);
          continue;
        }
        if (file.size > MAX_FILE_SIZE) {
          rejected.push(`${file.name} (exceeds 25 MB)`);
          continue;
        }
        valid.push(file);
      }

      const remainingSlots = MAX_FILES - attachments.length;
      if (valid.length > remainingSlots) {
        valid.splice(remainingSlots);
        setError(`Maximum ${MAX_FILES} files. Only the first ${remainingSlots} were added.`);
      }

      if (rejected.length > 0 && !error) {
        setError(`Skipped: ${rejected.join(', ')}`);
      }

      if (valid.length > 0) {
        onAdd(valid);
      }
    },
    [attachments.length, onAdd, error],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Upload files by clicking or dragging"
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-12 text-center transition-all',
          isDragging
            ? 'border-brand-green bg-brand-green/5'
            : 'border-brand-green-dark/15 bg-brand-light-bg/50 hover:border-brand-green/30 hover:bg-brand-light-bg',
        )}
      >
        <span
          className={cn(
            'flex h-14 w-14 items-center justify-center rounded-full border transition-colors',
            isDragging
              ? 'border-brand-green bg-brand-green/10 text-brand-green'
              : 'border-brand-green-dark/15 bg-white text-brand-green-dark/60',
          )}
        >
          <UploadCloud className="h-7 w-7" />
        </span>
        <div>
          <p className="text-sm font-bold text-brand-green-dark">
            Drag and drop files here, or click to browse
          </p>
          <p className="mt-1 text-xs text-brand-steel/60">
            PDF, DWG, STEP, CAD, Images, ZIP — up to 25 MB each, max {MAX_FILES} files
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED_EXTENSIONS}
          className="hidden"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = '';
          }}
        />
      </div>

      {/* Error message */}
      {error && (
        <p className="text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      )}

      {/* Attachment list */}
      {attachments.length > 0 && (
        <div className="flex flex-col gap-2">
          {attachments.map((att) => {
            const Icon = fileIcon(att.name, att.type);
            return (
              <div
                key={att.id}
                className="flex items-center gap-3 rounded-lg border border-brand-green-dark/10 bg-white p-3"
              >
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-brand-green-dark/10 bg-brand-light-bg text-brand-green-dark/70">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-brand-green-dark">
                    {att.name}
                  </p>
                  <p className="text-xs text-brand-steel/60">
                    {formatSize(att.size)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(att.id)}
                  className="flex-shrink-0 rounded-md p-1.5 text-brand-steel/50 transition-colors hover:bg-red-50 hover:text-red-600"
                  aria-label={`Remove ${att.name}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
