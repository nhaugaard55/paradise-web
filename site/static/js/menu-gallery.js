document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector("[data-menu-toggle]");
    const coverCard = document.querySelector("[data-menu-cover]");
    const gallery = document.querySelector("[data-menu-gallery]");
    const mainImage = gallery?.querySelector("[data-menu-main-image]");
    const caption = gallery?.querySelector("[data-menu-caption]");
    const prevBtn = gallery?.querySelector("[data-menu-prev]");
    const nextBtn = gallery?.querySelector("[data-menu-next]");
    const thumbnails = gallery ? Array.from(gallery.querySelectorAll("[data-menu-thumb]")) : [];

    if (!toggleBtn || !gallery || !mainImage || !caption || !prevBtn || !nextBtn || !thumbnails.length) return;

    const pages = thumbnails
        .map((thumb, index) => ({
            src: thumb.getAttribute("data-src"),
            alt: thumb.getAttribute("data-alt") || `Carta The Paradise – página ${index + 1}`,
        }))
        .filter((page) => !!page.src);

    if (!pages.length) return;

    const lightbox = document.querySelector("[data-menu-lightbox]");
    const lightboxImg = lightbox?.querySelector("[data-menu-lightbox-image]");
    const lightboxCaption = lightbox?.querySelector("[data-menu-lightbox-caption]");
    const lightboxPrev = lightbox?.querySelector("[data-menu-lightbox-prev]");
    const lightboxNext = lightbox?.querySelector("[data-menu-lightbox-next]");
    const lightboxClose = lightbox?.querySelector("[data-menu-lightbox-close]");

    let currentIndex = 0;
    let lastFocusedElement = null;

    const focusableSelectors = "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])";
    let focusableEls = [];

    function refreshFocusable() {
        if (!lightbox) return;
        focusableEls = Array.from(lightbox.querySelectorAll(focusableSelectors));
    }

    function updateGallery(index) {
        currentIndex = (index + pages.length) % pages.length;
        const page = pages[currentIndex];
        mainImage.src = page.src;
        mainImage.alt = page.alt;
        caption.textContent = `Página ${currentIndex + 1} de ${pages.length}`;
        thumbnails.forEach((thumb, idx) => {
            const isActive = idx === currentIndex;
            thumb.classList.toggle("is-active", isActive);
            thumb.setAttribute("aria-current", isActive ? "true" : "false");
        });
        syncLightboxImage();
    }

    function revealGallery() {
        const wasHidden = gallery.hasAttribute("hidden");
        coverCard?.setAttribute("hidden", "");
        gallery.removeAttribute("hidden");
        gallery.classList.remove("is-collapsed", "collapsed");
        if (wasHidden) {
            updateGallery(currentIndex);
        }
        gallery.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function syncLightboxImage() {
        if (!lightbox || lightbox.hasAttribute("hidden")) return;
        const page = pages[currentIndex];
        lightboxImg.src = page.src;
        lightboxImg.alt = page.alt;
        if (lightboxCaption) {
            lightboxCaption.textContent = page.alt;
        }
    }

    function openLightbox() {
        if (!lightbox || !lightboxImg || !lightboxClose) return;
        syncLightboxImage();
        lightbox.removeAttribute("hidden");
        lightbox.setAttribute("aria-hidden", "false");
        lightbox.classList.add("is-open");
        lastFocusedElement = document.activeElement;
        refreshFocusable();
        lightboxClose.focus();
        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.setAttribute("hidden", "");
        lightbox.setAttribute("aria-hidden", "true");
        lightbox.classList.remove("is-open");
        if (lightboxImg) lightboxImg.src = "";
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
        if (lastFocusedElement) lastFocusedElement.focus();
    }

    toggleBtn.addEventListener("click", (event) => {
        event.preventDefault();
        if (gallery.hasAttribute("hidden")) {
            revealGallery();
        } else {
            gallery.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });

    prevBtn.addEventListener("click", () => updateGallery(currentIndex - 1));
    nextBtn.addEventListener("click", () => updateGallery(currentIndex + 1));

    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener("click", () => updateGallery(index));
    });

    mainImage.addEventListener("click", openLightbox);
    mainImage.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openLightbox();
        }
    });

    if (lightbox) {
        lightbox.addEventListener("click", (event) => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        lightboxClose?.addEventListener("click", closeLightbox);
        lightboxPrev?.addEventListener("click", () => {
            updateGallery(currentIndex - 1);
            syncLightboxImage();
        });
        lightboxNext?.addEventListener("click", () => {
            updateGallery(currentIndex + 1);
            syncLightboxImage();
        });

        document.addEventListener("keydown", (event) => {
            if (lightbox.hasAttribute("hidden")) return;
            if (event.key === "Escape") {
                closeLightbox();
            }
            if (event.key === "ArrowLeft") {
                updateGallery(currentIndex - 1);
                syncLightboxImage();
            }
            if (event.key === "ArrowRight") {
                updateGallery(currentIndex + 1);
                syncLightboxImage();
            }
        });

        lightbox.addEventListener("keydown", (event) => {
            if (event.key !== "Tab") return;
            refreshFocusable();
            if (!focusableEls.length) return;
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
    }
});
