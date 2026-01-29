import ReadingNow from "@/app/components/nav/ReadingNow";
import { Html } from "@react-three/drei";
import { Hand, HandGrab, X } from "lucide-react";
import { useState } from "react";

const books = [
  {
    id: 1,
    title: "actoionable gamification",
    author: "Matt Haig",
    pages: 304,
    currentPage: 127,
    totalMinutes: 320,
    startDate: "Mar 8, 2024",
    lastRead: "Mar 14, 2024",
    mood: "💭",
    loveRating: 5,
    goalDate: "Mar 20",
    cover: "bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700",
    image: "./reading/actionable.jpg",
  },
  {
    id: 2,
    title: "Chicken Soup for the Soul",
    author: "James Clear",
    pages: 320,
    currentPage: 45,
    totalMinutes: 285,
    startDate: "Mar 12, 2024",
    lastRead: "Mar 14, 2025",
    mood: "💡",
    loveRating: 4,
    goalDate: "Mar 25",
    cover: "bg-gradient-to-br from-orange-500 via-red-500 to-pink-500",
    image: "./reading/chickensoup.webp",
  },
  {
    id: 3,
    title: "The devops handbook",
    author: "Andy Weir",
    pages: 496,
    currentPage: 203,
    totalMinutes: 495,
    startDate: "Feb 28, 2024",
    lastRead: "June 14, 2025",
    mood: "🚀",
    loveRating: 5,
    goalDate: "Mar 18",
    cover: "bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400",
    image: "./reading/devops.jpg",
  },
  {
    id: 4,
    title: "The shaolin spirit",
    author: "Taylor Jenkins Reid",
    pages: 400,
    currentPage: 312,
    totalMinutes: 390,
    startDate: "Mar 5, 2024",
    lastRead: "Oct 14, 2025",
    mood: "✨",
    loveRating: 5,
    goalDate: "Mar 15",
    cover: "bg-gradient-to-br from-rose-400 via-fuchsia-400 to-purple-400",
    image: "./reading/shaolin.png",
  },
  {
    id: 5,
    title: "Strength side",
    author: "Mr. Hash",
    pages: 352,
    currentPage: 89,
    totalMinutes: 350,
    startDate: "Mar 10, 2024",
    lastRead: "Dec 29, 2025",
    mood: "📖",
    loveRating: 4,
    goalDate: "Mar 22",
    cover: "bg-gradient-to-br from-amber-600 via-orange-600 to-red-600",
    image: "./reading/strength.jpg",
  },
  {
    id: 6,
    title: "Tao te Ching",
    author: "Lao Tzu",
    pages: 352,
    currentPage: 89,
    totalMinutes: 350,
    startDate: "Mar 10, 2024",
    lastRead: "Nov 14, 2025",
    mood: "📖",
    loveRating: 4,
    goalDate: "Mar 22",
    cover: "bg-gradient-to-br from-amber-600 via-orange-600 to-red-600",
    image: "./reading/taoteching.jpg",
  },
];

const booksToShow = books.sort(
  (a, b) => new Date(b.lastRead) - new Date(a.lastRead)
);

const rotationAngle = 180 / booksToShow.length;

const BookMover = () => {
  const [variant, setVariant] = useState(1);

  return (
    <Html position={[0, 0, 0]} transform={false} occlude={false} center>
      <div className="fixed bottom-0 left-3 z-[1000] bg-black/10 backdrop-blur p-1 rounded-xl">
        <div className="relative bg-white/10 rounded-full  p-1 gap-2 flex flex-col">
          <div className="flex flex-col items-center">
            <button className="mx-2 -mb-1 rounded-full bg-gray-100/50 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform touch-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-up text-black/60"
                aria-hidden="true"
              >
                <path d="m18 15-6-6-6 6"></path>
              </svg>
            </button>
            <button className="relative w-10 h-10 text-black/60 z-10 font-[500] text-[18px] rounded-full bg-black/10 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform touch-none">
              3D
            </button>
            <div className="absolute">
              <button className="relative z-10 top-8 right-8 rounded-full bg-gray-100/10 flex items-center justify-center active:scale-90 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-left text-black/60"
                  aria-hidden="true"
                >
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
              </button>

              <button className="relative z-10 top-2 left-8 rounded-full bg-gray-100/10 flex items-center justify-center active:scale-90 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right text-black/60"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </button>
            </div>
            <button className="mx-2 -mt-1 rounded-full bg-gray-100/50 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform touch-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-down text-black/60"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
          </div>
          <div className="ui-panel">
            <button className="p-2 rounded-full bg-black/10 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform flex-col gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-circle text-black/60"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
            </button>
          </div>
        </div>


        <div className="w-[44px] h-[44px]">
          <Hand stroke="#fff" />
          {/* <HandGrab stroke='#fff'/> */}
        </div>


        <button
          onClick={() => setVariant(variant === 1 ? 2 : 1)}
          aria-label="reading at the moment"
          className="text-white text-[11px] rounded-full bg-black/10 backdrop-blur flex flex-col items-center justify-center shadow-lg active:scale-90 transition-transform flex flex-col gap-1"
        >
          <div className="relative w-[44px] h-[44px]">
            {booksToShow.map((book, i) => (
              <div
                className={`rounded-sm absolute shadow-lg ${book.cover} p-[2px] flex items-center justify-center transform transition`}
                onClick={() => {
                  console.log(book);
                }}
                style={{
                  zIndex: booksToShow.length - i, // 👈 higher index = on top
                  transform:
                    variant === 1
                      ? `rotate(${i * rotationAngle}deg) scale(0.6)`
                      : //translateX(${(i - 1) * 20}px)`
                        `translateX(${
                          books.length * -32 + i * 32 + 32
                        }px) rotate(${i % 2 == 0 ? -15 : 15}deg)`,
                  transition: "transform 200ms ease-out",
                  // transformOrigin: "center center"
                }}
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-12 h-auto"
                />
              </div>
            ))}
          </div>
        </button>
      </div>
    </Html>
  );
};

export default BookMover;
