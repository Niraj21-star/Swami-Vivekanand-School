export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Always try to serve static assets first
    const assetResponse = await env.ASSETS.fetch(request);
    if (assetResponse.status !== 404) {
      return assetResponse;
    }

    // 2. If request is for a file (has an extension), return 404
    if (url.pathname.includes(".")) {
      return new Response("Not Found", { status: 404 });
    }

    // 3. Otherwise, serve index.html (SPA routing)
    return env.ASSETS.fetch(
      new Request(new URL("/index.html", request.url))
    );
  }
};
