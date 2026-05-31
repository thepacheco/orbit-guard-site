'use client';

import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { OBJLoader } from 'three-stdlib';
import * as THREE from 'three';

// Preload the meshes so they're cached before the viewer mounts (reduces the
// visible "pop-in" delay on first paint).
useLoader.preload(OBJLoader, '/assets/models/Snap_Top/Snap_Top.obj');
useLoader.preload(OBJLoader, '/assets/models/Snap_Bottom/Snap_Bottom.obj');

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
  const groupRef = useRef<THREE.Group>(null);

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
    // "Cracking an egg" separation: twist in opposite directions + a gentle
    // hinge tilt while opening, rather than a robotic lateral slide.
    const targetY = exploded ? 60 : 0;          // pull-apart gap so pieces don't touch
    const targetTwist = exploded ? 0.5 : 0;     // opposite Y-rotation (radians)
    const targetTilt = exploded ? 0.28 : 0;     // gentle hinge/tilt about X
    const k = 10 * delta;                        // lerp factor (eased)

    if (topRef.current) {
      topRef.current.position.y = THREE.MathUtils.lerp(topRef.current.position.y, targetY, k);
      topRef.current.rotation.y = THREE.MathUtils.lerp(topRef.current.rotation.y, targetTwist, k);
      topRef.current.rotation.x = THREE.MathUtils.lerp(topRef.current.rotation.x, targetTilt, k);
    }
    // Scale the whole assembly down when detached so the separated halves stay
    // in frame. Done on the model group (not the camera) so it never fights
    // OrbitControls — smooth, no snap-back.
    if (groupRef.current) {
      const targetScale = exploded ? 0.5 : 1;
      const s = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, k);
      groupRef.current.scale.setScalar(s);
    }
    if (bottomRef.current) {
      bottomRef.current.position.y = THREE.MathUtils.lerp(bottomRef.current.position.y, -targetY, k);
      bottomRef.current.rotation.y = THREE.MathUtils.lerp(bottomRef.current.rotation.y, -targetTwist, k);
      bottomRef.current.rotation.x = THREE.MathUtils.lerp(bottomRef.current.rotation.x, -targetTilt, k);
    }
  });

  return (
    <group dispose={null} ref={groupRef}>
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
      <Canvas dpr={[1, 2]} frameloop="always" camera={{ position: cameraPosition, fov: 45 }}>
        <Suspense fallback={null}>
          {/* Local lighting (no remote HDR fetch) keeps load fast and reliable */}
          <ambientLight intensity={0.7} />
          <hemisphereLight intensity={0.5} groundColor="#444" />
          <directionalLight position={[5, 8, 6]} intensity={1.1} />
          <directionalLight position={[-6, 3, -4]} intensity={0.5} />
          <Center>
            <Model topColor={topColor} bottomColor={bottomColor} exploded={exploded} />
          </Center>
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
