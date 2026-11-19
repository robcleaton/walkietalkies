  /* ---------------------------------------------------------------
     Homepage hero: three rows of tiles that drift slowly in opposite
     directions (styles.css .hero-*). Three kinds of tile:
       - word:  a block of brand colour with two lines of display type
                (or one huge word straight on the page, "bare");
       - photo: a stop's photo, full bleed, with its category and name;
       - shape: a category-coloured card with the photo cropped into a
                shape, the name underneath.
     ?hero=b and ?hero=c switch to other versions (see below and
     13c-hero-route.js).
     Stops are picked at random from those with a photo, so it's
     different on every visit. Built only once the hero is showing, so
     area and stop pages (where it's hidden) don't load its photos.
  --------------------------------------------------------------- */
  (function hero() {
    var heroEl = document.getElementById('homeHero');
    var rowsEl = document.getElementById('heroRows');
    if (!heroEl || !rowsEl) return;

    var WORDS = {
      plaques: { html:'Blue<br>plaques',  bg:'var(--plaque)',    fg:'#fff' },
      // Version C's three steps.
      find:    { html:'Find the<br>stops',   bg:'var(--marigold)', fg:'#171717' },
      route:   { html:'Build your route',    bare:true, fg:'var(--marigold)' },
      hear:    { html:'Hear the<br>stories', bg:'var(--marigold)', fg:'#171717' }
    };

    // Each row's tiles, in order: 'w:<word>', 'photo', 'tall' (portrait
    // photo), 'shape' or 'area'. Then how long one loop takes, and which way.
    var ROWS = [
      { tiles:['photo', 'shape', 'area', 'tall', 'w:plaques', 'shape', 'photo', 'area', 'shape', 'tall'], dur:95, dir:'normal' },
      { tiles:['photo', 'area', 'shape', 'tall', 'shape', 'area', 'photo', 'shape'], dur:120, dir:'reverse' },
      { tiles:['shape', 'photo', 'area', 'shape', 'tall', 'shape', 'photo', 'area', 'photo'], dur:105, dir:'normal' }
    ];

    // Version C (?hero=c): simpler, and says what the site does. One
    // step per row (find the stops, build your route, hear the stories),
    // repeated between stops' photos cropped into shapes (version A's
    // shape cards without the card or the name), all in marigold.
    var VERSION_C = /[?&]hero=c(&|$)/.test(location.search);
    if (VERSION_C) {
      heroEl.classList.add('hero--c');
      ROWS = [
        { tiles:['w:find', 'shape', 'w:find', 'shape', 'w:find', 'shape'], dur:90, dir:'normal' },
        { tiles:['shape', 'w:route', 'shape', 'w:route'], dur:120, dir:'reverse' },
        { tiles:['w:hear', 'shape', 'w:hear', 'shape', 'w:hear', 'shape'], dur:100, dir:'normal' }
      ];
    }

    // Crops for the shape tiles, as paths in a 256 × 256 box: a few of
    // the category marks' outlines, plus some plain geometric ones.
    // A scalloped circle that fills the box exactly, like the other
    // shapes, so every crop is the same size. Lobes come in multiples of
    // four, centred on the top, right, bottom and left, so those four lobe
    // tips touch the box's edges.
    function scallop(lobes) {
      var half = Math.PI / lobes;
      var k = 1.02; // arc radius, relative to half a lobe's chord
      var sag = k - Math.sqrt(k * k - 1); // how far a lobe bulges past its chord, same unit
      var R = 128 / (Math.cos(half) + (sag) * Math.sin(half));
      var r = (R * Math.sin(half) * k).toFixed(2), d = '';
      for (var i = 0; i <= lobes; i++) {
        var a = (i / lobes) * Math.PI * 2 - Math.PI / 2 - half;
        var x = (128 + R * Math.cos(a)).toFixed(2), y = (128 + R * Math.sin(a)).toFixed(2);
        d += (i ? 'A' + r + ' ' + r + ' 0 0 1 ' : 'M') + x + ' ' + y;
      }
      return d + 'Z';
    }
    var SHAPES = [
      scallop(12),
      // The "works" mark's outer outline: a four-lobed cloud.
      'M 164 0 C 188.301 0 208 19.7 208 44 C 208 45.417 207.93 46.818 207.799 48.2 C 209.182 48.07 210.583 48 212 48 C 236.301 48 256 67.7 256 92 C 256 106.883 248.609 120.037 237.3 128 C 248.609 135.963 256 149.117 256 164 C 256 188.301 236.301 208 212 208 C 210.583 208 209.182 207.93 207.799 207.799 C 207.93 209.182 208 210.583 208 212 C 208 236.301 188.301 256 164 256 C 149.117 256 135.963 248.609 128 237.3 C 120.037 248.609 106.883 256 92 256 C 67.7 256 48 236.301 48 212 C 48 210.583 48.07 209.182 48.2 207.799 C 46.804 207.932 45.402 207.999 44 208 C 19.7 208 0 188.301 0 164 C 0 149.118 7.39 135.963 18.7 128 C 7.39 120.037 0 106.882 0 92 C 0 67.7 19.7 48 44 48 C 45.417 48 46.818 48.07 48.2 48.2 C 48.07 46.818 48 45.417 48 44 C 48 19.7 67.7 0 92 0 C 106.882 0 120.037 7.39 128 18.7 C 135.963 7.39 149.118 0 164 0 Z',
      // An arch.
      'M0 128A128 128 0 0 1 256 128L256 256L0 256Z',
      // The "art" mark.
      'M 28 0 C 83.228 0 128 44.772 128 100 C 128 44.772 172.772 0 228 0 L 256 0 L 256 156 C 256 211.228 211.228 256 156 256 L 100 256 C 44.772 256 0 211.228 0 156 L 0 0 Z',
      // A circle.
      'M128 0A128 128 0 1 1 128 256A128 128 0 1 1 128 0Z',
      // The "memory" mark: stacked half-rounds.
      'M 256 0 C 256 35.346 227.346 64 192 64 C 227.346 64 256 92.654 256 128 C 256 163.346 227.346 192 192 192 C 227.346 192 256 220.654 256 256 L 0 256 C 0 220.654 28.654 192 64 192 C 28.654 192 0 163.346 0 128 C 0 92.654 28.654 64 64 64 C 28.654 64 0 35.346 0 0 Z',
      scallop(8)
    ].map(function (d) {
      var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" preserveAspectRatio="none"><path d="' + d + '"/></svg>';
      return 'url(&quot;data:image/svg+xml,' + encodeURIComponent(svg) + '&quot;)';
    });

    function shuffle(a) {
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    }

    // Wikimedia thumbnails in the data are 330px wide, soft at hero size:
    // ask for a 640px one, and fall back to the original if Commons has
    // no larger size (see the error listener below).
    function bigImg(src) { return src.replace(/\/330px-/, '/640px-'); }
    function imgHTML(s) {
      return '<img src="' + bigImg(s.img) + '" data-fallback="' + s.img + '" alt="" decoding="async" draggable="false" style="--delay:-' + (Math.random() * 12).toFixed(1) + 's">';
    }

    function wordHTML(key) {
      var w = WORDS[key];
      return '<span class="hero-tile hero-word' + (w.bare ? ' hero-word--bare' : '') + '" style="' +
        (w.bare ? '' : 'background:' + w.bg + ';') + 'color:' + w.fg + '" aria-hidden="true">' +
        (w.bare ? w.html : '<span>' + w.html + '</span>') + '</span>';
    }

    function photoHTML(s, tall) {
      var m = CATMARK[s.cat];
      return '<a class="hero-tile hero-photo' + (tall ? ' hero-photo--tall' : '') + '" href="' + stopPath(s.id) + '">' +
        imgHTML(s) +
        '<span class="hero-cap">' +
          '<span class="eyebrow eyebrow--cat" style="background:' + m.color + ';color:' + m.fg + '">' + CATS[s.cat] + '</span>' +
          '<span class="hero-name">' + s.name + '</span>' +
        '</span></a>';
    }

    var shapeIndex = 0;
    function shapeHTML(s) {
      var m = CATMARK[s.cat];
      var mask = SHAPES[shapeIndex++ % SHAPES.length];
      return '<a class="hero-tile hero-shape" href="' + stopPath(s.id) + '" style="background:' + m.color + ';color:' + m.fg + '">' +
        '<span class="hero-shape__mask" style="-webkit-mask-image:' + mask + ';mask-image:' + mask + '">' +
          imgHTML(s) +
        '</span>' +
        '<span class="hero-name">' + s.name + '</span></a>';
    }

    // Area: the area's own colour (from its chip), name in huge display
    // type on one line (the tile is as wide as the name), how many stops
    // it has, linking to its page.
    function areaHTML(area) {
      var c = AREA_COLORS[area], n = areaStopCount(area);
      return '<a class="hero-tile hero-area" href="' + areaPath(area) + '" style="background:' + c.bg + ';color:' + c.fg + '">' +
        '<span class="hero-area__top"><span class="eyebrow">Area &middot; ' + n + (n === 1 ? ' stop' : ' stops') + '</span>' +
          '<svg class="hero-area__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>' +
        '</span>' +
        '<span class="hero-area__name">' + areaTitle(area) + '</span></a>';
    }

    function build() {
      var pool = shuffle(STOPS.filter(function (s) { return s.img && CATMARK[s.cat]; }));
      var next = 0;
      function take() { return pool[next++ % pool.length]; }
      var areas = shuffle(Object.keys(AREA_COLORS).filter(function (a) { return areaStopCount(a) > 0; }));
      var nextArea = 0;

      rowsEl.innerHTML = ROWS.map(function (row) {
        var set = row.tiles.map(function (t) {
          if (t.indexOf('w:') === 0) return wordHTML(t.slice(2));
          if (t === 'shape') return shapeHTML(take());
          if (t === 'area') return areas.length ? areaHTML(areas[nextArea++ % areas.length]) : '';
          return photoHTML(take(), t === 'tall');
        }).join('');
        // The set twice, so sliding the track by half loops seamlessly;
        // the copy is inert, so keyboard and screen readers meet each
        // stop once. Each row starts at a random point in its loop.
        return '<div class="hero-row"><div class="hero-track" style="--dur:' + row.dur + 's;--dir:' + row.dir +
          ';animation-delay:-' + (Math.random() * row.dur).toFixed(1) + 's">' +
          '<div class="hero-set">' + set + '</div>' +
          '<div class="hero-set" aria-hidden="true" inert>' + set + '</div>' +
          '</div></div>';
      }).join('');
    }

    // 640px thumbnail missing: use the data's own; that missing too, let
    // the tile's colour show through.
    rowsEl.addEventListener('error', function (e) {
      var img = e.target;
      if (img.tagName !== 'IMG') return;
      var fb = img.getAttribute('data-fallback');
      if (fb && img.getAttribute('src') !== fb) img.setAttribute('src', fb);
      else img.style.visibility = 'hidden';
    }, true);

    // Pause the drift while the hero is scrolled out of view.
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        heroEl.classList.toggle('is-offscreen', !entries[0].isIntersecting);
      }).observe(heroEl);
    }

    var built = false;
    function buildIfShown() {
      if (built || heroEl.classList.contains('hidden')) return;
      built = true;
      // ?hero=b: the stop-to-stop version (13c-hero-route.js) instead.
      if (!(/[?&]hero=b(&|$)/.test(location.search) && buildRouteHero(rowsEl, imgHTML, SHAPES))) build();
    }
    buildIfShown();
    if (!built && 'MutationObserver' in window) {
      var mo = new MutationObserver(function () { buildIfShown(); if (built) mo.disconnect(); });
      mo.observe(heroEl, { attributes:true, attributeFilter:['class'] });
    }
  })();
