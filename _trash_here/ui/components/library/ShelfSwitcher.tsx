"use client";

import { Shelf } from "@/core/models/shelf";
import { useRouter } from "next/navigation";

type Props = {
  username: string;
  shelves: Shelf[];
  activeShelfSlug: string; // "library" | "home" | slug
};

export default function ShelfSwitcher({
  username,
  shelves,
  activeShelfSlug,
}: Props) {
  const router = useRouter();

  return (
    <div className="flex gap-2 px-4 py-2 border-b border-neutral-800 overflow-x-auto">
      {/* Library (NOT a shelf) */}
      <button
        onClick={() => router.push(`/@${username}/library`)}
        className={`px-3 py-1 text-xs rounded ${
          activeShelfSlug === "library"
            ? "bg-white text-black"
            : "bg-neutral-800 text-neutral-300"
        }`}
      >
        Library
      </button>

      {/* Home / Default */}
      <button
        onClick={() => router.push(`/@${username}`)}
        className={`px-3 py-1 text-xs rounded ${
          activeShelfSlug === "home"
            ? "bg-white text-black"
            : "bg-neutral-800 text-neutral-300"
        }`}
      >
        Home
      </button>

      {/* User shelves */}
      {shelves.map((shelf) => (
        <button
          key={shelf.id}
          onClick={() => router.push(`/@${username}/${shelf.slug}`)}
          className={`px-3 py-1 text-xs rounded ${
            activeShelfSlug === shelf.slug
              ? "bg-white text-black"
              : "bg-neutral-800 text-neutral-300"
          }`}
        >
          {shelf.title}
        </button>
      ))}
    </div>
  );
}
