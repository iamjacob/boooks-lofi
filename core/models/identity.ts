import { IdentityID, UserID } from '@/core/ids/id';

export type IdentityType =
  | 'user'           // Primary user identity
  | 'wallet'         // Web3 wallet
  | 'social'         // Social media identity
  | 'institutional'  // Organization/group identity
  | 'ai'             // AI agent
  | 'other';

export interface Identity {
  id: IdentityID;

  /** Link to primary user if applicable */
  userId?: UserID;

  /** Identity classification */
  type: IdentityType;

  /** Display info */
  displayName: string;
  handle?: string; // unique identifier within type
  avatarUrl?: string;

  /** Verification state */
  isVerified: boolean;
  verificationLevel?: 'none' | 'email' | 'phone' | 'government_id' | 'web_of_trust';

  /** Chain/blockchain properties (if web3) */
  chain?: string; // 'ethereum', 'solana', etc.
  chainAddress?: string; // wallet address
  chainNonce?: number; // for signing

  /** Metadata */
  bio?: string;
  links?: {
    twitter?: string;
    github?: string;
    website?: string;
  };

  /** Privacy */
  visibility: 'private' | 'public';
  allowMessages: boolean;

  isSynced: boolean;
  lastSyncedAt?: number;

  createdAt: number;
  updatedAt?: number;
}
