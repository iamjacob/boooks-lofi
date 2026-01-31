"use client";

import { useEffect, useState } from "react";
import { LibraryHeader } from "@/ui/components/library/LibraryHeader";
import { LibraryContent } from "@/ui/components/library/LibraryContent";
import { BookEditor } from "@/ui/components/library/BookEditor";
import { BookListItem } from "@/ui/models/bookListItem";
import { UserBook } from "@/core/models/userBook";
import { Shelf } from "@/core/models/shelf";
import {
  loadBooks,
  loadUserBooks,
  saveBook,
  saveUserBook,
  loadShelves,
  loadCollections,
} from "@/core/db/libraryDb";
import { getLocalUserByUsername } from "@/core/users/getLocalUser";
import { collectionExists } from "@/core/collections/collectionsExists";
import { ID } from "@/core/ids/id";
import { ShelfSwitcher } from "@/ui/components/library/ShelfSwitcher";
import { CollectionSwitcher } from "@/ui/components/library/CollectionSwitcher";
import { LibraryModeSwitcher } from "@/ui/components/library/LibraryModeSwitcher";
import { SortSwitcher } from "@/ui/components/library/SortSwitcher";

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


type SortMode = "title" | "status" | "added";

/* ---------------- COMPONENT ---------------- */

export function LibraryShell({
  username,
  shelf,
  collection,
}: LibraryShellProps) {
  const [viewState, setViewState] = useState<ViewState>("loading-user");

  const [allBooks, setAllBooks] = useState<BookListItem[]>([]);
  const [userBooks, setUserBooks] = useState<UserBook[]>([]);
  const [editing, setEditing] = useState<BookListItem | null>(null);

  const [userId, setUserId] = useState<ID | null>(null);
  const [resolvedShelfId, setResolvedShelfId] = useState<ID | null>(null);

  const [shelves, setShelves] = useState<Shelf[]>([]);
  const [collections, setCollections] = useState<
    { id: string; title: string }[]
  >([]);
const [sortMode, setSortMode] = useState<SortMode>("title");



  
  /* -------- CONTEXT RESOLUTION (URL → DOMAIN) -------- */
  useEffect(() => {
    let cancelled = false;

    async function resolveContext() {
      setViewState("loading-user");

      const user = await getLocalUserByUsername(username);
      if (!user) {
        setViewState("user-not-found");
        return;
      }

      if (user.mode === "private") {
        setViewState("user-private");
        return;
      }

      const allShelves = await loadShelves(user.id);
      setShelves(allShelves);

      let resolvedShelf: Shelf | undefined;

      if (shelf === "default") {
        resolvedShelf = allShelves.find(
          (s) => s.id === user.defaultShelfId
        );
      } else {
        resolvedShelf = allShelves.find((s) => s.slug === shelf);
      }

      if (!resolvedShelf) {
        setViewState("shelf-not-found");
        return;
      }

      const shelfCollections = await loadCollections(
        user.id,
        resolvedShelf.id
      );
      setCollections(shelfCollections);

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

  /* -------- LOAD DATA -------- */
  useEffect(() => {
    if (viewState !== "ready" || !userId || !resolvedShelfId) return;

    const uid = userId;

    async function load() {
      const books = await loadBooks();
      const userBooks = await loadUserBooks(uid);

      const filteredUserBooks = userBooks.filter(
        (ub) => ub.shelfId === resolvedShelfId
      );

      setAllBooks(books);
      setUserBooks(filteredUserBooks);
    }

    load();
  }, [viewState, userId, resolvedShelfId]);

  /* -------- DERIVED VIEW (THE ONLY LIST UI MAY USE) -------- */
  const visibleItems = userBooks
    .map((ub) => {
      const book = allBooks.find((b) => b.id === ub.bookId);
      if (!book) return null;

      return {
        ...book,
        userBookId: ub.id,
        readingStatus: ub.readingStatus,
        shelfId: ub.shelfId,
        syncState: ub.syncState,
      };
    })
    .filter(Boolean) as Array<
      BookListItem & {
        userBookId: ID;
        readingStatus: UserBook["readingStatus"];
        shelfId: ID;
        syncState?: UserBook["syncState"];
      }
    >;

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
    setAllBooks((prev) =>
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
        shelfId: resolvedShelfId!,
        readingStatus: "unread",
        syncState: "pending",
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
  const activeShelfSlug = shelf === "default" ? "home" : shelf;
const isLibraryView = shelf === "library";

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
        <p>Shelf: <strong>{activeShelfSlug}</strong></p>
        <p>Collection: <strong>{collection ?? "—"}</strong></p>
      </div>

      <ShelfSwitcher
        username={username}
        shelves={shelves}
        activeShelfSlug={activeShelfSlug}
      />

      <CollectionSwitcher
        username={username}
        shelfSlug={activeShelfSlug}
        collections={collections}
        activeCollection={collection}
      />

<LibraryModeSwitcher
  username={username}
  activeMode={isLibraryView ? "library" : "shelf"}
  shelfSlug={activeShelfSlug}
/>

<SortSwitcher value={sortMode} onChange={setSortMode} />

      <LibraryHeader onAddBook={addBook} />

      <LibraryContent
        books={visibleItems}
        onSelectBook={(id) => {
          const b = visibleItems.find((x) => x.id === id);
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
