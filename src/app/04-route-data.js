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

  // GA4 custom event for a stop or area item (add_to_route, listen_start).
  // A no-op if gtag is blocked or missing.
  function trackItem(event, id, extra) {
    if (typeof window.gtag !== 'function') return;
    var s = byId[id];
    if (!s) return;
    var params = {
      item_id: id,
      item_name: decodeEntities(s.name),
      item_area: decodeEntities(s.area || ''),
      item_type: s.isArea ? 'area' : 'stop'
    };
    if (extra) Object.keys(extra).forEach(function (k) { params[k] = extra[k]; });
    try { window.gtag('event', event, params); } catch (e) { /* analytics never breaks the app */ }
  }

  function toggle(id) {
    var i = route.indexOf(id);
    if (i === -1) {
      // Stops without a location are allowed: everything that needs
      // coordinates (distances, the map, Open in Maps, GPX) skips them.
      if (!byId[id]) return;
      route.push(id);
      trackItem('add_to_route', id, { route_length: route.length });
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
