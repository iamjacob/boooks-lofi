// core/identity/session.ts
import { ID } from '@/core/ids/id';

export type SessionStatus = 'active' | 'revoked' | 'expired';

export interface Session {
  /** Session ID (unique per login) */
  id: ID;

  /** Which identity is logged in */
  identityId: ID;

  /** Which user profile is active */
  userId: ID;

  /** Which physical device */
  deviceId: ID;

  /** Session lifecycle */
  status: SessionStatus;

  /** Network metadata (best-effort, optional) */
  ipAddress?: string;
  userAgent?: string;
  geo?: {
    country?: string;
    city?: string;
  };

  /** When session was created */
  createdAt: number;

  /** Last activity */
  lastSeenAt?: number;

  /** When revoked (logout / remote logout) */
  revokedAt?: number;
}
