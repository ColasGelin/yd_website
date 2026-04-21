(function () {
  let cache = null;

  function tr(key) { return (window.I18n && window.I18n.t(key)) || key; }
  function loc(obj, field) {
    const l = window.I18n ? window.I18n.get() : "fr";
    if (l !== "fr" && obj[field + "_" + l]) return obj[field + "_" + l];
    return obj[field] || "";
  }

  async function ensureLoaded() {
    const container = document.getElementById("docs-list");
    if (!cache) {
      try {
        const res = await fetch("data/docs.json");
        if (!res.ok) throw new Error("not found");
        const data = await res.json();
        cache = data.documents || [];
      } catch (e) {
        container.innerHTML =
          '<p class="muted">' + tr("docs.error").replace("%s", e.message) + "</p>";
        return;
      }
    }
    render(container, cache);
  }

  function render(container, docs) {
    if (!docs.length) {
      container.innerHTML = '<p class="muted">' + tr("docs.empty") + "</p>";
      return;
    }
    container.innerHTML = "";
    docs.forEach((d) => {
<<<<<<< HEAD
      const card = document.createElement("a");
      card.className = "card doc-card";
      card.href = d.file;
      card.target = "_blank";
      card.rel = "noopener";
=======
      const card = document.createElement("div");
      card.className = "card doc-card";
>>>>>>> 5fa32bd2d9e81e3f625db9025fb550ac8259dcba

      const cat = loc(d, "category");
      if (cat) {
        const tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = cat;
        card.appendChild(tag);
      }

      const h = document.createElement("h2");
      h.textContent = loc(d, "title");
      card.appendChild(h);

      const desc = document.createElement("p");
      desc.textContent = loc(d, "description");
      card.appendChild(desc);

<<<<<<< HEAD
=======
      const link = document.createElement("a");
      link.href = d.file;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = tr("docs.download");
      card.appendChild(link);

>>>>>>> 5fa32bd2d9e81e3f625db9025fb550ac8259dcba
      container.appendChild(card);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (window.I18n) {
      window.I18n.onChange(() => {
        if (cache) render(document.getElementById("docs-list"), cache);
      });
    }
  });

  window.DocsPage = { ensureLoaded };
})();
