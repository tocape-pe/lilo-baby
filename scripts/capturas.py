"""Capturas por tramos del sitio local (desktop 1440x900 y móvil 390x844) + chequeo de desborde horizontal.
Uso: PYTHONUTF8=1 python scripts/capturas.py [url]
"""
import os
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

URL = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4180/"
OUT = Path(__file__).parent / "capturas"
OUT.mkdir(exist_ok=True)

with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge")
    for tag, kw in (("desktop", dict(viewport={"width": 1440, "height": 900})),
                    ("movil", dict(viewport={"width": 390, "height": 844}, device_scale_factor=2, is_mobile=True, has_touch=True))):
        pg = b.new_page(**kw)
        pg.goto(URL, wait_until="networkidle")
        h = pg.evaluate("document.documentElement.scrollHeight")
        # forzar carga de imágenes lazy
        for y in range(0, h, 600):
            pg.evaluate(f"window.scrollTo(0,{y})")
            pg.wait_for_timeout(120)
        pg.wait_for_timeout(1200)
        over = pg.evaluate("document.documentElement.scrollWidth - window.innerWidth")
        vh = kw["viewport"]["height"]
        n = 0
        for y in range(0, h, vh):
            pg.evaluate(f"window.scrollTo(0,{y})")
            pg.wait_for_timeout(500)
            pg.screenshot(path=str(OUT / f"{tag}_{n:02d}.jpg"), type="jpeg", quality=70)
            n += 1
        print(tag, "altura", h, "capturas", n, "desborde_x", over, flush=True)
        pg.close()
# b.close() se cuelga con este Edge: se sale directo
sys.stdout.flush()
os._exit(0)
