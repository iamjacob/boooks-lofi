import { CollectionItemID, CollectionID, ShelfInstanceID } from '@/core/ids/id';

export interface CollectionItem {
  id: CollectionItemID;
  collectionId: CollectionID;
  shelfInstanceId: ShelfInstanceID;

  position?: [number, number, number];
  rotation?: [number, number, number];
  index?: number;

  isSynced:boolean;
  lastSyncedAt?: number;

  createdAt: number;
  updatedAt?: number;
}
