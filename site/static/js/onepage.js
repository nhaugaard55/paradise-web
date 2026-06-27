(function () {
  function ready(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  ready(function () {
    var header = document.querySelector('.navbar');
    var navMenu = document.getElementById('primary-menu');
    var navToggle = document.querySelector('.nav-toggle');
    var scrollLinks = document.querySelectorAll('a[data-scroll]');
    var navLinks = document.querySelectorAll('.nav-links a[data-scroll]');
    var currentLang = document.documentElement.getAttribute('lang') || 'es';
    var headerOffset = 0;

    var esToEn = {
      home: 'home',
      nosotros: 'about',
      restaurante: 'restaurant',
      hosteria: 'lodging',
      excursiones: 'excursions',
      contacto: 'contact'
    };

    var enToEs = {};
    Object.keys(esToEn).forEach(function (key) {
      enToEs[esToEn[key]] = key;
    });

    function updateOffset() {
      var height = header ? header.offsetHeight : 0;
      headerOffset = height + 12;
      document.documentElement.style.setProperty('--nav-offset', headerOffset + 'px');
    }

    function closeMenu() {
      if (navMenu) {
        navMenu.classList.remove('is-open');
      }
      if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }

    function scrollToHash(hash, updateHistory) {
      if (!hash || hash.charAt(0) !== '#') {
        return;
      }
      var target = document.querySelector(hash);
      if (!target) {
        return;
      }
      var targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: 'smooth'
      });
      if (updateHistory) {
        history.replaceState(null, '', hash);
      }
    }

    function normalizeHashForPage(hashValue) {
      if (!hashValue) {
        return '';
      }
      var clean = hashValue.replace('#', '');
      if (!clean) {
        return '';
      }
      if (document.querySelector('#' + clean)) {
        return '#' + clean;
      }
      if (currentLang === 'en' && enToEs[clean]) {
        return '#' + esToEn[enToEs[clean]];
      }
      if (currentLang !== 'en' && esToEn[clean]) {
        return '#' + clean;
      }
      if (currentLang !== 'en' && enToEs[clean]) {
        return '#' + enToEs[clean];
      }
      if (currentLang === 'en' && esToEn[clean]) {
        return '#' + esToEn[clean];
      }
      return '';
    }

    updateOffset();
    window.addEventListener('resize', function () {
      window.requestAnimationFrame(updateOffset);
    });

    scrollLinks.forEach(function (link) {
      link.addEventListener('click', function (event) {
        var href = link.getAttribute('href');
        if (!href || href.charAt(0) !== '#') {
          return;
        }
        event.preventDefault();
        scrollToHash(href, true);
        closeMenu();
        if (link.closest('.nav-links')) {
          navLinks.forEach(function (navLink) {
            navLink.classList.toggle('is-active', navLink === link);
          });
        }
      });
    });

    if (window.location.hash) {
      var normalized = normalizeHashForPage(window.location.hash);
      var hashToUse = normalized || window.location.hash;
      if (normalized && normalized !== window.location.hash) {
        history.replaceState(null, '', normalized);
      }
      setTimeout(function () {
        scrollToHash(hashToUse);
      }, 60);
    }

    // ── Scroll Spy ────────────────────────────────────────────────
    // Mueve el indicador activo del navbar según la sección visible.
    if ('IntersectionObserver' in window) {
      var sectionMap = {};
      navLinks.forEach(function (link) {
        var href = link.getAttribute('href');
        if (href && href.charAt(0) === '#') {
          var el = document.getElementById(href.slice(1));
          if (el) sectionMap[href.slice(1)] = link;
        }
      });

      var spyIds = Object.keys(sectionMap);
      if (spyIds.length) {
        var intersecting = {};
        var spyActiveId = null;

        function applySpyActive() {
          var visible = spyIds.filter(function (id) { return intersecting[id]; });
          if (!visible.length) return;
          var best = visible.reduce(function (a, b) {
            var aTop = document.getElementById(a).getBoundingClientRect().top;
            var bTop = document.getElementById(b).getBoundingClientRect().top;
            return Math.abs(aTop - headerOffset) <= Math.abs(bTop - headerOffset) ? a : b;
          });
          if (best === spyActiveId) return;
          spyActiveId = best;
          spyIds.forEach(function (id) {
            sectionMap[id].classList.toggle('is-active', id === best);
          });
        }

        var spyObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            intersecting[entry.target.id] = entry.isIntersecting;
          });
          applySpyActive();
        }, {
          rootMargin: '-' + Math.round(headerOffset || 96) + 'px 0px -45% 0px',
          threshold: 0
        });

        spyIds.forEach(function (id) { spyObserver.observe(document.getElementById(id)); });
      }
    }

    var langLinks = document.querySelectorAll('[data-lang-link]');
    langLinks.forEach(function (link) {
      link.addEventListener('click', function (event) {
        var targetLang = link.getAttribute('data-lang-link');
        if (!targetLang || targetLang === currentLang) {
          return;
        }
        event.preventDefault();
        var current = (window.location.hash || '').replace('#', '');
        if (!current) {
          var activeNav = document.querySelector('.nav-links a.is-active');
          if (activeNav) {
            var activeHref = activeNav.getAttribute('href');
            if (activeHref && activeHref.charAt(0) === '#') {
              current = activeHref.substring(1);
            }
          }
        }
        if (!current) {
          current = 'home';
        }

        var targetHash = 'home';
        if (targetLang === 'en') {
          targetHash = esToEn[current] || esToEn[enToEs[current]] || esToEn[targetHash];
        } else {
          targetHash = enToEs[current] || enToEs[esToEn[current]] || enToEs[targetHash];
        }

        var basePath = targetLang === 'en' ? '/en/' : '/es/';
        window.location.href = basePath + '#' + targetHash;
      });
    });
  });
})();
