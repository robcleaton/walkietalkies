
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
    food:     'Food & drink',
    resident: 'Notable residents',
    sport:    'Sport & leisure'
  };

  var CATMARK = {
    plaque:   { color:'var(--plaque)',    fg:'#fff',    icon:'<path d="M 128 0 C 198.692 0 256 57.308 256 128 C 256 198.692 198.692 256 128 256 C 57.308 256 0 198.692 0 128 C 0 57.308 57.308 0 128 0 Z M 128 32 C 74.98 32 32 74.98 32 128 C 32 181.019 74.98 224 128 224 C 181.019 224 224 181.019 224 128 C 224 74.98 181.019 32 128 32 Z M 128 56 C 167.765 56 200 88.236 200 128 C 200 167.765 167.765 200 128 200 C 88.236 200 56 167.765 56 128 C 56 88.236 88.236 56 128 56 Z M 128 88 C 105.909 88 88 105.909 88 128 C 88 150.091 105.909 168 128 168 C 150.091 168 168 150.091 168 128 C 168 105.909 150.091 88 128 88 Z"/>' },
    grand:    { color:'var(--marigold)',  fg:'#171717', icon:'<path d="M 152 70.059 L 201.539 20.519 L 235.48 54.461 L 185.941 104 L 256 104 L 256 152 L 185.941 152 L 235.48 201.539 L 201.539 235.48 L 152 185.941 L 152 256 L 104 256 L 104 185.941 L 54.46 235.48 L 20.52 201.539 L 70.059 152 L 0 152 L 0 104 L 70.059 104 L 20.519 54.46 L 54.461 20.52 L 104 70.059 L 104 0 L 152 0 Z"/>' },
    maritime: { color:'var(--verdigris)', fg:'#fff',    icon:'<path d="M 180 0 C 221.974 0 256 34.026 256 76 L 256 256 L 208 256 L 208 76 C 208 60.536 195.464 48 180 48 C 164.536 48 152 60.536 152 76 L 152 180 C 152 221.974 117.974 256 76 256 C 34.026 256 0 221.974 0 180 L 0 0 L 48 0 L 48 180 C 48 195.464 60.536 208 76 208 C 91.464 208 104 195.464 104 180 L 104 76 C 104 34.026 138.026 0 180 0 Z"/>' },
    works:    { color:'var(--tomato)',    fg:'#fff',    icon:'<path d="M 164 0 C 188.301 0 208 19.7 208 44 C 208 45.417 207.93 46.818 207.799 48.2 C 209.182 48.07 210.583 48 212 48 C 236.301 48 256 67.7 256 92 C 256 106.883 248.609 120.037 237.3 128 C 248.609 135.963 256 149.117 256 164 C 256 188.301 236.301 208 212 208 C 210.583 208 209.182 207.93 207.799 207.799 C 207.93 209.182 208 210.583 208 212 C 208 236.301 188.301 256 164 256 C 149.117 256 135.963 248.609 128 237.3 C 120.037 248.609 106.883 256 92 256 C 67.7 256 48 236.301 48 212 C 48 210.583 48.07 209.182 48.2 207.799 C 46.804 207.932 45.402 207.999 44 208 C 19.7 208 0 188.301 0 164 C 0 149.118 7.39 135.963 18.7 128 C 7.39 120.037 0 106.882 0 92 C 0 67.7 19.7 48 44 48 C 45.417 48 46.818 48.07 48.2 48.2 C 48.07 46.818 48 45.417 48 44 C 48 19.7 67.7 0 92 0 C 106.882 0 120.037 7.39 128 18.7 C 135.963 7.39 149.118 0 164 0 Z M 128 69.3 C 120.037 80.61 106.883 88 92 88 C 90.583 88 89.182 87.93 87.799 87.799 C 87.932 89.195 87.999 90.597 88 92 C 88 106.883 80.61 120.037 69.3 128 C 80.61 135.963 88 149.117 88 164 C 88 165.417 87.93 166.818 87.799 168.2 C 89.182 168.069 90.583 168 92 168 C 106.882 168 120.037 175.39 128 186.699 C 135.963 175.39 149.118 168 164 168 C 165.417 168 166.818 168.069 168.2 168.2 C 168.067 166.804 168 165.402 168 164 C 168 149.118 175.39 135.963 186.699 128 C 175.39 120.037 168 106.882 168 92 C 168 90.583 168.069 89.182 168.2 87.799 C 166.804 87.932 165.402 87.999 164 88 C 149.117 88 135.963 80.61 128 69.3 Z"/>' },
    culture:  { color:'var(--violet)',    fg:'#fff',    icon:'<path d="M 128 64 L 160 33 L 192.5 0 L 256 0 L 256 64 L 192 128 L 191.5 128 L 224 161 L 256 192 L 256 256 L 192 256 L 128 192 L 96 223 L 63.5 256 L 0 256 L 0 192 L 64 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 Z"/>' },
    memory:   { color:'var(--violet)',    fg:'#fff',    icon:'<path d="M 256 0 C 256 35.346 227.346 64 192 64 C 227.346 64 256 92.654 256 128 C 256 163.346 227.346 192 192 192 C 227.346 192 256 220.654 256 256 L 0 256 C 0 220.654 28.654 192 64 192 C 28.654 192 0 163.346 0 128 C 0 92.654 28.654 64 64 64 C 28.654 64 0 35.346 0 0 Z"/>' },
    green:    { color:'var(--verdigris)', fg:'#fff',    icon:'<path d="M 64 0 C 99.346 0 128 28.654 128 64 L 128 192 C 128 227.346 99.346 256 64 256 C 28.654 256 0 227.346 0 192 C 0 156.654 28.654 128 64 128 C 28.654 128 0 99.346 0 64 C 0 28.654 28.654 0 64 0 Z M 192 128 C 156.654 128 128 99.346 128 64 C 128 28.654 156.654 0 192 0 C 227.346 0 256 28.654 256 64 L 256 192 C 256 227.346 227.346 256 192 256 C 156.654 256 128 227.346 128 192 C 128 156.654 156.654 128 192 128 Z"/>' },
    pub:      { color:'var(--tomato)',    fg:'#fff',    icon:'<path d="M 192 0 C 227.346 0 256 28.654 256 64 C 256 99.346 227.346 128 192 128 C 227.346 128 256 156.654 256 192 C 256 227.346 227.346 256 192 256 C 156.654 256 128 227.346 128 192 C 128 227.346 99.346 256 64 256 C 28.654 256 0 227.346 0 192 C 0 156.654 28.654 128 64 128 C 28.654 128 0 99.346 0 64 C 0 28.654 28.654 0 64 0 C 99.346 0 128 28.654 128 64 C 128 28.654 156.654 0 192 0 Z M 64 160 C 46.327 160 32 174.327 32 192 C 32 209.673 46.327 224 64 224 C 81.673 224 96 209.673 96 192 C 96 174.327 81.673 160 64 160 Z M 192 160 C 174.327 160 160 174.327 160 192 C 160 209.673 174.327 224 192 224 C 209.673 224 224 209.673 224 192 C 224 174.327 209.673 160 192 160 Z M 64 32 C 46.327 32 32 46.327 32 64 C 32 81.673 46.327 96 64 96 C 81.673 96 96 81.673 96 64 C 96 46.327 81.673 32 64 32 Z M 192 32 C 174.327 32 160 46.327 160 64 C 160 81.673 174.327 96 192 96 C 209.673 96 224 81.673 224 64 C 224 46.327 209.673 32 192 32 Z"/>' },
    art:      { color:'var(--bubblegum)', fg:'#fff',    icon:'<path d="M 28 0 C 83.228 0 128 44.772 128 100 C 128 44.772 172.772 0 228 0 L 256 0 L 256 156 C 256 211.228 211.228 256 156 256 L 100 256 C 44.772 256 0 211.228 0 156 L 0 0 Z"/>' },
    food:     { color:'var(--brass)',     fg:'#171717', icon:'<path d="M 0 128.007 C 0.004 198.696 57.31 256 128 256 L 0 256 Z M 256 256 L 128 256 C 198.69 256 255.996 198.696 256 128.007 Z M 192 128 C 192 163.346 163.346 192 128 192 C 92.654 192 64 163.346 64 128 Z M 128 0 C 198.692 0 256 57.308 256 128 L 192 128 C 192 92.654 163.346 64 128 64 C 92.654 64 64 92.654 64 128 L 0 128 C 0 57.308 57.308 0 128 0 Z"/>' },
    resident: { color:'var(--marigold)',  fg:'#171717', icon:'<path d="M 228 0 C 172.772 0 128 44.772 128 100 L 128 0 L 0 0 L 0 28 C 0 83.228 44.772 128 100 128 L 0 128 L 0 256 L 28 256 C 83.228 256 128 211.228 128 156 L 128 256 L 256 256 L 256 228 C 256 172.772 211.228 128 156 128 L 256 128 L 256 0 Z"/>' },
    sport:    { color:'var(--verdigris)', fg:'#fff',    icon:'<path d="M 0 0 L 116 0 L 116 72 A 56 56 0 0 0 116 184 L 116 256 L 0 256 Z M 140 0 L 256 0 L 256 256 L 140 256 L 140 184 A 56 56 0 0 0 140 72 Z M 128 104 A 24 24 0 1 1 128 152 A 24 24 0 1 1 128 104 Z"/>' }
  };

  function catChip(cat) {
    var m = CATMARK[cat];
    return '<span class="inline-flex items-center gap-1.5 shrink-0 rounded-full pl-1.5 pr-3 py-1" style="background:' + m.color + ';color:' + m.fg + '">' +
      '<svg viewBox="0 0 256 256" width="14" height="14" fill="' + m.fg + '" aria-hidden="true">' + m.icon + '</svg>' +
      '<span class="eyebrow eyebrow--cat">' + CATS[cat] + '</span>' +
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

  /* Areas as route items: "area:<slug>" (e.g. area:herne-hill), shaped
     like a stop so the route list, Listen button and playbar work on them
     unchanged. No location, so they're left off the route map, distances
     and GPX like unmapped stops. Only in byId, never in STOPS, so they
     don't appear in stop lists or search. */
  function areaItemId(area) { return 'area:' + areaSlug(area); }
  if (typeof AREA_INFO !== 'undefined') {
    Object.keys(AREA_INFO).forEach(function (key) {
      var info = AREA_INFO[key];
      byId[areaItemId(key)] = {
        id: areaItemId(key), isArea: true, areaKey: key,
        name: info.name, area: info.name, pc: info.postcodes || '',
        short: AREA_DESCRIPTIONS[key] || '', text: info.overview || '',
        img: info.image || '', lat: null, lon: null
      };
    });
  }

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
