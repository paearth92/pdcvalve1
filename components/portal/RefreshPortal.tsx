'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';

export function RefreshPortal() {
  const router = useRouter();
  const [refreshing, startTransition] = useTransition();

  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState === 'visible' && !refreshing) {
        startTransition(() => router.refresh());
      }
    };
    const interval = window.setInterval(refresh, 12_000);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, [router, refreshing]);

  return null;
}
