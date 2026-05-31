'use client';

import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { OBJLoader } from 'three-stdlib';
import * as THREE from 'three';

interface Product3DViewerProps {
  topColor: string;
  bottomColor: string;
  exploded?: boolean;
  autoRotate?: boolean;
  interactive?: boolean;
  cameraPosition?: [number, number, number];
}

function Model({ topColor, bottomColor, exploded }: Product3DViewerProps) {
  const topObj = useLoader(OBJLoader, '/assets/models/Snap_Top/Snap_Top.obj');
  const bottomObj = useLoader(OBJLoader, '/assets/models/Snap_Bottom/Snap_Bottom.obj');

  const topMesh = useMemo(() => topObj.clone(), [topObj]);
  const bottomMesh = useMemo(() => bottomObj.clone(), [bottomObj]);
  const topRef = useRef<THREE.Group>(null);
  const bottomRef = useRef<THREE.Group>(null);

  useMemo(() => {
    const topMat = new THREE.MeshStandardMaterial({
      color: topColor,
      roughness: 0.3,
      metalness: 0.1,
    });
    const bottomMat = new THREE.MeshStandardMaterial({
      color: bottomColor,
      roughness: 0.3,
      metalness: 0.1,
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
  }, [topMesh, bottomMesh, topColor, bottomColor]);

  useFrame((state, delta) => {
    // Increased distance for a clearer "detach" so pieces don't touch
    const targetY = exploded ? 90 : 0; 
    if (topRef.current) {
      topRef.current.position.y = THREE.MathUtils.lerp(topRef.current.position.y, targetY, 14 * delta);
    }
    if (bottomRef.current) {
      bottomRef.current.position.y = THREE.MathUtils.lerp(bottomRef.current.position.y, -targetY, 14 * delta);
    }
  });

  return (
    <group dispose={null}>
      <group ref={topRef}>
        <primitive object={topMesh} />
      </group>
      <group ref={bottomRef}>
        <primitive object={bottomMesh} />
      </group>
    </group>
  );
}

export default function Product3DViewer({
  topColor,
  bottomColor,
  exploded,
  autoRotate = true,
  interactive = true,
  cameraPosition = [0, 0, 4.5]
}: Product3DViewerProps) {
  // Debug mode: add ?camlog=1 to the URL to freeze auto-rotation and log the
  // camera position to the console as you drag, so an exact starting angle can
  // be captured and baked in as `cameraPosition`.
  const camLog = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('camlog');

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 400, position: 'relative', zIndex: 10 }}>
      <Canvas dpr={[1, 2]} camera={{ position: cameraPosition, fov: 45 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6} adjustCamera={1.3} shadows={false}>
            <Model topColor={topColor} bottomColor={bottomColor} exploded={exploded} />
          </Stage>
          {(interactive || camLog) && (
            <OrbitControls
              autoRotate={camLog ? false : autoRotate}
              autoRotateSpeed={1.0}
              enablePan={false}
              enableZoom={camLog}
              enableRotate={interactive || camLog}
              onEnd={camLog ? ((e: any) => {
                const p = e?.target?.object?.position;
                if (p) {
                  // eslint-disable-next-line no-console
                  console.log('cameraPosition={[' + p.x.toFixed(2) + ', ' + p.y.toFixed(2) + ', ' + p.z.toFixed(2) + ']}');
                }
              }) : undefined}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
