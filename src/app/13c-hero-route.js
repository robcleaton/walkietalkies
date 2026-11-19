  /* ---------------------------------------------------------------
     Homepage hero, version B (?hero=b): stop to stop, static. A
     centred block of display type with category marks and two stops'
     photos set into the lines:

         STOP [stop 1] TO STOP [stop 2]
         [mark] HEAR [mark] THE
         STORIES OF SOUTH
         EAST [mark] LONDON

     The two stops are neighbours in one area, picked at random each
     visit, their photos cropped to the same shapes as version A's shape
     cards (SHAPES in 13b-hero.js). Built by hero() in 13b-hero.js, which handles when to
     build and photo fallbacks (styles.css .hero2-*).
  --------------------------------------------------------------- */
  // Two stops a short walk apart: a random stop with a photo, and the
  // nearest other stop with a photo in the same area.
  function heroStopPair() {
    var withImg = STOPS.filter(function (s) { return s.img && CATMARK[s.cat] && s.lat && s.lon; });
    var areas = Object.keys(AREA_COLORS).map(function (area) {
      return withImg.filter(function (s) { return stopInArea(s, area); });
    }).filter(function (list) { return list.length >= 2; });
    if (!areas.length) return null;
    var list = areas[Math.floor(Math.random() * areas.length)];
    var a = list[Math.floor(Math.random() * list.length)], b = null;
    list.forEach(function (s) {
      if (s !== a && (!b || haversine(a, s) < haversine(a, b))) b = s;
    });
    return [a, b];
  }

  function buildRouteHero(rowsEl, imgHTML, shapes) {
    var pair = heroStopPair();
    if (!pair) return false;

    // Two different crops, at random.
    var first = Math.floor(Math.random() * shapes.length);
    var crops = [shapes[first], shapes[(first + 1 + Math.floor(Math.random() * (shapes.length - 1))) % shapes.length]];

    function photo(s, i) {
      return '<a class="hero2-photo" href="' + stopPath(s.id) + '" title="' + s.name.replace(/"/g, '&quot;') + '" ' +
        'style="-webkit-mask-image:' + crops[i] + ';mask-image:' + crops[i] + '">' +
        imgHTML(s) + '<span class="sr-only">' + s.name + '</span></a>';
    }
    // Each word its own box, so a line can wrap between words on phones.
    function words(text) {
      return text.split(' ').map(function (w) { return '<span class="hero2-w">' + w + '</span>'; }).join(' ');
    }
    function mark(cat) {
      var m = CATMARK[cat];
      return '<span class="hero2-mark" aria-hidden="true"><svg viewBox="0 0 256 256" fill="' + m.color + '">' + m.icon + '</svg></span>';
    }

    rowsEl.className = 'hero2';
    rowsEl.innerHTML =
      '<div class="hero2-inner">' +
        '<p class="hero2-type">' +
          '<span class="hero2-l">' + words('Stop') + photo(pair[0], 0) + words('to stop') + photo(pair[1], 1) + '</span>' +
          '<span class="hero2-l">' + mark('grand') + words('hear') + mark('art') + words('the') + '</span>' +
          '<span class="hero2-l">' + words('stories of south') + '</span>' +
          '<span class="hero2-l">' + words('east') + mark('plaque') + words('London') + '</span>' +
        '</p>' +
      '</div>';
    return true;
  }
