import { ID } from '@/core/ids/id';

export interface Session {
  id: ID;
  userId: ID;
  deviceId: ID;

  token: string;

  status: 'active' | 'revoked';

    isSynced:boolean;
  lastSyncedAt?: number;

  // unlockedAt: number; ?? 
  createdAt: number;
  revokedAt?: number;
}
