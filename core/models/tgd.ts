// core/models/tgd.ts
import { ID } from '@/core/ids/id';

export type TGDType = 'thought' | 'goal' | 'dream';

export interface TGD {
  id: ID;

  type: TGDType;

  text: string;

  /** Owner */
  userId: ID;

  /** Optional evolution */
  parentId?: ID; // previous version

  /** Lifecycle */
  createdAt: number;
  updatedAt?: number;
  archivedAt?: number;
}
