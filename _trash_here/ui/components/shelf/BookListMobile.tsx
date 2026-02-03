"use client";

import { BookListItem } from "@/ui/models/bookListItem";
import { ID } from "@/core/models/ids/id";
import { pickImageUri } from "@/ui/lib/pickImage";
import { ResolvedImage } from "@/ui/components/images/ResolvedImage";

type Props = {
  books: BookListItem[];
  onSelect?: (id: ID) => void;
  onSaveOnShelf?: any;
};

export function BookListMobile({ books, onSelect }: Props) {
  return (
    <ul className="divide-y divide-neutral-900">
      {books.map((book, i) => {
        const coverUri = pickImageUri(
          book.images,
          ["cover.front", "jacket.front", "custom"]
        );

        return (
          <li
            key={book.id}
            className="px-4 py-3 flex items-center gap-3 active:bg-neutral-900"
            onClick={() => onSelect?.(book.id)}
          >
            <div className="w-6 text-xs text-neutral-400">
              {i + 1}
            </div>

            {coverUri ? (
              <ResolvedImage
                uri={coverUri}
                className="w-10 aspect-[2/3] object-cover rounded"
              />
            ) : (
              <div className="w-10 aspect-[2/3] bg-neutral-800 rounded" />
            )}

            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">
                {book.title ?? "Untitled"}
              </div>
              <div className="text-xs text-neutral-400 truncate">
                {book.authorName ?? "Unknown author"}
              </div>
            </div>
            
          </li>
        );
      })}
    </ul>
  );
}
