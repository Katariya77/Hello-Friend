import { useState } from "react";
import { Link } from "wouter";
import PageCanvas from "@/components/canvas/PageCanvas";
import GalaxyBackground from "@/components/canvas/GalaxyBackground";

const skillCategories = [
  {
    title: "Marketing",
    icon: "📈",
    color: "#f97316",
    description: "Growth-focused strategies that drive acquisition and retention",
    skills: [
      { name: "Digital Marketing", level: "Expert" },
      { name: "Growth Hacking", level: "Expert" },
      { name: "SEO / SEM", level: "Advanced" },
      { name: "Paid Ads (Meta/Google)", level: "Expert" },
      { name: "Content Strategy", level: "Advanced" },
      { name: "Email Marketing", level: "Expert" },
      { name: "Social Media", level: "Expert" },
      { name: "Influencer Marketing", level: "Advanced" },
    ],
  },
  {
    title: "Branding",
    icon: "🎨",
    color: "#ec4899",
    description: "Building memorable brands that resonate and endure",
    skills: [
      { name: "Brand Identity", level: "Expert" },
      { name: "Visual Design", level: "Advanced" },
      { name: "Brand Strategy", level: "Expert" },
      { name: "Storytelling", level: "Expert" },
      { name: "Logo Design", level: "Advanced" },
      { name: "Color Theory", level: "Advanced" },
      { name: "Typography", level: "Advanced" },
      { name: "Art Direction", level: "Intermediate" },
    ],
  },
  {
    title: "Business",
    icon: "🚀",
    color: "#a78bfa",
    description: "Strategic thinking and execution at every stage",
    skills: [
      { name: "Product Strategy", level: "Expert" },
      { name: "Market Research", level: "Expert" },
      { name: "Business Development", level: "Advanced" },
      { name: "Fundraising", level: "Advanced" },
      { name: "Team Leadership", level: "Expert" },
      { name: "Operations", level: "Advanced" },
      { name: "Financial Modeling", level: "Intermediate" },
      { name: "Investor Relations", level: "Advanced" },
    ],
  },
  {
    title: "Tools",
    icon: "🛠",
    color: "#60a5fa",
    description: "The tech stack powering daily operations",
    skills: [
      { name: "Figma", level: "Expert" },
      { name: "Notion", level: "Expert" },
      { name: "HubSpot", level: "Advanced" },
      { name: "Webflow", level: "Advanced" },
      { name: "Zapier / Make", level: "Advanced" },
      { name: "Google Analytics", level: "Expert" },
      { name: "Meta Business Suite", level: "Expert" },
      { name: "Airtable", level: "Advanced" },
    ],
  },
  {
    title: "Soft Skills",
    icon: "✨",
    color: "#34d399",
    description: "Human skills that scale impact",
    skills: [
      { name: "Public Speaking", level: "Advanced" },
      { name: "Negotiation", level: "Advanced" },
      { name: "Networking", level: "Expert" },
      { name: "Sales", level: "Expert" },
      { name: "Copywriting", level: "Advanced" },
      { name: "Presentation Design", level: "Expert" },
      { name: "Problem Solving", level: "Expert" },
      { name: "Vision Setting", level: "Expert" },
    ],
  },
  {
    title: "Tech",
    icon: "💻",
    color: "#38bdf8",
    description: "Technical foundation for building digital products",
    skills: [
      { name: "React / Next.js", level: "Intermediate" },
      { name: "TypeScript", level: "Intermediate" },
      { name: "No-code Tools", level: "Expert" },
      { name: "API Integrations", level: "Advanced" },
      { name: "Product Analytics", level: "Advanced" },
      { name: "Webflow / Framer", level: "Advanced" },
    ],
  },
];

const levelColors: Record<string, string> = {
  Expert: "#10b981",
  Advanced: "#a78bfa",
  Intermediate: "#60a5fa",
};

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const displayed = activeCategory
    ? skillCategories.filter((c) => c.title === activeCategory)
    : skillCategories;

  return (
    <div style={{ background: "#01000a", minHeight: "100vh", color: "white", fontFamily: "Inter, sans-serif", overflowX: "hidden" }}>
      <PageCanvas>
        <GalaxyBackground />
      </PageCanvas>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ padding: "1.5rem 2rem", display: "flex", alignItems: "center", gap: "1rem", borderBottom: "1px solid rgba(167,100,255,0.1)", backdropFilter: "blur(20px)", background: "rgba(1,0,10,0.6)", position: "sticky", top: 0, zIndex: 10 }}>
          <Link href="/" style={{ color: "#a78bfa", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            ← Back to Home
          </Link>
          <span style={{ color: "rgba(167,100,255,0.3)" }}>|</span>
          <span style={{ color: "rgba(200,180,255,0.5)", fontSize: "0.9rem" }}>All Skills</span>
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{ color: "#a78bfa", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: "1rem" }}>
              ✦ Expertise
            </span>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 800, background: "linear-gradient(135deg, #ffffff, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "1rem" }}>
              Skills &amp; Expertise
            </h1>
            <p style={{ color: "rgba(200,180,255,0.55)", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>
              A blend of marketing, business, branding, and technical skills built through years of building ventures.
            </p>
          </div>

          {/* Category filter */}
          <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center", marginBottom: "3rem", flexWrap: "wrap" }}>
            <button
              onClick={() => setActiveCategory(null)}
              style={{
                padding: "0.5rem 1.2rem",
                borderRadius: "2rem",
                border: `1px solid ${activeCategory === null ? "rgba(167,100,255,0.6)" : "rgba(167,100,255,0.2)"}`,
                background: activeCategory === null ? "rgba(167,100,255,0.15)" : "rgba(167,100,255,0.04)",
                color: activeCategory === null ? "#c084fc" : "rgba(200,180,255,0.55)",
                fontSize: "0.85rem",
                cursor: "pointer",
                fontFamily: "inherit",
                fontWeight: activeCategory === null ? 600 : 400,
                transition: "all 0.2s ease",
              }}
            >
              All
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.title}
                onClick={() => setActiveCategory(cat.title === activeCategory ? null : cat.title)}
                style={{
                  padding: "0.5rem 1.2rem",
                  borderRadius: "2rem",
                  border: `1px solid ${activeCategory === cat.title ? `${cat.color}60` : "rgba(167,100,255,0.2)"}`,
                  background: activeCategory === cat.title ? `${cat.color}15` : "rgba(167,100,255,0.04)",
                  color: activeCategory === cat.title ? cat.color : "rgba(200,180,255,0.55)",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontWeight: activeCategory === cat.title ? 600 : 400,
                  transition: "all 0.2s ease",
                }}
              >
                {cat.icon} {cat.title}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "1.5rem" }}>
            {displayed.map((cat, i) => (
              <CategoryCard key={i} cat={cat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ cat }: { cat: typeof skillCategories[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "2rem",
        borderRadius: "1.25rem",
        background: "rgba(5, 2, 18, 0.8)",
        backdropFilter: "blur(24px)",
        border: `1px solid ${hovered ? `${cat.color}40` : "rgba(167,100,255,0.1)"}`,
        boxShadow: hovered ? `0 20px 50px rgba(0,0,0,0.6), 0 0 40px ${cat.color}15` : "0 6px 30px rgba(0,0,0,0.5)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
        <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: `${cat.color}15`, border: `1px solid ${cat.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>
          {cat.icon}
        </div>
        <div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "white", margin: 0 }}>{cat.title}</h3>
          <p style={{ color: cat.color, fontSize: "0.75rem", margin: 0, opacity: 0.8 }}>{cat.description}</p>
        </div>
      </div>

      <div style={{ height: "1px", background: `linear-gradient(90deg, ${cat.color}30, transparent)`, marginBottom: "1.25rem" }} />

      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {cat.skills.map((skill) => (
          <div key={skill.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "rgba(220,200,255,0.85)", fontSize: "0.88rem" }}>{skill.name}</span>
            <span style={{ padding: "0.18rem 0.7rem", borderRadius: "1rem", background: `${levelColors[skill.level]}15`, border: `1px solid ${levelColors[skill.level]}30`, color: levelColors[skill.level], fontSize: "0.7rem", fontWeight: 600 }}>
              {skill.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
