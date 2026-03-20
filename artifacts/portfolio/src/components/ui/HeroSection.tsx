import { useEffect, useRef } from "react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    const t = setTimeout(() => {
      el.style.transition = "all 1.4s cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 300);
    return () => clearTimeout(t);
  }, []);

  const handleScrollDown = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "2rem 1.5rem",
        textAlign: "center",
      }}
    >
      <div ref={containerRef} style={{ maxWidth: "850px", width: "100%" }}>
        <div
          style={{
            display: "inline-block",
            padding: "0.4rem 1.2rem",
            borderRadius: "2rem",
            border: "1px solid rgba(167, 100, 255, 0.35)",
            background: "rgba(167, 100, 255, 0.08)",
            color: "#c084fc",
            fontSize: "0.78rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: "2rem",
          }}
        >
          ✦ Full-Stack Developer &amp; Creative Engineer
        </div>

        <h1
          style={{
            fontSize: "clamp(3.2rem, 9vw, 7rem)",
            fontWeight: 800,
            lineHeight: 1.0,
            marginBottom: "0.5rem",
            background: "linear-gradient(135deg, #ffffff 0%, #c084fc 45%, #818cf8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.03em",
          }}
        >
          Krishna
        </h1>
        <h1
          style={{
            fontSize: "clamp(3.2rem, 9vw, 7rem)",
            fontWeight: 800,
            lineHeight: 1.0,
            marginBottom: "2rem",
            background: "linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #60a5fa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.03em",
          }}
        >
          Katariya
        </h1>

        <p
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
            color: "rgba(210, 190, 255, 0.7)",
            maxWidth: "580px",
            margin: "0 auto 0.75rem",
            lineHeight: 1.75,
          }}
        >
          Crafting immersive digital experiences at the intersection of
        </p>
        <p style={{ marginBottom: "3rem" }}>
          <span
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
              fontWeight: 700,
              background: "linear-gradient(90deg, #a78bfa, #60a5fa, #c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            code, creativity &amp; cosmos
          </span>
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              padding: "0.9rem 2.5rem",
              borderRadius: "2rem",
              background: "linear-gradient(135deg, #7c3aed, #2563eb)",
              border: "none",
              color: "white",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: "0 0 35px rgba(124, 58, 237, 0.5)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 60px rgba(124, 58, 237, 0.8)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-3px) scale(1.02)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 35px rgba(124, 58, 237, 0.5)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0) scale(1)";
            }}
          >
            Explore Work →
          </button>
          <button
            onClick={handleScrollDown}
            style={{
              padding: "0.9rem 2.5rem",
              borderRadius: "2rem",
              background: "rgba(167, 100, 255, 0.06)",
              border: "1px solid rgba(167, 100, 255, 0.3)",
              color: "rgba(200, 170, 255, 0.9)",
              fontSize: "1rem",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(167, 100, 255, 0.6)";
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(167, 100, 255, 0.12)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 25px rgba(167, 100, 255, 0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(167, 100, 255, 0.3)";
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(167, 100, 255, 0.06)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            About Me
          </button>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          cursor: "pointer",
          opacity: 0.45,
          animation: "heroScrollBounce 2.5s ease-in-out infinite",
        }}
        onClick={handleScrollDown}
      >
        <span style={{ color: "#c084fc", fontSize: "0.7rem", letterSpacing: "0.12em" }}>SCROLL</span>
        <div style={{ width: "1px", height: "45px", background: "linear-gradient(to bottom, #a78bfa, transparent)" }} />
      </div>

      <style>{`
        @keyframes heroScrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }
      `}</style>
    </section>
  );
}
