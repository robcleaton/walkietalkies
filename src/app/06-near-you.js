  /* ---------------------------------------------------------------
     Render: stop lists
  --------------------------------------------------------------- */
  var listEl = document.getElementById('list');
  var homeListEl = document.getElementById('homeList');
  var areaMatchesEl = document.getElementById('areaMatches');
  var resultCountEl = document.getElementById('resultCount');
  var areaRowsEl = document.getElementById('areaRows');

  /* Near you (homepage): the 10 closest mapped stops to the viewer.
     Location is only asked for when they tap Use my location — or read
     straight away if they've already allowed it on an earlier visit —
     and it never leaves the device: it's only used to sort STOPS. */
  var NEAR_COUNT = 10;
  var NEAR_FAR_KM = 3; // further than this from every stop: "you're X away"
  // Phones get a vertical list of full cards; sm and up, a carousel.
  var NEAR_CAROUSEL_MQ = window.matchMedia('(min-width: 640px)');
  var nearYouEl = document.getElementById('nearYou');
  var nearListEl = document.getElementById('nearList');
  var nearStatusEl = document.getElementById('nearYouStatus');
  var nearBtn = document.getElementById('nearYouBtn');
  var nearBtnLabel = document.getElementById('nearYouBtnLabel');
  var nearPos = null; // { lat, lon } once known
  var nearLocating = false;

  // The last position found is remembered on this device, so Near you
  // stays filled in on later visits and other pages without asking again
  // (some browsers, iOS Safari especially, forget the permission between
  // visits). It's only ever read back here.
  var NEAR_POS_KEY = 'walkietalkies:near-pos';
  function saveNearPos(pos) {
    try {
      if (pos) localStorage.setItem(NEAR_POS_KEY, JSON.stringify(pos));
      else localStorage.removeItem(NEAR_POS_KEY);
    } catch (e) { /* storage blocked */ }
  }
  // Where the area chips and the location button go. Once located (cards
  // or the phone list) they share one row above the stops, chips then
  // Refresh (when it's showing); before that the button sits under the
  // heading on its own.
  function placeNearControls(located) {
    var bar = document.getElementById('nearBar');
    var areasEl = document.getElementById('nearAreas');
    if (located) {
      bar.appendChild(areasEl);
      bar.appendChild(nearBtn);
    } else {
      nearStatusEl.parentNode.appendChild(nearBtn);
      nearListEl.parentNode.insertBefore(areasEl, nearListEl.nextSibling);
    }
    bar.classList.toggle('hidden', !located);
    areasEl.classList.toggle('mt-4', !located);
    nearBtn.classList.toggle('mt-3', !located);
  }

  // "just now", "5 min ago", "2 hours ago", "yesterday", "3 days ago"
  function timeAgo(t) {
    var min = Math.floor((Date.now() - t) / 60000);
    if (min < 1) return 'just now';
    if (min < 60) return min + ' min ago';
    var h = Math.floor(min / 60);
    if (h < 24) return h + (h === 1 ? ' hour ago' : ' hours ago');
    var d = Math.floor(h / 24);
    return d === 1 ? 'yesterday' : d + ' days ago';
  }
  var nearWherePc = null; // postcode the "Around …" line is showing, if any
  function nearWhereText() {
    return 'Around ' + nearWherePc + (nearPos && nearPos.t ? ' · located ' + timeAgo(nearPos.t) : '');
  }
  // Keep "located … ago" current while the page stays open.
  setInterval(function () {
    if (nearWherePc && nearPos && nearPos.t) nearStatusEl.textContent = nearWhereText();
  }, 60000);

  // Back to the not-located state: list gone, Use my location back.
  function forgetNearPos() {
    nearPos = null;
    nearWherePc = null;
    saveNearPos(null);
    nearListEl.classList.add('hidden');
    nearListEl.innerHTML = '';
    document.getElementById('nearAreas').classList.add('hidden');
    nearStatusEl.textContent = 'See the stops closest to where you are.';
    nearStatusEl.classList.remove('hidden');
    nearBtnLabel.textContent = 'Use my location';
    nearBtn.classList.remove('hidden');
    placeNearControls(false);
  }
  function loadNearPos() {
    try {
      var p = JSON.parse(localStorage.getItem(NEAR_POS_KEY) || 'null');
      // t: when it was found (ms); positions saved before that was kept have none.
      if (p && isFinite(p.lat) && isFinite(p.lon)) return { lat: +p.lat, lon: +p.lon, t: isFinite(p.t) ? +p.t : null };
    } catch (e) { /* storage blocked or bad JSON */ }
    return null;
  }

  function nearestStops() {
    return STOPS.filter(function (s) {
      return s.lat !== null && s.lat !== undefined && s.lon !== null && s.lon !== undefined;
    }).map(function (s) {
      return { s: s, km: haversine(nearPos, s) };
    }).sort(function (a, b) { return a.km - b.km; }).slice(0, NEAR_COUNT);
  }

  // Phones: one row of a grouped list — thumbnail, name, distance line,
  // then Listen and a round add button (the stop's number once it's in
  // the route, like the route panel's numbering).
  var nearOpen = {}; // stop id → description expanded, kept across re-renders
  var routeOpen = {}; // the same for Your route's rows (06b-row-expand.js)

  function nearRowHTML(n) {
    var s = n.s, on = inRoute(s.id), pos = route.indexOf(s.id) + 1, open = !!nearOpen[s.id];
    return '<li class="near-row px-4 py-3' + (open ? ' is-open' : '') + '">' +
      '<div class="flex items-center gap-3">' +
      stopThumbHTML(s, 'w-14 h-14', true) +
      // The name and distance open and close the short description beneath
      // (as does a tap anywhere else on the row that isn't another control).
      '<button type="button" data-near-expand="' + s.id + '" aria-expanded="' + open + '" aria-controls="near-desc-' + s.id + '" class="min-w-0 flex-1 text-left">' +
        '<h4 class="text-[15px] font-semibold leading-snug">' + s.name + '</h4>' +
        '<p class="font-mono text-[11px] text-muted num truncate mt-0.5"><span class="text-ink font-semibold">' + fmtDist(n.km) + '</span> &middot; ' + s.area + '</p>' +
      '</button>' +
      '<div class="shrink-0 flex items-center gap-2">' +
        listenButtonHTML(s) +
        '<button type="button" data-toggle="' + s.id + '" data-tooltip="' + (on ? 'Remove from route' : 'Add to route') + '" aria-label="' + (on ? 'Remove ' + plain(s.name) + ' from your route (stop ' + pos + ')' : 'Add ' + plain(s.name) + ' to your route') + '" ' +
          'class="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full border transition-colors ' +
          (on ? 'bg-verdigris border-verdigris text-white font-mono text-[12px] font-bold' : 'border-rule text-ink hover:border-ink') + '">' +
          (on ? pos : '<svg class="lucide lucide-plus w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg>') +
        '</button>' +
      '</div>' +
      '</div>' +
      // Lined up with the name (past the 56px thumbnail and its 12px gap).
      rowDescHTML('near-desc-' + s.id, open, s, 'pt-2 pl-[68px]') +
    '</li>';
  }

  function renderNearYou(isHome) {
    if (!navigator.geolocation) return; // stays hidden
    nearYouEl.classList.toggle('hidden', !isHome);
    if (!isHome || !nearPos) return;
    var near = nearestStops();
    var keep = nearListEl.scrollLeft;
    var carousel = NEAR_CAROUSEL_MQ.matches;
    nearListEl.innerHTML = carousel ? near.map(function (n) {
      // No id: the same stop can also be in the random carousel below.
      var card = stopHTML(n.s, true, fmtDist(n.km)).replace(' id="stop-' + n.s.id + '"', '');
      // Same fixed size as the homepage carousel's cards, so the
      // description clamps to the space left (adjustCardClamps below).
      return '<div class="w-[340px] h-[400px] shrink-0">' + card + '</div>';
    }).join('') :
      '<ul class="bg-surface border border-rule rounded-[16px] divide-y divide-rule overflow-hidden">' + near.map(nearRowHTML).join('') + '</ul>';
    nearListEl.classList.remove('hidden');
    nearListEl.scrollLeft = keep;
    // The line under the heading: roughly where you are and how fresh that
    // is ("Around SE10 · located 2 hours ago"), from the nearest stop's
    // postcode district, so nothing leaves the device. A long way from
    // every stop that postcode would be wrong, so phones say how far
    // instead (and the cards, sm and up, show nothing).
    var far = near.length && near[0].km > NEAR_FAR_KM;
    nearWherePc = !far && near.length ? near[0].s.pc : null;
    if (far) nearStatusEl.innerHTML = 'You’re ' + fmtDist(near[0].km) + ' from the nearest stop — here are the closest.';
    else nearStatusEl.textContent = nearWherePc ? nearWhereText() : '';
    nearStatusEl.classList.toggle('hidden', far ? carousel : !near.length);
    // Refresh: always there once located, beside the area chips.
    if (!nearLocating) nearBtnLabel.textContent = 'Refresh';
    nearBtn.classList.remove('hidden');
    renderNearAreas(near);
    placeNearControls(true);
    setTimeout(function () { adjustCardClamps(nearListEl); }, 0);
  }

  // Up to three areas the nearest stops belong to — most nearby stops first,
  // ties to whichever has the closer stop — as the same compact chips as
  // the sticky area bar (tapping one opens that area, via [data-area]).
  function renderNearAreas(near) {
    var el = document.getElementById('nearAreas');
    var tally = {};
    near.forEach(function (n, i) {
      Object.keys(AREA_COLORS).forEach(function (area) {
        if (!stopInArea(n.s, area)) return;
        if (!tally[area]) tally[area] = { area: area, count: 0, first: i };
        tally[area].count++;
      });
    });
    var top = Object.keys(tally).map(function (k) { return tally[k]; })
      .sort(function (a, b) { return b.count - a.count || a.first - b.first; }).slice(0, 3);
    el.innerHTML = '';
    top.forEach(function (t) {
      var chip = document.querySelector('#areaStickyRow .area-chip[data-area="' + t.area + '"]');
      if (chip) el.appendChild(chip.cloneNode(true));
    });
    el.classList.toggle('hidden', !el.children.length);
  }

  function locateNearYou() {
    if (!navigator.geolocation || nearLocating) return;
    nearLocating = true;
    nearBtn.disabled = true;
    nearBtnLabel.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(function (p) {
      nearLocating = false;
      nearBtn.disabled = false;
      nearBtnLabel.textContent = 'Refresh';
      nearPos = { lat: p.coords.latitude, lon: p.coords.longitude, t: Date.now() };
      saveNearPos(nearPos);
      renderNearYou(!homeListEl.classList.contains('hidden'));
    }, function (err) {
      nearLocating = false;
      nearBtn.disabled = false;
      // Still showing a remembered position: keep its list rather than
      // swapping in an error (a quiet background refresh just failed).
      if (nearPos && !(err && err.code === 1)) { nearBtnLabel.textContent = 'Refresh'; return; }
      // Location since turned off: forget the remembered position too.
      if (err && err.code === 1 && nearPos) forgetNearPos();
      nearBtnLabel.textContent = nearPos ? 'Refresh' : 'Use my location';
      nearWherePc = null;
      nearStatusEl.classList.remove('hidden');
      nearStatusEl.textContent = err && err.code === 1
        ? 'Location is turned off for this site. Allow it in your browser settings to see stops near you.'
        : 'Couldn’t find your location just now. Try again in a moment.';
    }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 });
  }

  // Your route's empty-state Use my location: close the route panel and
  // bring up Near you on the homepage (from another page, via ?near).
  function goToNearYou() {
    if (homeListEl.classList.contains('hidden')) { location.href = './?near'; return; }
    nearYouEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (!nearPos) locateNearYou();
  }
  document.addEventListener('click', function (e) {
    if (!e.target.closest('[data-near-you]')) return;
    openSheet(false);
    goToNearYou();
  });

  if (navigator.geolocation) {
    nearBtn.addEventListener('click', locateNearYou);
    var onNearLayoutChange = function () { if (nearPos) renderNearYou(!homeListEl.classList.contains('hidden')); };
    if (NEAR_CAROUSEL_MQ.addEventListener) NEAR_CAROUSEL_MQ.addEventListener('change', onNearLayoutChange);
    else NEAR_CAROUSEL_MQ.addListener(onNearLayoutChange);
    // Already allowed on an earlier visit: no prompt will show, so fill
    // the row in straight away. On a first visit (never asked, by our own
    // note or the browser's), ask straight away too; a refusal sticks in
    // the browser, so it's only ever asked unprompted once — after that
    // it's the Use my location button.
    // A remembered position fills Near you in straight away (the first
    // renderList at boot draws it); a live fix below then updates it.
    // It may be out of date; Refresh (shown once located) updates it.
    nearPos = loadNearPos();
    if (nearPos) nearBtnLabel.textContent = 'Refresh';
    var NEAR_ASKED_KEY = 'walkietalkies:location-asked';
    var askedBefore = false;
    try { askedBefore = localStorage.getItem(NEAR_ASKED_KEY) === '1'; } catch (e) { /* storage blocked */ }
    var askOnArrival = function () {
      if (askedBefore) return;
      try { localStorage.setItem(NEAR_ASKED_KEY, '1'); } catch (e) { /* storage blocked */ }
      locateNearYou();
    };
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'geolocation' }).then(function (st) {
        if (st.state === 'granted') locateNearYou();
        else if (st.state === 'prompt') askOnArrival();
        // Turned off since it was remembered: drop the stale list.
        else if (st.state === 'denied' && nearPos) forgetNearPos();
      }).catch(askOnArrival);
    } else {
      askOnArrival();
    }
  }
