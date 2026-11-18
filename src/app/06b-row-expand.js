  /* ---------------------------------------------------------------
     Expandable rows — Near you's rows (.near-row, phones) and Your
     route's rows (.route-row) open a short description underneath on a
     tap, and close it on the next. A tap on the row's own controls
     (thumbnail, Listen, add, ⋯, playbar) does that control's job instead.
     While held, a row takes a pressed tint (.is-pressed in styles.css).
  --------------------------------------------------------------- */
  var ROW_KINDS = {
    near: { attr: 'data-near-expand', open: nearOpen },
    route: { attr: 'data-route-expand', open: routeOpen }
  };

  // The collapsible description under a row (.row-desc animates open via
  // grid rows in styles.css). pClass places the text in that row's layout.
  function rowDescHTML(domId, open, s, pClass) {
    return '<div class="row-desc" id="' + domId + '"' + (open ? '' : ' aria-hidden="true"') + '>' +
      '<div><p class="font-serif text-[15px] leading-[1.5] text-ink ' + pClass + '">' +
        (s.short || s.text.split('\n\n')[0]) +
      '</p></div>' +
    '</div>';
  }

  // The expandable row a tap or press on `target` belongs to, or null when
  // it's on nothing expandable or on one of the row's other controls.
  function expandableRowAt(target) {
    var row = target.closest('.near-row, .route-row');
    if (!row) return null;
    var kind = ROW_KINDS[row.classList.contains('route-row') ? 'route' : 'near'];
    var ctl = target.closest('button, a, [data-pb-track], .playbar');
    if (ctl && !ctl.hasAttribute(kind.attr)) return null;
    return { row: row, kind: kind };
  }

  document.addEventListener('click', function (e) {
    var hit = expandableRowAt(e.target);
    if (!hit) return;
    var btn = hit.row.querySelector('[' + hit.kind.attr + ']');
    var id = btn.getAttribute(hit.kind.attr);
    var open = !hit.kind.open[id];
    if (open) hit.kind.open[id] = true; else delete hit.kind.open[id];
    hit.row.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
    var d = hit.row.querySelector('.row-desc');
    if (open) d.removeAttribute('aria-hidden'); else d.setAttribute('aria-hidden', 'true');
  });

  // What a press on `target` should tint: an expandable row, or a stop
  // card (the whole card links to its page) — but not when it lands on one
  // of their own controls.
  function pressableAt(target) {
    var hit = expandableRowAt(target);
    if (hit) return hit.row;
    var card = target.closest('.stop');
    if (!card || !card.querySelector('.stop-link')) return null;
    if (target.closest('button, [data-pb-track], .playbar')) return null;
    return card;
  }

  // Pressed tint while a row or card is held. A scroll or drag that starts
  // on one fires pointercancel, so the tint drops away rather than sticking.
  (function () {
    var pressed = null;
    function release() {
      if (pressed) pressed.classList.remove('is-pressed');
      pressed = null;
    }
    document.addEventListener('pointerdown', function (e) {
      if (e.button !== 0) return;
      var el = pressableAt(e.target);
      if (!el) return;
      release();
      pressed = el;
      pressed.classList.add('is-pressed');
    });
    ['pointerup', 'pointercancel', 'dragstart'].forEach(function (t) {
      document.addEventListener(t, release);
    });
    window.addEventListener('scroll', release, { passive: true });
  })();

  // iOS Safari only applies :active (the buttons' pressed fill and grow in
  // styles.css) once the page listens for touches; this empty one is enough.
  document.addEventListener('touchstart', function () {}, { passive: true });
