import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Center } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({ geometry, color, position, rotationSpeed, hoverScale = 1.25, ...props }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smooth float animation
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.22;
    
    // Rotation speed boosts on hover
    meshRef.current.rotation.x += rotationSpeed[0] * (hovered ? 2.5 : 1);
    meshRef.current.rotation.y += rotationSpeed[1] * (hovered ? 2.5 : 1);
    meshRef.current.rotation.z += rotationSpeed[2] * (hovered ? 2.5 : 1);

    // Scale lerping for hover/clicks
    const targetScale = clicked ? hoverScale * 1.35 : hovered ? hoverScale : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        setClicked(true);
        setTimeout(() => setClicked(false), 500);
      }}
      {...props}
    >
      {geometry}
      {/* Flat shaded standard material */}
      <meshStandardMaterial 
        color={color} 
        roughness={0.15}
        metalness={0.1}
        flatShading
      />
      {/* Black outlines (outlines of geometry edges) */}
      <lineSegments>
        <edgesGeometry />
        <lineBasicMaterial color="#000000" linewidth={3.5} />
      </lineSegments>
    </mesh>
  );
}

const NeoBrutalist3D = () => {
  const [cyanColor, setCyanColor] = useState("#22d3ee");
  const [violetColor, setVioletColor] = useState("#a78bfa");

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const computedCyan = window.getComputedStyle(document.documentElement).getPropertyValue("--cyan").trim();
      const computedViolet = window.getComputedStyle(document.documentElement).getPropertyValue("--violet").trim();
      if (computedCyan) setCyanColor(computedCyan);
      if (computedViolet) setVioletColor(computedViolet);
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });

    // Initial load
    const computedCyan = window.getComputedStyle(document.documentElement).getPropertyValue("--cyan").trim();
    const computedViolet = window.getComputedStyle(document.documentElement).getPropertyValue("--violet").trim();
    if (computedCyan) setCyanColor(computedCyan);
    if (computedViolet) setVioletColor(computedViolet);

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ width: "100%", height: "400px", minWidth: "300px" }}>
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-4, -4, -4]} intensity={0.8} />
        
        <Center>
          {/* Main Primary Yellow Cube */}
          <FloatingShape
            geometry={<boxGeometry args={[1.5, 1.5, 1.5]} />}
            color={cyanColor}
            position={[0, 0.2, 0]}
            rotationSpeed={[0.005, 0.008, 0.003]}
            hoverScale={1.2}
          />
          
          {/* Sage Green Torus */}
          <FloatingShape
            geometry={<torusGeometry args={[0.85, 0.32, 12, 32]} />}
            color={violetColor}
            position={[-2.4, -0.6, 0.5]}
            rotationSpeed={[0.008, 0.006, 0.012]}
            hoverScale={1.3}
          />
          
          {/* White Cone */}
          <FloatingShape
            geometry={<coneGeometry args={[0.8, 1.5, 6]} />}
            color="#ffffff"
            position={[2.4, 0.8, -0.5]}
            rotationSpeed={[0.004, 0.01, 0.007]}
            hoverScale={1.25}
          />

          {/* Charcoal Sphere/Octahedron */}
          <FloatingShape
            geometry={<octahedronGeometry args={[0.7, 0]} />}
            color="#171e19"
            position={[1.8, -1.2, 0.8]}
            rotationSpeed={[0.012, 0.005, 0.01]}
            hoverScale={1.35}
          />

          {/* Accent Pink Cylinder */}
          <FloatingShape
            geometry={<cylinderGeometry args={[0.4, 0.4, 1.3, 8]} />}
            color="#ec4899"
            position={[-1.8, 1.4, -0.8]}
            rotationSpeed={[0.006, 0.015, 0.004]}
            hoverScale={1.25}
          />
        </Center>
        
        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>
    </div>
  );
};

export default NeoBrutalist3D;
