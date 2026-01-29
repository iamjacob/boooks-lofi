// core/models/userBook.ts
import { ID } from '@/core/ids/id';

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface UserBook {
  id: ID;

  userId: ID;
  bookId: ID;

  /** Shelf relations */
  shelfIds?: ID[];

  /** Semantics */
  tagIds?: ID[];

  /** Reading state */
  readingStatus?: 'unread' | 'reading' | 'finished';

  /** Personal notes */
  notes?: string;

  /** 3D placement (per user, per book) */
  position?: Vec3;
  rotation?: Vec3;
  scale?: Vec3;

  createdAt: number;
  updatedAt?: number;
}
