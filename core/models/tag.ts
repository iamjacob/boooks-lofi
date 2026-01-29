// core/models/tag.ts
import { ID } from '@/core/ids/id';

export interface Tag {
  id: ID;

  /** Canonical label */
  label: string;

  /** Normalized form for search */
  slug: string; // 'true-north', 'ai-ethics'

  /** Ownership */
  createdBy: ID;

  /** Optional grouping */
  categoryId?: ID;

  createdAt: number;
}
