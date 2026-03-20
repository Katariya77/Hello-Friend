import { useState, useEffect } from "react";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? "0.75rem 2rem" : "1.25rem 2rem",
        transition: "all 0.4s ease",
        background: scrolled ? "rgba(3, 1, 12, 0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(167, 100, 255, 0.12)" : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          fontSize: "1.15rem",
          fontWeight: 800,
          background: "linear-gradient(135deg, #c084fc, #818cf8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          cursor: "pointer",
          letterSpacing: "-0.01em",
        }}
        onClick={() => handleClick("#hero")}
      >
        Krishna.dev
      </div>

      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="nav-links">
        {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => handleClick(item.href)}
            style={{
              background: "none",
              border: "none",
              color: "rgba(210, 190, 255, 0.65)",
              fontSize: "0.875rem",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "color 0.2s ease",
              padding: "0.25rem 0",
              fontWeight: 500,
            }}
            onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.color = "#c084fc"; }}
            onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.color = "rgba(210, 190, 255, 0.65)"; }}
          >
            {item.label}
          </button>
        ))}
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); handleClick("#contact"); }}
          style={{
            padding: "0.5rem 1.4rem",
            borderRadius: "2rem",
            border: "1px solid rgba(167, 100, 255, 0.35)",
            color: "#c084fc",
            fontSize: "0.85rem",
            textDecoration: "none",
            transition: "all 0.3s ease",
            background: "rgba(167, 100, 255, 0.06)",
            fontWeight: 600,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(167, 100, 255, 0.16)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 25px rgba(167, 100, 255, 0.3)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(167, 100, 255, 0.06)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
          }}
        >
          Hire Me
        </a>
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ display: "none", background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: "5px", padding: "4px" }}
        className="mobile-btn"
        aria-label="Toggle menu"
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: "22px",
              height: "2px",
              background: "#c084fc",
              borderRadius: "1px",
              transition: "all 0.3s ease",
              opacity: menuOpen && i === 1 ? 0 : 1,
              transform: menuOpen && i === 0 ? "rotate(45deg) translate(5px, 5px)" : menuOpen && i === 2 ? "rotate(-45deg) translate(5px, -5px)" : "none",
            }}
          />
        ))}
      </button>

      {menuOpen && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0,
          background: "rgba(3, 1, 12, 0.97)", backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(167, 100, 255, 0.12)",
          padding: "1rem 2rem", display: "flex", flexDirection: "column", gap: "1rem",
        }}>
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              style={{
                background: "none", border: "none", color: "rgba(210, 190, 255, 0.8)",
                fontSize: "1rem", cursor: "pointer", fontFamily: "inherit", textAlign: "left", padding: "0.5rem 0",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .mobile-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
