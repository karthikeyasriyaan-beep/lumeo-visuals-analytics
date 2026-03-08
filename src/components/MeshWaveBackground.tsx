import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function WaveMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.PlaneGeometry>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color("#111111") },
      uColor2: { value: new THREE.Color("#222222") },
      uColor3: { value: new THREE.Color("#0a0a0a") },
    }),
    []
  );

  const vertexShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;
    
    void main() {
      vUv = uv;
      vec3 pos = position;
      
      float wave1 = sin(pos.x * 1.5 + uTime * 0.4) * 0.3;
      float wave2 = sin(pos.y * 2.0 + uTime * 0.3) * 0.2;
      float wave3 = cos(pos.x * 1.0 + pos.y * 1.0 + uTime * 0.5) * 0.25;
      float wave4 = sin(pos.x * 3.0 + uTime * 0.2) * cos(pos.y * 2.5 + uTime * 0.35) * 0.15;
      
      pos.z = wave1 + wave2 + wave3 + wave4;
      vElevation = pos.z;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;
    
    void main() {
      float mixFactor = (vElevation + 0.5) * 0.8;
      vec3 color = mix(uColor1, uColor2, mixFactor);
      color = mix(color, uColor3, sin(vUv.x * 3.14 + uTime * 0.1) * 0.3 + 0.3);
      
      float alpha = 0.6 + vElevation * 0.3;
      gl_FragColor = vec4(color, alpha);
    }
  `;

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry ref={geometryRef} args={[20, 20, 128, 128]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={true}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function MeshWaveBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div className="absolute inset-0 bg-background" />
      <Canvas
        camera={{ position: [0, 3, 8], fov: 60 }}
        style={{ position: "absolute", inset: 0 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <WaveMesh />
      </Canvas>
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-transparent" />
    </div>
  );
}
