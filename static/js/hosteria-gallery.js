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

  if (!modal || !imgEl || triggers.length === 0) return;

  const showImage = () => {
    if (!currentCategory) return;
    const list = galleries[currentCategory] || [];
    if (!list.length) return;
    currentIndex = (currentIndex + list.length) % list.length;
    imgEl.src = list[currentIndex];
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
