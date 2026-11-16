# North Arista — Offline Website Archive

A single-file, self-contained offline archive of [northarista.com](https://northarista.com/), captured with [SingleFile](https://github.com/gildas-lormeau/SingleFile) and packaged as one self-extracting HTML file.

## What's inside

`index.html` (~21 MB) contains **61 pages** in one file:

- English pages (44): home, about, programs, services, blog articles, process pages, contact, legal pages
- Simplified Chinese pages (17): home, about, programs, services, news, contact, program comparison
- All CSS, fonts and images are inlined — no network access required

## Features

- **Works fully offline** — open `index.html` in any modern browser
- **Automatic language selection** — opens the Chinese version if the browser's preferred language is Chinese (`zh`, `zh-CN`, `zh-TW`, `zh-HK`), otherwise the English version
- **In-archive navigation** — links between saved pages stay inside the file; links to pages that were not archived are disabled so you never get bounced to the live site
- **Language switcher** — the header dropdown (简体中文 / English) matches the original site and jumps to the translated page when available
- **Mega menu** — the "Programs / 移民项目" hover panel is restored with all program cards
- **Consultation popup** — the 免费咨询 / Free Consultation form popup is reproduced with its original styling

## Usage

```sh
# just open it
start index.html      # Windows
open index.html       # macOS
xdg-open index.html   # Linux
```

No build step, no server needed.

## Notes and limitations

- Captured statically: JavaScript from the original site is not executed. Some dynamic widgets (e.g. the country/program selectors inside the consultation form, form submission) do not work offline.
- This archive is a snapshot taken on **2026-11-17**. Content may have changed on the live site since.
- The archived page text, images and other content are the property of **North Arista** and their respective owners. This repository is provided for reference/archival purposes only and does not grant any license to that content.
