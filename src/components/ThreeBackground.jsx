import React from 'react'

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Box() {
  return (
    <mesh rotation={[10, 10, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#22d3ee" />
    </mesh>
  );
}

const ThreeBackground = () => {
  return (
    <div style={{ position: "fixed", height: "100vh", width: "100%", zIndex: -1 }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} />
        <Box />
        <OrbitControls autoRotate />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;