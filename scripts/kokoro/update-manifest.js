// Points every manifest entry at its Kokoro clip in assets/audio/kokoro/<area>/,
// with a fresh hash of the file. Prints how many changed.
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const ROOT = process.argv[2], A = path.join(ROOT, "assets/audio"), mp = path.join(A, "manifest.json");
const m = JSON.parse(fs.readFileSync(mp, "utf8")); let changed = 0;
for (const area of fs.readdirSync(path.join(A, "kokoro"))) {
  const dir = path.join(A, "kokoro", area); if (!fs.statSync(dir).isDirectory()) continue;
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".mp3"))) {
    const id = f.slice(0, -4), file = `kokoro/${area}/${f}`;
    const fileHash = crypto.createHash("sha256").update(fs.readFileSync(path.join(dir, f))).digest("hex").slice(0, 16);
    const e = m[id] || (m[id] = {});
    if (e.file !== file || e.fileHash !== fileHash) { Object.assign(e, { file, fileHash, fileVoice: "kokoro-v1.0/bf_alice" }); changed++; }
  }
}
fs.writeFileSync(mp, JSON.stringify(m, null, 2) + "\n");
console.log(`manifest: ${Object.keys(m).length} stops, ${changed} updated`);
