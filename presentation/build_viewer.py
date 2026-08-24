#!/usr/bin/env python3
import base64, json, glob

imgs = []
for f in sorted(glob.glob("hi-*.jpg")):
    with open(f, "rb") as fh:
        imgs.append("data:image/jpeg;base64," + base64.b64encode(fh.read()).decode())

# slide -> presenter
speakers = ["Person 1","Person 1","Person 1","Person 2","Person 2","Person 3",
            "Person 4","Person 4","Person 4","Person 5","Person 5","Person 5"]
titles = ["Titel","Ablauf & Team","Was ist E-Commerce?","Was ist Shopify?",
          "In 5 Schritten zum Shop","Was kostet Shopify?","Digitale Produkte",
          "So verkauft man digital","Rechenbeispiel","Vorteile & Nachteile",
          "Fazit","Danke & Fragen"]

html = r"""<title>Shopify Gruppenarbeit</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;900&display=swap">
<style>
  :root{
    --bg:#0b0c10; --panel:#15171f; --panel2:#1c1f28; --line:#262933;
    --text:#f4f5f7; --soft:#c7cbd4; --muted:#9aa0ac; --faint:#5a5f6b;
    --green:#95bf47; --green-dark:#5e8e3e;
  }
  *{box-sizing:border-box; margin:0}
  html,body{height:100%}
  body{
    background:var(--bg); color:var(--text);
    font-family:"Archivo",-apple-system,"Segoe UI",Arial,sans-serif;
    display:flex; flex-direction:column; min-height:100vh;
  }
  header{
    display:flex; align-items:center; gap:.7rem; flex-wrap:wrap;
    padding:.9rem 1.2rem; border-bottom:1px solid var(--line);
  }
  .mark{
    width:1.7rem; height:1.7rem; border-radius:.42rem; background:var(--green);
    color:#0b0c10; font-weight:900; font-size:1rem;
    display:grid; place-items:center; flex:none;
  }
  h1{font-size:1.02rem; font-weight:700; letter-spacing:.01em}
  h1 span{color:var(--muted); font-weight:500}
  .chip{
    margin-left:auto; font-size:.72rem; font-weight:700; letter-spacing:.14em;
    color:var(--green); border:1px solid var(--line); border-radius:99px;
    padding:.32rem .7rem; white-space:nowrap;
  }
  main{
    flex:1; display:flex; flex-direction:column; align-items:center;
    padding:1.1rem 1.2rem 1.4rem; gap:.85rem; width:100%; max-width:1060px; margin:0 auto;
  }
  .stage{position:relative; width:100%}
  .stage img{
    width:100%; display:block; border-radius:.7rem;
    border:1px solid var(--line); box-shadow:0 18px 50px rgba(0,0,0,.55);
  }
  .nav{
    position:absolute; top:50%; transform:translateY(-50%);
    width:2.6rem; height:2.6rem; border-radius:50%;
    border:1px solid var(--line); background:rgba(21,23,31,.82);
    color:var(--text); font-size:1.15rem; cursor:pointer;
    display:grid; place-items:center; transition:background .15s,border-color .15s;
  }
  .nav:hover{background:var(--panel2); border-color:var(--green)}
  .nav:focus-visible{outline:2px solid var(--green); outline-offset:2px}
  .nav.prev{left:.55rem} .nav.next{right:.55rem}
  .meta{
    display:flex; align-items:center; gap:.8rem; flex-wrap:wrap; justify-content:center;
    font-size:.86rem; color:var(--muted);
  }
  .meta .count{font-variant-numeric:tabular-nums; color:var(--soft); font-weight:700}
  .meta .who{
    color:var(--green); font-weight:700; border:1px solid var(--line);
    border-radius:99px; padding:.22rem .65rem; font-size:.76rem; letter-spacing:.05em;
  }
  .dots{display:flex; gap:.34rem}
  .dots button{
    width:.52rem; height:.52rem; border-radius:50%; border:0; padding:0;
    background:var(--line); cursor:pointer; transition:background .15s, transform .15s;
  }
  .dots button[aria-current="true"]{background:var(--green); transform:scale(1.25)}
  .dots button:focus-visible{outline:2px solid var(--green); outline-offset:2px}
  .thumbs{
    display:flex; gap:.5rem; overflow-x:auto; width:100%; padding:.2rem .1rem .5rem;
  }
  .thumbs button{
    flex:none; width:8.2rem; border-radius:.45rem; overflow:hidden; cursor:pointer;
    border:2px solid var(--line); padding:0; background:var(--panel);
    transition:border-color .15s;
  }
  .thumbs button[aria-current="true"]{border-color:var(--green)}
  .thumbs button:focus-visible{outline:2px solid var(--green); outline-offset:2px}
  .thumbs img{width:100%; display:block}
  footer{
    text-align:center; color:var(--faint); font-size:.74rem;
    padding:0 1.2rem 1.3rem; line-height:1.6;
  }
  footer b{color:var(--muted); font-weight:700}
  @media (max-width:640px){
    .chip{display:none}
    .thumbs button{width:6rem}
    .nav{width:2.2rem; height:2.2rem}
  }
  @media (prefers-reduced-motion:reduce){
    *{transition:none !important}
  }
</style>

<header>
  <div class="mark">S</div>
  <h1>Shopify <span>· Gruppenarbeit E-Commerce</span></h1>
  <div class="chip">12 FOLIEN · 5 SPRECHER · ~18 MIN</div>
</header>

<main>
  <div class="stage">
    <img id="slide" src="" alt="">
    <button class="nav prev" id="prev" aria-label="Vorherige Folie">&#8592;</button>
    <button class="nav next" id="next" aria-label="Nächste Folie">&#8594;</button>
  </div>
  <div class="meta">
    <span class="count" id="count"></span>
    <span id="title"></span>
    <span class="who" id="who"></span>
    <span class="dots" id="dots"></span>
  </div>
  <div class="thumbs" id="thumbs"></div>
</main>

<footer>
  <b>Tipp:</b> Zum Präsentieren die PowerPoint-Datei öffnen – die Übergänge (Morph/Fade) und
  Einblend-Animationen laufen nur dort. Diese Seite ist die Ansicht zum Teilen &amp; Lernen.<br>
  Redeskript: jede Person hat ihren Text in den PowerPoint-Notizen und im Teams-Dokument.
</footer>

<script>
const IMGS = __IMGS__;
const WHO = __WHO__;
const TITLES = __TITLES__;
let i = 0;
const slide = document.getElementById("slide");
const dots = document.getElementById("dots");
const thumbs = document.getElementById("thumbs");

IMGS.forEach((src, k) => {
  const d = document.createElement("button");
  d.setAttribute("aria-label", "Folie " + (k+1));
  d.addEventListener("click", () => show(k));
  dots.appendChild(d);
  const t = document.createElement("button");
  t.setAttribute("aria-label", "Folie " + (k+1) + ": " + TITLES[k]);
  const ti = document.createElement("img");
  ti.src = src; ti.alt = "";
  t.appendChild(ti);
  t.addEventListener("click", () => show(k));
  thumbs.appendChild(t);
});

function show(k){
  i = (k + IMGS.length) % IMGS.length;
  slide.src = IMGS[i];
  slide.alt = "Folie " + (i+1) + ": " + TITLES[i];
  document.getElementById("count").textContent = (i+1) + " / " + IMGS.length;
  document.getElementById("title").textContent = TITLES[i];
  document.getElementById("who").textContent = WHO[i] + " spricht";
  [...dots.children].forEach((d,k2) => d.setAttribute("aria-current", k2===i ? "true" : "false"));
  [...thumbs.children].forEach((t,k2) => {
    t.setAttribute("aria-current", k2===i ? "true" : "false");
    if (k2===i) t.scrollIntoView({block:"nearest", inline:"nearest", behavior:"smooth"});
  });
}
document.getElementById("prev").addEventListener("click", () => show(i-1));
document.getElementById("next").addEventListener("click", () => show(i+1));
addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") show(i-1);
  if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); show(i+1); }
});
let x0 = null;
slide.addEventListener("touchstart", e => x0 = e.touches[0].clientX, {passive:true});
slide.addEventListener("touchend", e => {
  if (x0 === null) return;
  const dx = e.changedTouches[0].clientX - x0;
  if (Math.abs(dx) > 40) show(i + (dx < 0 ? 1 : -1));
  x0 = null;
}, {passive:true});
show(0);
</script>
"""

html = html.replace("__IMGS__", json.dumps(imgs))
html = html.replace("__WHO__", json.dumps(speakers))
html = html.replace("__TITLES__", json.dumps(titles))

out = "/tmp/claude-0/-home-user-yassinfennir/0d31d251-2898-5d33-aca5-5caceb83edd6/scratchpad/shopify-gruppenarbeit.html"
with open(out, "w") as f:
    f.write(html)
print("written", out, len(html), "bytes")
