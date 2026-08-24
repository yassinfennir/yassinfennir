#!/usr/bin/env python3
"""Post-process the deck: Morph/Fade slide transitions + cascading fade-in
entrance animations (auto-play on slide entry). Chrome elements (objectName
starting with 'chrome-') stay static so Morph can glide them between slides."""
import re, sys, zipfile, shutil, os

SRC = "Shopify-Praesentation.pptx"
OUT = "Shopify-Praesentation.pptx"
TMP = "_unpacked"

TRANSITION = (
    '<mc:AlternateContent xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006">'
    '<mc:Choice xmlns:p159="http://schemas.microsoft.com/office/powerpoint/2015/09/main" Requires="p159">'
    '<p:transition xmlns:p14="http://schemas.microsoft.com/office/powerpoint/2010/main" spd="slow" p14:dur="700">'
    '<p159:morph option="byObject"/></p:transition></mc:Choice>'
    '<mc:Fallback><p:transition spd="slow"><p:fade/></p:transition></mc:Fallback>'
    '</mc:AlternateContent>'
)

def build_timing(spids):
    """Cascading fade entrance, starts automatically after the transition."""
    nid = 3
    effects = []
    delay = 0
    first = True
    for spid in spids:
        node_type = "withEffect" if first else "afterEffect"
        first = False
        outer, inner_set, inner_anim = nid, nid + 1, nid + 2
        nid += 3
        effects.append(
            f'<p:par><p:cTn id="{outer}" presetID="10" presetClass="entr" presetSubtype="0" '
            f'fill="hold" grpId="0" nodeType="{node_type}">'
            f'<p:stCondLst><p:cond delay="{delay}"/></p:stCondLst>'
            f'<p:childTnLst>'
            f'<p:set><p:cBhvr><p:cTn id="{inner_set}" dur="1" fill="hold">'
            f'<p:stCondLst><p:cond delay="0"/></p:stCondLst></p:cTn>'
            f'<p:tgtEl><p:spTgt spid="{spid}"/></p:tgtEl>'
            f'<p:attrNameLst><p:attrName>style.visibility</p:attrName></p:attrNameLst>'
            f'</p:cBhvr><p:to><p:strVal val="visible"/></p:to></p:set>'
            f'<p:animEffect transition="in" filter="fade"><p:cBhvr>'
            f'<p:cTn id="{inner_anim}" dur="400"/>'
            f'<p:tgtEl><p:spTgt spid="{spid}"/></p:tgtEl>'
            f'</p:cBhvr></p:animEffect>'
            f'</p:childTnLst></p:cTn></p:par>'
        )
        delay += 130

    group_id, click_id = nid, nid + 1
    builds = "".join(f'<p:bldP spid="{s}" grpId="0"/>' for s in spids)
    return (
        '<p:timing><p:tnLst><p:par>'
        '<p:cTn id="1" dur="indefinite" restart="never" nodeType="tmRoot"><p:childTnLst>'
        '<p:seq concurrent="1" nextAc="seek">'
        '<p:cTn id="2" dur="indefinite" nodeType="mainSeq"><p:childTnLst>'
        f'<p:par><p:cTn id="{click_id}" fill="hold">'
        '<p:stCondLst><p:cond delay="indefinite"/>'
        '<p:cond evt="onBegin" delay="0"><p:tn val="2"/></p:cond></p:stCondLst>'
        '<p:childTnLst>'
        f'<p:par><p:cTn id="{group_id}" fill="hold">'
        '<p:stCondLst><p:cond delay="0"/></p:stCondLst>'
        f'<p:childTnLst>{"".join(effects)}</p:childTnLst>'
        '</p:cTn></p:par>'
        '</p:childTnLst></p:cTn></p:par>'
        '</p:childTnLst></p:cTn>'
        '<p:prevCondLst><p:cond evt="onPrev" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:prevCondLst>'
        '<p:nextCondLst><p:cond evt="onNext" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:nextCondLst>'
        '</p:seq>'
        '</p:childTnLst></p:cTn></p:par></p:tnLst>'
        f'<p:bldLst>{builds}</p:bldLst></p:timing>'
    )

def shape_ids(xml):
    """Top-level animatable shape ids in document order, skipping chrome-* and the group root."""
    ids = []
    for m in re.finditer(r'<p:cNvPr id="(\d+)" name="([^"]*)"', xml):
        sid, name = m.group(1), m.group(2)
        if sid == "1" and name == "":
            continue  # spTree group root
        if name.startswith("chrome-"):
            continue
        ids.append(sid)
    return ids

def main():
    if os.path.exists(TMP):
        shutil.rmtree(TMP)
    zipfile.ZipFile(SRC).extractall(TMP)
    slides_dir = os.path.join(TMP, "ppt", "slides")
    n_slides = 0
    for fn in sorted(os.listdir(slides_dir)):
        if not re.fullmatch(r"slide\d+\.xml", fn):
            continue
        path = os.path.join(slides_dir, fn)
        with open(path, encoding="utf-8") as f:
            xml = f.read()
        spids = shape_ids(xml)
        block = TRANSITION + build_timing(spids)
        assert xml.count("</p:sld>") == 1
        xml = xml.replace("</p:sld>", block + "</p:sld>")
        with open(path, "w", encoding="utf-8") as f:
            f.write(xml)
        n_slides += 1
        print(f"{fn}: transition + {len(spids)} animated shapes")
    # repack
    if os.path.exists(OUT):
        os.remove(OUT)
    zf = zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED)
    for root, _, files in os.walk(TMP):
        for f in files:
            full = os.path.join(root, f)
            zf.write(full, os.path.relpath(full, TMP))
    zf.close()
    shutil.rmtree(TMP)
    print(f"done: {n_slides} slides -> {OUT}")

if __name__ == "__main__":
    main()
