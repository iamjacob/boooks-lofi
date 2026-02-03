import { UserID, ShelfID } from '@/core/models/ids/id';
import { userRepo } from '@/core/repo';

export async function setDefaultShelf(
  userId: UserID,
  shelfId: ShelfID
) {
  const user = await userRepo.get(userId);
  if (!user) throw new Error('User not found');

  const updated = {
    ...user,
    defaultShelfId: shelfId,
    updatedAt: Date.now(),
  };

  await userRepo.update(updated);
  return updated;
}
