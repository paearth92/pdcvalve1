'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import type { RFQProductContext } from '@/types/rfq';

interface RFQContextValue {
  isOpen: boolean;
  productContext: RFQProductContext;
  openRFQ: (context?: RFQProductContext) => void;
  closeRFQ: () => void;
}

const RFQContext = createContext<RFQContextValue | null>(null);

export function useRFQ(): RFQContextValue {
  const ctx = useContext(RFQContext);
  if (!ctx) {
    throw new Error('useRFQ must be used within an RFQProvider');
  }
  return ctx;
}

export function RFQProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [productContext, setProductContext] = useState<RFQProductContext>({});

  const openRFQ = useCallback((context?: RFQProductContext) => {
    setProductContext(context ?? {});
    setIsOpen(true);
  }, []);

  const closeRFQ = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <RFQContext.Provider value={{ isOpen, productContext, openRFQ, closeRFQ }}>
      {children}
    </RFQContext.Provider>
  );
}
