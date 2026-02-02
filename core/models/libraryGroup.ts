import { ID } from '@/core/ids/id';

export interface LibraryGroup {
    id: ID;
    ownerId: ID;
    title: string; // "Harry Potter"

    isSynced: boolean;
    lastSyncedAt?: number;
    createdAt: number;
    updatedAt?: number;
}