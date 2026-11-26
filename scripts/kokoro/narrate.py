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
    "Portobello": "Porta-bello",  # Port-a-BELL-o
    "Havelock": "Havlock",  # HAV-lock, not HAYV-lock
    "Domesday": "Doomsday",  # the Domesday Book
    "Bussey": "Bus-ee",  # BUS-ee, the Peckham building
    "Damilola": "Dammy-ola",  # DAM-ee-OH-la, not DAY-mi-lola
    "Leitch": "Leech",  # Archibald Leitch, the stadium architect
    "Baden-Powell": "Bayden Pole",  # BAY-den POLE
    "Rindt": "Rint",  # Jochen Rindt
    "Kail": "Kale",  # Edgar Kail, Dulwich Hamlet
    "Victory VI": "Victory Six",  # HMS Victory VI, the Crystal Palace naval base
    "Southwark": "Sutherck",  # SUTH-uk
    "Woolwich": "Woolitch",  # WOOL-itch, no w
    "Eltham": "Eltum",  # ELT-um, no th
    "Caröe": "Carrow",  # CA-row, W. D. Caröe the architect
    "Gervais": "Zhervay",  # zher-VAY, Eugène-Jacques Gervais
    "Menier": "Menyay",  # MEN-ee-ay, the French chocolate firm
    "Searles": "Surls",  # SURLS, Michael Searles the architect
    "Cabanel": "Cabba-nell",  # CAB-a-nel, Rudolph Cabanel
    "Anerley": "Annerlee",  # AN-er-lee
    "Haslehurst": "Hazelhurst",  # HAZEL-hurst, Edward Haslehurst, the library architect
    "Streatfeild": "Stretfield",  # STRET-field, T. E. C. Streatfeild, the Foresters Hall architect
    "Segal": "Seagol",  # SEA-gol, Walter Segal the self-build architect
    "Metropolitano": "Metro-pollee-tahno",  # meh-troh-pol-lee-TAH-noh, Mercato Metropolitano
    "Perronet": "Pairo-nay",  # PAIR-oh-nay, Perronet House
    "Xinjiang": "Shin-jyang",  # SHIN-jyang
    # The Firkin pubs' Latin motto: left out of the audio, which keeps
    # the translation that follows it ("drink until you die").
    "motto was Usque ad Mortem Bibendum": "motto was",
    # Roman numerals that aren't regnal (Kokoro says "Roman four").
    "Gipsy Moth IV": "Gipsy Moth Four",
    "Highpoint I": "Highpoint One",
    "Equivalent VIII": "Equivalent Eight",
}

# Regnal numbers: Henry VIII → Henry the Eighth, John Paul II → John Paul
# the Second. Kokoro reads "VIII" as "Roman eight" and "I" as "eye".
ROMAN = {"I": 1, "II": 2, "III": 3, "IV": 4, "V": 5, "VI": 6, "VII": 7, "VIII": 8, "IX": 9, "X": 10}
ORDINAL = ["", "First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth"]
REGNAL_NAMES = ("Anne Charles Edward Elizabeth George Haakon Henry James John Mary Mutesa Olav "
                "Paul Richard Victoria William Gheyn").split()
REGNAL_RE = re.compile(r"\b(" + "|".join(REGNAL_NAMES) + r") (X|IX|IV|V?I{1,3}|V)\b")
# Listed buildings: Grade II* → Grade two-star.
GRADE_RE = re.compile(r"\bGrade (II|I)\b(\*)?")
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
    line = REGNAL_RE.sub(lambda m: f"{m.group(1)} the {ORDINAL[ROMAN[m.group(2)]]}", line)
    line = GRADE_RE.sub(lambda m: "Grade " + ("one" if m.group(1) == "I" else "two") + ("-star" if m.group(2) else ""), line)
    line = YEAR_RE.sub(repl, line)
    return PRICE_RE.sub(price_words, line)


# Prices said as people say them: £290 million → 290 million pounds,
# £3.5m → 3.5 million pounds, £298.86 → 298 pounds 86, £1 → 1 pound.
# Runs after the year fix, so £1850 isn't read as a year.
PRICE_RE = re.compile(r"£(\d[\d,]*(?:\.\d+)?)(?:\s?(million|billion|thousand)\b|(m|bn|k)\b)?")
PRICE_UNITS = {"m": "million", "bn": "billion", "k": "thousand"}


def price_words(m):
    num, unit = m.group(1), m.group(2) or PRICE_UNITS.get(m.group(3))
    if unit:
        return f"{num} {unit} pounds"
    whole, _, pence = num.partition(".")
    words = f"{whole} pound" + ("" if whole == "1" else "s")
    return f"{words} {pence}" if len(pence) == 2 and pence != "00" else words


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
COMPOUND_RE = re.compile(r"\b[A-Za-z]+(?:-[A-Za-z]+)+\b")
# Where a word's phonemes start and end inside a sentence's phonemes.
PH_EDGE_L = r"(?<![^\s.,;:!?—–\"“”‘’()\-])"
PH_EDGE_R = r"(?=$|[\sˈˌ.,;:!?—–\"“”‘’()\-])"
_word_ph = {}


def southern(kokoro, sentence):
    """The sentence's phonemes, with BATH words given the long ɑː."""
    # Kokoro runs a hyphenated compound into one word (fast-moving →
    # fˈastmˈuːvɪŋ), hiding the BATH word inside it, so split those apart.
    sentence = COMPOUND_RE.sub(
        lambda m: m.group(0).replace("-", " ")
        if any(p.lower() in BATH_FORMS for p in m.group(0).split("-")) else m.group(0), sentence)
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


# Lines Kokoro can't say right from text: exact phonemes and speed. A
# one-word title at the normal pace, ending in a full stop, drags out
# ("Here." came out as "hereee"), so it's said quicker with no stop.
LINE_OVERRIDE = {
    "Here.": ("hˈiə", 1.4),  # the-line-here, the "Here 24,859" sign
}


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
            ph, speed = LINE_OVERRIDE.get(sentence) or (southern(kokoro, sentence), SPEED)
            samples, rate = kokoro.create(ph, voice=VOICE, speed=speed,
                                          lang=LANG, is_phonemes=True)
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
