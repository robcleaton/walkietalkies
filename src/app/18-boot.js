  /* ---------------------------------------------------------------
     Boot
  --------------------------------------------------------------- */
  document.getElementById('footerYear').textContent = new Date().getFullYear();
  renderList();
  renderRoute();

  (function initFromURL() {
    var params = new URLSearchParams(location.search);
    if (params.get('near') === null) applyLocation();
    else {
      // Arrived from Your route's Use my location on another page.
      history.replaceState(null, '', location.pathname);
      setTimeout(goToNearYou, 0);
    }
  })();
