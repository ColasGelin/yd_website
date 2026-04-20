(function () {
  const TABS = ["home", "questionnaire", "infos", "carte", "docs", "engage"];

  function showTab(id) {
    if (!TABS.includes(id)) id = "home";
    TABS.forEach((t) => {
      const section = document.getElementById(t);
      if (section) section.hidden = t !== id;
    });
    document.body.classList.toggle("with-page-pattern", id !== "home");
    document.querySelectorAll(".tab").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === id);
    });
    if (location.hash.slice(1) !== id) {
      history.replaceState(null, "", "#" + id);
    }
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });

    // Lazy-trigger per-tab init
    if (id === "questionnaire" && window.Questionnaire) {
      window.Questionnaire.ensureStarted();
    }
    if (id === "docs" && window.DocsPage) {
      window.DocsPage.ensureLoaded();
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".tab").forEach((btn) => {
      btn.addEventListener("click", () => showTab(btn.dataset.tab));
    });

    const cta = document.getElementById("cta-start");
    if (cta) cta.addEventListener("click", () => showTab("questionnaire"));

    window.addEventListener("hashchange", () =>
      showTab(location.hash.slice(1) || "home")
    );

    const initial = location.hash.slice(1) || "home";
    showTab(initial);
  });

  window.App = { showTab };
})();
