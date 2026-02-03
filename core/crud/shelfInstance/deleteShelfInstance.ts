import { ShelfInstanceID } from '@/core/models/ids/id';
import { shelfInstanceRepo } from '@/core/repo';

export async function deleteShelfInstance(id: ShelfInstanceID) {
  await shelfInstanceRepo.delete(id);
}
