'use client';

import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, TransformControls, Center } from '@react-three/drei';
import { OBJLoader } from 'three-stdlib';
import * as THREE from 'three';

// Preload the meshes
useLoader.preload(OBJLoader, '/assets/models/Snap_Top/Snap_Top.obj');
useLoader.preload(OBJLoader, '/assets/models/Snap_Bottom/Snap_Bottom.obj');

export type ModelConfig = {
  id: string;
  topColor: string;
  bottomColor: string;
  exploded: boolean;
  float: boolean;
  spin: boolean;
  position: [number, number, number];
};

interface Playground3DViewerProps {
  models: ModelConfig[];
  activeId: string;
  onSelectModel: (id: string) => void;
  onUpdatePosition: (id: string, position: [number, number, number]) => void;
  cameraPosition?: [number, number, number];
}

function Model({ topColor, bottomColor, exploded, spin = false, spinSpeed = 0.45, float = false }: Omit<ModelConfig, 'id' | 'position'> & { spinSpeed?: number }) {
  const topObj = useLoader(OBJLoader, '/assets/models/Snap_Top/Snap_Top.obj');
  const bottomObj = useLoader(OBJLoader, '/assets/models/Snap_Bottom/Snap_Bottom.obj');

  const topMesh = useMemo(() => topObj.clone(), [topObj]);
  const bottomMesh = useMemo(() => bottomObj.clone(), [bottomObj]);
  const topRef = useRef<THREE.Group>(null);
  const bottomRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);
  const firstFrame = useRef(true);

  useMemo(() => {
    // The OBJ names are inversely mapped to their physical positions:
    // topMesh (Snap_Top.obj) is physically the BOTTOM piece (the cup).
    // bottomMesh (Snap_Bottom.obj) is physically the TOP piece (the ring).
    // When float=false (upright), topMesh is the visual bottom, so it gets bottomColor.
    // When float=true (flipped), topMesh is the visual top, so it gets topColor.
    const topMeshColor = float ? topColor : bottomColor;
    const bottomMeshColor = float ? bottomColor : topColor;

    const topMat = new THREE.MeshStandardMaterial({
      color: topMeshColor,
      roughness: 0.62,
      metalness: 0.0,
    });
    const bottomMat = new THREE.MeshStandardMaterial({
      color: bottomMeshColor,
      roughness: 0.62,
      metalness: 0.0,
    });

    topMesh.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = topMat;
      }
    });

    bottomMesh.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = bottomMat;
      }
    });
  }, [topMesh, bottomMesh, topColor, bottomColor, float]);

  useFrame((state, delta) => {
    const targetY = exploded ? 60 : 0;
    const targetTwist = exploded ? 0.5 : 0;
    const targetTilt = exploded ? 0.28 : 0;
    const isFirst = firstFrame.current;
    const k = isFirst ? 1 : 10 * delta;
    if (isFirst) firstFrame.current = false;

    if (topRef.current) {
      topRef.current.position.y = THREE.MathUtils.lerp(topRef.current.position.y, targetY, k);
      topRef.current.rotation.y = THREE.MathUtils.lerp(topRef.current.rotation.y, targetTwist, k);
      topRef.current.rotation.x = THREE.MathUtils.lerp(topRef.current.rotation.x, targetTilt, k);
    }
    
    if (groupRef.current) {
      const targetScale = exploded ? 0.5 : 1;
      const s = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, k);
      groupRef.current.scale.setScalar(s);
      
      if (spin) {
        groupRef.current.rotation.y += spinSpeed * delta;
      }
      
      if (float) {
        const time = state.clock.getElapsedTime();
        // A subtle, calming bob and sway
        groupRef.current.position.y = Math.sin(time * 2) * 0.1;
        groupRef.current.rotation.x = Math.sin(time * 1.5) * 0.05 + Math.PI; // upside down
        groupRef.current.rotation.z = Math.cos(time * 1.5) * 0.05;
      } else {
        groupRef.current.position.y = 0;
        groupRef.current.rotation.x = 0;
        groupRef.current.rotation.z = 0;
      }
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* Physical bottom piece (cup) -> loaded from Snap_Top.obj */}
      <group ref={topRef} position={[0, 0, 0]}>
        <primitive object={topMesh} scale={0.01} rotation={[-Math.PI / 2, 0, 0]} />
      </group>
      
      {/* Physical top piece (ring) -> loaded from Snap_Bottom.obj */}
      <group ref={bottomRef} position={[0, 0, 0]}>
        <primitive object={bottomMesh} scale={0.01} rotation={[-Math.PI / 2, 0, 0]} />
      </group>
    </group>
  );
}

function InteractiveModel({ 
  config, 
  isActive, 
  onSelect, 
  onUpdatePosition 
}: { 
  config: ModelConfig; 
  isActive: boolean; 
  onSelect: (id: string) => void;
  onUpdatePosition: (id: string, pos: [number, number, number]) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  
  return (
    <TransformControls
      position={config.position}
      mode="translate"
      showX={isActive} showY={false} showZ={isActive}
      size={0.6}
      onMouseUp={(e) => {
        const target = (e as any)?.target;
        if (target && target.worldPosition) {
           const p = target.worldPosition;
           onUpdatePosition(config.id, [p.x, p.y, p.z]);
        }
      }}
    >
      <group 
        ref={groupRef}
        onClick={(e) => { 
          e.stopPropagation(); 
          onSelect(config.id); 
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <Center>
          <Model 
            topColor={config.topColor}
            bottomColor={config.bottomColor}
            exploded={config.exploded}
            spin={config.spin}
            float={config.float}
          />
        </Center>
        
        {/* Selection highlight ring */}
        {isActive && (
          <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.55, 0.6, 32]} />
            <meshBasicMaterial color="#5A74FF" side={THREE.DoubleSide} transparent opacity={0.5} />
          </mesh>
        )}
      </group>
    </TransformControls>
  );
}

export default function Playground3DViewer({
  models,
  activeId,
  onSelectModel,
  onUpdatePosition,
  cameraPosition = [104.74, -96.92, 138.54]
}: Playground3DViewerProps) {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: 400, position: 'relative', zIndex: 10, touchAction: 'none' }}>
      <Canvas
        dpr={[1, 2]}
        frameloop="always"
        gl={{
          preserveDrawingBuffer: true,
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.NoToneMapping,
        }}
        camera={{ position: cameraPosition, fov: 45 }}
      >
        <Suspense fallback={null}>
          {/* Neutral studio lighting without color casts */}
          <ambientLight intensity={0.85} color="#ffffff" />
          <directionalLight position={[5, 8, 6]} intensity={1.2} color="#ffffff" />
          <directionalLight position={[-5, 3, -4]} intensity={0.6} color="#ffffff" />
          
          {/* Subtle floor grid for grounding */}
          <gridHelper args={[20, 20, '#e5e7eb', '#f3f4f6']} position={[0, -0.06, 0]} />

          {models.map(m => (
            <InteractiveModel
              key={m.id}
              config={m}
              isActive={m.id === activeId}
              onSelect={onSelectModel}
              onUpdatePosition={onUpdatePosition}
            />
          ))}

          {/* makeDefault is crucial here so TransformControls can disable orbiting while dragging */}
          <OrbitControls 
            makeDefault
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2 - 0.05} // don't go below floor
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
