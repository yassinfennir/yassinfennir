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
| `index.html` | Página principal: inicio, servicios y precios, proyectos, sobre mí, contacto |
| `cv.html` | CV / Lebenslauf online (bilingüe, listo para imprimir o exportar a PDF) |
| `styles.css` | Estilos y diseño |
| `script.js` | Cambio de idioma ES/DE, pintado de los precios y pequeñas funciones |
| **`pricing.js`** | **La lista de precios. Fuente única: si cambias un precio, se cambia aquí** |
| `verificar-precios.mjs` | Comprueba que `pricing.js`, `index.html` y **fennir.ch** dicen lo mismo |
| `fluffybites.html` | Landing page de ejemplo (proyecto de portafolio) |

---

## 💶 Precios — sincronizados con fennir.ch

Estos son los mismos precios que están publicados en **https://fennir.ch**.
Todo en **CHF, sin IVA**: el precio que ve el cliente es el que paga.

| Servicio | Precio |
|---|---|
| Asistente telefónica IA (*Telefon-Assistentin*) | desde **CHF 1'900** de instalación **+ CHF 369/mes** |
| Landing page | desde **CHF 1'900** |
| Web de 3 páginas | desde **CHF 2'900** |
| Web completa | desde **CHF 3'900** |
| Chatbot | desde **CHF 2'400** |
| Automatización | desde **CHF 4'900** |
| Web App | desde **CHF 9'900** |
| Redes sociales (configuración) | desde **CHF 900** |
| Google Ads (configuración) | desde **CHF 900** |
| Website Care (mantenimiento) | **CHF 199/mes** · cancelable |
| Google Ads (gestión mensual) | **CHF 150/mes** · el presupuesto lo paga el cliente a Google |
| Partner técnico | desde **CHF 1'500/mes** · 10 h/mes incluidas |

### Cómo cambiar un precio (sin romper la sincronización)

1. Cambia el número **sólo en `pricing.js`**. Nunca escribas un precio a mano en el HTML.
2. Regenera los datos que leen Google y los asistentes de IA:
   ```bash
   node verificar-precios.mjs --escribir
   ```
3. Cambia el mismo precio en **fennir.ch**.
4. Comprueba que todo coincide:
   ```bash
   node verificar-precios.mjs
   ```
   - ✅ verde = `pricing.js` = `index.html` = `fennir.ch`
   - ❌ rojo = te dice exactamente qué precio baila y dónde (y sale con código 1, así que sirve para CI)
   - `--sin-red` salta la comprobación contra la web en vivo.

> Los textos de las tarjetas, el badge "El producto estrella", la nota de IVA y los enlaces
> de WhatsApp también salen de `pricing.js`, en español y alemán. El mensaje de WhatsApp se
> envía en el idioma en el que el cliente está viendo la página.

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
- Manda siempre el enlace de la sección de precios: llegar con el precio ya puesto
  te ahorra la conversación incómoda y filtra a quien no puede pagarte.
- No bajes el precio para cerrar el primer trato: si necesitas ceder algo, quita
  alcance (menos páginas, menos funciones), no dinero. Bajar el precio una vez lo
  baja para siempre con ese cliente.
- Añade cada proyecto terminado a la sección "Proyectos".

**Para Bewerbungen (solicitudes de empleo):**
- Pon el enlace de tu web y de `cv.html` en cada candidatura.
- Abre `cv.html`, pulsa imprimir (Ctrl/Cmd + P) y guarda como **PDF** para adjuntarlo.
- El CV se muestra en **alemán** automáticamente para empresas en Alemania (botón DE).

---

## ✅ Próximos pasos sugeridos

- [ ] Rellenar tu experiencia y formación reales en `cv.html`.
- [ ] Ejecutar `node verificar-precios.mjs` cada vez que toques un precio.
- [ ] Añadir 1–3 proyectos reales con imagen y enlace.
- [ ] Activar el formulario con Formspree.
- [ ] Publicar en GitHub Pages y guardar el enlace.
- [ ] Empezar a enviar el enlace en Bewerbungen y a clientes potenciales.
