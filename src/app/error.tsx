'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-semibold mb-3">Что-то пошло не так</h1>
        <p className="text-stone-600 dark:text-stone-400 mb-6 text-sm">
          {error.message || 'Ошибка загрузки страницы'}
        </p>
        <button
          type="button"
          onClick={reset}
          className="rounded-xl bg-buryat-green px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          Попробовать снова
        </button>
      </div>
    </div>
  );
}
