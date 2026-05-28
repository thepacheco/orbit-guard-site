# Fonts

The brand guide lists four typefaces. None ship with source files,
so we substitute with the closest Google Fonts equivalents:

| Brand font     | Used for          | Status                    | Notes |
|----------------|-------------------|---------------------------|-------|
| **Rez**        | Display / logo    | **Shipped** — `fonts/REZ.ttf` | Wired via `@font-face` in `colors_and_type.css`. |
| **HK Grotesk** | UI headings/body  | Substituted by **Mulish** | Open-source neo-grotesk with similar proportions. Provide a licensed `.woff2` to swap in. |
| **Proxima Nova** | UI fallback     | Substituted by **Mulish** | Covered by the same Mulish swap. |
| **ABeeZee**    | Friendly body     | **ABeeZee** (Google Fonts) | Available directly, no substitution needed. |

> **Flag for the user:** HK Grotesk and Proxima Nova still need licensed
> font files (`.woff2` preferred). Mulish is a free stand-in but is not
> pixel-identical.
