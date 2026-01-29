'use client'
import { useState, useEffect, useMemo,useRef } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const DEFAULT_BOOK = {
  id: "demo-book",
  title: "Demo Book",
  author: "Unknown",
  pages: 120,
  dimensions: [6, 16, 2],
  cover: {
      front :"./../blockchain/m/i/mit_liv_med_fangekoret-00000001/cover/front.webp",
      spine : "./../blockchain/m/i/mit_liv_med_fangekoret-00000001/cover/spine.webp",
      back : "./../blockchain/m/i/mit_liv_med_fangekoret-00000001/cover/back.webp"
   },
  // pdf: "/blockchain/m/i/mit_liv_med_fangekoret-00000001/mit_liv_med_fangekoret-00000001.pdf",
  pdf: "/blockchain/m/i/mit_liv_med_fangekoret-00000001/mit_liv_med_fangekoret-00000001.pdf",
};

const useSafeLoader = (url, fallbackUrl = "./test.png") => {
  const [texture, setTexture] = useState(null);
  
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    let tex;

    const onLoad = (t) => {
      tex = t;
      t.colorSpace = THREE.SRGBColorSpace;
      t.minFilter = THREE.LinearMipmapLinearFilter;
      t.magFilter = THREE.LinearFilter;
      t.generateMipmaps = true;
      t.needsUpdate = true;
      setTexture(t);
    };

    loader.load(url, onLoad, undefined, () => {
      loader.load(fallbackUrl, onLoad);
    });

    return () => {
      if (tex) tex.dispose();
    };
  }, [url, fallbackUrl]);

  return texture;
};

const Book3d = ({ cover, isReading = false, onToggle }) => {
  const deg = (d) => d * Math.PI / 180;

  const [active, setActive] = useState(false);
  const lastTap = useRef(0);

  /* ----------------------------------------
     TEXTURE URL SELECTION (NO HOOKS HERE)
  ---------------------------------------- */

  const coverUrls = cover === false
    ? [
        cover || DEFAULT_BOOK?.cover?.front || "./blockchain/m/i/mit_liv_med_fangekoret-00000001/cover/front.webp",
        cover || DEFAULT_BOOK?.cover?.spine || "./blockchain/m/i/mit_liv_med_fangekoret-00000001/cover/spine.webp",
        cover || DEFAULT_BOOK?.cover?.back  || "./blockchain/m/i/mit_liv_med_fangekoret-00000001/cover/back.webp",
      ]
    : [null, null, null];

  /* ----------------------------------------
     HOOKS (ALWAYS CALLED)
  ---------------------------------------- */

  const [frontTex, spineTex, backTex] = useTexture(coverUrls);

  const side   = useSafeLoader("/experience/books/assets/booktextureSide.webp");
  const top    = useSafeLoader("/experience/books/assets/booktexture.webp");
  const bottom = useSafeLoader("/experience/books/assets/booktexture.webp");

  /* ----------------------------------------
     MATERIAL SETUP
  ---------------------------------------- */

  const textures = useMemo(
    () => [spineTex, side, top, bottom, backTex, frontTex],
    [spineTex, side, top, bottom, backTex, frontTex]
  );

  const materials = useMemo(
    () =>
      textures.map((t) =>
        t
          ? new THREE.MeshBasicMaterial({ map: t, toneMapped: false })
          : new THREE.MeshBasicMaterial({ color: "gray" })
      ),
    [textures]
  );

  /* ----------------------------------------
     CLEANUP
  ---------------------------------------- */

  useEffect(() => {
    return () => {
      materials.forEach((m) => m?.dispose());
    };
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
     COVER TRANSITION
  ---------------------------------------- */

  useEffect(() => {
    setActive(false);

    const t = setTimeout(() => {
      setActive(true);
    }, 150);

    return () => clearTimeout(t);
  }, [cover]);

  /* ----------------------------------------
     RENDER
  ---------------------------------------- */

  if (!active) return null;

  return (
    <group onClick={handleTap}>
      <mesh
        rotation={[0, deg(30), 0]}
        onPointerDown={(e) => {
          e.stopPropagation();
          console.log("Book clicked");
        }}
      >
        <boxGeometry args={[10, 16, 1.6]} />
        {materials.map((material, i) => (
          <primitive
            key={i}
            object={material}
            attach={`material-${i}`}
          />
        ))}
      </mesh>
    </group>
  );
};

export default Book3d;
