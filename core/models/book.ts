// core/models/book.ts
import { ID } from '@/core/ids/id';

export type BookState =
  | 'draft'
  | 'published'
  | 'archived';

export interface Book {
  id: ID;

  /** Draft lineage */
  parentId?: ID;

  /** Core metadata */
  title?: string;
  description?: string;
  language?: string;
  publishedYear?: number;

  /** Relations */
  authorIds?: ID[];
  shelfId?: ID;

  /** Assets (covers, pdfs, scans) */
  assetIds?: ID[];

  /** Tags (reference IDs, not strings) */
  tagIds?: ID[];

  /** Ownership */
  createdBy: ID;

  /** Lifecycle */
  state: BookState;
  createdAt: number;
  updatedAt?: number;
}
