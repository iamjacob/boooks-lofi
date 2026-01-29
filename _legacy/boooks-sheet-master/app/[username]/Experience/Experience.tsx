"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useEffect } from "react";
import Shelves from "./Shelves";
import Lighting from "./Lighting";
// import BookPlacer from "./components/functions/BookPlacer";
import BookMover from "./components/BookMover";
import BookSlotPicker from './components/BookSlotPicker'

import { useUI } from "../../ui/store/ui.store";

const Experience = () => {
  const mode = useUI((s) => s.mode);
  const setCanvasActive = useUI((s) => s.setCanvasActive);
  const setMode = useUI((s) => s.setMode);

  /* ------------------------------
     Keyboard controls (desktop)
     M = move
     Esc = exit move
  ------------------------------ */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "m") {
        setMode("moving");
      }

      if (e.key === "Escape") {
        setMode("idle");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setMode]);

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-gray-900"
      onPointerDown={() => setCanvasActive(true)}
      onPointerUp={() => setCanvasActive(false)}
      onPointerLeave={() => setCanvasActive(false)}
      onPointerCancel={() => setCanvasActive(false)}
    >
      <Canvas
        camera={{
          position: [0, 0.0001, 5],
          zoom: 4,
          fov: 75,
        }}
      >
        {/* LIGHTING */}
        <ambientLight intensity={1} />
        <Lighting />

        {/* SCENE */}
        <Shelves />
        <Stars />

        {/* CAMERA CONTROLS */}
        <OrbitControls
          target={[0, 0, 0]}
          //enabled={mode !== "moving"}   // 🔥 IMPORTANT
          minDistance={-4}
          maxDistance={12}
          minPolarAngle={-Math.PI / 2.4}
          maxPolarAngle={Math.PI / 1.9}
          enableZoom
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
        />

        {/* <BookAddNDelete/> */}

        {/* BOOK LOGIC */}
        <BookSlotPicker />
        {/* <BookGroupPicker /> */}

        {/* MOVE MODE */}
        {mode === "moving" && <BookMover />}
      </Canvas>
    </div>
  );
};

export default Experience;
