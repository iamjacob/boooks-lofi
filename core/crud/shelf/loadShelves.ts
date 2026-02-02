import { UserID } from '@/core/ids/id';
import { shelfRepo } from '@/core/repo';

export async function loadShelves(userId: UserID) {
  return shelfRepo.getByOwner(userId);
}
