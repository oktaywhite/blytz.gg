'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  Float, 
  MeshTransmissionMaterial, 
  Edges, 
  Box
} from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function TechArtifact() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.2;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x = -t * 0.4;
      coreRef.current.rotation.z = t * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef}>
        <Box ref={coreRef} args={[1.5, 1.5, 1.5]}>
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={1}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.1}
            clearcoat={1}
            attenuationDistance={0.5}
            attenuationColor="#CCFF00"
            color="#050505"
          />
          <Edges threshold={15} color="#CCFF00" scale={1.05} />
        </Box>

        {/* Outer Rotating Rings */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.2, 0.02, 16, 100]} />
          <meshBasicMaterial color="#CCFF00" transparent opacity={0.3} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[2.5, 0.01, 16, 100]} />
          <meshBasicMaterial color="#FF00FF" transparent opacity={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#CCFF00" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#FF00FF" />
        
        <TechArtifact />
        
        <fog attach="fog" args={['#0A0A0A', 10, 35]} />
      </Canvas>
    </div>
  );
}
