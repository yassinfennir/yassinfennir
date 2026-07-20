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

// Formulario de contacto: si Formspree aún no está configurado (TU_ID_AQUI),
// no perder el mensaje — abrir el correo del cliente con el texto ya escrito.
(function contactFallback() {
  const form = document.querySelector(".contact-form");
  if (!form) return;
  const EMAIL = "glodrakokick@gmail.com";

  form.addEventListener("submit", function (e) {
    const action = form.getAttribute("action") || "";
    if (!action.includes("TU_ID_AQUI")) return; // Formspree configurado → envío normal

    // Aún sin configurar: usar el correo del visitante como respaldo
    e.preventDefault();
    const nombre = (form.querySelector("[name=nombre]") || {}).value || "";
    const email = (form.querySelector("[name=email]") || {}).value || "";
    const mensaje = (form.querySelector("[name=mensaje]") || {}).value || "";

    const asunto = encodeURIComponent("Nuevo contacto desde tu web — " + nombre);
    const cuerpo = encodeURIComponent(
      "Nombre: " + nombre + "\nEmail: " + email + "\n\nMensaje:\n" + mensaje
    );
    window.location.href = "mailto:" + EMAIL + "?subject=" + asunto + "&body=" + cuerpo;
  });
})();

// Showcase: pantalla estilo navegador que rota entre webs reales en vivo
(function liveShowcase() {
  const frame = document.getElementById("showcaseFrame");
  const urlEl = document.getElementById("showcaseUrl");
  const nameEl = document.getElementById("showcaseName");
  const linkEl = document.getElementById("showcaseLink");
  if (!frame || !urlEl || !nameEl || !linkEl) return;

  const sites = [
    { url: "https://studio-beauty-zurich.vercel.app", host: "studio-beauty-zurich.vercel.app", es: "Estudio de belleza — Zúrich", de: "Beauty-Studio — Zürich" },
    { url: "https://handwerk-uster.vercel.app",       host: "handwerk-uster.vercel.app",       es: "Web para artesano — Uster", de: "Handwerker-Webseite — Uster" },
    { url: "https://elfennir-free-audit.vercel.app",  host: "elfennir-free-audit.vercel.app",  es: "Landing de auditoría gratis", de: "Gratis-Audit Landingpage" }
  ];
  let i = 0;

  // Escalar el iframe (base 1280px) al ancho real del contenedor
  function fitFrame() {
    const body = frame.parentElement;
    if (!body) return;
    const scale = body.clientWidth / 1280;
    frame.style.transform = "scale(" + scale + ")";
    body.style.height = (800 * scale) + "px";
  }

  function render() {
    const s = sites[i];
    const lang = document.documentElement.lang === "de" ? "de" : "es";
    frame.style.opacity = "0";
    frame.src = s.url;
    urlEl.textContent = s.host;
    nameEl.textContent = s[lang];
    linkEl.href = s.url;
    setTimeout(function () { frame.style.opacity = "1"; }, 350);
  }

  fitFrame();
  render();
  window.addEventListener("resize", fitFrame);
  // Actualizar el nombre al cambiar de idioma
  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const s = sites[i];
      nameEl.textContent = document.documentElement.lang === "de" ? s.de : s.es;
    });
  });
  // Rotar cada 6 segundos
  setInterval(function () { i = (i + 1) % sites.length; render(); }, 6000);
})();
