"use client";

import { useRouter } from "next/navigation";

export type Collection = {
  id: string;
  title: string;
};

type Props = {
  username: string;
  shelfSlug: string;
  collections: Collection[];
  activeCollection: string | null;
};

export function CollectionSwitcher({
  username,
  shelfSlug,
  collections,
  activeCollection,
}: Props) {
  const router = useRouter();

  function goToCollection(id: string) {
    router.push(`/@${username}/${shelfSlug}/${id}`);
  }

  function clearCollection() {
    router.push(`/@${username}/${shelfSlug}`);
  }

  if (collections.length === 0) return null;

  return (
    <div className="flex gap-2 overflow-x-auto px-2 pb-2">
      <button
        onClick={clearCollection}
        className={`px-3 py-1 rounded-full text-sm
          ${
            activeCollection === null
              ? "bg-white text-black"
              : "bg-neutral-800 text-neutral-300"
          }`}
      >
        All
      </button>

      {collections.map((c) => {
        const isActive = c.id === activeCollection;

        return (
          <button
            key={c.id}
            onClick={() => goToCollection(c.id)}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap
              ${
                isActive
                  ? "bg-white text-black"
                  : "bg-neutral-800 text-neutral-300"
              }`}
          >
            {c.title}
          </button>
        );
      })}
    </div>
  );
}
