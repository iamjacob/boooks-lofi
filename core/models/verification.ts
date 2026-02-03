import { VerificationID, IdentityID } from '@/core/ids/id';

export type VerificationLevel =
  | 'none'
  | 'email'
  | 'phone'
  | 'government_id'
  | 'web_of_trust';

export interface Verification {
  id: VerificationID;

  identityId: IdentityID;

  level: VerificationLevel;

  /** Provider info (kept generic) */
  provider?: string;     // 'boooks', 'custom', etc.
  providerUserId?: string;

  /** Proof references (hashes, signed messages, etc.) */
  proof?: {
    type: string;        // 'signature', 'zk', 'token', ...
    value: string;       // hash / signature / reference
  };

    isSynced:boolean;
  lastSyncedAt?: number;

  createdAt: number;
  updatedAt?: number;
}
