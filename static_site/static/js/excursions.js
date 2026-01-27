document.addEventListener("DOMContentLoaded", () => {
  const viewer = document.getElementById("excursions-pdf");
  const langButtons = document.querySelectorAll("[data-lang-toggle]");
  const fullscreenBtn = document.querySelector("[data-excursions-fullscreen]");

  if (!viewer || !langButtons.length) return;

  const srcEs = viewer.dataset.srcEs;
  const srcEn = viewer.dataset.srcEn;

  const getCurrentSource = () => {
    if (viewer.tagName === "OBJECT") {
      return viewer.data || "";
    }
    return viewer.src || "";
  };

  const setViewerSource = (nextSrc) => {
    if (viewer.tagName === "OBJECT") {
      if (viewer.data && viewer.data.endsWith(nextSrc)) return;
      viewer.data = nextSrc;
    } else {
      if (viewer.src && viewer.src.endsWith(nextSrc)) return;
      viewer.src = nextSrc;
    }
  };

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
    setViewerSource(nextSrc);
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
    fullscreenBtn.addEventListener("click", (event) => {
      if (event) {
        event.preventDefault();
      }
      const openFallback = () => {
        const pdfUrl = getCurrentSource() || srcEs || srcEn;
        if (pdfUrl) {
          window.open(pdfUrl, "_blank", "noopener");
        }
      };

      try {
        let requestResult;
        if (viewer.requestFullscreen) {
          requestResult = viewer.requestFullscreen();
        } else if (viewer.webkitRequestFullscreen) {
          requestResult = viewer.webkitRequestFullscreen();
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
