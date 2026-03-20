import { Canvas } from "@react-three/fiber";
import { Suspense, Component, ErrorInfo, ReactNode } from "react";

class WebGLBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(_e: Error, _i: ErrorInfo) {}
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export default function PageCanvas({ children }: { children: ReactNode }) {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
      <WebGLBoundary>
        <Canvas
          camera={{ position: [0, 0, 20], fov: 65, near: 0.1, far: 2000 }}
          gl={{ antialias: false, powerPreference: "high-performance", alpha: true, failIfMajorPerformanceCaveat: false }}
          dpr={[1, 1.5]}
          style={{ background: "transparent" }}
          onCreated={({ gl }) => { gl.setClearAlpha(0); }}
        >
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      </WebGLBoundary>
    </div>
  );
}
