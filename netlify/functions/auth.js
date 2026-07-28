const SCOPES = 'repo';

exports.handler = async () => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const siteUrl = process.env.URL;

  if (!clientId || !process.env.GITHUB_CLIENT_SECRET || !siteUrl) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      body: 'OAuth is not configured on Netlify (GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET).',
    };
  }

  const state = crypto.randomUUID();
  const redirectUri = `${siteUrl}/callback`;
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: SCOPES,
    state,
  });

  return {
    statusCode: 302,
    headers: {
      Location: `https://github.com/login/oauth/authorize?${params}`,
      'Set-Cookie': `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    },
  };
};
