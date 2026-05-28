# Orbit Guard — Design System

> **Orbit Guard** (often styled **OrbitGuard** as the parent
> company; **Orbit** is the product wordmark) makes office-chair
> caster guards: a clip-on shield that wraps each caster wheel so it
> can't roll over a pet's tail, a charging cable, or your bare foot.
> The product is a tiny piece of hardware that lives under everyone's
> desk, so the brand has to feel **warm, friendly and protective**
> while staying confidently simple.

This folder is the canonical home for the Orbit Guard look-and-feel:
colors, typography, voice, components, and a marketing-site UI kit.

---

## What's in this project

| Path | Purpose |
|------|---------|
| [`README.md`](README.md) | This file — overview + content / visual / iconography fundamentals. |
| [`SKILL.md`](SKILL.md) | Agent Skills entry point — read this first if invoked as a skill. |
| [`colors_and_type.css`](colors_and_type.css) | All design tokens (color, type, spacing, radii, shadow, motion). |
| [`fonts/`](fonts/) | `REZ.ttf` (shipped) + substitution notes for HK Grotesk / Proxima Nova. |
| [`assets/`](assets/) | Logo marks, wordmarks (blue + white), ring motif, mono SVG. |
| [`preview/`](preview/) | The cards rendered in the **Design System** tab. |
| [`ui_kits/marketing/`](ui_kits/marketing/) | Marketing-site UI kit — JSX components + interactive demo. |

---

## Sources we were given

- `uploads/Starter Brand Guildlines.pdf` — 1-page brand-board (logos, fonts, primary palette, product palette).
- `uploads/Orbit Icon Profile Image.png` — 800×800 white-on-blue circular avatar.
- `uploads/Orbit (Solid Blue) 2.png` — 5667×2501 transparent wordmark in sky-blue (`#0096DE`).
- Founder notes: *"simplistic and warm that invites interactiveness… rounded corners and colors that catch the eye… colors must sync with one another such as how Stripe does."*

> **Note for the reader:** No codebase, Figma, or live site was attached, so all components in `ui_kits/` are first-pass extrapolations of the brand-board, not recreations of existing screens. Treat them as scaffolding for the user to iterate on.

---

## Content fundamentals

Orbit Guard sells a calm safety product to people who love their pets,
their cords, and their toes. Copy should feel like a thoughtful friend,
not a hardware spec sheet.

**Tone**
- **Warm, plain, slightly playful.** Short sentences. One idea per line.
- **Reassuring, never alarming.** We talk about what we protect ("paws, cords, toes"), not about disasters we prevent.
- **Confident, not corporate.** No "solutions", "best-in-class", or "revolutionizing." Avoid superlatives.

**Voice**
- Address the reader as **you**. Refer to ourselves as **we** sparingly — most lines work without a pronoun.
- Verbs over nouns. *"Wraps every caster"* beats *"Provides caster wrapping functionality."*
- Use the product names that already exist in the palette guide as moods, not as feature names (Lavender, Clover, Coral…). They name colors, never SKUs.

**Casing**
- **Sentence case** everywhere — headings, buttons, nav. Title Case only on the proper noun "Orbit Guard."
- All-caps only for the brand-board section dividers and the eyebrow micro-label (tracked +14%).

**Punctuation**
- Em dashes are okay. Oxford commas, yes. Exclamation marks: max one per screen, save it for the "thanks!" moment.

**Emoji & symbols**
- **No emoji in product UI.** They clash with the typographic warmth.
- Unicode arrows (`→`, `←`) and bullets (`•`) are fine for inline rhythm; otherwise use real icons.

**Example copy**
- ✅ "Guards every caster on every chair. Quiet, soft, see-it-once-and-forget-it."
- ✅ "Roll without the worry — your cat's tail will thank you."
- ✅ "Five guards. Two minutes. No tools."
- ❌ "Revolutionary caster protection technology that delivers world-class safety outcomes."
- ❌ "🐾 Protect your pets! 🐾"

---

## Visual foundations

**Mood.** Warm minimalism. The cream `#E8E6D8` background is doing the heavy lifting — it makes the indigo-blue `#5A74FF` pop without resorting to gradients. Think of a Stripe-style harmonious palette, but resting on paper instead of white.

**Color**
- **Primary:** `--og-blue` `#5A74FF` (the brand "Blue"). One blue, used decisively.
- **Background:** `--bg` is **white**. Use `--bg-inset` (`#F6F6F4`, a warm-tinted gray) for quiet sections and `--bg-cream` (`#E8E6D8`) sparingly on hero/feature blocks for warmth.
- **The product palette is for products, not UI.** Onyx, Clover, Coral, Lavender, Fawn, Bear, Pomegranate, Flamingo, Rooster, Lunar, Blueberry are the colors the physical caster guards come in — they appear as swatches, illustrations and category coding for the SKUs, never as button colors, status colors, or page backgrounds.
- **Text** is `--fg` `#1A1B1F`; `--fg-2` `#4B5560` for secondary; `--fg-3` `#7A8290` for tertiary.
- **Status** colors are derived (`#18A06F` success, `#B57D2A` warning, `#D93838` danger) so they don't collide with product hues.

**Type**
- Display: **Rez** (shipped — `fonts/REZ.ttf`) — the brand display face, used for hero moments only.
- UI: **DM Sans** 400 / 500 / 700 — substitute for HK Grotesk. Confident geometric grotesque with humanist warmth.
- Friendly body: **ABeeZee** — used for marketing prose, testimonials, captions.
- One eyebrow style: 12px / 700 / +14% tracking / uppercase / blue.

**Spacing & layout**
- 4-pt scale. Generous: prefer `--s-5` (24) and `--s-6` (32) between groups.
- Marketing pages are **center-stacked at ~1120 max-width** with **96px** vertical rhythm.
- Cards are roomy: `--s-6` padding minimum.
- Fixed elements: a thin sticky header (72px); no sticky footers.

**Backgrounds**
- Solid white is the default. **No gradients** as page backgrounds.
- `--bg-inset` (mist) breaks long pages into quiet sections.
- `--bg-cream` is reserved for hero or testimonial blocks where we explicitly want warmth.
- A single decorative motif is allowed: **concentric rings** echoing the logo's orbit (see `assets/orbit-rings.svg`). Used at low opacity behind hero sections.
- Full-bleed photography is allowed for product shots; otherwise use neutral cards instead of stock photos.

**Corner radii**
- Everything is rounded. Buttons & pills: `--r-pill` (999) or `--r-md` (14). Cards: `--r-lg` (20). Hero blocks: `--r-xl` (28).
- The only sharp edges are dividers and inline `<code>` chips.

**Cards**
- White surface, `--r-lg` corners, `--shadow-2`, no border.
- On cream, an alternative "tinted card" uses `--bg-inset` with a `1px` `--border` hairline and no shadow.
- Featured cards get `--shadow-3` and a 1px inset highlight (`--shadow-inset`).

**Shadows**
- Soft, warm, never gray-on-black. Three steps (`--shadow-1/2/3`).
- Blue glow `--shadow-blue` is reserved for the primary CTA when raised.

**Borders**
- 1px hairlines in `--border` `#D9D7C9` on cream, `#EDEAE0` on white.
- We do **not** use colored left-border accents on cards — too AI-cliché.

**Hover / press**
- **Hover** lifts: `translateY(-2px)` + shadow goes one step up + 140ms `--ease-out`.
- **Press** shrinks: `scale(0.97)` + shadow drops one step.
- Links: solid blue → `--og-blue-deep` (`#3B57E8`) on hover, plus a 2px underline that grows from 0 to 100% width.

**Motion**
- Ease-out for entrances, **gentle bounce** (`--ease-bounce`) for interactive feedback (toggle, add-to-cart, success ticks).
- Durations: 140 / 220 / 420 ms. No 800ms+ slow fades.
- The logo's "gap" can rotate slowly (~24s loop) as a single ambient motion on the hero — never on small mark usages.

**Transparency & blur**
- Header uses `backdrop-filter: blur(12px)` over cream at 80% opacity when content scrolls under.
- We **don't** use frosted glass on cards or modals — it muddies the warm cream.

**Imagery**
- Warm, natural light. Cats, dogs, sock-feet under desks. No staged stock-office shots.
- B&W is reserved for press / about pages.
- A subtle **2-3% grain overlay** is allowed on hero photography to keep it cozy.

**Layout rules**
- Two-column max on desktop, single-column on tablet and below.
- The orbit-mark must always have its full circular safe-area (one ring's worth of padding around it).
- Wordmark and icon are never recolored beyond the approved blues, cream, and onyx.

---

## Iconography

The brand-board did **not** include an icon set, so we adopt **Lucide** as the line-icon system (loaded via CDN). Lucide is the closest match to Orbit Guard's "simple, rounded, friendly" tone — uniform 2px stroke, rounded line caps, generous corner radii on shapes — and it's open-source.

**Rules**
- 24px is the default size. 20px in dense UI, 32px+ in hero/feature usage.
- Stroke is **always 2px**. Color follows text (`currentColor`), or `--og-blue` when the icon stands alone next to a heading.
- No filled icons in primary UI — Lucide line style only. Filled glyphs are reserved for status (success check, danger).
- Pair icons with a label whenever possible. No icon-only buttons except for close `×`, search, and the avatar menu.

**Logo & marks** (in `assets/`)
- `assets/orbitguard-lockup-white.jpg` — **parent-company lockup** (Orbit + Guard) in white on `#0F172A` navy. Use on dark backgrounds for corporate / press contexts.
- `assets/orbit-wordmark-blue.png` — Orbit product wordmark, indigo-blue on light surfaces.
- `assets/orbit-wordmark-white.png` — Orbit product wordmark, white. Use on the brand blue or the navy.
- `assets/orbit-icon-mark.png` — 800×800 round avatar (white mark on `#5A74FF`). For app icons, social profiles, small contexts.
- `assets/orbit-mark-mono.svg` — single-color mark, recolorable via `currentColor`.
- `assets/orbit-rings.svg` — background motif (concentric rings) for hero sections.

**Emoji & unicode**
- **No emoji in product UI.** They clash with Mulish + Bowlby and feel off-brand.
- A few unicode characters are allowed in flow text: `→ ← • ·`.
- Pet/foot/cord glyphs in product marketing are always **real Lucide icons** or **commissioned line illustrations**, never emoji.
