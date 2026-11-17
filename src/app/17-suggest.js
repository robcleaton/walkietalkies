  /* ---------------------------------------------------------------
     Suggest a stop — the "Nothing matches" search state's button opens
     #suggestDialog. There's no backend, so sending builds a mailto: to
     SUGGEST_EMAIL and hands it to the visitor's email app.
  --------------------------------------------------------------- */
  // TODO: set the address suggestions should go to (it is public in the page source).
  var SUGGEST_EMAIL = 'SUGGEST_EMAIL_HERE';

  var suggestDialog = document.getElementById('suggestDialog');
  var suggestForm = document.getElementById('suggestForm');
  var suggestError = document.getElementById('suggestError');
  var suggestTrigger = null;
  var suggestQuery = '';

  function openSuggest(trigger) {
    suggestTrigger = trigger;
    suggestQuery = filters.q || '';
    suggestForm.reset();
    suggestError.classList.add('hidden');
    Array.prototype.forEach.call(suggestForm.elements, function (el) { el.removeAttribute('aria-invalid'); });
    if (typeof suggestDialog.showModal === 'function') suggestDialog.showModal();
    else suggestDialog.setAttribute('open', '');
    suggestForm.elements.url.focus();
  }
  function closeSuggest() {
    if (suggestDialog.open) suggestDialog.close();
  }
  suggestDialog.addEventListener('close', function () {
    if (suggestTrigger && document.contains(suggestTrigger)) suggestTrigger.focus();
    suggestTrigger = null;
  });
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-suggest-stop]');
    if (t) { openSuggest(t); return; }
    if (e.target.closest('[data-suggest-close]')) { closeSuggest(); return; }
    // A click on the backdrop lands on the <dialog> itself.
    if (e.target === suggestDialog) closeSuggest();
  });

  suggestForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = suggestForm.elements;
    var firstBad = null;
    ['url', 'description', 'email'].forEach(function (name) {
      var el = f[name];
      el.value = el.value.trim();
      var bad = !el.checkValidity();
      if (bad) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid');
      if (bad && !firstBad) firstBad = el;
    });
    if (firstBad) {
      suggestError.textContent = !f.url.checkValidity() ? 'Add a link starting with https://' :
        !f.description.checkValidity() ? 'Add a short description.' : 'Add a valid email address.';
      suggestError.classList.remove('hidden');
      firstBad.focus();
      return;
    }
    suggestError.classList.add('hidden');
    var subject = 'WalkieTalkies stop suggestion' + (suggestQuery ? ': ' + suggestQuery : '');
    var body =
      'Link: ' + f.url.value + '\n\n' +
      'Description:\n' + f.description.value + '\n\n' +
      'Email: ' + f.email.value + '\n' +
      (suggestQuery ? 'Searched for: ' + suggestQuery + '\n' : '');
    location.href = 'mailto:' + SUGGEST_EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
    closeSuggest();
  });
