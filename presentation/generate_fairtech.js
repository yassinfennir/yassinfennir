// Fairtech Schweiz — PPTX version of the HTML deck, same design language.
const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";

const VOID = "080B0F", PANEL = "141B24", EDGE = "243040";
const INK = "EDF2F7", SOFT = "8FA0B4", DIM = "5C6E82";
const ACC = { 1: "F5A833", 2: "3ED6AC", 3: "F4647A", 4: "6699FF", 5: "C58BFF" };
const NAME = { 1: "Yassin", 2: "Rayaan", 3: "Fernando", 4: "Samed", 5: "Kim" };
const F = "Arial";
let pageNo = 0;

function slide(part, reserve = false) {
  const s = pres.addSlide();
  s.background = { color: VOID };
  pageNo++;
  s.addText("Fairtech Schweiz · Projekt E-Commerce", {
    objectName: "chrome-footer", x: 0.55, y: 7.12, w: 5, h: 0.26, margin: 0,
    fontSize: 8.5, color: DIM, fontFace: F, valign: "middle",
  });
  s.addText(String(pageNo), {
    objectName: "chrome-page", x: 12.5, y: 7.12, w: 0.28, h: 0.26, margin: 0,
    fontSize: 8.5, color: DIM, fontFace: F, align: "right", valign: "middle",
  });
  if (reserve) {
    s.addText("RESERVE · NUR BEI NACHFRAGE", {
      objectName: "chrome-reserve", x: 9.6, y: 0.42, w: 3.2, h: 0.3, margin: 0, align: "right",
      fontSize: 9, bold: true, color: DIM, charSpacing: 2, fontFace: F, valign: "middle",
    });
  }
  return s;
}
function head(s, part, eyebrow, title, titleSize = 30) {
  s.addText(eyebrow.toUpperCase(), {
    x: 0.55, y: 0.45, w: 9, h: 0.3, margin: 0,
    fontSize: 10.5, bold: true, color: ACC[part], charSpacing: 3, fontFace: F, valign: "middle",
  });
  s.addText(title, {
    x: 0.55, y: 0.85, w: 12.2, h: 0.75, margin: 0,
    fontSize: titleSize, bold: true, color: INK, fontFace: F, valign: "middle",
  });
}
function panelBox(s, x, y, w, h, edgeColor = EDGE, lw = 0.75) {
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.05, fill: { color: PANEL }, line: { color: edgeColor, width: lw },
  });
}
function lede(s, text, y, w = 11.5) {
  s.addText(text, { x: 0.55, y, w, h: 0.75, margin: 0, fontSize: 13.5, color: SOFT, fontFace: F, lineSpacingMultiple: 1.2 });
}
function figs(s, part, items, y = 2.2, h = 1.9) {
  const n = items.length, gap = 0.25, w = (12.23 - gap * (n - 1)) / n;
  items.forEach(([num, label], i) => {
    const x = 0.55 + i * (w + gap);
    panelBox(s, x, y, w, h);
    s.addText(num, { x: x + 0.3, y: y + 0.25, w: w - 0.6, h: 0.85, margin: 0, fontSize: 34, bold: true, color: ACC[part], fontFace: F });
    s.addText(label.toUpperCase(), { x: x + 0.3, y: y + 1.2, w: w - 0.6, h: 0.6, margin: 0, fontSize: 9, color: DIM, charSpacing: 1.5, fontFace: F, lineSpacingMultiple: 1.25 });
  });
}
function cards(s, part, items, y = 2.2, h = 2.4) {
  const n = items.length, gap = 0.22, w = (12.23 - gap * (n - 1)) / n;
  items.forEach(([k, t, p], i) => {
    const x = 0.55 + i * (w + gap);
    panelBox(s, x, y, w, h);
    s.addText(k.toUpperCase(), { x: x + 0.28, y: y + 0.22, w: w - 0.56, h: 0.28, margin: 0, fontSize: 9, bold: true, color: ACC[part], charSpacing: 2, fontFace: F });
    s.addText(t, { x: x + 0.28, y: y + 0.55, w: w - 0.56, h: 0.62, margin: 0, fontSize: 15, bold: true, color: INK, fontFace: F, lineSpacingMultiple: 1.05 });
    s.addText(p, { x: x + 0.28, y: y + 1.2, w: w - 0.56, h: h - 1.4, margin: 0, fontSize: 11, color: SOFT, fontFace: F, lineSpacingMultiple: 1.18 });
  });
}
function cards2rows(s, part, items, y = 2.0, h = 2.15) {
  const gap = 0.22, w = (12.23 - gap) / 2;
  items.forEach(([k, t, p], i) => {
    const x = 0.55 + (i % 2) * (w + gap);
    const yy = y + Math.floor(i / 2) * (h + gap);
    panelBox(s, x, yy, w, h);
    s.addText(k.toUpperCase(), { x: x + 0.28, y: yy + 0.2, w: w - 0.56, h: 0.26, margin: 0, fontSize: 9, bold: true, color: ACC[part], charSpacing: 2, fontFace: F });
    s.addText(t, { x: x + 0.28, y: yy + 0.5, w: w - 0.56, h: 0.45, margin: 0, fontSize: 15, bold: true, color: INK, fontFace: F });
    s.addText(p, { x: x + 0.28, y: yy + 0.98, w: w - 0.56, h: h - 1.15, margin: 0, fontSize: 11, color: SOFT, fontFace: F, lineSpacingMultiple: 1.18 });
  });
}
function points(s, part, items, y = 2.2, rowH = 1.0) {
  items.forEach(([leadTxt, rest], i) => {
    const yy = y + i * rowH;
    s.addShape(pres.ShapeType.rect, { x: 0.6, y: yy + 0.1, w: 0.14, h: 0.14, fill: { color: ACC[part] } });
    s.addText(
      [
        { text: leadTxt + " ", options: { fontSize: 14, bold: true, color: INK } },
        { text: rest, options: { fontSize: 13, color: SOFT } },
      ],
      { x: 1.0, y: yy, w: 11.5, h: rowH - 0.1, margin: 0, fontFace: F, valign: "top", lineSpacingMultiple: 1.15 }
    );
  });
}
function flow(s, part, steps, y = 2.3, h = 1.8) {
  const n = steps.length, gap = 0.18, w = (12.23 - gap * (n - 1)) / n;
  steps.forEach(([b, t], i) => {
    const x = 0.55 + i * (w + gap);
    panelBox(s, x, y, w, h);
    s.addText(String(i + 1), { x: x + 0.22, y: y + 0.18, w: 0.6, h: 0.3, margin: 0, fontSize: 11, bold: true, color: ACC[part], fontFace: F });
    s.addText(b, { x: x + 0.22, y: y + 0.5, w: w - 0.44, h: 0.4, margin: 0, fontSize: 13.5, bold: true, color: INK, fontFace: F });
    s.addText(t, { x: x + 0.22, y: y + 0.92, w: w - 0.44, h: h - 1.1, margin: 0, fontSize: 10, color: SOFT, fontFace: F, lineSpacingMultiple: 1.15 });
  });
}
function handover(part, who, topic, mins, notesIdx) {
  const s = slide(part);
  s.addText(`TEIL ${part} VON 5`.toUpperCase(), {
    x: 1.67, y: 2.15, w: 10, h: 0.35, margin: 0, align: "center",
    fontSize: 12, bold: true, color: DIM, charSpacing: 5, fontFace: F,
  });
  s.addText(who, {
    x: 0.67, y: 2.55, w: 12, h: 1.9, margin: 0, align: "center", valign: "middle",
    fontSize: 84, bold: true, color: ACC[part], fontFace: F,
  });
  s.addText(topic, {
    x: 1.67, y: 4.6, w: 10, h: 0.55, margin: 0, align: "center",
    fontSize: 19, color: SOFT, fontFace: F,
  });
  s.addText(mins, {
    x: 1.67, y: 5.3, w: 10, h: 0.35, margin: 0, align: "center",
    fontSize: 11, bold: true, color: DIM, charSpacing: 3, fontFace: F,
  });
  return s;
}
function table(s, rows, opts = {}) {
  const part = opts.part;
  const header = rows[0].map(t => ({ text: t, options: { bold: true, color: DIM, fontSize: 9.5, fontFace: F, fill: { color: PANEL }, charSpacing: 1.5 } }));
  const body = rows.slice(1).map((r, ri) => {
    const hero = opts.heroLast && ri === rows.length - 2;
    return r.map((t, ci) => ({
      text: t,
      options: {
        color: hero ? (ci === 0 ? ACC[part] : INK) : (ci === 0 ? INK : SOFT),
        bold: hero, fontSize: 11.5, fontFace: F,
        fill: { color: hero ? "1B2330" : PANEL },
        align: ci > 0 && opts.numCols ? "right" : "left",
      },
    }));
  });
  s.addTable([header, ...body], {
    x: 0.55, y: opts.y ?? 2.05, w: 12.23, colW: opts.colW,
    border: { type: "solid", color: EDGE, pt: 0.75 },
    margin: 0.09, valign: "middle", rowH: 0.42,
  });
}

// ---------------- SLIDES (order == fairtech-slides.json) ----------------

// 1 Title
(() => {
  const s = slide(1);
  s.addText("PROJEKT E-COMMERCE · SHOPIFY · 24. AUGUST 2026", {
    x: 1.67, y: 1.75, w: 10, h: 0.35, margin: 0, align: "center",
    fontSize: 11.5, bold: true, color: ACC[1], charSpacing: 4, fontFace: F,
  });
  s.addText("Fairtech Schweiz", {
    x: 0.67, y: 2.2, w: 12, h: 1.6, margin: 0, align: "center", valign: "middle",
    fontSize: 72, bold: true, color: INK, fontFace: F,
  });
  s.addText("Elektronik online — ohne Ladenmiete, ohne Riesenkatalog.\nNeu zum fairen Preis, refurbished zum halben.", {
    x: 2.17, y: 4.05, w: 9, h: 0.95, margin: 0, align: "center",
    fontSize: 16, color: SOFT, fontFace: F, lineSpacingMultiple: 1.3,
  });
  s.addText("Yassin  ·  Rayaan  ·  Fernando  ·  Samed  ·  Kim", {
    x: 2.17, y: 5.6, w: 9, h: 0.35, margin: 0, align: "center", fontSize: 12.5, color: DIM, fontFace: F,
  });
})();

// 2 Team
(() => {
  const s = slide(1);
  head(s, 1, "Der Ablauf", "Fünf Teile, fünf Leute");
  const team = [
    [1, "Yassin", "Das Problem und die Idee"],
    [2, "Rayaan", "Markt, Kundschaft, Konkurrenz"],
    [3, "Fernando", "Sortiment und Preise"],
    [4, "Samed", "Shopify und Abwicklung"],
    [5, "Kim", "Recht, Zahlen, Schluss"],
  ];
  const gap = 0.2, w = (12.23 - gap * 4) / 5, y = 2.4, h = 2.6;
  team.forEach(([p, n, t], i) => {
    const x = 0.55 + i * (w + gap);
    panelBox(s, x, y, w, h);
    s.addShape(pres.ShapeType.rect, { x, y, w, h: 0.07, fill: { color: ACC[p] } });
    s.addText(`TEIL ${p}`, { x: x + 0.22, y: y + 0.28, w: w - 0.44, h: 0.26, margin: 0, fontSize: 9, bold: true, color: DIM, charSpacing: 2, fontFace: F });
    s.addText(n, { x: x + 0.22, y: y + 0.6, w: w - 0.44, h: 0.5, margin: 0, fontSize: 18, bold: true, color: ACC[p], fontFace: F });
    s.addText(t, { x: x + 0.22, y: y + 1.15, w: w - 0.44, h: 1.3, margin: 0, fontSize: 11, color: SOFT, fontFace: F, lineSpacingMultiple: 1.2 });
  });
})();

// 3 Handover Yassin
handover(1, "Yassin", "Das Problem und die Idee", "1–2 MINUTEN");

// 4 RESERVE points
(() => {
  const s = slide(1, true);
  head(s, 1, "01 · Das Problem", "Im Preis steckt der halbe Laden");
  points(s, 1, [
    ["Miete, Personal und Werbung zahlt der Kunde mit —", "rund 10–15 % des Ladenpreises."],
    ["Tausende Produkte im Katalog —", "Lagerkosten und Ladenhüter zahlt auch der Kunde."],
    ["Wenig Budget heisst oft: alte Neuware statt junger Occasion —", "das schlechteste Geschäft von allen."],
  ], 2.4, 1.25);
})();

// 5 figs Preise
(() => {
  const s = slide(1);
  head(s, 1, "01 · Das Problem", "Gleiches Gerät, zwei Preise");
  figs(s, 1, [["CHF 849", "iPhone 16 im Laden"], ["CHF 799", "iPhone 16 bei uns"], ["CHF 50", "gespart — gleiche Ware"]], 2.3, 2.0);
  lede(s, "Gleiche Originalware, gleiche Garantie. Der Unterschied ist nicht das Gerät — es ist alles drumherum.", 4.75);
})();

// 6 cards Idee
(() => {
  const s = slide(1);
  head(s, 1, "02 · Die Idee", "Weniger drumherum, mehr Gerät");
  cards(s, 1, [
    ["Kein Laden", "Nur online", "Keine Miete, kein Verkaufspersonal. Die 10–15 % Struktur fallen weg."],
    ["Kein Katalog", "Sechs Produkte", "Statt sechstausend. Kein totes Lager, keine Liquidationsrabatte."],
    ["Der Hebel", "Refurbished", "Geprüfte Occasionen: für den Kunden 40 % günstiger — für uns die echte Marge."],
  ], 2.3, 2.7);
})();

// 7 RESERVE Streckengeschäft
(() => {
  const s = slide(1, true);
  head(s, 1, "02 · Die Idee", "Streckengeschäft: verkaufen ohne Lager");
  cards(s, 1, [
    ["Neuware", "Streckengeschäft", "Der Kunde bestellt bei uns, der Schweizer Grossist liefert direkt an ihn. Kein gebundenes Kapital."],
    ["Refurbished", "Eigener Einkauf", "Geprüfte Geräte im Lot eingekauft — hier lohnt sich das Lager, denn hier liegt die Marge."],
  ], 2.3, 2.5);
  lede(s, "Zwei Wege, ein Shop: Neuware bringt Kundschaft, refurbished bringt Marge.", 5.15);
})();

// 8 Handover Rayaan
handover(2, "Rayaan", "Markt, Kundschaft, Konkurrenz", "1–2 MINUTEN");

// 9 RESERVE figs Markt
(() => {
  const s = slide(2, true);
  head(s, 2, "03 · Der Markt", "Wir brauchen Krümel, keinen Kuchen");
  figs(s, 2, [["20", "Bestellungen im Monat — Ziel"], ["CHF 500", "Durchschnittsbestellung, Annahme"], ["CHF 10'000", "Umsatz im Monat"]], 2.3, 2.0);
  lede(s, "Fast jeder hat ein Smartphone, gewechselt wird alle drei bis vier Jahre. Von diesem Kuchen brauchen wir Krümel.", 4.75);
})();

// 11 RESERVE Nadia
(() => {
  const s = slide(2, true);
  head(s, 2, "04 · Die Kundschaft", "Unsere Kundin hat einen Namen");
  cards(s, 2, [
    ["Wer", "Nadia, 19", "Lehre fertig, Berufsmatur vor der Tür — und der Laptop stirbt."],
    ["Budget", "CHF 500, nicht 1'300", "Dafür gibt es im Laden nur Plastik. Bei uns ein Business-Gerät, refurbished."],
    ["Was sie braucht", "Vertrauen", "Geprüft, mit Garantie, von einer Schweizer Firma — nicht vom Marktplatz-Händler."],
  ], 2.3, 2.7);
})();

// 12 Konkurrenz-Tabelle
(() => {
  const s = slide(2);
  head(s, 2, "05 · Der Wettbewerb", "Gegen wen wir antreten");
  table(s, [
    ["WER", "STÄRKE", "SCHWÄCHE"],
    ["Digitec Galaxus", "Riesiges Sortiment, Top-Logistik", "Unpersönlich — refurbished ist dort Nische"],
    ["MediaMarkt / Interdiscount", "Läden zum Anfassen", "Die Läden stecken im Preis — 10–15 % Struktur"],
    ["Marktplatz-Händler (Ricardo & Co.)", "Billig", "Keine Garantie, kein Impressum, kein Vertrauen"],
    ["Fairtech Schweiz", "Refurbished geprüft, 6 Produkte, persönlich", "Neu — niemand kennt uns"],
  ], { part: 2, heroLast: true, y: 2.15, colW: [3.4, 4.4, 4.43] });
})();

// 13 RESERVE MediaMarkt-Frage
(() => {
  const s = slide(2, true);
  head(s, 2, "05 · Die Frage", "«Wie könnt ihr billiger sein als MediaMarkt?»", 26);
  cards(s, 2, [
    ["1 · Struktur", "Keine Läden", "Keine Miete, kein Verkaufspersonal, kein Licht. 10–15 % Kosten, die wir nie haben."],
    ["2 · Sortiment", "6 statt 6'000", "Kein totes Lager, keine Liquidationsrabatte, kein Katalog, den niemand liest."],
    ["3 · Der Hebel", "Refurbished", "Hier entscheidet nicht die Einkaufsmenge, sondern Prüfung und Vertrauen."],
  ], 2.25, 2.5);
  s.addText([
    { text: "Ehrlich gesagt: ", options: { bold: true, color: INK } },
    { text: "beim Einkauf verlieren wir gegen die Grossen. Bei der Struktur gewinnen wir.", options: { color: SOFT } },
  ], { x: 0.55, y: 5.1, w: 11.5, h: 0.5, margin: 0, fontSize: 13.5, fontFace: F });
})();

// 14 Handover Fernando
handover(3, "Fernando", "Sortiment und Preise", "1–2 MINUTEN");

// 15 Sortiment-Tabelle
(() => {
  const s = slide(3);
  head(s, 3, "06 · Das Sortiment", "Sechs Produkte. Nicht sechstausend.");
  table(s, [
    ["PRODUKT", "BEI UNS", "ANDERSWO", "MARGE"],
    ["iPhone 16, 128 GB · neu", "799", "849", "~4 %"],
    ["MacBook Air M3 13″, 256 GB · neu", "1'229", "1'299", "~4 %"],
    ["AirPods Pro 2 · neu", "219", "279", "~10 %"],
    ["iPhone 14, 128 GB · refurbished A", "449", "749 neu", "~20 %"],
    ["iPhone 13, 128 GB · refurbished A", "359", "—", "~22 %"],
    ["Business-Notebook i5/16 GB · refurbished A", "429", "~1'100 neu", "~25 %"],
  ], { part: 3, heroLast: true, numCols: true, y: 1.95, colW: [5.6, 2.2, 2.2, 2.23] });
  s.addText("Alle Preise in CHF inkl. 8.1 % MWST. Vergleichspreise: Stand am Vortag, mit Screenshot belegt.", {
    x: 0.55, y: 6.35, w: 11.5, h: 0.3, margin: 0, fontSize: 9.5, color: DIM, fontFace: F,
  });
})();

// 16 RESERVE Kalkulation
(() => {
  const s = slide(3, true);
  head(s, 3, "07 · Die Kalkulation", "Was an einem iPhone hängen bleibt");
  flow(s, 3, [
    ["Einkauf", "CHF 745 beim Schweizer Grossisten"],
    ["+ Kosten", "Zahlungsgebühr und Versand, CHF 27"],
    ["+ Marge", "CHF 27 — gut 3 %"],
    ["= Verkauf", "CHF 799 inkl. MWST"],
  ], 2.3, 1.9);
  lede(s, "27 Franken an einem 800-Franken-Handy. Neuware bringt Kundschaft — leben kann man davon nicht.", 4.7);
})();

// 17 Refurbished-Hebel
(() => {
  const s = slide(3);
  head(s, 3, "08 · Der Hebel", "Das Geld liegt im zweiten Leben");
  figs(s, 3, [["CHF 300", "spart der Kunde beim iPhone 14"], ["4 %", "Marge bei Neuware"], ["20 %+", "Marge bei refurbished"]], 2.15, 1.85);
  points(s, 3, [
    ["Neuware ist das Schaufenster —", "sie bringt die Kundschaft über den Preisvergleich."],
    ["Refurbished ist das Geschäft —", "geprüft, Grad A, mit Garantie. Hier bleibt die Marge."],
  ], 4.5, 0.85);
})();

// 18 Handover Samed
handover(4, "Samed", "Shopify und Abwicklung", "1–2 MINUTEN");

// 19 Warum Shopify
(() => {
  const s = slide(4);
  head(s, 4, "09 · Die Technik", "Warum Shopify");
  points(s, 4, [
    ["Zahlung ist gelöst.", "TWINT und Karte — ohne eine Zeile Code."],
    ["Lager, Bestellungen, Versandetiketten", "sind eingebaut. Wir bauen nichts davon selber."],
    ["Kosten:", "die ersten drei Monate CHF 1 im Monat, danach rund CHF 36."],
    ["Ein Shop ist kein Programmierprojekt —", "er ist ein Verkaufsprojekt. Darum bauen wir ihn nicht selber."],
  ], 2.3, 1.1);
})();

// 19b Screenshots
(() => {
  const s = slide(4);
  s.addImage({ path: "shopify-logo.png", x: 0.55, y: 0.78, w: 1.75, h: 0.55 });
  s.addText("— live und echt", {
    x: 2.45, y: 0.78, w: 9, h: 0.55, margin: 0, fontSize: 26, bold: true, color: INK, fontFace: F, valign: "middle",
  });
  s.addText("09 · SO SIEHT ES AUS", {
    x: 0.55, y: 0.45, w: 9, h: 0.3, margin: 0, fontSize: 10.5, bold: true, color: ACC[4], charSpacing: 3, fontFace: F, valign: "middle",
  });
  const iw = 5.95, ih = 3.53, iy = 1.85;
  s.addImage({ path: "shot-home.jpg", x: 0.55, y: iy, w: iw, h: ih });
  s.addImage({ path: "shot-preise.jpg", x: 6.83, y: iy, w: iw, h: ih });
  s.addText("SHOPIFY.COM — EIN KLICK AUF «START FOR FREE»", {
    x: 0.55, y: iy + ih + 0.12, w: iw, h: 0.3, margin: 0, fontSize: 8.5, bold: true, color: DIM, charSpacing: 1.5, fontFace: F,
  });
  s.addText("3 TAGE GRATIS TESTEN — DANN $1/MONAT FÜR 3 MONATE", {
    x: 6.83, y: iy + ih + 0.12, w: iw, h: 0.3, margin: 0, fontSize: 8.5, bold: true, color: DIM, charSpacing: 1.5, fontFace: F,
  });
  s.addText("Echte Screenshots von shopify.com · aufgenommen am 24.08.2026", {
    x: 0.55, y: 6.15, w: 11.5, h: 0.3, margin: 0, fontSize: 9.5, color: DIM, fontFace: F,
  });
})();

// 19c Entrepreneur
(() => {
  const s = slide(4);
  head(s, 4, "10 · Selber starten", "Werde Entrepreneur — heute noch");
  flow(s, 4, [
    ["shopify.com öffnen", "«Kostenlos starten» klicken — 3 Tage gratis, dann $1/Monat"],
    ["Produkt anlegen", "Foto, Text, Preis — 15 Minuten Arbeit"],
    ["Link teilen", "Instagram, TikTok, Klassenchat — die ersten Besucher"],
  ], 2.3, 2.0);
  s.addText([
    { text: "Jede Weltmarke auf Shopify hat genau so angefangen: ", options: { bold: true, color: INK } },
    { text: "mit einem leeren Shop und einer Idee. Kein Code, kein Startkapital — nur anfangen.", options: { color: SOFT } },
  ], { x: 0.55, y: 4.85, w: 11.8, h: 0.9, margin: 0, fontSize: 14.5, fontFace: F, lineSpacingMultiple: 1.25 });
})();

// 20 RESERVE 5 Schritte
(() => {
  const s = slide(4, true);
  head(s, 4, "10 · Selber machen", "In fünf Schritten zum eigenen Shop");
  flow(s, 4, [
    ["Konto", "shopify.com — 3 Tage gratis, dann CHF 1/Monat"],
    ["Produkte", "6 Artikel anlegen: Foto, Text, Preis"],
    ["Zahlung", "TWINT und Karte einschalten"],
    ["Versand", "Post-Tarife hinterlegen, versichert"],
    ["Testkauf", "Selber bestellen — Screenshot als Beweis"],
  ], 2.3, 2.0);
  lede(s, "Wie ein Tutorial: wer das nachmacht, hat am Wochenende einen eigenen Shop.", 4.8);
})();

// 21 Ablauf Bestellung
(() => {
  const s = slide(4);
  head(s, 4, "11 · Der Ablauf", "Von der Bestellung bis zur Tür");
  flow(s, 4, [
    ["Bestellung", "Nadia bestellt am Sonntagabend"],
    ["Zahlung", "TWINT, bestätigt in Sekunden"],
    ["Neuware", "Auftrag geht direkt an den Grossisten"],
    ["Refurbished", "Verschicken wir selber — versichert"],
    ["Zustellung", "2–3 Tage, Rechnung per Mail"],
  ], 2.3, 2.0);
  lede(s, "Teure Geräte reisen bei uns immer versichert — ein verlorenes iPhone wäre ein halber Monatsgewinn.", 4.8);
})();

// 22 RESERVE Zahlung
(() => {
  const s = slide(4, true);
  head(s, 4, "12 · Zahlung & Versand", "Bezahlen — und eine bewusste Lücke");
  cards(s, 4, [
    ["Zahlung", "TWINT zuerst", "Die meistgenutzte Zahlungsart der Schweiz. Ohne sie verliert man Bestellungen."],
    ["Zahlung", "Karte", "Für alle anderen — abgewickelt über Shopify Payments."],
    ["Bewusst NICHT", "Kauf auf Rechnung", "Bei 800-Franken-Geräten zu viel Betrugsrisiko. Eine Risikoentscheidung."],
  ], 2.3, 2.7);
})();

// 23 Handover Kim
handover(5, "Kim", "Recht, Zahlen und Schluss", "1–2 MINUTEN");

// 24 RESERVE Recht
(() => {
  const s = slide(5, true);
  head(s, 5, "13 · Recht", "Was das Gesetz verlangt");
  cards2rows(s, 5, [
    ["Pflicht · UWG", "Impressum", "Name, Adresse, E-Mail — auffindbar, ohne suchen zu müssen."],
    ["Pflicht · revDSG", "Datenschutz", "Was wird gespeichert, wie lange, warum — und wie man es löschen lässt."],
    ["Pflicht · OR", "Gewährleistung", "Neu: 2 Jahre. Refurbished: per AGB auf 1 Jahr verkürzt — erlaubt und ehrlich angeschrieben."],
    ["Freiwillig", "14 Tage Rückgabe", "Ein gesetzliches Widerrufsrecht gibt es in der Schweiz nicht. Wir geben es trotzdem."],
  ], 1.95, 2.1);
  s.addText("Preise immer inklusive 8.1 % MWST — Pflicht nach PBV.", {
    x: 0.55, y: 6.45, w: 11.5, h: 0.3, margin: 0, fontSize: 9.5, color: DIM, fontFace: F,
  });
})();

// 25 Rechnung
(() => {
  const s = slide(5);
  head(s, 5, "14 · Die Rechnung", "Viel Umsatz, wenig Marge");
  s.addText("Annahme: 20 Bestellungen im Monat, Durchschnitt CHF 500, Mischung aus neu und refurbished.", {
    x: 0.55, y: 1.62, w: 11.5, h: 0.35, margin: 0, fontSize: 12, color: SOFT, fontFace: F,
  });
  const rows = [
    ["Umsatz", "CHF 10'000"], ["Wareneinkauf", "− CHF 8'800"], ["Zahlungsgebühren", "− CHF 200"],
    ["Retouren-Reserve", "− CHF 200"], ["Shopify und Domain", "− CHF 50"],
  ];
  let y = 2.2;
  rows.forEach(([a, b]) => {
    s.addText(a, { x: 0.75, y, w: 4.5, h: 0.42, margin: 0, fontSize: 13, color: SOFT, fontFace: F, valign: "middle" });
    s.addText(b, { x: 4.3, y, w: 2.6, h: 0.42, margin: 0, fontSize: 13, color: INK, fontFace: F, align: "right", valign: "middle" });
    s.addShape(pres.ShapeType.line, { x: 0.75, y: y + 0.44, w: 6.15, h: 0, line: { color: EDGE, width: 0.75 } });
    y += 0.5;
  });
  s.addShape(pres.ShapeType.line, { x: 0.75, y: y + 0.04, w: 6.15, h: 0, line: { color: ACC[5], width: 1.5 } });
  s.addText("Bleibt im Monat", { x: 0.75, y: y + 0.1, w: 4.5, h: 0.5, margin: 0, fontSize: 16, bold: true, color: ACC[5], fontFace: F, valign: "middle" });
  s.addText("CHF 750", { x: 4.3, y: y + 0.1, w: 2.6, h: 0.5, margin: 0, fontSize: 16, bold: true, color: ACC[5], fontFace: F, align: "right", valign: "middle" });
  // split bar
  const bx = 7.6, bw = 5.0, by = 3.2;
  s.addText("VON JEDEM FRANKEN UMSATZ BLEIBEN 7 RAPPEN", {
    x: bx, y: by - 0.5, w: bw, h: 0.3, margin: 0, fontSize: 9.5, bold: true, color: DIM, charSpacing: 1.5, fontFace: F,
  });
  s.addShape(pres.ShapeType.rect, { x: bx, y: by, w: bw * 0.925, h: 0.35, fill: { color: EDGE } });
  s.addShape(pres.ShapeType.rect, { x: bx + bw * 0.925, y: by, w: bw * 0.075, h: 0.35, fill: { color: ACC[5] } });
  s.addText("Kosten · CHF 9'250", { x: bx, y: by + 0.42, w: 3, h: 0.3, margin: 0, fontSize: 9.5, color: DIM, fontFace: F });
  s.addText("bleibt · CHF 750", { x: bx + bw - 3, y: by + 0.42, w: 3, h: 0.3, margin: 0, fontSize: 9.5, bold: true, color: ACC[5], fontFace: F, align: "right" });
  s.addText("Elektronikhandel heisst: viel Umsatz, wenig Marge. Genau darum sind die refurbished-Geräte so wichtig — dort bleiben 20 Rappen pro Franken, nicht 7.", {
    x: bx, y: by + 1.0, w: bw, h: 1.6, margin: 0, fontSize: 11.5, color: SOFT, fontFace: F, lineSpacingMultiple: 1.25,
  });
})();

// 26 RESERVE Chancen/Risiken
(() => {
  const s = slide(5, true);
  head(s, 5, "15 · Chancen und Risiken", "Was schiefgehen kann");
  cards2rows(s, 5, [
    ["Risiko", "Der Preiskrieg", "Digitec kann jeden Neuware-Preis unterbieten. Antwort: dort nicht kämpfen — refurbished ist unser Feld."],
    ["Risiko", "Betrug und Schäden", "Teure Geräte ziehen Betrug an. Antwort: kein Rechnungskauf, immer versicherter Versand."],
    ["Chance", "Refurbished wächst", "Nachhaltigkeit ist Kaufgrund geworden — geprüfte Occasion ist kein Notkauf mehr."],
    ["Chance", "Jedes Jahr Nachschub", "Jede neue Geräte-Generation macht den Occasionsmarkt grösser."],
  ], 1.95, 2.2);
})();

// 27 RESERVE Drei Dinge
(() => {
  const s = slide(5, true);
  head(s, 5, "16 · Was wir gelernt haben", "Drei Dinge");
  points(s, 5, [
    ["Markenware ist ein Volumengeschäft.", "Die Marge liegt nicht im Logo — sie liegt im zweiten Leben der Geräte."],
    ["Der Preis allein verkauft nicht.", "Vertrauen verkauft: Garantie, TWINT, eine Schweizer Adresse."],
    ["Wir haben noch nichts verkauft.", "Alle Zahlen sind gerechnet, nicht gemessen. Das sagen wir lieber selber."],
  ], 2.4, 1.2);
})();

// 28 Danke
(() => {
  const s = slide(5);
  s.addText("FAIRTECH SCHWEIZ", {
    x: 1.67, y: 2.2, w: 10, h: 0.35, margin: 0, align: "center",
    fontSize: 12, bold: true, color: DIM, charSpacing: 5, fontFace: F,
  });
  s.addText("Danke.", {
    x: 1.67, y: 2.7, w: 10, h: 1.6, margin: 0, align: "center", valign: "middle",
    fontSize: 76, bold: true, color: ACC[5], fontFace: F,
  });
  s.addText("Yassin · Rayaan · Fernando · Samed · Kim", {
    x: 1.67, y: 4.55, w: 10, h: 0.45, margin: 0, align: "center", fontSize: 15, color: SOFT, fontFace: F,
  });
  s.addText("FRAGEN?", {
    x: 1.67, y: 5.15, w: 10, h: 0.35, margin: 0, align: "center",
    fontSize: 12, bold: true, color: DIM, charSpacing: 4, fontFace: F,
  });
})();

pres.writeFile({ fileName: "Fairtech-Schweiz.pptx" }).then(() => console.log("written"));
