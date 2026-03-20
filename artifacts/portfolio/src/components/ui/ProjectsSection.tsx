import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

const featuredProjects = [
  {
    name: "KatariyaOS",
    tagline: "AI Command Center for Entrepreneurs",
    description: "An all-in-one dashboard unifying business operations, marketing analytics, and team management.",
    tags: ["SaaS", "AI", "Dashboard"],
    gradient: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)",
    accent: "#7c3aed",
    status: "Live",
    url: "#",
  },
  {
    name: "BrandForge",
    tagline: "AI Brand Identity Builder",
    description: "Generate complete brand identities in minutes — logos, palettes, typography, and brand guidelines powered by AI.",
    tags: ["SaaS", "Branding", "AI"],
    gradient: "linear-gradient(135deg, #ec4899 0%, #f97316 100%)",
    accent: "#ec4899",
    status: "Live",
    url: "#",
  },
  {
    name: "GrowthEngine",
    tagline: "Marketing Automation for D2C Brands",
    description: "Multi-channel marketing automation. Run paid ads, email sequences, and influencer campaigns from one place.",
    tags: ["SaaS", "Marketing", "Automation"],
    gradient: "linear-gradient(135deg, #10b981 0%, #0891b2 100%)",
    accent: "#10b981",
    status: "Live",
    url: "#",
  },
];

const statusColors: Record<string, string> = {
  Live: "#10b981",
  Beta: "#f59e0b",
  "Coming Soon": "#6366f1",
};

interface Props {
  preview?: boolean;
}

export default function ProjectsSection({ preview }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span style={{ color: "#a78bfa", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: "0.75rem" }}>
              ✦ Featured Work
            </span>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, background: "linear-gradient(135deg, #ffffff, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Projects &amp; Ventures
            </h2>
          </div>
          {preview && (
            <Link
              href="/projects"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.65rem 1.4rem",
                borderRadius: "2rem",
                border: "1px solid rgba(167,100,255,0.35)",
                color: "#c084fc",
                fontSize: "0.88rem",
                fontWeight: 600,
                textDecoration: "none",
                background: "rgba(167,100,255,0.06)",
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(167,100,255,0.14)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 25px rgba(167,100,255,0.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(167,100,255,0.06)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              }}
            >
              View All Projects ↗
            </Link>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {featuredProjects.map((project, i) => (
            <ProjectCard key={i} project={project} visible={visible} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, visible, delay }: { project: typeof featuredProjects[0]; visible: boolean; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "1.25rem",
        background: "rgba(8, 4, 22, 0.75)",
        backdropFilter: "blur(24px)",
        border: `1px solid ${hovered ? `${project.accent}50` : "rgba(167,100,255,0.12)"}`,
        boxShadow: hovered ? `0 25px 60px rgba(0,0,0,0.7), 0 0 50px ${project.accent}25` : "0 6px 30px rgba(0,0,0,0.5)",
        transform: hovered ? "translateY(-10px)" : visible ? "translateY(0)" : "translateY(30px)",
        opacity: visible ? 1 : 0,
        transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${delay}s`,
        overflow: "hidden",
      }}
    >
      {/* Preview image area */}
      <div style={{ height: "160px", background: project.gradient, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)" }} />
        <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", gap: "5px" }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: c }} />)}
        </div>
        <div style={{ position: "absolute", inset: "38px 14px 14px", background: "rgba(255,255,255,0.06)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: "2rem", opacity: 0.35 }}>◈</span>
        </div>
        <div style={{ position: "absolute", top: "10px", right: "10px", padding: "3px 10px", borderRadius: "1rem", background: `${statusColors[project.status]}20`, border: `1px solid ${statusColors[project.status]}50`, color: statusColors[project.status], fontSize: "0.68rem", fontWeight: 600 }}>
          {project.status}
        </div>
      </div>

      <div style={{ padding: "1.5rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "white", marginBottom: "0.2rem" }}>{project.name}</h3>
        <p style={{ color: project.accent, fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.65rem", filter: "brightness(1.3)" }}>{project.tagline}</p>
        <p style={{ color: "rgba(200,180,255,0.6)", fontSize: "0.83rem", lineHeight: 1.7, marginBottom: "1.1rem" }}>{project.description}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.1rem" }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{ padding: "0.2rem 0.65rem", borderRadius: "2rem", background: `${project.accent}10`, border: `1px solid ${project.accent}25`, color: project.accent, fontSize: "0.7rem", fontWeight: 500, filter: "brightness(1.3)" }}>
              {tag}
            </span>
          ))}
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.4rem",
            padding: "0.6rem 1rem",
            borderRadius: "0.65rem",
            background: hovered ? `${project.accent}18` : "rgba(255,255,255,0.04)",
            border: `1px solid ${hovered ? `${project.accent}45` : "rgba(255,255,255,0.08)"}`,
            color: hovered ? project.accent : "rgba(255,255,255,0.65)",
            fontSize: "0.82rem",
            fontWeight: 600,
            textDecoration: "none",
            transition: "all 0.3s ease",
            fontFamily: "inherit",
          }}
        >
          Visit Project ↗
        </a>
      </div>
    </div>
  );
}
