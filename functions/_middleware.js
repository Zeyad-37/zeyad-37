// Cloudflare Pages Function: A/B/C split for the homepage.
//
// A first visit to "/" is assigned one variant at random and keeps it via a
// cookie, so a returning visitor always sees the same design. The response is a
// server-side rewrite, so the URL stays "/" and there is no flicker.
//
// QA: "/?variant=engineering" forces a variant and re-pins the cookie.
// Ending the test: set WINNER (e.g. "warm") in the Pages environment variables;
// everyone then gets that variant without a redeploy of the site code.

const VARIANTS = ['editorial', 'engineering', 'warm'];
const COOKIE = 'zg_variant';
const MAX_AGE = 60 * 60 * 24 * 90;

export async function onRequest({ request, next, env }) {
  const url = new URL(request.url);
  if (url.pathname !== '/' || request.method !== 'GET') return next();

  const forced = url.searchParams.get('variant');
  const pinned = (request.headers.get('Cookie') || '').match(new RegExp(`(?:^|;\\s*)${COOKIE}=([a-z]+)`))?.[1];

  let variant;
  if (VARIANTS.includes(env.WINNER)) variant = env.WINNER;
  else if (VARIANTS.includes(forced)) variant = forced;
  else if (VARIANTS.includes(pinned)) variant = pinned;
  else variant = VARIANTS[crypto.getRandomValues(new Uint32Array(1))[0] % VARIANTS.length];

  const page = await env.ASSETS.fetch(new URL(`/v/${variant}/`, url));
  const response = new Response(page.body, page);
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set('Vary', 'Cookie');
  response.headers.delete('X-Robots-Tag'); // /v/* is noindex, "/" is not
  if (variant !== pinned && !env.WINNER) {
    response.headers.append('Set-Cookie', `${COOKIE}=${variant}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax; Secure`);
  }
  return response;
}
