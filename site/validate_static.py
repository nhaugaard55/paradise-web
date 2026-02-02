#!/usr/bin/env python3
"""
Quick integrity check for the static site. Run from within site/:

    python3 validate_static.py
"""

from pathlib import Path
from urllib.parse import unquote
import re

SITE_DIR = Path(__file__).resolve().parent

# Files we expect to exist for language landing pages
REQUIRED_PAGES = [
    SITE_DIR / "es/index.html",
    SITE_DIR / "es/restaurante/index.html",
    SITE_DIR / "es/excursiones/index.html",
    SITE_DIR / "es/hosteria/index.html",
    SITE_DIR / "es/contacto/index.html",
    SITE_DIR / "es/nosotros/index.html",
    SITE_DIR / "en/index.html",
    SITE_DIR / "en/restaurante/index.html",
    SITE_DIR / "en/excursiones/index.html",
    SITE_DIR / "en/hosteria/index.html",
    SITE_DIR / "en/contact/index.html",
    SITE_DIR / "en/about/index.html",
]


def iter_content_files():
    for path in SITE_DIR.rglob("*"):
        if path.suffix.lower() in {".html", ".css", ".js"}:
            yield path


def extract_static_paths(text):
    # /static/... inside quotes
    quoted = re.findall(r"['\"](/static/[^'\"()]+?)['\"]", text, flags=re.IGNORECASE)
    # url(/static/...) optionally with quotes
    url_based = [
        match[1]
        for match in re.findall(r"url\((['\"]?)(/static/[^)'\" ]+)\1\)", text, flags=re.IGNORECASE)
    ]
    return quoted + url_based


def normalize(path):
    path = unquote(path)
    if "?" in path:
        path = path.split("?", 1)[0]
    return path.lstrip("/")


def main():
    missing_assets = []
    bad_links = []

    for file_path in iter_content_files():
        try:
            text = file_path.read_text()
        except UnicodeDecodeError:
            text = file_path.read_text(encoding="utf-8", errors="ignore")

        for raw in extract_static_paths(text):
            cleaned = normalize(raw)
            target = SITE_DIR / cleaned
            if not target.exists():
                missing_assets.append((file_path.relative_to(SITE_DIR), "/" + cleaned))

        if 'href="#' in text:
            bad_links.append(file_path.relative_to(SITE_DIR))

    missing_pages = [path.relative_to(SITE_DIR) for path in REQUIRED_PAGES if not path.exists()]

    if not missing_assets and not missing_pages and not bad_links:
        print("All good: static assets, required pages, and links resolved correctly.")
        return 0

    if missing_assets:
        print("Missing assets:")
        for src, asset in sorted(set(missing_assets)):
            print(f"  {src} -> {asset}")

    if missing_pages:
        print("\nMissing required pages:")
        for page in missing_pages:
            print(f"  {page}")

    if bad_links:
        print("\nFound href=\"#\" references in:")
        for file in sorted(set(bad_links)):
            print(f"  {file}")

    return 1


if __name__ == "__main__":
    raise SystemExit(main())
