import { UserBookID } from '@/core/ids/id';
import { userBookRepo } from '@/core/repo';

export async function removeLibraryGroup(
  userBookId: UserBookID
) {
  const userBook = await userBookRepo.get(userBookId);
  if (!userBook) {
    throw new Error('UserBook not found');
  }

  const updated = {
    ...userBook,
    libraryGroupId: undefined,
    updatedAt: Date.now(),
  };

  await userBookRepo.update(updated);
  return updated;
}
