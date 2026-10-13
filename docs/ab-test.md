# Homepage A/B/C test

Three designs of the same homepage, from the Claude Design samples:

| Variant | Look | Preview |
|---|---|---|
| `editorial` (control) | Serif, generous whitespace, light | `/v/editorial/` |
| `engineering` | Mono details, grid, dark | `/v/engineering/` |
| `warm` | Soft neutrals, personal, approachable | `/v/warm/` |

Facts (years, companies, prices, quotes, links) live once in `src/data/site.ts`, so the
variants differ only in design and tone.

## How the split works

`functions/_middleware.js` runs on Cloudflare Pages. A first visit to `/` gets a random
variant (1/3 each) and a 90-day `zg_variant` cookie, so returning visitors see the same
design. It is a server-side rewrite: the URL stays `/` and nothing flickers.

- Force a variant for QA: `/?variant=warm`
- End the test: set the `WINNER` environment variable in Cloudflare Pages (e.g. `warm`).
- Without the middleware (local dev, another host), `/` serves `editorial`.

## What is measured

Plausible, with the variant attached to every pageview and event as the `variant` property.

- **Primary metric: CTA rate** = visitors who clicked any call to action (`CTA` event) ÷
  visitors on `/`. Clicks are frequent enough to read in months rather than years.
- **Secondary: `Contact`** = submitted contact forms. Too rare to decide on alone.

Set up in Plausible: goals `CTA` and `Contact`, and the `variant` and `cta` custom properties.

## Stopping rule (agree before launch, don't peek-and-stop)

Stop at whichever comes first:

1. **4,000 visitors per variant.** That detects a CTA rate moving from about 2% to 3%
   with 80% power at p < 0.05.
2. **12 weeks.**

Then compare CTA rates with a chi-square test. If one variant wins at p < 0.05, set it as
`WINNER`. If not, the designs are too close to tell apart at this traffic: keep `editorial`.

## Deploying

1. Create a Cloudflare Pages project from this repo. Build command `npm run build`,
   output directory `dist`.
2. Add the custom domain `zeyadgasser.com` in Pages and move DNS off GitHub Pages
   (the current site is the `gh-pages` branch).
3. Add the site in Plausible.
