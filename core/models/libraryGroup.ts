import { LibraryGroupID, UserID } from '@/core/ids/id';

export interface LibraryGroup {
    id: LibraryGroupID;
    ownerId: UserID;
    title: string; // "Harry Potter"

    isSynced: boolean;
    lastSyncedAt?: number;
    createdAt: number;
    updatedAt?: number;
}