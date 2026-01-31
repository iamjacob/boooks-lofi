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
import { getLocalUserByUsername } from "@/core/users/getLocalUser";

/* ---------------- TYPES ---------------- */

type LibraryShellProps = {
  username: string;
  shelf: string;
  collection: string | null;
};

type UserState =
  | "user-loading"
  | "user-not-found"
  | "user-private"
  | "user-ok";

/* ---------------- DUMMY ONLINE FETCH ---------------- */
/* Future-proof: replace with real API call later */
async function fetchPublicUserOnline(username: string) {
  // 🔮 FUTURE:
  // const res = await fetch(`/api/users/${username}`)
  // if (!res.ok) return null
  // return await res.json()

  return null; // offline / no backend yet
}

/* ---------------- COMPONENT ---------------- */

export function LibraryShell({
  username,
  shelf,
  collection,
}: LibraryShellProps) {
  const [books, setBooks] = useState<BookListItem[]>([]);
  const [userBooks, setUserBooks] = useState<UserBook[]>([]);
  const [editing, setEditing] = useState<BookListItem | null>(null);

  const [userState, setUserState] = useState<UserState>("user-loading");

  /* -------- USER EXISTENCE CHECK (OFFLINE → ONLINE) -------- */
  useEffect(() => {
    let cancelled = false;

    async function checkUser() {
      setUserState("user-loading");

      // 1️⃣ OFFLINE FIRST
      const localUser = await getLocalUserByUsername(username);

      if (localUser) {
        if (localUser.mode === "private") {
          setUserState("user-private");
        } else {
          setUserState("user-ok");
        }
        return;
      }

      // 2️⃣ ONLINE (PREPARED, SAFE STUB)
      if (navigator.onLine) {
        const remoteUser = await fetchPublicUserOnline(username);
        if (remoteUser) {
          setUserState("user-ok");
          return;
        }
      }

      // 3️⃣ NOT FOUND
      if (!cancelled) {
        setUserState("user-not-found");
      }
    }

    checkUser();

    return () => {
      cancelled = true;
    };
  }, [username]);

  /* -------- LOAD LIBRARY DATA (ONLY IF USER OK) -------- */
  useEffect(() => {
    if (userState !== "user-ok") return;

    loadBooks().then(setBooks);
    loadUserBooks().then(setUserBooks);
  }, [userState]);

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

  /* -------- USER STATE GATES -------- */

  if (userState === "user-loading") {
    return <div style={{ padding: 24 }}>Loading user…</div>;
  }

  if (userState === "user-not-found") {
    return (
      <div style={{ padding: 24 }}>
        <h1>@{username}</h1>
        <p>User does not exist.</p>
      </div>
    );
  }

  if (userState === "user-private") {
    return (
      <div style={{ padding: 24 }}>
        <h1>@{username}</h1>
        <p>This library is private.</p>
      </div>
    );
  }

  /* -------- MAIN UI (USER OK) -------- */

  return (
    <div className="h-full flex flex-col">
      {/* CONTEXT HEADER */}
      <div
        style={{
          padding: 24,
          borderBottom: "1px solid #333",
          display: "flex",
          gap: 24,
        }}
      >
        <h1>@{username}</h1>
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
