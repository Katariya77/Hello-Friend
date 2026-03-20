import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function PlanetModel({ position = [0, 0, 0] as [number, number, number] }) {
  const planetRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (planetRef.current) {
      planetRef.current.rotation.y = t * 0.08;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.04;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.03;
    }
    if (atmosphereRef.current) {
      const mat = atmosphereRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.12 + Math.sin(t * 0.5) * 0.04;
    }
  });

  return (
    <group ref={planetRef} position={position}>
      {/* Planet core */}
      <mesh>
        <sphereGeometry args={[3.5, 64, 64]} />
        <meshStandardMaterial
          color={new THREE.Color(0.1, 0.05, 0.25)}
          roughness={0.8}
          metalness={0.2}
          emissive={new THREE.Color(0.05, 0.02, 0.15)}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Surface detail layer */}
      <mesh>
        <sphereGeometry args={[3.52, 32, 32]} />
        <meshStandardMaterial
          color={new THREE.Color(0.3, 0.1, 0.6)}
          roughness={1}
          metalness={0}
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[4.2, 32, 32]} />
        <meshBasicMaterial
          color={new THREE.Color(0.4, 0.2, 1.0)}
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Ring system 1 */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2.5, 0.2, 0]}>
        <torusGeometry args={[6, 0.35, 8, 100]} />
        <meshStandardMaterial
          color={new THREE.Color(0.5, 0.2, 0.9)}
          transparent
          opacity={0.6}
          emissive={new THREE.Color(0.2, 0.05, 0.4)}
          emissiveIntensity={0.8}
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Ring system 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 2.5, 0.2, 0]}>
        <torusGeometry args={[7.5, 0.15, 6, 100]} />
        <meshStandardMaterial
          color={new THREE.Color(0.2, 0.4, 0.9)}
          transparent
          opacity={0.4}
          emissive={new THREE.Color(0.05, 0.15, 0.4)}
          emissiveIntensity={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Polar glow top */}
      <pointLight color={new THREE.Color(0.4, 0.2, 1.0)} intensity={2} distance={15} position={[0, 5, 0]} />
      <pointLight color={new THREE.Color(0.2, 0.4, 1.0)} intensity={1.5} distance={12} position={[0, -5, 0]} />
    </group>
  );
}
