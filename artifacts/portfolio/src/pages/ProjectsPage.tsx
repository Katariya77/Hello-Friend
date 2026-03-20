import { useState } from "react";
import { Link } from "wouter";
import PageCanvas from "@/components/canvas/PageCanvas";
import MoonBackground from "@/components/canvas/MoonBackground";

const allProjects = [
  {
    name: "KatariyaOS",
    tagline: "AI Command Center for Entrepreneurs",
    description: "An all-in-one dashboard unifying business operations, marketing analytics, and team management — built to give founders a single source of truth.",
    tags: ["SaaS", "AI", "Dashboard"],
    gradient: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)",
    accent: "#7c3aed",
    status: "Live",
    url: "#",
  },
  {
    name: "BrandForge",
    tagline: "AI Brand Identity Builder",
    description: "Generate complete brand identities in minutes — logo concepts, color palettes, typography systems, and brand guidelines powered by generative AI.",
    tags: ["SaaS", "Branding", "AI", "Design"],
    gradient: "linear-gradient(135deg, #ec4899 0%, #f97316 100%)",
    accent: "#ec4899",
    status: "Live",
    url: "#",
  },
  {
    name: "GrowthEngine",
    tagline: "Marketing Automation for D2C Brands",
    description: "Multi-channel marketing automation platform. Run paid ads, email sequences, and influencer campaigns from a single workflow-driven dashboard.",
    tags: ["SaaS", "Marketing", "Automation"],
    gradient: "linear-gradient(135deg, #10b981 0%, #0891b2 100%)",
    accent: "#10b981",
    status: "Live",
    url: "#",
  },
  {
    name: "PitchDeck AI",
    tagline: "Investor Pitch Deck Generator",
    description: "Describe your startup and get a polished, investor-ready pitch deck in under 5 minutes. Trained on hundreds of successful seed-round decks.",
    tags: ["SaaS", "AI", "Fundraising"],
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
    accent: "#f59e0b",
    status: "Beta",
    url: "#",
  },
  {
    name: "FunnelCraft",
    tagline: "High-Converting Sales Funnel Builder",
    description: "Build, test, and optimize sales funnels visually. Integrated with Stripe, built-in A/B testing, and conversion analytics baked in.",
    tags: ["SaaS", "Sales", "No-code"],
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
    accent: "#8b5cf6",
    status: "Live",
    url: "#",
  },
  {
    name: "LaunchPad",
    tagline: "All-in-One Startup Launch Platform",
    description: "From idea to launch in a week. Landing page builder, waitlist management, early-access drip sequences, and product hunt launch tools.",
    tags: ["SaaS", "Launch", "Growth"],
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)",
    accent: "#0ea5e9",
    status: "Live",
    url: "#",
  },
  {
    name: "ContentOS",
    tagline: "AI Content System for Founders",
    description: "Generate a month of social content, blog posts, and email newsletters from your brand voice in one session. Trained on virality patterns.",
    tags: ["SaaS", "Content", "AI", "Social"],
    gradient: "linear-gradient(135deg, #f97316 0%, #fbbf24 100%)",
    accent: "#f97316",
    status: "Coming Soon",
    url: "#",
  },
  {
    name: "InfluencerOS",
    tagline: "Influencer Campaign Manager",
    description: "Discover, negotiate, and track influencer partnerships at scale. Built for D2C brands doing 5+ campaigns per month across multiple platforms.",
    tags: ["SaaS", "Marketing", "Influencer"],
    gradient: "linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)",
    accent: "#a855f7",
    status: "Beta",
    url: "#",
  },
];

const statusColors: Record<string, string> = {
  Live: "#10b981",
  Beta: "#f59e0b",
  "Coming Soon": "#6366f1",
};

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "SaaS", "AI", "Marketing", "Design"];

  const filtered = filter === "All"
    ? allProjects
    : allProjects.filter((p) => p.tags.includes(filter));

  return (
    <div style={{ background: "#01010a", minHeight: "100vh", color: "white", fontFamily: "Inter, sans-serif", overflowX: "hidden" }}>
      <PageCanvas>
        <MoonBackground />
      </PageCanvas>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Back nav */}
        <div style={{ padding: "1.5rem 2rem", display: "flex", alignItems: "center", gap: "1rem", borderBottom: "1px solid rgba(167,100,255,0.1)", backdropFilter: "blur(20px)", background: "rgba(1,1,10,0.6)", position: "sticky", top: 0, zIndex: 10 }}>
          <Link href="/" style={{ color: "#a78bfa", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.4rem", transition: "color 0.2s" }}>
            ← Back to Home
          </Link>
          <span style={{ color: "rgba(167,100,255,0.3)" }}>|</span>
          <span style={{ color: "rgba(200,180,255,0.5)", fontSize: "0.9rem" }}>All Projects</span>
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{ color: "#a78bfa", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: "1rem" }}>
              ✦ My Work
            </span>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 800, background: "linear-gradient(135deg, #ffffff, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "1rem" }}>
              Projects &amp; Ventures
            </h1>
            <p style={{ color: "rgba(200,180,255,0.55)", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>
              SaaS products and ventures I've built, launched, and scaled.
            </p>
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center", marginBottom: "3rem", flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: "0.5rem 1.2rem",
                  borderRadius: "2rem",
                  border: `1px solid ${filter === cat ? "rgba(167,100,255,0.6)" : "rgba(167,100,255,0.2)"}`,
                  background: filter === cat ? "rgba(167,100,255,0.15)" : "rgba(167,100,255,0.04)",
                  color: filter === cat ? "#c084fc" : "rgba(200,180,255,0.55)",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontWeight: filter === cat ? 600 : 400,
                  transition: "all 0.2s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {filtered.map((project, i) => (
              <FullProjectCard key={i} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FullProjectCard({ project }: { project: typeof allProjects[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "1.25rem",
        background: "rgba(5, 2, 18, 0.8)",
        backdropFilter: "blur(24px)",
        border: `1px solid ${hovered ? `${project.accent}50` : "rgba(167,100,255,0.12)"}`,
        boxShadow: hovered ? `0 25px 60px rgba(0,0,0,0.7), 0 0 50px ${project.accent}25` : "0 6px 30px rgba(0,0,0,0.5)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        overflow: "hidden",
      }}
    >
      {/* Preview image area */}
      <div style={{ height: "180px", background: project.gradient, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)" }} />
        {/* Mock UI chrome */}
        <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", gap: "5px" }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: c }} />)}
        </div>
        <div style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)", background: "rgba(255,255,255,0.12)", borderRadius: "4px", padding: "2px 14px", fontSize: "0.65rem", color: "rgba(255,255,255,0.6)", whiteSpace: "nowrap" }}>
          {project.name.toLowerCase().replace(/\s/g, "")}.io
        </div>
        <div style={{ position: "absolute", inset: "40px 16px 16px", background: "rgba(255,255,255,0.06)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: "2.5rem", opacity: 0.4 }}>◈</span>
        </div>
        {/* Status badge */}
        <div style={{ position: "absolute", top: "10px", right: "10px", padding: "3px 10px", borderRadius: "1rem", background: `${statusColors[project.status]}20`, border: `1px solid ${statusColors[project.status]}50`, color: statusColors[project.status], fontSize: "0.7rem", fontWeight: 600 }}>
          {project.status}
        </div>
      </div>

      <div style={{ padding: "1.5rem" }}>
        <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "white", marginBottom: "0.25rem" }}>{project.name}</h3>
        <p style={{ color: project.accent, fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.75rem", filter: "brightness(1.3)" }}>{project.tagline}</p>
        <p style={{ color: "rgba(200,180,255,0.6)", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>{project.description}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
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
            gap: "0.5rem",
            padding: "0.65rem 1.25rem",
            borderRadius: "0.65rem",
            background: hovered ? `${project.accent}20` : "rgba(255,255,255,0.05)",
            border: `1px solid ${hovered ? `${project.accent}50` : "rgba(255,255,255,0.1)"}`,
            color: hovered ? project.accent : "rgba(255,255,255,0.7)",
            fontSize: "0.85rem",
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
