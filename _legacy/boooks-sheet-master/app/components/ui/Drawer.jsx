'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react';

const Drawer = ({ 
  isOpen, 
  onRequestClose, 
  children, 
  side = 'bottom' 
}) => {
  const isTop = side === 'top';
  const POSITIONS = { OPEN: 0, CLOSED: isTop ? -100 : 100 };

  const [translateY, setTranslateY] = useState(POSITIONS.CLOSED);
  const [isDragging, setIsDragging] = useState(false);
  const drawerRef = useRef(null);
  const startY = useRef(0);
  const startTranslate = useRef(POSITIONS.CLOSED);
  const startTime = useRef(0);

  const snapTo = useCallback((pos) => {
    if (!drawerRef.current) return;
    drawerRef.current.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
    setTranslateY(pos);
  }, []);

  useEffect(() => {
    snapTo(isOpen ? POSITIONS.OPEN : POSITIONS.CLOSED);
  }, [isOpen, snapTo, POSITIONS.OPEN, POSITIONS.CLOSED]);

  const handleStart = (e) => {
    if (e.target.closest('button') || e.target.closest('input')) return;
    setIsDragging(true);
    startTime.current = Date.now();
    startY.current = e.touches ? e.touches[0].clientY : e.clientY;
    startTranslate.current = translateY;
    if (drawerRef.current) drawerRef.current.style.transition = 'none';
  };

  const handleMove = (e) => {
    if (!isDragging) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = ((clientY - startY.current) / window.innerHeight) * 100;
    let newPos = startTranslate.current + deltaY;

    if (isTop) {
      if (newPos > POSITIONS.OPEN) newPos = POSITIONS.OPEN + (newPos - POSITIONS.OPEN) * 0.3;
    } else {
      if (newPos < POSITIONS.OPEN) newPos = POSITIONS.OPEN + (newPos - POSITIONS.OPEN) * 0.3;
    }
    setTranslateY(newPos);
  };

  const handleEnd = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    const clientY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
    const velocity = (clientY - startY.current) / (Date.now() - startTime.current);

    const shouldClose = isTop 
      ? (velocity < -0.4 || translateY < -45) 
      : (velocity > 0.4 || translateY > 45);

    if (shouldClose) {
      onRequestClose?.();
      snapTo(POSITIONS.CLOSED);
    } else {
      snapTo(POSITIONS.OPEN);
    }
  };

  // Logic for the frosted glass effect
  const progress = isTop ? (100 + translateY) / 100 : (100 - translateY) / 100;
  const opacity = Math.max(0, Math.min(1, progress));
  const blurAmount = opacity * 8; // Max blur of 8px

  return (
    <>
      {/* Dynamic Blur Backdrop */}
      <div
        className="fixed inset-0 z-[999]"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${opacity * 0.4})`, // Dims the background
          backdropFilter: `blur(${blurAmount}px)`,           // Blurs the background
          WebkitBackdropFilter: `blur(${blurAmount}px)`,     // Safari support
          pointerEvents: (isTop ? translateY < -98 : translateY > 98) ? 'none' : 'all',
          transition: isDragging ? 'none' : 'all 0.5s ease'
        }}
        onClick={() => onRequestClose?.()}
      />

      <div
        ref={drawerRef}
        onPointerDown={handleStart}
        onPointerMove={handleMove}
        onPointerUp={handleEnd}
        className={`fixed left-0 right-0 z-[1001] bg-black/60 backdrop-blur-xl border-white/10 shadow-2xl flex flex-col touch-none will-change-transform h-auto max-h-[92vh]
          ${isTop ? 'top-0 rounded-b-[32px] border-b' : 'bottom-0 rounded-t-[32px] border-t'}
        `}
        style={{ transform: `translateY(${translateY}%)` }}
      >
        {/* Drag Handle logic based on side */}
        {!isTop && <Handle />}
        
        <div className="text-white">
          {children}
        </div>

        {isTop && <Handle />}
      </div>
    </>
  );
};

const Handle = () => (
  <div className="w-full h-8 flex justify-center items-center cursor-grab active:cursor-grabbing">
    <div className="w-12 h-1.5 bg-white/20 rounded-full" />
  </div>
);

export default Drawer;