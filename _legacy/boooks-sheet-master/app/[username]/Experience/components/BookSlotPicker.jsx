"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const _obj = new THREE.Object3D();
const _vec = new THREE.Vector3();
const _mat = new THREE.Matrix4();

export default function BookSlotPicker({ bookPicked = false }) {
  const meshRef = useRef();
  const { camera } = useThree();
  const [hovered, setHover] = useState(null);

  const slotCount = 21;
  const shelfHeights = [-1.46, -0.46, 0.54, 1.54];
  // const booksPerShelf = Math.ceil(slotCount / shelfHeights.length);
  const booksPerShelf = 5;

  // Initialize Bounding Sphere so raycasting works from frame 1
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.geometry.computeBoundingSphere();
      // Set a massive bounding sphere so the raycaster never ignores this mesh
      // since the books literally follow the camera everywhere.
      meshRef.current.geometry.boundingSphere.radius = 20; 
    }
  }, []);

  const colorArray = useMemo(() => {
    const data = new Float32Array(slotCount * 3);
    for (let i = 0; i < slotCount; i++) {
      new THREE.Color().setHSL(i / slotCount, 0.8, 0.5).toArray(data, i * 3);
    }
    return data;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    camera.getWorldDirection(_vec);
    const lookAngle = Math.atan2(_vec.x, _vec.z);

    for (let i = 0; i < slotCount; i++) {
      const isHovered = hovered === i;
      const indexInShelf = i % booksPerShelf;
      
      const offset = (indexInShelf - booksPerShelf / 2) * 0.05;
      
      const finalAngle = lookAngle + offset +0.03;
      const r = isHovered ? 7.0 : 7.5;
      
      _obj.position.set(
        Math.sin(finalAngle) * r, 
        shelfHeights[Math.floor(i / booksPerShelf)], 
        Math.cos(finalAngle) * r
      );

      _obj.rotation.set(0, finalAngle, isHovered ? Math.sin(clock.elapsedTime * 4) * 0.02 : 0);
      _obj.scale.setScalar(isHovered ? 1.3 : 1.0);
      _obj.updateMatrix();
      
      meshRef.current.setMatrixAt(i, _obj.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.computeBoundingSphere();
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, slotCount]}
      frustumCulled={false} 
      // Important: Ensure raycast checks every instance
      onPointerMove={(e) => {
        e.stopPropagation();
        setHover(e.instanceId);
      }}
      onPointerOut={() => setHover(null)}
      onPointerDown={(e) => {
        e.stopPropagation();
        meshRef.current.getMatrixAt(e.instanceId, _mat);
        const worldPos = new THREE.Vector3().setFromMatrixPosition(_mat);
        
        console.log(`%c ID: ${e.instanceId} clicked`, `background: hsl(${(e.instanceId/slotCount)*360}, 80%, 50%); color: black; font-weight: bold;`);
        console.log("World Position:", worldPos);
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