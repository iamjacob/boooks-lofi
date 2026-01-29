import { ID } from '@/core/ids/id';

/**
 * UserBook = a user's relationship to a Book.
 *
 * INVARIANTS:
 * - Every UserBook has a base physical placement
 * - Shelves are ownership/organization, not position
 * - Collections NEVER own books, only influence layout
 * - Visual movement does NOT mutate data unless confirmed
 */
export interface UserBook {
  id: ID;

  /** Identity */
  userId: ID;
  bookId: ID;

  /** Organization */
  shelfIds: ID[]; // always at least the default shelf

  /** Meaning (personal) */
  tagIds?: ID[];

  /** Reading state */
  readingStatus?: 'unread' | 'reading' | 'finished';

  /** BASE physical placement (home position) */
  position: [number, number, number];
  rotation: [number, number, number];

  /**
   * Optional physical / IRL placement
   * (room, wall, real shelf, etc.)
   */
  physicalPlacement?: {
    roomId?: ID;
    label?: string;
  };

  /** Ownership / rights (future-safe) */
  ownership?: {
    type: 'local' | 'license' | 'nft' | 'donation';
    ownerIdentityId?: ID;
    chain?: string;
    tokenId?: string;
  };

  createdAt: number;
  updatedAt?: number;
}
