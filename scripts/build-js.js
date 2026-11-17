#!/usr/bin/env node
// Builds build/app.js from the feature files in src/app/.
//
// The files are joined in name order (01-, 02-, …) inside one function
// scope, exactly as when they were a single app.js, so they share their
// top-level variables and functions without imports. The order only
// matters for top-level statements that run straight away (event
// listeners, the boot code in 18-boot.js); declarations are hoisted.
//
//   node scripts/build-js.js           minified build/app.js (for the site)
//   node scripts/build-js.js --dev     unminified, for debugging
//   node scripts/build-js.js --watch   unminified, rebuilt on every save

const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const SRC = path.join(__dirname, '..', 'src', 'app');
const OUT = path.join(__dirname, '..', 'build', 'app.js');
const watch = process.argv.includes('--watch');
const dev = watch || process.argv.includes('--dev');

function joined() {
  const files = fs.readdirSync(SRC).filter(f => f.endsWith('.js')).sort();
  const parts = files.map(f =>
    '  // ---- src/app/' + f + ' ----\n' + fs.readFileSync(path.join(SRC, f), 'utf8').replace(/\n+$/, '')
  );
  return '(function () {\n  \'use strict\';\n\n' + parts.join('\n\n') + '\n})();\n';
}

async function build() {
  const code = joined();
  // Parse it either way, so a syntax error fails the build with a line number.
  const out = await esbuild.transform(code, {
    loader: 'js', minify: !dev, target: 'es2017', legalComments: 'none',
    sourcefile: 'build/app.js (joined from src/app)'
  });
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, dev ? code : out.code);
  console.log('build/app.js ' + (dev ? '(dev) ' : '') + Math.round(fs.statSync(OUT).size / 1024) + ' KB');
}

build().catch(err => { console.error(err.message); if (!watch) process.exit(1); });

if (watch) {
  let timer = null;
  fs.watch(SRC, () => {
    clearTimeout(timer);
    timer = setTimeout(() => build().catch(err => console.error(err.message)), 50);
  });
  console.log('watching src/app/ …');
}
