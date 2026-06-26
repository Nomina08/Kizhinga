import type { Metadata } from 'next';
import { ClientProviders } from '@/components/ClientProviders';
import './globals.css';

export const metadata: Metadata = {
  title: 'Кижинга — Виртуальный тур',
  description:
    'Виртуальный тур по Кижингинскому району Республики Бурятия',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="min-h-screen font-sans bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
