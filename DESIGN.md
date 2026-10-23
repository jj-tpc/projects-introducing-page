---
name: 프로젝트 소개 (Shader Portal)
description: Project detail pages set on a full-bleed, slowly breathing WebGL ground, with compressed Archivo declarations and thin tracked chrome floating over it.
colors:
  void: "#0B0D1A"
  ink: "#13162B"
  night: "#1A1D3A"
  lilac: "#6A6CF6"
  lilac-fill: "#7D7FFF"
  lilac-fill-hover: "#8f91ff"
  mist: "#BFD2FF"
  mist-dim: "rgba(191, 210, 255, 0.62)"
  line: "rgba(191, 210, 255, 0.18)"
  ember: "#FF6A3D"
  panel-ink: "rgba(19, 22, 43, 0.94)"
  code-void: "rgba(11, 13, 26, 0.7)"
typography:
  display:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "clamp(72px, 11.5vw, 172px)"
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 70, 'wght' 800"
  display-close:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "clamp(40px, 7vw, 112px)"
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 70, 'wght' 800"
  headline:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "clamp(1.6rem, 2.6vw, 2.4rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.01em"
    fontVariation: "'wdth' 75, 'wght' 700"
  counter:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "2.2rem"
    fontWeight: 500
    lineHeight: 1
    fontVariation: "'wdth' 80, 'wght' 500"
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 500
    lineHeight: 1.7
    letterSpacing: "0.14em"
  title-hangul:
    fontFamily: "Noto Sans KR, Apple SD Gothic Neo, Malgun Gothic, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 700
    lineHeight: 1.7
    letterSpacing: "0.02em"
  lede:
    fontFamily: "Noto Sans KR, Apple SD Gothic Neo, Malgun Gothic, sans-serif"
    fontSize: "clamp(1rem, 1.35vw, 1.2rem)"
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: "normal"
  body:
    fontFamily: "Noto Sans KR, Apple SD Gothic Neo, Malgun Gothic, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  body-panel:
    fontFamily: "Noto Sans KR, Apple SD Gothic Neo, Malgun Gothic, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  fine:
    fontFamily: "Noto Sans KR, Apple SD Gothic Neo, Malgun Gothic, sans-serif"
    fontSize: "0.86rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 500
    lineHeight: 1.7
    letterSpacing: "0.22em"
  label-button:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.86rem"
    fontWeight: 500
    lineHeight: 1.7
    letterSpacing: "0.2em"
  label-value:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0.08em"
  mono:
    fontFamily: "Consolas, Menlo, monospace"
    fontSize: "0.84rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
rounded:
  swatch: "2px"
  md: "6px"
  pill: "999px"
  dot: "50%"
spacing:
  hairline: "1px"
  xs: "6px"
  sm: "10px"
  md: "14px"
  base: "16px"
  panel: "22px"
  head: "28px"
  stack: "36px"
  section: "48px"
  block: "56px"
  gutter: "clamp(20px, 4vw, 64px)"
  rail: "clamp(96px, 12vw, 220px)"
components:
  button-primary:
    backgroundColor: "{colors.lilac-fill}"
    textColor: "{colors.void}"
    typography: "{typography.label-button}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.lilac-fill-hover}"
    textColor: "{colors.void}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.mist}"
    typography: "{typography.label-button}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "56px"
  button-outline-hover:
    backgroundColor: "transparent"
    textColor: "{colors.mist}"
  panel:
    backgroundColor: "{colors.panel-ink}"
    textColor: "{colors.mist-dim}"
    typography: "{typography.body-panel}"
    rounded: "{rounded.md}"
    padding: "22px 22px 24px"
  spec-cell:
    backgroundColor: "{colors.panel-ink}"
    textColor: "{colors.mist}"
    typography: "{typography.label-value}"
    rounded: "{rounded.md}"
    padding: "16px 18px"
  chip-phrase:
    backgroundColor: "{colors.panel-ink}"
    textColor: "{colors.mist}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  code-block:
    backgroundColor: "{colors.code-void}"
    textColor: "{colors.mist}"
    typography: "{typography.mono}"
    rounded: "{rounded.md}"
    padding: "12px 14px"
  topbar-link:
    backgroundColor: "transparent"
    textColor: "{colors.mist}"
    typography: "{typography.label}"
    padding: "22px clamp(20px, 4vw, 64px)"
  index-item:
    backgroundColor: "transparent"
    textColor: "{colors.mist-dim}"
    typography: "{typography.label}"
---

# Design System: 프로젝트 소개 (Shader Portal)

## Overview

**Creative North Star: "The Living Ground"**

The page is not a document laid on a background; it is a window onto a slowly moving field of pixels, and the interface is thin type floating in front of it. A fixed full-bleed WebGL fragment shader fills the viewport with a near-black navy void through which lilac filaments and, in the lower right, one ember current drift at a few hundredths of a second per unit. The cursor bends the field under it; scrolling slides the camera with inertia and dims the ground toward the void so reading sections stay legible; leaving the page dissolves the field before navigation. A 9% film-grain overlay sits on top so the gradient never reads as a clean digital blur.

Everything that is not the ground is deliberately slight. One project is declared by a single compressed, uppercase Archivo word stack at up to 172px; every other Latin string is a small, widely tracked 500-weight label; Korean prose is Noto Sans KR at normal weight. Panels that carry facts are opaque ink rectangles with a hairline border at 18% mist, never glass and never shadowed: the shader produces all the light in the system, so no element fakes its own. Density is editorial, not app-like: wide left rail for the section index, long measure for the lede, 1px rules between list rows.

Confirmed rejections: white-card grids, app-store icon-plus-get rows, glass or frosted panels, the previous purple-gradient look, and the discarded split-flap departure board. `index.html` (the Linktree-style main page with its own inline CSS, Noto Sans KR, and glass cards) is a separate world pinned by the user and is intentionally outside this system; do not restyle it to match, and do not treat its values as tokens here.

**Key Characteristics:**
- A fixed, full-bleed WebGL ground (`#portal`, z-index 0) under everything, with grain at opacity 0.09 above it and the page at z-index 2.
- One compressed Archivo declaration per page (wdth 70 / wght 800, uppercase, line-height 0.88); every other Latin element is a tracked 500-weight label.
- Mist (`mist`) is the only text color at full strength; `mist-dim` (62%) carries secondary text, and `line` (18%) carries every border.
- Lilac is structure and the primary action; ember is the single hot signal, reserved for hover borders, focus rings, selection, and the shader's one current.
- Opaque ink panels (`panel-ink`), 1px hairline borders, 6px radius, zero shadows, zero backdrop-filter.
- No raster assets ship. The ground is computed, the grain is an inline SVG turbulence data URI, icons are inline SVG strokes.

## Colors

A night palette of three navies, one text tint at three strengths, lilac as the structural accent, and ember as the single hot voice.

### Primary
- **Lilac** (`lilac`): the structural accent. The shader's filaments are this hue; in the DOM it marks the active index dot, the environment-label dot, the panel hover border, and the underline on inline `code`. It is never a text color.
- **Lilac Fill** (`lilac-fill`): the primary button face. Slightly lighter than `lilac` so `void` text clears contrast on it; the shader never uses this value.
- **Lilac Fill Hover** (`lilac-fill-hover`): the primary button on hover, paired with an ember border. A literal in the stylesheet, not a custom property.

### Secondary
- **Ember** (`ember`): the one hot signal. In the shader it is the single current in the lower right (its intensity per page is set by `data-ember` on the canvas: 1 on the Skill page, 0.6 on the Plugin page). In the DOM it is the hover border on every button, the hover color on topbar links, the cursor ring on hover, the global focus-visible ring (2px, offset 3px), and `::selection`. It is never a fill or a resting color.

### Neutral
- **Void** (`void`): the html and body background, the scrollbar track, the text color on the primary button, and the shader's floor; the ground dims toward this as the visitor scrolls.
- **Ink** (`ink`): the mid navy the shader mixes toward in brighter regions. As a surface it appears only at 94% opacity as `panel-ink` (panels, spec cells, phrase chips); never use the opaque `ink` as a panel fill, the 94% value is the material.
- **Night** (`night`): the scrollbar thumb. The shader does not use it; it is the lightest navy and is reserved for chrome that must sit above void without competing with panels.
- **Mist** (`mist`): all primary text, the cursor ring, the scroll-rail gradient, section headlines, list titles, button text on outline buttons, and the display declaration itself.
- **Mist Dim** (`mist-dim`): secondary text. Labels at rest, panel prose, list descriptions, fine print, the index numbers' sibling titles, the outline button border, and the quotation marks injected on phrase chips.
- **Line** (`line`): every border and rule: panel borders, spec cell dividers, section-head underline, list row rules, chip outlines, index dot outlines.
- **Panel Ink** (`panel-ink`): the opaque-enough panel surface, 94% ink. Opaque by intent (the reviewer's keep line: opaque ink panels, no glass).
- **Code Void** (`code-void`): the recessed surface of the install `pre` at 70% void inside a panel.

### Named Rules
**The Shader Makes the Light Rule.** The only gradients and glows on the page come from the WebGL ground and its radial legibility scrim. No element carries a gradient fill, a glow, a shadow, or a backdrop blur. A new surface that needs atmosphere gets it from the canvas, not from CSS.

**The Ember Is a Reaction Rule.** Ember never appears on a resting element in the DOM. It is the hover border, the focus ring, the selection, and the cursor ring on a link; in the ground it is one current. If ember appears on something the visitor has not touched, it is wrong.

**The Three Strengths Rule.** Text is `mist` (primary), `mist-dim` (secondary), or nothing. Borders are `line`. Do not introduce a fourth opacity of mist or a grey.

## Typography

**Display Font:** Archivo variable, wdth 62–125 / wght 400–900 from Google Fonts (with Arial Narrow fallback), set at `wdth 70 / wght 800` for declarations, `wdth 75 / wght 700` for section headlines, `wdth 80 / wght 500` for the loader counter
**Body Font:** Noto Sans KR 400/700 (with Apple SD Gothic Neo, Malgun Gothic fallback) for every Korean string
**Label/Mono Font:** Archivo 500 at normal width for all tracked labels; Consolas / Menlo (system monospace) for the one install-path `pre`

**Character:** One voice at two extremes. The same Archivo file is squeezed to 70% width and 800 weight for the declaration, then relaxed to normal width, 500 weight, and +0.2em tracking for everything small; nothing sits in between except the 75%-width section headline. Korean is never condensed, never uppercase, and never tracked beyond 0.08em; it reads at normal weight as prose and at 700 only as a title or button word.

### Hierarchy
- **Display** (Archivo wdth 70 / wght 800, `clamp(72px, 11.5vw, 172px)`, 0.88, -0.015em, uppercase, max-width 12ch): the project name, one `span` per line, in the hero. On load it rises 24px over 900ms as the loader reaches 100.
- **Display, close** (same face, `clamp(40px, 7vw, 112px)`, 0.88, 12ch): the closing sentence above the final download pair.
- **Headline** (Archivo wdth 75 / wght 700, `clamp(1.6rem, 2.6vw, 2.4rem)`, 1, 0.01em, uppercase): section headings. Each carries a Korean twin in Noto Sans KR 700 at 0.55em, 0.08em, `mist-dim`, 14px to the right, vertically centered.
- **Counter** (Archivo wdth 80 / wght 500, 2.2rem, 1): the loader number, with a 1rem `%`. Only numerals use this width.
- **Title** (Archivo 500, 0.95rem, 0.14em, uppercase, `mist`): panel titles. Variants: `.code` (no uppercase, 0.04em) for file and command names; `.ko` (Noto Sans KR 700, 1.05rem, 0.02em) for Korean titles. List titles are Noto Sans KR 700 at body size, or Archivo 500 0.9rem 0.12em uppercase when Latin (`.en`).
- **Lede** (Noto Sans KR 400, `clamp(1rem, 1.35vw, 1.2rem)`, 1.8, `mist`, max-width 46ch): the one-sentence description under the declaration.
- **Body** (Noto Sans KR 400, 16px, 1.7): the page base. Panel prose and list descriptions step down to 0.95rem/1.75 in `mist-dim`; fine print is 0.86rem in `mist-dim`.
- **Label** (Archivo 500, 0.78rem, 0.22em, uppercase, `mist-dim`): topbar links, version stamp, section-head meta counts (`3 phases`, `by domain`), the word LOADER, index section names (0.76rem), the environment line, the vertical SCROLL. A `b` inside a label flips to `mist` at the same weight; that is how a value is distinguished from its key. Variants: list keys 0.82rem 0.18em (not uppercase in the stylesheet), index numbers 0.9rem 0.1em in `mist`, button text 0.86rem 0.2em.
- **Label, value** (Archivo 400, 1.05rem, 0.08em, `mist`): the `dd` in a spec grid; Korean values switch to Noto Sans KR 700 0.02em.
- **Mono** (Consolas/Menlo 0.84rem/1.6): the install folder tree only.

### Named Rules
**The One Declaration Rule.** Exactly one element per page is set at wdth 70 / wght 800 (plus its echo in the close). A second condensed-800 heading anywhere turns the declaration into a style, and the page loses its single loud word.

**The Script Picks the Face Rule.** Latin and numerals are Archivo; Hangul is Noto Sans KR, chosen per span by content (`.ko` on buttons, headlines, titles, and spec values). Never set Korean in Archivo and never set a Latin label in Noto Sans KR.

**The Tracked Small Rule.** Anything Latin under 1rem is Archivo 500 with 0.1–0.22em tracking and, except list keys and `.code` titles, uppercase. Small Latin text with normal tracking does not exist in this system.

## Layout

The ground is fixed and full-bleed; the page scrolls over it. There is no container width: content is pinned to the left by a wide rail and runs to a right gutter. The left rail is `clamp(96px, 12vw, 220px)` (hero, sections, close) and houses the fixed vertical section index at `left: clamp(20px, 4vw, 64px)`, vertically centered. The right gutter is `clamp(20px, 4vw, 64px)` and houses the fixed vertical SCROLL rail (a 1px, 180px mist-to-transparent bar) which fades out once the visitor is past half the viewport. The top bar is fixed, `22px` vertical by the gutter, space-between, with pointer events only on its children so it never blocks the canvas.

The hero is `min-height: 100svh`, grid, content-centered vertically, `96px` top and `72px` bottom padding, with the declaration, then the lede 28px below, then the action row 36px below, then the loader 36px below. The environment label sits absolutely at `bottom: 48px` in the right gutter. Sections carry `48px` vertical padding and the same rail/gutter; a `section-head` is a baseline-aligned space-between row with 16px bottom padding, a 1px `line` underline, and 28px below; additional heads inside one section are spaced `56px` apart. The close runs `80px` top and `120px` bottom.

Grids: panels use `repeat(auto-fit, minmax(260px, 1fr))` with 14px gaps; the spec `dl` uses `repeat(auto-fit, minmax(150px, 1fr))` with 0 gap and 1px `line` dividers inside one bordered 6px frame; the install `twin` is `1fr 1fr` with 14px gaps; list rows are `3.2rem 15rem minmax(0, 1fr)` with 18px gaps and 16px vertical padding between 1px `line` rules; phrase chips wrap at 10px gaps; button rows wrap at 14px gaps.

Under 900px: the index, scroll rail, and environment label disappear; rail and gutter both become `clamp(20px, 5vw, 40px)`; the hero gets `110px` top and `120px` bottom padding; buttons go full width; `twin` stacks; list rows become `3rem minmax(0, 1fr)` with the description dropping to the second column; section heads stack vertically with a 6px gap. The display scales down to its 72px floor.

Spacing rhythm as used: 1px rules; 6px dot/title gaps; 8–10px chip padding and chip gaps; 12–14px grid gaps and code padding; 16px universal spec padding and list row padding; 18px list gaps; 22px panel padding and topbar height; 28px under heads and ledes; 36px between hero blocks; 48px section padding; 56px between stacked heads.

## Elevation & Depth

No shadows, no blur. Depth is layered by z-index and opacity only: the canvas (0), the grain (1), the page (2), fixed chrome (10), the cursor ring (50). Within the page, hierarchy comes from the ground showing through: the hero has a radial legibility scrim (`radial-gradient(70% 80% at 28% 55%, rgba(11,13,26,0.6), transparent 70%)`) behind the declaration, panels are 94% ink so the field barely ghosts through their edges, and the code block inside a panel is 70% void to read as a recess. Scroll dims the whole ground 65% toward void over the first 900px so that sections sit on something quieter than the hero.

Hover does not lift. Buttons rise 1px (`translateY(-1px)`, 200ms `cubic-bezier(0.2, 0.8, 0.2, 1)`) and swap their border to ember; panels only change border color to lilac; the cursor ring grows from 28px to 44px and turns ember over links. The `.cursor` ring uses `mix-blend-mode: screen` so it brightens rather than covers the ground.

### Named Rules
**The No-Shadow Rule.** Nothing in this system has a `box-shadow`, `text-shadow`, `filter: blur`, or `backdrop-filter`. Legibility problems are solved with the scrim, panel opacity, or scroll dimming, never with a shadow or a frosted layer.

**The Ground Shows Through at the Edges Rule.** Panels are opaque enough to read on (94%) but not fully opaque, so the moving field is still perceptible where a panel meets the void. A panel at 100% ink reads as a card pasted on; a panel below ~90% reads as glass. Stay at `panel-ink`.

## Shapes

Softened rectangles at 6px, with two deliberate exceptions. Buttons, panels, the spec frame, and code blocks use `md` (6px). Phrase chips are pills (999px) because they are quoted speech, not containers. Dots are circles: 6px index markers with a `line` outline (filled lilac when active), the 7px lilac environment dot, the 28px/44px cursor ring. The one swatch in the preset list is a 10px square at 2px. Borders are always 1px: `line` for structure, `mist-dim` for the outline button, `lilac-fill` for the primary button, `ember` on hover. Icons are 16px inline SVG strokes at 1.6 with round caps and joins, in `currentColor`, so they read as part of the label's line weight. The declaration's silhouette is a left-aligned stack of compressed caps, each word on its own line, never centered.

## Components

### Buttons
Thin tracked labels in a 56px-tall, 6px-rounded field; the primary is a lilac fill, the secondary a mist outline, and both answer hover with an ember border.
- **Shape:** 6px radius, 1px border, `min-height: 56px`, `padding: 0 24px`, inline-flex, space-between, 18px gap between label, size note, and icon.
- **Primary:** `lilac-fill` face and border, `void` text. Korean label in Noto Sans KR 700 0.95rem 0.08em (`.ko`); Latin label Archivo 500 0.86rem 0.2em uppercase; a `small` size note in Archivo 500 0.78rem 0.14em; 16px inline SVG stroke icon.
- **Hover / Focus:** border to `ember`, face to `lilac-fill-hover`, `translateY(-1px)`; colors over 160ms, transform over 200ms `cubic-bezier(0.2, 0.8, 0.2, 1)`. Focus-visible is the global 2px ember outline at 3px offset.
- **Outline (secondary):** transparent face, `mist` text, 1px `mist-dim` border; hover swaps the border to ember and rises 1px. Used for in-page jumps (설치 방법), the return to index, and the two skill-zip downloads on the Plugin page.
- **Grouping:** `.actions` wraps at 14px gaps; full-width under 900px.

### Chips (phrase chips)
Quoted trigger phrases.
- **Style:** `panel-ink` fill, 1px `line` border, pill radius, `padding: 8px 16px`, 0.92rem `mist` text, curly quotes injected before and after in `mist-dim`.
- **State:** static; no hover or selection.

### Cards / Containers (panels)
The opaque ink rectangle that carries facts.
- **Corner Style:** 6px.
- **Background:** `panel-ink`.
- **Shadow Strategy:** none (The No-Shadow Rule).
- **Border:** 1px `line`; hover to `lilac` over 160ms.
- **Internal Padding:** `22px 22px 24px`. An optional number label sits absolutely at `18px` from the top-right. Title is Title (or `.ko` / `.code`), prose is 0.95rem/1.75 `mist-dim`, inline `code` is `mist` with a 1px lilac underline, and an optional `pre` (`code-void`, 1px `line`, 6px, `12px 14px`, mono) sits 12px below.
- **Spec grid:** a `dl` of `panel-ink` cells inside one 1px `line` 6px frame, cells divided by 1px `line` right borders, `padding: 16px 18px`; `dt` is a Label, `dd` is Label-value (Korean `.ko` in Noto Sans KR 700).
- **List:** rule-separated rows (not cards): key in Archivo 500 0.82rem 0.18em `mist-dim`, title in `mist` 700 (or `.en` tracked Latin), description in 0.95rem `mist-dim`; optional 10px content swatch before a title.

### Inputs / Fields
None exist. The surfaces have no forms.

### Navigation
Three fixed pieces of chrome, all Label type, all transparent on the ground.
- **Topbar:** fixed, `22px` by the gutter, space-between. Left: a back link with a 16px chevron and 10px gap; right: a version stamp (`Skill · v1.0`, `Plugin · v0.5.0`) with the value in `mist` via `b`. Links are `mist`, hover `ember`, no underline.
- **Section index:** fixed left, vertically centered, 34px between items. Each item is a number (Archivo 0.9rem 0.1em, `mist`) over a Korean name (0.76rem 0.22em uppercase, `mist-dim`) over a 6px dot outlined in `line`; the active item's dot fills and outlines lilac, driven by an IntersectionObserver with `-40% 0px -50% 0px` root margin. Hover raises the name to `mist`. Hidden under 900px.
- **Scroll rail:** fixed right, vertical SCROLL label above a 1px 180px mist-to-transparent bar; fades out (300ms) once scrolled past half the viewport. Hidden under 900px.
- **Mobile:** only the topbar remains; the environment label also hides.

### Living ground (signature)
A fixed full-viewport `canvas#portal` (z-index 0) running a single fragment shader: five-octave fbm noise in two layers, mixing `void` toward `ink` at 35% strength, adding lilac filaments at 50% and a secondary lilac haze at 8%, an ember current masked to the right 45–95% of the width and the lower half (scaled by `uEmber` from `data-ember`), a lilac bloom under the cursor at 12%, and a 15% vignette. The cursor warps the field (`exp(-d²·9)·0.18`) with the mouse uniform eased at 0.08 per frame; scroll offsets the camera (`uScroll·0.00035`) eased at 0.06 and dims the field 65% toward void by 900px; `data-scroll` can seed the initial scroll. DPR is capped at 1.5. A `.grain` overlay (fixed, inset -50%, SVG fractal-noise data URI tiled at 240px, opacity 0.09) sits above the canvas. Same-site link clicks set `uDissolve` to 1 (eased 0.12), add `is-leaving` (grain fades over 400ms), and navigate after 420ms; download links, hash links, and `_blank` are exempt. If WebGL is unavailable the body's `void` background stands alone and `has-gl` is never added.

### Loader and reveal (signature)
`html.is-loading` holds the declaration, lede, and actions at opacity 0 and 24px down. The LOADER counter eases 0 to 100 over 1100ms (cubic ease-out, zero-padded to two digits), then `is-ready` releases the three elements over 900ms `cubic-bezier(0.2, 0.7, 0.2, 1)` staggered 0 / 120 / 240ms. A 1600ms safety timeout reveals regardless.

### Cursor ring (signature)
On fine pointers only, `cursor: none` on body and links, replaced by a 28px 1px `mist` ring (screen blend) that trails the pointer at 0.22 per frame, grows to 44px with an ember border over links and buttons (180ms), and fades out when the pointer leaves the document.

### Reduced motion
`prefers-reduced-motion: reduce` freezes the shader at a fixed time (one frame drawn, no loop), disables the cursor ring and pointer tracking, sets the loader to 100 immediately, shows the hero without transition, removes all transitions globally, and skips the dissolve so links navigate directly.

## Do's and Don'ts

### Do:
- **Do** start every new surface in this world with `canvas#portal` + `.grain` + `.page` over `void`, loading `assets/portal.css` and `assets/portal.js`; tune the ground per page with `data-ember` (0–1) rather than new CSS.
- **Do** give each page exactly one declaration in Archivo wdth 70 / wght 800, uppercase, one word per line, left-aligned, at `clamp(72px, 11.5vw, 172px)`.
- **Do** set every small Latin string as a tracked 500-weight Archivo label (0.1–0.22em) and every Korean string in Noto Sans KR 400/700, chosen per span.
- **Do** put facts in `panel-ink` panels, spec cells, or rule-separated lists with 1px `line` borders and 6px corners; keep panel padding at 22px and spec padding at 16px 18px.
- **Do** keep ember to reactions: hover borders, the focus ring, selection, the cursor ring; keep lilac to structure: active dots, hover panel borders, code underlines, and the primary fill.
- **Do** use `mist` / `mist-dim` / `line` as the only three strengths of text and border.
- **Do** honor reduced motion as the stylesheet and script already do: still frame, native cursor, loader at 100, no dissolve.

### Don't:
- **Don't** add `box-shadow`, `text-shadow`, blur, or `backdrop-filter` to anything; the shader makes the light (The No-Shadow Rule).
- **Don't** use glass, frosted, or translucent-below-90% panels; `panel-ink` at 94% is the material, and `index.html`'s glass cards are a separate pinned world, not a precedent.
- **Don't** set a second heading in the condensed 800 declaration style, condense Korean, or track Korean beyond 0.08em.
- **Don't** put ember on a resting element or use it as a fill; don't use lilac as text.
- **Don't** introduce a white-card grid, an app-store icon-plus-get row, a centered hero, or raster imagery; nothing rasterized ships in this system.
- **Don't** build a new page without the fixed chrome set (topbar back link and version stamp, section index, scroll rail) or hide the chrome above 900px.
- **Don't** restyle `index.html` toward this system; it is intentionally outside it.
