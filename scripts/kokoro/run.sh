#!/bin/bash
# Narrates the scripts plan.js wrote (scripts/kokoro/work/<area>/*.txt) into
# assets/audio/kokoro/<area>/<id>.mp3, then updates assets/audio/manifest.json
# after each area, so finished areas get Listen buttons straight away.
#
#   scripts/kokoro/run.sh           skip clips that already exist (resumable)
#   scripts/kokoro/run.sh --force   remake every planned clip (after a fix)
set -u
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
PY="$HERE/venv/bin/python"
FORCE=0; [ "${1:-}" = "--force" ] && FORCE=1

[ -x "$PY" ] || { echo "No venv: see scripts/kokoro/README.md"; exit 1; }
[ -d "$HERE/work" ] || { echo "Nothing planned: run node scripts/kokoro/plan.js first"; exit 1; }

for d in "$HERE"/work/*/; do
  area=$(basename "$d"); out="$ROOT/assets/audio/kokoro/$area"; mkdir -p "$out"
  todo=()
  for f in "$d"*.txt; do
    id=$(basename "$f" .txt)
    if [ "$FORCE" = 1 ] || [ ! -s "$out/$id.mp3" ]; then todo+=("$f"); fi
  done
  [ ${#todo[@]} -eq 0 ] && continue
  echo "== $area: ${#todo[@]} clip(s) ($(date +%H:%M))"
  "$PY" "$HERE/batch.py" "$HERE/models" "$out" "${todo[@]}" || echo "!! $area failed"
  node "$HERE/update-manifest.js" "$ROOT"
done
echo "Done $(date +%H:%M)"
