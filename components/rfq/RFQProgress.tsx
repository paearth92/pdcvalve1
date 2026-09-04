'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { RFQStep } from '@/types/rfq';

export default function RFQProgress({
  steps,
  currentIndex,
  onStepClick,
  maxReachedIndex,
}: {
  steps: RFQStep[];
  currentIndex: number;
  onStepClick?: (index: number) => void;
  maxReachedIndex: number;
}) {
  return (
    <nav aria-label="RFQ progress">
      {/* Desktop: horizontal sticky bar */}
      <div className="hidden lg:flex items-center gap-2">
        {steps.map((step, i) => {
          const isComplete = i < currentIndex;
          const isCurrent = i === currentIndex;
          const isClickable = onStepClick && i <= maxReachedIndex && i !== currentIndex;

          return (
            <div key={step.id} className="flex flex-1 items-center gap-2">
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick?.(i)}
                className={cn(
                  'flex flex-1 items-center gap-3 rounded-lg border px-4 py-3 text-left transition-all',
                  isCurrent
                    ? 'border-brand-green/40 bg-brand-green/5 shadow-sm'
                    : isComplete
                      ? 'border-brand-green-dark/10 bg-white'
                      : 'border-brand-green-dark/8 bg-brand-light-bg/30',
                  isClickable && 'cursor-pointer hover:border-brand-green/30',
                  !isClickable && 'cursor-default',
                )}
              >
                <span
                  className={cn(
                    'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all',
                    isComplete
                      ? 'bg-brand-green text-white'
                      : isCurrent
                        ? 'border-2 border-brand-green bg-white text-brand-green'
                        : 'border border-brand-green-dark/15 bg-brand-light-bg text-brand-steel/50',
                  )}
                >
                  {isComplete ? <Check className="h-4 w-4" /> : step.number}
                </span>
                <div className="min-w-0">
                  <p
                    className={cn(
                      'truncate text-xs font-bold uppercase tracking-wider',
                      isCurrent
                        ? 'text-brand-green'
                        : isComplete
                          ? 'text-brand-green-dark'
                          : 'text-brand-steel/50',
                    )}
                  >
                    {step.label}
                  </p>
                </div>
              </button>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    'h-px w-4 flex-shrink-0',
                    i < currentIndex ? 'bg-brand-green/40' : 'bg-brand-green-dark/10',
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile: compact step indicator */}
      <div className="flex items-center gap-3 lg:hidden">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand-green bg-white text-sm font-bold text-brand-green">
          {currentIndex + 1}
        </span>
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-green">
            Step {currentIndex + 1} of {steps.length}
          </p>
          <p className="text-sm font-bold text-brand-green-dark">
            {steps[currentIndex]?.label}
          </p>
        </div>
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <span
              key={i}
              className={cn(
                'h-1.5 w-6 rounded-full transition-colors',
                i <= currentIndex ? 'bg-brand-green' : 'bg-brand-green-dark/10',
              )}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
