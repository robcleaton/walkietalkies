  /* ---------------------------------------------------------------
     Image lightbox — tap a stop's thumbnail (stopHTML's [data-lightbox]
     button) to see it full-size. Mainly for mobile, where there's no
     hover-to-preview and the 56px thumbnail is otherwise too small to
     make out detail in.
  --------------------------------------------------------------- */
  var lightboxEl = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxTrigger = null;

  /* Photo credit in the lightbox: author, licence and a link to the file
     on Wikimedia Commons, which every stop image comes from. Looked up
     from the Commons API when the image opens (cached per file), so all
     credits stay current with nothing stored in data.js. */
  var lightboxCredit = document.getElementById('lightboxCredit');
  var creditCache = {};
  var creditToken = 0;

  // ".../commons/thumb/a/ab/File.jpg/330px-File.jpg" or ".../commons/a/ab/File.jpg" → "File.jpg"
  function commonsFileName(url) {
    var m = /\/commons\/(?:thumb\/)?[0-9a-f]\/[0-9a-f]{2}\/([^/?#]+)/.exec(url || '');
    if (!m) return null;
    try { return decodeURIComponent(m[1]); } catch (e) { return m[1]; }
  }

  function htmlToText(html) {
    var doc = new DOMParser().parseFromString(String(html || ''), 'text/html');
    return (doc.body.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function creditLink(text, href, hoverClass) {
    var a = document.createElement('a');
    a.href = href; a.target = '_blank'; a.rel = 'noopener';
    a.className = 'underline underline-offset-2 ' + hoverClass;
    a.textContent = text;
    return a;
  }

  // Writes "Photo: author · licence · Wikimedia Commons" into `el`.
  function renderCredit(el, file, info, hoverClass) {
    el.textContent = '';
    var parts = [];
    if (info && info.artist) parts.push(document.createTextNode('Photo: ' + info.artist));
    if (info && info.licence) parts.push(info.licenceUrl ? creditLink(info.licence, info.licenceUrl, hoverClass) : document.createTextNode(info.licence));
    parts.push(creditLink('Wikimedia Commons', 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(file.replace(/ /g, '_')), hoverClass));
    parts.forEach(function (node, i) {
      if (i) el.appendChild(document.createTextNode(' · '));
      el.appendChild(node);
    });
  }

  // The credit for a Commons file, from the API (cached per file); null
  // when offline or blocked.
  function fetchCredit(file) {
    if (creditCache[file]) return Promise.resolve(creditCache[file]);
    return fetch('https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&prop=imageinfo&iiprop=extmetadata' +
          '&iiextmetadatafilter=Artist|LicenseShortName|LicenseUrl&titles=' + encodeURIComponent('File:' + file))
      .then(function (r) { return r.json(); })
      .then(function (j) {
        var page = j && j.query && j.query.pages ? j.query.pages[Object.keys(j.query.pages)[0]] : null;
        var meta = page && page.imageinfo && page.imageinfo[0] && page.imageinfo[0].extmetadata || {};
        var val = function (k) { return meta[k] && meta[k].value || ''; };
        var info = { artist: htmlToText(val('Artist')).slice(0, 120), licence: htmlToText(val('LicenseShortName')), licenceUrl: val('LicenseUrl') };
        creditCache[file] = info;
        return info;
      })
      .catch(function () { return null; });
  }

  // The lightbox's credit line; a newer image opening wins over an older
  // lookup still in flight.
  function loadImageCredit(url) {
    var token = ++creditToken;
    lightboxCredit.textContent = '';
    var file = commonsFileName(url);
    if (!file) return;
    fetchCredit(file).then(function (info) {
      // Offline or blocked (info null): still point to the file's Commons page.
      if (token === creditToken) renderCredit(lightboxCredit, file, info, 'hover:text-white');
    });
  }

  // Any other photo's credit line (the stop page's), into `el`.
  function loadPhotoCredit(el, url) {
    var file = commonsFileName(url);
    if (!el || !file) return;
    fetchCredit(file).then(function (info) {
      if (el.isConnected) renderCredit(el, file, info, 'hover:text-ink');
    });
  }

  function openLightbox(trigger) {
    lightboxTrigger = trigger;
    var name = trigger.getAttribute('data-lightbox-alt') || '';
    // Not every source photo is large enough for the 1200px upscale in
    // data-lightbox — Commons returns a 400 rather than capping at the
    // original size, so fall back to the thumbnail already proven to
    // work (data-lightbox-fallback) if the bigger request fails.
    lightboxImg.onerror = function () {
      lightboxImg.onerror = null;
      lightboxImg.src = trigger.getAttribute('data-lightbox-fallback');
    };
    lightboxImg.src = trigger.getAttribute('data-lightbox');
    lightboxImg.alt = name;
    lightboxCaption.textContent = name;
    loadImageCredit(trigger.getAttribute('data-lightbox-fallback') || trigger.getAttribute('data-lightbox'));
    lightboxEl.classList.remove('hidden');
    lightboxEl.classList.add('flex');
    document.getElementById('lightboxClose').focus();
  }
  function closeLightbox() {
    if (lightboxEl.classList.contains('hidden')) return;
    lightboxEl.classList.add('hidden');
    lightboxEl.classList.remove('flex');
    lightboxImg.src = '';
    lightboxCaption.textContent = '';
    creditToken++;
    lightboxCredit.textContent = '';
    if (lightboxTrigger) { lightboxTrigger.focus(); lightboxTrigger = null; }
  }
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-lightbox]');
    if (trigger) { openLightbox(trigger); return; }
    // Anywhere else inside the open lightbox except the image itself
    // (the close button or the dark backdrop) dismisses it.
    // The credit's links open Commons and the licence without closing it.
    if (e.target.closest('#lightbox') && !e.target.closest('#lightboxImg') && !e.target.closest('#lightboxCredit a')) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lightboxEl.classList.contains('hidden')) closeLightbox();
  });
