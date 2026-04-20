(function () {
  const STRINGS = {
    fr: {
      "tab.home": "Accueil",
      "tab.questionnaire": "Questionnaire",
      "tab.infos": "Infos pratiques",
      "tab.carte": "Carte",
      "tab.docs": "Documentation",
      "tab.engage": "Engagez-vous",

      "home.title": "Chaque démarche, un pas de plus chez vous.",
      "home.lead":
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "home.cta": "Commencer le questionnaire",

      "q.loading": "Chargement du questionnaire…",
      "q.yes": "Oui",
      "q.no": "Non",
      "q.theme": "Thème",
      "q.done": "Terminé !",
      "q.skipped": "Non concerné — aucune démarche particulière.",
      "q.noted": "Situation notée — pas de démarche à signaler.",
      "q.summary.title": "Récapitulatif de vos démarches",
      "q.summary.restart": "Recommencer",
      "q.error": "Erreur : %s (servez la page via un serveur HTTP)",

      "infos.title": "Infos pratiques",
      "infos.hours": "Horaires d'accueil",
      "infos.meet": "Nous rencontrer",
      "infos.address": "Adresse :",
      "infos.phone": "Téléphone :",
      "infos.email": "Email :",
      "infos.walkin":
        "Venez sans rendez-vous aux horaires d'ouverture. Un·e bénévole vous recevra dans la langue que vous préférez lorsque cela est possible.",
      "infos.byAppt": "Sur rendez-vous",
      "infos.closed": "Fermé",
      "day.mon": "Lundi",
      "day.tue": "Mardi",
      "day.wed": "Mercredi",
      "day.thu": "Jeudi",
      "day.fri": "Vendredi",
      "day.sat": "Samedi",
      "day.sun": "Dimanche",

      "carte.title": "Nos lieux d'accueil",
      "carte.lead":
        "L'association est présente à plusieurs endroits en France.",

      "docs.title": "Documentation",
      "docs.lead":
        "Téléchargez les guides et formulaires utiles pour vos démarches.",
      "docs.loading": "Chargement des documents…",
      "docs.download": "Télécharger le PDF →",
      "docs.empty": "Aucun document disponible pour le moment.",
      "docs.error":
        "Impossible de charger les documents (%s). Servez le site via un serveur HTTP.",

      "engage.title": "Engagez-vous à nos côtés",
      "engage.donate": "Faire un don",
      "engage.donateText":
        "Votre soutien nous permet d'accompagner plus de personnes chaque semaine. Un grand merci pour votre générosité.",
      "engage.donateBtn": "Je fais un don (à venir)",
      "engage.donatePh": "Informations de don à compléter.",
      "engage.volunteer": "Devenir bénévole",
      "engage.volunteerText":
        "Nous recherchons des bénévoles pour l'accueil, la traduction, l'aide administrative et l'aide aux devoirs.",
      "engage.volunteerMail":
        "Écrivez-nous à benevoles@youdontneedtopayforthat.fr pour rejoindre l'équipe.",

      "footer":
        "© Youdontneedtopayforthat — Site informatif, contenu en cours de rédaction.",
      "lang.toggle": "EN",
    },
    en: {
      "tab.home": "Home",
      "tab.questionnaire": "Questionnaire",
      "tab.infos": "Practical info",
      "tab.carte": "Map",
      "tab.docs": "Documents",
      "tab.engage": "Get involved",

      "home.title": "Every step, one step closer to home.",
      "home.lead":
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "home.cta": "Start the questionnaire",

      "q.loading": "Loading questionnaire…",
      "q.yes": "Yes",
      "q.no": "No",
      "q.theme": "Topic",
      "q.done": "Done!",
      "q.skipped": "Not concerned — no action required.",
      "q.noted": "Noted — nothing further to report.",
      "q.summary.title": "Your recommended next steps",
      "q.summary.restart": "Restart",
      "q.error": "Error: %s (please serve the page via an HTTP server)",

      "infos.title": "Practical information",
      "infos.hours": "Opening hours",
      "infos.meet": "Meet us",
      "infos.address": "Address:",
      "infos.phone": "Phone:",
      "infos.email": "Email:",
      "infos.walkin":
        "Drop by during opening hours. A volunteer will assist you, in your preferred language when possible.",
      "infos.byAppt": "By appointment",
      "infos.closed": "Closed",
      "day.mon": "Monday",
      "day.tue": "Tuesday",
      "day.wed": "Wednesday",
      "day.thu": "Thursday",
      "day.fri": "Friday",
      "day.sat": "Saturday",
      "day.sun": "Sunday",

      "carte.title": "Our locations",
      "carte.lead": "The association operates in several places across France.",

      "docs.title": "Documents",
      "docs.lead":
        "Download the guides and forms you may need for your administrative steps.",
      "docs.loading": "Loading documents…",
      "docs.download": "Download PDF →",
      "docs.empty": "No documents available yet.",
      "docs.error":
        "Could not load documents (%s). Please serve the site via an HTTP server.",

      "engage.title": "Get involved",
      "engage.donate": "Make a donation",
      "engage.donateText":
        "Your support lets us help more people every week. Thank you for your generosity.",
      "engage.donateBtn": "Donate (coming soon)",
      "engage.donatePh": "Donation details to be added.",
      "engage.volunteer": "Become a volunteer",
      "engage.volunteerText":
        "We are looking for volunteers for reception, translation, administrative help and homework support.",
      "engage.volunteerMail":
        "Write to benevoles@youdontneedtopayforthat.fr to join the team.",

      "footer":
        "© Youdontneedtopayforthat — Information website, content being written.",
      "lang.toggle": "FR",
    },
  };

  let current = "fr";
  const listeners = [];

  function t(key) {
    return (STRINGS[current] && STRINGS[current][key]) || key;
  }

  function apply() {
    document.documentElement.lang = current;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.textContent = t(key);
    });
    const label = document.getElementById("lang-label");
    if (label) label.textContent = t("lang.toggle");
    listeners.forEach((fn) => {
      try { fn(current); } catch (e) { /* no-op */ }
    });
  }

  function set(lang) {
    if (!STRINGS[lang]) return;
    current = lang;
    apply();
  }

  function toggle() {
    set(current === "fr" ? "en" : "fr");
  }

  function get() { return current; }

  function onChange(fn) { listeners.push(fn); }

  document.addEventListener("DOMContentLoaded", () => {
    apply();
    const btn = document.getElementById("lang-toggle");
    if (btn) btn.addEventListener("click", toggle);
  });

  window.I18n = { t, set, toggle, get, onChange };
})();
