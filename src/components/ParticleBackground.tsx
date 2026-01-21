'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// リップル（波紋）のデータ構造
interface Ripple {
  x: number;
  z: number;
  startTime: number;
  amplitude: number;
  speed: number;
  wavelength: number;
}

interface ParticlesProps {
  resolution?: number;
  spacing?: number;
  rippleCount?: number;
  rippleInterval?: number;
}

function Particles({
  resolution = 60,
  spacing = 0.4,
  rippleCount = 3,
  rippleInterval = 2.0,
}: ParticlesProps) {
  const points = useRef<THREE.Points>(null);
  const particleCount = resolution * resolution;
  const basePositions = useRef<Float32Array | null>(null);
  const ripples = useRef<Ripple[]>([]);
  const lastRippleTime = useRef(0);

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const basePos = new Float32Array(particleCount * 3);

    const offsetX = -(resolution * spacing) / 2;
    const offsetZ = -(resolution * spacing) / 2;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = i % resolution;
      const z = Math.floor(i / resolution);

      // グリッドベースの配置
      const xPos = offsetX + x * spacing;
      const zPos = offsetZ + z * spacing;

      // 初期位置を保存
      basePos[i3] = xPos;
      basePos[i3 + 1] = 0;
      basePos[i3 + 2] = zPos;

      // 初期位置を設定
      positions[i3] = xPos;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = zPos;

      // 初期色（青系）
      colors[i3] = 0.1; // R
      colors[i3 + 1] = 0.3; // G
      colors[i3 + 2] = 0.9; // B
    }

    basePositions.current = basePos;
    return [positions, colors];
  }, [particleCount, resolution, spacing]);

  // リップルを生成する関数
  const createRipple = (time: number) => {
    const ripple: Ripple = {
      x: (Math.random() - 0.5) * (resolution * spacing * 0.6),
      z: (Math.random() - 0.5) * (resolution * spacing * 0.6),
      startTime: time,
      amplitude: 1.5 + Math.random() * 1.0,
      speed: 2.0 + Math.random() * 1.0,
      wavelength: 3.0 + Math.random() * 2.0,
    };
    ripples.current.push(ripple);
    
    // 古いリップルを削除（最大数制限）
    if (ripples.current.length > rippleCount) {
      ripples.current.shift();
    }
  };

  useFrame((state) => {
    if (!points.current || !basePositions.current) return;

    const time = state.clock.elapsedTime;
    
    // 定期的に新しいリップルを生成
    if (time - lastRippleTime.current > rippleInterval) {
      createRipple(time);
      lastRippleTime.current = time;
    }

    const positions = points.current.geometry.attributes.position.array as Float32Array;
    const colors = points.current.geometry.attributes.color.array as Float32Array;

    // 各パーティクルの高さをリセット
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const baseX = basePositions.current[i3];
      const baseZ = basePositions.current[i3 + 2];

      let totalHeight = 0;
      let maxIntensity = 0;

      // すべてのリップルの影響を計算
      for (const ripple of ripples.current) {
        const elapsed = time - ripple.startTime;
        if (elapsed < 0) continue;

        // リップルからの距離
        const dx = baseX - ripple.x;
        const dz = baseZ - ripple.z;
        const distance = Math.sqrt(dx * dx + dz * dz);
        
        // 波の伝播距離
        const waveDistance = elapsed * ripple.speed;
        const waveRadius = waveDistance;
        
        // 波の範囲内かチェック
        const waveDiff = Math.abs(distance - waveRadius);
        
        if (waveDiff < ripple.wavelength * 2) {
          // サイン波で波の高さを計算
          const wavePhase = (distance - waveRadius) / ripple.wavelength;
          const waveHeight = Math.sin(wavePhase * Math.PI * 2) * ripple.amplitude;
          
          // 距離による減衰
          const attenuation = Math.max(0, 1 - waveDiff / (ripple.wavelength * 2));
          const height = waveHeight * attenuation * (1 / (1 + distance * 0.1));
          
          totalHeight += height;
          maxIntensity = Math.max(maxIntensity, Math.abs(height));
        }
      }

      // 高さを適用
      positions[i3 + 1] = totalHeight;

      // 高さに基づくグラデーション色付け（青系）
      const normalizedIntensity = Math.min(1.0, maxIntensity / 2.0);
      
      // 深い青から明るいシアン/白へのグラデーション
      const r = 0.1 + normalizedIntensity * 0.3; // 青系を維持
      const g = 0.3 + normalizedIntensity * 0.6; // シアン寄り
      const b = 0.9 + normalizedIntensity * 0.1; // 明るい青

      colors[i3] = r;
      colors[i3 + 1] = g;
      colors[i3 + 2] = b;
    }

    points.current.geometry.attributes.position.needsUpdate = true;
    points.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={particleCount}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={particleCount}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        fog={false}
      />
    </points>
  );
}

// カメラの向きを調整するコンポーネント
function CameraController() {
  const { camera } = useThree();
  
  useEffect(() => {
    // カメラをパーティクルシーの中心を見るように設定
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  return null;
}

export default function ParticleBackground() {
  return (
    <div 
      className="fixed inset-0 z-0" 
      id="particleBackground" 
      style={{ 
        pointerEvents: 'none',
        filter: 'blur(1px)',
        backdropFilter: 'blur(0.5px)',
      }}
    >
      <Canvas
        camera={{ position: [0, 2, 18], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        <CameraController />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 5, 10]} intensity={0.6} color="#4a9eff" />
        <pointLight position={[0, 3, 5]} intensity={0.3} color="#6bb6ff" />
        <Particles 
          resolution={85}
          spacing={0.4}
          rippleCount={3}
          rippleInterval={2.0}
        />
      </Canvas>
    </div>
  );
}
