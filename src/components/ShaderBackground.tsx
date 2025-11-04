import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ShaderMaterial = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_colorA: { value: new THREE.Color('#00ff88') },
      u_colorB: { value: new THREE.Color('#0088ff') },
    }),
    []
  );

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float u_time;
    uniform vec3 u_colorA;
    uniform vec3 u_colorB;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      // Create flowing wave pattern
      float wave1 = sin(uv.x * 5.0 + u_time * 0.3) * 0.5 + 0.5;
      float wave2 = sin(uv.y * 8.0 - u_time * 0.2) * 0.5 + 0.5;
      float wave3 = sin((uv.x + uv.y) * 4.0 + u_time * 0.4) * 0.5 + 0.5;
      
      // Combine waves
      float pattern = (wave1 + wave2 + wave3) / 3.0;
      
      // Create color gradient
      vec3 color = mix(u_colorA, u_colorB, pattern);
      
      // Add some noise
      float noise = fract(sin(dot(uv, vec2(12.9898, 78.233)) + u_time * 0.1) * 43758.5453);
      color += noise * 0.03;
      
      gl_FragColor = vec4(color, 0.4);
    }
  `;

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.u_time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[10, 10, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
};

const ShaderBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ShaderMaterial />
      </Canvas>
    </div>
  );
};

export default ShaderBackground;
