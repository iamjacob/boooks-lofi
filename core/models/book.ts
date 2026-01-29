import { ID } from '@/core/ids/id';

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
export type BookState =
  | 'draft'
  | 'published'
  | 'archived';

export interface Book {
  id: ID;

  /** Lineage (editions, translations, OCR variants) */
  parentId?: ID;

  /** Canonical metadata (may be incomplete in drafts) */
  title?: string;
  description?: string;
  language?: string;
  publishedYear?: number;

  /** Global meaning */
  authorIds?: ID[];
  categoryIds?: ID[];

  /** Lifecycle */
  state: BookState;

  /** Provenance (who introduced this idea) */
  createdByIdentityId?: ID;

  createdAt: number;
  updatedAt?: number;
}
