import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import { ClientProviders } from '@/components/ClientProviders';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const display = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Кижинга — Виртуальный тур',
  description:
    'Виртуальный тур по Кижингинскому району Республики Бурятия — карта, маршруты, легенды и история',
  openGraph: {
    title: 'Кижинга — Сердце Удолии',
    description: 'Виртуальный тур по Кижингинскому району',
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${display.variable} min-h-screen font-sans bg-surface text-stone-900 dark:bg-surface-dark dark:text-stone-100`}
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
