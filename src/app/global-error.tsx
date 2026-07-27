'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ru">
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Ошибка приложения</h1>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>{error.message}</p>
        <button
          type="button"
          onClick={reset}
          style={{
            background: '#1a6b47',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            padding: '10px 20px',
            cursor: 'pointer',
          }}
        >
          Обновить
        </button>
      </body>
    </html>
  );
}
