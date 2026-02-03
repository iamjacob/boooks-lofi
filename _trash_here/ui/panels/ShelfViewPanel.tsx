export default function ShelfView() {
  return (
    <div className="h-screen w-screen bg-neutral-950 text-neutral-100 flex">
      {/* Left sidebar */}
      <aside className="w-72 border-r border-neutral-800 p-3 hidden md:block">
        <div className="text-sm font-semibold mb-3">Your Shelves</div>
        <div className="space-y-1">
          {["Default", "Wisdom", "Fiction", "Saved"].map((s) => (
            <button
              key={s}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-900 transition"
            >
              <div className="text-sm">{s}</div>
              <div className="text-xs text-neutral-400">42 books</div>
            </button>
          ))}
        </div>
      </aside>

      {/* Center content */}
      <main className="flex-1 min-w-0 p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xl font-semibold">Default Shelf</div>
            <div className="text-sm text-neutral-400">Recently added</div>
          </div>

          <div className="flex gap-2">
            <input
              placeholder="Search books…"
              className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm outline-none w-56"
            />
            <button className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm hover:bg-neutral-800">
              Filter
            </button>
          </div>
        </div>

        {/* Book grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {Array.from({ length: 40 }).map((_, i) => (
            <button
              key={i}
              className="group text-left"
              // onClick={() => setSelectedBookId(book.id)}
            >
              <div className="aspect-[2/3] rounded-xl bg-neutral-900 border border-neutral-800 group-hover:border-neutral-600 transition" />
              <div className="mt-2 text-xs font-medium line-clamp-1">
                Book Title {i + 1}
              </div>
              <div className="text-[11px] text-neutral-400 line-clamp-1">
                Author Name
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* Right panel (Spotify-ish) */}
      <aside className="w-[360px] border-l border-neutral-800 p-4 hidden lg:block">
        {/* Panel header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm text-neutral-400">Selected</div>
            <div className="text-lg font-semibold leading-tight line-clamp-2">
              The Book Title Goes Here
            </div>
            <div className="text-sm text-neutral-400 line-clamp-1">
              Author Name
            </div>
          </div>
          <button className="px-2 py-1 rounded-lg hover:bg-neutral-900">⋯</button>
        </div>

        {/* Cover + pills */}
        <div className="mt-4 flex gap-3">
          <div className="w-24 aspect-[2/3] rounded-xl bg-neutral-900 border border-neutral-800" />
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              {["2019", "English", "320p"].map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-3 space-y-2">
              <button className="w-full rounded-xl bg-neutral-100 text-neutral-950 py-2 text-sm font-semibold hover:opacity-90">
                Open
              </button>
              <button className="w-full rounded-xl bg-neutral-900 border border-neutral-800 py-2 text-sm hover:bg-neutral-800">
                Save offline
              </button>
              <button className="w-full rounded-xl bg-neutral-900 border border-neutral-800 py-2 text-sm hover:bg-neutral-800">
                Add to collection
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-5">
          <div className="text-sm font-semibold mb-2">About</div>
          <p className="text-sm text-neutral-300 leading-relaxed line-clamp-5">
            Short description / synopsis. Keep it clamped like Spotify. Tap to expand if you want later.
          </p>
          <button className="mt-2 text-sm text-neutral-400 hover:text-neutral-200">
            Show more
          </button>
        </div>

        {/* Activity */}
        <div className="mt-5">
          <div className="text-sm font-semibold mb-2">Activity</div>
          <div className="text-sm text-neutral-300 space-y-1">
            <div className="flex justify-between">
              <span className="text-neutral-400">Last opened</span>
              <span>Jan 22</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Notes</span>
              <span>3</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
