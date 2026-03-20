import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import AtomModel from "./models/AtomModel";

function EnergyRing({ radius, speed, color, tilt }: {
  radius: number;
  speed: number;
  color: THREE.Color;
  tilt: [number, number, number];
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * speed;
      ref.current.rotation.x = tilt[0] + Math.sin(t * 0.2) * 0.1;
    }
  });

  return (
    <group ref={ref} rotation={tilt}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.04, 8, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function GlowOrbs() {
  const count = 20;
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 8 + Math.random() * 6;
      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi) - 10;
      colors[i3] = 0.5 + Math.random() * 0.5;
      colors[i3 + 1] = 0.1;
      colors[i3 + 2] = 0.8 + Math.random() * 0.2;
    }
    return { positions, colors };
  }, []);

  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.getElapsedTime() * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.8} sizeAttenuation vertexColors transparent opacity={0.7} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function BackgroundParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 2000;
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 120;
      positions[i3 + 1] = (Math.random() - 0.5) * 80;
      positions[i3 + 2] = (Math.random() - 0.5) * 100 - 30;
      colors[i3] = 0.3 + Math.random() * 0.4;
      colors[i3 + 1] = 0.1;
      colors[i3 + 2] = 0.6 + Math.random() * 0.4;
    }
    return { positions, colors };
  }, []);

  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.getElapsedTime() * 0.007;
      ref.current.rotation.x = Math.sin(s.clock.getElapsedTime() * 0.003) * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} sizeAttenuation vertexColors transparent opacity={0.6} depthWrite={false} />
    </points>
  );
}

export default function SkillsBackground() {
  return (
    <group>
      <BackgroundParticles />
      <AtomModel position={[9, 0, -8]} />
      <GlowOrbs />
      <EnergyRing radius={5} speed={0.4} color={new THREE.Color(0.5, 0.1, 0.9)} tilt={[0.4, 0, 0]} />
      <EnergyRing radius={8} speed={-0.3} color={new THREE.Color(0.2, 0.3, 0.9)} tilt={[-0.6, 0.3, 0]} />
      <EnergyRing radius={11} speed={0.2} color={new THREE.Color(0.6, 0.1, 0.7)} tilt={[0.8, 0.5, 0.3]} />
      <ambientLight intensity={0.1} color={new THREE.Color(0.2, 0.05, 0.5)} />
      <pointLight position={[8, 5, -5]} color={new THREE.Color(0.5, 0.1, 1.0)} intensity={5} distance={30} />
      <pointLight position={[-8, -5, -5]} color={new THREE.Color(0.1, 0.3, 1.0)} intensity={4} distance={25} />
    </group>
  );
}
