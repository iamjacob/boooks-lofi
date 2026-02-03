import { UserID } from '@/core/ids/id';
import { libraryGroupRepo } from '@/core/repo';

export async function loadLibraryGroups(userId: UserID) {
  return libraryGroupRepo.getByOwner(userId);
}
