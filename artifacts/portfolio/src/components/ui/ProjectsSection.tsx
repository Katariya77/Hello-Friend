import { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "Cosmic Dashboard",
    description: "Real-time analytics platform with 3D data visualization and WebSocket integration. Built for scale with 100k+ concurrent users.",
    tags: ["React", "Three.js", "WebSocket", "PostgreSQL"],
    accent: "#7c3aed",
    glow: "rgba(124, 58, 237, 0.35)",
    icon: "◈",
    year: "2024",
  },
  {
    title: "NebulaAI",
    description: "AI-powered creative tool using generative models to transform text prompts into stunning visual artwork with real-time preview.",
    tags: ["Next.js", "Python", "OpenAI", "TailwindCSS"],
    accent: "#2563eb",
    glow: "rgba(37, 99, 235, 0.35)",
    icon: "◇",
    year: "2024",
  },
  {
    title: "Orbit Commerce",
    description: "Next-gen e-commerce with AR product preview, 3D models, and blazing-fast checkout optimized for maximum conversion.",
    tags: ["Next.js", "Stripe", "Three.js", "Prisma"],
    accent: "#9333ea",
    glow: "rgba(147, 51, 234, 0.35)",
    icon: "○",
    year: "2023",
  },
  {
    title: "StarMap Protocol",
    description: "Blockchain explorer with interactive galaxy-style node visualization. Navigate complex DeFi ecosystems in an intuitive 3D interface.",
    tags: ["Web3.js", "React", "D3.js", "Node.js"],
    accent: "#0891b2",
    glow: "rgba(8, 145, 178, 0.35)",
    icon: "◉",
    year: "2023",
  },
  {
    title: "VoidSync",
    description: "Cross-platform real-time collaboration tool with live cursors, infinite canvas, and end-to-end encrypted messaging.",
    tags: ["TypeScript", "CRDT", "WebRTC", "Redis"],
    accent: "#e11d48",
    glow: "rgba(225, 29, 72, 0.35)",
    icon: "◆",
    year: "2023",
  },
  {
    title: "Pulsar CMS",
    description: "Headless CMS with visual page builder, AI content generation, and multi-channel publishing deployed edge-first globally.",
    tags: ["Astro", "Sanity", "Cloudflare", "AI"],
    accent: "#059669",
    glow: "rgba(5, 150, 105, 0.35)",
    icon: "◎",
    year: "2022",
  },
];

export default function ProjectsSection() {
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
    <section id="projects" style={{ padding: "8rem 1.5rem", position: "relative" }}>
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
            ✦ Featured Work
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
            Projects &amp; Experiments
          </h2>
          <p style={{ color: "rgba(200, 180, 255, 0.55)", maxWidth: "500px", margin: "0 auto" }}>
            A curated selection of work pushing the boundaries of what's possible on the web.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} visible={visible} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, visible, delay }: {
  project: typeof projects[0];
  visible: boolean;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setClicked(false); }}
      onMouseDown={() => setClicked(true)}
      onMouseUp={() => setClicked(false)}
      style={{
        borderRadius: "1.25rem",
        background: "rgba(8, 4, 22, 0.75)",
        backdropFilter: "blur(24px)",
        border: `1px solid ${hovered ? `${project.accent}50` : "rgba(167, 100, 255, 0.12)"}`,
        boxShadow: hovered
          ? `0 25px 60px rgba(0, 0, 0, 0.7), 0 0 50px ${project.glow}`
          : "0 6px 30px rgba(0, 0, 0, 0.5)",
        transform: clicked
          ? "translateY(-4px) scale(1.01)"
          : hovered
          ? "translateY(-12px) scale(1.02)"
          : visible
          ? "translateY(0) scale(1)"
          : "translateY(30px) scale(0.97)",
        opacity: visible ? 1 : 0,
        transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: visible ? `${delay}s` : "0s",
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {/* Top gradient bar */}
      <div
        style={{
          height: "3px",
          background: `linear-gradient(90deg, ${project.accent}, transparent)`,
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Card header */}
      <div
        style={{
          padding: "2rem 2rem 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "14px",
            background: `${project.accent}18`,
            border: `1px solid ${project.accent}35`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.6rem",
            color: project.accent,
            boxShadow: hovered ? `0 0 25px ${project.accent}50` : "none",
            transition: "box-shadow 0.3s ease",
          }}
        >
          {project.icon}
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.4rem" }}>
          <span
            style={{
              fontSize: "0.72rem",
              color: "rgba(167, 100, 255, 0.5)",
              fontFamily: "monospace",
              letterSpacing: "0.1em",
            }}
          >
            {project.year}
          </span>
          <div
            style={{
              display: "flex",
              gap: "0.4rem",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateX(0)" : "translateX(8px)",
              transition: "all 0.3s ease",
            }}
          >
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.8rem",
                textDecoration: "none",
              }}
            >
              ⌥
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.8rem",
                textDecoration: "none",
              }}
            >
              ↗
            </a>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "1.5rem 2rem 2rem" }}>
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "white",
            marginBottom: "0.75rem",
            transition: "color 0.3s ease",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            color: "rgba(200, 180, 255, 0.6)",
            fontSize: "0.88rem",
            lineHeight: 1.8,
            marginBottom: "1.5rem",
          }}
        >
          {project.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "0.28rem 0.8rem",
                borderRadius: "2rem",
                background: `${project.accent}12`,
                border: `1px solid ${project.accent}30`,
                color: `${project.accent}`,
                fontSize: "0.73rem",
                fontWeight: 600,
                filter: "brightness(1.3)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Animated corner glow on hover */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "120px",
          height: "120px",
          background: `radial-gradient(circle at bottom right, ${project.glow}, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
