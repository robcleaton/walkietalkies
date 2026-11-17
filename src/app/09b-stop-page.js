  /* ---------------------------------------------------------------
     Stop page — /stops/<id>/: one stop in full (photo and credit, full
     description, Listen and Add to route, the areas it's part of, and
     the stops nearest to it). Its static version is built by
     scripts/build-pages.js from the same template (stopPageHTML in
     00-shared.js); the app re-renders it here with the live parts.
  --------------------------------------------------------------- */
  var stopPageEl = document.getElementById('stopPage');
  var stopPageId = null; // the stop being shown, or null when not on a stop page

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

  function renderStopPage() {
    var s = byId[stopPageId];
    if (!s) return;
    var keep = stopPageEl.querySelector('[data-nearby-row]');
    var keepScroll = keep ? keep.scrollLeft : 0;
    var near = nearestTo(s, 8);
    stopPageEl.innerHTML = stopPageHTML(s, {
      areas: stopPageAreas(s),
      areaChipHTML: areaLinkChipHTML,
      actionsHTML: listenButtonHTML(s) + routeButtonHTML(s),
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
    stopPageId = id;
    document.documentElement.classList.add('stop-page');
    stopPageEl.classList.remove('hidden');
    renderList(); // renders the stop page too (see renderList)
    document.title = stopPageTitle(byId[id]);
  }

  function leaveStopPage() {
    if (!stopPageId) return;
    stopPageId = null;
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
