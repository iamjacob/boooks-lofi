import { MemPoolEntryID, UserID, BookID, ShelfInstanceID, ArtifactID } from '@/core/models/ids/id';

export type MempoolTarget =
  | 'book'
  | 'shelf_instance';

export interface MempoolEntry {
  id: MemPoolEntryID;

  targetType: MempoolTarget;
  targetId: BookID | ShelfInstanceID;

  submittedBy: UserID;

  /** Validation / social graph */
  network: 'boooks';
  reputationWeight?: number;

  evidence?: {
    scans?: ArtifactID[];
    references?: ArtifactID[];
  };

  state: 'pending' | 'accepted' | 'rejected';

  createdAt: number;
}
