"use client";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Heart, Share2, BookOpen, Star, Check, ChevronDown, Calendar, TrendingUp, Users, BookMarked, Quote, Award, Pen, Globe, Twitter, Instagram } from 'lucide-react';

export default function AuthorView() {

  const [isLiked, setIsLiked] = useState(false);
  const [funded, setFunded] = useState(true);
  const [fundingProgress, setFundingProgress] = useState(67);
  const [followingStatus, setFollowingStatus] = useState('not-following');
  const [showMyNotes, setShowMyNotes] = useState(false);
  const [myRating, setMyRating] = useState(0);
  const [booksRead, setBooksRead] = useState(3);

  return (
    <>
      {/* Scrollable Content */}
      <div className="h-full overflow-y-auto pb-32">
        <div className="pt-6 max-w-2xl mx-auto">
          
          {/* Author Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-full shadow-xl flex items-center justify-center mb-4">
              <Pen className="w-12 h-12 text-white/90" />
            </div>
            
            <h1 className="text-3xl font-semibold text-gray-100 mb-1">
              Matt Haig
            </h1>
            <p className="text-sm text-gray-500 mb-3">Author · Sheffield, England</p>
            
            <div className="flex items-center gap-4 mb-4">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 text-center">
              <div>
                <div className="font-semibold text-gray-200 text-lg">23</div>
                <div className="text-xs text-gray-500">Books</div>
              </div>
              <div className="w-px h-10 bg-gray-300"></div>
              <div>
                <div className="font-semibold text-gray-200 text-lg">4.2</div>
                <div className="text-xs text-gray-500">Avg Rating</div>
              </div>
              <div className="w-px h-10 bg-gray-300"></div>
              <div>
                <div className="font-semibold text-gray-200 text-lg">2.4M</div>
                <div className="text-xs text-gray-500">Readers</div>
              </div>
            </div>
          </div>

          {/* Demo Toggle */}
          <div className="mb-6 text-center">
            <button
              onClick={() => setFunded(!funded)}
              className="text-xs text-gray-400 hover:text-gray-600 underline"
            >
              Toggle funding (demo)
            </button>
          </div>

          {/* My Connection - Collapsible */}
          <div className="mb-8">
            <button
              onClick={() => setShowMyNotes(!showMyNotes)}
              className="w-full flex items-center justify-between py-3 px-4 bg-gray-800 hover:bg-gray-100 rounded-lg transition-colors"

            >
              <div className="flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-gray-200" />
                <span className="text-sm font-medium text-gray-200">My Connection</span>
                {followingStatus === 'following' && (
                  <span className="text-xs text-gray-500">· {booksRead} books read</span>
                )}
              </div>
              <ChevronDown 
                className={`w-4 h-4 text-gray-200 transition-transform ${
                  showMyNotes ? 'rotate-180' : ''
                }`} 
              />
            </button>

            {showMyNotes && (
              <div className="mt-3 p-5 border border-gray-200 rounded-lg bg-white">
                {/* Following Status Pills */}
                <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
                  {[
                    { id: 'not-following', label: 'Not Following' },
                    { id: 'following', label: 'Following' },
                    { id: 'favorite', label: 'Favorite Author' }
                  ].map((status) => (
                    <button
                      key={status.id}
                      onClick={() => setFollowingStatus(status.id)}
                      className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                        followingStatus === status.id
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {followingStatus === status.id && <Check className="w-3 h-3 inline mr-1" />}
                      {status.label}
                    </button>
                  ))}
                </div>

                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs text-gray-500">Books Read</label>
                    <span className="text-xs font-semibold text-gray-900">{booksRead} of 23</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="23" 
                    value={booksRead}
                    onChange={(e) => setBooksRead(Number(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer accent-gray-900"
                  />
                </div>

                <div className="mb-5">
                  <label className="text-xs text-gray-500 mb-2 block">Overall Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        key={star} 
                        onClick={() => setMyRating(star)}
                        className="hover:scale-110 transition-transform"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 681 590"
                          fill="fff"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M455.008 8.35763C399.449 22.1703 352.087 53.1364 317.215 98.2806C308.147 71.5941 294.103 48.9613 276.128 32.2348C243.022 1.4041 198.392 -7.69622 150.512 6.60186C89.6832 24.7619 30.0141 85.4845 8.61798 150.932C-9.52941 206.414 1.19038 257.656 38.8217 295.288C63.0203 319.486 261.612 518.739 312.599 569.946L324.481 581.901C334.951 592.371 353.145 591.625 365.015 580.151L587.322 365.745C588.97 364.163 590.585 362.548 592.2 360.933C675.3 277.833 701.482 185.606 664.083 107.905C627.561 31.962 535.726 -11.7157 455.008 8.35763ZM267.346 201.617C266.663 204.605 266.323 206.394 266.23 206.815C263.324 222.628 273.169 236.29 288.703 237.876C304.237 239.462 319.279 228.371 322.944 212.656C323.306 211.109 323.635 209.529 323.915 208.195C328.613 188.814 357.432 90.8549 463.133 64.5652C518.799 50.7121 585.265 83.4104 611.316 137.43C637.924 192.668 617.462 258.169 553.706 321.925C552.311 323.32 550.88 324.751 549.489 326.077L348.829 519.626L344.845 515.642C281.018 451.595 104.777 274.766 82.027 252.016C52.4948 222.484 55.7161 187.459 63.5873 163.324C78.486 117.806 120.563 74.2146 161.422 61.9987C190.11 53.3943 214.59 58.3475 234.218 76.581C262.832 103.213 276.705 155.845 267.346 201.617Z"
                            fill={star <= myRating ? "#ef4444" : "#333"}
                            stroke={star <= myRating ? "#ef4444" : "#333"}
                          />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500 mb-2 block">Personal Notes</label>
                  <textarea 
                    placeholder="Your thoughts about this author..."
                    className="w-full bg-white text-gray-900 rounded-md px-3 py-2.5 border border-gray-200 focus:border-gray-900 focus:outline-none resize-none text-sm"
                    rows={3}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Biography */}
          <div className="mb-10 p-6 bg-white/10 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-200 mb-4">About the Author</h2>
            <p className="text-sm text-gray-100 leading-relaxed mb-4">
              Matt Haig is an internationally bestselling British author known for his works exploring mental health, philosophy, and the human condition. His books have been translated into over 30 languages and sold millions of copies worldwide.
            </p>
            <p className="text-sm text-gray-100 leading-relaxed mb-4">
              Born in Sheffield, England, Haig has written both fiction and non-fiction for adults and children. His work often draws from his own experiences with depression and anxiety, bringing authenticity and hope to readers facing similar challenges.
            </p>
            <p className="text-sm text-gray-100 leading-relaxed">
              Haig's unique blend of philosophical insight, wit, and emotional depth has earned him critical acclaim and a devoted readership. He is a vocal advocate for mental health awareness and regularly speaks about the intersection of literature and wellbeing.
            </p>
          </div>

          {/* Writing Style & Themes */}
          <div className="mb-10 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-200 mb-4">Writing Style & Themes</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: TrendingUp, label: 'Mental Health', color: 'bg-blue-50 text-blue-700' },
                { icon: Users, label: 'Philosophy', color: 'bg-purple-50 text-purple-700' },
                { icon: BookOpen, label: 'Time & Memory', color: 'bg-green-50 text-green-700' },
                { icon: Heart, label: 'Human Connection', color: 'bg-pink-50 text-pink-700' }
              ].map((theme, idx) => (
                <div key={idx} className={`bg-gray-800 rounded-lg p-4 flex items-center gap-3`}>
                  <theme.icon className="w-5 h-5 text-white" />
                  <span className="text-sm font-medium">{theme.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Awards & Recognition */}
          <div className="mb-10 bg-white/10 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-100 mb-4">Awards & Recognition</h2>
            <div className="space-y-3">
              {[
                { award: 'British Book Awards', year: '2021', category: 'Best Fiction' },
                { award: 'Goodreads Choice Award', year: '2020', category: 'Fiction Finalist' },
                { award: 'Children\'s Book Award', year: '2015', category: 'Best Illustrated Book' },
                { award: 'Blue Peter Book Award', year: '2015', category: 'Best Story' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50/90 rounded-lg">
                  <Award className="w-5 h-5 text-amber-500 fill-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-black">{item.award}</div>
                    <div className="text-xs text-gray-500">{item.year} · {item.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Books */}
          <div className="mb-10 bg-white/10 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Most Popular Books</h2>
            <div className="space-y-4">
              {[
                { title: 'The Midnight Library', year: '2020', rating: 4.2, reviews: '2.1M', color: 'from-gray-700 to-gray-900' },
                { title: 'Reasons to Stay Alive', year: '2015', rating: 4.3, reviews: '145K', color: 'from-blue-600 to-blue-800' },
                { title: 'How to Stop Time', year: '2017', rating: 3.9, reviews: '234K', color: 'from-amber-600 to-orange-700' },
                { title: 'The Humans', year: '2013', rating: 4.0, reviews: '189K', color: 'from-green-600 to-green-800' }
              ].map((book, idx) => (
                <div key={idx} className="flex gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <div className={`w-16 h-24 bg-gradient-to-br ${book.color} rounded shadow-md flex-shrink-0`}></div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-200 mb-1">{book.title}</h3>
                    <p className="text-xs text-gray-200 mb-2">{book.year}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        
                        {/* <Star className="w-3 h-3 fill-gray-00 text-gray-900" /> */}
                        <svg className="-rotate-45" width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.4243 9.79244C18.4119 8.58141 16.1397 8.10579 13.8185 8.40377C14.3296 7.36657 14.5787 6.30262 14.5425 5.29599C14.4765 3.44125 13.4458 1.88258 11.6421 0.908411C9.35075 -0.329354 5.85832 -0.298793 3.33909 0.979085C1.20318 2.06213 0.0276816 3.85957 0.0276816 6.04285C0.0276816 7.44679 0.00851693 18.9878 0.00212836 21.9523L0 22.6438C0 23.2512 0.549416 23.7574 1.22661 23.7689L13.8952 23.9981C13.9889 24 14.0826 24 14.1762 24C18.9975 24 22.4324 22.0841 23.6015 18.7452C24.7451 15.4827 23.3481 11.5517 20.4243 9.79244ZM9.37417 9.9548C9.2677 10.0217 9.20594 10.0637 9.19103 10.0732C8.648 10.4476 8.53727 11.1295 8.94188 11.6262C9.34649 12.1228 10.1046 12.2374 10.6668 11.8879C10.7222 11.8535 10.7775 11.8172 10.8244 11.7866C11.5229 11.3607 15.2006 9.35502 19.0294 11.6586C21.0461 12.8716 22.0257 15.7482 21.2143 18.071C20.3838 20.4452 17.8901 21.7518 14.1912 21.7518C14.1102 21.7518 14.0272 21.7518 13.9484 21.7499L2.51284 21.5436V21.3124C2.51923 17.603 2.53627 7.36084 2.53627 6.04094C2.53627 4.32755 3.64575 3.40496 4.57422 2.93315C6.32682 2.04494 8.81198 2.00101 10.3516 2.83192C11.4334 3.41451 11.9999 4.26833 12.0403 5.36666C12.0978 6.96926 10.9734 8.8985 9.37417 9.9548Z" fill="#D91B24"/>
</svg>

                        <span className="text-xs font-medium text-gray-200">{book.rating}</span>
                      </div>
                      <span className="text-xs text-gray-400">·</span>
                      <span className="text-xs text-gray-500">{book.reviews} ratings</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full cursor-pointer border border-white mt-4 py-3 text-sm font-medium text-white hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">

              View All 23 Books
            </button>
          </div>

          {/* Notable Quotes */}
          <div className="mb-10 rounded-lg shadow-sm p-2">
            <h2 className="text-lg font-semibold text-gray-200 mb-4">Notable Quotes</h2>
            <div className="space-y-4">
              {[
                { quote: "Never underestimate the big importance of small things.", book: "The Midnight Library" },
                { quote: "You don't have to understand life. You just have to live it.", book: "The Humans" },
                { quote: "There is no standard normal. Normal is subjective.", book: "Reasons to Stay Alive" }
              ].map((item, idx) => (
                <div key={idx} className="relative pl-6 py-3 border-l-2 border-gray-800">
                  <Quote className="w-4 h-4 text-gray-400 absolute left-1 top-3" />
                  <p className="text-sm text-gray-400 italic leading-relaxed mb-1">{item.quote}</p>
                  <p className="text-xs text-gray-500">— {item.book}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Reader Reviews */}
          <div className="mb-10 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-200 mb-4">What Readers Are Saying</h2>
            
            <div className="space-y-4">
              {[
                { name: 'Sarah Mitchell', rating: 5, date: 'Dec 2023', text: 'Matt Haig has become one of my favorite authors. His ability to blend profound philosophical questions with deeply moving storytelling is unmatched. Every book leaves me thinking for weeks.', verified: true },
                { name: 'James Kim', rating: 5, date: 'Nov 2023', text: 'His approach to mental health is both honest and hopeful. As someone who struggles with anxiety, his books have been genuinely therapeutic. He writes with such compassion and understanding.', verified: true },
                { name: 'Emma Rodriguez', rating: 4, date: 'Jan 2024', text: 'A brilliant writer who tackles difficult subjects with grace and wit. Not every book resonates equally with me, but his unique voice and perspective are always worth reading.', verified: false }
              ].map((review, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-gray-200">{review.name}</span>
                        {review.verified && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#999"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="lucide lucide-shield-check-icon lucide-shield-check"
                          >
                            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                            <path d="m9 12 2 2 4-4" />
                          </svg>
                        )}
                      </div>
                      <span className="text-xs text-gray-300">{review.date}</span>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-gray-900 text-gray-900" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-200 leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Similar Authors */}
          <div className="mb-8 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-200 mb-4">Similar Authors</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: 'Fredrik Backman', books: '12 books', color: 'from-orange-500 to-red-600' },
                { name: 'Celeste Ng', books: '3 books', color: 'from-teal-500 to-cyan-600' },
                { name: 'Taylor Jenkins Reid', books: '9 books', color: 'from-pink-500 to-rose-600' }
              ].map((author, idx) => (
                <div key={idx} className="group cursor-pointer text-center">
                  <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${author.color} rounded-full shadow-md group-hover:shadow-xl transition-shadow mb-2 flex items-center justify-center`}>
                    <Pen className="w-8 h-8 text-white/90" />
                  </div>
                  <h3 className="text-xs font-medium text-gray-200 mb-0.5">{author.name}</h3>
                  <p className="text-xs text-gray-700">{author.books}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0">
        {funded ? (
          <div className="p-5">
            
            <button className="w-full bg-gray-900/90 border border-white text-white font-medium py-3.5 rounded-lg hover:bg-gray-800 transition-all active:scale-98">
              Browse Books
            </button>
          </div>
        ) : (
          <div className="p-5 space-y-3">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">Support This Author</span>
                <span className="text-xs font-semibold text-gray-900">{fundingProgress}%</span>
              </div>
              
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div 
                  className="h-full bg-gray-900 transition-all duration-500 rounded-full"
                  style={{ width: `${fundingProgress}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>$6,700 raised</span>
                <span>Goal: $10,000</span>
              </div>
            </div>
            <button className="w-full bg-gray-900/90 border border-white text-white font-medium py-3.5 rounded-lg hover:bg-gray-800 transition-all active:scale-98">
            
              Become a Supporter
            </button>
          </div>
        )}
      </div>
    </>

  );
}
