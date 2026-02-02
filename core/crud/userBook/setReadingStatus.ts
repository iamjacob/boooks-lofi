import { userBookRepo } from '@/core/repo';
import { ReadingStatus } from '@/core/models/userBook';
import { ID, UserBookID } from '@/core/ids/id';

export async function setReadingStatus(
  userBookId: UserBookID,
  status: ReadingStatus
) {
  const ub = await userBookRepo.get(userBookId);
  if (!ub) throw new Error('UserBook not found');

  const updated = {
    ...ub,
    readingStatus: status,
    updatedAt: Date.now(),
    isSynced: false,
  };

  await userBookRepo.update(updated);
  return updated;
}
