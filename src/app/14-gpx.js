  // GPX export, when the viewer can save files
  if (window.claude && typeof window.claude.use === 'function') {
    window.claude.use('downloads').then(function (dl) {
      if (!dl) return;
      var btn = document.getElementById('gpxBtn');
      btn.classList.remove('hidden');
      renderRoute(); // re-show the actions bar now it has a button in it
      btn.addEventListener('click', function () {
        var mapped = route.filter(function (id) { return hasLoc(byId[id]); });
        if (!mapped.length) return; // GPX needs coordinates; unmapped stops are left out
        var gpx = '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<gpx version="1.1" creator="WalkieTalkies" xmlns="http://www.topografix.com/GPX/1/1">\n' +
          '  <metadata><name>WalkieTalkies</name></metadata>\n' +
          mapped.map(function (id) {
            var s = byId[id], i = route.indexOf(id);
            return '  <wpt lat="' + s.lat + '" lon="' + s.lon + '">\n' +
                   '    <name>' + (i + 1) + '. ' + esc(plain(s.name)) + '</name>\n' +
                   '    <desc>' + esc(plain(s.area) + ', ' + s.pc) + '</desc>\n' +
                   '  </wpt>\n';
          }).join('') +
          '  <rte><name>WalkieTalkies</name>\n' +
          mapped.map(function (id) {
            var s = byId[id];
            return '    <rtept lat="' + s.lat + '" lon="' + s.lon + '"><name>' + esc(plain(s.name)) + '</name></rtept>\n';
          }).join('') +
          '  </rte>\n</gpx>\n';
        btn.textContent = 'Saving…';
        dl.save({ filename: 'walkietalkies-route.gpx', data: gpx })
          .then(function () { btn.textContent = 'Saved'; })
          .catch(function (err) { btn.textContent = (err && err.code === 'declined') ? 'Save as GPX' : 'Save unavailable'; })
          .then(function () { setTimeout(function () { btn.textContent = 'Save as GPX'; }, 2200); });
      });
    }).catch(function () {});
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
