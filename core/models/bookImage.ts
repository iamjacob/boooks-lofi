// core/models/bookImage.ts
import { BookImageID, BookID } from '@/core/models/ids/id';

export type ImageSize = "xs" | "small" | "medium" | "large";

/**
 * Roles are semantic labels.
 * String-union allows future roles without refactor.
 */
export type BookImageRole =
  | "cover.front"
  | "cover.spine"
  | "cover.back"
  | "jacket.front"
  | "jacket.spine"
  | "jacket.back"
  | "jacket.flap.front"
  | "jacket.flap.back"
  | "jacket.full_wrap"
  | "box.slipcase"
  | "interior.spread"
  | "interior.title"
  | "physical.top_down"
  | "physical.edge"
  | "marketing.3d"
  | "custom"
  | (string & {});

/**
 * ONE physical image reference.
 * May represent original OR resized output.
 */
export type BookImageVariant = {
  /** Hint, not requirement */
  size?: ImageSize;

  /** MUST ALWAYS WORK */
  uri: string; // cache:// | blob:// | https://

  width?: number;
  height?: number;

  /** Sync / cache safety */
  status?: "local" | "remote";
  checksum?: string;

  /** Capture / origin */
  capturedAt?: number;
  source?: "camera" | "file" | "import" | "ml";
  deviceModel?: string;

  /** ML / scan analysis (optional, future-proof) */
  analysis?: {
    containsText?: boolean;
    detectedIsbn?: string;
    dominantColors?: string[];
    isBlurry?: boolean;
  };
  
  isSynced:boolean;
  lastSyncedAt?: number;

  createdAt: number;
  updatedAt?: number;
};

/**
 * A role may have:
 * - ONE original (high quality)
 * - ZERO or more derived LOD variants
 */
export type BookImageRoleEntry = {
  /** Original / highest quality image (ALWAYS SAFE) */
  original: BookImageVariant;

  /** Optional derived sizes */
  variants?: Partial<Record<ImageSize, BookImageVariant>>;

  /** Preferred default size for UI */
  preferredSize?: ImageSize;

    isSynced:boolean;
  lastSyncedAt?: number;

  createdAt: number;
  updatedAt?: number;
};

/**
 * Entire image set for a book (or edition later)
 */
export type BookImageSet = {
  id: BookImageID;
  bookId?: BookID;
  roles: Partial<Record<BookImageRole, BookImageRoleEntry>>;

    isSynced:boolean;

  createdAt: number;
  updatedAt?: number;
  lastSyncedAt?: number;
  version?: number;
};
