import { ShelfGroupID, ShelfID } from '@/core/models/ids/id';

export interface ShelfGroup {
  id: ShelfGroupID;
  shelfId: ShelfID;
  title: string; // "Harry Potter"
  slug:string; //nice for deeplink!

  // Group transform (move all books together)
  position?: [number, number, number];
  rotation?: [number, number, number];

  isSynced: boolean;
  lastSyncedAt?: number;
  createdAt: number;
  updatedAt?: number;
}
