// src/models/author.ts

export type AuthorSource =
  | "draft"        // inferred / scanned / user-created
  | "verified"     // metadata resolved
  | "blockchain";  // canonical

export type Author = {
  /** Primary identity (UUID or canonical) */
  id: string;

  /** Optional canonical identity */
  canonicalId?: string;

  /** Origin of truth */
  source: AuthorSource;

  /** Core metadata */
  name?: string;
  bio?: string;

  /** Relations */
  bookIds?: string[]; // normalized relation

  /** Optional metadata */
  birthYear?: number;
  country?: string;
  socials?: {
    website?: string;
    twitter?: string;
    instagram?: string;
  };

  /** Sync-critical timestamps */
  createdAt: number;
  updatedAt: number;
};
