import { ShelfInstance } from '@/core/models/shelfInstance';
import { shelfInstanceRepo } from '@/core/repo';
import { createId, ShelfID, UserBookID } from '@/core/models/ids/id';

export async function createShelfInstance(input: {
  userBookId: UserBookID;
  shelfId: ShelfID;
}): Promise<ShelfInstance> {
  const now = Date.now();

  const instance: ShelfInstance = {
    id: createId<'ShelfInstanceID'>(),
    userBookId: input.userBookId,
    shelfId: input.shelfId,
    createdAt: now,
    updatedAt: now,
    state: 'pending' as const,
    isSynced: false,
  };

  await shelfInstanceRepo.insert(instance);
  return instance;
}
