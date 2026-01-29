"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useMap } from "react-map-gl/maplibre";
import { useRef } from "react";



const MAX_PITCH = 75;
const PITCH_SPEED = 0.25;

export default function Toggle3D() {
  const { current: mapRef } = useMap();
const pitchRef = useRef(null);
const pitchDirRef = useRef(0);


  const toggle = () => {
    const map = mapRef?.getMap();
    if (!map) return;

    const pitch = map.getPitch();
    map.easeTo({
      pitch: pitch > 5 ? 0 : 60,
      duration: 400,
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

  const increase = () => {
    const map = mapRef?.getMap();
    if (!map) return;
    setPitch(Math.min(MAX_PITCH, map.getPitch() + 5));
  };

  const decrease = () => {
    const map = mapRef?.getMap();
    if (!map) return;
    setPitch(Math.max(0, map.getPitch() - 5));
  };

  const startPitch = (dir) => {
  const map = mapRef?.getMap();
  if (!map) return;

  pitchDirRef.current = dir;

  const step = () => {
    const next = Math.max(
      0,
      Math.min(MAX_PITCH, map.getPitch() + pitchDirRef.current * PITCH_SPEED)
    );

    map.setPitch(next);

    pitchRef.current = requestAnimationFrame(step);
  };

  step();
};

const stopPitch = () => {
  if (pitchRef.current) {
    cancelAnimationFrame(pitchRef.current);
    pitchRef.current = null;
  }
};

const startPitchUp = () => startPitch(-1);   // tilt up
const startPitchDown = () => startPitch(1); // tilt down


  return (
    <div className="flex flex-col items-center">
  
  {/* Pitch up (hold) */}
  <button
    className="mx-2 -mb-1 rounded-full bg-gray-100/50 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform touch-none"
    onPointerDown={startPitchUp}
    onPointerUp={stopPitch}
    onPointerCancel={stopPitch}
    onPointerLeave={stopPitch}
  >
    <ChevronUp className="text-black/60" strokeWidth={1.5} />
  </button>

  {/* Toggle 2D / 3D */}
  <button
    className="relative w-10 h-10 text-black/60 z-10 font-[500] text-[18px] rounded-full bg-black/10 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform touch-none"
    onClick={toggle}
  >
    {mapRef.getMap().getPitch() === 0 ? "2D" : "3D"}
  </button>

  {/* Pitch down (hold) */}
  <button
    className="mx-2 -mt-1 rounded-full bg-gray-100/50 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform touch-none"
    onPointerDown={startPitchDown}
    onPointerUp={stopPitch}
    onPointerCancel={stopPitch}
    onPointerLeave={stopPitch}
  >
    <ChevronDown className="text-black/60" strokeWidth={1.5} />
  </button>

</div>

  );
}
