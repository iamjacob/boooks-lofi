import { ShelfGroupID } from '@/core/ids/id';
import { shelfGroupRepo } from '@/core/repo';

export async function moveShelfGroup(
  groupId: ShelfGroupID,
  position: [number, number, number],
  rotation?: [number, number, number]
) {
  const shelfGroup = await shelfGroupRepo.get(groupId);
  if (!shelfGroup) {
    throw new Error('ShelfGroup not found');
  }

  const updated = {
    ...shelfGroup,
    position,
    rotation: rotation ?? shelfGroup.rotation,
    updatedAt: Date.now(),
    isSynced: false,
  };

  await shelfGroupRepo.update(updated);
  return updated;
}
