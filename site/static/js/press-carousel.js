(function () {
  'use strict';

  document.querySelectorAll('[data-press-carousel]').forEach(function (carousel) {
    var track = carousel.querySelector('[data-press-track]');
    var originalSet = carousel.querySelector('[data-press-set]');
    var shell = carousel.closest('.press-carousel-shell');
    var previousButton = shell && shell.querySelector('[data-press-prev]');
    var nextButton = shell && shell.querySelector('[data-press-next]');

    if (!track || !originalSet) return;

    function createClone() {
      var clone = originalSet.cloneNode(true);
      clone.removeAttribute('data-press-set');
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('a').forEach(function (link) {
        link.setAttribute('tabindex', '-1');
      });
      return clone;
    }

    track.prepend(createClone());
    track.appendChild(createClone());

    var paused = false;
    var resumeTimer;
    var lastTime = 0;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function setWidth() {
      return originalSet.getBoundingClientRect().width;
    }

    function normalizePosition() {
      var width = setWidth();
      if (!width) return;
      var maxScroll = carousel.scrollWidth - carousel.clientWidth;
      var rightBoundary = Math.min(width * 2, maxScroll);
      if (carousel.scrollLeft >= rightBoundary - 1) carousel.scrollLeft -= width;
      if (carousel.scrollLeft <= 0) carousel.scrollLeft += width;
    }

    function pauseTemporarily() {
      paused = true;
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(function () { paused = false; }, 1800);
    }

    function move(direction) {
      pauseTemporarily();
      var card = originalSet.querySelector('.press-card');
      var gap = parseFloat(window.getComputedStyle(originalSet).gap) || 0;
      var distance = card ? card.getBoundingClientRect().width + gap : carousel.clientWidth * 0.8;
      carousel.scrollBy({ left: direction * distance, behavior: 'smooth' });
    }

    function animate(time) {
      if (!lastTime) lastTime = time;
      var elapsed = Math.min(time - lastTime, 32);
      lastTime = time;
      if (!paused && !reduceMotion) {
        carousel.scrollLeft += elapsed * 0.022;
        normalizePosition();
      }
      window.requestAnimationFrame(animate);
    }

    carousel.scrollLeft = setWidth();
    window.requestAnimationFrame(animate);

    carousel.addEventListener('pointerenter', function (event) {
      if (event.pointerType !== 'touch') paused = true;
    });
    carousel.addEventListener('pointerleave', function (event) {
      if (event.pointerType !== 'touch') paused = false;
    });
    carousel.addEventListener('pointerdown', function () {
      paused = true;
      window.clearTimeout(resumeTimer);
    });
    carousel.addEventListener('pointerup', pauseTemporarily);
    carousel.addEventListener('touchend', pauseTemporarily, { passive: true });
    carousel.addEventListener('focusin', function () { paused = true; });
    carousel.addEventListener('focusout', function () { paused = false; });
    carousel.addEventListener('scroll', normalizePosition, { passive: true });
    window.addEventListener('resize', normalizePosition);

    if (previousButton) previousButton.addEventListener('click', function () { move(-1); });
    if (nextButton) nextButton.addEventListener('click', function () { move(1); });
  });
})();
