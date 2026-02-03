import { createId } from '@/core/ids/id';
import { StorageAdapter } from '@/storage/adapter';
import { storageKeys } from '@/storage/keys';
import { Collection } from '@/core/models/collection';
import { logEvent } from '@/_trash_here/history/logEvent';

export async function createCollection(
  adapter: StorageAdapter,
  userId: string,
  shelfId: string,
  title: string
): Promise<Collection> {
  const collections =
    (await adapter.get<Collection[]>(
      storageKeys.collections(),
      { type: 'user', userId }
    )) ?? [];

  const collection: Collection = {
    id: `collection_${createId()}`,
    shelfId,
    title,
    createdAt: Date.now(),
  };

  collections.push(collection);

  await adapter.set(
    storageKeys.collections(),
    collections,
    { type: 'user', userId }
  );

  await logEvent(
    adapter,
    userId,
    'collection.created',
    { collectionId: collection.id, shelfId }
  );

  return collection;
}
