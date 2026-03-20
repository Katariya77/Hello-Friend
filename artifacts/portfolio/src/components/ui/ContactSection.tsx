import { useEffect, useRef, useState } from "react";

const socialLinks = [
  {
    label: "GitHub",
    icon: "◈",
    href: "https://github.com",
    color: "#a78bfa",
    desc: "github.com/alexchen",
  },
  {
    label: "LinkedIn",
    icon: "◇",
    href: "https://linkedin.com",
    color: "#60a5fa",
    desc: "linkedin.com/in/alexchen",
  },
  {
    label: "Twitter",
    icon: "◉",
    href: "https://twitter.com",
    color: "#38bdf8",
    desc: "@alexchen_dev",
  },
  {
    label: "Email",
    icon: "◆",
    href: "mailto:alex@example.com",
    color: "#34d399",
    desc: "alex@example.com",
  },
];

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.875rem 1.25rem",
    borderRadius: "0.75rem",
    background: "rgba(255, 255, 255, 0.04)",
    border: "1px solid rgba(167, 100, 255, 0.2)",
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: "0.95rem",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    boxSizing: "border-box",
  };

  return (
    <section
      id="contact"
      style={{
        padding: "8rem 1.5rem 6rem",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        ref={ref}
        style={{
          maxWidth: "900px",
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
            ✦ Get In Touch
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
            Let's Build Something
          </h2>
          <p style={{ color: "rgba(200, 180, 255, 0.6)", maxWidth: "450px", margin: "0 auto", lineHeight: 1.7 }}>
            Have a project in mind? Whether it's a startup, product, or experiment —
            I'd love to hear about it.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2.5rem",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          <div>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "rgba(200, 180, 255, 0.7)",
                    fontSize: "0.85rem",
                    marginBottom: "0.5rem",
                    fontWeight: 500,
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={inputStyle}
                  required
                  onFocus={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = "rgba(167, 100, 255, 0.5)";
                    (e.target as HTMLInputElement).style.boxShadow = "0 0 15px rgba(167, 100, 255, 0.1)";
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = "rgba(167, 100, 255, 0.2)";
                    (e.target as HTMLInputElement).style.boxShadow = "none";
                  }}
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "rgba(200, 180, 255, 0.7)",
                    fontSize: "0.85rem",
                    marginBottom: "0.5rem",
                    fontWeight: 500,
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={inputStyle}
                  required
                  onFocus={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = "rgba(167, 100, 255, 0.5)";
                    (e.target as HTMLInputElement).style.boxShadow = "0 0 15px rgba(167, 100, 255, 0.1)";
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLInputElement).style.borderColor = "rgba(167, 100, 255, 0.2)";
                    (e.target as HTMLInputElement).style.boxShadow = "none";
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    color: "rgba(200, 180, 255, 0.7)",
                    fontSize: "0.85rem",
                    marginBottom: "0.5rem",
                    fontWeight: 500,
                  }}
                >
                  Message
                </label>
                <textarea
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  required
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    minHeight: "130px",
                  }}
                  onFocus={(e) => {
                    (e.target as HTMLTextAreaElement).style.borderColor = "rgba(167, 100, 255, 0.5)";
                    (e.target as HTMLTextAreaElement).style.boxShadow = "0 0 15px rgba(167, 100, 255, 0.1)";
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLTextAreaElement).style.borderColor = "rgba(167, 100, 255, 0.2)";
                    (e.target as HTMLTextAreaElement).style.boxShadow = "none";
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "0.9rem",
                  borderRadius: "0.75rem",
                  background: submitted
                    ? "linear-gradient(135deg, #10b981, #059669)"
                    : "linear-gradient(135deg, #7c3aed, #2563eb)",
                  border: "none",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  boxShadow: submitted
                    ? "0 0 30px rgba(16, 185, 129, 0.4)"
                    : "0 0 30px rgba(124, 58, 237, 0.3)",
                  transition: "all 0.4s ease",
                }}
              >
                {submitted ? "✓ Message Sent!" : "Send Message →"}
              </button>
            </form>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <p
              style={{
                color: "rgba(200, 180, 255, 0.6)",
                lineHeight: 1.8,
                marginBottom: "1.5rem",
                fontSize: "0.95rem",
              }}
            >
              Available for freelance, contract, and full-time opportunities.
              Currently open to interesting projects and collaborations.
            </p>

            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem 1.25rem",
                  borderRadius: "0.75rem",
                  background: "rgba(10, 5, 25, 0.6)",
                  border: "1px solid rgba(167, 100, 255, 0.15)",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    `${link.color}50`;
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    `0 0 20px ${link.color}20`;
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(167, 100, 255, 0.15)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(0)";
                }}
              >
                <span style={{ fontSize: "1.2rem", color: link.color }}>{link.icon}</span>
                <div>
                  <div style={{ color: "white", fontSize: "0.9rem", fontWeight: 600 }}>
                    {link.label}
                  </div>
                  <div style={{ color: "rgba(200, 180, 255, 0.5)", fontSize: "0.8rem" }}>
                    {link.desc}
                  </div>
                </div>
                <span style={{ marginLeft: "auto", color: "rgba(167, 100, 255, 0.4)", fontSize: "0.8rem" }}>
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "6rem",
          padding: "2rem 1.5rem",
          borderTop: "1px solid rgba(167, 100, 255, 0.1)",
          color: "rgba(200, 180, 255, 0.3)",
          fontSize: "0.85rem",
        }}
      >
        <span>© 2024 Alex Chen. Crafted with </span>
        <span style={{ color: "#a78bfa" }}>♥</span>
        <span> in the cosmos.</span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
