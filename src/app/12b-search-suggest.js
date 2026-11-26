  /* ---------------------------------------------------------------
     Search suggestions — a dropdown under the search box as you type:
     any areas whose name matches, then the best-matching stops (name
     matches ahead of stops that only mention the words in their
     description), then "See all N results". Arrow keys move through it,
     Enter opens the highlighted one, Escape closes it. The full results
     list underneath keeps updating as before.
  --------------------------------------------------------------- */
  (function () {
    var input = document.getElementById('search');
    var label = document.getElementById('searchLabel');
    if (!input || !label) return;

    var MAX_STOPS = 6, MAX_AREAS = 2;
    var box = document.createElement('div');
    box.id = 'searchSuggest';
    box.setAttribute('role', 'listbox');
    box.setAttribute('aria-label', 'Search suggestions');
    box.className = 'hidden absolute top-full left-0 right-0 sm:left-auto sm:w-[400px] mt-2 z-40 bg-surface border border-rule rounded-[16px] shadow-2xl overflow-hidden py-1.5';
    label.appendChild(box);

    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-controls', 'searchSuggest');
    input.setAttribute('aria-expanded', 'false');
    input.setAttribute('autocomplete', 'off');

    var items = [];   // [{ kind: 'stop'|'area'|'all', id }]
    var active = -1;

    var decoder = document.createElement('textarea');
    function decode(html) { decoder.innerHTML = html; return decoder.value; }
    function escHTML(s) {
      return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    // The typed words in bold wherever they start a word in `text`.
    function highlight(text, words) {
      var marks = new Array(text.length + 1).join('0').split('');
      words.forEach(function (w) {
        var re = new RegExp('(^|[^a-z0-9])(' + escapeRegExp(w) + ')', 'gi'), m;
        while ((m = re.exec(text))) {
          var start = m.index + m[1].length;
          for (var i = start; i < start + m[2].length; i++) marks[i] = '1';
          if (re.lastIndex === m.index) re.lastIndex++;
        }
      });
      var out = '', on = false;
      for (var i = 0; i < text.length; i++) {
        if (marks[i] === '1' && !on) { out += '<b class="font-semibold text-ink">'; on = true; }
        if (marks[i] !== '1' && on) { out += '</b>'; on = false; }
        out += escHTML(text[i]);
      }
      return out + (on ? '</b>' : '');
    }

    // How well a stop matches: every word must be in it somewhere
    // (stopMatches); after that, words in its name count for far more
    // than words only in its address or description, and a name that
    // starts with what was typed counts most of all.
    function score(s, words, q) {
      var name = ' ' + searchNorm(s.name) + ' ';
      var place = ' ' + searchNorm(s.area + ' ' + s.pc) + ' ';
      var cat = ' ' + searchNorm(CATS[s.cat] || '') + ' ';
      var n = 0;
      words.forEach(function (w) {
        if (name.indexOf(' ' + w) !== -1) n += 10;
        else if (cat.indexOf(' ' + w) !== -1) n += 6;
        else if (place.indexOf(' ' + w) !== -1) n += 3;
      });
      if (name.indexOf(' ' + q) === 1) n += 15;
      else if (name.indexOf(' ' + q) !== -1) n += 8;
      return n;
    }

    function rankedStops(words) {
      var q = words.join(' ');
      return STOPS.filter(function (s) { return stopMatches(s, words); })
        .map(function (s) { return { s: s, n: score(s, words, q) }; })
        .sort(function (a, b) {
          return b.n - a.n || stripEnt(a.s.name).length - stripEnt(b.s.name).length;
        })
        .map(function (r) { return r.s; });
    }

    function optionAttrs(i) {
      return ' id="searchSuggest-' + i + '" role="option" aria-selected="false" data-suggest-index="' + i + '"' +
        ' class="search-suggest__opt flex items-center gap-3 px-3 py-2 mx-1.5 rounded-[10px] cursor-pointer"';
    }

    function render() {
      var words = searchWords(input.value);
      items = []; active = -1;
      if (!words.length || document.activeElement !== input) { close(); return; }

      var areas = matchingAreas(input.value).slice(0, MAX_AREAS);
      var stops = rankedStops(words);
      if (!areas.length && !stops.length) { close(); return; }

      var html = '';
      areas.forEach(function (area) {
        var c = AREA_COLORS[area] || { bg: 'var(--raised)' };
        var i = items.push({ kind: 'area', id: area }) - 1;
        html += '<div' + optionAttrs(i) + '>' +
          '<span class="w-10 h-10 shrink-0 rounded-lg border border-rule" style="background:' + c.bg + '" aria-hidden="true"></span>' +
          '<span class="min-w-0 flex-1">' +
            '<span class="block text-[14px] text-muted truncate">' + highlight(areaTitle(area), words) + '</span>' +
            '<span class="block text-[12px] text-faint">Area · ' + areaStopCount(area) + ' stops</span>' +
          '</span>' +
        '</div>';
      });
      stops.slice(0, MAX_STOPS).forEach(function (s) {
        var i = items.push({ kind: 'stop', id: s.id }) - 1;
        html += '<div' + optionAttrs(i) + '>' +
          stopThumbHTML(s, 'w-10 h-10', false, true) +
          '<span class="min-w-0 flex-1">' +
            '<span class="block text-[14px] text-muted truncate">' + highlight(decode(s.name), words) + '</span>' +
            '<span class="block text-[12px] text-faint truncate">' + escHTML(CATS[s.cat] || '') + (s.area ? ' · ' + escHTML(decode(s.area)) : '') + '</span>' +
          '</span>' +
        '</div>';
      });
      if (stops.length) {
        var i = items.push({ kind: 'all' }) - 1;
        html += '<div class="border-t border-rule mt-1.5 pt-1.5">' +
          '<div' + optionAttrs(i).replace('py-2', 'py-2.5') + '>' +
            '<span class="text-[13px] font-semibold text-ink">See all ' + stops.length + (stops.length === 1 ? ' result' : ' results') + '</span>' +
          '</div>' +
        '</div>';
      }
      box.innerHTML = html;
      box.classList.remove('hidden');
      input.setAttribute('aria-expanded', 'true');
    }

    function close() {
      box.classList.add('hidden');
      box.innerHTML = '';
      items = []; active = -1;
      input.setAttribute('aria-expanded', 'false');
      input.removeAttribute('aria-activedescendant');
    }

    function setActive(i) {
      var prev = box.querySelector('[aria-selected="true"]');
      if (prev) prev.setAttribute('aria-selected', 'false');
      active = i;
      var el = i >= 0 && document.getElementById('searchSuggest-' + i);
      if (el) {
        el.setAttribute('aria-selected', 'true');
        input.setAttribute('aria-activedescendant', el.id);
        el.scrollIntoView({ block: 'nearest' });
      } else {
        input.removeAttribute('aria-activedescendant');
      }
    }

    function choose(i) {
      var it = items[i];
      if (!it) return;
      close();
      if (it.kind === 'all') {
        // The results are already on the page under the header.
        input.blur();
        document.getElementById('chips').scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      // Leaving search for a page: clear the box (the mobile search bar
      // folds back up once it's empty and blurred).
      input.value = '';
      input.blur();
      if (it.kind === 'area') jumpToArea(it.id);
      else jumpToStop(it.id);
    }

    input.addEventListener('input', render);
    input.addEventListener('focus', render);
    input.addEventListener('blur', function () { setTimeout(close, 0); });

    input.addEventListener('keydown', function (e) {
      if (box.classList.contains('hidden')) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive(active + 1 >= items.length ? 0 : active + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive(active <= 0 ? items.length - 1 : active - 1);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        choose(active >= 0 ? active : items.length - 1);
      } else if (e.key === 'Escape') {
        // (The search box's own Escape handler blurs it as well.)
        close();
      }
    });

    // mousedown, not click: keep focus in the box so blur doesn't close
    // the dropdown before the click lands.
    box.addEventListener('mousedown', function (e) { e.preventDefault(); });
    box.addEventListener('click', function (e) {
      var opt = e.target.closest('[data-suggest-index]');
      if (opt) choose(parseInt(opt.getAttribute('data-suggest-index'), 10));
    });
    box.addEventListener('mousemove', function (e) {
      var opt = e.target.closest('[data-suggest-index]');
      if (opt) {
        var i = parseInt(opt.getAttribute('data-suggest-index'), 10);
        if (i !== active) setActive(i);
      }
    });
  })();
