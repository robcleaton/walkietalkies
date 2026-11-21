#!/usr/bin/env python3
"""Generate one narration MP3 from a script with Kokoro v1.0.

Usage: python3 narrate.py MODEL_DIR SCRIPT.txt OUT.mp3

Script format: one sentence per line; a blank line is a section break.
Settings: voice bf_alice, en-gb, speed 0.95; 0.4s lead-in, 0.5s between
sentences, 1.0s between sections; MP3 at 96 kbps (needs ffmpeg).
"""
import os
import re
import subprocess
import sys
import tempfile

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

VOICE, LANG, SPEED = "bf_alice", "en-gb", 0.95
LEAD_IN, SENTENCE_GAP, SECTION_GAP = 0.4, 0.5, 1.0
BITRATE = "96k"


ONES = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split()
TENS = "_ _ twenty thirty forty fifty sixty seventy eighty ninety".split()
PLURAL_TENS = {"twenty": "twenties", "thirty": "thirties", "forty": "forties", "fifty": "fifties",
               "sixty": "sixties", "seventy": "seventies", "eighty": "eighties", "ninety": "nineties"}


def two_digits(n):
    if n < 20:
        return ONES[n]
    t, o = divmod(n, 10)
    return TENS[t] + ("-" + ONES[o] if o else "")


def year_words(y, decade=False):
    """1988 -> nineteen eighty-eight, 1901 -> nineteen oh-one, 1900 ->
    nineteen hundred, 2005 -> two thousand and five, 2023 -> twenty
    twenty-three. decade=True: 1980 -> nineteen eighties."""
    hi, lo = divmod(y, 100)
    if decade:
        if lo == 0:
            return "two thousands" if y == 2000 else two_digits(hi) + " hundreds"
        head = two_digits(hi)
        return head + " " + PLURAL_TENS.get(two_digits(lo), two_digits(lo) + "s")
    if 2000 <= y <= 2009:
        return "two thousand" + (" and " + ONES[lo] if lo else "")
    if lo == 0:
        return two_digits(hi) + " hundred"
    if lo < 10:
        return two_digits(hi) + " oh-" + ONES[lo]
    return two_digits(hi) + " " + two_digits(lo)


# A four-digit year 1000-2099, or a decade like 1980s, standing alone: not
# part of a longer number such as 1,700 or £131,632.
YEAR_RE = re.compile(r"(?<![\d,.£$])(1\d{3}|20\d{2})(s?)(?![\d,]\d|\d)")


# Words Kokoro mispronounces, respelled so it says them as locals do.
# Whole words only; add more as they turn up.
PRONOUNCE = {
    "Croydon": "Croydn",  # Kroy-dn, not Kroy-don
    "Glasgow": "Glahsgo",  # Glars-go, not Glaz-go
    "Sydenham": "Sidnum",  # SID-num, not SY-den-ham
    "Dadabhai": "Dahdahbye",  # DAH-dah-bye
    "Naoroji": "Now-rohji",  # now-ROH-jee
    "Dulwich": "Dullitch",  # DULL-itch, no w
}
PRONOUNCE_RE = re.compile(r"\b(" + "|".join(map(re.escape, PRONOUNCE)) + r")\b")


# A year range like 1840–41 or 1904/5: "eighteen forty to forty-one",
# "nineteen oh-four or oh-five".
YEAR_RANGE_RE = re.compile(r"(?<![\d,.£$])(1\d{3}|20\d{2})([–/-])(\d{1,2})(?![\d,]\d|\d)")


def range_end(n):
    return ("oh-" + ONES[n]) if n < 10 else two_digits(n)


def speakable(line):
    line = YEAR_RANGE_RE.sub(lambda m: year_words(int(m.group(1))) +
                             (" or " if m.group(2) == "/" else " to ") + range_end(int(m.group(3))), line)

    def repl(m):
        y = int(m.group(1))
        if m.group(2):
            return year_words(y, decade=True) if y % 10 == 0 else m.group(0)
        return year_words(y)
    line = PRONOUNCE_RE.sub(lambda m: PRONOUNCE[m.group(1)], line)
    return YEAR_RE.sub(repl, line)


# Southern English BATH words: said with a long "ah" (cast = kahst), where
# Kokoro's en-gb gives the short northern "a". Words like cat, man,
# classic and plastic keep the short "a", as they do in the south.
BATH_WORDS = """
advance advantage after afternoon afterwards aftermath answer ask aunt
basket bath blast brass branch calf castle cast chance chant clasp class
command craft dance demand disaster draft example fast France ghastly glass
graft grant graph grasp grass half last laugh mask mast master nasty pass
past pastor path plant plaster raft rafter rather sample shaft slant staff
task vast
craftsman craftsmen craftsmanship glasshouse glasshouses pathway pathways
""".split()
BATH_SUFFIXES = ["", "s", "es", "ed", "d", "ing", "er", "ers", "ly", "y"]
BATH_FORMS = {w.lower() + suf for w in BATH_WORDS for suf in BATH_SUFFIXES}
# dance -> dancing, danced: the e drops before -ing / -ed.
BATH_FORMS |= {w.lower()[:-1] + suf for w in BATH_WORDS if w.endswith("e") for suf in ("ing", "ed", "er", "ers")}
WORD_RE = re.compile(r"[A-Za-z]+")
# Where a word's phonemes start and end inside a sentence's phonemes.
PH_EDGE_L = r"(?<![^\s.,;:!?—–\"“”‘’()\-])"
PH_EDGE_R = r"(?=$|[\sˈˌ.,;:!?—–\"“”‘’()\-])"
_word_ph = {}


def southern(kokoro, sentence):
    """The sentence's phonemes, with BATH words given the long ɑː."""
    ph = kokoro.tokenizer.phonemize(sentence, LANG)
    for word in {w for w in WORD_RE.findall(sentence) if w.lower() in BATH_FORMS}:
        if word not in _word_ph:
            p = kokoro.tokenizer.phonemize(word, LANG).strip(" .")
            # The first short a, not the a of a diphthong (aɪ, aʊ).
            _word_ph[word] = (p, re.sub(r"a(?![ɪʊː])", "ɑː", p, count=1))
        old, new = _word_ph[word]
        if old != new:
            ph = re.sub(PH_EDGE_L + re.escape(old) + PH_EDGE_R, new, ph)
    return ph


def sections(path):
    """The script as a list of sections, each a list of sentences."""
    out, cur = [], []
    with open(path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                cur.append(speakable(line))
            elif cur:
                out.append(cur)
                cur = []
    if cur:
        out.append(cur)
    return out


def render(kokoro, script, out):
    """Narrate one script file to an MP3 at out."""
    sr, parts = None, []

    def silence(sec):
        return np.zeros(int(sr * sec), dtype=np.float32)

    for i, sec in enumerate(sections(script)):
        for j, sentence in enumerate(sec):
            samples, rate = kokoro.create(southern(kokoro, sentence), voice=VOICE,
                                          speed=SPEED, lang=LANG, is_phonemes=True)
            if sr is None:
                sr = rate
                parts.append(silence(LEAD_IN))
            elif j == 0:
                parts.append(silence(SECTION_GAP))
            else:
                parts.append(silence(SENTENCE_GAP))
            parts.append(np.asarray(samples, dtype=np.float32))
    if sr is None:
        raise ValueError(script + " is empty")

    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        wav = tmp.name
    try:
        sf.write(wav, np.concatenate(parts), sr)
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav,
                        "-codec:a", "libmp3lame", "-b:a", BITRATE, out], check=True)
    finally:
        os.remove(wav)


def main():
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    model_dir, script, out = sys.argv[1:]
    kokoro = Kokoro(os.path.join(model_dir, "kokoro-v1.0.onnx"),
                    os.path.join(model_dir, "voices-v1.0.bin"))
    render(kokoro, script, out)
    print(out)


if __name__ == "__main__":
    main()
