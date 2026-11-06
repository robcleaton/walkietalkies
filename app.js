(function () {
  'use strict';

  /* ---------------------------------------------------------------
     Stops: categories and data checks
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

  // Small horizontal pill — used on the search results screen only, where
  // space is at a premium and the results themselves are the point.
  function catFilterChip(cat, count) {
    var m = CATMARK[cat];
    return '<button class="cat-chip" data-cat="' + cat + '" aria-pressed="false" style="background:' + m.color + ';color:' + m.fg + '">' +
      '<svg viewBox="0 0 256 256" width="14" height="14" fill="' + m.fg + '" aria-hidden="true">' + m.icon + '</svg>' +
      '<span class="cat-chip__name">' + CATS[cat] + '</span>' +
      '<span class="cat-chip__count">' + count + '</span>' +
    '</button>';
  }

  // Bigger stacked card — used everywhere else (home, area pages),
  // regardless of screen size.
  function catCard(cat, count) {
    var m = CATMARK[cat];
    return '<button class="cat-card" data-cat="' + cat + '" aria-pressed="false" style="background:' + m.color + ';color:' + m.fg + '">' +
      '<span class="cat-card__row">' +
        '<span class="cat-card__icon">' +
          '<svg viewBox="0 0 256 256" width="28" height="28" fill="' + m.fg + '" aria-hidden="true">' + m.icon + '</svg>' +
        '</span>' +
        '<span class="cat-card__count">' + count + '</span>' +
      '</span>' +
      '<span class="cat-card__name">' + CATS[cat] + '</span>' +
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
        console.warn('Stop "' + (s.id || '?') + '" is missing required field "' + f + '"');
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
  var filters = { q: '', cats: [], sort: 'district', area: null };
  // True on the Discover page (?view=discover), which shows the full stop
  // list instead of the homepage carousel even with no filter applied.
  var discoverMode = false;
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


  /* ---------------------------------------------------------------
     Route map (Leaflet + OpenStreetMap) — a small preview of the
     current route, numbered pins in stop order plus the walking line
  --------------------------------------------------------------- */
  var routeMapEl = document.getElementById('routeMap');
  var routeMap = null, routeMapLayer = null;

  // Your route shows its stop list or, toggled by the Map buttons by the
  // panel's chevron (one in the mobile bar, one in the desktop header),
  // just the route map. An empty route always shows the list (its
  // empty-state message) and hides the buttons.
  var routeView = 'list';
  var routePanelViewEl = document.getElementById('routePanel');
  var routeMapToggles = document.querySelectorAll('[data-route-map-toggle]');

  function applyRouteView() {
    var empty = route.length === 0;
    var view = empty ? 'list' : routeView;
    routePanelViewEl.setAttribute('data-view', view);
    Array.prototype.forEach.call(routeMapToggles, function (btn) {
      btn.classList.toggle('hidden', empty);
      btn.setAttribute('aria-pressed', String(view === 'map'));
      btn.setAttribute('aria-label', view === 'map' ? 'Show the route list' : 'Show the route map');
      btn.setAttribute('data-tooltip', view === 'map' ? 'Show list' : 'Show map');
    });
  }

  function setRouteView(view) {
    if (view === routeView) return;
    routeView = view;
    animateRouteViewChange(function () {
      applyRouteView();
      // The map was display:none while the list showed — resize and refit it.
      if (view === 'map') renderRouteMap();
    });
  }

  // List and map are different heights, so swapping them outright makes
  // the drawer jump. Instead #routeScroll eases from the old height to the
  // new one (with the drawer, bottom-anchored on mobile, following it)
  // while the incoming view fades up. Skipped while the panel is closed
  // and for reduced motion.
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var routeViewAnimEnd = null;
  function animateRouteViewChange(change) {
    var el = document.getElementById('routeScroll');
    if (routeViewAnimEnd) routeViewAnimEnd();
    if (reduceMotion.matches || !document.documentElement.classList.contains('route-open')) { change(); return; }

    var from = el.offsetHeight;
    change();
    var to = el.offsetHeight;

    el.classList.remove('route-view-enter');
    el.style.height = from + 'px';
    el.style.overflow = 'hidden';
    void el.offsetHeight; // commit the starting height before transitioning
    el.classList.add('route-view-enter');
    el.style.transition = 'height .42s cubic-bezier(.32,.72,0,1)';
    el.style.height = to + 'px';

    var timer;
    function end(e) {
      if (e && (e.target !== el || e.propertyName !== 'height')) return;
      clearTimeout(timer);
      el.removeEventListener('transitionend', end);
      el.style.height = el.style.overflow = el.style.transition = '';
      routeViewAnimEnd = null;
    }
    el.addEventListener('transitionend', end);
    timer = setTimeout(end, 600); // in case transitionend never fires (no height change)
    routeViewAnimEnd = end;
  }

  Array.prototype.forEach.call(routeMapToggles, function (btn) {
    btn.addEventListener('click', function () {
      // From the closed mobile bar, open the sheet straight onto the map.
      if (!document.documentElement.classList.contains('route-open')) {
        routeOpenTrigger = btn;
        setRouteView('map');
        openSheet(true);
        return;
      }
      setRouteView(routeView === 'map' ? 'list' : 'map');
    });
  });

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
     Area map (Leaflet + OpenStreetMap) — every mapped stop in the
     current area, colour-coded by category. Stops without a pinned
     location (see the "Not mapped yet" button in stopHTML) just don't
     get a marker; the map itself is hidden entirely if none do.
  --------------------------------------------------------------- */
  var areaMapEl = document.getElementById('areaMap');
  var areaMap = null, areaMapLayer = null;

  // Monotone-chain convex hull over [lat, lon] points — there's no real
  // administrative boundary data for these informal area names (Honor Oak,
  // Forest Hill etc. aren't clean OSM/ONS polygons), so the outline drawn
  // on the area map is an approximation from the area's own mapped stops,
  // not an official boundary.
  function convexHull(points) {
    var pts = points.slice().sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    if (pts.length < 3) return pts;
    function cross(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]); }
    var lower = [];
    for (var i = 0; i < pts.length; i++) {
      while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], pts[i]) <= 0) lower.pop();
      lower.push(pts[i]);
    }
    var upper = [];
    for (var j = pts.length - 1; j >= 0; j--) {
      while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], pts[j]) <= 0) upper.pop();
      upper.push(pts[j]);
    }
    lower.pop(); upper.pop();
    return lower.concat(upper);
  }

  function renderAreaMap(stops) {
    var mapped = stops.filter(function (s) {
      return s.lat !== null && s.lat !== undefined && s.lon !== null && s.lon !== undefined;
    });
    areaMapEl.classList.toggle('hidden', mapped.length === 0);
    if (!mapped.length || typeof L === 'undefined') return;

    if (!areaMap) {
      areaMap = L.map(areaMapEl, { scrollWheelZoom: false });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'
      }).addTo(areaMap);
      areaMapLayer = L.layerGroup().addTo(areaMap);
    }
    areaMapLayer.clearLayers();

    var latlngs = mapped.map(function (s) { return [s.lat, s.lon]; });
    if (latlngs.length >= 3) {
      L.polygon(convexHull(latlngs), {
        color: '#171717', weight: 2, opacity: .55, dashArray: '6 6',
        fill: true, fillColor: '#171717', fillOpacity: .06
      }).addTo(areaMapLayer);
    }
    mapped.forEach(function (s) {
      var color = (CATMARK[s.cat] || {}).color || 'var(--ink)';
      var icon = L.divIcon({
        className: '',
        html: '<span style="display:block;width:14px;height:14px;border-radius:50%;background:' + color + ';border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.4)"></span>',
        iconSize: [14, 14], iconAnchor: [7, 7]
      });
      L.marker([s.lat, s.lon], { icon: icon }).addTo(areaMapLayer).bindPopup(plain(s.name));
    });

    areaMap.invalidateSize();
    if (latlngs.length === 1) areaMap.setView(latlngs[0], 15);
    else areaMap.fitBounds(latlngs, { padding: [24, 24] });
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
  function stopInArea(s, area) {
    if (Array.isArray(s.areas)) {
      var title = plainLower(areaTitle(area));
      for (var i = 0; i < s.areas.length; i++) { if (plainLower(s.areas[i]) === title) return true; }
      return false;
    }
    return new RegExp('\\b' + escapeRegExp(area) + '\\b').test(plainLower(s.name + ' ' + s.area));
  }
  function plainLower(str) {
    return String(str).replace(/&amp;/g, '&').replace(/&[a-z]+;/g, ' ').toLowerCase();
  }

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

  /* ---------------------------------------------------------------
     Render: stop lists
  --------------------------------------------------------------- */
  var listEl = document.getElementById('list');
  var homeListEl = document.getElementById('homeList');
  var areaMatchesEl = document.getElementById('areaMatches');
  var resultCountEl = document.getElementById('resultCount');
  var areaRowsEl = document.getElementById('areaRows');

  function renderList() {
    var items = visible();
    var isHome = !filters.q && !filters.cats.length && !filters.area && !discoverMode;
    // The count line ("N stops") is only useful once it reflects an actual
    // search/filter/area — on the plain homepage it's just noise, so leave
    // it blank there.
    resultCountEl.textContent = isHome ? '' :
      items.length + (items.length === 1 ? ' stop' : ' stops');

    // Typing a search that matches an area's name surfaces that area as
    // its own chip — e.g. "forest" turns up a "Forest Hill 32" chip, a
    // shortcut to the area page itself rather than only the individual
    // stops whose text happens to match. Whenever one's showing, it goes
    // above the "N stops" line (a whole matching area is the more useful
    // thing to lead with); otherwise "N stops" is back on top as usual.
    var areaMatches = filters.q ? matchingAreas(filters.q) : [];
    if (areaMatches.length) {
      areaMatchesEl.innerHTML = areaMatches.map(areaMatchChipHTML).join('');
      areaMatchesEl.classList.remove('hidden');
      areaMatchesEl.parentNode.insertBefore(areaMatchesEl, resultCountEl);
    } else {
      areaMatchesEl.classList.add('hidden');
      areaMatchesEl.innerHTML = '';
      resultCountEl.parentNode.insertBefore(resultCountEl, areaMatchesEl);
    }

    listEl.classList.toggle('hidden', isHome);
    homeListEl.classList.toggle('hidden', !isHome);
    // Only area pages fill the per-category rows (and CSS only shows them
    // there, at lg+); everywhere else they're cleared so stale cards from a
    // previous area can't linger.
    var rowScroll = filters.area ? areaRowScroll() : null;
    areaRowsEl.innerHTML = '';
    if (isHome) {
      homeListEl.innerHTML = HOME_RANDOM_STOPS.map(function (s) {
        return '<div class="w-[300px] sm:w-[340px] h-[400px] shrink-0">' + stopHTML(s, true) + '</div>';
      }).join('') +
        // End of the carousel: a big round button through to the Discover
        // page, where everything the 10 random cards are sampled from lives.
        '<div class="h-[400px] shrink-0 flex items-center px-4 sm:px-8">' +
          '<a href="?view=discover" data-discover data-tooltip="Discover" aria-label="Discover all areas, categories and stops" class="inline-flex items-center justify-center w-[96px] h-[96px] sm:w-[112px] sm:h-[112px] rounded-full bg-surface border border-rule text-white transition-transform hover:scale-105 hover:border-ink">' +
            '<svg class="lucide lucide-arrow-right w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>' +
          '</a>' +
        '</div>';
      // A tick out: the Tailwind CDN runtime generates CSS for these
      // freshly-inserted utility classes asynchronously, so measuring the
      // cards' real layout has to wait until that's landed, not just until
      // the innerHTML write itself is done. setTimeout (not
      // requestAnimationFrame, which browsers pause in a backgrounded tab)
      // keeps this reliable even if the page loads in a background tab.
      setTimeout(function () { adjustCardClamps(homeListEl); }, 0);
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

    if (filters.area) renderAreaRows(items, rowScroll);
  }

  // Area pages on large screens: the area's stops as one homepage-style
  // carousel per category, in the same category order as the category
  // cards above. Each row keeps visible()'s own (district) sort.
  function renderAreaRows(items, keepScroll) {
    var byCat = {};
    items.forEach(function (s) { (byCat[s.cat] = byCat[s.cat] || []).push(s); });
    areaRowsEl.innerHTML = Object.keys(CATS).filter(function (cat) { return byCat[cat]; }).map(function (cat) {
      var stops = byCat[cat];
      return '<section data-cat-row="' + cat + '" aria-label="' + plain(catCountLabel(cat, stops.length)) + '">' +
        '<h3 class="area-cat-head flex items-center gap-3 mb-4">' +
          '<span class="inline-flex items-center justify-center w-9 h-9 rounded-[10px] shrink-0" style="background:' + CATMARK[cat].color + '">' +
            '<svg viewBox="0 0 256 256" width="18" height="18" fill="' + CATMARK[cat].fg + '" aria-hidden="true">' + CATMARK[cat].icon + '</svg>' +
          '</span>' +
          '<span class="font-display text-[28px] leading-none">' + catCountLabel(cat, stops.length).replace(/&/g, '&amp;') + '</span>' +
        '</h3>' +
        '<div class="area-cat-row min-w-0 scroll-hide flex flex-nowrap gap-4 overflow-x-auto pb-2">' +
          stops.map(function (s) {
            return '<div class="w-[340px] h-[400px] shrink-0">' + stopHTML(s, true) + '</div>';
          }).join('') +
        '</div>' +
      '</section>';
    }).join('');
    if (keepScroll) {
      Object.keys(keepScroll).forEach(function (cat) {
        var row = areaRowsEl.querySelector('[data-cat-row="' + cat + '"] .area-cat-row');
        if (row) row.scrollLeft = keepScroll[cat];
      });
    }
    setTimeout(function () { adjustCardClamps(areaRowsEl); }, 0);
  }

  // Each row's current horizontal scroll, keyed by category — renderList
  // reruns on every route add/remove, and without this each one would
  // snap every row back to its first card.
  function areaRowScroll() {
    var out = {};
    Array.prototype.forEach.call(areaRowsEl.querySelectorAll('[data-cat-row]'), function (sec) {
      var row = sec.querySelector('.area-cat-row');
      if (row && row.scrollLeft) out[sec.getAttribute('data-cat-row')] = row.scrollLeft;
    });
    return out;
  }

  // Each homepage carousel card is a fixed height, and the name above the
  // description is never truncated — so cards with a short one-line name
  // have more room left for the description than cards with a wrapped
  // two- or three-line name. Once the cards are laid out, measure the
  // actual space left in each card's description slot and clamp its text
  // to however many lines fit there, so the description always runs right
  // up to the address instead of leaving a gap.
  // Used for the area pages' per-category rows too (same compact cards).
  function adjustCardClamps(root) {
    Array.prototype.forEach.call(root.querySelectorAll('[data-desc-wrap]'), function (wrap) {
      var p = wrap.querySelector('[data-desc-text]');
      // Rows hidden at this screen size measure as zero height — skip them
      // rather than clamp to one line; resize re-runs this once they show.
      if (!p || !wrap.clientHeight) return;
      var lineHeight = parseFloat(getComputedStyle(p).lineHeight);
      if (!lineHeight || isNaN(lineHeight)) lineHeight = 26.35; // text-[17px] leading-[1.55] fallback
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
      if (!homeListEl.classList.contains('hidden')) adjustCardClamps(homeListEl);
      adjustCardClamps(areaRowsEl);
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
      '<article id="stop-' + s.id + '" class="stop relative px-5 py-5' + (compact ? ' h-full flex flex-col' : '') + '">' +
        playbarHTML(s) +
        // Image, plus the listen/route buttons, share the top row; the
        // category chip and title get their own full-width lines beneath,
        // so long names never run into the buttons.
        '<div class="flex items-start justify-between gap-4' + (compact ? ' shrink-0' : '') + '">' +
          (s.img ? '<button type="button" data-lightbox="' + bigImg(s.img) + '" data-lightbox-fallback="' + s.img + '" data-lightbox-alt="' + plain(s.name) + '" class="shrink-0 rounded-lg" aria-label="View larger image of ' + plain(s.name) + '">' +
            '<img src="' + s.img + '" alt="" loading="lazy" onerror="this.closest(\'button\').remove()" class="w-14 h-14 rounded-lg object-cover border border-rule">' +
          '</button>' : '') +
          '<div class="ml-auto shrink-0 flex items-center gap-2">' +
          listenButtonHTML(s) +
          (hasLoc ?
            '<button data-toggle="' + s.id + '" class="shrink-0 inline-flex items-center gap-1 text-[12px] font-semibold px-3 py-2 rounded-full border transition-colors ' +
              (on ? 'bg-verdigris text-white border-verdigris' : 'border-rule text-ink hover:border-ink') + '">' +
              (on ? 'Stop ' + pos + ' <svg class="lucide lucide-check w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>' : 'Add to route') +
            '</button>'
          : '<button disabled title="This stop doesn&rsquo;t have a location yet, so it can&rsquo;t be added to a route." class="shrink-0 inline-flex items-center text-[12px] font-semibold px-3 py-2 rounded-full border border-rule text-faint opacity-60 cursor-not-allowed">Not mapped yet</button>') +
          '</div>' +
        '</div>' +
        '<div class="min-w-0 mt-3' + (compact ? ' shrink-0' : '') + '">' +
          '<div class="mb-2">' + catChip(s.cat) + '</div>' +
          '<h3 class="font-display text-[23px] sm:text-[28px] leading-[1.1] mb-1">' + s.name + '</h3>' +
          '<p class="font-mono text-[11px] text-muted num' + (compact ? ' truncate' : '') + '">' + s.area + ' &middot; ' + s.pc + '</p>' +
        '</div>' +
        (compact ? '<div class="flex-1 min-h-0 overflow-hidden mt-3" data-desc-wrap>' : '') +
        '<p class="font-serif text-[17px] leading-[1.55] text-ink max-w-[62ch]' + (compact ? '' : ' mt-3') + '"' + (compact ? ' data-desc-text' : '') + '>' +
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
      // Don't talk over a card's ElevenLabs narration (see Narration below).
      if (typeof narrationAudio !== 'undefined' && narrationAudio) narrationAudio.pause();

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

    document.getElementById('routeMeta').textContent =
      n === 0 ? 'No stops yet' : n + (n === 1 ? ' stop' : ' stops');
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

    applyRouteView();
    renderRouteMap();

    if (n === 0) {
      routeListEl.innerHTML =
        '<div class="px-5 py-10 text-center">' +
          '<p class="font-display text-[21px] leading-tight mb-1.5">An empty morning</p>' +
          '<p class="text-[13px] leading-relaxed text-muted max-w-[30ch] mx-auto">Add stops from WalkieTalkies. They stack in the order you add them, and you can shuffle them after.</p>' +
        '</div>';
      return;
    }

    var html = '';
    if (seeded) {
      html += '<p class="px-5 pt-4 pb-1 text-[12px] leading-relaxed text-brass">' +
              'Starter route: a Greenwich morning, riverside first, uphill last. Remove stops with &times; and build your own.</p>';
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
            playbarHTML(s, true) +
          '</div>' +
          '<div class="shrink-0 self-center flex items-center gap-1">' +
            (narrationFiles[s.id] ? listenButtonHTML(s, true) : '') +
            '<button type="button" data-route-menu="' + id + '" data-tooltip="More" aria-haspopup="menu" aria-expanded="false" aria-label="More actions for ' + plain(s.name) + '" class="w-7 h-7 rounded-full text-ink hover:bg-surface inline-flex items-center justify-center transition-colors">' +
              '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><circle cx="12" cy="5" r="1.75"/><circle cx="12" cy="12" r="1.75"/><circle cx="12" cy="19" r="1.75"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>';
    });
    routeListEl.innerHTML = html;
  }

  function plain(s) { return s.replace(/&[a-z]+;/g, ''); }

  // Every stop image is a Wikimedia Commons "/330px-Filename.ext" thumbnail
  // (see the stop-entries skill) — Commons serves any width at the
  // same path by swapping that prefix, so the lightbox can show a much
  // larger version without a second image source. Falls back to the
  // original URL for anything that doesn't match the expected pattern.
  function bigImg(url) {
    return url.replace(/\/330px-/, '/1200px-');
  }

  /* ---------------------------------------------------------------
     Chips, events
  --------------------------------------------------------------- */
  // Stops matching the current text search/area — but never the category
  // filter itself, so each category chip's count answers "how many would
  // match if this category were added", independent of any other category
  // already toggled on. Used only to build the chips, not the list.
  function stopsInFilterScope() {
    var q = filters.q.trim().toLowerCase();
    if (filters.area) return STOPS.filter(function (s) { return stopInArea(s, filters.area); });
    if (!q) return STOPS;
    return STOPS.filter(function (s) { return stopHay(s).indexOf(q) !== -1; });
  }

  function renderChips() {
    var wrap = document.getElementById('chips');
    var scopeStops = stopsInFilterScope();
    // Small pills only on the search results screen (filters.q set); the
    // bigger cards everywhere else — home and area pages both leave q
    // empty — regardless of screen size.
    var isSearch = !!filters.q;
    var html = '';
    Object.keys(CATS).forEach(function (key) {
      var n = scopeStops.filter(function (s) { return s.cat === key; }).length;
      if (n === 0) return;
      html += isSearch ? catFilterChip(key, n) : catCard(key, n);
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
    var wasHome = !filters.q && !filters.cats.length && !filters.area;
    var wasArea = !!filters.area;
    var q = e.target.value;

    applySearchState(q, wasArea);

    // Keep the URL in sync (?q=…) so search results are their own
    // shareable/back-button-able page, the same way ?area= already works
    // for areas — replaceState, not pushState, so every keystroke doesn't
    // spam browser history.
    var url = new URL(location.href);
    url.searchParams.delete('area');
    url.searchParams.delete('view');
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
    var d = e.target.closest('[data-discover]');
    if (d && !e.metaKey && !e.ctrlKey && !e.shiftKey) { e.preventDefault(); jumpToDiscover(); return; }
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

  // How many stops belong to an area, via the same stopInArea() test the
  // area page itself filters with — so the count matches what you'd see
  // if you jumped there.
  function areaStopCount(area) {
    var n = 0;
    for (var i = 0; i < STOPS.length; i++) { if (stopInArea(STOPS[i], area)) n++; }
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
  var discoverHeroEl = document.getElementById('discoverHero');

  // Plural category labels for the area cards' breakdown ("2 Blue
  // plaques"); CATS stays as-is for the singular uses everywhere else.
  var CAT_PLURALS = {
    plaque: 'Blue plaques', grand: 'Great buildings', maritime: 'River & sea',
    works: 'Industry & invention', culture: 'Museums & galleries',
    memory: 'Memorials & protest', green: 'Parks & burial grounds',
    pub: 'Historic pubs', art: 'Art & artists', brewery: 'Breweries',
    resident: 'Notable residents'
  };
  var CAT_SINGULARS = { resident: 'Notable resident' };

  // Area photos on the Discover cards are switched off for now — only 6 of
  // 30 areas have one, so most cards were showing an empty placeholder.
  // Flip back to true once AREA_INFO has more photos.
  var SHOW_AREA_CARD_PHOTOS = false;

  // How the area cards list their categories: 'list' (one per line) or
  // 'wrap' (pills that wrap onto multiple lines). Trying both out for now —
  // ?catstyle=list or ?catstyle=wrap in the URL overrides the default.
  var AREA_CARD_CAT_STYLE = (function () {
    var fromUrl = new URLSearchParams(location.search).get('catstyle');
    return fromUrl === 'list' || fromUrl === 'wrap' ? fromUrl : 'wrap';
  })();

  // "1 Great building" / "2 Blue plaques" — shared by the Discover area
  // cards and the area pages' per-category row headings.
  function catCountLabel(cat, n) {
    return n + ' ' + (n === 1 ? (CAT_SINGULARS[cat] || CATS[cat]) : CAT_PLURALS[cat]);
  }

  // Big-card version of an area chip: same colours, plus the area's total
  // and a count per category, biggest first. Stops are matched the same
  // way areaStopCount/the area page itself match them, so the numbers
  // line up with what you see after clicking through.
  function areaCardHTML(area) {
    var c = AREA_COLORS[area];
    var counts = {}, total = 0;
    STOPS.forEach(function (s) {
      if (!stopInArea(s, area)) return;
      counts[s.cat] = (counts[s.cat] || 0) + 1;
      total++;
    });
    var cats = Object.keys(counts).sort(function (a, b) {
      return counts[b] - counts[a] || CATS[a].localeCompare(CATS[b]);
    });
    // Same one-line description as the area page's hero, and (when
    // SHOW_AREA_CARD_PHOTOS is on) its photo. Most areas don't have a
    // photo yet, so those get a neutral placeholder panel the same size,
    // keeping every card in the carousel lined up.
    var info = (typeof AREA_INFO !== 'undefined' && AREA_INFO[area]) || null;
    var desc = AREA_DESCRIPTIONS[area] || '';
    return '<button class="area-card" data-area="' + area + '" style="background:' + c.bg + ';color:' + c.fg + '">' +
      (!SHOW_AREA_CARD_PHOTOS ? '' : info && info.image
        ? '<img class="area-card__img" src="' + info.image + '" alt="" loading="lazy" onerror="this.outerHTML=\'<span class=&quot;area-card__img&quot;></span>\'">'
        : '<span class="area-card__img"></span>') +
      '<span class="area-card__head">' +
        '<span class="area-card__name">' + areaTitle(area) + '</span>' +
        '<span class="area-card__total">' + total + (total === 1 ? ' stop' : ' stops') + '</span>' +
      '</span>' +
      (desc ? '<span class="area-card__desc">' + desc + '</span>' : '') +
      '<span class="area-card__cats' + (AREA_CARD_CAT_STYLE === 'wrap' ? ' area-card__cats--wrap' : '') + '">' +
        cats.map(function (cat) {
          var n = counts[cat];
          var label = n === 1 ? (CAT_SINGULARS[cat] || CATS[cat]) : CAT_PLURALS[cat];
          return '<span class="area-card__cat">' +
            '<svg viewBox="0 0 256 256" width="14" height="14" fill="currentColor" aria-hidden="true">' + CATMARK[cat].icon + '</svg>' +
            '<span class="area-card__n">' + n + '</span>' +
            '<span>' + label.replace(/&/g, '&amp;') + '</span>' +
          '</span>';
        }).join('') +
      '</span>' +
    '</button>';
  }

  // Every area as a card for the Discover page, in the same order as the
  // homepage's area chips (AREA_COLORS is collected from them in DOM order).
  document.getElementById('discoverAreas').innerHTML = Object.keys(AREA_COLORS)
    .map(areaCardHTML).join('');

  var reconnectStickyAreaBar = null; // set by stickyAreaBar() below

  function setDiscoverMode(on) {
    var changed = discoverMode !== on;
    discoverMode = on;
    discoverHeroEl.classList.toggle('hidden', !on);
    if (changed && reconnectStickyAreaBar) reconnectStickyAreaBar();
  }

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
    setDiscoverMode(false);
    document.getElementById('search').value = q;
    filters.q = q;
    filters.area = null;
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
    setDiscoverMode(false);
    filters.q = '';
    filters.area = area.toLowerCase();
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
    // A category card whose own colour happens to match this area's
    // background (e.g. "Great building" and "Notable residents" are both
    // marigold, same as the Honor Oak page background) would otherwise
    // disappear into the page — outline it in the area's own ink colour,
    // the same colour the title/header already use against that bg.
    Array.prototype.forEach.call(document.querySelectorAll('.cat-card[data-cat]'), function (card) {
      var matches = !!(c && colorsAreClose(getComputedStyle(card).backgroundColor, c.bg));
      card.classList.toggle('cat-card--on-area-bg', matches);
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
    renderAreaMap(visible());

    if (scrollBehavior) {
      // #list is hidden on large screens, where #areaRows replaces it.
      var listTarget = listEl.offsetParent !== null ? listEl : areaRowsEl;
      listTarget.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
    }
  }

  function clearAreaFilter() {
    setDiscoverMode(false);
    filters.q = '';
    filters.area = null;
    filters.cats = [];
    document.getElementById('search').value = '';
    renderChips();
    renderList();
    document.title = 'WalkieTalkies';
    document.documentElement.style.removeProperty('--area-bg');
    document.documentElement.style.removeProperty('--area-ink');
    document.documentElement.classList.remove('area-active');
    areaHeroEl.classList.add('hidden');
    areaMapEl.classList.add('hidden');
    setHomeFurnitureHidden(false);
    document.getElementById('areaChipsBottom').classList.add('hidden');
    Array.prototype.forEach.call(document.querySelectorAll('.area-chip--on-match'), function (chip) {
      chip.classList.remove('area-chip--on-match');
    });
  }

  // Discover: the homepage minus its furniture, with the full stop list in
  // place of the carousel — built on clearAreaFilter so every bit of
  // area/search state is reset the same way going home does.
  function applyDiscover() {
    clearAreaFilter();
    setDiscoverMode(true);
    setHomeFurnitureHidden(true);
    renderList();
    document.title = 'Discover — WalkieTalkies';
  }

  function jumpToDiscover() {
    applyDiscover();
    var url = new URL(location.href);
    url.searchParams.delete('q');
    url.searchParams.delete('area');
    url.searchParams.set('view', 'discover');
    history.pushState({ view: 'discover' }, '', url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function jumpToArea(area) {
    applyAreaFilter(area);
    var url = new URL(location.href);
    url.searchParams.delete('q');
    url.searchParams.delete('view');
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
    else if (params.get('view') === 'discover') applyDiscover();
    else clearAreaFilter();
  });


  // Route panel: a bottom sheet on small screens, a dropdown menu off the
  // header button on larger ones — same open/closed state either way.
  var root = document.documentElement;
  var routeHeaderBtn = document.getElementById('routeHeaderBtn');
  var routeHeaderChevron = document.getElementById('routeHeaderChevron');
  var routePanelEl = document.getElementById('routePanel');
  var routePanelBodyEl = document.getElementById('routePanelBody');
  var routeBarEl = document.getElementById('routeBar');
  var routeOpenTrigger = null; // element to refocus when the panel closes
  function focusableIn(container) {
    return Array.prototype.filter.call(
      container.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'),
      function (el) { return el.offsetParent !== null; }
    );
  }
  function openSheet(v) {
    if (!v && routeMenuEl) closeRouteMenu();
    var wasOpen = root.classList.contains('route-open');
    root.classList.toggle('route-open', v);
    document.getElementById('scrim').hidden = !v;
    routeHeaderBtn.setAttribute('aria-expanded', v ? 'true' : 'false');
    routeHeaderChevron.style.transform = v ? 'rotate(180deg)' : '';
    routeBarEl.setAttribute('aria-expanded', v ? 'true' : 'false');
    // The panel's width can change between renders (dropdown vs. bottom
    // sheet, or a window resize while closed) — resync the map's canvas
    // to its container each time it becomes visible.
    if (v && routeMap) setTimeout(function () { routeMap.invalidateSize(); }, 0);
    if (v && !wasOpen) {
      // routePanelBodyEl, not routePanelEl — #routeBar (the always-visible
      // summary row) is itself inside #routePanel now, so focusing the
      // panel's first focusable would just refocus the button that was
      // already clicked instead of moving into the newly revealed content.
      var focusables = focusableIn(routePanelBodyEl);
      if (focusables.length) focusables[0].focus();
    } else if (!v && wasOpen && routeOpenTrigger) {
      routeOpenTrigger.focus();
      routeOpenTrigger = null;
    }
  }
  // Toggles both ways: tapping the always-visible bar again is how the
  // mobile sheet closes (on desktop it's #routeHeaderBtn again, an outside
  // click or Escape).
  routeBarEl.addEventListener('click', function (e) {
    e.stopPropagation();
    var willOpen = !root.classList.contains('route-open');
    if (willOpen) routeOpenTrigger = routeBarEl;
    openSheet(willOpen);
  });
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
  /* Route stop overflow menu — Move up / Move down / Remove, opened from a
     stop's ⋯ button. One shared menu in <body>, position:fixed beside the
     button: inside #routePanel it would be clipped by the panel's
     overflow (and by #routeScroll's). Its items reuse the data-move /
     data-toggle actions handled by the document click handler above. */
  var routeMenuEl = document.createElement('div');
  routeMenuEl.id = 'routeItemMenu';
  routeMenuEl.setAttribute('role', 'menu');
  routeMenuEl.hidden = true;
  document.body.appendChild(routeMenuEl);
  var routeScrollEl = document.getElementById('routeScroll');
  var routeMenuFor = null; // stop id the open menu belongs to
  var routeMenuIndex = 0; // …and its place in the route when it opened

  var MENU_ICON_UP = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6L12 2L16 6" /><path d="M12 2V22" /></svg>';
  var MENU_ICON_DOWN = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 18L12 22L16 18" /><path d="M12 2V22" /></svg>';
  var MENU_ICON_REMOVE = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>';

  function routeMenuTrigger(id) {
    return id ? document.querySelector('[data-route-menu="' + id + '"]') : null;
  }

  function closeRouteMenu(refocus) {
    if (routeMenuEl.hidden) return;
    var trigger = routeMenuTrigger(routeMenuFor);
    routeMenuEl.hidden = true;
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    if (refocus && trigger) trigger.focus();
    routeMenuFor = null;
  }

  // Right-aligned under the stop's ⋯, or above it when there's no room below.
  function positionRouteMenu() {
    var btn = routeMenuTrigger(routeMenuFor);
    if (!btn) return;
    var r = btn.getBoundingClientRect();
    var w = routeMenuEl.offsetWidth, h = routeMenuEl.offsetHeight;
    var top = r.bottom + 6;
    if (top + h > window.innerHeight - 8) top = Math.max(8, r.top - h - 6);
    routeMenuEl.style.top = top + 'px';
    routeMenuEl.style.left = Math.max(8, Math.min(r.right - w, window.innerWidth - w - 8)) + 'px';
  }

  function openRouteMenu(btn) {
    var id = btn.getAttribute('data-route-menu');
    var i = route.indexOf(id);
    closeRouteMenu();
    routeMenuEl.innerHTML =
      '<button type="button" role="menuitem" data-move="' + id + '" data-dir="-1"' + (i === 0 ? ' disabled' : '') + '>' + MENU_ICON_UP + 'Move up</button>' +
      '<button type="button" role="menuitem" data-move="' + id + '" data-dir="1"' + (i === route.length - 1 ? ' disabled' : '') + '>' + MENU_ICON_DOWN + 'Move down</button>' +
      '<button type="button" role="menuitem" data-toggle="' + id + '">' + MENU_ICON_REMOVE + 'Remove</button>';
    routeMenuEl.hidden = false;
    routeMenuFor = id;
    routeMenuIndex = i;
    btn.setAttribute('aria-expanded', 'true');

    positionRouteMenu();

    var first = routeMenuEl.querySelector('button:not([disabled])');
    if (first) first.focus();
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-route-menu]');
    if (trigger) {
      if (routeMenuFor === trigger.getAttribute('data-route-menu')) closeRouteMenu();
      else openRouteMenu(trigger);
      return;
    }
    var item = e.target.closest('#routeItemMenu [role="menuitem"]');
    if (item) {
      // The action itself already ran (document click handler above) and
      // re-rendered the list. Focus goes back to the stop's ⋯ after a move,
      // or to the ⋯ of whichever stop took a removed one's place.
      var id = routeMenuFor;
      var at = routeMenuIndex;
      closeRouteMenu();
      var t = routeMenuTrigger(id);
      if (!t) {
        var all = document.querySelectorAll('[data-route-menu]');
        t = all[Math.min(at, all.length - 1)];
      }
      if (t) t.focus();
      return;
    }
    if (!routeMenuEl.contains(e.target)) closeRouteMenu();
  });

  // Capture phase, so Escape closes just the menu, not the whole route panel.
  document.addEventListener('keydown', function (e) {
    if (routeMenuEl.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); closeRouteMenu(true); return; }
    if (e.key === 'Tab') { closeRouteMenu(true); return; }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      var items = Array.prototype.slice.call(routeMenuEl.querySelectorAll('button:not([disabled])'));
      var at = items.indexOf(document.activeElement);
      var next = e.key === 'ArrowDown' ? (at + 1) % items.length : (at - 1 + items.length) % items.length;
      if (items[next]) items[next].focus();
    }
  }, true);

  // It's pinned to the viewport, so don't leave it floating as things move.
  routeScrollEl.addEventListener('scroll', function () { closeRouteMenu(); });
  // A width change closes it; a height-only one (mobile browsers' toolbars
  // showing and hiding) moves the bottom sheet, so the menu follows it.
  var routeMenuVw = window.innerWidth;
  window.addEventListener('resize', function () {
    if (window.innerWidth !== routeMenuVw) { routeMenuVw = window.innerWidth; closeRouteMenu(); }
    else if (!routeMenuEl.hidden) positionRouteMenu();
  });

  // Dismiss the dropdown on an outside click (the mobile sheet already has
  // the scrim for this, but the desktop dropdown has no full-screen scrim)
  document.addEventListener('click', function (e) {
    if (!root.classList.contains('route-open')) return;
    // A remove (×) or move button re-renders #routeList before this runs,
    // so the clicked button is already detached and would look "outside".
    if (!e.target.isConnected) return;
    if (routePanelEl.contains(e.target) || routeHeaderBtn.contains(e.target) || routeMenuEl.contains(e.target)) return;
    openSheet(false);
  });

  /* Tooltips for icon-only buttons: any element with data-tooltip. Shown
     after a short hover with a mouse, or straight away on keyboard focus;
     touch never shows them (there's no hover, and a tap acts at once).
     The text is read when shown, so buttons that change state (Listen ↔
     Pause, Show map ↔ Show list) just update their data-tooltip. It's
     aria-hidden: each button's aria-label already names it for screen
     readers. */
  (function () {
    var tip = document.createElement('div');
    tip.id = 'tooltip';
    tip.setAttribute('aria-hidden', 'true');
    tip.hidden = true;
    document.body.appendChild(tip);
    var target = null, timer = null;
    var canHover = window.matchMedia('(hover: hover) and (pointer: fine)');

    function place() {
      var r = target.getBoundingClientRect();
      var w = tip.offsetWidth, h = tip.offsetHeight;
      // Above by default; below when that would run off the top (or under
      // the fixed header, for buttons in it).
      var headerBottom = (document.querySelector('header') || { getBoundingClientRect: function () { return { bottom: 0 }; } }).getBoundingClientRect().bottom;
      var inHeader = !!target.closest('header');
      var top = r.top - h - 8;
      if (inHeader || top < (inHeader ? 0 : headerBottom) + 4) top = r.bottom + 8;
      var left = Math.max(8, Math.min(r.left + r.width / 2 - w / 2, window.innerWidth - w - 8));
      tip.style.top = top + 'px';
      tip.style.left = left + 'px';
    }

    function show(el) {
      var text = el.getAttribute('data-tooltip');
      if (!text) return;
      target = el;
      tip.textContent = text;
      tip.hidden = false;
      place();
      tip.classList.add('is-on');
    }

    function hide() {
      clearTimeout(timer);
      timer = null;
      target = null;
      tip.classList.remove('is-on');
      tip.hidden = true;
    }

    document.addEventListener('pointerover', function (e) {
      if (e.pointerType !== 'mouse' || !canHover.matches) return;
      var el = e.target.closest('[data-tooltip]');
      if (!el || el === target) return;
      hide();
      timer = setTimeout(function () { if (el.isConnected) show(el); }, 450);
    });
    document.addEventListener('pointerout', function (e) {
      var el = e.target.closest('[data-tooltip]');
      if (el && !el.contains(e.relatedTarget)) hide();
    });
    document.addEventListener('focusin', function (e) {
      var el = e.target.closest && e.target.closest('[data-tooltip]');
      if (el && el.matches(':focus-visible')) show(el); else hide();
    });
    document.addEventListener('focusout', hide);
    // A press acts straight away (and may change the label), so get out of the way.
    document.addEventListener('pointerdown', hide, true);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && target) hide(); });
    window.addEventListener('scroll', hide, true);
    window.addEventListener('resize', hide);
  })();

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
      toggleBtn.setAttribute('data-tooltip', open ? 'Close search' : 'Search');
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
    var routeBtn = document.getElementById('routeHeaderBtn');
    function measure() {
      raf = null;
      root.style.setProperty('--header-h', headerEl.offsetHeight + 'px');
      // The desktop route dropdown hangs just under its header button
      // (styles.css). The header is fixed, so this doesn't change on scroll.
      if (routeBtn && routeBtn.offsetParent) {
        var r = routeBtn.getBoundingClientRect();
        root.style.setProperty('--route-btn-bottom', r.bottom + 'px');
        root.style.setProperty('--route-btn-right', (document.documentElement.clientWidth - r.right) + 'px');
      }
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

  // Reveal the compact sticky area nav once the big area chips scroll past
  // the header — the homepage marquee normally, or the Discover page's own
  // area chips while that view is showing (setDiscoverMode reconnects it).
  (function stickyAreaBar() {
    var bar = document.getElementById('areaStickyBar');
    var headerEl = document.querySelector('header');
    if (!bar || !headerEl || !window.IntersectionObserver) return;
    var io = null;
    function connect() {
      if (io) io.disconnect();
      var target = document.getElementById(discoverMode ? 'discoverAreas' : 'areaChips');
      io = new IntersectionObserver(function (entries) {
        var e = entries[0];
        var pastIt = !e.isIntersecting && e.boundingClientRect.top < 0;
        bar.classList.toggle('hidden', !pastIt);
      }, { rootMargin: '-' + headerEl.offsetHeight + 'px 0px 0px 0px', threshold: 0 });
      io.observe(target);
    }
    connect();
    reconnectStickyAreaBar = connect;
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
     Narration — ElevenLabs MP3s made by scripts/generate-audio.js. Its
     assets/audio/manifest.json lists which stops have one; those cards
     get a Listen button. One shared <audio>, so starting a stop stops
     whatever was playing before.
  --------------------------------------------------------------- */
  var narrationFiles = {}; // stop id → manifest entry
  var narrationAudio = new Audio();
  narrationAudio.preload = 'none';
  var narrationId = null; // stop currently loaded into narrationAudio

  var ICON_PLAY = '<svg class="w-3.5 h-3.5 translate-x-px" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z"/></svg>';
  var ICON_PAUSE = '<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>';

  function isNarrating(id) { return narrationId === id && !narrationAudio.paused; }

  function listenButtonInner(id) {
    // Icon only — the button's aria-label carries the words.
    return isNarrating(id) ? ICON_PAUSE : ICON_PLAY;
  }

  // small: the compact version for the route panel's stop list.
  function listenButtonHTML(s, small) {
    if (!narrationFiles[s.id]) return '';
    var playing = isNarrating(s.id);
    return '<button type="button" data-listen="' + s.id + '" data-tooltip="' + (playing ? 'Pause' : 'Listen') + '" aria-pressed="' + playing + '" aria-label="' + (playing ? 'Pause' : 'Listen to') + ' ' + plain(s.name) + '" ' +
      'class="shrink-0 inline-flex items-center justify-center ' + (small ? 'w-7 h-7' : 'w-9 h-9') + ' rounded-full border border-rule text-ink hover:border-ink transition-colors">' +
      listenButtonInner(s.id) +
    '</button>';
  }

  // Updates every Listen button in place rather than re-rendering the
  // lists, so carousels keep their scroll position while audio plays.
  /* Playbar — elapsed time, a seekable track and the clip's length, shown
     on a stop's card (pinned in its bottom padding, so the card's layout
     doesn't move) and its route item while that stop is loaded: playing,
     paused part-way, or still on the signature (held at 0:00 until the
     clip itself starts). */
  function fmtTime(t) {
    if (!isFinite(t) || t < 0) t = 0;
    var m = Math.floor(t / 60), sec = Math.floor(t % 60);
    return m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  function playbarState(id) {
    var active = narrationId === id;
    var clip = active && !inSignature;
    var dur = clip ? narrationAudio.duration : NaN;
    var at = clip ? narrationAudio.currentTime : 0;
    return { active: active, at: at, dur: dur, frac: isFinite(dur) && dur > 0 ? Math.min(1, at / dur) : 0 };
  }

  // inline: the route panel's version, in the stop's text column.
  function playbarHTML(s, inline) {
    if (!narrationFiles[s.id]) return '';
    var st = playbarState(s.id);
    return '<div data-playbar="' + s.id + '" class="playbar' + (inline ? ' playbar--inline' : '') + '"' + (st.active ? '' : ' hidden') + '>' +
      '<span data-pb-at class="num">' + fmtTime(st.at) + '</span>' +
      '<div data-pb-track role="slider" tabindex="0" aria-label="Seek ' + plain(s.name) + '" aria-valuemin="0" aria-valuemax="' + Math.round(st.dur || 0) + '" aria-valuenow="' + Math.round(st.at) + '" class="playbar__track">' +
        '<div data-pb-fill class="playbar__fill" style="transform:scaleX(' + st.frac + ')"></div>' +
      '</div>' +
      '<span data-pb-dur class="num">' + (isFinite(st.dur) ? fmtTime(st.dur) : '–:––') + '</span>' +
    '</div>';
  }

  function updatePlaybars() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-playbar]'), function (bar) {
      var st = playbarState(bar.getAttribute('data-playbar'));
      bar.hidden = !st.active;
      if (!st.active) return;
      bar.querySelector('[data-pb-fill]').style.transform = 'scaleX(' + st.frac + ')';
      bar.querySelector('[data-pb-at]').textContent = fmtTime(st.at);
      bar.querySelector('[data-pb-dur]').textContent = isFinite(st.dur) ? fmtTime(st.dur) : '–:––';
      var track = bar.querySelector('[data-pb-track]');
      track.setAttribute('aria-valuemax', String(Math.round(st.dur || 0)));
      track.setAttribute('aria-valuenow', String(Math.round(st.at)));
      track.setAttribute('aria-valuetext', fmtTime(st.at) + ' of ' + (isFinite(st.dur) ? fmtTime(st.dur) : 'unknown'));
    });
  }

  // timeupdate only fires ~4 times a second; a frame loop while playing
  // keeps the fill moving smoothly.
  var playbarFrame = null;
  function playbarLoop() {
    updatePlaybars();
    playbarFrame = narrationAudio.paused ? null : requestAnimationFrame(playbarLoop);
  }
  narrationAudio.addEventListener('play', function () { if (!playbarFrame) playbarFrame = requestAnimationFrame(playbarLoop); });
  ['pause', 'ended', 'timeupdate', 'loadedmetadata', 'durationchange', 'seeked', 'emptied'].forEach(function (ev) {
    narrationAudio.addEventListener(ev, updatePlaybars);
  });

  // Seeking: tap or drag along the track (once the clip itself is
  // playing — not during the signature), or arrow keys for 5s steps.
  // Needs the server to support range requests (GitHub Pages does;
  // python -m http.server doesn't, and there a seek would restart the clip).
  function seekableTrack(track) {
    var bar = track.closest('[data-playbar]');
    var sk = narrationAudio.seekable;
    return bar && bar.getAttribute('data-playbar') === narrationId && !inSignature &&
      isFinite(narrationAudio.duration) && sk.length && sk.end(sk.length - 1) > 0 ? track : null;
  }
  function seekTo(track, clientX) {
    var r = track.getBoundingClientRect();
    var frac = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    narrationAudio.currentTime = frac * narrationAudio.duration;
    updatePlaybars();
  }
  var seekingTrack = null;
  document.addEventListener('pointerdown', function (e) {
    var track = e.target.closest('[data-pb-track]');
    if (!track || !seekableTrack(track)) return;
    e.preventDefault();
    seekingTrack = track;
    track.setPointerCapture(e.pointerId);
    seekTo(track, e.clientX);
  });
  document.addEventListener('pointermove', function (e) {
    if (seekingTrack) seekTo(seekingTrack, e.clientX);
  });
  document.addEventListener('pointerup', function () { seekingTrack = null; });
  document.addEventListener('pointercancel', function () { seekingTrack = null; });
  document.addEventListener('keydown', function (e) {
    var track = e.target.closest && e.target.closest('[data-pb-track]');
    if (!track || !seekableTrack(track)) return;
    var step = { ArrowRight: 5, ArrowUp: 5, ArrowLeft: -5, ArrowDown: -5 }[e.key];
    if (step === undefined) return;
    e.preventDefault();
    narrationAudio.currentTime = Math.max(0, Math.min(narrationAudio.duration, narrationAudio.currentTime + step));
    updatePlaybars();
  });

  function syncListenButtons() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-listen]'), function (btn) {
      var id = btn.getAttribute('data-listen');
      var playing = isNarrating(id);
      btn.innerHTML = listenButtonInner(id);
      btn.setAttribute('aria-pressed', String(playing));
      btn.setAttribute('aria-label', (playing ? 'Pause' : 'Listen to') + ' ' + plain((byId[id] && byId[id].name) || ''));
      btn.setAttribute('data-tooltip', playing ? 'Pause' : 'Listen');
    });
    updatePlaybars();
  }

  // The WalkieTalkies signature sound plays before every clip. It goes
  // through the same <audio> as the narration (swapping src when it ends)
  // rather than a second element, because mobile Safari only lets an
  // element play without a tap once a tap has started it.
  var SIGNATURE_SRC = 'assets/signature.mp3?v=3'; // bump v when the file changes
  var inSignature = false; // narrationAudio is playing the signature, the clip comes next

  function narrationSrc(id) {
    // The manifest hash changes whenever the file is regenerated, so it
    // doubles as a cache-buster for browsers holding an old version.
    return 'assets/audio/' + id + '.mp3?v=' + (narrationFiles[id].hash || '');
  }

  function playNarration() {
    narrationAudio.play().catch(function () { syncListenButtons(); });
  }

  // Signature over (or failed to load): on to the stop's clip.
  function startClipAfterSignature() {
    inSignature = false;
    narrationAudio.src = narrationSrc(narrationId);
    playNarration();
  }

  function toggleNarration(id) {
    if (isNarrating(id)) { narrationAudio.pause(); return; }
    // The route panel's browser-voice Listen and this shouldn't talk over each other.
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    // A new stop, or one that played to the end, starts again with the
    // signature; a paused one resumes where it was (signature or clip).
    if (narrationId !== id) {
      narrationId = id;
      inSignature = true;
      narrationAudio.src = SIGNATURE_SRC;
    }
    playNarration();
  }

  // Registered before syncListenButtons so the buttons never flash back
  // to Play in the gap between the signature and the clip.
  narrationAudio.addEventListener('ended', function () {
    if (inSignature) startClipAfterSignature();
    else narrationId = null; // finished — the next Listen starts from the signature
  });
  narrationAudio.addEventListener('error', function () {
    if (inSignature) startClipAfterSignature();
  });
  ['play', 'pause', 'ended', 'error'].forEach(function (ev) {
    narrationAudio.addEventListener(ev, syncListenButtons);
  });

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-listen]');
    if (b) toggleNarration(b.getAttribute('data-listen'));
  });

  fetch('assets/audio/manifest.json', { cache: 'no-cache' })
    .then(function (r) { return r.ok ? r.json() : {}; })
    .then(function (m) {
      narrationFiles = m || {};
      if (Object.keys(narrationFiles).length) {
        renderList(); renderRoute();
        // Warm the cache so the first Listen doesn't wait on the signature.
        fetch(SIGNATURE_SRC).catch(function () {});
      }
    })
    .catch(function () { /* no narration yet — cards just don't get a Listen button */ });

  /* ---------------------------------------------------------------
     Image lightbox — tap a stop's thumbnail (stopHTML's [data-lightbox]
     button) to see it full-size. Mainly for mobile, where there's no
     hover-to-preview and the 56px thumbnail is otherwise too small to
     make out detail in.
  --------------------------------------------------------------- */
  var lightboxEl = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxTrigger = null;

  function openLightbox(trigger) {
    lightboxTrigger = trigger;
    var name = trigger.getAttribute('data-lightbox-alt') || '';
    // Not every source photo is large enough for the 1200px upscale in
    // data-lightbox — Commons returns a 400 rather than capping at the
    // original size, so fall back to the thumbnail already proven to
    // work (data-lightbox-fallback) if the bigger request fails.
    lightboxImg.onerror = function () {
      lightboxImg.onerror = null;
      lightboxImg.src = trigger.getAttribute('data-lightbox-fallback');
    };
    lightboxImg.src = trigger.getAttribute('data-lightbox');
    lightboxImg.alt = name;
    lightboxCaption.textContent = name;
    lightboxEl.classList.remove('hidden');
    lightboxEl.classList.add('flex');
    document.getElementById('lightboxClose').focus();
  }
  function closeLightbox() {
    if (lightboxEl.classList.contains('hidden')) return;
    lightboxEl.classList.add('hidden');
    lightboxEl.classList.remove('flex');
    lightboxImg.src = '';
    lightboxCaption.textContent = '';
    if (lightboxTrigger) { lightboxTrigger.focus(); lightboxTrigger = null; }
  }
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-lightbox]');
    if (trigger) { openLightbox(trigger); return; }
    // Anywhere else inside the open lightbox except the image itself
    // (the close button or the dark backdrop) dismisses it.
    if (e.target.closest('#lightbox') && !e.target.closest('#lightboxImg')) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lightboxEl.classList.contains('hidden')) closeLightbox();
  });

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
    else if (params.get('view') === 'discover') applyDiscover();
  })();
})();
