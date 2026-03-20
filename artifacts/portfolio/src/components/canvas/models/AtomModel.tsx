import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function OrbitRing({ radius, color, speed, tilt, electronColor }: {
  radius: number;
  color: THREE.Color;
  speed: number;
  tilt: [number, number, number];
  electronColor: THREE.Color;
}) {
  const electronRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(Math.random() * Math.PI * 2);

  useFrame((_, delta) => {
    angleRef.current += speed * delta;
    if (electronRef.current) {
      electronRef.current.position.set(
        Math.cos(angleRef.current) * radius,
        0,
        Math.sin(angleRef.current) * radius
      );
    }
  });

  return (
    <group rotation={tilt}>
      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.02, 8, 80]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>

      {/* Electron */}
      <mesh ref={electronRef}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial
          color={electronColor}
          emissive={electronColor}
          emissiveIntensity={2}
          roughness={0}
          metalness={0}
        />
      </mesh>
    </group>
  );
}

export default function AtomModel({ position = [0, 0, 0] as [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1;
      groupRef.current.rotation.x = Math.sin(t * 0.08) * 0.15;
      groupRef.current.position.y = position[1] + Math.sin(t * 0.4) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Nucleus */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={new THREE.Color(0.6, 0.1, 1.0)}
          emissive={new THREE.Color(0.4, 0.05, 0.7)}
          emissiveIntensity={1.5}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>

      {/* Nucleus glow */}
      <mesh>
        <sphereGeometry args={[0.75, 16, 16]} />
        <meshBasicMaterial color={new THREE.Color(0.5, 0.1, 0.9)} transparent opacity={0.15} />
      </mesh>

      {/* Electron orbits */}
      <OrbitRing
        radius={2.5}
        color={new THREE.Color(0.4, 0.2, 0.9)}
        speed={1.2}
        tilt={[0, 0, 0]}
        electronColor={new THREE.Color(0.6, 0.3, 1.0)}
      />
      <OrbitRing
        radius={2.2}
        color={new THREE.Color(0.2, 0.4, 0.9)}
        speed={-0.9}
        tilt={[Math.PI / 3, 0, 0]}
        electronColor={new THREE.Color(0.3, 0.6, 1.0)}
      />
      <OrbitRing
        radius={2.8}
        color={new THREE.Color(0.5, 0.1, 0.7)}
        speed={0.7}
        tilt={[0, 0, Math.PI / 3]}
        electronColor={new THREE.Color(0.8, 0.2, 0.9)}
      />

      <pointLight color={new THREE.Color(0.5, 0.2, 1.0)} intensity={4} distance={12} />
    </group>
  );
}
