  /* ---------------------------------------------------------------
     Filtering
  --------------------------------------------------------------- */
  function pcRank(pc) {
    if (pc.indexOf('SE') === 0) return parseInt(pc.slice(2), 10);
    return 1000 + pc.charCodeAt(0) + parseInt(pc.slice(2), 10);
  }

  // Text folded for searching: lower case, accents dropped ("café" →
  // "cafe"), apostrophes removed ("St Mary's" → "st marys") and every
  // other run of punctuation turned into a single space.
  function searchNorm(str) {
    return str
      .replace(/&(rsquo|lsquo|apos|#39|#8217);/g, '')
      .replace(/&[a-z0-9#]+;/gi, ' ')
      .toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/['’‘`]/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  // A search query as its separate words. Every word has to turn up
  // somewhere in a stop, in any order, so "telephone exchange forest hill"
  // finds the same stop as "forest hill telephone exchange". Words match
  // as prefixes of the stop's words, so a half-typed "teleph" still counts.
  function searchWords(q) {
    var n = searchNorm(q);
    return n ? n.split(' ') : [];
  }

  function stopHay(s) {
    return ' ' + searchNorm(s.name + ' ' + s.area + ' ' + s.pc + ' ' + s.addr + ' ' + stopRefsPlain(s.text) + ' ' + CATS[s.cat]) + ' ';
  }

  function stopMatches(s, words) {
    var hay = stopHay(s);
    return words.every(function (w) { return hay.indexOf(' ' + w) !== -1; });
  }

  // Whether a stop belongs on an area page (area = a data-area key, e.g.
  // 'crystal palace'). Stops tagged in Notion's "Areas" multi-select carry
  // an `areas` list of area titles, and that list is the whole answer.
  // Untagged data (an export from before that field existed) falls back to
  // a whole-word match on the stop's name and Area text only — never its
  // Description or Address, which mention neighbouring areas and street
  // names ("Crystal Palace Road", "Lewisham Way") far too often.
  function visible() {
    var words = searchWords(filters.q);
    var out = STOPS.filter(function (s) {
      if (filters.cats.length && filters.cats.indexOf(s.cat) === -1) return false;
      if (filters.area) return stopInArea(s, filters.area);
      if (!words.length) return true;
      return stopMatches(s, words);
    });
    var sorters = {
      district: function (a, b) { return pcRank(a.pc) - pcRank(b.pc) || a.lon - b.lon; },
      west:     function (a, b) { return a.lon - b.lon; },
      year:     function (a, b) { return a.year - b.year; },
      az:       function (a, b) { return stripEnt(a.name).localeCompare(stripEnt(b.name)); }
    };
    return out.sort(sorters[filters.sort]);
  }

  function stripEnt(s) { return s.replace(/&[a-z]+;/g, '’'); }

  function areaPostcodes(area) {
    var seen = {};
    var pcs = [];
    STOPS.forEach(function (s) {
      if (!stopInArea(s, area.toLowerCase())) return;
      if (seen[s.pc]) return;
      seen[s.pc] = true;
      pcs.push(s.pc);
    });
    return pcs.sort(function (a, b) { return pcRank(a) - pcRank(b); });
  }

  function postcodeBadgesHTML(pcs) {
    return pcs.map(function (pc) {
      return '<span class="inline-flex items-center rounded-md border border-black/10 bg-white px-2 py-0.5 text-[12px] font-mono font-semibold uppercase tracking-[0.04em] text-black/80 whitespace-nowrap">' + pc + '</span>';
    }).join('');
  }
