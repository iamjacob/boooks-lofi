import { LibraryGroup } from '@/core/models/libraryGroup';
import { libraryGroupRepo } from '@/core/repo';
import { createId, UserID } from '@/core/models/ids/id';

export async function createLibraryGroup(input: {
  ownerId: UserID;
  title: string;
}): Promise<LibraryGroup> {
  const now = Date.now();

  const libraryGroup: LibraryGroup = {
    id: createId<'LibraryGroupID'>(),
    ownerId: input.ownerId,
    title: input.title,
    isSynced: false,
    createdAt: now,
    updatedAt: now,
  };

  await libraryGroupRepo.insert(libraryGroup);
  return libraryGroup;
}
