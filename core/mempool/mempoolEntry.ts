import { ID } from '@/core/ids/id';

export type MempoolTarget =
  | 'book'
  | 'shelf_instance';

export interface MempoolEntry {
  id: ID;

  targetType: MempoolTarget;
  targetId: ID;

  submittedBy: ID;

  /** Validation / social graph */
  network: 'boooks';
  reputationWeight?: number;

  evidence?: {
    scans?: ID[];
    references?: ID[];
  };

  state: 'pending' | 'accepted' | 'rejected';

  createdAt: number;
}
