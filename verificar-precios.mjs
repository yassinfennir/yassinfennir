#!/usr/bin/env node
/**
 * verificar-precios.mjs — mantiene los precios sincronizados.
 *
 *   node verificar-precios.mjs              comprueba pricing.js ↔ index.html ↔ fennir.ch
 *   node verificar-precios.mjs --escribir   regenera el JSON-LD de index.html desde pricing.js
 *   node verificar-precios.mjs --sin-red    comprueba sólo lo local (sin pedir fennir.ch)
 *
 * Sale con código 1 si encuentra cualquier diferencia, para poder usarlo en CI.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const DIR = dirname(fileURLToPath(import.meta.url));
const WEB = "https://fennir.ch";
const INICIO = "<!-- PRECIOS-SCHEMA:INICIO";
const FIN = "<!-- PRECIOS-SCHEMA:FIN -->";

const args = process.argv.slice(2);
const escribir = args.includes("--escribir");
const sinRed = args.includes("--sin-red");

/* ---------- 1. pricing.js: la fuente de la verdad ---------- */
function cargarPricing() {
  const src = readFileSync(join(DIR, "pricing.js"), "utf8");
  const window = {};
  new Function("window", src)(window);
  if (!window.FENNIR_PRICING) throw new Error("pricing.js no define window.FENNIR_PRICING");
  return window.FENNIR_PRICING;
}

function catalogoDe(p) {
  const ofertas = [];
  for (const item of [...p.services, ...p.retainers]) {
    ofertas.push({ name: item.schemaName, price: String(item.price) });
    // Servicios con cuota mensual además del pago inicial (p. ej. la asistente telefónica)
    if (typeof item.monthly === "number") {
      ofertas.push({ name: item.monthlySchemaName, price: String(item.monthly) });
    }
  }
  const nombres = new Set();
  for (const o of ofertas) {
    if (!o.name) throw new Error("Hay un servicio en pricing.js sin schemaName");
    if (nombres.has(o.name)) throw new Error(`schemaName repetido en pricing.js: "${o.name}"`);
    nombres.add(o.name);
  }
  return ofertas;
}

function schemaJSON(p) {
  const ofertas = catalogoDe(p);
  const precios = ofertas.map((o) => Number(o.price));
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Yassin Fennir",
    url: p.source,
    priceRange: `${p.currency} ${Math.min(...precios)}–${Math.max(...precios)}`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: ofertas.map((o) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: o.name },
        price: o.price,
        priceCurrency: p.currency
      }))
    }
  };
}

/* ---------- 2. index.html: el bloque generado ---------- */
function leerIndex() {
  return readFileSync(join(DIR, "index.html"), "utf8");
}

function escribirSchema(p) {
  const html = leerIndex();
  const a = html.indexOf(INICIO);
  const b = html.indexOf(FIN);
  if (a === -1 || b === -1) throw new Error("No encuentro los marcadores PRECIOS-SCHEMA en index.html");
  const bloque =
    `${INICIO} — generado desde pricing.js, no editar a mano (node verificar-precios.mjs --escribir) -->\n` +
    `  <script type="application/ld+json" id="pricing-schema">\n` +
    JSON.stringify(schemaJSON(p), null, 2).split("\n").map((l) => "  " + l).join("\n") +
    `\n  </script>\n  `;
  writeFileSync(join(DIR, "index.html"), html.slice(0, a) + bloque + html.slice(b));
}

function schemaDeIndex() {
  const html = leerIndex();
  const m = html.match(/<script type="application\/ld\+json" id="pricing-schema">([\s\S]*?)<\/script>/);
  if (!m || !m[1].trim()) return null;
  return JSON.parse(m[1]);
}

/* ---------- 3. fennir.ch: la web en vivo ---------- */
async function ofertasDeLaWeb() {
  const res = await fetch(WEB, { headers: { "user-agent": "verificar-precios/1.0" } });
  if (!res.ok) throw new Error(`${WEB} respondió ${res.status}`);
  const html = await res.text();
  for (const m of html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
    let datos;
    try { datos = JSON.parse(m[1]); } catch { continue; }
    for (const nodo of Array.isArray(datos) ? datos : [datos, ...(datos["@graph"] || [])]) {
      const cat = nodo && nodo.hasOfferCatalog;
      if (cat && Array.isArray(cat.itemListElement)) {
        return cat.itemListElement.map((o) => ({
          name: (o.itemOffered && o.itemOffered.name) || "?",
          price: String(o.price)
        }));
      }
    }
  }
  throw new Error("No encontré el catálogo de ofertas (JSON-LD) en la web en vivo");
}

/* ---------- 4. comparar ---------- */
function comparar(etiqueta, esperado, encontrado) {
  const mapa = (l) => new Map(l.map((o) => [o.name, o.price]));
  const a = mapa(esperado), b = mapa(encontrado);
  const fallos = [];
  for (const [nombre, precio] of a) {
    if (!b.has(nombre)) fallos.push(`falta en ${etiqueta}: "${nombre}" (${precio})`);
    else if (b.get(nombre) !== precio) fallos.push(`precio distinto en ${etiqueta}: "${nombre}" → pricing.js ${precio} · ${etiqueta} ${b.get(nombre)}`);
  }
  for (const nombre of b.keys()) {
    if (!a.has(nombre)) fallos.push(`sobra en ${etiqueta}: "${nombre}" (${b.get(nombre)}) — no está en pricing.js`);
  }
  return fallos;
}

/* ---------- main ---------- */
const p = cargarPricing();
const esperado = catalogoDe(p);

if (escribir) {
  escribirSchema(p);
  console.log("✅ JSON-LD de index.html regenerado desde pricing.js");
}

console.log(`\nPrecios en pricing.js (${p.currency}, fuente: ${p.source}):`);
for (const o of esperado) console.log(`   ${o.price.padStart(6)}  ${o.name}`);

let fallos = [];

const local = schemaDeIndex();
if (!local) {
  fallos.push("index.html no tiene el JSON-LD de precios — ejecuta: node verificar-precios.mjs --escribir");
} else {
  fallos = fallos.concat(comparar("index.html", esperado, local.hasOfferCatalog.itemListElement.map((o) => ({
    name: o.itemOffered.name, price: String(o.price)
  }))));
}

let webComprobada = false;
if (!sinRed) {
  try {
    fallos = fallos.concat(comparar("fennir.ch", esperado, await ofertasDeLaWeb()));
    webComprobada = true;
  } catch (e) {
    console.log(`\n⚠️  No pude leer ${WEB}: ${e.message}`);
    console.log("   (comprueba la conexión, o usa --sin-red para saltar este paso)");
  }
}

if (fallos.length) {
  console.log("\n❌ Los precios NO están sincronizados:");
  for (const f of fallos) console.log("   · " + f);
  process.exit(1);
}
console.log(webComprobada
  ? "\n✅ Todo sincronizado: pricing.js = index.html = fennir.ch\n"
  : "\n✅ Local sincronizado: pricing.js = index.html (fennir.ch NO comprobada)\n");
