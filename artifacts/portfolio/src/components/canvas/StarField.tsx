import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function StarField() {
  const starsRef = useRef<THREE.Points>(null);
  const count = 8000;

  const { positions, sizes, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 200;
      positions[i3 + 1] = (Math.random() - 0.5) * 200;
      positions[i3 + 2] = (Math.random() - 0.5) * 200;

      sizes[i] = Math.random() * 2 + 0.5;

      const r = Math.random();
      if (r < 0.3) {
        colors[i3] = 0.7 + Math.random() * 0.3;
        colors[i3 + 1] = 0.5 + Math.random() * 0.3;
        colors[i3 + 2] = 1.0;
      } else if (r < 0.6) {
        colors[i3] = 0.8 + Math.random() * 0.2;
        colors[i3 + 1] = 0.8 + Math.random() * 0.2;
        colors[i3 + 2] = 1.0;
      } else {
        colors[i3] = 1.0;
        colors[i3 + 1] = 0.9 + Math.random() * 0.1;
        colors[i3 + 2] = 0.7 + Math.random() * 0.3;
      }
    }

    return { positions, sizes, colors };
  }, []);

  useFrame((state) => {
    if (!starsRef.current) return;
    const t = state.clock.getElapsedTime();
    starsRef.current.rotation.y = t * 0.01;
    starsRef.current.rotation.x = Math.sin(t * 0.005) * 0.05;
  });

  return (
    <points ref={starsRef}>
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
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  );
}
