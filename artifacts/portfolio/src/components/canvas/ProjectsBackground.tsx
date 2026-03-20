import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CrystalModel from "./models/CrystalModel";

function NeonGrid() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 20;

  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    if (groupRef.current) groupRef.current.position.z = (t * 2) % 4 - 2;
  });

  const lines = useMemo(() => {
    const size = 40;
    const step = 2;
    const arr = [];
    for (let i = -count; i <= count; i++) {
      arr.push({ type: 'h', y: -8, z: i * step });
      arr.push({ type: 'v', x: i * step, y: -8 });
    }
    return arr;
  }, []);

  return (
    <group ref={groupRef} position={[0, -8, -20]}>
      {lines.map((l, i) => (
        <mesh key={i} position={l.type === 'h' ? [0, 0, l.z!] : [l.x!, 0, 0]} rotation={l.type === 'v' ? [0, Math.PI / 2, 0] : [0, 0, 0]}>
          <boxGeometry args={[80, 0.03, 0.03]} />
          <meshBasicMaterial
            color={new THREE.Color(0.3, 0.1, 0.8)}
            transparent
            opacity={0.25}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 1500;

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 50;
      positions[i3 + 1] = (Math.random() - 0.5) * 40;
      positions[i3 + 2] = (Math.random() - 0.5) * 60 - 20;
      const t = Math.random();
      colors[i3] = t > 0.5 ? 0.5 + t * 0.4 : 0.2;
      colors[i3 + 1] = t > 0.5 ? 0.1 : 0.2 + t * 0.4;
      colors[i3 + 2] = 0.8 + t * 0.2;
    }
    return { positions, colors };
  }, []);

  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.getElapsedTime() * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.18} sizeAttenuation vertexColors transparent opacity={0.6} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function LightBeam({ x, color }: { x: number; color: THREE.Color }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.06 + Math.sin(t * 0.5 + x) * 0.04;
    }
  });

  return (
    <mesh ref={ref} position={[x, 0, -15]} rotation={[0, 0, 0]}>
      <cylinderGeometry args={[0.05, 3, 40, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.08} depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

export default function ProjectsBackground() {
  return (
    <group>
      <NeonGrid />
      <FloatingParticles />
      <CrystalModel position={[-9, 2, -8]} />
      <LightBeam x={-6} color={new THREE.Color(0.4, 0.1, 0.9)} />
      <LightBeam x={0} color={new THREE.Color(0.1, 0.4, 0.9)} />
      <LightBeam x={6} color={new THREE.Color(0.6, 0.1, 0.7)} />
      <ambientLight intensity={0.1} color={new THREE.Color(0.1, 0.05, 0.3)} />
      <pointLight position={[-10, 5, -5]} color={new THREE.Color(0.5, 0.1, 1.0)} intensity={5} distance={25} />
      <pointLight position={[10, -5, -5]} color={new THREE.Color(0.1, 0.4, 1.0)} intensity={4} distance={25} />
    </group>
  );
}
