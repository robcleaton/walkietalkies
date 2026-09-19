(function () {
  'use strict';

  /* ---------------------------------------------------------------
     The gazetteer
  --------------------------------------------------------------- */
  var CATS = {
    plaque:   'Blue plaque',
    grand:    'Great building',
    maritime: 'River & sea',
    works:    'Industry & invention',
    culture:  'Museum & gallery',
    memory:   'Memorial & protest',
    green:    'Park & burial ground',
    pub:      'Historic pub',
    art:      'Art & artists',
    brewery:  'Brewery',
    resident: 'Notable residents'
  };

  var CATMARK = {
    plaque:   { color:'var(--plaque)',    fg:'#fff',    icon:'<path d="M 128 64 L 160 33 L 192.5 0 L 256 0 L 256 64 L 192 128 L 191.5 128 L 224 161 L 256 192 L 256 256 L 192 256 L 128 192 L 96 223 L 63.5 256 L 0 256 L 0 192 L 64 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 Z"/>' },
    grand:    { color:'var(--marigold)',  fg:'#171717', icon:'<path d="M 152 70.059 L 201.539 20.519 L 235.48 54.461 L 185.941 104 L 256 104 L 256 152 L 185.941 152 L 235.48 201.539 L 201.539 235.48 L 152 185.941 L 152 256 L 104 256 L 104 185.941 L 54.46 235.48 L 20.52 201.539 L 70.059 152 L 0 152 L 0 104 L 70.059 104 L 20.519 54.46 L 54.461 20.52 L 104 70.059 L 104 0 L 152 0 Z"/>' },
    maritime: { color:'var(--verdigris)', fg:'#fff',    icon:'<path d="M 180 0 C 221.974 0 256 34.026 256 76 L 256 256 L 208 256 L 208 76 C 208 60.536 195.464 48 180 48 C 164.536 48 152 60.536 152 76 L 152 180 C 152 221.974 117.974 256 76 256 C 34.026 256 0 221.974 0 180 L 0 0 L 48 0 L 48 180 C 48 195.464 60.536 208 76 208 C 91.464 208 104 195.464 104 180 L 104 76 C 104 34.026 138.026 0 180 0 Z"/>' },
    works:    { color:'var(--tomato)',    fg:'#fff',    icon:'<path d="M 164 0 C 188.301 0 208 19.7 208 44 C 208 45.417 207.93 46.818 207.799 48.2 C 209.182 48.07 210.583 48 212 48 C 236.301 48 256 67.7 256 92 C 256 106.883 248.609 120.037 237.3 128 C 248.609 135.963 256 149.117 256 164 C 256 188.301 236.301 208 212 208 C 210.583 208 209.182 207.93 207.799 207.799 C 207.93 209.182 208 210.583 208 212 C 208 236.301 188.301 256 164 256 C 149.117 256 135.963 248.609 128 237.3 C 120.037 248.609 106.883 256 92 256 C 67.7 256 48 236.301 48 212 C 48 210.583 48.07 209.182 48.2 207.799 C 46.804 207.932 45.402 207.999 44 208 C 19.7 208 0 188.301 0 164 C 0 149.118 7.39 135.963 18.7 128 C 7.39 120.037 0 106.882 0 92 C 0 67.7 19.7 48 44 48 C 45.417 48 46.818 48.07 48.2 48.2 C 48.07 46.818 48 45.417 48 44 C 48 19.7 67.7 0 92 0 C 106.882 0 120.037 7.39 128 18.7 C 135.963 7.39 149.118 0 164 0 Z M 128 69.3 C 120.037 80.61 106.883 88 92 88 C 90.583 88 89.182 87.93 87.799 87.799 C 87.932 89.195 87.999 90.597 88 92 C 88 106.883 80.61 120.037 69.3 128 C 80.61 135.963 88 149.117 88 164 C 88 165.417 87.93 166.818 87.799 168.2 C 89.182 168.069 90.583 168 92 168 C 106.882 168 120.037 175.39 128 186.699 C 135.963 175.39 149.118 168 164 168 C 165.417 168 166.818 168.069 168.2 168.2 C 168.067 166.804 168 165.402 168 164 C 168 149.118 175.39 135.963 186.699 128 C 175.39 120.037 168 106.882 168 92 C 168 90.583 168.069 89.182 168.2 87.799 C 166.804 87.932 165.402 87.999 164 88 C 149.117 88 135.963 80.61 128 69.3 Z"/>' },
    culture:  { color:'var(--violet)',    fg:'#fff',    icon:'<path d="M 128 0 C 198.692 0 256 57.308 256 128 C 256 198.692 198.692 256 128 256 C 57.308 256 0 198.692 0 128 C 0 57.308 57.308 0 128 0 Z M 128 32 C 74.98 32 32 74.98 32 128 C 32 181.019 74.98 224 128 224 C 181.019 224 224 181.019 224 128 C 224 74.98 181.019 32 128 32 Z M 128 56 C 167.765 56 200 88.236 200 128 C 200 167.765 167.765 200 128 200 C 88.236 200 56 167.765 56 128 C 56 88.236 88.236 56 128 56 Z M 128 88 C 105.909 88 88 105.909 88 128 C 88 150.091 105.909 168 128 168 C 150.091 168 168 150.091 168 128 C 168 105.909 150.091 88 128 88 Z M 128 112 C 136.837 112 144 119.163 144 128 C 144 136.837 136.837 144 128 144 C 119.163 144 112 136.837 112 128 C 112 119.163 119.163 112 128 112 Z"/>' },
    memory:   { color:'var(--violet)',    fg:'#fff',    icon:'<path d="M 256 0 C 256 35.346 227.346 64 192 64 C 227.346 64 256 92.654 256 128 C 256 163.346 227.346 192 192 192 C 227.346 192 256 220.654 256 256 L 0 256 C 0 220.654 28.654 192 64 192 C 28.654 192 0 163.346 0 128 C 0 92.654 28.654 64 64 64 C 28.654 64 0 35.346 0 0 Z"/>' },
    green:    { color:'var(--verdigris)', fg:'#fff',    icon:'<path d="M 64 0 C 99.346 0 128 28.654 128 64 L 128 192 C 128 227.346 99.346 256 64 256 C 28.654 256 0 227.346 0 192 C 0 156.654 28.654 128 64 128 C 28.654 128 0 99.346 0 64 C 0 28.654 28.654 0 64 0 Z M 192 128 C 156.654 128 128 99.346 128 64 C 128 28.654 156.654 0 192 0 C 227.346 0 256 28.654 256 64 L 256 192 C 256 227.346 227.346 256 192 256 C 156.654 256 128 227.346 128 192 C 128 156.654 156.654 128 192 128 Z"/>' },
    pub:      { color:'var(--tomato)',    fg:'#fff',    icon:'<path d="M 192 0 C 227.346 0 256 28.654 256 64 C 256 99.346 227.346 128 192 128 C 227.346 128 256 156.654 256 192 C 256 227.346 227.346 256 192 256 C 156.654 256 128 227.346 128 192 C 128 227.346 99.346 256 64 256 C 28.654 256 0 227.346 0 192 C 0 156.654 28.654 128 64 128 C 28.654 128 0 99.346 0 64 C 0 28.654 28.654 0 64 0 C 99.346 0 128 28.654 128 64 C 128 28.654 156.654 0 192 0 Z M 64 160 C 46.327 160 32 174.327 32 192 C 32 209.673 46.327 224 64 224 C 81.673 224 96 209.673 96 192 C 96 174.327 81.673 160 64 160 Z M 192 160 C 174.327 160 160 174.327 160 192 C 160 209.673 174.327 224 192 224 C 209.673 224 224 209.673 224 192 C 224 174.327 209.673 160 192 160 Z M 64 32 C 46.327 32 32 46.327 32 64 C 32 81.673 46.327 96 64 96 C 81.673 96 96 81.673 96 64 C 96 46.327 81.673 32 64 32 Z M 192 32 C 174.327 32 160 46.327 160 64 C 160 81.673 174.327 96 192 96 C 209.673 96 224 81.673 224 64 C 224 46.327 209.673 32 192 32 Z"/>' },
    art:      { color:'var(--bubblegum)', fg:'#fff',    icon:'<path d="M 28 0 C 83.228 0 128 44.772 128 100 C 128 44.772 172.772 0 228 0 L 256 0 L 256 156 C 256 211.228 211.228 256 156 256 L 100 256 C 44.772 256 0 211.228 0 156 L 0 0 Z"/>' },
    brewery:  { color:'var(--brass)',     fg:'#171717', icon:'<path d="M 0 128.007 C 0.004 198.696 57.31 256 128 256 L 0 256 Z M 256 256 L 128 256 C 198.69 256 255.996 198.696 256 128.007 Z M 192 128 C 192 163.346 163.346 192 128 192 C 92.654 192 64 163.346 64 128 Z M 128 0 C 198.692 0 256 57.308 256 128 L 192 128 C 192 92.654 163.346 64 128 64 C 92.654 64 64 92.654 64 128 L 0 128 C 0 57.308 57.308 0 128 0 Z"/>' },
    resident: { color:'var(--marigold)',  fg:'#171717', icon:'<path d="M 228 0 C 172.772 0 128 44.772 128 100 L 128 0 L 0 0 L 0 28 C 0 83.228 44.772 128 100 128 L 0 128 L 0 256 L 28 256 C 83.228 256 128 211.228 128 156 L 128 256 L 256 256 L 256 228 C 256 172.772 211.228 128 156 128 L 256 128 L 256 0 Z"/>' }
  };

  function catChip(cat) {
    var m = CATMARK[cat];
    return '<span class="inline-flex items-center gap-1.5 shrink-0 rounded-full pl-1.5 pr-3 py-1" style="background:' + m.color + ';color:' + m.fg + '">' +
      '<svg viewBox="0 0 256 256" width="14" height="14" fill="' + m.fg + '" aria-hidden="true">' + m.icon + '</svg>' +
      '<span class="eyebrow">' + CATS[cat] + '</span>' +
    '</span>';
  }

  function catFilterChip(cat, count) {
    var m = CATMARK[cat];
    return '<button class="cat-chip" data-cat="' + cat + '" aria-pressed="false" style="background:' + m.color + ';color:' + m.fg + '">' +
      '<svg viewBox="0 0 256 256" width="14" height="14" fill="' + m.fg + '" aria-hidden="true">' + m.icon + '</svg>' +
      '<span class="cat-chip__name">' + CATS[cat] + '</span>' +
      '<span class="cat-chip__count">' + count + '</span>' +
    '</button>';
  }

  var SEED = ['cutty-sark', 'painted-hall', 'queens-house', 'royal-observatory', 'wolfe-macartney'];
  var LS_KEY = 'meridian-rounds.route.v1';
  var DOC_PATH = 'routes/current';

  var byId = {};
  STOPS.forEach(function (s) { byId[s.id] = s; });

  var REQUIRED_STOP_FIELDS = ['id', 'img', 'name', 'area', 'pc', 'cat', 'year', 'era', 'lat', 'lon', 'addr', 'text'];
  STOPS.forEach(function (s) {
    REQUIRED_STOP_FIELDS.forEach(function (f) {
      if (s[f] === undefined || s[f] === null || s[f] === '') {
        console.warn('Gazetteer entry "' + (s.id || '?') + '" is missing required field "' + f + '"');
      }
    });
  });

  // A fixed set of 10 random stops for the homepage's horizontal-scroll
  // teaser row, picked once per page load so it doesn't reshuffle as the
  // user adds/removes stops from their route.
  var HOME_RANDOM_STOPS = STOPS.slice().sort(function () { return Math.random() - 0.5; }).slice(0, 10);

  /* ---------------------------------------------------------------
     State
  --------------------------------------------------------------- */
  var route = [];
  var seeded = false;
  var filters = { q: '', cats: [], sort: 'district', areaRe: null };
  var db = null, docRef = null, adopted = false;

  function loadLocal() {
    try {
      var raw = localStorage.getItem(LS_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.stops)) return { stops: clean(parsed.stops), seeded: false };
      }
    } catch (e) { /* private mode, blocked storage — fall through */ }
    return { stops: SEED.slice(), seeded: true };
  }

  function saveLocal() {
    try { localStorage.setItem(LS_KEY, JSON.stringify({ stops: route })); } catch (e) { /* private mode, blocked storage — fall through */ }
  }

  function clean(ids) {
    var seen = {};
    return ids.filter(function (id) {
      if (typeof id !== 'string' || !byId[id] || seen[id]) return false;
      seen[id] = 1; return true;
    });
  }

  var initial = loadLocal();
  route = initial.stops;
  seeded = initial.seeded;

  /* ---------------------------------------------------------------
     Geography
  --------------------------------------------------------------- */
  function haversine(a, b) {
    var R = 6371, toRad = Math.PI / 180;
    var dLat = (b.lat - a.lat) * toRad, dLon = (b.lon - a.lon) * toRad;
    var la1 = a.lat * toRad, la2 = b.lat * toRad;
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(la1) * Math.cos(la2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
  }

  function routeKm() {
    var total = 0;
    for (var i = 1; i < route.length; i++) total += haversine(byId[route[i - 1]], byId[route[i]]);
    return total;
  }

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  /* ---------------------------------------------------------------
     Route map (Leaflet + OpenStreetMap) — a small preview of the
     current route, numbered pins in stop order plus the walking line
  --------------------------------------------------------------- */
  var routeMapEl = document.getElementById('routeMap');
  var routeMap = null, routeMapLayer = null;

  function renderRouteMap() {
    var n = route.length;
    routeMapEl.classList.toggle('hidden', n === 0);
    if (n === 0 || typeof L === 'undefined') return;

    if (!routeMap) {
      routeMap = L.map(routeMapEl, { scrollWheelZoom: false });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'
      }).addTo(routeMap);
      routeMapLayer = L.layerGroup().addTo(routeMap);
    }
    routeMapLayer.clearLayers();

    var latlngs = route.map(function (id) { return [byId[id].lat, byId[id].lon]; });
    L.polyline(latlngs, { color: '#171717', weight: 3, opacity: .55, dashArray: '1 8', lineCap: 'round' }).addTo(routeMapLayer);
    route.forEach(function (id, i) {
      var s = byId[id];
      var icon = L.divIcon({
        className: '',
        html: '<span class="flex items-center justify-center w-[22px] h-[22px] rounded-full text-white font-mono text-[11px] font-semibold" style="background:var(--verdigris);box-shadow:0 1px 3px rgba(0,0,0,.4)">' + (i + 1) + '</span>',
        iconSize: [22, 22], iconAnchor: [11, 11]
      });
      L.marker([s.lat, s.lon], { icon: icon }).addTo(routeMapLayer).bindPopup(plain(s.name));
    });

    routeMap.invalidateSize();
    if (latlngs.length === 1) routeMap.setView(latlngs[0], 15);
    else routeMap.fitBounds(latlngs, { padding: [24, 24] });
  }

  /* ---------------------------------------------------------------
     Persistence
  --------------------------------------------------------------- */
  function persist() {
    saveLocal();
    if (docRef) {
      docRef.set({ stops: route, updatedAt: new Date().toISOString() }).catch(function () {});
    }
  }

  (function connect() {
    if (!window.claude || typeof window.claude.use !== 'function') return;
    window.claude.use('db').then(function (ns) {
      if (!ns) return;
      db = ns;
      docRef = db.doc(DOC_PATH);
      docRef.onSnapshot(function (snap) {
        var data = snap.exists ? snap.data() : null;
        if (data && Array.isArray(data.stops)) {
          var next = clean(data.stops);
          adopted = true;
          if (next.join('|') !== route.join('|')) {
            route = next; seeded = false;
            renderRoute(); renderList();
          }
        } else if (!adopted) {
          adopted = true; // nothing stored yet: keep the local/starter route, write on first edit
        }
      }, function () {});
    }).catch(function () {});
  })();

  /* ---------------------------------------------------------------
     Route operations
  --------------------------------------------------------------- */
  function inRoute(id) { return route.indexOf(id) !== -1; }

  function toggle(id) {
    var i = route.indexOf(id);
    if (i === -1) {
      // Belt-and-braces: the button is already disabled for a stop with
      // no pinned location (see stopHTML), but never let one into the
      // route by any path — everything downstream (distance/time maths,
      // the Leaflet map, GPX export) trusts route stops to have real coords.
      var s = byId[id];
      if (!s || s.lat === null || s.lat === undefined || s.lon === null || s.lon === undefined) return;
      route.push(id);
    } else {
      route.splice(i, 1);
    }
    seeded = false;
    persist(); renderRoute(); renderList();
  }

  function move(id, dir) {
    var i = route.indexOf(id), j = i + dir;
    if (i === -1 || j < 0 || j >= route.length) return;
    var tmp = route[i]; route[i] = route[j]; route[j] = tmp;
    seeded = false;
    persist(); renderRoute();
  }

  function clearRoute() {
    route = []; seeded = false;
    persist(); renderRoute(); renderList();
  }

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

  function visible() {
    var q = filters.q.trim().toLowerCase();
    var out = STOPS.filter(function (s) {
      if (filters.cats.length && filters.cats.indexOf(s.cat) === -1) return false;
      if (!q && !filters.areaRe) return true;
      var hay = stopHay(s);
      if (filters.areaRe) return filters.areaRe.test(hay);
      return hay.indexOf(q) !== -1;
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
    var re = new RegExp('\\b' + escapeRegExp(area.toLowerCase()) + '\\b');
    var seen = {};
    var pcs = [];
    STOPS.forEach(function (s) {
      if (!re.test((s.name + ' ' + s.area + ' ' + s.pc + ' ' + s.addr).toLowerCase())) return;
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

  /* ---------------------------------------------------------------
     Render: gazetteer
  --------------------------------------------------------------- */
  var listEl = document.getElementById('list');
  var homeListEl = document.getElementById('homeList');
  var areaMatchesEl = document.getElementById('areaMatches');

  function renderList() {
    var items = visible();
    var isHome = !filters.q && !filters.cats.length && !filters.areaRe;
    // The count line ("N stops") is only useful once it reflects an actual
    // search/filter/area — on the plain homepage it's just noise, so leave
    // it blank there.
    document.getElementById('resultCount').textContent = isHome ? '' :
      items.length + (items.length === 1 ? ' stop' : ' stops');

    // Typing a search that matches an area's name surfaces that area as
    // its own chip above the stop results — e.g. "forest" turns up a
    // "Forest Hill 32" chip, a shortcut to the area page itself rather
    // than only the individual stops whose text happens to match.
    var areaMatches = filters.q ? matchingAreas(filters.q) : [];
    if (areaMatches.length) {
      areaMatchesEl.innerHTML = areaMatches.map(areaMatchChipHTML).join('');
      areaMatchesEl.classList.remove('hidden');
    } else {
      areaMatchesEl.classList.add('hidden');
      areaMatchesEl.innerHTML = '';
    }

    listEl.classList.toggle('hidden', isHome);
    homeListEl.classList.toggle('hidden', !isHome);
    if (isHome) {
      homeListEl.innerHTML = HOME_RANDOM_STOPS.map(function (s) {
        return '<div class="w-[300px] sm:w-[340px] h-[400px] shrink-0">' + stopHTML(s, true) + '</div>';
      }).join('');
      // A tick out: the Tailwind CDN runtime generates CSS for these
      // freshly-inserted utility classes asynchronously, so measuring the
      // cards' real layout has to wait until that's landed, not just until
      // the innerHTML write itself is done. setTimeout (not
      // requestAnimationFrame, which browsers pause in a backgrounded tab)
      // keeps this reliable even if the page loads in a background tab.
      setTimeout(adjustHomeCardClamps, 0);
      return;
    }

    if (!items.length) {
      listEl.innerHTML =
        '<div class="bg-surface border border-rule rounded-[16px] px-5 py-12 text-center">' +
          '<p class="font-display text-[22px] mb-1">Nothing matches</p>' +
          '<p class="text-[13px] text-muted">Try a shorter search, or clear the category filters.</p>' +
        '</div>';
      return;
    }

    var html = '', lastGroup = null;
    items.forEach(function (s) {
      if (filters.sort === 'district' && s.pc !== lastGroup) {
        lastGroup = s.pc;
        html += '<div class="pc-group-divider px-1 pt-2 flex items-baseline gap-3">' +
                  '<span class="font-mono text-[12px] font-semibold tracking-wider">' + s.pc + '</span>' +
                  '<span class="eyebrow text-faint">' + districtName(s.pc) + '</span>' +
                '</div>';
      }
      html += stopHTML(s);
    });
    listEl.innerHTML = html;
  }

  // Each homepage carousel card is a fixed height, and the name above the
  // description is never truncated — so cards with a short one-line name
  // have more room left for the description than cards with a wrapped
  // two- or three-line name. Once the cards are laid out, measure the
  // actual space left in each card's description slot and clamp its text
  // to however many lines fit there, so the description always runs right
  // up to the address instead of leaving a gap.
  function adjustHomeCardClamps() {
    Array.prototype.forEach.call(homeListEl.querySelectorAll('[data-desc-wrap]'), function (wrap) {
      var p = wrap.querySelector('[data-desc-text]');
      if (!p) return;
      var lineHeight = parseFloat(getComputedStyle(p).lineHeight);
      if (!lineHeight || isNaN(lineHeight)) lineHeight = 22.4; // text-[14px] leading-[1.6] fallback
      var lines = Math.max(1, Math.floor(wrap.clientHeight / lineHeight));
      p.style.display = '-webkit-box';
      p.style.webkitBoxOrient = 'vertical';
      p.style.overflow = 'hidden';
      p.style.webkitLineClamp = String(lines);
    });
  }
  var homeClampTimer = null;
  window.addEventListener('resize', function () {
    if (homeClampTimer) clearTimeout(homeClampTimer);
    homeClampTimer = setTimeout(function () {
      homeClampTimer = null;
      if (!homeListEl.classList.contains('hidden')) adjustHomeCardClamps();
    }, 100);
  });

  function districtName(pc) {
    var map = {
      SE1:'Bankside &amp; Elephant', SE3:'Blackheath', SE7:'Charlton', SE8:'Deptford',
      SE9:'Eltham', SE10:'Greenwich', SE14:'New Cross', SE15:'Peckham &amp; Nunhead',
      SE16:'Rotherhithe &amp; Bermondsey', SE18:'Woolwich &amp; Shooter&rsquo;s Hill',
      SE19:'Crystal Palace', SE21:'Dulwich', SE22:'East Dulwich', SE23:'Forest Hill',
      SE26:'Sydenham', DA5:'Bexley', DA6:'Bexleyheath', SE6:'Catford',
      SE12:'Lee', SE13:'Lewisham', SE5:'Camberwell', SE17:'Walworth', SE4:'Brockley', SE24:'Herne Hill',
      SE20:'Penge', SE27:'Gipsy Hill'
    };
    return map[pc] || '';
  }

  function stopHTML(s, compact) {
    var on = inRoute(s.id);
    var pos = route.indexOf(s.id) + 1;
    // Stops still missing a pinned location in Notion are published (with
    // whatever text/photo they do have), but can't go into a route — the
    // route panel, its distance/time maths, the Leaflet map and the GPX
    // export all key off real lat/lon. toggle() enforces this too; this
    // just keeps the button from inviting a click that would do nothing.
    var hasLoc = s.lat !== null && s.lat !== undefined && s.lon !== null && s.lon !== undefined;
    var catLabel = CATS[s.cat];
    var eraLead = s.era || '';
    if (eraLead === catLabel) eraLead = '';
    else if (eraLead.indexOf(catLabel + ', ') === 0) eraLead = eraLead.slice(catLabel.length + 2);
    // compact: used in the fixed-height homepage carousel, where every card
    // fills the same height. The name is never truncated; the description
    // is clamped (via adjustHomeCardClamps, after layout) to however many
    // lines actually fit in the space left once the name has taken what it
    // needs, so short names don't leave a gap above a pinned address.
    return '' +
      '<article id="stop-' + s.id + '" class="stop px-5 py-5' + (compact ? ' h-full flex flex-col' : '') + '">' +
        '<div class="mb-2' + (compact ? ' shrink-0' : '') + '">' + catChip(s.cat) + '</div>' +
        '<div class="flex items-start justify-between gap-4' + (compact ? ' shrink-0' : '') + '">' +
          '<div class="flex items-start gap-3 min-w-0">' +
            (s.img ? '<img src="' + s.img + '" alt="" loading="lazy" onerror="this.remove()" class="w-14 h-14 shrink-0 rounded-lg object-cover border border-rule">' : '') +
            '<div class="min-w-0">' +
              '<h3 class="font-display text-[23px] leading-[1.1] mb-1">' + s.name + '</h3>' +
              '<p class="font-mono text-[11px] text-muted num' + (compact ? ' truncate' : '') + '">' + s.area + ' &middot; ' + s.pc + '</p>' +
            '</div>' +
          '</div>' +
          (hasLoc ?
            '<button data-toggle="' + s.id + '" class="shrink-0 inline-flex items-center gap-1 text-[12px] font-semibold px-3 py-2 rounded-full border transition-colors ' +
              (on ? 'bg-verdigris text-white border-verdigris' : 'border-rule text-ink hover:border-ink') + '">' +
              (on ? 'Stop ' + pos + ' <svg class="lucide lucide-check w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>' : 'Add to route') +
            '</button>'
          : '<button disabled title="This stop doesn&rsquo;t have a location yet, so it can&rsquo;t be added to a route." class="shrink-0 inline-flex items-center text-[12px] font-semibold px-3 py-2 rounded-full border border-rule text-faint opacity-60 cursor-not-allowed">Not mapped yet</button>') +
        '</div>' +
        (compact ? '<div class="flex-1 min-h-0 overflow-hidden mt-3" data-desc-wrap>' : '') +
        '<p class="text-[14px] leading-[1.6] text-ink max-w-[62ch]' + (compact ? '' : ' mt-3') + '"' + (compact ? ' data-desc-text' : '') + '>' +
          (eraLead ? '<span class="font-semibold">' + eraLead + '.</span> ' : '') +
          // Compact cards clamp to a single flowing paragraph — joining every
          // paragraph with <br><br> first would let the clamp cut land on a
          // blank line between paragraphs, leaving a stray "…" on a line of
          // its own instead of trailing the last visible word.
          (compact ? s.text.split('\n\n')[0] : s.text.split('\n\n').join('<br><br>')) +
        '</p>' +
        (compact ? '</div>' : '') +
        '<p class="text-[12px] text-faint mt-3' + (compact ? ' shrink-0 truncate' : '') + '">' + s.addr + '</p>' +
      '</article>';
  }

  /* ---------------------------------------------------------------
     Render: route
  --------------------------------------------------------------- */
  var routeListEl = document.getElementById('routeList');

  /* ---------------------------------------------------------------
     Listen (proof of concept): read a stop's text aloud in the
     Your Route panel, in place of a written description, with a
     play/pause button. Uses the browser's built-in speech synthesis
     rather than a hosted audio file — no asset, no network request.
  --------------------------------------------------------------- */
  var SPEAK_ICON_PLAY = '<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
  var SPEAK_ICON_PAUSE = '<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>';
  var speakingBtn = null;
  var currentUtterance = null; // must stay referenced, or Chrome silently drops it mid-speech
  var cachedVoices = [];

  // Prefer nicer-sounding *local* voices (Apple's/Microsoft's named ones)
  // over the flattest default. Deliberately local-only: Chrome's "Google …"
  // voices are cloud-synthesised, and silently produce no audio at all if
  // that network request can't complete — worse than just using whatever
  // voice already works offline.
  var VOICE_PREFERENCE = ['Samantha', 'Daniel', 'Karen', 'Moira', 'Tessa', 'Serena', 'Ava', 'Nicky'];

  function firstMatch(list, test) {
    for (var i = 0; i < list.length; i++) { if (test(list[i])) return list[i]; }
    return null;
  }

  function refreshVoices() { cachedVoices = window.speechSynthesis.getVoices(); }

  function pickNaturalVoice() {
    var local = [];
    for (var i = 0; i < cachedVoices.length; i++) { if (cachedVoices[i].localService) local.push(cachedVoices[i]); }
    if (!local.length) return null; // nothing safe to pick — leave utter.voice unset

    var byName = null;
    for (var j = 0; j < VOICE_PREFERENCE.length && !byName; j++) {
      byName = firstMatch(local, function (v) { return v.name === VOICE_PREFERENCE[j]; });
    }
    return byName || firstMatch(local, function (v) { return /^en/i.test(v.lang); }) || local[0];
  }

  function speakableText(s) {
    return (s.name + '. ' + s.text)
      .replace(/&rsquo;/g, '’').replace(/&lsquo;/g, '‘')
      .replace(/&rdquo;/g, '”').replace(/&ldquo;/g, '“')
      .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–')
      .replace(/&amp;/g, '&')
      .replace(/&[a-z#0-9]+;/gi, '');
  }

  function setListenBtnState(btn, playing) {
    btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
    btn.querySelector('.listen-btn__icon').innerHTML = playing ? SPEAK_ICON_PAUSE : SPEAK_ICON_PLAY;
    btn.querySelector('.listen-btn__label').textContent = playing ? 'Pause' : 'Listen';
  }

  if (window.speechSynthesis) {
    refreshVoices();
    window.speechSynthesis.onvoiceschanged = refreshVoices;

    routeListEl.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-speak]');
      if (!btn) return;
      var s = byId[btn.getAttribute('data-speak')];
      var synth = window.speechSynthesis;

      if (speakingBtn === btn && synth.speaking && !synth.paused) {
        synth.pause();
        setListenBtnState(btn, false);
        return;
      }
      if (speakingBtn === btn && synth.paused) {
        synth.resume();
        setListenBtnState(btn, true);
        return;
      }
      if (synth.speaking || synth.pending) synth.cancel();
      if (speakingBtn) setListenBtnState(speakingBtn, false);

      var utter = new SpeechSynthesisUtterance(speakableText(s));
      var voice = pickNaturalVoice();
      if (voice) utter.voice = voice;
      utter.rate = 0.95;
      utter.pitch = 1;
      utter.onend = utter.onerror = function () {
        setListenBtnState(btn, false);
        if (speakingBtn === btn) { speakingBtn = null; currentUtterance = null; }
      };
      speakingBtn = btn;
      currentUtterance = utter; // keep a strong reference — see note above
      setListenBtnState(btn, true);
      // Call speak() synchronously, in the same tick as the click: Safari
      // silently refuses it once it's no longer inside the user gesture.
      synth.speak(utter);
    });
  }

  function renderRoute() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    speakingBtn = null;
    currentUtterance = null;
    var n = route.length;
    var km = routeKm();
    var mins = Math.round((km / 4.8) * 60);

    document.getElementById('routeMeta').textContent =
      n === 0 ? 'No stops yet' : n + (n === 1 ? ' stop' : ' stops');
    document.getElementById('routeDist').textContent = km.toFixed(1) + ' km';
    document.getElementById('routeTime').textContent = n < 2 ? '—' : (mins >= 60 ? Math.floor(mins / 60) + 'h ' + pad(mins % 60) : mins + ' min');
    document.getElementById('barLabel').textContent =
      n === 0 ? 'Empty — add a stop' : n + (n === 1 ? ' stop' : ' stops') + ' · ' + km.toFixed(1) + ' km';

    var headerCount = document.getElementById('routeHeaderCount');
    headerCount.textContent = n;
    headerCount.classList.toggle('hidden', n === 0);
    headerCount.classList.toggle('inline-flex', n > 0);

    var maps = document.getElementById('mapsLink');
    if (n === 0) {
      maps.setAttribute('aria-disabled', 'true');
      maps.classList.add('opacity-40', 'pointer-events-none');
      maps.href = '#';
    } else {
      maps.removeAttribute('aria-disabled');
      maps.classList.remove('opacity-40', 'pointer-events-none');
      maps.href = 'https://www.google.com/maps/dir/' +
        route.slice(0, 10).map(function (id) { return byId[id].lat + ',' + byId[id].lon; }).join('/') + '/data=!4m2!4m1!3e2';
    }

    renderRouteMap();

    if (n === 0) {
      routeListEl.innerHTML =
        '<div class="px-5 py-10 text-center">' +
          '<p class="font-display text-[21px] leading-tight mb-1.5">An empty morning</p>' +
          '<p class="text-[13px] leading-relaxed text-muted max-w-[30ch] mx-auto">Add stops from the gazetteer. They stack in the order you add them, and you can shuffle them after.</p>' +
        '</div>';
      return;
    }

    var html = '';
    if (seeded) {
      html += '<p class="px-5 pt-4 pb-1 text-[12px] leading-relaxed text-brass">' +
              'Starter route: a Greenwich morning, riverside first, uphill last. Clear it and build your own.</p>';
    }
    route.forEach(function (id, i) {
      var s = byId[id];
      var leg = i > 0 ? haversine(byId[route[i - 1]], s) : 0;
      html += '' +
        (i > 0 ? '<p class="pl-[52px] pr-5 py-1 font-mono text-[11px] text-faint num">&darr; ' + leg.toFixed(2) + ' km</p>' : '') +
        '<div class="flex gap-3 px-5 py-2.5 ' + (i > 0 ? '' : 'pt-4') + '">' +
          '<span class="shrink-0 w-6 h-6 mt-0.5 rounded-full bg-verdigris text-white font-mono num text-[11px] font-semibold grid place-items-center">' + (i + 1) + '</span>' +
          (s.img ? '<img src="' + s.img + '" alt="" loading="lazy" onerror="this.remove()" class="w-10 h-10 shrink-0 rounded-lg object-cover border border-rule">' : '') +
          '<div class="min-w-0 flex-1">' +
            '<p class="text-[14px] font-semibold leading-tight">' + s.name + '</p>' +
            '<p class="font-mono text-[11px] text-faint mt-0.5">' + s.pc + ' &middot; ' + s.area + '</p>' +
            (s.id === 'horniman' && window.speechSynthesis ?
              '<button data-speak="' + id + '" aria-pressed="false" class="listen-btn mt-1.5 inline-flex items-center gap-1.5 text-[11px] font-semibold text-verdigris border border-verdigris/40 rounded-full pl-1.5 pr-2.5 py-1 hover:bg-verdigris/10 transition-colors" aria-label="Listen to a description of ' + plain(s.name) + '">' +
                '<span class="listen-btn__icon inline-flex items-center justify-center w-4 h-4">' + SPEAK_ICON_PLAY + '</span>' +
                '<span class="listen-btn__label">Listen</span>' +
              '</button>'
            : '') +
          '</div>' +
          '<div class="shrink-0 flex items-start gap-1">' +
            '<button data-move="' + id + '" data-dir="-1" class="w-6 h-6 rounded border border-rule text-muted hover:text-ink hover:border-ink inline-flex items-center justify-center disabled:opacity-25" ' + (i === 0 ? 'disabled' : '') + ' aria-label="Move ' + plain(s.name) + ' earlier">' +
              '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6L12 2L16 6" /><path d="M12 2V22" /></svg>' +
            '</button>' +
            '<button data-move="' + id + '" data-dir="1" class="w-6 h-6 rounded border border-rule text-muted hover:text-ink hover:border-ink inline-flex items-center justify-center disabled:opacity-25" ' + (i === route.length - 1 ? 'disabled' : '') + ' aria-label="Move ' + plain(s.name) + ' later">' +
              '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 18L12 22L16 18" /><path d="M12 2V22" /></svg>' +
            '</button>' +
            '<button data-toggle="' + id + '" class="w-6 h-6 rounded border border-rule text-muted hover:text-ink hover:border-ink inline-flex items-center justify-center" aria-label="Remove ' + plain(s.name) + ' from route">' +
              '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>' +
            '</button>' +
          '</div>' +
        '</div>';
    });
    routeListEl.innerHTML = html;
  }

  function plain(s) { return s.replace(/&[a-z]+;/g, ''); }

  /* ---------------------------------------------------------------
     Chips, events
  --------------------------------------------------------------- */
  // Stops matching the current text search/area — but never the category
  // filter itself, so each category chip's count answers "how many would
  // match if this category were added", independent of any other category
  // already toggled on. Used only to build the chips, not the list.
  function stopsInFilterScope() {
    var q = filters.q.trim().toLowerCase();
    if (!q && !filters.areaRe) return STOPS;
    return STOPS.filter(function (s) {
      var hay = stopHay(s);
      if (filters.areaRe) return filters.areaRe.test(hay);
      return hay.indexOf(q) !== -1;
    });
  }

  function renderChips() {
    var wrap = document.getElementById('chips');
    var scopeStops = stopsInFilterScope();
    var html = '';
    Object.keys(CATS).forEach(function (key) {
      var n = scopeStops.filter(function (s) { return s.cat === key; }).length;
      if (n === 0) return;
      html += catFilterChip(key, n);
    });
    wrap.innerHTML = html;
  }
  renderChips();

  document.getElementById('chips').addEventListener('click', function (e) {
    var b = e.target.closest('[data-cat]');
    if (!b) return;
    var cat = b.getAttribute('data-cat');
    var i = filters.cats.indexOf(cat);
    if (i === -1) filters.cats.push(cat); else filters.cats.splice(i, 1);
    b.setAttribute('aria-pressed', i === -1 ? 'true' : 'false');
    renderList();
  });

  document.getElementById('search').addEventListener('input', function (e) {
    var wasHome = !filters.q && !filters.cats.length && !filters.areaRe;
    var wasArea = !!filters.areaRe;
    var q = e.target.value;

    applySearchState(q, wasArea);

    // Keep the URL in sync (?q=…) so search results are their own
    // shareable/back-button-able page, the same way ?area= already works
    // for areas — replaceState, not pushState, so every keystroke doesn't
    // spam browser history.
    var url = new URL(location.href);
    url.searchParams.delete('area');
    if (q) url.searchParams.set('q', q); else url.searchParams.delete('q');
    history.replaceState({}, '', url);

    if (wasHome && q) {
      // #chips, not #resultCount or #list — it's the first thing in the
      // results view (category cards, then the "N stops" count and any
      // area-chip match, then results). Scrolling to #resultCount instead
      // left #chips's own height unaccounted for, so it landed with the
      // category cards clipped off above the fold rather than in view.
      document.getElementById('chips').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-toggle]');
    if (t) { toggle(t.getAttribute('data-toggle')); return; }
    var m = e.target.closest('[data-move]');
    if (m) { move(m.getAttribute('data-move'), parseInt(m.getAttribute('data-dir'), 10)); return; }
    var a = e.target.closest('[data-area]');
    if (a) { jumpToArea(a.getAttribute('data-area')); return; }
  });

  function escapeRegExp(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  var AREA_DESCRIPTIONS = {
    'bankside': 'The stretch of Thames path between Southwark Cathedral and the old power station, still trading on eight centuries of theatres, taverns and reformers.',
    'bermondsey': 'Warehouses and wharves turned over from the spice docks to design studios, with the river never far from view.',
    'bexley': 'Where the suburbs give way to the Cray valley, a Tudor manor house included.',
    'bexleyheath': 'A Victorian railway suburb that grew up around the Arts and Crafts movement’s founding project, the Red House.',
    'blackheath': 'An open heath with a history of gathering crowds for rebellion and plague burials, and fireworks these days.',
    'brockley': 'Terraced Victorian streets around a cemetery that quietly holds more history than its size suggests.',
    'camberwell': 'Art-school grit meets Georgian squares, a few minutes from Peckham and a world from the postcard version of London.',
    'catford': 'Best known for a fibreglass cat the size of a bus, perched over a 1970s shopping centre.',
    'charlton': 'A riverside village swallowed by the docks, still centred on one of London’s oldest Jacobean houses.',
    'crystal palace': 'Named for a glass palace that burned down in 1936, leaving concrete dinosaurs and a view across half the city.',
    'deptford': 'Henry VIII’s royal dockyard, now flea markets and studios built into the same old wharves.',
    'dulwich': 'A private estate that kept its village feel and its picture gallery &mdash; Britain’s oldest public one &mdash; running since 1817.',
    'east dulwich': 'Dulwich’s less formal neighbour, all Victorian terraces and a high street that never settled on one identity.',
    'elephant': 'A roundabout that gave its name to a whole quarter, rebuilt more times than almost anywhere else in London.',
    'eltham': 'A medieval royal palace and an Art Deco mansion sit streets apart, both stranger than the suburb around them.',
    'forest hill': 'Steep streets above the Honor Oak ridge, anchored by a museum built on the tea trade and its odd collections.',
    'gipsy hill': 'A steep, leafy stretch between Dulwich and Crystal Palace, named for the Romani camps once recorded on its common land.',
    'greenwich': 'The Old Royal Naval College, the meridian line and a tea clipper in dry dock &mdash; UNESCO’s stretch of the river.',
    'herne hill': 'Terraced Victorian streets around Brockwell Park, home to one of the oldest cycling tracks still in use anywhere in the world.',
    'honor oak': 'A hilltop park with a history of mass trespass, ringed by streets that grew up around the railway.',
    'lee': 'A quiet suburb between Lewisham and Eltham, mostly known for who used to live there rather than what still stands.',
    'lewisham': 'The borough’s own high street and transport hub, rebuilt hard after the Blitz and again more recently.',
    'new cross': 'Goldsmiths’ postcode &mdash; squat culture, music history and a fire that changed British race relations.',
    'nunhead': 'One of London’s Magnificent Seven cemeteries, wild enough in places to forget it’s inside the M25.',
    'peckham': 'A market street and a multi-storey car park turned rooftop bar &mdash; Camberwell’s louder, younger neighbour.',
    'penge': 'A fashionable Victorian suburb in the shadow of the relocated Crystal Palace, briefly notorious for two 19th-century murders.',
    'rotherhithe': 'Where Brunel dug the first tunnel under a navigable river, and the Mayflower is said to have set sail.',
    'sydenham': 'The hill above Crystal Palace Park, still trading on the shadow of the palace that once stood there.',
    'walworth': 'Dense Victorian streets off the Old Kent Road &mdash; working-class London the guidebooks tend to skip.',
    'woolwich': 'The Royal Arsenal turned riverside flats, with a free ferry that’s been crossing the Thames since 1889.'
  };
  var AREA_TITLES = { elephant: 'Elephant & Castle' };
  var AREA_SLUGS = { elephant: 'elephant-and-castle' };
  var AREA_SLUGS_REVERSE = {};
  Object.keys(AREA_SLUGS).forEach(function (k) { AREA_SLUGS_REVERSE[AREA_SLUGS[k]] = k; });

  function areaSlug(area) {
    var key = area.toLowerCase().trim();
    return AREA_SLUGS[key] || key.replace(/\s+/g, '-');
  }
  function areaFromSlug(slug) {
    var key = slug.toLowerCase().trim();
    return AREA_SLUGS_REVERSE[key] || key.replace(/-+/g, ' ');
  }
  function areaTitle(area) {
    var key = area.toLowerCase().trim();
    if (AREA_TITLES[key]) return AREA_TITLES[key];
    return area.replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  }

  var AREA_COLORS = {};
  Array.prototype.forEach.call(document.querySelectorAll('.area-chip[data-area]'), function (btn) {
    var area = btn.getAttribute('data-area');
    if (AREA_COLORS[area]) return;
    var cs = getComputedStyle(btn);
    AREA_COLORS[area] = { bg: cs.backgroundColor, fg: cs.color };
  });

  // How many stops belong to an area, using the same whole-word match
  // against every stop's full text as an actual area page filter does —
  // so the count matches what you'd see if you jumped there.
  function areaStopCount(area) {
    var re = new RegExp('\\b' + escapeRegExp(area.toLowerCase()) + '\\b');
    var n = 0;
    for (var i = 0; i < STOPS.length; i++) { if (re.test(stopHay(STOPS[i]))) n++; }
    return n;
  }

  // Areas whose name contains the current search text, for the area-chip
  // suggestions shown above search results (e.g. typing "forest" surfaces
  // a "Forest Hill" chip alongside the matching stops).
  function matchingAreas(query) {
    var q = query.trim().toLowerCase();
    if (!q) return [];
    return Object.keys(AREA_COLORS).filter(function (key) {
      return key.indexOf(q) !== -1 || areaTitle(key).toLowerCase().indexOf(q) !== -1;
    });
  }

  function areaMatchChipHTML(area) {
    var c = AREA_COLORS[area];
    return '<button class="area-chip inline-flex items-baseline gap-2" data-area="' + area + '" style="background:' + c.bg + ';color:' + c.fg + '">' +
      '<span>' + areaTitle(area) + '</span>' +
      '<span class="font-mono num opacity-70">' + areaStopCount(area) + '</span>' +
    '</button>';
  }

  function parseRGB(str) {
    var m = /rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/.exec(str || '');
    return m ? [+m[1], +m[2], +m[3]] : null;
  }
  function colorsAreClose(a, b) {
    var ca = parseRGB(a), cb = parseRGB(b);
    if (!ca || !cb) return a === b;
    var dr = ca[0] - cb[0], dg = ca[1] - cb[1], db = ca[2] - cb[2];
    return Math.sqrt(dr * dr + dg * dg + db * db) <= 70;
  }

  var areaHeroEl = document.getElementById('areaHero');
  var homeIntroEl = document.getElementById('homeIntro');

  // Hides the homepage furniture (hero placeholder, intro copy, area-chip
  // marquee) — used both by area pages and by an active search, so results
  // read as their own page instead of loading in underneath all of it.
  function setHomeFurnitureHidden(hidden) {
    homeIntroEl.classList.toggle('hidden', hidden);
    document.getElementById('homeHero').classList.toggle('hidden', hidden);
    document.getElementById('areaChips').classList.toggle('hidden', hidden);
    // The section wrapping #homeIntro/#areaChips keeps its own top padding
    // even once both children are hidden, so it has to be hidden itself
    // too — otherwise that padding renders as dead space above the chips.
    document.getElementById('introSection').classList.toggle('hidden', hidden);
  }

  // Applies a search query as its own page-like state: filters to it,
  // hides the homepage furniture, and titles the tab — everything the
  // input handler and a direct/back-button ?q= load both need, minus the
  // URL write (callers that already have the right URL skip that part).
  function applySearchState(q, resetCats) {
    document.getElementById('search').value = q;
    filters.q = q;
    filters.areaRe = null;
    // Only reset the category *selection* when actually leaving an area
    // (it's meant to combine with an ordinary text search, so typing
    // further into an existing search shouldn't silently drop it) — but
    // always reset for a fresh load (popstate/initFromURL), since cats
    // aren't serialized into the URL and so can't be restored anyway.
    // renderChips() itself always reruns regardless, since the available
    // categories and their counts are scoped to the search text and need
    // to stay current on every keystroke, not just when cats are cleared.
    if (resetCats) { filters.cats = []; }
    renderChips();
    renderList();
    setHomeFurnitureHidden(!!q);
    document.title = q ? ('“' + q + '” — WalkieTalkies') : 'WalkieTalkies';
    // Always reset area-page state, not just when we know we're leaving
    // one — this also runs from popstate/initFromURL, where the previous
    // state (an area page) isn't tracked, so clearing unconditionally is
    // the only way to avoid the area hero/theming leaking into a search.
    document.documentElement.style.removeProperty('--area-bg');
    document.documentElement.style.removeProperty('--area-ink');
    document.documentElement.classList.remove('area-active');
    areaHeroEl.classList.add('hidden');
    Array.prototype.forEach.call(document.querySelectorAll('.area-chip--on-match'), function (chip) {
      chip.classList.remove('area-chip--on-match');
    });
  }

  function applyAreaFilter(area, scrollBehavior) {
    filters.q = '';
    filters.areaRe = new RegExp('\\b' + escapeRegExp(area.toLowerCase()) + '\\b');
    filters.cats = [];
    document.getElementById('search').value = area;
    renderChips();
    renderList();
    document.title = areaTitle(area) + ' — WalkieTalkies';

    var c = AREA_COLORS[area.toLowerCase()];
    if (c) {
      document.documentElement.style.setProperty('--area-bg', c.bg);
      document.documentElement.style.setProperty('--area-ink', c.fg);
    }
    document.documentElement.classList.add('area-active');
    Array.prototype.forEach.call(document.querySelectorAll('.area-chip[data-area]'), function (chip) {
      var key = chip.getAttribute('data-area');
      var matches = !!(c && AREA_COLORS[key] && colorsAreClose(AREA_COLORS[key].bg, c.bg));
      chip.classList.toggle('area-chip--on-match', matches);
    });
    document.getElementById('areaHeroTitle').textContent = areaTitle(area);
    document.getElementById('areaHeroDesc').innerHTML = AREA_DESCRIPTIONS[area.toLowerCase()] || '';
    document.getElementById('areaHeroPostcodes').innerHTML = postcodeBadgesHTML(areaPostcodes(area));
    var info = (typeof AREA_INFO !== 'undefined' && AREA_INFO[area.toLowerCase()]) || null;
    var imageEl = document.getElementById('areaHeroImage');
    if (info && info.image) {
      imageEl.src = info.image;
      imageEl.alt = areaTitle(area);
      imageEl.classList.remove('hidden');
    } else {
      imageEl.classList.add('hidden');
      imageEl.removeAttribute('src');
    }
    var infoEl = document.getElementById('areaHeroInfo');
    if (info && (info.overview || info.history)) {
      document.getElementById('areaHeroOverview').innerHTML = info.overview || '';
      document.getElementById('areaHeroHistory').innerHTML = info.history || '';
      infoEl.classList.remove('hidden');
    } else {
      infoEl.classList.add('hidden');
    }
    areaHeroEl.classList.remove('hidden');
    setHomeFurnitureHidden(true);
    document.getElementById('areaChipsBottom').classList.remove('hidden');

    if (scrollBehavior) {
      document.getElementById('list').scrollIntoView({ behavior: scrollBehavior, block: 'start' });
    }
  }

  function clearAreaFilter() {
    filters.q = '';
    filters.areaRe = null;
    filters.cats = [];
    document.getElementById('search').value = '';
    renderChips();
    renderList();
    document.title = 'WalkieTalkies';
    document.documentElement.style.removeProperty('--area-bg');
    document.documentElement.style.removeProperty('--area-ink');
    document.documentElement.classList.remove('area-active');
    areaHeroEl.classList.add('hidden');
    setHomeFurnitureHidden(false);
    document.getElementById('areaChipsBottom').classList.add('hidden');
    Array.prototype.forEach.call(document.querySelectorAll('.area-chip--on-match'), function (chip) {
      chip.classList.remove('area-chip--on-match');
    });
  }

  function jumpToArea(area) {
    applyAreaFilter(area);
    var url = new URL(location.href);
    url.searchParams.delete('q');
    url.searchParams.set('area', areaSlug(area));
    history.pushState({ area: area }, '', url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.addEventListener('popstate', function () {
    var params = new URLSearchParams(location.search);
    var slug = params.get('area');
    var q = params.get('q');
    if (slug) applyAreaFilter(areaFromSlug(slug), false);
    else if (q) applySearchState(q, true);
    else clearAreaFilter();
  });

  document.getElementById('clearBtn').addEventListener('click', clearRoute);

  // Route panel: a bottom sheet on small screens, a dropdown menu off the
  // header button on larger ones — same open/closed state either way.
  var root = document.documentElement;
  var routeHeaderBtn = document.getElementById('routeHeaderBtn');
  var routeHeaderChevron = document.getElementById('routeHeaderChevron');
  var routePanelEl = document.getElementById('routePanel');
  var routeOpenTrigger = null; // element to refocus when the panel closes
  function focusableIn(container) {
    return Array.prototype.filter.call(
      container.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'),
      function (el) { return el.offsetParent !== null; }
    );
  }
  function openSheet(v) {
    var wasOpen = root.classList.contains('route-open');
    root.classList.toggle('route-open', v);
    document.getElementById('scrim').hidden = !v;
    routeHeaderBtn.setAttribute('aria-expanded', v ? 'true' : 'false');
    routeHeaderChevron.style.transform = v ? 'rotate(180deg)' : '';
    // The panel's width can change between renders (dropdown vs. bottom
    // sheet, or a window resize while closed) — resync the map's canvas
    // to its container each time it becomes visible.
    if (v && routeMap) setTimeout(function () { routeMap.invalidateSize(); }, 0);
    if (v && !wasOpen) {
      var focusables = focusableIn(routePanelEl);
      if (focusables.length) focusables[0].focus();
    } else if (!v && wasOpen && routeOpenTrigger) {
      routeOpenTrigger.focus();
      routeOpenTrigger = null;
    }
  }
  document.getElementById('routeBar').addEventListener('click', function (e) { e.stopPropagation(); routeOpenTrigger = document.getElementById('routeBar'); openSheet(true); });
  document.getElementById('sheetClose').addEventListener('click', function () { openSheet(false); });
  document.getElementById('scrim').addEventListener('click', function () { openSheet(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' && e.key !== 'Tab') return;
    if (!root.classList.contains('route-open')) return;
    if (e.key === 'Escape') { openSheet(false); return; }
    // Basic focus trap: keep Tab/Shift+Tab cycling inside the open panel.
    var focusables = focusableIn(routePanelEl);
    if (!focusables.length) return;
    var first = focusables[0], last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  routeHeaderBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    var willOpen = !root.classList.contains('route-open');
    if (willOpen) routeOpenTrigger = routeHeaderBtn;
    openSheet(willOpen);
  });
  // Dismiss the dropdown on an outside click (the mobile sheet already has
  // the scrim for this, but the desktop dropdown has no full-screen scrim)
  document.addEventListener('click', function (e) {
    if (!root.classList.contains('route-open')) return;
    if (routePanelEl.contains(e.target) || routeHeaderBtn.contains(e.target)) return;
    openSheet(false);
  });

  // Search — collapses to an icon button on small screens, expanding
  // into the input on tap and collapsing back once it's empty and blurred
  (function () {
    var toggleBtn = document.getElementById('searchToggle');
    var toggleIcon = document.getElementById('searchToggleIcon');
    var label = document.getElementById('searchLabel');
    var input = document.getElementById('search');
    var logoLink = document.getElementById('logoLink');
    var logoText = document.getElementById('logoText');
    var mobile = window.matchMedia('(max-width: 639px)');
    var isOpen = false;

    // Same button throughout: a magnifier before the (collapsed) input,
    // which becomes a close icon sitting right after it once open — the
    // input's own flex-1 growth is what pushes it there, not positioning.
    var ICON_SEARCH = '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>';
    var ICON_CLOSE = '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>';

    function setOpen(open) {
      isOpen = open;
      label.classList.toggle('hidden', !open);
      label.classList.toggle('flex', open);
      toggleIcon.innerHTML = open ? ICON_CLOSE : ICON_SEARCH;
      toggleBtn.setAttribute('aria-label', open ? 'Close search' : 'Search');
      toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      // Make room for a full-width bar on small screens: drop the
      // wordmark and the logo's reserved width, keep the square icon.
      logoText.classList.toggle('hidden', open && mobile.matches);
      logoLink.style.minWidth = open && mobile.matches ? '0' : '';
      if (open) input.focus();
    }

    toggleBtn.addEventListener('click', function () {
      if (isOpen && input.value) {
        input.value = '';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
      setOpen(!isOpen);
    });
    input.addEventListener('blur', function () {
      if (mobile.matches && !input.value) setOpen(false);
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') input.blur();
    });
    mobile.addEventListener('change', function (e) { if (!e.matches) setOpen(false); });
  })();

  // Theme — black by default; the toggle switches to light and back
  document.getElementById('themeToggle').addEventListener('click', function () {
    if (root.getAttribute('data-theme') === 'light') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', 'light');
    }
  });

  // Keep the sticky route panel clear of the fixed header's actual height
  (function trackHeaderHeight() {
    var headerEl = document.querySelector('header');
    if (!headerEl) return;
    var raf = null;
    function measure() {
      raf = null;
      root.style.setProperty('--header-h', headerEl.offsetHeight + 'px');
    }
    function schedule() {
      if (raf) return;
      raf = requestAnimationFrame(measure);
    }
    schedule();
    window.addEventListener('resize', schedule);
    if (window.ResizeObserver) new ResizeObserver(schedule).observe(headerEl);
  })();

  // Populate a row (the sticky nav, the bottom-of-area-page row) by cloning the
  // real (non-marquee-duplicate) #areaChips buttons, so the area/colour list
  // stays defined in a single place.
  function buildAreaRow(rowId, compact) {
    var row = document.getElementById(rowId);
    if (!row) return;
    var seen = {};
    Array.prototype.forEach.call(document.querySelectorAll('#areaChips .area-row:not(.area-row-dup) .area-chip[data-area]'), function (btn) {
      var area = btn.getAttribute('data-area');
      if (seen[area]) return;
      seen[area] = true;
      var clone = btn.cloneNode(true);
      if (compact) clone.classList.add('area-chip--compact');
      row.appendChild(clone);
    });
  }
  buildAreaRow('areaStickyRow', true);
  buildAreaRow('areaChipsBottomRow', false);

  // Reveal the compact sticky area nav once the big area chips scroll past the header
  (function stickyAreaBar() {
    var target = document.getElementById('areaChips');
    var bar = document.getElementById('areaStickyBar');
    var headerEl = document.querySelector('header');
    if (!target || !bar || !headerEl || !window.IntersectionObserver) return;
    var io = null;
    function connect() {
      if (io) io.disconnect();
      io = new IntersectionObserver(function (entries) {
        var e = entries[0];
        var pastIt = !e.isIntersecting && e.boundingClientRect.top < 0;
        bar.classList.toggle('hidden', !pastIt);
      }, { rootMargin: '-' + headerEl.offsetHeight + 'px 0px 0px 0px', threshold: 0 });
      io.observe(target);
    }
    connect();
    var raf = null;
    window.addEventListener('resize', function () {
      if (raf) return;
      raf = requestAnimationFrame(function () { raf = null; connect(); });
    });
  })();

  // GPX export, when the viewer can save files
  if (window.claude && typeof window.claude.use === 'function') {
    window.claude.use('downloads').then(function (dl) {
      if (!dl) return;
      var btn = document.getElementById('gpxBtn');
      btn.classList.remove('hidden');
      btn.addEventListener('click', function () {
        if (!route.length) return;
        var gpx = '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<gpx version="1.1" creator="WalkieTalkies" xmlns="http://www.topografix.com/GPX/1/1">\n' +
          '  <metadata><name>WalkieTalkies</name></metadata>\n' +
          route.map(function (id, i) {
            var s = byId[id];
            return '  <wpt lat="' + s.lat + '" lon="' + s.lon + '">\n' +
                   '    <name>' + (i + 1) + '. ' + esc(plain(s.name)) + '</name>\n' +
                   '    <desc>' + esc(plain(s.area) + ', ' + s.pc) + '</desc>\n' +
                   '  </wpt>\n';
          }).join('') +
          '  <rte><name>WalkieTalkies</name>\n' +
          route.map(function (id) {
            var s = byId[id];
            return '    <rtept lat="' + s.lat + '" lon="' + s.lon + '"><name>' + esc(plain(s.name)) + '</name></rtept>\n';
          }).join('') +
          '  </rte>\n</gpx>\n';
        btn.textContent = 'Saving…';
        dl.save({ filename: 'walkietalkies-route.gpx', data: gpx })
          .then(function () { btn.textContent = 'Saved'; })
          .catch(function (err) { btn.textContent = (err && err.code === 'declined') ? 'Save as GPX' : 'Save unavailable'; })
          .then(function () { setTimeout(function () { btn.textContent = 'Save as GPX'; }, 2200); });
      });
    }).catch(function () {});
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ---------------------------------------------------------------
     Boot
  --------------------------------------------------------------- */
  document.getElementById('footerYear').textContent = new Date().getFullYear();
  renderList();
  renderRoute();

  (function initFromURL() {
    var params = new URLSearchParams(location.search);
    var slug = params.get('area');
    var q = params.get('q');
    if (slug) applyAreaFilter(areaFromSlug(slug), 'auto');
    else if (q) applySearchState(q, true);
  })();
})();
