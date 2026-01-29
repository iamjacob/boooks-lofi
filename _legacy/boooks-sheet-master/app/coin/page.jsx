"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function Coin({ onResult }) {
  const ref = useRef();
  const { scene } = useGLTF("/assets/models/cryptocrown.glb");

  // physics state
  const velocity = useRef(new THREE.Vector3());
  const angularVelocity = useRef(new THREE.Vector3());
  const active = useRef(false);
  const settled = useRef(false);

  const FLOOR_Y = 0.12;
  const GRAVITY = -18;
  const RESTITUTION = 0.35;

  const toss = () => {
    if (active.current) return;

    active.current = true;
    settled.current = false;

    // reset pose (ONLY position, not orientation)
    ref.current.position.set(0, FLOOR_Y, 0);
    ref.current.rotation.set(0, 0, 0);

    // impulse (inspired by your dice reference)
    velocity.current.set(
      (Math.random() - 0.5) * 2,
      9 + Math.random() * 2,
      (Math.random() - 0.5) * 1
    );

    angularVelocity.current.set(
      Math.random() * 18 + 10,
      Math.random() * 6,
      Math.random() * 4
    );
  };

  useFrame((_, delta) => {
    if (!active.current) return;

    // gravity
    velocity.current.y += GRAVITY * delta;

    // integrate position
    ref.current.position.addScaledVector(velocity.current, delta);

    // integrate rotation (true angular motion)
    const w = angularVelocity.current;
    const angle = w.length() * delta;
    if (angle > 0) {
      const axis = w.clone().normalize();
      const dq = new THREE.Quaternion().setFromAxisAngle(axis, angle);
      ref.current.quaternion.multiply(dq);
    }

    // air resistance
    angularVelocity.current.multiplyScalar(0.99);

    // floor collision
    if (ref.current.position.y <= FLOOR_Y) {
      ref.current.position.y = FLOOR_Y;

      velocity.current.y *= -RESTITUTION;
      velocity.current.x *= 0.85;
      velocity.current.z *= 0.85;

      angularVelocity.current.multiplyScalar(0.6);
    }

    // rest detection (NO snapping)
    if (
      Math.abs(velocity.current.y) < 0.12 &&
      angularVelocity.current.length() < 0.12
    ) {
      velocity.current.set(0, 0, 0);
      angularVelocity.current.set(0, 0, 0);
      active.current = false;

      if (!settled.current) {
        settled.current = true;

        // decide result from orientation
        const up = new THREE.Vector3(0, 1, 0);

        // coin normal (adjust if your model uses a different face)
        const coinNormal = new THREE.Vector3(0, 0, 1).applyQuaternion(
          ref.current.quaternion
        );

        const isHeads = coinNormal.dot(up) > 0;
        onResult?.(isHeads ? "heads" : "tails");
      }
    }
  });

  return (
    <group ref={ref} onClick={toss} dispose={null}>
      <primitive object={scene} castShadow receiveShadow />
    </group>
  );
}

export default function Page() {
  const [result, setResult] = useState(null);

  return (
    <div className="w-screen h-screen bg-none relative">
      <Canvas shadows camera={{ position: [-8, 10, 8], fov: 45 }}>
        {/* lighting inspired by your dice demo */}
        <ambientLight intensity={0.9} />
        <directionalLight
          position={[-30, 50, -30]}
          intensity={2.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0005}
        />
        <directionalLight
          position={[30, -50, 30]}
          intensity={2.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0005}
        />

        <directionalLight
          position={[30, 40, -30]}
          intensity={2.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0005}
        />

        {/* floor */}
        {/* <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[200, 200]} />
          <meshStandardMaterial color="#e9e464" />
        </mesh> */}

        <ContactShadows
          position={[0, 0, 0]}
          opacity={0.6}
          scale={10}
          blur={2.5}
          far={3}
        />

        <Coin onResult={setResult} />
      </Canvas>

      {result && (
        <div className="absolute bottom-10 w-full text-center text-4xl font-bold tracking-widest text-black">
          {result.toUpperCase()}
        </div>
      )}
    </div>
  );
}

useGLTF.preload("/assets/models/cryptocrown.glb");
