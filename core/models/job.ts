import { ID } from '@/core/ids/id';

export type JobType =
  | 'scan_book'
  | 'ocr'
  | 'enrich_book'
  | 'reverse_image_search'
  | 'export'
  | 'other';

export type JobStatus =
  | 'pending'
  | 'running'
  | 'partial'
  | 'ready'
  | 'failed'
  | 'cancelled';

export interface Job {
  id: ID;

  userId: ID;
  deviceId?: ID;

  type: JobType;
  status: JobStatus;

  /** Optional target context */
  shelfId?: ID;
  collectionId?: ID;
  bookId?: ID;

  /** Steps for multi-stage flows (scanner) */
  steps?: string[]; // ['spine','front','back']
  stepIndex?: number;

  /** Inputs/outputs as artifact links */
  inputArtifactIds?: ID[];
  outputArtifactIds?: ID[];

  /** OCR payload (optional) */
  ocr?: {
    text?: string;
    confidence?: number; // 0–1
    languageHint?: string;
  };

  retries: number;
  lastError?: string;

    isSynced:boolean;
  lastSyncedAt?: number;

  createdAt: number;
  updatedAt?: number;
}
