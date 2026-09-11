(function () {
  'use strict';

  /* ---------------------------------------------------------------
     The gazetteer
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
    art:      'Art & artists'
  };

  var CATMARK = {
    plaque:   { color:'var(--plaque)',    fg:'#fff',    icon:'<line x1="12" y1="4" x2="12" y2="20"/><line x1="4" y1="8" x2="20" y2="16"/><line x1="20" y1="8" x2="4" y2="16"/>' },
    grand:    { color:'var(--marigold)',  fg:'#171717', icon:'<line x1="12" y1="2" x2="12" y2="7"/><line x1="12" y1="17" x2="12" y2="22"/><line x1="2" y1="12" x2="7" y2="12"/><line x1="17" y1="12" x2="22" y2="12"/><line x1="5.5" y1="5.5" x2="9" y2="9"/><line x1="15" y1="15" x2="18.5" y2="18.5"/><line x1="5.5" y1="18.5" x2="9" y2="15"/><line x1="15" y1="9" x2="18.5" y2="5.5"/>' },
    maritime: { color:'var(--verdigris)', fg:'#fff',    icon:'<path d="M3,9 Q7,6 11,9 T19,9" fill="none"/><path d="M3,15 Q7,12 11,15 T19,15" fill="none"/>' },
    works:    { color:'var(--tomato)',    fg:'#fff',    icon:'<line x1="4" y1="20" x2="12" y2="4"/><line x1="10" y1="20" x2="18" y2="4"/><line x1="16" y1="20" x2="24" y2="4"/>' },
    culture:  { color:'var(--violet)',    fg:'#fff',    icon:'<line x1="7" y1="4" x2="7" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/><line x1="17" y1="4" x2="17" y2="20"/>' },
    memory:   { color:'var(--violet)',    fg:'#fff',    icon:'<rect x="3" y="17" width="18" height="4" stroke="none"/><rect x="6" y="12" width="12" height="5" stroke="none"/><rect x="9" y="7" width="6" height="5" stroke="none"/>' },
    green:    { color:'var(--verdigris)', fg:'#fff',    icon:'<circle cx="9" cy="12" r="6" stroke="none"/><circle cx="15" cy="12" r="6" stroke="none"/>' },
    pub:      { color:'var(--tomato)',    fg:'#fff',    icon:'<rect x="3" y="7" width="18" height="4" rx="2" stroke="none"/><rect x="3" y="15" width="12" height="4" rx="2" stroke="none"/>' },
    art:      { color:'var(--bubblegum)', fg:'#fff',    icon:'<circle cx="12" cy="12" r="8" fill="none"/><circle cx="12" cy="12" r="3" stroke="none"/>' }
  };

  function catTile(cat, size) {
    var m = CATMARK[cat];
    var s = size || 18;
    return '<span class="inline-flex items-center justify-center shrink-0 rounded-[7px]" style="width:' + s + 'px;height:' + s + 'px;background:' + m.color + '">' +
      '<svg viewBox="0 0 24 24" width="' + Math.round(s * 0.68) + '" height="' + Math.round(s * 0.68) + '" fill="#171717" stroke="#171717" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + m.icon + '</svg>' +
    '</span>';
  }

  function catCard(cat, count) {
    var m = CATMARK[cat];
    return '<button class="cat-card" data-cat="' + cat + '" aria-pressed="false" style="background:' + m.color + ';color:' + m.fg + '">' +
      '<span class="cat-card__row">' +
        '<span class="cat-card__icon">' +
          '<svg viewBox="0 0 24 24" width="19" height="19" fill="#171717" stroke="#171717" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + m.icon + '</svg>' +
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

  var REQUIRED_STOP_FIELDS = ['id', 'img', 'name', 'area', 'pc', 'cat', 'year', 'era', 'lat', 'lon', 'addr', 'text', 'note'];
  STOPS.forEach(function (s) {
    REQUIRED_STOP_FIELDS.forEach(function (f) {
      if (s[f] === undefined || s[f] === null || s[f] === '') {
        console.warn('Gazetteer entry "' + (s.id || '?') + '" is missing required field "' + f + '"');
      }
    });
  });

  /* ---------------------------------------------------------------
     State
  --------------------------------------------------------------- */
  var route = [];
  var seeded = false;
  var filters = { q: '', cats: [], sort: 'district', areaRe: null };
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
  function haversine(a, b) {
    var R = 6371, toRad = Math.PI / 180;
    var dLat = (b.lat - a.lat) * toRad, dLon = (b.lon - a.lon) * toRad;
    var la1 = a.lat * toRad, la2 = b.lat * toRad;
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(la1) * Math.cos(la2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
  }

  function routeKm() {
    var total = 0;
    for (var i = 1; i < route.length; i++) total += haversine(byId[route[i - 1]], byId[route[i]]);
    return total;
  }

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  /* ---------------------------------------------------------------
     Persistence
  --------------------------------------------------------------- */
  function persist() {
    saveLocal();
    if (docRef) {
      docRef.set({ stops: route, updatedAt: new Date().toISOString() })
        .catch(function () { setSync('Saved in this browser'); });
    }
  }

  function setSync(text) { document.getElementById('syncNote').textContent = text; }

  (function connect() {
    if (!window.claude || typeof window.claude.use !== 'function') return;
    window.claude.use('db').then(function (ns) {
      if (!ns) return;
      db = ns;
      docRef = db.doc(DOC_PATH);
      setSync('Saved to this page');
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
      }, function () { setSync('Saved in this browser'); });
    }).catch(function () {});
  })();

  /* ---------------------------------------------------------------
     Route operations
  --------------------------------------------------------------- */
  function inRoute(id) { return route.indexOf(id) !== -1; }

  function toggle(id) {
    var i = route.indexOf(id);
    if (i === -1) route.push(id); else route.splice(i, 1);
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

  function clearRoute() {
    route = []; seeded = false;
    persist(); renderRoute(); renderList();
  }

  /* ---------------------------------------------------------------
     Filtering
  --------------------------------------------------------------- */
  function pcRank(pc) {
    if (pc.indexOf('SE') === 0) return parseInt(pc.slice(2), 10);
    return 1000 + pc.charCodeAt(0) + parseInt(pc.slice(2), 10);
  }

  function visible() {
    var q = filters.q.trim().toLowerCase();
    var out = STOPS.filter(function (s) {
      if (filters.cats.length && filters.cats.indexOf(s.cat) === -1) return false;
      if (!q && !filters.areaRe) return true;
      var hay = (s.name + ' ' + s.area + ' ' + s.pc + ' ' + s.addr + ' ' + s.text + ' ' + s.note + ' ' + CATS[s.cat])
        .replace(/&[a-z]+;/g, ' ').toLowerCase();
      if (filters.areaRe) return filters.areaRe.test(hay);
      return hay.indexOf(q) !== -1;
    });
    var sorters = {
      district: function (a, b) { return pcRank(a.pc) - pcRank(b.pc) || a.lon - b.lon; },
      west:     function (a, b) { return a.lon - b.lon; },
      year:     function (a, b) { return a.year - b.year; },
      az:       function (a, b) { return stripEnt(a.name).localeCompare(stripEnt(b.name)); }
    };
    return out.sort(sorters[filters.sort]);
  }

  function stripEnt(s) { return s.replace(/&[a-z]+;/g, '’'); }

  function areaPostcodes(area) {
    var re = new RegExp('\\b' + escapeRegExp(area.toLowerCase()) + '\\b');
    var seen = {};
    var pcs = [];
    STOPS.forEach(function (s) {
      if (!re.test((s.name + ' ' + s.area + ' ' + s.pc + ' ' + s.addr).toLowerCase())) return;
      if (seen[s.pc]) return;
      seen[s.pc] = true;
      pcs.push(s.pc);
    });
    return pcs.sort(function (a, b) { return pcRank(a) - pcRank(b); });
  }

  function postcodeBadgesHTML(pcs) {
    return pcs.map(function (pc) {
      return '<span class="inline-flex items-center rounded-md border border-black/10 bg-white px-2 py-0.5 text-[12px] font-mono font-semibold uppercase tracking-[0.04em] text-black/80 whitespace-nowrap">' + pc + '</span>';
    }).join('');
  }

  /* ---------------------------------------------------------------
     Render: gazetteer
  --------------------------------------------------------------- */
  var listEl = document.getElementById('list');

  function renderList() {
    var items = visible();
    document.getElementById('resultCount').textContent =
      items.length + (items.length === 1 ? ' stop' : ' stops');

    if (!items.length) {
      listEl.innerHTML =
        '<div class="bg-surface border border-rule rounded-[16px] px-5 py-12 text-center">' +
          '<p class="font-display text-[22px] mb-1">Nothing matches</p>' +
          '<p class="text-[13px] text-muted">Try a shorter search, or clear the category filters.</p>' +
        '</div>';
      return;
    }

    var html = '', lastGroup = null;
    items.forEach(function (s) {
      if (filters.sort === 'district' && s.pc !== lastGroup) {
        lastGroup = s.pc;
        html += '<div class="px-1 pt-2 flex items-baseline gap-3">' +
                  '<span class="font-mono text-[12px] font-semibold tracking-wider">' + s.pc + '</span>' +
                  '<span class="eyebrow text-faint">' + districtName(s.pc) + '</span>' +
                '</div>';
      }
      html += stopHTML(s);
    });
    listEl.innerHTML = html;
  }

  function districtName(pc) {
    var map = {
      SE1:'Bankside &amp; Elephant', SE3:'Blackheath', SE7:'Charlton', SE8:'Deptford',
      SE9:'Eltham', SE10:'Greenwich', SE14:'New Cross', SE15:'Peckham &amp; Nunhead',
      SE16:'Rotherhithe &amp; Bermondsey', SE18:'Woolwich &amp; Shooter&rsquo;s Hill',
      SE19:'Crystal Palace', SE21:'Dulwich', SE22:'East Dulwich', SE23:'Forest Hill',
      SE26:'Sydenham', DA5:'Bexley', DA6:'Bexleyheath', SE6:'Catford',
      SE12:'Lee', SE13:'Lewisham', SE5:'Camberwell', SE17:'Walworth', SE4:'Brockley', SE24:'Herne Hill'
    };
    return map[pc] || '';
  }

  function stopHTML(s) {
    var on = inRoute(s.id);
    var pos = route.indexOf(s.id) + 1;
    var catLabel = CATS[s.cat];
    var eraLead = s.era || '';
    if (eraLead === catLabel) eraLead = '';
    else if (eraLead.indexOf(catLabel + ', ') === 0) eraLead = eraLead.slice(catLabel.length + 2);
    return '' +
      '<article id="stop-' + s.id + '" class="stop px-5 py-5">' +
        '<div class="flex items-center gap-1.5 mb-2">' + catTile(s.cat, 16) + '<span class="eyebrow text-faint">' + catLabel + '</span></div>' +
        '<div class="flex items-start justify-between gap-4">' +
          '<div class="flex items-start gap-3 min-w-0">' +
            (s.img ? '<img src="' + s.img + '" alt="" loading="lazy" onerror="this.remove()" class="w-14 h-14 shrink-0 rounded-lg object-cover border border-rule">' : '') +
            '<div class="min-w-0">' +
              '<h3 class="font-display text-[23px] leading-[1.1] mb-1">' + s.name + '</h3>' +
              '<p class="font-mono text-[11px] text-muted num">' + s.area + ' &middot; ' + s.pc + '</p>' +
            '</div>' +
          '</div>' +
          '<button data-toggle="' + s.id + '" class="shrink-0 text-[12px] font-semibold px-3 py-2 rounded-full border transition-colors ' +
            (on ? 'bg-verdigris text-white border-verdigris' : 'border-rule text-ink hover:border-ink') + '">' +
            (on ? 'Stop ' + pos + ' ✓' : 'Add to route') +
          '</button>' +
        '</div>' +
        '<p class="text-[14px] leading-[1.6] text-ink mt-3 max-w-[62ch]">' +
          (eraLead ? '<span class="font-semibold">' + eraLead + '.</span> ' : '') + s.text +
        '</p>' +
        '<p class="text-[13px] leading-[1.6] text-muted mt-2.5 pl-3 border-l-2 border-brass max-w-[62ch]">' +
          '<span class="eyebrow text-brass block mb-1">Field note</span>' + s.note +
        '</p>' +
        '<p class="text-[12px] text-faint mt-3">' + s.addr + '</p>' +
      '</article>';
  }

  /* ---------------------------------------------------------------
     Render: route
  --------------------------------------------------------------- */
  var routeListEl = document.getElementById('routeList');

  /* ---------------------------------------------------------------
     Listen (proof of concept): read a stop's text aloud in the
     Your Route panel, in place of a written description, with a
     play/pause button. Uses the browser's built-in speech synthesis
     rather than a hosted audio file — no asset, no network request.
  --------------------------------------------------------------- */
  var SPEAK_ICON_PLAY = '<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
  var SPEAK_ICON_PAUSE = '<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>';
  var speakingBtn = null;
  var currentUtterance = null; // must stay referenced, or Chrome silently drops it mid-speech
  var cachedVoices = [];

  // Prefer nicer-sounding *local* voices (Apple's/Microsoft's named ones)
  // over the flattest default. Deliberately local-only: Chrome's "Google …"
  // voices are cloud-synthesised, and silently produce no audio at all if
  // that network request can't complete — worse than just using whatever
  // voice already works offline.
  var VOICE_PREFERENCE = ['Samantha', 'Daniel', 'Karen', 'Moira', 'Tessa', 'Serena', 'Ava', 'Nicky'];

  function firstMatch(list, test) {
    for (var i = 0; i < list.length; i++) { if (test(list[i])) return list[i]; }
    return null;
  }

  function refreshVoices() { cachedVoices = window.speechSynthesis.getVoices(); }

  function pickNaturalVoice() {
    var local = [];
    for (var i = 0; i < cachedVoices.length; i++) { if (cachedVoices[i].localService) local.push(cachedVoices[i]); }
    if (!local.length) return null; // nothing safe to pick — leave utter.voice unset

    var byName = null;
    for (var j = 0; j < VOICE_PREFERENCE.length && !byName; j++) {
      byName = firstMatch(local, function (v) { return v.name === VOICE_PREFERENCE[j]; });
    }
    return byName || firstMatch(local, function (v) { return /^en/i.test(v.lang); }) || local[0];
  }

  function speakableText(s) {
    return (s.name + '. ' + s.text + ' ' + s.note)
      .replace(/&rsquo;/g, '’').replace(/&lsquo;/g, '‘')
      .replace(/&rdquo;/g, '”').replace(/&ldquo;/g, '“')
      .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–')
      .replace(/&amp;/g, '&')
      .replace(/&[a-z#0-9]+;/gi, '');
  }

  function setListenBtnState(btn, playing) {
    btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
    btn.querySelector('.listen-btn__icon').innerHTML = playing ? SPEAK_ICON_PAUSE : SPEAK_ICON_PLAY;
    btn.querySelector('.listen-btn__label').textContent = playing ? 'Pause' : 'Listen';
  }

  if (window.speechSynthesis) {
    refreshVoices();
    window.speechSynthesis.onvoiceschanged = refreshVoices;

    routeListEl.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-speak]');
      if (!btn) return;
      var s = byId[btn.getAttribute('data-speak')];
      var synth = window.speechSynthesis;

      if (speakingBtn === btn && synth.speaking && !synth.paused) {
        synth.pause();
        setListenBtnState(btn, false);
        return;
      }
      if (speakingBtn === btn && synth.paused) {
        synth.resume();
        setListenBtnState(btn, true);
        return;
      }
      if (synth.speaking || synth.pending) synth.cancel();
      if (speakingBtn) setListenBtnState(speakingBtn, false);

      var utter = new SpeechSynthesisUtterance(speakableText(s));
      var voice = pickNaturalVoice();
      if (voice) utter.voice = voice;
      utter.rate = 0.95;
      utter.pitch = 1;
      utter.onend = utter.onerror = function () {
        setListenBtnState(btn, false);
        if (speakingBtn === btn) { speakingBtn = null; currentUtterance = null; }
      };
      speakingBtn = btn;
      currentUtterance = utter; // keep a strong reference — see note above
      setListenBtnState(btn, true);
      // Call speak() synchronously, in the same tick as the click: Safari
      // silently refuses it once it's no longer inside the user gesture.
      synth.speak(utter);
    });
  }

  function renderRoute() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    speakingBtn = null;
    currentUtterance = null;
    var n = route.length;
    var km = routeKm();
    var mins = Math.round((km / 4.8) * 60);

    document.getElementById('routeMeta').textContent =
      n === 0 ? 'No stops yet' : n + (n === 1 ? ' stop' : ' stops');
    document.getElementById('routeDist').textContent = km.toFixed(1) + ' km';
    document.getElementById('routeTime').textContent = n < 2 ? '—' : (mins >= 60 ? Math.floor(mins / 60) + 'h ' + pad(mins % 60) : mins + ' min');
    document.getElementById('barLabel').textContent =
      n === 0 ? 'Empty — add a stop' : n + (n === 1 ? ' stop' : ' stops') + ' · ' + km.toFixed(1) + ' km';

    var maps = document.getElementById('mapsLink');
    if (n === 0) {
      maps.setAttribute('aria-disabled', 'true');
      maps.classList.add('opacity-40', 'pointer-events-none');
      maps.href = '#';
    } else {
      maps.removeAttribute('aria-disabled');
      maps.classList.remove('opacity-40', 'pointer-events-none');
      maps.href = 'https://www.google.com/maps/dir/' +
        route.slice(0, 10).map(function (id) { return byId[id].lat + ',' + byId[id].lon; }).join('/') + '/data=!4m2!4m1!3e2';
    }

    if (n === 0) {
      routeListEl.innerHTML =
        '<div class="px-5 py-10 text-center">' +
          '<p class="font-display text-[21px] leading-tight mb-1.5">An empty morning</p>' +
          '<p class="text-[13px] leading-relaxed text-muted max-w-[30ch] mx-auto">Add stops from the gazetteer. They stack in the order you add them, and you can shuffle them after.</p>' +
        '</div>';
      return;
    }

    var html = '';
    if (seeded) {
      html += '<p class="px-5 pt-4 pb-1 text-[12px] leading-relaxed text-brass">' +
              'Starter route: a Greenwich morning, riverside first, uphill last. Clear it and build your own.</p>';
    }
    route.forEach(function (id, i) {
      var s = byId[id];
      var leg = i > 0 ? haversine(byId[route[i - 1]], s) : 0;
      html += '' +
        (i > 0 ? '<p class="pl-[52px] pr-5 py-1 font-mono text-[11px] text-faint num">&darr; ' + leg.toFixed(2) + ' km</p>' : '') +
        '<div class="flex gap-3 px-5 py-2.5 ' + (i > 0 ? '' : 'pt-4') + '">' +
          '<span class="shrink-0 w-6 h-6 mt-0.5 rounded-full bg-verdigris text-white font-mono num text-[11px] font-semibold grid place-items-center">' + (i + 1) + '</span>' +
          (s.img ? '<img src="' + s.img + '" alt="" loading="lazy" onerror="this.remove()" class="w-10 h-10 shrink-0 rounded-lg object-cover border border-rule">' : '') +
          '<div class="min-w-0 flex-1">' +
            '<p class="text-[14px] font-semibold leading-tight">' + s.name + '</p>' +
            '<p class="font-mono text-[11px] text-faint mt-0.5">' + s.pc + ' &middot; ' + s.area + '</p>' +
            (s.id === 'horniman' && window.speechSynthesis ?
              '<button data-speak="' + id + '" aria-pressed="false" class="listen-btn mt-1.5 inline-flex items-center gap-1.5 text-[11px] font-semibold text-verdigris border border-verdigris/40 rounded-full pl-1.5 pr-2.5 py-1 hover:bg-verdigris/10 transition-colors" aria-label="Listen to a description of ' + plain(s.name) + '">' +
                '<span class="listen-btn__icon inline-flex items-center justify-center w-4 h-4">' + SPEAK_ICON_PLAY + '</span>' +
                '<span class="listen-btn__label">Listen</span>' +
              '</button>'
            : '') +
          '</div>' +
          '<div class="shrink-0 flex items-start gap-1">' +
            '<button data-move="' + id + '" data-dir="-1" class="w-6 h-6 rounded border border-rule text-muted hover:text-ink hover:border-ink inline-flex items-center justify-center disabled:opacity-25" ' + (i === 0 ? 'disabled' : '') + ' aria-label="Move ' + plain(s.name) + ' earlier">' +
              '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6L12 2L16 6" /><path d="M12 2V22" /></svg>' +
            '</button>' +
            '<button data-move="' + id + '" data-dir="1" class="w-6 h-6 rounded border border-rule text-muted hover:text-ink hover:border-ink inline-flex items-center justify-center disabled:opacity-25" ' + (i === route.length - 1 ? 'disabled' : '') + ' aria-label="Move ' + plain(s.name) + ' later">' +
              '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 18L12 22L16 18" /><path d="M12 2V22" /></svg>' +
            '</button>' +
            '<button data-toggle="' + id + '" class="w-6 h-6 rounded border border-rule text-muted hover:text-ink hover:border-ink inline-flex items-center justify-center" aria-label="Remove ' + plain(s.name) + ' from route">' +
              '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>' +
            '</button>' +
          '</div>' +
        '</div>';
    });
    routeListEl.innerHTML = html;
  }

  function plain(s) { return s.replace(/&[a-z]+;/g, ''); }

  /* ---------------------------------------------------------------
     Chips, events
  --------------------------------------------------------------- */
  function stopsInAreaScope() {
    if (!filters.areaRe) return STOPS;
    return STOPS.filter(function (s) {
      var hay = (s.name + ' ' + s.area + ' ' + s.pc + ' ' + s.addr + ' ' + s.text + ' ' + s.note + ' ' + CATS[s.cat])
        .replace(/&[a-z]+;/g, ' ').toLowerCase();
      return filters.areaRe.test(hay);
    });
  }

  function renderChips() {
    var wrap = document.getElementById('chips');
    var scopeStops = stopsInAreaScope();
    var html = '';
    Object.keys(CATS).forEach(function (key) {
      var n = scopeStops.filter(function (s) { return s.cat === key; }).length;
      if (n === 0) return;
      html += catCard(key, n);
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
    filters.q = e.target.value; filters.areaRe = null; renderList();
    if (new URLSearchParams(location.search).has('area')) {
      var url = new URL(location.href);
      url.searchParams.delete('area');
      history.replaceState({}, '', url);
      document.title = 'WalkieTalkies';
      document.documentElement.style.removeProperty('--area-bg');
      document.documentElement.style.removeProperty('--area-ink');
      areaHeroEl.classList.add('hidden');
      homeIntroEl.classList.remove('hidden');
      Array.prototype.forEach.call(document.querySelectorAll('.area-chip--on-match'), function (chip) {
        chip.classList.remove('area-chip--on-match');
      });
      filters.cats = [];
      renderChips();
    }
  });

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-toggle]');
    if (t) { toggle(t.getAttribute('data-toggle')); return; }
    var m = e.target.closest('[data-move]');
    if (m) { move(m.getAttribute('data-move'), parseInt(m.getAttribute('data-dir'), 10)); return; }
    var a = e.target.closest('[data-area]');
    if (a) { jumpToArea(a.getAttribute('data-area')); return; }
  });

  function escapeRegExp(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  var AREA_DESCRIPTIONS = {
    'bankside': 'The stretch of Thames path between Southwark Cathedral and the old power station, still trading on eight centuries of theatres, taverns and reformers.',
    'bermondsey': 'Warehouses and wharves turned over from the spice docks to design studios, with the river never far from view.',
    'bexley': 'Where the suburbs give way to the Cray valley, a Tudor manor house included.',
    'bexleyheath': 'A Victorian railway suburb that grew up around the Arts and Crafts movement’s founding project, the Red House.',
    'blackheath': 'An open heath with a history of gathering crowds for rebellion and plague burials, and fireworks these days.',
    'brockley': 'Terraced Victorian streets around a cemetery that quietly holds more history than its size suggests.',
    'camberwell': 'Art-school grit meets Georgian squares, a few minutes from Peckham and a world from the postcard version of London.',
    'catford': 'Best known for a fibreglass cat the size of a bus, perched over a 1970s shopping centre.',
    'charlton': 'A riverside village swallowed by the docks, still centred on one of London’s oldest Jacobean houses.',
    'crystal palace': 'Named for a glass palace that burned down in 1936, leaving concrete dinosaurs and a view across half the city.',
    'deptford': 'Henry VIII’s royal dockyard, now flea markets and studios built into the same old wharves.',
    'dulwich': 'A private estate that kept its village feel and its picture gallery &mdash; Britain’s oldest public one &mdash; running since 1817.',
    'east dulwich': 'Dulwich’s less formal neighbour, all Victorian terraces and a high street that never settled on one identity.',
    'elephant': 'A roundabout that gave its name to a whole quarter, rebuilt more times than almost anywhere else in London.',
    'eltham': 'A medieval royal palace and an Art Deco mansion sit streets apart, both stranger than the suburb around them.',
    'forest hill': 'Steep streets above the Honor Oak ridge, anchored by a museum built on the tea trade and its odd collections.',
    'greenwich': 'The Old Royal Naval College, the meridian line and a tea clipper in dry dock &mdash; UNESCO’s stretch of the river.',
    'honor oak': 'A hilltop park with a history of mass trespass, ringed by streets that grew up around the railway.',
    'lee': 'A quiet suburb between Lewisham and Eltham, mostly known for who used to live there rather than what still stands.',
    'lewisham': 'The borough’s own high street and transport hub, rebuilt hard after the Blitz and again more recently.',
    'new cross': 'Goldsmiths’ postcode &mdash; squat culture, music history and a fire that changed British race relations.',
    'nunhead': 'One of London’s Magnificent Seven cemeteries, wild enough in places to forget it’s inside the M25.',
    'peckham': 'A market street and a multi-storey car park turned rooftop bar &mdash; Camberwell’s louder, younger neighbour.',
    'rotherhithe': 'Where Brunel dug the first tunnel under a navigable river, and the Mayflower is said to have set sail.',
    'sydenham': 'The hill above Crystal Palace Park, still trading on the shadow of the palace that once stood there.',
    'walworth': 'Dense Victorian streets off the Old Kent Road &mdash; working-class London the guidebooks tend to skip.',
    'woolwich': 'The Royal Arsenal turned riverside flats, with a free ferry that’s been crossing the Thames since 1889.'
  };
  var AREA_TITLES = { elephant: 'Elephant & Castle' };
  var AREA_SLUGS = { elephant: 'elephant-and-castle' };
  var AREA_SLUGS_REVERSE = {};
  Object.keys(AREA_SLUGS).forEach(function (k) { AREA_SLUGS_REVERSE[AREA_SLUGS[k]] = k; });

  function areaSlug(area) {
    var key = area.toLowerCase().trim();
    return AREA_SLUGS[key] || key.replace(/\s+/g, '-');
  }
  function areaFromSlug(slug) {
    var key = slug.toLowerCase().trim();
    return AREA_SLUGS_REVERSE[key] || key.replace(/-+/g, ' ');
  }
  function areaTitle(area) {
    var key = area.toLowerCase().trim();
    if (AREA_TITLES[key]) return AREA_TITLES[key];
    return area.replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  }

  var AREA_COLORS = {};
  Array.prototype.forEach.call(document.querySelectorAll('.area-chip[data-area]'), function (btn) {
    var area = btn.getAttribute('data-area');
    if (AREA_COLORS[area]) return;
    var cs = getComputedStyle(btn);
    AREA_COLORS[area] = { bg: cs.backgroundColor, fg: cs.color };
  });

  function parseRGB(str) {
    var m = /rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/.exec(str || '');
    return m ? [+m[1], +m[2], +m[3]] : null;
  }
  function colorsAreClose(a, b) {
    var ca = parseRGB(a), cb = parseRGB(b);
    if (!ca || !cb) return a === b;
    var dr = ca[0] - cb[0], dg = ca[1] - cb[1], db = ca[2] - cb[2];
    return Math.sqrt(dr * dr + dg * dg + db * db) <= 70;
  }

  var areaHeroEl = document.getElementById('areaHero');
  var homeIntroEl = document.getElementById('homeIntro');

  function applyAreaFilter(area, scrollBehavior) {
    filters.q = '';
    filters.areaRe = new RegExp('\\b' + escapeRegExp(area.toLowerCase()) + '\\b');
    filters.cats = [];
    document.getElementById('search').value = area;
    renderChips();
    renderList();
    document.title = areaTitle(area) + ' — WalkieTalkies';

    var c = AREA_COLORS[area.toLowerCase()];
    if (c) {
      document.documentElement.style.setProperty('--area-bg', c.bg);
      document.documentElement.style.setProperty('--area-ink', c.fg);
    }
    Array.prototype.forEach.call(document.querySelectorAll('.area-chip[data-area]'), function (chip) {
      var key = chip.getAttribute('data-area');
      var matches = !!(c && AREA_COLORS[key] && colorsAreClose(AREA_COLORS[key].bg, c.bg));
      chip.classList.toggle('area-chip--on-match', matches);
    });
    document.getElementById('areaHeroTitle').textContent = areaTitle(area);
    document.getElementById('areaHeroDesc').innerHTML = AREA_DESCRIPTIONS[area.toLowerCase()] || '';
    document.getElementById('areaHeroPostcodes').innerHTML = postcodeBadgesHTML(areaPostcodes(area));
    areaHeroEl.classList.remove('hidden');
    homeIntroEl.classList.add('hidden');

    if (scrollBehavior) {
      document.getElementById('list').scrollIntoView({ behavior: scrollBehavior, block: 'start' });
    }
  }

  function clearAreaFilter() {
    filters.q = '';
    filters.areaRe = null;
    filters.cats = [];
    document.getElementById('search').value = '';
    renderChips();
    renderList();
    document.title = 'WalkieTalkies';
    document.documentElement.style.removeProperty('--area-bg');
    document.documentElement.style.removeProperty('--area-ink');
    areaHeroEl.classList.add('hidden');
    homeIntroEl.classList.remove('hidden');
    Array.prototype.forEach.call(document.querySelectorAll('.area-chip--on-match'), function (chip) {
      chip.classList.remove('area-chip--on-match');
    });
  }

  function jumpToArea(area) {
    applyAreaFilter(area);
    var url = new URL(location.href);
    url.searchParams.set('area', areaSlug(area));
    history.pushState({ area: area }, '', url);
  }

  window.addEventListener('popstate', function () {
    var slug = new URLSearchParams(location.search).get('area');
    if (slug) applyAreaFilter(areaFromSlug(slug), false);
    else clearAreaFilter();
  });

  document.getElementById('clearBtn').addEventListener('click', clearRoute);

  // Bottom sheet
  var root = document.documentElement;
  function openSheet(v) { root.classList.toggle('route-open', v); document.getElementById('scrim').hidden = !v; }
  document.getElementById('routeBar').addEventListener('click', function () { openSheet(true); });
  document.getElementById('sheetClose').addEventListener('click', function () { openSheet(false); });
  document.getElementById('scrim').addEventListener('click', function () { openSheet(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') openSheet(false); });

  // Search — collapses to an icon button on small screens, expanding
  // into the input on tap and collapsing back once it's empty and blurred
  (function () {
    var toggleBtn = document.getElementById('searchToggle');
    var toggleIcon = document.getElementById('searchToggleIcon');
    var label = document.getElementById('searchLabel');
    var input = document.getElementById('search');
    var logoLink = document.getElementById('logoLink');
    var logoText = document.getElementById('logoText');
    var mobile = window.matchMedia('(max-width: 639px)');
    var isOpen = false;

    // Same button throughout: a magnifier before the (collapsed) input,
    // which becomes a close icon sitting right after it once open — the
    // input's own flex-1 growth is what pushes it there, not positioning.
    var ICON_SEARCH = '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>';
    var ICON_CLOSE = '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>';

    function setOpen(open) {
      isOpen = open;
      label.classList.toggle('hidden', !open);
      label.classList.toggle('flex', open);
      toggleIcon.innerHTML = open ? ICON_CLOSE : ICON_SEARCH;
      toggleBtn.setAttribute('aria-label', open ? 'Close search' : 'Search');
      toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      // Make room for a full-width bar on small screens: drop the
      // wordmark and the logo's reserved width, keep the square icon.
      logoText.classList.toggle('hidden', open && mobile.matches);
      logoLink.style.minWidth = open && mobile.matches ? '0' : '';
      if (open) input.focus();
    }

    toggleBtn.addEventListener('click', function () {
      if (isOpen && input.value) {
        input.value = '';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
      setOpen(!isOpen);
    });
    input.addEventListener('blur', function () {
      if (mobile.matches && !input.value) setOpen(false);
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') input.blur();
    });
    mobile.addEventListener('change', function (e) { if (!e.matches) setOpen(false); });
  })();

  // Theme — black by default; the toggle switches to light and back
  document.getElementById('themeToggle').addEventListener('click', function () {
    if (root.getAttribute('data-theme') === 'light') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', 'light');
    }
  });

  // Keep the sticky route panel clear of the fixed header's actual height
  (function trackHeaderHeight() {
    var headerEl = document.querySelector('header');
    if (!headerEl) return;
    var raf = null;
    function measure() {
      raf = null;
      root.style.setProperty('--header-h', headerEl.offsetHeight + 'px');
    }
    function schedule() {
      if (raf) return;
      raf = requestAnimationFrame(measure);
    }
    schedule();
    window.addEventListener('resize', schedule);
    if (window.ResizeObserver) new ResizeObserver(schedule).observe(headerEl);
  })();

  // GPX export, when the viewer can save files
  if (window.claude && typeof window.claude.use === 'function') {
    window.claude.use('downloads').then(function (dl) {
      if (!dl) return;
      var btn = document.getElementById('gpxBtn');
      btn.classList.remove('hidden');
      btn.addEventListener('click', function () {
        if (!route.length) return;
        var gpx = '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<gpx version="1.1" creator="WalkieTalkies" xmlns="http://www.topografix.com/GPX/1/1">\n' +
          '  <metadata><name>WalkieTalkies</name></metadata>\n' +
          route.map(function (id, i) {
            var s = byId[id];
            return '  <wpt lat="' + s.lat + '" lon="' + s.lon + '">\n' +
                   '    <name>' + (i + 1) + '. ' + esc(plain(s.name)) + '</name>\n' +
                   '    <desc>' + esc(plain(s.area) + ', ' + s.pc) + '</desc>\n' +
                   '  </wpt>\n';
          }).join('') +
          '  <rte><name>WalkieTalkies</name>\n' +
          route.map(function (id) {
            var s = byId[id];
            return '    <rtept lat="' + s.lat + '" lon="' + s.lon + '"><name>' + esc(plain(s.name)) + '</name></rtept>\n';
          }).join('') +
          '  </rte>\n</gpx>\n';
        btn.textContent = 'Saving…';
        dl.save({ filename: 'walkietalkies-route.gpx', data: gpx })
          .then(function () { btn.textContent = 'Saved'; })
          .catch(function (err) { btn.textContent = (err && err.code === 'declined') ? 'Save as GPX' : 'Save unavailable'; })
          .then(function () { setTimeout(function () { btn.textContent = 'Save as GPX'; }, 2200); });
      });
    }).catch(function () {});
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ---------------------------------------------------------------
     Boot
  --------------------------------------------------------------- */
  renderList();
  renderRoute();

  (function initFromURL() {
    var slug = new URLSearchParams(location.search).get('area');
    if (slug) applyAreaFilter(areaFromSlug(slug), 'auto');
  })();
})();
