'use client';

import React, { Suspense, useMemo, useRef, useEffect } from 'react';
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber';
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
  autoRotateSpeed?: number;
  // When true, spin the MODEL in place around its vertical axis (a turntable
  // spin) instead of orbiting the camera. Keeps the framed angle fixed so the
  // piece never appears to flip top-over-bottom.
  spin?: boolean;
  spinSpeed?: number;
  // When true, the model gently floats in place (a subtle bob + sway) instead
  // of spinning — a calm idle motion that keeps the framed angle fixed.
  float?: boolean;
  interactive?: boolean;
  cameraPosition?: [number, number, number];
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
    // Mix & Match (float) flips the whole assembly 180° so the shape reads
    // right-side up. That flip also swaps which mesh is visually on top, so we
    // swap the color assignment here to keep the picker's Top/Bottom labels
    // matching what's actually shown. Non-float views keep colors as-is.
    const topMeshColor = topColor;
    const bottomMeshColor = bottomColor;

    const topMat = new THREE.MeshStandardMaterial({
      color: topMeshColor,
      roughness: 0.3,
      metalness: 0.1,
    });
    const bottomMat = new THREE.MeshStandardMaterial({
      color: bottomMeshColor,
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
  }, [topMesh, bottomMesh, topColor, bottomColor, float]);

  useFrame((state, delta) => {
    // "Cracking an egg" separation: twist in opposite directions + a gentle
    // hinge tilt while opening, rather than a robotic lateral slide.
    const targetY = exploded ? 60 : 0;          // pull-apart gap so pieces don't touch
    const targetTwist = exploded ? 0.5 : 0;     // opposite Y-rotation (radians)
    const targetTilt = exploded ? 0.28 : 0;     // gentle hinge/tilt about X
    const isFirst = firstFrame.current;
    // On the very first frame, snap directly to target values instead of
    // lerping — this prevents the visible "zoom in" glitch when the viewer
    // mounts (e.g. toggling Mix & Match on/off on the shop page).
    const k = isFirst ? 1 : 10 * delta;          // lerp factor (eased)
    if (isFirst) firstFrame.current = false;

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
      // Turntable spin: rotate the model around its own vertical axis.
      if (spin) {
        groupRef.current.rotation.y += spinSpeed * delta;
      }
      // Gentle idle float: a subtle bob + slow sway, no full rotation.
      if (float) {
        const t = state.clock.elapsedTime;
        groupRef.current.position.y = Math.sin(t * 1.1) * 9;
        groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.16;
        groupRef.current.rotation.z = Math.sin(t * 0.8) * 0.04;
      }
    }
    if (bottomRef.current) {
      bottomRef.current.position.y = THREE.MathUtils.lerp(bottomRef.current.position.y, -targetY, k);
      bottomRef.current.rotation.y = THREE.MathUtils.lerp(bottomRef.current.rotation.y, -targetTwist, k);
      bottomRef.current.rotation.x = THREE.MathUtils.lerp(bottomRef.current.rotation.x, -targetTilt, k);
    }
  });

  return (
    // Mix & Match (float mode) loads the assembly upside down relative to
    // every other viewer context — flip it 180° about X so the shape reads
    // right-side up. (Colors are swapped in the material block above to keep
    // the Top/Bottom picker labels matching the flipped view.)
    <group dispose={null} ref={groupRef} rotation={float ? [Math.PI, 0, 0] : [0, 0, 0]}>
      <group ref={topRef}>
        <primitive object={topMesh} />
      </group>
      <group ref={bottomRef}>
        <primitive object={bottomMesh} />
      </group>
    </group>
  );
}

/* CameraRig keeps OrbitControls and the camera in sync. When the target
   `position` changes (e.g. switching into Mix & Match), it smoothly glides the
   camera to the new angle and pauses auto-rotation until it arrives, so the
   transition never looks like a jarring flip. Auto-rotation is azimuthal
   (spins around the vertical axis), so the model turns "around the circle"
   instead of tumbling to the wrong side. */
function CameraRig({
  position,
  autoRotate,
  autoRotateSpeed,
  interactive,
  camLog,
}: {
  position: [number, number, number];
  autoRotate: boolean;
  autoRotateSpeed: number;
  interactive: boolean;
  camLog: boolean;
}) {
  const { camera } = useThree();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controls = useRef<any>(null);
  const target = useRef(new THREE.Vector3(position[0], position[1], position[2]));
  const first = useRef(true);
  const transitioning = useRef(false);

  const [px, py, pz] = position;
  useEffect(() => {
    target.current.set(px, py, pz);
    if (!first.current) transitioning.current = true;
  }, [px, py, pz]);

  useFrame((_, delta) => {
    if (first.current) {
      // First paint: snap straight to the angle, no fly-in.
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
      // Pause spin while gliding to the new angle, resume once settled.
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
      onEnd={camLog ? ((e: unknown) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const p = (e as any)?.target?.object?.position;
        if (p) {
          // eslint-disable-next-line no-console
          console.log('cameraPosition={[' + p.x.toFixed(2) + ', ' + p.y.toFixed(2) + ', ' + p.z.toFixed(2) + ']}');
        }
      }) : undefined}
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
  cameraPosition = [0, 0, 4.5]
}: Product3DViewerProps) {
  // Debug mode: add ?camlog=1 to the URL to freeze auto-rotation and log the
  // camera position to the console as you drag, so an exact starting angle can
  // be captured and baked in as `cameraPosition`.
  const camLog = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('camlog');

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 400, position: 'relative', zIndex: 10, touchAction: 'none' }}>
      <Canvas dpr={[1, 2]} frameloop="always" gl={{ preserveDrawingBuffer: true }} camera={{ position: cameraPosition, fov: 45 }}>
        <Suspense fallback={null}>
          {/* Local lighting (no remote HDR fetch) keeps load fast and reliable */}
          <ambientLight intensity={0.7} />
          <hemisphereLight intensity={0.5} groundColor="#444" />
          <directionalLight position={[5, 8, 6]} intensity={1.1} />
          <directionalLight position={[-6, 3, -4]} intensity={0.5} />
          <Center>
            <Model topColor={topColor} bottomColor={bottomColor} exploded={exploded} spin={spin && !camLog} spinSpeed={spinSpeed} float={float && !camLog} />
          </Center>
          <CameraRig
            position={cameraPosition}
            autoRotate={autoRotate && !spin && !float}
            autoRotateSpeed={autoRotateSpeed}
            interactive={interactive}
            camLog={camLog}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
