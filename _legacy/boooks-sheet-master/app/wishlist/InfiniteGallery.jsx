'use client'
import React, { useEffect, useRef, useState } from 'react';
import './InfiniteWheel.css';

const BOOKS = [
  { id: 1, title: "Actionable Gamification", author: "Yu-kai Chou", image: "./reading/actionable.jpg" },
  { id: 2, title: "Chicken Soup for the Soul", author: "Jack Canfield", image: "./reading/chickensoup.webp" },
  { id: 3, title: "The DevOps Handbook", author: "Gene Kim", image: "./reading/devops.jpg" },
  { id: 4, title: "The Shaolin Spirit", author: "Bernhard Moestl", image: "./reading/shaolin.png" },
  { id: 5, title: "Strength Side", author: "Strength Side", image: "./reading/strength.jpg" },
  { id: 6, title: "Tao Te Ching", author: "Lao Tzu", image: "./reading/taoteching.jpg" }
];

const FRICTION = 0.95;
const SNAP_STRENGTH = 0.12;

const InfiniteWheel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const wheelRef = useRef(null);
  const trackRef = useRef(null);
  const [activeBook, setActiveBook] = useState(BOOKS[0]);
  
  const state = useRef({
    x: 0,
    v: 0,
    down: false,
    lastX: 0,
    pointerId: null,
  });

  useEffect(() => {
    const wheel = wheelRef.current;
    const track = trackRef.current;
    let rafId;

    const render = () => {
      const s = state.current;
      
      if (!s.down) {
        s.x += s.v;
        s.v *= FRICTION;

        // Snap logic
        if (Math.abs(s.v) < 3) {
          const wheelRect = wheel.getBoundingClientRect();
          const centerX = wheelRect.left + wheelRect.width / 2;
          const items = track.children;
          
          let closestDist = Infinity;
          let snapDiff = 0;

          for (const item of items) {
            const r = item.getBoundingClientRect();
            const itemCenter = r.left + r.width / 2;
            const diff = centerX - itemCenter;
            if (Math.abs(diff) < Math.abs(closestDist)) {
              closestDist = diff;
              snapDiff = diff;
            }
          }
          s.x += snapDiff * SNAP_STRENGTH;
        }
      }

      // Infinite Wrap (1/3 of total width)
      const setWidth = track.scrollWidth / 3;
      if (s.x > 0) s.x -= setWidth;
      if (s.x < -setWidth) s.x += setWidth;

      track.style.transform = `translate3d(${s.x}px, 0, 0)`;

      // Apply 3D Perspective & Find Active Book
      updateBookStates(wheel, track);
      
      rafId = requestAnimationFrame(render);
    };

    const updateBookStates = (wheel, track) => {
      const wheelRect = wheel.getBoundingClientRect();
      const centerX = wheelRect.left + wheelRect.width / 2;
      const items = track.children;

      let closestBook = null;
      let minDiff = Infinity;

      for (const item of items) {
        const r = item.getBoundingClientRect();
        const itemCenter = r.left + r.width / 2;
        const dist = Math.abs(centerX - itemCenter);
        
        // --- 3D PERSPECTIVE CALCULATION ---
        // Books get smaller and more transparent as they move from center
        const maxDist = wheelRect.width / 2;
        const normalizedDist = Math.min(dist / maxDist, 1);
        const scale = 1 - (normalizedDist * 0.3); // Min scale 0.7
        const opacity = 1 - (normalizedDist * 0.6); // Min opacity 0.4
        
        item.style.transform = `scale(${scale})`;
        item.style.opacity = opacity;

        if (dist < minDiff) {
          minDiff = dist;
          closestBook = item;
        }
      }

      if (closestBook) {
        const bookId = parseInt(closestBook.getAttribute("data-id"));
        const found = BOOKS.find(b => b.id === bookId);
        if (found && activeBook?.id !== found.id) {
          setActiveBook(found);
        }
      }
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, [activeBook]);

  // Handlers
  const handlePointerDown = (e) => {
    state.current.down = true;
    state.current.pointerId = e.pointerId;
    state.current.lastX = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    const s = state.current;
    if (!s.down || e.pointerId !== s.pointerId) return;
    const dx = e.clientX - s.lastX;
    s.lastX = e.clientX;
    s.x += dx;
    s.v = dx;
  };

  const handlePointerUp = () => state.current.down = false;

  const handleBookClick = (e) => {
    if (Math.abs(state.current.v) > 1.5) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const wheelRect = wheelRef.current.getBoundingClientRect();
    state.current.x += (wheelRect.left + wheelRect.width/2) - (rect.left + rect.width/2);
    state.current.v = 0;
  };

  return (
    <div className="book-gallery">
      <div className="book-info-pane">
        <h2 className="active-title">{activeBook?.title}</h2>
        <p className="active-author">{activeBook?.author}</p>
      </div>

      <div className="wheel-viewport" ref={wheelRef}
        onPointerDown={handlePointerDown} onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp}
      >
        <div className="wheel-track" ref={trackRef}>
          {[...BOOKS, ...BOOKS, ...BOOKS].map((book, i) => (
            <div 
              key={`${book.id}-${i}`} 
              className="book-card" 
              data-id={book.id}
              onClick={handleBookClick}
            >
              <img src={book.image} alt={book.title} draggable="false" />
            </div>
          ))}
        </div>
        <div className={`flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6 transition-all duration-500 ${isReading ? 'opacity-30' : 'opacity-100'}`}>
          {BOOKS.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsReading(false);
                setReadingTime(0);
              }}
              className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 active:scale-95 ${
                index === currentIndex 
                  ? 'w-6 sm:w-8 bg-white' 
                  : 'w-1 sm:w-1.5 bg-white/30 active:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfiniteWheel;