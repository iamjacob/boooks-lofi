import { UserBookID, LibraryGroupID } from '@/core/models/ids/id';
import { userBookRepo } from '@/core/repo';

export async function assignUserBookToGroup(
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
    isSynced: false,
  };

  await userBookRepo.update(updated);
  return updated;
}
