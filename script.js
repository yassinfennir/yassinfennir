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
