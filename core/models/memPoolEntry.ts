import { ID } from '@/core/ids/id';

export type MempoolStatus =
  | 'pending'
  | 'under_review'
  | 'accepted'
  | 'rejected'
  | 'superseded';

export type MempoolIntent =
  | 'publish_new'
  | 'attach_child'
  | 'attach_parent'
  | 'merge_duplicate'
  | 'update_metadata';

export interface MempoolEntry {
  id: ID;

  /** Who proposes this change */
  submittedBy: ID;          // identity/user id
  deviceId?: ID;

  /** What is being proposed */
  intent: MempoolIntent;

  /** The draft book node the user submitted */
  draftBookId: ID;

  /**
   * Optional lineage targets after server reconciliation:
   * - parentCandidateId if server thinks it belongs under a parent
   * - mergeIntoBookId if it matches an existing canonical node
   */
  parentCandidateId?: ID;
  mergeIntoBookId?: ID;

  /** Evidence artifacts (scan images, pdfs, OCR, etc.) */
  evidenceArtifactIds?: ID[];

  /** Server matching / confidence signals */
  match?: {
    type?: 'same' | 'sibling' | 'child' | 'parent' | 'unknown';
    confidence?: number; // 0–1
    candidates?: Array<{ bookId: ID; confidence: number }>;
  };

  /** Validation state */
  status: MempoolStatus;

  /** Voting / reputation hooks (kept minimal) */
  votes?: {
    up: number;
    down: number;
  };

    isSynced:boolean;
  lastSyncedAt?: number;

  createdAt: number;
  updatedAt?: number;
}
