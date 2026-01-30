"use client";

import { BookListItem } from "@/ui/models/bookListItem";
import { ID } from "@/core/ids/id";

type Props = {
  books: BookListItem[];
  onSelect?: (id: ID) => void;
};

export function BookListMobile({ books, onSelect }: Props) {
  return (
    <ul className="divide-y divide-neutral-900">
      {books.map((book, i) => (
        <li
          key={book.id}
          className="px-4 py-3 flex items-center gap-3 active:bg-neutral-900"
          onClick={() => onSelect?.(book.id)}
        >
          <div className="w-6 text-xs text-neutral-400">
            {i + 1}
          </div>

          <div className="w-10 aspect-[2/3] bg-neutral-800 rounded-md" />

          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">
              {book.title ?? "Untitled"}
            </div>
            <div className="text-xs text-neutral-400 truncate">
              {book.authorName ?? "Unknown author"}
            </div>
          </div>

          <div className="w-14 text-right text-xs text-neutral-400">
            {book.pageCount ? `${book.pageCount}p` : ""}
          </div>
        </li>
      ))}
    </ul>
  );
}
