import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Meteor {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  lifetime: number;
  age: number;
  trail: THREE.Vector3[];
}

export default function Meteors() {
  const meteorsRef = useRef<Meteor[]>([]);
  const linesGroupRef = useRef<THREE.Group>(null);

  const meteorCount = 6;

  function createMeteor(): Meteor {
    const x = (Math.random() - 0.5) * 120;
    const y = Math.random() * 40 + 20;
    const z = (Math.random() - 0.5) * 60;
    const speed = Math.random() * 0.8 + 0.4;
    const angle = Math.random() * 0.4 - 0.2;

    return {
      position: new THREE.Vector3(x, y, z),
      velocity: new THREE.Vector3(-speed + angle, -speed * 0.6, -0.1),
      lifetime: Math.random() * 2 + 1,
      age: 0,
      trail: [],
    };
  }

  const meteors = useMemo(() => {
    const arr: Meteor[] = [];
    for (let i = 0; i < meteorCount; i++) {
      const m = createMeteor();
      m.age = Math.random() * m.lifetime;
      arr.push(m);
    }
    meteorsRef.current = arr;
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!linesGroupRef.current) return;
    const group = linesGroupRef.current;

    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    meteorsRef.current.forEach((meteor, idx) => {
      meteor.age += delta;

      if (meteor.age > meteor.lifetime) {
        const newMeteor = createMeteor();
        meteorsRef.current[idx] = newMeteor;
        return;
      }

      meteor.position.add(meteor.velocity.clone().multiplyScalar(delta * 30));
      meteor.trail.push(meteor.position.clone());
      if (meteor.trail.length > 12) meteor.trail.shift();

      if (meteor.trail.length < 2) return;

      const progress = meteor.age / meteor.lifetime;
      const opacity = progress < 0.1
        ? progress * 10
        : progress > 0.8
        ? (1 - progress) * 5
        : 1;

      const points = meteor.trail;
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color(0.7, 0.8, 1.0),
        transparent: true,
        opacity: opacity * 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const line = new THREE.Line(geometry, material);
      group.add(line);

      const headGeo = new THREE.SphereGeometry(0.08, 4, 4);
      const headMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(1.0, 0.95, 0.8),
        transparent: true,
        opacity: opacity,
      });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.copy(meteor.position);
      group.add(head);
    });
  });

  return <group ref={linesGroupRef} />;
}
