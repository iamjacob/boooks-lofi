import { ArtifactID, BookID, JobID } from '@/core/ids/id';

export type ArtifactType =
  | 'image'
  | 'pdf'
  | 'epub'
  | 'scan_bundle'
  | 'ocr_text'
  | 'other';

export type ArtifactSource =
  | 'local_upload'
  | 'scanner'
  | 'import'
  | 'ipfs'
  | 'blockchain'
  | 'remote_url';

export interface Artifact {
  id: ArtifactID;

  /** Optional link to the abstract work */
  bookId?: BookID;

  /** Optional link to a specific job that produced it */
  jobId?: JobID;

  type: ArtifactType;
  source: ArtifactSource;

  /**
   * Where it lives:
   * - localPath for IndexedDB/filesystem later
   * - url for remote/CDN
   */
  localPath?: string;
  url?: string;

  /** Integrity / immutability */
  sha256?: string;
  immutable?: boolean;

  /** Media metadata */
  mime?: string;
  sizeBytes?: number;
  width?: number;
  height?: number;
  pageCount?: number;

  /** Chain anchoring (optional) */
  chain?: {
    network: string;        // 'ethereum', 'solana', 'boooks', etc.
    contract?: string;
    tokenId?: string;
    txHash?: string;
  };

  isSynced:boolean;
  lastSyncedAt?: number;

  createdAt: number;
  updatedAt?: number;
}
