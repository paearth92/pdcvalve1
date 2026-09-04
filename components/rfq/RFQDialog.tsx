'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useRFQ } from '@/components/rfq/RFQProvider';
import RFQForm from '@/components/rfq/RFQForm';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function RFQDialog() {
  const { isOpen, productContext, closeRFQ } = useRFQ();
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  // Remember what had focus so it can be handed back on close.
  useEffect(() => {
    if (!isOpen) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    return () => {
      restoreFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  // Lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Move focus into the dialog once it mounts.
  useEffect(() => {
    if (!isOpen) return;
    const panel = panelRef.current;
    if (!panel) return;
    // Skip controls hidden at the current breakpoint — focusing a
    // `display:none` element silently does nothing and strands the user.
    const first = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).find(
      (el) => el.offsetParent !== null,
    );
    (first ?? panel).focus({ preventScroll: true });
  }, [isOpen]);

  // Escape to close, and keep Tab inside the dialog.
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        closeRFQ();
        return;
      }
      if (e.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;
      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const activeEl = document.activeElement as HTMLElement | null;

      if (e.shiftKey && (activeEl === first || activeEl === panel)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && activeEl === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [closeRFQ],
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-stretch justify-center sm:items-center sm:p-4 lg:p-6"
      onKeyDown={onKeyDown}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#04120b]/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={closeRFQ}
        aria-hidden="true"
      />

      {/* Panel — full-bleed sheet on phones, centred card from `sm` up. */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="rfq-title"
        tabIndex={-1}
        className="relative z-10 flex h-full w-full flex-col overflow-hidden bg-white shadow-2xl outline-none animate-in fade-in slide-in-from-bottom-4 duration-300 sm:h-auto sm:max-h-[min(92vh,860px)] sm:max-w-5xl sm:rounded-2xl"
      >
        <RFQForm
          productFamily={productContext.productFamily}
          product={productContext.product}
          series={productContext.series}
          onSubmit={() => {}}
          onClose={closeRFQ}
        />
      </div>
    </div>
  );
}
