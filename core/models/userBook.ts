import { ID } from "@/core/ids/id";

/**
 * UserBook = a user's canonical relationship to a book.
 *
 * INVARIANTS:
 * - Exactly ONE UserBook per user per book
 * - UserBook always belongs to EXACTLY ONE shelf
 * - Shelves NEVER own books (they are just contexts)
 */
export type ReadingStatus = "unread" | "reading" | "finished";

export interface UserBook {
  id: ID;

  /** Ownership */
  userId: ID;
  bookId: ID;

  /** Canonical shelf placement */
  shelfId?: ID;

  /** Personal state */
  readingStatus: ReadingStatus;
  tagIds?: ID[];
  syncState?: "local" | "pending" | "synced" | "error";

  /** Optional 3D placement (future) */
  libraryPlacement?: {
    position: [number, number, number];
    rotation: [number, number, number];
  };

  /** Ownership / rights (future) */
  ownership?: {
    type: "local" | "license" | "nft" | "donation";
    ownerIdentityId?: ID;
    chain?: string;
    tokenId?: string;
  };

    /** Declarative filter (books are NOT owned by collections) */
  filter?: {
    tagIds?: ID[];
    authors?: string[];
    languages?: string[];
  };
  isSynced:boolean;
  lastSyncedAt?: number;

  createdAt: number;
  updatedAt?: number;
}
