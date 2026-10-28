# allycolquhoun-portfolio

Portfolio for Ally Colquhoun — Senior UI/UX & Brand Designer. Next.js 16 (App Router), static
pages + one API route (contact form). Built for GoDaddy Node.js Hosting.

## Local

```bash
npm install
npm run dev        # http://localhost:3000
```

## Editing content

- **Project text & images** — `src/content/projects.json` (imported from the old Adobe Portfolio
  by `scripts/scrape.mjs`; images live in `public/work/<slug>/`). Block types: `heading`, `text`,
  `image`, `gallery`, `embed`. Order of the array = order on the site.
- **Display names & discipline tags** — `src/content/meta.ts`.
- **About page** — `src/content/about.json`, plus the "path so far" list in `src/app/about/page.tsx`.
- **Client marquee** — `CLIENTS` in `src/app/page.tsx`.

Don't re-run `npm run scrape` once you've hand-edited projects.json — it overwrites it.

## Deploy (GoDaddy Node.js Hosting)

Platform runs `npm install --omit=dev` → `npm run build` → `npm start` (`next start -H 0.0.0.0`,
which reads `PORT` from env). Connect the GitHub repo in the GoDaddy dashboard.

Env vars to set in the GoDaddy app (restart after changing):

| Var | Purpose |
|-----|---------|
| `CONTACT_FORM_RECIPIENT_EMAIL` | Where contact-form messages are delivered (via GoDaddy's built-in email gateway) |
| `SITE_URL` | Public URL, e.g. `https://allycolquhoun.com` — used for social share images |

The contact form only sends once deployed — the email gateway (`127.0.0.1:2525`) exists only
inside GoDaddy's container, so locally it returns a friendly error.

Old Adobe Portfolio URLs (`/zettle`, `/agencies`, `/copy-of-zettle`, …) redirect to the new ones.
