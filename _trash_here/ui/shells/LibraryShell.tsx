"use client";

import { useEffect, useMemo, useState } from "react";
import { ID } from "@/core/models/ids/id";
import { Shelf } from "@/core/models/shelf";
import { BookListItem } from "@/ui/models/bookListItem";
import { LibraryHeader } from "@/ui/components/library/LibraryHeader";
import { LibraryContent } from "@/ui/components/library/LibraryContent";
import { loadShelves, loadUserBooks } from "@/_trash_here/db/libraryDb";
import {
  loadLibraryRows,
  addToLibrary,
  LibraryRow,
} from "@/_trash_here/library/libraryCrud";
import { getLocalUserByUsername } from "@/core/users/getLocalUser";
import ShelfSwitcher from "@/ui/components/library/ShelfSwitcher";
import { saveOnShelf } from "@/core/services/shelves/saveOnShelf";
type Props = {
  username: string; // handle from url (already stripped of @ typically)
  shelf: string; // "library" | "default" | "home" | slug
};

type ViewState =
  | { kind: "loading" }
  | { kind: "user-not-found"; handle: string }
  | { kind: "user-private"; handle: string }
  | {
      kind: "ready";
      handle: string;
      userId: ID;
      shelves: Shelf[];
      mode: "library" | "shelf";
      activeShelf: Shelf | null; // resolved shelf object (home/slug)
      rows: LibraryRow[]; // what we render right now
    };

export default function LibraryShell({ username, shelf }: Props) {
  const [state, setState] = useState<ViewState>({ kind: "loading" });

  const mode = useMemo<"library" | "shelf">(
    () => (shelf === "library" ? "library" : "shelf"),
    [shelf]
  );

  const isHome = shelf === "default" || shelf === "home" || !shelf;

  async function reload(userId: ID, next: Partial<Extract<ViewState, { kind: "ready" }>> = {}) {
    const rows = await loadLibraryRows(userId);

    setState((prev) => {
      if (prev.kind !== "ready") return prev;
      return {
        ...prev,
        rows,
        ...next,
      };
    });
  }

  async function handleAddBook() {
    if (state.kind !== "ready") return;

    const title = prompt("Book title?");
    if (!title) return;

    const book: BookListItem = {
      id: crypto.randomUUID(),
      title,
      authorName: "",
    };

    console.log("📚 ADD: addToLibrary()", {
      userId: state.userId,
      title: book.title,
      routeShelf: shelf,
      mode: state.mode,
      isHome,
    });

    // 1) ALWAYS add to library
    await addToLibrary(state.userId, book);

    // 2) reload rows (source of truth)
    await reload(state.userId);

    // 3) If we are on home/default → we want a ShelfInstance later.
    // We DON'T implement ShelfInstances here yet, but we log stub clearly.
    if (isHome) {
      const userBooks = await loadUserBooks(state.userId);
      const ub = userBooks.find((x) => x.bookId === book.id);

      console.log("📐 HOME CONTEXT: would create ShelfInstance", {
        route: `/@${state.handle}`,
        intendedShelf: state.activeShelf?.id ?? "unknown",
        bookId: book.id,
        resolvedUserBookId: ub?.id ?? null,
      });

      if (!ub) {
        console.log(
          "🧱 STUB BLOCKED: could not find UserBook for new bookId (cannot create ShelfInstance yet)",
          { bookId: book.id }
        );
      } else {
        console.log(
          "🧱 STUB: create ShelfInstance(userBookId, shelfId, position, rotation) not implemented yet",
          { userBookId: ub.id, shelfId: state.activeShelf?.id }
        );
                  await saveOnShelf(
  state.userId,
  ub.id,
  state.activeShelf?.id!
);

      }
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      setState({ kind: "loading" });

      const user = await getLocalUserByUsername(username);

      if (!user) {
        if (!cancelled) {
          setState({ kind: "user-not-found", handle: username });
        }
        return;
      }

      if (user.mode === "private") {
        if (!cancelled) {
          setState({ kind: "user-private", handle: user.handle ?? username });
        }
        return;
      }

      const userShelves = await loadShelves(user.id);

      // Resolve active shelf object (only relevant in shelf-mode)
      let activeShelf: Shelf | null = null;

      if (mode === "shelf") {
        if (isHome) {
          activeShelf =
            userShelves.find((s) => s.id === user.defaultShelfId) ?? null;
        } else {
          activeShelf = userShelves.find((s) => s.slug === shelf) ?? null;
        }

        // If shelf slug doesn't exist, we still keep shell alive,
        // but we show a soft message in UI (not a hard crash)
        if (!activeShelf) {
          console.log("⚠️ SHELF NOT FOUND (soft)", {
            userId: user.id,
            shelfParam: shelf,
            isHome,
            defaultShelfId: user.defaultShelfId,
            shelves: userShelves.map((s) => ({ id: s.id, slug: s.slug, title: s.title })),
          });
        }
      }

      const rows = await loadLibraryRows(user.id);

      if (cancelled) return;

      setState({
        kind: "ready",
        handle: user.handle ?? username,
        userId: user.id,
        shelves: userShelves,
        mode,
        activeShelf,
        rows: rows,
      });
    }

    boot();
    return () => {
      cancelled = true;
    };
  }, [username, shelf, mode, isHome]);

  // ---------------- RENDER ----------------

  if (state.kind === "loading") {
    return <div style={{ padding: 24 }}>Loading…</div>;
  }

  if (state.kind === "user-not-found") {
    return (
      <div style={{ padding: 24 }}>
        <h1 style={{ margin: 0 }}>@{state.handle}</h1>
        <p style={{ opacity: 0.8 }}>User does not exist.</p>
      </div>
    );
  }

  if (state.kind === "user-private") {
    return (
      <div style={{ padding: 24 }}>
        <h1 style={{ margin: 0 }}>@{state.handle}</h1>
        <p style={{ opacity: 0.8 }}>This profile is private.</p>
      </div>
    );
  }

  // READY
  const title =
    state.mode === "library"
      ? "Library"
      : state.activeShelf
      ? state.activeShelf.title
      : isHome
      ? "Home (missing default shelf)"
      : `Unknown shelf (${shelf})`;

  const rows = state.rows;

const activeShelfSlug =
  shelf === "library"
    ? "library"
    : isHome
    ? "home"
    : state.activeShelf?.slug ?? "unknown";

  return (
    <div className="h-full flex flex-col">
      <div
        style={{
          padding: 24,
          borderBottom: "1px solid #333",
          display: "flex",
          gap: 16,
          alignItems: "baseline",
          flexWrap: "wrap",
        }}
      >
        <h1 style={{ margin: 0 }}>@{state.handle}</h1>
        <span style={{ opacity: 0.7 }}>{title}</span>
        <span style={{ opacity: 0.5 }}>
          {rows.length === 0 ? "0 books" : `${rows.length} books`}
        </span>
      </div>

      {/* Add button is always allowed here because phase 1 is private/self flow. */}
      <LibraryHeader onAddBook={handleAddBook} />
<ShelfSwitcher
  username={state.handle}
  shelves={state.shelves}
  activeShelfSlug={activeShelfSlug}
/>
      {state.mode === "shelf" && !state.activeShelf ? (
        <div style={{ padding: 24, opacity: 0.8 }}>
          <p style={{ marginTop: 0 }}>
            This shelf does not exist yet.
          </p>
          <p style={{ marginBottom: 0, opacity: 0.7 }}>
            (We keep the shell alive so you can still add books and debug.)
          </p>
        </div>
      ) : null}

      {rows.length === 0 ? (
        <div style={{ padding: 24, opacity: 0.8 }}>
          <p style={{ marginTop: 0 }}>
            {state.mode === "library"
              ? "Your library is empty. Add your first book."
              : "No books here yet. (ShelfInstances coming next.)"}
          </p>

          <button onClick={handleAddBook}>Add book</button>
        </div>
      ) : (
        <LibraryContent
          books={rows}
          onSelectBook={() => {}}
          onSetReadingStatus={() => {}}
        />
      )}
    </div>
  );
}
