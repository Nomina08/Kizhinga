exports.handler = async () => {
  const clientId = process.env.GITHUB_CLIENT_ID || process.env.OAUTH_CLIENT_ID;
  const clientSecret =
    process.env.GITHUB_CLIENT_SECRET || process.env.OAUTH_CLIENT_SECRET;

  const body = {
    ok: Boolean(clientId && clientSecret),
    hasClientId: Boolean(clientId),
    hasClientSecret: Boolean(clientSecret),
    siteUrl:
      process.env.URL ||
      process.env.DEPLOY_PRIME_URL ||
      'https://coruscating-belekoy-b3081d.netlify.app',
    hint: clientId && clientSecret
      ? 'OAuth keys are loaded. Try /admin/ login again.'
      : 'Add GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in Netlify → Environment variables → Production, then redeploy.',
  };

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body, null, 2),
  };
};
