"use client";
import { useState } from "react";
import { Filter, X } from "lucide-react";

export default function FilterScrollbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [customFilters, setCustomFilters] = useState([]);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [newFilter, setNewFilter] = useState("");
  const [selectedSort, setSelectedSort] = useState("Recent");

  const defaultFilters = [
    "All",
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Fantasy",
    "Biography",
    "History",
    "Self-Help",
    "Business",
    "Poetry",
    "Drama",
    "Horror",
    "Thriller",
  ];

  const sortOptions = [
    "Recent",
    "Oldest",
    "A-Z",
    "Z-A",
    "Most Loved",
    "Rating",
    "Last Read",
    "Range",
    "Author",
  ];

  const filters = [...defaultFilters, ...customFilters];

  const toggleFilter = (filter) => {
    if (filter === "All") {
      setSelectedFilters(["All"]);
    } else {
      setSelectedFilters((prev) => {
        const filtered = prev.filter((f) => f !== "All");
        if (filtered.includes(filter)) {
          return filtered.filter((f) => f !== filter);
        }
        return [...filtered, filter];
      });
    }
  };

  const addCustomFilter = () => {
    if (newFilter.trim() && !filters.includes(newFilter.trim())) {
      setCustomFilters([...customFilters, newFilter.trim()]);
      setNewFilter("");
      setShowCustomInput(false);
    }
  };

  const removeCustomFilter = (filter) => {
    setCustomFilters(customFilters.filter((f) => f !== filter));
    setSelectedFilters(selectedFilters.filter((f) => f !== filter));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center p-8">
      <style>{`
    /* Hide scrollbar completely */
    * {
      scrollbar-width: none; /* Firefox */
    }

    *::-webkit-scrollbar {
      display: none; /* Chrome / Safari */
    }

    @media (hover: hover) and (pointer: fine) {
      * {
        scrollbar-width: thin;
        scrollbar-color: rgba(255,255,255,0.25) transparent;
      }

      *::-webkit-scrollbar {
        width: 2px;
        height: 2px;
      }
    }
      `}</style>
      {/* Demo Content */}
      <div className="w-full max-w-md mb-8">
        <h1 className="text-white text-2xl font-light mb-2">Library</h1>
        <p className="text-slate-400 text-sm">Tap the filter icon below</p>
      </div>

      {/* Filter Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800">
        {/* Expanded Filter & Sort Area */}
        <div
          className={`transition-all duration-300 ease-out overflow-hidden ${
            isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {/* Sort Section */}
          <div
            className={`transition-all duration-300 ease-out overflow-hidden ${
              isSortOpen
                ? "max-h-24 opacity-100 border-b border-slate-800 pt-3 pb-2"
                : "max-h-0 opacity-0"
            }`}
          >
            {/* <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                Sort by
              </span>
            </div> */}
            <div className="overflow-x-auto pb-2">
              <div className="flex px-2 gap-2 min-w-max">
                {sortOptions.map((sort) => (
                  <button
                    key={sort}
                    onClick={() => setSelectedSort(sort)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                      selectedSort === sort
                        ? "bg-gray-700 text-white"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {sort}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="pt-2 pb-3">
            {/* <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                Filter by
              </span>
            </div> */}
            <div className="flex px-2 items-center justify-around ">
              <button
                onClick={() => {
                  setIsSortOpen(!isSortOpen);
                }}
                className={`flex flex-col text-slate-400 items-center gap-1 mx-2 transition-colors`}
              >
                {isSortOpen ? (
                  <X stroke={"#D91B24"} size={24} />
                ) : (
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 7L9 7M2 7L5 7"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M19 12H16M5 12L12 12"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M16 17H8"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                <span className="text-xs">Sort</span>
              </button>

              <div className="overflow-x-auto px-2 pb-1">
                <div className="flex gap-2 min-w-max">
                  {filters.map((filter) => (
                    <div key={filter} className="relative group">
                      <button
                        onClick={() => toggleFilter(filter)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                          selectedFilters.includes(filter) ||
                          (selectedFilters.length === 0 && filter === "All")
                            ? "border-red-700/50 border-2 text-white"
                            : "bg-slate-800 border-2 border-transparent text-slate-300 hover:bg-slate-700"
                        }`}
                      >
                        {filter}
                      </button>
                      {customFilters.includes(filter) && (
                        <button
                          onClick={() => removeCustomFilter(filter)}
                          //border red instead?
                          className="absolute -top-1 -right-1 w-5 h-5 bg-red-700 rounded-full text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}

                  {showCustomInput ? (
                    <div className="flex gap-1">
                      <input
                        type="text"
                        value={newFilter}
                        onChange={(e) => setNewFilter(e.target.value)}
                        onKeyUp={(e) => e.key === "Enter" && addCustomFilter()}
                        placeholder="Custom tag..."
                        className="px-3 py-2 rounded-full text-sm bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-red-700/50 w-32"
                        autoFocus
                      />
                      <button
                        onClick={addCustomFilter}
                        className="px-3 py-2 rounded-full text-sm bg-red-r00 text-white hover:bg-red-700"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => {
                          setShowCustomInput(false);
                          setNewFilter("");
                        }}
                        className="px-3 py-2 rounded-full text-sm bg-slate-700 text-white hover:bg-slate-600"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowCustomInput(true)}
                      className="px-4 py-2 rounded-full text-sm font-medium bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-slate-300 border border-dashed border-slate-600 transition-all whitespace-nowrap"
                    >
                      + Custom
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-around py-3 px-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isOpen ? "text-red-700" : "text-slate-400"
            }`}
          >
            {isOpen ? <X size={24} /> : <Filter size={24} />}
            <span className="text-xs">Filter</span>
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {selectedFilters.length > 0 && (
        <div className="w-full max-w-md mt-4">
          <p className="text-slate-300 text-sm mb-2">Active filters:</p>
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map((filter) => (
              <span
                key={filter}
                className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm"
              >
                {filter}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
