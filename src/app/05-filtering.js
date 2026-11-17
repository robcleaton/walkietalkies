  /* ---------------------------------------------------------------
     Filtering
  --------------------------------------------------------------- */
  function pcRank(pc) {
    if (pc.indexOf('SE') === 0) return parseInt(pc.slice(2), 10);
    return 1000 + pc.charCodeAt(0) + parseInt(pc.slice(2), 10);
  }

  function stopHay(s) {
    return (s.name + ' ' + s.area + ' ' + s.pc + ' ' + s.addr + ' ' + s.text + ' ' + CATS[s.cat])
      .replace(/&[a-z]+;/g, ' ').toLowerCase();
  }

  // Whether a stop belongs on an area page (area = a data-area key, e.g.
  // 'crystal palace'). Stops tagged in Notion's "Areas" multi-select carry
  // an `areas` list of area titles, and that list is the whole answer.
  // Untagged data (an export from before that field existed) falls back to
  // a whole-word match on the stop's name and Area text only — never its
  // Description or Address, which mention neighbouring areas and street
  // names ("Crystal Palace Road", "Lewisham Way") far too often.
  function visible() {
    var q = filters.q.trim().toLowerCase();
    var out = STOPS.filter(function (s) {
      if (filters.cats.length && filters.cats.indexOf(s.cat) === -1) return false;
      if (filters.area) return stopInArea(s, filters.area);
      if (!q) return true;
      return stopHay(s).indexOf(q) !== -1;
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
