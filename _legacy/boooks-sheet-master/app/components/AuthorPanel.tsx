"use client";

import { useMemo, useRef, useState } from "react";

export default function AuthorPanel({
  isVisible,
  onClose,
  children,
  edgePx = 24,
  closeThresholdPx = 110,
}: {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  edgePx?: number;
  closeThresholdPx?: number;
}) {
  const startY = useRef(0);
  const dragging = useRef(false);
  const startedFromEdge = useRef(false);

  const [dragY, setDragY] = useState(0);

  const transform = useMemo(() => {
    if (!isVisible) return "translateY(-100%)";
    return `translateY(${-Math.max(0, dragY)}px)`; // 👈 NEGATIVE = move UP
  }, [isVisible, dragY]);

  function onTouchStart(e: React.TouchEvent) {
    const y = e.touches[0].clientY;
    startedFromEdge.current = y <= edgePx; // 👈 must start near TOP
    dragging.current = false;
    startY.current = y;
  }

  function onTouchMove(e: React.TouchEvent) {
    if (!isVisible) return;
    if (!startedFromEdge.current) return;

    const y = e.touches[0].clientY;
    const dy = startY.current - y; // 👈 positive when swiping UP

    if (!dragging.current) {
      if (dy < 0) return; // 👈 ignore downward swipe
      dragging.current = true;
    }

    setDragY(dy);
  }

  function onTouchEnd() {
    if (dragging.current && dragY > closeThresholdPx) {
      setDragY(0);
      onClose();
    } else {
      setDragY(0); // snap back
    }

    dragging.current = false;
    startedFromEdge.current = false;
  }

  return (
    <div className="fixed inset-0 z-2200">
      <div
        className="absolute inset-0 bg-slate-900 text-white transition-transform duration-300 ease-out"
        style={{
          transform,
          willChange: "transform",
          touchAction: "pan-x", // 👈 allow horizontal scroll, block vertical
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="h-full flex flex-col">
          <header className="shrink-0 border-b border-slate-700">
            <button className="p-2" onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-up-icon lucide-chevron-up"><path d="m18 15-6-6-6 6"/></svg>
            </button>
          </header>

          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
