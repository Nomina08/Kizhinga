import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-semibold mb-3">Страница не найдена</h1>
        <p className="text-stone-600 dark:text-stone-400 mb-6">Такой страницы нет на сайте.</p>
        <Link
          href="/"
          className="inline-block rounded-xl bg-buryat-green px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}
