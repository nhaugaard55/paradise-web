document.addEventListener("DOMContentLoaded", () => {
  const setupPdfFallback = (iframe, fallback) => {
    if (!iframe || !fallback) return;
    fallback.hidden = true;
    let didLoad = false;

    const showFallback = () => {
      if (didLoad) return;
      fallback.hidden = false;
    };

    const hideFallback = () => {
      didLoad = true;
      fallback.hidden = true;
    };

    const timeoutId = window.setTimeout(showFallback, 2500);

    iframe.addEventListener("load", () => {
      window.clearTimeout(timeoutId);
      hideFallback();
    });

    iframe.addEventListener("error", () => {
      window.clearTimeout(timeoutId);
      showFallback();
    });
  };

  document.querySelectorAll("iframe[data-pdf-embed]").forEach((iframe) => {
    const fallback = iframe.parentElement?.querySelector("[data-pdf-fallback]");
    if (fallback) {
      setupPdfFallback(iframe, fallback);
    }
  });

  const viewer = document.getElementById("excursions-pdf");
  const langButtons = document.querySelectorAll("[data-lang-toggle]");
  const fullscreenLink = document.querySelector("[data-excursions-link]");

  if (!viewer || !langButtons.length) return;

  const srcEs = viewer.dataset.srcEs;
  const srcEn = viewer.dataset.srcEn;
  const pdfTitle = viewer.dataset.pdfTitle || "Excursions brochure";
  const fallbackTemplate = viewer.querySelector("[data-pdf-fallback]");

  const withCacheBuster = (src) => {
    const separator = src.includes("?") ? "&" : "?";
    return `${src}${separator}v=${Date.now()}`;
  };

  const buildIframe = (src) => {
    const iframe = document.createElement("iframe");
    iframe.className = "excursions-pdf";
    iframe.src = withCacheBuster(src);
    iframe.title = pdfTitle;
    iframe.loading = "lazy";
    iframe.style.border = "0";
    iframe.setAttribute("data-pdf-embed", "");
    return iframe;
  };

  const buildFallback = (src) => {
    if (!fallbackTemplate) return null;
    const fallback = fallbackTemplate.cloneNode(true);
    fallback.hidden = true;
    const link = fallback.querySelector("a");
    if (link) {
      link.href = src;
    }
    return fallback;
  };

  const mountViewer = (nextSrc) => {
    if (!nextSrc) return;
    viewer.innerHTML = "";

    const iframe = buildIframe(nextSrc);
    viewer.appendChild(iframe);

    const fallback = buildFallback(nextSrc);
    if (fallback) {
      viewer.appendChild(fallback);
      setupPdfFallback(iframe, fallback);
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
    mountViewer(nextSrc);
    if (fullscreenLink) {
      fullscreenLink.href = nextSrc;
    }
  };

  langButtons.forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      ev.preventDefault();
      const lang = btn.dataset.langToggle;
      setLang(lang === "en" ? "en" : "es");
    });
  });

  const pageLang = (document.documentElement.getAttribute("lang") || "").toLowerCase();
  const initialLang = pageLang.startsWith("en") ? "en" : "es";
  setLang(initialLang);
});
