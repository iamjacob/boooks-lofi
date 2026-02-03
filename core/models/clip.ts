// core/models/clip.ts
import { ClipID, BookID, ShelfID, UserID } from '@/core/models/ids/id';

export type ClipType =
  | 'quote'
  | 'news'
  | 'article'
  | 'note';

export interface ClipSource {
  title?: string;
  url?: string;
  publisher?: string;
  author?: string;
  publishedAt?: number;
}

export interface Clip {
  id: ClipID;

  type: ClipType;

  /** Main content */
  text: string;

  /** Optional context */
  source?: ClipSource;

  /** Relations */
  bookId?: BookID;
  shelfId?: ShelfID;

  /** Ownership */
  createdBy: UserID; // userId

    isSynced:boolean;
  lastSyncedAt?: number;

  createdAt: number;
  updatedAt?: number;
}
