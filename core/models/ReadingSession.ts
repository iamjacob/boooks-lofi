// core/models/ReadingSession.ts
import { ID } from '@/core/ids/id';

export type ReadingSession = {
  id: ID;
  userBookId: ID;

  startedAt: number;
  endedAt?: number;

  durationMs?: number;


  createdAt: number;
  updatedAt?: number;
  isSynced: boolean;
  lastSyncedAt?: number;
};
