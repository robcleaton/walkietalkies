#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { Client } = require('@notionhq/client');

const ROOT = path.join(__dirname, '..');
const DATA_JS_PATH = path.join(ROOT, 'data.js');

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, 'utf8').split('\n');
  for (const line of lines) {
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

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
  console.error('Missing NOTION_TOKEN or NOTION_DATABASE_ID.');
  console.error('Copy .env.example to .env and fill in both values, then run again.');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });

// Must match the CATS map in index.html exactly — this is the round-trip
// between the site's internal category keys and Notion's human-readable labels.
const CATS = {
  plaque: 'Blue plaque',
  grand: 'Great building',
  maritime: 'River & sea',
  works: 'Industry & invention',
  culture: 'Museum & gallery',
  memory: 'Memorial & protest',
  green: 'Park & burial ground',
  pub: 'Historic pub',
  art: 'Art & artists'
};

const CAT_KEY_BY_LABEL = Object.fromEntries(Object.entries(CATS).map(([key, label]) => [label, key]));

function getTitle(page, propName) {
  const prop = page.properties[propName];
  if (!prop || !prop.title) return '';
  return prop.title.map((t) => t.plain_text).join('');
}

function getRichText(page, propName) {
  const prop = page.properties[propName];
  if (!prop || !prop.rich_text) return '';
  return prop.rich_text.map((t) => t.plain_text).join('');
}

function getSelect(page, propName) {
  const prop = page.properties[propName];
  if (!prop || !prop.select) return '';
  return prop.select.name || '';
}

function getNumber(page, propName) {
  const prop = page.properties[propName];
  if (!prop || prop.number === null || prop.number === undefined) return null;
  return prop.number;
}

function getUrl(page, propName) {
  const prop = page.properties[propName];
  if (!prop) return '';
  return prop.url || '';
}

function slugify(name) {
  return String(name)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'stop';
}

// Reverses the HTML-entity decoding done at import time, so the regenerated
// data.js matches the site's existing embedding convention. Plain quotes and
// backslashes are also escaped so every value stays a safe single-quoted JS
// string literal even if someone pastes a straight quote into Notion.
function encodeField(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/’/g, '&rsquo;')
    .replace(/‘/g, '&lsquo;')
    .replace(/”/g, '&rdquo;')
    .replace(/“/g, '&ldquo;')
    .replace(/—/g, '&mdash;')
    .replace(/–/g, '&ndash;')
    .replace(/£/g, '&pound;')
    .replace(/é/g, '&eacute;')
    .replace(/à/g, '&agrave;')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'");
}

async function fetchAllPages(dataSourceId) {
  const pages = [];
  let cursor;
  do {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      start_cursor: cursor,
      page_size: 100
    });
    pages.push(...response.results);
    cursor = response.has_more ? response.next_cursor : undefined;
  } while (cursor);
  return pages;
}

function readExistingOrder() {
  if (!fs.existsSync(DATA_JS_PATH)) return [];
  const contents = fs.readFileSync(DATA_JS_PATH, 'utf8');
  const ids = [];
  const re = /\{\s*id:'([^']+)'/g;
  let match;
  while ((match = re.exec(contents))) ids.push(match[1]);
  return ids;
}

function pageToStop(page, usedSlugs) {
  const name = getTitle(page, 'Name');
  let id = getRichText(page, 'Slug ID');
  if (!id) {
    let base = slugify(name);
    id = base;
    let n = 2;
    while (usedSlugs.has(id)) {
      id = `${base}-${n}`;
      n++;
    }
  }
  usedSlugs.add(id);

  const categoryLabel = getSelect(page, 'Category');
  const cat = CAT_KEY_BY_LABEL[categoryLabel];
  if (!cat) {
    throw new Error(`Page "${name}" (${page.id}) has an unrecognised Category "${categoryLabel}". ` +
      'Add it to the CATS map in both index.html and this script before exporting.');
  }

  return {
    id,
    img: getUrl(page, 'Image URL'),
    name,
    area: getRichText(page, 'Area'),
    pc: getSelect(page, 'Postcode'),
    cat,
    year: getNumber(page, 'Year'),
    era: getRichText(page, 'Era'),
    lat: getNumber(page, 'Latitude'),
    lon: getNumber(page, 'Longitude'),
    addr: getRichText(page, 'Address'),
    text: getRichText(page, 'Description'),
    note: getRichText(page, 'Field Note')
  };
}

function orderStops(stops, existingOrder) {
  const positionOf = new Map(existingOrder.map((id, i) => [id, i]));
  const known = [];
  const unknown = [];
  for (const stop of stops) {
    if (positionOf.has(stop.id)) known.push(stop);
    else unknown.push(stop);
  }
  known.sort((a, b) => positionOf.get(a.id) - positionOf.get(b.id));
  unknown.sort((a, b) => a.name.localeCompare(b.name));
  return known.concat(unknown);
}

function formatStop(stop) {
  const year = stop.year === null ? 'null' : stop.year;
  const lat = stop.lat === null ? 'null' : stop.lat;
  const lon = stop.lon === null ? 'null' : stop.lon;
  return (
    `    { id:'${stop.id}', img:'${encodeField(stop.img)}', name:'${encodeField(stop.name)}', area:'${encodeField(stop.area)}', pc:'${encodeField(stop.pc)}', cat:'${stop.cat}', year:${year}, era:'${encodeField(stop.era)}',\n` +
    `      lat:${lat}, lon:${lon}, addr:'${encodeField(stop.addr)}',\n` +
    `      text:'${encodeField(stop.text)}',\n` +
    `      note:'${encodeField(stop.note)}' }`
  );
}

async function main() {
  console.log('Fetching database…');
  const database = await notion.databases.retrieve({ database_id: NOTION_DATABASE_ID });
  const dataSourceId = database.data_sources[0] && database.data_sources[0].id;
  if (!dataSourceId) {
    throw new Error('Could not find a data source on that database.');
  }

  console.log('Fetching stops…');
  const pages = await fetchAllPages(dataSourceId);
  console.log(`Fetched ${pages.length} stops from Notion.`);

  const existingOrder = readExistingOrder();
  const usedSlugs = new Set();
  const stops = pages.map((page) => pageToStop(page, usedSlugs));
  const ordered = orderStops(stops, existingOrder);

  const body = ordered.map(formatStop).join(',\n\n');
  const output = `  var STOPS = [\n${body}\n  ];\n`;

  fs.writeFileSync(DATA_JS_PATH, output, 'utf8');
  console.log(`Wrote ${ordered.length} stops to data.js`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
