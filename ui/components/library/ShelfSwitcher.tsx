// ui/components/library/ShelfSwitcher.tsx
import { ID } from "@/core/ids/id";
import { Shelf } from "@/ui/mocks/shelves.mock";

type Props = {
  shelves: Shelf[];
  activeShelfId: ID;
  onSelectShelf: (id: ID) => void;
};

export function ShelfSwitcher({
  shelves,
  activeShelfId,
  onSelectShelf,
}: Props) {
  return (
    <div className="flex gap-2 px-4 py-2 border-b border-neutral-800 overflow-x-auto">
      {shelves.map((shelf) => {
        const active = shelf.id === activeShelfId;

        return (
          <button
            key={shelf.id}
            onClick={() => onSelectShelf(shelf.id)}
            className={[
              "px-3 py-1.5 rounded-full text-sm whitespace-nowrap",
              active
                ? "bg-white text-black"
                : "bg-neutral-800 text-neutral-300",
            ].join(" ")}
          >
            {shelf.name}
          </button>
        );
      })}
    </div>
  );
}
