import { ShelfInstanceID, ShelfGroupID } from '@/core/models/ids/id';
import { shelfInstanceRepo } from '@/core/repo';

export async function assignShelfInstanceToGroup(
  shelfInstanceId: ShelfInstanceID,
  groupId: ShelfGroupID
) {
  const shelfInstance = await shelfInstanceRepo.get(shelfInstanceId);
  if (!shelfInstance) {
    throw new Error('ShelfInstance not found');
  }

  const updated = {
    ...shelfInstance,
    shelfGroupId: groupId,
    updatedAt: Date.now(),
    isSynced: false,
  };

  await shelfInstanceRepo.update(updated);
  return updated;
}
