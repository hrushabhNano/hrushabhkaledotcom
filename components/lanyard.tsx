"use client";

import * as THREE from "three";
import { useRef, useState, useCallback } from "react";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { Environment } from "@react-three/drei";

extend({ MeshLineGeometry, MeshLineMaterial });

// Card texture: create a canvas texture showing the badge
function useCardTexture() {
  const texture = useCallback(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 720;
    const ctx = canvas.getContext("2d")!;

    // Background
    ctx.fillStyle = "#0c0c0e";
    ctx.fillRect(0, 0, 512, 720);

    // Border
    ctx.strokeStyle = "rgba(249,115,22,0.4)";
    ctx.lineWidth = 4;
    ctx.strokeRect(16, 16, 480, 688);

    // Orange accent line top
    ctx.fillStyle = "#f97316";
    ctx.fillRect(16, 16, 480, 6);

    // Monogram "HK"
    ctx.fillStyle = "#f97316";
    ctx.font = "bold 96px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("HK", 256, 260);

    // Name
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 36px sans-serif";
    ctx.fillText("Hrushabh Kale", 256, 360);

    // Role
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.font = "20px sans-serif";
    ctx.fillText("Tech Lead & Solutions Architect", 256, 415);

    // Company
    ctx.fillStyle = "rgba(249,115,22,0.8)";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("Nanostuffs Technologies", 256, 460);

    // Tagline
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.font = "16px monospace";
    ctx.fillText("hrushabhkale.com", 256, 660);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  return texture;
}

function Band() {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const { width, height } = useThree((state) => state.size);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
  );

  const [dragged, drag] = useState<THREE.Vector3 | false>(false);

  const getTexture = useCardTexture();
  const [cardTexture] = useState(() => getTexture());

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
  ]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - (dragged as THREE.Vector3).x,
        y: vec.y - (dragged as THREE.Vector3).y,
        z: vec.z - (dragged as THREE.Vector3).z,
      });
    }
    if (fixed.current) {
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.translation());
      curve.points[2].copy(j1.current.translation());
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody
          ref={fixed}
          angularDamping={2}
          linearDamping={2}
          type="fixed"
        />
        <RigidBody
          position={[0.5, 0, 0]}
          ref={j1}
          angularDamping={2}
          linearDamping={2}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[1, 0, 0]}
          ref={j2}
          angularDamping={2}
          linearDamping={2}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[1.5, 0, 0]}
          ref={j3}
          angularDamping={2}
          linearDamping={2}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          angularDamping={2}
          linearDamping={2}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <mesh
            onPointerUp={(e) => {
              (e.target as any).releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e) => {
              (e.target as any).setPointerCapture(e.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation())),
              );
            }}
          >
            <planeGeometry args={[0.8 * 2, 1.125 * 2]} />
            <meshBasicMaterial map={cardTexture} side={THREE.DoubleSide} />
          </mesh>
        </RigidBody>
      </group>
      <mesh ref={band}>
        {/* @ts-ignore */}
        <meshLineGeometry />
        {/* @ts-ignore */}
        <meshLineMaterial
          transparent
          opacity={0.6}
          color="#f97316"
          depthTest={false}
          resolution={[width, height]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}

export default function Lanyard() {
  return (
    <div className="h-[400px] w-full touch-none select-none md:h-[500px]">
      <Canvas camera={{ position: [0, 0, 13], fof: 25 } as any}>
        <ambientLight intensity={0.5} />
        <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Band />
        </Physics>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
