---
name: news-reading-helper
description: Turn a news article URL (or pasted article text) into a dense, magazine-quality 1–2 page PDF research note. Use this skill whenever the user provides news content and asks for a brief, summary, one-pager, executive memo, research note, or printable PDF report derived from journalism. Triggers include phrases like "summarize this article as a PDF", "make a one-pager from this news", "turn this into a research note", "executive brief on this article", or any request that converts a news URL into a polished printable report. Outputs both a markdown structure file and a typeset PDF that uses the bundled professional fonts. Do NOT use this skill for casual news Q&A, fact-lookups answered in chat, or for non-news long-form content (use a generic report skill for those).
license: Complete terms in LICENSE.txt
---

# News Reading Helper

Convert a news article into an information-dense, magazine-quality **1–2 page PDF research note**, plus a markdown blueprint of its structure.

The two deliverables are both required:
1. `report-outline.md` — the section-by-section blueprint with content
2. `report.pdf` — the typeset PDF (1 page preferred, 2 pages maximum)

Both files go into `/mnt/user-data/outputs/` and are surfaced to the user with `present_files`. No other file types are produced.

---

## Workflow at a glance

| Phase | Goal | Output of phase |
|---|---|---|
| 1. Intake & research | Fetch source, extract structured facts, fill gaps via web search | Internal notes |
| 2. Information architecture | Decide what goes on the page and where | `report-outline.md` |
| 3. Render | Build the PDF with proper typography, grid, color | `report.pdf` |

Do not skip phase 2. The blueprint is what makes the final PDF dense without being chaotic.

---

## Phase 1 — Intake & research

**Fetch the source.** Call `web_fetch` on the URL the user provided. If the user pasted article text directly, work from that.

**Extract structured facts.** As you read the article, mentally bucket information into:

- **Hard facts** — numbers, dates, named entities, direct quotes (these will be the load-bearing content of the PDF)
- **Context** — background events, history, prior reporting that the article references
- **People & organizations** — named actors, their roles, their positions
- **Chronology** — sequence of events, timeline anchors
- **Implications** — stated consequences, expert reactions, forward-looking claims
- **Uncertainty** — what the article says is unknown, contested, or still developing

**Distinguish fact from opinion.** Mark editorial framing, anonymous-source claims, and analyst speculation separately from on-the-record facts. The PDF should make this distinction visible (e.g., quotes in a different style, an "Analyst view" subsection).

**Supplement with web search if and only if** the article references something the reader will need but the article itself does not explain — e.g., a regulation cited but not summarized, a company whose business the reader may not know, a prior event referenced obliquely. Run 1–3 targeted searches max; this is a news brief, not a research report. Always cite supplementary sources in the PDF's source block.

**Failure handling.**
- If `web_fetch` fails (404, paywall, JS-rendered page, robots block), say so plainly and ask the user to either paste the article text or provide an alternate URL. Do not fabricate the article's contents.
- If the page is partially fetched (e.g., headline + first paragraph only), tell the user what you got and ask whether to proceed with that or wait for full text.
- If the URL is not a news article (it's a forum thread, a tweet, a product page), tell the user and ask whether they still want a brief.

---

## Phase 2 — Information architecture

Before rendering anything, write `report-outline.md`. This is the blueprint. It forces information density decisions before you commit to layout.

### Required sections

Every brief has these:

1. **Header** — one-sentence headline that captures the news (not the original article's headline; your synthesis), source name, publication date, brief date, and a category tag (e.g., "Markets · Earnings", "Geopolitics · Sanctions", "Tech · AI policy").
2. **Executive summary** — 3–5 sentences. Lede with the news, then the stakes. This is the only section a busy reader is guaranteed to read; it must stand alone.
3. **Key facts** — bulleted hard facts. Numbers, names, dates. Bold the numbers.
4. **Context & background** — 1–2 short paragraphs. Why this news matters, what came before.
5. **Key players** — compact table or card grid: name · role · relevance.
6. **Impact & outlook** — short-term and longer-term consequences, expert views, forward indicators to watch.
7. **Sources** — original URL + any supplementary sources.

### Optional sections (include only if the article supports them)

- **Timeline** — only if the article spans multiple events across time. Use a compact horizontal or vertical strip.
- **Numbers at a glance** — only if there are 3+ comparable statistics worth a small visual.
- **Quotes box** — only if there are 1–2 quotes that genuinely illuminate the story.

### Density discipline

The brief lives or dies on density. As you draft the outline:

- Cut every sentence that doesn't carry a fact, a name, a number, or a directly useful interpretation.
- Prefer noun-led, verb-tight prose. Consulting-memo voice, not feature-writing voice.
- No filler transitions ("It is also worth noting that…"). Dense briefs juxtapose; they do not narrate.
- If a section would have only one weak bullet, fold it into a neighboring section.

### What `report-outline.md` should contain

For each section: the heading, the actual content (not placeholders), and a one-line layout note ("two-column", "right rail", "top banner", "boxed callout").

---

## Phase 3 — Render the PDF

**Primary rendering path: HTML + CSS → PDF via Playwright.** Reasons:
- Multi-column layouts via CSS columns or grid are trivial in HTML, painful in ReportLab.
- `@font-face` with the bundled TTFs gives precise control over the typography scale.
- Print CSS (`@page`, `page-break-inside`) handles 1–2 page constraints cleanly.

If Playwright is not available, fall back to `pdfkit` + `wkhtmltopdf` (also CSS-driven). Use ReportLab Platypus only as a last resort — and if you do, you must manually implement the column grid with `Frame` objects.

### Skeleton: HTML + CSS for a one-pager

The fonts ship inside this skill at `<skill-dir>/fonts/`. Locate the skill directory at runtime (typically `/mnt/skills/user/news-reading-helper/fonts/`), then reference the fonts via `file://` URLs in `@font-face`.

```python
# Pseudocode — adapt at render time
import os
from playwright.sync_api import sync_playwright

SKILL_DIR = "/mnt/skills/user/news-reading-helper"   # adjust if installed elsewhere
FONTS_DIR = os.path.join(SKILL_DIR, "fonts")

html = f"""
<!doctype html>
<html><head><meta charset="utf-8">
<style>
  @font-face {{ font-family: "Display"; src: url("file://{FONTS_DIR}/IBMPlexSerif-Bold.ttf"); font-weight: 700; }}
  @font-face {{ font-family: "Body";    src: url("file://{FONTS_DIR}/WorkSans-Regular.ttf"); font-weight: 400; }}
  @font-face {{ font-family: "Body";    src: url("file://{FONTS_DIR}/WorkSans-Bold.ttf");    font-weight: 700; }}
  @font-face {{ font-family: "Mono";    src: url("file://{FONTS_DIR}/GeistMono-Regular.ttf"); }}

  @page {{ size: A4; margin: 14mm 12mm; }}
  html, body {{ margin: 0; padding: 0; font-family: "Body", sans-serif; color: #111; }}
  body {{ font-size: 9.5pt; line-height: 1.38; }}

  /* Header band */
  .masthead {{ border-top: 3px solid #111; border-bottom: 1px solid #111; padding: 6pt 0; margin-bottom: 8pt; }}
  .masthead .tag {{ font-family: "Mono"; font-size: 7.5pt; letter-spacing: 0.12em; text-transform: uppercase; color: #555; }}
  .masthead h1 {{ font-family: "Display"; font-weight: 700; font-size: 18pt; line-height: 1.15; margin: 2pt 0 4pt; }}
  .masthead .meta {{ font-family: "Mono"; font-size: 7.5pt; color: #666; }}

  /* Two-column body */
  .body {{ column-count: 2; column-gap: 10pt; column-rule: 0.5pt solid #ddd; }}
  section {{ break-inside: avoid; margin-bottom: 8pt; }}
  section h2 {{ font-family: "Display"; font-size: 10.5pt; letter-spacing: 0.04em; text-transform: uppercase; margin: 0 0 4pt; border-bottom: 0.5pt solid #111; padding-bottom: 2pt; }}

  /* Executive summary callout */
  .exec {{ column-span: all; background: #f4f1ea; padding: 7pt 9pt; margin-bottom: 8pt; border-left: 2pt solid #b04a2f; }}
  .exec h2 {{ border: none; margin-bottom: 3pt; }}

  ul {{ margin: 0; padding-left: 12pt; }}
  li {{ margin-bottom: 2pt; }}
  .num {{ font-family: "Mono"; font-weight: 700; color: #b04a2f; }}

  table {{ width: 100%; border-collapse: collapse; font-size: 8.5pt; }}
  th, td {{ text-align: left; padding: 2pt 4pt; border-bottom: 0.5pt solid #ddd; }}
  th {{ font-family: "Mono"; font-size: 7.5pt; text-transform: uppercase; letter-spacing: 0.08em; }}

  blockquote {{ font-family: "Display"; font-style: italic; font-size: 10pt; border-left: 2pt solid #ccc; padding-left: 6pt; margin: 4pt 0; }}
  .sources {{ column-span: all; font-family: "Mono"; font-size: 7pt; color: #666; border-top: 0.5pt solid #ccc; padding-top: 4pt; margin-top: 6pt; }}
</style></head>
<body>
  <header class="masthead">
    <div class="tag">{category}</div>
    <h1>{synthesized_headline}</h1>
    <div class="meta">{source} · {pub_date} · Brief prepared {brief_date}</div>
  </header>

  <div class="body">
    <section class="exec"><h2>Executive summary</h2><p>{summary}</p></section>
    <section><h2>Key facts</h2><ul>{key_facts_li}</ul></section>
    <section><h2>Context</h2><p>{context}</p></section>
    <section><h2>Key players</h2><table>{players_rows}</table></section>
    <section><h2>Impact & outlook</h2><p>{impact}</p></section>
    <div class="sources">{sources}</div>
  </div>
</body></html>
"""

OUT = "/mnt/user-data/outputs/report.pdf"
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.set_content(html, wait_until="load")
    page.pdf(path=OUT, format="A4", margin={"top":"0","bottom":"0","left":"0","right":"0"}, print_background=True)
    browser.close()
```

This is a starting skeleton. Adapt the layout, colors, and font pairing to the chosen style preset (next section). Do not ship the skeleton verbatim — every brief should look like it was designed for that specific story.

### Layout rules that always apply

- **A4 (210×297mm) or US Letter.** Pick A4 unless the user asks for Letter.
- **Page margins**: 12–18mm. Tighter than a typical document, looser than a magazine.
- **Body type**: 9–11pt with 1.3–1.5 line-height. Smaller looks cramped; larger wastes the page.
- **Display type**: 14–22pt for the headline; 10–13pt for section heads.
- **Two-column body** by default. Three columns only if the brief is text-heavy and short. Single column reads as a memo, not a brief.
- **Color discipline**: one neutral background, one dark text color, one accent. That is three colors total. A second accent is allowed for charts only.
- **Numbers as visual anchors**: render meaningful figures in a different family (mono or display) and the accent color, so the eye finds them.
- **Page-break safety**: every `section` gets `break-inside: avoid` so a section never splits across pages mid-bullet.

---

## Style presets

Pick one based on the article's domain. These are starting points; refine to taste.

### Business · markets · earnings
- **Mood**: clean, data-forward, sober.
- **Display**: `IBMPlexSerif-Bold.ttf`. **Body**: `WorkSans-Regular/Bold.ttf`. **Numbers/labels**: `GeistMono-Regular/Bold.ttf`.
- **Colors**: text `#0F1A2B`, background `#FFFFFF`, accent `#B04A2F` (rust) or `#1F4E79` (navy), rule lines `#D9D9D9`.
- **Visual**: small inline bar chart for a single key metric; tight tables for comparables.

### Politics · society · policy
- **Mood**: serious, editorial, trustworthy.
- **Display**: `CrimsonPro-Bold.ttf`. **Body**: `Lora-Regular/Bold.ttf`. **Mono**: `IBMPlexMono-Regular.ttf`.
- **Colors**: text `#1A1A1A`, background `#FAF7F2` (warm off-white), accent `#7A1F1F` (burgundy), rule lines `#C9C2B8`.
- **Visual**: vertical timeline strip; pull-quote in italic display.

### Technology · science · AI
- **Mood**: modern, structural, slightly technical.
- **Display**: `Outfit-Bold.ttf` or `BricolageGrotesque-Bold.ttf`. **Body**: `InstrumentSans-Regular/Bold.ttf`. **Mono**: `JetBrainsMono-Regular/Bold.ttf`.
- **Colors**: text `#0E1116`, background `#FFFFFF`, accent `#0E7C7B` (teal) or `#2F6FED` (blue), rule lines `#E2E5EA`.
- **Visual**: small architecture/flow diagram; mono labels for system components.

If the article doesn't fit cleanly into one preset (e.g., a tech-policy piece), pick the dominant frame and borrow one detail from the secondary preset.

---

## Quality bar — final audit

Before declaring the PDF done, open it and check every item:

**Content**
- [ ] Headline conveys the news in one sentence, on its own.
- [ ] Executive summary stands alone (a reader who reads only this leaves informed).
- [ ] Every claim is traceable to the article or a cited supplementary source.
- [ ] Direct quotes are attributed and rendered in a distinct style.
- [ ] Dates, numbers, and names are spelled and formatted consistently.

**Layout**
- [ ] All content fits within 1 page (preferred) or 2 pages (max).
- [ ] No text overflows the page boundaries; no element clips.
- [ ] No section is split mid-bullet across pages or columns.
- [ ] Margins are uniform; columns are aligned to a grid.
- [ ] Rule lines, boxes, and rules of three are used consistently.

**Typography**
- [ ] Body type is readable at print size (9–11pt, 1.3–1.5 leading).
- [ ] Hierarchy is unambiguous: headline > section head > body > caption.
- [ ] Bundled fonts have actually loaded (no fallback Helvetica leaking in).
- [ ] Numbers stand out visually — the eye finds them in under 2 seconds.

**Color**
- [ ] At most one accent color in body text and one in charts.
- [ ] Contrast meets readability (no light gray text under 60% black).

**The 30-second test**
- [ ] A reader skimming for 30 seconds will know the news, the stakes, and the key actors. If not, the brief has failed regardless of how it looks.

---

## Output language

All visible content in both deliverables — headline, body, captions, source labels, table headers — is in **English**. Use professional, domain-appropriate vocabulary: financial-press register for markets, policy register for politics, technical register for science. Avoid corporate buzzwords ("synergies", "leverage", "moving forward") and avoid feature-writing flourishes ("In a stunning turn of events…"). The voice is a Wall Street research note or an Economist briefing, not a press release.

---

## Final delivery

After the PDF passes the audit:
1. Confirm `report-outline.md` and `report.pdf` are both in `/mnt/user-data/outputs/`.
2. Call `present_files` with both paths so the user can see and download them.
3. In your reply, give a one-line summary of what's in the brief and nothing more — the PDF speaks for itself.
