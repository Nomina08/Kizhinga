# Виртуальный тур по Кижингинскому району

Одностраничное веб-приложение (SPA) «Кижинга — Сердце Удолии» — интерактивный виртуальный тур по достопримечательностям Кижингинского района Республики Бурятия.

## Стек

- **Next.js 14** (App Router, статический экспорт)
- **TypeScript**
- **Tailwind CSS** + **Framer Motion**
- **Leaflet.js** + OpenStreetMap
- **Lucide React**
- Данные в `src/data/data.ts`

## Запуск локально

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## Сборка и превью

```bash
npm run build
npm run preview
```

Статические файлы генерируются в папку `out/`.

## Деплой

### Vercel

1. Загрузите репозиторий на GitHub
2. Импортируйте проект на [vercel.com](https://vercel.com)
3. Vercel автоматически определит Next.js — файл `vercel.json` уже настроен

### Netlify

1. Подключите GitHub-репозиторий на [netlify.com](https://netlify.com)
2. Файл `netlify.toml` уже содержит настройки:
   - Build command: `npm run build`
   - Publish directory: `out`

### GitHub Pages

1. В `next.config.js` добавьте `basePath: '/имя-репозитория'` и `assetPrefix: '/имя-репозитория/'`
2. Соберите проект: `npm run build`
3. Опубликуйте содержимое папки `out/` через GitHub Actions или вручную

## Структура

```
src/
├── app/           # Страницы Next.js
├── components/    # UI-компоненты
├── context/       # React Context (тема, маршрут, посещения)
├── data/          # data.ts — все данные приложения
└── types/         # TypeScript-интерфейсы
```

## Настройка

- **GitHub URL**: измените `GITHUB_URL` в `src/data/data.ts`
- **Аудио**: замените `AUDIO_LEGEND_URL` на свой файл в `public/audio/`

## Лицензия

MIT
