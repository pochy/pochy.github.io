'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere({ scrollProgress }: { scrollProgress: number }) {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!sphereRef.current) return;
    const time = state.clock.elapsedTime;
    sphereRef.current.rotation.y = time * 0.3 + scrollProgress * 2;
    sphereRef.current.rotation.z = time * 0.1;
  });

  return (
    <Sphere ref={sphereRef} args={[1, 100, 100]}>
      <MeshDistortMaterial
        color="#8b5cf6"
        attach="material"
        distort={0.3 + scrollProgress * 0.5}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

interface ScrollSectionProps {
  title: string;
  description: string;
  color: string;
}

export default function ScrollSection({ title, description, color }: ScrollSectionProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(
        0,
        Math.min(1, 1 - (rect.top / windowHeight))
      );

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={sectionRef} className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color={color} />
          <AnimatedSphere scrollProgress={scrollProgress} />
        </Canvas>
      </div>

      <div
        className="relative z-10 max-w-4xl mx-auto px-8 text-center transition-all duration-700"
        style={{
          opacity: scrollProgress,
          transform: `translateY(${(1 - scrollProgress) * 50}px)`,
        }}
      >
        <h2
          className="text-5xl md:text-7xl font-bold mb-6"
          style={{
            background: `linear-gradient(to right, ${color}, #fff)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {title}
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
