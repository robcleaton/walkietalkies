# Kokoro narration

Makes the stop narration MP3s in `assets/audio/kokoro/<area>/<stop-id>.mp3`
with [Kokoro v1.0](https://github.com/thewh1teagle/kokoro-onnx) (Apache-2.0),
run locally — no API, no cost. `assets/audio/manifest.json` points each stop
at its clip; the site's Listen button plays whatever the manifest names.

Voice `bf_alice`, en-gb, speed 0.95; 0.4s lead-in, 0.5s between sentences,
1.0s between sections; MP3 at 96 kbps.

## Setup (once)

Needs Python 3.12 (onnxruntime has no Intel-Mac build for 3.14) and ffmpeg.

```sh
brew install python@3.12 ffmpeg
/usr/local/opt/python@3.12/bin/python3.12 -m venv scripts/kokoro/venv
scripts/kokoro/venv/bin/pip install kokoro-onnx soundfile
mkdir -p scripts/kokoro/models && cd scripts/kokoro/models
B=https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0
curl -LO $B/kokoro-v1.0.onnx -LO $B/voices-v1.0.bin   # ~350 MB
```

`venv/`, `models/` and `work/` are git-ignored.

## Make clips

```sh
node scripts/kokoro/plan.js         # plan stops with no clip yet (e.g. new ones from Notion)
scripts/kokoro/run.sh               # narrate them and update the manifest
```

Regenerate after a text or pronunciation change:

```sh
node scripts/kokoro/plan.js --match=Croydon   # every stop mentioning a word
node scripts/kokoro/plan.js --only=horniman   # particular stops (comma-separated)
node scripts/kokoro/plan.js --area=penge      # a whole area
scripts/kokoro/run.sh --force
```

About 15–20 seconds a clip on an Intel Mac; `run.sh` without `--force` skips
clips that exist, so an interrupted run can just be started again.

## Pronunciation

`narrate.py` fixes what Kokoro gets wrong before it speaks:

- **Years** as spoken: 1988 → nineteen eighty-eight, 1901 → nineteen oh-one,
  1980s → nineteen eighties, 1904/5 → nineteen oh-four or oh-five.
- **Southern vowels**: BATH words (cast, glass, path, after…) get the long
  "ah"; Kokoro's en-gb gives the northern short a. Add words to `BATH_WORDS`.
- **Names**: respellings in `PRONOUNCE` (Croydon → Croydn, Sydenham → Sidnum…).

To fix a name, find a respelling whose phonemes sound right:

```sh
scripts/kokoro/venv/bin/python scripts/kokoro/phonemes.py Sydenham Sidnum
```

then add it to `PRONOUNCE` and regenerate with `plan.js --match=<word>`.

## Files

- `narrate.py` — one script → one MP3; holds the voice settings and fixes.
- `batch.py` — many scripts with one model load (used by `run.sh`).
- `plan.js` — writes scripts from `data.js` into `work/`.
- `run.sh` — narrates `work/` and updates the manifest per area.
- `update-manifest.js` — points manifest entries at the clips in `assets/audio/kokoro/`.
- `phonemes.py` — shows how a word will be pronounced.
