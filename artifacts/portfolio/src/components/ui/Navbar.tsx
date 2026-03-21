import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
];

const homeAnchors = [
  { label: "Contact", anchor: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/" || location === "";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? "0.75rem 2rem" : "1.25rem 2rem",
      transition: "all 0.4s ease",
      background: scrolled ? "rgba(3,1,12,0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(24px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(167,100,255,0.12)" : "none",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <Link href="/" style={{ fontSize: "1.15rem", fontWeight: 800, background: "linear-gradient(135deg, #c084fc, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", textDecoration: "none", letterSpacing: "-0.01em" }}>
        Krishna.dev
      </Link>

      <div style={{ display: "flex", gap: "0.15rem", alignItems: "center" }} className="nav-links">
        {navLinks.map((item) => (
          <Link key={item.href} href={item.href}
            style={{ padding: "0.4rem 0.85rem", color: location === item.href ? "#c084fc" : "rgba(210,190,255,0.65)", fontSize: "0.875rem", textDecoration: "none", fontWeight: location === item.href ? 600 : 400, borderRadius: "0.5rem", transition: "all 0.2s ease", background: location === item.href ? "rgba(167,100,255,0.08)" : "transparent" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#c084fc"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = location === item.href ? "#c084fc" : "rgba(210,190,255,0.65)"; }}
          >
            {item.label}
          </Link>
        ))}

        {isHome && homeAnchors.map((item) => (
          <button key={item.anchor} onClick={() => scrollTo(item.anchor)}
            style={{ padding: "0.4rem 0.85rem", background: "none", border: "none", color: "rgba(210,190,255,0.65)", fontSize: "0.875rem", cursor: "pointer", fontFamily: "inherit", fontWeight: 400, borderRadius: "0.5rem", transition: "all 0.2s ease" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#c084fc"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(210,190,255,0.65)"; }}
          >
            {item.label}
          </button>
        ))}

        {isHome ? (
          <button onClick={() => scrollTo("contact")}
            style={{ marginLeft: "0.5rem", padding: "0.5rem 1.3rem", borderRadius: "2rem", border: "1px solid rgba(167,100,255,0.35)", color: "#c084fc", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", background: "rgba(167,100,255,0.06)", transition: "all 0.3s ease" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(167,100,255,0.16)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 25px rgba(167,100,255,0.3)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(167,100,255,0.06)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
          >
            Hire Me
          </button>
        ) : (
          <Link href="/" style={{ marginLeft: "0.5rem", padding: "0.5rem 1.3rem", borderRadius: "2rem", border: "1px solid rgba(167,100,255,0.35)", color: "#c084fc", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none", background: "rgba(167,100,255,0.06)", display: "inline-block", transition: "all 0.3s ease" }}>
            Hire Me
          </Link>
        )}
      </div>

      {/* Mobile hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-btn"
        style={{ display: "none", background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: "5px", padding: "4px" }} aria-label="Toggle menu">
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: "22px", height: "2px", background: "#c084fc", borderRadius: "1px", transition: "all 0.3s ease", opacity: menuOpen && i === 1 ? 0 : 1, transform: menuOpen && i === 0 ? "rotate(45deg) translate(5px,5px)" : menuOpen && i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
        ))}
      </button>

      {menuOpen && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "rgba(3,1,12,0.97)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(167,100,255,0.12)", padding: "1rem 2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} style={{ color: "rgba(210,190,255,0.85)", fontSize: "1rem", textDecoration: "none", padding: "0.5rem 0" }} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          {isHome && homeAnchors.map((item) => (
            <button key={item.anchor} onClick={() => scrollTo(item.anchor)} style={{ background: "none", border: "none", color: "rgba(210,190,255,0.8)", fontSize: "1rem", cursor: "pointer", fontFamily: "inherit", textAlign: "left", padding: "0.5rem 0" }}>
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
