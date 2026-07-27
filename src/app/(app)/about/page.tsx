'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AboutRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <div className="flex min-h-[40vh] items-center justify-center px-4 text-sm text-stone-500">
      Перенаправление на главную…
    </div>
  );
}
