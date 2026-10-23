---
name: 프로젝트 소개 (Departure Board)
description: A rail-concourse split-flap departure board that lists three Claude projects as fixed rows and sends the visitor to each one.
colors:
  flap-black: "#0B0B0D"
  plate: "#1B1C21"
  board-recess: "#0e0f12"
  row-hover: "#15161b"
  wall: "#141518"
  steel-dark: "#2A2D31"
  steel: "#5B5E63"
  steel-light: "#A7AAAF"
  white: "#F2F2F2"
  amber: "#FFB000"
  amber-edge: "#c98a00"
  red: "#B00020"
typography:
  display:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(1.9rem, 6.6vw, 2.9rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.08em"
  display-hangul:
    fontFamily: "Gothic A1, Apple SD Gothic Neo, Malgun Gothic, sans-serif"
    fontSize: "clamp(1.9rem, 6.6vw, 2.9rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.04em"
  headline:
    fontFamily: "Gothic A1, Apple SD Gothic Neo, Malgun Gothic, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 800
    lineHeight: 1.3
    letterSpacing: "-0.005em"
  title:
    fontFamily: "Gothic A1, Apple SD Gothic Neo, Malgun Gothic, sans-serif"
    fontSize: "1.02rem"
    fontWeight: 800
    lineHeight: 1.5
    letterSpacing: "0.01em"
  body:
    fontFamily: "Gothic A1, Apple SD Gothic Neo, Malgun Gothic, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  body-note:
    fontFamily: "Gothic A1, Apple SD Gothic Neo, Malgun Gothic, sans-serif"
    fontSize: "0.88rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0.01em"
  label:
    fontFamily: "Gothic A1, Apple SD Gothic Neo, Malgun Gothic, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 700
    lineHeight: 1.65
    letterSpacing: "0.2em"
  label-latin:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 600
    lineHeight: 1.65
    letterSpacing: "0.16em"
  plate:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "0.98rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.08em"
  mono:
    fontFamily: "Consolas, Menlo, monospace"
    fontSize: "0.85rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  none: "0"
spacing:
  hairline: "1px"
  xs: "6px"
  sm: "8px"
  md: "10px"
  rd: "12px"
  base: "16px"
  row: "18px"
  lg: "20px"
  head: "clamp(22px, 4vw, 40px)"
  page: "clamp(16px, 4vw, 48px)"
components:
  flap-plate:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.white}"
    typography: "{typography.plate}"
    rounded: "{rounded.none}"
    padding: "0 0.55em"
    height: "1.6rem"
  flap-plate-lg:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.white}"
    typography: "{typography.plate}"
    rounded: "{rounded.none}"
    padding: "0 0.55em"
    height: "2.1rem"
  flap-plate-title:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.white}"
    typography: "{typography.display}"
    rounded: "{rounded.none}"
    padding: "0 0.4em"
    height: "clamp(3.2rem, 11vw, 4.8rem)"
  flap-plate-amber:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.amber}"
    typography: "{typography.plate}"
    rounded: "{rounded.none}"
  flap-plate-dim:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.steel-light}"
    typography: "{typography.plate}"
    rounded: "{rounded.none}"
  flap-plate-red:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.red}"
    typography: "{typography.plate}"
    rounded: "{rounded.none}"
  button-plate:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.flap-black}"
    rounded: "{rounded.none}"
    padding: "0 18px"
    height: "48px"
  button-plate-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "0 18px"
    height: "48px"
  rail:
    backgroundColor: "{colors.flap-black}"
    textColor: "{colors.steel-light}"
    typography: "{typography.label-latin}"
    rounded: "{rounded.none}"
    padding: "10px 16px"
  column-heads:
    backgroundColor: "{colors.flap-black}"
    textColor: "{colors.steel-light}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "9px 16px"
  departure-row:
    backgroundColor: "{colors.flap-black}"
    textColor: "{colors.white}"
    typography: "{typography.headline}"
    rounded: "{rounded.none}"
    padding: "18px 16px"
  departure-row-hover:
    backgroundColor: "{colors.row-hover}"
    textColor: "{colors.white}"
  panel-head:
    backgroundColor: "{colors.board-recess}"
    textColor: "{colors.steel-light}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "10px 16px"
  phrase-chip:
    backgroundColor: "{colors.flap-black}"
    textColor: "{colors.white}"
    typography: "{typography.body-note}"
    rounded: "{rounded.none}"
    padding: "7px 12px"
  code-block:
    backgroundColor: "{colors.board-recess}"
    textColor: "{colors.white}"
    typography: "{typography.mono}"
    rounded: "{rounded.none}"
    padding: "10px 12px"
---

# Design System: 프로젝트 소개 (Departure Board)

## Overview

**Creative North Star: "The Concourse Departure Board"**

The whole surface is one object: a black split-flap board set in a brushed-steel bezel, hung on a near-black wall. Everything the visitor reads is either a flap plate (a single dark tile carrying one word or one value, with a hairline split across its middle) or continuous type printed on the board between steel rules. There are no cards, no pills, no hero gradient, no avatars. The three projects are three fixed rows of a departures table, and each row is itself the control: clicking a row departs to that project. The detail page is the same board reading a route card: the same rails, plates, rules, and one amber plate button.

Density is instrument-grade, not editorial-loose. Rows are 18px tall of padding on either side of a single 1px steel rule; column heads are tiny letterspaced Korean labels with a dimmed Latin twin. The palette is almost entirely greys and off-white; amber exists to say "not yet" (준비 중 / 대기) and to make the one download plate the brightest thing on the page. Red is reserved in the stylesheet for a cancelled state and is not yet used anywhere.

Motion is the board's own mechanism and nothing else: plates fold over on `rotateX` in 190ms, scrambling through two or three random glyphs before settling, in a 90ms-per-plate cascade on load. Hovering a row re-folds its type, link, and status plates once. Under `prefers-reduced-motion` the board simply shows its final state.

**Key Characteristics:**
- One object on a dark wall: steel bezel, black board, max width 960px, no page chrome outside it.
- One plate per word or value; row names and prose are continuous Gothic A1, never per-character cells.
- Barlow Condensed (uppercase, tracked) for Latin and numerals on plates and rails; Gothic A1 for every Korean word.
- Amber is the only chromatic voice at rest; it means "pending" on plates and "primary action" on buttons.
- Zero border radius anywhere. Depth comes from the bezel's one soft drop shadow and the plate's gradient sheen, not from card shadows.
- Hairline 1px steel rules do all structural division; grids are built from 1px gaps on a steel-dark background.

## Colors

A near-monochrome instrument palette: three blacks that read as one, three steels for frame and secondary text, one off-white, and amber as the single status/action hue.

### Primary
- **Signal Amber** (`amber`): the only saturated color at rest. Used as text on plates that mean "not ready" (준비 중, 대기), as the fill of the primary plate button, as the selection highlight, as the global focus ring, and as the chevron color on a hovered row. It is never a background for anything larger than a button.
- **Amber Edge** (`amber-edge`): a slightly darker amber used only as the 1px border of the amber plate button, so the button reads as a stamped plate rather than a flat fill.

### Tertiary
- **Cancel Red** (`red`): reserved in the stylesheet as `.flap.red` for a cancelled/failed status plate. Defined by the direction contract and the CSS; not used by any shipped row yet. Do not repurpose it for emphasis or links.

### Neutral
- **Flap Black** (`flap-black`): the board face. Background of the board, of every grid cell in the spec and install grids, and the text color on amber buttons.
- **Plate** (`plate`): the flap tile itself. Every `.flap .c` sits on this, with a top-light/bottom-dark gradient sheen laid over it.
- **Board Recess** (`board-recess`): the slightly deeper black for panel heads and code blocks on the detail page; a recess cut into the board face.
- **Row Hover** (`row-hover`): the faint lift a departure row takes on hover and focus. Barely distinct from the board on purpose.
- **Wall** (`wall`): the page background behind the bezel and the scrollbar track.
- **Steel Dark** (`steel-dark`): every structural rule: row dividers, column-head rules, panel borders, grid gutters, phrase-chip borders. Also the arrow color on the pending row.
- **Steel** (`steel`): the secondary plate button's border, the scrollbar thumb, and the underline on inline `code`.
- **Steel Light** (`steel-light`): all secondary text: rail labels, column heads, row notes, panel body prose, dimmed type plates (`.flap.dim`), the pending row's title, and the resting chevron.
- **Board White** (`white`): primary text, plate faces, row names, lede.

### Named Rules
**The One Signal Rule.** Amber is the only hue on the board at rest. It appears on a plate only to mean "not yet" and on a button only to mean "the primary action". Nothing decorative is amber.

**The Steel Does the Dividing Rule.** Separation is a 1px `steel-dark` rule or a 1px gutter of `steel-dark` behind flap-black cells. No borders lighter than `steel`, no colored dividers, no spacing-only separation between rows.

## Typography

**Display Font:** Barlow Condensed 500/600/700 (with Arial Narrow fallback) for Latin letters and numerals on plates and rails
**Body Font:** Gothic A1 400/700/800 (with Apple SD Gothic Neo, Malgun Gothic fallback) for every Korean word, including Korean plate faces
**Label/Mono Font:** Consolas / Menlo (system monospace) for the one install path block

**Character:** A bilingual instrument. Latin and numerals are condensed, uppercase, and tracked wide like stamped plate lettering; Korean is a heavy, tight Gothic that stays legible at phone size. The pairing is scripted by content, not by role: the same plate uses Barlow Condensed for `SKILL` and Gothic A1 800 for `열람`.

### Hierarchy
- **Display** (Barlow Condensed 600 / Gothic A1 800 for Hangul plates, `clamp(1.9rem, 6.6vw, 2.9rem)`, line-height 1): the page title, one plate per word (`프로젝트` `소개`, `NEWS` `READING` `HELPER`), plate height `clamp(3.2rem, 11vw, 4.8rem)`.
- **Headline** (Gothic A1 800, 1.3rem, 1.3, -0.005em; 1.15rem under 720px): the project name in a departure row. Continuous type, `text-wrap: balance`, never plated.
- **Title** (Gothic A1 800, 1.02rem, 1.5; Latin variant Barlow Condensed 600 1.1rem uppercase 0.08em): step and section labels in the detail page's three-column rows; `h3` in the install grid at 1rem.
- **Body** (Gothic A1 400, 16px base, 1.65): the lede at 1.05rem/1.75 with a 60ch measure; panel prose at 0.95rem/1.7 in `steel-light`.
- **Body note** (Gothic A1 400, 0.88rem, 1.55, 0.01em, `steel-light`): the one-line description under each row name; fine print at 0.86rem/1.7.
- **Label** (Gothic A1 700, 0.78rem, 0.2em tracking, `steel-light`): column heads and spec terms. Each carries an optional Latin twin in Barlow Condensed 600 0.8rem 0.16em at 70% opacity, which hides under 720px.
- **Label, Latin** (Barlow Condensed 600, 0.9rem, 0.16em, uppercase): rail text (`MENU`), with a Korean twin in Gothic A1 700 0.8rem 0.18em that hides under 480px.
- **Plate** (Barlow Condensed 600–700, 0.92–1.25rem, line-height 1, 0.08em uppercase; numerals tabular with 0.12em; Hangul plates Gothic A1 800 0.04em no case change): the face of every flap tile. Sizes: `sm` 0.98rem in a 1.6rem tile, `lg` 1.25rem in a 2.1rem tile, `title` as Display. In detail-page step rows plates run at 1rem.
- **Mono** (Consolas/Menlo 0.85rem/1.5): the single `pre` showing the install folder tree.

### Named Rules
**The One Plate Per Word Rule.** A flap plate carries one word or one whole value (`ZIP 다운로드`, `A4 1-2쪽`, `20:11`). Per-character cells were tried and rejected for legibility; never split a word into letter tiles.

**The Script Picks the Face Rule.** Barlow Condensed for Latin and numerals, Gothic A1 for Hangul, decided per plate by content. Do not set Korean in the condensed face or Latin plate text in Gothic A1.

**The Plain Words Rule.** UI labels are ordinary words (메뉴, 번호, 프로젝트, 종류, 링크, 상태, 열람, 대기, 준비 중). The metaphor lives in the materials, never in the vocabulary.

## Layout

One centered object. The body carries `clamp(16px, 4vw, 48px)` top/bottom and 16px side padding on the wall; the bezel is `max-width: 960px`, `margin: 0 auto`, with 10px of brushed steel around the board. Nothing is placed outside the bezel.

Inside the board, vertical structure is a stack of full-width bands separated by 1px `steel-dark` rules: rail (10px 16px), header (`clamp(22px, 4vw, 40px)` top, `clamp(16px, 3vw, 28px)` bottom, 16px sides), column heads (9px vertical), then rows (18px vertical). Horizontal padding is 16px everywhere; the departures grid uses 16px column gaps.

The departures grid is six fixed-ish columns: `3.4rem minmax(0,1fr) 6.2rem 9.5rem 5rem 1.4rem` (number, name, type, link, status, chevron). Under 1000px it collapses to `3.4rem minmax(0,1fr) 1.2rem`; the three plate columns leave the grid and become a single nowrap 8px-gap strip under the row note. Under 720px the number column is 3.2rem, gaps 12px, headline 1.15rem, and plates shrink one step (`lg` 1.9rem/1.1rem, `sm` 1.5rem/0.9rem).

Detail-page panels follow the same band logic: a recessed panel head, then either 16px-padded body, a 3-column spec grid built from 1px `steel-dark` gutters (2 columns under 720px), three-column step rows `3.6rem 12rem minmax(0,1fr)` with 18px gaps (collapsing to two columns under 720px with the prose dropping under the label), or a two-up install grid that stacks under 720px.

Spacing rhythm as used: 1px rules; 6px between plates in a flap group (10px in the title); 8px chip/strip gaps; 10px between plate buttons; 12–14px inside grid cells; 16px as the universal panel padding; 18px row padding; 20px before lede and button rows.

## Elevation & Depth

Depth is physical, not layered. There is exactly one drop shadow in the system: the bezel's `0 30px 60px -28px rgba(0,0,0,0.9)`, which hangs the whole board off the wall. Everything inside the board is flat and separated by rules, with two material cues that are part of the object rather than elevation: a 1px inset highlight on the bezel (`0 2px 0 rgba(255,255,255,0.08) inset`) and on the board edge (`0 0 0 1px rgba(255,255,255,0.05) inset`), and the plate sheen, a top-light/bottom-dark gradient overlay (`rgba(255,255,255,0.07)` to transparent at 48% to `rgba(0,0,0,0.3)`) with a 1px `rgba(0,0,0,0.9)` split line at 50% height (`0.55` alpha on small plates).

Hover does not lift. Rows darken-to-lighter (`row-hover`) and the chevron slides 4px right and turns amber; plate buttons brighten 6% and rise 1px; secondary buttons only change border color.

### Shadow Vocabulary
- **Bezel hang** (`box-shadow: 0 30px 60px -28px rgba(0,0,0,0.9), 0 2px 0 rgba(255,255,255,0.08) inset`): the bezel only. Never on an element inside the board.
- **Board edge** (`box-shadow: 0 0 0 1px rgba(255,255,255,0.05) inset`): the board only, with its 1px `#000` border.

### Named Rules
**The One Shadow Rule.** The bezel casts the only shadow. Cards, plates, buttons, and panels inside the board never carry a drop shadow; they are flat on the board face and separated by steel rules.

**The Sheen Is Not a Shadow Rule.** The flap plate's gradient and split line are its material. Do not add them to buttons, chips, or panels, and do not remove them from a plate.

## Shapes

Zero radius, everywhere. Plates, buttons, chips, code blocks, swatches, the lamp, the scrollbar thumb, and the bezel itself are all hard rectangles. Borders are 1px: `#000` at the board edge and under rails, `steel-dark` for structure, `steel` for the secondary button, `amber-edge` for the primary button. The recurring silhouette is the plate: a short wide rectangle, height fixed per size (1.6rem / 2.1rem / clamp 3.2–4.8rem), width hugging its one word plus `0.55em` side padding (`0.4em` on the title), with a horizontal split line across the middle. Icons are inline SVG strokes (14–18px, stroke-width 2–2.4) with square linecaps, so they read as stamped, not rounded. Grids are formed by 1px `steel-dark` gutters behind flap-black cells rather than by borders on each cell.

## Components

### Buttons (plate buttons)
Stamped plates: condensed uppercase lettering on an amber face, 48px tall.
- **Shape:** hard rectangle (0 radius), 1px border.
- **Primary:** `amber` face, `flap-black` text, 1px `amber-edge` border; `min-height: 48px`, `padding: 0 18px`, 12px gap between icon, label, and size note. Latin label Barlow Condensed 700 1.05rem 0.12em uppercase; Korean label Gothic A1 800 0.95rem 0.08em; a `small` size note in Barlow Condensed 600 0.82rem at 80% opacity. Icon is a 16px inline SVG stroke (2.4, square caps).
- **Hover / Active / Focus:** hover `filter: brightness(1.06)` and `translateY(-1px)` over 160ms `cubic-bezier(0.2, 0.8, 0.2, 1)`; active returns to 0; focus-visible is a 2px `white` outline offset 2px (the global ring is amber; on an amber button it switches to white).
- **Secondary:** transparent face, `white` text, 1px `steel` border; hover brightens the border to `steel-light` with no filter. Used for in-page jumps (설치 방법).
- **Grouping:** `.plates` is a wrapping flex row with 10px gaps, 20px above.

### Chips (phrase chips)
Quoted trigger phrases on the board face.
- **Style:** transparent on `flap-black`, 1px `steel-dark` border, `padding: 7px 12px`, 0.9rem `white` text, typographic quotes injected in `steel-light`. Wrapping flex, 8px gaps, 16px container padding.
- **State:** static; no hover or selection.

### Cards / Containers (panels)
There are no cards. The detail page uses full-width panels.
- **Corner Style:** none.
- **Background:** `flap-black`; panel head `board-recess`.
- **Shadow Strategy:** none (see The One Shadow Rule).
- **Border:** 1px `steel-dark` above each panel and below each panel head.
- **Internal Padding:** head `10px 16px`, body 16px. Panel head text: Gothic A1 700 0.8rem 0.2em `steel-light` with a right-aligned Latin twin (Barlow Condensed 600 0.8rem 0.16em uppercase, 70% opacity), baseline-aligned, space-between.
- **Spec grid:** `dl` as a 3-column grid (2 under 720px) of flap-black cells on 1px `steel-dark` gutters; `dt` is a Label (0.78rem 0.18em), `dd` holds a small plate; cell padding `12px 14px`.
- **Install grid:** two flap-black cells on a 1px gutter, 16px padding, `h3` Gothic A1 800 1rem, prose `steel-light` 0.95rem/1.7, optional code block (`board-recess`, 1px `steel-dark` border, `10px 12px`, mono).

### Inputs / Fields
None exist. The surface has no forms.

### Navigation (rails)
Steel rails top and bottom of the board.
- **Style:** `padding: 10px 16px`, vertical gradient `#202227` to `#17181c`, 1px `#000` rule below (above, for the bottom rail), flex space-between with 16px gap.
- **Typography:** Barlow Condensed 600 0.9rem 0.16em uppercase in `steel-light`; Korean twin Gothic A1 700 0.8rem 0.18em (hidden under 480px).
- **States:** rail links are `steel-light`, hover `white`, no underline, 8px gap to a 14px inline SVG chevron (stroke 2, square caps).
- **Clock:** a small flap plate (`.flap.sm.clock`) at the right end showing `HH:MM`, tabular numerals, re-flipping when the minute changes.
- **Lamp:** the index rail carries a 7px green square before `MENU` as a power indicator (see the not-canonized note below; this green is a one-off, not a token).
- **Mobile:** same rail; only the Korean twin label drops.

### Departure row (signature)
The row is the control. An `a.row` (or `div.row.pending` when there is nowhere to go) spanning the six-column grid, 18px vertical padding, 1px `steel-dark` rule between rows.
- **Cells:** a `lg` number plate (tabular numerals); the name block (Headline in `white` plus Body note in `steel-light`, 5px apart); three `sm` plates for type (`.dim`, `steel-light` face), link, and status; an 18px chevron in `steel-light` at the right edge.
- **Hover / Focus:** background to `row-hover` over 140ms; the chevron moves 4px right and turns `amber` (180ms `cubic-bezier(0.2, 0.8, 0.2, 1)`); the three meta plates re-flip once in sequence (60ms apart). Focus-visible uses the global amber ring at -2px offset.
- **Pending:** `cursor: default`, title drops to `steel-light`, chevron to `steel-dark`, link and status plates set `.amber` (준비 중 / 대기). The rest of the row is unchanged, so the table stays aligned.
- **Under 1000px:** the three plates become one nowrap strip under the note, 10px below, 8px gaps, overflow hidden.

### Flap plate (signature)
The atom of the system. A `.flap` group is an inline-flex, wrapping, 6px-gap container with `perspective: 400px`; each `.c` child is one plate: inline-grid, centered, fixed height, `0 0.55em` side padding, `plate` background, `white` text, line-height 1, nowrap, `transform-style: preserve-3d`, with the sheen gradient (`::before`) and split line (`::after`). Classes: `.k` (Hangul: Gothic A1 800, 0.04em, no uppercase), `.n` (numeric: tabular, 0.12em). Color variants: `.amber`, `.dim` (`steel-light`), `.red` (reserved). Sizes: `.sm` 1.6rem tile / 0.98rem / weight 700 / lighter split line; default 1.6rem / 0.92rem / 600; `.lg` 2.1rem / 1.25rem; `.title` `clamp(3.2rem, 11vw, 4.8rem)` / `clamp(1.9rem, 6.6vw, 2.9rem)` / `0.4em` padding / 10px gaps.
- **Build:** `board.js` replaces the element's text (or `data-text`) with one plate per word when `data-split="words"`, otherwise one plate for the whole value, and inserts a visually-hidden `.sr` copy before it for assistive tech; plates are `aria-hidden`.
- **Motion:** `.flipping` runs `flip` 190ms `cubic-bezier(0.3, 0, 0.2, 1)`: `rotateX(0)` to `-88deg` at 40% (brightness 0.6), jump to `+88deg` at 41%, back to 0; the face text swaps at 70ms. On load every plate inside a `[data-cascade]` group scrambles through 2–3 random glyphs (letters, digits, or a Hangul pool, matched to the final glyph's script) at 150ms intervals, offset 100ms + 120ms per group + 60ms per flap + 90ms per plate. `prefers-reduced-motion: reduce` disables all animation and transition globally and shows final text immediately.

## Do's and Don'ts

### Do:
- **Do** put every new screen inside the same bezel + board object (`max-width: 960px`, 10px steel bezel, flap-black board) and open it with the rail and a plated title.
- **Do** render any short categorical value (status, type, number, time, format) as a single flap plate per word/value, and any name or sentence as continuous Gothic A1.
- **Do** keep Barlow Condensed for Latin/numerals and Gothic A1 for Hangul, chosen per plate by script; keep plate Latin uppercase and tracked (0.08em; numerals 0.12em tabular).
- **Do** divide with 1px `steel-dark` rules and 1px-gutter grids; keep 16px as the panel padding and 18px as the row padding.
- **Do** reserve `amber` for pending-state plates and the primary plate button, and `red` plates for a cancelled state when one exists.
- **Do** carry the `.sr` hidden copy and `aria-hidden` plates whenever a plate is built, and honor `prefers-reduced-motion` by showing final text immediately.
- **Do** make a whole row the link when a list item has one destination, with the chevron as its only affordance.

### Don't:
- **Don't** add border radius to anything; the system is 0 everywhere, including buttons, chips, and the lamp.
- **Don't** add drop shadows inside the board; the bezel's hang is the only shadow (The One Shadow Rule).
- **Don't** split a word into per-character flap cells; one plate per word or value (The One Plate Per Word Rule).
- **Don't** use card grids, pill buttons, gradient heroes, glass panels, or avatars; the purple-gradient/glass look is the confirmed anti-reference.
- **Don't** introduce a second accent hue or use amber decoratively; amber on a plate always means "not yet".
- **Don't** replace plain UI words with metaphor vocabulary (no "platform", "departures", "gate" as labels); 메뉴, 번호, 프로젝트, 종류, 링크, 상태 are the words.
- **Don't** put the plate sheen or split line on buttons, chips, or panels, and don't ship a plate without them.
