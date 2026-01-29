import { ID } from '@/core/ids/id';

export interface Device {
  id: ID;
  name?: string;          // "Jacob’s iPhone", "MacBook Air"
  platform: 'web' | 'ios' | 'android' | 'desktop';
  createdAt: number;
}
