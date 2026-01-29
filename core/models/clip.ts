// core/models/clip.ts
import { ID } from '@/core/ids/id';

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
  id: ID;

  type: ClipType;

  /** Main content */
  text: string;

  /** Optional context */
  source?: ClipSource;

  /** Relations */
  bookId?: ID;
  shelfId?: ID;

  /** Ownership */
  createdBy: ID; // userId

  createdAt: number;
  updatedAt?: number;
}
