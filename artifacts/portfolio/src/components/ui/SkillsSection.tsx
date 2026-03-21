import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

const BarChart = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
const Star = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>;
const Rocket = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/></svg>;
const Briefcase = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="2" y1="13" x2="22" y2="13"/></svg>;
const Pen = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const Search = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const People = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>;
const Figma = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5.5A3.5 3.5 0 018.5 2H12v7H8.5A3.5 3.5 0 015 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 110 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"/><path d="M5 19.5A3.5 3.5 0 018.5 16H12v3.5a3.5 3.5 0 11-7 0z"/><path d="M5 12.5A3.5 3.5 0 018.5 9H12v7H8.5A3.5 3.5 0 015 12.5z"/></svg>;
const Target = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
const Globe = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>;
const Zap = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/></svg>;
const Code = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg>;
const Mail = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const Handshake = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>;
const Webflow = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>;
const Chess = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 16l-1.447.724a1 1 0 00-.553.894V20h12v-2.382a1 1 0 00-.553-.894L16 16H8zM15.121 3.879a3 3 0 01-4.242 0M12 7V3m0 4a3 3 0 100 6 3 3 0 000-6z"/></svg>;

const previewSkills = [
  { name: "Digital Marketing", Icon: BarChart, color: "#f97316", category: "Marketing" },
  { name: "Brand Identity", Icon: Star, color: "#ec4899", category: "Branding" },
  { name: "Growth Hacking", Icon: Rocket, color: "#a78bfa", category: "Marketing" },
  { name: "Fundraising", Icon: Briefcase, color: "#fbbf24", category: "Business" },
  { name: "Paid Ads", Icon: Target, color: "#f97316", category: "Marketing" },
  { name: "Product Strategy", Icon: Chess, color: "#a78bfa", category: "Business" },
  { name: "Storytelling", Icon: Pen, color: "#ec4899", category: "Branding" },
  { name: "SEO / SEM", Icon: Search, color: "#60a5fa", category: "Marketing" },
  { name: "Team Leadership", Icon: People, color: "#34d399", category: "Business" },
  { name: "Figma", Icon: Figma, color: "#60a5fa", category: "Tools" },
  { name: "Content Strategy", Icon: Globe, color: "#f97316", category: "Marketing" },
  { name: "Social Media", Icon: Zap, color: "#ec4899", category: "Marketing" },
  { name: "Brand Strategy", Icon: Star, color: "#ec4899", category: "Branding" },
  { name: "Networking", Icon: Handshake, color: "#34d399", category: "Soft Skills" },
  { name: "Webflow", Icon: Webflow, color: "#60a5fa", category: "Tools" },
  { name: "Email Marketing", Icon: Mail, color: "#34d399", category: "Marketing" },
  { name: "Sales", Icon: Target, color: "#34d399", category: "Soft Skills" },
  { name: "Tech / Dev", Icon: Code, color: "#38bdf8", category: "Tech" },
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
  const { Icon } = skill;

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
      <span style={{ color: skill.color, flexShrink: 0, display: "flex", alignItems: "center" }}><Icon /></span>
      <div>
        <div style={{ fontSize: "0.83rem", fontWeight: 600, color: hovered ? "white" : "rgba(210,190,255,0.85)", lineHeight: 1.2 }}>{skill.name}</div>
        <div style={{ fontSize: "0.68rem", color: skill.color, opacity: 0.75, fontWeight: 500, marginTop: "0.15rem" }}>{skill.category}</div>
      </div>
    </div>
  );
}
