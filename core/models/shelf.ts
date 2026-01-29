import { ID } from '@/core/ids/id';

export type ShelfVisibility =
  | 'private'
  | 'unlisted'
  | 'public';

export type ShelfLayout =
  | 'list'
  | 'grid'
  | 'row'
  | 'stack'
  | 'spatial'; // 👈 3D default

export interface ShelfSettings {
  layout: ShelfLayout;
  theme?: 'light' | 'dark' | 'bw';
  showCovers?: boolean;
}

export interface Shelf {
  id: ID;

  /** Ownership */
  ownerId: ID;

  /** Identity */
  title: string;
  slug?: string; // future unique URL

  /** Behavior */
  visibility: ShelfVisibility;

  /** Optional settings (defaults applied at render time) */
  settings?: ShelfSettings;

  /** Stats (derived, not authoritative) */
  books?: number; // 👈 derived count, NOT required

  createdAt: number;
  updatedAt?: number;
}
