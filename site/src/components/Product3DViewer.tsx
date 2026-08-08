'use client';

import React, { Suspense, useMemo, useRef, useEffect } from 'react';
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { OBJLoader } from 'three-stdlib';
import * as THREE from 'three';

useLoader.preload(OBJLoader, '/assets/models/Snap_Top/Snap_Top.obj');
useLoader.preload(OBJLoader, '/assets/models/Snap_Bottom/Snap_Bottom.obj');

interface Product3DViewerProps {
  topColor: string;
  bottomColor: string;
  exploded?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  spin?: boolean;
  spinSpeed?: number;
  float?: boolean;
  interactive?: boolean;
  cameraPosition?: [number, number, number];
  onCameraChange?: (pos: [number, number, number]) => void;
}

function Model({ topColor, bottomColor, exploded, spin = false, spinSpeed = 0.45, float = false }: Product3DViewerProps) {
  const topObj = useLoader(OBJLoader, '/assets/models/Snap_Top/Snap_Top.obj');
  const bottomObj = useLoader(OBJLoader, '/assets/models/Snap_Bottom/Snap_Bottom.obj');

  const topMesh = useMemo(() => topObj.clone(), [topObj]);
  const bottomMesh = useMemo(() => bottomObj.clone(), [bottomObj]);
  const topRef = useRef<THREE.Group>(null);
  const bottomRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);
  const firstFrame = useRef(true);

  useMemo(() => {
    // PHYSICAL MESH MAPPING:
    // Snap_Bottom.obj (bottomMesh) is physical TOP ring -> gets topColor
    // Snap_Top.obj (topMesh) is physical BOTTOM cup -> gets bottomColor
    const topRingColor = topColor;
    const bottomCupColor = bottomColor;

    const topRingMat = new THREE.MeshStandardMaterial({
      color: topRingColor,
      roughness: 0.45,
      metalness: 0.08,
    });
    const bottomCupMat = new THREE.MeshStandardMaterial({
      color: bottomCupColor,
      roughness: 0.45,
      metalness: 0.08,
    });

    topMesh.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = bottomCupMat;
      }
    });

    bottomMesh.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = topRingMat;
      }
    });
  }, [topMesh, bottomMesh, topColor, bottomColor]);

  useFrame((state, delta) => {
    const targetY = exploded ? 60 : 0;
    const targetTwist = exploded ? 0.4 : 0;
    const targetTilt = exploded ? 0.2 : 0;
    const isFirst = firstFrame.current;
    const k = isFirst ? 1 : 10 * delta;
    if (isFirst) firstFrame.current = false;

    if (bottomRef.current) {
      bottomRef.current.position.y = THREE.MathUtils.lerp(bottomRef.current.position.y, targetY, k);
      bottomRef.current.rotation.y = THREE.MathUtils.lerp(bottomRef.current.rotation.y, targetTwist, k);
      bottomRef.current.rotation.x = THREE.MathUtils.lerp(bottomRef.current.rotation.x, targetTilt, k);
    }

    if (topRef.current) {
      topRef.current.position.y = THREE.MathUtils.lerp(topRef.current.position.y, -targetY, k);
      topRef.current.rotation.y = THREE.MathUtils.lerp(topRef.current.rotation.y, -targetTwist, k);
      topRef.current.rotation.x = THREE.MathUtils.lerp(topRef.current.rotation.x, -targetTilt, k);
    }

    if (groupRef.current) {
      const targetScale = exploded ? 0.55 : 1;
      const s = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, k);
      groupRef.current.scale.setScalar(s);

      if (spin) {
        groupRef.current.rotation.y += spinSpeed * delta;
      }
      if (float) {
        const t = state.clock.elapsedTime;
        groupRef.current.position.y = Math.sin(t * 1.2) * 8;
        groupRef.current.rotation.y = Math.sin(t * 0.6) * 0.15;
      }
    }
  });

  return (
    <group dispose={null} ref={groupRef} rotation={[0, 0, 0]}>
      <group ref={bottomRef}>
        <primitive object={bottomMesh} />
      </group>
      <group ref={topRef}>
        <primitive object={topMesh} />
      </group>
    </group>
  );
}

function CameraRig({
  position,
  autoRotate,
  autoRotateSpeed,
  interactive,
  camLog,
  onCameraChange,
}: {
  position: [number, number, number];
  autoRotate: boolean;
  autoRotateSpeed: number;
  interactive: boolean;
  camLog: boolean;
  onCameraChange?: (pos: [number, number, number]) => void;
}) {
  const { camera } = useThree();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controls = useRef<any>(null);
  const first = useRef(true);
  const target = useRef(new THREE.Vector3(...position));
  const transitioning = useRef(false);

  const [px, py, pz] = position;
  useEffect(() => {
    target.current.set(px, py, pz);
    if (!first.current) transitioning.current = true;
  }, [px, py, pz]);

  useFrame((_, delta) => {
    if (first.current) {
      camera.position.copy(target.current);
      camera.lookAt(0, 0, 0);
      first.current = false;
      controls.current?.update();
      return;
    }

    if (transitioning.current) {
      camera.position.lerp(target.current, Math.min(1, 3 * delta));
      camera.lookAt(0, 0, 0);
      if (camera.position.distanceTo(target.current) < 0.6) {
        transitioning.current = false;
      }
    }

    if (controls.current) {
      controls.current.autoRotate = !transitioning.current && !camLog && autoRotate;
      controls.current.update();
    }
  });

  if (!(interactive || camLog)) return null;

  return (
    <OrbitControls
      ref={controls}
      autoRotate={camLog ? false : autoRotate}
      autoRotateSpeed={autoRotateSpeed}
      enablePan={false}
      enableZoom={interactive || camLog}
      enableRotate={interactive || camLog}
      onChange={() => {
        if (controls.current) {
          const p = controls.current.object?.position;
          if (p) {
            const coords: [number, number, number] = [
              Number(p.x.toFixed(2)),
              Number(p.y.toFixed(2)),
              Number(p.z.toFixed(2)),
            ];
            onCameraChange?.(coords);
            // eslint-disable-next-line no-console
            console.log('cameraPosition={[' + coords[0] + ', ' + coords[1] + ', ' + coords[2] + ']}');
          }
        }
      }}
    />
  );
}

export default function Product3DViewer({
  topColor,
  bottomColor,
  exploded,
  autoRotate = true,
  autoRotateSpeed = 1.0,
  spin = false,
  spinSpeed = 0.45,
  float = false,
  interactive = true,
  cameraPosition = [104.74, 96.92, 138.54],
  onCameraChange,
}: Product3DViewerProps) {
  const camLog = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('camlog');

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
          <ambientLight intensity={0.75} color="#ffffff" />
          <directionalLight position={[12, 24, 18]} intensity={1.6} color="#ffffff" />
          <directionalLight position={[-12, 12, -12]} intensity={0.8} color="#e2ebff" />
          <directionalLight position={[0, -12, 12]} intensity={0.4} color="#ffffff" />
          <pointLight position={[6, 12, 6]} intensity={0.5} distance={25} color="#ffffff" />
          
          <Center>
            <Model topColor={topColor} bottomColor={bottomColor} exploded={exploded} spin={spin && !camLog} spinSpeed={spinSpeed} float={float && !camLog} />
          </Center>
          <CameraRig
            position={cameraPosition}
            autoRotate={autoRotate && !spin && !float}
            autoRotateSpeed={autoRotateSpeed}
            interactive={interactive}
            camLog={camLog}
            onCameraChange={onCameraChange}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
