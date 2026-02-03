import { UserBookID, LibraryGroupID } from '@/core/ids/id';
import { userBookRepo } from '@/core/repo';

export async function assignLibraryGroup(
  userBookId: UserBookID,
  groupId: LibraryGroupID
) {
  const userBook = await userBookRepo.get(userBookId);
  if (!userBook) {
    throw new Error('UserBook not found');
  }

  const updated = {
    ...userBook,
    libraryGroupId: groupId,
    updatedAt: Date.now(),
  };

  await userBookRepo.update(updated);
  return updated;
}
