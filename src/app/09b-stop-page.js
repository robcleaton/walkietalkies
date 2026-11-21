  /* ---------------------------------------------------------------
     Stop page — /stops/<id>/: one stop in full (photo and credit, full
     description, Listen and Add to route, the areas it's part of, and
     the stops nearest to it). Its static version is built by
     scripts/build-pages.js from the same template (stopPageHTML in
     00-shared.js); the app re-renders it here with the live parts.
  --------------------------------------------------------------- */
  var stopPageEl = document.getElementById('stopPage');
  var stopPageId = null; // the stop being shown, or null when not on a stop page
  var stopMapOn = false;  // the Map button's state; kept while re-rendering, reset per stop
  var stopMap = null;     // its Leaflet map, when shown

  // The areas a stop is part of, in the homepage chips' order.
  function stopPageAreas(s) {
    return Object.keys(AREA_COLORS).filter(function (area) { return stopInArea(s, area); });
  }

  // An area's chip as a link, in the same colours as its homepage chip.
  function areaLinkChipHTML(area) {
    var src = document.querySelector('#areaChips .area-chip[data-area="' + area + '"]');
    return '<a class="area-chip area-chip--compact" href="' + areaPath(area) + '" data-area="' + area + '"' +
      (src ? ' style="' + src.getAttribute('style') + '"' : '') + '>' + areaTitle(area) + '</a>';
  }

  /* Map button: swaps the photo for a map of where the stop is (with its
     nearest stops as smaller dots, for bearings), and back. Only for a
     stop with both a photo and a pinned location. */
  var ICON_MAP = '<svg class="lucide lucide-map w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/></svg>';
  var ICON_PHOTO = '<svg class="lucide lucide-image w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>';

  function stopMapButtonHTML(s) {
    if (!s.img || s.lat == null || s.lon == null) return '';
    return '<button type="button" data-stop-map-toggle aria-pressed="' + stopMapOn + '" ' +
      'class="shrink-0 inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-2 rounded-full border border-rule text-ink hover:border-ink transition-colors">' +
      (stopMapOn ? ICON_PHOTO + 'Photo' : ICON_MAP + 'Map') +
    '</button>';
  }

  function stopMarker(color, size) {
    return L.divIcon({
      className: '',
      html: '<span style="display:block;width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:' + color + ';border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.4)"></span>',
      iconSize: [size, size], iconAnchor: [size / 2, size / 2]
    });
  }

  // Shows the map (on) or the photo (off) in the stop page's figure.
  function showStopMap(on) {
    var s = byId[stopPageId];
    var mapEl = stopPageEl.querySelector('[data-stop-map]');
    var photo = stopPageEl.querySelector('figure [data-lightbox]');
    var credit = stopPageEl.querySelector('[data-photo-credit]');
    if (!s || !mapEl || !photo) return;
    if (on && typeof L === 'undefined') on = false; // Leaflet failed to load
    photo.classList.toggle('hidden', on);
    if (credit) credit.classList.toggle('invisible', on);
    mapEl.classList.toggle('hidden', !on);
    if (stopMap && stopMap.getContainer() !== mapEl) { stopMap.remove(); stopMap = null; }
    if (!on || stopMap) { if (stopMap) stopMap.invalidateSize(); return; }
    stopMap = L.map(mapEl, { scrollWheelZoom: false });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'
    }).addTo(stopMap);
    nearestTo(s, 8).forEach(function (n) {
      L.marker([n.s.lat, n.s.lon], { icon: stopMarker((CATMARK[n.s.cat] || {}).color || 'var(--ink)', 12), opacity: 0.85 })
        .addTo(stopMap).bindPopup(plain(n.s.name));
    });
    L.marker([s.lat, s.lon], { icon: stopMarker((CATMARK[s.cat] || {}).color || 'var(--ink)', 22), zIndexOffset: 1000 })
      .addTo(stopMap).bindPopup(plain(s.name));
    stopMap.setView([s.lat, s.lon], 16);
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-stop-map-toggle]');
    if (!btn) return;
    stopMapOn = !stopMapOn;
    btn.setAttribute('aria-pressed', String(stopMapOn));
    btn.innerHTML = stopMapOn ? ICON_PHOTO + 'Photo' : ICON_MAP + 'Map';
    showStopMap(stopMapOn);
  });

  function renderStopPage() {
    var s = byId[stopPageId];
    if (!s) return;
    var keep = stopPageEl.querySelector('[data-nearby-row]');
    var keepScroll = keep ? keep.scrollLeft : 0;
    var near = nearestTo(s, 8);
    stopPageEl.innerHTML = stopPageHTML(s, {
      areas: stopPageAreas(s),
      areaChipHTML: areaLinkChipHTML,
      actionsHTML: playbarHTML(s, 'inline') + listenButtonHTML(s) + routeButtonHTML(s) + stopMapButtonHTML(s),
      // The nearest stops as the homepage carousel's cards.
      nearbyHTML: near.length ?
        '<div data-nearby-row class="min-w-0 scroll-hide flex flex-nowrap gap-4 overflow-x-auto pb-2">' +
          near.map(function (n) {
            // No id: the same stop's card can be elsewhere on the page.
            var card = stopHTML(n.s, true, fmtDist(n.km)).replace(' id="stop-' + n.s.id + '"', '');
            return '<div class="w-[300px] sm:w-[340px] h-[400px] shrink-0">' + card + '</div>';
          }).join('') +
        '</div>' : ''
    });
    var row = stopPageEl.querySelector('[data-nearby-row]');
    if (row) row.scrollLeft = keepScroll;
    if (s.img) loadPhotoCredit(stopPageEl.querySelector('[data-photo-credit]'), s.img);
    showStopMap(stopMapOn);
    setTimeout(function () { adjustCardClamps(stopPageEl); }, 0);
  }

  function applyStopPage(id) {
    setDiscoverMode(false);
    filters.q = '';
    filters.area = null;
    filters.cats = [];
    document.getElementById('search').value = '';
    document.documentElement.classList.remove('area-active');
    areaHeroEl.classList.add('hidden');
    areaMapEl.classList.add('hidden');
    setHomeFurnitureHidden(true);
    // Every area as chips at the bottom, as on area pages.
    document.getElementById('areaChipsBottom').classList.remove('hidden');
    if (stopPageId !== id) stopMapOn = false;
    stopPageId = id;
    document.documentElement.classList.add('stop-page');
    stopPageEl.classList.remove('hidden');
    renderList(); // renders the stop page too (see renderList)
    document.title = stopPageTitle(byId[id]);
  }

  function leaveStopPage() {
    if (!stopPageId) return;
    stopPageId = null;
    stopMapOn = false;
    if (stopMap) { stopMap.remove(); stopMap = null; }
    document.documentElement.classList.remove('stop-page');
    stopPageEl.classList.add('hidden');
    stopPageEl.innerHTML = '';
    document.getElementById('areaChipsBottom').classList.add('hidden');
  }

  // The skip link targets #main, but with <base href="/"> its "#main"
  // would mean the homepage's — so jump within this page instead.
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href="#main"]');
    if (!a) return;
    e.preventDefault();
    var target = stopPageId ? stopPageEl : document.getElementById('main');
    target.setAttribute('tabindex', '-1');
    target.focus();
    target.scrollIntoView({ block: 'start' });
  });
