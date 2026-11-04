#!/usr/bin/env node
'use strict';

// One-off: pre-fill the Stops database's "Areas" multi-select, which
// decides which area pages each stop appears on (app.js stopInArea).
//
//   node scripts/prefill-areas.js           # dry run: prints the plan only
//   node scripts/prefill-areas.js --write   # writes it to Notion
//
// The "Areas" column has to exist first (a Multi-select in the WalkieTalkies
// Stops database, one option per area, named exactly as the homepage area
// chips are, e.g. "Elephant & Castle"). Only stops whose Areas is still
// empty are written, so anything already tagged by hand is left alone and
// the script is safe to re-run.
//
// How a stop's areas are guessed:
//   1. Any area named (whole word) in the stop's Name or Area text.
//   2. Failing that, the one area its Postcode belongs to, where that's
//      unambiguous (SE10 → Greenwich). SE1, SE15 and SE16 span several
//      areas, so those stops are left untagged for a human to place.
// Description and Address are deliberately ignored: they name
// neighbouring areas and streets ("Crystal Palace Road") far too often.
// Everything from step 2, and everything left untagged, is listed in the
// dry run for review.

const fs = require('fs');
const path = require('path');
const { Client } = require('@notionhq/client');

const ROOT = path.join(__dirname, '..');
const WRITE = process.argv.includes('--write');

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

const { NOTION_TOKEN, NOTION_DATABASE_ID } = process.env;
if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
  console.error('Missing NOTION_TOKEN or NOTION_DATABASE_ID (see .env.example).');
  process.exit(1);
}
const notion = new Client({ auth: NOTION_TOKEN });

// Area key → title, read from the homepage chips so the list stays defined
// in one place (index.html), e.g. 'elephant' → 'Elephant & Castle'.
function readAreas() {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const areas = new Map();
  const re = /data-area="([^"]+)"[^>]*>([^<]+)</g;
  let m;
  while ((m = re.exec(html))) {
    if (!areas.has(m[1])) areas.set(m[1], m[2].replace(/&amp;/g, '&').trim());
  }
  return areas;
}

const POSTCODE_AREA = {
  SE3: 'blackheath', SE4: 'brockley', SE5: 'camberwell', SE6: 'catford',
  SE7: 'charlton', SE8: 'deptford', SE9: 'eltham', SE10: 'greenwich',
  SE12: 'lee', SE13: 'lewisham', SE14: 'new cross', SE17: 'walworth',
  SE18: 'woolwich', SE19: 'crystal palace', SE20: 'penge', SE21: 'dulwich',
  SE22: 'east dulwich', SE23: 'forest hill', SE24: 'herne hill',
  SE26: 'sydenham', SE27: 'gipsy hill', DA5: 'bexley', DA6: 'bexleyheath'
};

const text = (page, name) => {
  const p = page.properties[name];
  if (!p) return '';
  const parts = p.title || p.rich_text;
  if (parts) return parts.map((t) => t.plain_text).join('');
  return (p.select && p.select.name) || '';
};
const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const areas = readAreas();
  const database = await notion.databases.retrieve({ database_id: NOTION_DATABASE_ID });
  const dataSourceId = database.data_sources[0].id;
  const schema = await notion.dataSources.retrieve({ data_source_id: dataSourceId });
  const areasProp = schema.properties.Areas;
  if (!areasProp || areasProp.type !== 'multi_select') {
    console.error('The Stops database has no "Areas" multi-select column yet. Add it in Notion first.');
    process.exit(1);
  }

  const pages = [];
  let cursor;
  do {
    const res = await notion.dataSources.query({ data_source_id: dataSourceId, start_cursor: cursor, page_size: 100 });
    pages.push(...res.results);
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);

  const plan = [];
  const byPostcode = [];
  const untagged = [];
  let alreadyTagged = 0;
  for (const page of pages) {
    if (page.properties.Areas.multi_select.length) { alreadyTagged++; continue; }
    const name = text(page, 'Name');
    const hay = `${name} ${text(page, 'Area')}`.toLowerCase();
    let keys = [...areas.keys()].filter((k) => new RegExp(`\\b${escapeRegExp(k)}\\b`).test(hay));
    if (!keys.length) {
      const pc = text(page, 'Postcode');
      if (POSTCODE_AREA[pc]) {
        keys = [POSTCODE_AREA[pc]];
        byPostcode.push(`${name} [${text(page, 'Area')}, ${pc}] → ${areas.get(keys[0])}`);
      }
    }
    if (!keys.length) {
      untagged.push(`${name} [${text(page, 'Area')}, ${text(page, 'Postcode')}]`);
      continue;
    }
    plan.push({ page, name, titles: keys.map((k) => areas.get(k)) });
  }

  console.log(`${pages.length} stops: ${alreadyTagged} already tagged, ${plan.length} to tag, ${untagged.length} left untagged.`);
  console.log(`\nTagged from postcode only (${byPostcode.length}) — review these:`);
  byPostcode.forEach((l) => console.log(`  - ${l}`));
  console.log(`\nLeft untagged (${untagged.length}) — on no area page until placed by hand:`);
  untagged.forEach((l) => console.log(`  - ${l}`));

  if (!WRITE) {
    console.log('\nDry run — nothing written. Re-run with --write to apply.');
    return;
  }
  console.log(`\nWriting ${plan.length} pages…`);
  for (const [i, { page, titles }] of plan.entries()) {
    await notion.pages.update({
      page_id: page.id,
      properties: { Areas: { multi_select: titles.map((name) => ({ name })) } }
    });
    if ((i + 1) % 50 === 0) console.log(`  ${i + 1}/${plan.length}`);
    await sleep(350); // stay under Notion's ~3 requests/second limit
  }
  console.log('Done. Run `npm run export` to pull the tags into data.js.');
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
