import { ID } from '@/core/models/ids/id';

export interface Session {
  userId: ID;
  deviceId: ID;
  unlockedAt: number;
}
