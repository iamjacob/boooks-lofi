import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, Camera, X, Clock, TrendingUp } from 'lucide-react';
import Book from './../Book'
export default function Search({ onClose, isOpen, openCam }) {
  const [isExpanded, setIsExpanded] = useState(Boolean(isOpen));
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef(null);

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const [recentSearches] = useState([
    'Malcolm Gladwell',
    'Psychology books',
    'Blink'
  ]);
  
  const recommendations = [
    'Atomic Habits',
    'Thinking, Fast and Slow',
    'The Power of Habit',
    'Sapiens'
  ];

  const sampleBooks = [
    'Blink',
    'Outliers',
    'David and Goliath',
    'The Tipping Point',
    'Atomic Habits',
    'Sapiens'
  ];

  const filteredResults = searchValue
    ? sampleBooks.filter((b) => b.toLowerCase().includes(searchValue.toLowerCase()))
    : [];

  const handleCameraClick = () => {
    openCam()
    // alert('Camera feature - Scan book covers or barcodes!');
  };

  /* =========================
     PERFECT KEYBOARD HANDLING
     ========================= */
  useEffect(() => {
    if (!window.visualViewport) return;

    const updateKeyboard = () => {
      const vv = window.visualViewport;
      const height = Math.max(
        0,
        window.innerHeight - vv.height - vv.offsetTop
      );
      setKeyboardHeight(height);
    };

    window.visualViewport.addEventListener('resize', updateKeyboard);
    window.visualViewport.addEventListener('scroll', updateKeyboard);

    updateKeyboard();

    return () => {
      window.visualViewport.removeEventListener('resize', updateKeyboard);
      window.visualViewport.removeEventListener('scroll', updateKeyboard);
    };
  }, []);
  /* ========================= */

  useEffect(() => {
    setIsExpanded(Boolean(isOpen));
  }, [isOpen]);

  useEffect(() => {
    if (isExpanded) {
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [isExpanded]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && isExpanded) onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isExpanded, onClose]);

  const handleTransitionEnd = () => {
    if (!isExpanded) setSearchValue('');
  };

  const handleClose = () => onClose?.();

  return (
    <div className="pointer-events-none">
      {/* Overlay */}
      {/* <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isExpanded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      /> */}

      {/* Search Results */}
      {isExpanded && searchValue && (
        <div
          className="fixed left-4 right-4 mx-auto max-w-md z-50 mt-2 backdrop-blur-md bg-black/50 border border-white/10 rounded-2xl overflow-hidden"
          style={{
            bottom: 84,
            transform: `translateY(-${keyboardHeight}px)`,
            animation: 'slideUp 0.28s cubic-bezier(.2,.9,.2,1)'
          }}
        >
          {filteredResults.length ? (
            filteredResults.map((book, i) => (
              <div key={i} className="px-4 py-3 border-b border-white/8 flex">
                <p className="text-white">{book}</p><Book cover={'./billeder/111.jpg'}/>
              </div>
            ))
          ) : (
            <div className="px-4 py-6 text-center text-white/60">
              No results for "{searchValue}"
            </div>
          )}
        </div>
      )}

      {/* Search Bar */}
      <div
        className={`fixed flex gap-1 bottom-0 left-0 right-0 px-2 transition-all duration-300 ease-out ${
          isExpanded ? '-translate-y-2 opacity-100 pointer-events-auto' : 'translate-y-24 opacity-0 pointer-events-none'
        }`}
        style={{
          transform: `translateY(-${keyboardHeight}px)`
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="p-2 relative backdrop-blur-xl bg-black/10 border border-white/20 shadow-2xl rounded-full flex items-center justify-center active:scale-90 transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        </div>

        <div className="relative flex-1 backdrop-blur-xl bg-black/10 border border-white/20 rounded-full">
          <div className="flex items-center gap-3 px-3 py-2 min-w-0">
            <SearchIcon size={20} className="text-black/70 shrink-0" />
            <input
              ref={inputRef}
              value={searchValue}
              name="search"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search books..."
              className="w-full bg-transparent text-black outline-none min-w-0"
            />
            {searchValue && (
              <button onClick={() => setSearchValue('')}>
                <X size={18} className="text-white/50" />
              </button>
            )}
            <button onClick={handleCameraClick} className='active:scale-90 transition-transform'>
              <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 13H9"
            stroke="#333"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M12 10L12 16"
            stroke="#333"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M9.77778 21H14.2222C17.3433 21 18.9038 21 20.0248 20.2646C20.51 19.9462 20.9267 19.5371 21.251 19.0607C22 17.9601 22 16.4279 22 13.3636C22 10.2994 22 8.76721 21.251 7.6666C20.9267 7.19014 20.51 6.78104 20.0248 6.46268C19.3044 5.99013 18.4027 5.82123 17.022 5.76086C16.3631 5.76086 15.7959 5.27068 15.6667 4.63636C15.4728 3.68489 14.6219 3 13.6337 3H10.3663C9.37805 3 8.52715 3.68489 8.33333 4.63636C8.20412 5.27068 7.63685 5.76086 6.978 5.76086C5.59733 5.82123 4.69555 5.99013 3.97524 6.46268C3.48995 6.78104 3.07328 7.19014 2.74902 7.6666C2 8.76721 2 10.2994 2 13.3636C2 16.4279 2 17.9601 2.74902 19.0607C3.07328 19.5371 3.48995 19.9462 3.97524 20.2646C5.09624 21 6.65675 21 9.77778 21Z"
            stroke="#333"
            strokeWidth="1.5"
          />
          <path
            d="M19 10H18"
            stroke="#333"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
            </button>
          </div>
        </div>
        <div className="p-2 relative backdrop-blur-xl bg-black/10 border border-white/20 shadow-2xl rounded-full flex items-center justify-center active:scale-90 transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info-icon lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        </div>

      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
