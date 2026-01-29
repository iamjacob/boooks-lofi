"use client";

import {
  Navigation2,
  CornerRightUp,
  CornerRightDown,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useMap } from "react-map-gl/maplibre";

const MAX_PITCH = 75;

export default function North() {
  const { current: mapRef } = useMap();
  const [bearing, setBearing] = useState(0);
const rotateRef = useRef(null);
const directionRef = useRef(0);

  useEffect(() => {
    const map = mapRef?.getMap();
    if (!map) return;

    const updateBearing = () => {
      setBearing(map.getBearing());
    };

    updateBearing();
    map.on("rotate", updateBearing);
    map.on("move", updateBearing);

    return () => {
      map.off("rotate", updateBearing);
      map.off("move", updateBearing);
    };
  }, [mapRef]);

  const resetNorth = () => {
    const map = mapRef?.getMap();
    if (!map) return;
    map.easeTo({
      bearing: 0,
      pitch: map.getPitch(),
      duration: 400,
    });
  };

  const rotate = (deg) => {
    const map = mapRef?.getMap();
    if (!map) return;
    map.easeTo({
      bearing: map.getBearing() + deg,
      duration: 300,
    });
  };

  const setPitch = (value) => {
    const map = mapRef?.getMap();
    if (!map) return;

    map.easeTo({
      pitch: value,
      duration: 300,
    });
  };

  const startRotate = (dir) => {
  const map = mapRef?.getMap();
  if (!map) return;

  directionRef.current = dir;

  const step = () => {
    map.rotateTo(map.getBearing() + directionRef.current * 0.7, {
      duration: 0,
    });
    rotateRef.current = requestAnimationFrame(step);
  };

  step();
};

const stopRotate = () => {
  if (rotateRef.current) {
    cancelAnimationFrame(rotateRef.current);
    rotateRef.current = null;
  }
};


  const increase = () => {
    const map = mapRef?.getMap();
    if (!map) return;
    setPitch(Math.min(MAX_PITCH, map.getPitch() + 10));
  };

  const decrease = () => {
    const map = mapRef?.getMap();
    if (!map) return;
    setPitch(Math.max(0, map.getPitch() - 10));
  };

  return (
   <div className="flex w-10 h-10 justify-center">
  <div className="absolute flex">
    
    {/* Rotate left (hold) */}
    <button
      className="relative z-10 my-3 -mr-2 rounded-full bg-gray-100/50 flex items-center justify-center active:scale-90 transition-transform"
      onPointerDown={() => startRotate(1)}
      onPointerUp={stopRotate}
      onPointerCancel={stopRotate}
      onPointerLeave={stopRotate}
    >
      <ChevronLeft className="text-black/60" strokeWidth={1.5} />
    </button>

    {/* Reset North */}
    <button
      onClick={resetNorth}
      className="z-5 py-1 px-1 rounded-full active:scale-90 transition-transform"
    >
      <Navigation2
        strokeWidth={1.5}
        stroke="#D91B24"
        style={{
          transform: `rotate(${-bearing}deg)`,
          transition: "transform 0.15s linear",
        }}
      />
    </button>

    {/* Rotate right (hold) */}
    <button
      className="relative z-10 my-3 -ml-2 rounded-full bg-gray-100/50 flex items-center justify-center active:scale-90 transition-transform"
      onPointerDown={() => startRotate(-1)}
      onPointerUp={stopRotate}
      onPointerCancel={stopRotate}
      onPointerLeave={stopRotate}
    >
      <ChevronRight className="text-black/60" strokeWidth={1.5} />
    </button>

  </div>
</div>

  );
}
