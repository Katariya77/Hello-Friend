import { useRef, useEffect, useState, useCallback } from "react";
import Background3D from "@/components/canvas/Background3D";
import Navbar from "@/components/ui/Navbar";
import HeroSection from "@/components/ui/HeroSection";
import AboutSection from "@/components/ui/AboutSection";
import ProjectsSection from "@/components/ui/ProjectsSection";
import SkillsSection from "@/components/ui/SkillsSection";
import ContactSection from "@/components/ui/ContactSection";

const SECTIONS = ["hero", "about", "projects", "skills", "contact"];

export default function HomePage() {
  const weightsRef = useRef<Record<string, number>>(
    Object.fromEntries(SECTIONS.map((s) => [s, s === "hero" ? 1 : 0]))
  );
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const updateWeights = useCallback(() => {
    const vh = window.innerHeight;
    const newWeights: Record<string, number> = {};

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) { newWeights[id] = 0; return; }
      const rect = el.getBoundingClientRect();
      // Visible pixels in viewport
      const visTop = Math.max(0, rect.top);
      const visBottom = Math.min(vh, rect.bottom);
      const visible = Math.max(0, visBottom - visTop);
      newWeights[id] = visible / vh;
    });

    const total = Object.values(newWeights).reduce((a, b) => a + b, 0);
    if (total > 0) SECTIONS.forEach((k) => { newWeights[k] /= total; });

    weightsRef.current = newWeights;
  }, []);

  useEffect(() => {
    updateWeights();
    const onScroll = () => updateWeights();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [updateWeights]);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      setMouseX((e.clientX / window.innerWidth - 0.5) * 2);
      setMouseY(-(e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => window.removeEventListener("mousemove", onMouse);
  }, []);

  return (
    <div style={{ background: "#050508", minHeight: "100vh", color: "white", fontFamily: "Inter, sans-serif", overflowX: "hidden" }}>
      <Background3D weightsRef={weightsRef} mouseX={mouseX} mouseY={mouseY} />
      <Navbar />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div id="hero"><HeroSection /></div>
        <div id="about"><AboutSection /></div>
        <div id="projects"><ProjectsSection preview /></div>
        <div id="skills"><SkillsSection preview /></div>
        <div id="contact"><ContactSection /></div>
      </div>
    </div>
  );
}
