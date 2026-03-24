document.addEventListener('DOMContentLoaded', () => {
  const galleries = window.hosteriaGalleries || {};

  const modal = document.getElementById('room-gallery-modal');
  const backdrop = modal?.querySelector('.room-gallery-modal__backdrop');
  const closeBtn = modal?.querySelector('.room-gallery-modal__close');
  const imgEl = modal?.querySelector('#room-gallery-image');
  const prevBtn = modal?.querySelector('.room-gallery-modal__nav--prev');
  const nextBtn = modal?.querySelector('.room-gallery-modal__nav--next');
  const triggers = document.querySelectorAll('.room-photos-btn');

  let currentCategory = null;
  let currentIndex = 0;
  const preloadCache = new Map();

  if (!modal || !imgEl || triggers.length === 0) return;

  imgEl.decoding = 'async';

  const preloadImage = (src) => {
    if (!src) return Promise.resolve();
    if (preloadCache.has(src)) return preloadCache.get(src);

    const loader = new Image();
    loader.decoding = 'async';

    const ready = new Promise((resolve) => {
      const finish = () => resolve();
      loader.addEventListener('load', finish, { once: true });
      loader.addEventListener('error', finish, { once: true });
      loader.src = src;
      if (loader.complete) resolve();
    });

    preloadCache.set(src, ready);
    return ready;
  };

  const warmCategory = (category) => {
    const list = galleries[category] || [];
    list.slice(0, 3).forEach(preloadImage);
  };

  const preloadNearby = () => {
    if (!currentCategory) return;
    const list = galleries[currentCategory] || [];
    if (!list.length) return;

    preloadImage(list[currentIndex]);
    preloadImage(list[(currentIndex + 1) % list.length]);
    preloadImage(list[(currentIndex - 1 + list.length) % list.length]);

    if (list.length > 3) {
      preloadImage(list[(currentIndex + 2) % list.length]);
    }
  };

  const showImage = () => {
    if (!currentCategory) return;
    const list = galleries[currentCategory] || [];
    if (!list.length) return;
    currentIndex = (currentIndex + list.length) % list.length;
    const nextSrc = list[currentIndex];
    if (imgEl.src !== nextSrc) {
      imgEl.src = nextSrc;
    }
    preloadNearby();
  };

  const openModal = (category) => {
    currentCategory = category;
    currentIndex = 0;
    showImage();
    modal.removeAttribute('hidden');
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('hidden', 'true');
    document.body.style.overflow = '';
  };

  triggers.forEach((btn) => {
    const warm = () => {
      const category = btn.dataset.gallery;
      if (!category) return;
      warmCategory(category);
    };

    btn.addEventListener('pointerenter', warm, { passive: true });
    btn.addEventListener('focus', warm);
    btn.addEventListener('touchstart', warm, { passive: true });
    btn.addEventListener('click', () => {
      const category = btn.dataset.gallery;
      if (!galleries[category]?.length) return;
      openModal(category);
    });
  });

  prevBtn?.addEventListener('click', () => {
    currentIndex -= 1;
    showImage();
  });

  nextBtn?.addEventListener('click', () => {
    currentIndex += 1;
    showImage();
  });

  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') {
      currentIndex += 1;
      showImage();
    }
    if (e.key === 'ArrowLeft') {
      currentIndex -= 1;
      showImage();
    }
  });
});
