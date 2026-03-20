import { useEffect, useRef, useState } from "react";

const skillCategories = [
  {
    title: "Frontend",
    icon: "◈",
    color: "#a78bfa",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "Three.js / WebGL", level: 85 },
      { name: "TailwindCSS", level: 93 },
      { name: "Framer Motion", level: 88 },
    ],
  },
  {
    title: "Backend",
    icon: "◇",
    color: "#60a5fa",
    skills: [
      { name: "Node.js / Express", level: 90 },
      { name: "PostgreSQL", level: 87 },
      { name: "GraphQL", level: 82 },
      { name: "Redis", level: 78 },
      { name: "REST APIs", level: 94 },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: "◉",
    color: "#34d399",
    skills: [
      { name: "Docker / K8s", level: 80 },
      { name: "CI/CD Pipeline", level: 85 },
      { name: "AWS / Vercel", level: 88 },
      { name: "Git / GitHub", level: 96 },
      { name: "Linux / Bash", level: 82 },
    ],
  },
];

const techIcons = [
  { label: "React", symbol: "⚛", color: "#61DAFB" },
  { label: "TypeScript", symbol: "TS", color: "#3178C6" },
  { label: "Next.js", symbol: "N", color: "#ffffff" },
  { label: "Three.js", symbol: "3D", color: "#a78bfa" },
  { label: "Node.js", symbol: "⬡", color: "#6DA55F" },
  { label: "PostgreSQL", symbol: "⛁", color: "#316192" },
  { label: "Docker", symbol: "⬡", color: "#2496ED" },
  { label: "AWS", symbol: "☁", color: "#FF9900" },
  { label: "Redis", symbol: "♦", color: "#DD0031" },
  { label: "GraphQL", symbol: "◈", color: "#E10098" },
  { label: "Python", symbol: "⊕", color: "#3776AB" },
  { label: "Figma", symbol: "◆", color: "#F24E1E" },
];

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      style={{
        padding: "8rem 1.5rem",
        position: "relative",
      }}
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
          <span
            style={{
              color: "#a78bfa",
              fontSize: "0.8rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 600,
              display: "block",
              marginBottom: "1rem",
            }}
          >
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
            }}
          >
            Skills &amp; Technologies
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
            marginBottom: "4rem",
          }}
        >
          {skillCategories.map((cat, i) => (
            <SkillCard key={i} category={cat} visible={visible} delay={i * 0.15} />
          ))}
        </div>

        <div
          style={{
            padding: "2.5rem",
            borderRadius: "1.25rem",
            background: "rgba(10, 5, 25, 0.6)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(167, 100, 255, 0.15)",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              color: "rgba(200, 180, 255, 0.7)",
              fontSize: "0.85rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "2rem",
            }}
          >
            Tech Stack
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
              gap: "1rem",
            }}
          >
            {techIcons.map((tech, i) => (
              <TechIcon key={i} tech={tech} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillCard({
  category,
  visible,
  delay,
}: {
  category: typeof skillCategories[0];
  visible: boolean;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "2rem",
        borderRadius: "1.25rem",
        background: "rgba(10, 5, 25, 0.6)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${hovered ? `${category.color}50` : "rgba(167, 100, 255, 0.15)"}`,
        boxShadow: hovered
          ? `0 20px 60px rgba(0, 0, 0, 0.5), 0 0 30px ${category.color}20`
          : "0 8px 32px rgba(0, 0, 0, 0.4)",
        transition: "all 0.4s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${delay}s`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem" }}>
        <span style={{ fontSize: "1.5rem", color: category.color }}>{category.icon}</span>
        <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "white" }}>{category.title}</h3>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
        {category.skills.map((skill, i) => (
          <div key={i}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.4rem",
              }}
            >
              <span style={{ color: "rgba(200, 180, 255, 0.8)", fontSize: "0.9rem" }}>
                {skill.name}
              </span>
              <span style={{ color: category.color, fontSize: "0.85rem", fontWeight: 600 }}>
                {skill.level}%
              </span>
            </div>
            <div
              style={{
                height: "4px",
                borderRadius: "2px",
                background: "rgba(167, 100, 255, 0.1)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: visible ? `${skill.level}%` : "0%",
                  borderRadius: "2px",
                  background: `linear-gradient(90deg, ${category.color}, ${category.color}88)`,
                  transition: `width 1.2s cubic-bezier(0.16, 1, 0.3, 1)`,
                  transitionDelay: `${delay + i * 0.08}s`,
                  boxShadow: `0 0 8px ${category.color}60`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TechIcon({ tech }: { tech: typeof techIcons[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        padding: "1rem 0.5rem",
        borderRadius: "0.75rem",
        background: hovered ? "rgba(167, 100, 255, 0.08)" : "transparent",
        border: `1px solid ${hovered ? "rgba(167, 100, 255, 0.3)" : "transparent"}`,
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 0 20px ${tech.color}30` : "none",
        transition: "all 0.3s ease",
        cursor: "default",
      }}
    >
      <span style={{ fontSize: "1.5rem", color: tech.color, fontWeight: 700 }}>{tech.symbol}</span>
      <span style={{ color: "rgba(200, 180, 255, 0.6)", fontSize: "0.7rem", textAlign: "center" }}>
        {tech.label}
      </span>
    </div>
  );
}
