// core/models/tgd.ts
import { TGDID, UserID } from '@/core/models/ids/id';

export type TGDType = 'thought' | 'goal' | 'dream';

export interface TGD {
  id: TGDID;

  type: TGDType;

  text: string;

  /** Owner */
  userId: UserID;

  /** Optional evolution */
  parentId?: TGDID; // previous version

  isSynced:boolean;
  lastSyncedAt?: number;

  /** Lifecycle */
  createdAt: number;
  updatedAt?: number;
  archivedAt?: number;
}
