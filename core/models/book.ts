import { ID } from '@/core/ids/id';

export type BookState =
  | 'draft'
  | 'pending'
  | 'published'
  | 'archived';

  
export interface Book {
  id: ID;

  /** Lineage */
  parentId?: ID; // sibling / child / merge logic

  /** Metadata */
  title?: string;
  subtitle?: string;

  authorID?: ID;
  description?: string;
  language?: string;
  publishedYear?: number;

  /** Classification */
  categoryIds?: ID[];
  tagIds?: ID[];

  /** Assets */
  assetIds?: ID[];

  /** Ownership */
  createdBy: ID;

  /** Lifecycle */
  state: BookState;
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