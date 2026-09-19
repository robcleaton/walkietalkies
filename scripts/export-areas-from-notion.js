#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { Client } = require('@notionhq/client');

const ROOT = path.join(__dirname, '..');
const AREAS_JS_PATH = path.join(ROOT, 'areas.js');

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
const NOTION_AREAS_DATABASE_ID = process.env.NOTION_AREAS_DATABASE_ID;

if (!NOTION_TOKEN || !NOTION_AREAS_DATABASE_ID) {
  console.error('Missing NOTION_TOKEN or NOTION_AREAS_DATABASE_ID.');
  console.error('Add NOTION_AREAS_DATABASE_ID to .env, then run again.');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });

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

function getUrl(page, propName) {
  const prop = page.properties[propName];
  if (!prop) return '';
  return prop.url || '';
}

// Reverses the HTML-entity decoding done at import time, so the regenerated
// areas.js matches data.js's existing embedding convention. Plain quotes and
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
    .replace(/\r?\n/g, '\\n')
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

function pageToArea(page) {
  const name = getTitle(page, 'Name');
  const slug = getRichText(page, 'Slug') || name.toLowerCase();
  return {
    slug,
    name,
    postcodes: getRichText(page, 'Postcodes'),
    overview: getRichText(page, 'Overview'),
    history: getRichText(page, 'History'),
    image: getUrl(page, 'Image URL')
  };
}

function formatArea(area) {
  return (
    `    '${area.slug}': { name:'${encodeField(area.name)}', postcodes:'${encodeField(area.postcodes)}',\n` +
    `      overview:'${encodeField(area.overview)}',\n` +
    `      history:'${encodeField(area.history)}',\n` +
    `      image:'${encodeField(area.image)}' }`
  );
}

async function main() {
  console.log('Fetching areas database…');
  const database = await notion.databases.retrieve({ database_id: NOTION_AREAS_DATABASE_ID });
  const dataSourceId = database.data_sources[0] && database.data_sources[0].id;
  if (!dataSourceId) {
    throw new Error('Could not find a data source on that database.');
  }

  console.log('Fetching areas…');
  const pages = await fetchAllPages(dataSourceId);
  console.log(`Fetched ${pages.length} areas from Notion.`);

  const areas = pages.map(pageToArea).sort((a, b) => a.slug.localeCompare(b.slug));

  const body = areas.map(formatArea).join(',\n\n');
  const output = `  var AREA_INFO = {\n${body}\n  };\n`;

  fs.writeFileSync(AREAS_JS_PATH, output, 'utf8');
  console.log(`Wrote ${areas.length} areas to areas.js`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
