"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { useTexture } from "@react-three/drei";
import ShellOverlay from "./ShellOverlay";
import * as THREE from "three";

/* ----------------------------------------
   DEMO BOOK (du styrer selv null her)
---------------------------------------- */

const DEFAULT_BOOK = {
  id: "demo-book",
  title: "Demo Book",
  author: "Unknown",
  pages: 120,
  dimensions: [10, 16, 1.6],
  cover: {
    front:
      "./../blockchain/m/i/mit_liv_med_fangekoret-00000001/cover/front.webp",
    spine:
      "./../blockchain/m/i/mit_liv_med_fangekoret-00000001/cover/spine.webp",
    back: "./../blockchain/m/i/mit_liv_med_fangekoret-00000001/cover/back.webp",
  },
  pdf: "/blockchain/demo/demo.pdf",
};

/* ----------------------------------------
   SAFE TEXTURE LOADER
---------------------------------------- */

// const useSafeLoader = (url) => {
//   const [texture, setTexture] = useState(null);

//   useEffect(() => {
//     if (!url) return;

//     const loader = new THREE.TextureLoader();
//     let tex;

//     loader.load(url, (t) => {
//       tex = t;
//       t.colorSpace = THREE.SRGBColorSpace;
//       t.minFilter = THREE.LinearMipmapLinearFilter;
//       t.magFilter = THREE.LinearFilter;
//       t.generateMipmaps = true;
//       t.needsUpdate = true;
//       setTexture(t);
//     });

//     return () => {
//       if (tex) tex.dispose();
//     };
//   }, [url]);

//   return texture;
// };

/* ----------------------------------------
   BOOK 3D
---------------------------------------- */

const Book3d = ({coverImg, book = DEFAULT_BOOK, onToggle }) => {
  const deg = (d) => (d * Math.PI) / 180;
  const lastTap = useRef(0);

  /* ----------------------------------------
     BOOK-LEVEL STATUS (THE TRUTH)
  ---------------------------------------- */

  const isIncomplete =
    !book?.cover?.front || !book?.cover?.spine || !book?.cover?.back || !false;

  /* ----------------------------------------
     COVER URLS (PER SIDE)
  ---------------------------------------- */
  const coverUrls = [
    book.cover.spine ?? "/experience/books/assets/spine3-01.webp",
    "/experience/books/assets/booktextureSide.webp",
    "/experience/books/assets/booktexture.webp",
    "/experience/books/assets/booktexture.webp",
    book.cover.back ?? "/experience/books/assets/front3-01.webp",
    book.cover.front ?? "/experience/books/assets/front3-01.webp",
  ];

  /* ----------------------------------------
     TEXTURES
  ---------------------------------------- */

  const coverTextures = useTexture(coverUrls);
  const brokenHeartTex = useTexture(
    "/experience/books/assets/frontNEW-01.webp",
  );
  const brokenHeartSpineTex = useTexture(
    "/experience/books/assets/spineNEW-01.webp",
  );

  /* ----------------------------------------
     MATERIALS
  ---------------------------------------- */

  const materials = useMemo(() => {
    return coverTextures.map(
      (t) =>
        new THREE.MeshBasicMaterial({
          map: t,
          toneMapped: false,
          transparent: true,
        }),
    );
  }, [coverTextures]);

  useEffect(() => {
    return () => materials.forEach((m) => m.dispose());
  }, [materials]);

  /* ----------------------------------------
     INTERACTION
  ---------------------------------------- */

  const handleTap = (e) => {
    e.stopPropagation();
    const now = Date.now();

    if (now - lastTap.current < 300) {
      onToggle?.();
      lastTap.current = 0;
    } else {
      lastTap.current = now;
    }
  };

  /* ----------------------------------------
     RENDER
  ---------------------------------------- */

  return (
    <group onClick={handleTap} rotation={[0, deg(30), 0]}>
      <mesh>
        <boxGeometry args={book.dimensions} />
        {materials.map((material, i) => (
          <primitive key={i} object={material} attach={`material-${i}`} />
        ))}
      </mesh>

      {/* Shell overlay */}
      {isIncomplete && (
        <ShellOverlay
          dimensions={book.dimensions}
          frontMap={brokenHeartTex}
          spineMap={brokenHeartSpineTex}
          backMap={brokenHeartTex}
          color="#ff0033"
          opacity={0.9}
        />
      )}
    </group>
  );
};

export default Book3d;
