import { BookID, AuthorID, UserID,CategoryID,TagID,AssetID } from '@/core/ids/id';

export type BookState =
  | 'draft'
  | 'pending'
  | 'published'
  | 'archived';

  
export interface Book {
  id: BookID;

  /** Lineage */
  parentId?: BookID; // sibling / child / merge logic

  /** Metadata */
  title?: string;
  subtitle?: string;

  authorID?: AuthorID;
  description?: string;
  language?: string;
  publishedYear?: number;

  /** Classification */
  categoryIds?: CategoryID[];
  tagIds?: TagID[];

  /** Assets */
  assetIds?: AssetID[];

  /** Ownership */
  createdBy: UserID;

  /** Lifecycle */
  state: BookState;
  
  isSynced:boolean;
  lastSyncedAt?: number;

  createdAt: number;
  updatedAt?: number;
}


/**
 * Book = the abstract work / idea.
 *
 * INVARIANTS:
 * - A Book does NOT belong to a shelf
 * - A Book does NOT have tags (personal meaning)
 * - A Book does NOT have ownership
 * - A Book may exist locally as a draft
 * - Lineage is expressed via parentId
 */