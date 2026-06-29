# InsightsTap — Company Brochure

A print-ready, **A4 portrait company brochure** for [InsightsTap](https://www.insightstap.com) — a B2B AI Engineering × GTM Engineering consultancy. Built as a single, self-contained HTML file with a bespoke, brand-aligned design system (no framework, no build step beyond rendering).

## Deliverables
| File | What |
|------|------|
| `ist-brochure.html` | The brochure — 21 pages, A4 portrait, print CSS |
| `InsightsTap-Brochure.pdf` | Rendered print-ready PDF |
| `preview-page-NN.png` | Per-page preview images |

## Build / Render
Requires [Node.js](https://nodejs.org/).

```bash
npm install            # installs Playwright (Chromium)
node render.js         # renders all pages -> preview-page-NN.png + PDF + overflow audit
```

`render.js` loads the brochure at an A4 viewport (794×1123 px), screenshots every `.page`, prints an
overflow audit (so no content is clipped), and writes `InsightsTap-Brochure.pdf`.

Render a single standalone test page while iterating on a design:

```bash
node render-one.js <input.html> <output.png>
```

## Design system
- **Brand palette:** cyan `#0DCFCF`, cyan-dark `#009C9B`, teal `#066D6D` / `#025252`, ink `#0A0A0A`,
  gold `#F4B740`, violet accent `#6C5CE7`.
- **Type:** Raleway (display), Poppins (UI/subheads), Inter (body), Jost (quotes), Space Mono (labels), Questrial (captions).
- **Tool logos:** full-color official brand marks in `assets/tech-color/` (see `manifest.json`).
- **Photography:** curated Unsplash imagery in `assets/unsplash/` (credits in `CREDITS.json`).

## Structure
```
ist-brochure.html        # the brochure
render.js / render-one.js# Playwright render scripts
assets/
  brand/                 # logos & marks
  tech-color/            # full-color tool/brand icons (+ manifest.json)
  unsplash/              # photography (+ CREDITS.json)
  clients/  leaders/  qr/ # client logos, team photos, QR codes
```

---
© 2026 InsightsTap · Build · Grow · Integrate
