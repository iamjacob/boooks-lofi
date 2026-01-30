"use client";

import { useState } from "react";
import { LibraryHeader } from "@/ui/components/library/LibraryHeader";
import { ShelfSwitcher } from "@/ui/components/library/ShelfSwitcher";
import { LibraryContent } from "@/ui/components/library/LibraryContent";
import { mockShelves } from "@/ui/mocks/shelves.mock";
import { mockBooks } from "@/ui/mocks/bookList.mock";
import { BookListItem } from "@/ui/models/bookListItem";
import { ID } from "@/core/ids/id";

export function LibraryShell() {
  const [activeShelfId, setActiveShelfId] = useState<ID>(
    mockShelves[0].id
  );

  const [books, setBooks] = useState<BookListItem[]>(mockBooks);

  return (
    <div className="h-full flex flex-col">
      <LibraryHeader
        onAddBook={() => {
          const newBook: BookListItem = {
            id: crypto.randomUUID(),
            title: "New book",
            authorName: "Unknown author",
          };

          setBooks((prev) => [newBook, ...prev]);
        }}
      />

      <ShelfSwitcher
        shelves={mockShelves}
        activeShelfId={activeShelfId}
        onSelectShelf={setActiveShelfId}
      />

      <LibraryContent
        activeShelfId={activeShelfId}
        books={books}
        onDeleteBook={(id) =>
          setBooks((prev) => prev.filter((b) => b.id !== id))
        }
      />
    </div>
  );
}
