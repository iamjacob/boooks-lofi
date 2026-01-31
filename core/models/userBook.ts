import { ID } from '@/core/ids/id';

/**
 * UserBook = ownership + canonical placement.
 *
 * INVARIANTS:
 * - Exactly ONE UserBook per user per book
 * - Library placement is canonical
 * - Shelves NEVER own books
 */
export type ReadingStatus = "unread" | "reading" | "finished";

export interface UserBook {
  id: ID;

  userId?: ID;
  bookId: ID;

  /** Canonical library placement (ALWAYS exists) */
  libraryPlacement?: {
    position: [number, number, number];
    rotation: [number, number, number];
  };

  /** Personal meaning */
  tagIds?: ID[];
  readingStatus: ReadingStatus;

  /** Ownership / rights */
  ownership?: {
    type: 'local' | 'license' | 'nft' | 'donation';
    ownerIdentityId?: ID;
    chain?: string;
    tokenId?: string;
  };

  createdAt: number;
  updatedAt?: number;
}
