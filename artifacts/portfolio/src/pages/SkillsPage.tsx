import { useState } from "react";
import { Link } from "wouter";
import PageCanvas from "@/components/canvas/PageCanvas";
import GalaxyBackground from "@/components/canvas/GalaxyBackground";

const IconMarketing = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);
const IconBranding = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);
const IconBusiness = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /><line x1="2" y1="13" x2="22" y2="13" />
  </svg>
);
const IconTools = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);
const IconSoft = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
);
const IconTech = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16,18 22,12 16,6" /><polyline points="8,6 2,12 8,18" />
  </svg>
);

const skillCategories = [
  {
    title: "Marketing",
    Icon: IconMarketing,
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
    Icon: IconBranding,
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
    Icon: IconBusiness,
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
    Icon: IconTools,
    color: "#60a5fa",
    description: "The stack powering daily operations",
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
    Icon: IconSoft,
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
    Icon: IconTech,
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
  const displayed = activeCategory ? skillCategories.filter((c) => c.title === activeCategory) : skillCategories;

  return (
    <div style={{ background: "#01000a", minHeight: "200vh", color: "white", fontFamily: "Inter, sans-serif", overflowX: "hidden" }}>
      <PageCanvas>
        <GalaxyBackground />
      </PageCanvas>

      {/* Fixed top nav */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "1.25rem 2rem", display: "flex", alignItems: "center", gap: "1rem", backdropFilter: "blur(20px)", background: "rgba(1,0,10,0.5)", borderBottom: "1px solid rgba(167,100,255,0.08)" }}>
        <Link href="/" style={{ color: "#a78bfa", textDecoration: "none", fontSize: "0.9rem" }}>← Back to Home</Link>
        <span style={{ color: "rgba(167,100,255,0.3)" }}>|</span>
        <span style={{ color: "rgba(200,180,255,0.5)", fontSize: "0.9rem" }}>Skills</span>
      </div>

      {/* SECTION 1 — Full screen, galaxy visible first */}
      <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1, textAlign: "center", padding: "0 1.5rem" }}>
        <span style={{ color: "#a78bfa", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: "1.25rem", display: "block" }}>✦ Expertise</span>
        <h1 style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 800, background: "linear-gradient(135deg, #ffffff, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "1.5rem" }}>
          Skills &amp;<br />Expertise
        </h1>
        <p style={{ color: "rgba(200,180,255,0.5)", fontSize: "1.05rem", maxWidth: "400px", lineHeight: 1.7 }}>
          Marketing, branding, business &amp; tech — skills forged through years of building real ventures.
        </p>
        <div style={{ position: "absolute", bottom: "2.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", opacity: 0.5, animation: "bounce 2.5s ease-in-out infinite" }}>
          <span style={{ color: "#c084fc", fontSize: "0.7rem", letterSpacing: "0.12em" }}>SCROLL</span>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, #a78bfa, transparent)" }} />
        </div>
        <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }`}</style>
      </div>

      {/* SECTION 2 — Skills content */}
      <div style={{ position: "relative", zIndex: 1, background: "linear-gradient(to bottom, transparent, rgba(1,0,10,0.92) 5%, rgba(1,0,10,0.96) 100%)", paddingTop: "4rem", paddingBottom: "6rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          {/* Category filter */}
          <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center", marginBottom: "3rem", flexWrap: "wrap" }}>
            <FilterBtn label="All" active={activeCategory === null} color="#a78bfa" onClick={() => setActiveCategory(null)} />
            {skillCategories.map((cat) => (
              <FilterBtn key={cat.title} label={cat.title} active={activeCategory === cat.title} color={cat.color} onClick={() => setActiveCategory(activeCategory === cat.title ? null : cat.title)} />
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "1.5rem" }}>
            {displayed.map((cat, i) => <CategoryCard key={i} cat={cat} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterBtn({ label, active, color, onClick }: { label: string; active: boolean; color: string; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ padding: "0.5rem 1.2rem", borderRadius: "2rem", border: `1px solid ${active ? `${color}60` : "rgba(167,100,255,0.2)"}`, background: active ? `${color}15` : "rgba(167,100,255,0.04)", color: active ? color : "rgba(200,180,255,0.55)", fontSize: "0.85rem", cursor: "pointer", fontFamily: "inherit", fontWeight: active ? 600 : 400, transition: "all 0.2s ease" }}>
      {label}
    </button>
  );
}

function CategoryCard({ cat }: { cat: typeof skillCategories[0] }) {
  const [hovered, setHovered] = useState(false);
  const { Icon } = cat;

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ padding: "2rem", borderRadius: "1.25rem", background: "rgba(5,2,18,0.8)", backdropFilter: "blur(24px)", border: `1px solid ${hovered ? `${cat.color}40` : "rgba(167,100,255,0.1)"}`, boxShadow: hovered ? `0 20px 50px rgba(0,0,0,0.6), 0 0 40px ${cat.color}15` : "0 6px 30px rgba(0,0,0,0.5)", transform: hovered ? "translateY(-6px)" : "translateY(0)", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
        <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: `${cat.color}15`, border: `1px solid ${cat.color}30`, display: "flex", alignItems: "center", justifyContent: "center", color: cat.color, flexShrink: 0, boxShadow: hovered ? `0 0 20px ${cat.color}30` : "none", transition: "box-shadow 0.3s" }}>
          <Icon />
        </div>
        <div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "white", margin: 0 }}>{cat.title}</h3>
          <p style={{ color: cat.color, fontSize: "0.75rem", margin: 0, opacity: 0.75 }}>{cat.description}</p>
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
