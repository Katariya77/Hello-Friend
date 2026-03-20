import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Stars({ count = 3000 }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 600;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 600;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 600;
    }
    return arr;
  }, [count]);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.5} sizeAttenuation transparent opacity={0.7} />
    </points>
  );
}

function Moon() {
  const moonRef = useRef<THREE.Mesh>(null);
  const rimRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (moonRef.current) moonRef.current.rotation.y += delta * 0.05;
    if (rimRef.current) rimRef.current.rotation.y -= delta * 0.03;
  });

  const craterPositions = useMemo(() => {
    return Array.from({ length: 18 }, () => ({
      phi: Math.random() * Math.PI,
      theta: Math.random() * Math.PI * 2,
      r: 0.08 + Math.random() * 0.14,
      depth: 0.025 + Math.random() * 0.04,
    }));
  }, []);

  return (
    <group position={[8, 2, -20]}>
      {/* Moon sphere */}
      <mesh ref={moonRef}>
        <sphereGeometry args={[6, 48, 48]} />
        <meshStandardMaterial color="#c8c8d0" roughness={0.95} metalness={0.05} />
      </mesh>

      {/* Craters */}
      {craterPositions.map((c, i) => {
        const x = Math.sin(c.phi) * Math.cos(c.theta) * 6.02;
        const y = Math.cos(c.phi) * 6.02;
        const z = Math.sin(c.phi) * Math.sin(c.theta) * 6.02;
        return (
          <mesh key={i} position={[x, y, z]} lookAt={new THREE.Vector3(0, 0, 0)}>
            <circleGeometry args={[c.r, 16]} />
            <meshStandardMaterial color="#9a9aaa" roughness={1} transparent opacity={0.85} />
          </mesh>
        );
      })}

      {/* Atmospheric glow rim */}
      <mesh ref={rimRef}>
        <sphereGeometry args={[6.3, 32, 32]} />
        <meshStandardMaterial color="#8888cc" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.08;
  });
  return (
    <group position={[-20, 10, -60]}>
      <mesh ref={earthRef}>
        <sphereGeometry args={[4, 32, 32]} />
        <meshStandardMaterial color="#1a4a8a" roughness={0.7} metalness={0.1} />
      </mesh>
      <mesh>
        <sphereGeometry args={[4.15, 32, 32]} />
        <meshStandardMaterial color="#3377dd" transparent opacity={0.12} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

function MoonDust() {
  const ref = useRef<THREE.Points>(null);
  const data = useMemo(() => {
    const count = 400;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = -12 + Math.random() * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      velocities[i] = 0.01 + Math.random() * 0.03;
    }
    return { positions, velocities };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < 400; i++) {
      pos.setY(i, -12 + ((Math.sin(state.clock.elapsedTime * data.velocities[i] + i) + 1) * 3));
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#d0d0e0" size={0.08} sizeAttenuation transparent opacity={0.4} />
    </points>
  );
}

function CraterField() {
  const craters = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      x: (Math.random() - 0.5) * 60,
      z: -5 - Math.random() * 30,
      r: 1 + Math.random() * 4,
      i,
    })), []);

  return (
    <group position={[0, -14, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {/* Ground plane */}
      <mesh>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#7a7a8a" roughness={1} />
      </mesh>
      {/* Crater rings */}
      {craters.map((c) => (
        <mesh key={c.i} position={[c.x, c.z, 0.01]}>
          <ringGeometry args={[c.r * 0.6, c.r, 32]} />
          <meshStandardMaterial color="#666678" roughness={1} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

export default function MoonBackground() {
  return (
    <>
      <color attach="background" args={["#01010a"]} />
      <ambientLight intensity={0.15} />
      <directionalLight position={[20, 10, 5]} intensity={1.2} color="#fff8ee" />
      <Stars />
      <Moon />
      <Earth />
      <MoonDust />
      <CraterField />
      <fog attach="fog" args={["#01010a", 60, 180]} />
    </>
  );
}
