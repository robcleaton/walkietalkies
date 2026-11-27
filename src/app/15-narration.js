  /* ---------------------------------------------------------------
     Narration — Kokoro MP3s made by scripts/kokoro (plan.js + run.sh).
     assets/audio/manifest.json lists which stops have one; those cards
     get a Listen button. One shared <audio>, so starting a stop stops
     whatever was playing before.
  --------------------------------------------------------------- */
  var narrationFiles = {}; // stop id → manifest entry
  var narrationAudio = new Audio();
  narrationAudio.preload = 'none';
  var narrationId = null; // stop currently loaded into narrationAudio

  // Lucide play / pause, filled.
  var ICON_PLAY = '<svg class="lucide lucide-play w-3.5 h-3.5 translate-x-px" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg>';
  var ICON_PAUSE = '<svg class="lucide lucide-pause w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/></svg>';

  function isNarrating(id) { return narrationId === id && !narrationAudio.paused; }

  function listenButtonInner(id) {
    // Icon only — the button's aria-label carries the words.
    return isNarrating(id) ? ICON_PAUSE : ICON_PLAY;
  }

  // small: the compact version for the route panel's stop list.
  function listenButtonHTML(s, small) {
    if (!narrationFiles[s.id]) return '';
    var playing = isNarrating(s.id);
    return '<button type="button" data-listen="' + s.id + '" data-tooltip="' + (playing ? 'Pause' : 'Listen') + '" aria-pressed="' + playing + '" aria-label="' + (playing ? 'Pause' : 'Listen to') + ' ' + plain(s.name) + '" ' +
      'class="shrink-0 inline-flex items-center justify-center ' + (small ? 'w-10 h-10' : 'w-9 h-9') + ' rounded-full border border-rule text-ink hover:border-ink transition-colors">' +
      listenButtonInner(s.id) +
    '</button>';
  }

  // Updates every Listen button in place rather than re-rendering the
  // lists, so carousels keep their scroll position while audio plays.
  /* Playbar — elapsed time, a seekable track and the clip's length, shown
     under a route stop's name (Your route panel only, not on the cards)
     while that stop is loaded: playing, paused part-way, or still on the
     signature (held at 0:00 until the clip itself starts). */
  function fmtTime(t) {
    if (!isFinite(t) || t < 0) t = 0;
    var m = Math.floor(t / 60), sec = Math.floor(t % 60);
    return m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  function playbarState(id) {
    var active = narrationId === id;
    var clip = active && !inSignature;
    var dur = clip ? narrationAudio.duration : NaN;
    var at = clip ? narrationAudio.currentTime : 0;
    return { active: active, at: at, dur: dur, frac: isFinite(dur) && dur > 0 ? Math.min(1, at / dur) : 0 };
  }

  // card: the slim version pinned in a stop card's bottom padding (styles.css
  // .playbar--card), so the card never changes height. 'inline': the stop
  // page's, at the start of its row of actions, sliding them right as it
  // opens (.playbar--inline).
  function playbarHTML(s, card) {
    if (!narrationFiles[s.id]) return '';
    var st = playbarState(s.id);
    var mod = card === 'inline' ? ' playbar--inline' : card ? ' playbar--card' : '';
    return '<div data-playbar="' + s.id + '" class="playbar' + mod + '"' + (st.active ? '' : ' hidden') + '>' +
      '<span data-pb-at class="num">' + fmtTime(st.at) + '</span>' +
      '<div data-pb-track role="slider" tabindex="0" aria-label="Seek ' + plain(s.name) + '" aria-valuemin="0" aria-valuemax="' + Math.round(st.dur || 0) + '" aria-valuenow="' + Math.round(st.at) + '" class="playbar__track">' +
        '<div data-pb-fill class="playbar__fill" style="transform:scaleX(' + st.frac + ')"></div>' +
      '</div>' +
      '<span data-pb-dur class="num">' + (isFinite(st.dur) ? fmtTime(st.dur) : '–:––') + '</span>' +
    '</div>';
  }

  function updatePlaybars() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-playbar]'), function (bar) {
      var st = playbarState(bar.getAttribute('data-playbar'));
      bar.hidden = !st.active;
      if (!st.active) return;
      bar.querySelector('[data-pb-fill]').style.transform = 'scaleX(' + st.frac + ')';
      bar.querySelector('[data-pb-at]').textContent = fmtTime(st.at);
      bar.querySelector('[data-pb-dur]').textContent = isFinite(st.dur) ? fmtTime(st.dur) : '–:––';
      var track = bar.querySelector('[data-pb-track]');
      track.setAttribute('aria-valuemax', String(Math.round(st.dur || 0)));
      track.setAttribute('aria-valuenow', String(Math.round(st.at)));
      track.setAttribute('aria-valuetext', fmtTime(st.at) + ' of ' + (isFinite(st.dur) ? fmtTime(st.dur) : 'unknown'));
    });
  }

  // timeupdate only fires ~4 times a second; a frame loop while playing
  // keeps the fill moving smoothly.
  var playbarFrame = null;
  function playbarLoop() {
    updatePlaybars();
    playbarFrame = narrationAudio.paused ? null : requestAnimationFrame(playbarLoop);
  }
  narrationAudio.addEventListener('play', function () { if (!playbarFrame) playbarFrame = requestAnimationFrame(playbarLoop); });
  ['pause', 'ended', 'timeupdate', 'loadedmetadata', 'durationchange', 'seeked', 'emptied'].forEach(function (ev) {
    narrationAudio.addEventListener(ev, updatePlaybars);
  });

  // Seeking: tap or drag along the track (once the clip itself is
  // playing — not during the signature), or arrow keys for 5s steps.
  // Needs the server to support range requests (GitHub Pages does;
  // python -m http.server doesn't, and there a seek would restart the clip).
  function seekableTrack(track) {
    var bar = track.closest('[data-playbar]');
    var sk = narrationAudio.seekable;
    return bar && bar.getAttribute('data-playbar') === narrationId && !inSignature &&
      isFinite(narrationAudio.duration) && sk.length && sk.end(sk.length - 1) > 0 ? track : null;
  }
  function seekTo(track, clientX) {
    var r = track.getBoundingClientRect();
    var frac = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    narrationAudio.currentTime = frac * narrationAudio.duration;
    updatePlaybars();
  }
  var seekingTrack = null;
  document.addEventListener('pointerdown', function (e) {
    var track = e.target.closest('[data-pb-track]');
    if (!track || !seekableTrack(track)) return;
    e.preventDefault();
    seekingTrack = track;
    track.setPointerCapture(e.pointerId);
    seekTo(track, e.clientX);
  });
  document.addEventListener('pointermove', function (e) {
    if (seekingTrack) seekTo(seekingTrack, e.clientX);
  });
  document.addEventListener('pointerup', function () { seekingTrack = null; });
  document.addEventListener('pointercancel', function () { seekingTrack = null; });
  document.addEventListener('keydown', function (e) {
    var track = e.target.closest && e.target.closest('[data-pb-track]');
    if (!track || !seekableTrack(track)) return;
    var step = { ArrowRight: 5, ArrowUp: 5, ArrowLeft: -5, ArrowDown: -5 }[e.key];
    if (step === undefined) return;
    e.preventDefault();
    narrationAudio.currentTime = Math.max(0, Math.min(narrationAudio.duration, narrationAudio.currentTime + step));
    updatePlaybars();
  });

  function syncListenButtons() {
    syncRoutePlaying();
    Array.prototype.forEach.call(document.querySelectorAll('[data-listen]'), function (btn) {
      var id = btn.getAttribute('data-listen');
      var playing = isNarrating(id);
      btn.innerHTML = listenButtonInner(id);
      btn.setAttribute('aria-pressed', String(playing));
      btn.setAttribute('aria-label', (playing ? 'Pause' : 'Listen to') + ' ' + plain((byId[id] && byId[id].name) || ''));
      btn.setAttribute('data-tooltip', playing ? 'Pause' : 'Listen');
    });
    updatePlaybars();
  }

  // The WalkieTalkies signature sound plays before every clip. It goes
  // through the same <audio> as the narration (swapping src when it ends)
  // rather than a second element, because mobile Safari only lets an
  // element play without a tap once a tap has started it.
  var SIGNATURE_SRC = 'assets/signature.mp3?v=3'; // bump v when the file changes
  var inSignature = false; // narrationAudio is playing the signature, the clip comes next

  function narrationSrc(id) {
    var f = narrationFiles[id];
    // file is the clip's path under assets/audio (kokoro/<area>/<id>.mp3);
    // fileHash, a hash of the file itself, busts the cache when it changes.
    return 'assets/audio/' + f.file + '?v=' + (f.fileHash || '');
  }

  function playNarration() {
    updateMediaSession();
    narrationAudio.play().catch(function () { syncListenButtons(); });
  }

  // Lock screen / Control Centre: the stop's title, area and thumbnail,
  // with play, pause and seek wired to the same <audio>. Set again on
  // every play because iOS can drop the metadata when the src changes
  // (signature → clip).
  var mediaSession = 'mediaSession' in navigator ? navigator.mediaSession : null;
  var entityDecoder = document.createElement('textarea');
  function decodeEntities(str) { entityDecoder.innerHTML = str; return entityDecoder.value; }

  function updateMediaSession() {
    if (!mediaSession || !window.MediaMetadata) return;
    var s = byId[narrationId];
    if (!s) { mediaSession.metadata = null; return; }
    var artwork = [];
    if (s.img) artwork.push({ src: s.img, sizes: '330x330', type: /\.png$/i.test(s.img) ? 'image/png' : 'image/jpeg' });
    artwork.push({ src: 'assets/walkietalkies-apple-touch-icon.png', sizes: '180x180', type: 'image/png' });
    mediaSession.metadata = new MediaMetadata({
      title: decodeEntities(s.name),
      artist: 'WalkieTalkies',
      album: decodeEntities(s.area || ''),
      artwork: artwork
    });
  }

  function updateMediaPosition() {
    if (!mediaSession || !mediaSession.setPositionState) return;
    var d = narrationAudio.duration;
    try {
      if (inSignature || !isFinite(d) || d <= 0) mediaSession.setPositionState();
      else mediaSession.setPositionState({ duration: d, playbackRate: narrationAudio.playbackRate || 1, position: Math.min(narrationAudio.currentTime, d) });
    } catch (e) { /* older browsers reject an empty or partial state */ }
  }

  if (mediaSession) {
    var mediaAction = function (name, fn) {
      try { mediaSession.setActionHandler(name, fn); } catch (e) { /* action not supported */ }
    };
    mediaAction('play', function () { if (narrationId) playNarration(); });
    mediaAction('pause', function () { narrationAudio.pause(); });
    mediaAction('seekto', function (d) {
      if (inSignature || !isFinite(narrationAudio.duration)) return;
      narrationAudio.currentTime = Math.max(0, Math.min(narrationAudio.duration, d.seekTime));
      updateMediaPosition();
    });
    var mediaSkip = function (sign) {
      return function (d) {
        if (inSignature || !isFinite(narrationAudio.duration)) return;
        var step = (d && d.seekOffset) || 10;
        narrationAudio.currentTime = Math.max(0, Math.min(narrationAudio.duration, narrationAudio.currentTime + sign * step));
        updateMediaPosition();
      };
    };
    mediaAction('seekbackward', mediaSkip(-1));
    mediaAction('seekforward', mediaSkip(1));
    ['loadedmetadata', 'play', 'pause', 'seeked', 'ratechange'].forEach(function (ev) {
      narrationAudio.addEventListener(ev, updateMediaPosition);
    });
    narrationAudio.addEventListener('play', function () { mediaSession.playbackState = 'playing'; });
    narrationAudio.addEventListener('pause', function () { mediaSession.playbackState = 'paused'; });
    narrationAudio.addEventListener('ended', function () {
      if (inSignature) return; // still going: the clip follows the signature
      mediaSession.playbackState = 'none';
      mediaSession.metadata = null;
    });
  }

  // Signature over (or failed to load): on to the stop's clip.
  function startClipAfterSignature() {
    inSignature = false;
    narrationAudio.src = narrationSrc(narrationId);
    playNarration();
  }

  function toggleNarration(id) {
    if (isNarrating(id)) { narrationAudio.pause(); return; }
    // A new stop, or one that played to the end, starts again with the
    // signature; a paused one resumes where it was (signature or clip).
    if (narrationId !== id) {
      narrationId = id;
      inSignature = true;
      trackItem('listen_start', id); // fresh starts only, not resumes after pause
      narrationAudio.src = SIGNATURE_SRC;
    }
    playNarration();
  }

  // Registered before syncListenButtons so the buttons never flash back
  // to Play in the gap between the signature and the clip.
  narrationAudio.addEventListener('ended', function () {
    if (inSignature) startClipAfterSignature();
    else {
      trackItem('listen_complete', narrationId);
      narrationId = null; // finished — the next Listen starts from the signature
    }
  });
  narrationAudio.addEventListener('error', function () {
    if (inSignature) startClipAfterSignature();
  });
  ['play', 'pause', 'ended', 'error'].forEach(function (ev) {
    narrationAudio.addEventListener(ev, syncListenButtons);
  });

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-listen]');
    if (b) toggleNarration(b.getAttribute('data-listen'));
  });

  fetch('assets/audio/manifest.json', { cache: 'no-cache' })
    .then(function (r) { return r.ok ? r.json() : {}; })
    .then(function (m) {
      narrationFiles = m || {};
      if (Object.keys(narrationFiles).length) {
        renderList(); renderRoute();
        // Warm the cache so the first Listen doesn't wait on the signature.
        fetch(SIGNATURE_SRC).catch(function () {});
      }
    })
    .catch(function () { /* no narration yet — cards just don't get a Listen button */ });
