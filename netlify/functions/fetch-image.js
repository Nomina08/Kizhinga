/**
 * Netlify: скачать картинку по URL для админки (production).
 */
function extensionFromContentType(contentType) {
  if (contentType.includes('png')) return 'png';
  if (contentType.includes('webp')) return 'webp';
  if (contentType.includes('gif')) return 'gif';
  if (contentType.includes('svg')) return 'svg';
  return 'jpg';
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { url } = JSON.parse(event.body || '{}');
    if (!url || !/^https?:\/\//i.test(url)) {
      return json(400, { error: 'Некорректная ссылка' });
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; KizhingaCMS/1.0)',
        Accept: 'image/*,*/*',
      },
      redirect: 'follow',
    });

    if (!response.ok) {
      return json(502, { error: 'Не удалось скачать изображение' });
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    if (!contentType.startsWith('image/')) {
      return json(400, { error: 'Ссылка не ведёт на изображение' });
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.length > 5 * 1024 * 1024) {
      return json(413, { error: 'Файл больше 5 МБ' });
    }

    const filename = `web-${Date.now()}.${extensionFromContentType(contentType)}`;

    return json(200, {
      filename,
      contentType,
      base64: buffer.toString('base64'),
    });
  } catch {
    return json(502, { error: 'Не удалось скачать изображение' });
  }
};

function json(status, data) {
  return {
    statusCode: status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
  };
}
