#!/usr/bin/env node
'use strict';

// Generate ElevenLabs narration MP3s for the stops on one area page.
//
//   node scripts/generate-audio.js forest-hill             # generate
//   node scripts/generate-audio.js forest-hill --dry-run   # list + cost only
//   node scripts/generate-audio.js forest-hill --force     # redo everything
//   node scripts/generate-audio.js forest-hill --only=horniman-conservatory
//   node scripts/generate-audio.js forest-hill --budget=8000   # cap credits
//
// The area is the slug from the site URL (?area=forest-hill). Stops are
// picked the same way the area page picks them (app.js stopInArea): a
// stop's Notion "Areas" tags when data.js has them, otherwise a whole-word
// match on its name and Area text.
//
// Files land in assets/audio/<stop-id>.mp3, alongside a manifest.json that
// records a hash of the text, voice and model each file was made from. A
// re-run only regenerates stops whose text (or voice/model) has changed,
// so it's cheap to run again after editing stops in Notion and exporting.
//
// Needs ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID in .env (see
// .env.example). ELEVENLABS_MODEL_ID is optional.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const AUDIO_DIR = path.join(ROOT, 'assets', 'audio');
const MANIFEST_PATH = path.join(AUDIO_DIR, 'manifest.json');

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}
loadEnvFile(path.join(ROOT, '.env'));

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const FORCE = args.includes('--force');
// --only=<stop-id>[,<stop-id>…] limits a run to those stops within the area,
// e.g. to try one voice/sample before paying for the whole area.
const onlyArg = args.find((a) => a.startsWith('--only='));
const ONLY = onlyArg ? onlyArg.slice('--only='.length).split(',').filter(Boolean) : null;
// --budget=<characters> caps a run's total characters (≈ ElevenLabs
// credits). Mapped stops (the ones that can go in a walking route) are
// filled first, then the rest; any stop too long for what's left is
// skipped, so shorter ones after it can still fit. Skipped stops are
// listed, and a later run picks them up.
const budgetArg = args.find((a) => a.startsWith('--budget='));
const BUDGET = budgetArg ? parseInt(budgetArg.slice('--budget='.length), 10) : null;
const areaSlug = args.find((a) => !a.startsWith('--'));

const API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID;
const MODEL_ID = process.env.ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2';
// A calm, documentary read rather than a performance.
const VOICE_SETTINGS = { stability: 0.5, similarity_boost: 0.75, style: 0.1, use_speaker_boost: true };

if (!areaSlug) {
  console.error('Usage: node scripts/generate-audio.js <area-slug> [--dry-run] [--force]');
  console.error('e.g.   node scripts/generate-audio.js forest-hill');
  process.exit(1);
}
if (!DRY_RUN && (!API_KEY || !VOICE_ID)) {
  console.error('Missing ELEVENLABS_API_KEY or ELEVENLABS_VOICE_ID in .env (see .env.example).');
  process.exit(1);
}

// --- Data --------------------------------------------------------------

function loadStops() {
  const src = fs.readFileSync(path.join(ROOT, 'data.js'), 'utf8');
  return new Function(`${src}; return STOPS;`)();
}

// Area key → title from the homepage chips, e.g. 'elephant' → 'Elephant & Castle'.
function loadAreas() {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const areas = new Map();
  const re = /data-area="([^"]+)"[^>]*>([^<]+)</g;
  let m;
  while ((m = re.exec(html))) {
    if (!areas.has(m[1])) areas.set(m[1], m[2].replace(/&amp;/g, '&').trim());
  }
  return areas;
}

// Mirrors app.js AREA_SLUGS / areaFromSlug.
const AREA_SLUGS_REVERSE = { 'elephant-and-castle': 'elephant' };
function areaKeyFromSlug(slug) {
  const key = slug.toLowerCase().trim();
  return AREA_SLUGS_REVERSE[key] || key.replace(/-+/g, ' ');
}

const plainLower = (s) => String(s).replace(/&amp;/g, '&').replace(/&[a-z]+;/g, ' ').toLowerCase();
const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Mirrors app.js stopInArea.
function stopInArea(stop, key, title) {
  if (Array.isArray(stop.areas)) return stop.areas.some((a) => plainLower(a) === plainLower(title));
  return new RegExp(`\\b${escapeRegExp(key)}\\b`).test(plainLower(`${stop.name} ${stop.area}`));
}

// Same text the site's Listen button reads (app.js speakableText): name,
// then the description, with HTML entities turned back into characters.
function narration(stop) {
  return `${stop.name}. ${stop.text}`
    .replace(/&rsquo;/g, '’').replace(/&lsquo;/g, '‘')
    .replace(/&rdquo;/g, '”').replace(/&ldquo;/g, '“')
    .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–')
    .replace(/&pound;/g, '£').replace(/&eacute;/g, 'é').replace(/&agrave;/g, 'à')
    .replace(/&amp;/g, '&')
    .replace(/&[a-z#0-9]+;/gi, '');
}

const hashOf = (text) => crypto.createHash('sha256').update(`${VOICE_ID}|${MODEL_ID}|${text}`).digest('hex').slice(0, 16);

// --- ElevenLabs --------------------------------------------------------

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function synthesize(text) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(VOICE_ID)}?output_format=mp3_44100_128`;
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'xi-api-key': API_KEY, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
      body: JSON.stringify({ text, model_id: MODEL_ID, voice_settings: VOICE_SETTINGS })
    });
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    const body = await res.text();
    // Rate-limited or briefly overloaded: back off and retry a few times.
    if ((res.status === 429 || res.status >= 500) && attempt < 4) {
      const wait = attempt * 5000;
      console.log(`    ${res.status}, retrying in ${wait / 1000}s…`);
      await sleep(wait);
      continue;
    }
    throw new Error(`ElevenLabs ${res.status}: ${body.slice(0, 300)}`);
  }
}

// --- Main --------------------------------------------------------------

async function main() {
  const areas = loadAreas();
  const key = areaKeyFromSlug(areaSlug);
  const title = areas.get(key);
  if (!title) {
    const slugs = [...areas.keys()].map((k) => Object.keys(AREA_SLUGS_REVERSE).find((s) => AREA_SLUGS_REVERSE[s] === k) || k.replace(/ /g, '-'));
    console.error(`Unknown area "${areaSlug}". Known: ${slugs.join(', ')}`);
    process.exit(1);
  }

  let stops = loadStops().filter((s) => stopInArea(s, key, title));
  if (ONLY) {
    const missing = ONLY.filter((id) => !stops.some((s) => s.id === id));
    if (missing.length) {
      console.error(`Not stops in ${title}: ${missing.join(', ')}`);
      process.exit(1);
    }
    stops = stops.filter((s) => ONLY.includes(s.id));
  }
  const manifest = fs.existsSync(MANIFEST_PATH) ? JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8')) : {};

  let todo = stops.map((s) => ({ stop: s, text: narration(s) })).filter(({ stop, text }) => {
    const file = path.join(AUDIO_DIR, `${stop.id}.mp3`);
    return FORCE || !fs.existsSync(file) || !manifest[stop.id] || manifest[stop.id].hash !== hashOf(text);
  });
  const needed = todo.length;

  let overBudget = [];
  if (BUDGET !== null) {
    const mapped = (t) => t.stop.lat !== null && t.stop.lon !== null;
    const ordered = todo.filter(mapped).concat(todo.filter((t) => !mapped(t)));
    let left = BUDGET;
    todo = [];
    for (const t of ordered) {
      if (t.text.length <= left) { todo.push(t); left -= t.text.length; }
      else overBudget.push(t);
    }
  }
  const chars = todo.reduce((n, t) => n + t.text.length, 0);

  console.log(`${title}: ${stops.length} stops, ${needed} to generate (${stops.length - needed} up to date).`);
  if (BUDGET !== null) {
    console.log(`Budget ${BUDGET.toLocaleString()} characters: ${todo.length} fit, ${overBudget.length} left for a later run:`);
    overBudget.forEach(({ stop, text }) => console.log(`  · ${stop.id} (${text.length} chars)`));
  }
  console.log(`About ${chars.toLocaleString()} characters ≈ ${chars.toLocaleString()} ElevenLabs credits on ${MODEL_ID}.`);
  todo.forEach(({ stop, text }) => console.log(`  - ${stop.id} (${text.length} chars)`));

  if (DRY_RUN || !todo.length) {
    if (DRY_RUN) console.log('\nDry run — nothing generated.');
    return;
  }

  fs.mkdirSync(AUDIO_DIR, { recursive: true });
  let done = 0;
  for (const { stop, text } of todo) {
    process.stdout.write(`[${++done}/${todo.length}] ${stop.id}… `);
    const audio = await synthesize(text);
    fs.writeFileSync(path.join(AUDIO_DIR, `${stop.id}.mp3`), audio);
    manifest[stop.id] = { hash: hashOf(text), voice: VOICE_ID, model: MODEL_ID, chars: text.length };
    // Saved after every file, so an interrupted run keeps what it finished.
    fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
    console.log(`${Math.round(audio.length / 1024)} KB`);
    await sleep(500);
  }
  console.log(`\nDone. ${todo.length} file(s) in assets/audio/.`);
}

main().catch((err) => {
  console.error(`\n${err.message || err}`);
  process.exit(1);
});
