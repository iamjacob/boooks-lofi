import { ID } from '@/core/ids/id';

export interface CollectionItem {
  id: ID;
  collectionId: ID;
  shelfInstanceId: ID;

  position?: [number, number, number];
  rotation?: [number, number, number];
  index?: number;

  isSynced:boolean;
  lastSyncedAt?: number;

  createdAt: number;
  updatedAt?: number;
}
