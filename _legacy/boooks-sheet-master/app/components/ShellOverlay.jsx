import * as THREE from "three";
import { useMemo } from "react";

const ShellOverlay = ({
  dimensions,
  color = "#ff0000",
  opacity = 0.5,
  frontMap,
  spineMap,
  backMap,
}) => {
  const epsilon = 0.01;

  const inflated = [
    dimensions[0] + epsilon,
    dimensions[1] + epsilon,
    dimensions[2] + epsilon,
  ];

  const materials = useMemo(() => {
    const frontMat = new THREE.MeshBasicMaterial({
      map: frontMap,
      color,
      transparent: true,
      opacity,
      alphaTest: 0.01,
      depthTest: true,
      depthWrite: false,
    });

    const spineMat = new THREE.MeshBasicMaterial({
      map: spineMap,
      color,
      transparent: true,
      opacity,
      alphaTest: 0.01,
      depthTest: true,
      depthWrite: false,
    });

    const invisible = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });

    // Face order: [+X, -X, +Y, -Y, +Z, -Z]
    return [
      spineMat, // +X → spine
      invisible, // -X
      invisible, // +Y
      invisible, // -Y
      frontMat, // +Z → back
      frontMat, // -Z → front
    ];
  }, [frontMap, spineMap, color, opacity]);

  return (
    <mesh>
      <boxGeometry args={inflated} />
      {materials.map((m, i) => (
        <primitive key={i} object={m} attach={`material-${i}`} color={color} />
      ))}
    </mesh>
  );
};

export default ShellOverlay;
