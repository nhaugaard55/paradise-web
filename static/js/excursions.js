document.addEventListener("DOMContentLoaded", () => {
  const iframe = document.getElementById("excursions-pdf");
  const langButtons = document.querySelectorAll("[data-lang-toggle]");

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
});
