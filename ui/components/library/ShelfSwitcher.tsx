"use client";

import { useRouter } from "next/navigation";
import { Shelf } from "@/core/models/shelf";

type Props = {
  username: string;          // 👈 DEN MANGLEDE
  shelves: Shelf[];
  activeShelfSlug: string;
};

export function ShelfSwitcher({
  username,
  shelves,
  activeShelfSlug,
}: Props) {
  const router = useRouter();

  function goToShelf(slug: string) {
    router.push(`/@${username}/${slug}`);
  }

  return (
    <div className="flex gap-2 overflow-x-auto p-2">
      {shelves.map((shelf) => {
        const isActive = shelf.slug === activeShelfSlug;

        return (
          <button
            key={shelf.id}
            onClick={() => goToShelf(shelf.slug)}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap
              ${
                isActive
                  ? "bg-white text-black"
                  : "bg-neutral-800 text-neutral-300"
              }`}
          >
            {shelf.title}
          </button>
        );
      })}
    </div>
  );
}
