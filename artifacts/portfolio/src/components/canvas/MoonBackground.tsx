import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Stars({ count = 3000 }) {
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
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.5} sizeAttenuation transparent opacity={0.7} />
    </points>
  );
}

function Moon() {
  const groupRef = useRef<THREE.Group>(null);
  const moonRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const shadowRef = useRef<THREE.Mesh>(null);

  const craterPositions = useMemo(() => (
    Array.from({ length: 22 }, () => ({
      phi: Math.random() * Math.PI,
      theta: Math.random() * Math.PI * 2,
      r: 0.06 + Math.random() * 0.18,
    }))
  ), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Moon drifts slowly — clearly animated, not a static PNG
    if (groupRef.current) {
      groupRef.current.position.x = 8 + Math.sin(t * 0.12) * 3.5;
      groupRef.current.position.y = 2 + Math.cos(t * 0.09) * 2;
      groupRef.current.position.z = -20 + Math.sin(t * 0.07) * 2;
    }
    // Moon self-rotation — visible on the surface texture
    if (moonRef.current) moonRef.current.rotation.y += 0.003;
    // Pulsing corona
    if (coronaRef.current) {
      const mat = coronaRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.07 + Math.sin(t * 1.2) * 0.04;
    }
    // Shadow side flicker (terminator line simulation)
    if (shadowRef.current) {
      shadowRef.current.rotation.y = t * 0.003;
    }
  });

  return (
    <group ref={groupRef} position={[8, 2, -20]}>
      {/* Main moon body */}
      <mesh ref={moonRef}>
        <sphereGeometry args={[6, 64, 64]} />
        <meshStandardMaterial color="#b8b8c8" roughness={0.98} metalness={0.02} />
      </mesh>

      {/* Dark side terminator shadow */}
      <mesh ref={shadowRef}>
        <sphereGeometry args={[6.02, 32, 32]} />
        <meshBasicMaterial color="#000010" transparent opacity={0.45} side={THREE.FrontSide} />
      </mesh>

      {/* Craters */}
      {craterPositions.map((c, i) => {
        const x = Math.sin(c.phi) * Math.cos(c.theta) * 6.05;
        const y = Math.cos(c.phi) * 6.05;
        const z = Math.sin(c.phi) * Math.sin(c.theta) * 6.05;
        const normal = new THREE.Vector3(x, y, z).normalize();
        const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
        return (
          <mesh key={i} position={[x, y, z]} quaternion={quat}>
            <ringGeometry args={[c.r * 0.5, c.r, 20]} />
            <meshStandardMaterial color="#888898" roughness={1} transparent opacity={0.75} />
          </mesh>
        );
      })}

      {/* Glowing corona / atmosphere */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[6.6, 32, 32]} />
        <meshBasicMaterial color="#9999cc" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>

      {/* Outer glow halo */}
      <mesh>
        <sphereGeometry args={[8, 24, 24]} />
        <meshBasicMaterial color="#6666aa" transparent opacity={0.025} side={THREE.BackSide} />
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
    <group position={[-22, 12, -65]}>
      <mesh ref={earthRef}>
        <sphereGeometry args={[4.5, 32, 32]} />
        <meshStandardMaterial color="#1a4a8a" roughness={0.7} metalness={0.1} />
      </mesh>
      <mesh>
        <sphereGeometry args={[4.7, 24, 24]} />
        <meshBasicMaterial color="#3377dd" transparent opacity={0.1} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

function MoonDust() {
  const ref = useRef<THREE.Points>(null);
  const data = useMemo(() => {
    const count = 600;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = -14 + Math.random() * 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      speeds[i] = 0.008 + Math.random() * 0.025;
    }
    return { positions, speeds, count };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < data.count; i++) {
      const y = -14 + ((Math.sin(state.clock.elapsedTime * data.speeds[i] + i * 0.4) + 1) * 3.5);
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
    ref.current.rotation.y = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#d0d0e0" size={0.07} sizeAttenuation transparent opacity={0.35} />
    </points>
  );
}

function LunarSurface() {
  const craters = useMemo(() =>
    Array.from({ length: 14 }, () => ({
      x: (Math.random() - 0.5) * 70,
      z: -4 - Math.random() * 35,
      r: 1.2 + Math.random() * 5,
    })), []);

  return (
    <group position={[0, -15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <planeGeometry args={[220, 220]} />
        <meshStandardMaterial color="#72728a" roughness={1} />
      </mesh>
      {craters.map((c, i) => (
        <mesh key={i} position={[c.x, c.z, 0.02]}>
          <ringGeometry args={[c.r * 0.55, c.r, 36]} />
          <meshStandardMaterial color="#5a5a70" roughness={1} transparent opacity={0.65} />
        </mesh>
      ))}
    </group>
  );
}

export default function MoonBackground() {
  return (
    <>
      <color attach="background" args={["#01010a"]} />
      <ambientLight intensity={0.12} />
      <directionalLight position={[20, 10, 5]} intensity={1.4} color="#fff8ee" castShadow />
      <Stars />
      <Moon />
      <Earth />
      <MoonDust />
      <LunarSurface />
      <fog attach="fog" args={["#01010a", 70, 200]} />
    </>
  );
}
