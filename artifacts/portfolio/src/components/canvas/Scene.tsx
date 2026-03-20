import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import HeroBackground from "./HeroBackground";
import AboutBackground from "./AboutBackground";
import ProjectsBackground from "./ProjectsBackground";
import SkillsBackground from "./SkillsBackground";
import ContactBackground from "./ContactBackground";

const SECTIONS = ["hero", "about", "projects", "skills", "contact"];

interface SceneProps {
  weightsRef: React.MutableRefObject<Record<string, number>>;
  mouseX: number;
  mouseY: number;
}

function applyGroupOpacity(group: THREE.Group | null, weight: number) {
  if (!group) return;
  group.visible = weight > 0.005;
  if (!group.visible) return;
  group.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.material) return;
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    mats.forEach((mat) => {
      if (mat.userData.baseOpacity === undefined) {
        mat.userData.baseOpacity = (mat as THREE.MeshBasicMaterial).opacity ?? 1;
      }
      mat.transparent = true;
      (mat as THREE.MeshBasicMaterial).opacity = mat.userData.baseOpacity * weight;
    });
  });
}

export default function Scene({ weightsRef, mouseX, mouseY }: SceneProps) {
  const { camera } = useThree();
  const targetX = useRef(0);
  const targetY = useRef(0);
  const zoomProgress = useRef(0);

  const heroRef = useRef<THREE.Group>(null);
  const aboutRef = useRef<THREE.Group>(null);
  const projectsRef = useRef<THREE.Group>(null);
  const skillsRef = useRef<THREE.Group>(null);
  const contactRef = useRef<THREE.Group>(null);

  const groupRefs: Record<string, React.MutableRefObject<THREE.Group | null>> = {
    hero: heroRef,
    about: aboutRef,
    projects: projectsRef,
    skills: skillsRef,
    contact: contactRef,
  };

  const smoothWeights = useRef<Record<string, number>>(
    Object.fromEntries(SECTIONS.map((s) => [s, s === "hero" ? 1 : 0]))
  );

  useEffect(() => {
    camera.position.set(0, 0, 25);
  }, [camera]);

  useFrame((_, delta) => {
    // Mouse parallax
    targetX.current += (mouseX * 2.5 - targetX.current) * 0.04;
    targetY.current += (mouseY * 1.5 - targetY.current) * 0.04;
    camera.position.x += (targetX.current - camera.position.x) * 0.05;
    camera.position.y += (targetY.current - camera.position.y) * 0.05;

    // Zoom in on load
    zoomProgress.current = Math.min(1, zoomProgress.current + delta * 0.4);
    const targetZ = THREE.MathUtils.lerp(25, 15, zoomProgress.current);
    camera.position.z += (targetZ - camera.position.z) * 0.03;
    camera.lookAt(0, 0, 0);

    // Smooth weight transitions — read from ref (no React re-render needed)
    SECTIONS.forEach((s) => {
      const target = weightsRef.current[s] ?? 0;
      const current = smoothWeights.current[s] ?? 0;
      // Faster lerp = more responsive transition (delta*3 ~ 0.8s full transition)
      smoothWeights.current[s] = current + (target - current) * Math.min(1, delta * 3);
    });

    // Apply smooth weights to each section group's material opacities
    applyGroupOpacity(heroRef.current, smoothWeights.current.hero ?? 0);
    applyGroupOpacity(aboutRef.current, smoothWeights.current.about ?? 0);
    applyGroupOpacity(projectsRef.current, smoothWeights.current.projects ?? 0);
    applyGroupOpacity(skillsRef.current, smoothWeights.current.skills ?? 0);
    applyGroupOpacity(contactRef.current, smoothWeights.current.contact ?? 0);
  });

  return (
    <>
      <group ref={heroRef}>
        <HeroBackground />
      </group>
      <group ref={aboutRef}>
        <AboutBackground />
      </group>
      <group ref={projectsRef}>
        <ProjectsBackground />
      </group>
      <group ref={skillsRef}>
        <SkillsBackground />
      </group>
      <group ref={contactRef}>
        <ContactBackground />
      </group>
    </>
  );
}
