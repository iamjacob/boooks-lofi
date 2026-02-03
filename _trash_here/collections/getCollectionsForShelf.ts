import { StorageAdapter } from '@/core/storage/adapter';
import { storageKeys } from '@/core/storage/keys';
import { Collection } from '@/core/models/collection';

export async function getCollectionsForShelf(
  adapter: StorageAdapter,
  userId: string,
  shelfId: string
): Promise<Collection[]> {
  const collections =
    (await adapter.get<Collection[]>(
      storageKeys.collections(),
      { type: 'user', userId }
    )) ?? [];

  return collections.filter(
    c => c.shelfId === shelfId
  );
}
