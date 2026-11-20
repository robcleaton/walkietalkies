  // Route panel: a bottom sheet on small screens, a dropdown menu off the
  // header button on larger ones — same open/closed state either way.
  var root = document.documentElement;
  var routeHeaderBtn = document.getElementById('routeHeaderBtn');
  var routeHeaderChevron = document.getElementById('routeHeaderChevron');
  var routePanelEl = document.getElementById('routePanel');
  var routePanelBodyEl = document.getElementById('routePanelBody');
  var routeBarEl = document.getElementById('routeBar');
  var routeOpenTrigger = null; // element to refocus when the panel closes
  // Whether the last input was a key rather than a tap or click. Moving
  // focus into the panel only helps keyboard users; after a tap, Safari
  // still draws a focus ring on whatever is focused in code (the first
  // stop's name), so taps leave focus where it is.
  var keyboardInput = false;
  document.addEventListener('keydown', function () { keyboardInput = true; }, true);
  document.addEventListener('pointerdown', function () { keyboardInput = false; }, true);
  function focusableIn(container) {
    return Array.prototype.filter.call(
      container.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'),
      function (el) { return el.offsetParent !== null; }
    );
  }
  function openSheet(v) {
    if (!v && routeMenuEl) closeRouteMenu();
    var wasOpen = root.classList.contains('route-open');
    root.classList.toggle('route-open', v);
    document.getElementById('scrim').hidden = !v;
    routeHeaderBtn.setAttribute('aria-expanded', v ? 'true' : 'false');
    routeHeaderChevron.style.transform = v ? 'rotate(180deg)' : '';
    routeBarEl.setAttribute('aria-expanded', v ? 'true' : 'false');
    // The panel's width can change between renders (dropdown vs. bottom
    // sheet, or a window resize while closed) — resync the map's canvas
    // to its container each time it becomes visible.
    if (v && routeMap) setTimeout(function () { routeMap.invalidateSize(); }, 0);
    if (v && !wasOpen && keyboardInput) {
      // routePanelBodyEl, not routePanelEl — #routeBar (the always-visible
      // summary row) is itself inside #routePanel now, so focusing the
      // panel's first focusable would just refocus the button that was
      // already clicked instead of moving into the newly revealed content.
      var focusables = focusableIn(routePanelBodyEl);
      // preventScroll: focusing inside the still-opening (clipped) body
      // would otherwise scroll it, nudging the contents sideways.
      if (focusables.length) focusables[0].focus({ preventScroll: true });
    } else if (!v && wasOpen && routeOpenTrigger) {
      if (keyboardInput) routeOpenTrigger.focus();
      routeOpenTrigger = null;
    }
  }
  // Toggles both ways: tapping the always-visible bar again is how the
  // mobile sheet closes (on desktop it's #routeHeaderBtn again, an outside
  // click or Escape).
  routeBarEl.addEventListener('click', function (e) {
    e.stopPropagation();
    var willOpen = !root.classList.contains('route-open');
    if (willOpen) routeOpenTrigger = routeBarEl;
    openSheet(willOpen);
  });
  document.getElementById('scrim').addEventListener('click', function () { openSheet(false); });

  /* Mobile sheet drag: swiping #routeSheetHead (the handle and summary
     bar) moves #routePanelBody's height with the finger, then lets go
     open or closed — by flick direction if it was quick, otherwise by
     whether it's past halfway. A tap still toggles via the click above;
     a real drag swallows that click. Pulling down on the stop list while
     it's scrolled to the top does the same (pull down to close). */
  (function () {
    var head = document.getElementById('routeSheetHead');
    var scroller = document.getElementById('routeScroll');
    var body = routePanelBodyEl;
    var drag = null, suppressClick = false;

    function fullHeight() { return Math.min(body.scrollHeight, window.innerHeight * 0.8); }
    function startDrag(y, t) {
      var open = root.classList.contains('route-open');
      return { y0: y, lastY: y, lastT: t, v: 0, h: 0, full: 0, wasOpen: open, moved: false,
               start: open ? body.getBoundingClientRect().height : 0 };
    }
    function beginMove(d) {
      d.moved = true;
      if (routeMenuEl) closeRouteMenu();
      root.classList.add('route-dragging');
      d.full = fullHeight();
    }
    function moveTo(d, y, t) {
      var dt = t - d.lastT;
      if (dt > 0) d.v = (y - d.lastY) / dt; // px/ms, + is downward
      d.lastY = y; d.lastT = t;
      d.h = Math.max(0, Math.min(d.full, d.start - (y - d.y0)));
      body.style.maxHeight = d.h + 'px';
    }
    function finish(d, cancelled) {
      var open = cancelled ? d.wasOpen :
        Math.abs(d.v) > 0.4 ? d.v < 0 : d.h > d.full / 2;
      root.classList.remove('route-dragging');
      // Clearing the inline height hands it back to the CSS transition,
      // which eases from where the finger left it to fully open or shut.
      body.style.maxHeight = '';
      if (open && !d.wasOpen) routeOpenTrigger = routeBarEl;
      openSheet(open);
    }

    // The handle and bar: pointer events (touch-action:none in styles.css).
    head.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      drag = startDrag(e.clientY, e.timeStamp);
      drag.id = e.pointerId;
    });
    head.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      if (!drag.moved) {
        if (Math.abs(e.clientY - drag.y0) < 6) return;
        beginMove(drag);
        try { head.setPointerCapture(e.pointerId); } catch (err) { /* already released */ }
      }
      moveTo(drag, e.clientY, e.timeStamp);
    });
    function headEnd(e) {
      if (!drag || e.pointerId !== drag.id) return;
      var d = drag; drag = null;
      if (!d.moved) return;
      suppressClick = true;
      setTimeout(function () { suppressClick = false; }, 0);
      finish(d, e.type === 'pointercancel');
    }
    head.addEventListener('pointerup', headEnd);
    head.addEventListener('pointercancel', headEnd);
    // Capture phase, so it runs before #routeBar's and the map toggle's own handlers.
    head.addEventListener('click', function (e) {
      if (suppressClick) { e.stopPropagation(); e.preventDefault(); suppressClick = false; }
    }, true);

    // The stop list: touch events, since the list scrolls natively and
    // only a downward pull from the very top should move the sheet. Not
    // on the route map, where a drag pans the map. Phones only.
    var listDrag = null;
    var mobile = window.matchMedia('(max-width: 1023px)');
    scroller.addEventListener('touchstart', function (e) {
      listDrag = null;
      if (!mobile.matches || e.touches.length !== 1 || e.target.closest('#routeMap')) return;
      if (!root.classList.contains('route-open')) return;
      listDrag = startDrag(e.touches[0].clientY, e.timeStamp);
      listDrag.top = scroller.scrollTop <= 0;
    }, { passive: true });
    scroller.addEventListener('touchmove', function (e) {
      var d = listDrag;
      if (!d) return;
      var y = e.touches[0].clientY;
      if (!d.moved) {
        var dy = y - d.y0;
        if (Math.abs(dy) < 6) return;
        // Scrolling up the list, or not starting from the top: a normal scroll.
        if (dy < 0 || !d.top || scroller.scrollTop > 0) { listDrag = null; return; }
        beginMove(d);
        d.y0 = y; // start following from here, so the sheet doesn't jump
      }
      e.preventDefault();
      moveTo(d, y, e.timeStamp);
    }, { passive: false });
    function listEnd(e) {
      var d = listDrag; listDrag = null;
      if (d && d.moved) finish(d, e.type === 'touchcancel');
    }
    scroller.addEventListener('touchend', listEnd);
    scroller.addEventListener('touchcancel', listEnd);
  })();
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' && e.key !== 'Tab') return;
    if (!root.classList.contains('route-open')) return;
    if (e.key === 'Escape') { openSheet(false); return; }
    // Basic focus trap: keep Tab/Shift+Tab cycling inside the open panel.
    var focusables = focusableIn(routePanelEl);
    if (!focusables.length) return;
    var first = focusables[0], last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  routeHeaderBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    var willOpen = !root.classList.contains('route-open');
    if (willOpen) routeOpenTrigger = routeHeaderBtn;
    openSheet(willOpen);
  });
