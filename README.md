# WalkieTalkies

WalkieTalkies is a single-page guide to South East London history — blue plaques, great
buildings, murals, pubs and more. `index.html` is the whole site; it loads
its stop data from `data.js`, its code from `build/app.js` and its styles
from `styles.css` plus the Tailwind utilities in `build/tailwind.css`.

## Building

The site's JavaScript and Tailwind CSS are built, and the built files in
`build/` are committed (GitHub Pages serves the repo as it is).

- `npm run build` — build everything (CSS, JS and the static pages
  below), minified. **Run it before committing** whenever you've changed
  `src/app/`, `index.html`, a Tailwind class, or the data (`npm run
  export` / `export:areas`).
- `npm run dev` — rebuild both on every save while you work (unminified
  JavaScript, easier to debug).

Where things live:

- `src/app/*.js` — the app, one file per feature (route, Near you, the
  route sheet, narration, lightbox…). `scripts/build-js.js` joins them in
  name order into one scope, so they share variables and functions
  without imports; keep the number prefixes when adding a file.
- `src/app/00-shared.js` — the helpers both the app and the page build
  use (titles, URLs, area membership, the stop page template). Keep it
  free of DOM code: the build loads it in Node.
- `styles.css` — hand-written styles: tokens, components, states.
- Tailwind utility classes in `index.html` and `src/app/` — generated into
  `build/tailwind.css` from `tailwind.config.js` (theme colours and
  fonts). A class Tailwind hasn't seen in those files won't exist until
  the next build.

## Pages for search engines

`scripts/build-pages.js` (part of `npm run build`) turns `index.html`
into a page per area and per stop, so each has its own URL, title,
description and schema.org data, with its content already in the HTML:

- `areas/<slug>/index.html` — e.g. `/areas/greenwich/`
- `stops/<id>/index.html` — e.g. `/stops/cutty-sark/`
- `sitemap.xml`, `robots.txt` and `404.html`

These are generated — don't edit them by hand; they're rewritten on every
build. The app boots on top of each page as usual. Old `/?area=<slug>`
links redirect to `/areas/<slug>/`.

After the first deploy, submit `https://walkietalkies.warface.co.uk/sitemap.xml`
in Google Search Console.

## Editing stops

Stop data lives in a Notion database called **WalkieTalkies Stops**, not in
this repo. To publish an edit:

1. Edit the stop in Notion (add, change or remove a row).
2. Run `npm run export` to pull the latest data out of Notion and regenerate
   `data.js`.
3. Review the diff (`git diff data.js`) to sanity-check the change.
4. Commit and push.

`data.js` itself is just a generated artifact — treat Notion as the source
of truth and don't hand-edit `data.js` directly, since the next export will
overwrite it.

### One-time setup

1. `npm install`
2. Create a Notion internal integration at
   [notion.so/my-integrations](https://www.notion.so/my-integrations) and
   copy its secret.
3. Open the WalkieTalkies Stops database in Notion, open the `···` menu →
   **Connections**, and connect your new integration.
4. Copy `.env.example` to `.env` and fill in `NOTION_TOKEN` (the secret from
   step 2) and `NOTION_DATABASE_ID` (from the database's URL).
5. Run `npm run export` once to confirm it works.

### Notion schema

Each row is one stop. The **Slug ID** column is the round-trip key the
export script matches Notion rows against — don't edit it on an existing
row. Leave it blank on a new row and the export script will generate one
from the row's Name.

The **Category** select options must match the categories in the `CATS`
map in `src/app/01-stops.js` exactly — adding a new category means updating both places.

## Local preview

Serve the folder with any static file server (for example
`python3 -m http.server`) and open it in a browser. Run `npm run dev`
alongside it so your edits to `src/app/` and Tailwind classes rebuild.
