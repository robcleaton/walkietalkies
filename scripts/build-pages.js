#!/usr/bin/env node
// Builds the static pages search engines read: one per area
// (areas/<slug>/index.html) and one per stop (stops/<id>/index.html), plus
// sitemap.xml, robots.txt and 404.html.
//
// Each page is index.html with its own <title>, description, canonical URL,
// social tags and schema.org data, and with the page's real content already
// in the HTML (area intro and stop list; or the stop in full). The app then
// boots on top as usual and takes over (src/app/applyLocation).
//
// The stop/area data and the helpers that decide titles, paths and area
// membership are the app's own: data.js, areas.js, src/app/00-shared.js and
// src/app/01-stops.js, loaded here in a Node vm, so the pages and the app
// can't drift apart.
//
// Run by `npm run build` (after the CSS/JS builds). Output is deterministic:
// rebuilding without data changes produces no diff.

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

// ---- Load the app's data and shared helpers ----
const ctx = { console: { log: console.log, warn() {}, error: console.error }, Math };
vm.createContext(ctx);
for (const f of ['data.js', 'areas.js', 'src/app/00-shared.js', 'src/app/01-stops.js']) {
  vm.runInContext(read(f), ctx, { filename: f });
}
const app = new Proxy({}, { get: (_, k) => vm.runInContext(k, ctx) });
const { STOPS, SITE_URL, SITE_NAME } = { STOPS: app.STOPS, SITE_URL: app.SITE_URL, SITE_NAME: app.SITE_NAME };

const template = read('index.html');

// Areas in the homepage chips' order, with each chip's colours.
const AREAS = [];
const AREA_STYLE = {};
for (const m of template.matchAll(/<a class="area-chip" href="[^"]*" style="([^"]*)" data-area="([^"]+)">/g)) {
  if (!AREA_STYLE[m[2]]) { AREA_STYLE[m[2]] = m[1]; AREAS.push(m[2]); }
}
if (!AREAS.length) throw new Error('No area chips found in index.html');

// ---- Helpers ----
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const plain = html => app.htmlToPlain(html);
const abs = p => SITE_URL + '/' + p;
const jsonLd = obj => '<script type="application/ld+json">' + JSON.stringify(obj).replace(/</g, '\\u003c') + '</script>';

let html = '';
function replaceOnce(from, to) {
  const n = html.split(from).length - 1;
  if (n !== 1) throw new Error('Expected exactly one ' + JSON.stringify(from.slice(0, 80)) + ' in index.html, found ' + n);
  html = html.replace(from, () => to);
}
function replaceRe(re, to) {
  if (!re.test(html)) throw new Error('Pattern not found in index.html: ' + re);
  html = html.replace(re, to);
}
function addClass(id, cls) { replaceRe(new RegExp('(id="' + id + '" class=")'), '$1' + cls + ' '); }
function removeHidden(id) { replaceRe(new RegExp('(id="' + id + '" class="[^"]*?)\\bhidden ?'), '$1'); }
function fillInner(id, inner) {
  // Fills an empty element: <tag id="x" ...></tag>
  replaceRe(new RegExp('(<(\\w+) id="' + id + '"[^>]*>)(</\\2>)'), (_, open, tag, close) => open + inner + close);
}

// Head: title, description, canonical, social tags, structured data.
function setHead({ title, description, url, image, ld }) {
  replaceRe(/<title>[^<]*<\/title>/, '<title>' + esc(title) + '</title>');
  replaceRe(/<meta name="description" content="[^"]*">/, '<meta name="description" content="' + esc(description) + '">');
  replaceRe(/<link rel="canonical" href="[^"]*">/, '<link rel="canonical" href="' + esc(url) + '">');
  replaceRe(/<script type="application\/ld\+json">.*?<\/script>/, jsonLd(ld));
  replaceRe(/<meta property="og:type" content="[^"]*">/, '<meta property="og:type" content="article">');
  replaceRe(/<meta property="og:title" content="[^"]*">/, '<meta property="og:title" content="' + esc(title) + '">');
  replaceRe(/<meta property="og:description" content="[^"]*">/, '<meta property="og:description" content="' + esc(description) + '">');
  replaceRe(/<meta property="og:url" content="[^"]*">/, '<meta property="og:url" content="' + esc(url) + '">');
  replaceRe(/<meta name="twitter:title" content="[^"]*">/, '<meta name="twitter:title" content="' + esc(title) + '">');
  replaceRe(/<meta name="twitter:description" content="[^"]*">/, '<meta name="twitter:description" content="' + esc(description) + '">');
  if (image) {
    replaceRe(/<meta property="og:image" content="[^"]*">/, '<meta property="og:image" content="' + esc(image) + '">');
    replaceRe(/<meta name="twitter:image" content="[^"]*">/, '<meta name="twitter:image" content="' + esc(image) + '">');
    // The site-wide 1200×630 card's size and alt don't describe a stop photo.
    replaceRe(/<meta property="og:image:width"[^>]*>\n/, '');
    replaceRe(/<meta property="og:image:height"[^>]*>\n/, '');
    replaceRe(/<meta property="og:image:alt" content="[^"]*">/, '<meta property="og:image:alt" content="' + esc(title) + '">');
  }
}

// Body changes every generated page shares: the page's own heading takes
// the <h1> (so the logo steps down), the homepage furniture starts hidden
// (as the app would hide it), and every area's chips sit at the bottom.
function setBody(pagePath, htmlClass) {
  replaceOnce('<html lang="en">', '<html lang="en" class="' + htmlClass + '">');
  replaceOnce('<a href="#main"', '<a href="' + pagePath + '#main"');
  replaceRe(/<h1 id="logoText"([^>]*)>([\s\S]*?)<\/h1>/, '<p id="logoText"$1>$2</p>');
  addClass('homeHero', 'hidden');
  addClass('introSection', 'hidden');
  removeHidden('areaChipsBottom');
}

function areaChipHTML(area) {
  return '<a class="area-chip area-chip--compact" href="' + app.areaPath(area) + '" data-area="' + area + '" style="' + AREA_STYLE[area] + '">' + esc(app.areaTitle(area)) + '</a>';
}
const stopAreas = s => AREAS.filter(a => app.stopInArea(s, a));

const UK_POSTCODE = /\b([A-Z]{1,2}\d[A-Z\d]?) ?(\d[A-Z]{2})\b/;

// ---- Area pages ----
function areaPage(area) {
  const slug = app.areaSlug(area);
  const pagePath = app.areaPath(area);
  const url = abs(pagePath);
  const title = app.areaPageTitle(area);
  const stops = app.areaStops(area);
  const info = (app.AREA_INFO || {})[area] || {};
  const intro = app.AREA_DESCRIPTIONS[area] || '';
  const description = app.clipText(plain(intro) + ' ' + stops.length + ' historic sites, blue plaques and stories to walk in ' + app.areaTitle(area) + '.', 160);

  html = template;
  setHead({
    title, description, url,
    ld: {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: SITE_NAME, item: SITE_URL + '/' },
          { '@type': 'ListItem', position: 2, name: app.areaTitle(area), item: url }
        ] },
        { '@type': 'CollectionPage', '@id': url, url, name: title, description,
          isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL + '/' },
          about: { '@type': 'Place', name: app.areaTitle(area) + ', London', containedInPlace: { '@type': 'City', name: 'London' } },
          mainEntity: { '@type': 'ItemList', numberOfItems: stops.length, itemListElement: stops.map((s, i) => (
            { '@type': 'ListItem', position: i + 1, url: abs(app.stopPath(s.id)), name: plain(s.name) })) } }
      ]
    }
  });
  setBody(pagePath, 'area-active');

  // The area hero, as applyAreaFilter fills it.
  removeHidden('areaHero');
  replaceRe(/<h2 id="areaHeroTitle"([^>]*)>[^<]*<\/h2>/, '<h1 id="areaHeroTitle"$1>' + esc(app.areaTitle(area)) + '</h1>');
  fillInner('areaHeroDesc', intro);
  if (info.overview || info.history) {
    removeHidden('areaHeroInfo');
    fillInner('areaHeroOverview', info.overview || '');
    fillInner('areaHeroHistory', info.history || '');
  }
  // The stops, as plain linked cards (the app swaps in its own on load).
  removeHidden('list');
  fillInner('list', stops.map(s =>
    '<a href="' + app.stopPath(s.id) + '" data-stop-link="' + s.id + '" class="block bg-surface border border-rule rounded-[16px] px-5 py-4 hover:border-ink">' +
      '<span class="block mb-1">' + app.catChip(s.cat) + '</span>' +
      '<span class="block font-display text-[24px] leading-[1.1]">' + s.name + '</span>' +
      '<span class="block font-mono text-[11px] text-muted mt-1">' + app.cardAddress(s) + '</span>' +
      (s.short ? '<span class="block font-serif text-[17px] leading-[1.55] mt-2">' + s.short + '</span>' : '') +
    '</a>').join(''));
  return { path: pagePath, html };
}

// ---- Stop pages ----
function stopPage(s) {
  const pagePath = app.stopPath(s.id);
  const url = abs(pagePath);
  const title = app.stopPageTitle(s);
  const areas = stopAreas(s);
  const description = app.clipText(plain(s.short || String(s.text || '').split('\n\n')[0]), 158);
  const addr = String(s.addr || '');
  const pcMatch = UK_POSTCODE.exec(addr);
  const street = addr.replace(UK_POSTCODE, '').replace(/[,\s]+$/, '').trim();

  const place = {
    '@type': 'TouristAttraction', '@id': url + '#place', name: plain(s.name), url,
    description: app.clipText(plain(String(s.text || s.short || '')), 300),
    address: Object.assign({ '@type': 'PostalAddress' },
      street ? { streetAddress: plain(street) } : {},
      { postalCode: pcMatch ? pcMatch[1] + ' ' + pcMatch[2] : s.pc, addressLocality: 'London', addressCountry: 'GB' }),
  };
  if (s.img) place.image = app.bigImg(s.img);
  // The venue's own website and Instagram tell search engines which real
  // place this page is about.
  const sameAs = [s.web, s.ig].filter(Boolean);
  if (sameAs.length) place.sameAs = sameAs;
  if (s.lat != null && s.lon != null) place.geo = { '@type': 'GeoCoordinates', latitude: s.lat, longitude: s.lon };
  if (areas.length) place.containedInPlace = areas.map(a => ({ '@type': 'Place', name: app.areaTitle(a) + ', London', url: abs(app.areaPath(a)) }));

  const crumbs = [{ '@type': 'ListItem', position: 1, name: SITE_NAME, item: SITE_URL + '/' }];
  if (areas[0]) crumbs.push({ '@type': 'ListItem', position: 2, name: app.areaTitle(areas[0]), item: abs(app.areaPath(areas[0])) });
  crumbs.push({ '@type': 'ListItem', position: crumbs.length + 1, name: plain(s.name), item: url });

  html = template;
  setHead({
    title, description, url, image: s.img ? app.bigImg(s.img) : null,
    ld: { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: crumbs }, place] }
  });
  setBody(pagePath, 'stop-page');

  const near = app.nearestTo(s, 8);
  removeHidden('stopPage');
  fillInner('stopPage', app.stopPageHTML(s, {
    areas, areaChipHTML,
    actionsHTML: '',
    nearbyHTML: near.length ?
      '<ul class="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">' + near.map(n =>
        '<li><a href="' + app.stopPath(n.s.id) + '" data-stop-link="' + n.s.id + '" class="block bg-surface border border-rule rounded-[16px] px-4 py-3 hover:border-ink">' +
          '<span class="block font-semibold leading-snug">' + n.s.name + '</span>' +
          '<span class="block font-mono text-[11px] text-muted mt-0.5">' + app.fmtDist(n.km) + ' &middot; ' + n.s.area + '</span>' +
        '</a></li>').join('') + '</ul>' : ''
  }));
  return { path: pagePath, html };
}

// ---- 404: the homepage, not indexed ----
function notFoundPage() {
  html = template;
  replaceRe(/<title>[^<]*<\/title>/, '<title>Page not found | ' + SITE_NAME + '</title>');
  replaceRe(/<link rel="canonical" href="[^"]*">\n/, '<meta name="robots" content="noindex">\n');
  return html;
}

// Generated pages drop index.html's developer comments and indentation
// (about 18% smaller; there's no <pre> or whitespace-sensitive inline
// script in it to break).
const compact = h => h.replace(/<!--[\s\S]*?-->/g, '').replace(/^[ \t]+/gm, '').replace(/\n+/g, '\n');

// ---- Write everything ----
for (const dir of ['areas', 'stops']) fs.rmSync(path.join(ROOT, dir), { recursive: true, force: true });
const pages = [...AREAS.map(areaPage), ...STOPS.map(stopPage)];
for (const p of pages) {
  const file = path.join(ROOT, p.path, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, compact(p.html));
}
fs.writeFileSync(path.join(ROOT, '404.html'), compact(notFoundPage()));

const urls = [SITE_URL + '/', ...pages.map(p => abs(p.path))];
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map(u => '  <url><loc>' + esc(u) + '</loc></url>\n').join('') + '</urlset>\n');
fs.writeFileSync(path.join(ROOT, 'robots.txt'),
  'User-agent: *\nAllow: /\n\nSitemap: ' + SITE_URL + '/sitemap.xml\n');

console.log('pages: ' + AREAS.length + ' areas, ' + STOPS.length + ' stops, sitemap ' + urls.length + ' URLs');
