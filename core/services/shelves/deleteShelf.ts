// core/shelves/deleteShelf.ts
import { StorageAdapter } from '@/core/storage/adapter';
import { storageKeys } from '@/core/storage/keys';
import { Shelf } from '@/core/models/shelf';

export async function deleteShelf(
  adapter: StorageAdapter,
  userId: string,
  shelfId: string
) {
  const shelves =
    (await adapter.get<Shelf[]>(
      storageKeys.shelves(),
      { type: 'user', userId }
    )) ?? [];

  const updated = shelves.filter(s => s.id !== shelfId);

  await adapter.set(
    storageKeys.shelves(),
    updated,
    { type: 'user', userId }
  );
}
