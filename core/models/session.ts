import { SessionID, UserID, DeviceID } from '@/core/ids/id';

export interface Session {
  id: SessionID;
  userId: UserID;
  deviceId: DeviceID;

  token: string;

  status: 'active' | 'revoked';

    isSynced:boolean;
  lastSyncedAt?: number;

  // unlockedAt: number; ?? 
  createdAt: number;
  revokedAt?: number;
}
