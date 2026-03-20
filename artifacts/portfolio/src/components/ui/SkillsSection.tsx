import { useEffect, useRef, useState } from "react";

const skillCards = [
  { name: "React", icon: "⚛", color: "#61DAFB", category: "Frontend", desc: "Component-driven UI" },
  { name: "Next.js", icon: "▲", color: "#ffffff", category: "Frontend", desc: "Full-stack framework" },
  { name: "TypeScript", icon: "TS", color: "#3178C6", category: "Language", desc: "Type-safe JavaScript" },
  { name: "Three.js", icon: "◈", color: "#a78bfa", category: "3D/WebGL", desc: "3D web rendering" },
  { name: "Tailwind", icon: "◇", color: "#38BDF8", category: "Styling", desc: "Utility-first CSS" },
  { name: "Framer", icon: "◉", color: "#ec4899", category: "Animation", desc: "Motion library" },
  { name: "Node.js", icon: "⬡", color: "#6DA55F", category: "Backend", desc: "Server runtime" },
  { name: "PostgreSQL", icon: "⛁", color: "#316192", category: "Database", desc: "Relational database" },
  { name: "GraphQL", icon: "◆", color: "#E10098", category: "API", desc: "Query language" },
  { name: "Redis", icon: "♦", color: "#DD0031", category: "Cache", desc: "In-memory store" },
  { name: "Docker", icon: "⬡", color: "#2496ED", category: "DevOps", desc: "Containerization" },
  { name: "AWS", icon: "☁", color: "#FF9900", category: "Cloud", desc: "Cloud infrastructure" },
  { name: "Vercel", icon: "△", color: "#ffffff", category: "Deploy", desc: "Edge deployment" },
  { name: "Python", icon: "⊕", color: "#3776AB", category: "Language", desc: "Data & scripting" },
  { name: "WebGL", icon: "◎", color: "#9333ea", category: "3D/WebGL", desc: "Low-level graphics" },
  { name: "Figma", icon: "◆", color: "#F24E1E", category: "Design", desc: "UI/UX design tool" },
];

export default function SkillsSection() {
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
    <section
      id="skills"
      style={{ padding: "8rem 1.5rem", position: "relative" }}
    >
      <div
        ref={ref}
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={{ color: "#a78bfa", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: "1rem" }}>
            ✦ Expertise
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              background: "linear-gradient(135deg, #ffffff, #c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "1rem",
            }}
          >
            Skills &amp; Technologies
          </h2>
          <p style={{ color: "rgba(200, 180, 255, 0.55)", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
            A curated set of tools and technologies I use to bring ideas to life.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
            gap: "1rem",
          }}
        >
          {skillCards.map((skill, i) => (
            <SkillCard key={i} skill={skill} visible={visible} delay={i * 0.04} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill, visible, delay }: {
  skill: typeof skillCards[0];
  visible: boolean;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "1.5rem 1.25rem",
        borderRadius: "1rem",
        background: hovered
          ? `linear-gradient(135deg, rgba(10, 5, 30, 0.95), rgba(20, 5, 50, 0.9))`
          : "rgba(10, 5, 25, 0.65)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${hovered ? `${skill.color}50` : "rgba(167, 100, 255, 0.15)"}`,
        boxShadow: hovered
          ? `0 15px 40px rgba(0, 0, 0, 0.6), 0 0 30px ${skill.color}25`
          : "0 4px 20px rgba(0, 0, 0, 0.4)",
        transform: hovered
          ? "translateY(-8px) scale(1.03)"
          : visible
          ? "translateY(0) scale(1)"
          : "translateY(20px) scale(0.97)",
        opacity: visible ? 1 : 0,
        transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: visible ? `${delay}s` : "0s",
        cursor: "default",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      <div
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "14px",
          background: `${skill.color}15`,
          border: `1px solid ${skill.color}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.4rem",
          color: skill.color,
          fontWeight: 700,
          boxShadow: hovered ? `0 0 20px ${skill.color}40` : "none",
          transition: "box-shadow 0.3s ease",
        }}
      >
        {skill.icon}
      </div>

      <div>
        <div
          style={{
            fontSize: "0.95rem",
            fontWeight: 700,
            color: hovered ? "white" : "rgba(220, 200, 255, 0.9)",
            marginBottom: "0.25rem",
            transition: "color 0.3s ease",
          }}
        >
          {skill.name}
        </div>
        <div style={{ fontSize: "0.72rem", color: "rgba(167, 100, 255, 0.7)", fontWeight: 500 }}>
          {skill.category}
        </div>
      </div>

      <p
        style={{
          fontSize: "0.76rem",
          color: "rgba(200, 180, 255, 0.5)",
          lineHeight: 1.5,
          margin: 0,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(4px)",
          transition: "all 0.3s ease",
        }}
      >
        {skill.desc}
      </p>
    </div>
  );
}
