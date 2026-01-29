import { ID } from '@/core/ids/id';

export type ShelfVisibility =
  | 'private'
  | 'unlisted'
  | 'public';

export interface Shelf {
  id: ID;

  ownerId: ID;

  title: string;
  slug?: string;

  visibility: ShelfVisibility;

  /** Visual / world settings */
  settings?: {
    layout: 'grid' | 'row' | 'stack' | 'spatial';
    theme?: 'light' | 'dark' | 'bw';
    showCovers?: boolean;
  };
  
  books?: number; // 👈 derived count, NOT required
  createdAt: number;
  updatedAt?: number;
}
