#!/usr/bin/env python3
"""Narrate several scripts with one model load.

Usage: python3 batch.py MODEL_DIR OUT_DIR SCRIPT.txt [SCRIPT.txt ...]
Writes OUT_DIR/<script name>.mp3 for each script.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import narrate  # noqa: E402


def main():
    if len(sys.argv) < 4:
        sys.exit(__doc__)
    model_dir, out_dir, scripts = sys.argv[1], sys.argv[2], sys.argv[3:]
    kokoro = narrate.Kokoro(os.path.join(model_dir, "kokoro-v1.0.onnx"),
                            os.path.join(model_dir, "voices-v1.0.bin"))
    for script in scripts:
        name = os.path.splitext(os.path.basename(script))[0]
        try:
            narrate.render(kokoro, script, os.path.join(out_dir, name + ".mp3"))
            print("done", name, flush=True)
        except Exception as e:  # one bad script shouldn't stop the rest
            print("FAILED", name, repr(e), flush=True)


if __name__ == "__main__":
    main()
