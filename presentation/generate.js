// Shopify-Präsentation — dark, minimal, Apple-like. 16:9 wide (13.33 x 7.5 in)
const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";

// ---------- design tokens ----------
const BG = "0D0E12";      // near-black
const CARD = "16181F";    // card fill
const CARD2 = "1C1F28";   // slightly lighter card
const LINE = "262933";    // hairline
const WHITE = "FFFFFF";
const SOFT = "C7CBD4";    // soft light
const MUTED = "9AA0AC";   // muted gray
const FAINT = "5A5F6B";   // faint gray
const GREEN = "95BF47";   // Shopify green
const DGREEN = "5E8E3E";
const RED = "D96A62";
const FONT = "Arial";

const W = 13.333, H = 7.5;
let pageNo = 0;

function newSlide() {
  const s = pres.addSlide();
  s.background = { color: BG };
  pageNo++;
  return s;
}

// persistent chrome (excluded from entrance animation via objectName prefix)
function chrome(s, kicker) {
  s.addText("S", {
    objectName: "chrome-logo", shape: pres.ShapeType.roundRect, rectRadius: 0.05,
    x: 0.55, y: 0.36, w: 0.3, h: 0.3, fill: { color: GREEN },
    align: "center", valign: "middle", fontSize: 13, bold: true, color: BG, fontFace: FONT, margin: 0,
  });
  s.addText(kicker, {
    objectName: "chrome-kicker", x: 1.0, y: 0.36, w: 9, h: 0.3, margin: 0,
    fontSize: 10.5, bold: true, color: GREEN, charSpacing: 3, fontFace: FONT, valign: "middle",
  });
  s.addText("Shopify · E-Commerce · Gruppenarbeit", {
    objectName: "chrome-footer", x: 0.55, y: 7.1, w: 5, h: 0.26, margin: 0,
    fontSize: 8.5, color: FAINT, fontFace: FONT, valign: "middle",
  });
  s.addText(String(pageNo), {
    objectName: "chrome-page", x: 12.5, y: 7.1, w: 0.28, h: 0.26, margin: 0,
    fontSize: 8.5, color: FAINT, fontFace: FONT, align: "right", valign: "middle",
  });
}

function bigTitle(s, text, opts = {}) {
  s.addText(text, {
    x: 0.55, y: 0.78, w: 12.2, h: 0.62, margin: 0,
    fontSize: 33, bold: true, color: WHITE, fontFace: FONT, valign: "middle", ...opts,
  });
}

function card(s, x, y, w, h, fill = CARD, lineColor = LINE, lineW = 0.75) {
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.09, fill: { color: fill }, line: { color: lineColor, width: lineW },
  });
}

function numCircle(s, x, y, d, label, fillColor = GREEN, textColor = BG) {
  s.addText(label, {
    shape: pres.ShapeType.ellipse, x, y, w: d, h: d, fill: { color: fillColor },
    align: "center", valign: "middle", fontSize: d >= 0.4 ? 14 : 12, bold: true, color: textColor,
    fontFace: FONT, margin: 0,
  });
}

// bold lead + muted description in one box
function leadDesc(s, x, y, w, h, lead, desc, leadSize = 14, descSize = 11.5) {
  s.addText(
    [
      { text: lead, options: { fontSize: leadSize, bold: true, color: WHITE, breakLine: true } },
      { text: desc, options: { fontSize: descSize, color: MUTED } },
    ],
    { x, y, w, h, margin: 0, fontFace: FONT, valign: "top", lineSpacingMultiple: 1.12 }
  );
}

// ================= SLIDE 1 — TITLE =================
(() => {
  const s = newSlide();
  s.addText("S", {
    shape: pres.ShapeType.roundRect, rectRadius: 0.16, x: 6.24, y: 1.05, w: 0.85, h: 0.85,
    fill: { color: GREEN }, align: "center", valign: "middle",
    fontSize: 38, bold: true, color: BG, fontFace: FONT, margin: 0,
  });
  s.addText("GRUPPENARBEIT · E-COMMERCE · 2026", {
    x: 2.17, y: 2.2, w: 9, h: 0.35, margin: 0, align: "center",
    fontSize: 12, bold: true, color: GREEN, charSpacing: 4, fontFace: FONT,
  });
  s.addText("Shopify", {
    x: 1.17, y: 2.6, w: 11, h: 1.55, margin: 0, align: "center", valign: "middle",
    fontSize: 88, bold: true, color: WHITE, fontFace: FONT,
  });
  s.addText("Wie man einen eigenen Online-Shop aufbaut –\nund mit digitalen Produkten Geld verdient.", {
    x: 2.67, y: 4.35, w: 8, h: 0.95, margin: 0, align: "center",
    fontSize: 17, color: SOFT, fontFace: FONT, lineSpacingMultiple: 1.25,
  });
  s.addText("Yassin  ·  Rayan  ·  Hovadik  ·  Kim  ·  Bruno", {
    x: 2.17, y: 6.15, w: 9, h: 0.35, margin: 0, align: "center",
    fontSize: 12, color: MUTED, fontFace: FONT,
  });
  s.addText("Berufsschule · ca. 18 Minuten", {
    x: 2.17, y: 6.55, w: 9, h: 0.3, margin: 0, align: "center",
    fontSize: 10.5, color: FAINT, fontFace: FONT,
  });
  s.addNotes(
    "PERSON 1 (0:00–0:45): Guten Morgen zusammen. Stellt euch vor, ihr eröffnet ein Geschäft – aber ohne Ladenlokal, ohne Miete und ohne Personal. Es hat 24 Stunden am Tag geöffnet, und eure Kundschaft sitzt auf der ganzen Welt. Genau das ist heute möglich – und wie das geht, zeigen wir euch in den nächsten 18 Minuten. Unser Thema: Shopify – wie man einen eigenen Online-Shop aufbaut und sogar mit digitalen Produkten Geld verdient."
  );
})();

// ================= SLIDE 2 — AGENDA =================
(() => {
  const s = newSlide();
  chrome(s, "AGENDA");
  bigTitle(s, "Ablauf & Team");
  s.addText("12 Folien · 5 Sprecher:innen · ca. 17–18 Minuten", {
    x: 0.55, y: 1.42, w: 10, h: 0.3, margin: 0, fontSize: 12.5, color: MUTED, fontFace: FONT,
  });
  const rows = [
    ["1", "Einstieg: E-Commerce heute", "Yassin", "Folien 1–3", "3 Min"],
    ["2", "Was ist Shopify & Shop bauen in 5 Schritten", "Rayan", "Folien 4–5", "4 Min"],
    ["3", "Kosten & Gebühren", "Hovadik", "Folie 6", "3 Min"],
    ["4", "Digitale Produkte verkaufen & Geld verdienen", "Kim", "Folien 7–9", "4,5 Min"],
    ["5", "Vorteile, Nachteile & Fazit", "Bruno", "Folien 10–12", "3,5 Min"],
  ];
  let y = 1.9;
  for (const [n, title, who, slides, min] of rows) {
    card(s, 0.55, y, 12.23, 0.82);
    numCircle(s, 0.85, y + 0.21, 0.4, n);
    s.addText(title, {
      x: 1.5, y: y, w: 7.4, h: 0.82, margin: 0, fontSize: 14.5, bold: true, color: WHITE,
      fontFace: FONT, valign: "middle",
    });
    s.addText(
      [
        { text: who + "   ·   " + slides, options: { fontSize: 11, color: MUTED } },
      ],
      { x: 9.0, y: y, w: 2.4, h: 0.82, margin: 0, fontFace: FONT, valign: "middle", align: "right" }
    );
    s.addText(min, {
      x: 11.5, y: y, w: 1.1, h: 0.82, margin: 0, fontSize: 13, bold: true, color: GREEN,
      fontFace: FONT, valign: "middle", align: "right",
    });
    y += 0.96;
  }
  s.addNotes(
    "PERSON 1 (0:45–1:15): Kurz zum Ablauf: Ich starte mit den Grundlagen des E-Commerce. Danach erklärt [Name 2], was Shopify ist und wie man in fünf Schritten einen Shop baut. [Name 3] zeigt, was das kostet. [Name 4] kommt zum spannendsten Teil – wie man mit digitalen Produkten Geld verdient. Und [Name 5] schliesst mit Vor- und Nachteilen und unserem Fazit ab."
  );
})();

// ================= SLIDE 3 — E-COMMERCE =================
(() => {
  const s = newSlide();
  chrome(s, "TEIL 1 · GRUNDLAGEN");
  bigTitle(s, "Was ist E-Commerce?");
  // left: definition + 3 rows
  card(s, 0.55, 1.8, 7.1, 1.2, CARD2);
  s.addText(
    [
      { text: "E-Commerce = Kaufen und Verkaufen über das Internet.", options: { fontSize: 16, bold: true, color: WHITE, breakLine: true } },
      { text: "Vom T-Shirt bis zum Online-Kurs: Gehandelt wird alles – bezahlt wird digital.", options: { fontSize: 12, color: MUTED } },
    ],
    { x: 0.85, y: 1.98, w: 6.5, h: 0.9, margin: 0, fontFace: FONT, lineSpacingMultiple: 1.15 }
  );
  const rows = [
    ["Offen rund um die Uhr", "Dein Shop verkauft auch nachts und am Wochenende – ganz ohne Personal."],
    ["Weltweit erreichbar", "Kundschaft in über 175 Ländern statt nur im eigenen Dorf."],
    ["Tiefe Startkosten", "Kein Ladenlokal, keine Miete – Start direkt vom Laptop aus."],
  ];
  let y = 3.35;
  for (const [lead, desc] of rows) {
    s.addShape(pres.ShapeType.roundRect, {
      x: 0.62, y: y + 0.09, w: 0.16, h: 0.16, rectRadius: 0.04, fill: { color: GREEN },
    });
    leadDesc(s, 1.0, y, 6.6, 1.0, lead, desc);
    y += 1.12;
  }
  // right: 3 stat cards
  const stats = [
    ["24/7", "geöffnet – ohne Personal, ohne Pause"],
    ["175+", "Länder mit einem einzigen Klick erreichbar"],
    ["0 €", "Ladenmiete – der Shop wohnt im Internet"],
  ];
  let sy = 1.8;
  for (const [num, label] of stats) {
    card(s, 8.05, sy, 4.73, 1.5);
    s.addText(num, {
      x: 8.4, y: sy + 0.18, w: 4.0, h: 0.7, margin: 0, fontSize: 34, bold: true, color: GREEN, fontFace: FONT,
    });
    s.addText(label, {
      x: 8.4, y: sy + 0.92, w: 4.1, h: 0.45, margin: 0, fontSize: 11, color: MUTED, fontFace: FONT,
    });
    sy += 1.68;
  }
  s.addNotes(
    "PERSON 1 (1:15–3:00): Zuerst: Was ist E-Commerce überhaupt? E-Commerce heisst einfach: Kaufen und Verkaufen über das Internet. Vom T-Shirt bis zum Online-Kurs – gehandelt wird alles, bezahlt wird digital. Warum ist das so stark? Drei Gründe: Erstens – ein Online-Shop hat rund um die Uhr geöffnet, auch nachts und am Wochenende, ganz ohne Personal. Zweitens – ihr erreicht Menschen in über 175 Ländern, nicht nur die Leute aus eurem Dorf. Und drittens – die Startkosten sind winzig: keine Ladenmiete, kein Umbau. Ein Laptop reicht. Und genau hier kommt Shopify ins Spiel – [Name 2], übernimm!"
  );
})();

// ================= SLIDE 4 — WAS IST SHOPIFY =================
(() => {
  const s = newSlide();
  chrome(s, "TEIL 2 · DIE PLATTFORM");
  bigTitle(s, "Was ist Shopify?");
  s.addText("Der Baukasten für Online-Shops: Shop, Design, Kasse, Zahlungen und Versand – ohne eine Zeile Code.", {
    x: 0.55, y: 1.42, w: 11.5, h: 0.35, margin: 0, fontSize: 13.5, color: SOFT, fontFace: FONT,
  });
  const stats = [
    ["3 Mio.+", "aktive Shops weltweit laufen auf Shopify"],
    ["175+", "Länder – vom Kleinstshop bis zur Weltmarke"],
    ["378 Mrd. $", "Umsatz machten die Shopify-Händler im Jahr 2025"],
    ["~46 %", "Marktanteil unter allen Shop-Systemen weltweit"],
  ];
  const gw = 6.0, gh = 1.85, gx = 0.55, gy = 2.0, gap = 0.22;
  stats.forEach(([num, label], i) => {
    const x = gx + (i % 2) * (gw + gap);
    const y = gy + Math.floor(i / 2) * (gh + gap);
    card(s, x, y, gw, gh);
    s.addText(num, {
      x: x + 0.35, y: y + 0.28, w: gw - 0.7, h: 0.75, margin: 0,
      fontSize: 36, bold: true, color: GREEN, fontFace: FONT,
    });
    s.addText(label, {
      x: x + 0.35, y: y + 1.1, w: gw - 0.7, h: 0.6, margin: 0,
      fontSize: 12, color: MUTED, fontFace: FONT,
    });
  });
  s.addText("Bekannt aus:  Gymshark  ·  Kylie Cosmetics  ·  Allbirds  ·  Snocks  —  alle laufen auf Shopify.", {
    x: 0.55, y: 6.25, w: 12.23, h: 0.4, margin: 0, align: "center",
    fontSize: 12, italic: true, color: MUTED, fontFace: FONT,
  });
  s.addNotes(
    "PERSON 2 (3:00–5:00): Danke! Shopify ist wie ein Baukasten für Online-Shops: Shop, Kasse, Zahlungen und Versand – alles aus einer Hand, ohne eine einzige Zeile Code. Ein paar Zahlen, damit ihr seht, wie gross das ist: Über 3 Millionen aktive Shops laufen auf Shopify, in über 175 Ländern. Allein im Jahr 2025 haben die Händler auf Shopify 378 Milliarden Dollar Umsatz gemacht. Und unter allen Shop-Systemen weltweit hat Shopify rund 46 Prozent Marktanteil – fast jeder zweite professionelle Online-Shop. Vielleicht kennt ihr sogar welche: Gymshark, Kylie Cosmetics, Allbirds oder Snocks – die laufen alle auf Shopify. Die haben genauso angefangen wie jeder andere: mit einem leeren Shop."
  );
})();

// ================= SLIDE 5 — 5 SCHRITTE + MOCKUP =================
(() => {
  const s = newSlide();
  chrome(s, "TEIL 2 · SO GEHT'S");
  bigTitle(s, "In 5 Schritten zum eigenen Shop");
  const steps = [
    ["Konto erstellen", "Gratis-Test starten – eine E-Mail-Adresse genügt."],
    ["Design wählen", "Fertiges Theme aussuchen, Farben und Logo anpassen."],
    ["Produkte anlegen", "Fotos hochladen, Beschreibung schreiben, Preis festlegen."],
    ["Zahlungen aktivieren", "Karte, PayPal, Apple Pay – 1 Klick mit Shopify Payments."],
    ["Domain verbinden & live gehen", "Zum Beispiel www.meinshop.ch – fertig!"],
  ];
  let y = 1.85;
  steps.forEach(([lead, desc], i) => {
    numCircle(s, 0.55, y + 0.05, 0.36, String(i + 1));
    leadDesc(s, 1.12, y, 5.9, 0.95, lead, desc, 13.5, 11);
    y += 0.98;
  });
  // browser mockup
  const mx = 7.45, my = 1.8, mw = 5.35, mh = 5.0;
  card(s, mx, my, mw, mh, CARD, LINE, 1);
  // browser top bar
  s.addShape(pres.ShapeType.roundRect, { x: mx + 0.18, y: my + 0.18, w: mw - 0.36, h: 0.4, rectRadius: 0.06, fill: { color: "1F222B" } });
  [0, 1, 2].forEach((i) => {
    s.addShape(pres.ShapeType.ellipse, { x: mx + 0.34 + i * 0.2, y: my + 0.32, w: 0.12, h: 0.12, fill: { color: "3A3E49" } });
  });
  s.addText("meinshop.ch", {
    x: mx + 1.2, y: my + 0.18, w: mw - 2.0, h: 0.4, margin: 0, align: "center", valign: "middle",
    fontSize: 9.5, color: MUTED, fontFace: FONT,
  });
  // product image area
  s.addShape(pres.ShapeType.roundRect, { x: mx + 0.35, y: my + 0.8, w: mw - 0.7, h: 2.0, rectRadius: 0.08, fill: { color: "222733" } });
  s.addText("S", {
    shape: pres.ShapeType.roundRect, rectRadius: 0.12, x: mx + mw / 2 - 0.33, y: my + 1.45, w: 0.66, h: 0.66,
    fill: { color: GREEN }, align: "center", valign: "middle", fontSize: 28, bold: true, color: BG, fontFace: FONT, margin: 0,
  });
  s.addText("Prüfungs-Guide (E-Book)", {
    x: mx + 0.35, y: my + 2.95, w: mw - 0.7, h: 0.35, margin: 0, fontSize: 14, bold: true, color: WHITE, fontFace: FONT,
  });
  s.addText("PDF · 45 Seiten · Sofort-Download", {
    x: mx + 0.35, y: my + 3.3, w: mw - 0.7, h: 0.3, margin: 0, fontSize: 10.5, color: MUTED, fontFace: FONT,
  });
  s.addText("19.00 €", {
    x: mx + 0.35, y: my + 3.68, w: 2.0, h: 0.4, margin: 0, fontSize: 17, bold: true, color: GREEN, fontFace: FONT, valign: "middle",
  });
  s.addText("Jetzt kaufen", {
    shape: pres.ShapeType.roundRect, rectRadius: 0.08, x: mx + 0.35, y: my + 4.2, w: mw - 0.7, h: 0.52,
    fill: { color: GREEN }, align: "center", valign: "middle", fontSize: 13, bold: true, color: BG, fontFace: FONT, margin: 0,
  });
  s.addNotes(
    "PERSON 2 (5:00–7:00): Und so einfach geht das – in fünf Schritten: 1. Konto erstellen: Gratis-Test starten, eine E-Mail-Adresse genügt. 2. Design wählen: fertiges Theme aussuchen und Farben und Logo anpassen – wie bei Instagram ein Profil einrichten. 3. Produkte anlegen: Foto hochladen, Beschreibung schreiben, Preis festlegen. 4. Zahlungen aktivieren: Mit Shopify Payments akzeptiert man mit einem Klick Kreditkarte, PayPal und Apple Pay. 5. Domain verbinden und live gehen, zum Beispiel www.meinshop.ch. Hier rechts seht ihr, wie so eine fertige Produktseite aussieht. Ein kompletter Shop an einem Nachmittag – ohne Programmieren. Aber was kostet der Spass? [Name 3]!"
  );
})();

// ================= SLIDE 6 — KOSTEN =================
(() => {
  const s = newSlide();
  chrome(s, "TEIL 3 · KOSTEN");
  bigTitle(s, "Was kostet Shopify?");
  const plans = [
    ["Basic", "36 €", "Der richtige Plan für den Start", "Zahlungsgebühr: 2,9 % + 0,30 €", "Alles Wichtige ist dabei", true],
    ["Grow", "105 €", "Lohnt sich ab ca. 10'000 € Umsatz/Monat", "Zahlungsgebühr: 2,7 % + 0,30 €", "Mehr Mitarbeiter-Konten & Berichte", false],
    ["Advanced", "384 €", "Für grosse Shops ab ca. 50'000 €/Monat", "Zahlungsgebühr: 2,5 % + 0,30 €", "Tiefste Gebühren, alle Funktionen", false],
  ];
  const pw = 3.94, ph = 3.55, py = 1.95, gap = 0.205;
  plans.forEach(([name, price, l1, l2, l3, hot], i) => {
    const x = 0.55 + i * (pw + gap);
    card(s, x, py, pw, ph, CARD, hot ? GREEN : LINE, hot ? 1.5 : 0.75);
    if (hot) {
      s.addText("UNSERE EMPFEHLUNG", {
        x: x + 0.3, y: py + 0.22, w: pw - 0.6, h: 0.25, margin: 0,
        fontSize: 9, bold: true, color: GREEN, charSpacing: 2, fontFace: FONT,
      });
    }
    s.addText(name, {
      x: x + 0.3, y: py + 0.5, w: pw - 0.6, h: 0.4, margin: 0,
      fontSize: 16, bold: true, color: WHITE, fontFace: FONT,
    });
    s.addText(
      [
        { text: price, options: { fontSize: 34, bold: true, color: hot ? GREEN : SOFT } },
        { text: "  / Monat", options: { fontSize: 11, color: MUTED } },
      ],
      { x: x + 0.3, y: py + 0.95, w: pw - 0.6, h: 0.7, margin: 0, fontFace: FONT, valign: "middle" }
    );
    s.addShape(pres.ShapeType.line, { x: x + 0.3, y: py + 1.85, w: pw - 0.6, h: 0, line: { color: LINE, width: 0.75 } });
    [l1, l2, l3].forEach((t, j) => {
      s.addText(t, {
        x: x + 0.3, y: py + 2.0 + j * 0.48, w: pw - 0.6, h: 0.46, margin: 0,
        fontSize: 10.5, color: MUTED, fontFace: FONT, valign: "middle",
      });
    });
  });
  s.addText(
    [
      { text: "Gut zu wissen:  ", options: { fontSize: 11.5, bold: true, color: WHITE } },
      { text: "Jahresabo bis 25 % günstiger · eigene Domain ca. 15 €/Jahr · Gratis-Testphase zum Ausprobieren, bevor man etwas bezahlt.", options: { fontSize: 11.5, color: MUTED } },
    ],
    { x: 0.55, y: 5.85, w: 12.23, h: 0.6, margin: 0, fontFace: FONT, valign: "middle" }
  );
  s.addNotes(
    "PERSON 3 (7:00–10:00): Danke! Die wichtigste Frage: Was kostet das? Shopify hat drei Haupt-Pläne. Der Basic-Plan kostet 36 Euro im Monat – das ist der richtige für den Start, darum ist er grün markiert. Der Grow-Plan für 105 Euro lohnt sich erst ab etwa 10'000 Euro Umsatz pro Monat, und Advanced für 384 Euro ist für richtig grosse Shops. Wichtig: Dazu kommen Zahlungsgebühren bei jedem Verkauf – im Basic-Plan 2,9 Prozent plus 30 Cent. Verkauft ihr etwas für 100 Euro, gehen etwa 3 Euro an Gebühren weg. Drei Spar-Tipps: Mit dem Jahresabo spart man bis zu 25 Prozent. Eine eigene Domain kostet nur etwa 15 Euro im Jahr. Und man kann Shopify gratis testen, bevor man überhaupt etwas bezahlt. Für unter 40 Euro im Monat bekommt man also, wofür man früher ein Ladenlokal brauchte. Und jetzt kommt der Teil, auf den ihr gewartet habt – Geld verdienen. [Name 4]!"
  );
})();

// ================= SLIDE 7 — DIGITALE PRODUKTE: WARUM =================
(() => {
  const s = newSlide();
  chrome(s, "TEIL 4 · DIGITALE PRODUKTE");
  bigTitle(s, "Digitale Produkte: Geld verdienen ohne Lager");
  // left big stat
  card(s, 0.55, 1.8, 4.6, 4.95, CARD2);
  s.addText("157 Mrd. $", {
    x: 0.9, y: 2.3, w: 4.0, h: 0.9, margin: 0, fontSize: 44, bold: true, color: GREEN, fontFace: FONT,
  });
  s.addText("gaben Menschen 2026 weltweit für digitale Produkte aus – E-Books, Kurse, Vorlagen, Musik.", {
    x: 0.9, y: 3.3, w: 3.9, h: 1.0, margin: 0, fontSize: 12.5, color: SOFT, fontFace: FONT, lineSpacingMultiple: 1.2,
  });
  s.addText("„Einmal erstellen –\nunendlich oft verkaufen.“", {
    x: 0.9, y: 5.3, w: 3.9, h: 1.1, margin: 0, fontSize: 15, italic: true, bold: true, color: WHITE,
    fontFace: FONT, lineSpacingMultiple: 1.2,
  });
  // right benefits
  const rows = [
    ["Kein Lager, kein Versand", "Die Datei liefert sich in Sekunden von selbst aus – vollautomatisch."],
    ["Fast 100 % Marge", "Eine PDF kostet in der Herstellung: nichts. Fast alles ist Gewinn."],
    ["Unbegrenzt skalierbar", "10 oder 10'000 Verkäufe – der Aufwand bleibt exakt gleich."],
    ["Perfekt für den Einstieg", "Ohne Startkapital machbar – auch neben der Schule."],
  ];
  let y = 1.8;
  for (const [lead, desc] of rows) {
    card(s, 5.45, y, 7.33, 1.12);
    s.addShape(pres.ShapeType.roundRect, { x: 5.75, y: y + 0.47, w: 0.16, h: 0.16, rectRadius: 0.04, fill: { color: GREEN } });
    leadDesc(s, 6.1, y + 0.22, 6.4, 0.8, lead, desc, 13.5, 11);
    y += 1.28;
  }
  s.addNotes(
    "PERSON 4 (10:00–11:30): Danke! Jetzt wird's spannend. Die meisten denken bei Online-Shops an Kleider oder Elektronik. Aber es gibt eine Kategorie, die viel schlauer ist: digitale Produkte – also E-Books, Online-Kurse, Vorlagen, Musik. Der Markt dafür ist riesig: 157 Milliarden Dollar wurden 2026 weltweit für digitale Produkte ausgegeben. Warum sind sie so genial? Es gibt kein Lager und keinen Versand – die Datei liefert sich in Sekunden selbst aus. Die Marge liegt bei fast 100 Prozent, denn eine PDF kostet in der Herstellung nichts. Und ob ihr 10 oder 10'000 Stück verkauft – der Aufwand bleibt exakt gleich. Einmal erstellen, unendlich oft verkaufen. Perfekt für Leute wie uns, ohne Startkapital."
  );
})();

// ================= SLIDE 8 — DIGITAL: SO GEHT'S =================
(() => {
  const s = newSlide();
  chrome(s, "TEIL 4 · DIGITALE PRODUKTE");
  bigTitle(s, "So verkaufst du digitale Produkte auf Shopify");
  const steps = [
    ["App installieren", "„Digital Downloads“ – die offizielle App von Shopify, gratis."],
    ["Datei hochladen", "PDF, ZIP, MP3 oder Video einfach ans Produkt anhängen."],
    ["Versand ausschalten", "Haken setzen bei „kein physisches Produkt“ – nichts zu verschicken."],
    ["Fertig – alles automatisch", "Kunde zahlt und erhält den Download-Link sofort per E-Mail."],
  ];
  let y = 1.85;
  steps.forEach(([lead, desc], i) => {
    numCircle(s, 0.55, y + 0.08, 0.36, String(i + 1));
    leadDesc(s, 1.12, y, 5.6, 1.05, lead, desc, 13.5, 11);
    y += 1.22;
  });
  // right: ideas grid
  s.addText("Was sich verkauft (typische Preise):", {
    x: 7.15, y: 1.8, w: 5.6, h: 0.3, margin: 0, fontSize: 12, bold: true, color: SOFT, fontFace: FONT,
  });
  const ideas = [
    ["E-Books & Guides", "9 – 49 €"],
    ["Online-Kurse", "49 – 299 €"],
    ["Templates (Canva, Notion, CV)", "29 – 149 €"],
    ["Presets, Musik & Fotos", "5 – 99 €"],
  ];
  const iw = 2.71, ih = 1.5, ix = 7.15, iy = 2.25, igap = 0.18;
  ideas.forEach(([name, price], i) => {
    const x = ix + (i % 2) * (iw + igap);
    const yy = iy + Math.floor(i / 2) * (ih + igap);
    card(s, x, yy, iw, ih);
    s.addText(name, {
      x: x + 0.22, y: yy + 0.2, w: iw - 0.44, h: 0.75, margin: 0,
      fontSize: 12, bold: true, color: WHITE, fontFace: FONT, lineSpacingMultiple: 1.1,
    });
    s.addText(price, {
      x: x + 0.22, y: yy + 1.02, w: iw - 0.44, h: 0.35, margin: 0,
      fontSize: 13, bold: true, color: GREEN, fontFace: FONT,
    });
  });
  card(s, 7.15, 5.75, 5.6, 1.0, CARD2, DGREEN, 1);
  s.addText(
    [
      { text: "Unsere Idee: ", options: { fontSize: 11.5, bold: true, color: GREEN } },
      { text: "eine Lernzusammenfassung als PDF für 5 € – jede:r von uns könnte damit morgen starten.", options: { fontSize: 11.5, italic: true, color: SOFT } },
    ],
    { x: 7.4, y: 5.85, w: 5.1, h: 0.8, margin: 0, fontFace: FONT, valign: "middle", lineSpacingMultiple: 1.15 }
  );
  s.addNotes(
    "PERSON 4 (11:30–13:00): Und so einfach ist das auf Shopify: Man installiert die App ‚Digital Downloads' – die ist von Shopify selbst und gratis. Dann hängt man die Datei ans Produkt – PDF, ZIP, MP3 oder Video. Man schaltet den Versand aus, weil es nichts zu verschicken gibt. Fertig. Der Kunde bezahlt und bekommt den Download-Link sofort automatisch per E-Mail – sogar während ihr schlaft. Was verkauft sich? E-Books für 9 bis 49 Euro. Online-Kurse für 49 bis 299 Euro. Vorlagen – Canva-Templates, Notion-Vorlagen, Lebenslauf-Designs – für 29 bis 149 Euro. Oder Presets, Musik und Fotos. Unsere Idee für die Klasse: eine gute Lernzusammenfassung als PDF für 5 Euro – jede:r von uns könnte damit morgen starten."
  );
})();

// ================= SLIDE 9 — RECHENBEISPIEL =================
(() => {
  const s = newSlide();
  chrome(s, "TEIL 4 · RECHENBEISPIEL");
  bigTitle(s, "Rechenbeispiel: Ein E-Book, ein Monat");
  // left math card
  card(s, 0.55, 1.8, 5.3, 4.95, CARD2);
  s.addText("E-Book „Prüfungs-Guide“", {
    x: 0.9, y: 2.05, w: 4.6, h: 0.4, margin: 0, fontSize: 15, bold: true, color: WHITE, fontFace: FONT,
  });
  s.addText("19 € × 100 Verkäufe im Monat", {
    x: 0.9, y: 2.45, w: 4.6, h: 0.35, margin: 0, fontSize: 12.5, color: MUTED, fontFace: FONT,
  });
  s.addText("= 1'900 € Umsatz", {
    x: 0.9, y: 2.85, w: 4.6, h: 0.55, margin: 0, fontSize: 22, bold: true, color: SOFT, fontFace: FONT,
  });
  s.addShape(pres.ShapeType.line, { x: 0.9, y: 3.55, w: 4.6, h: 0, line: { color: LINE, width: 0.75 } });
  s.addText("−   36 €  Shopify Basic", {
    x: 0.9, y: 3.7, w: 4.6, h: 0.35, margin: 0, fontSize: 12.5, color: MUTED, fontFace: FONT,
  });
  s.addText("−   85 €  Zahlungsgebühren (2,9 % + 0,30 €)", {
    x: 0.9, y: 4.08, w: 4.6, h: 0.35, margin: 0, fontSize: 12.5, color: MUTED, fontFace: FONT,
  });
  s.addShape(pres.ShapeType.line, { x: 0.9, y: 4.6, w: 4.6, h: 0, line: { color: LINE, width: 0.75 } });
  s.addText("≈ 1'779 € Gewinn / Monat", {
    x: 0.9, y: 4.75, w: 4.6, h: 0.6, margin: 0, fontSize: 21, bold: true, color: GREEN, fontFace: FONT,
  });
  s.addText("Bei 1'000 Verkäufen: ≈ 17'800 € – der Aufwand bleibt gleich.", {
    x: 0.9, y: 5.5, w: 4.6, h: 0.9, margin: 0, fontSize: 11, italic: true, color: MUTED, fontFace: FONT, lineSpacingMultiple: 1.2,
  });
  // right chart
  s.addChart(
    pres.ChartType.bar,
    [{ name: "Euro", labels: ["Umsatz", "Kosten", "Gewinn"], values: [1900, 121, 1779] }],
    {
      x: 6.35, y: 1.9, w: 6.4, h: 4.6, barDir: "col", barGapWidthPct: 60,
      chartColors: ["8A93A5", "D96A62", "95BF47"],
      showValue: true, dataLabelPosition: "outEnd", dataLabelColor: "FFFFFF",
      dataLabelFontSize: 12, dataLabelFontFace: FONT, dataLabelFormatCode: '#,##0" €"',
      catAxisLabelColor: "C7CBD4", catAxisLabelFontSize: 12, catAxisLabelFontFace: FONT,
      valAxisLabelColor: "5A5F6B", valAxisLabelFontSize: 9, valAxisLabelFontFace: FONT,
      valAxisMaxVal: 2000, valAxisMinVal: 0,
      valGridLine: { color: "262933", size: 0.5 }, catGridLine: { style: "none" },
      showLegend: false, showTitle: false, plotArea: { fill: { color: BG } }, chartArea: { fill: { color: BG }, border: { color: BG } },
    }
  );
  s.addText("Umsatz vs. Kosten vs. Gewinn – ein Produkt, ein Monat", {
    x: 6.35, y: 6.55, w: 6.4, h: 0.3, margin: 0, align: "center",
    fontSize: 10, color: FAINT, fontFace: FONT,
  });
  s.addNotes(
    "PERSON 4 (13:00–14:30): Rechnen wir das konkret durch. Ihr schreibt ein E-Book, zum Beispiel einen ‚Prüfungs-Guide', und verkauft es für 19 Euro. Bei 100 Verkäufen im Monat sind das 1'900 Euro Umsatz. Davon gehen ab: 36 Euro für Shopify Basic und rund 85 Euro Zahlungsgebühren. Es bleiben etwa 1'779 Euro Gewinn – pro Monat, mit einem einzigen Produkt. Und das Beste seht ihr im Diagramm: Die Kosten sind winzig im Vergleich zum Umsatz. Bei 1'000 Verkäufen wären es rund 17'800 Euro – ohne eine Minute mehr Arbeit. Ob das alles zu schön ist, um wahr zu sein? Das klärt [Name 5]."
  );
})();

// ================= SLIDE 10 — PRO / CONTRA =================
(() => {
  const s = newSlide();
  chrome(s, "TEIL 5 · EHRLICH BETRACHTET");
  bigTitle(s, "Vorteile & Nachteile");
  const pro = [
    ["Start in einem Tag", "Ohne Programmieren, ohne Vorwissen."],
    ["Alles aus einer Hand", "Hosting, Kasse, Zahlungen, Versand – inklusive."],
    ["Wächst mit", "Vom Hobby-Shop bis zur Weltmarke wie Gymshark."],
    ["Tausende Apps", "Für jede Zusatzfunktion gibt es eine App."],
  ];
  const con = [
    ["Monatliche Fixkosten", "Laufen weiter – auch wenn man nichts verkauft."],
    ["Gebühren pro Verkauf", "Bei jedem Verkauf geht ein kleiner Teil weg."],
    ["Marketing ist Pflicht", "Ohne TikTok, Instagram oder Google kommt niemand vorbei."],
    ["Design-Grenzen", "Ohne Code-Kenntnisse ist irgendwann Schluss."],
  ];
  const cols = [
    ["Das spricht dafür", GREEN, pro, 0.55],
    ["Das muss man wissen", RED, con, 6.78],
  ];
  for (const [header, color, rows, x] of cols) {
    card(s, x, 1.8, 6.0, 5.0);
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.35, y: 2.13, w: 0.18, h: 0.18, fill: { color: color } });
    s.addText(header, {
      x: x + 0.68, y: 2.0, w: 5.0, h: 0.45, margin: 0, fontSize: 15.5, bold: true, color: WHITE, fontFace: FONT, valign: "middle",
    });
    let y = 2.65;
    for (const [lead, desc] of rows) {
      leadDesc(s, x + 0.68, y, 5.0, 0.95, lead, desc, 12.5, 10.5);
      y += 1.0;
    }
  }
  s.addNotes(
    "PERSON 5 (14:30–16:00): Danke! Klingt alles perfekt – aber wir wollen ehrlich sein. Dafür spricht: Man startet an einem Tag, ohne Programmieren. Alles kommt aus einer Hand – Hosting, Kasse, Zahlung. Der Shop wächst mit, vom Hobby bis zur Weltmarke. Und es gibt Tausende Apps für jede Zusatzfunktion. Aber – und das verschweigen die YouTube-Gurus gern: Die Fixkosten laufen jeden Monat, auch wenn ihr nichts verkauft. Bei jedem Verkauf gehen Gebühren weg. Ohne eigenes Marketing – TikTok, Instagram, Google – kommt schlicht niemand in euren Shop. Und ohne Code-Kenntnisse stösst man beim Design irgendwann an Grenzen. Shopify ist ein Werkzeug – kein Geldautomat."
  );
})();

// ================= SLIDE 11 — FAZIT =================
(() => {
  const s = newSlide();
  chrome(s, "TEIL 5 · FAZIT");
  bigTitle(s, "Das nehmen wir mit");
  const takes = [
    ["E-Commerce ist zugänglich", "Einen Shop starten kann heute jede:r von uns – noch diese Woche."],
    ["Digitale Produkte = kleinstes Risiko", "Kein Lager, kein Versand, fast keine Kosten – ideal zum Anfangen."],
    ["Der Shop ist der einfache Teil", "Über den Erfolg entscheidet am Ende das Marketing."],
  ];
  const tw = 3.94, th = 2.35, ty = 1.9, gap = 0.205;
  takes.forEach(([lead, desc], i) => {
    const x = 0.55 + i * (tw + gap);
    card(s, x, ty, tw, th);
    numCircle(s, x + 0.3, ty + 0.3, 0.42, String(i + 1));
    s.addText(lead, {
      x: x + 0.3, y: ty + 0.9, w: tw - 0.6, h: 0.65, margin: 0,
      fontSize: 14.5, bold: true, color: WHITE, fontFace: FONT, lineSpacingMultiple: 1.1,
    });
    s.addText(desc, {
      x: x + 0.3, y: ty + 1.55, w: tw - 0.6, h: 0.7, margin: 0,
      fontSize: 11, color: MUTED, fontFace: FONT, lineSpacingMultiple: 1.15,
    });
  });
  s.addText("„Man braucht kein Ladenlokal mehr, um ein Geschäft zu starten –\nnur eine gute Idee und ein Handy.“", {
    x: 1.17, y: 4.85, w: 11, h: 1.4, margin: 0, align: "center", valign: "middle",
    fontSize: 19, italic: true, color: SOFT, fontFace: FONT, lineSpacingMultiple: 1.3,
  });
  s.addNotes(
    "PERSON 5 (16:00–17:00): Was nehmen wir mit? Drei Dinge. Erstens: E-Commerce ist heute für alle zugänglich – einen Shop starten kann jede und jeder von uns, noch diese Woche. Zweitens: Digitale Produkte sind der Einstieg mit dem kleinsten Risiko – kein Lager, kein Versand, fast keine Kosten. Drittens: Der Shop ist der einfache Teil – über den Erfolg entscheidet das Marketing. Oder in einem Satz: Man braucht kein Ladenlokal mehr, um ein Geschäft zu starten – nur eine gute Idee und ein Handy."
  );
})();

// ================= SLIDE 12 — DANKE =================
(() => {
  const s = newSlide();
  s.addText("S", {
    shape: pres.ShapeType.roundRect, rectRadius: 0.13, x: 6.32, y: 1.55, w: 0.7, h: 0.7,
    fill: { color: GREEN }, align: "center", valign: "middle",
    fontSize: 30, bold: true, color: BG, fontFace: FONT, margin: 0,
  });
  s.addText("Danke!", {
    x: 2.17, y: 2.55, w: 9, h: 1.2, margin: 0, align: "center", valign: "middle",
    fontSize: 60, bold: true, color: WHITE, fontFace: FONT,
  });
  s.addText("Fragen?", {
    x: 2.17, y: 3.9, w: 9, h: 0.6, margin: 0, align: "center",
    fontSize: 26, bold: true, color: GREEN, fontFace: FONT,
  });
  s.addText("Quellen: shopify.com · Shopify Investor Report Q2 2026 · shopify.com/blog/digital-products ·\nkosten.org & we-site.de (Shopify-Preise 2026) · chargeflow.io (Shopify-Statistiken)", {
    x: 1.17, y: 6.3, w: 11, h: 0.6, margin: 0, align: "center",
    fontSize: 8.5, color: FAINT, fontFace: FONT, lineSpacingMultiple: 1.3,
  });
  s.addNotes(
    "PERSON 5 (17:00–17:30): Das war unsere Präsentation zu Shopify. Vielen Dank fürs Zuhören – habt ihr Fragen? (Tipp: Fragen zur Technik an Person 2, zu Kosten an Person 3, zu digitalen Produkten an Person 4 weitergeben.)"
  );
})();

pres.writeFile({ fileName: "Shopify-Praesentation.pptx" }).then(() => console.log("written"));
