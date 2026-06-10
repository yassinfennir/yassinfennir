# Web profesional — Yassin Fennir

Sitio web personal de **portafolio + servicios**, bilingüe **Español / Deutsch**.
Sirve para dos objetivos:

1. **Ganar dinero online** — presentar tus servicios (webs, landing pages) y captar clientes.
2. **Enviar Bewerbungen** — incluir el enlace en tus solicitudes de empleo como CV online.

> El sitio **siempre se muestra en el idioma del cliente**: detecta el idioma del navegador
> y ofrece un botón **ES / DE** en la esquina superior para cambiar al instante.

---

## 📁 Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Página principal: inicio, servicios, proyectos, sobre mí, contacto |
| `cv.html` | CV / Lebenslauf online (bilingüe, listo para imprimir o exportar a PDF) |
| `styles.css` | Estilos y diseño |
| `script.js` | Cambio de idioma ES/DE y pequeñas funciones |

---

## ✏️ Cómo personalizarlo (paso a paso)

1. **Tus datos:** abre `index.html` y `cv.html` y cambia textos, servicios y experiencia.
   - El email de contacto ya está puesto: `glodrakokick@gmail.com`. Cámbialo si usas otro.
2. **Idiomas:** cada texto tiene `data-es="..."` (español) y `data-de="..."` (alemán).
   Edita ambos para mantener la web bilingüe. Si quieres añadir otro idioma (p. ej. inglés),
   añade `data-en="..."` y un botón `data-lang="en"`.
3. **Proyectos:** sustituye los "Proyectos de ejemplo" por trabajos reales con captura y enlace.
4. **Formulario de contacto:** crea una cuenta gratis en [formspree.io](https://formspree.io),
   copia tu ID y reemplaza `TU_ID_AQUI` en `index.html` (atributo `action` del formulario).

---

## 🚀 Publicar gratis con GitHub Pages

1. Sube estos archivos al repositorio (ya están en la rama de trabajo).
2. En GitHub: **Settings → Pages**.
3. En **Source**, elige la rama (`main` o tu rama) y la carpeta `/ (root)`.
4. Guarda. En 1–2 minutos tu web estará en:
   `https://<tu-usuario>.github.io/<nombre-repo>/`
5. Ese enlace es el que pones en tus Bewerbungen, LinkedIn y mensajes a clientes.

Alternativas gratuitas igual de fáciles: **Netlify** o **Vercel** (arrastrar y soltar la carpeta).

---

## 💡 Cómo usar la web para ganar dinero y postular

**Para ingresos (freelance):**
- Comparte el enlace en grupos, foros y redes donde se busquen webs.
- Ofrece un primer trabajo a buen precio para conseguir reseñas y ejemplos reales.
- Añade cada proyecto terminado a la sección "Proyectos".

**Para Bewerbungen (solicitudes de empleo):**
- Pon el enlace de tu web y de `cv.html` en cada candidatura.
- Abre `cv.html`, pulsa imprimir (Ctrl/Cmd + P) y guarda como **PDF** para adjuntarlo.
- El CV se muestra en **alemán** automáticamente para empresas en Alemania (botón DE).

---

## ✅ Próximos pasos sugeridos

- [ ] Rellenar tu experiencia y formación reales en `cv.html`.
- [ ] Añadir 1–3 proyectos reales con imagen y enlace.
- [ ] Activar el formulario con Formspree.
- [ ] Publicar en GitHub Pages y guardar el enlace.
- [ ] Empezar a enviar el enlace en Bewerbungen y a clientes potenciales.
