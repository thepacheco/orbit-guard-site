---
name: orbit-guard-design
description: Use this skill to generate well-branded interfaces and assets for Orbit Guard (the office-chair caster-guard product from parent company OrbitGuard), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

Quick map:
- `README.md` — brand context, content fundamentals, visual foundations, iconography.
- `colors_and_type.css` — all tokens (colors, type, spacing, radii, shadow, motion).
- `fonts/` — `REZ.ttf` (display) is shipped. HK Grotesk / Proxima Nova are substituted with **DM Sans** from Google Fonts; flag for the user if they need licensed equivalents.
- `assets/` — logos (parent lockup, Orbit wordmark in blue & white, round avatar mark), monochrome SVG mark, ring motif.
- `preview/` — per-token preview cards (the canonical reference for what "right" looks like).
- `ui_kits/marketing/` — JSX components + `index.html` interactive demo for the marketing site.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc.), copy assets out of `assets/` and create static HTML files for the user to view. Import `colors_and_type.css` to get all the tokens in scope.

If working on production code, you can copy assets, import tokens, and read the rules here to become an expert in designing with this brand.

Key brand rules to remember:
- **One brand color: `#5A74FF` Blue.** Don't invent additional accent hues for the UI.
- **Page is white.** Use `--bg-inset` (#F6F6F4) for quiet sections; cream only on hero/feature blocks.
- **The 12-color product palette (Lavender, Clover, Coral, Fawn, Bear, Onyx, etc.) is reserved for the physical product variants.** Use those colors when you're rendering or referring to the actual caster-guard SKUs, not when picking button or status colors.
- **No emoji in product UI.** Use Lucide line icons (2px stroke) instead.
- **Rounded everything.** Pills for buttons, `--r-lg` for cards. No square corners except dividers and `<code>`.
- **Tone: warm, plain, slightly playful.** Sentence case for headings & buttons. No corporate-speak.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
