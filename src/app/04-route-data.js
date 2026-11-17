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
