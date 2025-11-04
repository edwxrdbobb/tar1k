import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ShaderMaterial = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_colorA: { value: new THREE.Color('#ff4d00') },
      u_colorB: { value: new THREE.Color('#000000') },
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

    // Noise function
    float noise(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    void main() {
      vec2 uv = vUv;
      vec2 center = vec2(0.5, 0.5);
      
      // Create radial gradient from center
      float dist = distance(uv, center);
      
      // Animated waves
      float wave1 = sin(dist * 15.0 - u_time * 0.5) * 0.5 + 0.5;
      float wave2 = sin(uv.x * 10.0 + u_time * 0.3) * 0.5 + 0.5;
      float wave3 = cos(uv.y * 12.0 - u_time * 0.4) * 0.5 + 0.5;
      
      // Create flowing pattern
      float pattern = (wave1 + wave2 * wave3) * 0.5;
      
      // Add turbulence
      float turbulence = noise(uv * 5.0 + u_time * 0.1) * 0.3;
      pattern += turbulence;
      
      // Create dramatic gradient
      vec3 color = mix(u_colorA, u_colorB, pattern);
      
      // Add vignette
      float vignette = smoothstep(1.2, 0.3, dist);
      color *= vignette;
      
      // Reduce opacity for subtle effect
      gl_FragColor = vec4(color, 0.25);
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
