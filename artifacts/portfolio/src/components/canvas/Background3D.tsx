import { Canvas } from "@react-three/fiber";
import { Suspense, Component, ErrorInfo, ReactNode } from "react";
import Scene from "./Scene";

class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(_error: Error, _info: ErrorInfo) {}
  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}

interface Background3DProps {
  mouseX: number;
  mouseY: number;
  activeSection: string;
}

export default function Background3D({ mouseX, mouseY, activeSection }: Background3DProps) {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
      <WebGLErrorBoundary fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 15], fov: 65, near: 0.1, far: 2000 }}
          gl={{ antialias: false, powerPreference: "high-performance", alpha: true, failIfMajorPerformanceCaveat: false }}
          dpr={[1, 1.5]}
          style={{ background: "transparent" }}
          onCreated={({ gl }) => { gl.setClearAlpha(0); }}
        >
          <Suspense fallback={null}>
            <Scene mouseX={mouseX} mouseY={mouseY} activeSection={activeSection} />
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
