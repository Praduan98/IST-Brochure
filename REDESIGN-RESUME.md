# Brochure Redesign — Resume Notes

**To continue later, just open this folder in Claude Code and say:**
> "Continue the brochure redesign — read REDESIGN-RESUME.md"

## Status at checkpoint (2026-06-29 ~16:22)
Nothing is broken. `ist-brochure.html` is still the GOOD 21-page version (NOT yet edited this round).
Safety backup: `ist-brochure.PRE-REDESIGN-20260629-162157.html` (and earlier `...BACKUP-20260629-091730.html`).

### DONE
- [x] Sourced **37 full-color brand icons** → `assets/tech-color/` (svgl/devicon/official; brandfetch CDN needs a paid client-id so used equivalent official logos).
- [x] Replaced **6 page-14 industry images** → `assets/unsplash/ind-{saas,healthcare,itservices,fintech,ecommerce,manufacturing}.jpg` (on-topic, professional).
- [x] Staged `render-one.js` helper (renders ONE standalone test page @794×1123 + reports overflow).
- [x] Pre-redesign safety backup.

### USER DECISIONS (locked)
- **Page 20 video:** REMOVE the video panel → replace with a stronger contact/CTA layout.
- Icons must be **full color (each brand's own colors)**, not monochrome teal.
- Page 14 images replaced with clearer SaaS-industry-appropriate photos.

### TODO (in order)
1. Wire full-color icons into pages **8, 9, 11, 12**: replace `.tech i` mask-teal with full-color `<img>`/bg icons; add icons to text-only chips (Llama, Clay, Apollo, RB2B, CommonRoom, Factors.ai, Workato, LinkedIn) + case-study tags on p11. Keep concept chips (RAG/Multi-Agent/Fine-Tuning) as styled text.
2. Redesign fan-out (agents, each returns full `<section>` + namespaced CSS, self-verified for fit):
   - **1 Cover** — more premium / top-of-the-line
   - **2 Contents** — restructure TOC, cleaner hierarchy
   - **3 Who We Are** — HORIZONTAL layout (not vertical)
   - **4 Build·Grow·Integrate** — shorten tall columns / re-layout
   - **5 Why InsightsTap** — tighten oversized boxes, denser
   - **6 What We Build** — new structure
   - **7 DARK Loop** — complete rework
   - **13 Service Packages** — fix big/empty boxes
   - **14 Industries** — apply new images + tighten
   - **15 Methodology** — complete rework
   - **16 Proven Results** — CIRCULAR images + reworked bottom metric strip
   - **19 Founder (Ritesh)** — complete rework, fix portrait treatment (duotone/teal frame; current beige crop clashes w/ dark page)
   - **20 Connect** — REMOVE video, stronger contact/CTA
   - **21 Back Cover** — complete restructure
3. Assemble sections + CSS into `ist-brochure.html`, run `node render.js`, visually QA all 21 pages.
4. Fix overflow/regressions; regenerate `InsightsTap-Brochure.pdf` + `preview-page-NN.png`.

## Key technical facts
- A4 portrait. Render viewport **794×1123 px** (`render.js`, Playwright/chromium, deviceScaleFactor 2). Inner padding `--pad:14mm` (~53px). Keep each page's `.inner` content ≤ ~1016px tall (render.js prints overflow; 1123 page height = "ok").
- Build/preview: `node render.js` → per-page PNGs + PDF + overflow audit. Single test page: `node render-one.js <in.html> <out.png>` (run from project root; test HTML must live in project root so `assets/...` resolves).
- Brand tokens (in `:root`): cyan #0DCFCF, cyan-dark #009C9B, cyan-light #6AE3E1, cyan-wash #ECFFFF; teal #066D6D / #025252; ink #0A0A0A, body #3C3C3C, muted #6F6F6F; gold #F4B740 (gold-text #946F27); violet #6C5CE7. Fonts: Raleway/Poppins/Inter/Jost/Space Mono/Questrial.
- Page background rhythm (preserve alternation): 1 dark, 2 plain, 3 plain, 4 wash, 5 plain, 6 plain, 7 dark, 8 plain, 9 wash, 10 plain, 11 plain, 12 wash, 13 plain, 14 wash, 15 plain, 16 dark, 17 plain, 18 wash, 19 dark, 20 plain, 21 dark.
- Reuse existing component classes (.card/.cic/.kicker/.h1-3/.rule/.stat*/.ctag/.pill/.tile/.imgband/.tech/.toc/.leader). Keep `.head` + `.foot` chrome + page numbers consistent.
- CORRECT (do NOT "fix"): domain `insightstap.com` / `ritesh@insightstap.com` (Insights+Tap). Conscious non-changes: 600+/12:1/99.9%/94% metrics from approved original.

## Sourcing workflow (for resume/inspection)
- Run ID: `wf_e7dbaf61-b56`  · Script: `…/workflows/scripts/brochure-asset-sourcing-wf_e7dbaf61-b56.js`
