  /* Route stop overflow menu — Move up / Move down / Remove, opened from a
     stop's ⋯ button. One shared menu in <body>, position:fixed beside the
     button: inside #routePanel it would be clipped by the panel's
     overflow (and by #routeScroll's). Its items reuse the data-move /
     data-toggle actions handled by the document click handler above. */
  var routeMenuEl = document.createElement('div');
  routeMenuEl.id = 'routeItemMenu';
  routeMenuEl.setAttribute('role', 'menu');
  routeMenuEl.hidden = true;
  document.body.appendChild(routeMenuEl);
  var routeMenuFor = null; // stop id the open menu belongs to
  var routeMenuIndex = 0; // …and its place in the route when it opened

  var MENU_ICON_UP = '<svg class="lucide lucide-arrow-up" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>';
  var MENU_ICON_DOWN = '<svg class="lucide lucide-arrow-down" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>';
  var MENU_ICON_REMOVE = '<svg class="lucide lucide-x" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>';

  function routeMenuTrigger(id) {
    return id ? document.querySelector('[data-route-menu="' + id + '"]') : null;
  }

  function closeRouteMenu(refocus) {
    if (routeMenuEl.hidden) return;
    var trigger = routeMenuTrigger(routeMenuFor);
    routeMenuEl.hidden = true;
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    if (refocus && trigger) trigger.focus();
    routeMenuFor = null;
  }

  // Right-aligned under the stop's ⋯, or above it when there's no room below.
  function positionRouteMenu() {
    var btn = routeMenuTrigger(routeMenuFor);
    if (!btn) return;
    var r = btn.getBoundingClientRect();
    var w = routeMenuEl.offsetWidth, h = routeMenuEl.offsetHeight;
    var top = r.bottom + 6;
    if (top + h > window.innerHeight - 8) top = Math.max(8, r.top - h - 6);
    routeMenuEl.style.top = top + 'px';
    routeMenuEl.style.left = Math.max(8, Math.min(r.right - w, window.innerWidth - w - 8)) + 'px';
  }

  function openRouteMenu(btn) {
    var id = btn.getAttribute('data-route-menu');
    var i = route.indexOf(id);
    closeRouteMenu();
    routeMenuEl.innerHTML =
      // Only the moves that can happen: no Move up on the first stop, no
      // Move down on the last (a one-stop route just gets Remove).
      (i > 0 ? '<button type="button" role="menuitem" data-move="' + id + '" data-dir="-1">' + MENU_ICON_UP + 'Move up</button>' : '') +
      (i < route.length - 1 ? '<button type="button" role="menuitem" data-move="' + id + '" data-dir="1">' + MENU_ICON_DOWN + 'Move down</button>' : '') +
      '<button type="button" role="menuitem" data-toggle="' + id + '">' + MENU_ICON_REMOVE + 'Remove</button>';
    routeMenuEl.hidden = false;
    routeMenuFor = id;
    routeMenuIndex = i;
    btn.setAttribute('aria-expanded', 'true');

    positionRouteMenu();

    var first = routeMenuEl.querySelector('button:not([disabled])');
    if (first) first.focus();
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-route-menu]');
    if (trigger) {
      if (routeMenuFor === trigger.getAttribute('data-route-menu')) closeRouteMenu();
      else openRouteMenu(trigger);
      return;
    }
    var item = e.target.closest('#routeItemMenu [role="menuitem"]');
    if (item) {
      // The action itself already ran (document click handler above) and
      // re-rendered the list. Focus goes back to the stop's ⋯ after a move,
      // or to the ⋯ of whichever stop took a removed one's place.
      var id = routeMenuFor;
      var at = routeMenuIndex;
      closeRouteMenu();
      var t = routeMenuTrigger(id);
      if (!t) {
        var all = document.querySelectorAll('[data-route-menu]');
        t = all[Math.min(at, all.length - 1)];
      }
      if (t) t.focus();
      return;
    }
    if (!routeMenuEl.contains(e.target)) closeRouteMenu();
  });

  // Capture phase, so Escape closes just the menu, not the whole route panel.
  document.addEventListener('keydown', function (e) {
    if (routeMenuEl.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); closeRouteMenu(true); return; }
    if (e.key === 'Tab') { closeRouteMenu(true); return; }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      var items = Array.prototype.slice.call(routeMenuEl.querySelectorAll('button:not([disabled])'));
      var at = items.indexOf(document.activeElement);
      var next = e.key === 'ArrowDown' ? (at + 1) % items.length : (at - 1 + items.length) % items.length;
      if (items[next]) items[next].focus();
    }
  }, true);

  // It's pinned to the viewport, so don't leave it floating as things move.
  routeScrollEl.addEventListener('scroll', function () { closeRouteMenu(); });
  // A width change closes it; a height-only one (mobile browsers' toolbars
  // showing and hiding) moves the bottom sheet, so the menu follows it.
  var routeMenuVw = window.innerWidth;
  window.addEventListener('resize', function () {
    if (window.innerWidth !== routeMenuVw) { routeMenuVw = window.innerWidth; closeRouteMenu(); }
    else if (!routeMenuEl.hidden) positionRouteMenu();
  });

  // Dismiss the dropdown on an outside click (the mobile sheet already has
  // the scrim for this, but the desktop dropdown has no full-screen scrim)
  document.addEventListener('click', function (e) {
    if (!root.classList.contains('route-open')) return;
    // A remove (×) or move button re-renders #routeList before this runs,
    // so the clicked button is already detached and would look "outside".
    if (!e.target.isConnected) return;
    if (routePanelEl.contains(e.target) || routeHeaderBtn.contains(e.target) || routeMenuEl.contains(e.target)) return;
    openSheet(false);
  });
