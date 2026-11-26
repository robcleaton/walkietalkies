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
    // Only stops with a location go on the map; markers keep their number
    // in the route, so a gap shows where an unmapped stop sits.
    var onMap = route.filter(function (id) { return hasLoc(byId[id]); });
    var n = onMap.length;
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

    var latlngs = onMap.map(function (id) { return [byId[id].lat, byId[id].lon]; });
    L.polyline(latlngs, { color: '#171717', weight: 3, opacity: .55, dashArray: '1 8', lineCap: 'round' }).addTo(routeMapLayer);
    onMap.forEach(function (id) {
      var s = byId[id];
      var icon = L.divIcon({
        className: '',
        html: '<span class="flex items-center justify-center w-[22px] h-[22px] rounded-full text-white font-mono text-[11px] font-semibold" style="background:var(--verdigris);box-shadow:0 1px 3px rgba(0,0,0,.4)">' + (route.indexOf(id) + 1) + '</span>',
        iconSize: [22, 22], iconAnchor: [11, 11]
      });
      L.marker([s.lat, s.lon], { icon: icon }).addTo(routeMapLayer).bindPopup(plain(s.name), { closeButton: false });
    });

    routeMap.invalidateSize();
    if (latlngs.length === 1) routeMap.setView(latlngs[0], 15);
    else routeMap.fitBounds(latlngs, { padding: [24, 24] });
  }

  /* ---------------------------------------------------------------
     Area map (Leaflet + OpenStreetMap) — every mapped stop in the
     current area, colour-coded by category. Stops without a pinned
     location just don't get a marker; the map itself is hidden
     entirely if none do.
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

  // A map pin's popover (area map and stop-page map): the stop's photo
  // (when it has one) above its name, both linking to the stop's page, and
  // a round + button beside the name to add it to the route, numbered
  // once it's in (as the list rows). .map-pop in styles.css. The link and button use the
  // page-wide data-stop-link and data-toggle click handlers; Leaflet lets
  // popup clicks through to them. Bind it as a function so each opening
  // shows the current route state. here: the stop whose page this is, so
  // no link. The photo is sized up front so the popover doesn't change
  // shape as it loads; one that fails is dropped.
  function stopPopHTML(s, here) {
    var img = s.img ? '<img class="map-pop__img" src="' + s.img + '" alt="" width="180" height="120" decoding="async" onerror="this.remove()">' : '';
    var href = ' href="' + stopPath(s.id) + '" data-stop-link="' + s.id + '"';
    // The photo is a second link to the same page, so it's kept out of the
    // tab order and from screen readers; the name is the one they get.
    var photo = !img ? '' : here ? img : '<a class="map-pop__photo"' + href + ' tabindex="-1" aria-hidden="true">' + img + '</a>';
    var name = here ? '<span class="map-pop__name">' + plain(s.name) + '</span>' :
      '<a class="map-pop__name"' + href + '>' + plain(s.name) + '</a>';
    return '<span class="map-pop">' + photo + '<span class="map-pop__row">' + name + popToggleHTML(s) + '</span></span>';
  }
  function popToggleHTML(s) {
    var on = inRoute(s.id), pos = route.indexOf(s.id) + 1;
    return '<button type="button" class="map-pop__add' + (on ? ' is-on' : '') + '" data-toggle="' + s.id + '" ' +
      'aria-pressed="' + on + '" aria-label="' + (on ? 'Remove ' + plain(s.name) + ' from your route (stop ' + pos + ')' : 'Add ' + plain(s.name) + ' to your route') + '">' +
      (on ? pos : '<svg class="lucide lucide-plus" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg>') +
      '</button>';
  }
  // After toggle(): an open popover's route button follows along.
  function refreshPopToggles() {
    Array.prototype.forEach.call(document.querySelectorAll('.map-pop [data-toggle]'), function (btn) {
      var s = byId[btn.getAttribute('data-toggle')];
      if (s) btn.outerHTML = popToggleHTML(s);
    });
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
      L.marker([s.lat, s.lon], { icon: icon }).addTo(areaMapLayer).bindPopup(function () { return stopPopHTML(s); }, { closeButton: false, className: 'map-pop-wrap' });
    });

    areaMap.invalidateSize();
    if (latlngs.length === 1) areaMap.setView(latlngs[0], 15);
    else areaMap.fitBounds(latlngs, { padding: [24, 24] });
  }
