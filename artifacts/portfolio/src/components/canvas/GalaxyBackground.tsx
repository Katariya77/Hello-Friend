import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GalaxySpiral() {
  const ref = useRef<THREE.Points>(null);
  const colorRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 12000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const insideColor = new THREE.Color("#ff6030");
    const outsideColor = new THREE.Color("#1b3984");

    for (let i = 0; i < count; i++) {
      const r = Math.random() * 25;
      const spinAngle = r * 4;
      const branchAngle = ((i % 3) / 3) * Math.PI * 2;

      const randX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 1.5;
      const randY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5;
      const randZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 1.5;

      positions[i * 3] = Math.cos(branchAngle + spinAngle) * r + randX;
      positions[i * 3 + 1] = randY;
      positions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * r + randZ;

      const mixedColor = insideColor.clone().lerp(outsideColor, r / 25);
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.04;
  });

  return (
    <points ref={ref} position={[0, -5, -30]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.08} sizeAttenuation vertexColors transparent opacity={0.9} />
    </points>
  );
}

function NebulaCloud({ position, color, scale }: { position: [number, number, number]; color: string; scale: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.015) * 0.1;
    }
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.06} wireframe />
    </mesh>
  );
}

function StarField() {
  const positions = useMemo(() => {
    const count = 4000;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 500;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 500;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 500;
    }
    return arr;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.35} sizeAttenuation transparent opacity={0.8} />
    </points>
  );
}

function CosmicCore() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.1;
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.05;
      ref.current.scale.setScalar(s);
    }
  });
  return (
    <group position={[0, -5, -30]}>
      <mesh ref={ref}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial color="#ffaa44" transparent opacity={0.6} />
      </mesh>
      <mesh>
        <sphereGeometry args={[3, 16, 16]} />
        <meshBasicMaterial color="#ff6020" transparent opacity={0.07} />
      </mesh>
      <mesh>
        <sphereGeometry args={[6, 16, 16]} />
        <meshBasicMaterial color="#aa3300" transparent opacity={0.04} />
      </mesh>
    </group>
  );
}

export default function GalaxyBackground() {
  return (
    <>
      <color attach="background" args={["#01000a"]} />
      <ambientLight intensity={0.2} />
      <StarField />
      <GalaxySpiral />
      <CosmicCore />
      <NebulaCloud position={[-15, 5, -25]} color="#5500ff" scale={12} />
      <NebulaCloud position={[18, -3, -35]} color="#ff0055" scale={15} />
      <NebulaCloud position={[5, 8, -40]} color="#0055ff" scale={18} />
      <fog attach="fog" args={["#01000a", 50, 200]} />
    </>
  );
}
