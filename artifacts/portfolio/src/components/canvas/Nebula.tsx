import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Nebula() {
  const nebulaRef = useRef<THREE.Points>(null);
  const count = 2000;

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 30 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.5;

      positions[i3] = radius * Math.cos(theta) * Math.cos(phi) - 10;
      positions[i3 + 1] = radius * Math.sin(phi) * 0.5;
      positions[i3 + 2] = radius * Math.sin(theta) * Math.cos(phi) - 20;

      const mix = Math.random();
      if (mix < 0.5) {
        colors[i3] = 0.5 + mix * 0.5;
        colors[i3 + 1] = 0.1;
        colors[i3 + 2] = 0.8 + mix * 0.2;
      } else {
        colors[i3] = 0.1;
        colors[i3 + 1] = 0.3 + mix * 0.3;
        colors[i3 + 2] = 0.7 + mix * 0.3;
      }
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!nebulaRef.current) return;
    const t = state.clock.getElapsedTime();
    nebulaRef.current.rotation.y = t * 0.005;
    nebulaRef.current.rotation.z = Math.sin(t * 0.003) * 0.1;
  });

  return (
    <points ref={nebulaRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.4}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
