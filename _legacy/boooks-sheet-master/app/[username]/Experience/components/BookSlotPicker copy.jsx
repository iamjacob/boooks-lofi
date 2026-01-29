"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const _obj = new THREE.Object3D();
const _vec = new THREE.Vector3();
const _mat = new THREE.Matrix4();

export default function BookSlotPicker() {
  const meshRef = useRef();
  const { camera } = useThree();
  const [hovered, setHover] = useState(null);

  const slotCount = 28;
  const shelfHeights = [-1.46, -0.46, 0.54, 1.54];
  const booksPerShelf = Math.ceil(slotCount / shelfHeights.length);

  const colorArray = useMemo(() => {
    const data = new Float32Array(slotCount * 3);
    for (let i = 0; i < slotCount; i++) {
      new THREE.Color().setHSL(i / slotCount, 0.8, 0.5).toArray(data, i * 3);
    }
    return data;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    // 1. STABLE DIRECTION LOGIC
    camera.getWorldDirection(_vec);
    // We use atan2(x, z) to get the angle in the horizontal plane
    const lookAngle = Math.atan2(_vec.x, _vec.z);

    for (let i = 0; i < slotCount; i++) {
      const isHovered = hovered === i;
      const indexInShelf = i % booksPerShelf;
      
      // The "Fan" distribution
      const offset = (indexInShelf - booksPerShelf / 2) * 0.05;
      const finalAngle = lookAngle + offset;

      // 2. RADIUS PUNCH
      const r = isHovered ? 7.0 : 7.5;
      
      // Calculate position so it follows the camera 360 degrees
      _obj.position.set(
        Math.sin(finalAngle) * r, 
        shelfHeights[Math.floor(i / booksPerShelf)], 
        Math.cos(finalAngle) * r
      );

      // Rotate to face the center of the ring
      _obj.rotation.set(0, finalAngle, isHovered ? Math.sin(clock.elapsedTime * 4) * 0.05 : 0);
      _obj.scale.setScalar(isHovered ? 1.3 : 1.0);
      _obj.updateMatrix();
      
      meshRef.current.setMatrixAt(i, _obj.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, slotCount]}
      // FIX 1: Disable frustum culling so it doesn't disappear when you turn around
      frustumCulled={false} 
      onPointerMove={(e) => (e.stopPropagation(), setHover(e.instanceId))}
      onPointerOut={() => setHover(null)}
      onPointerDown={(e) => {
        meshRef.current.getMatrixAt(e.instanceId, _mat);
        console.log(`ID: ${e.instanceId}`, new THREE.Vector3().setFromMatrixPosition(_mat));
      }}
    >
      <boxGeometry args={[0.3, 0.5, 0.1]}>
        <instancedBufferAttribute attach="attributes-instanceColor" args={[colorArray, 3]} />
      </boxGeometry>

      <shaderMaterial
        attach="material"
        wireframe={true}
        transparent={true}
        vertexShader={`
          attribute vec3 instanceColor;
          varying vec3 vColor;
          void main() {
            vColor = instanceColor;
            // Standard instancing vertex math
            gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          void main() { gl_FragColor = vec4(vColor, 1.0); }
        `}
      />
    </instancedMesh>
  );
}