"use client";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import * as THREE from "three";
import usePDFToImage from "./components/usePDFToImage";

const OpenBook = ({ book }) => {
  const {
    pages = 1,
    dimensions = [0.5, 0.7, 0.07],
    cover = {},
    pdf = "/sample.pdf",
  } = book;

  const [currentPage, setCurrentPage] = useState(0);

  const [width, height, thickness] = dimensions;
  const pageThickness = thickness / pages;

  const leftCoverRef = useRef();
  const rightCoverRef = useRef();
  const spineRef = useRef();
  const pageRefs = useRef([]);

  const { getPageImage } = usePDFToImage(pdf);

  const OPEN_ANGLE = 1;

  const openBook = () => {
    gsap.to(leftCoverRef.current.rotation, { y: OPEN_ANGLE, duration: 0.4 });
    gsap.to(rightCoverRef.current.rotation, { y: -OPEN_ANGLE, duration: 0.4 });

    pageRefs.current.forEach((page, i) => {
      gsap.to(page.rotation, {
        y: i >= currentPage ? OPEN_ANGLE : -OPEN_ANGLE,
        duration: 0.4,
      });
    });
  };

  useEffect(() => {
    openBook();
  }, [currentPage]);

  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      {/* Pages */}
      <group position={[0, 1, 0]}>
        {Array.from({ length: pages }).map((_, i) => (
          <group
            key={i}
            ref={(el) => (pageRefs.current[i] = el)}
            position={[
              -width / 2,
              -1,
              i * -pageThickness + thickness / 2,
            ]}
          >
            <mesh
              position={[width / 2, 0, 0]}
              onClick={() => setCurrentPage(i)}
            >
              <boxGeometry args={[width, height, pageThickness]} />
              <meshBasicMaterial color={i % 2 ? "#eee" : "#fff"} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Front cover */}
      <group ref={rightCoverRef} position={[-width / 2, 0, thickness / 2]}>
        <mesh position={[width / 2, 0, 0]}>
          <boxGeometry args={[width, height, 0.001]} />
          <meshBasicMaterial color="white" />
        </mesh>
      </group>

      {/* Back cover */}
      <group ref={leftCoverRef} position={[-width / 2, 0, -thickness / 2]}>
        <mesh position={[width / 2, 0, 0]}>
          <boxGeometry args={[width, height, 0.001]} />
          <meshBasicMaterial color="white" />
        </mesh>
      </group>

      {/* Spine */}
      <mesh ref={spineRef} position={[-width / 2, 0, 0]}>
        <boxGeometry args={[0.001, height, thickness]} />
        <meshBasicMaterial color="#ddd" />
      </mesh>
    </group>
  );
};

export default OpenBook;
