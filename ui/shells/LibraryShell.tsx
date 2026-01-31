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
  loadShelves,
} from "@/core/db/libraryDb";
import { getLocalUserByUsername } from "@/core/users/getLocalUser";
import { collectionExists } from "@/core/collections/collectionsExists";
import { ID } from "@/core/ids/id";

/* ---------------- TYPES ---------------- */

type LibraryShellProps = {
  username: string;
  shelf: string;
  collection: string | null;
};

type ViewState =
  | "loading-user"
  | "user-not-found"
  | "user-private"
  | "shelf-not-found"
  | "collection-not-found"
  | "ready";

/* ---------------- COMPONENT ---------------- */

export function LibraryShell({
  username,
  shelf,
  collection,
}: LibraryShellProps) {
  const [viewState, setViewState] = useState<ViewState>("loading-user");

  const [books, setBooks] = useState<BookListItem[]>([]);
  const [userBooks, setUserBooks] = useState<UserBook[]>([]);
  const [editing, setEditing] = useState<BookListItem | null>(null);

  const [userId, setUserId] = useState<ID | null>(null);
  const [resolvedShelfId, setResolvedShelfId] = useState<ID | null>(null);

  /* -------- CONTEXT RESOLUTION -------- */
  useEffect(() => {
    let cancelled = false;

    async function resolveContext() {
      setViewState("loading-user");

      // 1. Resolve user
      const user = await getLocalUserByUsername(username);

      if (!user) {
        setViewState("user-not-found");
        return;
      }

      if (user.mode === "private") {
        setViewState("user-private");
        return;
      }

      // 2. Resolve shelf slug → shelf.id
      const shelves = await loadShelves(user.id);

      let resolvedShelf;

      if (shelf === "default") {
        resolvedShelf = shelves.find(
          (s) => s.id === user.defaultShelfId
        );
      } else {
        resolvedShelf = shelves.find((s) => s.slug === shelf);
      }

      if (!resolvedShelf) {
        setViewState("shelf-not-found");
        return;
      }

      // 3. Resolve collection (optional)
      if (collection) {
        const ok = await collectionExists(
          user.id,
          resolvedShelf.id,
          collection
        );
        if (!ok) {
          setViewState("collection-not-found");
          return;
        }
      }

      if (!cancelled) {
        setUserId(user.id);
        setResolvedShelfId(resolvedShelf.id);
        setViewState("ready");
      }
    }

    resolveContext();

    return () => {
      cancelled = true;
    };
  }, [username, shelf, collection]);

  /* -------- LOAD DATA (ONLY WHEN READY) -------- */
  useEffect(() => {
    if (viewState !== "ready" || !userId || !resolvedShelfId) return;

    async function load() {
      const allBooks = await loadBooks();
      const allUserBooks = await loadUserBooks();

      const filteredUserBooks = allUserBooks.filter(
        (ub) =>
          ub.userId === userId &&
          ub.shelfId === resolvedShelfId
      );

      setBooks(allBooks);
      setUserBooks(filteredUserBooks);
    }

    load();
  }, [viewState, userId, resolvedShelfId]);

  /* -------- ADD -------- */
  function addBook() {
    setEditing({
      id: crypto.randomUUID(),
      title: "",
      authorName: "",
    });
  }

  /* -------- SAVE -------- */
  async function saveBookAndUser(book: BookListItem) {
    setBooks((prev) =>
      prev.some((b) => b.id === book.id)
        ? prev.map((b) => (b.id === book.id ? book : b))
        : [...prev, book]
    );

    await saveBook(book);

    setUserBooks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        userId: userId!,
        bookId: book.id,
        shelfId: resolvedShelfId!, // ✅ FIXED
        readingStatus: "unread",
        createdAt: Date.now(),
      },
    ]);

    setEditing(null);
  }

  /* -------- VIEW STATES -------- */

  if (viewState !== "ready") {
    const msg =
      viewState === "user-not-found"
        ? "User does not exist."
        : viewState === "user-private"
        ? "This library is private."
        : viewState === "shelf-not-found"
        ? "Shelf does not exist."
        : viewState === "collection-not-found"
        ? "Collection does not exist."
        : "Loading…";

    return (
      <div style={{ padding: 24 }}>
        <h1>@{username}</h1>
        <p>{msg}</p>
      </div>
    );
  }

  /* -------- MAIN UI -------- */

  return (
    <div className="h-full flex flex-col">
      <div
        style={{
          padding: 24,
          borderBottom: "1px solid #333",
          display: "flex",
          gap: 24,
        }}
      >
        <h1>@{username}</h1>
        <p>Shelf: <strong>{shelf}</strong></p>
        <p>Collection: <strong>{collection ?? "—"}</strong></p>
      </div>

      <LibraryHeader onAddBook={addBook} />

      <LibraryContent
        books={books}
        userBooks={userBooks}
        onSelectBook={(id) => {
          const b = books.find((x) => x.id === id);
          if (b) setEditing(b);
        }}
        onSetReadingStatus={() => {}}
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
