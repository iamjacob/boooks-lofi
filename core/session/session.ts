import { ID } from '@/core/ids/id';

export interface Session {
  userId: ID;
  deviceId: ID;
  unlockedAt: number;
}
