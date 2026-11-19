  /* ---------------------------------------------------------------
     Shared helpers — pure data and functions with no DOM access, used by
     the app AND by scripts/build-pages.js (which loads this file, with
     data.js, areas.js and 01-stops.js, in a Node vm to build the static
     area and stop pages). Keep anything added here DOM-free.
  --------------------------------------------------------------- */
  var SITE_URL = 'https://walkietalkies.warface.co.uk';
  var SITE_NAME = 'WalkieTalkies';
  // The homepage's <title> (index.html has the same), and what the app
  // goes back to on the homepage.
  var HOME_TITLE = 'WalkieTalkies — South East London’s blue plaques, old pubs & hidden history';

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
    'gipsy hill': 'A steep, leafy stretch between Dulwich and Crystal Palace, named for the Romani camps once recorded on its common land.',
    'greenwich': 'The Old Royal Naval College, the meridian line and a tea clipper in dry dock &mdash; UNESCO’s stretch of the river.',
    'herne hill': 'Terraced Victorian streets around Brockwell Park, home to one of the oldest cycling tracks still in use anywhere in the world.',
    'honor oak': 'A hilltop park with a history of mass trespass, ringed by streets that grew up around the railway.',
    'lee': 'A quiet suburb between Lewisham and Eltham, mostly known for who used to live there rather than what still stands.',
    'lewisham': 'The borough’s own high street and transport hub, rebuilt hard after the Blitz and again more recently.',
    'new cross': 'Goldsmiths’ postcode &mdash; squat culture, music history and a fire that changed British race relations.',
    'nunhead': 'One of London’s Magnificent Seven cemeteries, wild enough in places to forget it’s inside the M25.',
    'peckham': 'A market street and a multi-storey car park turned rooftop bar &mdash; Camberwell’s louder, younger neighbour.',
    'penge': 'A fashionable Victorian suburb in the shadow of the relocated Crystal Palace, briefly notorious for two 19th-century murders.',
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

  function stopInArea(s, area) {
    if (Array.isArray(s.areas)) {
      var title = plainLower(areaTitle(area));
      for (var i = 0; i < s.areas.length; i++) { if (plainLower(s.areas[i]) === title) return true; }
      return false;
    }
    return new RegExp('\\b' + escapeRegExp(area) + '\\b').test(plainLower(s.name + ' ' + s.area));
  }
  function plainLower(str) {
    return String(str).replace(/&amp;/g, '&').replace(/&[a-z]+;/g, ' ').toLowerCase();
  }

  // Page paths (no leading slash: index.html has <base href="/">, so they
  // resolve from the site root on every page).
  function areaPath(area) { return 'areas/' + areaSlug(area) + '/'; }
  function stopPath(id) { return 'stops/' + id + '/'; }

  // Which page a URL path is: { area } for /areas/<slug>/, { stop } for
  // /stops/<id>/, or {} for anything else (the homepage and its ?q= /
  // ?view=discover states).
  function parsePagePath(pathname) {
    var m = /^\/areas\/([^\/]+)\/?$/.exec(pathname);
    if (m) return { area: areaFromSlug(decodeURIComponent(m[1])) };
    m = /^\/stops\/([^\/]+)\/?$/.exec(pathname);
    if (m) return { stop: decodeURIComponent(m[1]) };
    return {};
  }

  function areaStops(area) {
    return STOPS.filter(function (s) { return stopInArea(s, area); });
  }

  // Page titles, shared so a static page and the app agree on them.
  function areaPageTitle(area) {
    return areaTitle(area) + ': ' + areaStops(area).length + ' historic sites to walk | ' + SITE_NAME;
  }
  function stopPageTitle(s) {
    return htmlToPlain(s.name) + ', ' + htmlToPlain(s.area) + ' | ' + SITE_NAME;
  }

  // Stored text is HTML (entities, the odd <em>); this gives plain text
  // for titles, meta descriptions and structured data.
  var NAMED_ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', mdash: '—', ndash: '–',
    rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', hellip: '…', middot: '·', eacute: 'é', egrave: 'è',
    times: '×', pound: '£', deg: '°', frac12: '½', aacute: 'á', oacute: 'ó', iacute: 'í', uuml: 'ü', ouml: 'ö', auml: 'ä', ccedil: 'ç' };
  function htmlToPlain(html) {
    return String(html || '')
      .replace(/<[^>]*>/g, '')
      .replace(/&#(\d+);/g, function (_, n) { return String.fromCharCode(+n); })
      .replace(/&#x([0-9a-f]+);/gi, function (_, n) { return String.fromCharCode(parseInt(n, 16)); })
      .replace(/&([a-z0-9]+);/gi, function (m, name) { return NAMED_ENTITIES.hasOwnProperty(name) ? NAMED_ENTITIES[name] : m; })
      .replace(/\s+/g, ' ').trim();
  }
  // Plain text cut to about `max` characters at a word break, with an ellipsis.
  function clipText(text, max) {
    if (text.length <= max) return text;
    var cut = text.slice(0, max - 1);
    return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:—–-]+$/, '') + '…';
  }

  /* Geography and formatting (also used by the stop pages) */
  function haversine(a, b) {
    var R = 6371, toRad = Math.PI / 180;
    var dLat = (b.lat - a.lat) * toRad, dLon = (b.lon - a.lon) * toRad;
    var la1 = a.lat * toRad, la2 = b.lat * toRad;
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(la1) * Math.cos(la2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
  }


  // A distance as HTML: the unit gets a hairline gap from the number via
  // CSS (.dist-u in styles.css) — tighter than any space character — and
  // .dist keeps the two on one line.
  function distHTML(n, unit) {
    return '<span class="dist">' + n + '<span class="dist-u">' + unit + '</span></span>';
  }

  function fmtDist(km) {
    if (km <= 0) return distHTML(0, 'm'); // a one-stop route, or two stops on one spot
    if (km < 0.995) return distHTML(Math.max(10, Math.round(km * 1000 / 10) * 10), 'm'); // not "1000 m"
    return distHTML(km < 10 ? km.toFixed(1) : Math.round(km), 'km');
  }


  // The line under a card's title: the street address with a full postcode
  // cut to its district ("100 London Road, SE23 3PQ" → "…, SE23"), the
  // district added when the address has none, or the area when there's no
  // address at all.
  function cardAddress(s) {
    var addr = (s.addr || '').trim().replace(/\b([A-Z]{1,2}\d[A-Z\d]?) ?\d[A-Z]{2}\b/g, '$1');
    if (!addr) return s.area + ', ' + s.pc;
    return new RegExp('\\b' + s.pc + '\\b').test(addr) ? addr : addr + ', ' + s.pc;
  }


  // Every stop image is a Wikimedia Commons "/330px-Filename.ext" thumbnail
  // (see the stop-entries skill). Commons serves other widths at the same
  // path with that prefix swapped — but only its standard widths (…, 330,
  // 500, 960, 1280, 1920 …): anything else, like 1200, is refused with a
  // 400. Anything not matching the pattern is returned unchanged.
  function bigImg(url) {     // lightbox, structured data, social previews
    return url.replace(/\/330px-/, '/1280px-');
  }
  function mediumImg(url) {  // the stop page's photo
    return url.replace(/\/330px-/, '/960px-');
  }

  // The `n` mapped stops nearest to stop `s` (not counting itself), each
  // as { s, km }, nearest first.
  function nearestTo(s, n) {
    if (s.lat == null || s.lon == null) return [];
    return STOPS.filter(function (o) { return o !== s && o.lat != null && o.lon != null; })
      .map(function (o) { return { s: o, km: haversine(s, o) }; })
      .sort(function (a, b) { return a.km - b.km; })
      .slice(0, n);
  }

  /* ---------------------------------------------------------------
     Stop page — the one template for /stops/<id>/, used for the static
     page (scripts/build-pages.js, what search engines read) and by the
     app (09b-stop-page.js), each passing in its own parts:
       o.areas         the areas the stop belongs to, in display order
       o.areaChipHTML  area → its chip link
       o.actionsHTML   Listen / Add to route (app only)
       o.nearbyHTML    the nearby stops block
  --------------------------------------------------------------- */
  // A stop's Sources (data.js refs) as a list of links. Wikipedia and
  // Historic England links read as the article or list entry; anything
  // else as its site name.
  function refLabel(url) {
    var m = /^https?:\/\/([^\/?#]+)([^?#]*)/.exec(url);
    if (!m) return url;
    var host = m[1].replace(/^www\./, ''), path = m[2];
    var esc = function (t) { return t.replace(/&(?![a-z#0-9]+;)/gi, '&amp;').replace(/</g, '&lt;'); };
    var wiki = /^\/wiki\/(.+)/.exec(path);
    if (/(^|\.)wikipedia\.org$/.test(host) && wiki) {
      var title = wiki[1];
      try { title = decodeURIComponent(title); } catch (e) {}
      return 'Wikipedia: ' + esc(title.replace(/_/g, ' '));
    }
    var entry = /list-entry\/(\d+)/.exec(path);
    if (host === 'historicengland.org.uk' && entry) return 'Historic England: list entry ' + entry[1];
    return esc(host);
  }

  function refsHTML(s) {
    if (!s.refs || !s.refs.length) return '';
    return '<div class="lg:col-span-12 border-t border-rule pt-5">' +
      '<p class="eyebrow text-faint mb-3">References</p>' +
      '<ol class="text-[14px] leading-snug text-muted space-y-1.5 list-decimal pl-5">' +
        s.refs.map(function (url) {
          return '<li><a href="' + url + '" target="_blank" rel="noopener" class="underline decoration-rule underline-offset-2 hover:text-ink break-words">' + refLabel(url) + '</a></li>';
        }).join('') +
      '</ol>' +
    '</div>';
  }

  function stopPageHTML(s, o) {
    var sep = '<span aria-hidden="true">/</span>';
    var paras = String(s.text || '').split('\n\n').map(function (p) { return '<p>' + p + '</p>'; }).join('');
    var meta = (s.era ? s.era + ' &middot; ' : '') + cardAddress(s);
    var name = htmlToPlain(s.name);
    return '' +
      '<nav aria-label="Breadcrumb" class="eyebrow text-faint mb-4 flex flex-wrap items-center gap-x-2 gap-y-1">' +
        '<a href="./" class="hover:text-ink">Home</a>' +
        (o.areas[0] ? sep + '<a href="' + areaPath(o.areas[0]) + '" data-area="' + o.areas[0] + '" class="hover:text-ink">' + areaTitle(o.areas[0]) + '</a>' : '') +
        sep + '<span aria-current="page" class="text-muted">' + s.name + '</span>' +
      '</nav>' +
      // The stop itself sits in a card, like the stop cards elsewhere
      // (same surface, hairline border and corner radius as .stop).
      '<article class="bg-surface border border-rule rounded-[16px] p-5 sm:p-8 grid gap-6 lg:grid-cols-12 lg:gap-10 items-start">' +
        (s.img ?
          '<figure class="lg:col-span-5">' +
            '<button type="button" data-lightbox="' + bigImg(s.img) + '" data-lightbox-fallback="' + s.img + '" data-lightbox-alt="' + name + '" class="block w-full rounded-[12px] overflow-hidden border border-rule" aria-label="View larger image of ' + name + '">' +
              '<img src="' + mediumImg(s.img) + '" data-fallback="' + s.img + '" onerror="this.onerror=null;this.src=this.getAttribute(\'data-fallback\')" alt="' + name + '" width="1200" height="900" class="block w-full h-auto aspect-[4/3] object-cover">' +
            '</button>' +
            // The map that the app's Map button swaps in for the photo
            // (09b-stop-page.js), the same size.
            '<div data-stop-map class="hidden w-full aspect-[4/3] rounded-[12px] overflow-hidden border border-rule"></div>' +
            // Photo credit (author · licence · Commons), filled in by the app.
            '<figcaption data-photo-credit class="mt-2 text-[12px] leading-snug text-faint min-h-[1.25em]"></figcaption>' +
          '</figure>' : '') +
        '<div class="' + (s.img ? 'lg:col-span-7' : 'lg:col-span-12') + ' min-w-0">' +
          '<div class="mb-3">' + catChip(s.cat) + '</div>' +
          '<h1 class="font-display text-[34px] sm:text-[48px] leading-[1.05] tracking-[-0.01em]">' + s.name + '</h1>' +
          '<p class="font-mono text-[12px] text-muted num mt-3">' + meta + '</p>' +
          (o.actionsHTML ? '<div class="flex flex-wrap items-center gap-2 mt-5">' + o.actionsHTML + '</div>' : '') +
          '<div class="font-serif text-[18px] leading-[1.6] mt-6 max-w-[62ch] space-y-4">' + paras + '</div>' +
          (o.areas.length ?
            '<div class="mt-8">' +
              '<p class="eyebrow text-faint mb-2">Area</p>' +
              '<div class="flex flex-wrap gap-2">' + o.areas.map(o.areaChipHTML).join('') + '</div>' +
            '</div>' : '') +
        '</div>' +
        refsHTML(s) +
      '</article>' +
      (o.nearbyHTML ?
        '<section class="mt-12" aria-labelledby="nearbyTitle">' +
          '<h2 id="nearbyTitle" class="font-display text-[28px] leading-none mb-5">Nearby</h2>' +
          o.nearbyHTML +
        '</section>' : '');
  }
