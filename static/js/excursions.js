document.addEventListener("DOMContentLoaded", () => {
  const iframe = document.getElementById("excursions-pdf");
  const langButtons = document.querySelectorAll("[data-lang-toggle]");
  const fullscreenBtn = document.querySelector("[data-excursions-fullscreen]");

  if (!iframe || !langButtons.length) return;

  const srcEs = iframe.dataset.srcEs;
  const srcEn = iframe.dataset.srcEn;

  const setLang = (lang) => {
    langButtons.forEach((btn) => {
      const isActive = btn.dataset.langToggle === lang;
      btn.classList.toggle("is-active", isActive);
      if (btn.hasAttribute("aria-selected")) {
        btn.setAttribute("aria-selected", isActive ? "true" : "false");
      }
    });

    const nextSrc = lang === "en" ? srcEn : srcEs;
    if (!nextSrc) return;
    if (iframe.src && iframe.src.endsWith(nextSrc)) return;

    iframe.src = nextSrc;
  };

  langButtons.forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      ev.preventDefault();
      const lang = btn.dataset.langToggle;
      setLang(lang === "en" ? "en" : "es");
    });
  });

  setLang("es");

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener("click", () => {
      const openFallback = () => {
        const pdfUrl = iframe.src || srcEs || srcEn;
        if (pdfUrl) {
          window.open(pdfUrl, "_blank", "noopener");
        }
      };

      try {
        let requestResult;
        if (iframe.requestFullscreen) {
          requestResult = iframe.requestFullscreen();
        } else if (iframe.webkitRequestFullscreen) {
          requestResult = iframe.webkitRequestFullscreen();
        } else {
          openFallback();
          return;
        }

        if (requestResult && typeof requestResult.catch === "function") {
          requestResult.catch(openFallback);
        }
      } catch (err) {
        openFallback();
      }
    });
  }
});
