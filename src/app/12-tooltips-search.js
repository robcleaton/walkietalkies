  /* Tooltips for icon-only buttons: any element with data-tooltip. Shown
     after a short hover with a mouse, or straight away on keyboard focus;
     touch never shows them (there's no hover, and a tap acts at once).
     The text is read when shown, so buttons that change state (Listen ↔
     Pause, Show map ↔ Show list) just update their data-tooltip. It's
     aria-hidden: each button's aria-label already names it for screen
     readers. */
  (function () {
    var tip = document.createElement('div');
    tip.id = 'tooltip';
    tip.setAttribute('aria-hidden', 'true');
    tip.hidden = true;
    document.body.appendChild(tip);
    var target = null, timer = null;
    var canHover = window.matchMedia('(hover: hover) and (pointer: fine)');

    function place() {
      var r = target.getBoundingClientRect();
      var w = tip.offsetWidth, h = tip.offsetHeight;
      // Above by default; below when that would run off the top (or under
      // the fixed header, for buttons in it).
      var headerBottom = (document.querySelector('header') || { getBoundingClientRect: function () { return { bottom: 0 }; } }).getBoundingClientRect().bottom;
      var inHeader = !!target.closest('header');
      var top = r.top - h - 8;
      if (inHeader || top < (inHeader ? 0 : headerBottom) + 4) top = r.bottom + 8;
      var left = Math.max(8, Math.min(r.left + r.width / 2 - w / 2, window.innerWidth - w - 8));
      tip.style.top = top + 'px';
      tip.style.left = left + 'px';
    }

    function show(el) {
      var text = el.getAttribute('data-tooltip');
      if (!text) return;
      target = el;
      tip.textContent = text;
      tip.hidden = false;
      place();
      tip.classList.add('is-on');
    }

    function hide() {
      clearTimeout(timer);
      timer = null;
      target = null;
      tip.classList.remove('is-on');
      tip.hidden = true;
    }

    document.addEventListener('pointerover', function (e) {
      if (e.pointerType !== 'mouse' || !canHover.matches) return;
      var el = e.target.closest('[data-tooltip]');
      if (!el || el === target) return;
      hide();
      timer = setTimeout(function () { if (el.isConnected) show(el); }, 450);
    });
    document.addEventListener('pointerout', function (e) {
      var el = e.target.closest('[data-tooltip]');
      if (el && !el.contains(e.relatedTarget)) hide();
    });
    document.addEventListener('focusin', function (e) {
      var el = e.target.closest && e.target.closest('[data-tooltip]');
      if (el && el.matches(':focus-visible')) show(el); else hide();
    });
    document.addEventListener('focusout', hide);
    // A press acts straight away (and may change the label), so get out of the way.
    document.addEventListener('pointerdown', hide, true);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && target) hide(); });
    window.addEventListener('scroll', hide, true);
    window.addEventListener('resize', hide);
  })();

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
    var ICON_SEARCH = '<svg class="lucide lucide-search w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>';
    var ICON_CLOSE = '<svg class="lucide lucide-x w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>';

    function setOpen(open) {
      isOpen = open;
      label.classList.toggle('hidden', !open);
      label.classList.toggle('flex', open);
      toggleIcon.innerHTML = open ? ICON_CLOSE : ICON_SEARCH;
      toggleBtn.setAttribute('aria-label', open ? 'Close search' : 'Search');
      toggleBtn.setAttribute('data-tooltip', open ? 'Close search' : 'Search');
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
