import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function LightRay({ angle, length, color, speed, opacity }: {
  angle: number; length: number; color: string; speed: number; opacity: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = opacity * (0.4 + Math.sin(state.clock.elapsedTime * speed + angle) * 0.6);
  });
  return (
    <mesh ref={ref} rotation={[0, 0, angle]} position={[0, 0, -5]}>
      <planeGeometry args={[0.4, length]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  );
}

function Rays() {
  const rayData = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      angle: (i / 18) * Math.PI * 2,
      length: 25 + Math.random() * 35,
      color: i % 3 === 0 ? "#a78bfa" : i % 3 === 1 ? "#60a5fa" : "#c084fc",
      speed: 0.3 + Math.random() * 0.5,
      opacity: 0.04 + Math.random() * 0.08,
    }));
  }, []);

  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.z += delta * 0.04;
  });

  return (
    <group ref={groupRef} position={[0, 0, -8]}>
      {rayData.map((r, i) => <LightRay key={i} {...r} />)}
    </group>
  );
}

function Stardust() {
  const ref = useRef<THREE.Points>(null);
  const { positions, sizes } = useMemo(() => {
    const count = 2500;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = -10 + (Math.random() - 0.5) * 30;
      sizes[i] = 0.05 + Math.random() * 0.2;
    }
    return { positions, sizes };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.015) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial color="#c084fc" size={0.12} sizeAttenuation transparent opacity={0.7} />
    </points>
  );
}

function GlowOrbs() {
  const orbs = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      x: (Math.random() - 0.5) * 30,
      y: (Math.random() - 0.5) * 20,
      z: -12 + Math.random() * 6,
      r: 0.4 + Math.random() * 1.2,
      color: i % 2 === 0 ? "#7c3aed" : "#2563eb",
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.6,
    })), []);

  const refs = useRef<(THREE.Mesh | null)[]>([]);
  useFrame((state) => {
    orbs.forEach((orb, i) => {
      const mesh = refs.current[i];
      if (!mesh) return;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.06 + Math.sin(state.clock.elapsedTime * orb.speed + orb.phase) * 0.04;
    });
  });

  return (
    <>
      {orbs.map((orb, i) => (
        <mesh key={i} ref={(el) => { refs.current[i] = el; }} position={[orb.x, orb.y, orb.z]}>
          <sphereGeometry args={[orb.r, 12, 12]} />
          <meshBasicMaterial color={orb.color} transparent opacity={0.08} />
        </mesh>
      ))}
    </>
  );
}

function CentralCore() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const s = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
    ref.current.scale.setScalar(s);
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.25 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
  });
  return (
    <group position={[0, 0, -6]}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial color="#c084fc" transparent opacity={0.3} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.5, 16, 16]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.04} />
      </mesh>
      <mesh>
        <sphereGeometry args={[5, 16, 16]} />
        <meshBasicMaterial color="#4f46e5" transparent opacity={0.02} />
      </mesh>
    </group>
  );
}

export default function StardustBackground() {
  return (
    <>
      <color attach="background" args={["#03010f"]} />
      <ambientLight intensity={0.1} />
      <Rays />
      <Stardust />
      <GlowOrbs />
      <CentralCore />
    </>
  );
}
