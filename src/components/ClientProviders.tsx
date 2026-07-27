'use client';

import { useEffect } from 'react';
import { AppProvider } from '@/context/AppContext';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add('js');
  }, []);

  return <AppProvider>{children}</AppProvider>;
}
