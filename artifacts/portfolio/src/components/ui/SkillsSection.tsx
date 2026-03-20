import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

const previewSkills = [
  { name: "Digital Marketing", icon: "📈", color: "#f97316", category: "Marketing" },
  { name: "Brand Identity", icon: "🎨", color: "#ec4899", category: "Branding" },
  { name: "Growth Hacking", icon: "🚀", color: "#a78bfa", category: "Marketing" },
  { name: "Fundraising", icon: "💰", color: "#fbbf24", category: "Business" },
  { name: "Paid Ads", icon: "📊", color: "#f97316", category: "Marketing" },
  { name: "Product Strategy", icon: "♟", color: "#a78bfa", category: "Business" },
  { name: "Storytelling", icon: "✍", color: "#ec4899", category: "Branding" },
  { name: "SEO / SEM", icon: "🔍", color: "#60a5fa", category: "Marketing" },
  { name: "Team Leadership", icon: "👥", color: "#34d399", category: "Business" },
  { name: "Figma", icon: "◆", color: "#60a5fa", category: "Tools" },
  { name: "Content Strategy", icon: "📝", color: "#f97316", category: "Marketing" },
  { name: "Social Media", icon: "◉", color: "#ec4899", category: "Marketing" },
  { name: "Brand Strategy", icon: "◈", color: "#ec4899", category: "Branding" },
  { name: "Networking", icon: "🤝", color: "#34d399", category: "Soft Skills" },
  { name: "Webflow", icon: "◇", color: "#60a5fa", category: "Tools" },
  { name: "Sales", icon: "🎯", color: "#34d399", category: "Soft Skills" },
];

interface Props {
  preview?: boolean;
}

export default function SkillsSection({ preview }: Props) {
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
    <section id="skills" style={{ padding: "8rem 1.5rem", position: "relative" }}>
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
              ✦ Expertise
            </span>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, background: "linear-gradient(135deg, #ffffff, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Skills &amp; Expertise
            </h2>
          </div>
          {preview && (
            <Link
              href="/skills"
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
              View All Skills ↗
            </Link>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "0.85rem" }}>
          {previewSkills.map((skill, i) => (
            <SkillPill key={i} skill={skill} visible={visible} delay={i * 0.03} />
          ))}
        </div>

        {preview && (
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <p style={{ color: "rgba(200,180,255,0.45)", fontSize: "0.85rem", marginBottom: "1rem" }}>
              Marketing, Branding, Business, Tools &amp; more...
            </p>
            <Link
              href="/skills"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.8rem 2rem",
                borderRadius: "2rem",
                background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(37,99,235,0.15))",
                border: "1px solid rgba(167,100,255,0.3)",
                color: "#c084fc",
                fontSize: "0.9rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(37,99,235,0.25))";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 30px rgba(167,100,255,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(37,99,235,0.15))";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              }}
            >
              Explore All Skills ↗
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function SkillPill({ skill, visible, delay }: {
  skill: typeof previewSkills[0];
  visible: boolean;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "1rem 1.1rem",
        borderRadius: "0.875rem",
        background: hovered ? `${skill.color}0a` : "rgba(10, 5, 25, 0.6)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${hovered ? `${skill.color}45` : "rgba(167,100,255,0.12)"}`,
        boxShadow: hovered ? `0 10px 30px rgba(0,0,0,0.5), 0 0 20px ${skill.color}20` : "0 4px 16px rgba(0,0,0,0.4)",
        transform: hovered ? "translateY(-5px) scale(1.02)" : visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
        opacity: visible ? 1 : 0,
        transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}s`,
        cursor: "default",
        display: "flex",
        alignItems: "center",
        gap: "0.65rem",
      }}
    >
      <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{skill.icon}</span>
      <div>
        <div style={{ fontSize: "0.83rem", fontWeight: 600, color: hovered ? "white" : "rgba(210,190,255,0.85)", lineHeight: 1.2 }}>{skill.name}</div>
        <div style={{ fontSize: "0.68rem", color: skill.color, opacity: 0.75, fontWeight: 500, marginTop: "0.15rem" }}>{skill.category}</div>
      </div>
    </div>
  );
}
