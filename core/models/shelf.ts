import { ShelfID , UserID} from '@/core/ids/id';

export interface Shelf {
  id: ShelfID;

  // ownerId: UserID;
  // userId?: UserID;
  ownerId: UserID;


  title: string;
  slug: string; // 👈 REQUIRED for routing

  visibility: "private" | "public";

  /** Visual / world settings */
  settings?: {
    layout: 'list' | 'spatial';
    theme?: 'light' | 'dark' | 'bw';
    showCovers?: boolean;
  };
  
  books?: number; // 👈 derived count, NOT required
    isSynced:boolean;
  lastSyncedAt?: number;

  createdAt: number;
  updatedAt?: number;
}
