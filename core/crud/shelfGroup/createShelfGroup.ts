import { ShelfGroup } from '@/core/models/shelfGroup';
import { shelfGroupRepo } from '@/core/repo';
import { createId, ShelfID } from '@/core/ids/id';

export async function createShelfGroup(input: {
  shelfId: ShelfID;
  title: string;
  slug: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
}): Promise<ShelfGroup> {
  const now = Date.now();

  const shelfGroup: ShelfGroup = {
    id: createId<'ShelfGroupID'>(),
    shelfId: input.shelfId,
    title: input.title,
    slug: input.slug,
    position: input.position,
    rotation: input.rotation,
    isSynced: false,
    createdAt: now,
    updatedAt: now,
  };

  await shelfGroupRepo.insert(shelfGroup);
  return shelfGroup;
}
