// core/identity/session.ts
import { SessionID, IdentityID, UserID, DeviceID } from '@/core/ids/id';

export type SessionStatus = 'active' | 'revoked' | 'expired';

export interface Session {
  /** Session ID (unique per login) */
  id: SessionID;

  /** Which identity is logged in */
  identityId: IdentityID;

  /** Which user profile is active */
  userId: UserID;

  /** Which physical device */
  deviceId: DeviceID;

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
