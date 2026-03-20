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
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
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
        transition: "all 0.3s ease",
        background: scrolled
          ? "rgba(5, 3, 15, 0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(167, 100, 255, 0.15)"
          : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          cursor: "pointer",
        }}
        onClick={() => handleClick("#hero")}
      >
        Alex.dev
      </div>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          alignItems: "center",
        }}
        className="hidden-mobile"
      >
        {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => handleClick(item.href)}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "0.9rem",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "color 0.2s ease",
              padding: "0.25rem 0",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.color = "#a78bfa";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.color =
                "rgba(255, 255, 255, 0.7)";
            }}
          >
            {item.label}
          </button>
        ))}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            handleClick("#contact");
          }}
          style={{
            padding: "0.5rem 1.25rem",
            borderRadius: "2rem",
            border: "1px solid rgba(167, 100, 255, 0.4)",
            color: "#a78bfa",
            fontSize: "0.875rem",
            textDecoration: "none",
            transition: "all 0.3s ease",
            background: "rgba(167, 100, 255, 0.05)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "rgba(167, 100, 255, 0.15)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow =
              "0 0 20px rgba(167, 100, 255, 0.3)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "rgba(167, 100, 255, 0.05)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
          }}
        >
          Hire Me
        </a>
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: "none",
          background: "none",
          border: "none",
          cursor: "pointer",
          flexDirection: "column",
          gap: "5px",
          padding: "4px",
        }}
        className="mobile-menu-btn"
        aria-label="Toggle menu"
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: "22px",
              height: "2px",
              background: "#a78bfa",
              borderRadius: "1px",
              transition: "all 0.3s ease",
              transform:
                menuOpen && i === 0
                  ? "rotate(45deg) translate(5px, 5px)"
                  : menuOpen && i === 2
                  ? "rotate(-45deg) translate(5px, -5px)"
                  : menuOpen && i === 1
                  ? "opacity(0)"
                  : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }}
          />
        ))}
      </button>

      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "rgba(5, 3, 15, 0.97)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(167, 100, 255, 0.15)",
            padding: "1rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "1rem",
                cursor: "pointer",
                fontFamily: "inherit",
                textAlign: "left",
                padding: "0.5rem 0",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
