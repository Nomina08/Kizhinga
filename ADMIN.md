# Админка сайта (Decap CMS)

Редактирование контента и фото через браузер: **Места**, **Музеи**, **События**, **Люди**, **Галерея** и др.

---

## Быстрый старт (на своём компьютере)

1. Установите зависимости: `npm install`
2. Сгенерируйте контент: `npm run content:bundle`
3. Запустите сайт: `npm run dev`
4. В **втором** терминале: `npm run cms:dev` ← **обязательно для загрузки фото**
   (запускает decap-server + прокси для ссылок из интернета)
5. Откройте: **http://localhost:3000/admin/index.html**

   (или **http://localhost:3000/admin/** — перенаправит автоматически)

В локальном режиме вход через GitHub **не нужен** — изменения пишутся сразу в папку `content/`.

После правок:

```bash
npm run content:bundle
npm run dev
```

Проверьте сайт, затем закоммитьте `content/` и `public/images/uploads/`.

---

## Опубликованный сайт (GitHub Pages)

Админка: **https://nomina08.github.io/Kizhinga/admin/**

Для входа через GitHub нужен **OAuth** (один раз настроить):

### Шаг 1. GitHub OAuth App

1. GitHub → **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**
2. Заполните:
   - **Application name:** Kizhinga CMS
   - **Homepage URL:** `https://nomina08.github.io/Kizhinga`
   - **Authorization callback URL:** `https://api.netlify.com/auth/done`  
     (стандартный callback для бесплатного OAuth-моста Netlify)
3. Сохраните **Client ID** и **Client Secret**

### Шаг 2. OAuth-мост на Netlify (бесплатно)

1. Нажмите [Deploy to Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/DecapCMS/netlify-cms-oauth-provider-node)  
   или разверните [netlify-cms-oauth-provider-node](https://github.com/DecapCMS/netlify-cms-oauth-provider-node)
2. В переменных окружения Netlify укажите:
   - `GITHUB_CLIENT_ID` — из шага 1
   - `GITHUB_CLIENT_SECRET` — из шага 1
3. Запомните URL приложения, например: `https://kizhinga-oauth.netlify.app`

### Шаг 3. Обновите config.yml

В файле `public/admin/config.yml` раскомментируйте и подставьте URL:

```yaml
backend:
  name: github
  repo: Nomina08/Kizhinga
  branch: main
  base_url: https://ВАШ-OAUTH.netlify.app
  auth_endpoint: auth
```

Закоммитьте и запушьте — после деплоя кнопка «Login with GitHub» заработает.

---

## Как работает обновление

1. Вы меняете текст или загружаете фото в `/admin/`
2. Нажимаете **Publish**
3. Decap CMS создаёт коммит в GitHub (`content/…` и `public/images/uploads/…`)
4. GitHub Actions пересобирает сайт (`npm run build` → GitHub Pages)
5. Через 1–3 минуты изменения видны на сайте

---

## Где что лежит

| В админке | Папка | Что меняется |
|-----------|--------|--------------|
| Места | `content/landmarks/` | Достопримечательности, фото, координаты |
| Музеи | `content/museums/` | Музеи района |
| Люди | `content/people/` | Биографии |
| События | `content/events/` | Праздники и мероприятия |
| Культура / Природа | `content/culture/`, `content/nature/` | Тематические статьи |
| Галерея | `content/gallery/` | Фото на странице «Галерея» |
| Настройки сайта | `content/settings/site.json` | Статистика, маршруты, население |

Загруженные фото: **`public/images/uploads/`**

---

## Советы по фото

### Копировать картинку из интернета (рекомендуется)

1. Найдите фото в браузере (Google, Wikipedia, любой сайт)
2. **ПКМ по картинке** → **«Копировать изображение»** (не «Копировать ссылку»!)
3. В админке откройте запись → поле **«Фото»**
4. **Кликните** в пунктирную область и нажмите **Ctrl+V**

### Другие способы

- **По ссылке:** вставьте URL картинки в поле «Загрузить по ссылке» (если сайт блокирует — используйте Ctrl+V)
- **Перетаскивание:** перетащите файл с компьютера в область загрузки
- **Выбор файла:** кнопка «Выбрать файл»

- Формат: **JPG** или **WebP**
- Ширина: **1200–1600 px**
- Размер файла: до **500 KB** (сожмите в [Squoosh](https://squoosh.app) при необходимости)
- В админке: поле **Фото** → **Choose an image** или перетащите файл

---

## Команды

| Команда | Описание |
|---------|----------|
| `npm run cms:dev` | Локальная админка + загрузка фото (рекомендуется) |
| `npm run cms:local` | Только decap-server (без загрузки по URL) |
| `npm run cms:images` | Только прокси для ссылок на фото |
| `npm run content:bundle` | Собрать JSON для сайта из `content/` |
| `npm run content:seed` | Первичное заполнение `content/` (редко) |
| `npm run build` | Сборка сайта (bundle + Next.js) |

---

## Проблемы

**«Failed to load config.yml»** — проверьте, что файл есть в `public/admin/config.yml` и задеплоен.

**Не пускает в админку на GitHub Pages** — не настроен OAuth (шаги 1–3).

**Фото не отображается** — дождитесь деплоя; путь должен начинаться с `/images/uploads/…`.

**Локально фото не видно** — выполните `npm run content:bundle` после сохранения в админке.
