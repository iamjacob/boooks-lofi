// core/models/author.ts
import { AuthorID, UserID } from '@/core/models/ids/id';

export interface Author {
  id: AuthorID;
  name: string;

  
  bio?: string;
  avatarUrl?: string;
  
  isSynced:boolean;
  lastSyncedAt?: number;
  createdBy: UserID;

  createdAt: number;
  updatedAt?: number;
}
