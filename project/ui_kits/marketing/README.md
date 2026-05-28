# Orbit Guard — Marketing site UI kit

Pixel-first scaffolding for the Orbit Guard marketing site. Drop the
components into a page, use the tokens in `../../colors_and_type.css`,
and the result should look on-brand without further styling.

## Files
- `index.html` — interactive demo (header → hero → benefits → product picker → reviews → CTA → footer). Click a color swatch to swap the hero puck; click *Add to cart* to trigger the toast.
- `Header.jsx` — sticky top nav with cart counter.
- `Hero.jsx` — split hero with rotating product puck + color picker.
- `BenefitGrid.jsx` — three-up icon + copy grid (Lucide icons).
- `ProductGrid.jsx` — product cards using the brand "elevated" card style.
- `ReviewStrip.jsx` — testimonial trio on cream.
- `FooterCta.jsx` — big blue CTA + footer.
- `ui.jsx` — shared `<Button>`, `<Pill>`, `<Card>`, `<Eyebrow>` primitives.

## Caveats
Built from the brand-board alone — there is no production codebase
to mirror, so component shapes are first-pass interpretations of the
voice and tokens. Imagery is placeholder product pucks (CSS, not
photography); swap in real product shots when available.
