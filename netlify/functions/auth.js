const SCOPES = 'repo';
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

exports.handler = async () => {
  const { clientId, clientSecret, siteUrl } = getOAuthConfig();

  if (!clientId || !clientSecret) {
    const missing = [
      !clientId && 'GITHUB_CLIENT_ID',
      !clientSecret && 'GITHUB_CLIENT_SECRET',
    ]
      .filter(Boolean)
      .join(', ');

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      body: `OAuth is not configured on Netlify. Missing: ${missing}. Add them in Project configuration → Environment variables → Production, then redeploy.`,
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
