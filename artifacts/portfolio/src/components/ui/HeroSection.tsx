import { useEffect, useRef } from "react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    const t = setTimeout(() => {
      el.style.transition = "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 300);
    return () => clearTimeout(t);
  }, []);

  const handleScrollDown = () => {
    const about = document.querySelector("#about");
    if (about) about.scrollIntoView({ behavior: "smooth" });
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
      <div ref={containerRef} style={{ maxWidth: "800px", width: "100%" }}>
        <div
          style={{
            display: "inline-block",
            padding: "0.35rem 1rem",
            borderRadius: "2rem",
            border: "1px solid rgba(167, 100, 255, 0.3)",
            background: "rgba(167, 100, 255, 0.08)",
            color: "#c084fc",
            fontSize: "0.8rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "2rem",
          }}
        >
          ✦ Full-Stack Developer &amp; 3D Enthusiast
        </div>

        <h1
          style={{
            fontSize: "clamp(3rem, 8vw, 6.5rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: "1.5rem",
            background: "linear-gradient(135deg, #ffffff 0%, #a78bfa 50%, #60a5fa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "none",
            letterSpacing: "-0.02em",
          }}
        >
          Alex Chen
        </h1>

        <p
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
            color: "rgba(200, 180, 255, 0.7)",
            maxWidth: "560px",
            margin: "0 auto 1rem",
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          Crafting immersive digital experiences at the intersection of
        </p>
        <p
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
            lineHeight: 1.7,
            marginBottom: "3rem",
          }}
        >
          <span
            style={{
              background: "linear-gradient(90deg, #a78bfa, #60a5fa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 600,
            }}
          >
            code, creativity &amp; cosmos
          </span>
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => {
              const el = document.querySelector("#projects");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              padding: "0.875rem 2.25rem",
              borderRadius: "2rem",
              background: "linear-gradient(135deg, #7c3aed, #2563eb)",
              border: "none",
              color: "white",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: "0 0 30px rgba(124, 58, 237, 0.4)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 50px rgba(124, 58, 237, 0.7)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 30px rgba(124, 58, 237, 0.4)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            }}
          >
            View My Work
          </button>

          <button
            onClick={handleScrollDown}
            style={{
              padding: "0.875rem 2.25rem",
              borderRadius: "2rem",
              background: "transparent",
              border: "1px solid rgba(167, 100, 255, 0.35)",
              color: "rgba(200, 180, 255, 0.85)",
              fontSize: "1rem",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(167, 100, 255, 0.6)";
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(167, 100, 255, 0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(167, 100, 255, 0.35)";
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            }}
          >
            About Me
          </button>
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
            animation: "bounce 2s infinite",
            cursor: "pointer",
            opacity: 0.5,
          }}
          onClick={handleScrollDown}
        >
          <span style={{ color: "rgba(167, 100, 255, 0.7)", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
            SCROLL
          </span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "linear-gradient(to bottom, rgba(167, 100, 255, 0.6), transparent)",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </section>
  );
}
