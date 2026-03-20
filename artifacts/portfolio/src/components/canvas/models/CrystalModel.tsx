import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function CrystalShard({ position, rotation, scale, color }: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: THREE.Color;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = rotation[1] + t * 0.3;
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.4 + Math.sin(t * 1.5 + position[0]) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        roughness={0.1}
        metalness={0.8}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

export default function CrystalModel({ position = [0, 0, 0] as [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  const shards = useMemo(() => [
    { position: [0, 0, 0] as [number, number, number], rotation: [0, 0, 0] as [number, number, number], scale: [0.7, 2.2, 0.7] as [number, number, number], color: new THREE.Color(0.4, 0.1, 0.9) },
    { position: [0.9, -0.5, 0.3] as [number, number, number], rotation: [0.3, 0.5, 0.2] as [number, number, number], scale: [0.5, 1.6, 0.5] as [number, number, number], color: new THREE.Color(0.1, 0.3, 0.9) },
    { position: [-0.8, -0.3, 0.4] as [number, number, number], rotation: [-0.2, -0.4, 0.3] as [number, number, number], scale: [0.45, 1.4, 0.45] as [number, number, number], color: new THREE.Color(0.6, 0.1, 0.8) },
    { position: [0.3, -0.8, -0.7] as [number, number, number], rotation: [0.5, 0.8, -0.2] as [number, number, number], scale: [0.4, 1.2, 0.4] as [number, number, number], color: new THREE.Color(0.2, 0.5, 0.9) },
    { position: [-0.4, 0.3, -0.8] as [number, number, number], rotation: [-0.4, 0.3, 0.6] as [number, number, number], scale: [0.35, 1.0, 0.35] as [number, number, number], color: new THREE.Color(0.7, 0.2, 0.7) },
    { position: [0.6, 0.6, -0.3] as [number, number, number], rotation: [0.6, -0.5, -0.3] as [number, number, number], scale: [0.3, 0.8, 0.3] as [number, number, number], color: new THREE.Color(0.3, 0.2, 1.0) },
  ], []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.position.y = position[1] + Math.sin(t * 0.6) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {shards.map((s, i) => (
        <CrystalShard key={i} {...s} />
      ))}
      <pointLight color={new THREE.Color(0.4, 0.2, 1.0)} intensity={3} distance={10} />
      <pointLight color={new THREE.Color(0.2, 0.6, 1.0)} intensity={2} distance={8} position={[2, 2, 2]} />
    </group>
  );
}
