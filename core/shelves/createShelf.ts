import { createId } from '@/core/ids/id';
import { StorageAdapter } from '@/storage/adapter';
import { storageKeys } from '@/storage/keys';
import { Shelf } from '@/core/models/shelf';
import { logEvent } from '@/core/history/logEvent';

export async function createShelf(
  adapter: StorageAdapter,
  userId: string,
  title: string
): Promise<Shelf> {
  const shelves =
    (await adapter.get<Shelf[]>(
      storageKeys.shelves()
    )) ?? [];

  const shelf: Shelf = {
    id: `shelf_${createId()}`,
    ownerId: userId,
    title,

    visibility: 'private',

    settings: {
      layout: 'spatial', // 👈 DEFAULT
      theme: 'bw',
      showCovers: true,
    },

    books: 0,

    createdAt: Date.now(),
  };

  shelves.push(shelf);

  await adapter.set(
    storageKeys.shelves(),
    shelves
  );

  // ✅ precise history log
  await logEvent(adapter, userId, 'shelf.created', {
    shelfId: shelf.id,
    title: shelf.title,
    ownerId: userId,
  });

  return shelf;
}
