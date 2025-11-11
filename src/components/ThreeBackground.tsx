import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  const particleCount = 800; // Reduced from 2000 for better performance

  // Generate random particle positions and store originals
  const { particlesPosition, originalPositions } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const originals = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Spread particles in a 3D space
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      // Store original positions
      originals[i3] = x;
      originals[i3 + 1] = y;
      originals[i3 + 2] = z;
    }

    return { particlesPosition: positions, originalPositions: originals };
  }, []);

  // Create color array for gradient effect (purple to blue)
  const particlesColor = useMemo(() => {
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const mixFactor = Math.random();

      // Purple: rgb(168, 85, 247) -> Blue: rgb(96, 165, 250)
      colors[i3] = 168 / 255 + mixFactor * ((96 - 168) / 255);     // r
      colors[i3 + 1] = 85 / 255 + mixFactor * ((165 - 85) / 255);  // g
      colors[i3 + 2] = 247 / 255 + mixFactor * ((250 - 247) / 255); // b
    }

    return colors;
  }, []);

  // Mouse move listener
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop
  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    // Animate each particle
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Get original position
      const origX = originalPositions[i3];
      const origY = originalPositions[i3 + 1];
      const origZ = originalPositions[i3 + 2];

      // Calculate floating motion based on original position
      const floatX = Math.cos(time * 0.1 + origY * 0.5) * 0.1;
      const floatY = Math.sin(time * 0.15 + origX * 0.5) * 0.1;

      // Start from original position plus floating motion
      let newX = origX + floatX;
      let newY = origY + floatY;

      // Mouse interaction - each particle responds individually
      const mouseX = mousePosition.current.x * 10;
      const mouseY = mousePosition.current.y * 10;

      const dx = newX - mouseX;
      const dy = newY - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const interactionRadius = 4;

      if (distance < interactionRadius && distance > 0) {
        const force = (interactionRadius - distance) / interactionRadius;
        const pushStrength = force * force * 0.8;
        newX += (dx / distance) * pushStrength;
        newY += (dy / distance) * pushStrength;
      }

      // Apply new positions
      positions[i3] = newX;
      positions[i3 + 1] = newY;
      positions[i3 + 2] = origZ;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Very slow rotation of entire particle field
    pointsRef.current.rotation.y = time * 0.02;
    pointsRef.current.rotation.x = Math.sin(time * 0.05) * 0.08;
  });

  return (
    <Points ref={pointsRef} positions={particlesPosition} stride={3}>
      <PointMaterial
        transparent
        vertexColors
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
          args={[particlesPosition, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesColor.length / 3}
          array={particlesColor}
          itemSize={3}
          args={[particlesColor, 3]}
        />
      </bufferGeometry>
    </Points>
  );
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ParticleField />
      </Canvas>
    </div>
  );
}
