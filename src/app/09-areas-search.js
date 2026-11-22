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
    // Search results belong to the homepage URL, whichever page the
    // search was typed on.
    history.replaceState({}, '', q ? '/?q=' + encodeURIComponent(q) : '/');

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
    // Area chips and links are real links to /areas/<slug>/ (for search
    // engines and new tabs); a plain click switches page in place.
    var a = e.target.closest('[data-area]');
    if (a && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) { e.preventDefault(); jumpToArea(a.getAttribute('data-area')); return; }
    var sl = e.target.closest('[data-stop-link]');
    if (sl && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) { e.preventDefault(); jumpToStop(sl.getAttribute('data-stop-link')); return; }
    var d = e.target.closest('[data-discover]');
    if (d && !e.metaKey && !e.ctrlKey && !e.shiftKey) { e.preventDefault(); jumpToDiscover(); return; }
  });

  var AREA_COLORS = {};
  Array.prototype.forEach.call(document.querySelectorAll('.area-chip[data-area]'), function (btn) {
    var area = btn.getAttribute('data-area');
    if (AREA_COLORS[area]) return;
    // From the chip's own style attribute ("background:var(--tomato);
    // color:#fff"), not getComputedStyle: the scripts are deferred and can
    // run before styles.css defines those colour variables.
    var style = btn.getAttribute('style') || '';
    var bg = /background:\s*([^;]+)/.exec(style), fg = /(?:^|;)\s*color:\s*([^;]+)/.exec(style);
    AREA_COLORS[area] = { bg: bg ? bg[1].trim() : 'var(--surface)', fg: fg ? fg[1].trim() : 'var(--ink)' };
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

  var areaHeroEl = document.getElementById('areaHero');
  var homeIntroEl = document.getElementById('homeIntro');
  var discoverHeroEl = document.getElementById('discoverHero');

  // Plural category labels for the area cards' breakdown ("2 Blue
  // plaques"); CATS stays as-is for the singular uses everywhere else.
  var CAT_PLURALS = {
    plaque: 'Blue plaques', grand: 'Great buildings', maritime: 'River & sea',
    works: 'Industry & invention', culture: 'Museums & galleries',
    memory: 'Memorials & protest', green: 'Parks & burial grounds',
    pub: 'Historic pubs', art: 'Art & artists', food: 'Food & drink',
    resident: 'Notable residents', sport: 'Sport & leisure'
  };
  var CAT_SINGULARS = { resident: 'Notable resident' };

  // Area photos on the Discover cards are switched off for now — only 6 of
  // 30 areas have one, so most cards were showing an empty placeholder.
  // Flip back to true once AREA_INFO has more photos.
  var SHOW_AREA_CARD_PHOTOS = false;
  // Same for the photo at the top of an area page — off for now.
  var SHOW_AREA_HERO_PHOTO = false;

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
      '<span class="area-card__cats">' +
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
    leaveStopPage();
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
    document.title = q ? ('“' + q + '” — ' + SITE_NAME) : HOME_TITLE;
    // Always reset area-page state, not just when we know we're leaving
    // one — this also runs from popstate/initFromURL, where the previous
    // state (an area page) isn't tracked, so clearing unconditionally is
    // the only way to avoid the area hero leaking into a search.
    document.documentElement.classList.remove('area-active');
    areaHeroEl.classList.add('hidden');
  }

  // The area page's actions: its intro's playbar, Listen (once the manifest
  // has the clip) and Add to route. Re-rendered by renderList, so the route
  // button follows route changes.
  function renderAreaActions() {
    var el = document.getElementById('areaHeroActions');
    var s = filters.area && byId[areaItemId(filters.area)];
    if (!el) return;
    el.innerHTML = s ? playbarHTML(s, 'inline') + listenButtonHTML(s) + routeButtonHTML(s) : '';
  }

  function applyAreaFilter(area, scrollBehavior) {
    leaveStopPage();
    setDiscoverMode(false);
    filters.q = '';
    filters.area = area.toLowerCase();
    filters.cats = [];
    document.getElementById('search').value = area;
    renderChips();
    renderList();
    document.title = areaPageTitle(area);

    // Area pages share the homepage's colours; the area's own colour is
    // only used on its chips and Discover card.
    document.documentElement.classList.add('area-active');
    document.getElementById('areaHeroTitle').textContent = areaTitle(area);
    document.getElementById('areaHeroDesc').innerHTML = AREA_DESCRIPTIONS[area.toLowerCase()] || '';
    document.getElementById('areaHeroPostcodes').innerHTML = postcodeBadgesHTML(areaPostcodes(area));
    var info = (typeof AREA_INFO !== 'undefined' && AREA_INFO[area.toLowerCase()]) || null;
    var imageEl = document.getElementById('areaHeroImage');
    if (SHOW_AREA_HERO_PHOTO && info && info.image) {
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
    leaveStopPage();
    setDiscoverMode(false);
    filters.q = '';
    filters.area = null;
    filters.cats = [];
    document.getElementById('search').value = '';
    renderChips();
    renderList();
    document.title = HOME_TITLE;
    document.documentElement.classList.remove('area-active');
    areaHeroEl.classList.add('hidden');
    areaMapEl.classList.add('hidden');
    setHomeFurnitureHidden(false);
    document.getElementById('areaChipsBottom').classList.add('hidden');
  }

  // Discover: the homepage minus its furniture, with the full stop list in
  // place of the carousel — built on clearAreaFilter so every bit of
  // area/search state is reset the same way going home does.
  function applyDiscover() {
    clearAreaFilter();
    setDiscoverMode(true);
    setHomeFurnitureHidden(true);
    renderList();
    document.title = 'Discover — ' + SITE_NAME;
  }

  function jumpToDiscover() {
    applyDiscover();
    history.pushState({ view: 'discover' }, '', '/?view=discover');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function jumpToArea(area) {
    applyAreaFilter(area);
    history.pushState({ area: area }, '', '/' + areaPath(area));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function jumpToStop(id) {
    if (!byId[id]) { location.href = stopPath(id); return; }
    applyStopPage(id);
    history.pushState({ stop: id }, '', '/' + stopPath(id));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Shows whatever the current URL is: an area page (/areas/<slug>/), a
  // stop page (/stops/<id>/), a search (/?q=…), Discover (/?view=discover)
  // or the plain homepage. Used on load and on back/forward.
  function applyLocation() {
    var page = parsePagePath(location.pathname);
    var params = new URLSearchParams(location.search);
    var q = params.get('q');
    if (page.stop && byId[page.stop]) applyStopPage(page.stop);
    else if (page.area) applyAreaFilter(page.area, false);
    else if (q) applySearchState(q, true);
    else if (params.get('view') === 'discover') applyDiscover();
    else clearAreaFilter();
  }

  window.addEventListener('popstate', applyLocation);
