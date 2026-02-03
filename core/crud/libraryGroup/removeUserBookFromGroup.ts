import { UserBookID } from '@/core/models/ids/id';
import { userBookRepo } from '@/core/repo';

export async function removeUserBookFromGroup(userBookId: UserBookID) {
  const userBook = await userBookRepo.get(userBookId);
  if (!userBook) {
    throw new Error('UserBook not found');
  }

  const updated = {
    ...userBook,
    libraryGroupId: undefined,
    updatedAt: Date.now(),
    isSynced: false,
  };

  await userBookRepo.update(updated);
  return updated;
}
