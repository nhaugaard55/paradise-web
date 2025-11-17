document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.querySelector("[data-lightbox-gallery]");
    const modal = document.querySelector("[data-lightbox-modal]");
    if (!gallery || !modal) return;

    const images = Array.from(gallery.querySelectorAll("figure img"));
    const modalImg = modal.querySelector("[data-lightbox-image]");
    const modalCaption = modal.querySelector("[data-lightbox-caption]");
    const btnClose = modal.querySelector(".lightbox-close");
    const btnPrev = modal.querySelector(".lightbox-nav.prev");
    const btnNext = modal.querySelector(".lightbox-nav.next");
    let currentIndex = 0;
    let lastFocusedElement = null;

    const focusableSelectors = "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])";
    let focusableEls = [];

    function refreshFocusable() {
        focusableEls = Array.from(modal.querySelectorAll(focusableSelectors));
    }

    function openLightbox(index) {
        currentIndex = index;
        const img = images[currentIndex];
        if (!img) return;
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalCaption.textContent = img.alt || "";
        modal.hidden = false;
        modal.setAttribute("aria-hidden", "false");
        modal.classList.add("is-open");
        lastFocusedElement = document.activeElement;
        refreshFocusable();
        btnClose.focus();
        document.body.style.overscrollBehavior = "contain";
        document.body.style.touchAction = "none";
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        modal.hidden = true;
        modal.setAttribute("aria-hidden", "true");
        modal.classList.remove("is-open");
        modalImg.src = "";
        document.body.style.overscrollBehavior = "";
        document.body.style.touchAction = "";
        document.body.style.overflow = "";
        if (lastFocusedElement) lastFocusedElement.focus();
    }

    function showNext(direction = 1) {
        currentIndex = (currentIndex + direction + images.length) % images.length;
        const img = images[currentIndex];
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalCaption.textContent = img.alt || "";
    }


    gallery.addEventListener("click", (event) => {
        const figure = event.target.closest("figure");
        if (!figure) return;
        const targetImg = figure.querySelector("img");
        const index = images.indexOf(targetImg);
        if (index >= 0) openLightbox(index);
    });

    gallery.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        const figure = event.target.closest("figure");
        if (!figure) return;
        event.preventDefault();
        const targetImg = figure.querySelector("img");
        const index = images.indexOf(targetImg);
        if (index >= 0) openLightbox(index);
    });

    btnClose.addEventListener("click", closeLightbox);
    btnPrev.addEventListener("click", () => showNext(-1));
    btnNext.addEventListener("click", () => showNext(1));

    modal.addEventListener("click", (event) => {
        if (event.target === modal) closeLightbox();
    });

    document.addEventListener("keydown", (event) => {
        if (modal.hidden) return;
        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowLeft") showNext(-1);
        if (event.key === "ArrowRight") showNext(1);
    });

    // Focus trap
    modal.addEventListener("keydown", (event) => {
        if (event.key !== "Tab") return;
        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];

        if (event.shiftKey) {
            if (document.activeElement === firstEl) {
                event.preventDefault();
                lastEl.focus();
            }
        } else {
            if (document.activeElement === lastEl) {
                event.preventDefault();
                firstEl.focus();
            }
        }
    });
});
