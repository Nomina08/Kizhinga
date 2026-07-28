const SITE_URL =
  process.env.URL ||
  process.env.DEPLOY_PRIME_URL ||
  'https://coruscating-belekoy-b3081d.netlify.app';

function getOAuthConfig() {
  const clientId = process.env.GITHUB_CLIENT_ID || process.env.OAUTH_CLIENT_ID;
  const clientSecret =
    process.env.GITHUB_CLIENT_SECRET || process.env.OAUTH_CLIENT_SECRET;

  return { clientId, clientSecret, siteUrl: SITE_URL };
}

function errorPage(message) {
  const safe = String(message).replace(/</g, '&lt;');
  return {
    statusCode: 400,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
    body: `<!DOCTYPE html><html><body><p>Authentication Error: ${safe}</p></body></html>`,
  };
}

function successPage(token) {
  const payload = JSON.stringify({ token, provider: 'github' });
  const message = `authorization:github:success:${payload}`;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Set-Cookie': 'oauth_state=; Path=/; HttpOnly; Secure; Max-Age=0',
    },
    body: `<!DOCTYPE html><html><body><script>
(function () {
  var msg = ${JSON.stringify(message)};
  function receiveMessage(e) {
    window.opener.postMessage(msg, e.origin);
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script></body></html>`,
  };
}

exports.handler = async (event) => {
  const params = event.queryStringParameters || {};
  const { code, state, error, error_description: errorDescription } = params;

  if (error) {
    return errorPage(errorDescription || error);
  }

  const cookieHeader = event.headers.cookie || '';
  const match = cookieHeader.match(/oauth_state=([^;]+)/);
  const savedState = match ? match[1] : null;

  if (!state || !savedState || state !== savedState) {
    return errorPage('Invalid state key');
  }

  if (!code) {
    return errorPage('Missing authorization code');
  }

  const { clientId, clientSecret, siteUrl } = getOAuthConfig();

  if (!clientId || !clientSecret) {
    return errorPage('OAuth is not configured on Netlify');
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: `${siteUrl}/callback`,
    }),
  });

  const tokenData = await tokenRes.json();

  if (tokenData.error || !tokenData.access_token) {
    return errorPage(tokenData.error_description || tokenData.error || 'Token exchange failed');
  }

  return successPage(tokenData.access_token);
};
