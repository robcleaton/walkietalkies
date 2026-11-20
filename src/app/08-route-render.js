  /* ---------------------------------------------------------------
     Render: route
  --------------------------------------------------------------- */
  var routeListEl = document.getElementById('routeList');

  // html.narrating: one of the route's own stops is playing — shows the
  // speaker on the Your route button/bar (styles.css). A stop playing from
  // a card that isn't in the route doesn't count. Rechecked on every play
  // and pause, and on every route change (a playing stop added or removed).
  function syncRoutePlaying() {
    var on = typeof narrationAudio !== 'undefined' && !!narrationAudio &&
      !!narrationId && !narrationAudio.paused && inRoute(narrationId);
    document.documentElement.classList.toggle('narrating', on);
    // The playing stop's name, shown in the route bar/panel header in place
    // of the stop count while it plays (styles.css .route-now-playing).
    var title = '';
    if (on && byId[narrationId]) {
      var t = document.createElement('textarea');
      t.innerHTML = byId[narrationId].name;
      title = t.value;
    }
    Array.prototype.forEach.call(document.querySelectorAll('[data-now-playing]'), function (el) { el.textContent = title; });
  }

  // The empty route's title follows the viewer's clock: "An empty morning"
  // before noon, afternoon until 5pm, evening after that (and overnight).
  function partOfDay() {
    var h = new Date().getHours();
    return h >= 5 && h < 12 ? 'morning' : h >= 12 && h < 17 ? 'afternoon' : 'evening';
  }

  function renderRoute() {
    syncRoutePlaying();
    var n = route.length;
    var km = routeKm();

    // Empty route: no stop count line at all (the empty state says it).
    var meta = document.getElementById('routeMeta');
    meta.textContent = n === 0 ? '' : n + (n === 1 ? ' stop' : ' stops');
    meta.classList.toggle('hidden', n === 0);
    document.getElementById('barLabel').innerHTML =
      n === 0 ? 'Add your first stop' : n + (n === 1 ? ' stop' : ' stops') + ' · ' + fmtDist(km);

    var headerCount = document.getElementById('routeHeaderCount');
    headerCount.textContent = n;
    headerCount.classList.toggle('hidden', n === 0);
    headerCount.classList.toggle('inline-flex', n > 0);
    // Desktop header button turns orange once the route has stops (styles.css).
    document.getElementById('routeHeaderBtn').classList.toggle('has-stops', n > 0);

    var maps = document.getElementById('mapsLink');
    // Empty route: no Open in Maps at all, and no actions bar unless
    // something else (Save as GPX) is still showing in it.
    maps.classList.toggle('hidden', n === 0);
    var actions = document.getElementById('routeActions');
    actions.classList.toggle('hidden', n === 0 && document.getElementById('gpxBtn').classList.contains('hidden'));
    if (n > 0) {
      maps.href = 'https://www.google.com/maps/dir/' +
        route.slice(0, 10).map(function (id) { return byId[id].lat + ',' + byId[id].lon; }).join('/') + '/data=!4m2!4m1!3e2';
    }

    applyRouteView();
    renderRouteMap();

    if (n === 0) {
      routeListEl.innerHTML =
        '<div class="px-5 pt-10 pb-14 text-center">' +
          '<p class="font-display text-[21px] leading-tight mb-1.5">An empty ' + partOfDay() + '</p>' +
          '<p class="text-[13px] leading-relaxed text-muted max-w-[30ch] mx-auto">Add stops from WalkieTalkies. They stack in the order you add them, and you can shuffle them after.</p>' +
          // Straight to the homepage's Near you, for stops to start from.
          (navigator.geolocation ?
            '<button type="button" data-near-you class="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold px-4 py-2.5 rounded-full bg-[#171717] text-white transition-opacity hover:opacity-90">' +
              '<svg class="lucide lucide-locate-fixed w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="2" x2="5" y1="12" y2="12"/><line x1="19" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="5"/><line x1="12" x2="12" y1="19" y2="22"/><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/></svg>' +
              'Use my location' +
            '</button>' : '') +
        '</div>';
      return;
    }

    var html = '';
    if (seeded) {
      html += '<p class="px-5 pt-1 pb-1 text-[12px] leading-relaxed text-brass">' +
              'Starter route: a Greenwich morning, riverside first, uphill last. Remove stops with &times; and build your own.</p>';
    }
    route.forEach(function (id, i) {
      var s = byId[id];
      var leg = i > 0 ? haversine(byId[route[i - 1]], s) : 0;
      var open = !!routeOpen[id];
      html += '' +
        (i > 0 ? '<p class="pl-[52px] pr-5 font-mono text-[11px] leading-4 text-faint num">&darr; ' + fmtDist(leg) + '</p>' : '') +
        // Mobile rows match the Near you list (56px image, 15px name,
        // centred); the desktop dropdown keeps its tighter rows (lg:).
        // .route-row: tapping it (bar the Listen, ⋯ and playbar controls)
        // opens the short description underneath, as on Near you.
        '<div class="route-row' + (open ? ' is-open' : '') + '">' +
        '<div class="flex items-center lg:items-start gap-3 pl-5 pr-2 lg:pr-1.5 py-2 lg:py-1.5 ' + (i > 0 ? '' : 'pt-3') + '">' +
          // Desktop rows are top-aligned: drop the number to the middle of the
          // 56px thumbnail ((56 - 24) / 2); mobile rows are centred already.
          '<span class="route-num relative z-[1] shrink-0 w-6 h-6 ' + 'lg:mt-4' + ' rounded-full bg-verdigris text-white font-mono num text-[11px] font-semibold grid place-items-center">' + (i + 1) + '</span>' +
          stopThumbHTML(s, 'w-14 h-14', false) +
          '<div class="min-w-0 flex-1">' +
            '<button type="button" data-route-expand="' + id + '" aria-expanded="' + open + '" aria-controls="route-desc-' + id + '" class="block w-full text-left">' +
              '<span class="block text-[15px] leading-snug lg:text-[14px] lg:leading-tight font-semibold">' + s.name + '</span>' +
              '<span class="block font-mono text-[11px] text-faint mt-0.5">' + s.pc + ' &middot; ' + s.area + '</span>' +
            '</button>' +
            playbarHTML(s) +
          '</div>' +
          '<div class="shrink-0 self-center flex items-center gap-1">' +
            (narrationFiles[s.id] ? listenButtonHTML(s, true) : '') +
            '<button type="button" data-route-menu="' + id + '" data-tooltip="More" aria-haspopup="menu" aria-expanded="false" aria-label="More actions for ' + plain(s.name) + '" class="w-10 h-10 rounded-full text-ink hover:bg-surface inline-flex items-center justify-center transition-colors">' +
              '<svg class="lucide lucide-ellipsis-vertical" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>' +
        // Lined up with the name: past the 20px inset, 24px number and
        // 56px thumbnail with their 12px gaps. It ends in line with the ⋯
        // button's left edge: the row's right inset (8px, lg 6px) + its 40px.
        rowDescHTML('route-desc-' + id, open, s, 'pb-2 pr-[48px] lg:pr-[46px] pl-[124px]') +
        '</div>';
    });
    // One dashed line joining the numbers, placed by positionRouteLine.
    routeListEl.innerHTML = html + '<span class="route-line" aria-hidden="true"></span>';
    positionRouteLine();
  }

  // The dashed line runs from the first stop number's centre to the last
  // one's, behind the numbers — a single line, so its dashes stay even
  // (separate pieces per row restart the pattern at every join). It's
  // re-measured whenever the list changes size: opening the panel, the
  // window resizing, fonts loading, the list/map switch.
  function positionRouteLine() {
    var line = routeListEl.querySelector('.route-line');
    if (!line) return;
    var nums = routeListEl.querySelectorAll('.route-num');
    if (nums.length < 2 || !routeListEl.offsetHeight) { line.hidden = true; return; }
    var box = routeListEl.getBoundingClientRect();
    var a = nums[0].getBoundingClientRect(), b = nums[nums.length - 1].getBoundingClientRect();
    line.hidden = false;
    line.style.left = (a.left + a.width / 2 - box.left - 0.75) + 'px';
    line.style.top = (a.top + a.height / 2 - box.top) + 'px';
    line.style.height = (b.top - a.top) + 'px';
  }
  if (window.ResizeObserver) new ResizeObserver(positionRouteLine).observe(routeListEl);

  // On mobile, the rule above Open in Maps only shows once the stops
  // overflow #routeScroll — with a short route it's just a stray line.
  // Re-checked whenever the scroll box or its contents change size.
  var routeScrollEl = document.getElementById('routeScroll');
  var routeActionsEl = document.getElementById('routeActions');
  function updateRouteScrollable() {
    routeActionsEl.classList.toggle('is-scrollable', routeScrollEl.scrollHeight > routeScrollEl.clientHeight + 1);
    // Remember how tall the list view is, so the map view can match it
    // when the stops have filled the drawer to its max height (styles.css
    // #routeMap, phones) rather than shrinking on the switch.
    if (routeView === 'list' && routeListEl.offsetHeight) {
      document.getElementById('routePanel').style.setProperty('--route-list-h', routeScrollEl.offsetHeight + 'px');
    }
  }
  if (window.ResizeObserver) {
    var scrollRO = new ResizeObserver(updateRouteScrollable);
    scrollRO.observe(routeScrollEl);
    scrollRO.observe(routeListEl);
    scrollRO.observe(document.getElementById('routeMap'));
  }

  function plain(s) { return s.replace(/&[a-z]+;/g, ''); }

  // Placeholder thumbnail for a stop with no image (or one that fails to
  // load): a neutral tile with the wordmark's looped "a" (from WALKIE),
  // oversized, faint and cropped by the tile's edges (.thumb-ph in
  // styles.css). `size` is the tile's width/height classes.
  var THUMB_PH_GLYPH = '<svg class="thumb-ph__glyph" viewBox="75 0 65 76" fill="currentColor" aria-hidden="true">' +
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M105.748 1.52673C109.419 0.1241 112.852 -0.32559 116.126 0.233762C119.618 0.830542 122.881 2.56811 126.026 5.43493L126.025 5.43591C126.931 6.23964 127.876 7.25545 128.671 8.23864C129.458 9.21092 130.125 10.1827 130.463 10.9027C130.812 11.5989 131.159 12.2318 131.436 12.6859C131.561 12.8898 131.667 13.0489 131.75 13.1595C131.789 13.148 131.834 13.1356 131.882 13.1205C132.106 13.0508 132.415 12.9475 132.787 12.8168C133.53 12.5553 134.516 12.1865 135.568 11.7592L135.576 11.7562L135.583 11.7533C137.297 11.1201 139.469 10.4369 140.908 10.0277V7.29333C140.908 5.72505 141.738 4.89392 143.306 4.89392H161.572C163.14 4.89392 163.97 5.72505 163.97 7.29333V51.0199H173.565C175.133 51.02 175.963 51.8504 175.963 53.4183V67.0717C175.963 68.6399 175.133 69.471 173.565 69.4711H143.306C141.738 69.4711 140.908 68.6399 140.908 67.0717V22.6263C140.841 22.6525 140.774 22.6802 140.707 22.7064L134.465 25.141L134.923 27.7103L134.924 27.7142C135.067 28.5555 135.085 30.2889 135.008 32.3558C134.931 34.4419 134.753 36.921 134.487 39.2816C132.717 54.8071 129.257 64.3443 123.303 70.2601L123.301 70.2621L122.91 70.641C120.962 72.4901 119.186 73.6993 117.118 74.3998C114.919 75.1445 112.437 75.2981 109.145 75.101L109.141 75.1C106.848 74.9436 105.35 74.7657 104.086 74.3197C102.806 73.868 101.8 73.1546 100.462 72.0082C98.1138 70.0074 96.5516 67.9213 95.6441 65.3256C94.741 62.7419 94.5008 59.692 94.7233 55.7884V55.7845C95.442 44.8757 100.583 36.3098 113.083 25.2318L120.045 19.0619L118.965 16.7377L118.962 16.7279C118.681 16.0877 118.141 15.3082 117.505 14.5619C116.876 13.825 116.178 13.1526 115.597 12.7093C114.086 11.6609 112.621 11.4217 110.931 12.0189C109.19 12.6344 107.181 14.1485 104.676 16.7191L104.671 16.724C100.625 20.7734 96.8811 26.8371 94.027 33.5697C91.1743 40.2991 89.2257 47.6614 88.7447 54.2884L88.7438 54.2933L88.6744 55.0785C88.505 56.8795 88.2883 58.468 88.0524 59.6703C87.9181 60.3546 87.7745 60.9303 87.6246 61.3529C87.5503 61.5624 87.4672 61.755 87.3727 61.9086C87.2931 62.0377 87.1412 62.2483 86.8863 62.3236C86.7138 62.3745 86.4076 62.4277 86.0387 62.4808C85.6572 62.5357 85.1735 62.5946 84.6236 62.6537C83.5273 62.7715 82.1576 62.8894 80.7858 62.9681L75.1178 63.4877V59.1049C75.1178 50.6499 77.4332 40.6455 81.1031 31.4574C84.657 22.5599 89.5027 14.3735 94.8033 9.07751L95.318 8.57361C98.4397 5.56996 102.288 2.94665 105.01 1.82068L105.748 1.52673ZM121.617 34.0941C121.272 34.3421 120.836 34.711 120.332 35.1791C119.325 36.1133 118.081 37.4112 116.801 38.8519C114.234 41.7431 111.572 45.152 110.409 47.2904L110.406 47.2972L110.097 47.8627C108.595 50.7164 107.685 53.9266 107.432 56.723C107.297 58.214 107.351 59.5704 107.59 60.682C107.831 61.8007 108.249 62.6246 108.8 63.1136C109.734 63.9413 110.885 64.0587 112.112 63.4935C113.365 62.9161 114.688 61.6206 115.804 59.642C116.832 57.8211 118.055 54.3695 119.135 50.4222C120.211 46.4927 121.131 42.1201 121.57 38.475C121.702 37.032 121.789 35.7328 121.811 34.8002C121.819 34.4642 121.816 34.1837 121.807 33.9652C121.749 34.0028 121.685 34.045 121.617 34.0941Z"/></svg>';
  function thumbPlaceholderHTML(size) {
    return '<span class="thumb-ph ' + size + ' shrink-0 rounded-lg border border-rule" aria-hidden="true">' + THUMB_PH_GLYPH + '</span>';
  }
  // Inline onerror target: swaps a broken thumbnail (or the stop link
  // wrapping it) for the placeholder, keeping the image's size classes.
  window.wtThumbFail = function (img) {
    var el = img.closest('a[data-thumb-link]') || img;
    var tmp = document.createElement('span');
    tmp.innerHTML = thumbPlaceholderHTML(img.getAttribute('data-size') || 'w-14 h-14');
    el.replaceWith(tmp.firstChild);
  };
  // A stop's thumbnail: the image (a link to the stop's page when `link`),
  // or the placeholder when it has none. The full-size photo is on the
  // stop page, where tapping it opens the lightbox.
  function stopThumbHTML(s, size, link) {
    if (!s.img) return thumbPlaceholderHTML(size);
    var img = '<img src="' + s.img + '" alt="" loading="lazy" data-size="' + size + '" onerror="wtThumbFail(this)" class="' + size + ' shrink-0 rounded-lg object-cover border border-rule">';
    if (!link) return img;
    return '<a href="' + stopPath(s.id) + '" data-stop-link="' + s.id + '" data-thumb-link class="shrink-0 rounded-lg" aria-label="' + plain(s.name) + '">' + img + '</a>';
  }
