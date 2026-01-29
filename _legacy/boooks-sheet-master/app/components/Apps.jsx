import React, { useState } from 'react';
import { BookOpen, Store, Map,Remote, Link, Maximize,ScanLine, Settings, Sparkles, Target, Brain, Bookmark, Calendar, MessageCircle, Camera, Music, Heart, Search, Cast, Radio, Wifi, Bluetooth, Moon } from 'lucide-react';

const Apps = ({ onClose })=> {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const [wifiOn, setWifiOn] = useState(true);
  const [bluetoothOn, setBluetoothOn] = useState(false);
  const [remoteOn, setRemoteOn] = useState(true);
  const [castOn, setCastOn] = useState(false);
  const [darkModeOn, setDarkModeOn] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const allApps = [
    // Page 1
    [
      { name: 'Boooks', icon: BookOpen, color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
      { name: 'XOR Store', icon: Store, color: 'bg-gradient-to-br from-blue-500 to-cyan-500' },
      { name: 'Maps', icon: Map, color: 'bg-gradient-to-br from-green-500 to-emerald-500' },
      { name: 'Blockchain', icon: Link, color: 'bg-gradient-to-br from-orange-500 to-red-500' },
      { name: 'Scanner', icon: ScanLine, color: 'bg-gradient-to-br from-indigo-500 to-purple-500' },
      { name: 'Settings', icon: Settings, color: 'bg-gradient-to-br from-gray-500 to-gray-700' },
      { name: 'Dreams', icon: Sparkles, color: 'bg-gradient-to-br from-violet-500 to-purple-600' },
      { name: 'Goals', icon: Target, color: 'bg-gradient-to-br from-red-500 to-orange-500' },
    ],
    // Page 2
    [
      { name: 'Thoughts', icon: Brain, color: 'bg-gradient-to-br from-pink-500 to-rose-500' },
      { name: 'Bookmarks', icon: Bookmark, color: 'bg-gradient-to-br from-yellow-500 to-amber-500' },
      { name: 'Calendar', icon: Calendar, color: 'bg-gradient-to-br from-teal-500 to-cyan-500' },
      { name: 'Messages', icon: MessageCircle, color: 'bg-gradient-to-br from-blue-600 to-indigo-600' }
    ]
  ];

  const filteredApps = searchQuery
    ? allApps.flat().filter(app => 
        app.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  const displayApps = filteredApps || allApps[currentPage];

  // Swipe handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentPage < allApps.length - 1) {
      setCurrentPage(currentPage + 1);
    }
    if (isRightSwipe && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e) => {
    setTouchStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (touchStart) {
      setTouchEnd(e.clientX);
    }
  };

  const handleMouseUp = () => {
    if (!touchStart || !touchEnd) {
      setTouchStart(0);
      setTouchEnd(0);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentPage < allApps.length - 1) {
      setCurrentPage(currentPage + 1);
    }
    if (isRightSwipe && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

   return (

    <div>
       {/* Quick Toggle Buttons */}
         <div className="mb-4 flex justify-center gap-2 sm:gap-3">
        {/*  <button
            onClick={() => setWifiOn(!wifiOn)}
            className={`p-2 sm:p-3 rounded-xl transition-all ${
              wifiOn 
                ? 'bg-blue-500 text-white shadow-lg' 
                : 'bg-white/50 text-gray-600'
            }`}
          >
            <Wifi className="w-4 h-4 sm:w-5 sm:h-5" />
          </button> */}
          <button
            onClick={() => setBluetoothOn(!bluetoothOn)}
            className={`p-2 sm:p-3 rounded-xl transition-all ${
              bluetoothOn 
                ? 'bg-blue-500 text-white shadow-lg' 
                : 'bg-white/50 text-gray-600'
            }`}
          >
            <Bluetooth className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => setRemoteOn(!remoteOn)}
            className={`p-2 sm:p-3 rounded-xl transition-all ${
              remoteOn 
                ? 'bg-blue-500 text-white shadow-lg' 
                : 'bg-white/50 text-gray-600'
            }`}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M320-40q-33 0-56.5-23.5T240-120v-720q0-33 23.5-56.5T320-920h320q33 0 56.5 23.5T720-840v720q0 33-23.5 56.5T640-40H320Zm0-80h320v-720H320v720Zm160-440q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0-80q-17 0-28.5-11.5T440-680q0-17 11.5-28.5T480-720q17 0 28.5 11.5T520-680q0 17-11.5 28.5T480-640Zm-80 240q17 0 28.5-11.5T440-440q0-17-11.5-28.5T400-480q-17 0-28.5 11.5T360-440q0 17 11.5 28.5T400-400Zm160 0q17 0 28.5-11.5T600-440q0-17-11.5-28.5T560-480q-17 0-28.5 11.5T520-440q0 17 11.5 28.5T560-400ZM400-280q17 0 28.5-11.5T440-320q0-17-11.5-28.5T400-360q-17 0-28.5 11.5T360-320q0 17 11.5 28.5T400-280Zm160 0q17 0 28.5-11.5T600-320q0-17-11.5-28.5T560-360q-17 0-28.5 11.5T520-320q0 17 11.5 28.5T560-280ZM400-160q17 0 28.5-11.5T440-200q0-17-11.5-28.5T400-240q-17 0-28.5 11.5T360-200q0 17 11.5 28.5T400-160Zm160 0q17 0 28.5-11.5T600-200q0-17-11.5-28.5T560-240q-17 0-28.5 11.5T520-200q0 17 11.5 28.5T560-160Zm-240 40v-720 720Z"/></svg>
          </button>
          <button
            onClick={() => setCastOn(!castOn)}
            className={`p-2 sm:p-3 rounded-xl transition-all ${
              castOn 
                ? 'bg-yellow-400 text-white shadow-lg' 
                : 'bg-white/50 text-gray-600'
            }`}
          >
            <Cast className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => setDarkModeOn(!darkModeOn)}
            className={`p-2 sm:p-3 rounded-xl transition-all ${
              darkModeOn 
                ? 'bg-indigo-600 text-white shadow-lg' 
                : 'bg-white/50 text-gray-600'
            }`}
          >
            <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => setFullscreen(!fullscreen)}
            className={`p-2 sm:p-3 rounded-xl transition-all ${
              fullscreen 
                ? 'bg-indigo-600 text-white shadow-lg' 
                : 'bg-white/50 text-gray-600'
            }`}
          >
            <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
     <div className="bg-white/30 backdrop-blur-md rounded-3xl p-4 sm:p-6 shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto">
        
   

        {/* App Grid */}
        <div 
          className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 select-none cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {displayApps.map((app, index) => (
            <div key={index} className="flex flex-col items-center space-y-1 sm:space-y-2">
              <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${app.color} rounded-xl sm:rounded-2xl shadow-lg flex items-center justify-center transform transition-transform hover:scale-110 cursor-pointer active:scale-95`}>
                <app.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" strokeWidth={2} />
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-gray-700 text-center leading-tight">{app.name}</span>
            </div>
          ))}
        </div>

        {/* Page Indicator Dots */}
        {!searchQuery && (
          <div className="flex justify-center space-x-2">
            {allApps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`h-2 rounded-full transition-all ${
                  currentPage === index 
                    ? 'w-6 bg-white' 
                    : 'w-2 bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
        
             {/* Search Bar */}
        <div className="mt-4 sm:mt-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          <input
            type="text"
            placeholder="Search apps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base bg-white/50 backdrop-blur-sm rounded-2xl border-none outline-none focus:bg-white/70 transition-all placeholder-gray-600 text-gray-800"
          />
        </div>
      </div>
    </div>
  );
}

export default Apps