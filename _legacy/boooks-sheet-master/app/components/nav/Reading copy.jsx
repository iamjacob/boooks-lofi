import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Play, Pause, RotateCcw, Clock, Calendar, Target } from 'lucide-react';

const books = [
  {
    id: 1,
    title: "actoionable gamification",
    author: "Matt Haig",
    pages: 304,
    currentPage: 127,
    totalMinutes: 320,
    startDate: "Mar 8, 2024",
    mood: "💭",
    loveRating: 5,
    goalDate: "Mar 20",
    cover: "bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700",
    image: "./reading/actionable.jpg"
  },
  {
    id: 2,
    title: "Chicken Soup for the Soul",
    author: "James Clear",
    pages: 320,
    currentPage: 45,
    totalMinutes: 285,
    startDate: "Mar 12, 2024",
    mood: "💡",
    loveRating: 4,
    goalDate: "Mar 25",
    cover: "bg-gradient-to-br from-orange-500 via-red-500 to-pink-500",
    image: "./reading/chickensoup.webp"
  },
  {
    id: 3,
    title: "The devops handbook",
    author: "Andy Weir",
    pages: 496,
    currentPage: 203,
    totalMinutes: 495,
    startDate: "Feb 28, 2024",
    mood: "🚀",
    loveRating: 5,
    goalDate: "Mar 18",
    cover: "bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400",
    image: "./reading/devops.jpg"
  },
  {
    id: 4,
    title: "The shaolin spirit",
    author: "Taylor Jenkins Reid",
    pages: 400,
    currentPage: 312,
    totalMinutes: 390,
    startDate: "Mar 5, 2024",
    mood: "✨",
    loveRating: 5,
    goalDate: "Mar 15",
    cover: "bg-gradient-to-br from-rose-400 via-fuchsia-400 to-purple-400",
    image: "./reading/shaolin.png"
  },
  {
    id: 5,
    title: "Strength side",
    author: "Tara Westover",
    pages: 352,
    currentPage: 89,
    totalMinutes: 350,
    startDate: "Mar 10, 2024",
    mood: "📖",
    loveRating: 4,
    goalDate: "Mar 22",
    cover: "bg-gradient-to-br from-amber-600 via-orange-600 to-red-600",
    image: "./reading/strength.jpg"
  },
  {
    id: 6,
    title: "Tao te Ching",
    author: "Tara Westover",
    pages: 352,
    currentPage: 89,
    totalMinutes: 350,
    startDate: "Mar 10, 2024",
    mood: "📖",
    loveRating: 4,
    goalDate: "Mar 22",
    cover: "bg-gradient-to-br from-amber-600 via-orange-600 to-red-600",
    image: "./reading/taoteching.jpg"
  }
];

export default function Reading({onClose}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [carouselTouchStart, setCarouselTouchStart] = useState(0);
  const [carouselTouchEnd, setCarouselTouchEnd] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? books.length - 1 : prev - 1));
    setIsReading(false);
    setReadingTime(0);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === books.length - 1 ? 0 : prev + 1));
    setIsReading(false);
    setReadingTime(0);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrevious();
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleCarouselTouchStart = (e) => {
    setCarouselTouchStart(e.targetTouches[0].clientX);
  };

  const handleCarouselTouchMove = (e) => {
    setCarouselTouchEnd(e.targetTouches[0].clientX);
  };

  const handleCarouselTouchEnd = () => {
    if (!carouselTouchStart || !carouselTouchEnd) return;
    const distance = carouselTouchStart - carouselTouchEnd;
    const isLeftSwipe = distance > 30;
    const isRightSwipe = distance < -30;

    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrevious();
    
    setCarouselTouchStart(0);
    setCarouselTouchEnd(0);
  };

  const toggleReading = () => {
    setIsReading(!isReading);
  };

  const resetTimer = () => {
    setReadingTime(0);
    setIsReading(false);
  };

  useEffect(() => {
    let interval;
    if (isReading) {
      interval = setInterval(() => {
        setReadingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isReading]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const currentBook = books[currentIndex];
  const progressPercent = (currentBook.currentPage / currentBook.pages) * 100;
  const pagesLeft = currentBook.pages - currentBook.currentPage;
  const minutesLeft = Math.round((pagesLeft / currentBook.pages) * currentBook.totalMinutes);
  const hoursLeft = Math.floor(minutesLeft / 60);
  const minsLeft = minutesLeft % 60;
  const timeLeftDisplay = hoursLeft > 0 ? `${hoursLeft}h ${minsLeft}m` : `${minsLeft}m`;

  return (
    <div className={`${onClose ? 'display-none':''} fade-in-slide flex items-center justify-center fixed bottom-[67px] w-screen z-[1001]`}>
      <div className="w-full">
     

        {/* Main Book Display - Simplified when reading */}
        {/* <div 
          className={`relative m-[16px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl mb-6 sm:mb-8 h-[60vh] sm:h-96 touch-pan-y transition-all duration-500 ${isReading ? 'opacity-90' : 'opacity-100'}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className={`absolute inset-0 ${currentBook.cover} transition-all duration-500`}>
            <div className={`absolute inset-0 bg-gradient-to-t transition-all duration-500 ${isReading ? 'from-black/80 via-black/30 to-black/40' : 'from-black/60 via-transparent to-black/20'}`} />
          </div>
          
          <div className="relative h-full flex flex-col justify-between p-4 sm:p-6 md:p-8">
            <div className={`flex items-center justify-between transition-all duration-500 ${isReading ? 'opacity-20' : 'opacity-100'}`}>
              <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center active:scale-95 active:bg-white/20 transition-all">
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>
              
              <button 
                onClick={toggleReading}
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-xs sm:text-sm active:scale-95 active:bg-white/20 transition-all flex items-center gap-1.5 sm:gap-2"
              >
                <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                {isReading ? 'Reading...' : 'Start Reading'}
              </button>
              
              <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center active:scale-95 active:bg-white/20 transition-all">
                <span className="text-white text-lg sm:text-xl">⋯</span>
              </button>
            </div>

            <div className={`flex justify-center items-center flex-1 transition-all duration-500 ${isReading ? 'opacity-30 scale-75' : 'opacity-100 scale-100'}`}>
              <div className="text-7xl sm:text-8xl md:text-9xl">
                {currentBook.image}
              </div>
            </div>

            <div className="text-white">
              <h2 className="text-2xl sm:text-3xl font-bold mb-0.5 sm:mb-1">{currentBook.title}</h2>
              <p className="text-white/80 text-xs sm:text-sm mb-2">{currentBook.author}</p>
              
              <div className="mb-3">
                <div className="flex justify-between text-[10px] sm:text-xs text-white/60 mb-1">
                  <span>Page {currentBook.currentPage} of {currentBook.pages}</span>
                  <span>{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className={` grid grid-cols-4 gap-2 text-[10px] sm:text-xs`}>
                <div className="flex flex-col items-center bg-white/5 backdrop-blur-sm rounded-lg p-1.5 sm:p-2">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 mb-0.5" />
                  <span className="text-white/90 font-semibold text-[9px] sm:text-[10px]">{currentBook.startDate}</span>
                  <span className="text-white/50 text-[8px] sm:text-[10px]">started</span>
                </div>
                <div className="flex flex-col items-center bg-white/5 backdrop-blur-sm rounded-lg p-1.5 sm:p-2">
                  <span className="text-xl sm:text-2xl mb-0.5">{currentBook.mood}</span>
                  <span className="text-white/90 font-semibold">{"❤️".repeat(currentBook.loveRating)}</span>
                  <span className="text-white/50 text-[8px] sm:text-[10px]">love</span>
                </div>
                <div className="flex flex-col items-center bg-white/5 backdrop-blur-sm rounded-lg p-1.5 sm:p-2">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 mb-0.5" />
                  <span className="text-white/90 font-semibold text-[9px] sm:text-xs">{timeLeftDisplay}</span>
                  <span className="text-white/50 text-[8px] sm:text-[10px]">left</span>
                </div>
                <div className="flex flex-col items-center bg-white/5 backdrop-blur-sm rounded-lg p-1.5 sm:p-2">
                  <Target className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400 mb-0.5" />
                  <span className="text-white/90 font-semibold text-[9px] sm:text-xs">{currentBook.goalDate}</span>
                  <span className="text-white/50 text-[8px] sm:text-[10px]">goal</span>
                </div>
              </div>
            </div>
          </div>
        </div> */}

           {/* Reading Timer Control Bar - Minimalist when reading */}
        {/* <div className={`mb-4 m-[16px] sm:mb-6 transition-all duration-500 ${isReading ? 'opacity-30 hover:opacity-100' : 'opacity-100'}`}> */}
        <div className={`mb-4 m-[16px] sm:mb-6 transition-all duration-500`}>
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-xl border border-white/5">
            <div className="flex items-center justify-between gap-3">
              {/* Timer Controls */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={resetTimer}
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center active:scale-95 active:bg-white/10 transition-all"
                >
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
                </button>
                
                <button
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center active:scale-95 active:bg-white/10 transition-all"
                >
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
                </button>

                <div className="flex gap-1.5 sm:gap-2">
                  <div className="w-1 h-7 sm:h-8 bg-white/20 rounded-full"></div>
                  <div className="w-1 h-7 sm:h-8 bg-white/20 rounded-full"></div>
                </div>

                <button
                  onClick={toggleReading}
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center active:scale-95 active:bg-white/15 transition-all"
                >
                  {isReading ? (
                    <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="white" />
                  ) : (
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5" fill="white" />
                  )}
                </button>
              </div>

              {/* Timer Display & Book Info */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="text-right">
                  <div className="text-white font-mono text-lg sm:text-2xl font-bold tracking-wider">
                    {formatTime(readingTime)}
                  </div>
                  <div className="text-white/60 text-[10px] sm:text-xs uppercase tracking-wide">
                    {currentBook.title.length > 15 ? currentBook.title.substring(0, 15) + '...' : currentBook.title}
                  </div>
                </div>

                {/* Book Cover Thumbnail */}
                <div className={`w-12 h-16 sm:w-14 sm:h-20 rounded-lg ${currentBook.cover} flex items-center justify-center text-2xl sm:text-3xl shadow-lg`}>
                  <img src={currentBook.image} alt={currentBook.title} className="w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Carousel - Infinite scroll with centered active book */}
        {/* <div className={`relative transition-all duration-500 ${isReading ? 'opacity-30' : 'opacity-100'}`}> */}
        <div className={`relative transition-all duration-500`}>
          <div 
            className="flex items-end justify-center gap-1.5 sm:gap-2 overflow-hidden px-12 sm:px-16 touch-pan-y"
            onTouchStart={handleCarouselTouchStart}
            onTouchMove={handleCarouselTouchMove}
            onTouchEnd={handleCarouselTouchEnd}
          >
            {/* Generate enough books to fill the width (show 10 books on each side) */}
  {Array.from({ length: 10 }).map((_, idx) => {
              const bookIndex = (currentIndex + 1 + idx) % books.length;
              const book = books[bookIndex];
              if (!book) return null; // Guard against undefined entries
              
              
              return (
                <button
                  key={`left-${idx}`}
                  onClick={() => {
                    setCurrentIndex(bookIndex);
                    setIsReading(false);
                    setReadingTime(0);
                  }}
                  className="relative transition-all duration-300 overflow-hidden flex-shrink-0 active:scale-95 w-10 h-14 sm:w-12 sm:h-16 md:w-14 md:h-20 opacity-80 hover:opacity-90 active:opacity-95"
                >
                  <div className={`w-full h-full ${book.cover} flex items-center justify-center text-lg sm:text-xl md:text-2xl`}>
                    <img src={book.image} alt={book.title} className="w-max-[50px] h-[auto] aspect-ratio" />
                  </div>
                </button>
              );
            })}

            {/* Center active book - larger */}
            <button
              onClick={() => {
                setIsReading(false);
                setReadingTime(0);
              }}
              className="relative transition-all duration-300 overflow-hidden flex-shrink-0 w-14 h-20 sm:w-16 sm:h-24 md:w-20 md:h-28 scale-105 shadow-xl z-10"
            >
              <div className={`w-full h-full ${currentBook.cover} flex items-center justify-center text-2xl sm:text-3xl md:text-4xl`}>
                <img src={currentBook.image} alt={currentBook.title} className="w-max-[100px] h-[auto] aspect-ratio" />
              </div>
              <div className="absolute inset-0 ring-2 ring-white" />
            </button>

            {/* Show books on right */}
            {Array.from({ length: 10 }).map((_, idx) => {
              const bookIndex = (currentIndex + 1 + idx) % books.length;
              const book = books[bookIndex];
              
              return (
                <button
                  key={`right-${idx}`}
                  onClick={() => {
                    setCurrentIndex(bookIndex);
                    setIsReading(false);
                    setReadingTime(0);
                  }}
                  className="relative transition-all duration-300 overflow-hidden flex-shrink-0 active:scale-95 w-10 h-14 sm:w-12 sm:h-16 md:w-14 md:h-20 opacity-80 hover:opacity-90 active:opacity-95"

                >
                  <div className={`w-full h-full ${book.cover} flex items-center justify-center text-lg sm:text-xl md:text-2xl`}>
                    <img src={book.image} alt={book.title} className="w-max-[50px] h-[auto] aspect-ratio" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 m-[8px] sm:w-10 sm:h-10 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center active:scale-95 active:bg-white/10 transition-all z-20"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 m-[8px] sm:w-10 sm:h-10 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center active:scale-95 active:bg-white/10 transition-all z-20"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
        </div>

        {/* Progress Dots - Fades when reading */}
        <div className={`flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6 transition-all duration-500 ${isReading ? 'opacity-30' : 'opacity-100'}`}>
          {books.map((_, index) => (
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
}