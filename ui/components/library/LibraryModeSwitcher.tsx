"use client";

import { useRouter } from "next/navigation";

type Props = {
  username: string;
  activeMode: "library" | "shelf";
  shelfSlug: string;
};

export function LibraryModeSwitcher({
  username,
  activeMode,
  shelfSlug,
}: Props) {
  const router = useRouter();

  return (
    <div className="flex gap-2 px-4 py-2">
      <button
        onClick={() => router.push(`/@${username}/library`)}
        className={`px-3 py-1 rounded text-sm ${
          activeMode === "library"
            ? "bg-white text-black"
            : "bg-neutral-800 text-neutral-300"
        }`}
      >
        Library
      </button>

      <button
        onClick={() => router.push(`/@${username}/${shelfSlug}`)}
        className={`px-3 py-1 rounded text-sm ${
          activeMode === "shelf"
            ? "bg-white text-black"
            : "bg-neutral-800 text-neutral-300"
        }`}
      >
        Shelf
      </button>
    </div>
  );
}
