// Shared primitives for the Orbit Guard marketing kit.

const PACK_SIZES = [
  { count: 1,  price: 6,  label: "Single",      tag: null },
  { count: 5,  price: 24, label: "One chair",   tag: null },
  { count: 6,  price: 28, label: "+1 spare",    tag: "Best for 1" },
  { count: 10, price: 44, label: "Two chairs",  tag: null },
  { count: 12, price: 48, label: "Bulk",        tag: "Save 33%" },
];

const PRODUCT_VARIANTS = [
  {
    key: "blueberry", name: "Blueberry", hex: "#4361EE",
    bg: "#E4E9FF", text: "#0E1640",  ring: "#2A45C7",
    accent: "#FFB4A2",
    headline: { line1: "Deep, calm,", lasso: "Blueberry", line2: "blue." },
    price: 24,
    blurb: "The classic Orbit — a saturated indigo that anchors any setup and pops against gray, oak, or rug.",
    features: [
      { icon: "droplets",     title: "Indigo-saturation finish", sub: "Reads navy under lamplight." },
      { icon: "armchair",     title: "Fits 95% of chairs",    sub: "Stems from 7 to 11mm." },
      { icon: "paw-print",    title: "Paw & cord safe",       sub: "Tested by three curious cats." },
      { icon: "rotate-ccw",   title: "60-day returns",        sub: "Free, no questions asked." },
    ],
    floatChips: [
      { icon: "droplets",   text: "Gray-floor pairing" },
      { icon: "shield-check", text: "Soft TPU shell" },
      { icon: "volume-x",   text: "Whisper-quiet" },
    ],
    dark: false,
  },
  {
    key: "clover", name: "Clover",   hex: "#06D6A0",
    bg: "#E5F7EE", text: "#0A2A22",  ring: "#06D6A0",
    accent: "#5A74FF",
    headline: { line1: "Fresh take.", lasso: "Clover", line2: "guard." },
    price: 24,
    blurb: "A mint green that disappears into houseplants and Persian rugs alike. New for spring.",
    features: [
      { icon: "leaf",         title: "Plant-safe colorway",   sub: "Reads like a hosta leaf." },
      { icon: "armchair",     title: "Fits 95% of chairs",    sub: "Stems from 7 to 11mm." },
      { icon: "paw-print",    title: "Paw & cord safe",       sub: "Tested by three curious cats." },
      { icon: "rotate-ccw",   title: "60-day returns",        sub: "Free, no questions asked." },
    ],
    floatChips: [
      { icon: "leaf",       text: "Plant-room friendly" },
      { icon: "volume-x",   text: "Whisper-quiet" },
      { icon: "shield-check", text: "Soft TPU shell" },
    ],
    dark: false,
  },
  {
    key: "coral",  name: "Coral",    hex: "#FFB4A2",
    bg: "#FFEEE8", text: "#3A1A12",  ring: "#FF6B47",
    accent: "#5A74FF",
    headline: { line1: "Warm room?", lasso: "Coral", line2: "is yours." },
    price: 24,
    blurb: "A muted peach that loves natural wood floors and golden-hour light.",
    features: [
      { icon: "sun",          title: "Warm-tone match",        sub: "Pairs with oak & walnut." },
      { icon: "armchair",     title: "Fits 95% of chairs",    sub: "Stems from 7 to 11mm." },
      { icon: "paw-print",    title: "Paw & cord safe",       sub: "Tested by three curious cats." },
      { icon: "rotate-ccw",   title: "60-day returns",        sub: "Free, no questions asked." },
    ],
    floatChips: [
      { icon: "sun",        text: "Wood-floor friendly" },
      { icon: "heart",      text: "Most-gifted" },
      { icon: "shield-check", text: "Soft TPU shell" },
    ],
    dark: false,
  },
  {
    key: "lavender", name: "Lavender", hex: "#A292FF",
    bg: "#F1EEFF", text: "#1F1840",   ring: "#7C5CFF",
    accent: "#FFB4A2",
    headline: { line1: "Calm, but", lasso: "Lavender", line2: "punchy." },
    price: 24,
    blurb: "Soft purple that quietly dresses up any chair. Especially nice in studios and reading nooks.",
    features: [
      { icon: "moon",         title: "Studio-friendly tone",   sub: "Soft on the eyes." },
      { icon: "armchair",     title: "Fits 95% of chairs",    sub: "Stems from 7 to 11mm." },
      { icon: "paw-print",    title: "Paw & cord safe",       sub: "Tested by three curious cats." },
      { icon: "rotate-ccw",   title: "60-day returns",        sub: "Free, no questions asked." },
    ],
    floatChips: [
      { icon: "moon",       text: "Reading-nook ready" },
      { icon: "volume-x",   text: "Whisper-quiet" },
      { icon: "shield-check", text: "Soft TPU shell" },
    ],
    dark: false,
  },
  {
    key: "fawn",   name: "Fawn",     hex: "#E7BC91",
    bg: "#FBF1E3", text: "#3A2614",  ring: "#9C6644",
    accent: "#06D6A0",
    headline: { line1: "Warm wood?", lasso: "Fawn", line2: "feels right." },
    price: 24,
    blurb: "A sandy tan tuned to oak and bamboo floors. Works on rugs too — disappears like it should.",
    features: [
      { icon: "tree-pine",    title: "Hardwood match",         sub: "Oak, bamboo, ash." },
      { icon: "armchair",     title: "Fits 95% of chairs",    sub: "Stems from 7 to 11mm." },
      { icon: "paw-print",    title: "Paw & cord safe",       sub: "Tested by three curious cats." },
      { icon: "rotate-ccw",   title: "60-day returns",        sub: "Free, no questions asked." },
    ],
    floatChips: [
      { icon: "tree-pine",  text: "Hardwood blend" },
      { icon: "shield-check", text: "Soft TPU shell" },
      { icon: "feather",    text: "Featherweight" },
    ],
    dark: false,
  },
  {
    key: "rooster", name: "Rooster", hex: "#FF3131",
    bg: "#FFE7E2", text: "#3A0808",  ring: "#B5161B",
    accent: "#06D6A0",
    headline: { line1: "Loud.", lasso: "Rooster", line2: "and proud." },
    price: 24,
    blurb: "For the people who put red on everything. Pops against neutral floors and rugs.",
    features: [
      { icon: "flame",        title: "Boldest in the lineup",  sub: "Statement caster guards." },
      { icon: "armchair",     title: "Fits 95% of chairs",    sub: "Stems from 7 to 11mm." },
      { icon: "paw-print",    title: "Paw & cord safe",       sub: "Tested by three curious cats." },
      { icon: "rotate-ccw",   title: "60-day returns",        sub: "Free, no questions asked." },
    ],
    floatChips: [
      { icon: "flame",      text: "Statement piece" },
      { icon: "shield-check", text: "Soft TPU shell" },
      { icon: "zap",        text: "Limited drop" },
    ],
    dark: false,
  },
  {
    key: "flamingo", name: "Flamingo", hex: "#FF90FE",
    bg: "#FFE6FE", text: "#3B0D3A",  ring: "#C44FC1",
    accent: "#06D6A0",
    headline: { line1: "Pink, with", lasso: "Flamingo", line2: "energy." },
    price: 24,
    blurb: "An unapologetic pink for the people decorating in maximalist mode. Kids' rooms approve.",
    features: [
      { icon: "sparkles",     title: "Maximalist pink",        sub: "Built to be seen." },
      { icon: "armchair",     title: "Fits 95% of chairs",    sub: "Stems from 7 to 11mm." },
      { icon: "paw-print",    title: "Paw & cord safe",       sub: "Tested by three curious cats." },
      { icon: "rotate-ccw",   title: "60-day returns",        sub: "Free, no questions asked." },
    ],
    floatChips: [
      { icon: "sparkles",   text: "Kids-room favorite" },
      { icon: "shield-check", text: "Soft TPU shell" },
      { icon: "heart",      text: "Most-gifted" },
    ],
    dark: false,
  },
  {
    key: "bear", name: "Bear", hex: "#9C6644",
    bg: "#F1E4D6", text: "#2A1608",  ring: "#7A4A2F",
    accent: "#06D6A0",
    headline: { line1: "Cozy as a", lasso: "Bear", line2: "in autumn." },
    price: 24,
    blurb: "A grounded chestnut brown for walnut desks, leather chairs, and the bookshelf life.",
    features: [
      { icon: "tree-pine",    title: "Walnut-tone match",      sub: "Pairs with dark woods." },
      { icon: "armchair",     title: "Fits 95% of chairs",    sub: "Stems from 7 to 11mm." },
      { icon: "paw-print",    title: "Paw & cord safe",       sub: "Tested by three curious cats." },
      { icon: "rotate-ccw",   title: "60-day returns",        sub: "Free, no questions asked." },
    ],
    floatChips: [
      { icon: "book",       text: "Library-ready" },
      { icon: "shield-check", text: "Soft TPU shell" },
      { icon: "feather",    text: "Featherweight" },
    ],
    dark: false,
  },
  {
    key: "pomegranate", name: "Pomegranate", hex: "#950000",
    bg: "#F0D9D9", text: "#2A0808",  ring: "#700000",
    accent: "#E7BC91",
    headline: { line1: "Rich and", lasso: "Pomegranate", line2: "luxe." },
    price: 24,
    blurb: "A deep oxblood for the people whose rugs already have it. Quietly luxurious.",
    features: [
      { icon: "wine",         title: "Deep oxblood",           sub: "For grown-up offices." },
      { icon: "armchair",     title: "Fits 95% of chairs",    sub: "Stems from 7 to 11mm." },
      { icon: "paw-print",    title: "Paw & cord safe",       sub: "Tested by three curious cats." },
      { icon: "rotate-ccw",   title: "60-day returns",        sub: "Free, no questions asked." },
    ],
    floatChips: [
      { icon: "wine",       text: "Studio-luxe palette" },
      { icon: "shield-check", text: "Soft TPU shell" },
      { icon: "volume-x",   text: "Whisper-quiet" },
    ],
    dark: false,
  },
  {
    key: "onyx",   name: "Onyx",     hex: "#212529",
    bg: "#15171B", text: "#FFFFFF",  ring: "#5A74FF",
    accent: "#FFB4A2",
    headline: { line1: "Goes with", lasso: "anything.", line2: "Even gaming chairs." },
    price: 24,
    blurb: "The stealth option. Matte black caster guards for the people who only own black furniture.",
    features: [
      { icon: "eye-off",      title: "Disappears into dark",   sub: "Stealth on black bases." },
      { icon: "armchair",     title: "Fits 95% of chairs",    sub: "Stems from 7 to 11mm." },
      { icon: "paw-print",    title: "Paw & cord safe",       sub: "Tested by three curious cats." },
      { icon: "rotate-ccw",   title: "60-day returns",        sub: "Free, no questions asked." },
    ],
    floatChips: [
      { icon: "eye-off",    text: "Stealth finish" },
      { icon: "shield-check", text: "Soft TPU shell" },
      { icon: "zap",        text: "Gamer-approved" },
    ],
    dark: true,
  },
  {
    key: "polar",  name: "Polar",    hex: "#F4F4F0",
    bg: "#FFFFFF", text: "#1A1B1F",  ring: "#5A74FF",
    accent: "#06D6A0",
    headline: { line1: "Pure,", lasso: "Polar", line2: "minimal." },
    price: 24,
    blurb: "Off-white that disappears against bright floors and modern studios. Quietly perfect.",
    features: [
      { icon: "snowflake",    title: "Whisper-bright finish",  sub: "Reads as a soft glow under light." },
      { icon: "armchair",     title: "Fits 95% of chairs",    sub: "Stems from 7 to 11mm." },
      { icon: "paw-print",    title: "Paw & cord safe",       sub: "Tested by three curious cats." },
      { icon: "rotate-ccw",   title: "60-day returns",        sub: "Free, no questions asked." },
    ],
    floatChips: [
      { icon: "snowflake",  text: "Studio-bright" },
      { icon: "shield-check", text: "Soft TPU shell" },
      { icon: "volume-x",   text: "Whisper-quiet" },
    ],
    dark: false,
  },
];

function Button({ variant = "primary", size = "md", children, onClick, icon, style }) {
  const base = {
    fontFamily: "var(--font-ui)", fontWeight: 700, border: "none",
    cursor: "pointer", borderRadius: "var(--r-pill)",
    transition: "transform 140ms var(--ease-out), box-shadow 140ms var(--ease-out)",
    display: "inline-flex", alignItems: "center", gap: 8,
  };
  const sizes = {
    sm: { padding: "8px 14px", fontSize: 13 },
    md: { padding: "12px 22px", fontSize: 15 },
    lg: { padding: "14px 26px", fontSize: 15 },
  };
  const variants = {
    primary:   { background: "var(--fg)",     color: "white",   boxShadow: "0 6px 18px rgba(0,0,0,0.18)" },
    inverse:   { background: "white",          color: "var(--fg)", boxShadow: "0 6px 18px rgba(0,0,0,0.10)" },
    ghost:     { background: "transparent",    color: "currentColor", boxShadow: "inset 0 0 0 1px currentColor" },
    blue:      { background: "var(--og-blue)", color: "white",   boxShadow: "var(--shadow-blue)" },
  };
  return (
    <button onClick={onClick}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      onMouseDown={e => { e.currentTarget.style.transform = "scale(0.97)"; }}
      onMouseUp={e => { e.currentTarget.style.transform = ""; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; }}
    >
      {icon && <i data-lucide={icon} style={{ width: 16, height: 16 }}></i>}
      {children}
    </button>
  );
}

function IconBtn({ icon, onClick, size = 36, tone = "neutral" }) {
  const [hover, setHover] = React.useState(false);
  const toneStyle = tone === "neutral"
    ? { border: `1px solid ${hover ? "currentColor" : "rgba(0,0,0,0.12)"}`, background: "transparent", color: "currentColor" }
    : { border: "none", background: hover ? "rgba(0,0,0,0.06)" : "transparent", color: "currentColor" };
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: size, height: size, borderRadius: "50%",
        ...toneStyle,
        display: "grid", placeItems: "center", cursor: "pointer",
        transition: "all 140ms var(--ease-out)",
      }}>
      <i data-lucide={icon} style={{ width: 16, height: 16, strokeWidth: 1.75 }}></i>
    </button>
  );
}

Object.assign(window, { PRODUCT_VARIANTS, PACK_SIZES, Button, IconBtn });
