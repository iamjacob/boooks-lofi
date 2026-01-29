import { ID } from '@/core/ids/id';

export interface Session {
  id: ID;
  userId: ID;
  deviceId: ID;

  token: string;

  status: 'active' | 'revoked';

  // unlockedAt: number; ?? 
  createdAt: number;
  revokedAt?: number;
}
