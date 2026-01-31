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

/* ---------------- TYPES ---------------- */

type LibraryShellProps = {
  username: string;
  shelf: string;
  collection: string | null;
};

/* ---------------- COMPONENT ---------------- */

export function LibraryShell({
  username,
  shelf,
  collection,
}: LibraryShellProps) {
  const [books, setBooks] = useState<BookListItem[]>([]);
  const [userBooks, setUserBooks] = useState<UserBook[]>([]);
  const [editing, setEditing] = useState<BookListItem | null>(null);

  const [userExists, setUserExists] = useState<boolean | null>(null);

  /* -------- CHECK IF USER EXISTS (PUBLIC / LO-FI) -------- */
  useEffect(() => {
    // LO-FI version:
    // A user "exists" if they have any UserBooks locally.
    // (Later: replace with public profile lookup / API)
    loadUserBooks().then((ubs) => {
      setUserExists(ubs.length > 0);
    });
  }, [username]);

  /* -------- LOAD DATA -------- */
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
  function setReadingStatus(
    bookId: string,
    status: UserBook["readingStatus"]
  ) {
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



if (userExists === null) {
  return <div style={{ padding: 24 }}>Loading…</div>;
}


  /* -------- LOADING -------- */
  if (userExists === null) {
    return (
      <div style={{ padding: 24 }}>
        <p>Loading library…</p>
      </div>
    );
  }

  

  /* -------- MAIN UI -------- */
  return (
    <div className="h-full flex flex-col">
      {/* CONTEXT HEADER (IRL FEEDBACK) */}
      <div style={{ padding: 24, borderBottom: "1px solid #333", display:"flex" }}>
        <h1>{username}</h1>
        <p>
          Shelf: <strong>{shelf}</strong>
        </p>
        <p>
          Collection: <strong>{collection ?? "—"}</strong>
        </p>
      </div>

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
