import { StorageAdapter } from '@/core/storage/adapter';
import { storageKeys } from '@/core/storage/keys';
import { Shelf } from '@/core/models/shelf';

export async function getShelves(
  adapter: StorageAdapter,
  userId: string
): Promise<Shelf[]> {
  const shelves =
    (await adapter.get<Shelf[]>(
      storageKeys.shelves()
    )) ?? [];

  return shelves.filter(
    shelf => shelf.ownerId === userId
  );
}
