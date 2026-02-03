import { DeviceID, UserID } from '@/core/ids/id';

export interface Device {
  id: DeviceID;
  userId: UserID;

  /** Device info */
  name: string; // "Jacob's iPhone", "MacBook Pro"
  type: 'mobile' | 'tablet' | 'desktop' | 'other';
  model?: string; // "iPhone 15 Pro", "iPad Air"
  os?: string; // "iOS", "macOS", "Android", "Windows"
  osVersion?: string;

  /** Sync tracking */
  lastSeenAt: number;
  lastSyncedAt?: number;

  /** Device tokens for push notifications */
  pushTokens?: string[];

  /** Trust / security */
  isTrusted: boolean;
  trustScore?: number; // 0-100

  isSynced: boolean;
  createdAt: number;
  updatedAt?: number;
}
