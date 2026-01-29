"use client";
import { useState } from "react";

const initialComments = [
  {
    id: 1,
    user: "martini_rond",
    avatar: "https://i.pravatar.cc/40?img=5",
    text: "How neatly I write the date in my book",
    time: "22h",
    likes: 8098,
    replies: 4,
  },
  {
    id: 2,
    user: "maxjacobson",
    avatar: "https://i.pravatar.cc/40?img=18",
    text: "Now that's a skill very talented",
    time: "22h",
    likes: 120,
    replies: 1,
  },
  {
    id: 3,
    user: "zackjohn",
    avatar: "https://i.pravatar.cc/40?img=32",
    text: "Doing this would make me so anxious",
    time: "22h",
    likes: 54,
    replies: 0,
  },
];

export default function CommentsPanel({ onClose }) {
  const [comments, setComments] = useState(initialComments);
  const [text, setText] = useState("");

  function submit() {
    const trimmed = text.trim();
    if (!trimmed) return;
    const next = {
      id: Date.now(),
      user: "you",
      avatar: `https://i.pravatar.cc/40?u=${Date.now()}`,
      text: trimmed,
      time: "now",
      likes: 0,
      replies: 0,
    };
    setComments((s) => [next, ...s]);
    setText("");
  }

  function toggleLike(id) {
    setComments((s) =>
      s.map((c) =>
        c.id === id
          ? {
              ...c,
              liked: !c.liked,
              likes: c.liked ? c.likes - 1 : c.likes + 1,
            }
          : c
      )
    );
  }

  return (
    <div className="w-full max-h-[85vh] flex flex-col text-white rounded-t-2xl shadow-2xl overflow-hidden">
    

      <div className="flex justify-around items-center p-1">
          <div className="active:scale-90 transition-transform text-[11px]">
          Newest
          </div>
        <div className="px-2 py-1 border-2 border-zinc-800 rounded text-sm active:scale-90 transition-transform text-[11px]">
          Loved
          </div>
          <div className="active:scale-90 transition-transform text-[11px]">
          
          Replied
          </div>
          <div className="active:scale-90 transition-transform text-[11px]">
          
          Donated
          </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3">
            <img
              src={c.avatar}
              alt={c.user}
              className="w-7 h-7 rounded-full object-cover shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold">{c.user}</div>
                  <div className="text-sm text-zinc-300">{c.text}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-xs text-zinc-500">{c.time}</div>
                  <button
                    onClick={() => toggleLike(c.id)}
                    className="text-xs text-zinc-300 hover:text-red-400 flex items-center gap-1"
                    aria-label={`Like ${c.user}'s comment`}
                  >
                    {/* <svg width="18" height="18" viewBox="0 0 24 24" fill={c.liked ? "red" : "none"} xmlns="http://www.w3.org/2000/svg" stroke={c.liked ? "red" : "currentColor"}>
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg> */}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 681 590"
                      fill={c.liked ? "red" : "#fff"}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M455.008 8.35763C399.449 22.1703 352.087 53.1364 317.215 98.2806C308.147 71.5941 294.103 48.9613 276.128 32.2348C243.022 1.4041 198.392 -7.69622 150.512 6.60186C89.6832 24.7619 30.0141 85.4845 8.61798 150.932C-9.52941 206.414 1.19038 257.656 38.8217 295.288C63.0203 319.486 261.612 518.739 312.599 569.946L324.481 581.901C334.951 592.371 353.145 591.625 365.015 580.151L587.322 365.745C588.97 364.163 590.585 362.548 592.2 360.933C675.3 277.833 701.482 185.606 664.083 107.905C627.561 31.962 535.726 -11.7157 455.008 8.35763ZM267.346 201.617C266.663 204.605 266.323 206.394 266.23 206.815C263.324 222.628 273.169 236.29 288.703 237.876C304.237 239.462 319.279 228.371 322.944 212.656C323.306 211.109 323.635 209.529 323.915 208.195C328.613 188.814 357.432 90.8549 463.133 64.5652C518.799 50.7121 585.265 83.4104 611.316 137.43C637.924 192.668 617.462 258.169 553.706 321.925C552.311 323.32 550.88 324.751 549.489 326.077L348.829 519.626L344.845 515.642C281.018 451.595 104.777 274.766 82.027 252.016C52.4948 222.484 55.7161 187.459 63.5873 163.324C78.486 117.806 120.563 74.2146 161.422 61.9987C190.11 53.3943 214.59 58.3475 234.218 76.581C262.832 103.213 276.705 155.845 267.346 201.617Z" />
                    </svg>
                    <span className="text-[12px]">{c.likes}</span>
                  </button>
                </div>
              </div>

              {c.replies > 0 && (
                <button className="mt-2 text-xs text-zinc-400">
                  View replies ({c.replies})
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-zinc-800 px-4 py-3 bg-zinc-900">
        <div className="flex gap-3 items-center">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
            placeholder="Add comment..."
            className="flex-1 bg-zinc-800 text-white placeholder:text-zinc-500 rounded-full px-4 py-2 outline-none"
          />
          <button
            onClick={submit}
            className="px-4 py-2 bg-white/10 text-white rounded-full hover:bg-white/20"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
