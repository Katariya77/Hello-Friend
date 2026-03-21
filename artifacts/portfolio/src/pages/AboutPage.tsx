import { useState } from "react";
import { Link } from "wouter";
import PageCanvas from "@/components/canvas/PageCanvas";
import StardustBackground from "@/components/canvas/StardustBackground";

const timeline = [
  { year: "2019", title: "First Venture", desc: "Launched first e-commerce brand at 19, reaching profitability in under 6 months through organic social and influencer marketing." },
  { year: "2020", title: "Agency Chapter", desc: "Founded a growth marketing agency serving D2C brands across India. Managed ₹5Cr+ in ad spend across Meta and Google." },
  { year: "2021", title: "Going Digital", desc: "Pivoted to SaaS — built and launched first subscription product serving 500+ paying users within 90 days of launch." },
  { year: "2022", title: "BrandForge", desc: "Launched BrandForge, an AI-powered brand identity tool. Grew to 2,000+ active users and secured first angel cheque." },
  { year: "2023", title: "Portfolio of Ventures", desc: "Expanded into a portfolio model — running 4 concurrent SaaS products across marketing automation, content, and analytics." },
  { year: "2024", title: "Building in Public", desc: "KatariyaOS launched. Actively building in public, angel investing in early-stage founders, and speaking at startup events." },
];

function PhotoPlaceholder() {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Outer glow ring */}
      <div style={{
        position: "absolute",
        inset: "-12px",
        borderRadius: "50%",
        background: "conic-gradient(from 0deg, #7c3aed, #2563eb, #a78bfa, #ec4899, #7c3aed)",
        animation: "spin 6s linear infinite",
        zIndex: 0,
      }} />
      <div style={{
        position: "absolute",
        inset: "-8px",
        borderRadius: "50%",
        background: "#03010f",
        zIndex: 1,
      }} />
      {/* Photo circle */}
      <div style={{
        width: "220px",
        height: "220px",
        borderRadius: "50%",
        border: "2px solid rgba(167,100,255,0.3)",
        position: "relative",
        zIndex: 2,
        overflow: "hidden",
      }}>
        <img
          src="https://ik.imagekit.io/Katariya/Personal/av.jpg?updatedAt=1774099014811"
          alt="Krishna Katariya"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
      </div>

      {/* Orbiting dot */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "260px",
        height: "260px",
        marginLeft: "-130px",
        marginTop: "-130px",
        borderRadius: "50%",
        border: "1px dashed rgba(167,100,255,0.2)",
        zIndex: 0,
        animation: "orbitSpin 8s linear infinite",
      }}>
        <div style={{
          position: "absolute",
          top: "-4px",
          left: "50%",
          marginLeft: "-4px",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "#a78bfa",
          boxShadow: "0 0 12px #a78bfa",
        }} />
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbitSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default function AboutPage() {
  const [activeYear, setActiveYear] = useState<string | null>(null);

  return (
    <div style={{ background: "#03010f", minHeight: "200vh", color: "white", fontFamily: "Inter, sans-serif", overflowX: "hidden" }}>
      <PageCanvas>
        <StardustBackground />
      </PageCanvas>

      {/* Top nav */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "1.25rem 2rem", display: "flex", alignItems: "center", gap: "1rem", backdropFilter: "blur(20px)", background: "rgba(3,1,15,0.5)", borderBottom: "1px solid rgba(167,100,255,0.08)" }}>
        <Link href="/" style={{ color: "#a78bfa", textDecoration: "none", fontSize: "0.9rem" }}>← Back to Home</Link>
        <span style={{ color: "rgba(167,100,255,0.3)" }}>|</span>
        <span style={{ color: "rgba(200,180,255,0.5)", fontSize: "0.9rem" }}>About Me</span>
      </div>

      {/* SECTION 1 — Full screen hero (background visible first) */}
      <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1, textAlign: "center", padding: "0 1.5rem" }}>
        <span style={{ color: "#a78bfa", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: "1.25rem", display: "block" }}>✦ The Story</span>
        <h1 style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 800, background: "linear-gradient(135deg, #ffffff, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "1.5rem" }}>
          Krishna<br />Katariya
        </h1>
        <p style={{ color: "rgba(200,180,255,0.55)", fontSize: "1.1rem", maxWidth: "420px", lineHeight: 1.7 }}>
          Entrepreneur. Venture Builder. Brand Strategist.
        </p>
        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "2.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", opacity: 0.5, animation: "bounce 2.5s ease-in-out infinite" }}>
          <span style={{ color: "#c084fc", fontSize: "0.7rem", letterSpacing: "0.12em" }}>SCROLL</span>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, #a78bfa, transparent)" }} />
        </div>
        <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }`}</style>
      </div>

      {/* SECTION 2 — Content (on scroll) */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Fade-in backdrop for readability */}
        <div style={{ background: "linear-gradient(to bottom, transparent, rgba(3,1,15,0.92) 6%, rgba(3,1,15,0.95) 100%)", paddingTop: "4rem", paddingBottom: "6rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>

            {/* Photo + Bio */}
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "5rem", alignItems: "start", marginBottom: "6rem" }} className="about-content-grid">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
                <PhotoPlaceholder />
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "white", marginBottom: "0.25rem" }}>Krishna Katariya</div>
                  <div style={{ color: "#a78bfa", fontSize: "0.85rem", fontWeight: 500 }}>Founder &amp; Entrepreneur</div>
                  <div style={{ color: "rgba(200,180,255,0.45)", fontSize: "0.78rem", marginTop: "0.25rem" }}>India 🇮🇳</div>
                </div>
                {/* Social quick links */}
                <div style={{ display: "flex", gap: "0.6rem" }}>
                  {["Twitter", "LinkedIn", "Email"].map((s) => (
                    <a key={s} href="#" style={{ padding: "0.4rem 0.9rem", borderRadius: "1rem", border: "1px solid rgba(167,100,255,0.2)", color: "rgba(200,180,255,0.6)", fontSize: "0.75rem", textDecoration: "none", transition: "all 0.2s", background: "rgba(167,100,255,0.04)" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(167,100,255,0.5)"; (e.currentTarget as HTMLAnchorElement).style.color = "#c084fc"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(167,100,255,0.2)"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(200,180,255,0.6)"; }}>
                      {s}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700, background: "linear-gradient(135deg, #ffffff, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "1.75rem", lineHeight: 1.25 }}>
                  Building at the intersection of marketing, brand &amp; technology
                </h2>
                <p style={{ color: "rgba(210,185,255,0.75)", lineHeight: 1.95, fontSize: "1.02rem", marginBottom: "1.4rem" }}>
                  Born with an obsession for building things, I'm a serial entrepreneur who turned a passion for marketing and technology into a growing portfolio of ventures. I started my first business at 19 and haven't stopped since.
                </p>
                <p style={{ color: "rgba(210,185,255,0.75)", lineHeight: 1.95, fontSize: "1.02rem", marginBottom: "1.4rem" }}>
                  My edge is an unusual combination: deep marketing intuition, brand sensibility honed across dozens of projects, and enough technical ability to move fast and build real products. I don't believe in waiting for the perfect team — I believe in starting and figuring it out.
                </p>
                <p style={{ color: "rgba(210,185,255,0.75)", lineHeight: 1.95, fontSize: "1.02rem", marginBottom: "2rem" }}>
                  Over the past 5+ years I've launched SaaS products, run a growth agency, managed crores in ad spend, and served 50,000+ customers across 20+ countries. Today I'm focused on building KatariyaOS — my most ambitious project yet — and quietly angel investing in founders who remind me of my younger self.
                </p>
                <blockquote style={{ borderLeft: "3px solid #7c3aed", paddingLeft: "1.5rem", margin: "0 0 2rem", color: "rgba(200,170,255,0.7)", fontSize: "1.05rem", fontStyle: "italic", lineHeight: 1.7 }}>
                  "The best businesses are built by people who understand both people and systems. I aim to be one of those people."
                </blockquote>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
                  {["Entrepreneur", "SaaS Builder", "Growth Marketer", "Brand Strategist", "Angel Investor", "Product Builder"].map((tag) => (
                    <span key={tag} style={{ padding: "0.35rem 1rem", borderRadius: "2rem", background: "rgba(167,100,255,0.08)", border: "1px solid rgba(167,100,255,0.2)", color: "#c084fc", fontSize: "0.82rem", fontWeight: 500 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div style={{ marginBottom: "4rem" }}>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 700, color: "white", marginBottom: "0.5rem", textAlign: "center" }}>The Journey</h3>
              <p style={{ color: "rgba(200,180,255,0.45)", textAlign: "center", marginBottom: "3rem", fontSize: "0.9rem" }}>A story told in milestones</p>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", background: "linear-gradient(to bottom, transparent, rgba(167,100,255,0.3) 10%, rgba(167,100,255,0.3) 90%, transparent)", transform: "translateX(-50%)" }} className="timeline-line" />
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {timeline.map((item, i) => (
                    <TimelineItem key={i} item={item} index={i} activeYear={activeYear} setActiveYear={setActiveYear} />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-content-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .timeline-line { display: none; }
        }
      `}</style>
    </div>
  );
}

function TimelineItem({ item, index, activeYear, setActiveYear }: {
  item: typeof timeline[0]; index: number;
  activeYear: string | null; setActiveYear: (y: string | null) => void;
}) {
  const isLeft = index % 2 === 0;
  const isActive = activeYear === item.year;

  return (
    <div
      style={{ display: "flex", justifyContent: isLeft ? "flex-end" : "flex-start", paddingRight: isLeft ? "calc(50% + 2rem)" : "0", paddingLeft: isLeft ? "0" : "calc(50% + 2rem)", position: "relative", cursor: "pointer" }}
      onClick={() => setActiveYear(isActive ? null : item.year)}
      className="timeline-item"
    >
      {/* Center dot */}
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: "12px", height: "12px", borderRadius: "50%", background: isActive ? "#a78bfa" : "#3b1f6a", border: "2px solid #7c3aed", transition: "all 0.3s", boxShadow: isActive ? "0 0 16px #a78bfa" : "none", zIndex: 2 }} className="timeline-dot" />
      <div style={{
        padding: "1.25rem 1.5rem",
        borderRadius: "1rem",
        background: isActive ? "rgba(124,58,237,0.12)" : "rgba(5,2,18,0.8)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${isActive ? "rgba(124,58,237,0.5)" : "rgba(167,100,255,0.12)"}`,
        maxWidth: "380px",
        transition: "all 0.3s ease",
        boxShadow: isActive ? "0 10px 40px rgba(124,58,237,0.2)" : "none",
      }}>
        <div style={{ color: "#a78bfa", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "0.35rem" }}>{item.year}</div>
        <div style={{ color: "white", fontWeight: 700, fontSize: "1rem", marginBottom: "0.5rem" }}>{item.title}</div>
        <div style={{ color: "rgba(200,180,255,0.65)", fontSize: "0.85rem", lineHeight: 1.65 }}>{item.desc}</div>
      </div>
      <style>{`@media (max-width: 768px) { .timeline-item { padding: 0 !important; } .timeline-dot { display: none; } }`}</style>
    </div>
  );
              }
