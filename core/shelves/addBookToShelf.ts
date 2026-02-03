import { createId } from '@/core/ids/id';
import { StorageAdapter } from '@/storage/adapter';
import { storageKeys } from '@/storage/keys';
import { ShelfInstance } from '@/core/models/shelfInstance';
import { logEvent } from '@/_trash_here/history/logEvent';

/**
 * Create a ShelfInstance (projection of a UserBook into a Shelf)
 *
 * RULES:
 * - Does NOT touch UserBook
 * - Does NOT move library placement
 * - Creates a new expression instance
 */
export async function addBookToShelf(
  adapter: StorageAdapter,
  userId: string,
  input: {
    userBookId: string;
    shelfId: string;
  }
): Promise<ShelfInstance> {
  const shelfInstances =
    (await adapter.get<ShelfInstance[]>(
      storageKeys.shelfInstances(),
      { type: 'user', userId }
    )) ?? [];

  const now = Date.now();

  const instance: ShelfInstance = {
    id: `shelfInstance_${createId()}`,
    userBookId: input.userBookId,
    shelfId: input.shelfId,

    // TEMP default placement inside shelf world
    position: [0, 0, 0],
    rotation: [0, 0, 0],

    state: 'local',
    createdAt: now,
  };

  shelfInstances.push(instance);

  await adapter.set(
    storageKeys.shelfInstances(),
    shelfInstances,
    { type: 'user', userId }
  );

  await logEvent(adapter, userId, 'shelf_instance.created', {
    userBookId: input.userBookId,
    shelfId: input.shelfId,
  });

  return instance;
}
