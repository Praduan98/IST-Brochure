# InsightsTap Brochure — Design System

A reusable design system extracted from the final `ist-brochure.html`. Use it to
build the **next** brochure fast: copy a page archetype, swap the copy/images,
render to confirm it fits A4, done. Nothing here needs to be invented from scratch.

**Files in this kit**
| File | What it is |
|---|---|
| `brochure-template.html` | A 7-page starter. Each page is one **archetype** you duplicate + fill. Self-contained (fonts + full CSS inline). |
| `DESIGN-SYSTEM.md` | This doc — tokens, type scale, components, archetype recipes, workflow. |
| `render-template.js` | Renders every page to a PNG + reports A4 fit. Run after every edit. |
| `ist-brochure.html` | The finished reference brochure. Look here for real-content examples of every component. |

---

## 1. Quick start (build the next brochure in 5 steps)

1. **Copy the starter:** `cp brochure-template.html my-next-brochure.html`
2. **Plan the page order** using the archetypes in §6 (e.g. Cover → Contents → 3× Content → Wash → Dark feature → Spotlight → CTA).
3. **For each page:** duplicate the closest archetype `<section class="page …">`, then swap text, images (`assets/…`), and numbers. Keep the `.head` and `.foot` blocks intact and bump the page number.
4. **Render & check:** `node render-template.js my-next-brochure.html`. Every page must say **`FITS ok`**. If a page says `OVERFLOW +Npx`, cut copy or shrink a block until it fits — A4 height is fixed and overflow is **clipped** in print.
5. **Export to PDF:** open in Chrome → Print → *Save as PDF* → A4, margins **None**, **Background graphics ON**. (The `@page{size:A4 portrait;margin:0}` rule handles the rest.)

> **Golden rule:** the page is a fixed 210mm × 297mm box with `overflow:hidden`.
> Content does not reflow onto a second page — it gets cut off. Always render to verify.

---

## 2. Design tokens (CSS custom properties)

All defined in `:root`. Reference as `var(--name)`. **Never hard-code a brand hex** — use the token so a future palette change is one edit.

```
/* Brand — cyan/teal */
--cyan:#0DCFCF   --cyan-dark:#009C9B   --cyan-light:#6AE3E1   --cyan-wash:#ECFFFF
--teal:#066D6D   --teal-deep:#025252

/* Neutrals — text */
--ink:#0A0A0A (headings)   --body:#3C3C3C (paragraphs)   --muted:#6F6F6F (captions)
--line-strong:rgba(10,10,10,.14)   --line:rgba(10,10,10,.08)   /* borders/dividers */

/* Accents — use sparingly */
--gold:#F4B740  --gold-tint:#FAD27D  --gold-shade:#D99A23  --gold-text:#946F27  /* trust badge */
--violet:#6C5CE7  --violet-tint:#A29BFE  --violet-shade:#5541D6                  /* rare highlight */

/* Layout */
--pad:14mm   /* the uniform page margin (.inner padding) */
```

**Color usage rules**
- Cyan/teal is the identity. Gold = *trust/credential* signal only (the Fiverr-Pro `.fvbadge`). Violet = rare emphasis, almost never.
- On light pages: headings `--ink`, body `--body`, captions/labels `--muted`, accents `--cyan-dark` (darker cyan reads on white).
- On dark pages: the `.dark` shell auto-remaps text to white/cyan-light — you usually don't set colors manually.

---

## 3. Typography

Six Google fonts, each with a job. Don't add new fonts.

| Font | Role |
|---|---|
| **Raleway** | Display & headings (`.display`, `.h1`–`.h3`) — 700/800 weights |
| **Poppins** | Kickers, labels, UI text (`.kicker`, `.statlabel`, `.subh`) |
| **Inter** | Body copy (`.lead`, `.body`, `.small`) — the default |
| **Jost** | Italic quotes / editorial flourish (`.quote`, pull-quotes) |
| **Questrial** | Small captions (`.cap`) |
| **Space Mono** | Numbers, page numbers, micro-tags, section nos. (`.mono`, `.statnum`, `.idx`) |

**Type scale (use the class, don't restyle):**

| Class | Size / use |
|---|---|
| `.display` | Hero cover headline (set size inline, ~48–52px) |
| `.h1` | Page headline — 30px |
| `.h2` | Section / sub-headline — 21px |
| `.h3` | Card title — 16px |
| `.subh` | Emphasized sub-line — 13px |
| `.lead` | Intro paragraph — 14px |
| `.body` | Standard paragraph — 12px |
| `.small` / `.cap` | Caption / footnote — 11px / 10px |
| `.kicker` | UPPERCASE eyebrow over a headline — 10.5px tracked |

The standard page-title lockup (used on nearly every page) is:
```html
<div class="col" style="gap:9px">
  <span class="kicker">03 — Section kicker</span>
  <h2 class="h1">A clear page headline.</h2>
  <div class="rule"></div>          <!-- 46px cyan underline -->
</div>
```

---

## 4. Page shells & anatomy

Every page is `<section class="page [shell]">` containing decorative layers + one `.inner`.

**Three shells — alternate them for rhythm:**
| Shell | Look | Use for |
|---|---|---|
| `.page` | White | Content, contents, data pages (the workhorse) |
| `.page wash` | White → cyan-wash gradient | Softer content / imagery pages |
| `.page dark` | Teal gradient, light text | Cover, feature, spotlight, CTA — *anchor* pages |

**Anatomy (every page follows this):**
```html
<section class="page">
  <div class="linegrid"></div>          <!-- optional bg texture: .dotgrid / .linegrid -->
  <div class="inner">                    <!-- the 14mm-padded flex column -->
    <div class="head"> …kicker+h1+rule… <span class="secno">03</span> </div>
    <div class="region"> …main content (flex:1, fills the page)… </div>
    <div class="foot"> …name · url · page no… </div>
  </div>
</section>
```
- `.head` = title lockup (left) + mono section number (right).
- `.region` = `flex:1; min-height:0` — the content zone that **grows to fill** the space between head and foot. Put your grid/flex layout here.
- `.foot` = thin top-bordered strip: label · `● www.site.com` · page number.

**Background textures (pick 0–1 per page):** `.dotgrid` (cyan dots), `.dotgrid.w` (white dots, for dark pages), `.linegrid` (faint graph grid), `.bgphoto` (full-bleed photo + gradient).

---

## 5. Component reference

All exist in the CSS already — just use the class. See `ist-brochure.html` for live examples.

**Structure & layout helpers**
- `.region` — fills page height; `.col` / `.flex` / `.grow` / `.mt-auto` — flex utilities.
- `.card` — the universal panel (white; auto-darkens to glass on `.dark`). `.card.soft` = cyan-wash fill.
- `.cardflex` — card with content top + `.ctag` pinned bottom. Pair with `grid-auto-rows:1fr` on the grid so all cards are **equal height**.
- `.ctag` — bottom micro-tag inside a card (mono, top divider): `→ SUPPORTING TAG`.

**Content components**
- Title underline: `.rule` (`.rule.gold` / `.rule.teal` variants).
- `.pill` — bordered chip (value props, tags).
- `.fvbadge` — gold "Top-Rated" trust badge. Use **once or twice** max.
- `.cic` — 34px rounded square holding an 18px line-icon (SVG `stroke:var(--teal)`). For card headers.
- `ul.clean` — bullet list with cyan diamond markers.
- Stats: `.statnum` (mono number) + `.statlabel` (uppercase caption). Group in a grid for a stat band/ribbon.
- `.bignum` — giant faint index numeral that fills a tall card's negative space.

**Imagery (always treat photos on-brand — never raw):**
- `.tile` — image card with gradient scrim (`.gr` / `.gr.teal`) + label (`.lbl`) + corner tag (`.tag`).
- `.imgband` — image used as a banner with a teal/dark overlay (`.ov.teal` / `.ov.dark`) and content on top (`.ct`).
- `.bgphoto` — full-bleed cover/hero photo with a `.grad` overlay.
- House photo treatment: cyan/teal duotone-ish overlay + slight grayscale, so any stock photo matches the palette.

**Logos**
- `.logowall` — 5-col grayscale logo grid.
- `.tbl-*` — the premium "lit glass wall" logo treatment (full-color cards, glow blooms). See §7 note on page 18.

---

## 6. Page archetypes (the 7 in `brochure-template.html`)

Each is a ready-made `<section>`. Duplicate, fill, renumber. All verified to fit A4.

| # | Archetype | Shell | When to use |
|---|---|---|---|
| 1 | **Cover** | `dark` | Front page: full-bleed photo + hero headline + 3-stat proof band. |
| 2 | **Contents** | `page` | Two-column numbered index (`.t-toc-row`). |
| 3 | **Content card-grid** | `page` | The workhorse: intro lead + 2×2 equal-height `.card`s. Most inner pages. |
| 4 | **Wash (image + cards)** | `wash` | Image band hero + a row of point cards + a soft stat strip. |
| 5 | **Dark feature** | `dark` | Capability cards on teal + a dark stat ribbon. Breaks up light pages. |
| 6 | **Spotlight (person/feature)** | `dark` | Locked-aspect portrait + bio, a pull-quote that fills the page, 4-stat ribbon. *(This is the page-19 founder pattern, generalized.)* |
| 7 | **Closing / CTA** | `dark` | Big call-to-action headline + 3 contact cards. Back page. |

**Archetype-6 portrait rule (important):** the `.t-portrait` frame is **hard-locked**
to `width:74mm; aspect-ratio:4/5` with an absolutely-positioned inner `<img>` using
`object-fit:cover`. This is deliberate — it's why a square or oddly-sized source photo
can **never** stretch into a tall, zoomed, distorted frame (the bug that originally
made the founder image "weirdly big"). Adjust framing with `object-position` (e.g.
`center 24%`), **not** by changing the element's dimensions.

A typical 16-page flow: `Cover → Contents → [Content/Wash/Dark ×11] → Spotlight → CTA`,
alternating light and dark shells so no two anchor (dark) pages sit adjacent.

---

## 7. Conventions & gotchas

- **Page numbers** appear in 3 spots per page: `.head .secno`, `.foot` (right), and sometimes a watermark. Update all when reordering.
- **No reflow** — content is clipped at 297mm. The `.region` grows to fill, but if you *over*-fill, it's cut. Render to verify (§1, step 4).
- **Equal-height cards:** use `grid-auto-rows:1fr` on the grid + `.cardflex` on each card. Short copy then leaves even whitespace instead of ragged cards.
- **Fill the page:** light content should *grow* to fill, not float at the top. Use `flex:1` regions, a pull-quote that expands, or a `.bignum` to absorb negative space (see how archetype 6 grows the quote).
- **Photos must be treated** — never drop a raw stock photo in. Wrap it in `.tile` / `.imgband` / `.bgphoto` so the brand overlay unifies it.
- **Accent discipline:** gold = trust only, violet = almost never. Cyan/teal carries everything.
- The premium logo wall (`.tbl-*`, page 18 of the reference) is intentionally static (no animation) but layered — copy that whole block if you need a "trusted by" page.
- Don't reach for new fonts, new brand colors, or new component patterns — the kit is meant to keep every brochure consistent. Extend by composing existing classes.

---

## 8. Render / verify workflow

```bash
# one-time, if needed
npm i -D playwright && npx playwright install chromium

# render any brochure file → PNG per page + A4-fit audit
node render-template.js brochure-template.html      # the starter
node render-template.js my-next-brochure.html        # your new file
```
Output: `template-preview-1.png … -N.png` + a report. **Fix anything that isn't `FITS ok`** before exporting to PDF.

Export to PDF: Chrome → Print → Save as PDF → **A4 / margins None / Background graphics ON**.
