---
topic: TIG Atelier — components, token layer, type scale, font swap
reference: app/products/[slug]/page.tsx
written: 2026-11-08
---

# TIG Atelier refactor

**Closed 2026-11-08. Every task done, none parked.** This is the record of the
refactor, not work outstanding.

Status of a task: unticked is `todo`, ticked is `done`, and `parked — <why>`
stays unticked with its reason on the line.

Ending 1 — the work stayed with us in one context. The file lived outside the
working copy while the work ran, and was filed here at the end instead of being
deleted (see `## Decided`).

## Decided

- "Keep dark, rebuild as tokens" / "Instrument Serif + Inter" / "Primitives +
  sections" / brand is "TIG Atelier" — chosen 2026-11-08 at the
  finding-patterns questions. Level 1, as asked. Overrules nothing the order
  produced; the order had no answer for any of the four.
- "plan can touch the repository at thr end uts just a .md file" — overrules
  `planning`/plan-file.md, which says nothing of the plan is written into the
  project's repository, not committed and not left in the working copy —
  2026-11-08; released: the closing task, which now files the plan instead of
  deleting it. While the work runs it still lives outside the checkout, so a
  half-finished plan is never committed.

## The checklist every page task carries

Every line below was passed on all four pages by an agent that wrote none of
them. What it found along the way is under *What the check found*.

```
TIG Atelier refactor against marketing scroll page (no folder keeps kinds apart;
decided on what the reference renders) — from app/products/[slug]/page.tsx,
3 members of 4 candidates in the app, outer holder 4 of 4, read 2026-11-08

- [x] page holder — ui/PageShell, max-w-[1440px] overflow-x-clip, centred —
      4 of 4, 4 files
- [x] header — layout/SiteHeader; overlay where a hero floats under it, 3 of 4
      (cart is the exception, it has no hero) — the shared piece
- [x] footer — layout/SiteFooter, bare, no props — 4 of 4, 4 files
- [x] exactly one h1, in the hero — 4 of 4; cart's comes from CartView, not its
      page file — the shared piece
- [x] hero backdrop — ui/GlowBackdrop, never a hand-written radial-gradient;
      replaces 8 across 3 files — the extraction, as asked
- [x] section intro — ui/SectionIntro: eyebrow + display h2 + lede, in that
      order; replaces 4 hand-written across 3 files — the extraction, as asked
- [x] lede — ui/Lede, 18px/1.65, content.body — 3 of 3, 3 files
- [x] button pair — ui/Button, fill first then line — 3 of 3 in the hero,
      2 of 3 again in a closing CTA — the shared class, now the component
- [x] eyebrow colour — var(--accent) through ui/Eyebrow; no !important
      override — the shared class, against 1 override in help
- [x] type — every heading a named step of the new scale; no clamp() written at
      a page. Replaces 20 distinct triples over 24 headings, no majority among
      them — the proposal agreed by the plan's yes
- [x] colour — every value a token; no hex, no rgba, at a page or a component.
      Replaces 24 hex + 16 rgba across 6 files — the proposal agreed by the
      plan's yes
- [x] sticky column — the shared `.stage` class bare, no inline style over it;
      2 call sites, 1 bare and 1 overriding `top` inline, which defeats the
      class's own mobile reset — found by the calibration
- [x] spacing — section rhythm through ui/Section; pb-40 was the one rhythm
      with a spread, 5 files. The project has no base: literals
      18/22/26/60/120/140/150/180/200/360 share only 2, which does not produce
      what the project writes
- [x] not copied from the product page: its own clamp triples, its 1040px hero
      min-height, and its hand-pasted product card
```

Searches behind the counts, run over `app/page.tsx`,
`app/products/[slug]/page.tsx`, `app/help/page.tsx`, `app/cart/page.tsx`, each
proven on the reference first: `max-w-[1440px] overflow-x-clip`; `<SiteHeader`
and `overlay`; `<SiteFooter`; `<h1`; `radial-gradient`; `className="eyebrow`;
`text-lg leading-[1.65] text-mute`; `btn btn-fill` / `btn btn-line`;
`text-\[clamp\([^]]+\)\]`; `#[0-9A-Fa-f]{6}` and `rgba\(`; `(py|pt|pb)-\[[0-9]+px\]`.

## Tasks

- [x] **Calibrate the check.** `done` — 2026-11-08, for the marketing scroll
      page kind. The plant: a detached git worktree at HEAD outside the
      checkout, with `app/products/[slug]/page.tsx:72` changed from `text-mute`
      to `text-soft` — the hero lede's colour alone, its size and line height
      left as they were. A separate agent, given
      `ui-consistency:verifying` and the checklist above and told only that the
      copy differed somewhere, named it as a difference of the page and counted
      it against the family, not against the original: *"Hero lede colour —
      line 72: `text-soft` (#C9C7C2). The other two ledes write `text-mute`
      (#A3A5AF): `app/page.tsx:51` and `app/help/page.tsx:48` … 2 of 3 use
      `text-mute`; this is the odd one"*. The plant counts.
      - **What the plant tested:** one part of a type role's bundle changed
        while the rest stayed right — the failure a count of sizes alone cannot
        see — and whether the checker counts a position across the family
        rather than diffing against a reference it was told not to open.
      - **What no plant tested:** rendering, element and heading levels, control
        and section heights, overflow at any width, the words the user reads,
        spacing off the base, and any contrast threshold. Silence from the
        checker on those is not a pass.
      - Page tasks of this kind do not repeat it. The checker of the pages is a
        new agent, not this one: this one now knows a plant exists.
      - The calibration also surfaced two real findings this plan had missed,
        both confirmed by grep and folded into the tasks below: the inline
        `style={{ top: 40 }}` on `.stage`, and `bg-[#14161C]` used for a photo
        frame where the same role writes `bg-panel` twice.

- [x] **Foundation: tokens, type scale, fonts.** `done`. Before any page or primitive.
      - `tailwind.config.ts` — replace the 9 flat colours with the semantic
        groups below; add the `display` type steps; keep `tracking-eyebrow`.
      - `app/globals.css` — the 6 hand-written literals go
        (`--accent: #e39a78`, `#0a0b0e` ×2, `#ece8e1`, `#b48cdb` ×2); `.field`
        focus and the focus-visible ring take the `accent-lavender` token.
      - `app/layout.tsx` — drop the 8 `@fontsource/bodoni-moda` +
        `@fontsource/manrope` imports; add `@fontsource/instrument-serif/400.css`,
        `400-italic.css` and `@fontsource/inter` 400/500/600.
      - `package.json` — remove `@fontsource/bodoni-moda`, `@fontsource/manrope`.
      - Instrument Serif ships **weight 400 only**: nothing may ask for a
        display 500, or the browser synthesises one. `.display` already uses
        `font-normal`; keep it that way and check no `font-medium` lands on a
        display element.
      - `lib/brand.ts` — new: `{ name: "TIG Atelier", year: 2026 }`, so the
        footer and the four `metadata.title`s stop repeating the string.

      Tokens (surfaces keep the dark base; neutrals warm off their current
      blue-grey; the two accents are unchanged):
      ```
      surface.base    #0A0A0C   page            was #0A0B0E (+ rgba(10,11,14,*) ×13)
      surface.raised  #131216   panels, photo   was panel #12141A ×6
                                frames          + #14161C ×1 (the drift below)
      surface.inset   #17161B   card base,      was #14161C ×3, #1A1C22 ×3
                                thumbnail
      surface.violet  #0F0B14   help contact    was #0E0B14 + rgba(14,*,*) ×2
      content.primary   #ECE8E1 headings        was bone, unchanged
      content.secondary #CAC5BC                 was soft #C9C7C2, warmed
      content.body      #A8A29B body and lede   was mute #A3A5AF, warmed
      content.faint     #8C867E captions        was dim #8E909A, warmed
      accent.copper   #E39A78   design 01       unchanged
      accent.lavender #B48CDB   design 02       unchanged
      glow.steel      #1B2230   design 01 glow  was a literal ×3 + products.ts
      glow.plum       #2A1A3A   design 02 glow  was a literal ×4 + products.ts
      line.hairline   rgba(236,232,225,0.10)    was white/10 ×14
      line.strong     rgba(236,232,225,0.35)    was bone/35
      ```
      `steel: #7FA3C9` is dropped — 0 uses. The three orphan surfaces
      (`#14161C`, `#1A1C22`, `#0E0B14`) become `surface.inset` and
      `surface.violet`: they had no theme entry, which is why this is in the
      plan's yes and not decided silently.
      **One of the four `#14161C` is drift, not an orphan** — found by the
      calibration. `app/products/[slug]/page.tsx:189` is the frame behind the
      buy photo, and the same role writes `bg-panel` at `app/page.tsx:161` and
      at `:114` of that same file: 2 of 3, so it takes `surface.raised`. The
      other three (`app/page.tsx:125`, `app/products/[slug]/page.tsx:213`, both
      `-z-20` card bases, and `components/CartView.tsx:133`) are the inset role
      and take `surface.inset`.
      `lib/products.ts` keeps `glow` as the token **name** (`"steel"` /
      `"plum"`), not a hex, so the five page literals stop duplicating the data.

      Type steps, replacing 20 ad-hoc triples over 24 headings:
      ```
      display-hero  clamp(52px, 8.4vw, 124px)  the page h1
      display-xl    clamp(44px, 7vw, 104px)    a closing CTA h2
      display-lg    clamp(40px, 5vw, 72px)     a major section h2
      display-md    clamp(34px, 4.4vw, 60px)   a minor section h2
      display-sm    clamp(28px, 3.4vw, 46px)   a card or caption h3
      display-xs    clamp(22px, 2.2vw, 30px)   cart summary h2, FAQ question
      lede          18px / 1.65                the hero lede
      body          16px / 1.7                 section body
      small         15px / 1.65                card blurb, spec rows
      meta          13px / 1.5                 footer, captions
      ```

- [x] **The `ui/` primitives.** `done` — 14 built, not the 11 named here; the
      three beyond the list are in *What was built beyond the plan* below.
      Before any page. As asked — the request named
      them and where they go, so this is level 1 and not a question.
      `components/ui/`: `PageShell`, `Section`, `SectionIntro`, `Display`,
      `Eyebrow`, `Lede`, `Button`, `Field`, `Panel`, `SpecRows`, `GlowBackdrop`.
      - `Button` renders `next/link` for an internal href, `<a>` for a hash,
        `<button type=...>` with no href — the element whose meaning the role
        has, which is what all 10 current call sites already write.
      - `Field` carries label + control with the label tied to it by `htmlFor`,
        as `ContactForm` writes it in 5 of 5 fields.
      - `Display` takes the heading level explicitly, never guessing it: the
        family writes exactly one h1 per page and h2 per section, 4 of 4.
      - `GlowBackdrop` takes the token names, not colours.

- [x] **`layout/`, `product/`, `cart/`.** `done`. Move `SiteHeader`, `SiteFooter`,
      `Logo` to `layout/`; `CartButton`, `CartView` to `cart/`; `SleeveStory`,
      `ProductBuy` to `product/` as `ProductBuyPanel`. Extract
      `product/ProductCard` from the two pasted class strings in
      `app/page.tsx:123` and `app/products/[slug]/page.tsx:211` — they differ
      only in `min-h` and padding, which become props. Extract
      `product/CloseUpZoom` and `product/MirroredPair` from the product page.
      `SiteFooter` and the four page titles read `lib/brand.ts`.
      `components/CartView.tsx` must be read in full first — 349 lines, only
      searched so far.

- [x] **Home page** — `done`, check passed. 236 lines → 38.
      Rewrite `app/page.tsx` as a composition of
      `sections/home/{Hero,Statement,Collection,Craft,Closing}`, following
      `app/products/[slug]/page.tsx`, against the checklist above.
      Must not be copied from the reference: its own clamp triples, its 1040px
      hero min-height, its hand-pasted product card.
      Its own 3 `radial-gradient` literals and 6 clamp triples go.
      1. Re-read the checklist before writing — do not work from memory.
      2. Report the page ready for its check. Whoever dispatched this task sends
         it to the checker of its kind — the one agent with
         `ui-consistency:verifying` kept for every page of this kind, started at
         the first, never the one that wrote it or the one calibrated — and
         sends back what it reports; fix that.
      3. Report the status here: `done` once the check has passed, or
         `parked — <why>`.

- [x] **Product page** — `done`, check passed. 240 lines → 55.
      Rewrite `app/products/[slug]/page.tsx` as a composition
      of `sections/product/{Hero,Statement,Buy,OtherDesign}` plus
      `product/{SleeveStory,CloseUpZoom,MirroredPair,ProductCard}`, against the
      checklist above.
      This is the reference, and at level 7 it is a starting point, not an
      authority: it is also the drifting page on type (7 clamp triples of its
      own) and on the pasted card, so it changes too.
      Its `--accent` per-product wrapper stays — 3 call sites depend on it.
      Two fixes the calibration found, both in this page:
      - `:188` `style={{ top: 40 }}` on `.stage` goes. The shared class sets
        `top: 96px` and resets to `position: relative; top: 0` under 760px; the
        inline value wins over the reset, so the mobile column keeps a 40px
        offset while no longer sticky. Take the class bare, as
        `SleeveStory.tsx:28` does.
      - `:189` `bg-[#14161C]` is the buy photo's frame, the `bg-panel` role —
        it takes `surface.raised`, not `surface.inset`.
      1. Re-read the checklist before writing — do not work from memory.
      2. Report the page ready for its check. Whoever dispatched this task sends
         it to the checker of its kind — never the one that wrote it or the one
         calibrated — and sends back what it reports; fix that.
      3. Report the status here: `done` or `parked — <why>`.

- [x] **Help page** — `done`, check passed. 123 lines → 34.
      Rewrite `app/help/page.tsx` as a composition of
      `sections/help/{Hero,Faq,Contact,ClosingLinks}`, against the checklist
      above.
      Its `!text-lavender` override on the eyebrow goes: the eyebrow takes
      `var(--accent)`, and the contact section sets `--accent` to
      `accent-lavender` on its own wrapper instead — the shared class, against
      the 1 override.
      Its 3 `radial-gradient` literals and its `#0E0B14` go.
      1. Re-read the checklist before writing — do not work from memory.
      2. Report the page ready for its check. Whoever dispatched this task sends
         it to the checker of its kind — never the one that wrote it or the one
         calibrated — and sends back what it reports; fix that.
      3. Report the status here: `done` or `parked — <why>`.

- [x] **Cart page** — `done`, check passed. Page 18 → 20 lines; `CartView`
      349 → 300. `app/cart/page.tsx` and `cart/CartView.tsx` against the
      checklist above, **minus the hero and section lines**.
      Not in this task: the hero backdrop, section intro, lede and button-pair
      lines — the cart renders no hero and no section of the kind, which is why
      it is 1 of the 4 candidates removed from the family for that region. The
      outer holder, header, footer, one-h1, type, colour and spacing lines all
      still apply.
      Its `#1A1C22` ×3, its `rgba(0,0,0,0.55)` shadow and its two bare
      `text-[30px]` display sizes go.
      1. Re-read the checklist before writing — do not work from memory.
      2. Report the page ready for its check. Whoever dispatched this task sends
         it to the checker of its kind — never the one that wrote it or the one
         calibrated — and sends back what it reports; fix that.
      3. Report the status here: `done` or `parked — <why>`.

- [x] **Build, and look at all four pages in a browser.** `done` — 2026-11-08.
      `npm run build` for types, then the dev server: the four routes at desktop
      and at 380px, the scroll-driven motion still firing, the cart flow end to
      end, and the FAQ disclosure. Instrument Serif at 400 only — check nothing
      renders a synthesised bold. What the browser showed is in *What the
      browser check settled* below.

- [x] **Close the plan** — `done` — 2026-11-08. Every task above is done, none
      parked. What is under `## Decided` is reported with the result below, and
      this plan is filed into the repository as `docs/refactor-plan.md`, per the
      override above, rather than deleted. It stayed outside the checkout while
      the work ran, so no half-finished plan was ever committed.

## What the check found

One agent held `ui-consistency:verifying` and the checklist for all four pages,
and wrote none of them. It passed every checklist line: page holder 4 of 4,
header overlay 3 of 4, footer 4 of 4, one h1 4 of 4, hero backdrop (no
hand-written `radial-gradient` outside `GlowBackdrop`/`GlowSpot`), all 8 button
pairs, eyebrow colour with no `!important`, colour with zero hex and zero rgba
outside the token layer, `.stage` bare at both product call sites, section
rhythm with no literal padding pair, and nothing copied from the reference —
1040px only on the product hero, 980px on home, `ProductCard` imported rather
than pasted. It also confirmed no `font-medium` or `font-semibold` on any of the
20 `Display` sites, so Instrument Serif is never asked for a weight it does not
ship.

Five findings were real and were fixed:

- `ProductBuyPanel` — the price took `text-display-xs` on a `<span>` with no
  `display` class, so a display step rendered in Inter. The original wrote a
  plain `text-[22px]`, so this was introduced by the type step, not inherited.
  Fixed by adding the class, which puts the price on the display face.
- `FaqList` — `aria-controls` pointed at a node that did not exist, because the
  panel was conditionally rendered. Fixed by always rendering it with
  `hidden={!open}`.
- `CartView` — the heading order jumped h1 → h3 on the bag lines. Fixed to h2,
  siblings of the "Summary" h2.
- `CartView` — a third spelling of the sticky column, `md:sticky md:top-6`.
  Fixed to the shared `.stage`, which carries the under-760px reset with it.
- `CartView` — the empty state hardcoded both slugs and names. Fixed to map
  `products`.

Eight findings were declined, each for a reason:

- `Collection`'s `text-accent-lavender` — the original design intent, and still
  a token.
- `SpecRows`'s raw `<h3>` — a sans row heading, so `Display` would be wrong.
- `CloseUpZoom`'s `sticky top-0` — a full-bleed pin, not the `.stage` role.
- FAQ questions not wrapped in `<h3>` — a valid `aria-expanded` disclosure
  already; wrapping would add elements the design did not ask for.
- No `<main>` on any page — 4 of 4 consistent, and outside this task.
- The duplicate `heroMask` — 2 sites, different values, one line each.
- The step `<li>` and the payment placeholder carrying
  `text-meta uppercase tracking-eyebrow` — an `<li>` cannot be `Meta`, which
  renders a span.

## What the browser check settled

Everything the checker listed as *not checked* was checked in the browser, and
all of it passed.

- **Overflow** — zero horizontal overflow on all five routes at 380px, and on
  home and the product page at 1280px and 1440px. The 980px and 1040px hero
  min-heights do not overflow at 380px.
- **`CloseUpZoom` below 760px** — the 1700px track and 820px pin behave; the
  image fills the frame and the caption stays legible at 380px.
- **`.stage` below 760px** — both instances report `position: relative; top: 0`
  at 380px, so the shared class's mobile reset takes effect, which is the fix
  the calibration found.
- **Fonts** — the loaded set is exactly Instrument Serif 400 and 400-italic,
  Inter 400/500/600. No `.display` element computes to a weight other than 400,
  so nothing renders a synthesised bold.
- **Motion** — `animation-timeline: view()` is supported and applied; a `.rise`
  element goes from `opacity: 0` with a 48px offset to `opacity: 1` at 0 as it
  enters. The `prefers-reduced-motion` reset still covers all 19 motion classes.
- **Cart flow, end to end** — select size → add to bag → bag → delivery → done.
  Size is recorded correctly, the total is right, the cart clears on order, and
  every delivery field's `label[for]` resolves to its control.
- **Cart dropdown** — opens and closes on click, 340px wide, and the
  `View cart and checkout` button renders.
- **FAQ disclosure** — one panel open at a time, and `hidden` tracks
  `aria-expanded` on all 9 across open, switch and close.
- **Contact form** — submits and swaps to its sent state.
- **Console** — zero errors across every route. The one repeated Next.js
  warning, that the home hero image wants `priority`, is a false positive from
  scripted fast scrolling: the hero `<img>` carries `fetchpriority="high"`, and
  an idle load emits no new warning.
- **Copy** — all 18 `[PLACEHOLDER]` strings are byte-identical to the initial
  commit. The refactor neither lost nor invented a word the user reads.
  They are the project's own unfilled copy, not damage, and still need filling:
  `[FABRIC DETAILS]`, `[SHIPPING COST]`, `[EMAIL ADDRESS]` and the rest.

## What was built beyond the plan

Five primitives beyond the eleven this plan named, each covering a pattern
repeated three times or more: `Meta`, `DetailList`, `CartLine`, `Scrim` and
`GlowSpot`.

`DetailList` is the one with a visible consequence: it renders help's
label/value pairs as `<dl>/<dt>/<dd>` where the page wrote generic spans. That
is an element proposal applied at level 7 — there is one instance in the
project, so there is no convention either way, and the role is a description
list. Worth a person's eye, since no count settled it.

## Still open

Not defects, and not in this task's scope — recorded so they are not lost.

- `CartButton` carries `aria-expanded` with no `aria-controls`, and has no
  Escape key or focus handling. Verified identical in the initial commit, so it
  is inherited, not a regression.
- Neither "Added to bag" nor the contact form's success swap is announced to a
  screen reader. The cart page has an `alert` region; the product and contact
  pages do not.
- `ProductCard`'s `text-content-secondary` sits over a photograph behind a
  `Scrim`. Contrast there cannot be settled from the code, and no standard was
  asked for (`ui-consistency:accessibility` runs only on request).
