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

    // A letter from the hand-drawn alphabet (assets/alphabet/<L>.svg) set
    // into display type: shown through a mask so it takes the tile's text
    // colour, larger than the caps it sits among (.hero-glyph in styles.css).
    // `w` is the SVG's viewBox width; they're all 511 high.
    function glyph(letter, w) {
      var url = 'url(assets/alphabet/' + letter + '.svg)';
      return '<span class="hero-glyph hero-glyph--' + letter.toLowerCase() + '" style="aspect-ratio:' + w + '/511;-webkit-mask-image:' + url + ';mask-image:' + url + '"></span>';
    }

    var WORDS = {
      // Drawn E and A, as in the intent tile below. Not read out, so no label.
      plaques: { html:'Blu' + glyph('E', 350) + '<br>pl' + glyph('A', 393) + 'ques',  bg:'var(--plaque)',    fg:'#fff' },
      // What the site is for, three short lines; read out, unlike the others.
      // The A and E are drawn letters; `label` is what screen readers get.
      intent:  { html:'W' + glyph('A', 393) + 'lk.<br>List' + glyph('E', 350) + 'n.<br>Discover.', label:'Walk. Listen. Discover.',
                 bg:'var(--marigold)', fg:'var(--ink-dark)', lines:3, read:true, sub:'Audio guides for SE London' }
    };

    // Rows marked lead open with a tile saying what the site is. One of
    // them, picked at random, starts at the beginning of its loop rather
    // than a random point, so that tile is on screen when the page loads.
    // Each row's tiles, in order: 'w:<word>', 'photo', 'tall' (portrait
    // photo), 'shape' or 'area'. Then how long one loop takes, and which way.
    var ROWS = [
      { tiles:['photo', 'shape', 'area', 'tall', 'w:plaques', 'shape', 'photo', 'area', 'shape', 'tall'], dur:95, dir:'normal' },
      { tiles:['w:intent', 'photo', 'area', 'shape', 'tall', 'shape', 'area', 'photo', 'shape'], dur:120, dir:'reverse', lead:true },
      { tiles:['shape', 'photo', 'area', 'shape', 'tall', 'shape', 'photo', 'area', 'photo'], dur:105, dir:'normal' }
    ];

    // Version C (?hero=c): says what the site is. The middle row is a
    // big static headline, "Audio guide to South East London stops";
    // above it a row of category chips (each with a stop's photo,
    // cropped to a shape) drifts past, and below it a row of area chips.
    var VERSION_C = /[?&]hero=c(&|$)/.test(location.search);
    if (VERSION_C) {
      heroEl.classList.add('hero--c');
      ROWS = [
        { tiles:['cat', 'cat', 'cat', 'cat', 'cat', 'cat', 'cat', 'cat'], dur:90, dir:'normal' },
        { headline:true },
        { tiles:['areachip', 'areachip', 'areachip', 'areachip', 'areachip', 'areachip', 'areachip', 'areachip'], dur:100, dir:'reverse' }
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
    // Each photo sits over a placeholder (the stop thumbnails' faint
    // looped "a", THUMB_PH_GLYPH in 08-route-render.js) and fades in once
    // it has loaded (.hero-ph / .is-loaded in styles.css).
    function imgHTML(s) {
      return '<span class="hero-ph" aria-hidden="true">' + THUMB_PH_GLYPH + '</span>' +
        '<img class="hero-img" src="' + bigImg(s.img) + '" data-fallback="' + s.img + '" alt="" decoding="async" draggable="false" onload="this.classList.add(\'is-loaded\')" style="--delay:-' + (Math.random() * 12).toFixed(1) + 's">';
    }

    function wordHTML(key) {
      var w = WORDS[key];
      return '<span class="hero-tile hero-word hero-word--' + key + (w.bare ? ' hero-word--bare' : '') + (w.lines === 3 ? ' hero-word--three' : '') + (w.sub ? ' hero-word--sub' : '') + '" style="' +
        (w.bare ? '' : 'background:' + w.bg + ';') + 'color:' + w.fg + '"' + (w.read ? '' : ' aria-hidden="true"') + '>' +
        (w.label ? '<span class="sr-only">' + w.label + '</span>' : '') +
        (w.bare ? w.html : '<span' + (w.label ? ' aria-hidden="true"' : '') + '>' + w.html + '</span>') +
        (w.sub ? '<span class="eyebrow hero-word__sub">' + w.sub + '</span>' : '') + '</span>';
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
        '<span class="hero-area__name">' + areaTitle(area) + '</span>' +
        '<span class="hero-area__top"><span class="eyebrow">' + areaPostcodes(area).join(', ') + ' &bull; ' + n + (n === 1 ? ' stop' : ' stops') + '</span></span></a>';
    }

    // Version C's chips, at hero size: a category (its plural name, in its colour, with a
    // photo of one of its stops cropped to a shape, linking to that stop) and an area
    // (its chip colour, linking to its page).
    function catChipHTML(cat, s) {
      var m = CATMARK[cat];
      var mask = SHAPES[shapeIndex++ % SHAPES.length]; // cropped like the shape tiles
      return '<a class="hero-tile hero-chip hero-chip--cat" href="' + stopPath(s.id) + '" title="' + s.name.replace(/"/g, '&quot;') + '" style="background:' + m.color + ';color:' + m.fg + '">' +
        '<span class="hero-chip__img" style="-webkit-mask-image:' + mask + ';mask-image:' + mask + '">' + imgHTML(s) + '</span>' + (CAT_PLURALS[cat] || CATS[cat]) + '</a>';
    }
    function areaChipHTML(area) {
      var c = AREA_COLORS[area];
      return '<a class="hero-tile hero-chip" href="' + areaPath(area) + '" style="background:' + c.bg + ';color:' + c.fg + '">' + areaTitle(area) + '</a>';
    }
    // Version C's headline row: static, centred, a play button with a
    // waveform before it. Each word its own box, so it wraps on phones.
    function headlineHTML() {
      var bars = '';
      for (var i = 0; i < 9; i++) bars += '<i style="animation-delay:-' + (i * 0.17).toFixed(2) + 's"></i>';
      function words(t) { return t.split(' ').map(function (w) { return '<span>' + w + '</span>'; }).join(' '); }
      return '<div class="hero-row hero-row--headline"><h2 class="hero-head">' +
        '<span class="hero-head__l"><span class="hero-head__play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg></span>' +
          '<span class="hero-head__wave" aria-hidden="true">' + bars + '</span>' +
          '<span class="hero-head__hl">' + words('Audio guide') + '</span> ' + words('to') + '</span>' +
        '<span class="hero-head__l">' + words('South East London stops') + '</span>' +
        '</h2></div>';
    }

    function build() {
      var pool = shuffle(STOPS.filter(function (s) { return s.img && CATMARK[s.cat]; }));
      var next = 0;
      function take() { return pool[next++ % pool.length]; }
      var areas = shuffle(Object.keys(AREA_COLORS).filter(function (a) { return areaStopCount(a) > 0; }));
      var nextArea = 0;

      var cats = shuffle(Object.keys(CATS));
      var nextCat = 0;

      // Colour spread. Coloured tiles (word, shape, area, area chip) come in
      // only seven brand colours, so pick them so that no colour appears
      // twice in a row (each row is a loop, so that holds across its join
      // too), and, among the colours a row hasn't used yet, take the one
      // least used in the hero so far, so the rows stay balanced as well.
      var used = {};
      function pickColour(rowUsed, colours) {
        var best = [], min = Infinity;
        colours.forEach(function (c) {
          if (rowUsed[c] || best.indexOf(c) !== -1) return;
          var n = used[c] || 0;
          if (n < min) { min = n; best = [c]; } else if (n === min) best.push(c);
        });
        return best.length ? best[Math.floor(Math.random() * best.length)] : null;
      }
      function note(rowUsed, c) { rowUsed[c] = true; used[c] = (used[c] || 0) + 1; }
      var catColours = Object.keys(CATMARK).map(function (k) { return CATMARK[k].color; });
      var areaColours = areas.map(function (a) { return AREA_COLORS[a].bg; });
      // Moves the first item from `start` on whose colour is `want` (or,
      // failing that, any colour the row hasn't used) to `start`, so the
      // usual take-the-next-one logic then picks it up.
      function bringForward(list, start, colourOf, want, rowUsed) {
        var fallback = -1;
        for (var i = start; i < list.length; i++) {
          var c = colourOf(list[i]);
          if (c === want) { fallback = i; break; }
          if (fallback === -1 && !rowUsed[c]) fallback = i;
        }
        if (fallback > start) { var t = list[start]; list[start] = list[fallback]; list[fallback] = t; }
      }
      function stopColour(st) { return CATMARK[st.cat].color; }
      function areaColour(a) { return AREA_COLORS[a].bg; }
      function takeShape(rowUsed) {
        bringForward(pool, next % pool.length, stopColour, pickColour(rowUsed, catColours), rowUsed);
        var st = take();
        note(rowUsed, stopColour(st));
        return st;
      }
      function takeArea(rowUsed) {
        bringForward(areas, nextArea % areas.length, areaColour, pickColour(rowUsed, areaColours), rowUsed);
        var a = areas[nextArea++ % areas.length];
        note(rowUsed, areaColour(a));
        return a;
      }

      var leads = ROWS.filter(function (r) { return r.lead; });
      var leadRow = leads[Math.floor(Math.random() * leads.length)];

      rowsEl.innerHTML = ROWS.map(function (row) {
        if (row.headline) return headlineHTML();
        // The row's word tiles have fixed colours: count those first.
        var rowUsed = {};
        row.tiles.forEach(function (t) { if (t.indexOf('w:') === 0) note(rowUsed, WORDS[t.slice(2)].bg); });
        var set = row.tiles.map(function (t) {
          if (t.indexOf('w:') === 0) return wordHTML(t.slice(2));
          if (t === 'shape') return shapeHTML(takeShape(rowUsed));
          if (t === 'area') return areas.length ? areaHTML(takeArea(rowUsed)) : '';
          if (t === 'cat') {
            // A stop from that category, not shown elsewhere in the hero.
            var cat = cats[nextCat++ % cats.length];
            for (var i = next; i < pool.length; i++) {
              if (pool[i].cat === cat) {
                var s = pool.splice(i, 1)[0];
                return catChipHTML(cat, s);
              }
            }
            return '';
          }
          if (t === 'areachip') return areas.length ? areaChipHTML(takeArea(rowUsed)) : '';
          return photoHTML(take(), t === 'tall');
        }).join('');
        // The set twice, so sliding the track by half loops seamlessly.
        // The copy is hidden from screen readers and its links are out of
        // the tab order, so keyboard and screen readers meet each stop
        // once, but it stays clickable (not inert), since half of what's
        // on screen at any moment is the copy. Each row starts at a
        // random point in its loop.
        var copy = set.replace(/<a /g, '<a tabindex="-1" ');
        return '<div class="hero-row"><div class="hero-track" style="--dur:' + row.dur + 's;--dir:' + row.dir +
          ';animation-delay:-' + (row === leadRow ? 0 : Math.random() * row.dur).toFixed(1) + 's">' +
          '<div class="hero-set">' + set + '</div>' +
          '<div class="hero-set" aria-hidden="true">' + copy + '</div>' +
          '</div></div>';
      }).join('');
    }

    // 640px thumbnail missing: use the data's own; that missing too, hide
    // it and leave the placeholder showing.
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
