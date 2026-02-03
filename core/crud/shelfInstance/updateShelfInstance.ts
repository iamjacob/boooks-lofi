import { ShelfInstanceID } from '@/core/models/ids/id';
import { shelfInstanceRepo } from '@/core/repo';

export async function updateShelfInstance(
  id: ShelfInstanceID,
  patch: Record<string, any>
) {
  const inst = await shelfInstanceRepo.get(id);
  if (!inst) throw new Error('ShelfInstance not found');

  const updated = {
    ...inst,
    ...patch,
    updatedAt: Date.now(),
  };

  await shelfInstanceRepo.update(updated);
  return updated;
}
