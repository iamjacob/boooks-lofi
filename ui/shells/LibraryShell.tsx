"use client";

import { useState } from "react";
import { LibraryHeader } from "@/ui/components/library/LibraryHeader";
import { ShelfSwitcher } from "@/ui/components/library/ShelfSwitcher";
import { LibraryContent } from "@/ui/components/library/LibraryContent";
import { BookEditor } from "@/ui/components/library/BookEditor";
import { BookListItem } from "@/ui/models/bookListItem";
import { mockShelves } from "@/ui/mocks/shelves.mock";
import { ID } from "@/core/ids/id";

export function LibraryShell() {
  const [activeShelfId, setActiveShelfId] = useState<ID>(
    mockShelves[0].id
  );

  const [books, setBooks] = useState<BookListItem[]>([]);
  const [editing, setEditing] = useState<BookListItem | null>(null);

  function addBook() {
    setEditing({
      id: crypto.randomUUID(),
      title: "",
      authorName: "",
    });
  }

  function saveBook(book: BookListItem) {
    setBooks((prev) => {
      const exists = prev.find((b) => b.id === book.id);
      return exists
        ? prev.map((b) => (b.id === book.id ? book : b))
        : [book, ...prev];
    });
    setEditing(null);
  }

  return (
    <div className="h-full flex flex-col">
      <LibraryHeader onAddBook={addBook} />

      <ShelfSwitcher
        shelves={mockShelves}
        activeShelfId={activeShelfId}
        onSelectShelf={setActiveShelfId}
      />

      <LibraryContent
        books={books}
        onSelectBook={(id) => {
          const b = books.find((x) => x.id === id);
          if (b) setEditing(b);
        }}
      />

      {editing && (
        <BookEditor
          book={editing}
          onSave={saveBook}
          onCancel={() => setEditing(null)}
        />
      )}
    </div>
  );
}
