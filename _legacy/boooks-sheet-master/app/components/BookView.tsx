"use client";
import { useState, useEffect } from "react";
import {
  Heart,
  BookOpen,
  Star,
  Check,
  ChevronDown,
  TrendingUp,
  Users,
  BookMarked,
  Quote,
  List,
  Clock,
} from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Book from './Book'

// CHAPTERS SECTION - Place this in your scrollable content area
export function ChaptersSection() {
  const [showChapters, setShowChapters] = useState(false);

  const chapters = [
    {
      num: 1,
      title: "The Library Between Life and Death",
      pages: "1-24",
      time: "18 min",
    },
    { num: 2, title: "The Midnight Library", pages: "25-45", time: "22 min" },
    { num: 3, title: "A Life Without Regrets", pages: "46-68", time: "25 min" },
    { num: 4, title: "The Book of Regrets", pages: "69-89", time: "20 min" },
    { num: 5, title: "Swimming", pages: "90-112", time: "24 min" },
    { num: 6, title: "The Volcanic Island", pages: "113-135", time: "26 min" },
    {
      num: 7,
      title: "Different Shades of Life",
      pages: "136-158",
      time: "23 min",
    },
    { num: 8, title: "Mrs Elm", pages: "159-178", time: "19 min" },
    { num: 9, title: "The Philosopher", pages: "179-201", time: "25 min" },
    { num: 10, title: "Beyond the Library", pages: "202-225", time: "27 min" },
    {
      num: 11,
      title: "A Thing I Have Learned",
      pages: "226-249",
      time: "24 min",
    },
    { num: 12, title: "The Root Life", pages: "250-270", time: "21 min" },
    { num: 13, title: "Never Underestimate", pages: "271-290", time: "20 min" },
    { num: 14, title: "Life After Life", pages: "291-304", time: "15 min" },
  ];

  return (
    <div className="mb-4">
      <button
        onClick={() => setShowChapters(!showChapters)}
        className="w-full flex items-center justify-between py-3 px-4 bg-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-gray-200" />
          <span className="text-sm font-medium text-gray-200">Chapters</span>
          <span className="text-xs text-gray-300">
            · {chapters.length} chapters
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${
            showChapters ? "rotate-180" : ""
          }`}
        />
      </button>

      {showChapters && (
        <div className="mt-3 border border-gray-200 rounded-lg bg-white">
          <div className="divide-y divide-gray-100">
            {chapters.map((chapter) => (
              <button
                key={chapter.num}
                className="w-full p-4 hover:bg-gray-50 transition-colors text-left flex items-center justify-between group"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 text-xs font-semibold text-gray-600 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                    {chapter.num}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      {chapter.title}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>Pages {chapter.pages}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {chapter.time}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// INDEX SECTION - Place this in your scrollable content area
export function IndexSection() {
  const [showIndex, setShowIndex] = useState(false);

  const indexEntries = [
    {
      letter: "A",
      items: [
        "Anxiety, 45-47, 89-92, 156",
        "Alternate lives, 12-15, 34-89, 145-201",
        "Acceptance, 234-240",
      ],
    },
    {
      letter: "C",
      items: [
        "Choices, 1-10, 67-78, 190-210",
        "Chess, 102-110",
        "Consequences, 145-167",
      ],
    },
    {
      letter: "D",
      items: [
        "Death, 1-8, 289-304",
        "Decisions, 23-45, 178-189",
        "Dreams, 56-67, 134-145",
      ],
    },
    {
      letter: "L",
      items: [
        "Library (Midnight), 9-304",
        "Life paths, 34-245",
        "Love, 67-89, 201-225",
      ],
    },
    {
      letter: "M",
      items: [
        "Mrs Elm, 15-304",
        "Multiverse, 34-56, 123-167",
        "Music, 78-89, 156-178",
      ],
    },
    {
      letter: "P",
      items: [
        "Philosophy, 12-34, 178-201",
        "Parallel universes, 45-234",
        "Purpose, 234-267",
      ],
    },
    {
      letter: "R",
      items: [
        "Regret, 1-45, 89-145, 234-267",
        "Root life, 250-270",
        "Reality, 123-234",
      ],
    },
    {
      letter: "S",
      items: [
        "Swimming, 90-112",
        "Second chances, 145-201",
        "Self-discovery, 201-289",
      ],
    },
  ];

  return (
    <div className="mb-4">
      <button
        onClick={() => setShowIndex(!showIndex)}
        className="w-full flex items-center justify-between py-3 px-4 bg-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <div className="flex items-center gap-2">
          <List className="w-4 h-4 text-gray-200" />
          <span className="text-sm font-medium text-gray-200">Index</span>
          <span className="text-xs text-gray-300">· Topics & references</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${
            showIndex ? "rotate-180" : ""
          }`}
        />
      </button>

      {showIndex && (
        <div className="mt-3 border border-gray-200 rounded-lg bg-white p-5">
          <div className="space-y-5">
            {indexEntries.map((section) => (
              <div key={section.letter}>
                <div className="text-lg font-bold text-gray-900 mb-2 pb-1 border-b border-gray-200">
                  {section.letter}
                </div>
                <div className="space-y-1.5 ml-2">
                  {section.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="text-sm text-gray-700 leading-relaxed hover:text-gray-900 cursor-pointer"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-5 border-t border-gray-200 text-xs text-gray-500 text-center">
            Complete index available in full edition
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookView() {
  const [isLiked, setIsLiked] = useState(false);
  const [funded, setFunded] = useState(true);
  const [fundingProgress, setFundingProgress] = useState(67);
  const [readingStatus, setReadingStatus] = useState("reading");
  const [progress, setProgress] = useState(45);
  const [myRating, setMyRating] = useState(0);
  const [showMyReading, setShowMyReading] = useState(false);
  const [book, setBook] = useState<string | null>(null);

  const params = useParams();
  const slug = typeof params.book === "string" ? params.book : undefined;

  useEffect(() => {
    setBook(slug ?? null);
  }, [slug]);

  if (book === null) {
    return <p className="text-slate-400">Loading book…</p>;
  }

  return (
    <>
      {/* Scrollable Content */}
      <div key="title" className="pb-32">
        <div className="mx-auto mt-4">
          {/* Book Cover */}
          <div className="relative flex justify-center mb-4 w-screen h-[50vh]">
            {/* if book not loaded or savedata/battery then show normal image else show 3d */}

            {/* <div className="w-40 h-60 bg-gradient-to-br from-gray-800 to-gray-900 rounded-sm shadow-2xl flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-white/20" />
<img className="w-40 h-60" src="https://www.williamdam.dk/products/4299625/midnight-library.jpg" alt="" />
            </div> */}


            <div className="w-screen h-full inset pointer-events-none">
         

            {/* <Book2d/> */}
         
               <Book/>


            </div>
            {/* <div className="absolute flex flex-col w-6 top-22 right-4 gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-maximize2-icon lucide-maximize-2"
              >
                <path d="M15 3h6v6" />
                <path d="m21 3-7 7" />
                <path d="m3 21 7-7" />
                <path d="M9 21H3v-6" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-minimize2-icon lucide-minimize-2"
              >
                <path d="m14 10 7-7" />
                <path d="M20 10h-6V4" />
                <path d="m3 21 7-7" />
                <path d="M4 14h6v6" />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-book-open-text-icon lucide-book-open-text"
              >
                <path d="M12 7v14" />
                <path d="M16 12h2" />
                <path d="M16 8h2" />
                <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
                <path d="M6 12h2" />
                <path d="M6 8h2" />
              </svg>
            </div> */}
          </div>

          {/* Book Info */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold text-gray-100 mb-1">
              The Midnight Library
            </h1>
            <p className="text-sm text-gray-500 mb-4">
              <Link href="/author/matt-haig" className="hover:underline">
                by Matt Haig
              </Link>
            </p>

            <div className="flex items-center justify-center gap-1 mb-1">
              {/* <Star 
                key={star} 
                className={`w-3.5 h-3.5 ${
                  star <= 4 ?  'text-gray-300':'fill-red-900 text-red-900'
                }`} 
              /> */}
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  width="18"
                  height="18"
                  viewBox="0 0 681 590"
                  fill="fff"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M455.008 8.35763C399.449 22.1703 352.087 53.1364 317.215 98.2806C308.147 71.5941 294.103 48.9613 276.128 32.2348C243.022 1.4041 198.392 -7.69622 150.512 6.60186C89.6832 24.7619 30.0141 85.4845 8.61798 150.932C-9.52941 206.414 1.19038 257.656 38.8217 295.288C63.0203 319.486 261.612 518.739 312.599 569.946L324.481 581.901C334.951 592.371 353.145 591.625 365.015 580.151L587.322 365.745C588.97 364.163 590.585 362.548 592.2 360.933C675.3 277.833 701.482 185.606 664.083 107.905C627.561 31.962 535.726 -11.7157 455.008 8.35763ZM267.346 201.617C266.663 204.605 266.323 206.394 266.23 206.815C263.324 222.628 273.169 236.29 288.703 237.876C304.237 239.462 319.279 228.371 322.944 212.656C323.306 211.109 323.635 209.529 323.915 208.195C328.613 188.814 357.432 90.8549 463.133 64.5652C518.799 50.7121 585.265 83.4104 611.316 137.43C637.924 192.668 617.462 258.169 553.706 321.925C552.311 323.32 550.88 324.751 549.489 326.077L348.829 519.626L344.845 515.642C281.018 451.595 104.777 274.766 82.027 252.016C52.4948 222.484 55.7161 187.459 63.5873 163.324C78.486 117.806 120.563 74.2146 161.422 61.9987C190.11 53.3943 214.59 58.3475 234.218 76.581C262.832 103.213 276.705 155.845 267.346 201.617Z"
                    fill={star <= 4 ? "#ef4444" : "#ffffff"} // red-500
                    stroke={star <= 4 ? "#ef4444" : "#ffffff"}
                  />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-400">4.2 · 12.4k reviews</span>
          </div>

          {/* Meta Info */}
          <div className="flex items-center justify-center gap-6 mb-8 text-sm">
            <div className="text-center">
              <div className="font-semibold text-gray-100">304</div>
              <div className="text-xs text-gray-400">Pages</div>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="text-center">
              <div className="font-semibold text-gray-100">2020</div>
              <div className="text-xs text-gray-400">Published</div>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="text-center">
              <div className="font-semibold text-gray-100">10%</div>
              <div className="text-xs text-gray-400">Stored</div>
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

          {/* My Reading - Collapsible */}
          <div className="px-4">
            <div className="mb-4">
              <button
                onClick={() => setShowMyReading(!showMyReading)}
                className="w-full flex items-center justify-between py-3 px-4 bg-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2">
                  <BookMarked className="w-4 h-4 text-gray-200" />
                  <span className="text-sm font-medium text-gray-200">
                    My Reading
                  </span>
                  {readingStatus === "reading" && (
                    <span className="text-xs text-gray-300">
                      · {progress}% complete
                    </span>
                  )}
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    showMyReading ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showMyReading && (
                <div className="mt-3 p-5 border border-gray-200 rounded-lg bg-white">
                  {/* Status Pills */}
                  <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
                    {[
                      { id: "want", label: "Want to Read" },
                      { id: "reading", label: "Reading" },
                      { id: "finished", label: "Finished" },
                    ].map((status) => (
                      <button
                        key={status.id}
                        onClick={() => setReadingStatus(status.id)}
                        className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                          readingStatus === status.id
                            ? "bg-gray-900 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {readingStatus === status.id && (
                          <Check className="w-3 h-3 inline mr-1" />
                        )}
                        {status.label}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div>
                      <label className="text-xs text-gray-500 mb-1.5 block">
                        Started
                      </label>
                      <input
                        type="date"
                        className="w-full bg-white text-gray-900 rounded-md px-3 py-2 text-xs border border-gray-200 focus:border-gray-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1.5 block">
                        Finished
                      </label>
                      <input
                        type="date"
                        className="w-full bg-white text-gray-900 rounded-md px-3 py-2 text-xs border border-gray-200 focus:border-gray-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs text-gray-500">Progress</label>
                      <span className="text-xs font-semibold text-gray-900">
                        {progress}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={progress}
                      onChange={(e) => setProgress(Number(e.target.value))}
                      className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer accent-gray-900"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1.5">
                      <span>Page {Math.floor((progress / 100) * 304)}</span>
                      <span>of 304</span>
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="text-xs text-gray-500 mb-2 block">
                      My Rating
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setMyRating(star)}
                          className="hover:scale-110 transition-transform"
                        >
                          {/* <Star className={`w-5 h-5 ${
                            star <= myRating ? 'fill-gray-900 text-gray-900' : 'text-gray-300'
                          }`} /> */}
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 681 590"
                            fill="fff"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M455.008 8.35763C399.449 22.1703 352.087 53.1364 317.215 98.2806C308.147 71.5941 294.103 48.9613 276.128 32.2348C243.022 1.4041 198.392 -7.69622 150.512 6.60186C89.6832 24.7619 30.0141 85.4845 8.61798 150.932C-9.52941 206.414 1.19038 257.656 38.8217 295.288C63.0203 319.486 261.612 518.739 312.599 569.946L324.481 581.901C334.951 592.371 353.145 591.625 365.015 580.151L587.322 365.745C588.97 364.163 590.585 362.548 592.2 360.933C675.3 277.833 701.482 185.606 664.083 107.905C627.561 31.962 535.726 -11.7157 455.008 8.35763ZM267.346 201.617C266.663 204.605 266.323 206.394 266.23 206.815C263.324 222.628 273.169 236.29 288.703 237.876C304.237 239.462 319.279 228.371 322.944 212.656C323.306 211.109 323.635 209.529 323.915 208.195C328.613 188.814 357.432 90.8549 463.133 64.5652C518.799 50.7121 585.265 83.4104 611.316 137.43C637.924 192.668 617.462 258.169 553.706 321.925C552.311 323.32 550.88 324.751 549.489 326.077L348.829 519.626L344.845 515.642C281.018 451.595 104.777 274.766 82.027 252.016C52.4948 222.484 55.7161 187.459 63.5873 163.324C78.486 117.806 120.563 74.2146 161.422 61.9987C190.11 53.3943 214.59 58.3475 234.218 76.581C262.832 103.213 276.705 155.845 267.346 201.617Z"
                              fill={star <= myRating ? "#ef4444" : "#333"} // red-500
                              stroke={star <= myRating ? "#ef4444" : "#333"}
                            />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">
                      Notes
                    </label>
                    <textarea
                      placeholder="Your thoughts..."
                      className="w-full bg-white text-gray-900 rounded-md px-3 py-2.5 border border-gray-200 focus:border-gray-900 focus:outline-none resize-none text-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            <ChaptersSection />
            <IndexSection />

            {/* Description */}
            <div className="mb-10 p-4">
              <h2 className="text-lg font-semibold text-gray-400 mb-4">
                About This Book
              </h2>
              <p className="text-sm text-gray-200 leading-relaxed mb-4">
                Between life and death there is a library, and within that
                library, the shelves go on forever. Every book provides a chance
                to try another life you could have lived. To see how things
                would be if you had made other choices.
              </p>
              <p className="text-sm text-gray-200 leading-relaxed mb-4">
                Would you have done anything different, if you had the chance to
                undo your regrets?
              </p>
              <p className="text-sm text-gray-200 leading-relaxed">
                A dazzling novel about all the choices that go into a life well
                lived, from the internationally bestselling author of{" "}
                <em>Reasons to Stay Alive</em> and <em>How To Stop Time</em>.
                Somewhere out there is the life you were meant to live, the
                person you were meant to be.
              </p>
            </div>

            {/* Key Themes */}
            <div className="mb-10 p-2">
              <h2 className="text-lg font-semibold text-gray-200 mb-4">
                Key Themes
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    icon: TrendingUp,
                    label: "Second Chances",
                    color: "bg-blue-50 text-blue-700",
                  },
                  {
                    icon: Users,
                    label: "Mental Health",
                    color: "bg-purple-50 text-purple-700",
                  },
                  {
                    icon: BookOpen,
                    label: "Philosophy",
                    color: "bg-green-50 text-green-700",
                  },
                  {
                    icon: Heart,
                    label: "Relationships",
                    color: "bg-pink-50 text-pink-700",
                  },
                ].map((theme, idx) => (
                  <div
                    key={idx}
                    // className={`${theme.color} rounded-lg p-4 flex items-center gap-3`}
                    className={`bg-gray-50/10 rounded-lg p-4 flex items-center gap-3`}
                  >
                    <theme.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{theme.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Genres */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-gray-100 mb-4">
                Genres
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "Literary Fiction",
                  "Fantasy",
                  "Contemporary",
                  "Philosophical",
                  "Magical Realism",
                ].map((genre) => (
                  <span
                    key={genre}
                    className="px-4 py-2 border border-gray-100 text-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Awards & Recognition */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-gray-100 mb-4">
                Awards & Recognition
              </h2>
              <div className="space-y-3">
                {[
                  {
                    award: "Goodreads Choice Award Nominee",
                    year: "2020",
                    category: "Fiction",
                  },
                  {
                    award: "British Book Awards",
                    year: "2021",
                    category: "Best Fiction",
                  },
                  {
                    award: "New York Times Bestseller",
                    year: "2020",
                    category: "Hardcover Fiction",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 border border-gray-700  rounded-lg"
                  >
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-100">
                        {item.award}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.year} · {item.category}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notable Quotes */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-gray-100 mb-4">
                Notable Quotes
              </h2>
              <div className="space-y-4">
                {[
                  "Never underestimate the big importance of small things.",
                  "The only way to learn is to live.",
                  "It is easy to mourn the lives we aren't living.",
                ].map((quote, idx) => (
                  <div
                    key={idx}
                    className="relative pl-6 py-3 border-l-2 border-gray-800"
                  >
                    <Quote className="w-4 h-4 text-gray-400 absolute left-1 top-3" />
                    <p className="text-md text-gray-200 italic leading-relaxed">
                      {quote}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reader Reviews */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-gray-100 mb-4">
                What Readers Are Saying
              </h2>

              <div className="space-y-4">
                {[
                  {
                    name: "Sarah Mitchell",
                    rating: 5,
                    date: "Dec 2023",
                    text: "Absolutely beautiful and thought-provoking. This book changed my perspective on life and the choices we make. Haig has a way of writing that feels both deeply personal and universally relatable.",
                    verified: true,
                  },
                  {
                    name: "James Kim",
                    rating: 4,
                    date: "Nov 2023",
                    text: "A wonderful exploration of choices and regrets. The concept is brilliant and the execution is mostly excellent. Some parts dragged a bit for me, but overall a powerful read that stayed with me long after finishing.",
                    verified: true,
                  },
                  {
                    name: "Emma Rodriguez",
                    rating: 5,
                    date: "Jan 2024",
                    text: "One of the best books I've read this year. Couldn't put it down! The way it explores parallel lives and what could have been is fascinating. Perfect for anyone who's ever wondered \"what if?\"",
                    verified: false,
                  },
                ].map((review, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-700 rounded-lg p-5 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-gray-200">
                            {review.name}
                          </span>
                          {review.verified && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#999"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-shield-check-icon lucide-shield-check"
                            >
                              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                              <path d="m9 12 2 2 4-4" />
                            </svg>
                          )}
                        </div>
                        <span className="text-xs text-gray-300">
                          {review.date}
                        </span>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 fill-gray-900 text-gray-900"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>

              <button className="w-full cursor-pointer border border-white mt-4 py-3 text-sm font-medium text-white hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                View All 12,439 Reviews
              </button>
            </div>

            {/* Similar Books */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-100 mb-4">
                Readers Also Enjoyed
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    title: "The Invisible Life of Addie LaRue",
                    author: "V.E. Schwab",
                    color: "from-purple-600 to-purple-800",
                  },
                  {
                    title: "Anxious People",
                    author: "Fredrik Backman",
                    color: "from-orange-600 to-red-700",
                  },
                  {
                    title: "The Seven Husbands of Evelyn Hugo",
                    author: "Taylor Jenkins Reid",
                    color: "from-pink-600 to-rose-700",
                  },
                ].map((book, idx) => (
                  <div key={idx} className="group cursor-pointer">
                    <div
                      className={`w-full aspect-[2/3] bg-gradient-to-br ${book.color} rounded-md shadow-md group-hover:shadow-xl transition-shadow mb-2`}
                    ></div>
                    <h3 className="text-xs font-medium text-gray-100 line-clamp-2 mb-0.5">
                      {book.title}
                    </h3>
                    <p className="text-xs text-gray-500">{book.author}</p>
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
                Start Reading
              </button>
            </div>
          ) : (
            <div className="p-5 space-y-3">
              <div className="bg-gray-900/90 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-600">
                    Crowdfunding Progress
                  </span>
                  <span className="text-xs font-semibold text-gray-100">
                    {fundingProgress}%
                  </span>
                </div>

                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-[#ef4444] transition-all duration-500 rounded-full"
                    style={{ width: `${fundingProgress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>$6,700 raised</span>
                  <span>Goal: $10,000</span>
                </div>
              </div>

              <button className="w-full bg-gray-900 border-2 border-[#ef4444] text-white font-medium py-3.5 rounded-lg hover:bg-gray-800 transition-all active:scale-98">
                Support This Book
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
