"use client";

import { useEffect, useState } from "react";
import { LibraryHeader } from "@/ui/components/library/LibraryHeader";
import { LibraryContent } from "@/ui/components/library/LibraryContent";
import { BookEditor } from "@/ui/components/library/BookEditor";
import { BookListItem } from "@/ui/models/bookListItem";
import { UserBook } from "@/core/models/userBook";
import {
  loadBooks,
  loadUserBooks,
  saveBook,
  saveUserBook,
} from "@/core/db/libraryDb";

export function LibraryShell() {
  const [books, setBooks] = useState<BookListItem[]>([]);
  const [userBooks, setUserBooks] = useState<UserBook[]>([]);
  const [editing, setEditing] = useState<BookListItem | null>(null);

  /* -------- LOAD ON START -------- */
  useEffect(() => {
    loadBooks().then(setBooks);
    loadUserBooks().then(setUserBooks);
  }, []);

  /* -------- ADD -------- */
  function addBook() {
    setEditing({
      id: crypto.randomUUID(),
      title: "",
      authorName: "",
    });
  }

  /* -------- SAVE (BOOK + USERBOOK) -------- */
  async function saveBookAndUser(book: BookListItem) {
    setBooks((prev) => {
      const exists = prev.find((b) => b.id === book.id);
      return exists
        ? prev.map((b) => (b.id === book.id ? book : b))
        : [book, ...prev];
    });

    await saveBook(book);

    setUserBooks((prev) => {
      const exists = prev.find((u) => u.bookId === book.id);
      if (exists) return prev;

      const userBook: UserBook = {
        id: crypto.randomUUID(),
        bookId: book.id,
        readingStatus: "unread",
        createdAt: Date.now(),
      };

      saveUserBook(userBook);
      return [...prev, userBook];
    });

    setEditing(null);
  }

  /* -------- UPDATE READING STATUS -------- */
  function setReadingStatus(bookId: string, status: UserBook["readingStatus"]) {
    setUserBooks((prev) =>
      prev.map((u) =>
        u.bookId === bookId
          ? { ...u, readingStatus: status, updatedAt: Date.now() }
          : u
      )
    );

    const ub = userBooks.find((u) => u.bookId === bookId);
    if (ub) {
      saveUserBook({ ...ub, readingStatus: status, updatedAt: Date.now() });
    }
  }

  return (
    <div className="h-full flex flex-col">
      <LibraryHeader onAddBook={addBook} />

      <LibraryContent
        books={books}
        userBooks={userBooks}
        onSelectBook={(id) => {
          const b = books.find((x) => x.id === id);
          if (b) setEditing(b);
        }}
        onSetReadingStatus={setReadingStatus}
      />

      {editing && (
        <BookEditor
          book={editing}
          onSave={saveBookAndUser}
          onCancel={() => setEditing(null)}
        />
      )}
    </div>
  );
}
