import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

/* Liquid orb that gently distorts and follows the cursor */
function LiquidOrb({
  position,
  color,
  scale = 1,
  speed = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t * speed) * 0.15;
    ref.current.rotation.x = t * 0.15 * speed;
    ref.current.rotation.y = t * 0.2 * speed;
    // gentle parallax to cursor
    const { x, y } = state.pointer;
    ref.current.position.x = position[0] + x * 0.3;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      {/* @ts-expect-error drei material props */}
      <MeshDistortMaterial
        color={color}
        speed={1.4}
        distort={0.45}
        roughness={0.15}
        metalness={0.6}
      />
    </mesh>
  );
}

/* Stylised bottle silhouette built from primitives */
function Bottle() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      x * 0.5 + t * 0.15,
      0.05,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -y * 0.25,
      0.05,
    );
  });
  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.6}>
      <group ref={group} position={[0, -0.2, 0]}>
        {/* body */}
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.55, 0.55, 1.6, 64]} />
          <meshPhysicalMaterial
            color="#3b82f6"
            transmission={0.85}
            thickness={1.2}
            roughness={0.05}
            metalness={0.2}
            clearcoat={1}
            ior={1.4}
            attenuationColor="#60a5fa"
            attenuationDistance={1.4}
          />
        </mesh>
        {/* shoulder */}
        <mesh position={[0, 0.5, 0]}>
          <coneGeometry args={[0.55, 0.45, 64]} />
          <meshPhysicalMaterial
            color="#3b82f6"
            transmission={0.85}
            thickness={1}
            roughness={0.05}
            metalness={0.2}
            clearcoat={1}
            ior={1.4}
          />
        </mesh>
        {/* neck */}
        <mesh position={[0, 0.88, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.3, 32]} />
          <meshPhysicalMaterial
            color="#60a5fa"
            transmission={0.7}
            thickness={0.6}
            roughness={0.1}
            metalness={0.3}
          />
        </mesh>
        {/* cap */}
        <mesh position={[0, 1.08, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.14, 32]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.3} />
        </mesh>
        {/* label */}
        <mesh position={[0, -0.4, 0.56]}>
          <planeGeometry args={[0.9, 0.7]} />
          <meshStandardMaterial
            color="#0b1d3a"
            metalness={0.4}
            roughness={0.4}
            emissive="#1e3a8a"
            emissiveIntensity={0.15}
          />
        </mesh>
      </group>
    </Float>
  );
}

export function AmbientScene() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.4} color="#60a5fa" />
      <pointLight position={[-6, -3, 3]} intensity={1} color="#7c3aed" />
      <Suspense fallback={null}>
        <LiquidOrb position={[-3, 1, -1]} color="#3b82f6" scale={1.6} speed={0.6} />
        <LiquidOrb position={[3.2, -1.2, -0.5]} color="#6366f1" scale={1.2} speed={0.9} />
        <LiquidOrb position={[0, 2.2, -2]} color="#0ea5e9" scale={0.9} speed={1.2} />
      </Suspense>
    </Canvas>
  );
}

export function HeroBottle() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 3.6], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} color="#ffffff" />
      <pointLight position={[-3, -2, 2]} intensity={1.2} color="#60a5fa" />
      <pointLight position={[2, -3, -2]} intensity={0.8} color="#a78bfa" />
      <Suspense fallback={null}>
        <Environment preset="city" />
        <Bottle />
      </Suspense>
    </Canvas>
  );
}
