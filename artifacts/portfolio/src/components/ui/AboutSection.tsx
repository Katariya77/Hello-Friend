import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "5+", label: "Years Building" },
  { value: "8+", label: "Ventures Launched" },
  { value: "50k+", label: "Customers Served" },
  { value: "∞", label: "Ideas in Pipeline" },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" style={{ minHeight: "100vh", padding: "8rem 1.5rem", position: "relative", display: "flex", alignItems: "center" }}>
      <div
        ref={ref}
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          width: "100%",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <span style={{ color: "#a78bfa", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600 }}>
          ✦ About Me
        </span>

        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            marginTop: "1rem",
            marginBottom: "3rem",
            background: "linear-gradient(135deg, #ffffff, #c084fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Hi, I'm Krishna Katariya
        </h2>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}
          className="about-grid"
        >
          <div>
            <p style={{ color: "rgba(210,185,255,0.75)", lineHeight: 1.9, fontSize: "1.05rem", marginBottom: "1.5rem" }}>
              I'm an entrepreneur and venture builder passionate about turning ambitious ideas
              into real businesses. Over the past 5+ years I've launched multiple SaaS products,
              built brands from scratch, and scaled them with creative marketing and relentless
              execution.
            </p>
            <p style={{ color: "rgba(210,185,255,0.75)", lineHeight: 1.9, fontSize: "1.05rem", marginBottom: "2.5rem" }}>
              My edge is the rare combination of marketing intuition, strong brand sensibility,
              and enough technical knowledge to build fast. I believe the best businesses are
              built by people who obsess over every detail — from the strategy to the pixel.
            </p>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {["Entrepreneur", "SaaS Builder", "Brand Strategist", "Growth Marketer", "Product Thinker"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "0.35rem 1rem",
                    borderRadius: "2rem",
                    background: "rgba(167,100,255,0.09)",
                    border: "1px solid rgba(167,100,255,0.22)",
                    color: "#c084fc",
                    fontSize: "0.82rem",
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} visible={visible} delay={i * 0.12} />
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

function StatCard({ stat, visible, delay }: { stat: { value: string; label: string }; visible: boolean; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "1.75rem",
        borderRadius: "1rem",
        background: "rgba(12,5,28,0.65)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${hovered ? "rgba(167,100,255,0.4)" : "rgba(167,100,255,0.15)"}`,
        boxShadow: hovered ? "0 10px 40px rgba(0,0,0,0.5), 0 0 30px rgba(167,100,255,0.1)" : "0 6px 24px rgba(0,0,0,0.4)",
        textAlign: "center",
        transform: hovered ? "translateY(-6px)" : visible ? "translateY(0)" : "translateY(20px)",
        opacity: visible ? 1 : 0,
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}s`,
      }}
    >
      <div style={{ fontSize: "2.6rem", fontWeight: 800, background: "linear-gradient(135deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "0.5rem" }}>
        {stat.value}
      </div>
      <div style={{ color: "rgba(200,175,255,0.55)", fontSize: "0.82rem", fontWeight: 500 }}>
        {stat.label}
      </div>
    </div>
  );
}
