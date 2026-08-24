#!/usr/bin/env python3
"""Build the 5-minute express deck: keep slides 1,4,5,6,8,9,11,12 of generate.js,
swap the notes for the 1-min-per-person script, rerun animation post-processing."""
import re, subprocess, sys

src = open("generate.js", encoding="utf-8").read()

# split into preamble + slide blocks (each starts with the SLIDE marker comment)
parts = re.split(r"(?=// ================= SLIDE )", src)
pre = parts[0]
blocks = {}
for p in parts[1:]:
    m = re.match(r"// ================= SLIDE (\d+)", p)
    n = int(m.group(1))
    # strip the trailing writeFile line from the last block
    p = p.replace('pres.writeFile({ fileName: "Shopify-Praesentation.pptx" }).then(() => console.log("written"));', "")
    blocks[n] = p

KEEP = [1, 4, 5, 6, 8, 9, 11, 12]
out = pre + "".join(blocks[n] for n in KEEP)
out = out.replace("Berufsschule · ca. 18 Minuten", "Berufsschule · 5 Minuten · Kurzversion")
out = out.replace("Yassin  ·  Name 2  ·  Name 3  ·  Name 4  ·  Name 5", "Yassin  ·  Rayan  ·  Hovadik  ·  Kim  ·  Bruno")
out += '\npres.writeFile({ fileName: "Shopify-Praesentation-5min.pptx" }).then(() => console.log("written"));\n'
open("generate5.js", "w", encoding="utf-8").write(out)
subprocess.run(["node", "generate5.js"], check=True)

# replace speaker notes with the 5-minute script
NOTES = [
    # 1 Titel — Person 1 (0:00-1:00)
    "PERSON 1 (0:00–1:00): Guten Tag zusammen! Unser Thema: Shopify – wie man einen Online-Shop baut und mit digitalen Produkten Geld verdient. E-Commerce heisst einfach: Kaufen und Verkaufen über das Internet. Der Vorteil: Dein Shop hat 24/7 geöffnet, erreicht Kunden in über 175 Ländern – und du brauchst kein Ladenlokal und keine Miete. Ein Laptop reicht. Und genau dafür gibt es Shopify – [Name 2]!",
    # 2 Was ist Shopify — Person 2
    "PERSON 2 (1:00–1:30): Shopify ist ein Baukasten für Online-Shops – ohne Programmieren. Über 3 Millionen Shops laufen darauf, die Händler machten 378 Milliarden Dollar Umsatz in 2025. Marken wie Gymshark und Kylie Cosmetics nutzen es.",
    # 3 5 Schritte — Person 2
    "PERSON 2 (1:30–2:00): Ein Shop entsteht in 5 Schritten: Konto erstellen, Design wählen, Produkte anlegen, Zahlungen aktivieren, live gehen. Ein Nachmittag reicht – rechts seht ihr, wie die fertige Produktseite aussieht. Was kostet das? [Name 3]!",
    # 4 Kosten — Person 3
    "PERSON 3 (2:00–3:00): Der Basic-Plan kostet 36 Euro im Monat – das reicht für den Start. Dazu kommen Zahlungsgebühren: 2,9 Prozent plus 30 Cent pro Verkauf – bei 100 Euro also etwa 3 Euro. Spar-Tipps: Jahresabo bis 25 Prozent günstiger, und man kann gratis testen, bevor man zahlt. Für unter 40 Euro bekommt man, wofür man früher ein ganzes Ladenlokal brauchte. Und jetzt: Geld verdienen – [Name 4]!",
    # 5 So geht's digital — Person 4
    "PERSON 4 (3:00–3:30): Das Schlauste sind digitale Produkte: E-Books, Kurse, Vorlagen – ein 157-Milliarden-Dollar-Markt. Kein Lager, kein Versand, fast 100 Prozent Marge: einmal erstellen, unendlich verkaufen. Auf Shopify: gratis App 'Digital Downloads', Datei hochladen, fertig – der Kunde bekommt den Link automatisch per E-Mail.",
    # 6 Rechenbeispiel — Person 4
    "PERSON 4 (3:30–4:00): Rechenbeispiel: E-Book für 19 Euro mal 100 Verkäufe = 1'900 Euro Umsatz. Nach Kosten bleiben rund 1'779 Euro Gewinn pro Monat – mit einem einzigen Produkt. Zu schön um wahr zu sein? [Name 5]!",
    # 7 Fazit — Person 5
    "PERSON 5 (4:00–4:45): Ehrlich gesagt: Es gibt auch Nachteile – die Fixkosten laufen jeden Monat, bei jedem Verkauf gehen Gebühren weg, und ohne Marketing auf TikTok oder Instagram kommt niemand in den Shop. Shopify ist ein Werkzeug, kein Geldautomat. Unser Fazit: Erstens – einen Shop starten kann heute jede:r von uns. Zweitens – digitale Produkte sind der Einstieg mit dem kleinsten Risiko. Drittens – der Shop ist der einfache Teil, das Marketing entscheidet.",
    # 8 Danke — Person 5
    "PERSON 5 (4:45–5:00): Man braucht kein Ladenlokal mehr – nur eine gute Idee und ein Handy. Danke – habt ihr Fragen?",
]

NAMES = {"PERSON 1": "YASSIN", "PERSON 2": "RAYAN", "PERSON 3": "HOVADIK", "PERSON 4": "KIM", "PERSON 5": "BRUNO",
         "[Name 2]": "Rayan", "[Name 3]": "Hovadik", "[Name 4]": "Kim", "[Name 5]": "Bruno"}
NOTES = [n if not any(k in n for k in NAMES) else
         __import__("functools").reduce(lambda s, kv: s.replace(kv[0], kv[1]), NAMES.items(), n)
         for n in NOTES]

from pptx import Presentation
prs = Presentation("Shopify-Praesentation-5min.pptx")
assert len(prs.slides) == len(NOTES), f"{len(prs.slides)} slides vs {len(NOTES)} notes"
for slide, note in zip(prs.slides, NOTES):
    slide.notes_slide.notes_text_frame.text = note
prs.save("Shopify-Praesentation-5min.pptx")
print("notes replaced")
