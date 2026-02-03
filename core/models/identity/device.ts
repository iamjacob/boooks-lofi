import { DeviceID, UserID } from '@/core/models/ids/id';

export interface Device {
  id: DeviceID;
  userId: UserID;
  name?: string;          // "Jacob’s iPhone", "MacBook Air"
  platform: 'web' | 'ios' | 'android' | 'desktop';
  createdAt: number;
}
