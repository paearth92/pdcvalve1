'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import RFQButton from '@/components/rfq/RFQButton';

export default function MobileQuoteBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-brand-green-dark/10 bg-white/95 px-4 py-3 shadow-lg backdrop-blur transition-transform duration-300 lg:hidden',
        visible ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      <RFQButton size="md" className="w-full" />
    </div>
  );
}
