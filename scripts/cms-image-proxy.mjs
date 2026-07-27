/**
 * Прокси для загрузки изображений по URL в public/images/uploads/
 * Запуск: npm run cms:dev
 */
import http from 'http';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const uploadDir = path.join(root, 'public', 'images', 'uploads');
const publicPrefix = '/images/uploads';
const port = parseInt(process.env.CMS_IMAGE_PORT || '8082', 10);

function extensionFromContentType(contentType) {
  if (contentType.includes('png')) return 'png';
  if (contentType.includes('webp')) return 'webp';
  if (contentType.includes('gif')) return 'gif';
  if (contentType.includes('svg')) return 'svg';
  return 'jpg';
}

function sendJson(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url === '/health') {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.method !== 'POST' || req.url !== '/fetch-image') {
    sendJson(res, 404, { error: 'Not found' });
    return;
  }

  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
    if (body.length > 1_000_000) req.destroy();
  });

  req.on('end', async () => {
    try {
      const parsed = JSON.parse(body || '{}');
      const url = String(parsed.url || '').trim();

      if (!url || !/^https?:\/\//i.test(url)) {
        sendJson(res, 400, { error: 'Некорректная ссылка' });
        return;
      }

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; KizhingaCMS/1.0)',
          Accept: 'image/*,*/*',
        },
        redirect: 'follow',
      });

      if (!response.ok) {
        sendJson(res, 502, { error: 'Не удалось скачать изображение' });
        return;
      }

      const contentType = response.headers.get('content-type') || 'image/jpeg';
      if (!contentType.startsWith('image/')) {
        sendJson(res, 400, { error: 'Ссылка не ведёт на изображение' });
        return;
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      if (buffer.length > 5 * 1024 * 1024) {
        sendJson(res, 413, { error: 'Файл больше 5 МБ' });
        return;
      }

      await fs.mkdir(uploadDir, { recursive: true });
      const filename = `web-${Date.now()}.${extensionFromContentType(contentType)}`;
      await fs.writeFile(path.join(uploadDir, filename), buffer);

      sendJson(res, 200, { path: `${publicPrefix}/${filename}` });
    } catch {
      sendJson(res, 502, { error: 'Не удалось скачать изображение' });
    }
  });
});

server.listen(port, () => {
  console.log(`CMS image proxy: http://localhost:${port}`);
});
