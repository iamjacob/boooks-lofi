"use client";
import Link from "next/link";
import { useState } from "react";

const ReadingNow = () => {
  const [variant, setVariant] = useState(1);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

function timeAgo(dateInput) {
  const now = new Date();
  const past = new Date(dateInput);

  if (isNaN(past)) return ""; // invalid date safety

  const seconds = Math.floor((now - past) / 1000);

  if (seconds < 60) return "Now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}


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
      image: "./assets/books/reading/actionable.jpg",
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
      image: "./assets/books/reading/chickensoup.webp",
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
      image: "./assets/books/reading/devops.jpg",
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
      image: "./assets/books/reading/shaolin.png",
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
      image: "./assets/books/reading/strength.jpg",
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
      image: "./assets/books/reading/taoteching.jpg",
    },
  ];

  const booksToShow = books.sort(
    (a, b) => new Date(b.lastRead) - new Date(a.lastRead)
  );

  const rotationAngle = 180 / booksToShow.length;

const slugify = (title) =>
  title
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")          // remove quotes
    .replace(/[^a-z0-9]+/g, "-")   // replace non-alphanum with dash
    .replace(/^-+|-+$/g, "");      // trim dashes


  return (
    <button
      onClick={() => setVariant(variant === 1 ? 2 : 1)}
      aria-label="reading at the moment"
      className="text-white text-[11px] rounded-full bg-black/10 backdrop-blur flex flex-col items-center justify-center shadow-lg active:scale-90 transition-transform flex flex-col gap-1"
    >
      <div className="relative w-[44px] h-[44px]">
      {booksToShow.map((book, i) => (

      <Link href={variant != 1 ? `/book/${slugify(book.title)}` : "#"} key={i} className="group">

          <div
            className={`rounded-sm absolute shadow-lg ${book.cover} p-[2px] flex items-center justify-center transform transition`}
            onClick={() => {
              console.log(book);
              
            }}
            style={{
              zIndex:  booksToShow.length - i, // 👈 higher index = on top
              transform:
                variant === 1
                  ? `rotate(${i  * rotationAngle}deg) scale(0.6)`
                  : //translateX(${(i - 1) * 20}px)`
                    `translateX(${books.length * -32 + i * 32 + 32}px) rotate(${
                      i % 2 == 0 ? -15 : 15
                    }deg)`,
              transition: "transform 200ms ease-out",
              // transformOrigin: "center center"
            }}
          >
            <img src={book.image} alt={book.title} className="w-12 h-auto" />

            {/* Time since last read */}
            {/* <span className="text-xs text-center px-2 font-semibold">{book.title}</span> */}
    {/* {variant == 2 && <div className='text-white text-[11px] pt-2'>{`${timeAgo(new Date(book.lastRead))}`}</div>} */}
          </div>
</Link>
      ))}
       {/* <button
      onClick={() => setVariant(variant === 1 ? 2 : 1)}
      aria-label="reading at the moment">
      x
      </button> */}
      </div>
    <div className='text-white text-[11px] pt-2'>{`${timeAgo(new Date(booksToShow[0].lastRead))}`}</div>


    </button>
  );
};
export default ReadingNow;
