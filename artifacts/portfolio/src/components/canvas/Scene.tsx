import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import StarField from "./StarField";
import Nebula from "./Nebula";
import Meteors from "./Meteors";

interface SceneProps {
  mouseX: number;
  mouseY: number;
}

export default function Scene({ mouseX, mouseY }: SceneProps) {
  const { camera } = useThree();
  const targetX = useRef(0);
  const targetY = useRef(0);
  const scaleProgress = useRef(0);

  useEffect(() => {
    camera.position.set(0, 0, 10);
  }, [camera]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    targetX.current += (mouseX * 3 - targetX.current) * 0.03;
    targetY.current += (mouseY * 2 - targetY.current) * 0.03;

    camera.position.x += (targetX.current - camera.position.x) * 0.05;
    camera.position.y += (targetY.current - camera.position.y) * 0.05;

    scaleProgress.current = Math.min(1, scaleProgress.current + 0.005);
    const zoomIn = THREE.MathUtils.lerp(20, 10, scaleProgress.current);
    camera.position.z += (zoomIn - camera.position.z) * 0.02;

    camera.rotation.z = Math.sin(t * 0.08) * 0.008;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <StarField />
      <Nebula />
      <Meteors />
    </>
  );
}
