  // Keep the sticky route panel clear of the fixed header's actual height
  (function trackHeaderHeight() {
    var headerEl = document.querySelector('header');
    if (!headerEl) return;
    var raf = null;
    var routeBtn = document.getElementById('routeHeaderBtn');
    function measure() {
      raf = null;
      root.style.setProperty('--header-h', headerEl.offsetHeight + 'px');
      // The desktop route dropdown hangs just under its header button
      // (styles.css). The header is fixed, so this doesn't change on scroll.
      if (routeBtn && routeBtn.offsetParent) {
        var r = routeBtn.getBoundingClientRect();
        root.style.setProperty('--route-btn-bottom', r.bottom + 'px');
        root.style.setProperty('--route-btn-right', (document.documentElement.clientWidth - r.right) + 'px');
      }
    }
    function schedule() {
      if (raf) return;
      raf = requestAnimationFrame(measure);
    }
    schedule();
    window.addEventListener('resize', schedule);
    if (window.ResizeObserver) new ResizeObserver(schedule).observe(headerEl);
  })();

  // Populate a row (the sticky nav, the bottom-of-area-page row) by cloning the
  // real (non-marquee-duplicate) #areaChips buttons, so the area/colour list
  // stays defined in a single place.
  function buildAreaRow(rowId, compact) {
    var row = document.getElementById(rowId);
    if (!row) return;
    var seen = {};
    Array.prototype.forEach.call(document.querySelectorAll('#areaChips .area-row:not(.area-row-dup) .area-chip[data-area]'), function (btn) {
      var area = btn.getAttribute('data-area');
      if (seen[area]) return;
      seen[area] = true;
      var clone = btn.cloneNode(true);
      if (compact) clone.classList.add('area-chip--compact');
      row.appendChild(clone);
    });
  }
  buildAreaRow('areaStickyRow', true);

  // The area pages' chips at the bottom: a copy of the homepage's own rows,
  // so phones get the same drifting, swipeable marquee rows and wider
  // screens the same single wrapped block (styles.css .area-rows).
  (function () {
    var src = document.querySelector('#areaChips .area-rows');
    var row = document.getElementById('areaChipsBottomRow');
    if (!src || !row) return;
    var copy = src.cloneNode(true);
    // The marquee's duplicate rows are only there for the loop.
    Array.prototype.forEach.call(copy.querySelectorAll('.area-row-dup .area-chip'), function (b) { b.tabIndex = -1; });
    row.appendChild(copy);
  })();

  /* Area-chip rows on phones: swipeable strips that drift on their own.
     The CSS marquee (transform on .area-row-track) can't be swiped, so on
     small screens each .area-row-wrap scrolls instead and a frame loop
     nudges its scrollLeft. Each track holds its chips twice, so wrapping
     the position by half the track keeps the loop seamless whichever way
     it's swiped. Touching, swiping or wheel-scrolling a row pauses its
     drift; it picks up again two seconds after the last interaction.
     Covers the homepage rows and their copy at the bottom of area pages. */
  (function areaChipMarquee() {
    var mq = window.matchMedia('(max-width: 639px)');
    var still = window.matchMedia('(prefers-reduced-motion: reduce)');
    var DURATION = 55; // seconds per loop, as the CSS marquee
    var rows = [], raf = null, last = 0;

    function setup() {
      rows = Array.prototype.map.call(document.querySelectorAll('.area-row-wrap'), function (wrap) {
        var track = wrap.querySelector('.area-row-track');
        if (!track) return null;
        var row = { wrap: wrap, track: track, dir: track.classList.contains('marquee-right') ? -1 : 1, pos: 0, pausedUntil: 0 };
        if (!wrap._marqueeBound) {
          wrap._marqueeBound = true;
          var hold = function () { row.pausedUntil = Infinity; };
          var release = function () { row.pausedUntil = performance.now() + 2000; };
          wrap.addEventListener('pointerdown', hold, { passive: true });
          wrap.addEventListener('touchstart', hold, { passive: true });
          wrap.addEventListener('pointerup', release, { passive: true });
          wrap.addEventListener('pointercancel', release, { passive: true });
          wrap.addEventListener('touchend', release, { passive: true });
          wrap.addEventListener('wheel', release, { passive: true });
          wrap.addEventListener('scroll', function () {
            // Our own nudges land within a pixel of pos; anything else is
            // the viewer moving it: follow, and keep it inside the loop.
            if (Math.abs(wrap.scrollLeft - row.pos) < 2) return;
            if (row.pausedUntil !== Infinity) release();
            row.pos = wrap.scrollLeft;
            wrapPos(row);
          }, { passive: true });
        }
        return row;
      }).filter(Boolean);
      rows.forEach(function (r) {
        // Rightward rows start half-way so they have room to run backwards.
        r.pos = r.dir < 0 ? r.track.scrollWidth / 2 : 0;
        r.wrap.scrollLeft = r.pos;
      });
    }

    function wrapPos(r) {
      var half = r.track.scrollWidth / 2;
      if (!half) return;
      var p = r.pos;
      if (p >= half) p -= half;
      else if (p <= 0) p += half;
      if (p !== r.pos) { r.pos = p; r.wrap.scrollLeft = p; }
    }

    function tick(now) {
      var dt = last ? Math.min(0.1, (now - last) / 1000) : 0;
      last = now;
      if (!still.matches) {
        rows.forEach(function (r) {
          if (now < r.pausedUntil || !r.wrap.offsetParent) return;
          r.pos += r.dir * (r.track.scrollWidth / 2) / DURATION * dt;
          r.wrap.scrollLeft = r.pos;
          wrapPos(r);
        });
      }
      raf = requestAnimationFrame(tick);
    }

    function apply() {
      document.documentElement.classList.toggle('js-marquee', mq.matches);
      if (mq.matches) {
        setup();
        if (!raf) { last = 0; raf = requestAnimationFrame(tick); }
      } else if (raf) {
        cancelAnimationFrame(raf); raf = null;
      }
    }
    apply();
    if (mq.addEventListener) mq.addEventListener('change', apply); else mq.addListener(apply);
  })();

  // Reveal the compact sticky area nav once the big area chips scroll past
  // the header — the homepage marquee normally, or the Discover page's own
  // area chips while that view is showing (setDiscoverMode reconnects it).
  (function stickyAreaBar() {
    var bar = document.getElementById('areaStickyBar');
    var headerEl = document.querySelector('header');
    if (!bar || !headerEl || !window.IntersectionObserver) return;
    var io = null;
    function connect() {
      if (io) io.disconnect();
      var target = document.getElementById(discoverMode ? 'discoverAreas' : 'areaChips');
      io = new IntersectionObserver(function (entries) {
        var e = entries[0];
        var pastIt = !e.isIntersecting && e.boundingClientRect.top < 0;
        // Slides down from behind the header (styles.css .is-shown).
        bar.classList.toggle('is-shown', pastIt);
        bar.setAttribute('aria-hidden', String(!pastIt));
      }, { rootMargin: '-' + headerEl.offsetHeight + 'px 0px 0px 0px', threshold: 0 });
      io.observe(target);
    }
    connect();
    reconnectStickyAreaBar = connect;
    var raf = null;
    window.addEventListener('resize', function () {
      if (raf) return;
      raf = requestAnimationFrame(function () { raf = null; connect(); });
    });
  })();
