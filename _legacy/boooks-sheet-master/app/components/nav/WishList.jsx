import React, { useState } from 'react';
import { TrendingUp, ChevronUp, ChevronDown } from 'lucide-react';
// import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Drawer from '../ui/Drawer';

export default function WishList({onDonateClick}) {
const mockItem = { id: "book-123", ownerId: "user-456", title: "Example" };


  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Atomic Habits",
      price: 180,
      upvotes: 45,
      downvotes: 3,
      timeline: [
        { period: 0, active: 85 },
        { period: 1, active: 120 },
        { period: 2, active: 100 },
        { period: 3, active: 80 },
        { period: 4, active: 70 },
        { period: 5, active: 60 },
        { period: 6, active: 50 },
        { period: 7, active: 40 }
      ]
    },
    {
      id: 2,
      title: "Thinking, Fast and Slow",
      price: 200,
      upvotes: 78,
      downvotes: 12,
      timeline: [
        { period: 0, active: 180 },
        { period: 1, active: 220 },
        { period: 2, active: 250 },
        { period: 3, active: 200 },
        { period: 4, active: 180 },
        { period: 5, active: 150 },
        { period: 6, active: 120 },
        { period: 7, active: 100 }
      ]
    },
    {
      id: 3,
      title: "The Power of Habit",
      price: 160,
      upvotes: 34,
      downvotes: 8,
      timeline: [
        { period: 0, active: 120 },
        { period: 1, active: 150 },
        { period: 2, active: 160 },
        { period: 3, active: 120 },
        { period: 4, active: 100 },
        { period: 5, active: 80 },
        { period: 6, active: 60 },
        { period: 7, active: 40 }
      ]
    },
    {
      id: 4,
      title: "Sapiens",
      price: 190,
      upvotes: 23,
      downvotes: 5,
      timeline: [
        { period: 0, active: 50 },
        { period: 1, active: 60 },
        { period: 2, active: 70 },
        { period: 3, active: 50 },
        { period: 4, active: 45 },
        { period: 5, active: 40 },
        { period: 6, active: 30 },
        { period: 7, active: 20 }
      ]
    }
  ]);

  const [selectedBook, setSelectedBook] = useState(null);
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState(8);
  const [showGraph, setShowGraph] = useState(null);

  const getCurrentActive = (book) => book.timeline[0]?.active || 0;

  const getScore = (book) => {
    const moneyWeight = getCurrentActive(book) * 0.5;
    const voteWeight = (book.upvotes - book.downvotes) * 10;
    return moneyWeight + voteWeight;
  };

  const handleVote = (bookId, isUpvote) => {
    setBooks(books.map(book => {
      if (book.id === bookId) {
        return {
          ...book,
          upvotes: isUpvote ? book.upvotes + 1 : book.upvotes,
          downvotes: !isUpvote ? book.downvotes + 1 : book.downvotes
        };
      }
      return book;
    }));
  };

  const handleNudge = () => {
    if (!selectedBook || !amount || amount <= 0) return;

    const donationAmount = parseInt(amount);
    const updatedBooks = books.map(book => {
      if (book.id === selectedBook.id) {
        const newTimeline = book.timeline.map((point, idx) => {
          if (idx < duration) {
            return { ...point, active: point.active + donationAmount };
          }
          return point;
        });

        return {
          ...book,
          timeline: newTimeline
        };
      }
      return book;
    });

    setBooks(updatedBooks);
    setSelectedBook(null);
    setAmount('');
    setDuration(8);
  };

  const sortedBooks = [...books].sort((a, b) => getScore(b) - getScore(a));

  return (
    <div className="h-screen text-white relative pb-[77px] overflow-y-auto z-[999]">
      <div className="px-6">
        {/* <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
          <TrendingUp size={18} />
          <span className="uppercase tracking-wide">Recommended</span>
        </div> */}

        <div className="space-y-3">
          {sortedBooks.map((book, index) => {
            const currentActive = getCurrentActive(book);
            const isExpanded = showGraph === book.id;
            const score = getScore(book);
            const netVotes = book.upvotes - book.downvotes;

            return (
              <div 
                key={book.id}
              >
                <div className="flex items-center gap-3 bg-opacity-80 backdrop-blur-lg rounded-2xl p-2 hover:bg-opacity-90 transition-all border border-gray-800">


                  {/* Book Thumbnail */}
                  <div 
                    onClick={() => setShowGraph(isExpanded ? null : book.id)}
                    className="w-12 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex-shrink-0 cursor-pointer"
                  ></div>

                  {/* Book Info */}
                  <div 
                    onClick={() => setShowGraph(isExpanded ? null : book.id)}
                    className="flex-1 min-w-0 cursor-pointer"
                  >
                    <h3 className="text-lg font-normal text-gray-100 truncate">{book.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-emerald-400 font-medium">{currentActive} kr</span>
                      <span className="text-xs text-gray-500">/ {book.price} kr</span>
                    </div>
                    {/* <div className="text-xs text-gray-600 mt-1">
                      Score: {Math.round(score)} pts (${currentActive}×0.5 + {netVotes}×10)
                    </div> */}
                  </div>

                 

                  {/* Vote Section */}
                  <div className="flex flex-col items-center gap-1 min-w-[40px]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVote(book.id, true);
                      }}
                      className="text-gray-500 hover:text-green-500 transition-colors"
                    >
                      <ChevronUp size={20} />
                    </button>
                    <div className="text-center">
                      <div className="text-sm font-bold text-emerald-400">{netVotes}</div>
                      {/* <div className="text-xs text-gray-600">votes</div> */}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVote(book.id, false);
                      }}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <ChevronDown size={20} />
                    </button>
                    
                  </div>
                   {/* Nudge Button */}
                  {/* <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDonateClick?.({ bookId: mockItem.id, userId: mockItem.ownerId, type: "wish" })
                      //setSelectedBook(book);
                    }}
                    className="px-2 py-1 backdrop-blur-lg rounded-full text-sm font-medium  transition-colors flex-shrink-0"
                  >
                    Support
                  </button> */}
                </div>

                {/* Expanded Timeline */}
                {/* {isExpanded && (
                  <div className="mt-3 mb-2 bg-gray-900 bg-opacity-80 backdrop-blur-lg rounded-xl p-4 border border-gray-800">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-gray-400">Donation Timeline</span>
                      <span className="text-xs text-gray-500">Next 4 years</span>
                    </div>
                    
                    <ResponsiveContainer width="100%" height={160}>
                      <AreaChart data={book.timeline}>
                        <defs>
                          <linearGradient id={`grad${book.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ec4899" stopOpacity={0.6}/>
                            <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis 
                          dataKey="period" 
                          stroke="#666"
                          tick={{ fontSize: 11, fill: '#999' }}
                          label={{ value: 'Half-Year', position: 'insideBottom', offset: -5, fill: '#666', fontSize: 11 }}
                        />
                        <YAxis 
                          stroke="#666"
                          tick={{ fontSize: 11, fill: '#999' }}
                          label={{ value: 'kr', angle: -90, position: 'insideLeft', fill: '#666', fontSize: 11 }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(0,0,0,0.95)', 
                            border: '1px solid #444',
                            borderRadius: '8px',
                            fontSize: '12px'
                          }}
                          formatter={(value) => [`${value} kr`, 'Active']}
                          labelFormatter={(period) => `Half-Year ${period}`}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="active" 
                          stroke="#ec4899" 
                          strokeWidth={2}
                          fill={`url(#grad${book.id})`}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                    
                    <div className="mt-3 space-y-1">
                      {book.timeline.map((point, idx) => {
                        const prevActive = idx > 0 ? book.timeline[idx - 1].active : point.active;
                        const drop = prevActive - point.active;
                        const isDropping = drop > 0;
                        
                        return (
                          <div key={idx} className="flex justify-between items-center text-xs">
                            <span className="text-gray-500">Half-Year {point.period}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-300">{point.active} kr</span>
                              {isDropping && (
                                <span className="text-red-400">-{drop} kr</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )} */}
              </div>
            );
          })}
        </div>
      </div>

      {/* Donation Modal will be cancelled out!!!*/}
      {selectedBook && (
<div>
            <h3 className="text-xl font-normal mb-1">{selectedBook.title}</h3>
            <p className="text-sm text-gray-400 mb-6">
              {selectedBook.price} kr • Active: {getCurrentActive(selectedBook)} kr
            </p>

            <div className="mb-5">
              <label className="block text-sm text-gray-400 mb-2">Amount (kr)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-lg focus:border-pink-500 focus:outline-none"
                min="1"
                />
            </div>

            <div className="grid grid-cols-4 gap-2 mb-5">
              {[25, 50, 100, 200].map(preset => (
                <button
                key={preset}
                onClick={() => setAmount(preset.toString())}
                className="bg-gray-800 hover:bg-gray-700 py-3 rounded-xl text-sm font-medium transition-colors"
                >
                  {preset}
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">Duration (months)</label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map(months => (
                  <button
                  key={months}
                  onClick={() => setDuration(months)}
                  className={`py-3 rounded-xl text-sm font-medium transition-colors ${
                      duration === months
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                    >
                    {months}m
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedBook(null);
                  setAmount('');
                  setDuration(4);
                }}
                className="flex-1 bg-gray-800 py-4 rounded-xl font-medium hover:bg-gray-700 transition-colors"
                >
                Cancel
              </button>
              <button
                onClick={handleNudge}
                disabled={!amount || amount <= 0}
                className="flex-1 bg-pink-500 py-4 rounded-xl font-medium hover:bg-pink-600 disabled:bg-gray-800 disabled:text-gray-600 transition-colors"
                >
                Donate
              </button>
            </div>
            </div>
      )}
    </div>
  );
}