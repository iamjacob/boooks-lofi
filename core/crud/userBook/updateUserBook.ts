import { UserBookID } from '@/core/models/ids/id';
import { userBookRepo } from '@/core/repo';

export async function updateUserBook(
  id: UserBookID,
  patch: Record<string, any>
) {
  const ub = await userBookRepo.get(id);
  if (!ub) throw new Error('UserBook not found');

  const updated = {
    ...ub,
    ...patch,
    updatedAt: Date.now(),
  };

  await userBookRepo.update(updated);
  return updated;
}
