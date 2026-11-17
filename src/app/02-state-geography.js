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
  function routeKm() {
    var total = 0;
    for (var i = 1; i < route.length; i++) total += haversine(byId[route[i - 1]], byId[route[i]]);
    return total;
  }
