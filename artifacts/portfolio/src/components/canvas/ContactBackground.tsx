import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WarpTunnel() {
  const groupRef = useRef<THREE.Group>(null);
  const ringCount = 20;
  const rings = useMemo(() =>
    Array.from({ length: ringCount }, (_, i) => ({
      z: -i * 3 - 5,
      radius: 3 + i * 0.3,
      opacity: Math.max(0.05, 0.4 - i * 0.018),
    })), []
  );

  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const r = rings[i];
      const speed = 1.5;
      const z = ((r.z + t * speed) % (ringCount * 3)) - ringCount * 3;
      child.position.z = z;
      child.rotation.z = t * 0.08 + i * 0.15;
      const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      const distFactor = Math.max(0, 1 + z / 30);
      mat.opacity = r.opacity * distFactor;
    });
  });

  return (
    <group ref={groupRef}>
      {rings.map((r, i) => (
        <mesh key={i} position={[0, 0, r.z]}>
          <torusGeometry args={[r.radius, 0.025, 8, 80]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? new THREE.Color(0.5, 0.1, 0.9) : i % 3 === 1 ? new THREE.Color(0.1, 0.4, 0.9) : new THREE.Color(0.6, 0.2, 0.7)}
            transparent
            opacity={r.opacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function ConvergingParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 1200;

  const { positions, velocities, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 15 + 2;
      positions[i3] = Math.cos(angle) * r;
      positions[i3 + 1] = Math.sin(angle) * r;
      positions[i3 + 2] = (Math.random() - 0.5) * 30 - 15;
      velocities[i3] = -Math.cos(angle) * 0.02;
      velocities[i3 + 1] = -Math.sin(angle) * 0.02;
      velocities[i3 + 2] = 0;
      const t = Math.random();
      colors[i3] = 0.4 + t * 0.5;
      colors[i3 + 1] = 0.1;
      colors[i3 + 2] = 0.7 + t * 0.3;
    }
    return { positions, velocities, colors };
  }, []);

  const posRef = useRef<Float32Array>(positions.slice());

  useFrame((_, delta) => {
    if (!ref.current) return;
    const attr = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posRef.current[i3] += velocities[i3] * delta * 30;
      posRef.current[i3 + 1] += velocities[i3 + 1] * delta * 30;
      const dist = Math.sqrt(posRef.current[i3] ** 2 + posRef.current[i3 + 1] ** 2);
      if (dist < 0.5) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * 15 + 5;
        posRef.current[i3] = Math.cos(angle) * r;
        posRef.current[i3 + 1] = Math.sin(angle) * r;
        velocities[i3] = -Math.cos(angle) * 0.02;
        velocities[i3 + 1] = -Math.sin(angle) * 0.02;
      }
      (attr.array as Float32Array)[i3] = posRef.current[i3];
      (attr.array as Float32Array)[i3 + 1] = posRef.current[i3 + 1];
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.12} sizeAttenuation vertexColors transparent opacity={0.7} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function CentralOrb() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.5;
      ref.current.rotation.x = t * 0.3;
      const mat = ref.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.8 + Math.sin(t * 2) * 0.3;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, -5]}>
      <icosahedronGeometry args={[1, 2]} />
      <meshStandardMaterial
        color={new THREE.Color(0.5, 0.1, 0.9)}
        emissive={new THREE.Color(0.4, 0.05, 0.7)}
        emissiveIntensity={0.8}
        roughness={0.2}
        metalness={0.8}
        wireframe
      />
    </mesh>
  );
}

export default function ContactBackground() {
  return (
    <group>
      <WarpTunnel />
      <ConvergingParticles />
      <CentralOrb />
      <ambientLight intensity={0.1} color={new THREE.Color(0.2, 0.05, 0.5)} />
      <pointLight position={[0, 0, 0]} color={new THREE.Color(0.5, 0.1, 0.9)} intensity={6} distance={20} />
      <pointLight position={[0, 5, -8]} color={new THREE.Color(0.1, 0.3, 0.9)} intensity={4} distance={25} />
    </group>
  );
}
