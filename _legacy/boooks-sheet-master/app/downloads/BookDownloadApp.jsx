import React, { useState } from 'react';
import { Download, ChevronDown, Search, TrendingUp, Clock, Star } from 'lucide-react';

const BookDownloadApp = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const books = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
      size: "2.4 MB",
      format: "EPUB",
      seeds: 1247,
      leeches: 89,
      downloads: 45231,
      rating: 4.8,
      uploadDate: "2 days ago"
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop",
      size: "3.1 MB",
      format: "PDF",
      seeds: 2891,
      leeches: 234,
      downloads: 89432,
      rating: 4.9,
      uploadDate: "1 week ago"
    },
    {
      id: 3,
      title: "Project Hail Mary",
      author: "Andy Weir",
      cover: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=600&fit=crop",
      size: "4.2 MB",
      format: "EPUB",
      seeds: 3421,
      leeches: 456,
      downloads: 123445,
      rating: 4.7,
      uploadDate: "3 days ago"
    },
    {
      id: 4,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      cover: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&h=600&fit=crop",
      size: "1.8 MB",
      format: "MOBI",
      seeds: 1876,
      leeches: 145,
      downloads: 67234,
      rating: 4.6,
      uploadDate: "5 days ago"
    },
    {
      id: 5,
      title: "Dune",
      author: "Frank Herbert",
      cover: "https://images.unsplash.com/photo-1606833943961-d0f8d02a2f85?w=400&h=600&fit=crop",
      size: "5.6 MB",
      format: "EPUB",
      seeds: 4532,
      leeches: 678,
      downloads: 234567,
      rating: 4.9,
      uploadDate: "1 day ago"
    },
    {
      id: 6,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
      size: "2.9 MB",
      format: "PDF",
      seeds: 987,
      leeches: 67,
      downloads: 34221,
      rating: 4.5,
      uploadDate: "4 days ago"
    }
  ];

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSeedHealth = (seeds, leeches) => {
    const ratio = seeds / (leeches + 1);
    if (ratio > 10) return { color: 'text-green-400', label: 'Excellent' };
    if (ratio > 5) return { color: 'text-lime-400', label: 'Good' };
    if (ratio > 2) return { color: 'text-yellow-400', label: 'Fair' };
    return { color: 'text-red-400', label: 'Low' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-black text-white pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Library</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search books or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4 py-4 flex gap-4 overflow-x-auto">
        <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-lg px-4 py-3 min-w-fit border border-green-500/20">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-xs text-gray-400">Trending</span>
          </div>
          <div className="text-lg font-bold mt-1">2.4k</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-lg px-4 py-3 min-w-fit border border-blue-500/20">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-gray-400">Recent</span>
          </div>
          <div className="text-lg font-bold mt-1">348</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-lg px-4 py-3 min-w-fit border border-purple-500/20">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-gray-400">Top Rated</span>
          </div>
          <div className="text-lg font-bold mt-1">156</div>
        </div>
      </div>

      {/* Books List */}
      <div className="px-4 py-2">
        {filteredBooks.map((book) => {
          const health = getSeedHealth(book.seeds, book.leeches);
          return (
            <div
              key={book.id}
              className="mb-3 bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-xl overflow-hidden hover:from-gray-800/60 hover:to-gray-900/60 transition-all"
              onClick={() => setSelectedBook(selectedBook?.id === book.id ? null : book)}
            >
              <div className="flex items-center gap-3 p-3">
                {/* Book Cover */}
                <div className="relative flex-shrink-0">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-14 h-20 object-cover rounded-lg shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                    <Download className="w-3 h-3 text-black" />
                  </div>
                </div>

                {/* Book Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">{book.title}</h3>
                  <p className="text-sm text-gray-400 truncate">{book.author}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500">{book.format}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{book.size}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs text-gray-400">{book.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Seed/Leech Indicator */}
                <div className="flex flex-col items-end gap-1">
                  <div className={`text-xs font-medium ${health.color}`}>
                    ▲ {book.seeds}
                  </div>
                  <div className="text-xs text-red-400">
                    ▼ {book.leeches}
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      selectedBook?.id === book.id ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </div>

              {/* Expanded Details */}
              {selectedBook?.id === book.id && (
                <div className="px-3 pb-3 pt-1 border-t border-gray-700/50">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-gray-800/50 rounded-lg p-2">
                      <div className="text-xs text-gray-400">Health</div>
                      <div className={`text-sm font-semibold ${health.color}`}>
                        {health.label}
                      </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-2">
                      <div className="text-xs text-gray-400">Downloads</div>
                      <div className="text-sm font-semibold text-white">
                        {book.downloads.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-2">
                      <div className="text-xs text-gray-400">Uploaded</div>
                      <div className="text-sm font-semibold text-white">
                        {book.uploadDate}
                      </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-2">
                      <div className="text-xs text-gray-400">Ratio</div>
                      <div className="text-sm font-semibold text-white">
                        {(book.seeds / (book.leeches + 1)).toFixed(1)}:1
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:from-green-600 hover:to-green-700 transition-all shadow-lg">
                    <Download className="w-5 h-5" />
                    Download {book.format}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-gray-800 px-4 py-3">
        <div className="flex justify-around items-center">
          <button className="flex flex-col items-center gap-1 text-green-400">
            <Download className="w-6 h-6" />
            <span className="text-xs">Library</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <TrendingUp className="w-6 h-6" />
            <span className="text-xs">Trending</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <Clock className="w-6 h-6" />
            <span className="text-xs">Recent</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <Star className="w-6 h-6" />
            <span className="text-xs">Favorites</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDownloadApp;