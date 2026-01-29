"use client";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Book3d from "./Book3d";
import OpenBook from "./../[username]/Experience/OpenBook";

// import Book3dOpen from "./Book3dOpen";
// import Book2d from "./Book2d";

const Book = ({
  coverImg = false,
  position = [0, 2, -32],
  isReading = false,
  orbit = true,
  pdfUrl = "./assets/pdf/devops.pdf",
}) => {
  const [isOpen, setIsOpen] = useState(isReading); // if isReading load 3d book!

  return (
    <>
      <Canvas
        camera={{
          position,
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
        dpr={[1, 2]}
        gl={{
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.NoToneMapping,
        }}
      >
        {orbit && <OrbitControls />}

        {isOpen ? (
          <OpenBook
            orbit={orbit}
            pdfUrl={pdfUrl}
            coverImg={coverImg}
            onToggle={() => setIsOpen(false)}
          />
        ) : (
          <Book3d cover={coverImg} onToggle={() => setIsOpen(true)} />
        )}
      </Canvas>
    </>
  );
};

export default Book;
