function Header({ dark }) {
  // Header is ALWAYS white-glassy — even on dark variants. Ink stays dark.
  const cardBg     = "rgba(255,255,255,0.65)";
  const cardBorder = "rgba(255,255,255,0.7)";
  const ink        = "var(--fg)";
  const mute       = "var(--fg-2)";
  const chipBg     = "rgba(255,255,255,0.85)";

  return (
    <div style={{
      position: "fixed", top: 22, left: 0, right: 0, zIndex: 50,
      display: "flex", justifyContent: "center", padding: "0 24px",
      pointerEvents: "none",
    }}>
      <header style={{
        position: "relative",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 16px 14px 24px",
        background: cardBg,
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderRadius: 999,
        boxShadow: `0 1px 0 ${cardBorder} inset, 0 14px 36px rgba(0,0,0,${dark ? 0.35 : 0.10})`,
        width: "100%", maxWidth: 1240,
        pointerEvents: "auto",
        transition: "background 420ms var(--ease-out), color 420ms var(--ease-out)",
        color: ink,
      }}>

        {/* LEFT: nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <NavLink active inkActive={ink} mute={mute} chip={chipBg}>Shop</NavLink>
          <NavLink mute={mute} ink={ink}>
            Pets
            <span style={{
              display: "inline-block", width: 7, height: 7, borderRadius: "50%",
              background: "var(--og-blue)", marginLeft: 6,
              boxShadow: "0 0 0 4px rgba(90,116,255,0.18)",
            }}/>
          </NavLink>
          <NavLink mute={mute} ink={ink}>How it works</NavLink>
          <NavLink mute={mute} ink={ink}>Support</NavLink>
        </nav>

        {/* CENTER: icon mark */}
        <div style={{
          position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)",
          display: "flex", alignItems: "center",
        }}>
          <img
            src="../../assets/orbit-icon-mark.png"
            alt="Orbit"
            style={{ width: 40, height: 40, borderRadius: "50%", display: "block" }}
          />
        </div>

        {/* RIGHT: icons + CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <RoundIcon icon="search"      hoverBg={chipBg} />
          <RoundIcon icon="heart"       hoverBg={chipBg} />
          <RoundIcon icon="shopping-bag" hoverBg={chipBg} badge="2" badgeBorder={dark ? "transparent" : "#fff"} />
          <button style={{
            marginLeft: 8, background: "var(--og-blue)", color: "#fff", border: "none",
            padding: "12px 18px 12px 20px", borderRadius: 999,
            fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 14, cursor: "pointer",
            display: "inline-flex", alignItems: "center", gap: 8,
            boxShadow: "0 6px 16px rgba(90,116,255,0.32)",
          }}>
            Get a pack
            <i data-lucide="arrow-right" style={{ width: 16, height: 16 }}></i>
          </button>
        </div>
      </header>
    </div>
  );
}

function NavLink({ children, active, mute, ink, inkActive, chip }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 15,
        color: active ? inkActive : (hover ? ink : mute),
        textDecoration: "none", cursor: "pointer",
        padding: "10px 16px", borderRadius: 999,
        background: active ? chip : "transparent",
        display: "inline-flex", alignItems: "center",
        transition: "all 140ms var(--ease-out)",
      }}>
      {children}
    </a>
  );
}

function RoundIcon({ icon, hoverBg, badge, badgeBorder }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 42, height: 42, borderRadius: "50%",
        background: hover ? hoverBg : "transparent",
        border: "none", color: "inherit", cursor: "pointer",
        display: "grid", placeItems: "center", position: "relative",
        transition: "background 140ms var(--ease-out)",
      }}>
      <i data-lucide={icon} style={{ width: 20, height: 20, strokeWidth: 1.6 }}></i>
      {badge && <span style={{
        position: "absolute", top: 4, right: 4, minWidth: 15, height: 15, padding: "0 3px",
        background: "var(--og-blue)", color: "#fff", fontSize: 10, fontWeight: 800,
        borderRadius: 999, display: "grid", placeItems: "center",
        border: `2px solid ${badgeBorder}`,
      }}>{badge}</span>}
    </button>
  );
}

Object.assign(window, { Header });
