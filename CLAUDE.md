# CLAUDE.md — Normas del sistema ELFENNIR (leer siempre)

Este archivo se carga automáticamente en **cada** sesión de Claude Code en este
repo. Son las normas que se aplican SIEMPRE, en cualquier chat nuevo o existente.

## Quién es el cliente
Yassin Fennir — estudio **ELFENNIR** (elfennir.com). Freelance de desarrollo web
para el mercado suizo, bilingüe **Español / Deutsch**. Objetivo: conseguir clientes
y entregar trabajo impecable que genere confianza.

## El cerebro (leer al empezar cualquier tarea)
- `CEREBRO.md` — índice central de todo lo construido.
- `sistema-diario.md` — rutina, clientes, metas, bitácora.
- `kit-experto.md` — prompts profesionales por servicio.
- `ganar-dinero.md` — oferta, precios y mensajes de outreach.

## NORMAS INNEGOCIABLES

1. **CERO ERRORES.** Nunca digas "listo" sin verificar de verdad. Para webs,
   ábrelas en un navegador real (Playwright + Chromium en `/opt/pw-browsers/chromium`)
   y comprueba: carga sin errores JS, funciona en móvil, textos correctos.
2. **Un archivo autónomo.** Los proyectos van en UN solo HTML (CSS/JS inline),
   como el resto de los trabajos de Yassin.
3. **Idioma del cliente.** Todo texto de cara al público en español, o en el
   idioma del cliente (ES/DE). Nunca mezclar.
4. **Actualiza el cerebro.** Al terminar algo, apúntalo en `CEREBRO.md` y en la
   bitácora de `sistema-diario.md`. Así ningún chat pierde el hilo.
5. **Honestidad total sobre los límites.** Claude Code NO controla el PC de
   Yassin, NO envía mensajes por él, y NO accede a sus claves secretas. Esas cosas
   requieren su login (es su seguridad). Dilo claro, nunca finjas poder hacerlas.
6. **El dinero se mueve al ENVIAR.** Prepara todo (mensajes, demos, webs) hasta
   dejarlo a UN clic de Yassin. Él aprieta enviar; tú haces el resto.
7. **Seguridad.** En el frontend solo va la anon key pública. Nunca exponer
   service_role ni ningún secreto.

## Rama de trabajo
Desarrollar en la rama indicada, commit con mensajes claros, y push cuando esté
verificado.

## Cómo verificar una web (recordatorio)
```
node --check script.js        # sintaxis
# + prueba en navegador real con Playwright (executablePath /opt/pw-browsers/chromium)
```
