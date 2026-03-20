import { useEffect, useRef, useState, Suspense, lazy } from "react";
import Navbar from "@/components/ui/Navbar";
import HeroSection from "@/components/ui/HeroSection";
import AboutSection from "@/components/ui/AboutSection";
import ProjectsSection from "@/components/ui/ProjectsSection";
import SkillsSection from "@/components/ui/SkillsSection";
import ContactSection from "@/components/ui/ContactSection";

const Background3D = lazy(() => import("@/components/canvas/Background3D"));

function App() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const rafRef = useRef<number | null>(null);
  const targetMX = useRef(0);
  const targetMY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetMX.current = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMY.current = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const animate = () => {
      setMouseX((prev) => prev + (targetMX.current - prev) * 0.05);
      setMouseY((prev) => prev + (targetMY.current - prev) * 0.05);
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#050505",
        overflowX: "hidden",
      }}
    >
      <Suspense fallback={null}>
        <Background3D mouseX={mouseX} mouseY={mouseY} />
      </Suspense>

      <div style={{ position: "relative", zIndex: 10 }}>
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </main>
      </div>
    </div>
  );
}

export default App;
