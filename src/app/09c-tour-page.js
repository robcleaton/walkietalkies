  /* ---------------------------------------------------------------
     Tours (/tours/<id>/): a curated set of stops from tours.js, in
     walking order. The page shows the tour's intro, its distance, a map
     with the stops numbered along the way, and each stop as a card. One
     button adds every stop on the tour to the visitor's own route.
     The homepage lists every tour as a card under "Tours".
  --------------------------------------------------------------- */
  var tourPageEl = document.getElementById('tourPage');
  var tourPageId = null;
  var tourMap = null, tourMapFor = null;
  var ALL_TOURS = typeof TOURS !== 'undefined' ? TOURS : [];

  // About 5 km/h, rounded to 5 minutes.
  function walkMinutes(km) { return Math.max(5, Math.round(km * 12 / 5) * 5); }

  function tourMetaText(stops) {
    var km = tourKm(stops);
    return stops.length + ' stops' + (km ? ' &middot; ' + fmtDist(km) + ' &middot; about ' + walkMinutes(km) + ' min walk' : '');
  }

  // How many of the tour's stops are already in the route.
  function tourInRoute(stops) {
    return stops.filter(function (s) { return inRoute(s.id); }).length;
  }

  function tourAddButtonHTML(tour, stops) {
    var all = tourInRoute(stops) === stops.length;
    return '<button type="button" data-tour-add="' + tour.id + '" ' + (all ? 'disabled ' : '') +
      'class="shrink-0 inline-flex items-center gap-1.5 text-[13px] font-semibold px-4 py-2.5 rounded-full border transition-colors ' +
        (all ? 'bg-verdigris text-white border-verdigris' : 'border-rule text-ink hover:border-ink') + '">' +
      (all ? 'Tour in your route <svg class="lucide lucide-check w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>'
           : '<svg class="lucide lucide-plus w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg> Add tour to my route') +
    '</button>';
  }

  function tourPageHTML(tour) {
    var stops = tourStops(tour);
    return '' +
      '<p class="eyebrow text-faint mb-2">Tour' +
        (tour.area ? ' &middot; <a href="' + areaPath(tour.area) + '" data-area="' + tour.area + '" class="hover:text-ink">' + areaTitle(tour.area) + '</a>' : '') +
      '</p>' +
      '<h1 class="font-display tracking-[-0.02em] text-[40px] sm:text-[56px] leading-none">' + tour.name + '</h1>' +
      '<p class="font-mono text-[12px] text-muted num mt-3">' + tourMetaText(stops) + '</p>' +
      '<p class="font-serif text-[18px] sm:text-[19px] leading-[1.55] mt-3 max-w-[62ch]">' + tour.intro + '</p>' +
      '<div data-tour-actions class="flex items-center gap-2 mt-4">' + tourAddButtonHTML(tour, stops) + '</div>' +
      '<div data-tour-map class="w-full h-[280px] sm:h-[380px] rounded-[18px] border border-rule mt-6 overflow-hidden"></div>' +
      '<ol class="flex flex-col gap-3 mt-6">' +
        stops.map(function (s, i) {
          // No id: the same stop's card can be elsewhere on the page.
          var card = stopHTML(s).replace(' id="stop-' + s.id + '"', '');
          return '<li class="flex items-start gap-3">' +
            '<span class="shrink-0 mt-5 flex items-center justify-center w-8 h-8 rounded-full bg-ink text-ground font-mono text-[13px] font-semibold" aria-label="Stop ' + (i + 1) + '">' + (i + 1) + '</span>' +
            '<div class="min-w-0 flex-1">' + card + '</div>' +
          '</li>';
        }).join('') +
      '</ol>';
  }

  // The tour's stops, numbered, joined in walking order. The map is kept
  // across re-renders (route changes), so an open pin popover stays open.
  function renderTourMap(tour) {
    var el = tourPageEl.querySelector('[data-tour-map]');
    if (!el || typeof L === 'undefined') { if (el) el.classList.add('hidden'); return; }
    if (tourMap && tourMapFor === tour.id) {
      el.replaceWith(tourMap.getContainer());
      tourMap.invalidateSize();
      return;
    }
    if (tourMap) { tourMap.remove(); tourMap = null; }
    var stops = tourStops(tour).filter(hasLoc);
    if (!stops.length) { el.classList.add('hidden'); return; }
    tourMap = L.map(el, { scrollWheelZoom: false });
    tourMapFor = tour.id;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'
    }).addTo(tourMap);
    var latlngs = stops.map(function (s) { return [s.lat, s.lon]; });
    L.polyline(latlngs, { color: '#171717', weight: 3, opacity: .55, dashArray: '1 8', lineCap: 'round' }).addTo(tourMap);
    stops.forEach(function (s) {
      var n = tour.stops.indexOf(s.id) + 1;
      var icon = L.divIcon({
        className: '',
        html: '<span class="flex items-center justify-center w-[24px] h-[24px] rounded-full text-white font-mono text-[11px] font-semibold" style="background:#171717;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.4)">' + n + '</span>',
        iconSize: [24, 24], iconAnchor: [12, 12]
      });
      L.marker([s.lat, s.lon], { icon: icon }).addTo(tourMap)
        .bindPopup(function () { return stopPopHTML(s); }, { closeButton: false, className: 'map-pop-wrap' });
    });
    if (latlngs.length === 1) tourMap.setView(latlngs[0], 16);
    else tourMap.fitBounds(latlngs, { padding: [28, 28] });
  }

  function renderTourPage() {
    var tour = tourById(tourPageId);
    if (!tour) return;
    var keepMap = tourMap && tourMapFor === tour.id && tourMap.getContainer();
    if (keepMap && keepMap.parentNode) keepMap.parentNode.removeChild(keepMap);
    tourPageEl.innerHTML = tourPageHTML(tour);
    renderTourMap(tour);
    setTimeout(function () { adjustCardClamps(tourPageEl); }, 0);
  }

  function applyTourPage(id) {
    leaveStopPage();
    setDiscoverMode(false);
    filters.q = '';
    filters.area = null;
    filters.cats = [];
    document.getElementById('search').value = '';
    document.documentElement.classList.remove('area-active');
    areaHeroEl.classList.add('hidden');
    areaMapEl.classList.add('hidden');
    setHomeFurnitureHidden(true);
    document.getElementById('areaChipsBottom').classList.remove('hidden');
    tourPageId = id;
    document.documentElement.classList.add('tour-page');
    tourPageEl.classList.remove('hidden');
    renderList(); // renders the tour page too (see renderList)
    document.title = tourPageTitle(tourById(id));
  }

  function leaveTourPage() {
    if (!tourPageId) return;
    tourPageId = null;
    if (tourMap) { tourMap.remove(); tourMap = null; tourMapFor = null; }
    document.documentElement.classList.remove('tour-page');
    tourPageEl.classList.add('hidden');
    tourPageEl.innerHTML = '';
    document.getElementById('areaChipsBottom').classList.add('hidden');
  }

  function jumpToTour(id) {
    if (!tourById(id)) { location.href = tourPath(id); return; }
    applyTourPage(id);
    history.pushState({ tour: id }, '', '/' + tourPath(id));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Adds every stop on the tour that isn't in the route yet, in the
  // tour's order, after whatever is already there.
  function addTourToRoute(id) {
    var tour = tourById(id);
    if (!tour) return;
    var added = 0;
    tourStops(tour).forEach(function (s) {
      if (!inRoute(s.id)) { route.push(s.id); added++; }
    });
    if (!added) return;
    seeded = false;
    if (typeof window.gtag === 'function') window.gtag('event', 'add_tour_to_route', { tour_id: id, stops_added: added });
    persist(); renderRoute(); renderList(); refreshPopToggles();
  }

  // Homepage cards: the first stop's photo, the name, distance and intro.
  function tourCardHTML(tour) {
    var stops = tourStops(tour);
    var cover = stops.filter(function (s) { return s.img; })[0];
    return '<a href="' + tourPath(tour.id) + '" data-tour-link="' + tour.id + '" class="w-[300px] sm:w-[340px] shrink-0 block bg-surface border border-rule rounded-[16px] overflow-hidden hover:border-ink transition-colors">' +
      (cover ? '<img src="' + bigImg(cover.img) + '" alt="" loading="lazy" class="w-full h-[180px] object-cover border-b border-rule">' : '') +
      '<span class="block px-5 pt-4 pb-6">' +
        '<span class="block eyebrow text-faint mb-1">Tour' + (tour.area ? ' &middot; ' + areaTitle(tour.area) : '') + '</span>' +
        '<span class="block font-display text-[28px] leading-[1.1]">' + tour.name + '</span>' +
        '<span class="block font-mono text-[11px] text-muted num mt-1">' + tourMetaText(stops) + '</span>' +
        '<span class="block font-serif text-[16px] leading-[1.5] mt-3 line-clamp-4">' + tour.intro + '</span>' +
      '</span>' +
    '</a>';
  }

  var homeToursEl = document.getElementById('homeTours');
  function renderHomeTours(show) {
    if (!homeToursEl) return;
    var on = show && ALL_TOURS.length > 0;
    homeToursEl.classList.toggle('hidden', !on);
    if (on && !homeToursEl.dataset.filled) {
      document.getElementById('homeToursList').innerHTML = ALL_TOURS.map(tourCardHTML).join('');
      homeToursEl.dataset.filled = '1';
    }
  }

  document.addEventListener('click', function (e) {
    var add = e.target.closest('[data-tour-add]');
    if (add) { addTourToRoute(add.getAttribute('data-tour-add')); return; }
    var link = e.target.closest('[data-tour-link]');
    if (link && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      jumpToTour(link.getAttribute('data-tour-link'));
    }
  });
