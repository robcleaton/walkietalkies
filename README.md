# WalkieTalkies

A single-page gazetteer of South East London history — blue plaques, great
buildings, murals, pubs and more. No build step: `index.html` is the whole
site, styled inline and loading its stop data from `data.js`.

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

The **Category** select options must match the categories in `index.html`'s
`CATS` map (`index.html:414`) exactly — adding a new category means updating
both places.

## Local preview

Open `index.html` directly in a browser, or serve the folder with any static
file server — there's nothing to build.
