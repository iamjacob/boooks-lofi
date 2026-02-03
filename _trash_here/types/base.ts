export type ID = string;

export interface BaseEntity {
  id: ID;
  createdAt: number;
  updatedAt: number;

  // offline-first
  isSynced: boolean;
  deleted?: boolean;
}
