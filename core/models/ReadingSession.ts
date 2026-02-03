// core/models/ReadingSession.ts
import { ReadingSessionID, UserBookID } from '@/core/ids/id';

export type ReadingSession = {
  id: ReadingSessionID;
  userBookId: UserBookID;

  startedAt: number;
  endedAt?: number;

  durationMs?: number;


  createdAt: number;
  updatedAt?: number;
  isSynced: boolean;
  lastSyncedAt?: number;
};
