import { useEffect, useRef, useState } from "react";
import { Pause, Circle } from "lucide-react";
import Book from "../Book";
import HeartIcon from "./menu/HeartIcon"

const BOOKS = [
  {
    id: 1,
    title: "Actionable Gamification",
    author: "Yu-kai Chou",
    image: "./assets/books/reading/actionable.jpg",
  },
  {
    id: 2,
    title: "Chicken Soup for the Soul",
    author: "Jack Canfield",
    image: "./assets/books/reading/chickensoup.webp",
  },
  {
    id: 3,
    title: "The DevOps Handbook",
    author: "Gene Kim",
    image: "./assets/books/reading/devops.jpg",
  },
  {
    id: 4,
    title: "The Shaolin Spirit",
    author: "Bernhard Moestl",
    image: "./assets/books/reading/shaolin.png",
  },
  {
    id: 5,
    title: "Strength Side",
    author: "Strength Side",
    image: "./assets/books/reading/strength.jpg",
  },
  {
    id: 6,
    title: "Tao Te Ching",
    author: "Lao Tzu",
    image: "./assets/books/reading/taoteching.jpg",
  },
  {
    id: 7,
    title: "The wealth money can't buy",
    author: "Robin Sharma",
    image: "./assets/books/reading/wealth.webp",
  },
];

const FRICTION = 0.95;
const SNAP_STRENGTH = 0.12;

const Reading = ({ onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const wheelRef = useRef(null);
  const trackRef = useRef(null);
  const [activeBook, setActiveBook] = useState(BOOKS[0]);
  const timerIntervalRef = useRef(null);

  const state = useRef({
    x: 0,
    v: 0,
    down: false,
    lastX: 0,
    pointerId: null,
  });

  // Timer effect
  useEffect(() => {
    if (isReading) {
      timerIntervalRef.current = setInterval(() => {
        setReadingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isReading]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const wheel = wheelRef.current;
    const track = trackRef.current;
    let rafId;

    const render = () => {
      const s = state.current;

      if (!s.down) {
        s.x += s.v;
        s.v *= FRICTION;

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

      const setWidth = track.scrollWidth / 3;
      if (s.x > 0) s.x -= setWidth;
      if (s.x < -setWidth) s.x += setWidth;

      track.style.transform = `translate3d(${s.x}px, 0, 0)`;
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

        const maxDist = wheelRect.width / 2;
        const normalizedDist = Math.min(dist / maxDist, 1);
        const scale = 1 - normalizedDist * 0.3;
        const opacity = 1 - normalizedDist * 0.6;

        item.style.transform = `scale(${scale})`;
        item.style.opacity = opacity;

        if (dist < minDiff) {
          minDiff = dist;
          closestBook = item;
        }
      }

      if (closestBook) {
        const bookId = parseInt(closestBook.getAttribute("data-id"));
        const found = BOOKS.find((b) => b.id === bookId);
        if (found && activeBook?.id !== found.id) {
          setActiveBook(found);
          const newIndex = BOOKS.findIndex((b) => b.id === found.id);
          setCurrentIndex(newIndex);
        }
      }
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, [activeBook]);


  const handleBookClick = (e) => {
    // if (Math.abs(state.current.v) > 1.5) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const wheelRect = wheelRef.current.getBoundingClientRect();
    state.current.x +=
      wheelRect.left + wheelRect.width / 2 - (rect.left + rect.width / 2);
    state.current.v = 0;
  };

  const handlePointerDown = (e) => {
  state.current.down = true;
  state.current.lastX = e.clientX;
};

const handlePointerMove = (e) => {
  if (!state.current.down) return;
  const dx = e.clientX - state.current.lastX;
  state.current.lastX = e.clientX;
  state.current.x += dx;
  state.current.v = dx;
};

const handlePointerUp = () => {
  state.current.down = false;
};


  const handleDotClick = (index) => {
    const targetBook = BOOKS[index];
    setCurrentIndex(index);
    setActiveBook(targetBook);
    setIsReading(false);
    setReadingTime(0);

    // Calculate the position difference and smoothly move to it
    const wheelRect = wheelRef.current.getBoundingClientRect();
    const items = Array.from(trackRef.current.children);
    const targetItem = items.find(
      (item) => parseInt(item.getAttribute("data-id")) === targetBook.id
    );

    if (targetItem) {
      const rect = targetItem.getBoundingClientRect();
      const centerDiff =
        wheelRect.left + wheelRect.width / 2 - (rect.left + rect.width / 2);
      state.current.x += centerDiff;
      state.current.v = 0;
    }
  };

  const toggleReading = () => {
    setIsReading(!isReading);
  };

  return (
    <div className="fixed top-0 w-screen h-screen flex flex-col justify-between z-10 pointer-events-auto">
      {/* Progress bar animation */}
      <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full bg-red-700 transition-all duration-1000 ${
            isReading ? "animate-pulse" : ""
          }`}
          style={{ width: isReading ? "100%" : "0%" }}
        />
      </div>

      <button>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>assets/books/
      </button>


    <div className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none">
  
        <Book position={[0, 20, -32]} coverImg={activeBook?.image} isReading={isReading}/>


</div>
          {/* ${ isReading ? "-mb-16" : "mb-8"} */}

      <div
        className={`${ isReading ? "h-14" : "h-56"} transition-all delay-300 w-screen z-20 flex flex-col`}
      > 
        {/* Book Info with Timer + ?? */}
          <div 
           className={` ${
          !isReading ? "h-12" : "h-18"
        } transition-all delay-300 bg-white/10 backdrop-blur-sm rounded-2xl m-2`}
          
          >
            <div 
            className="h-full flex items-center justify-between ">
              <div className="flex flex-col m-2">
                <button
                  onClick={toggleReading}
                  className={`w-8 h-8 ${isReading ? 'rounded-lg ring-red-700' :'rounded-full ring-red-700' } shadow-lg active:scale-90 ring-2 bg-gray-100/10 hover:bg-gray-100 flex items-center justify-center hover:scale-105`}
                >
                  {isReading ? (
                    <Pause
                      className="w-4 h-4 text-white"
                    />
                  ) : (
                    <Circle fill="oklch(50.5% 0.213 27.518)" className="w-4 h-4 text-red-700" />
                  )}
                </button>
              </div>

              <div className="flex flex-col w-full">
                <span className="text sm:text-xl font-bold text-white">
                  {activeBook?.title}
                </span>
                <span className="text-sm sm:text-ml  text-purple-300">
                  {activeBook?.author}
                </span>
              </div>
               <span className="text-sm mx-2 text-gray-400">
          {formatTime(readingTime)}
        </span>
<div className="m-1 p-1 text-gray-400 active:scale-90 transition-transform">

        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link-icon lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
</div>
            
            
              <div
                className={`hidden transition-all delay-300 mb-2 flex items-center justify-center text-lg sm:text-xl md:text-2xl`}
              >
                <img
                  src={activeBook?.image}
                  alt={activeBook?.title}
                  className=" h-12 m-4 aspect-ratio"
                />
              </div>
            </div>
          </div>
<HeartIcon/>
          {/* Wheel */}
          <div className="flex-col flex h-50 pb-10">
            
         <div
  ref={wheelRef}
  onPointerDown={handlePointerDown}
  onPointerMove={handlePointerMove}
  onPointerUp={handlePointerUp}
  onPointerCancel={handlePointerUp}
  className={`
    relative z-30
    overflow-hidden h-28 cursor-grab active:cursor-grabbing
    transition-all duration-300 ease-out
    ${
      isReading
        ? "opacity-0 scale-95 pointer-events-none"
        : "opacity-100 scale-100"
    }
  `}
>

            <div className="inset-0 flex items-baseline select-none touch-none" ref={trackRef}>
              {[...BOOKS, ...BOOKS, ...BOOKS].map((book, i) => (
                <div
                  key={`${book.id}-${i}`}
                  className="flex-shrink-0 w-10 h-14 mx-1 transition-all duration-300"
                  data-id={book.id}
                  onClick={handleBookClick}
                >
                  {/* <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg shadow-2xl flex items-center justify-center text-white font-bold text-center p-4">
                  <div>
                    <div className="text-lg mb-2">{book.title}</div>
                    <div className="text-sm opacity-75">{book.author}</div>
                  </div>
                </div> */}

                  <div
                    className={`w-full h-full ${book.cover} flex items-center justify-center text-lg sm:text-xl md:text-2xl`}
                  >
                    <img
                      src={book.image}
                      alt={book.title}
                      draggable="false"
                      className="w-max-[50px] h-auto aspect-ratio [-webkit-box-reflect:below_0.5em_linear-gradient(rgb(0_0_0_/_0),rgb(0_0_0_/_0.25))]"
                    />
                  </div>
                </div>
              ))}

              {/* Add 'Add Book button that is for every new loop? */}
            </div>

            {/* Center indicator */}
            <div className="absolute left-1/2 h-20 rounded-full bottom-14 w-0.5 bg-red-700/20 pointer-events-none -translate-x-1/2" />
          </div>
          
          {/* Wheel */}
         <div
  ref={wheelRef}
  onPointerDown={handlePointerDown}
  onPointerMove={handlePointerMove}
  onPointerUp={handlePointerUp}
  onPointerCancel={handlePointerUp}
  className={`
    relative z-30
    overflow-hidden h-28 cursor-grab active:cursor-grabbing
    transition-all duration-300 ease-out
    ${
      isReading
        ? "opacity-0 scale-95 pointer-events-none"
        : "opacity-100 scale-100"
    }
  `}
>

            <div className="inset-0 flex items-baseline select-none touch-none" ref={trackRef}>
              {[...BOOKS, ...BOOKS, ...BOOKS].map((book, i) => (
                <div
                  key={`${book.id}-${i}`}
                  className="flex-shrink-0 w-10 h-14 mx-1 transition-all duration-300"
                  data-id={book.id}
                  onClick={handleBookClick}
                >
                  {/* <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg shadow-2xl flex items-center justify-center text-white font-bold text-center p-4">
                  <div>
                    <div className="text-lg mb-2">{book.title}</div>
                    <div className="text-sm opacity-75">{book.author}</div>
                  </div>
                </div> */}

                  <div
                    className={`w-full h-full ${book.cover} flex items-center justify-center text-lg sm:text-xl md:text-2xl`}
                  >
                    <img
                      src={book.image}
                      alt={book.title}
                      draggable="false"
                      className="w-max-[50px] h-auto aspect-ratio [-webkit-box-reflect:below_0.5em_linear-gradient(rgb(0_0_0_/_0),rgb(0_0_0_/_0.25))]"
                    />
                  </div>
                </div>
              ))}

              {/* Add 'Add Book button that is for every new loop? */}
            </div>

            {/* Center indicator */}
            <div className="absolute left-1/2 h-20 rounded-full bottom-14 w-0.5 bg-red-700/20 pointer-events-none -translate-x-1/2" />
          </div>
          </div>


          {/* Pagination Dots */}
          {/* <div
            className={`h-3 w-screen flex justify-center gap-2 transition-all duration-500 ${
              isReading ? "opacity-80" : "opacity-100"
            }`}
          >
            {BOOKS.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-1.5 rounded-full transition-all duration-300 hover:bg-white/50 active:scale-95 ${
                  index === currentIndex ? "h-8 bg-white" : "h-1.5 bg-white/30"
                }`}
              />
            ))}
          </div> */}
      </div>
    </div>
  );
};

export default Reading;