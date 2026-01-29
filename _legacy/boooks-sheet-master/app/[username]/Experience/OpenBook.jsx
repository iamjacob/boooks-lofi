"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { Html, OrbitControls, useTexture } from "@react-three/drei";
import { gsap } from "gsap";
import * as THREE from "three";
import usePDFToImage from "./components/usePDFToImage";

const DUMMY_BOOK = {
  id: "demo-book",
  title: "Demo Book",
  author: "Unknown",
  pages: 120,
  dimensions: [10, 16, 2],
  cover: {
      front :"./../blockchain/m/i/mit_liv_med_fangekoret-00000001/cover/front.webp",
      spine : "./../blockchain/m/i/mit_liv_med_fangekoret-00000001/cover/spine.webp",
      back : "./../blockchain/m/i/mit_liv_med_fangekoret-00000001/cover/back.webp"
   },
  // pdf: "/blockchain/m/i/mit_liv_med_fangekoret-00000001/mit_liv_med_fangekoret-00000001.pdf",
  pdf: "/blockchain/m/i/mit_liv_med_fangekoret-00000001/mit_liv_med_fangekoret-00000001.pdf",
};

// book, onBookDoubleClick
const OpenBook = ({coverImg, orbit, book=DUMMY_BOOK, onToggle, pdfUrl  }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [bookOpen, setBookOpen] = useState(0);
  const [bookRead, setBookRead] = useState(false);
  const [pagesToFlip, setPagesToFlip] = useState(1);
  // const [hoveredPage, setHoveredPage] = useState(null);

  //pdf part
  const [pageImage, setPageImage] = useState();

  const lastTap = useRef(0);

const handleTap = (e) => {
  e.stopPropagation();
  const now = Date.now();

  if (now - lastTap.current < 300) {
    onToggle();
    lastTap.current = 0;
  } else {
    lastTap.current = now;
  }
};

const [frontTex, spineTex, backTex] = useTexture([
  coverImg || book?.cover?.front || "./blockchain/m/i/mit_liv_med_fangekoret-00000001/cover/front.webp",
  coverImg || book?.cover?.spine || "./blockchain/m/i/mit_liv_med_fangekoret-00000001/cover/spine.webp",
  coverImg || book?.cover?.back || "./blockchain/m/i/mit_liv_med_fangekoret-00000001/cover/back.webp",
]);

  const handleGetPageImage = async (pageNum) => {
    try {
      const imageUrl = await getPageImage(pageNum);
      setPageImage(imageUrl);
    } catch (error) {
      console.error("Failed to load page image:", error);
    }
  };

  const leftPageRef = useRef();
  const rightPageRef = useRef();
  const spinePageRef = useRef();
  const pagesGroupRef = useRef();
  const pageRefs = useRef([]);

  // Safely destructure with fallbacks
  const dimensions = book?.dimensions || [0.5, 0.7, 0.07];
  const cover = book?.cover || { front: "./test.png", back: "./test.png", spine: "./test.png" };
  const position = book?.position || { x: 0, y: 0.4, z: 0 };
  const pages = book?.pages || 700;
  const pdf = pdfUrl  ? book?.pdf : null;
  
  const { getPageImage } = usePDFToImage(pdf);
  
  // Extract dimensions safely
  const [width, height, thickness] = dimensions;
  
  
  const openDegrees = 1;
  const pageThickness = thickness / pages;

  
  console.log('pdfUrl  ? ' + pdfUrl )

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "ArrowRight") {
        flipForward();
      } else if (event.key === "ArrowLeft") {
        flipBackward();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentPage]);

  const flipForward = () => {
    if (currentPage >= pages - pagesToFlip) return;
    const targetPage = Math.min(currentPage + pagesToFlip, pages - 1);
    // animatePages(currentPage + 1, targetPage, true);
    open();
    flippin(targetPage);
  };

  const flipBackward = () => {
    if (currentPage <= 0) return;
    const targetPage = Math.max(currentPage - pagesToFlip, 0);
    // animatePages(currentPage, targetPage, false);
    open();
    flippin(targetPage);
  };

  useEffect(() => {
    open();
  }, [currentPage]);

  const close = () => {
    for (let i = 0; i < pages; i++) {
      const page = pageRefs.current[i];
      if (page) {
        gsap.to(page.rotation, {
          y: 0,
          duration: 0.4,
        });
      }
    }
    gsap.to(rightPageRef.current.rotation, {
      y: 0,
      duration: 0.5,
    });
    gsap.to(leftPageRef.current.rotation, {
      y: 0,
      duration: 0.5,
    });
    setBookOpen(0);
  };

  const open = () => {
    gsap.to(rightPageRef.current.rotation, {
      y: -openDegrees,
      duration: 0.4,
    });
    gsap.to(leftPageRef.current.rotation, {
      y: openDegrees,
      duration: 0.4,
    });

    // Animate each page in the book
    for (let i = 0; i < pages; i++) {
      const page = pageRefs.current[i];
      if (page) {
        gsap.to(page.rotation, {
          y: i >= currentPage ? openDegrees : -openDegrees,
          duration: 0.5 - 0.0001 * i,
        });
      }
    }
    setBookOpen(1);
  };

  const flippin = (foldTo) => {
    console.log(foldTo);
    // Rotate pages based on whether they are before or after the fold point
    for (let i = 0; i < pages; i++) {
      const page = pageRefs.current[i];
      if (page) {
        gsap.to(page.rotation, {
          y: i >= foldTo ? openDegrees : -openDegrees, // Flip left or right based on foldTo
          duration: 0.5 - 0.0001 * i, // Adjust duration for cascading effect
          ease: "power1.inOut",
        });
      }
    }

    // Set the current page for tracking, based on foldTo
    setCurrentPage(foldTo);
  };

  // // Function to load texture and apply it to a specific page
  const loadPageTexture = (pageIndex, textureUrl) => {
    const loader = new THREE.TextureLoader();
    loader.load(
      textureUrl,
      (texture) => {
        const page = pageRefs.current[pageIndex];
        if (page) {
          page.children[0].material = new THREE.MeshStandardMaterial({
            map: texture,
          });
        }
      },
      undefined,
      (error) => {
        console.error("Error loading texture:", error);
      }
    );
  };

  // Fetch and update page image as texture
  useEffect(() => {
    const fetchAndUpdatePageImage = async () => {
      try {
        const imageUrl = await getPageImage(currentPage);
        setPageImage(imageUrl);

        const loader = new THREE.TextureLoader();
        loader.load(imageUrl, (texture) => {
          const page = pageRefs.current[currentPage];
          if (page) {
            page.children[0].material = new THREE.MeshBasicMaterial({
              map: texture,
            });
          }
        });
      } catch (error) {
        console.error("Error loading page image:", error);
      }
    };

    fetchAndUpdatePageImage();
  }, [currentPage, getPageImage]);

  return (
    <>
      {/* <OrbitControls /> */}
      
      <group
       
        rotation={[0, Math.PI / 2, 0]}
        onPointerDown={() => setBookRead(!bookRead)}
        onClick={handleTap}
      >
        <mesh
          rotation={[0, Math.PI, 0.45]}
          position={[0, 0, 0]}
          bookID={book.bookID}
        >
          {/* This will be the first thing to be instanced meshes? :)  */}
          <group ref={pagesGroupRef} position={[0.001, 1, 0]}>
            {Array.from({ length: pages }).map((_, index) => (
              <group
                key={`page-${index}`}
                ref={(el) => (pageRefs.current[index] = el)}
                position={[
                  -width / 2,
                  -1,
                  //index * pageThickness - thickness * 0.5,
                  index * -pageThickness + thickness * 0.5,
                ]}
                rotation={[0, 0, 0]}
              >
                <mesh
                  castShadow
                  receiveShadow
                  // onPointerEnter={() => setHoveredPage(index)}
                  // onPointerLeave={() => setHoveredPage(null)}
                  onClick={() => setCurrentPage(index)}
                  position={[width / 2, 0, 0]}
                >
                  <boxGeometry args={[width, height, pageThickness]} />
                  <meshBasicMaterial
                    color={index % 2 === 0 ? "white" : "lightgray"}
                  />
                </mesh>
              </group>
            ))}
          </group>

          {/* Front cover */}
          <group
            ref={rightPageRef}
            position={[-width * 0.501, 0, thickness * 0.5]}
            rotation={[0, 0, 0]}
          >
            <mesh position={[width / 2, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[width, height, 0.001]} />
              <meshBasicMaterial map={frontTex} />
            </mesh>
          </group>

          {/* Back cover */}
          <group
            ref={leftPageRef}
            position={[-width * 0.5, 0, -thickness * 0.5]}
            rotation={[0, 0, 0]}
          >
            <mesh position={[width / 2, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[width, height, 0.001]} />
              <meshBasicMaterial map={backTex} />
            </mesh>
          </group>

          {/* Spine */}
          <mesh
            ref={spinePageRef}
            position={[-width * 0.501, 0,0]}
            rotation={[0, 0, 0]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[0.001, height, thickness]} />
            <meshBasicMaterial map={spineTex} />
          </mesh>
        </mesh>
      </group>
    </>
  );
};

export default OpenBook;
