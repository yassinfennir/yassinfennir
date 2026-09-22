// Año actual en el footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------------------------------------------------------------------------
// PRECIOS — se pintan desde pricing.js (la misma lista que fennir.ch).
// Nunca escribas un precio a mano en el HTML: cámbialo en pricing.js.
// ---------------------------------------------------------------------------
function formatPrice(value) {
  // Formato suizo: 1'900 · 9'900
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

function waLink(number, text) {
  return "https://wa.me/" + number + "?text=" + encodeURIComponent(text);
}

function renderPricing() {
  const data = window.FENNIR_PRICING;
  const grid = document.getElementById("pricing-grid");
  if (!data || !grid) return;

  const esc = function (t) {
    return String(t).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  };

  // Tarjetas de proyecto (pago único)
  grid.innerHTML = data.services.map(function (s) {
    const badge = s.badge
      ? '<span class="price-badge" data-es="' + esc(s.badge.es) + '" data-de="' + esc(s.badge.de) + '">' + esc(s.badge.es) + "</span>"
      : "";
    // El sufijo ("instalación · + CHF 369/mes") se compone desde los números de pricing.js
    const sfx = s.monthly
      ? {
          es: s.setupLabel.es + " · + " + data.currency + " " + formatPrice(s.monthly) + "/mes",
          de: s.setupLabel.de + " · + " + data.currency + " " + formatPrice(s.monthly) + "/Monat"
        }
      : null;
    const suffix = sfx
      ? '<span class="price-suffix" data-es="' + esc(sfx.es) + '" data-de="' + esc(sfx.de) + '">' + esc(sfx.es) + "</span>"
      : "";
    return (
      '<article class="card price-card' + (s.featured ? " is-featured" : "") + '">' +
        badge +
        '<div class="card-icon">' + s.icon + "</div>" +
        '<h3 data-es="' + esc(s.name.es) + '" data-de="' + esc(s.name.de) + '">' + esc(s.name.es) + "</h3>" +
        '<p data-es="' + esc(s.desc.es) + '" data-de="' + esc(s.desc.de) + '">' + esc(s.desc.es) + "</p>" +
        '<div class="price-amount">' +
          '<span class="price-from" data-es="Desde" data-de="Ab">Desde</span> ' +
          '<span class="price-cur">' + data.currency + "</span>" +
          "<strong>" + formatPrice(s.price) + "</strong>" +
        "</div>" +
        suffix +
        '<a class="price-cta" target="_blank" rel="noopener"' +
          ' href="' + waLink(data.whatsapp, "Hola Yassin, me interesa: " + s.name.es + " (" + data.currency + " " + formatPrice(s.price) + ").") + '"' +
          ' data-wa-es="' + waLink(data.whatsapp, "Hola Yassin, me interesa: " + s.name.es + " (" + data.currency + " " + formatPrice(s.price) + ").") + '"' +
          ' data-wa-de="' + waLink(data.whatsapp, "Hallo Yassin, ich interessiere mich für: " + s.name.de + " (" + data.currency + " " + formatPrice(s.price) + ").") + '"' +
          ' data-es="Pedir presupuesto →" data-de="Angebot anfragen →">Pedir presupuesto →</a>' +
      "</article>"
    );
  }).join("");

  // Servicios mensuales
  const retainers = document.getElementById("pricing-retainers");
  if (retainers) {
    retainers.innerHTML = data.retainers.map(function (r) {
      return (
        '<div class="retainer-card">' +
          '<div class="retainer-left">' +
            '<h4 data-es="' + esc(r.name.es) + '" data-de="' + esc(r.name.de) + '">' + esc(r.name.es) + "</h4>" +
            '<p data-es="' + esc(r.desc.es) + '" data-de="' + esc(r.desc.de) + '">' + esc(r.desc.es) + "</p>" +
          "</div>" +
          '<div class="retainer-right">' +
            '<div class="price-amount">' +
              (r.from ? '<span class="price-from" data-es="Desde" data-de="Ab">Desde</span> ' : "") +
              '<span class="price-cur">' + data.currency + "</span>" +
              "<strong>" + formatPrice(r.price) + "</strong>" +
              '<span class="price-mo" data-es="/mes" data-de="/Monat">/mes</span>' +
            "</div>" +
            '<div class="retainer-meta" data-es="' + esc(r.meta.es) + '" data-de="' + esc(r.meta.de) + '">' + esc(r.meta.es) + "</div>" +
            '<a class="price-cta" target="_blank" rel="noopener"' +
              ' href="' + waLink(data.whatsapp, "Hola Yassin, me interesa: " + r.name.es + " (" + data.currency + " " + formatPrice(r.price) + "/mes).") + '"' +
              ' data-wa-es="' + waLink(data.whatsapp, "Hola Yassin, me interesa: " + r.name.es + " (" + data.currency + " " + formatPrice(r.price) + "/mes).") + '"' +
              ' data-wa-de="' + waLink(data.whatsapp, "Hallo Yassin, ich interessiere mich für: " + r.name.de + " (" + data.currency + " " + formatPrice(r.price) + "/Monat).") + '"' +
              ' data-es="' + esc(r.cta.es) + '" data-de="' + esc(r.cta.de) + '">' + esc(r.cta.es) + "</a>" +
          "</div>" +
        "</div>"
      );
    }).join("");
  }

  // Nota de IVA
  const note = document.getElementById("pricing-note");
  if (note) {
    note.setAttribute("data-es", data.note.es);
    note.setAttribute("data-de", data.note.de);
    note.textContent = data.note.es;
  }
}

renderPricing();

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

  // Enlaces de WhatsApp con el mensaje en el idioma del cliente
  document.querySelectorAll("[data-wa-" + lang + "]").forEach(function (el) {
    el.setAttribute("href", el.getAttribute("data-wa-" + lang));
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
