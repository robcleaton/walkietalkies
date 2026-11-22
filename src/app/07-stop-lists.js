  function renderList() {
    // Lists re-render on every route change; the stop page's Add to route
    // button and nearby cards need to follow along.
    if (stopPageId) renderStopPage();
    if (filters.area) renderAreaActions();
    var items = visible();
    var isHome = !filters.q && !filters.cats.length && !filters.area && !discoverMode;
    // The count line ("N stops") is only useful once it reflects an actual
    // search/filter/area — on the plain homepage it's just noise, so leave
    // it blank there.
    resultCountEl.textContent = isHome ? '' :
      items.length + (items.length === 1 ? ' stop' : ' stops');

    // Typing a search that matches an area's name surfaces that area as
    // its own chip — e.g. "forest" turns up a "Forest Hill 32" chip, a
    // shortcut to the area page itself rather than only the individual
    // stops whose text happens to match. Whenever one's showing, it goes
    // above the "N stops" line (a whole matching area is the more useful
    // thing to lead with); otherwise "N stops" is back on top as usual.
    var areaMatches = filters.q ? matchingAreas(filters.q) : [];
    if (areaMatches.length) {
      areaMatchesEl.innerHTML = areaMatches.map(areaMatchChipHTML).join('');
      areaMatchesEl.classList.remove('hidden');
      areaMatchesEl.parentNode.insertBefore(areaMatchesEl, resultCountEl);
    } else {
      areaMatchesEl.classList.add('hidden');
      areaMatchesEl.innerHTML = '';
      resultCountEl.parentNode.insertBefore(resultCountEl, areaMatchesEl);
    }

    listEl.classList.toggle('hidden', isHome);
    homeListEl.classList.toggle('hidden', !isHome);
    renderNearYou(isHome);
    // Only area pages fill the per-category rows (and CSS only shows them
    // there, at lg+); everywhere else they're cleared so stale cards from a
    // previous area can't linger.
    var rowScroll = filters.area ? areaRowScroll() : null;
    areaRowsEl.innerHTML = '';
    if (isHome) {
      homeListEl.innerHTML = HOME_RANDOM_STOPS.map(function (s) {
        return '<div class="w-[300px] sm:w-[340px] h-[400px] shrink-0">' + stopHTML(s, true) + '</div>';
      }).join('') +
        // End of the carousel: a big round button through to the Discover
        // page, where everything the 10 random cards are sampled from lives.
        '<div class="h-[400px] shrink-0 flex items-center px-4 sm:px-8">' +
          '<a href="?view=discover" data-discover data-tooltip="Discover" aria-label="Discover all areas, categories and stops" class="inline-flex items-center justify-center w-[96px] h-[96px] sm:w-[112px] sm:h-[112px] rounded-full bg-surface border border-rule text-white transition-transform hover:scale-105 hover:border-ink">' +
            '<svg class="lucide lucide-arrow-right w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>' +
          '</a>' +
        '</div>';
      // A tick out: the Tailwind CDN runtime generates CSS for these
      // freshly-inserted utility classes asynchronously, so measuring the
      // cards' real layout has to wait until that's landed, not just until
      // the innerHTML write itself is done. setTimeout (not
      // requestAnimationFrame, which browsers pause in a backgrounded tab)
      // keeps this reliable even if the page loads in a background tab.
      setTimeout(function () { adjustCardClamps(homeListEl); }, 0);
      return;
    }

    if (!items.length) {
      listEl.innerHTML =
        '<div class="bg-surface border border-rule rounded-[16px] px-5 py-12 text-center">' +
          '<p class="font-display text-[22px] mb-1">Nothing matches</p>' +
          '<p class="text-[13px] text-muted">Try a shorter search, or clear the category filters.</p>' +
          // Only for a text search: a place someone looked for and we
          // don't have is worth hearing about.
          (filters.q ?
            '<button type="button" data-suggest-stop class="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold px-4 py-2.5 rounded-full border border-rule text-ink hover:border-ink transition-colors">' +
              '<svg class="lucide lucide-map-pin-plus w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19.914 11.105A7.298 7.298 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738"/><circle cx="12" cy="10" r="3"/><path d="M16 18h6"/><path d="M19 15v6"/></svg>' +
              'Suggest a missing stop' +
            '</button>' : '') +
        '</div>';
      return;
    }

    var html = '', lastGroup = null;
    items.forEach(function (s) {
      if (filters.sort === 'district' && s.pc !== lastGroup) {
        lastGroup = s.pc;
        html += '<div class="pc-group-divider px-1 pt-2 flex items-baseline gap-3">' +
                  '<span class="font-mono text-[12px] font-semibold tracking-wider">' + s.pc + '</span>' +
                  '<span class="eyebrow text-faint">' + districtName(s.pc) + '</span>' +
                '</div>';
      }
      html += stopHTML(s);
    });
    listEl.innerHTML = html;

    if (filters.area) renderAreaRows(items, rowScroll);
  }

  // Area pages on large screens: the area's stops as one homepage-style
  // carousel per category, in the same category order as the category
  // cards above. Each row keeps visible()'s own (district) sort.
  function renderAreaRows(items, keepScroll) {
    var byCat = {};
    items.forEach(function (s) { (byCat[s.cat] = byCat[s.cat] || []).push(s); });
    areaRowsEl.innerHTML = Object.keys(CATS).filter(function (cat) { return byCat[cat]; }).map(function (cat) {
      var stops = byCat[cat];
      return '<section data-cat-row="' + cat + '" aria-label="' + plain(catCountLabel(cat, stops.length)) + '">' +
        '<h3 class="area-cat-head flex items-center gap-3 mb-4">' +
          '<span class="inline-flex items-center justify-center w-9 h-9 rounded-[10px] shrink-0" style="background:' + CATMARK[cat].color + '">' +
            '<svg viewBox="0 0 256 256" width="18" height="18" fill="' + CATMARK[cat].fg + '" aria-hidden="true">' + CATMARK[cat].icon + '</svg>' +
          '</span>' +
          '<span class="font-display text-[28px] leading-none">' + catCountLabel(cat, stops.length).replace(/&/g, '&amp;') + '</span>' +
        '</h3>' +
        '<div class="area-cat-row min-w-0 scroll-hide flex flex-nowrap gap-4 overflow-x-auto pb-2">' +
          stops.map(function (s) {
            return '<div class="w-[340px] h-[400px] shrink-0">' + stopHTML(s, true) + '</div>';
          }).join('') +
        '</div>' +
      '</section>';
    }).join('');
    if (keepScroll) {
      Object.keys(keepScroll).forEach(function (cat) {
        var row = areaRowsEl.querySelector('[data-cat-row="' + cat + '"] .area-cat-row');
        if (row) row.scrollLeft = keepScroll[cat];
      });
    }
    setTimeout(function () { adjustCardClamps(areaRowsEl); }, 0);
  }

  // Each row's current horizontal scroll, keyed by category — renderList
  // reruns on every route add/remove, and without this each one would
  // snap every row back to its first card.
  function areaRowScroll() {
    var out = {};
    Array.prototype.forEach.call(areaRowsEl.querySelectorAll('[data-cat-row]'), function (sec) {
      var row = sec.querySelector('.area-cat-row');
      if (row && row.scrollLeft) out[sec.getAttribute('data-cat-row')] = row.scrollLeft;
    });
    return out;
  }

  // Each homepage carousel card is a fixed height, and the name above the
  // description is never truncated — so cards with a short one-line name
  // have more room left for the description than cards with a wrapped
  // two- or three-line name. Once the cards are laid out, measure the
  // actual space left in each card's description slot and clamp its text
  // to however many lines fit there, so the description always runs right
  // up to the address instead of leaving a gap.
  // Used for the area pages' per-category rows too (same compact cards).
  function adjustCardClamps(root) {
    Array.prototype.forEach.call(root.querySelectorAll('[data-desc-wrap]'), function (wrap) {
      var p = wrap.querySelector('[data-desc-text]');
      // Rows hidden at this screen size measure as zero height — skip them
      // rather than clamp to one line; resize re-runs this once they show.
      if (!p || !wrap.clientHeight) return;
      var lineHeight = parseFloat(getComputedStyle(p).lineHeight);
      if (!lineHeight || isNaN(lineHeight)) lineHeight = 26.35; // text-[17px] leading-[1.55] fallback
      var lines = Math.max(1, Math.floor(wrap.clientHeight / lineHeight));
      p.style.display = '-webkit-box';
      p.style.webkitBoxOrient = 'vertical';
      p.style.overflow = 'hidden';
      p.style.webkitLineClamp = String(lines);
    });
  }
  var homeClampTimer = null;
  window.addEventListener('resize', function () {
    if (homeClampTimer) clearTimeout(homeClampTimer);
    homeClampTimer = setTimeout(function () {
      homeClampTimer = null;
      if (!homeListEl.classList.contains('hidden')) adjustCardClamps(homeListEl);
      if (!nearListEl.classList.contains('hidden')) adjustCardClamps(nearListEl);
      adjustCardClamps(areaRowsEl);
    }, 100);
  });

  function districtName(pc) {
    var map = {
      SE1:'Bankside &amp; Elephant', SE3:'Blackheath', SE7:'Charlton', SE8:'Deptford',
      SE9:'Eltham', SE10:'Greenwich', SE14:'New Cross', SE15:'Peckham &amp; Nunhead',
      SE16:'Rotherhithe &amp; Bermondsey', SE18:'Woolwich &amp; Shooter&rsquo;s Hill',
      SE19:'Crystal Palace', SE21:'Dulwich', SE22:'East Dulwich', SE23:'Forest Hill',
      SE26:'Sydenham', DA5:'Bexley', DA6:'Bexleyheath', SE6:'Catford',
      SE12:'Lee', SE13:'Lewisham', SE5:'Camberwell', SE17:'Walworth', SE4:'Brockley', SE24:'Herne Hill',
      SE20:'Penge', SE27:'Gipsy Hill', SE25:'South Norwood'
    };
    return map[pc] || '';
  }

  // dist: optional distance label (Near you) shown at the start of the address line.
  // noText: leave out the description (Near you).
  // A stop's Add to route / "Stop N ✓" button (on cards and the stop page).
  // Stops with no pinned location can go in a route too; they're listed
  // in it but left off the route map, distances, Open in Maps and GPX.
  // An area (s.isArea) reads "In route" rather than "Stop N" once added.
  function routeButtonHTML(s) {
    var on = inRoute(s.id);
    var pos = route.indexOf(s.id) + 1;
    var onLabel = s.isArea ? 'In route' : 'Stop ' + pos;
    return (
      '<button data-toggle="' + s.id + '" class="shrink-0 inline-flex items-center gap-1 text-[12px] font-semibold px-3 py-2 rounded-full border transition-colors ' +
        (on ? 'bg-verdigris text-white border-verdigris' : 'border-rule text-ink hover:border-ink') + '">' +
        (on ? onLabel + ' <svg class="lucide lucide-check w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>' : 'Add to route') +
      '</button>');
  }

  function stopHTML(s, compact, dist, noText) {
    var catLabel = CATS[s.cat];
    var eraLead = s.era || '';
    if (eraLead === catLabel) eraLead = '';
    else if (eraLead.indexOf(catLabel + ', ') === 0) eraLead = eraLead.slice(catLabel.length + 2);
    // compact: used in the fixed-height homepage carousel, where every card
    // fills the same height. The name is never truncated; the description
    // is clamped (via adjustHomeCardClamps, after layout) to however many
    // lines actually fit in the space left once the name has taken what it
    // needs, so short names don't leave a gap above a pinned address.
    return '' +
      '<article id="stop-' + s.id + '" class="stop relative px-5 pt-5 pb-8' + (compact ? ' h-full flex flex-col' : '') + '">' +
        playbarHTML(s, true) +
        // Image, plus the listen/route buttons, share the top row; the
        // category chip and title get their own full-width lines beneath,
        // so long names never run into the buttons.
        '<div class="flex items-start justify-between gap-4' + (compact ? ' shrink-0' : '') + '">' +
          stopThumbHTML(s, 'w-[72px] h-[72px] sm:w-14 sm:h-14', true) +
          '<div class="ml-auto shrink-0 flex items-center gap-2">' +
          listenButtonHTML(s) +
          routeButtonHTML(s) +
          '</div>' +
        '</div>' +
        '<div class="min-w-0 mt-3' + (compact ? ' shrink-0' : '') + '">' +
          '<div class="mb-1">' + catChip(s.cat) + '</div>' +
          '<h3 class="font-display text-[24px] sm:text-[28px] leading-[1.1] mb-1">' +
            // .stop-link stretches over the whole card (styles.css), so the
            // card is one big link to the stop's page; its own buttons sit above.
            '<a href="' + stopPath(s.id) + '" data-stop-link="' + s.id + '" class="stop-link">' + s.name + '</a>' +
          '</h3>' +
          '<p class="font-mono text-[11px] text-muted num' + (compact ? ' truncate' : '') + '">' + (dist ? '<span class="text-ink font-semibold">' + dist + '</span> &middot; ' : '') + cardAddress(s) + '</p>' +
        '</div>' +
        (noText ? '' : (
        (compact ? '<div class="flex-1 min-h-0 overflow-hidden mt-3" data-desc-wrap>' : '') +
        '<p class="font-serif text-[17px] leading-[1.55] text-ink max-w-[62ch]' + (compact ? '' : ' mt-3') + '"' + (compact ? ' data-desc-text' : '') + '>' +
          (eraLead ? '<span class="font-semibold">' + eraLead + '.</span> ' : '') +
          // Cards show the short description (Notion's "Short description",
          // up to 40 words); the full text stays for search and narration.
          // Without one, compact cards fall back to the first paragraph —
          // a single flowing paragraph, so the clamp's "…" never lands on a
          // blank line between paragraphs — and full cards to everything.
          (s.short || (compact ? stopRefsPlain(s.text).split('\n\n')[0] : stopRefsPlain(s.text).split('\n\n').join('<br><br>'))) +
        '</p>' +
        (compact ? '</div>' : ''))) +
      '</article>';
  }
