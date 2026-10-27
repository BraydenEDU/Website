#!/usr/bin/env python3
"""Capture desktop and phone layouts of every page (deliverable 3: Design).

    python tools/screenshots.py            # English pages
    python tools/screenshots.py --lang es  # Spanish pages

Builds dist/ first, then writes PNGs plus one combined PDF to design/.
Needs: pip install playwright pillow && playwright install chromium
"""
import argparse
import functools
import http.server
import socketserver
import subprocess
import sys
import threading
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
PAGES = ["index", "pricing", "security", "demo", "privacy", "terms"]
SIZES = {"desktop": 1440, "phone": 390}


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--lang", default="en")
    args = ap.parse_args()

    subprocess.run([sys.executable, str(ROOT / "build.py")], check=True)
    out = ROOT / "design"
    out.mkdir(exist_ok=True)

    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a):
            pass

    handler = functools.partial(Quiet, directory=str(ROOT / "dist"))
    with socketserver.TCPServer(("127.0.0.1", 0), handler) as httpd:
        port = httpd.server_address[1]
        threading.Thread(target=httpd.serve_forever, daemon=True).start()
        prefix = "" if args.lang == "en" else f"{args.lang}/"
        shots = []
        with sync_playwright() as p:
            browser = p.chromium.launch()
            for page in PAGES:
                for size, width in SIZES.items():
                    tab = browser.new_page(viewport={"width": width, "height": 900}, device_scale_factor=1)
                    tab.goto(f"http://127.0.0.1:{port}/{prefix}{page}.html", wait_until="networkidle")
                    path = out / f"{args.lang}-{page}-{size}.png"
                    tab.screenshot(path=str(path), full_page=True)
                    shots.append(path)
                    tab.close()
            browser.close()
        httpd.shutdown()

    images = [Image.open(s).convert("RGB") for s in shots]
    pdf = out / f"annuit-layouts-{args.lang}.pdf"
    images[0].save(pdf, save_all=True, append_images=images[1:], resolution=96)
    print(f"Wrote {len(shots)} layouts and {pdf.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
