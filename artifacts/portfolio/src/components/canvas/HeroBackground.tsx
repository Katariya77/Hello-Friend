import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import PlanetModel from "./models/PlanetModel";

function StarField() {
  const ref = useRef<THREE.Points>(null);
  const count = 6000;

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 300;
      positions[i3 + 1] = (Math.random() - 0.5) * 300;
      positions[i3 + 2] = (Math.random() - 0.5) * 200 - 50;
      const r = Math.random();
      colors[i3] = r < 0.4 ? 0.7 + Math.random() * 0.3 : 1;
      colors[i3 + 1] = r < 0.4 ? 0.5 + Math.random() * 0.3 : 0.9;
      colors[i3 + 2] = 1;
    }
    return { positions, colors };
  }, []);

  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.getElapsedTime() * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.12} sizeAttenuation vertexColors transparent opacity={0.85} depthWrite={false} />
    </points>
  );
}

function MeteorTrails() {
  const groupRef = useRef<THREE.Group>(null);
  const meteors = useMemo(() =>
    Array.from({ length: 5 }, (_, i) => ({
      offset: i * 1.2,
      x: (Math.random() - 0.5) * 80,
      y: Math.random() * 30 + 15,
      z: (Math.random() - 0.5) * 40,
      speed: Math.random() * 0.6 + 0.3,
    })), []
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const m = meteors[i];
      const cycle = (t * m.speed + m.offset) % 4;
      const progress = cycle / 4;
      child.position.set(m.x - progress * 60, m.y - progress * 30, m.z);
      const mesh = child as THREE.Mesh;
      if (mesh.material) {
        (mesh.material as THREE.MeshBasicMaterial).opacity = progress < 0.1 ? progress * 10 : progress > 0.7 ? (1 - progress) * 3.3 : 1;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {meteors.map((_, i) => (
        <mesh key={i} scale={[4, 0.04, 0.04]}>
          <boxGeometry />
          <meshBasicMaterial color={new THREE.Color(0.8, 0.9, 1.0)} transparent opacity={1} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}

interface Props { opacity: number; }

export default function HeroBackground({ opacity }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.traverse((obj) => {
        if ((obj as THREE.Mesh).material) {
          const mat = (obj as THREE.Mesh).material as THREE.Material;
          if ('opacity' in mat) mat.opacity = Math.min((mat as THREE.MeshBasicMaterial).opacity, opacity);
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      <StarField />
      <MeteorTrails />
      <PlanetModel position={[8, -2, -15]} />
      <ambientLight intensity={0.2} color={new THREE.Color(0.3, 0.1, 0.6)} />
      <pointLight position={[-10, 10, -10]} color={new THREE.Color(0.3, 0.1, 0.8)} intensity={3} distance={40} />
    </group>
  );
}
