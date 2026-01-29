// src/models/book.ts

export type BookSource =
  | "draft"        // scanned / user-created / offline
  | "verified"     // matched metadata
  | "blockchain";  // immutable canonical

export type Book = {
  /** Primary identity (UUID for drafts, canonical ID later) */
  id: string;

  /** Optional permanent identity when resolved */
  canonicalId?: string;

  /** Origin of truth */
  source: BookSource;

  /** Core metadata */
  title?: string;
  subtitle?: string;
  authorIds?: string[];

  /** Physical / render data */
  pages?: number;
  dimensions?: [number, number, number];

  /** Covers */
  cover?: {
    front?: string;
    spine?: string;
    back?: string;
  };

  /** Reading state (user-specific, syncable later) */
  progress?: number; // 0–100
  rating?: number;   // 1–5

  /** Book content pointers */
  pdfUrl?: string;

  /** Timestamps (critical for sync engines) */
  createdAt: number;
  updatedAt: number;
};
