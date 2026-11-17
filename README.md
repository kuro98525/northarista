# North Arista — Website Archive

A static, self-contained mirror of [northarista.com](https://northarista.com/), captured with [SingleFile](https://github.com/gildas-lormeau/SingleFile) and published with GitHub Pages.

**Live site:** https://kuro98525.github.io/northarista/

## What's inside

- **51 captured pages** — 34 English, 17 Simplified Chinese
  - Home, About us, Programs (9 country program pages), Services, Process, Blog articles, News, Contact, Program comparison, Privacy & Terms
- **Offline single-file archive** — `offline/northarista-archive.html` (~21 MB) contains all pages packed into one HTML file with deduplicated assets. Useful for keeping a fully offline copy.
- Product PDFs are preserved under `assets/pdfs/`.

## Features

- **Automatic language selection** — visiting the root opens the Chinese version when the browser's preferred language is Chinese (`zh`, `zh-CN`, `zh-TW`, `zh-HK`), otherwise English.
- **Language switcher** — the header dropdown (简体中文 / English) jumps to the translated version of the current page when one exists, otherwise to that language's home page.
- **Mega menu** — the "Programs / 移民项目" hover panel with all program cards is restored.
- **Consultation popup** — the 免费咨询 / Free Consultation form opens with its original styling.
- **No outbound navigation** — links to pages that were not captured are disabled; clicking them does nothing instead of sending you to the live site.

## Repository layout

```
index.html            language-based redirect
en.html, zh.html      home pages
en-*.html, zh-*.html  captured pages
assets/               shared UI script, styles, popup, flags, PDFs
offline/              single-file offline archive
.nojekyll             disable Jekyll processing
```

## Offline usage

Download `offline/northarista-archive.html` and open it directly in a browser — no server needed.

## Notes and limitations

- Captured statically on **2026-11-17**: JavaScript from the original site is not executed. Some dynamic widgets (e.g. the country/program selectors inside the consultation form, form submission) do not work.
- Page content, images and other material are the property of **North Arista** and their respective owners. This repository is provided for reference/archival purposes only and does not grant any license to that content.
