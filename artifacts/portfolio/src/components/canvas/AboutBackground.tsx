import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingGeometry({ position, rotation, color, speed }: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: THREE.Color;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initPos = useRef(position);

  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = rotation[0] + t * speed * 0.7;
      meshRef.current.rotation.y = rotation[1] + t * speed;
      meshRef.current.position.y = initPos.current[1] + Math.sin(t * 0.5 + position[0]) * 0.8;
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.3 + Math.sin(t * 1.2 + position[2]) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <icosahedronGeometry args={[0.8, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        roughness={0.2}
        metalness={0.7}
        wireframe={Math.random() > 0.5}
      />
    </mesh>
  );
}

function NebulaClouds() {
  const ref = useRef<THREE.Points>(null);
  const count = 3000;

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 25 + 8;
      positions[i3] = Math.cos(angle) * r;
      positions[i3 + 1] = (Math.random() - 0.5) * 15;
      positions[i3 + 2] = Math.sin(angle) * r - 30;
      const t = Math.random();
      colors[i3] = 0.1 + t * 0.5;
      colors[i3 + 1] = 0.05;
      colors[i3 + 2] = 0.5 + t * 0.4;
    }
    return { positions, colors };
  }, []);

  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.z = s.clock.getElapsedTime() * 0.01;
      ref.current.rotation.y = s.clock.getElapsedTime() * 0.005;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.35} sizeAttenuation vertexColors transparent opacity={0.5} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function FloatingTorusKnot() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * 0.08;
      ref.current.rotation.y = t * 0.12;
      ref.current.position.y = Math.sin(t * 0.3) * 1.5;
    }
  });

  return (
    <mesh ref={ref} position={[-9, 1, -10]}>
      <torusKnotGeometry args={[2, 0.5, 128, 16]} />
      <meshStandardMaterial
        color={new THREE.Color(0.3, 0.1, 0.7)}
        emissive={new THREE.Color(0.2, 0.05, 0.5)}
        emissiveIntensity={0.6}
        roughness={0.3}
        metalness={0.8}
        wireframe
      />
    </mesh>
  );
}

export default function AboutBackground() {
  const geometries = useMemo(() => [
    { position: [9, 4, -8] as [number, number, number], rotation: [0.3, 0.5, 0.1] as [number, number, number], color: new THREE.Color(0.5, 0.1, 0.9), speed: 0.3 },
    { position: [-7, -3, -12] as [number, number, number], rotation: [0.8, 0.2, 0.4] as [number, number, number], color: new THREE.Color(0.1, 0.4, 0.9), speed: 0.25 },
    { position: [12, -1, -15] as [number, number, number], rotation: [0.5, 0.8, 0.2] as [number, number, number], color: new THREE.Color(0.6, 0.1, 0.7), speed: 0.35 },
    { position: [-11, 5, -10] as [number, number, number], rotation: [0.1, 0.6, 0.9] as [number, number, number], color: new THREE.Color(0.2, 0.5, 0.8), speed: 0.28 },
    { position: [5, -6, -8] as [number, number, number], rotation: [0.7, 0.1, 0.5] as [number, number, number], color: new THREE.Color(0.7, 0.1, 0.6), speed: 0.32 },
    { position: [-4, 7, -14] as [number, number, number], rotation: [0.2, 0.9, 0.3] as [number, number, number], color: new THREE.Color(0.3, 0.2, 0.9), speed: 0.22 },
  ], []);

  return (
    <group>
      <NebulaClouds />
      <FloatingTorusKnot />
      {geometries.map((g, i) => <FloatingGeometry key={i} {...g} />)}
      <ambientLight intensity={0.15} color={new THREE.Color(0.2, 0.1, 0.5)} />
      <pointLight position={[0, 5, -5]} color={new THREE.Color(0.4, 0.1, 0.9)} intensity={4} distance={30} />
      <pointLight position={[-8, -5, -8]} color={new THREE.Color(0.1, 0.3, 0.9)} intensity={3} distance={25} />
    </group>
  );
}
