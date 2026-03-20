import { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "Cosmic Dashboard",
    description:
      "Real-time analytics platform with 3D data visualization and WebSocket integration. Built for scale with 100k+ concurrent users.",
    tags: ["React", "Three.js", "WebSocket", "PostgreSQL"],
    gradient: "from-violet-600 to-indigo-600",
    glow: "rgba(124, 58, 237, 0.3)",
    icon: "◈",
    link: "#",
    github: "#",
  },
  {
    title: "NebulaAI",
    description:
      "AI-powered creative tool using generative models to transform text prompts into stunning visual artwork with real-time preview.",
    tags: ["Next.js", "Python", "OpenAI", "TailwindCSS"],
    gradient: "from-blue-600 to-cyan-500",
    glow: "rgba(37, 99, 235, 0.3)",
    icon: "◇",
    link: "#",
    github: "#",
  },
  {
    title: "Orbit Commerce",
    description:
      "Next-gen e-commerce platform with AR product preview, immersive 3D models, and blazing-fast checkout optimized for conversion.",
    tags: ["Next.js", "Stripe", "Three.js", "Prisma"],
    gradient: "from-purple-600 to-pink-600",
    glow: "rgba(147, 51, 234, 0.3)",
    icon: "○",
    link: "#",
    github: "#",
  },
  {
    title: "StarMap Protocol",
    description:
      "Blockchain explorer with interactive galaxy-style node visualization. Navigate complex DeFi ecosystems through an intuitive 3D interface.",
    tags: ["Web3.js", "React", "D3.js", "Node.js"],
    gradient: "from-cyan-500 to-teal-500",
    glow: "rgba(6, 182, 212, 0.3)",
    icon: "◉",
    link: "#",
    github: "#",
  },
  {
    title: "VoidSync",
    description:
      "Cross-platform real-time collaboration tool with live cursors, infinite canvas, and end-to-end encrypted messaging for creative teams.",
    tags: ["TypeScript", "CRDT", "WebRTC", "Redis"],
    gradient: "from-rose-500 to-orange-500",
    glow: "rgba(244, 63, 94, 0.3)",
    icon: "◆",
    link: "#",
    github: "#",
  },
  {
    title: "Pulsar CMS",
    description:
      "Headless CMS with visual page builder, AI content generation, and multi-channel publishing — deployed edge-first on global CDN.",
    tags: ["Astro", "Sanity", "Cloudflare", "AI"],
    gradient: "from-emerald-500 to-green-500",
    glow: "rgba(16, 185, 129, 0.3)",
    icon: "◎",
    link: "#",
    github: "#",
  },
];

export default function ProjectsSection() {
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
      id="projects"
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
          <p style={{ color: "rgba(200, 180, 255, 0.6)", maxWidth: "500px", margin: "0 auto" }}>
            A curated collection of work that pushes the boundaries of what's possible on the web.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, delay }: { project: typeof projects[0]; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "1.25rem",
        background: "rgba(10, 5, 25, 0.7)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${hovered ? "rgba(167, 100, 255, 0.4)" : "rgba(167, 100, 255, 0.15)"}`,
        boxShadow: hovered
          ? `0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px ${project.glow}`
          : "0 8px 32px rgba(0, 0, 0, 0.5)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${delay}s`,
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <div
        style={{
          height: "200px",
          background: `linear-gradient(135deg, ${project.glow}, rgba(5, 3, 15, 0.9))`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontSize: "4rem",
            opacity: 0.3,
            filter: "blur(0px)",
            transform: hovered ? "scale(1.2)" : "scale(1)",
            transition: "transform 0.5s ease",
            color: "white",
          }}
        >
          {project.icon}
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at center, ${project.glow} 0%, transparent 70%)`,
            opacity: hovered ? 1 : 0.5,
            transition: "opacity 0.4s ease",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <a
            href={project.github}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "0.75rem",
              textDecoration: "none",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
            onClick={(e) => e.preventDefault()}
          >
            ⌥
          </a>
          <a
            href={project.link}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "0.75rem",
              textDecoration: "none",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s ease",
              transitionDelay: "0.05s",
            }}
            onClick={(e) => e.preventDefault()}
          >
            ↗
          </a>
        </div>
      </div>

      <div style={{ padding: "1.75rem" }}>
        <h3
          style={{
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "white",
            marginBottom: "0.75rem",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            color: "rgba(200, 180, 255, 0.65)",
            fontSize: "0.9rem",
            lineHeight: 1.8,
            marginBottom: "1.25rem",
          }}
        >
          {project.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "0.25rem 0.75rem",
                borderRadius: "2rem",
                background: "rgba(167, 100, 255, 0.08)",
                border: "1px solid rgba(167, 100, 255, 0.2)",
                color: "rgba(192, 132, 252, 0.85)",
                fontSize: "0.75rem",
                fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
