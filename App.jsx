import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, OrbitControls, useGLTF } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";

// Shared material for this small test scene.
const glowMaterial = new THREE.MeshStandardMaterial({
  color: "#ffcf70",
  emissive: "#ffb52e",
  emissiveIntensity: 4,
  toneMapped: false,
  side: THREE.DoubleSide,
});

function Sparkle() {
  const { scene } = useGLTF("/models/sparkle.glb");

  const model = useMemo(() => {
    const copy = scene.clone(true);

    copy.traverse((object) => {
      if (object.isMesh) {
        object.material = glowMaterial;
      }
    });

    return copy;
  }, [scene]);

  return <primitive object={model} />;
}

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <color attach="background" args={["#19131f"]} />

        <Suspense fallback={null}>
          <Bounds fit clip observe margin={1.5}>
            <Sparkle />
          </Bounds>
        </Suspense>

        <OrbitControls />

        <EffectComposer>
          <Bloom
            mipmapBlur
            luminanceThreshold={1}
            intensity={1.5}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}