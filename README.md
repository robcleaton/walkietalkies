# WalkieTalkies

Audio walking guides to South East London history: blue plaques, great
buildings, murals, historic pubs, notable residents and more.

**[walkietalkies.warface.co.uk](https://walkietalkies.warface.co.uk)**

Browse by area or category, read and listen to each stop's story, build a
walking route on the map and take it with you.

## How it works

A static site served by GitHub Pages. Stop and area data is kept in Notion
and exported to `data.js` and `areas.js`. The app is plain JavaScript
(`src/app/`) with Tailwind, built into `build/`. Every area and stop also
gets its own pre-rendered page for search engines. Narration is generated
locally with [Kokoro](https://github.com/thewh1teagle/kokoro-onnx).

## Running it locally

```sh
npm install
npm run dev                 # rebuild JS and CSS on save
python3 -m http.server      # then open http://localhost:8000
```

`npm run build` makes the full production build, including the static
pages. The built files are committed, so run it before committing.

## Updating content

```sh
npm run export          # stops from Notion → data.js
npm run export:areas    # area intros from Notion → areas.js
```

Notion is the source of truth, so don't edit `data.js` or `areas.js` by
hand. Copy `.env.example` to `.env` for the keys these need. To re-record
narration after a text change, see `scripts/kokoro/README.md`.

## Credits

- Photos from [Wikimedia Commons](https://commons.wikimedia.org), under
  their individual licences.
- Maps © [OpenStreetMap](https://www.openstreetmap.org/copyright)
  contributors.
- Narration voiced with Kokoro (Apache-2.0).
