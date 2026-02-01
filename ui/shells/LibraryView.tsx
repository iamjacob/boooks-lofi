"use client";

// ui/views/LibraryView.tsx

import { useEffect, useMemo, useState } from "react";
import { IndexedDBAdapter } from "@/storage/idb";
import { storageKeys } from "@/storage/keys";
import { User } from "@/core/models/user";
import { ID } from "@/core/ids/id";
import { LibraryHeader } from "@/ui/components/library/LibraryHeader";
import { LibraryContent } from "@/ui/components/library/LibraryContent";
import { loadLibraryRows, setReadingStatus, LibraryRow } from "@/core/library/libraryCrud";

/**
 * Phase 1: /@user/library
 * - Library is NOT a shelf.
 * - Library is ALWAYS private: only the active user may view their own library.
 */

type Props = {
  rawUsername: string; // comes from route param, e.g. "@ton"
};

function normalizeHandle(rawUsername: string): string {
  // rawUsername is already decoded by Next in most cases.
  // Still: be safe if it contains %40 etc.
  const decoded = decodeURIComponent(rawUsername);

  // we require @ in front in URL for this route to feel consistent
  // accepted inputs: "@ton" or "ton" (we normalize)
  const trimmed = decoded.trim();
  return trimmed.startsWith("@") ? trimmed.slice(1) : trimmed;
}

export default function LibraryView({ rawUsername }: Props) {
  const [state, setState] = useState<
    | { kind: "loading" }
    | { kind: "private"; handle: string }
    | { kind: "not-found"; handle: string }
    | { kind: "ready"; handle: string; userId: ID; rows: LibraryRow[] }
  >({ kind: "loading" });

  const handleFromUrl = useMemo(() => normalizeHandle(rawUsername), [rawUsername]);

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      setState({ kind: "loading" });

      const adapter = new IndexedDBAdapter();

      const users =
        (await adapter.get<User[]>(storageKeys.users, { type: "global" })) ?? [];

      const activeUserId = await adapter.get<string>(storageKeys.activeUserId, {
        type: "global",
      });

      const activeUser = users.find((u) => u.id === activeUserId);

      // If active user missing, treat as not found (phase 1)
      if (!activeUser) {
        if (!cancelled) setState({ kind: "not-found", handle: handleFromUrl });
        return;
      }

      // Find the user referenced by URL (by handle)
      const urlUser = users.find((u) => u.handle === handleFromUrl);

      if (!urlUser) {
        if (!cancelled) setState({ kind: "not-found", handle: handleFromUrl });
        return;
      }

      // Library is ALWAYS private → only own library allowed
      if (urlUser.id !== activeUser.id) {
        if (!cancelled) setState({ kind: "private", handle: handleFromUrl });
        return;
      }

      const rows = await loadLibraryRows(urlUser.id);

      if (!cancelled) {
        setState({
          kind: "ready",
          handle: handleFromUrl,
          userId: urlUser.id,
          rows,
        });
      }
    }

    boot();
    return () => {
      cancelled = true;
    };
  }, [handleFromUrl]);

  async function onSetReadingStatus(userBookId: ID, status: any) {
    if (state.kind !== "ready") return;

    await setReadingStatus(state.userId, userBookId, status);

    // Reload (simple LO-FI correctness)
    const rows = await loadLibraryRows(state.userId);
    setState({ ...state, rows });
  }

  if (state.kind === "loading") {
    return <div style={{ padding: 24 }}>Loading library…</div>;
  }

  if (state.kind === "not-found") {
    return (
      <div style={{ padding: 24 }}>
        <h1>@{state.handle}</h1>
        <p>User does not exist.</p>
      </div>
    );
  }

  if (state.kind === "private") {
    return (
      <div style={{ padding: 24 }}>
        <h1>@{state.handle}</h1>
        <p>Library is private.</p>
      </div>
    );
  }

  // READY
  const rows = state.rows;

  return (
    <div className="h-full flex flex-col">
      <div
        style={{
          padding: 24,
          borderBottom: "1px solid #333",
          display: "flex",
          gap: 24,
          alignItems: "baseline",
        }}
      >
        <h1 style={{ margin: 0 }}>@{state.handle}</h1>
        <p style={{ margin: 0, opacity: 0.8 }}>Library</p>
        <p style={{ margin: 0, opacity: 0.8 }}>
          {rows.length === 0 ? "No books yet" : `${rows.length} books`}
        </p>
      </div>

      {/* In phase 1, LibraryHeader's add button is only for own library (we already gated that). */}
      <LibraryHeader onAddBook={() => { /* you can wire this later */ }} />

      {/* LibraryContent currently expects BookListItem[].
          rows extends BookListItem, so it's safe to pass. */}
      <LibraryContent
        books={rows}
        onSelectBook={() => {}}
        onSetReadingStatus={(bookId, status) => {
          // NOTE: LibraryContent currently sends "bookId".
          // For proper status update you want userBookId.
          // For phase 1, easiest is: update by matching row where row.id === bookId (Book id),
          // BUT that breaks multi-userbook future.
          // Better: update by userBookId. So:
          const row = rows.find((r) => r.id === bookId);
          if (!row) return;
          onSetReadingStatus(row.userBookId, status);
        }}
      />
    </div>
  );
}
