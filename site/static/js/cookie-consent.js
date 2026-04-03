(function () {
  var KEY    = 'paradise-cookie-consent';
  var GTM_ID = 'GTM-58H9QFXT';

  function loadGTM() {
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      var f  = d.getElementsByTagName(s)[0];
      var j  = d.createElement(s);
      var dl = l !== 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src   = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', GTM_ID);
  }

  var stored = localStorage.getItem(KEY);

  if (stored === 'accepted') { loadGTM(); return; }
  if (stored === 'rejected') { return; }

  // No decision yet — build and show the banner
  var lang = (document.documentElement.getAttribute('lang') || 'es').toLowerCase();
  var isEn = lang.startsWith('en');

  var banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', isEn ? 'Cookie consent' : 'Consentimiento de cookies');

  banner.innerHTML = isEn
    ? '<p>We use cookies to analyze traffic and improve your experience.</p>'
        + '<div class="cookie-actions">'
        + '<button id="cookie-reject" class="cookie-btn cookie-btn--reject">Reject</button>'
        + '<button id="cookie-accept" class="cookie-btn cookie-btn--accept">Accept</button>'
        + '</div>'
    : '<p>Usamos cookies para analizar el tráfico y mejorar tu experiencia.</p>'
        + '<div class="cookie-actions">'
        + '<button id="cookie-reject" class="cookie-btn cookie-btn--reject">Rechazar</button>'
        + '<button id="cookie-accept" class="cookie-btn cookie-btn--accept">Aceptar</button>'
        + '</div>';

  document.body.appendChild(banner);

  document.getElementById('cookie-accept').addEventListener('click', function () {
    localStorage.setItem(KEY, 'accepted');
    banner.remove();
    loadGTM();
  });

  document.getElementById('cookie-reject').addEventListener('click', function () {
    localStorage.setItem(KEY, 'rejected');
    banner.remove();
  });
})();
