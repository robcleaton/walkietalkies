#!/usr/bin/env python3
"""Show how Kokoro will pronounce words, to check or fix a name.

Usage: scripts/kokoro/venv/bin/python scripts/kokoro/phonemes.py Croydon "Dadabhai Naoroji"

Prints the raw en-gb phonemes, then what narrate.py actually sends (after
its year, respelling and Southern-vowel fixes). Try respellings of a word
until the phonemes look right, then add it to PRONOUNCE in narrate.py.
"""
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import narrate  # noqa: E402

if len(sys.argv) < 2:
    sys.exit(__doc__)
k = narrate.Kokoro(os.path.join(HERE, "models", "kokoro-v1.0.onnx"),
                   os.path.join(HERE, "models", "voices-v1.0.bin"))
for text in sys.argv[1:]:
    print(f"{text}\n  raw:  {k.tokenizer.phonemize(text, narrate.LANG)}\n"
          f"  sent: {narrate.southern(k, narrate.speakable(text))}")
