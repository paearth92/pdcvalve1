'use client';

import { ArrowRight, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRFQ } from '@/components/rfq/RFQProvider';
import type { RFQProductContext } from '@/types/rfq';

export interface RFQButtonProps {
  productFamily?: string;
  product?: string;
  series?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
  icon?: 'arrow' | 'file' | 'none';
}

export default function RFQButton({
  productFamily,
  product,
  series,
  variant = 'primary',
  size = 'md',
  className,
  children = 'Request a Quote',
  icon = 'arrow',
}: RFQButtonProps) {
  const { openRFQ } = useRFQ();

  const context: RFQProductContext = {
    productFamily,
    product,
    series,
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-7 py-3.5 text-sm',
  };

  const variantClasses = {
    primary:
      'bg-brand-green text-white shadow-sm hover:bg-brand-green-dark hover:shadow-md',
    secondary:
      'border border-brand-green-dark/20 bg-white text-brand-green-dark hover:border-brand-green hover:text-brand-green',
    outline:
      'border border-white/20 bg-white/5 text-white/85 backdrop-blur-sm hover:bg-white/10 hover:text-white',
  };

  const Icon = icon === 'arrow' ? ArrowRight : icon === 'file' ? FileText : null;

  return (
    <button
      type="button"
      onClick={() => openRFQ(context)}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40',
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
    >
      {children}
      {Icon && <Icon className="h-4 w-4" />}
    </button>
  );
}
