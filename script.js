// Año actual en el footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Cambio de idioma ES / DE — "siempre en el idioma de tu cliente"
function applyLanguage(lang) {
  document.documentElement.lang = lang;

  // Textos con data-es / data-de (pueden contener HTML como <span>, <br>)
  document.querySelectorAll("[data-" + lang + "]").forEach(function (el) {
    el.innerHTML = el.getAttribute("data-" + lang);
  });

  // Placeholders de formularios con data-es-ph / data-de-ph
  document.querySelectorAll("[data-" + lang + "-ph]").forEach(function (el) {
    el.setAttribute("placeholder", el.getAttribute("data-" + lang + "-ph"));
  });

  // Estado activo de los botones
  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    btn.classList.toggle("is-active", btn.getAttribute("data-lang") === lang);
  });

  // Recordar preferencia
  try { localStorage.setItem("preferredLang", lang); } catch (e) {}
}

document.querySelectorAll(".lang-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    applyLanguage(btn.getAttribute("data-lang"));
  });
});

// Idioma inicial: preferencia guardada → idioma del navegador → español
(function initLanguage() {
  let lang = "es";
  try {
    const saved = localStorage.getItem("preferredLang");
    if (saved === "es" || saved === "de") {
      lang = saved;
    } else if ((navigator.language || "").toLowerCase().startsWith("de")) {
      lang = "de";
    }
  } catch (e) {}
  applyLanguage(lang);
})();
