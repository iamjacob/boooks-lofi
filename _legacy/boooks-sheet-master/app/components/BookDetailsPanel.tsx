"use client";

import { useMemo, useRef, useState } from "react";
import Favorite from './Favorite'

type Props = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  // tweakables
  edgePx?: number; // how close to left edge to start
  closeThresholdPx?: number; // drag distance needed to close
};

export default function BookDetailsPanel({
  isVisible,
  onClose,
  children,
  edgePx = 24,
  closeThresholdPx = 110,
}: Props) {
  const startX = useRef(0);
  const startY = useRef(0);
  const lastX = useRef(0);
  const lastT = useRef(0);
  const dragging = useRef(false);
  const startedFromEdge = useRef(false);

  const [dragX, setDragX] = useState(0);

  // When dragging, disable transition so it follows the finger
  const transitionClass = dragging.current
    ? "transition-none"
    : "transition-transform duration-500 ease-out";

  const transform = useMemo(() => {
    // Base: either on-screen or off-screen
    // Then add dragX (only while visible)
    if (!isVisible) return "translateX(100%)";
    return `translateX(${Math.max(0, dragX)}px)`;
  }, [isVisible, dragX]);

  function onTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];

    // Only start if finger begins near LEFT edge
    startedFromEdge.current = t.clientX <= edgePx;
    dragging.current = false;

    startX.current = t.clientX;
    startY.current = t.clientY;
    lastX.current = t.clientX;
    lastT.current = performance.now();
  }

  function onTouchMove(e: React.TouchEvent) {
    if (!isVisible) return;
    if (!startedFromEdge.current) return;

    const t = e.touches[0];
    const dx = t.clientX - startX.current;
    const dy = t.clientY - startY.current;

    // If user is scrolling vertically, do nothing
    if (!dragging.current) {
      // Begin drag only if movement is mostly horizontal AND to the right
      if (Math.abs(dy) > Math.abs(dx)) return;
      if (dx < 0) return;
      dragging.current = true;
    }

    // We are dragging the panel — prevent the page/content from scrolling
    e.preventDefault();

    // Follow finger (rubber-band optional, keep it simple)
    setDragX(Math.max(0, dx));

    lastX.current = t.clientX;
    lastT.current = performance.now();
  }

  function onTouchEnd() {
    if (!isVisible) return;

    const dx = Math.max(0, lastX.current - startX.current);

    // Snap decision:
    // - close if dragged far enough
    // (you can add velocity later if you want)
    if (dragging.current && dx > closeThresholdPx) {
      setDragX(0);
      onClose();
    } else {
      // snap back
      setDragX(0);
    }

    dragging.current = false;
    startedFromEdge.current = false;
  }

  return (
    <div className="fixed inset-0 z-2100">
      <div
        className={`absolute inset-0 bg-slate-900 text-white ${transitionClass}`}
        style={{
          touchAction: "pan-y", // 👈 allow vertical scroll, block horizontal
          willChange: "transform",
          transform,
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="h-full flex flex-col">
          {/* <header className="shrink-0 p-4 border-b border-slate-700 flex justify-between">
            
          </header> */}

          <main className="flex-1 overflow-y-auto">
            <div className="fixed z-2000 top-0 left-0 w-screen flex bg-slate-900 justify-between">
              <button onClick={onClose} className="p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-left-icon lucide-chevron-left"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <div className="flex">
                <button
                  onClick={() => {
                    console.log("share");
                  }}
                  className="p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-share2-icon lucide-share-2"
                  >
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                  </svg>
                </button>


                  <Favorite/>

                <button
                  onClick={() => {
                    console.log("more");
                  }}
                  className="p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"
                  >
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </button>
              </div>
            </div>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
