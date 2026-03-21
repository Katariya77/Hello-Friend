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

const categories = ["All", "SaaS", "AI", "Marketing", "Design"];

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All"
    ? allProjects
    : allProjects.filter((p) => p.tags.includes(filter));

  return (
    <div style={{ background: "#01010a", minHeight: "200vh", color: "white", fontFamily: "Inter, sans-serif", overflowX: "hidden" }}>
      <PageCanvas>
        <MoonBackground />
      </PageCanvas>

      {/* Fixed top nav */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "1.25rem 2rem", display: "flex", alignItems: "center", gap: "1rem", backdropFilter: "blur(20px)", background: "rgba(1,1,10,0.5)", borderBottom: "1px solid rgba(167,100,255,0.08)" }}>
        <Link href="/" style={{ color: "#a78bfa", textDecoration: "none", fontSize: "0.9rem" }}>← Back to Home</Link>
        <span style={{ color: "rgba(167,100,255,0.3)" }}>|</span>
        <span style={{ color: "rgba(200,180,255,0.5)", fontSize: "0.9rem" }}>Projects</span>
      </div>

      {/* SECTION 1 — Full screen, background visible first */}
      <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1, textAlign: "center", padding: "0 1.5rem" }}>
        <span style={{ color: "#a78bfa", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: "1.25rem", display: "block" }}>✦ My Work</span>
        <h1 style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 800, background: "linear-gradient(135deg, #ffffff, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "1.5rem" }}>
          Projects &amp;<br />Ventures
        </h1>
        <p style={{ color: "rgba(200,180,255,0.5)", fontSize: "1.05rem", maxWidth: "420px", lineHeight: 1.7 }}>
          SaaS products and ventures I've built, launched, and scaled — explored under a lunar sky.
        </p>
        <div style={{ position: "absolute", bottom: "2.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", opacity: 0.5, animation: "bounce 2.5s ease-in-out infinite" }}>
          <span style={{ color: "#c084fc", fontSize: "0.7rem", letterSpacing: "0.12em" }}>SCROLL</span>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, #a78bfa, transparent)" }} />
        </div>
        <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }`}</style>
      </div>

      {/* SECTION 2 — Projects content */}
      <div style={{ position: "relative", zIndex: 1, background: "linear-gradient(to bottom, transparent, rgba(1,1,10,0.92) 5%, rgba(1,1,10,0.96) 100%)", paddingTop: "4rem", paddingBottom: "6rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          {/* Filters */}
          <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center", marginBottom: "3rem", flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)}
                style={{ padding: "0.5rem 1.2rem", borderRadius: "2rem", border: `1px solid ${filter === cat ? "rgba(167,100,255,0.6)" : "rgba(167,100,255,0.2)"}`, background: filter === cat ? "rgba(167,100,255,0.15)" : "rgba(167,100,255,0.04)", color: filter === cat ? "#c084fc" : "rgba(200,180,255,0.55)", fontSize: "0.85rem", cursor: "pointer", fontFamily: "inherit", fontWeight: filter === cat ? 600 : 400, transition: "all 0.2s ease" }}>
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {filtered.map((project, i) => (
              <ProjectCard key={i} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: typeof allProjects[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ borderRadius: "1.25rem", background: "rgba(5,2,18,0.8)", backdropFilter: "blur(24px)", border: `1px solid ${hovered ? `${project.accent}50` : "rgba(167,100,255,0.12)"}`, boxShadow: hovered ? `0 25px 60px rgba(0,0,0,0.7), 0 0 50px ${project.accent}25` : "0 6px 30px rgba(0,0,0,0.5)", transform: hovered ? "translateY(-8px)" : "translateY(0)", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)", overflow: "hidden" }}>
      {/* Preview */}
      <div style={{ height: "175px", background: project.gradient, position: "relative", overflow: "hidden" }}>
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
            <span key={tag} style={{ padding: "0.2rem 0.65rem", borderRadius: "2rem", background: `${project.accent}10`, border: `1px solid ${project.accent}25`, color: project.accent, fontSize: "0.7rem", fontWeight: 500, filter: "brightness(1.3)" }}>{tag}</span>
          ))}
        </div>
        <a href={project.url} target="_blank" rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", padding: "0.6rem 1rem", borderRadius: "0.65rem", background: hovered ? `${project.accent}18` : "rgba(255,255,255,0.04)", border: `1px solid ${hovered ? `${project.accent}45` : "rgba(255,255,255,0.08)"}`, color: hovered ? project.accent : "rgba(255,255,255,0.65)", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none", transition: "all 0.3s ease", fontFamily: "inherit" }}>
          Visit Project ↗
        </a>
      </div>
    </div>
  );
}
