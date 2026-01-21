'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

function WobbleBox({ isHovered }: { isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;
    meshRef.current.scale.setScalar(isHovered ? 1.2 : 1);
  });

  return (
    <RoundedBox ref={meshRef} args={[1.5, 1.5, 1.5]} radius={0.1} smoothness={4}>
      <MeshWobbleMaterial
        color={isHovered ? '#06b6d4' : '#8b5cf6'}
        factor={isHovered ? 1 : 0.3}
        speed={isHovered ? 3 : 1}
        roughness={0.2}
        metalness={0.8}
      />
    </RoundedBox>
  );
}

interface InteractiveCardProps {
  title: string;
  description: string;
  link: string;
}

export default function InteractiveCard({ title, description, link }: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={link}
      className="group relative block h-96 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#06b6d4" />
          <WobbleBox isHovered={isHovered} />
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
        <h3 className="text-3xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-300 text-lg">
          {description}
        </p>
        <div className="mt-4 flex items-center text-purple-400 group-hover:translate-x-2 transition-transform">
          <span className="mr-2">Explore</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </a>
  );
}
