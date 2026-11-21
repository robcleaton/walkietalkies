#!/usr/bin/env node
'use strict';

// Writes a narration script per stop into scripts/kokoro/work/<area>/<id>.txt,
// ready for run.sh. Text is the stop's name, then its description, one
// sentence per line (narrate.py's format) — the same text the site shows.
//
//   node scripts/kokoro/plan.js                  stops with no Kokoro clip yet
//   node scripts/kokoro/plan.js --area=penge     every stop in an area (redo)
//   node scripts/kokoro/plan.js --only=a,b       just these stops (redo)
//   node scripts/kokoro/plan.js --match=Croydon  every stop whose text has a word
//   node scripts/kokoro/plan.js --all            every stop (redo everything)
//   node scripts/kokoro/plan.js --areas          every area's intro (name,
//                                                overview, history) → work/areas/
//
// A stop keeps the folder its clip is already in. A new stop goes in the
// first area it belongs to, in homepage chip order, or "other" if none.
// work/ is cleared each run, so run.sh only does what was planned.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const WORK = path.join(__dirname, 'work');
const MANIFEST = path.join(ROOT, 'assets', 'audio', 'manifest.json');

const args = process.argv.slice(2);
const opt = (name) => { const a = args.find((x) => x.startsWith(`--${name}=`)); return a ? a.slice(name.length + 3) : null; };
const ALL = args.includes('--all');
const AREA = opt('area');
const ONLY = opt('only') ? opt('only').split(',').filter(Boolean) : null;
const MATCH = opt('match');
const AREAS = args.includes('--areas');

const STOPS = new Function(`${fs.readFileSync(path.join(ROOT, 'data.js'), 'utf8')}; return STOPS;`)();
const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));

// Area key → title from the homepage chips, in order (as generate-audio.js).
const areas = new Map();
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
for (const m of html.matchAll(/data-area="([^"]+)"[^>]*>([^<]+)</g)) {
  if (!areas.has(m[1])) areas.set(m[1], m[2].replace(/&amp;/g, '&').trim());
}
// Mirrors src/app AREA_SLUGS.
const AREA_SLUGS = { elephant: 'elephant-and-castle' };
const slugOf = (key) => AREA_SLUGS[key] || key.replace(/\s+/g, '-');

const plainLower = (s) => String(s).replace(/&amp;/g, '&').replace(/&[a-z]+;/g, ' ').toLowerCase();
const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// Mirrors src/app stopInArea.
function stopInArea(stop, key, title) {
  if (Array.isArray(stop.areas)) return stop.areas.some((a) => plainLower(a) === plainLower(title));
  return new RegExp(`\\b${escapeRegExp(key)}\\b`).test(plainLower(`${stop.name} ${stop.area}`));
}

// HTML to speakable plain text.
// [[stop-id|label]] links read as their label (src/app stopRefsPlain).
const plain = (t) => String(t || '').replace(/\[\[([a-z0-9-]+)\|([^\]]+)\]\]/g, '$2').replace(/<[^>]+>/g, ' ')
  .replace(/&rsquo;/g, '’').replace(/&lsquo;/g, '‘').replace(/&rdquo;/g, '”').replace(/&ldquo;/g, '“')
  .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&pound;/g, '£')
  .replace(/&eacute;/g, 'é').replace(/&agrave;/g, 'à').replace(/&amp;/g, '&')
  .replace(/&[a-z#0-9]+;/gi, '').replace(/\s+/g, ' ').trim();

function folderFor(stop) {
  const file = manifest[stop.id] && manifest[stop.id].file; // kokoro/<area>/<id>.mp3
  const m = file && /^kokoro\/([^/]+)\//.exec(file);
  if (m) return m[1];
  for (const [key, title] of areas) if (stopInArea(stop, key, title)) return slugOf(key);
  return 'other';
}

function wanted(stop) {
  if (ONLY) return ONLY.includes(stop.id);
  if (MATCH) return new RegExp(`\\b${escapeRegExp(MATCH)}\\b`, 'i').test(plain(`${stop.name} ${stop.text}`));
  if (AREA) {
    const key = [...areas.keys()].find((k) => slugOf(k) === AREA);
    if (!key) { console.error(`No area "${AREA}". Areas: ${[...areas.keys()].map(slugOf).join(', ')}`); process.exit(1); }
    return stopInArea(stop, key, areas.get(key));
  }
  if (ALL) return true;
  return !(manifest[stop.id] && manifest[stop.id].file);
}

fs.rmSync(WORK, { recursive: true, force: true });
const counts = {};
const sentences = (t) => t.split(/(?<=[.!?])\s+(?=[A-Z‘“"0-9])/).join('\n');

if (AREAS) {
  // Area intros from areas.js: the name, then the overview and history as
  // two sections. Files are named by the area's URL slug.
  const AREA_INFO = new Function(`${fs.readFileSync(path.join(ROOT, 'areas.js'), 'utf8')}; return AREA_INFO;`)();
  fs.mkdirSync(path.join(WORK, 'areas'), { recursive: true });
  for (const [key, a] of Object.entries(AREA_INFO)) {
    const slug = slugOf(key);
    const parts = [plain(a.name) + '.', plain(a.overview), plain(a.history)].filter(Boolean).map(sentences);
    fs.writeFileSync(path.join(WORK, 'areas', `${slug}.txt`), parts.join('\n\n') + '\n');
    counts.areas = (counts.areas || 0) + 1;
  }
}

for (const stop of AREAS ? [] : STOPS.filter(wanted)) {
  const folder = folderFor(stop);
  const text = plain(stop.text);
  const body = `${plain(stop.name)}.\n\n${sentences(text)}\n`;
  fs.mkdirSync(path.join(WORK, folder), { recursive: true });
  fs.writeFileSync(path.join(WORK, folder, `${stop.id}.txt`), body);
  counts[folder] = (counts[folder] || 0) + 1;
}
const total = Object.values(counts).reduce((a, b) => a + b, 0);
console.log(total ? `${total} stop(s) planned: ${Object.entries(counts).map(([a, n]) => `${a} ${n}`).join(', ')}` : 'Nothing to do.');
if (total) console.log(`Next: scripts/kokoro/run.sh${ALL || AREA || ONLY || MATCH || AREAS ? ' --force' : ''}`);
