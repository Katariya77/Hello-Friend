import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import HeroBackground from "./HeroBackground";
import AboutBackground from "./AboutBackground";
import ProjectsBackground from "./ProjectsBackground";
import SkillsBackground from "./SkillsBackground";
import ContactBackground from "./ContactBackground";

interface SceneProps {
  mouseX: number;
  mouseY: number;
  activeSection: string;
}

const SECTIONS = ["hero", "about", "projects", "skills", "contact"];

export default function Scene({ mouseX, mouseY, activeSection }: SceneProps) {
  const { camera } = useThree();
  const targetX = useRef(0);
  const targetY = useRef(0);
  const scaleProgress = useRef(0);

  const opacities = useRef<Record<string, number>>(
    Object.fromEntries(SECTIONS.map((s) => [s, s === "hero" ? 1 : 0]))
  );

  useFrame((_, delta) => {
    targetX.current += (mouseX * 2.5 - targetX.current) * 0.04;
    targetY.current += (mouseY * 1.5 - targetY.current) * 0.04;

    camera.position.x += (targetX.current - camera.position.x) * 0.05;
    camera.position.y += (targetY.current - camera.position.y) * 0.05;

    scaleProgress.current = Math.min(1, scaleProgress.current + delta * 0.5);
    const zoomIn = THREE.MathUtils.lerp(25, 15, scaleProgress.current);
    camera.position.z += (zoomIn - camera.position.z) * 0.02;
    camera.lookAt(0, 0, 0);

    // Smooth opacity transitions
    SECTIONS.forEach((s) => {
      const target = s === activeSection ? 1 : 0;
      opacities.current[s] += (target - opacities.current[s]) * Math.min(1, delta * 1.8);
    });
  });

  const getOpacity = (s: string) => opacities.current[s];

  return (
    <>
      <group visible={opacities.current.hero > 0.01}>
        <HeroBackground opacity={getOpacity("hero")} />
      </group>
      <group visible={opacities.current.about > 0.01}>
        <AboutBackground />
      </group>
      <group visible={opacities.current.projects > 0.01}>
        <ProjectsBackground />
      </group>
      <group visible={opacities.current.skills > 0.01}>
        <SkillsBackground />
      </group>
      <group visible={opacities.current.contact > 0.01}>
        <ContactBackground />
      </group>
    </>
  );
}
