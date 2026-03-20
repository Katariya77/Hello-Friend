import { useEffect, useRef, useState } from "react";

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: "5+", label: "Years Experience" },
    { value: "40+", label: "Projects Built" },
    { value: "20+", label: "Happy Clients" },
    { value: "∞", label: "Lines of Code" },
  ];

  return (
    <section
      id="about"
      style={{
        minHeight: "100vh",
        padding: "8rem 1.5rem",
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        ref={ref}
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          width: "100%",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <span
            style={{
              color: "#a78bfa",
              fontSize: "0.8rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            ✦ About Me
          </span>
        </div>

        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            marginBottom: "3rem",
            background: "linear-gradient(135deg, #ffffff, #c084fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Building the future,
          <br />
          one pixel at a time
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
          className="about-grid"
        >
          <div>
            <p
              style={{
                color: "rgba(200, 180, 255, 0.75)",
                lineHeight: 1.9,
                fontSize: "1.05rem",
                marginBottom: "1.5rem",
              }}
            >
              I'm a full-stack developer passionate about creating seamless digital
              experiences that merge technical precision with artistic vision. With over
              5 years in the industry, I specialize in building high-performance web
              applications using cutting-edge technologies.
            </p>
            <p
              style={{
                color: "rgba(200, 180, 255, 0.75)",
                lineHeight: 1.9,
                fontSize: "1.05rem",
                marginBottom: "2.5rem",
              }}
            >
              My work spans from interactive 3D web experiences to scalable cloud
              architectures. I believe every line of code should serve a purpose,
              and every interface should feel like magic.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {["Next.js", "TypeScript", "Three.js", "Node.js"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "0.35rem 1rem",
                    borderRadius: "2rem",
                    background: "rgba(167, 100, 255, 0.1)",
                    border: "1px solid rgba(167, 100, 255, 0.25)",
                    color: "#c084fc",
                    fontSize: "0.85rem",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.25rem",
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: "1.75rem",
                  borderRadius: "1rem",
                  background: "rgba(15, 5, 30, 0.6)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(167, 100, 255, 0.2)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(167, 100, 255, 0.4)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 30px rgba(167, 100, 255, 0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(167, 100, 255, 0.2)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 8px 32px rgba(0, 0, 0, 0.5)";
                }}
              >
                <div
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginBottom: "0.5rem",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    color: "rgba(200, 180, 255, 0.6)",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
}
